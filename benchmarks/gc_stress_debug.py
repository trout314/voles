"""Stress driver for the intermittent Windows forced-GC hang.

Runs the tests/test_thread_safety.py interleaving -- one thread hammering
D GC collections while product-quadrature solves run on worker threads -- in
a series of subprocess rounds, each under a timeout so a hang costs one round,
not the job. The hammer thread checks druntime's registered-thread list before
every collection and logs, as it happens:

  DEAD     a thread registered with druntime that is no longer running.
           Informational only: an exiting thread shows up briefly before its
           detach hook runs, and druntime's suspend() drops such threads
           instead of scanning them, so DEAD alone does not fail a round;
  RAISED   an exception out of gc_collect_d (on Windows, ctypes turns an SEH
           fault inside the collector into OSError, leaving the world stopped).

On Windows each round also installs the D extension's diagnostic vectored
exception handler, which dumps "VEH ..." lines at a guard-page fault or access
violation: the fault, its memory region, a backtrace, and druntime's thread
and stack-context lists. The parent symbolizes the backtrace's module+offset
entries with DbgHelp (using volterra_dlang.pdb if it sits next to the DLL).

Modes:
  matrix   matrix-valued solves; voles fans the columns out over a fresh
           ThreadPoolExecutor per call (heavy thread churn).
  pool     the same columns solved one at a time from one persistent user
           pool (no churn).

Usage:
  python benchmarks/gc_stress_debug.py --mode matrix --rounds 40
"""
import argparse
import faulthandler
import json
import os
import re
import subprocess
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor


def _problem():
    import numpy as np
    rng = np.random.default_rng(0)
    N, d, m = 161, 2, 8
    t = np.arange(N) * 0.01
    K = np.exp(-t)[:, None, None] * rng.standard_normal((d, d)) * 0.3 + np.eye(d)
    G = rng.standard_normal((N, d, m))
    return K, G


def _child(mode, solves):
    import numpy as np
    from voles import solve_VIE_2
    from voles._dlang import gc_collect_d, debug_thread_stats_d, debug_install_veh_d

    faulthandler.enable()
    if debug_thread_stats_d() is None:
        sys.exit("loaded voles library has no volterra_debug_thread_stats export")
    # After faulthandler.enable(): both register first-in-chain, so the last
    # one installed runs first.
    if sys.platform == "win32" and not debug_install_veh_d():
        sys.exit("could not install the diagnostic vectored exception handler")

    def log(msg):
        print(f"[{time.monotonic():.3f}] {msg}", flush=True)

    K, G = _problem()

    def solve(g):
        return solve_VIE_2(kernel_values=K, g_values=g, time_step=0.01,
                           quadrature="product", show_warnings=False)

    quiet = solve(G)
    stop = threading.Event()
    stats = {"collections": 0, "dead_events": 0, "max_dead": 0,
             "max_registered": 0, "raised": 0}

    def hammer():
        while not stop.is_set():
            total, n_dead, ids = debug_thread_stats_d()
            stats["max_registered"] = max(stats["max_registered"], total)
            if n_dead:
                stats["dead_events"] += 1
                stats["max_dead"] = max(stats["max_dead"], n_dead)
                log(f"DEAD registered={total} dead={n_dead} ids={[hex(i) for i in ids]}")
            try:
                gc_collect_d()
            except BaseException as e:      # noqa: BLE001 -- want everything
                stats["raised"] += 1
                log(f"RAISED {type(e).__name__}: {e} (registered={total} dead={n_dead})")
                return
            stats["collections"] += 1

    h = threading.Thread(target=hammer, daemon=True)
    h.start()
    mismatches = 0
    if mode == "matrix":
        for _ in range(solves):
            mismatches += not np.array_equal(solve(G), quiet)
    else:
        cols = [np.ascontiguousarray(G[:, :, j]) for j in range(G.shape[2])]
        with ThreadPoolExecutor(max_workers=4) as ex:
            for _ in range(solves):
                res = np.stack(list(ex.map(solve, cols)), axis=-1)
                mismatches += not np.array_equal(res, quiet)
    stop.set()
    h.join(timeout=30)
    stats["mismatches"] = mismatches
    print("SUMMARY " + json.dumps(stats), flush=True)


_MODOFF = re.compile(r"([\w.\-]+\.(?:dll|pyd|exe))\+0x([0-9a-f]+)", re.I)


def _make_symbolizer():
    """Return f(module_name, offset) -> symbol string or None (Windows only).

    Resolves against this process's own copies of the modules: importing
    voles loads volterra_dlang.dll (and numpy) here too."""
    if sys.platform != "win32":
        return None
    import ctypes
    import voles._dlang as vd

    class SymbolInfo(ctypes.Structure):
        _fields_ = [("SizeOfStruct", ctypes.c_ulong), ("TypeIndex", ctypes.c_ulong),
                    ("Reserved", ctypes.c_uint64 * 2), ("Index", ctypes.c_ulong),
                    ("Size", ctypes.c_ulong), ("ModBase", ctypes.c_uint64),
                    ("Flags", ctypes.c_ulong), ("Value", ctypes.c_uint64),
                    ("Address", ctypes.c_uint64), ("Register", ctypes.c_ulong),
                    ("Scope", ctypes.c_ulong), ("Tag", ctypes.c_ulong),
                    ("NameLen", ctypes.c_ulong), ("MaxNameLen", ctypes.c_ulong),
                    ("Name", ctypes.c_char * 1024)]

    k32 = ctypes.WinDLL("kernel32")
    k32.GetCurrentProcess.restype = ctypes.c_void_p
    k32.GetModuleHandleW.restype = ctypes.c_void_p
    k32.GetModuleHandleW.argtypes = [ctypes.c_wchar_p]
    dbg = ctypes.WinDLL("dbghelp")
    dbg.SymInitialize.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_bool]
    dbg.SymFromAddr.argtypes = [ctypes.c_void_p, ctypes.c_uint64,
                                ctypes.POINTER(ctypes.c_uint64), ctypes.c_void_p]
    proc = k32.GetCurrentProcess()
    dbg.SymSetOptions(0x2 | 0x4 | 0x10)       # UNDNAME | DEFERRED_LOADS | LOAD_LINES
    search = os.path.dirname(os.path.abspath(vd.__file__)).encode()
    if not dbg.SymInitialize(proc, search, True):
        return None

    def resolve(mod, off):
        base = k32.GetModuleHandleW(mod)
        if not base:
            return None
        si = SymbolInfo()
        si.SizeOfStruct = 88                  # sizeof(SYMBOL_INFO) with Name[1]
        si.MaxNameLen = 1023
        disp = ctypes.c_uint64(0)
        if not dbg.SymFromAddr(proc, base + off, ctypes.byref(disp), ctypes.byref(si)):
            return None
        return f"{si.Name.decode(errors='replace')}+{disp.value:#x}"
    return resolve


def _symbolize(out, resolve):
    """Append the resolved symbol to each module+offset in VEH lines."""
    if resolve is None:
        return out

    def sub(m):
        sym = resolve(m[1], int(m[2], 16))
        return f"{m[0]} [{sym}]" if sym else m[0]
    return "\n".join(_MODOFF.sub(sub, ln) if ln.startswith("VEH") else ln
                     for ln in out.splitlines())


def _parent(args):
    try:
        resolve = _make_symbolizer()
    except Exception as e:                    # noqa: BLE001 -- diagnostics only
        print(f"symbolizer unavailable: {e!r}", flush=True)
        resolve = None
    tally = {"ok": 0, "hang": 0, "crash": 0, "anomaly": 0}
    for r in range(args.rounds):
        cmd = [sys.executable, "-X", "faulthandler", os.path.abspath(__file__),
               "--child", "--mode", args.mode, "--solves", str(args.solves)]
        t0 = time.monotonic()
        try:
            p = subprocess.run(cmd, capture_output=True, text=True,
                               timeout=args.round_timeout)
            out, rc = p.stdout + p.stderr, p.returncode
        except subprocess.TimeoutExpired as e:
            # The partial output is bytes on some platforms even with text=True.
            out = "".join(s.decode(errors="replace") if isinstance(s, bytes) else s
                          for s in (e.stdout or "", e.stderr or ""))
            rc = None
        dt = time.monotonic() - t0
        summary = next((ln[8:] for ln in out.splitlines()
                        if ln.startswith("SUMMARY ")), None)
        s = json.loads(summary) if summary else {}
        if rc is None:
            status = "hang"
        elif rc != 0:
            status = "crash"
        elif s.get("raised") or s.get("mismatches"):
            status = "anomaly"
        else:
            status = "ok"
        tally[status] += 1
        print(f"round {r:3d}  {status:7s}  rc={rc}  {dt:6.1f}s  {summary or ''}",
              flush=True)
        if status != "ok":
            try:
                out = _symbolize(out, resolve)
            except Exception as e:            # noqa: BLE001 -- diagnostics only
                out += f"\n(symbolization failed: {e!r})"
            print("  ---- round output ----")
            for ln in out.splitlines():
                print("  " + ln)
            print("  ----------------------", flush=True)
    print("TALLY " + json.dumps(tally), flush=True)
    return 1 if tally["ok"] != args.rounds else 0


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--mode", choices=["matrix", "pool"], default="matrix")
    ap.add_argument("--rounds", type=int, default=40)
    ap.add_argument("--solves", type=int, default=20,
                    help="matrix solves per round")
    ap.add_argument("--round-timeout", type=float, default=120.0)
    ap.add_argument("--child", action="store_true", help=argparse.SUPPRESS)
    args = ap.parse_args()
    if args.child:
        _child(args.mode, args.solves)
        return 0
    return _parent(args)


if __name__ == "__main__":
    sys.exit(main())
