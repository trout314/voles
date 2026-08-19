"""Accuracy coverage for the Numba JIT fallback (collocation settings not
compiled into the D extension, i.e. coll_divs >= 5).

The rest of the suite only checks the fallback's *warning text* (see
test_show_warnings.py); nothing asserted that the fallback actually solves
the equations. These tests compare against analytic solutions, skipping when
numba is not installed (the scalar dispatch then raises NotImplementedError).

Also pins the error behavior just past the compiled range for the vector
path, which has no fallback.
"""
import numpy as np
import pytest
from voles import solve_VIDE, solve_VIE_1, solve_VIE_2
from conftest import (TOLERANCE, as_array,
                      VIE1_SPEC_DAMPED, VIE2_SPEC_SMOOTH, VIDE_SPEC_SMOOTH)


def _skip_if_no_numba(exc):
    if "numba" in str(exc).lower() or isinstance(exc, NotImplementedError):
        pytest.skip("numba not available")
    raise exc


def test_numba_vie2_accuracy():
    d = as_array(VIE2_SPEC_SMOOTH, time_step=0.002, coll_divs=5,
                 coll_choices=[0, 1, 2], num_blocks=8)
    try:
        soln = solve_VIE_2(
            kernel_values=d["kernel"], g_values=d["g"],
            time_step=d["time_step"], coll_divs=d["coll_divs"],
            coll_choices=d["coll_choices"], show_warnings=False)
    except NotImplementedError as exc:
        _skip_if_no_numba(exc)
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_numba_vie1_accuracy():
    # coll_choices must include the right endpoint region for convergence:
    # nodes (3/5, 4/5, 1) give amplification |rho_m| = 0.
    d = as_array(VIE1_SPEC_DAMPED, time_step=0.002, coll_divs=5,
                 coll_choices=[3, 4, 5], num_blocks=8)
    try:
        soln = solve_VIE_1(
            kernel_values=d["kernel"], g_values=d["g"],
            time_step=d["time_step"], coll_divs=d["coll_divs"],
            coll_choices=d["coll_choices"], show_warnings=False)
    except (NotImplementedError, ValueError) as exc:
        _skip_if_no_numba(exc)
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_numba_vide_accuracy():
    d = as_array(VIDE_SPEC_SMOOTH, time_step=0.002, coll_divs=5,
                 coll_choices=[1, 2, 3], num_blocks=8)
    try:
        soln = solve_VIDE(
            kernel_values=d["kernel"], a_values=d["a"], g_values=d["g"],
            soln_init_value=d["soln_init_value"],
            time_step=d["time_step"], coll_divs=d["coll_divs"],
            coll_choices=d["coll_choices"], show_warnings=False)
    except NotImplementedError as exc:
        _skip_if_no_numba(exc)
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vector_beyond_compiled_settings_raises():
    """The vector path has no Numba fallback: a non-compiled setting must
    raise cleanly (RuntimeError) rather than compute anything."""
    d = as_array(VIE2_SPEC_SMOOTH, time_step=0.002, coll_divs=5,
                 coll_choices=[0, 1, 2], num_blocks=8)
    N = len(d["kernel"])
    kernel = np.zeros((N, 2, 2))
    kernel[:, 0, 0] = kernel[:, 1, 1] = d["kernel"]
    g = np.stack([d["g"], d["g"]], axis=1)
    with pytest.raises(RuntimeError, match="not supported"):
        solve_VIE_2(kernel_values=kernel, g_values=g,
                    time_step=d["time_step"], coll_divs=5,
                    coll_choices=[0, 1, 2], show_warnings=False)
