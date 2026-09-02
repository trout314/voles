"""Product-integration quadrature for the sampled-data VIE-1 solver
(``solve_VIE_1(quadrature="product")``).

The default quadrature applies the interpolatory rule on the collocation nodes
to every integral, which forces a mesh ``coll_divs**2`` samples wide and reads
only every ``coll_divs``-th sample in the history sums. Product integration
replaces the kernel by its piecewise-polynomial interpolant on the data grid
and integrates products with the collocation polynomial exactly (Linz 1971;
de Hoog and Weiss 1973), so the mesh can be any multiple of ``coll_divs``
samples wide and every sample is used. The scheme is exact collocation for the
interpolated kernel, which gives the tests their reference points:

* for a polynomial kernel of degree <= kernel_interp_degree the interpolant is
  the kernel itself, so the result must match the callable-input solver
  (exact-integration collocation on the same mesh and nodes) to rounding;
* for K == 1 polynomial solutions of degree m-1 (discontinuous) and m
  (continuous) are reproduced exactly, and the continuous method's boundary
  values are rho_{m-1}^n for g == 0 (Brunner 2004, Theorem 2.4.5);
* the order in the data spacing at fixed mesh_samples is m (discontinuous)
  and m+1 (continuous, rho_{m-1} = -1);
* every sample influences the result, mesh_samples = coll_divs**2 is not the
  collocation scheme, and the D block drivers agree with the NumPy reference.
"""
import numpy as np
import pytest
from scipy.special import j1, jv

from voles import solve_VIE_1, function_solve_VIE_1
from voles import _dlang, _product


# ---------------------------------------------------------------------------
# analytic test problems (memory-kernel form: g = C', kernel = C, solution = K)
# ---------------------------------------------------------------------------

def rubin(dt, N):
    """Rubin model: C = J1(2t)/t, K = -C."""
    t = dt * np.arange(N)
    with np.errstate(all='ignore'):
        C = j1(2 * t) / t
        Cd = -2 * jv(2, 2 * t) / t
        Kex = -j1(2 * t) / t
    C[0], Cd[0], Kex[0] = 1.0, 0.0, -1.0
    return t, C, Cd, Kex


def damped(dt, N, gam=0.5):
    """Exponential memory kernel K = -exp(-gam t); C solves C'' + gam C' + C = 0."""
    w = np.sqrt(1.0 - gam ** 2 / 4)
    t = dt * np.arange(N)
    C = np.exp(-gam * t / 2) * (np.cos(w * t) + (gam / (2 * w)) * np.sin(w * t))
    Cd = -np.exp(-gam * t / 2) * (1.0 / w) * np.sin(w * t)
    Kex = -np.exp(-gam * t)
    return t, C, Cd, Kex


def n_samples(Q, intervals):
    return Q * intervals + 1


SETTINGS = [(1, [1]), (2, [1, 2]), (3, [2, 3]), (3, [1, 2, 3]), (4, [1, 2, 3, 4])]


def sampled_values(sol, t, Q):
    """Evaluate a callable solution with the sampled-data convention of
    ``solve_VIE_1``: each interval's polynomial on its closed range, interior
    mesh points averaged between the two adjacent polynomials."""
    N = len(t)
    M = (N - 1) // Q
    polys = sol.polynomials
    is_vec = isinstance(polys[0], np.ndarray)
    d = len(polys[0]) if is_vec else 0
    out = np.zeros((N, d) if d else (N,))
    for n in range(M):
        idx = np.arange(n * Q, (n + 1) * Q + 1)
        if d:
            out[idx] += np.stack([polys[n][r](t[idx]) for r in range(d)], axis=1)
        else:
            out[idx] += polys[n](t[idx])
    for n in range(1, M):
        out[n * Q] *= 0.5
    return out


# ---------------------------------------------------------------------------
# exactness against the callable-input solver for polynomial kernels
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("coll_divs,choices", SETTINGS)
@pytest.mark.parametrize("force_continuous", [False, True])
@pytest.mark.parametrize("Q_factor", [1, 2])
def test_polynomial_kernel_matches_exact_collocation(coll_divs, choices, force_continuous, Q_factor):
    m = len(choices)
    p = max(m, 2)
    Q = Q_factor * coll_divs
    dt = 0.05
    N = n_samples(Q, 12)
    t = dt * np.arange(N)
    # polynomial kernel of degree 2 <= p: the interpolant reproduces it exactly
    kernel = lambda tau: 1.0 + 0.5 * tau - 0.1 * tau ** 2
    g = lambda tt: np.sin(1.3 * tt) + 0.2 * tt
    K = kernel(t)
    gv = g(t)
    init = 0.7
    vals = solve_VIE_1(kernel_values=K, g_values=gv, time_step=dt, coll_divs=coll_divs,
                       coll_choices=choices, quadrature="product", mesh_samples=Q,
                       kernel_interp_degree=p, force_continuous=force_continuous,
                       soln_init_value=(init if force_continuous else None),
                       show_warnings=False)
    mesh = np.arange(N // Q + 1) * (Q * dt)
    ref_vals, ref = function_solve_VIE_1(
        kernel=kernel, g=g, mesh_breakpoints=mesh, coll_divs=coll_divs,
        coll_choices=choices, force_continuous=force_continuous,
        soln_init_value=(init if force_continuous else None), return_function=True)
    assert np.max(np.abs(vals - sampled_values(ref, t, Q))) < 1e-8   # reference quadrature tolerance


def test_polynomial_kernel_matches_exact_collocation_vector():
    coll_divs, choices, Q, p = 3, [1, 2, 3], 3, 3
    dt = 0.05
    N = n_samples(Q, 10)
    t = dt * np.arange(N)
    A = np.array([[1.0, 0.3], [-0.2, 0.8]])
    B = np.array([[0.1, -0.05], [0.2, 0.15]])
    kernel = lambda tau: A + B * tau + 0.05 * np.eye(2) * tau ** 2
    g = lambda tt: np.array([np.sin(tt), 0.5 * tt])
    K = np.array([kernel(tau) for tau in t])
    gv = np.array([g(tt) for tt in t])
    for fc in (False, True):
        init = np.array([0.3, -0.4]) if fc else None
        vals = solve_VIE_1(kernel_values=K, g_values=gv, time_step=dt, coll_divs=coll_divs,
                           coll_choices=choices, quadrature="product", mesh_samples=Q,
                           kernel_interp_degree=p, force_continuous=fc,
                           soln_init_value=init, show_warnings=False)
        mesh = np.arange(N // Q + 1) * (Q * dt)
        _, ref = function_solve_VIE_1(
            kernel=kernel, g=g, mesh_breakpoints=mesh, coll_divs=coll_divs,
            coll_choices=choices, force_continuous=fc, soln_init_value=init,
            return_function=True)
        assert np.max(np.abs(vals - sampled_values(ref, t, Q))) < 1e-8   # reference quadrature tolerance


# ---------------------------------------------------------------------------
# K == 1 identities
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("coll_divs,choices", SETTINGS)
def test_reproduces_polynomial_solutions_for_unit_kernel(coll_divs, choices):
    m = len(choices)
    dt = 0.1
    Q = coll_divs
    N = n_samples(Q, 10)
    t = dt * np.arange(N)
    K = np.ones(N)
    # discontinuous: degree m-1 in the trial space
    y = t ** (m - 1)
    g = t ** m / m
    vals = solve_VIE_1(kernel_values=K, g_values=g, time_step=dt, coll_divs=coll_divs,
                       coll_choices=choices, quadrature="product", show_warnings=False)
    assert np.max(np.abs(vals - y)) < 1e-9
    # continuous: degree m
    y = t ** m
    g = t ** (m + 1) / (m + 1)
    vals = solve_VIE_1(kernel_values=K, g_values=g, time_step=dt, coll_divs=coll_divs,
                       coll_choices=choices, quadrature="product", force_continuous=True,
                       soln_init_value=0.0, show_warnings=False)
    assert np.max(np.abs(vals - y)) < 1e-9


@pytest.mark.parametrize("coll_divs,choices,rho", [
    (1, [1], -1.0), (2, [1, 2], 1.0), (3, [2, 3], 0.5), (3, [1, 2, 3], -1.0),
    (4, [2, 3, 4], -1.0 / 3.0), (4, [1, 2, 3, 4], 1.0)])
def test_continuous_amplification_factor(coll_divs, choices, rho):
    Q = coll_divs
    M = 8
    N = n_samples(Q, M)
    K = np.ones(N)
    vals = solve_VIE_1(kernel_values=K, g_values=np.zeros(N), time_step=0.3,
                       coll_divs=coll_divs, coll_choices=choices, quadrature="product",
                       force_continuous=True, soln_init_value=1.0, show_warnings=False)
    mesh_vals = vals[::Q]
    assert np.allclose(mesh_vals, rho ** np.arange(M + 1), atol=1e-10)


def test_one_node_continuous_is_trapezoidal_rule():
    dt = 0.125
    N = 200
    t, C, Cd, Kex = rubin(dt, N)
    vals = solve_VIE_1(kernel_values=C, g_values=Cd, time_step=dt, coll_divs=1,
                       coll_choices=[1], quadrature="product", kernel_interp_degree=1,
                       force_continuous=True, soln_init_value=-1.0, show_warnings=False)
    # product trapezoidal rule on the interpolated (piecewise-linear) kernel is
    # the exact integral of the product of two linear functions, not the
    # classical trapezoidal rule on the product -- check against the direct sum
    # compare with an explicit reference of the same scheme
    y = np.zeros(N)
    y[0] = -1.0
    # exact integral of (linear K)(linear y) over each cell
    for n in range(1, N):
        s = 0.0
        for l in range(n - 1):
            Ka, Kb = C[n - l], C[n - l - 1]
            s += dt * (Ka * y[l] / 3 + (Ka * y[l + 1] + Kb * y[l]) / 6 + Kb * y[l + 1] / 3)
        Ka, Kb = C[1], C[0]
        # cell [t_{n-1}, t_n]: unknown y[n] with coefficient dt*Kb/3 + dt*Ka/6
        s += dt * (Ka * y[n - 1] / 3 + Kb * y[n - 1] / 6)
        y[n] = (Cd[n] - s) / (dt * (Kb / 3 + Ka / 6))
    assert np.max(np.abs(vals - y)) < 1e-10
    assert np.max(np.abs(vals - Kex)) < 1e-2


# ---------------------------------------------------------------------------
# convergence in the data spacing at fixed mesh_samples
# ---------------------------------------------------------------------------

def _max_err(dt, coll_divs, choices, fc, model, T=18.0, Q=None, p=None):
    Q = coll_divs if Q is None else Q
    N = int(round(T / dt)) + 1
    N = (N - 1) // Q * Q + 1
    t, C, Cd, Kex = model(dt, N)
    vals = solve_VIE_1(kernel_values=C, g_values=Cd, time_step=dt, coll_divs=coll_divs,
                       coll_choices=choices, quadrature="product", mesh_samples=Q,
                       kernel_interp_degree=p, force_continuous=fc,
                       soln_init_value=(-1.0 if fc else None), show_warnings=False)
    return np.max(np.abs(vals - Kex))


@pytest.mark.parametrize("coll_divs,choices,fc,expected", [
    (2, [1, 2], False, 2), (3, [1, 2, 3], False, 3), (3, [1, 2, 3], True, 4),
    (4, [1, 2, 3, 4], False, 4)])
def test_convergence_order(coll_divs, choices, fc, expected):
    dts = [0.1, 0.05, 0.025]
    errs = [_max_err(dt, coll_divs, choices, fc, damped) for dt in dts]
    rate = np.log2(errs[1] / errs[2])
    assert rate > expected - 0.35, (errs, rate)


def test_mesh_samples_q_beats_present_scheme_on_coarse_data():
    dt = 0.125
    N = n_samples(9, 32)
    t, C, Cd, Kex = rubin(dt, N)
    common = dict(kernel_values=C, g_values=Cd, time_step=dt, coll_divs=3,
                  coll_choices=[1, 2, 3], show_warnings=False)
    err_coll = np.max(np.abs(solve_VIE_1(**common) - Kex))
    err_prod = np.max(np.abs(solve_VIE_1(quadrature="product", **common) - Kex))
    assert err_prod < err_coll / 10


# ---------------------------------------------------------------------------
# structural properties
# ---------------------------------------------------------------------------

def test_every_sample_is_used():
    dt, q = 0.1, 3
    N = n_samples(q, 12)
    t, C, Cd, _ = damped(dt, N)
    base = solve_VIE_1(kernel_values=C, g_values=Cd, time_step=dt, coll_divs=q,
                       coll_choices=[1, 2, 3], quadrature="product", show_warnings=False)
    for j in (1, 5, 7, 11, N - 2):       # lags the collocation quadrature never reads
        Cp = C.copy()
        Cp[j] += 0.1
        pert = solve_VIE_1(kernel_values=Cp, g_values=Cd, time_step=dt, coll_divs=q,
                           coll_choices=[1, 2, 3], quadrature="product", show_warnings=False)
        assert np.max(np.abs(pert - base)) > 1e-6, j
    for j in (1, 2, 4, 5):               # g between collocation points of the coarse scheme
        gp = Cd.copy()
        gp[j] += 0.1
        pert = solve_VIE_1(kernel_values=C, g_values=gp, time_step=dt, coll_divs=q,
                           coll_choices=[1, 2, 3], quadrature="product", show_warnings=False)
        assert np.max(np.abs(pert - base)) > 1e-6, j


def test_mesh_samples_q_squared_is_not_the_collocation_scheme():
    q, choices = 3, [1, 2, 3]
    diffs = []
    for dt in (0.1, 0.05, 0.025):
        N = n_samples(q * q, int(round(9.0 / (q * q * dt))))
        t, C, Cd, Kex = damped(dt, N)
        common = dict(kernel_values=C, g_values=Cd, time_step=dt, coll_divs=q,
                      coll_choices=choices, show_warnings=False)
        a = solve_VIE_1(**common)
        b = solve_VIE_1(quadrature="product", mesh_samples=q * q, **common)
        diffs.append(np.max(np.abs(a - b)))
        assert diffs[-1] > 1e-12
    # the difference is a quadrature error of the collocation order
    assert diffs[2] < diffs[0] / 4


def test_extension_matches_numpy_reference():
    dt, q, Q = 0.05, 3, 6
    N = n_samples(Q, 20)
    t, C, Cd, _ = damped(dt, N)
    for fc in (False, True):
        init = -1.0 if fc else 0.0
        a, _ = _product.solve_vie1_product(C, Cd, dt, q, [1, 2, 3], Q, 3, fc, init, False,
                                           use_extension=True)
        b, _ = _product.solve_vie1_product(C, Cd, dt, q, [1, 2, 3], Q, 3, fc, init, False,
                                           use_extension=False)
        assert np.max(np.abs(a - b)) < 1e-11
    assert _dlang.have_block_drivers()


def test_vector_block_diagonal_matches_scalar():
    dt, q = 0.05, 2
    N = n_samples(q, 20)
    t, C, Cd, _ = damped(dt, N)
    t2, C2, Cd2, _ = rubin(dt, N)
    K = np.zeros((N, 2, 2))
    K[:, 0, 0] = C
    K[:, 1, 1] = C2
    g = np.stack([Cd, Cd2], axis=1)
    for fc in (False, True):
        init = np.array([-1.0, -1.0]) if fc else None
        vec = solve_VIE_1(kernel_values=K, g_values=g, time_step=dt, coll_divs=q,
                          coll_choices=[1, 2], quadrature="product", force_continuous=fc,
                          soln_init_value=init, show_warnings=False)
        s0 = solve_VIE_1(kernel_values=C, g_values=Cd, time_step=dt, coll_divs=q,
                         coll_choices=[1, 2], quadrature="product", force_continuous=fc,
                         soln_init_value=(-1.0 if fc else None), show_warnings=False)
        s1 = solve_VIE_1(kernel_values=C2, g_values=Cd2, time_step=dt, coll_divs=q,
                         coll_choices=[1, 2], quadrature="product", force_continuous=fc,
                         soln_init_value=(-1.0 if fc else None), show_warnings=False)
        assert np.allclose(vec[:, 0], s0, atol=1e-11)
        assert np.allclose(vec[:, 1], s1, atol=1e-11)


def test_matrix_columns_and_return_function():
    dt, q = 0.05, 2
    N = n_samples(q, 16)
    t, C, Cd, _ = damped(dt, N)
    K = np.zeros((N, 2, 2))
    K[:, 0, 0] = C
    K[:, 1, 1] = C
    g = np.zeros((N, 2, 3))
    for j in range(3):
        g[:, 0, j] = (j + 1) * Cd
        g[:, 1, j] = -(j + 1) * Cd
    vals, sol = solve_VIE_1(kernel_values=K, g_values=g, time_step=dt, coll_divs=q,
                            coll_choices=[1, 2], quadrature="product",
                            return_function=True, show_warnings=False)
    assert vals.shape == (N, 2, 3)
    single = solve_VIE_1(kernel_values=C, g_values=2 * Cd, time_step=dt, coll_divs=q,
                         coll_choices=[1, 2], quadrature="product", show_warnings=False)
    assert np.allclose(vals[:, 0, 1], single, atol=1e-11)
    assert np.allclose(vals[:, 1, 1], -single, atol=1e-11)
    # the callable evaluates to the returned values at interior grid points
    interior = np.array([i for i in range(N) if i % q != 0], dtype=int)
    ev = sol(t[interior])
    assert ev.shape == (len(interior), 2, 3)
    assert np.allclose(ev, vals[interior], atol=1e-10)
    assert len(sol) == (N - 1) // q


def test_return_function_scalar_and_continuous():
    dt, q, Q = 0.05, 3, 6
    N = n_samples(Q, 10)
    t, C, Cd, _ = damped(dt, N)
    vals, sol = solve_VIE_1(kernel_values=C, g_values=Cd, time_step=dt, coll_divs=q,
                            coll_choices=[1, 2, 3], quadrature="product", mesh_samples=Q,
                            force_continuous=True, soln_init_value=-1.0,
                            return_function=True, show_warnings=False)
    assert np.allclose(sol(t), vals, atol=1e-10)
    assert abs(sol(0.0) + 1.0) < 1e-12
    assert len(sol) == (N - 1) // Q
    assert np.allclose(sol.mesh_breakpoints, np.arange((N - 1) // Q + 1) * Q * dt)


def test_uncompiled_setting_works_with_product_quadrature():
    # coll_divs = 5 is not compiled into the extension; product mode needs no
    # compiled setting and no numba
    dt, q = 0.05, 5
    N = n_samples(q, 30)
    t, C, Cd, Kex = damped(dt, N)
    vals = solve_VIE_1(kernel_values=C, g_values=Cd, time_step=dt, coll_divs=q,
                       coll_choices=[1, 2, 3, 4, 5], quadrature="product", show_warnings=False)
    assert np.max(np.abs(vals - Kex)) < 1e-4


def test_complex_passthrough():
    dt, q = 0.05, 2
    N = n_samples(q, 16)
    t, C, Cd, _ = damped(dt, N)
    Kc = C * (1.0 + 0.5j)
    gc = Cd * (1.0 + 0.5j)
    vals = solve_VIE_1(kernel_values=Kc, g_values=gc, time_step=dt, coll_divs=q,
                       coll_choices=[1, 2], quadrature="product", show_warnings=False)
    real = solve_VIE_1(kernel_values=C, g_values=Cd, time_step=dt, coll_divs=q,
                       coll_choices=[1, 2], quadrature="product", show_warnings=False)
    assert np.allclose(vals, real, atol=1e-10)


# ---------------------------------------------------------------------------
# validation
# ---------------------------------------------------------------------------

def test_validation():
    dt, q = 0.05, 3
    N = n_samples(9, 4)
    t, C, Cd, _ = damped(dt, N)
    common = dict(kernel_values=C, g_values=Cd, time_step=dt, coll_divs=q,
                  coll_choices=[1, 2, 3], show_warnings=False)
    with pytest.raises(ValueError):
        solve_VIE_1(quadrature="gauss", **common)
    with pytest.raises(ValueError):
        solve_VIE_1(kernel_interp_degree=3, **common)              # collocation quadrature
    with pytest.raises(ValueError):
        solve_VIE_1(mesh_samples=3, **common)                      # collocation quadrature
    solve_VIE_1(mesh_samples=9, **common)                          # allowed: the default
    with pytest.raises(ValueError):
        solve_VIE_1(quadrature="product", mesh_samples=4, **common)  # not a multiple of q
    with pytest.raises(ValueError):
        solve_VIE_1(quadrature="product", kernel_interp_degree=0, **common)
    with pytest.raises(ValueError):
        solve_VIE_1(kernel_values=C, g_values=Cd, time_step=dt, coll_divs=4,
                    coll_choices=[1, 2], quadrature="product", show_warnings=False)  # rho_m = 3
    with pytest.raises(ValueError):
        solve_VIE_1(kernel_values=C, g_values=Cd, time_step=dt, coll_divs=5,
                    coll_choices=[1, 2], quadrature="product", show_warnings=False)  # |rho_m| > 1
    with pytest.raises(ValueError):
        solve_VIE_1(quadrature="product", force_continuous=True, **common)  # no initial value
    with pytest.raises(ValueError):
        solve_VIE_1(kernel_values=C, g_values=Cd, time_step=dt, coll_divs=3,
                    coll_choices=[1, 2], quadrature="product", force_continuous=True,
                    soln_init_value=0.0, show_warnings=False)      # c_m != 1


def test_truncation_warning(capsys):
    dt, q = 0.05, 3
    N = n_samples(q, 10) + 2
    t, C, Cd, _ = damped(dt, N)
    vals = solve_VIE_1(kernel_values=C, g_values=Cd, time_step=dt, coll_divs=q,
                       coll_choices=[1, 2, 3], quadrature="product")
    assert len(vals) == N - 2
    assert "truncated" in capsys.readouterr().out
