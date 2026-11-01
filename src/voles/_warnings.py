"""Warning classes and the single emission helper.

Every diagnostic voles emits goes through `_warn`, so it can be filtered,
turned into an error, or captured with the standard `warnings` machinery:

    warnings.simplefilter("ignore", voles.VolesWarning)     # silence voles
    warnings.simplefilter("error", voles.AccuracyWarning)   # make accuracy fatal

The solvers' ``show_warnings=False`` (0.10 API) skips the call to `_warn` at
each site, so it never touches the process-wide filter state, which
`warnings.catch_warnings` would and which isn't thread-safe.
"""
import functools
import os
import sys
import warnings

__all__ = ["VolesWarning", "AccuracyWarning", "PerformanceWarning"]


class VolesWarning(UserWarning):
    r"""Base class of every warning voles emits.

    Each diagnostic is issued once per solver call with `warnings.warn`,
    attributed to the line that called the solver, so the standard
    `warnings` filters apply. Python shows a given warning once per
    calling line by default.

    See Also
    --------
    - [AccuracyWarning][voles.AccuracyWarning], [PerformanceWarning][voles.PerformanceWarning]:
      the two kinds.

    Examples
    --------
    A first-kind equation with $g(0) \ne 0$ has no bounded solution, so
    voles warns. Make that an error:

    >>> import warnings
    >>> import numpy as np
    >>> import voles
    >>> with warnings.catch_warnings():
    ...     warnings.simplefilter("error", voles.AccuracyWarning)
    ...     voles.solve_vie1(kernel=np.ones(10), g=np.ones(10))
    Traceback (most recent call last):
        ...
    voles.AccuracyWarning: g(0) is not zero ...

    or silence every voles diagnostic in a block:

    >>> with warnings.catch_warnings():
    ...     warnings.simplefilter("ignore", voles.VolesWarning)
    ...     sol = voles.solve_vie1(kernel=np.ones(10), g=np.ones(10))
    """
    __module__ = "voles"


class AccuracyWarning(VolesWarning):
    """The requested method runs, but the result is less accurate than its
    nominal order suggests (reduced order, an ill-posed start, an unstable
    regime, or a mesh that doesn't suit the declared singularity)."""
    __module__ = "voles"


class PerformanceWarning(VolesWarning):
    """The result is correct, but it comes from a slower code path than the
    one normally used (the numba fallback, or an extension build that lacks
    a fast path)."""
    __module__ = "voles"


_PKG_DIR = os.path.dirname(os.path.abspath(__file__)) + os.sep


@functools.lru_cache(maxsize=1024)
def _is_package_file(filename):
    # Cached: abspath() calls getcwd() for relative names ("<string>", ...),
    # a system call that is slow on some machines, and the walk below runs
    # on every warning.
    return os.path.abspath(filename).startswith(_PKG_DIR)


def _in_package(frame):
    return _is_package_file(frame.f_code.co_filename)


def _warn(message, category=VolesWarning):
    """``warnings.warn`` attributed to the first frame outside voles: the
    user's call, however deep inside the package the diagnosis happens.

    Walks the stack explicitly; ``skip_file_prefixes`` would do this but
    needs Python 3.12."""
    frame = sys._getframe(1)       # our caller, which is stacklevel=2
    level = 2
    while frame is not None and _in_package(frame):
        frame = frame.f_back
        level += 1
    warnings.warn(message, category, stacklevel=level)
