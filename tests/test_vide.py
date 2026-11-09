import numpy as np
import pytest
from voles import solve_vide
from conftest import with_sol


# ---------------------------------------------------------------------------
# Vector-valued VIDE tests
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("coll_divs", [2, 3])
def test_vide_vec_diagonal_matches_scalar(coll_divs, quadrature):
    """Diagonal 2×2 kernel+a: vector result equals two independent scalar solves.

    K_rs(t) = delta_rs, a_rs = 0, g_r = 1, exact y_r(t) = exp(t), y_r(0) = 1.
    y'(t) = g(t) + integral[K(t-s)y(s)ds] = 1 + integral[exp(s)ds from 0 to t]
           = 1 + exp(t) - 1 = exp(t) ✓
    """
    time_step = 0.01
    num_pts = 10 * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.zeros((num_pts, 2, 2))
    kernel[:, 0, 0] = 1.0
    kernel[:, 1, 1] = 1.0
    a = np.zeros((num_pts, 2, 2))
    g = np.zeros((num_pts, 2))
    g[:, 0] = 1.0
    g[:, 1] = 1.0
    exact = np.zeros((num_pts, 2))
    exact[:, 0] = np.exp(times)
    exact[:, 1] = np.exp(times)

    soln_vec = solve_vide(kernel=kernel, a=a, g=g, y0=np.array([1.0, 1.0]), dt=time_step, quadrature=quadrature, coll_setting=(coll_divs, list(range(coll_divs + 1)))).y
    assert soln_vec.shape == exact.shape

    k_scalar = np.ones(num_pts)
    a_scalar = np.zeros(num_pts)
    soln_s = solve_vide(kernel=k_scalar, a=a_scalar, g=g[:, 0], y0=1.0, dt=time_step, quadrature=quadrature, coll_setting=(coll_divs, list(range(coll_divs + 1)))).y

    assert np.max(np.abs(soln_vec[:, 0] - soln_s)) < 1e-12
    assert np.max(np.abs(soln_vec[:, 1] - soln_s)) < 1e-12
    assert np.max(np.abs(soln_vec - exact)) < (1e-8 if quadrature == "product" else 2e-7)


@pytest.mark.parametrize("pair", [
    ("poly_a", "poly_b"),   # -> [t+t^2, t-t^2], constant coupled a and kernel
    ("smooth", "poly_a"),   # -> [sin t + t, sin t - t], non-constant coupled a and kernel
])
def test_vide_vec_coupled_generated_accuracy(coupled_vide, pair, quadrature):
    """Coupled 2x2 VIDE generated from pairs of scalar solutions via the Z = P Y
    change of coordinates (P=[[1,1],[1,-1]]); both a and kernel are conjugated.
    Replaces the former hand-written coupled test; the transform is validated by
    test_make_coupled_vide_reproduces_handwritten."""
    spec_a, spec_b = coupled_vide[pair[0]], coupled_vide[pair[1]]
    d = coupled_vide["make"](
        spec_a, spec_b, [[1, 1], [1, -1]],
        time_step=0.02, coll_divs=3, coll_choices=[1, 2, 3],
    )
    soln = solve_vide(kernel=d["kernel"], a=d["a"], g=d["g"], y0=d["soln_init_value"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < (2e-5 if quadrature == "product" else 5e-4)


def test_make_coupled_vide_reproduces_handwritten(coupled_vide):
    """Hand-checked anchor for VIDE coupling: poly_a (a=1, K=1, y=t) and poly_b
    (a=2, K=2, y=t^2) with P=[[1,1],[1,-1]] must reproduce, to machine precision,
    the former hand-written arrays (a=K=[[1.5,-0.5],[-0.5,1.5]], z=[t+t^2, t-t^2],
    z(0)=[0,0])."""
    d = coupled_vide["make"](
        coupled_vide["poly_a"], coupled_vide["poly_b"], [[1, 1], [1, -1]],
        time_step=0.1, coll_divs=2, coll_choices=[0, 1, 2],
    )
    t = d["times"]
    hand_M = np.zeros((len(t), 2, 2))
    hand_M[:] = [[1.5, -0.5], [-0.5, 1.5]]
    hand_g = np.column_stack([1 + t - 2.5 * t**2 - (2/3) * t**3,
                              1 - 3 * t + 1.5 * t**2 + (2/3) * t**3])
    hand_exact = np.column_stack([t + t**2, t - t**2])
    assert np.max(np.abs(d["kernel"] - hand_M)) < 1e-14
    assert np.max(np.abs(d["a"] - hand_M)) < 1e-14
    # hand_g reaches magnitude ~77, where one float64 ULP is ~1.7e-14, so a
    # 1e-14 bound is below rounding noise and flips with the numpy/BLAS version.
    assert np.max(np.abs(d["g"] - hand_g)) < 1e-13
    assert np.max(np.abs(d["exact"] - hand_exact)) < 1e-14
    assert np.max(np.abs(d["soln_init_value"])) < 1e-14


def test_vide_accuracy(vide_data, quadrature):
    d = vide_data
    soln = solve_vide(kernel=d["kernel"], g=d["g"], a=d["a"], y0=d["soln_init_value"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < (5e-7 if quadrature == "product" else 2e-5)


def test_vide_ode_accuracy(vide_ode_data, quadrature):
    d = vide_ode_data
    soln = solve_vide(kernel=d["kernel"], a=d["a"], g=d["g"], y0=d["soln_init_value"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < (1e-6 if quadrature == "product" else 2e-5)


def test_vide_log_accuracy(vide_log_data, quadrature):
    d = vide_log_data
    soln = solve_vide(kernel=d["kernel"], a=d["a"], g=d["g"], y0=d["soln_init_value"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < (5e-6 if quadrature == "product" else 1e-4)


def test_vide_stiff_accuracy(vide_stiff_data, quadrature):
    d = vide_stiff_data
    soln = solve_vide(kernel=d["kernel"], a=d["a"], g=d["g"], y0=d["soln_init_value"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < (5e-8 if quadrature == "product" else 5e-6)


def test_vide_return_polys(vide_data, quadrature):
    d = vide_data
    result = with_sol(solve_vide(kernel=d["kernel"], g=d["g"], a=d["a"], y0=d["soln_init_value"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])))
    assert isinstance(result, tuple) and len(result) == 2
    soln, polys = result
    assert isinstance(soln, np.ndarray)
    assert len(polys) > 0
    assert hasattr(polys[0], "__call__")
