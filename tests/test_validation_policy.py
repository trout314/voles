"""The argument-validation rules of the 1.0 contract (docs/dev/api-contract-1.0.md §6, §9).

- A wrong *type* raises TypeError; the right type with a wrong *value*
  raises ValueError. Floats are never truncated to ints, and flags must be
  bools.
- Required arguments passed as None are rejected.
- Non-finite data are rejected, naming the input.

(Which options belong to which regime, and the shape rules, are in
test_api.py and test_api_shapes.py.)
"""
import numpy as np
import pytest

from voles import (gauss_legendre_nodes, lobatto_nodes, optimal_graded_mesh, radau_iia_nodes,
                   solve_vide, solve_vie1, solve_vie2)

N, DT = 81, 0.0125
T = np.arange(N) * DT
K = np.exp(-T)
G = np.sin(T)
MESH = np.linspace(0, 1, 9)


def vie1(**kw):
    return solve_vie1(**{**dict(kernel=K, g=G - G[0], dt=DT), **kw})


def vie2(**kw):
    return solve_vie2(**{**dict(kernel=K, g=G, dt=DT), **kw})


def vide(**kw):
    return solve_vide(**{**dict(kernel=K, g=G, y0=1.0, dt=DT), **kw})


def fvie1(**kw):
    return solve_vie1(**{**dict(kernel=np.exp, g=np.sin, mesh=MESH), **kw})


def fvie2(**kw):
    return solve_vie2(**{**dict(kernel=np.exp, g=np.cos, mesh=MESH), **kw})


def fvide(**kw):
    return solve_vide(**{**dict(kernel=np.exp, g=np.cos, y0=1.0, mesh=MESH), **kw})


def _id(case):
    call, kw = case[0], case[1]
    k, v = list(kw.items())[-1]
    return f"{call.__name__}-{k}={v!r}"


# ------------------------------------------------------------ type vs value

TYPE_ERRORS = [
    (vie2, dict(dt=None)),
    (vie1, dict(continuous=1, y0=0.0)),
    (vide, dict(coll_setting=2.5)),
    (fvie2, dict(coll_nodes=["a", "b"])),
    (fvie2, dict(kernel_singularity=["abc"])),
    (fvie1, dict(continuous=1, y0=0.0)),
]


@pytest.mark.parametrize("call, kw", TYPE_ERRORS, ids=[_id(c) for c in TYPE_ERRORS])
def test_wrong_type_is_a_type_error(call, kw):
    with pytest.raises(TypeError):
        call(**kw)


VALUE_ERRORS = [
    (fvie2, dict(coll_nodes=[])),
]


@pytest.mark.parametrize("call, kw", VALUE_ERRORS, ids=[_id(c) for c in VALUE_ERRORS])
def test_wrong_value_is_a_value_error(call, kw):
    with pytest.raises(ValueError):
        call(**kw)


@pytest.mark.parametrize("kw, exc", [
    (dict(alpha="0.5"), TypeError), (dict(t_end="1"), TypeError),
    (dict(n_intervals=10.0), TypeError), (dict(order=3.0), TypeError),
    (dict(n_intervals=True), TypeError),
    (dict(alpha=1.0), ValueError), (dict(t_end=0.0), ValueError), (dict(t_end=np.inf), ValueError),
    (dict(n_intervals=0), ValueError), (dict(order=0), ValueError),
])
def test_optimal_graded_mesh_validation(kw, exc):
    with pytest.raises(exc):
        optimal_graded_mesh(**{**dict(alpha=0.5, t_end=1.0, n_intervals=10, order=3), **kw})


@pytest.mark.parametrize("fn", [gauss_legendre_nodes, radau_iia_nodes, lobatto_nodes])
def test_node_helpers_validation(fn):
    with pytest.raises(TypeError):
        fn(3.0)
    with pytest.raises(TypeError):
        fn(True)
    with pytest.raises(ValueError):
        fn(0)


def test_numpy_scalars_are_accepted():
    """NumPy integers, floats and bools are the right types."""
    ref = vie2(coll_setting=(2, [0, 1, 2]), samples_per_interval=4)
    got = vie2(coll_setting=(np.int64(2), np.array([0, 1, 2])), samples_per_interval=np.int32(4),
               dt=np.float64(DT))
    np.testing.assert_array_equal(ref.y, got.y)
    np.testing.assert_array_equal(vie1(continuous=np.bool_(True), y0=0.0).y,
                                  vie1(continuous=True, y0=0.0).y)
    mesh = optimal_graded_mesh(alpha=np.float32(0.5), t_end=np.int64(1), n_intervals=np.int16(10),
                               order=np.int64(3))
    assert mesh.shape == (11,)


def test_quadrature_is_case_insensitive():
    np.testing.assert_array_equal(vie2(quadrature="product").y, vie2(quadrature="Product").y)
    np.testing.assert_array_equal(vie2(quadrature="collocation").y,
                                  vie2(quadrature="COLLOCATION").y)


# ------------------------------------------------------- required arguments

def test_vide_requires_an_initial_value():
    with pytest.raises(TypeError, match="y0 is required"):
        vide(y0=None)
    with pytest.raises(TypeError, match="y0 is required"):
        fvide(y0=None)


# ------------------------------------------------------------- non-finite data

@pytest.mark.parametrize("call, name, kw", [
    (vie2, "kernel", dict(kernel=np.where(T > 0.5, np.nan, K))),
    (vie2, "g", dict(g=np.where(T > 0.5, np.inf, G))),
    (vie2, "g", dict(g=np.where(T > 0.5, np.nan + 1j, G + 0j))),
    (vie1, "kernel", dict(kernel=np.where(T > 0.5, -np.inf, K))),
    (vie1, "y0", dict(y0=np.nan, continuous=True)),
    (vide, "a", dict(a=np.where(T > 0.5, np.nan, -0.5))),
    (vide, "a", dict(a=np.nan)),
    (vide, "y0", dict(y0=np.inf)),
    (fvide, "y0", dict(y0=np.nan)),
])
def test_non_finite_arrays_are_rejected(call, name, kw):
    with pytest.raises(ValueError, match=f"{name} contains a non-finite value"):
        call(**kw)


def test_non_finite_error_names_the_index():
    g = G.copy()
    g[40] = np.nan
    with pytest.raises(ValueError, match="at index 40"):
        vie2(g=g)
    g2 = np.ones((N, 2, 3))
    g2[7, 1, 2] = np.inf
    with pytest.raises(ValueError, match=r"at index \(7, 1, 2\)"):
        solve_vie2(kernel=np.exp(-T)[:, None, None] * np.eye(2), g=g2, dt=DT)


@pytest.mark.parametrize("call, which", [(fvie2, "g"), (fvie1, "g"), (fvide, "g"),
                                         (fvide, "a")])
def test_non_finite_callable_values_are_rejected(call, which):
    bad = lambda t: np.nan if t > 0.5 else 0.0          # noqa: E731
    with pytest.raises(ValueError, match=rf"{which}\(t\) returned a non-finite value"):
        call(**{which: bad})


def test_non_finite_vector_callable_is_rejected():
    with pytest.raises(ValueError, match=r"g\(t\) returned a non-finite value at t=0\.5625"):
        solve_vie2(kernel=lambda u: np.exp(-u) * np.eye(2),
                   g=lambda t: np.array([1.0, np.inf if t > 0.5 else 0.0]), mesh=MESH)


# ------------------------------------------------------------------ internal

def test_internal_error_codes_are_reported_as_bugs():
    from voles._dlang import _check_return
    with pytest.raises(RuntimeError, match="internal error.*please report"):
        _check_return(7, "volterra_solve_vie2")
