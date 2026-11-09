import numpy as np
import pytest
from voles import solve_vie1
from conftest import TOLERANCE, with_sol


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
    return dict(times=times, kernel=kernel, g=g, exact=exact, time_step=time_step,
                coll_divs=coll_divs, coll_choices=[1, 2, 3])


def test_vie1_vec_diagonal_matches_scalar(quadrature):
    """Diagonal 2×2 kernel: vector result equals two independent scalar solves."""
    d = _make_vec_data()
    times = d["times"]

    # Vector solve
    soln_vec = solve_vie1(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert soln_vec.shape == d["exact"].shape

    # Scalar solve for component 0
    soln_s = solve_vie1(kernel=d["kernel"][:, 0, 0], g=d["g"][:, 0], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y

    assert np.max(np.abs(soln_vec[:, 0] - soln_s)) < TOLERANCE
    assert np.max(np.abs(soln_vec[:, 1] - soln_s)) < TOLERANCE
    assert np.max(np.abs(soln_vec - d["exact"])) < TOLERANCE


def test_vie1_vec_analytic_2d(quadrature):
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

    soln = solve_vie1(kernel=kernel, g=g, dt=time_step, quadrature=quadrature, coll_setting=(coll_divs, [1, 2, 3])).y
    assert np.max(np.abs(soln - exact)) < TOLERANCE


def test_vie1_vec_analytic_d9_runtime_path(quadrature):
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

    soln = solve_vie1(kernel=kernel, g=g, dt=time_step, quadrature=quadrature, coll_setting=(coll_divs, [1, 2, 3])).y
    assert np.max(np.abs(soln - exact)) < TOLERANCE


def test_vie1_vec_force_continuous(quadrature):
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

    soln = solve_vie1(kernel=kernel, g=g, dt=time_step, quadrature=quadrature, coll_setting=(coll_divs, [1, 2, 3]), y0=np.array([0.0, 0.0]), continuous=True).y
    assert soln.shape == exact.shape
    assert np.max(np.abs(soln - exact)) < TOLERANCE


@pytest.mark.parametrize("pair", [
    ("poly_a", "poly_b"),   # -> [1+2t, 1], constant coupled kernel
    ("smooth", "poly_b"),   # -> [cos t - sin t + t, cos t - sin t - t]
])
def test_vie1_vec_coupled_generated_accuracy(coupled_vie1, pair, quadrature):
    """Coupled 2x2 VIE-1 generated from pairs of scalar solutions via the
    Z = P Y change of coordinates (P=[[1,1],[1,-1]]). Replaces the former
    hand-written coupled test; the transform is validated by
    test_make_coupled_vie1_reproduces_handwritten."""
    spec_a, spec_b = coupled_vie1[pair[0]], coupled_vie1[pair[1]]
    d = coupled_vie1["make"](
        spec_a, spec_b, [[1, 1], [1, -1]],
        time_step=0.01, coll_divs=3, coll_choices=[1, 2, 3],
    )
    soln = solve_vie1(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_make_coupled_vie1_reproduces_handwritten(coupled_vie1):
    """Hand-checked anchor for VIE-1 coupling: poly_a (K=1, y=1+t) and poly_b
    (K=2, y=t) with P=[[1,1],[1,-1]] must reproduce, to machine precision, the
    former hand-written arrays (z = [1+2t, 1])."""
    d = coupled_vie1["make"](
        coupled_vie1["poly_a"], coupled_vie1["poly_b"], [[1, 1], [1, -1]],
        time_step=0.1, coll_divs=2, coll_choices=[1, 2],
    )
    t = d["times"]
    hand_kernel = np.zeros((len(t), 2, 2))
    hand_kernel[:] = [[1.5, -0.5], [-0.5, 1.5]]
    hand_g = np.column_stack([t + 1.5 * t**2, t - 0.5 * t**2])
    hand_exact = np.column_stack([1 + 2 * t, np.ones_like(t)])
    assert np.max(np.abs(d["kernel"] - hand_kernel)) < 1e-14
    assert np.max(np.abs(d["g"] - hand_g)) < 1e-14
    assert np.max(np.abs(d["exact"] - hand_exact)) < 1e-14


def test_vie1_accuracy(vie1_data, quadrature):
    d = vie1_data
    soln = solve_vie1(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie1_damped_accuracy(vie1_damped_data, quadrature):
    d = vie1_damped_data
    soln = solve_vie1(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie1_return_polys(vie1_data, quadrature):
    d = vie1_data
    result = with_sol(solve_vie1(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])))
    assert isinstance(result, tuple) and len(result) == 2
    soln, polys = result
    assert isinstance(soln, np.ndarray)
    assert len(polys) > 0
    assert hasattr(polys[0], "__call__")


def test_vie1_poly_accuracy(vie1_poly_data, quadrature):
    d = vie1_poly_data
    soln = solve_vie1(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie1_poly_force_continuous(vie1_poly_data, quadrature):
    d = vie1_poly_data
    soln = solve_vie1(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"]), y0=float(d["exact"][0]), continuous=True).y
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie1_polys_continuous_at_mesh_boundaries(vie1_data, quadrature):
    """force_continuous=True: adjacent polynomial pieces must agree at shared endpoints."""
    d = vie1_data
    _, polys = with_sol(solve_vie1(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"]), y0=float(d["exact"][0]), continuous=True))
    h = d["coll_divs"] ** 2 * d["time_step"]
    for n in range(len(polys) - 1):
        t_boundary = (n + 1) * h
        assert abs(polys[n](t_boundary) - polys[n + 1](t_boundary)) < 1e-12


def test_vie1_vec_polys_continuous_at_mesh_boundaries(quadrature):
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

    _, polys = with_sol(solve_vie1(kernel=kernel, g=g, dt=time_step, quadrature=quadrature, coll_setting=(coll_divs, [1, 2, 3]), y0=np.array([0.0, 0.0]), continuous=True))

    h = coll_divs**2 * time_step
    for n in range(len(polys) - 1):
        t_boundary = (n + 1) * h
        for r in range(2):
            assert abs(polys[n][r](t_boundary) - polys[n + 1][r](t_boundary)) < 1e-12


def test_vie1_matrix_polys_continuous_at_mesh_boundaries(quadrature):
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

    _, polys = with_sol(solve_vie1(kernel=kernel, g=g_matrix, dt=time_step, quadrature=quadrature, coll_setting=(coll_divs, [1, 2, 3]), y0=np.zeros((2, 2)), continuous=True))

    h = coll_divs**2 * time_step
    for n in range(len(polys) - 1):
        t_boundary = (n + 1) * h
        for r in range(2):
            for j in range(2):
                assert abs(polys[n][r, j](t_boundary) - polys[n + 1][r, j](t_boundary)) < 1e-12


def test_vie1_force_continuous(vie1_data, quadrature):
    d = vie1_data
    soln = solve_vie1(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"]), y0=d["exact"][0], continuous=True).y
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


# ---------------------------------------------------------------------------
# Warning for kernels the collocation-quadrature scheme cannot handle
# ---------------------------------------------------------------------------

_K0_MSG = "first-kind collocation scheme is unstable"


def _k0_problem(K0, dt=0.01, d=0):
    """K(u) = u + K0, y = cos t: g = 1 - cos t + K0 sin t."""
    t = np.arange(4 * 9 * 10 + 1) * dt
    K = t + K0
    g = 1.0 - np.cos(t) + K0 * np.sin(t)
    if d:
        K = K[:, None, None] * np.eye(d)
        g = np.outer(g, np.ones(d))
    return dict(kernel=K, g=g, dt=dt)


@pytest.mark.parametrize("K0", [0.0, 1e-3])
def test_warns_when_kernel_start_unresolved(K0, voles_warnings):
    """K(0) = 0 diverges without bound under refinement (1e18 -> 1e83 as dt
    halves); K(0) small next to H*K'(0) diverges too."""
    solve_vie1(quadrature="collocation", **_k0_problem(K0)).y
    assert _K0_MSG in voles_warnings.text()


def test_warns_for_singular_matrix_kernel_start(voles_warnings):
    solve_vie1(quadrature="collocation", **_k0_problem(0.0, d=2)).y
    assert _K0_MSG in voles_warnings.text()


def test_no_kernel_start_warning_for_product(voles_warnings):
    solve_vie1(**_k0_problem(0.0), quadrature="product")
    assert _K0_MSG not in voles_warnings.text()


@pytest.mark.parametrize("d", [0, 3])
def test_no_kernel_start_warning_for_resolved_kernel(d, voles_warnings):
    """K(0) = 1 with the same slope: ratio H*K'(0)/K(0) = 0.09, stable."""
    y = solve_vie1(quadrature="collocation", **_k0_problem(1.0, d=d)).y
    assert _K0_MSG not in voles_warnings.text()
    assert np.all(np.isfinite(y))


# ---------------------------------------------------------------------------
# Warning for g(0) != 0 (no bounded solution exists)
# ---------------------------------------------------------------------------

_G0_MSG = "g(0) is not zero"


def _g0_problem(g0_offset):
    t = np.arange(4 * 9 * 10 + 1) * 0.01
    return dict(kernel=np.exp(-t), g=np.sin(t) + g0_offset, dt=0.01)


@pytest.mark.parametrize("quad", ["collocation", "product"])
def test_warns_when_g_start_nonzero(quad, voles_warnings):
    solve_vie1(**_g0_problem(0.5), quadrature=quad).y
    assert _G0_MSG in voles_warnings.text()


@pytest.mark.parametrize("offset", [0.0, 1e-15])
def test_no_g_start_warning_for_zero_or_rounding(offset, voles_warnings):
    solve_vie1(**_g0_problem(offset)).y
    assert _G0_MSG not in voles_warnings.text()


def test_g_start_warning_names_worst_column_for_matrix(voles_warnings):
    """Matrix problems report how many right-hand sides have g(0) != 0 and
    the worst one, not a pooled maximum."""
    t = np.arange(4 * 9 * 10 + 1) * 0.01
    K = np.exp(-t)[:, None, None] * np.eye(2)
    g = np.outer(np.sin(t), [1.0, 2.0])
    G = np.stack([g, g + [0.0, 0.3], g], axis=2)        # only column 1 has g(0) != 0
    solve_vie1(kernel=K, g=G, dt=0.01).y
    out = voles_warnings.text()
    assert "g(0) is not zero in 1 of 3 columns; worst column 1" in out


def test_rejected_g_shape_gets_no_g_start_warning(voles_warnings):
    """A g the solver is about to reject used to print the g(0) warning
    first; now only a g whose shape fits the kernel is diagnosed."""
    t = np.arange(37) * 0.01
    with pytest.raises(ValueError, match="g must have shape"):
        solve_vie1(kernel=np.exp(-t), g=np.ones((3, 3)), dt=0.01)
    assert "g(0) is not zero" not in voles_warnings.text()
    # a non-square kernel is rejected before any warning as well
    with pytest.raises(ValueError, match=r"\(N, d, d\)"):
        solve_vie1(kernel=np.ones((37, 2, 3)), g=np.ones((37, 2)), dt=0.01).y
    assert voles_warnings.text() == ""
