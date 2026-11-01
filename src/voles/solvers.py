"""Deprecated: import the solvers from ``voles`` instead.

``from voles.solvers import solve_VIE_2`` keeps working in 0.11 with a
`DeprecationWarning`; this module is removed in 1.0.
"""
import warnings

from ._legacy import solve_VIE_1, solve_VIE_2, solve_VIDE

warnings.warn("voles.solvers is deprecated since voles 0.11 and will be removed in 1.0; "
              "import from voles instead (and see voles.solve_vie1, solve_vie2, solve_vide).",
              DeprecationWarning, stacklevel=2)

__all__ = ["solve_VIE_1", "solve_VIE_2", "solve_VIDE"]
