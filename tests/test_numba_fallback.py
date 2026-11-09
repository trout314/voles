"""Accuracy coverage for the Numba JIT fallback (collocation settings not
compiled into the D extension, i.e. coll_divs >= 5).

The rest of the suite only checks the fallback's *warning text* (see
test_show_warnings.py); nothing asserted that the fallback actually solves
the equations. These tests compare against analytic solutions. They need
quadrature="collocation": product quadrature has no use for the fallback.

Also pins the error behavior just past the compiled range for the vector
path, which has no fallback.
"""
import numpy as np
import pytest
from voles import solve_vide, solve_vie1, solve_vie2
from conftest import (as_array,
                      VIE1_SPEC_DAMPED, VIE2_SPEC_SMOOTH, VIDE_SPEC_SMOOTH)
from conftest import run


def test_numba_vie2_accuracy():
    d = as_array(VIE2_SPEC_SMOOTH, time_step=0.002, coll_divs=5,
                 coll_choices=[0, 1, 2], num_blocks=8)
    pytest.importorskip("numba")
    soln = run(solve_vie2, show_warnings=False, kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature="collocation", coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < 5e-5


def test_numba_vie1_accuracy():
    # coll_choices must include the right endpoint region for convergence:
    # nodes (3/5, 4/5, 1) give amplification |rho_m| = 0.
    d = as_array(VIE1_SPEC_DAMPED, time_step=0.002, coll_divs=5,
                 coll_choices=[3, 4, 5], num_blocks=8)
    pytest.importorskip("numba")
    soln = run(solve_vie1, show_warnings=False, kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature="collocation", coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < 5e-4


def test_numba_vide_accuracy():
    d = as_array(VIDE_SPEC_SMOOTH, time_step=0.002, coll_divs=5,
                 coll_choices=[1, 2, 3], num_blocks=8)
    pytest.importorskip("numba")
    soln = run(solve_vide, show_warnings=False, kernel=d["kernel"], a=d["a"], g=d["g"], y0=d["soln_init_value"], dt=d["time_step"], quadrature="collocation", coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < 5e-7


def test_vector_beyond_compiled_settings_raises():
    """The vector path has no Numba fallback: a non-compiled setting must
    raise cleanly rather than compute anything. NotImplementedError matches
    the scalar path's error type (and subclasses the historical
    RuntimeError, so old except clauses still work)."""
    d = as_array(VIE2_SPEC_SMOOTH, time_step=0.002, coll_divs=5,
                 coll_choices=[0, 1, 2], num_blocks=8)
    N = len(d["kernel"])
    kernel = np.zeros((N, 2, 2))
    kernel[:, 0, 0] = kernel[:, 1, 1] = d["kernel"]
    g = np.stack([d["g"], d["g"]], axis=1)
    with pytest.raises(NotImplementedError, match="is not compiled into the extension"):
        run(solve_vie2, show_warnings=False, kernel=kernel, g=g, dt=d["time_step"], coll_setting=(5, [0, 1, 2]), quadrature="collocation").y


# coll_setting (5, [5]) is not compiled, so these run on the Numba fallback.
# One node at c = 1 with dt = 0.01 gives h = 0.25, and the local system is
# 1 - h K (VIE-2) or 1 - h a (VIDE): singular at 4, numerically singular
# within rounding of it.
_NB_N = 2 * 25 + 1


@pytest.mark.filterwarnings("ignore::voles.PerformanceWarning")
@pytest.mark.parametrize("relative_offset", [0.0, 1e-15])
def test_numba_numerically_singular_systems_raise(relative_offset):
    pytest.importorskip("numba")
    c = 4.0 * (1.0 + relative_offset) * np.ones(_NB_N)
    kw = dict(g=np.ones(_NB_N), dt=0.01, quadrature="collocation", coll_setting=(5, [5]))
    with pytest.raises(np.linalg.LinAlgError, match="numba fallback: singular"):
        solve_vie2(kernel=c, **kw)
    with pytest.raises(np.linalg.LinAlgError, match="numba fallback: singular"):
        solve_vide(kernel=np.zeros(_NB_N), a=c, y0=1.0, **kw)


@pytest.mark.filterwarnings("ignore::voles.PerformanceWarning")
def test_numba_close_to_singular_is_solved():
    pytest.importorskip("numba")
    K = 4.0 * (1.0 + 1e-10) * np.ones(_NB_N)
    y = solve_vie2(kernel=K, g=np.ones(_NB_N), dt=0.01, quadrature="collocation",
                   coll_setting=(5, [5])).y
    assert np.all(np.isfinite(y))


@pytest.mark.parametrize("continuous", [False, True])
def test_numba_first_kind_tiny_kernel_is_not_called_singular(continuous):
    pytest.importorskip("numba")
    t = np.arange(_NB_N) * 0.01
    kw = dict(continuous=True, y0=1.0) if continuous else {}
    y = run(solve_vie1, show_warnings=False, kernel=1e-20 * np.ones(_NB_N), g=1e-20 * t, dt=0.01,
            quadrature="collocation", coll_setting=(5, [3, 4, 5]), **kw).y
    np.testing.assert_allclose(y, 1.0, rtol=0, atol=1e-12)
