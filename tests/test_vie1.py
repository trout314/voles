import numpy as np
import pytest
from voles import solve_VIE_1
from conftest import TOLERANCE


# ---------------------------------------------------------------------------
# Vector-valued VIE-1 tests
# ---------------------------------------------------------------------------

def _make_vec_data(time_step=0.01, coll_divs=3, n_mesh=10):
    """Diagonal 2x2 kernel: each component is an independent scalar VIE-1.

    K_rs(t) = exp(t) * delta_rs, g_r(t) = sin(t), exact y_r(t) = cos(t)-sin(t).
    """
    num_pts = n_mesh * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step
    K0 = np.exp(times)
    # kernel (N, 2, 2) — diagonal
    kernel = np.zeros((num_pts, 2, 2))
    kernel[:, 0, 0] = K0
    kernel[:, 1, 1] = K0
    g = np.zeros((num_pts, 2))
    g[:, 0] = np.sin(times)
    g[:, 1] = np.sin(times)
    g[0, :] = 0.0
    exact = np.zeros((num_pts, 2))
    exact[:, 0] = np.cos(times) - np.sin(times)
    exact[:, 1] = np.cos(times) - np.sin(times)
    return dict(times=times, kernel=kernel, g=g, exact=exact,
                time_step=time_step, coll_divs=coll_divs, coll_choices=[1, 2, 3])


def test_vie1_vec_diagonal_matches_scalar():
    """Diagonal 2×2 kernel: vector result equals two independent scalar solves."""
    d = _make_vec_data()
    times = d["times"]

    # Vector solve
    soln_vec = solve_VIE_1(
        kernel_values=d["kernel"], g_values=d["g"],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"])
    assert soln_vec.shape == d["exact"].shape

    # Scalar solve for component 0
    soln_s = solve_VIE_1(
        kernel_values=d["kernel"][:, 0, 0], g_values=d["g"][:, 0],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"])

    assert np.max(np.abs(soln_vec[:, 0] - soln_s)) < TOLERANCE
    assert np.max(np.abs(soln_vec[:, 1] - soln_s)) < TOLERANCE
    assert np.max(np.abs(soln_vec - d["exact"])) < TOLERANCE


def test_vie1_vec_analytic_2d():
    """2×2 case with known analytic solution; K_rs=2+t, g_r=t²+t³/6, y_r=t."""
    time_step = 0.1
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step
    # Diagonal kernel K_rs = (2+t) * delta_rs
    K0 = 2 + times
    kernel = np.zeros((num_pts, 2, 2))
    kernel[:, 0, 0] = K0
    kernel[:, 1, 1] = K0
    g = np.zeros((num_pts, 2))
    g[:, 0] = times**2 + times**3 / 6
    g[:, 1] = times**2 + times**3 / 6
    exact = np.zeros((num_pts, 2))
    exact[:, 0] = times
    exact[:, 1] = times

    soln = solve_VIE_1(
        kernel_values=kernel, g_values=g,
        time_step=time_step, coll_divs=coll_divs,
        coll_choices=[1, 2, 3])
    assert np.max(np.abs(soln - exact)) < TOLERANCE


def test_vie1_vec_analytic_d9_runtime_path():
    """d=9 forces the runtime LU path (max_d_compile=8). Exercises lin_solve_rt
    (or LAPACK dgesv_) on a well-conditioned matrix, verifying not just the
    singularity branch but the actual factor-and-solve correctness."""
    time_step = 0.1
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step
    d = 9
    K0 = 2 + times
    kernel = np.zeros((num_pts, d, d))
    for r in range(d):
        kernel[:, r, r] = K0
    g = np.zeros((num_pts, d))
    g[:] = (times**2 + times**3 / 6)[:, None]
    exact = np.zeros((num_pts, d))
    exact[:] = times[:, None]

    soln = solve_VIE_1(
        kernel_values=kernel, g_values=g,
        time_step=time_step, coll_divs=coll_divs,
        coll_choices=[1, 2, 3])
    assert np.max(np.abs(soln - exact)) < TOLERANCE


def test_vie1_vec_force_continuous():
    """Vector force_continuous=True: result should still match analytic solution.

    K=2+t, g=t²+t³/6, exact=t — exact solution starts at 0, consistent with
    the force_continuous initial value.
    """
    time_step = 0.1
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step
    K0 = 2 + times
    kernel = np.zeros((num_pts, 2, 2))
    kernel[:, 0, 0] = K0
    kernel[:, 1, 1] = K0
    g = np.zeros((num_pts, 2))
    g[:, 0] = times**2 + times**3 / 6
    g[:, 1] = times**2 + times**3 / 6
    exact = np.zeros((num_pts, 2))
    exact[:, 0] = times
    exact[:, 1] = times

    soln = solve_VIE_1(
        kernel_values=kernel, g_values=g,
        time_step=time_step, coll_divs=coll_divs,
        coll_choices=[1, 2, 3],
        soln_init_value=np.array([0.0, 0.0]), force_continuous=True)
    assert soln.shape == exact.shape
    assert np.max(np.abs(soln - exact)) < TOLERANCE


def test_vie1_vec_coupled_kernel():
    """2×2 VIE-1 with off-diagonal (coupled) constant kernel; exact solution is polynomial.

    Constructed via similarity transform P=[[1,1],[1,-1]] on a diagonal system
    with K_diag=diag(1,2) and y_diag=[1+t, t]:

      K̃ = P diag(1,2) P⁻¹ = [[3/2, -1/2], [-1/2, 3/2]]
      z_exact = P [1+t, t]ᵀ = [1+2t, 1]
      g_z     = P [t+t²/2, t²]ᵀ = [t+3t²/2, t-t²/2]
    """
    time_step = 0.1
    coll_divs = 2
    num_pts = 10 * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step

    kernel = np.zeros((num_pts, 2, 2))
    kernel[:] = [[1.5, -0.5], [-0.5, 1.5]]
    g = np.zeros((num_pts, 2))
    g[:, 0] = times + 1.5 * times**2
    g[:, 1] = times - 0.5 * times**2
    exact = np.zeros((num_pts, 2))
    exact[:, 0] = 1 + 2 * times
    exact[:, 1] = 1.0

    soln = solve_VIE_1(
        kernel_values=kernel, g_values=g,
        time_step=time_step, coll_divs=coll_divs,
        coll_choices=[1, 2])
    assert np.max(np.abs(soln - exact)) < TOLERANCE


def test_vie1_accuracy(vie1_data):
    d = vie1_data
    soln = solve_VIE_1(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie1_damped_accuracy(vie1_damped_data):
    d = vie1_damped_data
    soln = solve_VIE_1(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie1_return_polys(vie1_data):
    d = vie1_data
    result = solve_VIE_1(
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


def test_vie1_poly_accuracy(vie1_poly_data):
    d = vie1_poly_data
    soln = solve_VIE_1(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie1_poly_force_continuous(vie1_poly_data):
    d = vie1_poly_data
    soln = solve_VIE_1(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
        soln_init_value=float(d["exact"][0]),
        force_continuous=True,
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie1_polys_continuous_at_mesh_boundaries(vie1_data):
    """force_continuous=True: adjacent polynomial pieces must agree at shared endpoints."""
    d = vie1_data
    _, polys = solve_VIE_1(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
        soln_init_value=float(d["exact"][0]),
        force_continuous=True,
        return_function=True,
    )
    h = d["coll_divs"] ** 2 * d["time_step"]
    for n in range(len(polys) - 1):
        t_boundary = (n + 1) * h
        assert abs(polys[n](t_boundary) - polys[n + 1](t_boundary)) < 1e-12


def test_vie1_vec_polys_continuous_at_mesh_boundaries():
    """Vector force_continuous=True: each component poly must be continuous at mesh boundaries."""
    time_step = 0.1
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step
    K0 = 2 + times
    kernel = np.zeros((num_pts, 2, 2))
    kernel[:, 0, 0] = K0
    kernel[:, 1, 1] = K0
    g = np.zeros((num_pts, 2))
    g[:, 0] = times**2 + times**3 / 6
    g[:, 1] = times**2 + times**3 / 6

    _, polys = solve_VIE_1(
        kernel_values=kernel, g_values=g,
        time_step=time_step, coll_divs=coll_divs,
        coll_choices=[1, 2, 3],
        soln_init_value=np.array([0.0, 0.0]), force_continuous=True,
        return_function=True)

    h = coll_divs**2 * time_step
    for n in range(len(polys) - 1):
        t_boundary = (n + 1) * h
        for r in range(2):
            assert abs(polys[n][r](t_boundary) - polys[n + 1][r](t_boundary)) < 1e-12


def test_vie1_matrix_polys_continuous_at_mesh_boundaries():
    """Matrix force_continuous=True: each (component, column) poly must be continuous at mesh boundaries."""
    time_step = 0.1
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step
    K0 = 2 + times
    kernel = np.zeros((num_pts, 2, 2))
    kernel[:, 0, 0] = K0
    kernel[:, 1, 1] = K0
    g_col = times**2 + times**3 / 6
    g_matrix = np.zeros((num_pts, 2, 2))
    g_matrix[:, 0, 0] = g_col
    g_matrix[:, 1, 0] = g_col
    g_matrix[:, 0, 1] = g_col
    g_matrix[:, 1, 1] = g_col

    _, polys = solve_VIE_1(
        kernel_values=kernel, g_values=g_matrix,
        time_step=time_step, coll_divs=coll_divs,
        coll_choices=[1, 2, 3],
        soln_init_value=np.zeros((2, 2)), force_continuous=True,
        return_function=True)

    h = coll_divs**2 * time_step
    for n in range(len(polys) - 1):
        t_boundary = (n + 1) * h
        for r in range(2):
            for j in range(2):
                assert abs(polys[n][r, j](t_boundary) - polys[n + 1][r, j](t_boundary)) < 1e-12


def test_vie1_force_continuous(vie1_data):
    d = vie1_data
    soln = solve_VIE_1(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
        soln_init_value=d["exact"][0],
        force_continuous=True,
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE
