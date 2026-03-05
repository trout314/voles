from .solvers import solve_VIE_1, solve_VIE_2, solve_VIDE, solve_VIE_1_trapz, solve_VIE_2_trapz
from ._dlang import supported_coll_settings_d as _supported_coll_settings_d, available as _dlang_available

if _dlang_available:
    _all = _supported_coll_settings_d()
    fast_coll_settings_VIE_1 = [(d, c) for d, c in _all if 0 not in c]
    fast_coll_settings_VIE_2 = _all
    fast_coll_settings_VIDE  = _all
    del _all
else:
    fast_coll_settings_VIE_1 = None
    fast_coll_settings_VIE_2 = None
    fast_coll_settings_VIDE  = None

__all__ = [
    "solve_VIE_1", "solve_VIE_2", "solve_VIDE",
    "solve_VIE_1_trapz", "solve_VIE_2_trapz",
    "fast_coll_settings_VIE_1", "fast_coll_settings_VIE_2", "fast_coll_settings_VIDE",
]
from importlib.metadata import version
__version__ = version("volterra-equation-solvers")
