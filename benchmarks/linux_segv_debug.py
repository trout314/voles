"""Crash hunter for the rare Linux segfault in threaded matrix solves.

tests/test_complex.py::test_complex_matrix_valued_d49_workflow_smoke has
segfaulted in CI three times (Aug 2026; twice on 2026-10-28), each time during
a full ``pytest tests/`` run with the pool workers inside the D extension.

Runs the workload repeatedly at full speed until a wall-clock budget is used
up, and analyses crashes post mortem: the workflow enables core dumps, and
after a fatal signal the driver runs gdb on the core (the debug-built
extension has symbols) to dump every thread's native backtrace, the faulting
instruction and registers. (An earlier version ran the loop under gdb, which
was ~7x slower and perturbed the thread timing.)

Modes:
  suite   the full ``pytest tests/`` run, as CI runs it -- the context all
          three crashes happened in;
  body    the d49 test's body looped in a fresh process (control: does the
          crash need state left by the earlier tests?);
  first   one d49 solve per fresh process (crashes cluster on a process's
          first large threaded solve), preceded by a check of the hypothesis
          below; the parent tallies prediction against outcome.

Hypothesis under test: with druntime linked statically into a shared library,
LDC computes a thread's TLS range as [fs - memsz, fs) (fs = thread pointer,
memsz = this library's PT_TLS size), which is right only for an executable's
TLS. For a dlopen'ed library that range is unrelated memory; for the main
thread it can run below the start of the startup TLS allocation into
unmapped memory, and the collector's TLS scan then segfaults.

Usage (Linux; core dumps enabled; gdb on PATH):
  python benchmarks/linux_segv_debug.py --mode suite --core-dir /tmp/cores
"""
import argparse
import glob
import json
import os
import subprocess
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

GDB_CMDS = [
    "set pagination off",
    "info threads",
    "thread apply all bt 40",
    # Frame 5 is the frame interrupted by the fault (0-3: faulthandler's
    # re-raise, 4: the signal trampoline).
    "frame 5",
    "info registers",
    "x/4i $pc",
    "info sharedlibrary volterra",
]


def _pt_tls(path):
    """(memsz, align) of a 64-bit ELF file's PT_TLS segment."""
    import struct
    with open(path, "rb") as f:
        data = f.read(1 << 16)
    phoff, = struct.unpack_from("<Q", data, 0x20)
    phentsize, phnum = struct.unpack_from("<HH", data, 0x36)
    for i in range(phnum):
        ptype, _, _, _, _, _, memsz, align = struct.unpack_from(
            "<IIQQQQQQ", data, phoff + i * phentsize)
        if ptype == 7:
            return memsz, max(align, 1)
    return 0, 1


def _tls_check():
    """Print whether the main thread's TLS range as LDC computes it is mapped."""
    import ctypes
    import voles._dlang as vd
    libc = ctypes.CDLL(None)
    libc.syscall.restype = ctypes.c_long
    fs = ctypes.c_ulong(0)
    libc.syscall(158, 0x1003, ctypes.byref(fs))   # arch_prctl(ARCH_GET_FS)
    fs = fs.value
    memsz, align = _pt_tls(vd._lib._name)
    start = (fs - memsz) & ~(align - 1)
    regions = []
    with open("/proc/self/maps") as f:
        for ln in f:
            parts = ln.split()
            lo, hi = (int(x, 16) for x in parts[0].split("-"))
            regions.append((lo, hi, parts[1], parts[5] if len(parts) > 5 else ""))

    def region(addr):
        return next((r for r in regions if r[0] <= addr < r[1]), None)

    # Walk [start, fs) through readable mappings.
    p, mapped = start, True
    while p < fs:
        r = region(p)
        if r is None or "r" not in r[2]:
            mapped = False
            break
        p = r[1]
    fr, sr = region(fs), region(start)
    desc = lambda r: f"{r[0]:#x}-{r[1]:#x} {r[2]} {r[3] or '[anon]'}" if r else "UNMAPPED"
    print(f"TLSCHECK mapped={mapped} fs={fs:#x} start={start:#x} memsz={memsz} "
          f"fs_offset_in_region={fs - fr[0] if fr else -1} "
          f"fs_region=[{desc(fr)}] start_region=[{desc(sr)}]", flush=True)


def _child(iters, first):
    if first:
        _tls_check()
    sys.path.insert(0, os.path.join(ROOT, "tests"))
    from test_complex import test_complex_matrix_valued_d49_workflow_smoke as body
    t0 = time.monotonic()
    for _ in range(iters):
        body()
    print(f"CHILD_OK iters={iters} {time.monotonic() - t0:.1f}s", flush=True)


def _workload(args):
    if args.mode == "suite":
        return [sys.executable, "-m", "pytest", "tests/", "-x", "-q",
                "-p", "no:cacheprovider", "--timeout=300"]
    if args.mode == "first":
        return [sys.executable, "-X", "faulthandler", os.path.abspath(__file__),
                "--child", "--first", "--iters", "1"]
    return [sys.executable, "-X", "faulthandler", os.path.abspath(__file__),
            "--child", "--iters", str(args.iters)]


def _cores(core_dir):
    return set(glob.glob(os.path.join(core_dir, "core*"))) if core_dir else set()


def _analyse(core):
    cmd = ["gdb", "-q", "-nx", "-batch"]
    for c in GDB_CMDS:
        cmd += ["-ex", c]
    cmd += [sys.executable, core]
    try:
        p = subprocess.run(cmd, capture_output=True, text=True, timeout=600)
        return p.stdout + p.stderr
    except (OSError, subprocess.TimeoutExpired) as e:
        return f"(gdb failed: {e!r})"


def _parent(args):
    deadline = time.monotonic() + 60 * args.minutes
    tally, dumps, runs = {}, 0, 0
    table = {}                          # (mapped, status) -> count, mode first
    while time.monotonic() < deadline:
        before = _cores(args.core_dir)
        t0 = time.monotonic()
        try:
            p = subprocess.run(_workload(args), cwd=ROOT, capture_output=True,
                               text=True, timeout=args.run_timeout)
            rc, out = p.returncode, p.stdout + p.stderr
        except subprocess.TimeoutExpired as e:
            rc = None
            out = "".join(s.decode(errors="replace") if isinstance(s, bytes) else s
                          for s in (e.stdout or "", e.stderr or ""))
        runs += 1
        if rc is None:
            status = "hang"
        elif rc < 0:
            status = f"signal{-rc}"
        elif rc == 0:
            status = "ok"
        else:
            status = "fail"             # test failure, or a crash in pytest's
                                        # own process that exited nonzero
        tally[status] = tally.get(status, 0) + 1
        check = next((ln for ln in out.splitlines() if ln.startswith("TLSCHECK")), None)
        if check:
            key = f"mapped={check.split()[1].split('=')[1]} {status}"
            table[key] = table.get(key, 0) + 1
            if status != "ok" or table[key] <= 3:
                print("  " + check, flush=True)
        new_cores = sorted(_cores(args.core_dir) - before, key=os.path.getmtime)
        print(f"run {runs:4d}  {status:9s}  rc={rc}  {time.monotonic() - t0:6.1f}s"
              f"  cores={len(new_cores)}", flush=True)
        if status != "ok" and dumps < args.max_dumps:
            dumps += 1
            print("  ---- workload output (tail) ----")
            for ln in out.splitlines()[-80:]:
                print("  " + ln)
            for core in new_cores[:1]:
                print(f"  ---- gdb on {os.path.basename(core)} ----")
                for ln in _analyse(core).splitlines():
                    print("  " + ln)
            print("  -------------------------------", flush=True)
        for core in new_cores:          # cores are large; keep the disk free
            os.remove(core)
    print("TALLY " + json.dumps({"mode": args.mode, "runs": runs, **tally}),
          flush=True)
    if table:
        print("TLSTABLE " + json.dumps(table), flush=True)
    return 0 if set(tally) <= {"ok"} else 1


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--mode", choices=["suite", "body", "first"], default="suite")
    ap.add_argument("--minutes", type=float, default=40.0,
                    help="wall-clock budget for the whole hunt")
    ap.add_argument("--iters", type=int, default=200,
                    help="test-body iterations per process (body mode)")
    ap.add_argument("--run-timeout", type=float, default=900.0)
    ap.add_argument("--core-dir", default=None,
                    help="directory kernel.core_pattern writes cores to")
    ap.add_argument("--max-dumps", type=int, default=3)
    ap.add_argument("--child", action="store_true", help=argparse.SUPPRESS)
    ap.add_argument("--first", action="store_true", help=argparse.SUPPRESS)
    args = ap.parse_args()
    if args.child:
        _child(args.iters, args.first)
        return 0
    return _parent(args)


if __name__ == "__main__":
    sys.exit(main())
