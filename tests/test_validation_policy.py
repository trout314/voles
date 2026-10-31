"""The argument-validation rules of the 1.0 contract (docs/dev/api-contract-1.0.md §6, §9),
as they apply to the 0.10 API in 0.11.

- A wrong *type* raises TypeError; the right type with a wrong *value*
  raises ValueError. Floats are never truncated to ints, and flags must be
  bools.
- Required arguments passed as None are rejected.
- Non-finite data are rejected, naming the input.
"""
import inspect

import numpy as np
import pytest

import voles
from voles import (solve_VIE_1, solve_VIE_2, solve_VIDE, function_solve_VIE_1,
                   function_solve_VIE_2, function_solve_VIDE, optimal_graded_mesh,
                   gauss_legendre_nodes, radau_iia_nodes, lobatto_nodes)

N, DT = 81, 0.0125
T = np.arange(N) * DT
K = np.exp(-T)
G = np.sin(T)
MESH = np.linspace(0, 1, 9)


def vie1(**kw):
    return solve_VIE_1(**{**dict(kernel_values=K, g_values=G, time_step=DT), **kw})


def vie2(**kw):
    return solve_VIE_2(**{**dict(kernel_values=K, g_values=G, time_step=DT), **kw})


def vide(**kw):
    return solve_VIDE(**{**dict(kernel_values=K, g_values=G, soln_init_value=1.0,
                                time_step=DT), **kw})


def fvie1(**kw):
    return function_solve_VIE_1(**{**dict(kernel=np.exp, g=np.sin, mesh_breakpoints=MESH), **kw})


def fvie2(**kw):
    return function_solve_VIE_2(**{**dict(kernel=np.exp, g=np.cos, mesh_breakpoints=MESH), **kw})


def fvide(**kw):
    return function_solve_VIDE(**{**dict(kernel=np.exp, g=np.cos, soln_init_value=1.0,
                                         mesh_breakpoints=MESH), **kw})


# ------------------------------------------------------------ type vs value

TYPE_ERRORS = [
    (vie2, dict(coll_divs=2.0)),
    (vie2, dict(coll_divs=True)),
    (vie2, dict(coll_divs=2, coll_choices=[0.0, 2.0])),
    (vie2, dict(mesh_samples=4.0)),
    (vie2, dict(kernel_interp_degree=2.0)),
    (vie2, dict(time_step="0.1")),
    (vie2, dict(time_step=None)),
    (vie2, dict(quadrature=3)),
    (vie2, dict(show_warnings="no")),
    (vie2, dict(show_warnings=0)),
    (vie2, dict(return_function=1)),
    (vie2, dict(return_polys=1)),
    (vie1, dict(force_continuous=1, soln_init_value=0.0)),
    (vide, dict(coll_divs=2.5)),
    (fvie2, dict(coll_divs=2.5)),           # used to run silently with nodes {0, 0.4, 0.8}
    (fvie2, dict(coll_divs=2.0)),
    (fvie2, dict(coll_choices=[1.0, 2.0])),
    (fvie2, dict(kernel_singularity=True)),
    (fvie2, dict(kernel_singularity=["abc"])),
    (fvie2, dict(reuse_adaptive_blocks="yes")),
    (fvie2, dict(return_function=1)),
    (fvie1, dict(force_continuous=1, soln_init_value=0.0)),
    (fvide, dict(show_warnings=None)),
]


@pytest.mark.parametrize("call, kw", TYPE_ERRORS,
                         ids=[f"{c.__name__}-{list(k)[-1]}={list(k.values())[-1]!r}"
                              for c, k in TYPE_ERRORS])
def test_wrong_type_is_a_type_error(call, kw):
    with pytest.raises(TypeError):
        call(**kw)


VALUE_ERRORS = [
    (vie2, dict(coll_divs=0)),
    (vie2, dict(coll_divs=2, coll_choices=[0, 3])),
    (vie2, dict(mesh_samples=0)),
    (vie2, dict(time_step=0.0)),
    (vie2, dict(time_step=-1.0)),
    (vie2, dict(time_step=np.inf)),
    (vie2, dict(quadrature="simpson")),
    (fvie2, dict(coll_divs=0)),
    (fvie2, dict(kernel_singularity={0.0: 1.5})),
]


@pytest.mark.parametrize("call, kw", VALUE_ERRORS,
                         ids=[f"{c.__name__}-{list(k)[-1]}={list(k.values())[-1]!r}"
                              for c, k in VALUE_ERRORS])
def test_wrong_value_is_a_value_error(call, kw):
    with pytest.raises(ValueError):
        call(**kw)


@pytest.mark.parametrize("kw, exc", [
    (dict(alpha="0.5"), TypeError), (dict(T="1"), TypeError), (dict(M=10.0), TypeError),
    (dict(order=3.0), TypeError), (dict(M=True), TypeError),
    (dict(alpha=1.0), ValueError), (dict(T=0.0), ValueError), (dict(T=np.inf), ValueError),
    (dict(M=0), ValueError), (dict(order=0), ValueError),
])
def test_optimal_graded_mesh_validation(kw, exc):
    args = {**dict(alpha=0.5, T=1.0, M=10, order=3), **kw}
    with pytest.raises(exc):
        optimal_graded_mesh(**args)


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
    ref = vie2(coll_divs=2, coll_choices=[0, 1, 2], mesh_samples=4, show_warnings=True)
    got = vie2(coll_divs=np.int64(2), coll_choices=np.array([0, 1, 2]),
               mesh_samples=np.int32(4), time_step=np.float64(DT), show_warnings=np.bool_(True))
    np.testing.assert_array_equal(ref, got)
    mesh = optimal_graded_mesh(alpha=np.float32(0.5), T=np.int64(1), M=np.int16(10),
                               order=np.int64(3))
    assert mesh.shape == (11,)


def test_quadrature_is_case_insensitive():
    np.testing.assert_array_equal(vie2(quadrature="product"), vie2(quadrature="Product"))
    np.testing.assert_array_equal(vie2(quadrature="collocation"),
                                  vie2(quadrature="COLLOCATION"))


# ------------------------------------------------------- required arguments

def test_vide_requires_an_initial_value():
    """soln_init_value=None used to give an all-NaN solution."""
    with pytest.raises(TypeError, match="soln_init_value is required"):
        vide(soln_init_value=None)
    with pytest.raises(TypeError, match="soln_init_value is required"):
        fvide(soln_init_value=None)


# ------------------------------------------------------------- non-finite data

@pytest.mark.parametrize("call, name, kw", [
    (vie2, "kernel_values", dict(kernel_values=np.where(T > 0.5, np.nan, K))),
    (vie2, "g_values", dict(g_values=np.where(T > 0.5, np.inf, G))),
    (vie2, "g_values", dict(g_values=np.where(T > 0.5, np.nan + 1j, G + 0j))),
    (vie1, "kernel_values", dict(kernel_values=np.where(T > 0.5, -np.inf, K))),
    (vie1, "soln_init_value", dict(soln_init_value=np.nan, force_continuous=True)),
    (vide, "a_values", dict(a_values=np.where(T > 0.5, np.nan, -0.5))),
    (vide, "soln_init_value", dict(soln_init_value=np.inf)),
    (fvide, "soln_init_value", dict(soln_init_value=np.nan)),
])
def test_non_finite_arrays_are_rejected(call, name, kw):
    with pytest.raises(ValueError, match=f"{name} contains a non-finite value"):
        call(**kw)


def test_non_finite_error_names_the_index():
    g = G.copy()
    g[40] = np.nan
    with pytest.raises(ValueError, match="at index 40"):
        vie2(g_values=g)
    g2 = np.ones((N, 2, 3))
    g2[7, 1, 2] = np.inf
    with pytest.raises(ValueError, match=r"at index \(7, 1, 2\)"):
        solve_VIE_2(kernel_values=np.exp(-T)[:, None, None] * np.eye(2), g_values=g2,
                    time_step=DT)


@pytest.mark.parametrize("call, which", [(fvie2, "g"), (fvie1, "g"), (fvide, "g"),
                                         (fvide, "a")])
def test_non_finite_callable_values_are_rejected(call, which):
    bad = lambda t: np.nan if t > 0.5 else 0.0          # noqa: E731
    with pytest.raises(ValueError, match=rf"{which}\(t\) returned a non-finite value"):
        call(**{which: bad})


def test_non_finite_vector_callable_is_rejected():
    with pytest.raises(ValueError, match=r"g\(t\) returned a non-finite value at t=0\.5625"):
        function_solve_VIE_2(kernel=lambda u: np.exp(-u) * np.eye(2),
                             g=lambda t: np.array([1.0, np.inf if t > 0.5 else 0.0]),
                             mesh_breakpoints=np.linspace(0, 1, 9))


# ------------------------------------------------------------- misc. Phase 1

def test_internal_error_codes_are_reported_as_bugs():
    from voles._dlang import _check_return
    with pytest.raises(RuntimeError, match="internal error.*please report"):
        _check_return(7, "volterra_solve_vie2")


@pytest.mark.parametrize("fn", [function_solve_VIE_1, function_solve_VIE_2,
                                function_solve_VIDE])
def test_no_private_parameters_in_public_signatures(fn):
    assert not [p for p in inspect.signature(fn).parameters if p.startswith("_")]
