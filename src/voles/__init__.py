from .solvers import solve_VIE_1, solve_VIE_2, solve_VIDE
from ._callable_solvers import (
    function_solve_VIE_1, function_solve_VIE_2, function_solve_VIDE,
    optimal_graded_mesh,
)
from ._dlang import supported_coll_settings_d as _supported_coll_settings_d

_all = _supported_coll_settings_d()

# Non-convergent VIE-1 settings excluded (verified by grid-refinement study).
_VIE1_NONCONVERGENT = {(3, (1,)), (4, (1,)), (4, (1, 2))}
fast_coll_settings_VIE_1 = [
    (d, c) for d, c in _all
    if 0 not in c and (d, tuple(c)) not in _VIE1_NONCONVERGENT
]
fast_coll_settings_VIE_2 = _all
fast_coll_settings_VIDE  = _all
del _all

__all__ = [
    "solve_VIE_1", "solve_VIE_2", "solve_VIDE",
    "function_solve_VIE_1", "function_solve_VIE_2", "function_solve_VIDE",
    "optimal_graded_mesh",
    "fast_coll_settings_VIE_1", "fast_coll_settings_VIE_2", "fast_coll_settings_VIDE",
]
from importlib.metadata import version
__version__ = version("voles")
