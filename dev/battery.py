"""Bitwise regression battery for the 1.0 API (plan Phase 8 onward).

  python docs/dev/battery.py save    ~/.cache/voles_battery_<commit>.npz
  python docs/dev/battery.py compare ~/.cache/voles_battery_<commit>.npz [regex]
  python docs/dev/battery.py list

The cases are those of the 0.10-era battery (api_battery.py, 510 cases), each
translated once to its 1.0 call by `_migrate.translate`, so every case runs
through `solve_vie1/2/vide` and nothing here depends on the 0.10 API. Per case
it records, under ``<case>/<field>``:

  t, y                    the grid output
  node_times, node_values the collocation data
  coefs, mesh             the piecewise polynomial
  dense                   sol(t) inside every interval (away from breakpoints)
  bp_mean, bp_left        sol(t) at the interior breakpoints, both conventions
  warnings                every voles diagnostic text
  error                   "<ExceptionType>: <message>" when the call raised

Comparison classes:

  strict  every array field: exact equality (NaN == NaN), same shape and dtype
  text    warnings and error messages: reported for review (the engine
          cleanup may reword messages; values must not move)

The battery is local: results are bitwise reproducible on one machine and
build, not across platforms (the repo's tests/test_reference_values.py checks
the cross-platform part, with a tolerance).
"""
import pathlib
import re
import subprocess
import sys
import warnings

import numpy as np

import voles

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import api_battery as _old  # noqa: E402  (case generators only)
from migrate_0_10 import translate  # noqa: E402

STRICT = ("t", "y", "node_times", "node_values", "coefs", "mesh", "dense", "bp_mean",
          "bp_left")


def solve_cases():
    """``[(name, fn_name, kwargs)]`` for the 1.0 solvers."""
    out = []
    for name, spec in _old.solve_cases():
        spec = dict(spec)
        old = spec.pop("fn")
        spec.pop("return_polys", None)
        spec.pop("return_function", None)
        try:
            new, kw, _ = translate(old, spec)
        except TypeError:
            continue
        out.append((name, new, kw))
    return out


def error_cases():
    out = []
    for name, spec in _old.error_cases():
        spec = dict(spec)
        old = spec.pop("fn")
        if old == "optimal_graded_mesh":
            renamed = {"T": "t_end", "M": "n_intervals"}
            out.append((f"X-{name}", old, {renamed.get(k, k): v for k, v in spec.items()}))
            continue
        if not old.startswith(("solve_", "function_solve_")):
            out.append((f"X-{name}", old, spec))     # the node helpers are unchanged
            continue
        try:
            new, kw, _ = translate(old, spec)
        except (TypeError, ValueError):
            continue                      # no 1.0 counterpart (a 0.10-only argument)
        out.append((f"X-{name}", new, kw))
    return out


def helper_cases():
    out = []
    for name, spec in _old.helper_cases():
        spec = dict(spec)
        fn = spec.pop("fn")
        if fn == "optimal_graded_mesh":
            spec = dict(alpha=spec["alpha"], t_end=spec["T"], n_intervals=spec["M"],
                        order=spec["order"])
        out.append((name, fn, spec))
    return out


def _norm(msg):
    return " ".join(str(msg).split())


def _call(fn, kw):
    res = exc = None
    with warnings.catch_warnings(record=True) as rec:
        warnings.simplefilter("always")
        try:
            res = getattr(voles, fn)(**kw)
        except Exception as e:
            exc = e
    diags = sorted(_norm(w.message) for w in rec
                   if not issubclass(w.category, (DeprecationWarning, PendingDeprecationWarning)))
    return res, exc, diags


def _record(name, fn, kw, out):
    res, exc, diags = _call(fn, kw)
    if diags:
        out[f"{name}/warnings"] = np.array("\n".join(diags))
    if exc is not None:
        out[f"{name}/error"] = np.array(f"{type(exc).__name__}: {_norm(exc)}")
        return
    if not isinstance(res, voles.VolterraSolution):
        out[f"{name}/y"] = np.asarray(res)            # a helper's output
        return
    sol = res
    out[f"{name}/t"] = np.asarray(sol.t)
    out[f"{name}/y"] = np.asarray(sol.y)
    out[f"{name}/node_times"] = np.asarray(sol.node_times)
    out[f"{name}/node_values"] = np.asarray(sol.node_values)
    out[f"{name}/coefs"] = np.asarray(sol.coefficients)
    out[f"{name}/mesh"] = np.asarray(sol.mesh)
    inside, bps = _old._dense_grids(sol.mesh)
    out[f"{name}/dense"] = np.asarray(sol(inside))
    if len(bps):
        out[f"{name}/bp_mean"] = np.asarray(sol(bps))
        out[f"{name}/bp_left"] = np.asarray(sol(bps, at_breakpoints="left"))


def collect(only=None):
    out = {}
    for name, fn, kw in solve_cases() + error_cases() + helper_cases():
        if only is None or re.search(only, name):
            _record(name, fn, kw, out)
    return out


def _meta():
    try:
        head = subprocess.run(["git", "rev-parse", "--short", "HEAD"], capture_output=True,
                              text=True, check=True).stdout.strip()
        dirty = subprocess.run(["git", "status", "--porcelain", "--", "src", "dlang"],
                               capture_output=True, text=True).stdout.strip()
    except Exception:
        head, dirty = "unknown", ""
    return (f"commit={head}{'+dirty' if dirty else ''} numpy={np.__version__} "
            f"python={sys.version.split()[0]}")


def main():
    mode = sys.argv[1]
    if mode == "list":
        for name, fn, _ in solve_cases() + error_cases() + helper_cases():
            print(name, fn)
        return 0
    path, only = sys.argv[2], (sys.argv[3] if len(sys.argv) > 3 else None)
    res = collect(only)
    if mode == "save":
        res["__meta__"] = np.array(_meta())
        np.savez(path, **res)
        cases = {k.rsplit("/", 1)[0] for k in res if "/" in k}
        nerr = sum(k.endswith("/error") for k in res)
        print(f"saved {len(res)} fields from {len(cases)} cases to {path} ({_meta()}); "
              f"{nerr} errors")
        return 0
    base = dict(np.load(path))
    print(f"reference: {base.pop('__meta__', 'unknown')}\ncurrent:   {_meta()}")
    if only:
        base = {k: v for k, v in base.items() if re.search(only, k.split("/")[0])}
    strict, text = [], []
    for k in sorted(set(base) | set(res)):
        if k not in base or k not in res:
            (text if k.endswith(("/warnings", "/error")) else strict).append(
                (k, "only in " + ("reference" if k in base else "current")))
            continue
        if _old._same(base[k], res[k]):
            continue
        bucket = strict if k.rsplit("/", 1)[-1] in STRICT else text
        bucket.append((k, _old._describe(base[k], res[k])))
    print(f"compared {len(res)} fields: {len(strict)} strict mismatches, "
          f"{len(text)} message changes")
    for title, lst in (("STRICT", strict), ("MESSAGES", text)):
        if lst:
            print(f"--- {title}")
            for k, why in lst:
                print("  ", k, why)
    return 1 if strict else 0


if __name__ == "__main__":
    sys.exit(main())
