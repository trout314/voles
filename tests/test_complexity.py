"""Verify that solver runtime scales as O(N²) for scalar and O(N²d²) for vector.

N = number of input points, d = vector/matrix dimension.

Only confirmed-convergent collocation settings are used.  The assertion
tolerance is a factor of 2.5 in each direction to absorb measurement noise
and OS scheduling jitter.  Inputs are large enough (each solve takes O(1 ms))
that computation dominates ctypes/Python call overhead.
"""

import time

import numpy as np

from volterra_equation_solvers import solve_VIE_1, solve_VIE_2, solve_VIDE

SLACK = 2.5
N_REPS = 5


# ─── Timing helper ────────────────────────────────────────────────────────────

def _time_fn(fn, n_reps=N_REPS):
    fn()  # warm-up run
    t0 = time.perf_counter()
    for _ in range(n_reps):
        fn()
    return (time.perf_counter() - t0) / n_reps


# ─── Scalar problem builders ──────────────────────────────────────────────────

def _vie2_scalar(N):
    h = 1.0 / (N - 1)
    t = np.arange(N) * h
    return dict(kernel_values=np.exp(-t),
                g_values=np.sin(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t)),
                time_step=h, show_warnings=False)


def _vie1_scalar(N):
    h = 1.0 / (N - 1)
    t = np.arange(N) * h
    g = np.sin(t)
    g[0] = 0.0
    return dict(kernel_values=np.exp(t), g_values=g,
                time_step=h, show_warnings=False)


def _vide_scalar(N):
    h = 1.0 / (N - 1)
    t = np.arange(N) * h
    return dict(kernel_values=np.exp(-t),
                a_values=np.full(N, -1.0),
                g_values=1.5 * np.cos(t) + 0.5 * np.sin(t) - 0.5 * np.exp(-t),
                soln_init_value=0.0, time_step=h, show_warnings=False)


# ─── Vector problem builder (d=2, two decoupled scalar equations) ─────────────

def _vie2_vec(N, d):
    """VIE-2 with d-dimensional diagonal kernel: K(t) = exp(-t) * I_d."""
    h = 1.0 / (N - 1)
    t = np.arange(N) * h
    scalar_k = np.exp(-t)
    scalar_g = np.sin(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t))
    kernel = np.zeros((N, d, d))
    for i in range(d):
        kernel[:, i, i] = scalar_k
    g = np.tile(scalar_g[:, None], (1, d))
    return dict(kernel_values=kernel, g_values=g, time_step=h, show_warnings=False)


def _vide_vec(N, d):
    """VIDE with d-dimensional diagonal kernel and coefficient matrix."""
    h = 1.0 / (N - 1)
    t = np.arange(N) * h
    scalar_k = np.exp(-t)
    scalar_a = np.full(N, -1.0)
    scalar_g = 1.5 * np.cos(t) + 0.5 * np.sin(t) - 0.5 * np.exp(-t)
    kernel = np.zeros((N, d, d))
    a = np.zeros((N, d, d))
    for i in range(d):
        kernel[:, i, i] = scalar_k
        a[:, i, i] = scalar_a
    g = np.tile(scalar_g[:, None], (1, d))
    init = np.zeros(d)
    return dict(kernel_values=kernel, a_values=a, g_values=g,
                soln_init_value=init, time_step=h, show_warnings=False)


# ─── O(N²) tests ──────────────────────────────────────────────────────────────
# Use coll_divs=2 (valid sizes: N = 4k+1).
# N_SMALL = 4*800+1 = 3201, N_LARGE = 4*1600+1 = 6401 → ratio ≈ 2 → predicted 4×.

_N_SMALL = 4 * 800 + 1
_N_LARGE = 4 * 1600 + 1
_PREDICTED_N2 = (_N_LARGE / _N_SMALL) ** 2   # ≈ 4.0
_KW = dict(coll_divs=2, coll_choices=[0, 1, 2])


def test_vie2_n_squared():
    ps, pl = _vie2_scalar(_N_SMALL), _vie2_scalar(_N_LARGE)
    t_s = _time_fn(lambda: solve_VIE_2(**ps, **_KW))
    t_l = _time_fn(lambda: solve_VIE_2(**pl, **_KW))
    ratio = t_l / t_s
    lo, hi = _PREDICTED_N2 / SLACK, _PREDICTED_N2 * SLACK
    assert lo < ratio < hi, (
        f"VIE-2 N² scaling: ratio {ratio:.2f} not in [{lo:.2f}, {hi:.2f}]"
    )


def test_vie1_n_squared():
    ps, pl = _vie1_scalar(_N_SMALL), _vie1_scalar(_N_LARGE)
    kw = dict(coll_divs=2, coll_choices=[1, 2])
    t_s = _time_fn(lambda: solve_VIE_1(**ps, **kw))
    t_l = _time_fn(lambda: solve_VIE_1(**pl, **kw))
    ratio = t_l / t_s
    lo, hi = _PREDICTED_N2 / SLACK, _PREDICTED_N2 * SLACK
    assert lo < ratio < hi, (
        f"VIE-1 N² scaling: ratio {ratio:.2f} not in [{lo:.2f}, {hi:.2f}]"
    )


def test_vide_n_squared():
    ps, pl = _vide_scalar(_N_SMALL), _vide_scalar(_N_LARGE)
    t_s = _time_fn(lambda: solve_VIDE(**ps, **_KW))
    t_l = _time_fn(lambda: solve_VIDE(**pl, **_KW))
    ratio = t_l / t_s
    lo, hi = _PREDICTED_N2 / SLACK, _PREDICTED_N2 * SLACK
    assert lo < ratio < hi, (
        f"VIDE N² scaling: ratio {ratio:.2f} not in [{lo:.2f}, {hi:.2f}]"
    )


# ─── O(d²) tests ──────────────────────────────────────────────────────────────
# Fix N = 4*800+1 = 3201, coll_divs=2.  Compare d=1 (scalar) vs d=2 (vector).
# O(N²d²): t(d=2)/t(d=1) = 4.

_N_D = 4 * 800 + 1
_PREDICTED_D2 = 2.0 ** 2   # 4.0


def test_vie2_d_squared():
    p1 = _vie2_scalar(_N_D)
    p2 = _vie2_vec(_N_D, d=2)
    t1 = _time_fn(lambda: solve_VIE_2(**p1, **_KW))
    t2 = _time_fn(lambda: solve_VIE_2(**p2, **_KW))
    ratio = t2 / t1
    lo, hi = _PREDICTED_D2 / SLACK, _PREDICTED_D2 * SLACK
    assert lo < ratio < hi, (
        f"VIE-2 d² scaling: ratio {ratio:.2f} not in [{lo:.2f}, {hi:.2f}] "
        f"(d=1 vs d=2, predicted≈{_PREDICTED_D2:.0f}×)"
    )


def test_vide_d_squared():
    p1 = _vide_scalar(_N_D)
    p2 = _vide_vec(_N_D, d=2)
    t1 = _time_fn(lambda: solve_VIDE(**p1, **_KW))
    t2 = _time_fn(lambda: solve_VIDE(**p2, **_KW))
    ratio = t2 / t1
    lo, hi = _PREDICTED_D2 / SLACK, _PREDICTED_D2 * SLACK
    assert lo < ratio < hi, (
        f"VIDE d² scaling: ratio {ratio:.2f} not in [{lo:.2f}, {hi:.2f}] "
        f"(d=1 vs d=2, predicted≈{_PREDICTED_D2:.0f}×)"
    )
