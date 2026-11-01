"""The 1.0 solvers' interface: regimes, validation, signatures, warnings.

docs/dev/api-contract-1.0.md §3-§5, §9-§10. The central table lists invalid
calls with the exception type each must raise (TypeError for a wrong type,
ValueError for a wrong value, NotImplementedError for what isn't supported
yet). Every message must also be free of 0.10 parameter names: the 1.0 layer
validates everything itself, and the engine's internal checks (which still
use the 0.10 names) must never be what a 1.0 user sees.
"""
import inspect
import re
import warnings

import numpy as np
import pytest

import voles
from voles import (AccuracyWarning, PerformanceWarning, VolesWarning, VolterraSolution,
                   solve_vide, solve_vie1, solve_vie2)

OLD_NAMES = re.compile(r"kernel_values|g_values|a_values|soln_init_value|time_step|coll_divs|"
                       r"coll_choices|mesh_samples|force_continuous|mesh_breakpoints|"
                       r"show_warnings|return_function|return_polys|function_solve|"
                       r"solve_VIE|solve_VIDE")

N, DT = 82, 1.0 / 81
T = np.arange(N) * DT
K = np.exp(-T)
G = np.sin(T)
K2 = np.exp(-T)[:, None, None] * np.eye(2) + 0.1
G2 = np.sin(T)[:, None] * np.ones((N, 2))
MESH = np.linspace(0, 1, 9)


def kern(u):
    return np.exp(-np.asarray(u, dtype=float))


def kern2(u):
    return np.exp(-np.asarray(u, dtype=float))[..., None, None] * np.eye(2) + 0.1


def v1(**kw):
    return solve_vie1(**{**dict(kernel=K, g=G - G[0], dt=DT), **kw})


def v2(**kw):
    return solve_vie2(**{**dict(kernel=K, g=G, dt=DT), **kw})


def vd(**kw):
    return solve_vide(**{**dict(kernel=K, g=G, y0=1.0, dt=DT), **kw})


def f1(**kw):
    return solve_vie1(**{**dict(kernel=kern, g=np.sin, mesh=MESH), **kw})


def f2(**kw):
    return solve_vie2(**{**dict(kernel=kern, g=np.cos, mesh=MESH), **kw})


def fd(**kw):
    return solve_vide(**{**dict(kernel=kern, g=np.cos, y0=1.0, mesh=MESH), **kw})


def nan_at(arr, i):
    arr = np.array(arr, dtype=float)
    arr[i] = np.nan
    return arr


INVALID = [
    # -- regimes
    (v2, dict(g=np.sin), NotImplementedError),
    (vd, dict(a=lambda t: -0.5), NotImplementedError),
    (f2, dict(g=G), NotImplementedError),
    (v2, dict(mesh=MESH), ValueError),
    (v2, dict(coll_nodes=[0.5, 1.0]), ValueError),
    (v2, dict(kernel_singularity=0.0), ValueError),
    (v2, dict(reuse_adaptive_blocks=False), ValueError),
    (f2, dict(dt=0.5), ValueError),
    (f2, dict(coll_setting=2), ValueError),
    (f2, dict(quadrature="collocation"), ValueError),
    (f2, dict(samples_per_interval=4), ValueError),
    (f2, dict(kernel_interp_degree=2), ValueError),
    (f2, dict(mesh=None), TypeError),
    (v2, dict(kernel=None), TypeError),
    # -- dt, quadrature
    (v2, dict(dt="0.1"), TypeError),
    (v2, dict(dt=0.0), ValueError),
    (v2, dict(dt=-1.0), ValueError),
    (v2, dict(dt=np.inf), ValueError),
    (v2, dict(quadrature=3), TypeError),
    (v2, dict(quadrature="simpson"), ValueError),
    # -- coll_setting
    (v2, dict(coll_setting=2.0), TypeError),
    (v2, dict(coll_setting=True), TypeError),
    (v2, dict(coll_setting="ab"), TypeError),
    (v2, dict(coll_setting=(1, 2, 3)), TypeError),
    (v2, dict(coll_setting=(2.0, [0, 1])), TypeError),
    (v2, dict(coll_setting=(2, [0.5, 1])), TypeError),
    (v2, dict(coll_setting=(2, 5)), TypeError),
    (v2, dict(coll_setting=0), ValueError),
    (v2, dict(coll_setting=(0, [0])), ValueError),
    (v2, dict(coll_setting=(2, [])), ValueError),
    (v2, dict(coll_setting=(2, [1, 1])), ValueError),
    (v2, dict(coll_setting=(2, [0, 3])), ValueError),
    (v1, dict(coll_setting=(2, [0, 1])), ValueError),
    (v1, dict(coll_setting=(3, [1])), ValueError),                       # |rho| = 2
    (v1, dict(coll_setting=(3, [1, 2]), continuous=True, y0=0.0), ValueError),   # c_m < 1
    (v1, dict(coll_setting=(4, [1, 2, 4]), continuous=True, y0=0.0), ValueError),  # |rho| = 3
    # -- mesh width and interpolation degree
    (v2, dict(samples_per_interval=4.0), TypeError),
    (v2, dict(samples_per_interval=0), ValueError),
    (v2, dict(samples_per_interval=5), ValueError),                      # not a multiple of 2
    (v2, dict(quadrature="collocation", samples_per_interval=10), ValueError),
    (v2, dict(kernel_interp_degree=2.0), TypeError),
    (v2, dict(kernel_interp_degree=0), ValueError),
    (v2, dict(kernel_interp_degree=2, quadrature="collocation"), ValueError),
    (v2, dict(kernel=K[:10], g=G[:10], kernel_interp_degree=12), ValueError),
    (v1, dict(kernel=K[:6], g=G[:6] - G[0]), ValueError),                 # < one interval
    # -- continuous / y0
    (v1, dict(continuous="yes", y0=0.0), TypeError),
    (v1, dict(continuous=True), ValueError),
    (v1, dict(y0=0.0), ValueError),
    (vd, dict(y0=None), TypeError),
    # -- sampled shapes and values
    (v2, dict(kernel=np.ones((N, 3))), ValueError),                      # 2-D: reserved
    (v2, dict(kernel=np.ones((N, 2, 3))), ValueError),
    (v2, dict(kernel=np.ones((N, 2, 2, 2))), ValueError),
    (v2, dict(kernel=np.array(["a"] * N)), TypeError),
    (v2, dict(kernel=[[1.0, 2.0], [3.0]]), ValueError),
    (v2, dict(g=G[:50]), ValueError),
    (v2, dict(kernel=K2, g=np.ones((N, 3))), ValueError),
    (v2, dict(kernel=K2, g=G), ValueError),
    (vd, dict(a=np.ones((N, 2, 2))), ValueError),
    (vd, dict(kernel=K2, g=G2, y0=np.ones(3)), ValueError),
    (vd, dict(kernel=K2, g=np.ones((N, 2, 3)), y0=np.ones((2, 4))), ValueError),
    (v2, dict(kernel=K2, g=np.ones((N, 2, 0))), ValueError),
    (vd, dict(y0=[1.0, 2.0]), ValueError),
    (v2, dict(kernel=nan_at(K, 40)), ValueError),
    (v2, dict(g=nan_at(G, 7)), ValueError),
    (vd, dict(a=nan_at(np.full(N, -0.5), 3)), ValueError),
    (vd, dict(y0=np.inf), ValueError),
    (v2, dict(kernel=K2, g=G2, quadrature="collocation", coll_setting=5), NotImplementedError),
    # -- functional
    (f2, dict(mesh=MESH + 0.1), ValueError),
    (f2, dict(mesh=MESH[::-1]), ValueError),
    (f2, dict(mesh=nan_at(MESH, 3)), ValueError),
    (f2, dict(mesh=MESH.reshape(3, 3)), ValueError),
    (f2, dict(mesh=[0.0]), ValueError),
    (f2, dict(mesh="abc"), TypeError),
    (f2, dict(coll_nodes=[0.5, 1.5]), ValueError),
    (f2, dict(coll_nodes=[0.5, 0.5]), ValueError),
    (f1, dict(coll_nodes=[0.0, 1.0]), ValueError),
    (f1, dict(coll_nodes=[0.2]), ValueError),                            # |rho| = 4
    (f1, dict(coll_nodes=[0.3, 0.6], continuous=True, y0=0.0), ValueError),
    (f2, dict(kernel_singularity=True), TypeError),
    (f2, dict(kernel_singularity={0.0: 1.5}), ValueError),
    (f2, dict(reuse_adaptive_blocks="yes"), TypeError),
    (f2, dict(kernel=lambda u: np.ones(3)), ValueError),
    (f2, dict(kernel=kern2, g=lambda t: np.ones(3)), ValueError),
    (f2, dict(g=lambda t: np.nan if t > 0.5 else 0.0), ValueError),
    (fd, dict(a=lambda t: np.inf), ValueError),
    (fd, dict(kernel=kern2, g=lambda t: np.ones(2), y0=np.ones(3)), ValueError),
    (fd, dict(kernel=kern2, g=lambda t: np.ones((2, 3)), y0=np.ones((2, 4))), ValueError),
    (fd, dict(y0=np.nan), ValueError),
]


def _id(case):
    call, kw, exc = case
    k, v = next(iter(kw.items()))
    v = (f"array{np.shape(v)}" if isinstance(v, np.ndarray) else
         "callable" if callable(v) else repr(v))
    return f"{call.__name__}-{k}={v[:24]}-{exc.__name__}"


@pytest.mark.parametrize("call, kw, exc", INVALID, ids=[_id(c) for c in INVALID])
def test_invalid_call(call, kw, exc):
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", VolesWarning)
        with pytest.raises(exc) as info:
            call(**kw)
    assert type(info.value) is exc
    msg = str(info.value)
    assert not OLD_NAMES.search(msg), f"0.10 name in 1.0 message: {msg}"


# -------------------------------------------------------------- what is accepted

def test_defaults_that_cannot_be_told_from_explicit_values_are_ignored():
    """An explicit default for the other regime's option is indistinguishable
    from leaving it out (contract §3)."""
    ref = f2()
    np.testing.assert_array_equal(f2(dt=1.0, quadrature="Product").y, ref.y)
    ref_s = v2()
    np.testing.assert_array_equal(v2(reuse_adaptive_blocks=True).y, ref_s.y)


def test_coll_setting_forms():
    a = v2(coll_setting=(2, [0, 1, 2]))
    np.testing.assert_array_equal(v2(coll_setting=2).y, a.y)
    np.testing.assert_array_equal(v2(coll_setting=[2, (2, 0, 1)]).y, a.y)
    np.testing.assert_array_equal(v2(coll_setting=(np.int64(2), np.array([0, 1, 2]))).y, a.y)
    np.testing.assert_array_equal(v2().y, a.y)
    assert a.coll_setting == (2, [0, 1, 2])
    assert v1(coll_setting=4).coll_setting == (4, [1, 2, 3, 4])


def test_numpy_scalars_and_lists_are_accepted():
    ref = v2(samples_per_interval=4)
    got = solve_vie2(kernel=list(K), g=list(G), dt=np.float64(DT),
                     samples_per_interval=np.int32(4))
    np.testing.assert_array_equal(got.y, ref.y)


def test_returns_a_volterra_solution_in_both_regimes():
    for sol, regime in ((v1(), "sampled"), (f1(), "functional"), (vd(), "sampled"),
                        (fd(), "functional"), (v2(), "sampled"), (f2(), "functional")):
        assert isinstance(sol, VolterraSolution) and sol.regime == regime


def test_continuous_vie1_in_both_regimes():
    s = v1(continuous=True, y0=0.0)
    f = f1(continuous=True, y0=0.0)
    assert s.continuous and f.continuous and s.equation == f.equation == "vie1"


# ----------------------------------------------------------------- signatures

@pytest.mark.parametrize("fn", [solve_vie1, solve_vie2, solve_vide])
def test_signature_is_keyword_only_without_private_parameters(fn):
    params = inspect.signature(fn).parameters.values()
    assert all(p.kind is inspect.Parameter.KEYWORD_ONLY for p in params)
    assert not [p.name for p in params if p.name.startswith("_")]
    with pytest.raises(TypeError):
        fn(K, G)


def test_public_names():
    for name in ("solve_vie1", "solve_vie2", "solve_vide", "VolterraSolution"):
        assert name in voles.__all__


# ------------------------------------------------------------------- warnings

def _recorded(call, **kw):
    with warnings.catch_warnings(record=True) as rec:
        warnings.simplefilter("always")
        call(**kw)
    return [w for w in rec if issubclass(w.category, VolesWarning)]


@pytest.mark.parametrize("call, kw, category, text", [
    (v1, dict(g=G + 0.5), AccuracyWarning, "g(0) is not zero"),
    (f1, dict(g=lambda t: np.sin(t) + 0.5), AccuracyWarning, "g(0) is not zero"),
    (v1, dict(coll_setting=(3, [1, 2])), AccuracyWarning, "rho = 1"),
    (f1, dict(coll_nodes=voles.gauss_legendre_nodes(4)), AccuracyWarning, "rho = 1"),
    (f1, dict(coll_nodes=[0.5, 1.0], continuous=True, y0=1.0), AccuracyWarning, "rho = 1"),
    (v1, dict(kernel=K - K[0] + 1e-4, quadrature="collocation"), AccuracyWarning,
     "unstable"),
    (f2, dict(kernel=lambda u: np.asarray(u, dtype=float) ** -0.5, kernel_singularity=0.0),
     AccuracyWarning, "appears uniform"),
    (f2, dict(kernel_singularity=[0.0, 5.0], mesh=MESH ** 2), VolesWarning, "outside"),
    (f2, dict(kernel=lambda u: np.asarray(u, dtype=float) ** -0.5, mesh=MESH ** 2,
              kernel_singularity={0.0: 0.3}), PerformanceWarning, "failed its accuracy check"),
])
def test_warnings_use_1_0_names_and_point_at_the_caller(call, kw, category, text):
    rec = _recorded(call, **kw)
    assert rec, "expected a warning"
    w = rec[0]
    assert issubclass(w.category, category) and text in str(w.message)
    assert not OLD_NAMES.search(str(w.message)), str(w.message)
    assert w.filename == __file__


@pytest.mark.parametrize("nodes", [[1 / 3, 2 / 3, 1.0], [0.5], [0.4, 1.0]])
def test_gauss_legendre_odd_p_and_rho_below_one_do_not_warn(nodes):
    """rho = (-1)^p for Gauss-Legendre nodes: odd p gives rho = -1, full order."""
    assert _recorded(f1, coll_nodes=nodes) == []
    assert _recorded(f1, coll_nodes=voles.gauss_legendre_nodes(3)) == []


@pytest.mark.parametrize("call", [f1, f2])
def test_correctly_declared_exponent_does_not_warn(call):
    kw = dict(kernel=lambda u: np.asarray(u, dtype=float) ** -0.5, mesh=MESH ** 2,
              kernel_singularity={0.0: 0.5})
    if call is f1:
        kw["g"] = lambda t: t
    assert _recorded(call, **kw) == []


def test_numba_fallback_warns():
    try:
        rec = _recorded(v2, kernel=K[:26], g=G[:26], quadrature="collocation", coll_setting=5)
    except NotImplementedError:
        pytest.skip("numba not available")
    assert any(issubclass(w.category, PerformanceWarning) for w in rec)
