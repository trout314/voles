"""VolterraSolution: the 1.0 solution object (contract §8).

Solutions here come from the engines' entry points (voles._sampled.solve,
voles._functional.solve), which the 1.0 solvers call. Each builder also makes
the same solve through the 0.10 API, for comparison. What is tested is the
object itself: grid output, structure, evaluation, breakpoint conventions,
to_ppoly, pickling and the 0.11 compatibility aliases.
"""
import pathlib
import pickle
import warnings

import numpy as np
import pytest

import voles
from voles import VolterraSolution
from voles import _functional, _sampled

DATA = pathlib.Path(__file__).parent / "data"


# ---------------------------------------------------------------- builders

def sampled(kind="vie2", N=1030, d=0, m=None, cplx=False, coll_setting=None,
            quadrature="product", Q=None):
    """A sampled-regime solution via the 0.10 API. Default N leaves a short
    final interval for every default mesh width."""
    dt = 1.0 / (N - 1)
    t = np.arange(N) * dt
    if d == 0:
        K = np.exp(-t) * (1 + 0.3 * np.cos(3 * t))
        g = np.sin(2 * t) + 0.5 * t
    else:
        A = np.array([[0.2, -0.1], [0.05, 0.15]])
        K = np.eye(d)[None] + np.exp(-t)[:, None, None] * A[None]
        shape = (N, d) if m is None else (N, d, m)
        g = np.sin(2 * t).reshape((N,) + (1,) * (len(shape) - 1)) + np.zeros(shape)
        g = g + 0.1 * np.arange(np.prod(shape[1:])).reshape(shape[1:])
    if cplx:
        K, g = K * (1 + 0.2j), g * (1 - 0.3j)
    if kind in ("vie1", "vie1c"):
        g = g - g[0]
    defaults = {"vie1": (3, [1, 2, 3]), "vie1c": (3, [1, 2, 3]), "vie2": (2, [0, 1, 2]),
                "vide": (2, [0, 1, 2])}
    divs, choices = coll_setting or defaults[kind]
    kw = dict(kernel_values=K, g_values=g, time_step=dt, coll_divs=divs, coll_choices=choices,
              quadrature=quadrature)
    if Q is not None:
        kw["mesh_samples"] = Q
    y0 = (0.0 if d == 0 else (np.zeros(d) if m is None else np.zeros((d, m))))
    if kind == "vie1c":
        kw.update(force_continuous=True, soln_init_value=y0)
    elif kind == "vide":
        kw.update(a_values=(-0.5 * np.ones(N) if d == 0 else
                            np.broadcast_to(-0.5 * np.eye(d), (N, d, d)).copy()),
                  soln_init_value=y0 + 1.0)
    eq = "vie1" if kind.startswith("vie1") else kind
    vals, leg = {"vie1": voles.solve_VIE_1, "vie2": voles.solve_VIE_2,
                 "vide": voles.solve_VIDE}[eq](return_function=True, **kw)
    sol = _sampled.solve(eq, **kw)
    return sol, vals, leg


def functional(kind="vie2", nodes=None, d=0, m=None, cplx=False, M=16):
    mesh = np.linspace(0, 2, M + 1) ** 1.5 * 2 ** -0.5
    if d == 0:
        kern = (lambda u: np.exp(-u) * (1 + 0.2j)) if cplx else (lambda u: np.exp(-u))
        g = lambda t: np.sin(2 * t) + 1.0                        # noqa: E731
        y0 = 1.0
    else:
        A = np.array([[0.2, -0.1], [0.05, 0.15]])
        kern = lambda u: np.eye(2) + np.exp(-np.asarray(u))[..., None, None] * A   # noqa: E731
        if m is None:
            g = lambda t: np.array([np.sin(2 * t) + 1.0, np.cos(t)])          # noqa: E731
            y0 = np.ones(2)
        else:
            g = lambda t: np.outer([np.sin(2 * t) + 1.0, np.cos(t)], np.arange(1, m + 1))  # noqa
            y0 = np.ones((2, m))
    nodes = voles.gauss_legendre_nodes(3) if nodes is None else np.asarray(nodes)
    kw = dict(kernel=kern, mesh_breakpoints=mesh, coll_nodes=nodes)
    if kind == "vie1":
        kw["g"] = lambda t: g(t) - g(0.0)                 # noqa: E731
    elif kind == "vie2":
        kw["g"] = g
    else:
        kw.update(g=g, soln_init_value=y0)
    fn = {"vie1": voles.function_solve_VIE_1, "vie2": voles.function_solve_VIE_2,
          "vide": voles.function_solve_VIDE}[kind]
    vals, leg = fn(return_function=True, **kw)
    sol = _functional.solve(kind, **kw)
    return sol, vals, leg


SAMPLED_CASES = {
    "vie1": dict(kind="vie1"),
    "vie1c": dict(kind="vie1c"),
    "vie2": dict(kind="vie2"),
    "vide": dict(kind="vide"),
    "vie2-colloc": dict(kind="vie2", quadrature="collocation"),
    "vie1-(4,[1,2,4])": dict(kind="vie1", coll_setting=(4, [1, 2, 4])),
    "vie2-vector": dict(kind="vie2", d=2),
    "vie2-matrix": dict(kind="vie2", d=2, m=3),
    "vide-matrix": dict(kind="vide", d=2, m=3),
    "vie1-complex": dict(kind="vie1", cplx=True),
    "vie2-complex-vector": dict(kind="vie2", d=2, cplx=True),
    "vie2-no-tail": dict(kind="vie2", N=1025),
}
FUNCTIONAL_CASES = {
    "vie2-gauss": dict(kind="vie2"),
    "vie2-radau": dict(kind="vie2", nodes=voles.radau_iia_nodes(3)),
    "vie1-radau": dict(kind="vie1", nodes=voles.radau_iia_nodes(3)),
    "vide-gauss": dict(kind="vide"),
    "vie2-vector": dict(kind="vie2", d=2),
    "vide-matrix": dict(kind="vide", d=2, m=3),
    "vie2-complex": dict(kind="vie2", cplx=True),
}
ALL = ([("s", k) for k in SAMPLED_CASES] + [("f", k) for k in FUNCTIONAL_CASES])


def build(which, key):
    return sampled(**SAMPLED_CASES[key]) if which == "s" else functional(**FUNCTIONAL_CASES[key])


def interior_mask(sol):
    """Points of sol.t that are not interior breakpoints."""
    t, bps = sol.t, sol.mesh[1:-1]
    return ~np.any(np.abs(t[:, None] - bps[None, :]) <= 4 * np.spacing(bps)[None, :], axis=1)


# ------------------------------------------------------------ construction

def test_not_constructible_directly():
    with pytest.raises(TypeError, match="returned by the solvers"):
        VolterraSolution()


def test_is_public():
    assert "VolterraSolution" in voles.__all__


# ----------------------------------------------------------- grid output

@pytest.mark.parametrize("which, key", ALL)
def test_evaluating_at_t_reproduces_y(which, key):
    sol, _, _ = build(which, key)
    scale = max(1.0, float(np.max(np.abs(sol.y))))
    np.testing.assert_allclose(sol(sol.t), sol.y, rtol=0, atol=1e-12 * scale)


@pytest.mark.parametrize("key", list(SAMPLED_CASES))
def test_sampled_grid_is_the_input_grid(key):
    sol, vals, _ = sampled(**SAMPLED_CASES[key])
    N = len(vals)
    np.testing.assert_array_equal(sol.t, np.arange(N) * (1.0 / (N - 1)))
    assert sol.y is vals or np.array_equal(sol.y, vals)      # the solver's values, untouched
    assert sol.regime == "sampled" and sol.coll_setting is not None


@pytest.mark.parametrize("key", list(FUNCTIONAL_CASES))
def test_functional_grid_is_the_mesh(key):
    sol, _, _ = functional(**FUNCTIONAL_CASES[key])
    assert sol.t is sol.mesh
    assert sol.y.shape == (len(sol.mesh),) + sol.coefficients.shape[2:]
    assert sol.regime == "functional" and sol.coll_setting is None


def test_sampled_dense_output_matches_legacy_bitwise_off_breakpoints():
    """The copy-free Horner loop does the same arithmetic as 0.10's."""
    for key in ("vie1", "vie2-matrix", "vie1-complex"):
        sol, _, leg = sampled(**SAMPLED_CASES[key])
        bps = sol.mesh
        x = np.array([0.1, 0.37, 0.5, 0.83])
        tq = (bps[:-1, None] + x * np.diff(bps)[:, None]).ravel()
        np.testing.assert_array_equal(sol(tq), leg(tq))


# ---------------------------------------------------------- structure

@pytest.mark.parametrize("which, key", ALL)
def test_structure_shapes(which, key):
    sol, _, _ = build(which, key)
    M, p = len(sol.mesh) - 1, len(sol.nodes)
    cs = sol.coefficients.shape[2:]
    assert sol.coefficients.shape[0] == M
    assert sol.node_times.shape == (M, p)
    assert sol.node_values.shape == (M, p) + cs
    assert sol.y.shape[1:] == cs
    assert np.all(np.diff(sol.nodes) > 0) and 0 <= sol.nodes[0] and sol.nodes[-1] <= 1
    assert np.all(sol.node_times >= sol.mesh[:-1, None] - 1e-15)
    assert np.all(sol.node_times <= sol.mesh[1:, None] + 1e-15)


@pytest.mark.parametrize("key", list(FUNCTIONAL_CASES))
def test_functional_node_values_are_the_solver_output(key):
    sol, vals, _ = functional(**FUNCTIONAL_CASES[key])
    np.testing.assert_array_equal(sol.node_values, vals)


@pytest.mark.parametrize("key", ["vie1", "vie2", "vide", "vie2-matrix", "vie1-(4,[1,2,4])"])
def test_sampled_node_times_are_sample_times(key):
    """Including the final interval, whose nodes are snapped to its own grid."""
    sol, vals, _ = sampled(**SAMPLED_CASES[key])
    dt = sol.t[1]
    idx = np.rint(sol.node_times / dt).astype(int)
    np.testing.assert_array_equal(sol.node_times, idx * dt)
    # off the breakpoints the node values are the grid values
    inside = (idx % 1 == 0) & ~np.isin(sol.node_times, sol.mesh)
    local = (sol.node_times - sol.mesh[:-1, None]) / np.diff(sol.mesh)[:, None]
    inside &= (local > 1e-9) & (local < 1 - 1e-9)
    scale = max(1.0, float(np.max(np.abs(vals))))
    np.testing.assert_allclose(sol.node_values[inside], vals[idx[inside]], rtol=0,
                               atol=1e-12 * scale)


def test_sampled_final_interval_nodes_are_snapped():
    sol, vals, _ = sampled(kind="vie2", N=1030, coll_setting=(4, [1, 3]), Q=8)
    # 1029 = 127*8 + 5: 127 - 1 regular intervals then one of 13 samples
    M = len(sol.mesh) - 1
    assert M == 128
    dt = sol.t[1]
    last = np.rint((sol.node_times[-1] - sol.mesh[-2]) / dt).astype(int)
    np.testing.assert_array_equal(last, [round(1 * 13 / 4), round(3 * 13 / 4)])   # [3, 10]
    regular = np.rint((sol.node_times[0] - sol.mesh[0]) / dt).astype(int)
    np.testing.assert_array_equal(regular, [2, 6])


def test_metadata():
    s, _, _ = sampled(kind="vie1c")
    assert (s.equation, s.regime, s.continuous, s.coll_setting) == ("vie1", "sampled", True,
                                                                     (3, [1, 2, 3]))
    np.testing.assert_array_equal(s.nodes, [1 / 3, 2 / 3, 1.0])
    f, _, _ = functional(kind="vie2")
    assert (f.equation, f.regime, f.continuous, f.coll_setting) == ("vie2", "functional", False,
                                                                    None)
    np.testing.assert_array_equal(f.nodes, voles.gauss_legendre_nodes(3))


# ----------------------------------------------------------- evaluation

def test_breakpoint_conventions():
    sol, _, _ = functional(kind="vie2")              # Gauss nodes: discontinuous at breakpoints
    c = sol.coefficients
    k = np.arange(1, len(sol.mesh) - 1)
    left = c[k - 1].sum(axis=1)
    right = c[k, 0]
    assert np.max(np.abs(left - right)) > 1e-8       # the limits really differ
    bps = sol.mesh[1:-1]
    np.testing.assert_allclose(sol(bps, at_breakpoints="left"), left, rtol=1e-14, atol=1e-15)
    np.testing.assert_allclose(sol(bps, at_breakpoints="right"), right, rtol=1e-14, atol=1e-15)
    np.testing.assert_allclose(sol(bps), 0.5 * (left + right), rtol=1e-14, atol=1e-15)
    np.testing.assert_array_equal(sol(bps), sol(bps, at_breakpoints="MEAN"))


def test_breakpoints_are_matched_within_a_few_ulps():
    sol, _, _ = functional(kind="vie2")
    b = sol.mesh[5]
    exact = sol(b)
    for k in range(-4, 5):
        assert sol(b + k * np.spacing(b)) == exact
    off = b + 1e-9
    assert sol(off) != exact
    assert abs(sol(off) - sol(b, at_breakpoints="right")) < 1e-7


def test_endpoints_use_the_only_limit():
    sol, _, _ = functional(kind="vie2")
    c = sol.coefficients
    assert sol(0.0) == pytest.approx(c[0, 0], abs=1e-15)
    assert sol(sol.mesh[-1]) == pytest.approx(c[-1].sum(), abs=1e-14)
    for mode in ("left", "right"):
        assert sol(0.0, at_breakpoints=mode) == sol(0.0)


def test_continuous_solution_limits_agree():
    sol, _, _ = functional(kind="vide")
    bps = sol.mesh[1:-1]
    np.testing.assert_allclose(sol(bps, at_breakpoints="left"),
                               sol(bps, at_breakpoints="right"), rtol=0, atol=1e-13)


def test_outside_is_nan():
    sol, _, _ = functional(kind="vie2", d=2)
    T = sol.mesh[-1]
    out = sol(np.array([-1e-6, T + 1e-6]))
    assert out.shape == (2, 2) and np.all(np.isnan(out))
    assert not np.any(np.isnan(sol(np.array([0.0, T]))))
    assert np.all(np.isnan(sol(np.nan)))


@pytest.mark.parametrize("which, key, cs", [("f", "vie2-gauss", ()), ("f", "vie2-vector", (2,)),
                                            ("f", "vide-matrix", (2, 3))])
def test_evaluation_shapes(which, key, cs):
    sol, _, _ = build(which, key)
    v = sol(0.3)
    if cs:
        assert isinstance(v, np.ndarray) and v.shape == cs
    else:
        assert type(v) is float
    tq = np.linspace(0, 0.9, 12).reshape(3, 4)
    assert sol(tq).shape == (3, 4) + cs
    assert sol([0.1, 0.2]).shape == (2,) + cs
    assert sol(np.array([])).shape == (0,) + cs


def test_complex_scalar_evaluation_is_a_python_complex():
    sol, _, _ = functional(kind="vie2", cplx=True)
    assert type(sol(0.3)) is complex


def test_bad_breakpoint_mode():
    sol, _, _ = functional()
    with pytest.raises(ValueError, match="at_breakpoints"):
        sol(0.5, at_breakpoints="average")
    with pytest.raises(TypeError, match="at_breakpoints"):
        sol(0.5, at_breakpoints=None)


# ------------------------------------------------------------- to_ppoly

@pytest.mark.parametrize("which, key", ALL)
def test_to_ppoly_matches_evaluation(which, key):
    sol, _, _ = build(which, key)
    pp = sol.to_ppoly()
    bps = sol.mesh
    x = np.array([0.13, 0.5, 0.91])
    tq = (bps[:-1, None] + x * np.diff(bps)[:, None]).ravel()
    ref = sol(tq)
    scale = max(1.0, float(np.max(np.abs(ref))))
    np.testing.assert_allclose(pp(tq), ref, rtol=0, atol=1e-10 * scale)
    assert np.all(np.isnan(pp(np.array([-0.5, bps[-1] + 0.5]))))
    # right-continuous at breakpoints
    np.testing.assert_allclose(pp(bps[1:-1]), sol(bps[1:-1], at_breakpoints="right"),
                               rtol=0, atol=1e-10 * scale)


def test_to_ppoly_derivative_and_integral():
    sol, _, _ = functional(kind="vide")
    pp = sol.to_ppoly()
    c, bps = sol.coefficients, sol.mesh
    n, xl = 3, 0.4
    h = bps[n + 1] - bps[n]
    t = bps[n] + xl * h
    dref = sum(k * c[n, k] * xl ** (k - 1) for k in range(1, c.shape[1])) / h
    assert pp.derivative()(t) == pytest.approx(dref, rel=1e-12)
    # integral over one interval = h * sum c_k / (k + 1)
    iref = h * sum(c[n, k] / (k + 1) for k in range(c.shape[1]))
    assert pp.integrate(bps[n], bps[n + 1]) == pytest.approx(iref, rel=1e-12)


def test_to_ppoly_complex_and_matrix():
    sol, _, _ = functional(kind="vie2", cplx=True)
    pp = sol.to_ppoly()
    assert np.iscomplexobj(pp.c)
    assert pp(0.37) == pytest.approx(sol(0.37), abs=1e-12)
    solm, _, _ = functional(kind="vide", d=2, m=3)
    assert solm.to_ppoly()(np.array([0.2, 0.6])).shape == (2, 2, 3)


# ------------------------------------------------- read-only, repr, pickle

def test_structure_is_read_only_but_y_is_writable():
    sol, _, _ = sampled(kind="vie2")
    for name in ("t", "mesh", "coefficients", "node_times", "node_values", "nodes"):
        arr = getattr(sol, name)
        with pytest.raises(ValueError, match="read-only"):
            arr[...] = 0
    before = sol(0.25)
    sol.y[:] = 0.0
    assert sol(0.25) == before


def test_repr():
    s, _, _ = sampled(kind="vie2", d=2, m=3)
    r = repr(s)
    assert r.startswith("<VolterraSolution vie2, sampled, ")
    assert "coll_setting=(2, [0, 1, 2])" in r and "shape=(2, 3)" in r
    f, _, _ = functional(kind="vide")
    assert "functional" in repr(f) and "coll_nodes=[" in repr(f)


@pytest.mark.parametrize("which, key", [("s", "vie1"), ("s", "vie2-matrix"), ("f", "vide-gauss"),
                                        ("f", "vie2-complex")])
def test_pickle_round_trip(which, key):
    sol, _, _ = build(which, key)
    _ = sol.t, sol.node_values                         # fill caches first
    back = pickle.loads(pickle.dumps(sol))
    tq = np.linspace(0, float(sol.mesh[-1]), 101)
    np.testing.assert_array_equal(back(tq), sol(tq))
    np.testing.assert_array_equal(back.y, sol.y)
    np.testing.assert_array_equal(back.t, sol.t)
    np.testing.assert_array_equal(back.node_values, sol.node_values)
    assert (back.equation, back.regime, back.coll_setting) == (sol.equation, sol.regime,
                                                                sol.coll_setting)


def test_0_10_pickles_still_load():
    """tests/data/solution_v0_10_0.pkl was written by voles 0.10.0's
    _SolutionFunction."""
    with open(DATA / "solution_v0_10_0.pkl", "rb") as f:
        payload = pickle.load(f)
    np.testing.assert_array_equal(payload["scalar"](payload["tq"]), payload["expect_scalar"])
    np.testing.assert_array_equal(payload["matrix"](payload["tq2"]), payload["expect_matrix"])


# ------------------------------------------- 0.10 compatibility aliases (0.11)

def test_list_protocol_and_mesh_breakpoints_are_deprecated():
    sol, _, leg = sampled(kind="vie2", N=82)
    with pytest.warns(DeprecationWarning, match="mesh_breakpoints"):
        np.testing.assert_array_equal(sol.mesh_breakpoints, sol.mesh)
    with pytest.warns(DeprecationWarning, match="polynomials"):
        polys = sol.polynomials
    assert len(polys) == len(leg.polynomials)
    with pytest.warns(DeprecationWarning, match="len"):
        assert len(sol) == len(sol.mesh) - 1
    with pytest.warns(DeprecationWarning, match="indexing"):
        p0 = sol[0]
    assert p0 == leg[0]
    with pytest.warns(DeprecationWarning, match="iterating"):
        assert sum(1 for _ in sol) == len(sol.mesh) - 1


def test_truthiness_does_not_warn():
    sol, _, _ = functional()
    with warnings.catch_warnings():
        warnings.simplefilter("error")
        assert sol
