"""The engines' entry points, voles._sampled.solve and voles._functional.solve.

Each returns a VolterraSolution built from the engine's own output plus
metadata (resolved setting, mesh width, final-interval nodes) derived with the
engine's helpers. These tests sweep the configuration space and require:

- the solution carries the engine's numbers bit for bit (values, node
  values, coefficients, mesh);
- the metadata agrees with what the engine did (solve() raises RuntimeError
  if its mesh-width rule and the engine's mesh disagree).

(The engines trust their inputs: validation is the 1.0 layer's, tested in
test_api.py, test_validation_policy.py and test_input_validation.py.)
"""
import itertools

import numpy as np
import pytest

import voles
from voles import _functional, _sampled
from voles._product import mesh_split, snap_nodes

ENGINE = {"vie1": _sampled.vie1, "vie2": _sampled.vie2, "vide": _sampled.vide}
FENGINE = {"vie1": _functional.vie1, "vie2": _functional.vie2,
           "vide": _functional.vide}


def sampled_kw(eq, N, d, m, cplx, continuous=False, quadrature="product", setting=None,
               Q=None, p=None):
    """The sampled engine's keyword arguments, as the 1.0 layer resolves them."""
    from voles._api import _resolve_coll_setting
    dt = 1.0 / (N - 1)
    t = np.arange(N) * dt
    rng = np.random.default_rng(N + d)
    if d == 0:
        K = np.exp(-t) * (1 + 0.3 * np.cos(3 * t))
    else:
        K = np.eye(d)[None] + np.exp(-t)[:, None, None] * (0.3 / np.sqrt(d)) * \
            rng.standard_normal((d, d))[None]
    shape = (N,) if d == 0 else ((N, d) if m is None else (N, d, m))
    g = np.sin(2 * t).reshape((N,) + (1,) * (len(shape) - 1)) + np.zeros(shape)
    if cplx:
        K, g = K * (1 + 0.2j), g * (1 - 0.3j)
    divs, choices = _resolve_coll_setting(eq, setting)
    kw = dict(kernel=K, g=g, dt=dt, divs=divs, choices=choices, quadrature=quadrature,
              Q=Q or _sampled._samples_per_interval(eq, quadrature, None, divs),
              p=p or (len(choices) if quadrature == "product" else 0), diagnose=False)
    y0 = 0.0 if d == 0 else np.zeros(shape[1:])
    if eq == "vie1":
        kw.update(g=g - g[0], y0=y0 if continuous else None)
    elif eq == "vide":
        kw.update(a=(np.full(N, -0.5) if d == 0
                     else np.broadcast_to(-0.5 * np.eye(d), (N, d, d)).copy()), y0=y0 + 1)
    return kw


SHAPES = [(0, None, False), (0, None, True), (2, None, False), (10, None, False),
          (2, 3, False), (2, None, True)]
METHODS = [("vie1", False), ("vie1", True), ("vie2", False), ("vide", False)]
SAMPLED = [dict(eq=eq, cont=c, N=N, d=d, m=m, cplx=x, quadrature=q)
           for (eq, c), (d, m, x), N, q in itertools.product(
               METHODS, SHAPES, (82, 1030), ("collocation", "product"))]


def _id(c):
    return (f"{c['eq']}{'c' if c['cont'] else ''}-N{c['N']}-d{c['d']}-m{c['m']}"
            f"-c{int(c['cplx'])}-{c['quadrature']}")


def check_sampled(eq, kw, continuous=False):
    sol = _sampled.solve(eq, continuous=continuous, **kw)
    engine_kw = dict(kw, continuous=continuous) if eq == "vie1" else kw
    values, pieces = ENGINE[eq](**engine_kw)
    np.testing.assert_array_equal(sol.y, values)
    np.testing.assert_array_equal(sol.coefficients, pieces._unit)
    np.testing.assert_array_equal(sol.mesh, pieces.mesh_breakpoints)
    # node times are sample times inside their intervals
    dt = kw["dt"]
    idx = np.rint(sol.node_times / dt)
    np.testing.assert_array_equal(sol.node_times, idx * dt)
    assert np.all(sol.node_times >= sol.mesh[:-1, None] - 1e-12)
    assert np.all(sol.node_times <= sol.mesh[1:, None] + 1e-12)
    assert sol.regime == "sampled" and sol.equation == eq
    assert sol.continuous == (eq == "vide" or continuous)
    assert (sol.samples_per_interval, sol.quadrature) == (kw["Q"], kw["quadrature"])
    return sol


@pytest.mark.parametrize("case", SAMPLED, ids=[_id(c) for c in SAMPLED])
def test_sampled_engine_shapes_and_quadratures(case):
    kw = sampled_kw(case["eq"], case["N"], case["d"], case["m"], case["cplx"], case["cont"],
                    case["quadrature"])
    check_sampled(case["eq"], kw, case["cont"])


SETTINGS = {
    "vie1": [dict(), dict(setting=2), dict(setting=4), dict(setting=(4, [1, 2, 4])),
             dict(setting=(3, [1, 3])), dict(setting=(2, [1, 2])), dict(Q=3), dict(Q=27),
             dict(setting=(4, [2, 4]), Q=8)],
    "vie2": [dict(), dict(setting=3), dict(setting=(4, [1, 3])), dict(setting=(2, [0, 2])),
             dict(setting=(1, [0, 1])), dict(Q=4), dict(Q=10), dict(p=5)],
    "vide": [dict(), dict(setting=(3, [1, 2, 3])), dict(setting=4), dict(Q=6)],
}
SETTING_CASES = [(eq, s, q) for eq, lst in SETTINGS.items() for s in lst
                 for q in ("collocation", "product")
                 if not (q == "collocation" and ("Q" in s or "p" in s))]


@pytest.mark.parametrize("eq, setting, quadrature", SETTING_CASES,
                         ids=[f"{e}-{q}-{s}" for e, s, q in SETTING_CASES])
def test_sampled_engine_settings(eq, setting, quadrature):
    kw = sampled_kw(eq, 1030, 0, None, False, quadrature=quadrature, **setting)
    sol = check_sampled(eq, kw)
    divs, choices = sol.coll_setting
    np.testing.assert_array_equal(sol.nodes, np.array(choices) / divs)
    assert (divs, choices) == (kw["divs"], kw["choices"])


def test_sampled_final_interval_nodes_follow_the_engine_rule():
    kw = sampled_kw("vie2", 1030, 0, None, False, setting=(4, [1, 3]), Q=8)
    sol = _sampled.solve("vie2", **kw)
    M_reg, Qp = mesh_split(1030, 8)
    assert Qp and len(sol.mesh) - 1 == M_reg + 1
    offsets = np.rint((sol.node_times - sol.mesh[:-1, None]) / kw["dt"]).astype(int)
    assert np.all(offsets[:-1] == [2, 6])
    np.testing.assert_array_equal(offsets[-1], snap_nodes([1, 3], 4, Qp))


def test_sampled_numba_fallback_through_the_entry_point():
    kw = sampled_kw("vie2", 26, 0, None, False, quadrature="collocation", setting=5)
    if not _sampled._numba_available:
        pytest.skip("numba not available")
    check_sampled("vie2", kw)


def test_sampled_metadata_check_catches_an_engine_mismatch(monkeypatch):
    """If the metadata solve() derives ever disagreed with the mesh the engine
    built, the consistency check raises instead of returning wrong metadata."""
    real = _sampled._ENGINE["vie2"]

    def engine_with_a_wider_mesh(**kw):
        values, pieces = real(**kw)
        pieces.mesh_breakpoints = pieces.mesh_breakpoints * 2.0
        return values, pieces

    monkeypatch.setitem(_sampled._ENGINE, "vie2", engine_with_a_wider_mesh)
    with pytest.raises(RuntimeError, match="internal error"):
        _sampled.solve("vie2", **sampled_kw("vie2", 1030, 0, None, False))


# ------------------------------------------------------------- functional

def kern_scalar(u):
    return np.exp(-u)


def kern_vec(u):
    A = np.array([[0.2, -0.1], [0.05, 0.15]])
    return np.eye(2) + np.exp(-np.asarray(u, dtype=float))[..., None, None] * A


def functional_kw(eq, shape, mesh, continuous=False, nodes=None):
    """The callable engine's keyword arguments, as the 1.0 layer resolves them."""
    if shape == "s":
        kw = dict(kernel=kern_scalar, g=lambda t: np.sin(2 * t) + 1)
        y0 = 1.0
    elif shape == "c":
        kw = dict(kernel=lambda u: kern_scalar(u) * (1 + 0.2j), g=lambda t: np.sin(2 * t) + 1)
        y0 = 1.0
    elif shape == "v":
        kw = dict(kernel=kern_vec, g=lambda t: np.array([np.sin(2 * t) + 1, np.cos(t)]))
        y0 = np.ones(2)
    else:
        kw = dict(kernel=kern_vec,
                  g=lambda t: np.outer([np.sin(2 * t) + 1, np.cos(t)], [1.0, 2.0, 3.0]))
        y0 = np.ones((2, 3))
    if nodes is None:
        nodes = np.array([1, 2, 3]) / 3 if eq == "vie1" else np.array([0, 1, 2]) / 2
    elif isinstance(nodes, str):                           # "divs4"
        nodes = np.arange(1 if eq == "vie1" else 0, 5) / 4
    kw.update(mesh=np.asarray(mesh, dtype=float), nodes=np.sort(np.asarray(nodes, dtype=float)),
              kernel_singularity=None, reuse_adaptive_blocks=True)
    if eq == "vie1":
        g = kw["g"]
        kw["g"] = lambda t: g(t) - g(0.0)
        kw["y0"] = 0 * np.asarray(y0) if continuous else None
    elif eq == "vide":
        kw.update(a=None, y0=np.asarray(y0, dtype=float))
    return kw


MESHES = {"uniform": np.linspace(0, 1, 13), "graded": np.linspace(0, 1, 13) ** 2}
NODES = [None, "divs4", np.array([1, 2, 3]) / 3, voles.radau_iia_nodes(3), [0.9, 0.2, 0.5]]
FUNCTIONAL = [(eq, c, sh, mn, nd) for (eq, c), sh, mn, nd in itertools.product(
    METHODS, "scvm", MESHES, range(len(NODES)))
    if not (eq == "vie1" and c and nd in (3, 4))]          # inadmissible for continuous VIE-1


@pytest.mark.parametrize("eq, cont, shape, mesh_name, nodes", FUNCTIONAL,
                         ids=[f"{e}{'c' if c else ''}-{s}-{m}-n{n}" for e, c, s, m, n in FUNCTIONAL])
def test_functional_engine(eq, cont, shape, mesh_name, nodes):
    kw = functional_kw(eq, shape, MESHES[mesh_name], cont, NODES[nodes])
    sol = _functional.solve(eq, continuous=cont, **kw)
    node_values, pieces = FENGINE[eq](**(dict(kw, continuous=cont) if eq == "vie1" else kw))
    np.testing.assert_array_equal(sol.node_values, node_values)
    np.testing.assert_array_equal(sol.coefficients, pieces._unit)
    np.testing.assert_array_equal(sol.mesh, pieces.mesh_breakpoints)
    widths = np.diff(sol.mesh)
    np.testing.assert_array_equal(sol.node_times,
                                  sol.mesh[:-1, None] + sol.nodes[None, :] * widths[:, None])
    assert sol.regime == "functional" and sol.equation == eq and sol.coll_setting is None
    assert sol.continuous == (eq == "vide" or cont)
    scale = max(1.0, float(np.max(np.abs(sol.y))))
    np.testing.assert_allclose(sol(sol.t), sol.y, rtol=0, atol=1e-12 * scale)
