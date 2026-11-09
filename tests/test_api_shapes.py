"""The shape and matrix rule of the 1.0 solvers (contract §6).

A problem is matrix-valued exactly when some input has a column axis (a
sampled g of shape (N, d, m), a callable g returning (d, m), or a y0 of
shape (d, m)); inputs without one are shared by all m columns. Each column
of a matrix solve must equal the vector solve of that column's data.
"""
import numpy as np
import pytest

from voles import solve_vide, solve_vie1, solve_vie2

N, DT, D, M = 202, 1.0 / 201, 2, 3
T = np.arange(N) * DT
A2 = np.array([[0.3, -0.2], [0.1, 0.25]])
K = np.eye(D)[None] * 0.5 + np.exp(-T)[:, None, None] * A2[None]
G = np.stack([np.sin((j + 1) * T)[:, None] * np.array([1.0, 0.5]) for j in range(M)], axis=2)
Y0 = np.array([[1.0, 0.0, -1.0], [0.5, 2.0, 0.0]])
MESH = np.linspace(0, 1, 11)


def kern(u):
    return 0.5 * np.eye(D) + np.exp(-np.asarray(u, dtype=float))[..., None, None] * A2


def g_mat(t):
    return np.stack([np.sin((j + 1) * t) * np.array([1.0, 0.5]) for j in range(M)], axis=1)


def g_vec(t):
    return np.array([np.cos(t), 1.0 + t])


def close(a, b):
    np.testing.assert_allclose(a, b, rtol=1e-13, atol=1e-13)


# ------------------------------------------------------------------- sampled

def test_sampled_vie2_matrix_g():
    sol = solve_vie2(kernel=K, g=G, dt=DT)
    assert sol.y.shape == (N, D, M) and sol.coefficients.shape[2:] == (D, M)
    for j in range(M):
        close(sol.y[..., j], solve_vie2(kernel=K, g=G[..., j], dt=DT).y)


@pytest.mark.parametrize("quadrature", ["product", "collocation"])
def test_sampled_vide_shared_g_with_matrix_y0(quadrature):
    g = G[..., 0]                                         # (N, d): shared
    sol = solve_vide(kernel=K, g=g, y0=Y0, dt=DT, quadrature=quadrature)
    assert sol.y.shape == (N, D, M)
    for j in range(M):
        close(sol.y[..., j], solve_vide(kernel=K, g=g, y0=Y0[:, j], dt=DT,
                                        quadrature=quadrature).y)


def test_sampled_vide_matrix_g_with_shared_y0():
    sol = solve_vide(kernel=K, g=G, y0=Y0[:, 0], dt=DT)
    assert sol.y.shape == (N, D, M)
    for j in range(M):
        close(sol.y[..., j], solve_vide(kernel=K, g=G[..., j], y0=Y0[:, 0], dt=DT).y)


def test_sampled_vide_no_g_with_matrix_y0():
    sol = solve_vide(kernel=K, y0=Y0, dt=DT)
    for j in range(M):
        close(sol.y[..., j], solve_vide(kernel=K, y0=Y0[:, j], dt=DT).y)


@pytest.mark.parametrize("g_shared", [True, False])
def test_sampled_vie1_continuous_shared_inputs(g_shared):
    g1 = G - G[0]
    if g_shared:            # (N, d) g shared by the columns of a (d, m) y0
        sol = solve_vie1(kernel=K, g=g1[..., 0], continuous=True, y0=Y0, dt=DT)
        refs = [solve_vie1(kernel=K, g=g1[..., 0], continuous=True, y0=Y0[:, j], dt=DT)
                for j in range(M)]
    else:                   # (d,) y0 shared by the columns of an (N, d, m) g
        sol = solve_vie1(kernel=K, g=g1, continuous=True, y0=Y0[:, 1], dt=DT)
        refs = [solve_vie1(kernel=K, g=g1[..., j], continuous=True, y0=Y0[:, 1], dt=DT)
                for j in range(M)]
    assert sol.y.shape == (N, D, M)
    for j, ref in enumerate(refs):
        close(sol.y[..., j], ref.y)


def test_sampled_vie1_continuous_no_g_with_matrix_y0():
    sol = solve_vie1(kernel=K, continuous=True, y0=Y0, dt=DT)
    for j in range(M):
        close(sol.y[..., j], solve_vie1(kernel=K, continuous=True, y0=Y0[:, j], dt=DT).y)


def test_sampled_complex():
    sol = solve_vie2(kernel=K * (1 + 0.2j), g=G * (1 - 0.5j), dt=DT)
    assert np.iscomplexobj(sol.y) and np.iscomplexobj(sol.coefficients)
    assert sol.y.shape == (N, D, M)
    s = solve_vie2(kernel=np.exp(-T) * (1 + 1j), g=np.sin(T), dt=DT)
    assert s.y.dtype == np.complex128 and type(s(0.5)) is complex


def test_sampled_dtypes_are_upcast():
    s32 = solve_vie2(kernel=np.exp(-T).astype(np.float32), g=np.sin(T).astype(np.float32),
                     dt=DT)
    sint = solve_vie2(kernel=np.ones(N, dtype=int), g=np.ones(N, dtype=int), dt=DT)
    assert s32.y.dtype == np.float64 and sint.y.dtype == np.float64


# ---------------------------------------------------------------- functional

def test_functional_vie2_matrix_g():
    sol = solve_vie2(kernel=kern, g=g_mat, mesh=MESH)
    assert sol.node_values.shape[2:] == (D, M) and sol.y.shape == (len(MESH), D, M)
    for j in range(M):
        ref = solve_vie2(kernel=kern, g=lambda t, j=j: g_mat(t)[:, j], mesh=MESH)
        close(sol.node_values[..., j], ref.node_values)


def test_functional_vide_shared_g_with_matrix_y0():
    sol = solve_vide(kernel=kern, g=g_vec, y0=Y0, mesh=MESH)
    assert sol.y.shape == (len(MESH), D, M)
    for j in range(M):
        close(sol.node_values[..., j],
              solve_vide(kernel=kern, g=g_vec, y0=Y0[:, j], mesh=MESH).node_values)


def test_functional_vide_matrix_g_with_shared_y0():
    sol = solve_vide(kernel=kern, g=g_mat, y0=Y0[:, 2], mesh=MESH)
    for j in range(M):
        close(sol.node_values[..., j],
              solve_vide(kernel=kern, g=lambda t, j=j: g_mat(t)[:, j], y0=Y0[:, 2],
                         mesh=MESH).node_values)


def test_functional_vie1_continuous_shared_g_with_matrix_y0():
    g = lambda t: g_vec(t) - g_vec(0.0)                   # noqa: E731
    sol = solve_vie1(kernel=kern, g=g, continuous=True, y0=Y0, mesh=MESH)
    for j in range(M):
        close(sol.node_values[..., j],
              solve_vie1(kernel=kern, g=g, continuous=True, y0=Y0[:, j],
                         mesh=MESH).node_values)


def test_functional_vie1_continuous_no_g_with_matrix_y0():
    sol = solve_vie1(kernel=kern, continuous=True, y0=Y0, mesh=MESH)
    assert sol.y.shape == (len(MESH), D, M)
    for j in range(M):
        close(sol.y[..., j],
              solve_vie1(kernel=kern, continuous=True, y0=Y0[:, j], mesh=MESH).y)


def test_functional_vie1_continuous_no_g_with_complex_matrix_y0():
    Yc = Y0 * (1 + 0.5j)
    sol = solve_vie1(kernel=kern, continuous=True, y0=Yc, mesh=MESH)
    assert sol.y.shape == (len(MESH), D, M) and np.iscomplexobj(sol.y)
    for j in range(M):
        close(sol.y[..., j],
              solve_vie1(kernel=kern, continuous=True, y0=Yc[:, j], mesh=MESH).y)


def test_functional_complex():
    sol = solve_vide(kernel=lambda u: np.exp(-u) * (1 + 0.5j), g=np.cos, y0=1.0, mesh=MESH)
    assert np.iscomplexobj(sol.y) and type(sol(0.3)) is complex


# --------------------------------------------------------------------- rule

def test_column_counts_must_agree():
    with pytest.raises(ValueError, match="agree on the number of columns"):
        solve_vide(kernel=K, g=G, y0=np.ones((D, M + 1)), dt=DT)
    with pytest.raises(ValueError, match="agree on the number of columns"):
        solve_vide(kernel=kern, g=g_mat, y0=np.ones((D, M + 1)), mesh=MESH)


def test_scalar_problems_have_no_column_axis():
    with pytest.raises(ValueError):
        solve_vie2(kernel=np.exp(-T), g=np.ones((N, 3)), dt=DT)
    with pytest.raises(ValueError):
        solve_vide(kernel=np.exp(-T), g=np.sin(T), y0=np.ones(3), dt=DT)


# ------------------------------------------------------------- constant a

A_CONST = np.array([[0.0, 1.0], [-1.0, -0.1]])


def test_constant_a_sampled_equals_broadcast_samples():
    for a, A in ((-0.5, np.full(N, -0.5)), ):
        np.testing.assert_array_equal(
            solve_vide(kernel=np.exp(-T), a=a, g=np.cos(T), y0=1.0, dt=DT).y,
            solve_vide(kernel=np.exp(-T), a=A, g=np.cos(T), y0=1.0, dt=DT).y)
    np.testing.assert_array_equal(
        solve_vide(kernel=K, a=A_CONST, y0=Y0, dt=DT).y,
        solve_vide(kernel=K, a=np.broadcast_to(A_CONST, (N, D, D)), y0=Y0, dt=DT).y)


def test_constant_a_functional_equals_constant_callable():
    np.testing.assert_array_equal(
        solve_vide(kernel=lambda u: np.exp(-u), a=-0.5, g=np.cos, y0=1.0, mesh=MESH).node_values,
        solve_vide(kernel=lambda u: np.exp(-u), a=lambda t: -0.5, g=np.cos, y0=1.0,
                   mesh=MESH).node_values)
    np.testing.assert_array_equal(
        solve_vide(kernel=kern, a=A_CONST, y0=Y0, mesh=MESH).node_values,
        solve_vide(kernel=kern, a=lambda t: A_CONST, y0=Y0, mesh=MESH).node_values)


def test_constant_a_does_not_decide_the_regime():
    assert solve_vide(kernel=lambda u: np.exp(-u), a=0.3, y0=1.0, mesh=MESH).regime == "functional"
    assert solve_vide(kernel=np.exp(-T), a=0.3, y0=1.0, dt=DT).regime == "sampled"


@pytest.mark.parametrize("kw, text", [
    (dict(kernel=K, a=-0.5, y0=Y0[:, 0], dt=DT), "a (2, 2) matrix"),
    (dict(kernel=np.exp(-T), a=A_CONST, y0=1.0, dt=DT), "a number"),
    (dict(kernel=lambda u: np.exp(-u), a=A_CONST, y0=1.0, mesh=MESH), "a number"),
    (dict(kernel=np.exp(-T), a=np.ones(5), y0=1.0, dt=DT), "or be a constant"),
])
def test_constant_a_shape_errors(kw, text):
    with pytest.raises(ValueError, match=text.replace("(", r"\(").replace(")", r"\)")):
        solve_vide(**kw)
