// Diagnostic for the intermittent Windows forced-GC hang: a guard-page fault
// (0x80000001) inside GC.collect while worker threads run solves, followed by
// a deadlock (see .github/workflows/windows-gc-debug.yml).
//
// volterra_debug_install_veh() installs a first-in-chain vectored exception
// handler that, on a guard-page or access violation, writes to stderr:
//   - the fault (code, thread, read/write, address, RIP, RSP);
//   - VirtualQuery of the faulting region;
//   - a backtrace as module+offset (symbolized afterwards by the caller);
//   - druntime's registered threads (id, stack context, TEB stack bounds,
//     running state) and its StackContext list -- the ranges the collector
//     actually scans -- flagging contexts not owned by a registered thread.
// It then returns EXCEPTION_CONTINUE_SEARCH, so behaviour is unchanged.
//
// The handler runs while druntime has the other threads suspended, possibly
// holding the heap or loader lock, so it takes no locks and never allocates:
// output goes through a stack buffer to WriteFile, module names come from a
// table captured at install time, and druntime state is read directly
// (private fields via __traits(getMember); ThreadBase.id would lock).
module volterra_debug_veh;

version (Windows):

import core.sys.windows.basetsd : ULONG_PTR;
import core.sys.windows.winbase;
import core.sys.windows.windef;
import core.sys.windows.winnt;
import core.thread.context : StackContext;
import core.thread.osthread : Thread;
import core.thread.threadbase : ThreadBase;

private:

alias VehFn = extern (Windows) LONG function(EXCEPTION_POINTERS*) nothrow @nogc;
alias AddVehFn = extern (Windows) void* function(ULONG, VehFn) nothrow @nogc;
alias CaptureFn = extern (Windows) USHORT function(ULONG, ULONG, void**, ULONG*) nothrow @nogc;
alias EnumModsFn = extern (Windows) BOOL function(HANDLE, HMODULE*, DWORD, DWORD*) nothrow @nogc;
struct ModInfo { void* base; DWORD size; void* entry; }
alias ModInfoFn = extern (Windows) BOOL function(HANDLE, HMODULE, ModInfo*, DWORD) nothrow @nogc;
alias ModNameFn = extern (Windows) DWORD function(HANDLE, HMODULE, char*, DWORD) nothrow @nogc;
struct ThreadBasicInfo
{
    int exitStatus;
    void* tebBase;
    void* uniqueProcess;
    void* uniqueThread;
    size_t affinityMask;
    int priority;
    int basePriority;
}
alias NtQitFn = extern (Windows) int function(HANDLE, int, void*, ULONG, ULONG*) nothrow @nogc;

struct Mod { size_t base, size; char[48] name = 0; }
__gshared Mod[512] g_mods;
__gshared int g_nmods = 0;
__gshared CaptureFn g_capture = null;
__gshared NtQitFn g_ntqit = null;
shared int g_events = 0;
enum maxEvents = 3;

// x64 TEB offsets: NT_TIB.StackBase, NT_TIB.StackLimit, DeallocationStack.
enum size_t tebStackBase = 0x08, tebStackLimit = 0x10, tebDeallocStack = 0x1478;

struct Out
{
    char[4096] buf = 0;
    size_t n = 0;

    void flush() nothrow @nogc
    {
        if (n == 0) return;
        DWORD written = 0;
        WriteFile(GetStdHandle(STD_ERROR_HANDLE), buf.ptr, cast(DWORD) n, &written, null);
        n = 0;
    }
    void s(const(char)[] str) nothrow @nogc
    {
        foreach (ch; str)
        {
            if (n == buf.length) flush();
            buf[n++] = ch;
        }
    }
    void hex(ulong v) nothrow @nogc
    {
        char[18] tmp = 0;
        size_t k = tmp.length;
        do { tmp[--k] = "0123456789abcdef"[v & 0xf]; v >>= 4; } while (v);
        tmp[--k] = 'x';
        tmp[--k] = '0';
        s(tmp[k .. $]);
    }
    void dec(long v) nothrow @nogc
    {
        char[21] tmp = 0;
        size_t k = tmp.length;
        immutable neg = v < 0;
        ulong u = neg ? -v : v;
        do { tmp[--k] = cast(char)('0' + u % 10); u /= 10; } while (u);
        if (neg) tmp[--k] = '-';
        s(tmp[k .. $]);
    }
    void nl() nothrow @nogc { s("\n"); flush(); }

    // "name+0xoff" for addresses inside a module captured at install time.
    void sym(size_t addr) nothrow @nogc
    {
        foreach (ref m; g_mods[0 .. g_nmods])
        {
            if (addr >= m.base && addr < m.base + m.size)
            {
                size_t len = 0;
                while (len < m.name.length && m.name[len]) ++len;
                s(m.name[0 .. len]);
                s("+");
                hex(addr - m.base);
                return;
            }
        }
        hex(addr);
    }
}

// TEB stack bounds of a thread, or false if they can't be read.
bool tebStack(HANDLE h, out size_t base, out size_t limit, out size_t dealloc) nothrow @nogc
{
    if (g_ntqit is null || h is null) return false;
    ThreadBasicInfo tbi;
    if (g_ntqit(h, 0, &tbi, cast(ULONG) tbi.sizeof, null) != 0 || tbi.tebBase is null)
        return false;
    auto teb = cast(ubyte*) tbi.tebBase;
    base = *cast(size_t*)(teb + tebStackBase);
    limit = *cast(size_t*)(teb + tebStackLimit);
    dealloc = *cast(size_t*)(teb + tebDeallocStack);
    return true;
}

void putTeb(ref Out o, HANDLE h) nothrow @nogc
{
    size_t base, limit, dealloc;
    if (tebStack(h, base, limit, dealloc))
    {
        o.s(" teb[dealloc="); o.hex(dealloc); o.s(" limit="); o.hex(limit);
        o.s(" base="); o.hex(base); o.s("]");
    }
    else
        o.s(" teb[?]");
}

extern (Windows) LONG vehHandler(EXCEPTION_POINTERS* ep) nothrow @nogc
{
    import core.atomic : atomicOp;

    auto rec = ep.ExceptionRecord;
    immutable code = cast(uint) rec.ExceptionCode;
    if (code != 0x80000001 && code != 0xC0000005)
        return EXCEPTION_CONTINUE_SEARCH;
    immutable ev = atomicOp!"+="(g_events, 1);
    if (ev > maxEvents)
        return EXCEPTION_CONTINUE_SEARCH;

    Out o;
    immutable size_t addr = rec.NumberParameters >= 2 ? rec.ExceptionInformation[1] : 0;
    auto ctx = ep.ContextRecord;
    o.s("VEH#"); o.dec(ev); o.s(" code="); o.hex(code);
    o.s(" tid="); o.hex(GetCurrentThreadId());
    o.s(" access="); o.dec(rec.NumberParameters >= 1 ? cast(long) rec.ExceptionInformation[0] : -1);
    o.s(" addr="); o.hex(addr);
    o.s(" rip="); o.sym(cast(size_t) ctx.Rip);
    o.s(" rsp="); o.hex(ctx.Rsp);
    putTeb(o, GetCurrentThread());
    o.nl();

    MEMORY_BASIC_INFORMATION mbi;
    if (VirtualQuery(cast(void*) addr, &mbi, mbi.sizeof))
    {
        o.s("VEH region base="); o.hex(cast(size_t) mbi.BaseAddress);
        o.s(" alloc_base="); o.hex(cast(size_t) mbi.AllocationBase);
        o.s(" size="); o.hex(mbi.RegionSize);
        o.s(" state="); o.hex(mbi.State);
        o.s(" protect="); o.hex(mbi.Protect);
        o.s(" type="); o.hex(mbi.Type);
        o.nl();
    }

    // Backtrace of the faulting thread, taken from inside the handler: the
    // first frames are the handler and the exception dispatcher.
    if (g_capture !is null)
    {
        void*[48] frames = null;
        immutable nf = g_capture(0, cast(ULONG) frames.length, frames.ptr, null);
        foreach (i; 0 .. nf)
        {
            o.s("VEH bt "); o.dec(i); o.s(" "); o.sym(cast(size_t) frames[i]); o.nl();
        }
    }

    // druntime's registered threads.
    int nthreads = 0;
    for (ThreadBase t = __traits(getMember, ThreadBase, "sm_tbeg"); t !is null;
         t = __traits(getMember, t, "next"))
    {
        ++nthreads;
        auto th = cast(Thread) cast(void*) t;    // unchecked: no runtime cast
        HANDLE h = __traits(getMember, th, "m_hndl");
        StackContext* m = &__traits(getMember, t, "m_main");
        StackContext* c = __traits(getMember, t, "m_curr");
        DWORD exitCode = 0;
        immutable gotExit = h !is null && GetExitCodeThread(h, &exitCode);
        o.s("VEH thread id="); o.hex(cast(size_t) __traits(getMember, t, "m_addr"));
        o.s(gotExit ? (exitCode == STILL_ACTIVE ? " running" : " EXITED") : " exit=?");
        o.s(" lock="); o.dec(__traits(getMember, t, "m_lock"));
        o.s(" main="); o.hex(cast(size_t) m);
        o.s(c is m ? "" : " CURR!=MAIN");
        o.s(" ctx[tstack="); o.hex(cast(size_t) m.tstack);
        o.s(" bstack="); o.hex(cast(size_t) m.bstack); o.s("]");
        putTeb(o, h);
        o.nl();
    }

    // The ranges the collector scans: every StackContext, with its owner.
    for (StackContext* c = __traits(getMember, ThreadBase, "sm_cbeg"); c !is null; c = c.next)
    {
        o.s("VEH context "); o.hex(cast(size_t) c);
        o.s(" tstack="); o.hex(cast(size_t) c.tstack);
        o.s(" bstack="); o.hex(cast(size_t) c.bstack);
        size_t owner = 0;
        for (ThreadBase t = __traits(getMember, ThreadBase, "sm_tbeg"); t !is null;
             t = __traits(getMember, t, "next"))
            if (&__traits(getMember, t, "m_main") is c)
                owner = cast(size_t) __traits(getMember, t, "m_addr");
        if (owner) { o.s(" owner="); o.hex(owner); }
        else o.s(" ORPHAN");
        if (addr >= cast(size_t) c.tstack && addr < cast(size_t) c.bstack)
            o.s(" <-- CONTAINS FAULT");
        o.nl();
    }
    o.s("VEH registered="); o.dec(nthreads);
    o.s(" about_to_start="); o.dec(cast(long) __traits(getMember, ThreadBase, "nAboutToStart"));
    o.nl();
    return EXCEPTION_CONTINUE_SEARCH;
}

void captureModules() nothrow @nogc
{
    auto k32 = GetModuleHandleA("kernel32.dll");
    auto enumMods = cast(EnumModsFn) GetProcAddress(k32, "K32EnumProcessModules");
    auto modInfo = cast(ModInfoFn) GetProcAddress(k32, "K32GetModuleInformation");
    auto modName = cast(ModNameFn) GetProcAddress(k32, "K32GetModuleBaseNameA");
    if (enumMods is null || modInfo is null || modName is null) return;
    HMODULE[512] mods = null;
    DWORD needed = 0;
    auto proc = GetCurrentProcess();
    if (!enumMods(proc, mods.ptr, cast(DWORD) mods.sizeof, &needed)) return;
    immutable count = needed / HMODULE.sizeof;
    g_nmods = 0;
    foreach (i; 0 .. count < mods.length ? count : mods.length)
    {
        ModInfo mi;
        if (!modInfo(proc, mods[i], &mi, cast(DWORD) mi.sizeof)) continue;
        auto m = &g_mods[g_nmods++];
        m.base = cast(size_t) mi.base;
        m.size = mi.size;
        modName(proc, mods[i], m.name.ptr, cast(DWORD)(m.name.length - 1));
    }
}

export extern (C) int volterra_debug_install_veh()
{
    auto k32 = GetModuleHandleA("kernel32.dll");
    auto ntdll = GetModuleHandleA("ntdll.dll");
    auto addVeh = cast(AddVehFn) GetProcAddress(k32, "AddVectoredExceptionHandler");
    g_capture = cast(CaptureFn) GetProcAddress(k32, "RtlCaptureStackBackTrace");
    g_ntqit = cast(NtQitFn) GetProcAddress(ntdll, "NtQueryInformationThread");
    if (addVeh is null) return 0;
    captureModules();
    return addVeh(1, &vehHandler) !is null ? 1 : 0;
}
