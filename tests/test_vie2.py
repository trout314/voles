import numpy as np
import pytest
from voles import solve_VIE_2
from conftest import TOLERANCE


# ---------------------------------------------------------------------------
# Vector-valued VIE-2 tests
# ---------------------------------------------------------------------------

def test_vie2_vec_diagonal_matches_scalar():
    """Diagonal 2×2 kernel: vector result equals two independent scalar solves.

    K_rs(t) = delta_rs, g_r(t) = t - t^2/2, exact y_r(t) = t.
    """
    time_step = 0.1
    coll_divs = 2
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

    soln_vec = solve_VIE_2(
        kernel_values=kernel, g_values=g,
        time_step=time_step, coll_divs=coll_divs,
        coll_choices=[0, 1, 2])
    assert soln_vec.shape == exact.shape

    soln_s = solve_VIE_2(
        kernel_values=K0, g_values=g[:, 0],
        time_step=time_step, coll_divs=coll_divs,
        coll_choices=[0, 1, 2])

    assert np.max(np.abs(soln_vec[:, 0] - soln_s)) < TOLERANCE
    assert np.max(np.abs(soln_vec[:, 1] - soln_s)) < TOLERANCE
    assert np.max(np.abs(soln_vec - exact)) < TOLERANCE


def test_vie2_vec_analytic_2d():
    """2×2 case with known analytic solution; K_rs=delta_rs, g_r=t-t²/2, y_r=t."""
    time_step = 0.1
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.zeros((num_pts, 2, 2))
    kernel[:, 0, 0] = 1.0
    kernel[:, 1, 1] = 1.0
    g = np.zeros((num_pts, 2))
    g[:, 0] = times - times**2 / 2
    g[:, 1] = times - times**2 / 2
    exact = np.zeros((num_pts, 2))
    exact[:, 0] = times
    exact[:, 1] = times

    soln = solve_VIE_2(
        kernel_values=kernel, g_values=g,
        time_step=time_step, coll_divs=coll_divs,
        coll_choices=[0, 1, 2, 3])
    assert np.max(np.abs(soln - exact)) < TOLERANCE


def test_vie2_accuracy(vie2_data):
    d = vie2_data
    soln = solve_VIE_2(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie2_exp_accuracy(vie2_exp_data):
    d = vie2_exp_data
    soln = solve_VIE_2(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie2_rational_accuracy(vie2_rational_data):
    d = vie2_rational_data
    soln = solve_VIE_2(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


@pytest.mark.parametrize("pair", [
    ("poly", "poly2"),       # -> [t + t^2, t - t^2], constant coupled kernel
    ("smooth", "poly"),      # -> [sin t + t, sin t - t], non-constant kernel
    ("smooth", "rational"),  # -> [sin t + 1/(1+t), sin t - 1/(1+t)]
])
def test_vie2_vec_coupled_generated_accuracy(coupled_vie2, pair):
    """Coupled 2x2 VIE-2 fixtures generated from pairs of scalar solutions by the
    Z = P Y change of coordinates (P=[[1,1],[1,-1]]). Replaces the former
    hand-written coupled tests; the transform itself is validated by
    test_make_coupled_vie2_reproduces_handwritten."""
    spec_a, spec_b = coupled_vie2[pair[0]], coupled_vie2[pair[1]]
    d = coupled_vie2["make"](
        spec_a, spec_b, [[1, 1], [1, -1]],
        time_step=0.02, coll_divs=3, coll_choices=[0, 1, 2, 3],
    )
    soln = solve_VIE_2(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
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


def test_vie2_return_polys(vie2_data):
    d = vie2_data
    result = solve_VIE_2(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
        return_function=True,
    )
    assert isinstance(result, tuple) and len(result) == 2
    soln, polys = result
    assert isinstance(soln, np.ndarray)
    assert len(polys) > 0
    assert hasattr(polys[0], "__call__")


def test_vie2_return_function_callable_and_list_semantics(vie2_data):
    """The second return value is callable AND indexes/iterates like the old
    list of per-interval polynomials."""
    d = vie2_data
    soln, sol = solve_VIE_2(
        kernel_values=d["kernel"], g_values=d["g"], time_step=d["time_step"],
        coll_divs=d["coll_divs"], coll_choices=d["coll_choices"],
        return_function=True)
    # Callable: evaluating at an interior point matches the owning interval poly.
    h = d["coll_divs"] ** 2 * d["time_step"]
    t_mid = 0.5 * h
    assert sol(t_mid) == pytest.approx(sol[0](t_mid))
    # List semantics: len / index / iterate delegate to .polynomials.
    assert len(sol) == len(sol.polynomials)
    assert list(sol) == sol.polynomials
    # Callable agrees with the array solution at the final node.
    assert sol(d["time_step"] * (len(soln) - 1)) == pytest.approx(soln[-1], abs=TOLERANCE)


def test_vie2_return_polys_deprecated_alias(vie2_data):
    """`return_polys` still works but emits a DeprecationWarning and yields the
    same callable solution object as `return_function`."""
    d = vie2_data
    kw = dict(kernel_values=d["kernel"], g_values=d["g"], time_step=d["time_step"],
              coll_divs=d["coll_divs"], coll_choices=d["coll_choices"])
    with pytest.warns(DeprecationWarning):
        soln_old, sol_old = solve_VIE_2(return_polys=True, **kw)
    soln_new, sol_new = solve_VIE_2(return_function=True, **kw)
    assert np.array_equal(soln_old, soln_new)
    assert type(sol_old) is type(sol_new)
    assert sol_old(0.5 * d["coll_divs"] ** 2 * d["time_step"]) == pytest.approx(
        sol_new(0.5 * d["coll_divs"] ** 2 * d["time_step"]))
