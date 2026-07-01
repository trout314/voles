import numpy as np
import pytest
from voles import solve_VIDE
from conftest import TOLERANCE


# ---------------------------------------------------------------------------
# Vector-valued VIDE tests
# ---------------------------------------------------------------------------

def test_vide_vec_diagonal_matches_scalar():
    """Diagonal 2×2 kernel+a: vector result equals two independent scalar solves.

    K_rs(t) = delta_rs, a_rs = 0, g_r = 1, exact y_r(t) = exp(t), y_r(0) = 1.
    y'(t) = g(t) + integral[K(t-s)y(s)ds] = 1 + integral[exp(s)ds from 0 to t]
           = 1 + exp(t) - 1 = exp(t) ✓
    """
    time_step = 0.01
    coll_divs = 2
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

    soln_vec = solve_VIDE(
        kernel_values=kernel, a_values=a, g_values=g,
        soln_init_value=np.array([1.0, 1.0]),
        time_step=time_step, coll_divs=coll_divs,
        coll_choices=[0, 1, 2])
    assert soln_vec.shape == exact.shape

    k_scalar = np.ones(num_pts)
    a_scalar = np.zeros(num_pts)
    soln_s = solve_VIDE(
        kernel_values=k_scalar, a_values=a_scalar, g_values=g[:, 0],
        soln_init_value=1.0,
        time_step=time_step, coll_divs=coll_divs,
        coll_choices=[0, 1, 2])

    assert np.max(np.abs(soln_vec[:, 0] - soln_s)) < TOLERANCE
    assert np.max(np.abs(soln_vec[:, 1] - soln_s)) < TOLERANCE
    assert np.max(np.abs(soln_vec - exact)) < TOLERANCE


def test_vide_vec_analytic_2d():
    """2×2 case with analytic solution; K_rs=delta_rs, a=0, g_r=1, y_r=exp(t)."""
    time_step = 0.01
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.zeros((num_pts, 2, 2))
    kernel[:, 0, 0] = 1.0
    kernel[:, 1, 1] = 1.0
    a = np.zeros((num_pts, 2, 2))
    g = np.ones((num_pts, 2))
    exact = np.zeros((num_pts, 2))
    exact[:, 0] = np.exp(times)
    exact[:, 1] = np.exp(times)

    soln = solve_VIDE(
        kernel_values=kernel, a_values=a, g_values=g,
        soln_init_value=np.array([1.0, 1.0]),
        time_step=time_step, coll_divs=coll_divs,
        coll_choices=[0, 1, 2, 3])
    assert np.max(np.abs(soln - exact)) < TOLERANCE


@pytest.mark.parametrize("pair", [
    ("poly_a", "poly_b"),   # -> [t+t^2, t-t^2], constant coupled a and kernel
    ("smooth", "poly_a"),   # -> [sin t + t, sin t - t], non-constant coupled a and kernel
])
def test_vide_vec_coupled_generated_accuracy(coupled_vide, pair):
    """Coupled 2x2 VIDE generated from pairs of scalar solutions via the Z = P Y
    change of coordinates (P=[[1,1],[1,-1]]); both a and kernel are conjugated.
    Replaces the former hand-written coupled test; the transform is validated by
    test_make_coupled_vide_reproduces_handwritten."""
    spec_a, spec_b = coupled_vide[pair[0]], coupled_vide[pair[1]]
    d = coupled_vide["make"](
        spec_a, spec_b, [[1, 1], [1, -1]],
        time_step=0.02, coll_divs=3, coll_choices=[1, 2, 3],
    )
    soln = solve_VIDE(
        kernel_values=d["kernel"],
        a_values=d["a"],
        g_values=d["g"],
        soln_init_value=d["soln_init_value"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


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
    assert np.max(np.abs(d["g"] - hand_g)) < 1e-14
    assert np.max(np.abs(d["exact"] - hand_exact)) < 1e-14
    assert np.max(np.abs(d["soln_init_value"])) < 1e-14


def test_vide_accuracy(vide_data):
    d = vide_data
    soln = solve_VIDE(
        kernel_values=d["kernel"],
        g_values=d["g"],
        a_values=d["a"],
        soln_init_value=d["soln_init_value"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vide_ode_accuracy(vide_ode_data):
    d = vide_ode_data
    soln = solve_VIDE(
        kernel_values=d["kernel"],
        a_values=d["a"],
        g_values=d["g"],
        soln_init_value=d["soln_init_value"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vide_log_accuracy(vide_log_data):
    d = vide_log_data
    soln = solve_VIDE(
        kernel_values=d["kernel"],
        a_values=d["a"],
        g_values=d["g"],
        soln_init_value=d["soln_init_value"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vide_stiff_accuracy(vide_stiff_data):
    d = vide_stiff_data
    soln = solve_VIDE(
        kernel_values=d["kernel"],
        a_values=d["a"],
        g_values=d["g"],
        soln_init_value=d["soln_init_value"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vide_return_polys(vide_data):
    d = vide_data
    result = solve_VIDE(
        kernel_values=d["kernel"],
        g_values=d["g"],
        a_values=d["a"],
        soln_init_value=d["soln_init_value"],
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
