"""Every 0.10 call and its 1.0 translation give the same numbers.

The cases are the regression battery's (docs/dev/api_battery.py, 510 cases):
for each 0.10 call that succeeds, voles._migrate.translate gives the 1.0
call, and the two must agree bit for bit:

- sampled: the 0.10 values and ``sol.y``;
- functional: the 0.10 node values and ``sol.node_values``;
- both: the coefficients and the mesh.

The 1.0 API calls the same engine with resolved arguments, so any
difference is a bug in the new layer or in the translation.
"""
import pathlib
import sys
import warnings

import numpy as np
import pytest

import voles
from voles._migrate import translate

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / "docs" / "dev"))
import api_battery  # noqa: E402

CASES = api_battery.solve_cases()


def _quiet(fn, **kw):
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        return fn(**kw)


@pytest.mark.parametrize("name, spec", CASES, ids=[n for n, _ in CASES])
def test_new_api_matches_old(name, spec):
    spec = dict(spec)
    fn_name = spec.pop("fn")
    spec.pop("return_polys", None)               # the deprecated alias returns a tuple
    old_fn = getattr(voles, fn_name)
    try:
        old_values = _quiet(old_fn, **spec)
    except Exception:
        pytest.skip("the 0.10 call is invalid; its error is checked by the battery")
    _, old_sol = _quiet(old_fn, **dict(spec, return_function=True))
    new_name, new_kw, dropped = translate(fn_name, spec)
    sol = _quiet(getattr(voles, new_name), **new_kw)
    assert isinstance(sol, voles.VolterraSolution)
    if sol.regime == "sampled":
        assert sol.y.dtype == np.asarray(old_values).dtype
        np.testing.assert_array_equal(sol.y, old_values)
    else:
        np.testing.assert_array_equal(sol.node_values, old_values)
    np.testing.assert_array_equal(sol.coefficients, old_sol._unit)
    np.testing.assert_array_equal(sol.mesh, old_sol.mesh_breakpoints)


def test_most_cases_run():
    """Guard against the equivalence test silently skipping everything."""
    ok = 0
    for _, spec in CASES:
        spec = dict(spec)
        try:
            _quiet(getattr(voles, spec.pop("fn")), **spec)
            ok += 1
        except Exception:
            pass
    assert ok > 0.9 * len(CASES)
