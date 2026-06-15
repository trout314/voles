"""Tests for the callable-input function_solve_* solvers.

Currently exercises only the scalar VIE-2 prototype (`function_solve_VIE_2`).
The per-step linear solve is currently a Python scaffold that will be ported
to D in a follow-up commit. These tests pin the math and the API; they should
continue to pass after the D port.
"""

import numpy as np
import pytest

from volterra_equation_solvers._callable_solvers import (
    function_solve_VIE_2, function_solve_VIDE, function_solve_VIE_1,
    optimal_graded_mesh,
)


def _collect_node_values(y, mesh_bps, coll_divs, coll_choices, ref):
    """Max ||y_node - ref(t_node)||_inf across all collocation nodes.

    Works for both scalar (y[n,i] is float) and vector (y[n,i] is (d,) array)
    solutions; np.max(np.abs(...)) collapses to abs() in the scalar case.
    """
    node_pos = np.asarray(coll_choices, dtype=float) / coll_divs
    err = 0.0
    M = len(mesh_bps) - 1
    for n in range(M):
        t_n = mesh_bps[n]
        h_n = mesh_bps[n + 1] - t_n
        for i, pos in enumerate(node_pos):
            t = t_n + pos * h_n
            err = max(err, float(np.max(np.abs(y[n, i] - ref(t)))))
    return err


# ---------------------------------------------------------------------------
# Smooth-kernel convergence
# ---------------------------------------------------------------------------

def test_smooth_exponential_growth():
    """K(u)=1, g(t)=1 → y(t) = exp(t)."""
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_2(kernel=lambda u: 1.0, g=lambda t: 1.0,
                             mesh_breakpoints=mesh,
                             coll_divs=2, coll_choices=[0, 1, 2])
    err = _collect_node_values(y, mesh, 2, [0, 1, 2], np.exp)
    assert err < 1e-6


def test_smooth_matches_exact_solution(vie2_callable_smooth):
    p = vie2_callable_smooth
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_2(kernel=p["kernel"], g=p["g"],
                             mesh_breakpoints=mesh,
                             coll_divs=p["coll_divs"],
                             coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"],
                               p["y_exact"])
    assert err < 1e-6


def test_smooth_matches_exp_exact_solution(vie2_callable_exp):
    """K(u)=2cos(u), exact y(t)=exp(t) — callable analogue of vie2_exp_data."""
    p = vie2_callable_exp
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_2(kernel=p["kernel"], g=p["g"],
                             mesh_breakpoints=mesh,
                             coll_divs=p["coll_divs"],
                             coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"],
                               p["y_exact"])
    assert err < 1e-5


@pytest.mark.parametrize("coll_divs,coll_choices", [
    (3, [0, 1, 2, 3]),
    (3, [1, 2, 3]),
    (4, [0, 2, 4]),
])
def test_smooth_different_coll_settings(vie2_callable_smooth, coll_divs, coll_choices):
    """The solver works at coll_divs values other than 2."""
    p = vie2_callable_smooth
    mesh = np.linspace(0, 1, 11)
    y = function_solve_VIE_2(kernel=p["kernel"], g=p["g"],
                             mesh_breakpoints=mesh,
                             coll_divs=coll_divs, coll_choices=coll_choices)
    err = _collect_node_values(y, mesh, coll_divs, coll_choices, p["y_exact"])
    assert err < 1e-3


@pytest.mark.parametrize("M_target", [10, 20, 40])
def test_smooth_convergence_rate(vie2_callable_smooth, M_target):
    """Halving h reduces error by >= 8 (order-4 method, generous lower bound)."""
    p = vie2_callable_smooth

    def err_at(M):
        mesh = np.linspace(0, 1, M + 1)
        y = function_solve_VIE_2(kernel=p["kernel"], g=p["g"],
                                 mesh_breakpoints=mesh,
                                 coll_divs=p["coll_divs"],
                                 coll_choices=p["coll_choices"])
        return _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"],
                                    p["y_exact"])

    ratio = err_at(M_target) / err_at(M_target * 2)
    assert ratio > 8.0


def test_smooth_g_none_treated_as_zero():
    """g=None is equivalent to g(t)=0; the trivial solution is y=0."""
    mesh = np.linspace(0, 1, 11)
    y = function_solve_VIE_2(kernel=lambda u: np.exp(-u),
                             mesh_breakpoints=mesh,
                             coll_divs=2, coll_choices=[0, 1, 2])
    assert np.allclose(y, 0.0, atol=1e-12)


# ---------------------------------------------------------------------------
# Non-uniform mesh
# ---------------------------------------------------------------------------

def test_non_uniform_geometric_mesh(vie2_callable_smooth):
    p = vie2_callable_smooth
    mesh = np.linspace(0, 1, 21) ** 1.5
    y = function_solve_VIE_2(kernel=p["kernel"], g=p["g"],
                             mesh_breakpoints=mesh,
                             coll_divs=p["coll_divs"],
                             coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"],
                               p["y_exact"])
    assert err < 1e-5


def test_non_uniform_random_breakpoints(vie2_callable_smooth):
    p = vie2_callable_smooth
    rng = np.random.default_rng(42)
    interior = np.sort(rng.uniform(0.01, 0.99, size=15))
    mesh = np.concatenate([[0.0], interior, [1.0]])
    y = function_solve_VIE_2(kernel=p["kernel"], g=p["g"],
                             mesh_breakpoints=mesh,
                             coll_divs=p["coll_divs"],
                             coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"],
                               p["y_exact"])
    assert err < 1e-3


def test_single_interval_mesh(vie2_callable_smooth):
    """Edge case: M=1 (just two breakpoints — one integration interval)."""
    p = vie2_callable_smooth
    mesh = np.array([0.0, 0.5])
    y = function_solve_VIE_2(kernel=p["kernel"], g=p["g"],
                             mesh_breakpoints=mesh,
                             coll_divs=p["coll_divs"],
                             coll_choices=p["coll_choices"])
    assert y.shape == (1, len(p["coll_choices"]))
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"],
                               p["y_exact"])
    assert err < 1e-3  # one interval is coarse; loose tolerance OK


def test_minimal_collocation_setting(vie2_callable_smooth):
    """coll_divs=1, coll_choices=[1] — the simplest valid setting (degree-0)."""
    p = vie2_callable_smooth
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_2(kernel=p["kernel"], g=p["g"],
                             mesh_breakpoints=mesh,
                             coll_divs=1, coll_choices=[1])
    err = _collect_node_values(y, mesh, 1, [1], p["y_exact"])
    # Degree-0 collocation converges only at order 1; loose tolerance.
    assert err < 0.1


# ---------------------------------------------------------------------------
# Singular kernel
# ---------------------------------------------------------------------------

def test_singular_graded_mesh_recovers_high_order(vie2_callable_abel):
    """Graded mesh r=3 should beat uniform mesh by >> 100× for K(u)~u^{-1/2}."""
    p = vie2_callable_abel
    M = 20
    common = dict(kernel=p["kernel"], g=p["g"],
                  coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
                  kernel_singularity=p["kernel_singularity"])

    mesh_uniform = np.linspace(0, 1, M + 1)
    y_uniform = function_solve_VIE_2(mesh_breakpoints=mesh_uniform, **common)
    err_uniform = _collect_node_values(
        y_uniform, mesh_uniform, p["coll_divs"], p["coll_choices"], p["y_exact"])

    mesh_graded = np.linspace(0, 1, M + 1) ** 3
    y_graded = function_solve_VIE_2(mesh_breakpoints=mesh_graded, **common)
    err_graded = _collect_node_values(
        y_graded, mesh_graded, p["coll_divs"], p["coll_choices"], p["y_exact"])

    assert err_graded < err_uniform / 100


def test_singular_undeclared_raises():
    """K(u)=1/u (non-integrable) with no kernel_singularity → ValueError."""
    K_bad = lambda u: 1.0 / u if u > 0 else float("inf")
    mesh = np.linspace(0, 1, 11)
    with pytest.warns(), pytest.raises(ValueError, match="non-finite"):
        function_solve_VIE_2(kernel=K_bad, g=lambda t: t,
                             mesh_breakpoints=mesh,
                             coll_divs=2, coll_choices=[0, 1, 2])


def test_singular_list_form_equals_scalar_form(vie2_callable_abel):
    """kernel_singularity=0.0 and kernel_singularity=[0.0] should give same result."""
    p = vie2_callable_abel
    mesh = np.linspace(0, 1, 11) ** 3
    common = dict(kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
                  coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    y_scalar = function_solve_VIE_2(kernel_singularity=0.0, **common)
    y_list = function_solve_VIE_2(kernel_singularity=[0.0], **common)
    assert np.allclose(y_scalar, y_list, atol=1e-14)


def test_singular_callable_form_equals_scalar_form(vie2_callable_abel):
    """kernel_singularity=0.0 should match the equivalent callable form."""
    p = vie2_callable_abel
    mesh = np.linspace(0, 1, 11) ** 3
    common = dict(kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
                  coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    y_scalar = function_solve_VIE_2(kernel_singularity=0.0, **common)
    # Convolution u=0 in callable form returns the single s-location s=t
    y_callable = function_solve_VIE_2(kernel_singularity=lambda t: [t], **common)
    assert np.allclose(y_scalar, y_callable, atol=1e-14)


def test_singular_at_nonzero_location():
    """Kernel singular at u=0.5 (interior, not at u=0). Smooth elsewhere.

    K(u) = 1/sqrt(|u-0.5|) + 1: declared singularity at u=0.5 means the
    weight builder uses scipy.quad on intervals where the singular point
    s = tau - 0.5 falls inside. Just verify the solve completes and produces
    finite values (this exercises a code path that scalar-at-zero misses).
    """
    K = lambda u: 1.0 / np.sqrt(abs(u - 0.5)) + 1.0 if abs(u - 0.5) > 1e-12 else 1e6
    g = lambda t: t  # arbitrary smooth g; the test just checks finiteness
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                             coll_divs=2, coll_choices=[0, 1, 2],
                             kernel_singularity=0.5)
    assert np.all(np.isfinite(y))


def test_singular_multiple_locations():
    """Two singular points in one kernel: K(u) = 1/sqrt(u) + 1/sqrt(|u-0.5|+1e-6)."""
    K = lambda u: (1.0 / np.sqrt(u) if u > 1e-12 else 0.0) + 1.0 / np.sqrt(abs(u - 0.5) + 1e-6)
    g = lambda t: t
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                             coll_divs=2, coll_choices=[0, 1, 2],
                             kernel_singularity=[0.0, 0.5])
    assert np.all(np.isfinite(y))


# ---------------------------------------------------------------------------
# Solution callable wrapper
# ---------------------------------------------------------------------------

def test_callable_scalar_evaluation(vie2_callable_smooth):
    p = vie2_callable_smooth
    mesh = np.linspace(0, 1, 21)
    _, y_func = function_solve_VIE_2(kernel=p["kernel"], g=p["g"],
                                     mesh_breakpoints=mesh,
                                     coll_divs=p["coll_divs"],
                                     coll_choices=p["coll_choices"],
                                     return_function=True)
    assert isinstance(y_func(0.37), float)
    assert abs(y_func(0.37) - p["y_exact"](0.37)) < 1e-5


def test_callable_array_evaluation(vie2_callable_smooth):
    p = vie2_callable_smooth
    mesh = np.linspace(0, 1, 21)
    _, y_func = function_solve_VIE_2(kernel=p["kernel"], g=p["g"],
                                     mesh_breakpoints=mesh,
                                     coll_divs=p["coll_divs"],
                                     coll_choices=p["coll_choices"],
                                     return_function=True)
    ts = np.array([0.1, 0.37, 0.5, 0.9])
    vals = y_func(ts)
    assert vals.shape == ts.shape
    assert np.max(np.abs(vals - p["y_exact"](ts))) < 1e-5


def test_callable_exposes_polynomials_and_mesh(vie2_callable_smooth):
    p = vie2_callable_smooth
    mesh = np.linspace(0, 1, 21)
    _, y_func = function_solve_VIE_2(kernel=p["kernel"], g=p["g"],
                                     mesh_breakpoints=mesh,
                                     coll_divs=p["coll_divs"],
                                     coll_choices=p["coll_choices"],
                                     return_function=True)
    assert len(y_func.polynomials) == len(mesh) - 1
    assert np.array_equal(y_func.mesh_breakpoints, mesh)


def test_callable_at_breakpoint_continuous(vie2_callable_smooth):
    """At an interior breakpoint, the wrapper should give a value close to the
    exact solution (the piecewise polynomial is near-continuous there)."""
    p = vie2_callable_smooth
    mesh = np.linspace(0, 1, 21)
    _, y_func = function_solve_VIE_2(kernel=p["kernel"], g=p["g"],
                                     mesh_breakpoints=mesh,
                                     coll_divs=p["coll_divs"],
                                     coll_choices=p["coll_choices"],
                                     return_function=True)
    t = mesh[5]
    assert abs(y_func(t) - p["y_exact"](t)) < 1e-5


# ---------------------------------------------------------------------------
# Input validation
# ---------------------------------------------------------------------------

def test_validation_mesh_not_increasing():
    with pytest.raises(ValueError, match="strictly increasing"):
        function_solve_VIE_2(kernel=lambda u: 1.0,
                             mesh_breakpoints=np.array([0.0, 0.5, 0.3, 1.0]),
                             coll_divs=2, coll_choices=[0, 1, 2])


def test_validation_mesh_not_starting_at_zero():
    with pytest.raises(ValueError, match="must be 0"):
        function_solve_VIE_2(kernel=lambda u: 1.0,
                             mesh_breakpoints=np.array([0.1, 0.5, 1.0]),
                             coll_divs=2, coll_choices=[0, 1, 2])


def test_validation_coll_choices_out_of_range():
    with pytest.raises(ValueError, match=r"\[0, 2\]"):
        function_solve_VIE_2(kernel=lambda u: 1.0,
                             mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_divs=2, coll_choices=[0, 1, 5])


def test_validation_kernel_not_callable():
    with pytest.raises(TypeError, match="kernel"):
        function_solve_VIE_2(kernel=np.zeros(10),
                             mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_divs=2, coll_choices=[0, 1, 2])


def test_validation_g_not_callable():
    with pytest.raises(TypeError, match="g"):
        function_solve_VIE_2(kernel=lambda u: 1.0, g=np.zeros(10),
                             mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_divs=2, coll_choices=[0, 1, 2])


@pytest.mark.parametrize("bad_divs", [0, -1, -5])
def test_validation_coll_divs_nonpositive(bad_divs):
    with pytest.raises(ValueError, match="positive integer"):
        function_solve_VIE_2(kernel=lambda u: 1.0,
                             mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_divs=bad_divs, coll_choices=[1])


def test_validation_coll_choices_floats():
    with pytest.raises(ValueError, match="integers"):
        function_solve_VIE_2(kernel=lambda u: 1.0,
                             mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_divs=2, coll_choices=[1.0, 2.0])


def test_validation_coll_choices_duplicates():
    with pytest.raises(ValueError, match="distinct"):
        function_solve_VIE_2(kernel=lambda u: 1.0,
                             mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_divs=2, coll_choices=[1, 1, 2])


# ---------------------------------------------------------------------------
# NaN handling: NaN from kernel propagates into the W tensor and the
# post-build isfinite check raises; NaN from g propagates into the solution.
# ---------------------------------------------------------------------------

def test_nan_from_kernel_raises():
    K_nan = lambda u: float("nan")
    with pytest.warns(), pytest.raises(ValueError, match="non-finite"):
        function_solve_VIE_2(kernel=K_nan, g=lambda t: 1.0,
                             mesh_breakpoints=np.linspace(0, 1, 11),
                             coll_divs=2, coll_choices=[0, 1, 2])


def test_nan_from_g_propagates():
    def g_nan(t):
        if 0.3 < t < 0.4:
            return float("nan")
        return 0.0
    y = function_solve_VIE_2(kernel=lambda u: np.exp(-u), g=g_nan,
                             mesh_breakpoints=np.linspace(0, 1, 11),
                             coll_divs=2, coll_choices=[0, 1, 2])
    assert np.any(~np.isfinite(y))


# ---------------------------------------------------------------------------
# Defensive: solver must not mutate user inputs; g must be called at the
# expected collocation points (catches off-by-one bugs in the future D port).
# ---------------------------------------------------------------------------

def test_coll_choices_not_mutated():
    """coll_choices reversed → solver should sort internally but leave caller's list alone."""
    choices = [2, 0, 1]
    function_solve_VIE_2(kernel=lambda u: 1.0, g=lambda t: 1.0,
                         mesh_breakpoints=np.linspace(0, 1, 5),
                         coll_divs=2, coll_choices=choices)
    assert choices == [2, 0, 1]


def test_g_called_at_expected_collocation_points():
    """g is sampled precisely at t_n + (coll_choices[i]/coll_divs) * h_n."""
    calls = []
    def g_recording(t):
        calls.append(t)
        return 0.0
    mesh = np.array([0.0, 0.5, 1.0])
    function_solve_VIE_2(kernel=lambda u: 1.0, g=g_recording,
                         mesh_breakpoints=mesh,
                         coll_divs=2, coll_choices=[0, 1, 2])
    # Interval 0 [0, 0.5]: nodes at 0, 0.25, 0.5
    # Interval 1 [0.5, 1.0]: nodes at 0.5, 0.75, 1.0
    expected = [0.0, 0.25, 0.5, 0.5, 0.75, 1.0]
    assert sorted(calls) == pytest.approx(sorted(expected))


# ---------------------------------------------------------------------------
# Optional dependency: scipy is only required for the adaptive-quad path.
# If unavailable, raise a friendly ImportError pointing at the [callable] extra.
# ---------------------------------------------------------------------------

def test_scipy_missing_friendly_import_error(monkeypatch, vie2_callable_abel):
    """When scipy can't be imported, the adaptive-quad path raises a clear
    ImportError directing users to the [callable] extra."""
    p = vie2_callable_abel

    def raise_import(*_args, **_kwargs):
        raise ImportError(
            "function_solve_* requires scipy. Install via "
            "`pip install volterra-equation-solvers[callable]`.")

    monkeypatch.setattr(
        "volterra_equation_solvers._callable_solvers._import_scipy_quad",
        raise_import)

    with pytest.raises(ImportError, match=r"\[callable\]"):
        function_solve_VIE_2(
            kernel=p["kernel"], g=p["g"],
            mesh_breakpoints=np.linspace(0, 1, 11) ** 3,
            coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
            kernel_singularity=p["kernel_singularity"])


# ---------------------------------------------------------------------------
# Vector-valued VIE-2 (matrix kernel K, vector g and y)
# ---------------------------------------------------------------------------

def test_vec_diagonal_matches_scalar(vie2_callable_smooth, vie2_callable_vec_diagonal):
    """Diagonal K: vector result must equal two independent scalar solves."""
    sp = vie2_callable_smooth
    vp = vie2_callable_vec_diagonal
    mesh = np.linspace(0, 1, 21)

    y_scalar = function_solve_VIE_2(
        kernel=sp["kernel"], g=sp["g"], mesh_breakpoints=mesh,
        coll_divs=sp["coll_divs"], coll_choices=sp["coll_choices"])
    y_vec = function_solve_VIE_2(
        kernel=vp["kernel"], g=vp["g"], mesh_breakpoints=mesh,
        coll_divs=vp["coll_divs"], coll_choices=vp["coll_choices"])

    assert y_vec.shape == (len(mesh) - 1, len(sp["coll_choices"]), vp["d"])
    assert np.allclose(y_vec[..., 0], y_scalar, atol=1e-12)
    assert np.allclose(y_vec[..., 1], y_scalar, atol=1e-12)


def test_vec_diagonal_matches_exact(vie2_callable_vec_diagonal):
    p = vie2_callable_vec_diagonal
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-6


def test_vec_coupled_kernel_matches_exact(vie2_callable_vec_coupled):
    """Non-constant 2x2 coupled kernel with known analytic solution."""
    p = vie2_callable_vec_coupled
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-6


def test_vec_constant_coupled_kernel_polynomial_exact():
    """Constant 2x2 K with polynomial exact y; Lagrange-3 basis captures it exactly."""
    K_mat = np.array([[1.5, -0.5], [-0.5, 1.5]])
    K = lambda u: K_mat
    g = lambda t: np.array([t + 0.5*t**2 - (2/3)*t**3,
                            t - 1.5*t**2 + (2/3)*t**3])
    y_exact = lambda t: np.array([t + t**2, t - t**2])
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                             coll_divs=3, coll_choices=[0, 1, 2, 3])
    err = _collect_node_values(y, mesh, 3, [0, 1, 2, 3], y_exact)
    assert err < 1e-12  # exact within machine precision


def test_vec_non_uniform_mesh(vie2_callable_vec_coupled):
    p = vie2_callable_vec_coupled
    mesh = np.linspace(0, 1, 21) ** 1.5
    y = function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-5


def test_vec_g_none_treated_as_zero(vie2_callable_vec_diagonal):
    """g=None on a vector kernel: trivial solution is y=0 of shape (M, p, d)."""
    p = vie2_callable_vec_diagonal
    mesh = np.linspace(0, 1, 11)
    y = function_solve_VIE_2(
        kernel=p["kernel"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    assert y.shape == (10, 3, p["d"])
    assert np.allclose(y, 0.0, atol=1e-12)


def test_vec_callable_solution_wrapper(vie2_callable_vec_diagonal):
    p = vie2_callable_vec_diagonal
    mesh = np.linspace(0, 1, 21)
    y_arr, y_func = function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        return_function=True)

    # Scalar t -> (d,) array
    val = y_func(0.37)
    assert val.shape == (p["d"],)
    assert np.allclose(val, p["y_exact"](0.37), atol=1e-5)

    # Array t -> (len(t), d) array
    ts = np.array([0.1, 0.37, 0.5, 0.9])
    vals = y_func(ts)
    assert vals.shape == (len(ts), p["d"])
    expected = np.stack([p["y_exact"](t) for t in ts])
    assert np.max(np.abs(vals - expected)) < 1e-5

    # Polynomials list has M entries, each a (d,) object array of Polynomials
    assert len(y_func.polynomials) == len(mesh) - 1
    assert y_func.polynomials[0].shape == (p["d"],)


def test_vec_validation_g_returns_wrong_shape(vie2_callable_vec_diagonal):
    """g(t) returning wrong-sized array must raise."""
    p = vie2_callable_vec_diagonal
    bad_g = lambda t: np.array([t])  # shape (1,) but d=2
    with pytest.raises(ValueError, match=r"shape \(2,\)"):
        function_solve_VIE_2(kernel=p["kernel"], g=bad_g,
                             mesh_breakpoints=np.linspace(0, 1, 11),
                             coll_divs=p["coll_divs"],
                             coll_choices=p["coll_choices"])


def test_vec_validation_kernel_not_square():
    """kernel(u) returning a non-square matrix must raise."""
    bad_K = lambda u: np.array([[1.0, 2.0, 3.0]])  # shape (1, 3)
    with pytest.raises(ValueError, match="scalar or square"):
        function_solve_VIE_2(kernel=bad_K, mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_divs=2, coll_choices=[0, 1, 2])


# ---------------------------------------------------------------------------
# VIDE (Volterra integro-differential equation)
# ---------------------------------------------------------------------------

def test_vide_pure_ode_matches_exact(vide_callable_ode):
    """K=0 reduces VIDE to an ODE; compare to the closed-form solution."""
    p = vide_callable_ode
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=p["g"],
        soln_init_value=p["soln_init_value"],
        mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-6


def test_vide_smooth_matches_exact(vide_callable_smooth):
    p = vide_callable_smooth
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=p["g"],
        soln_init_value=p["soln_init_value"],
        mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-6


@pytest.mark.parametrize("M_target", [10, 20, 40])
def test_vide_convergence_rate(vide_callable_smooth, M_target):
    """Halving h reduces error by >= 8 (order-4 method, generous lower bound)."""
    p = vide_callable_smooth

    def err_at(M):
        mesh = np.linspace(0, 1, M + 1)
        y = function_solve_VIDE(
            kernel=p["kernel"], a=p["a"], g=p["g"],
            soln_init_value=p["soln_init_value"],
            mesh_breakpoints=mesh,
            coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
        return _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])

    assert err_at(M_target) / err_at(M_target * 2) > 8.0


def test_vide_a_none_treated_as_zero(vide_callable_smooth):
    """a=None: with K=exp(-u), g chosen, exact y=sin(t) -- but a contribution removed.

    Constructing from scratch is fiddly; just verify that a=None gives a
    different (still finite) result than a=callable.
    """
    p = vide_callable_smooth
    mesh = np.linspace(0, 1, 11)
    y_with_a = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=p["g"],
        soln_init_value=p["soln_init_value"],
        mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    y_without_a = function_solve_VIDE(
        kernel=p["kernel"], g=p["g"],
        soln_init_value=p["soln_init_value"],
        mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    assert np.all(np.isfinite(y_without_a))
    # Results should differ (a contributes a non-zero term)
    assert np.max(np.abs(y_with_a - y_without_a)) > 1e-4


def test_vide_g_none_treated_as_zero():
    """g=None with K=0, a=0: y'(t) = 0, so y(t) = y_0 constant."""
    mesh = np.linspace(0, 1, 11)
    y = function_solve_VIDE(
        kernel=lambda u: 0.0, soln_init_value=3.0,
        mesh_breakpoints=mesh, coll_divs=2, coll_choices=[0, 1, 2])
    assert np.allclose(y, 3.0, atol=1e-12)


def test_vide_non_uniform_mesh(vide_callable_smooth):
    p = vide_callable_smooth
    mesh = np.linspace(0, 1, 21) ** 1.5
    y = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=p["g"],
        soln_init_value=p["soln_init_value"],
        mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-5


def test_vide_callable_solution_wrapper(vide_callable_smooth):
    p = vide_callable_smooth
    mesh = np.linspace(0, 1, 21)
    y_arr, y_func = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=p["g"],
        soln_init_value=p["soln_init_value"],
        mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        return_function=True)
    assert isinstance(y_func(0.37), float)
    assert abs(y_func(0.37) - p["y_exact"](0.37)) < 1e-5
    ts = np.array([0.1, 0.5, 0.9])
    vals = y_func(ts)
    assert vals.shape == ts.shape
    assert np.max(np.abs(vals - p["y_exact"](ts))) < 1e-5
    # Initial condition should be honored exactly via y_boundary[0].
    assert abs(y_func(0.0) - p["soln_init_value"]) < 1e-12


def test_vide_vec_diagonal_matches_scalar(vide_callable_smooth, vide_callable_vec_diagonal):
    """Diagonal d=2 vector VIDE matches two independent scalar solves."""
    sp = vide_callable_smooth
    vp = vide_callable_vec_diagonal
    mesh = np.linspace(0, 1, 21)
    y_scalar = function_solve_VIDE(
        kernel=sp["kernel"], a=sp["a"], g=sp["g"],
        soln_init_value=sp["soln_init_value"],
        mesh_breakpoints=mesh,
        coll_divs=sp["coll_divs"], coll_choices=sp["coll_choices"])
    y_vec = function_solve_VIDE(
        kernel=vp["kernel"], a=vp["a"], g=vp["g"],
        soln_init_value=vp["soln_init_value"],
        mesh_breakpoints=mesh,
        coll_divs=vp["coll_divs"], coll_choices=vp["coll_choices"])
    assert y_vec.shape == (len(mesh) - 1, len(sp["coll_choices"]), vp["d"])
    assert np.allclose(y_vec[..., 0], y_scalar, atol=1e-12)
    assert np.allclose(y_vec[..., 1], y_scalar, atol=1e-12)


def test_vide_vec_matches_exact(vide_callable_vec_diagonal):
    p = vide_callable_vec_diagonal
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=p["g"],
        soln_init_value=p["soln_init_value"],
        mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-6


def test_vide_vec_callable_wrapper(vide_callable_vec_diagonal):
    p = vide_callable_vec_diagonal
    mesh = np.linspace(0, 1, 21)
    _, y_func = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=p["g"],
        soln_init_value=p["soln_init_value"],
        mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        return_function=True)
    val = y_func(0.37)
    assert val.shape == (p["d"],)
    assert np.max(np.abs(val - p["y_exact"](0.37))) < 1e-5


def test_vide_validation_soln_init_required():
    """soln_init_value is required (no default)."""
    with pytest.raises(TypeError):
        function_solve_VIDE(kernel=lambda u: 0.0,
                            mesh_breakpoints=np.linspace(0, 1, 5),
                            coll_divs=2, coll_choices=[0, 1, 2])


def test_vide_vec_validation_init_wrong_shape(vide_callable_vec_diagonal):
    p = vide_callable_vec_diagonal
    with pytest.raises(ValueError, match=r"shape \(2,\)"):
        function_solve_VIDE(
            kernel=p["kernel"], a=p["a"], g=p["g"],
            soln_init_value=np.zeros(3),  # wrong size: d=2 but pass length-3
            mesh_breakpoints=np.linspace(0, 1, 11),
            coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])


# ---------------------------------------------------------------------------
# VIE-1 (Volterra integral equation of the first kind)
# ---------------------------------------------------------------------------

def test_vie1_smooth_matches_exact(vie1_callable_smooth):
    p = vie1_callable_smooth
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_1(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-5


def test_vie1_polynomial_exact(vie1_callable_poly):
    """K(s)=2+s, exact y=t (degree-1 polynomial). Collocation captures it exactly."""
    p = vie1_callable_poly
    mesh = np.linspace(0, 1, 11)
    y = function_solve_VIE_1(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-10


@pytest.mark.parametrize("M_target", [10, 20, 40])
def test_vie1_convergence_rate(vie1_callable_smooth, M_target):
    """Halving h reduces error by >= 4 for coll_choices=[1,2,3] (order 3+)."""
    p = vie1_callable_smooth

    def err_at(M):
        mesh = np.linspace(0, 1, M + 1)
        y = function_solve_VIE_1(
            kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
            coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
        return _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])

    assert err_at(M_target) / err_at(M_target * 2) > 4.0


def test_vie1_g_none_treated_as_zero():
    """g=None: trivial solution y=0."""
    mesh = np.linspace(0, 1, 11)
    y = function_solve_VIE_1(kernel=lambda u: np.exp(u), mesh_breakpoints=mesh,
                             coll_divs=3, coll_choices=[1, 2, 3])
    assert np.allclose(y, 0.0, atol=1e-12)


def test_vie1_non_uniform_mesh(vie1_callable_smooth):
    p = vie1_callable_smooth
    mesh = np.linspace(0, 1, 21) ** 1.5
    y = function_solve_VIE_1(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-4


def test_vie1_callable_solution_wrapper(vie1_callable_smooth):
    p = vie1_callable_smooth
    mesh = np.linspace(0, 1, 21)
    _, y_func = function_solve_VIE_1(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        return_function=True)
    assert isinstance(y_func(0.37), float)
    assert abs(y_func(0.37) - p["y_exact"](0.37)) < 1e-4


def test_vie1_force_continuous_matches_exact(vie1_callable_smooth):
    """force_continuous=True still converges; slightly less accurate than default."""
    p = vie1_callable_smooth
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_1(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        soln_init_value=p["y_exact"](0.0), force_continuous=True,
        show_warnings=False)
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-4


def test_vie1_force_continuous_callable(vie1_callable_smooth):
    """With force_continuous=True the polynomial y(t=0+) should equal soln_init."""
    p = vie1_callable_smooth
    mesh = np.linspace(0, 1, 21)
    _, y_func = function_solve_VIE_1(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        soln_init_value=p["y_exact"](0.0), force_continuous=True,
        return_function=True, show_warnings=False)
    assert abs(y_func(0.0) - p["y_exact"](0.0)) < 1e-12


def test_vie1_vec_diagonal_matches_scalar(vie1_callable_smooth, vie1_callable_vec_diagonal):
    sp = vie1_callable_smooth
    vp = vie1_callable_vec_diagonal
    mesh = np.linspace(0, 1, 21)
    y_scalar = function_solve_VIE_1(
        kernel=sp["kernel"], g=sp["g"], mesh_breakpoints=mesh,
        coll_divs=sp["coll_divs"], coll_choices=sp["coll_choices"])
    y_vec = function_solve_VIE_1(
        kernel=vp["kernel"], g=vp["g"], mesh_breakpoints=mesh,
        coll_divs=vp["coll_divs"], coll_choices=vp["coll_choices"])
    assert y_vec.shape == (len(mesh) - 1, len(sp["coll_choices"]), vp["d"])
    assert np.allclose(y_vec[..., 0], y_scalar, atol=1e-12)
    assert np.allclose(y_vec[..., 1], y_scalar, atol=1e-12)


def test_vie1_vec_matches_exact(vie1_callable_vec_diagonal):
    p = vie1_callable_vec_diagonal
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_1(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-5


def test_vie1_vec_force_continuous(vie1_callable_vec_diagonal):
    p = vie1_callable_vec_diagonal
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_1(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        soln_init_value=p["y_exact"](0.0), force_continuous=True,
        show_warnings=False)
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-4


def test_vie1_validation_zero_in_coll_choices():
    """Zero is invalid for VIE-1 (both sides of equation vanish at t=0)."""
    with pytest.raises(ValueError, match="zero"):
        function_solve_VIE_1(kernel=lambda u: 1.0, g=lambda t: t,
                             mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_divs=2, coll_choices=[0, 1])


def test_vie1_validation_nonconvergent_setting():
    """Empirically-known non-convergent settings are rejected."""
    with pytest.raises(ValueError, match="convergent"):
        function_solve_VIE_1(kernel=lambda u: 1.0, g=lambda t: t,
                             mesh_breakpoints=np.linspace(0, 1, 10),
                             coll_divs=3, coll_choices=[1])


def test_vie1_validation_force_continuous_no_init():
    with pytest.raises(ValueError, match="soln_init_value"):
        function_solve_VIE_1(kernel=lambda u: 1.0, g=lambda t: t,
                             mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_divs=3, coll_choices=[1, 2, 3],
                             force_continuous=True)


def test_vie1_warns_on_unused_soln_init(capsys):
    """soln_init_value passed with force_continuous=False -> warning."""
    function_solve_VIE_1(kernel=lambda u: 1.0, g=lambda t: t,
                         mesh_breakpoints=np.linspace(0, 1, 5),
                         coll_divs=3, coll_choices=[1, 2, 3],
                         soln_init_value=1.0, force_continuous=False,
                         show_warnings=True)
    assert "no effect" in capsys.readouterr().out.lower()


def test_vie1_silent_when_show_warnings_false(capsys):
    function_solve_VIE_1(kernel=lambda u: 1.0, g=lambda t: t,
                         mesh_breakpoints=np.linspace(0, 1, 5),
                         coll_divs=3, coll_choices=[1, 2, 3],
                         soln_init_value=1.0, force_continuous=False,
                         show_warnings=False)
    assert capsys.readouterr().out == ""


# ---------------------------------------------------------------------------
# optimal_graded_mesh helper
# ---------------------------------------------------------------------------

def test_graded_mesh_basic_properties():
    mesh = optimal_graded_mesh(alpha=0.5, T=1.0, M=20, coll_choices=[0, 1, 2])
    assert mesh.shape == (21,)
    assert mesh[0] == 0.0
    assert mesh[-1] == pytest.approx(1.0)
    assert np.all(np.diff(mesh) > 0)  # strictly increasing


def test_graded_mesh_grading_increases_with_alpha():
    """Higher alpha -> stronger grading (larger ratio of last/first interval)."""
    M = 20
    cc = [0, 1, 2]
    def ratio(alpha):
        mesh = optimal_graded_mesh(alpha=alpha, T=1.0, M=M, coll_choices=cc)
        widths = np.diff(mesh)
        return widths[-1] / widths[0]
    assert ratio(0.0) < ratio(0.3) < ratio(0.5) < ratio(0.7)


def test_graded_mesh_alpha_zero_is_uniform():
    """alpha=0 -> r=p, but the asymptotic uniformity holds only when p=1.
    Still, increasing M makes the result approach a smooth power-law mesh."""
    mesh = optimal_graded_mesh(alpha=0.0, T=1.0, M=10, coll_choices=[1])
    # r = 1 means t_n = T*(n/M), i.e. uniform.
    expected = np.linspace(0.0, 1.0, 11)
    assert np.allclose(mesh, expected)


def test_graded_mesh_validation():
    with pytest.raises(ValueError, match="alpha"):
        optimal_graded_mesh(alpha=1.0, T=1.0, M=10, coll_choices=[1, 2])
    with pytest.raises(ValueError, match="alpha"):
        optimal_graded_mesh(alpha=-0.1, T=1.0, M=10, coll_choices=[1, 2])
    with pytest.raises(ValueError, match="T"):
        optimal_graded_mesh(alpha=0.5, T=-1.0, M=10, coll_choices=[1, 2])
    with pytest.raises(ValueError, match="M"):
        optimal_graded_mesh(alpha=0.5, T=1.0, M=0, coll_choices=[1, 2])
    with pytest.raises(ValueError, match="coll_choices"):
        optimal_graded_mesh(alpha=0.5, T=1.0, M=10, coll_choices=[])


def test_graded_mesh_recovers_high_order_on_abel(vie2_callable_abel):
    """optimal_graded_mesh should beat a uniform mesh by orders of magnitude."""
    p = vie2_callable_abel
    M = 30
    common = dict(kernel=p["kernel"], g=p["g"],
                  coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
                  kernel_singularity=p["kernel_singularity"],
                  show_warnings=False)
    uniform = np.linspace(0, 1, M + 1)
    graded = optimal_graded_mesh(alpha=0.5, T=1.0, M=M, coll_choices=p["coll_choices"])
    y_uniform = function_solve_VIE_2(mesh_breakpoints=uniform, **common)
    y_graded = function_solve_VIE_2(mesh_breakpoints=graded, **common)
    err_u = _collect_node_values(y_uniform, uniform, p["coll_divs"], p["coll_choices"], p["y_exact"])
    err_g = _collect_node_values(y_graded, graded, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err_g < err_u / 100


# ---------------------------------------------------------------------------
# Foot-gun warning: kernel_singularity declared but mesh appears uniform.
# ---------------------------------------------------------------------------

def test_uniform_mesh_with_singularity_warns(capsys, vie2_callable_abel):
    p = vie2_callable_abel
    function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"],
        mesh_breakpoints=np.linspace(0, 1, 21),
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        kernel_singularity=p["kernel_singularity"], show_warnings=True)
    assert "optimal_graded_mesh" in capsys.readouterr().out


def test_graded_mesh_with_singularity_silent(capsys, vie2_callable_abel):
    p = vie2_callable_abel
    mesh = optimal_graded_mesh(alpha=0.5, T=1.0, M=20, coll_choices=p["coll_choices"])
    function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        kernel_singularity=p["kernel_singularity"], show_warnings=True)
    out = capsys.readouterr().out
    assert "optimal_graded_mesh" not in out


def test_smooth_kernel_uniform_mesh_does_not_warn(capsys, vie2_callable_smooth):
    """The warning should fire ONLY when a singularity is declared."""
    p = vie2_callable_smooth
    function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"],
        mesh_breakpoints=np.linspace(0, 1, 21),
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        show_warnings=True)
    assert capsys.readouterr().out == ""


def test_singularity_warning_silenced_by_show_warnings_false(capsys, vie2_callable_abel):
    p = vie2_callable_abel
    function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"],
        mesh_breakpoints=np.linspace(0, 1, 21),
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        kernel_singularity=p["kernel_singularity"], show_warnings=False)
    assert capsys.readouterr().out == ""


# ---------------------------------------------------------------------------
# Singular-kernel path for VIE-1 and VIDE (we only had VIE-2 coverage before).
# ---------------------------------------------------------------------------

def test_vie1_singular_kernel_graded_mesh(vie1_callable_abel):
    """Abel VIE-1 with graded mesh should recover much better than uniform."""
    p = vie1_callable_abel
    M = 30
    common = dict(kernel=p["kernel"], g=p["g"],
                  coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
                  kernel_singularity=p["kernel_singularity"],
                  show_warnings=False)
    uniform = np.linspace(0, 1, M + 1)
    graded = optimal_graded_mesh(alpha=p["alpha"], T=1.0, M=M,
                                 coll_choices=p["coll_choices"])
    y_uniform = function_solve_VIE_1(mesh_breakpoints=uniform, **common)
    y_graded = function_solve_VIE_1(mesh_breakpoints=graded, **common)
    err_u = _collect_node_values(y_uniform, uniform, p["coll_divs"],
                                 p["coll_choices"], p["y_exact"])
    err_g = _collect_node_values(y_graded, graded, p["coll_divs"],
                                 p["coll_choices"], p["y_exact"])
    assert err_g < err_u / 10  # at least 10x better


def test_vide_singular_kernel_graded_mesh(vide_callable_abel):
    """Abel VIDE with graded mesh should match exact solution well."""
    p = vide_callable_abel
    M = 40
    graded = optimal_graded_mesh(alpha=p["alpha"], T=1.0, M=M,
                                 coll_choices=p["coll_choices"])
    y = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=p["g"],
        soln_init_value=p["soln_init_value"],
        mesh_breakpoints=graded,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        kernel_singularity=p["kernel_singularity"], show_warnings=False)
    err = _collect_node_values(y, graded, p["coll_divs"],
                               p["coll_choices"], p["y_exact"])
    assert err < 1e-3


def test_vie1_singular_undeclared_raises():
    """VIE-1 with K=1/u (non-integrable) and no singularity declared -> error."""
    K_bad = lambda u: 1.0 / u if u > 0 else float("inf")
    with pytest.warns(), pytest.raises(ValueError, match="non-finite"):
        function_solve_VIE_1(kernel=K_bad, g=lambda t: t,
                             mesh_breakpoints=np.linspace(0, 1, 11),
                             coll_divs=3, coll_choices=[1, 2, 3])


def test_vide_singular_undeclared_raises():
    """VIDE with K=1/u and no singularity declared -> error."""
    K_bad = lambda u: 1.0 / u if u > 0 else float("inf")
    with pytest.warns(), pytest.raises(ValueError, match="non-finite"):
        function_solve_VIDE(kernel=K_bad, g=lambda t: t, soln_init_value=0.0,
                            mesh_breakpoints=np.linspace(0, 1, 11),
                            coll_divs=2, coll_choices=[0, 1, 2])


# ---------------------------------------------------------------------------
# Formal Abel convergence test: with the optimal graded mesh, the error
# should decrease by at least 4x when M is doubled (giving roughly the
# polynomial-order rate recovered by the grading).
# ---------------------------------------------------------------------------

def test_abel_convergence_with_graded_mesh(vie2_callable_abel):
    p = vie2_callable_abel
    def err_at(M):
        mesh = optimal_graded_mesh(alpha=p["alpha"], T=1.0, M=M,
                                   coll_choices=p["coll_choices"])
        y = function_solve_VIE_2(
            kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
            coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
            kernel_singularity=p["kernel_singularity"], show_warnings=False)
        return _collect_node_values(y, mesh, p["coll_divs"],
                                    p["coll_choices"], p["y_exact"])

    e_coarse = err_at(20)
    e_fine = err_at(40)
    # With optimal grading the recovered rate is the method order p=3
    # (~ factor 8 per halving), but real-world performance varies; require >=4.
    assert e_coarse / e_fine > 4.0


# ---------------------------------------------------------------------------
# Package-level exports (smoke test that import-path works for users).
# ---------------------------------------------------------------------------

def test_package_level_exports():
    import volterra_equation_solvers as ves
    assert ves.function_solve_VIE_1 is function_solve_VIE_1
    assert ves.function_solve_VIE_2 is function_solve_VIE_2
    assert ves.function_solve_VIDE is function_solve_VIDE
    assert ves.optimal_graded_mesh is optimal_graded_mesh
