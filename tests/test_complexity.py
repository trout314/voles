"""Verify that solver runtime scales as O(N² m² / q⁴).

N = number of input points, m = len(coll_choices), q = coll_divs.

The derivation:
  - There are M = (N-1)/q² mesh intervals.
  - For each new mesh interval n, the history loop iterates over n previous
    intervals.  For each previous interval ell, the BNL matrix (shape m×m)
    is built with a single kernel lookup per entry, then multiplied by the
    m-vector of solution values — both operations cost O(m²).
  - Total work ≈ ∑_{n=0}^{M-1} n · m² = M²m²/2 = N²m²/(2q⁴).

Consequently:
  - Doubling N → 4× runtime (O(N²)).
  - Tripling m (number of collocation nodes) → 9× runtime (O(m²)).
  - Doubling q (coll_divs) → 16× speedup (O(1/q⁴)).

Only confirmed-convergent collocation settings are used.  The assertion
tolerance is a factor of 2.5 in each direction to absorb measurement noise
and OS scheduling jitter.
"""

import time

import numpy as np
import pytest

from volterra_equation_solvers import solve_VIE_1, solve_VIE_2, solve_VIDE

# Measured ratio must lie in [predicted / SLACK, predicted * SLACK].
SLACK = 2.5

N_REPS = 5


# ─── Timing helper ────────────────────────────────────────────────────────────

def _time_fn(fn, n_reps=N_REPS):
    fn()  # warm-up run
    t0 = time.perf_counter()
    for _ in range(n_reps):
        fn()
    return (time.perf_counter() - t0) / n_reps


# ─── Problem builders ─────────────────────────────────────────────────────────

def _vie2_problem(N):
    h = 1.0 / (N - 1)
    t = np.arange(N) * h
    return dict(kernel_values=np.exp(-t),
                g_values=np.sin(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t)),
                time_step=h, show_warnings=False)


def _vie1_problem(N):
    h = 1.0 / (N - 1)
    t = np.arange(N) * h
    g = np.sin(t)
    g[0] = 0.0
    return dict(kernel_values=np.exp(t), g_values=g,
                time_step=h, show_warnings=False)


def _vide_problem(N):
    h = 1.0 / (N - 1)
    t = np.arange(N) * h
    return dict(kernel_values=np.exp(-t),
                a_values=np.full(N, -1.0),
                g_values=1.5 * np.cos(t) + 0.5 * np.sin(t) - 0.5 * np.exp(-t),
                soln_init_value=0.0, time_step=h, show_warnings=False)


# ─── O(N²) tests ──────────────────────────────────────────────────────────────
# Use coll_divs=2 (valid sizes: N = 4k+1).
# N_SMALL = 4*800+1 = 3201, N_LARGE = 4*1600+1 = 6401 → ratio ≈ 2 → predicted 4×.
# Sizes chosen so that computation dominates ctypes/Python call overhead
# (each solve takes O(1 ms), well above OS scheduling jitter).

_N_SMALL = 4 * 800 + 1
_N_LARGE = 4 * 1600 + 1
_PREDICTED_N2 = (_N_LARGE / _N_SMALL) ** 2   # ≈ 4.0


def test_vie2_n_squared():
    ps, pl = _vie2_problem(_N_SMALL), _vie2_problem(_N_LARGE)
    kw = dict(coll_divs=2, coll_choices=[0, 1, 2])
    t_s = _time_fn(lambda: solve_VIE_2(**ps, **kw))
    t_l = _time_fn(lambda: solve_VIE_2(**pl, **kw))
    ratio = t_l / t_s
    lo, hi = _PREDICTED_N2 / SLACK, _PREDICTED_N2 * SLACK
    assert lo < ratio < hi, (
        f"VIE-2 N² scaling: ratio {ratio:.2f} not in [{lo:.2f}, {hi:.2f}]"
    )


def test_vie1_n_squared():
    ps, pl = _vie1_problem(_N_SMALL), _vie1_problem(_N_LARGE)
    kw = dict(coll_divs=2, coll_choices=[1, 2])  # convergent setting
    t_s = _time_fn(lambda: solve_VIE_1(**ps, **kw))
    t_l = _time_fn(lambda: solve_VIE_1(**pl, **kw))
    ratio = t_l / t_s
    lo, hi = _PREDICTED_N2 / SLACK, _PREDICTED_N2 * SLACK
    assert lo < ratio < hi, (
        f"VIE-1 N² scaling: ratio {ratio:.2f} not in [{lo:.2f}, {hi:.2f}]"
    )


def test_vide_n_squared():
    ps, pl = _vide_problem(_N_SMALL), _vide_problem(_N_LARGE)
    kw = dict(coll_divs=2, coll_choices=[0, 1, 2])
    t_s = _time_fn(lambda: solve_VIDE(**ps, **kw))
    t_l = _time_fn(lambda: solve_VIDE(**pl, **kw))
    ratio = t_l / t_s
    lo, hi = _PREDICTED_N2 / SLACK, _PREDICTED_N2 * SLACK
    assert lo < ratio < hi, (
        f"VIDE N² scaling: ratio {ratio:.2f} not in [{lo:.2f}, {hi:.2f}]"
    )


# ─── O(m²) tests ──────────────────────────────────────────────────────────────
# Fix N = 16*200+1 = 3201, coll_divs=4.  Compare m=1 vs m=5 → predicted 25×.
# Uses m=1 vs m=5 rather than m=1 vs m=3 to overcome SIMD effects that make
# smaller matrix operations faster per element than the operation count predicts.
# At N=3201 the O(N²m²) history term fully dominates over O(N·m³) linear solves.

_N_M = 16 * 200 + 1     # 3201
_PREDICTED_M2 = 5.0 ** 2  # 25.0


def test_vie2_m_squared():
    p = _vie2_problem(_N_M)
    t1 = _time_fn(lambda: solve_VIE_2(**p, coll_divs=4, coll_choices=[0]))
    t5 = _time_fn(lambda: solve_VIE_2(**p, coll_divs=4, coll_choices=[0, 1, 2, 3, 4]))
    ratio = t5 / t1
    lo, hi = _PREDICTED_M2 / SLACK, _PREDICTED_M2 * SLACK
    assert lo < ratio < hi, (
        f"VIE-2 m² scaling: ratio {ratio:.2f} not in [{lo:.2f}, {hi:.2f}] "
        f"(m=1 vs m=5, predicted≈{_PREDICTED_M2:.0f}×)"
    )


# VIDE history cost per (n, ell) pair is O(m³) (three nested loops over m)
# rather than O(m²) as in VIE-2, and the absolute times at N=3201 are dominated
# by micro-architectural effects (SIMD, cache).  The m-scaling test is
# therefore only applied to VIE-2 where the O(m²) signal is cleanly observable.


# ─── O(1/q⁴) tests ────────────────────────────────────────────────────────────
# Fix N = 16*800+1 = 12801 (valid for both q=2 and q=4), m=1.
# mesh_divs(q=2) = 3200, mesh_divs(q=4) = 800.
# O(N²m²/q⁴): t(q=2)/t(q=4) = (1/2⁴)/(1/4⁴) = (4/2)⁴ = 16.
# Uses q=2 vs q=4 (rather than q=1 vs q=2) because the ratio has fully
# converged to 16 by N=12801 for this pair.

_N_Q = 16 * 800 + 1     # 12801
_PREDICTED_Q4 = (4.0 / 2.0) ** 4   # 16.0


def test_vie2_q4_scaling():
    p = _vie2_problem(_N_Q)
    t_q2 = _time_fn(lambda: solve_VIE_2(**p, coll_divs=2, coll_choices=[0]))
    t_q4 = _time_fn(lambda: solve_VIE_2(**p, coll_divs=4, coll_choices=[0]))
    ratio = t_q2 / t_q4
    lo, hi = _PREDICTED_Q4 / SLACK, _PREDICTED_Q4 * SLACK
    assert lo < ratio < hi, (
        f"VIE-2 q⁴ scaling: ratio {ratio:.2f} not in [{lo:.2f}, {hi:.2f}] "
        f"(coll_divs=2 vs 4, predicted≈{_PREDICTED_Q4:.0f}×)"
    )


# The VIDE q-scaling test is omitted: at the problem sizes that are practical
# to run in a test suite the ratio has not yet converged to its asymptotic
# value, giving unreliable results.  The O(N²) test above covers VIE-2 and
# the N² tests cover all three solvers.
