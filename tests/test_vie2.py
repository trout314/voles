import numpy as np
import pytest
from volterra_equation_solvers import solve_VIE_2
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


def test_vie2_vec_coupled_kernel():
    """2×2 VIE-2 with off-diagonal (coupled) constant kernel; exact solution is polynomial.

    Constructed via similarity transform P=[[1,1],[1,-1]] on a diagonal system
    with K_diag=diag(1,2) and y_diag=[t, t²]:

      K̃ = P diag(1,2) P⁻¹ = [[3/2, -1/2], [-1/2, 3/2]]
      z_exact = P [t, t²]ᵀ = [t+t², t-t²]
      g_z     = P [t-t²/2, t²-2t³/3]ᵀ = [t+t²/2-2t³/3, t-3t²/2+2t³/3]
    """
    time_step = 0.1
    coll_divs = 2
    num_pts = 10 * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step

    kernel = np.zeros((num_pts, 2, 2))
    kernel[:] = [[1.5, -0.5], [-0.5, 1.5]]
    g = np.zeros((num_pts, 2))
    g[:, 0] = times + 0.5 * times**2 - (2/3) * times**3
    g[:, 1] = times - 1.5 * times**2 + (2/3) * times**3
    exact = np.zeros((num_pts, 2))
    exact[:, 0] = times + times**2
    exact[:, 1] = times - times**2

    soln = solve_VIE_2(
        kernel_values=kernel, g_values=g,
        time_step=time_step, coll_divs=coll_divs,
        coll_choices=[0, 1, 2])
    assert np.max(np.abs(soln - exact)) < TOLERANCE


def test_vie2_vec_coupled_nonconstant_kernel():
    """2×2 VIE-2 with non-constant coupled kernel; exact solution involves sin and t.

    Constructed via similarity transform P=[[1,1],[1,-1]] on a diagonal system
    with k₁(s)=exp(-s) / y₁=sin(t) and k₂(s)=1 / y₂=t:

      K̃(s) = P diag(exp(-s), 1) P⁻¹ = 0.5 * [[exp(-s)+1, exp(-s)-1],
                                                [exp(-s)-1, exp(-s)+1]]
      z_exact = P [sin t, t]ᵀ = [sin t + t, sin t - t]
      g̃ = P [g₁, g₂]ᵀ  where g₁ = sin(t)/2 + cos(t)/2 - exp(-t)/2
                               g₂ = t - t²/2
    """
    time_step = 0.05
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step

    k1 = np.exp(-times)
    k2 = np.ones(num_pts)
    kernel = np.zeros((num_pts, 2, 2))
    kernel[:, 0, 0] = 0.5 * (k1 + k2)
    kernel[:, 0, 1] = 0.5 * (k1 - k2)
    kernel[:, 1, 0] = 0.5 * (k1 - k2)
    kernel[:, 1, 1] = 0.5 * (k1 + k2)

    g1 = np.sin(times) / 2 + np.cos(times) / 2 - np.exp(-times) / 2
    g2 = times - times**2 / 2
    g = np.zeros((num_pts, 2))
    g[:, 0] = g1 + g2
    g[:, 1] = g1 - g2

    exact = np.zeros((num_pts, 2))
    exact[:, 0] = np.sin(times) + times
    exact[:, 1] = np.sin(times) - times

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


def test_vie2_return_polys(vie2_data):
    d = vie2_data
    result = solve_VIE_2(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
        return_polys=True,
    )
    assert isinstance(result, tuple) and len(result) == 2
    soln, polys = result
    assert isinstance(soln, np.ndarray)
    assert len(polys) > 0
    assert hasattr(polys[0], "__call__")
