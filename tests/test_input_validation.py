"""Tests that solvers raise meaningful errors for bad inputs (sampled inputs;
the regime rules and the type-vs-value policy are in test_api.py and
test_validation_policy.py)."""
import numpy as np
import pytest
from voles import solve_vie1, solve_vie2, solve_vide
from conftest import run

# ---------------------------------------------------------------------------
# Helpers — valid base kwargs, override per test
# ---------------------------------------------------------------------------

# 9 points: two mesh intervals of divs**2 = 4 samples for coll_setting divs = 2
_K = np.ones(9)
_G = np.ones(9)
_A = np.zeros(9)
# VIE-1 requires g(0) = 0; with K = 1, g(t) = t gives the exact solution y = 1.
_G1 = np.arange(9.0)


def _vie1(**kw):
    return solve_vie1(**{**dict(kernel=_K, g=_G1, coll_setting=(2, [1, 2])), **kw}).y


def _vie2(**kw):
    return solve_vie2(**{**dict(kernel=_K, g=_G, coll_setting=(2, [0, 1, 2])), **kw}).y


def _vide(**kw):
    return solve_vide(**{**dict(kernel=_K, g=_G, a=_A, y0=0.0, coll_setting=(2, [0, 1, 2])),
                         **kw}).y


ALL = [_vie1, _vie2, _vide]


# ---------------------------------------------------------------------------
# Shapes
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("solver", ALL)
def test_kernel_2d(solver):
    # A 2-D sampled kernel is reserved for non-convolution kernels.
    with pytest.raises(ValueError, match="2-D kernel is reserved"):
        solver(kernel=np.ones((3, 3)))


@pytest.mark.parametrize("solver", ALL)
def test_g_2d(solver):
    with pytest.raises(ValueError, match=r"g must have shape \(9,\) to match kernel \(9,\), got \(3, 3\)"):
        solver(g=np.zeros((3, 3)))


@pytest.mark.parametrize("solver", ALL)
def test_g_wrong_length(solver):
    with pytest.raises(ValueError, match=r"g must have shape \(9,\) .* got \(5,\)"):
        solver(g=np.zeros(5))


def test_a_matrix_for_a_scalar_equation():
    with pytest.raises(ValueError, match="must be a number for a scalar equation"):
        _vide(a=np.ones((3, 3)))


def test_a_wrong_length():
    with pytest.raises(ValueError, match=r"a must have shape \(9,\) .* got \(5,\)"):
        _vide(a=np.ones(5))


# ---------------------------------------------------------------------------
# dt
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("solver", ALL)
@pytest.mark.parametrize("bad", [0.0, -1.0, np.inf, np.nan])
def test_dt_must_be_positive_and_finite(solver, bad):
    """inf used to pass the positivity check and return all-NaN output."""
    with pytest.raises(ValueError, match="dt must be positive and finite"):
        solver(dt=bad)


@pytest.mark.parametrize("quad", ["collocation", "product"])
def test_dt_non_finite_both_quadratures(quad):
    with pytest.raises(ValueError, match="dt must be positive and finite"):
        _vie2(dt=np.inf, quadrature=quad)


# ---------------------------------------------------------------------------
# coll_setting
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("solver", ALL)
@pytest.mark.parametrize("divs", [0, -1])
def test_divs_must_be_positive(solver, divs):
    with pytest.raises(ValueError, match="divs must be at least 1"):
        solver(coll_setting=(divs, [1]))


@pytest.mark.parametrize("quadrature", ["collocation", "product"])
def test_divs_non_integer(quadrature):
    """Used to reach the solver and fail deep inside (or, with
    quadrature='product', silently run as divs = 2)."""
    with pytest.raises(TypeError, match="divs must be an integer"):
        _vie1(coll_setting=(2.7, [1, 2]), quadrature=quadrature)


@pytest.mark.parametrize("solver", ALL)
def test_choices_floats(solver):
    # A float where an integer is required is a type error (contract §9).
    with pytest.raises(TypeError, match="choices must be integers"):
        solver(coll_setting=(2, [1.0, 2.0]))


@pytest.mark.parametrize("solver", ALL)
def test_choices_duplicates(solver):
    with pytest.raises(ValueError, match="choices must be distinct"):
        solver(coll_setting=(2, [1, 1, 2]))


@pytest.mark.parametrize("solver, rng", [(_vie1, "1..2 for VIE-1"), (_vie2, "0..2"),
                                         (_vide, "0..2")])
def test_choices_out_of_range(solver, rng):
    with pytest.raises(ValueError, match=f"choices must lie in {rng}"):
        solver(coll_setting=(2, [1, 5]))


def test_vie1_zero_choice():
    with pytest.raises(ValueError, match="choices must lie in 1..2 for VIE-1"):
        _vie1(coll_setting=(2, [0, 1]))


def test_vie1_continuous_needs_y0():
    with pytest.raises(ValueError, match="continuous=True needs the initial value y0"):
        _vie1(continuous=True)


# ---------------------------------------------------------------------------
# NaN inputs are rejected up front, naming the input (see also
# test_validation_policy.py). divs = 5 is not compiled, so these used to reach
# the numba path with the NaN.
# ---------------------------------------------------------------------------

_N = 51                                  # 1 * 5**2 + 1
_COLL_IDX = 5                            # the first collocation sample of mesh 0


@pytest.mark.parametrize("which", ["kernel", "g", "a"])
@pytest.mark.parametrize("solver", ["vie1", "vie2", "vide"])
def test_nan_input_is_rejected(solver, which):
    if which == "a" and solver != "vide":
        pytest.skip("a is a VIDE input")
    data = dict(kernel=np.ones(_N), g=np.arange(_N, dtype=float) if solver == "vie1" else np.ones(_N))
    if solver == "vide":
        data.update(a=np.zeros(_N), y0=0.0)
    data[which] = data[which].copy()
    data[which][3 if which == "kernel" else _COLL_IDX] = np.nan
    fn = dict(vie1=solve_vie1, vie2=solve_vie2, vide=solve_vide)[solver]
    with pytest.raises(ValueError, match=f"{which} contains a non-finite value"):
        fn(coll_setting=5, quadrature="collocation", **data)


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
        run(solve_vie1, show_warnings=False, kernel=kernel, g=g, coll_setting=(coll_divs, [1, 2, 3])).y


def test_vie1_singular_matrix_scalar_raises_linalgerror():
    # Compile-time (d <= 8) path, scalar driver.
    with pytest.raises(np.linalg.LinAlgError):
        run(solve_vie1, show_warnings=False, kernel=np.zeros(10), g=np.arange(10.0), coll_setting=(3, [1, 2, 3])).y


def test_vie1_singular_matrix_d2_raises_linalgerror():
    # Compile-time (d <= 8) path, vector driver.
    N = 10
    with pytest.raises(np.linalg.LinAlgError):
        run(solve_vie1, show_warnings=False, kernel=np.zeros((N, 2, 2)), g=np.outer(np.arange(N), np.ones(2)), coll_setting=(3, [1, 2, 3])).y


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
        run(solve_vie1, show_warnings=False, kernel=K, g=np.outer(np.arange(len(K)), np.ones(d)), coll_setting=(3, [1, 2, 3])).y


# ---------------------------------------------------------------------------
# Matrix (multi-RHS) input edges
# ---------------------------------------------------------------------------

def test_matrix_zero_columns_raises_clean_error():
    N, d = 10, 2
    kernel = np.zeros((N, d, d))
    kernel[:, 0, 0] = kernel[:, 1, 1] = 1.0
    with pytest.raises(ValueError, match="zero columns"):
        solve_vie2(kernel=kernel, g=np.ones((N, d, 0)), coll_setting=(3, [0, 1, 2])).y
    with pytest.raises(ValueError, match="zero columns"):
        solve_vide(kernel=kernel, g=np.ones((N, d, 0)), y0=np.ones((d, 0)), coll_setting=(3, [1, 2, 3])).y


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
    solver(kernel=_list_kernel(), g=_list_inputs())


@pytest.mark.parametrize("solver", [_vie1, _vie2, _vide])
def test_list_g_values(solver):
    solver(g=_list_inputs())


# ---------------------------------------------------------------------------
# coll_choices must not be mutated
# ---------------------------------------------------------------------------

def test_coll_choices_not_mutated_vie1():
    # coll_divs=2, choices [1,2] but supplied reversed; _K has 9 pts = 2*4+1
    choices = [2, 1]
    solve_vie1(kernel=_K, g=_G1, coll_setting=(2, choices)).y
    assert choices == [2, 1]


def test_coll_choices_not_mutated_vie2():
    choices = [2, 0, 1]
    solve_vie2(kernel=_K, g=_G, coll_setting=(2, choices)).y
    assert choices == [2, 0, 1]


def test_coll_choices_not_mutated_vide():
    choices = [2, 0, 1]
    solve_vide(kernel=_K, g=_G, a=_A, y0=0.0, coll_setting=(2, choices)).y
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
    kwargs = dict(kernel=short_K, g=short_G, coll_setting=(3, [1, 2, 3] if solver is _vie1 else [0, 1, 2]), quadrature="collocation")
    if solver is _vide:
        kwargs["a"] = short_A
    with pytest.raises(ValueError, match=r"kernel has 5 samples, but one mesh interval"):
        solver(**kwargs)


def test_too_short_input_vector_raises():
    """Vector path -- the original notebook's failure mode."""
    import numpy as np
    with pytest.raises(ValueError, match=r"kernel has 5 samples, but one mesh interval"):
        solve_vie1(kernel=np.zeros((5, 2, 2)), g=np.zeros((5, 2)), dt=1.0, coll_setting=(3, [1, 2, 3])).y


# ---------------------------------------------------------------------------
# Scalar soln_init_value given as a one-element array-like
# ---------------------------------------------------------------------------

_T30 = np.arange(37) * 0.05


def _scalar_init_solves(init):
    from voles import solve_vide, solve_vie1
    K, g = np.exp(-_T30), np.sin(_T30)
    mesh = np.linspace(0, 1, 6)
    return [
        solve_vide(kernel=K, g=g, y0=init, dt=0.05).y,
        solve_vide(kernel=K, g=g, y0=init, dt=0.05, quadrature="product").y,
        run(solve_vie1, show_warnings=False, kernel=K + 1, g=g, y0=init, dt=0.05, continuous=True).y,
        solve_vide(kernel=lambda u: np.exp(-u), g=np.sin, y0=init, mesh=mesh).node_values,
        run(solve_vie1, show_warnings=False, kernel=lambda u: np.exp(-u) + 1, g=np.sin, y0=init, mesh=mesh, continuous=True).node_values,
    ]


@pytest.mark.parametrize("init", [[0.5], np.array([0.5]), np.array([[0.5]]), np.float32(0.5)])
def test_scalar_init_accepts_single_element(init):
    """Used to raise a bare TypeError from float() for [0.5] / array([0.5])."""
    for got, ref in zip(_scalar_init_solves(init), _scalar_init_solves(0.5)):
        np.testing.assert_array_equal(got, ref)


def test_scalar_init_rejects_multiple_elements():
    with pytest.raises(ValueError, match="single number for a scalar equation"):
        solve_vide(kernel=np.exp(-_T30), g=np.sin(_T30), y0=[0.5, 1.0], dt=0.05).y


@pytest.mark.parametrize("quad", ["collocation", "product"])
def test_vector_vide_scalar_init_message(quad):
    """A scalar soln_init_value is not accepted for a vector equation; the
    message used to claim it was ("must be a scalar or length-d array")."""
    t = np.arange(37) * 0.05
    K = np.exp(-t)[:, None, None] * np.eye(2)
    with pytest.raises(ValueError, match=r"must have shape \(2,\) .* got shape \(\)"):
        solve_vide(kernel=K, g=np.zeros((37, 2)), y0=0.5, dt=0.05, quadrature=quad).y


@pytest.mark.parametrize("quad", ["collocation", "product"])
@pytest.mark.parametrize("N", [0, 3])
def test_too_short_input_message(N, quad, voles_warnings):
    """An empty input used to report 'truncated to -3', after printing a
    truncation warning; now the length check comes first."""
    with pytest.raises(ValueError, match=rf"kernel has {N} samples, but one mesh interval"):
        solve_vie2(kernel=np.ones(N), g=np.ones(N), dt=0.1, quadrature=quad, samples_per_interval=4 if quad == "product" else None).y
    assert "truncated" not in voles_warnings.text()
