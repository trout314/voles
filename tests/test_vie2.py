import numpy as np
import pytest
from voles import solve_vie2
from conftest import TOLERANCE
from conftest import with_sol


# ---------------------------------------------------------------------------
# Vector-valued VIE-2 tests
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("coll_divs", [2, 3])
def test_vie2_vec_diagonal_matches_scalar(coll_divs, quadrature):
    """Diagonal 2×2 kernel: vector result equals two independent scalar solves.

    K_rs(t) = delta_rs, g_r(t) = t - t^2/2, exact y_r(t) = t.
    """
    time_step = 0.1
    num_pts = 10 * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step
    K0 = np.ones(num_pts)
    kernel = np.zeros((num_pts, 2, 2))
    kernel[:, 0, 0] = K0
    kernel[:, 1, 1] = K0
    g = np.zeros((num_pts, 2))
    g[:, 0] = times - times**2 / 2
    g[:, 1] = times - times**2 / 2
    exact = np.zeros((num_pts, 2))
    exact[:, 0] = times
    exact[:, 1] = times

    soln_vec = solve_vie2(kernel=kernel, g=g, dt=time_step, quadrature=quadrature, coll_setting=(coll_divs, list(range(coll_divs + 1)))).y
    assert soln_vec.shape == exact.shape

    soln_s = solve_vie2(kernel=K0, g=g[:, 0], dt=time_step, quadrature=quadrature, coll_setting=(coll_divs, list(range(coll_divs + 1)))).y

    assert np.max(np.abs(soln_vec[:, 0] - soln_s)) < TOLERANCE
    assert np.max(np.abs(soln_vec[:, 1] - soln_s)) < TOLERANCE
    assert np.max(np.abs(soln_vec - exact)) < TOLERANCE


def test_vie2_accuracy(vie2_data, quadrature):
    d = vie2_data
    soln = solve_vie2(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie2_exp_accuracy(vie2_exp_data, quadrature):
    d = vie2_exp_data
    soln = solve_vie2(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie2_rational_accuracy(vie2_rational_data, quadrature):
    d = vie2_rational_data
    soln = solve_vie2(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


@pytest.mark.parametrize("pair", [
    ("poly", "poly2"),       # -> [t + t^2, t - t^2], constant coupled kernel
    ("smooth", "poly"),      # -> [sin t + t, sin t - t], non-constant kernel
    ("smooth", "rational"),  # -> [sin t + 1/(1+t), sin t - 1/(1+t)]
])
def test_vie2_vec_coupled_generated_accuracy(coupled_vie2, pair, quadrature):
    """Coupled 2x2 VIE-2 fixtures generated from pairs of scalar solutions by the
    Z = P Y change of coordinates (P=[[1,1],[1,-1]]). Replaces the former
    hand-written coupled tests; the transform itself is validated by
    test_make_coupled_vie2_reproduces_handwritten."""
    spec_a, spec_b = coupled_vie2[pair[0]], coupled_vie2[pair[1]]
    d = coupled_vie2["make"](
        spec_a, spec_b, [[1, 1], [1, -1]],
        time_step=0.02, coll_divs=3, coll_choices=[0, 1, 2, 3],
    )
    soln = solve_vie2(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_make_coupled_vie2_reproduces_handwritten(coupled_vie2):
    """Validate the coupling helper against independently hand-derived arrays.

    This is the single hand-checked reference for the generator: building from
    the smooth (K=e^{-u}, y=sin t) and poly (K=1, y=t) specs with P=[[1,1],[1,-1]]
    must reproduce, to machine precision, these closed-form kernel / g / exact
    (the former hand-written non-constant coupled case, z = [sin t + t, sin t - t])."""
    d = coupled_vie2["make"](
        coupled_vie2["smooth"], coupled_vie2["poly"], [[1, 1], [1, -1]],
        time_step=0.05, coll_divs=3, coll_choices=[0, 1, 2, 3],
    )
    t = d["times"]

    # Hand-written closed forms (mirroring test_vie2_vec_coupled_nonconstant_kernel).
    k1 = np.exp(-t)
    k2 = np.ones_like(t)
    hand_kernel = np.zeros((len(t), 2, 2))
    hand_kernel[:, 0, 0] = 0.5 * (k1 + k2)
    hand_kernel[:, 0, 1] = 0.5 * (k1 - k2)
    hand_kernel[:, 1, 0] = 0.5 * (k1 - k2)
    hand_kernel[:, 1, 1] = 0.5 * (k1 + k2)
    g1 = np.sin(t) / 2 + np.cos(t) / 2 - np.exp(-t) / 2
    g2 = t - t**2 / 2
    hand_g = np.column_stack([g1 + g2, g1 - g2])
    hand_exact = np.column_stack([np.sin(t) + t, np.sin(t) - t])

    assert np.max(np.abs(d["kernel"] - hand_kernel)) < 1e-14
    assert np.max(np.abs(d["g"] - hand_g)) < 1e-14
    assert np.max(np.abs(d["exact"] - hand_exact)) < 1e-14


def test_vie2_return_polys(vie2_data, quadrature):
    d = vie2_data
    result = with_sol(solve_vie2(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])))
    assert isinstance(result, tuple) and len(result) == 2
    soln, polys = result
    assert isinstance(soln, np.ndarray)
    assert len(polys) > 0
    assert hasattr(polys[0], "__call__")


def test_vie2_return_function_callable_and_list_semantics(vie2_data, quadrature):
    """The second return value is callable AND indexes/iterates like the old
    list of per-interval polynomials."""
    d = vie2_data
    soln, sol = with_sol(solve_vie2(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])))
    # Callable: evaluating at an interior point matches the owning interval poly.
    h = d["coll_divs"] ** 2 * d["time_step"]
    t_mid = 0.5 * h
    assert sol(t_mid) == pytest.approx(sol[0](t_mid), rel=1e-5)   # absolute-time monomials
    # List semantics: len / index / iterate delegate to .polynomials.
    assert len(sol) == len(sol.polynomials)
    assert list(sol) == sol.polynomials
    # Callable agrees with the array solution at the final node.
    assert sol(d["time_step"] * (len(soln) - 1)) == pytest.approx(soln[-1], abs=TOLERANCE)


# ---------------------------------------------------------------------------
# Solution function outside the solved interval
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("shape", ["scalar", "vector", "matrix", "complex"])
def test_solution_function_nan_outside_domain(shape, quadrature):
    """Extrapolating the end polynomials gave plausible but meaningless
    values (f(T+5) = -5.75 for a solution near -0.36); outside [0, T] the
    solution function now returns NaN, while T itself (up to rounding) and
    interior points are unchanged."""
    dt = 0.01
    t = np.arange(401) * dt
    K, g = np.exp(-t), np.sin(t) + 1.0
    if shape in ("vector", "matrix"):
        K = K[:, None, None] * np.eye(2)
        g = np.outer(g, [1.0, 2.0])
        if shape == "matrix":
            g = np.stack([g, 3 * g], axis=2)
    if shape == "complex":
        K = K * (1 + 0.5j)
    y, f = with_sol(solve_vie2(quadrature=quadrature, kernel=K, g=g, dt=dt))
    T = t[-1]
    inside = f(np.array([0.0, 0.5 * T, T, T * (1 + 1e-14)]))
    assert np.all(np.isfinite(inside))
    np.testing.assert_allclose(inside[2], y[-1], rtol=1e-9)
    assert np.all(np.isnan(f(np.array([-1e-3, T + 1e-3, T + 5]))))
    scalar_out = f(T + 1.0)
    assert np.all(np.isnan(scalar_out))
    if shape == "scalar":
        assert isinstance(scalar_out, float)


def test_solution_function_nan_tolerance_scales_with_the_interval(quadrature):
    """The out-of-range tolerance used to have an absolute 1e-12 floor, which
    on a nanosecond-scale interval is 0.1% of T: points just past T were
    silently extrapolated. It is now relative to the interval length."""
    dt = 1e-11
    t = np.arange(101) * dt                                  # T = 1e-9
    y, f = with_sol(solve_vie2(quadrature=quadrature, kernel=np.exp(-t), g=np.sin(1e9 * t) + 1.0, dt=dt))
    T = t[-1]
    assert np.isfinite(f(T)) and np.isfinite(f(T * (1 - 1e-13)))
    assert np.isnan(f(T * (1 + 1e-4)))                       # 0.01% past T: outside
    assert np.isnan(f(-1e-13))
