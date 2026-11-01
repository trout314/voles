"""Collocation-method solvers for Volterra integral and integro-differential equations."""

# The single source of the package version: pyproject.toml reads it from here
# ([tool.hatch.version]). Bump it here when releasing.
__version__ = "0.11.0"

from ._api import solve_vie1, solve_vie2, solve_vide
from ._solution import VolterraSolution
from ._warnings import VolesWarning, AccuracyWarning, PerformanceWarning
from ._functional import (
    optimal_graded_mesh,
    gauss_legendre_nodes, radau_iia_nodes, lobatto_nodes,
)

__all__ = [
    "solve_vie1", "solve_vie2", "solve_vide",
    "VolterraSolution",
    "VolesWarning", "AccuracyWarning", "PerformanceWarning",
    "optimal_graded_mesh",
    "gauss_legendre_nodes", "radau_iia_nodes", "lobatto_nodes",
]
