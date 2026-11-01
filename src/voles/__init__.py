from ._api import solve_vie1, solve_vie2, solve_vide
from ._solution import VolterraSolution
from ._warnings import VolesWarning, AccuracyWarning, PerformanceWarning
from ._functional import (
    optimal_graded_mesh,
    gauss_legendre_nodes, radau_iia_nodes, lobatto_nodes,
)
# The 0.10 API: deprecated in 0.11, removed in 1.0.
from ._legacy import (
    solve_VIE_1, solve_VIE_2, solve_VIDE,
    function_solve_VIE_1, function_solve_VIE_2, function_solve_VIDE,
)

__all__ = [
    "solve_vie1", "solve_vie2", "solve_vide",
    "VolterraSolution",
    "VolesWarning", "AccuracyWarning", "PerformanceWarning",
    "optimal_graded_mesh",
    "gauss_legendre_nodes", "radau_iia_nodes", "lobatto_nodes",
    # deprecated (0.11), removed in 1.0:
    "solve_VIE_1", "solve_VIE_2", "solve_VIDE",
    "function_solve_VIE_1", "function_solve_VIE_2", "function_solve_VIDE",
]

_DEPRECATED_SETTINGS = ("fast_coll_settings_VIE_1", "fast_coll_settings_VIE_2",
                        "fast_coll_settings_VIDE")


def _fast_coll_settings(name):
    """The 0.10 lists of compiled collocation settings, computed as 0.10 did."""
    from ._dlang import supported_coll_settings_d
    settings = supported_coll_settings_d()
    if name == "fast_coll_settings_VIE_1":
        # Non-convergent VIE-1 settings excluded (verified by grid-refinement study).
        nonconvergent = {(3, (1,)), (4, (1,)), (4, (1, 2))}
        return [(d, c) for d, c in settings if 0 not in c and (d, tuple(c)) not in nonconvergent]
    return settings


def __getattr__(name):
    if name in _DEPRECATED_SETTINGS:
        import warnings
        warnings.warn(
            f"voles.{name} is deprecated since voles 0.11 and will be removed in 1.0. It lists "
            f"the settings compiled for quadrature='collocation'; the default "
            f"quadrature='product' accepts every valid setting.",
            DeprecationWarning, stacklevel=2)
        return _fast_coll_settings(name)
    raise AttributeError(f"module 'voles' has no attribute {name!r}")


from importlib.metadata import version
__version__ = version("voles")
