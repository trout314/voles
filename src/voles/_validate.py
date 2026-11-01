"""Argument validation shared by every public function.

One rule throughout (contract §9): a wrong *type* raises `TypeError`, and the
right type with a wrong *value* raises `ValueError`.

- Integers are `numbers.Integral` (Python and NumPy ints) but not `bool`.
  Floats are never truncated, even integer-valued ones: silently running a
  different discretisation is worse than an error.
- Flags are `bool` or `numpy.bool_`.
- Reals are `numbers.Real` (including NumPy floating and integer scalars) or
  0-d real arrays, but not `bool` or strings.
"""
import numbers

import numpy as np


def _is_bool(value):
    return isinstance(value, (bool, np.bool_))


def integer(name, value, *, minimum=None, type_msg=None, value_msg=None):
    """``value`` as a Python int. `TypeError` unless it is an integer,
    `ValueError` if it is below ``minimum``."""
    if _is_bool(value) or not isinstance(value, numbers.Integral):
        raise TypeError(type_msg or f"{name} must be an integer, got {value!r}")
    v = int(value)
    if minimum is not None and v < minimum:
        raise ValueError(value_msg or (
            f"{name} must be a positive integer, got {value!r}" if minimum == 1
            else f"{name} must be an integer >= {minimum}, got {value!r}"))
    return v


def flag(name, value):
    """``value`` as a Python bool; `TypeError` for anything else, so that
    ``show_warnings="no"`` or ``return_function=1`` don't pass silently."""
    if not _is_bool(value):
        raise TypeError(f"{name} must be True or False, got {value!r}")
    return bool(value)


def real(name, value, *, positive=False, finite=True, value_msg=None):
    """``value`` as a Python float. `TypeError` unless it is a real number;
    `ValueError` if it is not finite (when required) or not positive (when
    required)."""
    if isinstance(value, np.ndarray) and value.ndim == 0 and value.dtype.kind in "iuf":
        value = value.item()
    if _is_bool(value) or not isinstance(value, numbers.Real):
        raise TypeError(f"{name} must be a real number, got {value!r}")
    v = float(value)
    if (finite and not np.isfinite(v)) or (positive and not v > 0.0):
        raise ValueError(value_msg or (
            f"{name} must be positive and finite, got {value!r}" if positive
            else f"{name} must be finite, got {value!r}"))
    return v


def choice(name, value, options):
    """``value`` matched case-insensitively against the strings in
    ``options``; returns the canonical spelling."""
    if not isinstance(value, str):
        raise TypeError(f"{name} must be a string, one of {list(options)}, got {value!r}")
    lowered = value.lower()
    for opt in options:
        if opt.lower() == lowered:
            return opt
    opts = [repr(o) for o in options]
    listed = " or ".join(opts) if len(opts) == 2 else "one of " + ", ".join(opts)
    raise ValueError(f"{name} must be {listed}, got {value!r}")


def finite(name, values):
    """Raise `ValueError` if the numeric array-like ``values`` contains NaN
    or ±inf, naming the first offending index. Inputs that are not numeric
    arrays are left for the caller's shape and type checks."""
    if values is None:
        return
    try:
        arr = np.asarray(values)
    except Exception:
        return
    if arr.dtype.kind not in "fc":
        return              # integers and bools are finite; non-numeric is not ours
    ok = np.isfinite(arr)
    if ok.all():
        return
    # Python ints and a Python scalar, so the message reads the same under
    # NumPy 1 and NumPy 2 (whose scalar reprs are np.int64(7), np.float64(nan)).
    bad = (tuple(int(i) for i in np.unravel_index(int(np.argmin(ok.ravel())), arr.shape))
           if arr.ndim else ())
    where = f" at index {bad if len(bad) != 1 else bad[0]}" if arr.ndim else ""
    raise ValueError(f"{name} contains a non-finite value ({arr[bad].item()!r}){where}; "
                     f"inputs must be finite")
