import numpy as np
import pytest
from volterra_equation_solvers import solve_VIDE
from conftest import TOLERANCE


def test_vide_accuracy(vide_data):
    d = vide_data
    soln = solve_VIDE(
        kernel_values=d["kernel"],
        g_values=d["g"],
        a_values=d["a"],
        soln_init_value=d["soln_init_value"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vide_return_polys(vide_data):
    d = vide_data
    result = solve_VIDE(
        kernel_values=d["kernel"],
        g_values=d["g"],
        a_values=d["a"],
        soln_init_value=d["soln_init_value"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
        return_polys=True,
    )
    assert isinstance(result, tuple) and len(result) == 2
    soln, polys = result
    assert isinstance(soln, np.ndarray)
    assert len(polys) > 0
    assert hasattr(polys[0], "__call__")
