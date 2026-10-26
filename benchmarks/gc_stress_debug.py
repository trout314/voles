"""Stress driver for the intermittent Windows forced-GC hang.

Runs the tests/test_thread_safety.py interleaving -- one thread hammering
D GC collections while product-quadrature solves run on worker threads -- in
a series of subprocess rounds, each under a timeout so a hang costs one round,
not the job. The hammer thread checks druntime's registered-thread list before
every collection and logs, as it happens:

  DEAD     a thread registered with druntime that is no longer running (its
           stale stack range would be scanned by the next collection);
  RAISED   an exception out of gc_collect_d (on Windows, ctypes turns an SEH
           fault inside the collector into OSError, leaving the world stopped).

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
    from voles._dlang import gc_collect_d, debug_thread_stats_d

    faulthandler.enable()
    if debug_thread_stats_d() is None:
        sys.exit("loaded voles library has no volterra_debug_thread_stats export")

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


def _parent(args):
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
            out = ((e.stdout or b"").decode(errors="replace")
                   + (e.stderr or b"").decode(errors="replace"))
            rc = None
        dt = time.monotonic() - t0
        summary = next((ln[8:] for ln in out.splitlines()
                        if ln.startswith("SUMMARY ")), None)
        s = json.loads(summary) if summary else {}
        if rc is None:
            status = "hang"
        elif rc != 0:
            status = "crash"
        elif s.get("dead_events") or s.get("raised") or s.get("mismatches"):
            status = "anomaly"
        else:
            status = "ok"
        tally[status] += 1
        print(f"round {r:3d}  {status:7s}  rc={rc}  {dt:6.1f}s  {summary or ''}",
              flush=True)
        if status != "ok":
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
