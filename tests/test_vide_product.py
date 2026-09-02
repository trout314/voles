"""Product-integration quadrature for the sampled-data VIDE solver
(``solve_VIDE(quadrature="product")``); see test_vie1_product.py for the
construction. The VIDE collocation represents y on each mesh interval as
y_n + H sum_k Y_{n,k} beta_k(v) with beta_k the integrated Lagrange basis, so
the product-integration blocks are those of the basis {H beta_k, 1}. Checks:

* exactness against the callable-input solver for polynomial kernels with a
  non-constant a(t);
* the ODE limit and K == 1 reproduce polynomial solutions of degree m;
* order m in the data spacing at fixed mesh_samples on the damped-oscillator
  memory-kernel problem;
* every sample is used, mesh_samples = coll_divs**2 is not the collocation
  scheme, and the D block driver agrees with the NumPy reference.
"""
import numpy as np
import pytest

from voles import solve_VIDE, function_solve_VIDE
from voles import _product


def damped(dt, N, gam=0.5):
    """y' = int_0^t K(t-s) y(s) ds with K = -exp(-gam t), y(0) = 1:
    y solves y'' + gam y' + y = 0."""
    w = np.sqrt(1.0 - gam ** 2 / 4)
    t = dt * np.arange(N)
    y = np.exp(-gam * t / 2) * (np.cos(w * t) + (gam / (2 * w)) * np.sin(w * t))
    K = -np.exp(-gam * t)
    return t, K, y


def exp_problem(dt, N):
    """y = exp(-t), K = 1, a = 1/2: g = -exp(-t)/2 - 1."""
    t = dt * np.arange(N)
    return t, np.ones(N), 0.5 * np.ones(N), -0.5 * np.exp(-t) - 1.0, np.exp(-t)


def n_samples(Q, intervals):
    return Q * intervals + 1


SETTINGS = [(1, [1]), (2, [1, 2]), (2, [0, 1, 2]), (3, [1, 2, 3]), (3, [0, 1, 2, 3])]


@pytest.mark.parametrize("coll_divs,choices", SETTINGS)
@pytest.mark.parametrize("Q_factor", [1, 2])
def test_polynomial_kernel_matches_exact_collocation(coll_divs, choices, Q_factor):
    m = len(choices)
    p = max(m, 2)
    Q = Q_factor * coll_divs
    dt = 0.05
    N = n_samples(Q, 12)
    t = dt * np.arange(N)
    kernel = lambda tau: -0.8 + 0.3 * tau - 0.1 * tau ** 2
    a = lambda tt: 0.3 - 0.1 * tt
    g = lambda tt: np.cos(1.1 * tt)
    y0 = 0.7
    vals = solve_VIDE(kernel_values=kernel(t), a_values=a(t), g_values=g(t),
                      soln_init_value=y0, time_step=dt, coll_divs=coll_divs,
                      coll_choices=choices, quadrature="product", mesh_samples=Q,
                      kernel_interp_degree=p, show_warnings=False)
    mesh = np.arange(N // Q + 1) * (Q * dt)
    _, ref = function_solve_VIDE(kernel=kernel, a=a, g=g, soln_init_value=y0,
                                 mesh_breakpoints=mesh, coll_divs=coll_divs,
                                 coll_choices=choices, return_function=True)
    assert np.max(np.abs(vals - ref(t))) < 1e-8


def test_polynomial_kernel_matches_exact_collocation_vector():
    coll_divs, choices, Q, p = 2, [0, 1, 2], 2, 3
    dt = 0.05
    N = n_samples(Q, 12)
    t = dt * np.arange(N)
    A = np.array([[-0.5, 0.2], [0.1, -0.4]])
    B = np.array([[0.1, -0.05], [0.2, 0.15]])
    kernel = lambda tau: A + B * tau
    a = lambda tt: np.array([[0.2 - 0.1 * tt, 0.05], [-0.05, 0.1]])
    g = lambda tt: np.array([np.cos(tt), 0.5 * tt])
    y0 = np.array([0.3, -0.4])
    K = np.array([kernel(tau) for tau in t])
    av = np.array([a(tt) for tt in t])
    gv = np.array([g(tt) for tt in t])
    vals = solve_VIDE(kernel_values=K, a_values=av, g_values=gv, soln_init_value=y0,
                      time_step=dt, coll_divs=coll_divs, coll_choices=choices,
                      quadrature="product", mesh_samples=Q, kernel_interp_degree=p,
                      show_warnings=False)
    mesh = np.arange(N // Q + 1) * (Q * dt)
    _, ref = function_solve_VIDE(kernel=kernel, a=a, g=g, soln_init_value=y0,
                                 mesh_breakpoints=mesh, coll_divs=coll_divs,
                                 coll_choices=choices, return_function=True)
    assert np.max(np.abs(vals - ref(t))) < 1e-8


@pytest.mark.parametrize("coll_divs,choices", SETTINGS)
def test_reproduces_polynomial_solutions(coll_divs, choices):
    m = len(choices)
    dt = 0.1
    N = n_samples(coll_divs, 10)
    t = dt * np.arange(N)
    y = t ** m
    # ODE limit K == 0 with a = 1/2: y' = a y + g
    g = m * t ** (m - 1) - 0.5 * y
    vals = solve_VIDE(kernel_values=np.zeros(N), a_values=0.5 * np.ones(N), g_values=g,
                      soln_init_value=0.0, time_step=dt, coll_divs=coll_divs,
                      coll_choices=choices, quadrature="product", show_warnings=False)
    assert np.max(np.abs(vals - y)) < 1e-9
    # K == 1, a == 0: y' = g + int_0^t y
    g = m * t ** (m - 1) - t ** (m + 1) / (m + 1)
    vals = solve_VIDE(kernel_values=np.ones(N), g_values=g, soln_init_value=0.0,
                      time_step=dt, coll_divs=coll_divs, coll_choices=choices,
                      quadrature="product", show_warnings=False)
    assert np.max(np.abs(vals - y)) < 1e-9


def _max_err(dt, coll_divs, choices, T=12.0):
    Q = coll_divs
    N = int(round(T / dt)) + 1
    N = (N - 1) // Q * Q + 1
    t, K, y = damped(dt, N)
    vals = solve_VIDE(kernel_values=K, soln_init_value=1.0, time_step=dt, coll_divs=coll_divs,
                      coll_choices=choices, quadrature="product", show_warnings=False)
    return np.max(np.abs(vals - y))


@pytest.mark.parametrize("coll_divs,choices,expected", [
    (2, [1, 2], 2), (2, [0, 1, 2], 3), (3, [1, 2, 3], 3)])
def test_convergence_order(coll_divs, choices, expected):
    errs = [_max_err(dt, coll_divs, choices) for dt in (0.1, 0.05, 0.025)]
    rate = np.log2(errs[1] / errs[2])
    assert rate > expected - 0.4, (errs, rate)


def test_finer_mesh_beats_present_scheme_on_coarse_data():
    dt = 0.2
    N = n_samples(9, 8)
    t, K, y = damped(dt, N)
    common = dict(kernel_values=K, soln_init_value=1.0, time_step=dt, coll_divs=3,
                  coll_choices=[1, 2, 3], show_warnings=False)
    err_coll = np.max(np.abs(solve_VIDE(**common) - y))
    err_prod = np.max(np.abs(solve_VIDE(quadrature="product", **common) - y))
    assert err_prod < err_coll / 5


def test_every_sample_is_used():
    dt, q = 0.1, 3
    N = n_samples(q, 12)
    t, K, y = damped(dt, N)
    base = solve_VIDE(kernel_values=K, soln_init_value=1.0, time_step=dt, coll_divs=q,
                      coll_choices=[1, 2, 3], quadrature="product", show_warnings=False)
    for j in (1, 5, 7, N - 2):
        Kp = K.copy()
        Kp[j] += 0.1
        pert = solve_VIDE(kernel_values=Kp, soln_init_value=1.0, time_step=dt, coll_divs=q,
                          coll_choices=[1, 2, 3], quadrature="product", show_warnings=False)
        assert np.max(np.abs(pert - base)) > 1e-6, j


def test_mesh_samples_q_squared_is_not_the_collocation_scheme():
    q, choices = 2, [0, 1, 2]
    diffs = []
    for dt in (0.1, 0.05, 0.025):
        N = n_samples(q * q, int(round(6.0 / (q * q * dt))))
        t, K, y = damped(dt, N)
        common = dict(kernel_values=K, soln_init_value=1.0, time_step=dt, coll_divs=q,
                      coll_choices=choices, show_warnings=False)
        a = solve_VIDE(**common)
        b = solve_VIDE(quadrature="product", mesh_samples=q * q, **common)
        diffs.append(np.max(np.abs(a - b)))
        assert diffs[-1] > 1e-12
    assert diffs[2] < diffs[0] / 4


def test_extension_matches_numpy_reference():
    dt, q, Q = 0.05, 2, 4
    N = n_samples(Q, 20)
    t, K, a, g, _ = exp_problem(dt, N)
    x, _ = _product.solve_vide_product(K, a, g, dt, q, [0, 1, 2], Q, 3, 1.0, False,
                                       use_extension=True)
    z, _ = _product.solve_vide_product(K, a, g, dt, q, [0, 1, 2], Q, 3, 1.0, False,
                                       use_extension=False)
    assert np.max(np.abs(x - z)) < 1e-11


def test_vector_matrix_and_return_function():
    dt, q = 0.05, 2
    N = n_samples(q, 16)
    t, K1, a1, g1, y1 = exp_problem(dt, N)
    K = np.zeros((N, 2, 2))
    K[:, 0, 0] = K1
    K[:, 1, 1] = K1
    A = np.zeros((N, 2, 2))
    A[:, 0, 0] = a1
    A[:, 1, 1] = a1
    G = np.zeros((N, 2, 3))
    Y0 = np.zeros((2, 3))
    for j in range(3):
        G[:, 0, j] = (j + 1) * g1
        G[:, 1, j] = g1
        Y0[:, j] = [j + 1, 1.0]
    vals, sol = solve_VIDE(kernel_values=K, a_values=A, g_values=G, soln_init_value=Y0,
                           time_step=dt, coll_divs=q, coll_choices=[0, 1, 2],
                           quadrature="product", return_function=True, show_warnings=False)
    assert vals.shape == (N, 2, 3)
    for j in range(3):
        assert np.allclose(vals[:, 0, j], (j + 1) * y1, atol=1e-6)
        assert np.allclose(vals[:, 1, j], y1, atol=1e-6)
    assert np.allclose(sol(t), vals, atol=1e-10)
    assert len(sol) == (N - 1) // q
    single, s1 = solve_VIDE(kernel_values=K1, a_values=a1, g_values=g1, soln_init_value=1.0,
                            time_step=dt, coll_divs=q, coll_choices=[0, 1, 2],
                            quadrature="product", return_function=True, show_warnings=False)
    assert np.allclose(single, y1, atol=1e-6)
    assert abs(s1(0.0) - 1.0) < 1e-12


def test_complex_passthrough():
    dt, q = 0.05, 2
    N = n_samples(q, 16)
    t, K, a, g, y = exp_problem(dt, N)
    vals = solve_VIDE(kernel_values=K.astype(complex), a_values=a, g_values=g,
                      soln_init_value=1.0 + 0j, time_step=dt, coll_divs=q,
                      coll_choices=[0, 1, 2], quadrature="product", show_warnings=False)
    assert np.iscomplexobj(vals)
    assert np.allclose(vals.real, y, atol=1e-6)
    assert np.allclose(vals.imag, 0.0, atol=1e-10)


def test_validation():
    dt, q = 0.05, 2
    N = n_samples(4, 4)
    t, K, a, g, _ = exp_problem(dt, N)
    common = dict(kernel_values=K, a_values=a, g_values=g, soln_init_value=1.0,
                  time_step=dt, coll_divs=q, coll_choices=[0, 1, 2], show_warnings=False)
    with pytest.raises(ValueError):
        solve_VIDE(quadrature="gauss", **common)
    with pytest.raises(ValueError):
        solve_VIDE(kernel_interp_degree=3, **common)
    with pytest.raises(ValueError):
        solve_VIDE(mesh_samples=2, **common)
    with pytest.raises(ValueError):
        solve_VIDE(quadrature="product", mesh_samples=3, **common)
    with pytest.raises(ValueError):
        solve_VIDE(kernel_values=K, a_values=a[:-1], g_values=g, soln_init_value=1.0,
                   time_step=dt, coll_divs=q, coll_choices=[0, 1, 2], quadrature="product",
                   show_warnings=False)
