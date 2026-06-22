"""Tests that solvers raise meaningful errors for bad inputs."""
import numpy as np
import pytest
from voles import solve_VIE_1, solve_VIE_2, solve_VIDE

# ---------------------------------------------------------------------------
# Helpers — valid base kwargs, override per test
# ---------------------------------------------------------------------------

# 9 points → (coll_divs=2)**2 * 2 + 1, a valid fast-path length
_K = np.ones(9)
_G = np.ones(9)
_A = np.zeros(9)


def _vie1(**kw):
    base = dict(kernel_values=_K, g_values=_G, coll_divs=2, coll_choices=[1, 2])
    base.update(kw)
    return solve_VIE_1(**base)


def _vie2(**kw):
    base = dict(kernel_values=_K, g_values=_G, coll_divs=2, coll_choices=[0, 1, 2])
    base.update(kw)
    return solve_VIE_2(**base)


def _vide(**kw):
    base = dict(kernel_values=_K, g_values=_G, a_values=_A,
                soln_init_value=0.0, coll_divs=2, coll_choices=[0, 1, 2])
    base.update(kw)
    return solve_VIDE(**base)


# ---------------------------------------------------------------------------
# kernel_values must be 1-D (VIE-2/VIDE) or 1-D/3-D (VIE-1)
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("solver", [_vie2, _vide])
def test_kernel_2d(solver):
    # 2-D kernel is invalid for all solvers (accept 1-D scalar or 3-D matrix)
    with pytest.raises(ValueError, match="kernel_values must be 1-D"):
        solver(kernel_values=np.ones((3, 3)))


def test_kernel_2d_vie1():
    # 2-D kernel is invalid for VIE-1 (accepts 1-D scalar or 3-D matrix only)
    with pytest.raises(ValueError, match="kernel_values must be 1-D"):
        _vie1(kernel_values=np.ones((3, 3)))


# ---------------------------------------------------------------------------
# g_values must be 1-D and same length as kernel_values
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_g_values_2d(solver):
    with pytest.raises(AssertionError, match="g_values must be a 1-dim array"):
        solver(g_values=np.ones((3, 3)))


@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_g_values_wrong_length(solver):
    with pytest.raises(AssertionError,
                       match="kernel_values and g_values must have the same length"):
        solver(g_values=np.ones(5))


# ---------------------------------------------------------------------------
# a_values (VIDE only)
# ---------------------------------------------------------------------------

def test_a_values_2d():
    with pytest.raises(AssertionError, match="a_values must be a 1-dim array"):
        _vide(a_values=np.ones((3, 3)))


def test_a_values_wrong_length():
    with pytest.raises(AssertionError,
                       match="kernel_values and a_values must have the same length"):
        _vide(a_values=np.ones(5))


# ---------------------------------------------------------------------------
# time_step (VIE_1 only)
# ---------------------------------------------------------------------------

def test_time_step_zero():
    with pytest.raises(AssertionError, match="time_step must be positive"):
        _vie1(time_step=0.0)


def test_time_step_negative():
    with pytest.raises(AssertionError, match="time_step must be positive"):
        _vie1(time_step=-1.0)


# ---------------------------------------------------------------------------
# coll_divs must be positive
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_coll_divs_zero(solver):
    with pytest.raises(AssertionError, match="coll_divs must be a positive integer"):
        solver(coll_divs=0, coll_choices=[1])


@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_coll_divs_negative(solver):
    with pytest.raises(AssertionError, match="coll_divs must be a positive integer"):
        solver(coll_divs=-1, coll_choices=[1])


# ---------------------------------------------------------------------------
# coll_choices must be integers
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_coll_choices_floats(solver):
    with pytest.raises(AssertionError, match="coll_choices must be a list of integers"):
        solver(coll_choices=[1.0, 2.0])


# ---------------------------------------------------------------------------
# coll_choices must be distinct
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_coll_choices_duplicates(solver):
    with pytest.raises(AssertionError,
                       match="all integers in coll_choices must be distinct"):
        solver(coll_choices=[1, 1, 2])


# ---------------------------------------------------------------------------
# coll_choices range
# ---------------------------------------------------------------------------

def test_vie1_choice_out_of_range():
    with pytest.raises(AssertionError,
                       match="coll_choices must contain only integers from 1 to coll_divs"):
        _vie1(coll_divs=2, coll_choices=[1, 5])


def test_vie2_choice_out_of_range():
    with pytest.raises(AssertionError,
                       match="coll_choices must contain only integers from 0 to coll_divs"):
        _vie2(coll_divs=2, coll_choices=[1, 5])


def test_vide_choice_out_of_range():
    with pytest.raises(AssertionError,
                       match="coll_choices must contain only integers from 0 to coll_divs"):
        _vide(coll_divs=2, coll_choices=[1, 5])


# ---------------------------------------------------------------------------
# Zero not allowed in coll_choices for VIE_1
# ---------------------------------------------------------------------------

def test_vie1_zero_choice():
    with pytest.raises(AssertionError, match="zero cannot be a collocation parameter"):
        _vie1(coll_divs=2, coll_choices=[0, 1])


# ---------------------------------------------------------------------------
# force_continuous requires soln_init_value (VIE_1)
# ---------------------------------------------------------------------------

def test_vie1_force_continuous_no_init():
    with pytest.raises(AssertionError,
                       match="must specify an initial value for continuous solutions"):
        solve_VIE_1(kernel_values=_K, g_values=_G, coll_divs=2,
                    coll_choices=[1, 2], force_continuous=True)


# ---------------------------------------------------------------------------
# NaN inputs — documented current behaviour.
# Uses coll_divs=5 to guarantee the Numba path (not in fast settings).
#
# NaN in kernel: propagates into the coefficient matrix, causing
#   numpy.linalg.solve to raise LinAlgError — the solver does NOT silently
#   produce a result.
# NaN in g/a at a collocation-point index: propagates to NaN in output.
# ---------------------------------------------------------------------------

_N = 51  # 1 * 5**2 + 1, all coll_divs=5 tests use this length
_Knan = np.ones(_N)
_Gnan = np.ones(_N)
_Anan = np.zeros(_N)

# With coll_divs=5, coll_choices=[1,2,3], collocation indices in mesh 0
# are at 1*5=5, 2*5=10, 3*5=15.  Index 5 is the first accessed g/a point.
_COLL_IDX = 5


def _nan_raises_or_propagates(fn, **kwargs):
    """Return True if fn raises any exception or returns a result containing NaN."""
    try:
        result = fn(**kwargs)
        return np.any(~np.isfinite(result))
    except Exception:
        return True


def test_nan_kernel_vie1():
    k = _Knan.copy(); k[3] = np.nan
    assert _nan_raises_or_propagates(
        solve_VIE_1, kernel_values=k, g_values=_Gnan,
        coll_divs=5, coll_choices=[1, 2, 3])


def test_nan_kernel_vie2():
    k = _Knan.copy(); k[3] = np.nan
    assert _nan_raises_or_propagates(
        solve_VIE_2, kernel_values=k, g_values=_Gnan,
        coll_divs=5, coll_choices=[1, 2, 3])


def test_nan_kernel_vide():
    k = _Knan.copy(); k[3] = np.nan
    assert _nan_raises_or_propagates(
        solve_VIDE, kernel_values=k, g_values=_Gnan, a_values=_Anan,
        soln_init_value=0.0, coll_divs=5, coll_choices=[1, 2, 3])


def test_nan_g_at_coll_point_vie2():
    g = _Gnan.copy(); g[_COLL_IDX] = np.nan
    assert _nan_raises_or_propagates(
        solve_VIE_2, kernel_values=_Knan, g_values=g,
        coll_divs=5, coll_choices=[1, 2, 3])


def test_nan_g_at_coll_point_vide():
    g = _Gnan.copy(); g[_COLL_IDX] = np.nan
    assert _nan_raises_or_propagates(
        solve_VIDE, kernel_values=_Knan, g_values=g, a_values=_Anan,
        soln_init_value=0.0, coll_divs=5, coll_choices=[1, 2, 3])


def test_nan_a_at_coll_point_vide():
    a = _Anan.copy(); a[_COLL_IDX] = np.nan
    assert _nan_raises_or_propagates(
        solve_VIDE, kernel_values=_Knan, g_values=_Gnan, a_values=a,
        soln_init_value=0.0, coll_divs=5, coll_choices=[1, 2, 3])


# ---------------------------------------------------------------------------
# Singular coefficient matrix raises numpy.linalg.LinAlgError.
#
# VIE-1's coefficient matrix is dt * BN_vec(kernel); a zero kernel makes it
# the zero matrix, which is singular. d=9 forces the runtime LU path (compile-
# time path is d <= max_d_compile = 8 and uses a non-recoverable assert).
# ---------------------------------------------------------------------------

def test_vie1_singular_matrix_raises_linalgerror():
    d = 9
    coll_divs = 3
    N = coll_divs**2 + 1  # one mesh interval
    kernel = np.zeros((N, d, d))
    g = np.ones((N, d))
    with pytest.raises(np.linalg.LinAlgError):
        solve_VIE_1(kernel_values=kernel, g_values=g,
                    coll_divs=coll_divs, coll_choices=[1, 2, 3])


# ---------------------------------------------------------------------------
# Plain Python lists accepted for array inputs
# ---------------------------------------------------------------------------

def _list_inputs():
    """9-point float lists, valid for coll_divs=2."""
    return [float(x) for x in range(9)]


@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_list_kernel_values(solver):
    solver(kernel_values=_list_inputs(), g_values=_list_inputs())


@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_list_g_values(solver):
    solver(g_values=_list_inputs())


# ---------------------------------------------------------------------------
# coll_choices must not be mutated
# ---------------------------------------------------------------------------

def test_coll_choices_not_mutated_vie1():
    # coll_divs=2, choices [1,2] but supplied reversed; _K has 9 pts = 2*4+1
    choices = [2, 1]
    solve_VIE_1(kernel_values=_K, g_values=_G, coll_divs=2, coll_choices=choices)
    assert choices == [2, 1]


def test_coll_choices_not_mutated_vie2():
    choices = [2, 0, 1]
    solve_VIE_2(kernel_values=_K, g_values=_G, coll_divs=2, coll_choices=choices)
    assert choices == [2, 0, 1]


def test_coll_choices_not_mutated_vide():
    choices = [2, 0, 1]
    solve_VIDE(kernel_values=_K, g_values=_G, a_values=_A,
               soln_init_value=0.0, coll_divs=2, coll_choices=choices)
    assert choices == [2, 0, 1]


# ---------------------------------------------------------------------------
# Input too short to form a single mesh interval -> clear ValueError.
# (Previously: silent truncation to N=1, then the D extension overran the
# kernel array and aborted the process via core.exception.ArrayIndexError.)
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_too_short_input_raises(solver):
    """coll_divs=3 needs at least 10 points; passing fewer should raise loudly
    rather than crashing the D extension with an array-bounds abort."""
    import numpy as np
    short_K = np.ones(5)
    short_G = np.ones(5)
    short_A = np.zeros(5)
    kwargs = dict(kernel_values=short_K, g_values=short_G,
                  coll_divs=3,
                  coll_choices=([1, 2, 3] if solver is _vie1 else [0, 1, 2]))
    if solver is _vide:
        kwargs["a_values"] = short_A
    with pytest.raises(ValueError, match=r"zero mesh intervals"):
        solver(**kwargs)


def test_too_short_input_vector_raises():
    """Vector path -- the original notebook's failure mode."""
    import numpy as np
    with pytest.raises(ValueError, match=r"zero mesh intervals"):
        solve_VIE_1(kernel_values=np.zeros((5, 2, 2)),
                    g_values=np.zeros((5, 2)),
                    time_step=1.0,
                    coll_divs=3, coll_choices=[1, 2, 3])
