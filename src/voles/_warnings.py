"""Warning classes and the single emission helper.

Every diagnostic voles emits goes through `_warn`, so it can be filtered,
turned into an error, or captured with the standard `warnings` machinery:

    warnings.simplefilter("ignore", voles.VolesWarning)     # silence voles
    warnings.simplefilter("error", voles.AccuracyWarning)   # make accuracy fatal

The solvers' ``show_warnings=False`` (0.10 API) skips the call to `_warn` at
each site, so it never touches the process-wide filter state, which
`warnings.catch_warnings` would and which isn't thread-safe.
"""
import os
import sys
import warnings

__all__ = ["VolesWarning", "AccuracyWarning", "PerformanceWarning"]


class VolesWarning(UserWarning):
    """Base class of every warning voles emits."""


class AccuracyWarning(VolesWarning):
    """The requested method runs, but the result is less accurate than its
    nominal order suggests (reduced order, an ill-posed start, an unstable
    regime, or a mesh that doesn't suit the declared singularity)."""


class PerformanceWarning(VolesWarning):
    """The result is correct, but it comes from a slower code path than the
    one normally used (the numba fallback, or an extension build that lacks
    a fast path)."""


_PKG_DIR = os.path.dirname(os.path.abspath(__file__)) + os.sep


def _in_package(frame):
    return os.path.abspath(frame.f_code.co_filename).startswith(_PKG_DIR)


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
