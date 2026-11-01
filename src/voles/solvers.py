"""Kept so that ``from voles.solvers import solve_VIE_2`` keeps working.

The implementation moved to the private module ``voles._sampled``. Import the
solvers from ``voles`` itself; this module goes away in 1.0.
"""
from ._sampled import solve_VIE_1, solve_VIE_2, solve_VIDE

__all__ = ["solve_VIE_1", "solve_VIE_2", "solve_VIDE"]
