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
# VIE-1 requires g(0) = 0; with K = 1, g(t) = t gives the exact solution y = 1.
_G1 = np.arange(9.0)


def _vie1(**kw):
    base = dict(kernel_values=_K, g_values=_G1, coll_divs=2, coll_choices=[1, 2])
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

# All three array-input solvers report bad input with ValueError (they used
# assert statements, which vanish under python -O).

@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_g_values_2d(solver):
    with pytest.raises(ValueError, match="g_values shape \\(3, 3\\) incompatible"):
        solver(g_values=np.zeros((3, 3)))   # only the shape is wrong


@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_g_values_wrong_length(solver):
    with pytest.raises(ValueError, match=r"g_values shape \(5,\) incompatible .* expected \(9,\)"):
        solver(g_values=np.zeros(5))        # only the length is wrong


# ---------------------------------------------------------------------------
# a_values (VIDE only)
# ---------------------------------------------------------------------------

def test_a_values_2d():
    with pytest.raises(ValueError, match="a_values shape \\(3, 3\\) incompatible"):
        _vide(a_values=np.ones((3, 3)))


def test_a_values_wrong_length():
    with pytest.raises(ValueError, match=r"a_values shape \(5,\) incompatible .* expected \(9,\)"):
        _vide(a_values=np.ones(5))


# ---------------------------------------------------------------------------
# time_step (VIE_1 only)
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_time_step_zero(solver):
    with pytest.raises(ValueError, match="time_step must be positive"):
        solver(time_step=0.0)


@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_time_step_negative(solver):
    with pytest.raises(ValueError, match="time_step must be positive"):
        solver(time_step=-1.0)


@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
@pytest.mark.parametrize("bad", [np.inf, np.nan])
def test_time_step_non_finite(solver, bad):
    """inf used to pass the positivity check and return all-NaN output."""
    with pytest.raises(ValueError, match="time_step must be positive and finite"):
        solver(time_step=bad)


@pytest.mark.parametrize("quad", ["collocation", "product"])
def test_time_step_non_finite_both_quadratures(quad):
    with pytest.raises(ValueError, match="time_step must be positive and finite"):
        _vie2(time_step=np.inf, quadrature=quad)


# ---------------------------------------------------------------------------
# coll_divs must be positive
# ---------------------------------------------------------------------------

_COLL_ERRORS = [(_vie1, ValueError), (_vie2, ValueError), (_vide, ValueError)]


@pytest.mark.parametrize("solver, error", _COLL_ERRORS)
def test_coll_divs_zero(solver, error):
    with pytest.raises(error, match="coll_divs must be a positive integer"):
        solver(coll_divs=0, coll_choices=[1])


@pytest.mark.parametrize("solver, error", _COLL_ERRORS)
def test_coll_divs_negative(solver, error):
    with pytest.raises(error, match="coll_divs must be a positive integer"):
        solver(coll_divs=-1, coll_choices=[1])


def test_vie1_coll_divs_non_integer():
    """Used to reach the solver and fail deep inside (or, with
    quadrature='product', silently run as coll_divs=2)."""
    for quadrature in ("collocation", "product"):
        with pytest.raises(ValueError, match="coll_divs must be a positive integer"):
            _vie1(coll_divs=2.7, coll_choices=[1, 2], quadrature=quadrature)


# ---------------------------------------------------------------------------
# coll_choices must be integers
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("solver, error", _COLL_ERRORS)
def test_coll_choices_floats(solver, error):
    with pytest.raises(error, match="coll_choices must be a list of integers"):
        solver(coll_choices=[1.0, 2.0])


# ---------------------------------------------------------------------------
# coll_choices must be distinct
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("solver, error", _COLL_ERRORS)
def test_coll_choices_duplicates(solver, error):
    with pytest.raises(error,
                       match="all integers in coll_choices must be distinct"):
        solver(coll_choices=[1, 1, 2])


# ---------------------------------------------------------------------------
# coll_choices range
# ---------------------------------------------------------------------------

def test_vie1_choice_out_of_range():
    with pytest.raises(ValueError,
                       match="coll_choices must contain only integers from 1 to coll_divs"):
        _vie1(coll_divs=2, coll_choices=[1, 5])


def test_vie2_choice_out_of_range():
    with pytest.raises(ValueError,
                       match="coll_choices must contain only integers from 0 to coll_divs"):
        _vie2(coll_divs=2, coll_choices=[1, 5])


def test_vide_choice_out_of_range():
    with pytest.raises(ValueError,
                       match="coll_choices must contain only integers from 0 to coll_divs"):
        _vide(coll_divs=2, coll_choices=[1, 5])


# ---------------------------------------------------------------------------
# Zero not allowed in coll_choices for VIE_1
# ---------------------------------------------------------------------------

def test_vie1_zero_choice():
    with pytest.raises(ValueError, match="zero cannot be a collocation parameter"):
        _vie1(coll_divs=2, coll_choices=[0, 1])


# ---------------------------------------------------------------------------
# force_continuous requires soln_init_value (VIE_1)
# ---------------------------------------------------------------------------

def test_vie1_force_continuous_no_init():
    with pytest.raises(ValueError, match="must specify soln_init_value"):
        solve_VIE_1(kernel_values=_K, g_values=_G1, coll_divs=2,
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
        solve_VIE_1, kernel_values=k, g_values=np.arange(_N, dtype=float),
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
# the zero matrix, which is singular. d=9 exercises the runtime LU path;
# d=1 (scalar) and d=2 exercise the compile-time path, whose lin_solve used
# to abort the whole process via a D assert escaping extern(C) rather than
# reporting failure (regression tests below).
# ---------------------------------------------------------------------------

# K = 0 makes each step's collocation matrix exactly singular; these tests
# check that the solver raises LinAlgError rather than returning garbage.
def test_vie1_singular_matrix_raises_linalgerror():
    d = 9
    coll_divs = 3
    N = coll_divs**2 + 1  # one mesh interval
    kernel = np.zeros((N, d, d))
    g = np.outer(np.arange(N), np.ones(d))
    with pytest.raises(np.linalg.LinAlgError):
        solve_VIE_1(kernel_values=kernel, g_values=g,
                    coll_divs=coll_divs, coll_choices=[1, 2, 3], show_warnings=False)


def test_vie1_singular_matrix_scalar_raises_linalgerror():
    # Compile-time (d <= 8) path, scalar driver.
    with pytest.raises(np.linalg.LinAlgError):
        solve_VIE_1(kernel_values=np.zeros(10), g_values=np.arange(10.0),
                    coll_divs=3, coll_choices=[1, 2, 3], show_warnings=False)


def test_vie1_singular_matrix_d2_raises_linalgerror():
    # Compile-time (d <= 8) path, vector driver.
    N = 10
    with pytest.raises(np.linalg.LinAlgError):
        solve_VIE_1(kernel_values=np.zeros((N, 2, 2)),
                    g_values=np.outer(np.arange(N), np.ones(2)),
                    coll_divs=3, coll_choices=[1, 2, 3], show_warnings=False)


def _near_singular_kernel(d, N=10):
    """Kernel whose row 1 equals row 0 times (1 + 2^-52): the collocation
    matrix is nearly (not exactly) singular, with pivots ~eps * scale --
    below the relative threshold, but invisible to a LU that only flags
    exactly-zero pivots."""
    t = np.linspace(0.0, 0.9, N)
    K = np.zeros((N, d, d))
    for i in range(d):
        K[:, i, i] = np.exp(-t)
    K[:, 1, :] = K[:, 0, :] * (1.0 + 2.0 ** -52)
    return K


@pytest.mark.parametrize("d", [2, 9], ids=["compile-time", "runtime"])
def test_vie1_near_singular_matrix_raises_linalgerror(d):
    """Near-singular (not exactly singular) systems must raise on both LU
    backends: the pure-D path uses a relative pivot threshold, and the
    LAPACK path applies the same threshold to dgesv_'s U diagonal (dgesv_
    itself only reports exactly-zero pivots)."""
    K = _near_singular_kernel(d)
    with pytest.raises(np.linalg.LinAlgError):
        solve_VIE_1(kernel_values=K, g_values=np.outer(np.arange(len(K)), np.ones(d)),
                    coll_divs=3, coll_choices=[1, 2, 3], show_warnings=False)


# ---------------------------------------------------------------------------
# Matrix (multi-RHS) input edges
# ---------------------------------------------------------------------------

def test_matrix_zero_columns_raises_clean_error():
    N, d = 10, 2
    kernel = np.zeros((N, d, d))
    kernel[:, 0, 0] = kernel[:, 1, 1] = 1.0
    with pytest.raises(ValueError, match="zero columns"):
        solve_VIE_2(kernel_values=kernel, g_values=np.ones((N, d, 0)),
                    coll_divs=3, coll_choices=[0, 1, 2])
    with pytest.raises(ValueError, match="zero columns"):
        solve_VIDE(kernel_values=kernel, g_values=np.ones((N, d, 0)),
                   soln_init_value=np.ones((d, 0)),
                   coll_divs=3, coll_choices=[1, 2, 3])


# ---------------------------------------------------------------------------
# Plain Python lists accepted for array inputs
# ---------------------------------------------------------------------------

def _list_inputs():
    """9-point float lists, valid for coll_divs=2 (g(0) = 0, as VIE-1 needs)."""
    return [float(x) for x in range(9)]


def _list_kernel():
    """9-point kernel list with K(0) != 0, as VIE-1 needs."""
    return [1.0 + 0.1 * x for x in range(9)]


@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_list_kernel_values(solver):
    solver(kernel_values=_list_kernel(), g_values=_list_inputs())


@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_list_g_values(solver):
    solver(g_values=_list_inputs())


# ---------------------------------------------------------------------------
# coll_choices must not be mutated
# ---------------------------------------------------------------------------

def test_coll_choices_not_mutated_vie1():
    # coll_divs=2, choices [1,2] but supplied reversed; _K has 9 pts = 2*4+1
    choices = [2, 1]
    solve_VIE_1(kernel_values=_K, g_values=_G1, coll_divs=2, coll_choices=choices)
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
    short_G = np.zeros(5)
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


# ---------------------------------------------------------------------------
# Scalar soln_init_value given as a one-element array-like
# ---------------------------------------------------------------------------

_T30 = np.arange(37) * 0.05


def _scalar_init_solves(init):
    from voles import function_solve_VIDE, function_solve_VIE_1
    K, g = np.exp(-_T30), np.sin(_T30)
    mesh = np.linspace(0, 1, 6)
    return [
        solve_VIDE(kernel_values=K, g_values=g, soln_init_value=init, time_step=0.05),
        solve_VIDE(kernel_values=K, g_values=g, soln_init_value=init, time_step=0.05,
                   quadrature="product"),
        solve_VIE_1(kernel_values=K + 1, g_values=g, soln_init_value=init, time_step=0.05,
                    force_continuous=True, show_warnings=False),
        function_solve_VIDE(kernel=lambda u: np.exp(-u), g=np.sin, soln_init_value=init,
                            mesh_breakpoints=mesh),
        function_solve_VIE_1(kernel=lambda u: np.exp(-u) + 1, g=np.sin, soln_init_value=init,
                             mesh_breakpoints=mesh, force_continuous=True, show_warnings=False),
    ]


@pytest.mark.parametrize("init", [[0.5], np.array([0.5]), np.array([[0.5]]), np.float32(0.5)])
def test_scalar_init_accepts_single_element(init):
    """Used to raise a bare TypeError from float() for [0.5] / array([0.5])."""
    for got, ref in zip(_scalar_init_solves(init), _scalar_init_solves(0.5)):
        np.testing.assert_array_equal(got, ref)


def test_scalar_init_rejects_multiple_elements():
    with pytest.raises(ValueError, match="single number for a scalar equation"):
        solve_VIDE(kernel_values=np.exp(-_T30), g_values=np.sin(_T30),
                   soln_init_value=[0.5, 1.0], time_step=0.05)


@pytest.mark.parametrize("quad", ["collocation", "product"])
def test_vector_vide_scalar_init_message(quad):
    """A scalar soln_init_value is not accepted for a vector equation; the
    message used to claim it was ("must be a scalar or length-d array")."""
    t = np.arange(37) * 0.05
    K = np.exp(-t)[:, None, None] * np.eye(2)
    with pytest.raises(ValueError, match=r"must have shape \(2,\) .* got shape \(\)"):
        solve_VIDE(kernel_values=K, g_values=np.zeros((37, 2)), soln_init_value=0.5,
                   time_step=0.05, quadrature=quad)


@pytest.mark.parametrize("quad", ["collocation", "product"])
@pytest.mark.parametrize("N", [0, 3])
def test_too_short_input_message(N, quad, capsys):
    """An empty input used to report 'truncated to -3', after printing a
    truncation warning; now the length check comes first."""
    with pytest.raises(ValueError, match=rf"has length {N}, which leaves zero mesh intervals"):
        solve_VIE_2(kernel_values=np.ones(N), g_values=np.ones(N), time_step=0.1,
                    quadrature=quad, mesh_samples=4 if quad == "product" else None)
    assert "truncated" not in capsys.readouterr().out
