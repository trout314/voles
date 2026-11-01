"""Translate a 0.10 solver call into the equivalent 1.0 call.

Used by the equivalence tests (every 0.10 call and its translation must give
the same numbers) and by the 0.11 deprecation wrappers, whose warning shows
the user the call to write instead.

`translate` maps names and values; it does not validate. Arguments the 1.0
API has no counterpart for are reported in ``dropped``:

- ``return_function`` / ``return_polys``: the solution object is always
  returned;
- ``show_warnings``: use a `warnings` filter instead;
- a VIE-1 ``soln_init_value`` without ``force_continuous``: it had no
  effect.
"""
import numpy as np

_FUNCTIONS = {
    "solve_VIE_1": ("solve_vie1", "sampled"), "solve_VIE_2": ("solve_vie2", "sampled"),
    "solve_VIDE": ("solve_vide", "sampled"),
    "function_solve_VIE_1": ("solve_vie1", "functional"),
    "function_solve_VIE_2": ("solve_vie2", "functional"),
    "function_solve_VIDE": ("solve_vide", "functional"),
}
_RENAMES = {"kernel_values": "kernel", "g_values": "g", "a_values": "a",
            "soln_init_value": "y0", "time_step": "dt", "mesh_breakpoints": "mesh",
            "mesh_samples": "samples_per_interval", "force_continuous": "continuous"}
_SAME = ("kernel", "g", "a", "quadrature", "kernel_interp_degree", "coll_nodes",
         "kernel_singularity", "reuse_adaptive_blocks")
_DROPPED = ("return_function", "return_polys", "show_warnings")


def translate(name, kwargs):
    """``(new_name, new_kwargs, dropped)`` for the 0.10 call ``name(**kwargs)``."""
    new_name, regime = _FUNCTIONS[name]
    kw = dict(kwargs)
    out, dropped = {}, {}
    for k in _DROPPED:
        if k in kw:
            dropped[k] = kw.pop(k)
    divs, choices = kw.pop("coll_divs", None), kw.pop("coll_choices", None)
    if name == "solve_VIE_1" or name == "function_solve_VIE_1":
        if not kw.get("force_continuous", False) and kw.get("soln_init_value") is not None:
            dropped["soln_init_value"] = kw.pop("soln_init_value")
        if not kw.get("force_continuous", False):
            kw.pop("force_continuous", None)
    for k, v in kw.items():
        if k in _RENAMES:
            out[_RENAMES[k]] = v
        elif k in _SAME:
            out[k] = v
        else:
            raise TypeError(f"{name}() has no parameter {k!r}")
    if divs is not None or choices is not None:
        if regime == "sampled":
            if choices is None:
                out["coll_setting"] = divs
            elif divs is None:
                out["coll_setting"] = (max(int(c) for c in choices), sorted(int(c) for c in choices))
            else:
                out["coll_setting"] = (divs, sorted(int(c) for c in choices))
        else:
            lo = 1 if name == "function_solve_VIE_1" else 0
            if choices is None:
                choices = list(range(lo, int(divs) + 1))
            if divs is None:
                divs = max(int(c) for c in choices)
            out["coll_nodes"] = np.asarray(sorted(int(c) for c in choices), dtype=float) / divs
    return new_name, out, dropped


def _short(value):
    """A compact, readable rendering of an argument for a warning message."""
    if callable(value):
        return getattr(value, "__name__", "<callable>")
    if isinstance(value, np.ndarray):
        if value.ndim == 1 and value.size <= 6 and value.dtype.kind in "iuf":
            return "[" + ", ".join(f"{v:.6g}" for v in value.tolist()) + "]"
        return f"<array of shape {value.shape}>"
    if isinstance(value, (list, tuple)) and len(value) > 6:
        return f"<{type(value).__name__} of length {len(value)}>"
    return repr(value)


def describe(name, kwargs):
    """The equivalent 1.0 call as text, e.g. for a deprecation message."""
    new_name, out, dropped = translate(name, kwargs)
    args = ", ".join(f"{k}={_short(v)}" for k, v in out.items())
    text = f"voles.{new_name}({args})"
    notes = []
    if "show_warnings" in dropped and not dropped["show_warnings"]:
        notes.append("for show_warnings=False use warnings.simplefilter('ignore', "
                     "voles.VolesWarning)")
    if dropped.get("return_function") or dropped.get("return_polys"):
        notes.append("the solution object is always returned")
    if "soln_init_value" in dropped:
        notes.append("soln_init_value had no effect without force_continuous and is dropped")
    return text + (f" ({'; '.join(notes)})" if notes else "")
