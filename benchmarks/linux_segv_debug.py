"""Crash hunter for the rare Linux segfault in threaded matrix solves.

tests/test_complex.py::test_complex_matrix_valued_d49_workflow_smoke has
segfaulted twice in CI (Aug 2026, and 2026-10-28 on 7eebca6), with the pool
workers inside the D extension each time. This driver runs that test's body
in a loop inside gdb, in repeated sessions until a wall-clock budget runs
out. On a fatal signal gdb dumps every thread's native backtrace (the
debug-built extension has symbols), the faulting instruction and registers;
the driver prints each dump and a tally.

druntime suspends threads for collection with SIGRTMIN and SIGRTMIN+1, so gdb
passes the real-time signals through without stopping.

Usage (Linux, gdb on PATH):
  python benchmarks/linux_segv_debug.py --minutes 40 --iters 200
"""
import argparse
import json
import os
import re
import subprocess
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
FATAL = re.compile(r"received signal (SIGSEGV|SIGBUS|SIGABRT|SIGILL|SIGFPE)")

GDB_CMDS = [
    "set pagination off",
    "set print thread-events off",
    "set print inferior-events off",
    "handle SIGUSR1 SIGUSR2 SIGXCPU SIGPWR nostop noprint pass",
    "handle SIG32 SIG33 SIG34 SIG35 SIG36 SIG37 SIG38 SIG39 SIG40 nostop noprint pass",
    "run",
    # Reached only if the program stopped (fatal signal); after a normal
    # exit these just report "The program is not being run".
    "info threads",
    "thread apply all bt 40",
    "info registers rip rsp rbp rax rdi rsi",
    "x/8i $pc - 16",
    "info sharedlibrary volterra",
    "info proc mappings",
]


def _child(iters):
    sys.path.insert(0, os.path.join(HERE, "..", "tests"))
    from test_complex import test_complex_matrix_valued_d49_workflow_smoke as body
    t0 = time.monotonic()
    for _ in range(iters):
        body()
    print(f"CHILD_OK iters={iters} {time.monotonic() - t0:.1f}s", flush=True)


def _session(args):
    cmd = ["gdb", "-q", "-nx", "-batch"]
    for c in GDB_CMDS:
        cmd += ["-ex", c]
    cmd += ["--args", sys.executable, os.path.abspath(__file__),
            "--child", "--iters", str(args.iters)]
    try:
        p = subprocess.run(cmd, capture_output=True, text=True,
                           timeout=args.session_timeout)
        out = p.stdout + p.stderr
        timed_out = False
    except subprocess.TimeoutExpired as e:
        out = "".join(s.decode(errors="replace") if isinstance(s, bytes) else s
                      for s in (e.stdout or "", e.stderr or ""))
        timed_out = True
    m = FATAL.search(out)
    if m:
        return m[1], out
    if timed_out:
        return "hang", out
    if "CHILD_OK" in out:
        return "ok", out
    return "error", out


def _parent(args):
    deadline = time.monotonic() + 60 * args.minutes
    tally, dumps, sessions = {}, 0, 0
    while time.monotonic() < deadline:
        t0 = time.monotonic()
        status, out = _session(args)
        sessions += 1
        tally[status] = tally.get(status, 0) + 1
        print(f"session {sessions:4d}  {status:7s}  {time.monotonic() - t0:6.1f}s",
              flush=True)
        if status != "ok" and dumps < args.max_dumps:
            dumps += 1
            # The mappings table is long; keep it but put it last.
            print("  ---- gdb output ----")
            for ln in out.splitlines():
                print("  " + ln)
            print("  --------------------", flush=True)
    iters_ok = tally.get("ok", 0) * args.iters
    print("TALLY " + json.dumps({"sessions": sessions, "iters_ok": iters_ok,
                                 **tally}), flush=True)
    return 0 if set(tally) <= {"ok"} else 1


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--minutes", type=float, default=40.0,
                    help="wall-clock budget for the whole hunt")
    ap.add_argument("--iters", type=int, default=200,
                    help="test-body iterations per gdb session")
    ap.add_argument("--session-timeout", type=float, default=900.0)
    ap.add_argument("--max-dumps", type=int, default=3)
    ap.add_argument("--child", action="store_true", help=argparse.SUPPRESS)
    args = ap.parse_args()
    if args.child:
        _child(args.iters)
        return 0
    return _parent(args)


if __name__ == "__main__":
    sys.exit(main())
