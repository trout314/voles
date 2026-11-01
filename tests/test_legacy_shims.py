"""The 0.10 API in 0.11: deprecated, but otherwise exactly 0.10.

Each of the six wrappers (voles._legacy) must:
- emit exactly one DeprecationWarning per call, attributed to the caller's
  line, naming the equivalent 1.0 call;
- return exactly what the engine returns: values, (values, _SolutionFunction),
  and the same exceptions with the same messages;
- keep the 0.10 signature and documentation.

Also deprecated: fast_coll_settings_*, the voles.solvers module and
optimal_graded_mesh(T=, M=). None of them may warn on `import voles` or
`from voles import *`.
"""
import importlib
import inspect
import subprocess
import sys
import warnings

import numpy as np
import pytest

import voles
from voles import _functional, _legacy, _sampled
from voles._solution import _SolutionFunction

N, DT = 82, 1.0 / 81
T = np.arange(N) * DT
K, G = np.exp(-T), np.sin(T)
K2 = np.exp(-T)[:, None, None] * np.eye(2) + 0.1
MESH = np.linspace(0, 1, 9)

WRAPPERS = {
    "solve_VIE_1": (_sampled.vie1, dict(kernel_values=K, g_values=G - G[0], time_step=DT),
                    "solve_vie1"),
    "solve_VIE_2": (_sampled.vie2, dict(kernel_values=K, g_values=G, time_step=DT), "solve_vie2"),
    "solve_VIDE": (_sampled.vide, dict(kernel_values=K, g_values=G, soln_init_value=1.0,
                                       time_step=DT), "solve_vide"),
    "function_solve_VIE_1": (_functional.vie1, dict(kernel=np.exp, g=np.sin, mesh_breakpoints=MESH),
                             "solve_vie1"),
    "function_solve_VIE_2": (_functional.vie2, dict(kernel=np.exp, g=np.cos, mesh_breakpoints=MESH),
                             "solve_vie2"),
    "function_solve_VIDE": (_functional.vide, dict(kernel=np.exp, g=np.cos, soln_init_value=1.0,
                                                   mesh_breakpoints=MESH), "solve_vide"),
}


def deprecations(rec):
    return [w for w in rec if issubclass(w.category, DeprecationWarning)]


@pytest.fixture
def record():
    with warnings.catch_warnings(record=True) as rec:
        warnings.simplefilter("always")
        yield rec


@pytest.mark.parametrize("name", list(WRAPPERS))
def test_warns_once_with_the_1_0_call(name, record):
    engine, kw, new = WRAPPERS[name]
    getattr(voles, name)(**kw)
    (w,) = deprecations(record)
    msg = str(w.message)
    assert msg.startswith(f"{name}() is deprecated since voles 0.11")
    assert f"voles.{new}(" in msg
    assert w.filename == __file__                      # attributed to this line


def test_matrix_and_complex_calls_still_warn_once(record):
    """Column fan-out and the complex block recursion call the engine, not
    the wrapper, so they add no warnings."""
    voles.solve_VIE_2(kernel_values=K2, g_values=np.ones((N, 2, 3)), time_step=DT)
    voles.solve_VIDE(kernel_values=K * (1 + 1j), g_values=G, soln_init_value=1.0, time_step=DT)
    voles.function_solve_VIDE(kernel=lambda u: np.exp(-u) * np.eye(2), g=lambda t: np.ones((2, 3)),
                              soln_init_value=np.ones((2, 3)), mesh_breakpoints=MESH)
    assert len(deprecations(record)) == 3


def test_message_shows_only_what_the_caller_set(record):
    voles.solve_VIE_2(kernel_values=K, g_values=G, time_step=DT, coll_divs=3, mesh_samples=6,
                      show_warnings=False)
    msg = str(deprecations(record)[0].message)
    assert "coll_setting=3" in msg and "samples_per_interval=6" in msg and "dt=" in msg
    assert "quadrature" not in msg and "kernel_interp_degree" not in msg
    assert "warnings.simplefilter('ignore', voles.VolesWarning)" in msg


def test_message_gives_exact_functional_nodes(record):
    """Rounded floats would be a different method if copied."""
    voles.function_solve_VIE_2(kernel=np.exp, g=np.cos, mesh_breakpoints=MESH, coll_divs=3,
                               coll_choices=[3, 0, 1])
    voles.function_solve_VIE_1(kernel=np.exp, g=np.sin, mesh_breakpoints=MESH, coll_divs=3)
    msgs = [str(w.message) for w in deprecations(record)]
    assert "coll_nodes=np.array([0, 1, 3]) / 3" in msgs[0]
    assert "coll_nodes=np.array([1, 2, 3]) / 3" in msgs[1]
    assert "guide/migration" in msgs[0]


def test_message_survives_odd_arguments(record):
    """The suggested call is best effort; the 0.10 call's own error wins."""
    with pytest.raises(TypeError):
        voles.solve_VIE_2(kernel_values=K, g_values=G, time_step=DT, coll_divs=2.0)
    assert "voles.solve_vie2(" in str(deprecations(record)[0].message)


@pytest.mark.parametrize("name", list(WRAPPERS))
def test_results_are_the_engines(name):
    engine, kw, _ = WRAPPERS[name]
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", DeprecationWarning)
        np.testing.assert_array_equal(getattr(voles, name)(**kw), engine(**kw))
        vals, sol = getattr(voles, name)(return_function=True, **kw)
    ref_vals, ref_sol = engine(return_function=True, **kw)
    np.testing.assert_array_equal(vals, ref_vals)
    assert type(sol) is _SolutionFunction                  # the 0.10 object, unchanged
    np.testing.assert_array_equal(sol._unit, ref_sol._unit)
    tq = np.linspace(0, 1, 37)                              # breakpoints included: 0.10 rule
    np.testing.assert_array_equal(sol(tq), ref_sol(tq))


@pytest.mark.parametrize("name, bad", [("solve_VIE_2", dict(coll_divs=0)),
                                       ("solve_VIE_1", dict(coll_divs=3, coll_choices=[1])),
                                       ("function_solve_VIE_2", dict(coll_nodes=[0.5, 1.5]))])
def test_errors_are_the_engines(name, bad):
    engine, kw, _ = WRAPPERS[name]
    kw = dict(kw, **bad)
    with pytest.raises(ValueError) as direct:
        engine(**kw)
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", DeprecationWarning)
        with pytest.raises(ValueError) as wrapped:
            getattr(voles, name)(**kw)
    assert str(wrapped.value) == str(direct.value)


@pytest.mark.parametrize("name", list(WRAPPERS))
def test_signature_and_docs_are_the_0_10_ones(name):
    engine, _, new = WRAPPERS[name]
    wrapper = getattr(voles, name)
    assert inspect.signature(wrapper) == inspect.signature(engine)
    doc = inspect.getdoc(wrapper)
    assert "Deprecated since 0.11; removed in 1.0" in doc and f"voles.{new}" in doc
    assert "Parameters" in doc and "Returns" in doc
    assert wrapper.__module__ == "voles._legacy"


def test_return_polys_still_warns_at_the_caller(record):
    voles.solve_VIE_2(kernel_values=K, g_values=G, time_step=DT, return_polys=True)
    msgs = [(str(w.message), w.filename) for w in deprecations(record)]
    assert any("return_polys" in m and f == __file__ for m, f in msgs)


# -------------------------------------------------------- other deprecations

def test_fast_coll_settings_warn_and_keep_their_values(record):
    from voles._dlang import supported_coll_settings_d
    allset = supported_coll_settings_d()
    assert voles.fast_coll_settings_VIE_2 == allset
    assert voles.fast_coll_settings_VIDE == allset
    vie1 = voles.fast_coll_settings_VIE_1
    assert all(0 not in c for _, c in vie1) and (3, [1]) not in vie1 and (3, [1, 2, 3]) in vie1
    assert len(deprecations(record)) == 3
    assert "fast_coll_settings" not in voles.__all__


def test_unknown_attribute_is_still_an_attribute_error():
    with pytest.raises(AttributeError):
        voles.no_such_thing


def test_voles_solvers_module_warns_on_import(record):
    sys.modules.pop("voles.solvers", None)
    mod = importlib.import_module("voles.solvers")
    (w,) = [w for w in deprecations(record) if "voles.solvers" in str(w.message)]
    assert mod.solve_VIE_2 is voles.solve_VIE_2


def test_optimal_graded_mesh_old_names(record):
    new = voles.optimal_graded_mesh(alpha=0.5, t_end=2.0, n_intervals=8, order=3)
    old = voles.optimal_graded_mesh(alpha=0.5, T=2.0, M=8, order=3)
    np.testing.assert_array_equal(new, old)
    assert len(deprecations(record)) == 2
    with pytest.raises(TypeError, match="not both"):
        voles.optimal_graded_mesh(alpha=0.5, t_end=2.0, T=2.0, n_intervals=8, order=3)
    with pytest.raises(TypeError, match="missing required keyword argument 't_end'"):
        voles.optimal_graded_mesh(alpha=0.5, n_intervals=8, order=3)


def test_import_and_star_import_are_silent():
    code = ("import warnings; warnings.simplefilter('error')\n"
            "import voles\nfrom voles import *\n")
    subprocess.run([sys.executable, "-c", code], check=True)
