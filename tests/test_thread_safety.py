"""Thread-safety regression tests for the D extension's GC integration.

The solver entry points allocate from the D GC and are called from Python
worker threads (the matrix path fans columns out via ThreadPoolExecutor).
druntime's stop-the-world collector only suspends and stack-scans threads
registered with the runtime, so every entry point attaches the calling
thread for the duration of the call (GCThreadGuard in volterra_solvers.d).

These tests force the dangerous interleaving deliberately: one thread hammers
volterra_gc_collect() -- a forced collection from a foreign thread -- while
other threads run solves. Without the attach guards this exercises exactly
the unscanned-roots / mutation-during-mark failure modes (nondeterministic
crashes or corrupted results); with them it must be safe and deterministic.
"""
import threading
from concurrent.futures import ThreadPoolExecutor

import numpy as np
from voles import solve_VIE_2
from voles._dlang import gc_collect_d
from conftest import (TOLERANCE, make_coupled_data_nd,
                      VIE2_SPEC_SMOOTH, VIE2_SPEC_RATIONAL)


def _coupled_matrix_problem(m_cols):
    """d=2 coupled VIE-2 fixture with m_cols scaled right-hand sides.

    The equation is linear, so scaling g scales the exact solution: column j
    uses g * c_j and has exact solution exact * c_j."""
    d = make_coupled_data_nd(
        [VIE2_SPEC_SMOOTH, VIE2_SPEC_RATIONAL], [[1, 1], [1, -1]],
        time_step=0.005, coll_divs=3, coll_choices=[0, 1, 2, 3],
        num_blocks=80)
    scales = 1.0 + 0.25 * np.arange(m_cols)
    g_mat = d["g"][:, :, None] * scales[None, None, :]        # (N, d, m)
    exact_mat = d["exact"][:, :, None] * scales[None, None, :]
    return d, g_mat, exact_mat


def _solve(d, g_mat):
    return solve_VIE_2(
        kernel_values=d["kernel"], g_values=g_mat,
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"], show_warnings=False)


class _GCHammer:
    """Background thread forcing D GC collections in a tight loop."""

    def __enter__(self):
        self._stop = threading.Event()
        self._thread = threading.Thread(target=self._run, daemon=True)
        self._thread.start()
        return self

    def _run(self):
        while not self._stop.is_set():
            gc_collect_d()

    def __exit__(self, *exc):
        self._stop.set()
        self._thread.join(timeout=30)


def test_matrix_solve_under_forced_gc():
    """Matrix columns solve in parallel worker threads while a foreign thread
    forces collections: results must be deterministic and correct."""
    d, g_mat, exact_mat = _coupled_matrix_problem(m_cols=8)
    quiet = _solve(d, g_mat)
    assert np.max(np.abs(quiet - exact_mat)) < TOLERANCE

    with _GCHammer():
        results = [_solve(d, g_mat) for _ in range(10)]
    for r in results:
        assert np.array_equal(r, quiet)


def test_independent_solves_from_user_threads_under_forced_gc():
    """User-driven threading (independent solves from a Python thread pool,
    not the internal matrix fan-out) under forced collections."""
    d, g_mat, exact_mat = _coupled_matrix_problem(m_cols=6)
    g_cols = [np.ascontiguousarray(g_mat[:, :, j]) for j in range(6)]
    quiet = [_solve(d, g) for g in g_cols]

    with _GCHammer():
        with ThreadPoolExecutor(max_workers=6) as ex:
            for _ in range(5):
                results = list(ex.map(lambda g: _solve(d, g), g_cols))
                for r, q in zip(results, quiet):
                    assert np.array_equal(r, q)
