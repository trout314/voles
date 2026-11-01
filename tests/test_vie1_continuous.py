"""Continuous (Brunner S_m^(0)) VIE-1 collocation on sampled data.

The continuous method represents the solution on each mesh interval by a
degree-m polynomial on the augmented nodes {0, c_1, ..., c_m}, the value at
node 0 being the boundary value carried from the previous interval. The fully
discretised method must evaluate every integral of that polynomial with the
(m+1)-point interpolatory rule on the same nodes (Brunner 2004, Section 2.4.5
and Example 2.4.5); the m-point rule of the discontinuous method is exact only
to degree m-1. These tests pin the consequences of using the right rule:

* m = 1, c_1 = 1 is the product trapezoidal rule (Example 2.4.5, theta = 1);
* for K == 1 the method reproduces polynomial solutions of degree m exactly;
* for K == 1, g == 0, y(0) = 1 the mesh-point values are rho_{m-1}^n, where
  rho_{m-1} = (-1)^m prod_{i<m} (1 - c_i)/c_i is the amplification factor of
  Theorem 2.4.5;
* the global order is m + 1 for -1 <= rho_{m-1} < 1 (Theorem 2.4.5), checked
  as a fourth-order rate for (3, [1, 2, 3]) on the Rubin-model memory kernel;
* node sets with |rho_{m-1}| > 1 or c_m < 1 are rejected.

The D extension and the Numba fallback are both covered.
"""
import numpy as np
import pytest
from scipy.special import j1, jv
from voles import solve_vie1
from conftest import TOLERANCE, as_array, VIE1_SPEC_DAMPED
from conftest import run

try:
    from voles import _numba_solvers
    HAVE_NUMBA = True
except ImportError:      # pragma: no cover
    HAVE_NUMBA = False

needs_numba = pytest.mark.skipif(not HAVE_NUMBA, reason="numba not available")

# Several settings here have rho_{m-1} = +1 on purpose (admitted at one order
# lower); their AccuracyWarning is tested in test_vie1_product.py.
pytestmark = pytest.mark.filterwarnings(
    "ignore:collocation setting .* has amplification factor rho = 1:voles.AccuracyWarning")

# Node sets with c_m = 1 and |rho_{m-1}| <= 1, with rho_{m-1}.
CONTINUOUS_SETTINGS = [
    (1, [1], -1.0),
    (2, [1, 2], 1.0),
    (3, [2, 3], 0.5),
    (3, [1, 2, 3], -1.0),
    (4, [3, 4], 1.0 / 3.0),
    (4, [2, 3, 4], -1.0 / 3.0),
    (4, [1, 3, 4], -1.0),
    (4, [1, 2, 3, 4], 1.0),
]


def _product_trapezoid(kernel, g, h, y0):
    """h [ K_n y_0 / 2 + sum_{l=1}^{n-1} K_{n-l} y_l + K_0 y_n / 2 ] = g_n."""
    N = len(kernel)
    y = np.zeros(N)
    y[0] = y0
    for n in range(1, N):
        y[n] = (g[n] / h - 0.5 * kernel[n] * y[0]
                - np.sum(kernel[n - 1:0:-1] * y[1:n])) / (0.5 * kernel[0])
    return y


def _polynomial_problem(coll_divs, m, num_blocks=8, time_step=0.1):
    """K == 1, y = t^m, g = t^{m+1}/(m+1): y lies in the continuous trial
    space, so an exact quadrature of that space must reproduce it."""
    N = num_blocks * coll_divs**2 + 1
    t = time_step * np.arange(N)
    return t, np.ones(N), t**(m + 1) / (m + 1), t**m


def _rubin_model(time_step, T):
    """Rubin model (particle at the end of a semi-infinite harmonic chain,
    k = m = 1): C(t) = J_1(2t)/t, and the memory kernel solving
    dC/dt = int_0^t C(t-s) K(s) ds is K(t) = -J_1(2t)/t. Kernel and solution
    are entire functions."""
    N = int(round(T / time_step)) + 1
    t = time_step * np.arange(N)
    with np.errstate(all="ignore"):
        C = j1(2 * t) / t
        C_dot = -2 * jv(2, 2 * t) / t
        K_exact = -j1(2 * t) / t
    C[0], C_dot[0], K_exact[0] = 1.0, 0.0, -1.0
    return C, C_dot, K_exact


# ---------------------------------------------------------------------------
# m = 1: the trapezoidal rule
# ---------------------------------------------------------------------------

def test_continuous_one_node_is_product_trapezoidal_rule():
    h = 0.05
    t = h * np.arange(81)
    kernel, g = np.exp(t), np.sin(t)
    soln = solve_vie1(kernel=kernel, g=g, dt=h, quadrature="collocation", coll_setting=(1, [1]), continuous=True, y0=1.0).y
    # Rounding level only: the D driver accumulates the history in a
    # different (blocked) order than the direct sum.
    assert np.max(np.abs(soln - _product_trapezoid(kernel, g, h, 1.0))) < 1e-10


@needs_numba
def test_continuous_one_node_is_product_trapezoidal_rule_numba():
    h = 0.05
    t = h * np.arange(41)
    kernel, g = np.exp(t), np.sin(t)
    soln, _ = _numba_solvers.solve_vie1_jit(g, kernel, 1.0, h, 1, np.array([1]), False, True)
    assert np.max(np.abs(soln - _product_trapezoid(kernel, g, h, 1.0))) < 1e-10


def test_continuous_one_node_uses_initial_value():
    """The trapezoidal rule weights y(0) by K(t_n)/2; a wrong initial value
    must therefore change the solution (the previous rectangle-rule
    discretisation ignored soln_init_value entirely)."""
    h = 0.05
    t = h * np.arange(41)
    kernel, g = np.exp(t), np.sin(t)
    kw = dict(kernel=kernel, g=g, dt=h, coll_setting=(1, [1]), continuous=True)
    right = solve_vie1(y0=1.0, **kw).y
    wrong = solve_vie1(y0=0.0, **kw).y
    assert np.max(np.abs(right[1:] - wrong[1:])) > 1e-3


# ---------------------------------------------------------------------------
# Exactness on the trial space (K == 1)
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("coll_divs, coll_choices, _rho", CONTINUOUS_SETTINGS)
def test_continuous_reproduces_degree_m_polynomial(coll_divs, coll_choices, _rho):
    m = len(coll_choices)
    t, kernel, g, exact = _polynomial_problem(coll_divs, m)
    soln = solve_vie1(kernel=kernel, g=g, dt=0.1, coll_setting=(coll_divs, coll_choices), continuous=True, y0=0.0).y
    assert np.max(np.abs(soln - exact)) < 1e-9


@pytest.mark.parametrize("d", [2, 9])
def test_continuous_reproduces_polynomial_vector(d):
    """d = 2 takes the compile-time driver, d = 9 the runtime (LAPACK /
    lin_solve_rt) driver; both must be exact on the trial space."""
    coll_divs, coll_choices = 3, [1, 2, 3]
    t, kernel, g, exact = _polynomial_problem(coll_divs, len(coll_choices))
    N = len(t)
    kernel_d = np.zeros((N, d, d))
    for r in range(d):
        kernel_d[:, r, r] = 1.0
    scale = 1.0 + np.arange(d)
    soln = solve_vie1(kernel=kernel_d, g=g[:, None] * scale, dt=0.1, coll_setting=(coll_divs, coll_choices), continuous=True, y0=np.zeros(d)).y
    assert np.max(np.abs(soln - exact[:, None] * scale)) < 1e-9


def test_continuous_reproduces_polynomial_matrix():
    coll_divs, coll_choices = 2, [1, 2]
    t, kernel, g, exact = _polynomial_problem(coll_divs, len(coll_choices))
    N = len(t)
    kernel_d = np.zeros((N, 2, 2))
    kernel_d[:, 0, 0] = kernel_d[:, 1, 1] = 1.0
    scale = np.array([[1.0, 3.0], [2.0, 4.0]])          # (d, m_cols)
    soln = solve_vie1(kernel=kernel_d, g=g[:, None, None] * scale, dt=0.1, coll_setting=(coll_divs, coll_choices), continuous=True, y0=np.zeros((2, 2))).y
    assert np.max(np.abs(soln - exact[:, None, None] * scale)) < 1e-9


@needs_numba
def test_continuous_reproduces_polynomial_numba_fallback():
    """coll_divs = 5 is not compiled into the D extension, so the public API
    dispatches to the Numba fallback."""
    coll_divs, coll_choices = 5, [1, 2, 3, 4, 5]
    t, kernel, g, exact = _polynomial_problem(coll_divs, 5, num_blocks=4)
    soln = run(solve_vie1, show_warnings=False, kernel=kernel, g=g, dt=0.1, coll_setting=(coll_divs, coll_choices), continuous=True, y0=0.0).y
    assert np.max(np.abs(soln - exact)) < 1e-6


# ---------------------------------------------------------------------------
# Amplification factor (Theorem 2.4.5)
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("coll_divs, coll_choices, rho", CONTINUOUS_SETTINGS)
def test_continuous_amplification_factor(coll_divs, coll_choices, rho):
    """K == 1, g == 0, y(0) = 1: the collocation equations force the local
    polynomial to y_n phi(v) with phi(0) = 1 and vanishing integrals over
    [0, c_i], and phi(1) = rho_{m-1}; hence y_n = rho_{m-1}^n at mesh points."""
    num_blocks = 6
    N = num_blocks * coll_divs**2 + 1
    soln = solve_vie1(kernel=np.ones(N), g=np.zeros(N), dt=0.1, coll_setting=(coll_divs, coll_choices), continuous=True, y0=1.0).y
    mesh_values = soln[::coll_divs**2]
    assert np.max(np.abs(mesh_values - rho ** np.arange(num_blocks + 1))) < 1e-10


# ---------------------------------------------------------------------------
# Order of convergence
# ---------------------------------------------------------------------------

def test_continuous_fourth_order_on_rubin_model():
    """(3, [1, 2, 3]) has rho_{m-1} = -1, so Theorem 2.4.5 gives order
    m + 1 = 4 (the discontinuous method with the same nodes is order 3, and
    the previous m-point discretisation of the continuous method reached
    only ~2.8 here)."""
    coll_divs, coll_choices = 3, [1, 2, 3]
    errs = []
    for time_step in (0.125, 0.0625, 0.03125):
        C, C_dot, K_exact = _rubin_model(time_step, T=36.0)
        soln = solve_vie1(kernel=C, g=C_dot, dt=time_step, coll_setting=(coll_divs, coll_choices), continuous=True, y0=K_exact[0]).y
        errs.append(np.max(np.abs(soln - K_exact)))
    rates = np.log2(np.array(errs[:-1]) / np.array(errs[1:]))
    assert errs[-1] < 1e-4
    assert np.all(rates > 3.6), (errs, rates)


@pytest.mark.parametrize("coll_divs, coll_choices", [(2, [1, 2]), (4, [1, 2, 3, 4])])
def test_continuous_even_m_equispaced_converges(coll_divs, coll_choices):
    """rho_{m-1} = +1 for these sets: convergent (order m) by Theorem 2.4.5.
    The previous discretisation amplified the boundary value by 3 and 335/111
    per mesh interval and diverged for both."""
    d = as_array(VIE1_SPEC_DAMPED, time_step=0.01, coll_divs=coll_divs,
                 coll_choices=coll_choices, num_blocks=40)
    soln = solve_vie1(kernel=d["kernel"], g=d["g"], dt=d["time_step"], coll_setting=(d["coll_divs"], d["coll_choices"]), continuous=True, y0=d["exact"][0]).y
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


@needs_numba
def test_continuous_numba_matches_d_extension():
    d = as_array(VIE1_SPEC_DAMPED, time_step=0.01, coll_divs=3,
                 coll_choices=[1, 2, 3], num_blocks=20)
    soln_d = solve_vie1(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature="collocation", coll_setting=(3, [1, 2, 3]), continuous=True, y0=d["exact"][0]).y
    soln_nb, _ = _numba_solvers.solve_vie1_jit(
        d["g"], d["kernel"], float(d["exact"][0]), d["time_step"], 3, np.array([1, 2, 3]),
        False, True)
    assert np.max(np.abs(soln_d - soln_nb)) < 1e-10


# ---------------------------------------------------------------------------
# Node-set validation
# ---------------------------------------------------------------------------

def test_continuous_rejects_interior_last_node():
    N = 9 * 3 + 1
    with pytest.raises(ValueError, match="needs a node at the right end of each interval"):
        solve_vie1(kernel=np.ones(N), g=np.zeros(N), dt=0.1, coll_setting=(3, [1, 2]), continuous=True, y0=0.0).y


@pytest.mark.parametrize("coll_divs, coll_choices", [(3, [1, 3]), (4, [1, 4]), (4, [1, 2, 4])])
def test_continuous_rejects_divergent_node_sets(coll_divs, coll_choices):
    N = coll_divs**2 * 3 + 1
    with pytest.raises(ValueError, match="rho"):
        solve_vie1(kernel=np.ones(N), g=np.zeros(N), dt=0.1, coll_setting=(coll_divs, coll_choices), continuous=True, y0=0.0).y


def test_discontinuous_mode_unaffected_by_continuous_validation():
    """The new checks apply to force_continuous=True only."""
    N = 9 * 3 + 1
    t = 0.1 * np.arange(N)
    soln = solve_vie1(kernel=np.ones(N), g=t**2 / 2, dt=0.1, coll_setting=(3, [1, 3])).y
    assert soln.shape == (N,)


# ---------------------------------------------------------------------------
# Follow-ups to the continuous-quadrature fix
# ---------------------------------------------------------------------------

def test_continuous_nonzero_initial_value_long_history():
    """A nonzero y(0) with enough mesh intervals to reach the FFT history
    path: the initial value enters through its own term, separately from the
    folded history blocks. With K = 1 a polynomial solution of degree <= m is
    reproduced to roundoff; here y = 1 + t - t^2."""
    coll_divs, coll_choices = 2, [1, 2]
    N = 200 * coll_divs**2 + 1
    h = 0.005
    t = h * np.arange(N)
    exact = 1 + t - t**2
    soln = solve_vie1(kernel=np.ones(N), g=t + t**2 / 2 - t**3 / 3, dt=h, coll_setting=(coll_divs, coll_choices), continuous=True, y0=1.0).y
    assert np.max(np.abs(soln - exact)) < 1e-9


@pytest.mark.parametrize("d", [2, 9])   # compile-time and runtime-dimension drivers
def test_continuous_vector_nonzero_initial_value(d):
    """Coupled system with a non-diagonal constant kernel M and y(0) != 0:
    g(t) = M int_0^t y with y_r(t) = (r + 1)(1 - t^2) + t^3, degree m = 3, so
    the solution is reproduced to roundoff. 60 intervals reaches the FFT
    history path."""
    coll_divs, coll_choices = 3, [1, 2, 3]
    N = 60 * coll_divs**2 + 1
    h = 0.01
    t = h * np.arange(N)[:, None]
    M = np.eye(d) + 0.1 * np.arange(d * d).reshape(d, d) / (d * d)
    amp = np.arange(1, d + 1, dtype=float)
    exact = amp * (1 - t**2) + t**3
    integ = amp * (t - t**3 / 3) + t**4 / 4
    soln = solve_vie1(kernel=np.broadcast_to(M, (N, d, d)).copy(), g=integ @ M.T, dt=h, coll_setting=(coll_divs, coll_choices), continuous=True, y0=exact[0]).y
    assert np.max(np.abs(soln - exact)) < 1e-9


def test_continuous_matrix_without_init_value_raises_value_error():
    """Used to surface as a bare AssertionError from a column worker thread."""
    coll_divs, coll_choices = 2, [1, 2]
    N = 4 * coll_divs**2 + 1
    kernel = np.broadcast_to(np.eye(2), (N, 2, 2)).copy()
    with pytest.raises(ValueError, match="continuous=True needs the initial value y0"):
        solve_vie1(kernel=kernel, g=np.zeros((N, 2, 3)), dt=0.1, coll_setting=(coll_divs, coll_choices), continuous=True).y


@pytest.mark.parametrize("force_continuous", [False, True])
def test_empty_coll_choices_raises_value_error(force_continuous):
    with pytest.raises(ValueError, match="at least one"):
        run(solve_vie1, show_warnings=False, kernel=np.ones(10), g=np.zeros(10), dt=0.1, coll_setting=(3, []), continuous=force_continuous, y0=0.0 if force_continuous else None).y


# ---------------------------------------------------------------------------
# The exact |rho| <= 1 criterion, applied to both methods
# ---------------------------------------------------------------------------

def test_discontinuous_rejects_divergent_uncompiled_setting():
    """(5, [1]) has |rho_m| = 4. It is not compiled into the D extension, so
    it used to reach the Numba fallback (only the three compiled divergent
    settings were blacklisted) and diverge silently."""
    N = 25 * 4 + 1
    with pytest.raises(ValueError, match="convergent"):
        run(solve_vie1, show_warnings=False, kernel=np.ones(N), g=np.zeros(N), dt=0.1, coll_setting=(5, [1])).y


def test_rho_criterion_is_exact_and_reproduces_the_old_blacklist():
    from fractions import Fraction
    from voles._sampled import _vie1_rho, _VIE1_NONCONVERGENT
    assert _VIE1_NONCONVERGENT == {(3, (1,)), (4, (1,)), (4, (1, 2))}
    assert _vie1_rho(3, [1, 2]) == 1                      # boundary, admitted
    assert _vie1_rho(5, [1]) == -4
    assert _vie1_rho(4, [1, 2, 3, 4], continuous=True) == Fraction(1)
    assert _vie1_rho(1, [1], continuous=True) == -1       # trapezoidal method
    # closest approach to the boundary from above for coll_divs <= 16
    assert _vie1_rho(16, [7, 8, 10], ) == -Fraction(9 * 8 * 6, 7 * 8 * 10)


@needs_numba
def test_boundary_rho_setting_still_admitted_on_numba_fallback():
    """|rho_m| = 1 exactly, (6, [2, 4]): (4/2)(2/4) = 1, stays admissible."""
    coll_divs, coll_choices = 6, [2, 4]
    N = 36 * 4 + 1
    t = 0.01 * np.arange(N)
    soln = run(solve_vie1, show_warnings=False, kernel=np.ones(N), g=t, dt=0.01, coll_setting=(coll_divs, coll_choices)).y
    assert np.max(np.abs(soln - 1.0)) < 1e-9


def test_d_extension_guards_the_continuous_method_itself():
    """The folded history assumes c_m = 1, so the extension refuses settings
    without it even when called below the Python validation layer."""
    from voles import _dlang
    N = 9 * 3 + 1
    with pytest.raises(RuntimeError, match="error code 1"):
        _dlang.solve_vie1_d(np.zeros(N), np.ones(N), 0.0, 0.1, 3, [1, 2], False, True)
    # |rho_(m-1)| = 2 > 1
    with pytest.raises(RuntimeError, match="error code 1"):
        _dlang.solve_vie1_d(np.zeros(N), np.ones(N), 0.0, 0.1, 3, [1, 3], False, True)
