"""Threaded solves must match serial ones bit for bit.

The D extension makes no GC allocations (its entry points are @nogc), so the
Python threads that call it -- the matrix fan-out's per-call pool, or a
user's own threads -- run it without registering with the D runtime. These
tests drive it from fresh thread pools and from user threads and require
exactly the results of single-threaded solves.
"""
from concurrent.futures import ThreadPoolExecutor

import numpy as np
from voles import solve_VIDE, solve_VIE_1, solve_VIE_2
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


def _solve(d, g, quadrature="collocation"):
    return solve_VIE_2(
        kernel_values=d["kernel"], g_values=g, time_step=d["time_step"],
        coll_divs=d["coll_divs"], coll_choices=d["coll_choices"],
        quadrature=quadrature, show_warnings=False)


def test_matrix_fanout_matches_serial_columns():
    """The matrix path solves its columns on a fresh thread pool per call;
    each column must equal the same column solved alone, on this thread."""
    d, g_mat, exact_mat = _coupled_matrix_problem(m_cols=8)
    for quad in ("collocation", "product"):
        serial = np.stack([_solve(d, np.ascontiguousarray(g_mat[:, :, j]), quad)
                           for j in range(g_mat.shape[2])], axis=-1)
        for _ in range(5):
            assert np.array_equal(_solve(d, g_mat, quad), serial)
    assert np.max(np.abs(serial - exact_mat)) < TOLERANCE


def test_independent_solves_from_user_threads():
    """User-driven threading: independent solves from one Python thread pool,
    on both the compile-time-d and the runtime-d (d > 8) vector drivers."""
    rng = np.random.default_rng(1)
    N, ts = 241, 0.005
    t = np.arange(N) * ts
    jobs = []
    for dim in (2, 10):
        M = rng.standard_normal((dim, dim)) * (0.3 / np.sqrt(dim))
        K = np.eye(dim)[None] + np.exp(-t)[:, None, None] * M[None]
        for _ in range(4):
            g = np.sin(2 * t[:, None] + rng.uniform(0, 1, dim)) + t[:, None]
            jobs.append((K, g))
    run = lambda job: solve_VIE_2(kernel_values=job[0], g_values=job[1],
                                  time_step=ts, quadrature="collocation",
                                  show_warnings=False)
    serial = [run(job) for job in jobs]
    with ThreadPoolExecutor(max_workers=6) as ex:
        for _ in range(5):
            for r, s in zip(ex.map(run, jobs), serial):
                assert np.array_equal(r, s)


def test_product_block_drivers_on_fresh_threads():
    """The product-quadrature block drivers (VIE-1, continuous VIE-1, VIE-2,
    VIDE) via the matrix fan-out, which starts new threads on every call:
    repeated solves must reproduce the first one exactly."""
    rng = np.random.default_rng(0)
    N, d, m = 161, 2, 4
    t = np.arange(N) * 0.01
    K = np.exp(-t)[:, None, None] * rng.standard_normal((d, d)) * 0.3 + np.eye(d)
    G = rng.standard_normal((N, d, m))
    G1 = G - G[0]
    calls = [
        lambda: solve_VIE_2(kernel_values=K, g_values=G, time_step=0.01,
                            quadrature="product", show_warnings=False),
        lambda: solve_VIE_1(kernel_values=K, g_values=G1, time_step=0.01,
                            quadrature="product", show_warnings=False),
        lambda: solve_VIE_1(kernel_values=K, g_values=G1, time_step=0.01,
                            soln_init_value=np.zeros((d, m)), force_continuous=True,
                            quadrature="product", show_warnings=False),
        lambda: solve_VIDE(kernel_values=K, g_values=G, soln_init_value=np.ones((d, m)),
                           time_step=0.01, quadrature="product", show_warnings=False),
    ]
    first = [c() for c in calls]
    for _ in range(8):
        for c, f in zip(calls, first):
            assert np.array_equal(c(), f)
