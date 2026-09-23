"""Product-integration quadrature for the sampled-data VIE-2 solver
(``solve_VIE_2(quadrature="product")``); see test_vie1_product.py for the
construction. The second-kind equation is well posed and its collocation
converges for every node set, so the checks are:

* exactness against the callable-input solver for polynomial kernels
  (the interpolant is then the kernel itself);
* K == 1 reproduces polynomial solutions of degree m-1 exactly;
* order m in the data spacing at fixed mesh_samples;
* every sample is used, mesh_samples = coll_divs**2 is not the collocation
  scheme, and the D block driver agrees with the NumPy reference.
"""
import numpy as np
import pytest

from voles import solve_VIE_2, function_solve_VIE_2
from voles import _product


def cos_problem(dt, N):
    """y = cos t with K = exp(-tau): g = (cos t - sin t + exp(-t))/2."""
    t = dt * np.arange(N)
    K = np.exp(-t)
    y = np.cos(t)
    g = 0.5 * (np.cos(t) - np.sin(t) + np.exp(-t))
    return t, K, g, y


def n_samples(Q, intervals):
    return Q * intervals + 1


SETTINGS = [(1, [1]), (2, [1, 2]), (2, [0, 1, 2]), (3, [1, 2, 3]), (3, [0, 1, 2, 3]), (4, [2, 4])]


def sampled_values(sol, t, Q):
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


@pytest.mark.parametrize("coll_divs,choices", SETTINGS)
@pytest.mark.parametrize("Q_factor", [1, 2])
def test_polynomial_kernel_matches_exact_collocation(coll_divs, choices, Q_factor):
    m = len(choices)
    p = max(m, 2)
    Q = Q_factor * coll_divs
    dt = 0.05
    N = n_samples(Q, 12)
    t = dt * np.arange(N)
    kernel = lambda tau: 0.8 - 0.3 * tau + 0.1 * tau ** 2
    g = lambda tt: np.cos(1.1 * tt) - 0.3 * tt
    vals = solve_VIE_2(kernel_values=kernel(t), g_values=g(t), time_step=dt,
                       coll_divs=coll_divs, coll_choices=choices, quadrature="product",
                       mesh_samples=Q, kernel_interp_degree=p, show_warnings=False)
    mesh = np.arange(N // Q + 1) * (Q * dt)
    _, ref = function_solve_VIE_2(kernel=kernel, g=g, mesh_breakpoints=mesh,
                                  coll_divs=coll_divs, coll_choices=choices,
                                  return_function=True)
    assert np.max(np.abs(vals - sampled_values(ref, t, Q))) < 1e-8


def test_polynomial_kernel_matches_exact_collocation_vector():
    coll_divs, choices, Q, p = 2, [0, 1, 2], 2, 3
    dt = 0.05
    N = n_samples(Q, 12)
    t = dt * np.arange(N)
    A = np.array([[0.5, 0.2], [-0.1, 0.4]])
    B = np.array([[0.1, -0.05], [0.2, 0.15]])
    kernel = lambda tau: A + B * tau
    g = lambda tt: np.array([np.cos(tt), 0.5 * tt])
    K = np.array([kernel(tau) for tau in t])
    gv = np.array([g(tt) for tt in t])
    vals = solve_VIE_2(kernel_values=K, g_values=gv, time_step=dt, coll_divs=coll_divs,
                       coll_choices=choices, quadrature="product", mesh_samples=Q,
                       kernel_interp_degree=p, show_warnings=False)
    mesh = np.arange(N // Q + 1) * (Q * dt)
    _, ref = function_solve_VIE_2(kernel=kernel, g=g, mesh_breakpoints=mesh,
                                  coll_divs=coll_divs, coll_choices=choices,
                                  return_function=True)
    assert np.max(np.abs(vals - sampled_values(ref, t, Q))) < 1e-8


@pytest.mark.parametrize("coll_divs,choices", SETTINGS)
def test_reproduces_polynomial_solutions_for_unit_kernel(coll_divs, choices):
    m = len(choices)
    dt = 0.1
    N = n_samples(coll_divs, 10)
    t = dt * np.arange(N)
    y = t ** (m - 1)
    g = y - t ** m / m                      # y = g + int_0^t y
    vals = solve_VIE_2(kernel_values=np.ones(N), g_values=g, time_step=dt,
                       coll_divs=coll_divs, coll_choices=choices, quadrature="product",
                       show_warnings=False)
    assert np.max(np.abs(vals - y)) < 1e-9


def _max_err(dt, coll_divs, choices, T=12.0):
    Q = coll_divs
    N = int(round(T / dt)) + 1
    N = (N - 1) // Q * Q + 1
    t, K, g, y = cos_problem(dt, N)
    vals = solve_VIE_2(kernel_values=K, g_values=g, time_step=dt, coll_divs=coll_divs,
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
    t, K, g, y = cos_problem(dt, N)
    common = dict(kernel_values=K, g_values=g, time_step=dt, coll_divs=3,
                  coll_choices=[1, 2, 3], show_warnings=False)
    err_coll = np.max(np.abs(solve_VIE_2(**common) - y))
    err_prod = np.max(np.abs(solve_VIE_2(quadrature="product", **common) - y))
    assert err_prod < err_coll / 5


def test_every_sample_is_used():
    dt, q = 0.1, 3
    N = n_samples(q, 12)
    t, K, g, _ = cos_problem(dt, N)
    base = solve_VIE_2(kernel_values=K, g_values=g, time_step=dt, coll_divs=q,
                       coll_choices=[1, 2, 3], quadrature="product", show_warnings=False)
    for j in (1, 5, 7, N - 2):
        Kp = K.copy()
        Kp[j] += 0.1
        pert = solve_VIE_2(kernel_values=Kp, g_values=g, time_step=dt, coll_divs=q,
                           coll_choices=[1, 2, 3], quadrature="product", show_warnings=False)
        assert np.max(np.abs(pert - base)) > 1e-6, j
    for j in (1, 2, 4):
        gp = g.copy()
        gp[j] += 0.1
        pert = solve_VIE_2(kernel_values=K, g_values=gp, time_step=dt, coll_divs=q,
                           coll_choices=[1, 2, 3], quadrature="product", show_warnings=False)
        assert np.max(np.abs(pert - base)) > 1e-6, j


def test_mesh_samples_q_squared_is_not_the_collocation_scheme():
    q, choices = 2, [0, 1, 2]
    diffs = []
    for dt in (0.1, 0.05, 0.025):
        N = n_samples(q * q, int(round(6.0 / (q * q * dt))))
        t, K, g, y = cos_problem(dt, N)
        common = dict(kernel_values=K, g_values=g, time_step=dt, coll_divs=q,
                      coll_choices=choices, show_warnings=False)
        a = solve_VIE_2(**common)
        b = solve_VIE_2(quadrature="product", mesh_samples=q * q, **common)
        diffs.append(np.max(np.abs(a - b)))
        assert diffs[-1] > 1e-12
    assert diffs[2] < diffs[0] / 4


def test_extension_matches_numpy_reference():
    dt, q, Q = 0.05, 2, 4
    N = n_samples(Q, 20)
    t, K, g, _ = cos_problem(dt, N)
    a, _ = _product.solve_vie2_product(K, g, dt, q, [0, 1, 2], Q, 3, False, use_extension=True)
    b, _ = _product.solve_vie2_product(K, g, dt, q, [0, 1, 2], Q, 3, False, use_extension=False)
    assert np.max(np.abs(a - b)) < 1e-11


def test_vector_matrix_and_return_function():
    dt, q = 0.05, 2
    N = n_samples(q, 16)
    t, K1, g1, y1 = cos_problem(dt, N)
    K = np.zeros((N, 2, 2))
    K[:, 0, 0] = K1
    K[:, 1, 1] = 0.5 * K1
    G = np.zeros((N, 2, 3))
    for j in range(3):
        G[:, 0, j] = (j + 1) * g1
        G[:, 1, j] = -g1
    vals, sol = solve_VIE_2(kernel_values=K, g_values=G, time_step=dt, coll_divs=q,
                            coll_choices=[0, 1, 2], quadrature="product",
                            return_function=True, show_warnings=False)
    assert vals.shape == (N, 2, 3)
    s0 = solve_VIE_2(kernel_values=K1, g_values=2 * g1, time_step=dt, coll_divs=q,
                     coll_choices=[0, 1, 2], quadrature="product", show_warnings=False)
    s1 = solve_VIE_2(kernel_values=0.5 * K1, g_values=-g1, time_step=dt, coll_divs=q,
                     coll_choices=[0, 1, 2], quadrature="product", show_warnings=False)
    assert np.allclose(vals[:, 0, 1], s0, atol=1e-11)
    assert np.allclose(vals[:, 1, 1], s1, atol=1e-11)
    interior = np.array([i for i in range(N) if i % q != 0], dtype=int)
    assert np.allclose(sol(t[interior]), vals[interior], atol=1e-10)
    assert len(sol) == (N - 1) // q


def test_complex_passthrough():
    dt, q = 0.05, 2
    N = n_samples(q, 16)
    t, K, g, _ = cos_problem(dt, N)
    vals = solve_VIE_2(kernel_values=K * (1 + 0.5j), g_values=g * (1 + 0.5j), time_step=dt,
                       coll_divs=q, coll_choices=[0, 1, 2], quadrature="product",
                       show_warnings=False)
    real = solve_VIE_2(kernel_values=K, g_values=g, time_step=dt, coll_divs=q,
                       coll_choices=[0, 1, 2], quadrature="product", show_warnings=False)
    # K*(1+i/2) with g*(1+i/2) has solution y satisfying (1+i/2)-scaled equation:
    # y = (1+i/2) g + (1+i/2) K*y is not the same problem; just check the path runs
    assert vals.shape == real.shape and np.iscomplexobj(vals)


def test_validation():
    dt, q = 0.05, 2
    N = n_samples(4, 4)
    t, K, g, _ = cos_problem(dt, N)
    common = dict(kernel_values=K, g_values=g, time_step=dt, coll_divs=q,
                  coll_choices=[0, 1, 2], show_warnings=False)
    with pytest.raises(ValueError):
        solve_VIE_2(quadrature="gauss", **common)
    with pytest.raises(ValueError):
        solve_VIE_2(kernel_interp_degree=3, **common)
    with pytest.raises(ValueError):
        solve_VIE_2(mesh_samples=2, **common)
    with pytest.raises(ValueError):
        solve_VIE_2(quadrature="product", mesh_samples=3, **common)
    with pytest.raises(ValueError):
        solve_VIE_2(quadrature="product", kernel_interp_degree=0, **common)
