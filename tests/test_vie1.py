import numpy as np
import pytest
from volterra_equation_solvers import solve_VIE_1
from conftest import TOLERANCE


def test_vie1_accuracy(vie1_data):
    d = vie1_data
    soln = solve_VIE_1(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie1_return_polys(vie1_data):
    d = vie1_data
    result = solve_VIE_1(
        kernel_values=d["kernel"],
        g_values=d["g"],
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


def test_vie1_poly_accuracy(vie1_poly_data):
    d = vie1_poly_data
    soln = solve_VIE_1(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie1_force_continuous(vie1_data):
    d = vie1_data
    soln = solve_VIE_1(
        kernel_values=d["kernel"],
        g_values=d["g"],
        time_step=d["time_step"],
        coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"],
        soln_init_value=d["exact"][0],
        force_continuous=True,
    )
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE
