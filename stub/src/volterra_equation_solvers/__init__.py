"""Deprecation stub.

This distribution (``volterra-equation-solvers``) has been renamed to
``voles``. It now contains no implementation of its own and simply
re-exports the public API from ``voles``, emitting a ``DeprecationWarning``
on import.

To switch over, replace::

    pip install volterra-equation-solvers
    import volterra_equation_solvers

with::

    pip install voles
    import voles

The two import roots expose the same public symbols. No code changes are
needed beyond updating the module name.
"""

import warnings

warnings.warn(
    "The 'volterra-equation-solvers' package has been renamed to 'voles'. "
    "This distribution is a deprecation shim re-exporting the new package. "
    "Switch your dependency and imports to 'voles' to silence this warning; "
    "the old name will not receive further updates.",
    DeprecationWarning,
    stacklevel=2,
)

# Re-export the public API of voles. Listed explicitly so that downstream
# code relying on these names by `from volterra_equation_solvers import X`
# continues to work.
from voles import (
    solve_VIE_1,
    solve_VIE_2,
    solve_VIDE,
    function_solve_VIE_1,
    function_solve_VIE_2,
    function_solve_VIDE,
    optimal_graded_mesh,
    fast_coll_settings_VIE_1,
    fast_coll_settings_VIE_2,
    fast_coll_settings_VIDE,
)
from voles import __version__ as _voles_version

__all__ = [
    "solve_VIE_1", "solve_VIE_2", "solve_VIDE",
    "function_solve_VIE_1", "function_solve_VIE_2", "function_solve_VIDE",
    "optimal_graded_mesh",
    "fast_coll_settings_VIE_1", "fast_coll_settings_VIE_2", "fast_coll_settings_VIDE",
]

# Track our own distribution version (the stub's), independent of voles.
from importlib.metadata import version as _version
__version__ = _version("volterra-equation-solvers")
