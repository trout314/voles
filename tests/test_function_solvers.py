"""Tests for the callable-input function_solve_* solvers.

Currently exercises only the scalar VIE-2 prototype (`function_solve_VIE_2`).
The per-step linear solve is currently a Python scaffold that will be ported
to D in a follow-up commit. These tests pin the math and the API; they should
continue to pass after the D port.
"""

import numpy as np
import pytest

from voles._callable_solvers import (
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


@pytest.mark.parametrize("solver_call", [
    lambda: function_solve_VIE_2(kernel=lambda u: np.exp(-u),
                                 g=lambda t: t,
                                 mesh_breakpoints=np.linspace(0, 1, 5),
                                 coll_divs=2, coll_choices=[0, 1, 2]),
    lambda: function_solve_VIE_1(kernel=lambda u: np.exp(u),
                                 g=lambda t: t,
                                 mesh_breakpoints=np.linspace(0, 1, 5),
                                 coll_divs=3, coll_choices=[1, 2, 3]),
    lambda: function_solve_VIDE(kernel=lambda u: 0.0,
                                g=lambda t: t, soln_init_value=0.0,
                                mesh_breakpoints=np.linspace(0, 1, 5),
                                coll_divs=2, coll_choices=[0, 1, 2]),
])
def test_return_function_default_is_false(solver_call):
    """Without `return_function=True`, the solvers return just the array, not a tuple."""
    result = solver_call()
    assert isinstance(result, np.ndarray)
    assert not isinstance(result, tuple)


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


@pytest.mark.parametrize("solver_kwargs_fn", [
    lambda mesh: dict(solver=function_solve_VIE_2, kw=dict(
        kernel=lambda u: np.exp(-u),
        g=lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t)),
        mesh_breakpoints=mesh, coll_divs=2, coll_choices=[0, 1, 2])),
    lambda mesh: dict(solver=function_solve_VIE_1, kw=dict(
        kernel=lambda u: np.exp(u), g=np.sin,
        mesh_breakpoints=mesh, coll_divs=3, coll_choices=[1, 2, 3])),
    lambda mesh: dict(solver=function_solve_VIDE, kw=dict(
        kernel=lambda u: np.exp(-u), g=lambda t: t, soln_init_value=0.0,
        mesh_breakpoints=mesh, coll_divs=2, coll_choices=[0, 1, 2])),
])
def test_mesh_breakpoints_accepts_plain_list(solver_kwargs_fn):
    """Solvers accept mesh_breakpoints as a Python list (np.asarray promotion)."""
    mesh_list = [0.0, 0.25, 0.5, 0.75, 1.0]
    bundle = solver_kwargs_fn(mesh_list)
    y_list = bundle["solver"](**bundle["kw"])
    bundle_arr = solver_kwargs_fn(np.asarray(mesh_list))
    y_arr = bundle_arr["solver"](**bundle_arr["kw"])
    assert np.allclose(y_list, y_arr, atol=1e-14)


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
    """g is sampled at the expected collocation points.

    (Extra calls for complex-input detection are an implementation detail; the
    test verifies that each expected point appears, allowing repeats.)
    """
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
    expected = [0.0, 0.25, 0.5, 0.75, 1.0]
    for t in expected:
        assert any(abs(c - t) < 1e-12 for c in calls), \
            f"g was not called at expected collocation point t={t}; calls were {calls}"


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
        "voles._callable_solvers._import_scipy_quad",
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


def test_vec_validation_kernel_returns_1d():
    """User returns shape (d,) thinking they meant 'd-component kernel'. Reject."""
    bad_K = lambda u: np.array([np.exp(-u), np.exp(-2 * u)])  # shape (2,)
    with pytest.raises(ValueError, match="scalar or square"):
        function_solve_VIE_2(kernel=bad_K,
                             mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_divs=2, coll_choices=[0, 1, 2])


# ---------------------------------------------------------------------------
# Complex-input dispatch: VIE-1/-2/VIDE accept complex kernels, g, etc.
# Routed through a real block-decomposed problem of doubled dimension.
# ---------------------------------------------------------------------------

def test_vie2_complex_scalar_matches_exact():
    """K(u)=i, g(t)=1 -> y(t) = exp(i*t) (closed-form check)."""
    K = lambda u: 1j
    g = lambda t: 1.0
    mesh = np.linspace(0, 2.0, 41)
    y = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                             coll_divs=2, coll_choices=[0, 1, 2])
    assert y.dtype == np.complex128
    err = _collect_node_values(y, mesh, 2, [0, 1, 2], lambda t: np.exp(1j * t))
    assert err < 1e-6


def test_vie2_complex_return_function():
    """Complex return_function wrapper evaluates correctly."""
    K = lambda u: 1j
    g = lambda t: 1.0
    mesh = np.linspace(0, 2.0, 41)
    y_arr, y_func = function_solve_VIE_2(
        kernel=K, g=g, mesh_breakpoints=mesh,
        coll_divs=2, coll_choices=[0, 1, 2], return_function=True)
    val = y_func(0.5)
    assert isinstance(val, complex)
    assert abs(val - np.exp(1j * 0.5)) < 1e-6
    ts = np.array([0.1, 0.5, 1.0])
    vals = y_func(ts)
    assert vals.dtype == np.complex128
    assert np.max(np.abs(vals - np.exp(1j * ts))) < 1e-6


def test_vie2_complex_vector_diagonal():
    """Diagonal d=2 complex kernel reduces to two independent scalar problems."""
    K = lambda u: 1j * np.eye(2)
    g = lambda t: np.array([1.0, 1.0])
    mesh = np.linspace(0, 2.0, 41)
    y = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                             coll_divs=2, coll_choices=[0, 1, 2])
    assert y.dtype == np.complex128
    assert y.shape == (40, 3, 2)
    err = _collect_node_values(
        y, mesh, 2, [0, 1, 2],
        lambda t: np.array([np.exp(1j * t), np.exp(1j * t)]))
    assert err < 1e-6


def test_vide_complex_matches_exact():
    """y'(t) = i*y(t), y(0) = 1 -> y(t) = exp(i*t)."""
    K = lambda u: 0.0
    a = lambda t: 1j
    g = lambda t: 0.0
    mesh = np.linspace(0, 2.0, 41)
    y = function_solve_VIDE(kernel=K, a=a, g=g, soln_init_value=1.0 + 0j,
                            mesh_breakpoints=mesh,
                            coll_divs=2, coll_choices=[0, 1, 2])
    assert y.dtype == np.complex128
    err = _collect_node_values(y, mesh, 2, [0, 1, 2], lambda t: np.exp(1j * t))
    assert err < 1e-6


def test_vie1_complex_matches_exact():
    """K(u)=1 (complex 1+0j), g(t)=-i*(e^{it}-1) -> y(t) = e^{it}."""
    K = lambda u: 1.0 + 0j
    g = lambda t: -1j * (np.exp(1j * t) - 1.0)
    mesh = np.linspace(0, 2.0, 41)
    y = function_solve_VIE_1(kernel=K, g=g, mesh_breakpoints=mesh,
                             coll_divs=3, coll_choices=[1, 2, 3])
    assert y.dtype == np.complex128
    err = _collect_node_values(y, mesh, 3, [1, 2, 3], lambda t: np.exp(1j * t))
    assert err < 1e-4


def test_complex_detection_catches_late_complex_returns():
    """Kernel returns real near 0 but complex at later u: multi-point sampling
    should still detect this and route through the complex dispatch."""
    def K(u):
        if u >= 1.5:
            return 0.5 + 0.1j
        return 0.5
    g = lambda t: 1.0 + 0j  # explicitly complex so the result is unambiguously complex
    mesh = np.linspace(0, 2.0, 41)
    y = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                             coll_divs=2, coll_choices=[0, 1, 2])
    assert y.dtype == np.complex128


def test_complex_detection_via_init_only(vie2_callable_smooth):
    """Real kernel + real g but complex soln_init_value (VIDE) -> complex path."""
    p = vie2_callable_smooth
    mesh = np.linspace(0, 1, 21)
    # Trivial VIDE with K=0, a=0, g=0, y_0 = 1+i -> y(t) = 1+i constant
    y = function_solve_VIDE(
        kernel=lambda u: 0.0, soln_init_value=1.0 + 1j,
        mesh_breakpoints=mesh, coll_divs=2, coll_choices=[0, 1, 2])
    assert y.dtype == np.complex128
    assert np.allclose(y, 1.0 + 1j, atol=1e-12)


def test_complex_late_detection_raises_clear_error(monkeypatch):
    """Sampling-based complex detection can miss kernels whose complex range
    sits between the 5 sample points. When that happens, the ComplexWarning
    escalation should catch the lossy cast and raise a clean ValueError --
    not silently produce a real-valued wrong answer.
    """
    import voles._callable_solvers as cs
    # Force sampling to say "no complex detected" -- simulates a kernel whose
    # complex range escaped the 5 sample points.
    monkeypatch.setattr(cs, "_samples_indicate_complex",
                        lambda *args, **kwargs: False)

    K = lambda u: 1.0 + 0.001j  # complex but small imag; sampler claims it isn't
    g = lambda t: 1.0
    mesh = np.linspace(0, 2.0, 41)
    with pytest.raises(ValueError, match="multi-point sampling"):
        function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                             coll_divs=2, coll_choices=[0, 1, 2])


def test_complex_late_detection_raises_for_vie1(monkeypatch):
    import voles._callable_solvers as cs
    monkeypatch.setattr(cs, "_samples_indicate_complex",
                        lambda *args, **kwargs: False)
    K = lambda u: 1.0 + 0.001j
    g = lambda t: 1.0
    with pytest.raises(ValueError, match="multi-point sampling"):
        function_solve_VIE_1(kernel=K, g=g, mesh_breakpoints=np.linspace(0, 2, 21),
                             coll_divs=3, coll_choices=[1, 2, 3])


def test_complex_late_detection_raises_for_vide(monkeypatch):
    import voles._callable_solvers as cs
    monkeypatch.setattr(cs, "_samples_indicate_complex",
                        lambda *args, **kwargs: False)
    K = lambda u: 1.0 + 0.001j
    g = lambda t: 1.0
    with pytest.raises(ValueError, match="multi-point sampling"):
        function_solve_VIDE(kernel=K, g=g, soln_init_value=0.0,
                            mesh_breakpoints=np.linspace(0, 2, 21),
                            coll_divs=2, coll_choices=[0, 1, 2])


@pytest.mark.parametrize("M_target", [10, 20])
def test_complex_convergence_rate(M_target):
    """Complex path inherits the convergence order of the underlying real path
    (factor-of-8+ error reduction per halving of h for coll_choices=[0,1,2])."""
    K = lambda u: 1j
    g = lambda t: 1.0
    y_exact = lambda t: np.exp(1j * t)

    def err_at(M):
        mesh = np.linspace(0, 2.0, M + 1)
        y = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                                 coll_divs=2, coll_choices=[0, 1, 2])
        return _collect_node_values(y, mesh, 2, [0, 1, 2], y_exact)

    assert err_at(M_target) / err_at(M_target * 2) > 8.0


def test_complex_vector_coupled_non_diagonal():
    """2x2 non-diagonal complex K constructed by similarity transform.

    P = [[1, 1], [1, -1]] sends a diagonal system with K_diag = diag(i, 2i),
    g_diag = [1, 1], y_diag = [exp(it), exp(2it)] to a coupled system with
        K_tilde = P K_diag P^{-1} = [[3i/2, -i/2], [-i/2, 3i/2]]
        g_tilde = P g_diag         = [2, 0]
        y_tilde = P y_diag         = [exp(it)+exp(2it), exp(it)-exp(2it)]
    Each y_diag component satisfies y_diag(t) = 1 + integral_0^t i (or 2i) y(s) ds,
    so the coupled system off-diagonal coupling exercises the block code path.
    """
    K_mat = np.array([[1.5j, -0.5j], [-0.5j, 1.5j]])
    K = lambda u: K_mat
    g = lambda t: np.array([2.0, 0.0])

    def y_exact(t):
        return np.array([np.exp(1j * t) + np.exp(2j * t),
                         np.exp(1j * t) - np.exp(2j * t)])

    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                             coll_divs=2, coll_choices=[0, 1, 2])
    assert y.dtype == np.complex128
    assert y.shape == (20, 3, 2)
    err = _collect_node_values(y, mesh, 2, [0, 1, 2], y_exact)
    assert err < 1e-6


def test_vie1_complex_force_continuous():
    """VIE-1 with complex inputs + force_continuous=True pins y(0+) to the
    complex soln_init_value via the continuity constraint."""
    K = lambda u: 1.0 + 0j
    g = lambda t: -1j * (np.exp(1j * t) - 1.0)  # gives exact y(t) = exp(it)
    mesh = np.linspace(0, 2.0, 41)
    y_arr, y_func = function_solve_VIE_1(
        kernel=K, g=g, mesh_breakpoints=mesh,
        coll_divs=3, coll_choices=[1, 2, 3],
        soln_init_value=1.0 + 0j,  # y(0) = exp(0) = 1
        force_continuous=True, show_warnings=False,
        return_function=True)
    assert y_arr.dtype == np.complex128
    # Continuity constraint pins y(0+) to soln_init_value
    assert abs(y_func(0.0) - (1.0 + 0j)) < 1e-12
    # And the full solution matches the closed form
    err = _collect_node_values(y_arr, mesh, 3, [1, 2, 3], lambda t: np.exp(1j * t))
    assert err < 1e-4


def test_complex_real_matches_real_path(vie2_callable_smooth):
    """A complex kernel with zero imaginary part should give the same result
    as the corresponding real kernel (up to the small numerical noise of going
    through the doubled real system)."""
    p = vie2_callable_smooth
    mesh = np.linspace(0, 1, 21)
    K_complex = lambda u: complex(p["kernel"](u))  # promote to complex
    g_complex = lambda t: complex(p["g"](t))
    y_complex = function_solve_VIE_2(
        kernel=K_complex, g=g_complex, mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    y_real = function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    assert y_complex.dtype == np.complex128
    assert np.allclose(y_complex.real, y_real, atol=1e-10)
    assert np.allclose(y_complex.imag, 0.0, atol=1e-10)


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


def test_vide_vec_validation_a_wrong_shape(vide_callable_vec_diagonal):
    """a(t) must return a (d, d) matrix for vector VIDE."""
    p = vide_callable_vec_diagonal
    bad_a = lambda t: np.array([1.0, 2.0])  # shape (2,) but should be (2, 2)
    with pytest.raises(ValueError, match=r"shape \(2, 2\)"):
        function_solve_VIDE(
            kernel=p["kernel"], a=bad_a, g=p["g"],
            soln_init_value=p["soln_init_value"],
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
    mesh = optimal_graded_mesh(alpha=0.5, T=1.0, M=20, order=3)
    assert mesh.shape == (21,)
    assert mesh[0] == 0.0
    assert mesh[-1] == pytest.approx(1.0)
    assert np.all(np.diff(mesh) > 0)  # strictly increasing


def test_graded_mesh_grading_increases_with_alpha():
    """Higher alpha -> stronger grading (larger ratio of last/first interval)."""
    M = 20
    order = 3
    def ratio(alpha):
        mesh = optimal_graded_mesh(alpha=alpha, T=1.0, M=M, order=order)
        widths = np.diff(mesh)
        return widths[-1] / widths[0]
    assert ratio(0.0) < ratio(0.3) < ratio(0.5) < ratio(0.7)


def test_graded_mesh_alpha_zero_is_uniform():
    """alpha=0 -> uniform mesh (r=1) regardless of order, since the kernel is
    non-singular and the solution smooth."""
    expected = np.linspace(0.0, 1.0, 11)
    for order in (1, 3, 5):
        mesh = optimal_graded_mesh(alpha=0.0, T=1.0, M=10, order=order)
        assert np.allclose(mesh, expected)


def test_graded_mesh_validation():
    with pytest.raises(ValueError, match="alpha"):
        optimal_graded_mesh(alpha=1.0, T=1.0, M=10, order=2)
    with pytest.raises(ValueError, match="alpha"):
        optimal_graded_mesh(alpha=-0.1, T=1.0, M=10, order=2)
    with pytest.raises(ValueError, match="T"):
        optimal_graded_mesh(alpha=0.5, T=-1.0, M=10, order=2)
    with pytest.raises(ValueError, match="M"):
        optimal_graded_mesh(alpha=0.5, T=1.0, M=0, order=2)
    with pytest.raises(ValueError, match="order"):
        optimal_graded_mesh(alpha=0.5, T=1.0, M=10, order=0)


def test_graded_mesh_recovers_high_order_on_abel(vie2_callable_abel):
    """optimal_graded_mesh should beat a uniform mesh by orders of magnitude."""
    p = vie2_callable_abel
    M = 30
    common = dict(kernel=p["kernel"], g=p["g"],
                  coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
                  kernel_singularity=p["kernel_singularity"],
                  show_warnings=False)
    uniform = np.linspace(0, 1, M + 1)
    graded = optimal_graded_mesh(alpha=0.5, T=1.0, M=M, order=len(p["coll_choices"]))
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
    mesh = optimal_graded_mesh(alpha=0.5, T=1.0, M=20, order=len(p["coll_choices"]))
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


def test_uniform_mesh_with_singularity_warns_vie1(capsys, vie1_callable_abel):
    """VIE-1 fires the same foot-gun warning as VIE-2."""
    p = vie1_callable_abel
    function_solve_VIE_1(
        kernel=p["kernel"], g=p["g"],
        mesh_breakpoints=np.linspace(0, 1, 21),
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        kernel_singularity=p["kernel_singularity"], show_warnings=True)
    assert "optimal_graded_mesh" in capsys.readouterr().out


def test_uniform_mesh_with_singularity_warns_vide(capsys, vide_callable_abel):
    """VIDE fires the same foot-gun warning as VIE-2."""
    p = vide_callable_abel
    function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=p["g"],
        soln_init_value=p["soln_init_value"],
        mesh_breakpoints=np.linspace(0, 1, 21),
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        kernel_singularity=p["kernel_singularity"], show_warnings=True)
    assert "optimal_graded_mesh" in capsys.readouterr().out


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
                                 order=len(p["coll_choices"]))
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
                                 order=len(p["coll_choices"]))
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
                                   order=len(p["coll_choices"]))
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
    import voles as ves
    assert ves.function_solve_VIE_1 is function_solve_VIE_1
    assert ves.function_solve_VIE_2 is function_solve_VIE_2
    assert ves.function_solve_VIDE is function_solve_VIDE
    assert ves.optimal_graded_mesh is optimal_graded_mesh


# ---------------------------------------------------------------------------
# Non-uniform mesh stress tests
#
# Push the solvers on meshes with extreme width ratios, very many intervals,
# and worst-case configurations to make sure nothing blows up numerically.
# ---------------------------------------------------------------------------

def test_stress_extreme_width_ratio_vie2(vie2_callable_smooth):
    """Mesh where the largest interval is roughly 1000x the smallest."""
    p = vie2_callable_smooth
    # 10 tiny intervals at the start, then 10 large ones.
    tiny = np.linspace(0.0, 0.001, 11)
    large = np.linspace(0.001, 1.0, 11)[1:]
    mesh = np.concatenate([tiny, large])
    assert (np.diff(mesh).max() / np.diff(mesh).min()) > 500
    y = function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    assert np.all(np.isfinite(y))
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-2  # loose -- large intervals limit overall accuracy


def test_stress_many_intervals_vie2(vie2_callable_smooth):
    """500-interval mesh: setup cost is the main risk, not correctness."""
    p = vie2_callable_smooth
    mesh = np.linspace(0, 1, 501)
    y = function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-10


def test_stress_strong_grading_vie2(vie2_callable_abel):
    """r=10 grading -- extreme clustering near 0 for the Abel kernel."""
    p = vie2_callable_abel
    M = 40
    mesh = np.linspace(0.0, 1.0, M + 1) ** 10
    y = function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        kernel_singularity=p["kernel_singularity"], show_warnings=False)
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-3 and np.all(np.isfinite(y))


def test_stress_vide_extreme_width_ratio(vide_callable_smooth):
    p = vide_callable_smooth
    tiny = np.linspace(0.0, 0.001, 6)
    large = np.linspace(0.001, 1.0, 11)[1:]
    mesh = np.concatenate([tiny, large])
    y = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=p["g"],
        soln_init_value=p["soln_init_value"],
        mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    assert np.all(np.isfinite(y))
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-2


def test_stress_vie1_extreme_width_ratio(vie1_callable_smooth):
    p = vie1_callable_smooth
    tiny = np.linspace(0.0, 0.001, 6)
    large = np.linspace(0.001, 1.0, 11)[1:]
    mesh = np.concatenate([tiny, large])
    y = function_solve_VIE_1(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    assert np.all(np.isfinite(y))
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-2


def test_stress_single_long_interval(vie2_callable_smooth):
    """One huge interval forces all collocation nodes into the same Lagrange
    polynomial of degree p-1; useful to verify the M=1 corner is exercised."""
    p = vie2_callable_smooth
    mesh = np.array([0.0, 5.0])
    y = function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    assert y.shape == (1, len(p["coll_choices"]))
    assert np.all(np.isfinite(y))


def test_stress_t_large_via_mesh():
    """Solve out to t = 50 (50x the typical domain) on a smooth problem."""
    K = lambda u: np.exp(-u)
    # y(t) = sin(t) still satisfies the equation; g is shifted accordingly.
    g = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))
    mesh = np.linspace(0, 50, 501)
    y = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                              coll_divs=2, coll_choices=[0, 1, 2])
    assert np.all(np.isfinite(y))
    # Check accuracy at a few representative points: K decays so error grows slowly.
    node_pos = np.array([0, 1, 2]) / 2.0
    err = 0.0
    for n in range(len(mesh) - 1):
        t_n = mesh[n]; h_n = mesh[n + 1] - t_n
        for i, pos in enumerate(node_pos):
            t = t_n + pos * h_n
            err = max(err, abs(y[n, i] - np.sin(t)))
    assert err < 1e-3


# ---------------------------------------------------------------------------
# Matrix-valued problems: m simultaneous right-hand sides sharing one kernel.
# g returns (d, m), soln_init is (d, m), and the solution is (M, p, d, m).
# The matrix path builds the kernel weight tensor once and fans the columns
# out across the existing vector solver, so the strongest correctness check is
# column-by-column equality with m independent vector solves.
# ---------------------------------------------------------------------------

def _matrix_g(vector_g, shifts):
    """Build a (d, m) forcing callable: column j is vector_g(t) + shifts[:, j]."""
    return lambda t: np.stack([np.asarray(vector_g(t)) + shifts[:, j]
                               for j in range(shifts.shape[1])], axis=1)


def test_matrix_vie2_matches_per_column_vector(vie2_callable_vec_diagonal):
    p = vie2_callable_vec_diagonal
    d = p["d"]
    mesh = np.linspace(0, 1, 21)
    shifts = np.array([[0.0, 0.3, -0.2], [0.0, -0.1, 0.4]])  # (d, m=3)
    g_mat = _matrix_g(p["g"], shifts)

    y_mat = function_solve_VIE_2(
        kernel=p["kernel"], g=g_mat, mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    assert y_mat.shape == (len(mesh) - 1, len(p["coll_choices"]), d, shifts.shape[1])

    for j in range(shifts.shape[1]):
        g_col = lambda t, j=j: np.asarray(p["g"](t)) + shifts[:, j]
        y_col = function_solve_VIE_2(
            kernel=p["kernel"], g=g_col, mesh_breakpoints=mesh,
            coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
        assert np.allclose(y_mat[..., j], y_col, atol=1e-12)


def test_matrix_vie2_single_column_equals_vector(vie2_callable_vec_diagonal):
    """A (d, 1) forcing is the matrix case with m=1; first axis matches vector."""
    p = vie2_callable_vec_diagonal
    mesh = np.linspace(0, 1, 11)
    g_col = lambda t: np.asarray(p["g"](t)).reshape(p["d"], 1)
    y_mat = function_solve_VIE_2(
        kernel=p["kernel"], g=g_col, mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    y_vec = function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    assert y_mat.shape == y_vec.shape + (1,)
    assert np.allclose(y_mat[..., 0], y_vec, atol=1e-12)


def test_matrix_vie2_return_function(vie2_callable_vec_diagonal):
    p = vie2_callable_vec_diagonal
    d = p["d"]
    mesh = np.linspace(0, 1, 21)
    shifts = np.array([[0.0, 0.3], [0.0, -0.1]])  # (d, m=2)
    m = shifts.shape[1]
    g_mat = _matrix_g(p["g"], shifts)

    y_arr, y_func = function_solve_VIE_2(
        kernel=p["kernel"], g=g_mat, mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        return_function=True)

    # Scalar t -> (d, m); array t -> (len(t), d, m)
    val = y_func(0.37)
    assert val.shape == (d, m)
    ts = np.array([0.1, 0.37, 0.9])
    vals = y_func(ts)
    assert vals.shape == (len(ts), d, m)

    # Each column's solution function matches an independent vector solve.
    for j in range(m):
        g_col = lambda t, j=j: np.asarray(p["g"](t)) + shifts[:, j]
        _, f_col = function_solve_VIE_2(
            kernel=p["kernel"], g=g_col, mesh_breakpoints=mesh,
            coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
            return_function=True)
        assert np.allclose(vals[..., j], f_col(ts), atol=1e-10)

    # Polynomials list: M entries, each a (d, m) object array.
    assert len(y_func.polynomials) == len(mesh) - 1
    assert y_func.polynomials[0].shape == (d, m)


def test_matrix_vie2_breakpoint_continuous(vie2_callable_vec_diagonal):
    """VIE-2 piecewise polynomial is continuous across mesh breakpoints."""
    p = vie2_callable_vec_diagonal
    mesh = np.linspace(0, 1, 11)
    shifts = np.array([[0.0, 0.3], [0.1, -0.1]])
    g_mat = _matrix_g(p["g"], shifts)
    _, y_func = function_solve_VIE_2(
        kernel=p["kernel"], g=g_mat, mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        return_function=True)
    for bp in mesh[1:-1]:
        left = y_func(bp - 1e-9)
        right = y_func(bp + 1e-9)
        assert np.allclose(left, right, atol=1e-6)


def test_matrix_vie2_matches_array_solver():
    """Cross-API: callable matrix VIE-2 agrees with the array-based matrix solver."""
    from voles import solve_VIE_2
    A = np.array([[0.0, 0.2], [-0.1, 0.0]])
    d = 2
    coll_divs, coll_choices = 2, [0, 1, 2]
    time_step = 0.02
    N = 20 * coll_divs**2 + 1
    T = (N - 1) * time_step
    times = np.arange(N) * time_step

    def kernel(u):
        u = np.asarray(u)
        if u.ndim == 0:
            return np.exp(-u) * A
        return np.exp(-u)[:, None, None] * A

    def g_mat(t):
        return np.column_stack([np.array([np.sin(t), np.cos(t)]),
                                np.array([t, 1.0 + 0 * t])])

    K_arr = np.stack([kernel(s) for s in times])
    g_arr = np.stack([g_mat(t) for t in times])
    soln_arr = solve_VIE_2(kernel_values=K_arr, g_values=g_arr,
                           time_step=time_step, coll_divs=coll_divs,
                           coll_choices=coll_choices)

    mesh = np.linspace(0, T, 21)
    _, y_func = function_solve_VIE_2(
        kernel=kernel, g=g_mat, mesh_breakpoints=mesh,
        coll_divs=coll_divs, coll_choices=coll_choices, return_function=True)
    assert np.max(np.abs(y_func(times) - soln_arr)) < 1e-3


def test_matrix_vie2_g_wrong_shape_raises(vie2_callable_vec_diagonal):
    """A 2-D g whose first axis != d must raise a clear error."""
    p = vie2_callable_vec_diagonal
    bad_g = lambda t: np.zeros((3, 2))  # first axis 3 != d=2
    with pytest.raises(ValueError, match="first axis must equal"):
        function_solve_VIE_2(kernel=p["kernel"], g=bad_g,
                             mesh_breakpoints=np.linspace(0, 1, 6),
                             coll_divs=p["coll_divs"],
                             coll_choices=p["coll_choices"])


def test_matrix_vide_matches_per_column_vector(vide_callable_vec_diagonal):
    p = vide_callable_vec_diagonal
    d = p["d"]
    mesh = np.linspace(0, 1, 17)
    m = 3
    init = np.array([[0.0, 0.5, -0.3], [0.0, -0.2, 0.4]])  # (d, m)
    shifts = np.array([[0.0, 0.1, -0.1], [0.0, -0.05, 0.2]])
    g_mat = _matrix_g(p["g"], shifts)

    y_mat = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=g_mat, soln_init_value=init,
        mesh_breakpoints=mesh, coll_divs=p["coll_divs"],
        coll_choices=p["coll_choices"])
    assert y_mat.shape == (len(mesh) - 1, len(p["coll_choices"]), d, m)

    for j in range(m):
        g_col = lambda t, j=j: np.asarray(p["g"](t)) + shifts[:, j]
        y_col = function_solve_VIDE(
            kernel=p["kernel"], a=p["a"], g=g_col,
            soln_init_value=init[:, j], mesh_breakpoints=mesh,
            coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
        assert np.allclose(y_mat[..., j], y_col, atol=1e-12)


def test_matrix_vide_return_function(vide_callable_vec_diagonal):
    p = vide_callable_vec_diagonal
    d = p["d"]
    mesh = np.linspace(0, 1, 17)
    m = 2
    init = np.array([[0.0, 0.5], [0.0, -0.2]])
    shifts = np.array([[0.0, 0.1], [0.0, -0.05]])
    g_mat = _matrix_g(p["g"], shifts)

    y_arr, y_func = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=g_mat, soln_init_value=init,
        mesh_breakpoints=mesh, coll_divs=p["coll_divs"],
        coll_choices=p["coll_choices"], return_function=True)
    ts = np.array([0.1, 0.55, 0.95])
    vals = y_func(ts)
    assert vals.shape == (len(ts), d, m)
    assert y_func.polynomials[0].shape == (d, m)
    for j in range(m):
        g_col = lambda t, j=j: np.asarray(p["g"](t)) + shifts[:, j]
        _, f_col = function_solve_VIDE(
            kernel=p["kernel"], a=p["a"], g=g_col, soln_init_value=init[:, j],
            mesh_breakpoints=mesh, coll_divs=p["coll_divs"],
            coll_choices=p["coll_choices"], return_function=True)
        assert np.allclose(vals[..., j], f_col(ts), atol=1e-10)


def test_matrix_vide_init_wrong_shape_raises(vide_callable_vec_diagonal):
    p = vide_callable_vec_diagonal
    bad_init = np.zeros((3, 2))  # first axis 3 != d=2
    g_mat = _matrix_g(p["g"], np.zeros((p["d"], 2)))
    with pytest.raises(ValueError, match="incompatible with kernel dimension"):
        function_solve_VIDE(
            kernel=p["kernel"], a=p["a"], g=g_mat, soln_init_value=bad_init,
            mesh_breakpoints=np.linspace(0, 1, 6), coll_divs=p["coll_divs"],
            coll_choices=p["coll_choices"])


def test_matrix_vie1_matches_per_column_vector(vie1_callable_vec_diagonal):
    p = vie1_callable_vec_diagonal
    d = p["d"]
    mesh = np.linspace(0, 1, 19)
    shifts = np.array([[0.0, 0.2, -0.1], [0.0, -0.15, 0.25]])
    g_mat = _matrix_g(p["g"], shifts)

    y_mat = function_solve_VIE_1(
        kernel=p["kernel"], g=g_mat, mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    assert y_mat.shape == (len(mesh) - 1, len(p["coll_choices"]), d, shifts.shape[1])

    for j in range(shifts.shape[1]):
        g_col = lambda t, j=j: np.asarray(p["g"](t)) + shifts[:, j]
        y_col = function_solve_VIE_1(
            kernel=p["kernel"], g=g_col, mesh_breakpoints=mesh,
            coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
        assert np.allclose(y_mat[..., j], y_col, atol=1e-12)


def test_matrix_vie1_force_continuous(vie1_callable_vec_diagonal):
    p = vie1_callable_vec_diagonal
    d = p["d"]
    mesh = np.linspace(0, 1, 19)
    m = 2
    init = np.array([[1.0, 0.5], [1.0, -0.3]])  # (d, m); y(0)=cos(0)-sin(0)=1
    shifts = np.array([[0.0, 0.2], [0.0, -0.15]])
    g_mat = _matrix_g(p["g"], shifts)

    y_mat = function_solve_VIE_1(
        kernel=p["kernel"], g=g_mat, soln_init_value=init,
        mesh_breakpoints=mesh, coll_divs=p["coll_divs"],
        coll_choices=p["coll_choices"], force_continuous=True)
    for j in range(m):
        g_col = lambda t, j=j: np.asarray(p["g"](t)) + shifts[:, j]
        y_col = function_solve_VIE_1(
            kernel=p["kernel"], g=g_col, soln_init_value=init[:, j],
            mesh_breakpoints=mesh, coll_divs=p["coll_divs"],
            coll_choices=p["coll_choices"], force_continuous=True)
        assert np.allclose(y_mat[..., j], y_col, atol=1e-12)


def test_matrix_vie1_force_continuous_init_wrong_shape(vie1_callable_vec_diagonal):
    p = vie1_callable_vec_diagonal
    g_mat = _matrix_g(p["g"], np.zeros((p["d"], 2)))
    with pytest.raises(ValueError, match=r"shape \(2, 2\)"):
        function_solve_VIE_1(
            kernel=p["kernel"], g=g_mat, soln_init_value=np.zeros(2),  # (d,) not (d,m)
            mesh_breakpoints=np.linspace(0, 1, 10), coll_divs=p["coll_divs"],
            coll_choices=p["coll_choices"], force_continuous=True)


def test_matrix_complex_vie2_matches_per_column():
    """Complex matrix VIE-2 routes through block decomposition correctly."""
    d, m = 2, 2
    rng = np.random.default_rng(7)
    Kmat = (rng.standard_normal((d, d)) + 1j * rng.standard_normal((d, d))) * 0.2

    def kernel(u):
        u = np.asarray(u)
        if u.ndim == 0:
            return np.exp(-0.5 * u) * Kmat
        return np.exp(-0.5 * u)[:, None, None] * Kmat

    def g_col(t, j):
        return np.array([np.sin(t) + 1j * 0.1 * j, np.cos(t) - 1j * 0.2 * j])

    def g_mat(t):
        return np.stack([g_col(t, j) for j in range(m)], axis=1)

    mesh = np.linspace(0, 2, 13)
    ts = np.array([0.3, 1.1, 1.9])
    y_mat, f_mat = function_solve_VIE_2(
        kernel=kernel, g=g_mat, mesh_breakpoints=mesh, return_function=True)
    assert y_mat.dtype == np.complex128
    assert y_mat.shape[2:] == (d, m)
    for j in range(m):
        y_col, f_col = function_solve_VIE_2(
            kernel=kernel, g=(lambda t, j=j: g_col(t, j)),
            mesh_breakpoints=mesh, return_function=True)
        assert np.allclose(y_mat[..., j], y_col, atol=1e-10)
        assert np.allclose(f_mat(ts)[..., j], f_col(ts), atol=1e-10)


def test_matrix_complex_vide_matches_per_column():
    d, m = 2, 2
    rng = np.random.default_rng(11)
    Kmat = (rng.standard_normal((d, d)) + 1j * rng.standard_normal((d, d))) * 0.2

    def kernel(u):
        u = np.asarray(u)
        if u.ndim == 0:
            return np.exp(-0.5 * u) * Kmat
        return np.exp(-0.5 * u)[:, None, None] * Kmat

    a_mat = np.array([[-0.2 + 0.05j, 0.1], [0.0, -0.3 - 0.05j]])
    init = rng.standard_normal((d, m)) + 1j * rng.standard_normal((d, m))

    def g_col(t, j):
        return np.array([np.sin(t) + 1j * 0.1 * j, np.cos(t) - 1j * 0.2 * j])

    def g_mat(t):
        return np.stack([g_col(t, j) for j in range(m)], axis=1)

    mesh = np.linspace(0, 2, 13)
    y_mat = function_solve_VIDE(
        kernel=kernel, a=lambda t: a_mat, g=g_mat, soln_init_value=init,
        mesh_breakpoints=mesh)
    assert y_mat.dtype == np.complex128
    for j in range(m):
        y_col = function_solve_VIDE(
            kernel=kernel, a=lambda t: a_mat, g=(lambda t, j=j: g_col(t, j)),
            soln_init_value=init[:, j], mesh_breakpoints=mesh)
        assert np.allclose(y_mat[..., j], y_col, atol=1e-10)


# ---------------------------------------------------------------------------
# Coupled (non-diagonal) kernels for VIE-1 and VIDE.
# Diagonal kernels decouple the d-dimensional system into independent scalar
# solves; these off-diagonal cases exercise the coupling in the per-step
# (p*d) x (p*d) block solve for the two equation types whose callable vector
# tests otherwise only used diagonal fixtures.
# ---------------------------------------------------------------------------

def test_vie1_vec_coupled_matches_exact(vie1_callable_vec_coupled):
    p = vie1_callable_vec_coupled
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIE_1(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-6


def test_vie1_vec_coupled_non_uniform_mesh(vie1_callable_vec_coupled):
    p = vie1_callable_vec_coupled
    mesh = np.linspace(0, 1, 21) ** 1.5
    y = function_solve_VIE_1(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-5


def test_vide_vec_coupled_matches_exact(vide_callable_vec_coupled):
    p = vide_callable_vec_coupled
    mesh = np.linspace(0, 1, 21)
    y = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=p["g"],
        soln_init_value=p["soln_init_value"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-6


def test_vide_vec_coupled_non_uniform_mesh(vide_callable_vec_coupled):
    p = vide_callable_vec_coupled
    mesh = np.linspace(0, 1, 21) ** 1.5
    y = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=p["g"],
        soln_init_value=p["soln_init_value"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    err = _collect_node_values(y, mesh, p["coll_divs"], p["coll_choices"], p["y_exact"])
    assert err < 1e-5


def test_matrix_vie1_coupled_matches_exact_and_columns(vie1_callable_vec_coupled):
    """Coupled-kernel matrix VIE-1: column 0 (unshifted) hits the analytic
    solution, and every column matches an independent vector solve."""
    p = vie1_callable_vec_coupled
    d = p["d"]
    mesh = np.linspace(0, 1, 21)
    shifts = np.array([[0.0, 0.4, -0.2], [0.0, -0.3, 0.5]])  # column 0 is unshifted
    g_mat = _matrix_g(p["g"], shifts)

    y_mat = function_solve_VIE_1(
        kernel=p["kernel"], g=g_mat, mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
    assert y_mat.shape == (len(mesh) - 1, len(p["coll_choices"]), d, shifts.shape[1])

    # Column 0 reproduces the analytic coupled solution.
    err0 = _collect_node_values(y_mat[..., 0], mesh, p["coll_divs"],
                                p["coll_choices"], p["y_exact"])
    assert err0 < 1e-6

    for j in range(shifts.shape[1]):
        g_col = lambda t, j=j: np.asarray(p["g"](t)) + shifts[:, j]
        y_col = function_solve_VIE_1(
            kernel=p["kernel"], g=g_col, mesh_breakpoints=mesh,
            coll_divs=p["coll_divs"], coll_choices=p["coll_choices"])
        assert np.allclose(y_mat[..., j], y_col, atol=1e-12)


def test_matrix_vide_coupled_matches_exact_and_columns(vide_callable_vec_coupled):
    """Coupled a/K matrix VIDE: column 0 hits the analytic solution and all
    columns match independent vector solves."""
    p = vide_callable_vec_coupled
    d = p["d"]
    mesh = np.linspace(0, 1, 21)
    shifts = np.array([[0.0, 0.3, -0.2], [0.0, -0.1, 0.4]])
    # Init column 0 is the true y(0)=0; other columns perturb it.
    init = np.column_stack([p["soln_init_value"],
                            p["soln_init_value"] + np.array([0.5, -0.3]),
                            p["soln_init_value"] + np.array([-0.2, 0.6])])
    g_mat = _matrix_g(p["g"], shifts)

    y_mat = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=g_mat, soln_init_value=init,
        mesh_breakpoints=mesh, coll_divs=p["coll_divs"],
        coll_choices=p["coll_choices"])
    assert y_mat.shape == (len(mesh) - 1, len(p["coll_choices"]), d, init.shape[1])

    err0 = _collect_node_values(y_mat[..., 0], mesh, p["coll_divs"],
                                p["coll_choices"], p["y_exact"])
    assert err0 < 1e-6

    for j in range(init.shape[1]):
        g_col = lambda t, j=j: np.asarray(p["g"](t)) + shifts[:, j]
        y_col = function_solve_VIDE(
            kernel=p["kernel"], a=p["a"], g=g_col, soln_init_value=init[:, j],
            mesh_breakpoints=mesh, coll_divs=p["coll_divs"],
            coll_choices=p["coll_choices"])
        assert np.allclose(y_mat[..., j], y_col, atol=1e-12)


def test_matrix_vie1_return_function(vie1_callable_vec_coupled):
    """return_function for the matrix VIE-1 path: shapes, polynomials, and
    per-column agreement with vector solution functions."""
    p = vie1_callable_vec_coupled
    d = p["d"]
    mesh = np.linspace(0, 1, 21)
    shifts = np.array([[0.0, 0.4], [0.0, -0.3]])
    m = shifts.shape[1]
    g_mat = _matrix_g(p["g"], shifts)

    y_arr, y_func = function_solve_VIE_1(
        kernel=p["kernel"], g=g_mat, mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        return_function=True)

    val = y_func(0.37)
    assert val.shape == (d, m)
    ts = np.array([0.1, 0.37, 0.9])
    vals = y_func(ts)
    assert vals.shape == (len(ts), d, m)
    assert len(y_func.polynomials) == len(mesh) - 1
    assert y_func.polynomials[0].shape == (d, m)

    # Column 0 (unshifted) matches the analytic solution off the mesh nodes.
    assert np.allclose(vals[..., 0], np.stack([p["y_exact"](t) for t in ts]),
                       atol=1e-5)
    for j in range(m):
        g_col = lambda t, j=j: np.asarray(p["g"](t)) + shifts[:, j]
        _, f_col = function_solve_VIE_1(
            kernel=p["kernel"], g=g_col, mesh_breakpoints=mesh,
            coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
            return_function=True)
        assert np.allclose(vals[..., j], f_col(ts), atol=1e-10)


# ---------------------------------------------------------------------------
# Larger kernel dimension d (callable vector tests otherwise only use d=2).
# ---------------------------------------------------------------------------

def test_vec_larger_d_diagonal_matches_scalar():
    """d=6 diagonal kernel: each component reproduces the scalar smooth solve."""
    d = 6
    eye = np.eye(d)
    kernel = lambda u: np.exp(-u) * eye
    g_s = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))  # exact y = sin(t)
    g = lambda t: np.full(d, g_s(t))
    mesh = np.linspace(0, 1, 21)

    y_scalar = function_solve_VIE_2(kernel=lambda u: np.exp(-u), g=g_s,
                                    mesh_breakpoints=mesh,
                                    coll_divs=2, coll_choices=[0, 1, 2])
    y_vec = function_solve_VIE_2(kernel=kernel, g=g, mesh_breakpoints=mesh,
                                 coll_divs=2, coll_choices=[0, 1, 2])
    assert y_vec.shape == (len(mesh) - 1, 3, d)
    for r in range(d):
        assert np.allclose(y_vec[..., r], y_scalar, atol=1e-10)


# ---------------------------------------------------------------------------
# Real inputs must produce a real-valued (not complex) solution.
# ---------------------------------------------------------------------------

def test_real_inputs_stay_real(vie2_callable_smooth, vide_callable_smooth,
                               vie1_callable_smooth):
    mesh = np.linspace(0, 1, 11)
    y2 = function_solve_VIE_2(
        kernel=vie2_callable_smooth["kernel"], g=vie2_callable_smooth["g"],
        mesh_breakpoints=mesh, coll_divs=2, coll_choices=[0, 1, 2])
    yd = function_solve_VIDE(
        kernel=vide_callable_smooth["kernel"], a=vide_callable_smooth["a"],
        g=vide_callable_smooth["g"], soln_init_value=0.0,
        mesh_breakpoints=mesh, coll_divs=2, coll_choices=[0, 1, 2])
    y1 = function_solve_VIE_1(
        kernel=vie1_callable_smooth["kernel"], g=vie1_callable_smooth["g"],
        mesh_breakpoints=mesh, coll_divs=3, coll_choices=[1, 2, 3])
    for y in (y2, yd, y1):
        assert np.isrealobj(y)
        assert y.dtype == np.float64


def test_matrix_complex_vie1_matches_per_column():
    """Complex matrix VIE-1 routes through block decomposition correctly,
    in both the default and force_continuous modes."""
    d, m = 2, 2
    rng = np.random.default_rng(13)
    Kmat = (rng.standard_normal((d, d)) + 1j * rng.standard_normal((d, d))) * 0.2

    def kernel(u):
        u = np.asarray(u)
        if u.ndim == 0:
            return np.exp(-0.5 * u) * Kmat
        return np.exp(-0.5 * u)[:, None, None] * Kmat

    def g_col(t, j):
        return np.array([t * (0.5 + 0.1j * j), t * (0.2 - 0.1j * j)])

    def g_mat(t):
        return np.stack([g_col(t, j) for j in range(m)], axis=1)

    mesh = np.linspace(0, 2, 13)

    # Default (discontinuous) mode.
    y_mat = function_solve_VIE_1(kernel=kernel, g=g_mat, mesh_breakpoints=mesh)
    assert y_mat.dtype == np.complex128
    assert y_mat.shape[2:] == (d, m)
    for j in range(m):
        y_col = function_solve_VIE_1(
            kernel=kernel, g=(lambda t, j=j: g_col(t, j)), mesh_breakpoints=mesh)
        assert np.allclose(y_mat[..., j], y_col, atol=1e-10)

    # force_continuous mode with a complex (d, m) initial value.
    init = rng.standard_normal((d, m)) + 1j * rng.standard_normal((d, m))
    y_mat_fc, f_mat = function_solve_VIE_1(
        kernel=kernel, g=g_mat, soln_init_value=init, mesh_breakpoints=mesh,
        force_continuous=True, return_function=True)
    assert y_mat_fc.dtype == np.complex128
    ts = np.array([0.3, 1.1, 1.9])
    for j in range(m):
        y_col, f_col = function_solve_VIE_1(
            kernel=kernel, g=(lambda t, j=j: g_col(t, j)),
            soln_init_value=init[:, j], mesh_breakpoints=mesh,
            force_continuous=True, return_function=True)
        assert np.allclose(y_mat_fc[..., j], y_col, atol=1e-10)
        assert np.allclose(f_mat(ts)[..., j], f_col(ts), atol=1e-10)


# ===========================================================================
# Additional coverage: paths that were previously unguarded.
# ===========================================================================

# --- (1) Vector / matrix singular kernels (adaptive quad_vec branch) --------

def test_vec_singular_graded_mesh_recovers_high_order():
    """Vector Abel kernel diag(u^-1/2) on a graded mesh; exact y=[sqrt t, sqrt t].

    Exercises the singularity-handling (adaptive quad_vec) branch of the vector
    weight-tensor builder, which the scalar singular tests never reach.
    """
    d = 2
    eye = np.eye(d)

    def kernel(u):
        u = np.asarray(u)
        if u.ndim == 0:
            return (1.0 / np.sqrt(u)) * eye if u > 0 else np.zeros((d, d))
        raise RuntimeError("kernel should be called scalar-wise near singularity")

    g = lambda t: np.full(d, np.sqrt(t) - 0.5 * np.pi * t)
    y_exact = lambda t: np.full(d, np.sqrt(t))
    coll_choices = [0, 1, 2]
    mesh = optimal_graded_mesh(alpha=0.5, T=1.0, M=30, order=len(coll_choices))
    y = function_solve_VIE_2(kernel=kernel, g=g, mesh_breakpoints=mesh,
                             coll_divs=2, coll_choices=coll_choices,
                             kernel_singularity=0.0)
    err = _collect_node_values(y, mesh, 2, coll_choices, y_exact)
    assert err < 1e-3


def test_matrix_singular_graded_mesh():
    """Matrix (multi-RHS) Abel kernel on a graded mesh: column 0 reproduces the
    analytic solution and every column matches an independent vector solve."""
    d, m = 2, 2
    eye = np.eye(d)

    def kernel(u):
        u = np.asarray(u)
        if u.ndim == 0:
            return (1.0 / np.sqrt(u)) * eye if u > 0 else np.zeros((d, d))
        raise RuntimeError("kernel should be called scalar-wise near singularity")

    g_vec = lambda t: np.full(d, np.sqrt(t) - 0.5 * np.pi * t)
    shifts = np.array([[0.0, 0.3], [0.0, -0.2]])
    g_mat = _matrix_g(g_vec, shifts)
    coll_choices = [0, 1, 2]
    mesh = optimal_graded_mesh(alpha=0.5, T=1.0, M=30, order=len(coll_choices))

    y_mat = function_solve_VIE_2(kernel=kernel, g=g_mat, mesh_breakpoints=mesh,
                                 coll_divs=2, coll_choices=coll_choices,
                                 kernel_singularity=0.0)
    assert y_mat.shape == (len(mesh) - 1, len(coll_choices), d, m)
    err0 = _collect_node_values(y_mat[..., 0], mesh, 2, coll_choices,
                                lambda t: np.full(d, np.sqrt(t)))
    assert err0 < 1e-3
    for j in range(m):
        g_col = lambda t, j=j: g_vec(t) + shifts[:, j]
        y_col = function_solve_VIE_2(kernel=kernel, g=g_col, mesh_breakpoints=mesh,
                                     coll_divs=2, coll_choices=coll_choices,
                                     kernel_singularity=0.0)
        assert np.allclose(y_mat[..., j], y_col, atol=1e-12)


def test_vec_nonfinite_kernel_raises():
    """The vector weight-tensor builder's isfinite check fires on a non-finite
    kernel (vector analogue of test_nan_from_kernel_raises)."""
    d = 2
    eye = np.eye(d)
    K_nan = lambda u: np.full((d, d), np.nan)
    with pytest.raises(ValueError, match="non-finite"):
        function_solve_VIE_2(kernel=K_nan, g=lambda t: np.full(d, 1.0),
                             mesh_breakpoints=np.linspace(0, 1, 11),
                             coll_divs=2, coll_choices=[0, 1, 2])


# --- (2) NaN from a(t) in VIDE ---------------------------------------------

def test_nan_from_a_propagates_vide():
    """A NaN returned by a(t) at a collocation point must not silently vanish:
    it either raises or propagates into the solution (matches the array suite)."""
    def a_nan(t):
        if 0.3 < t < 0.4:
            return float("nan")
        return 0.0
    try:
        y = function_solve_VIDE(kernel=lambda u: np.exp(-u), a=a_nan,
                                g=lambda t: 1.0, soln_init_value=0.0,
                                mesh_breakpoints=np.linspace(0, 1, 11),
                                coll_divs=2, coll_choices=[0, 1, 2])
    except (ValueError, FloatingPointError):
        return  # raised — acceptable
    assert np.any(~np.isfinite(y))  # otherwise it must have propagated


# --- (3) a not callable -----------------------------------------------------

def test_validation_a_not_callable():
    with pytest.raises(TypeError, match="a must be callable"):
        function_solve_VIDE(kernel=lambda u: np.exp(-u), a=3.0,
                            g=lambda t: 1.0, soln_init_value=0.0,
                            mesh_breakpoints=np.linspace(0, 1, 11),
                            coll_divs=2, coll_choices=[0, 1, 2])


# --- (4) Matrix VIDE with g=None -------------------------------------------

def test_matrix_vide_g_none(vide_callable_vec_diagonal):
    """Matrix VIDE with g omitted (zero forcing): shape is (M, p, d, m) and each
    column matches an independent vector solve with g=None."""
    p = vide_callable_vec_diagonal
    d = p["d"]
    mesh = np.linspace(0, 1, 13)
    init = np.array([[0.5, -0.3, 0.2], [0.1, 0.4, -0.6]])  # (d, m)
    m = init.shape[1]
    y_mat = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], soln_init_value=init,
        mesh_breakpoints=mesh, coll_divs=p["coll_divs"],
        coll_choices=p["coll_choices"])
    assert y_mat.shape == (len(mesh) - 1, len(p["coll_choices"]), d, m)
    for j in range(m):
        y_col = function_solve_VIDE(
            kernel=p["kernel"], a=p["a"], soln_init_value=init[:, j],
            mesh_breakpoints=mesh, coll_divs=p["coll_divs"],
            coll_choices=p["coll_choices"])
        assert np.allclose(y_mat[..., j], y_col, atol=1e-12)


# --- (5) Exceeding the compiled p / d limits -------------------------------

def test_p_exceeds_compiled_max_raises():
    from voles._dlang import function_solve_max_p_d
    max_p = function_solve_max_p_d()
    coll_divs = max_p + 1
    coll_choices = list(range(coll_divs))  # length max_p + 1 > max_p
    with pytest.raises(ValueError, match="exceeds the maximum"):
        function_solve_VIE_2(kernel=lambda u: np.exp(-u), g=lambda t: 1.0,
                             mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_divs=coll_divs, coll_choices=coll_choices)


def test_d_exceeds_compiled_max_raises():
    from voles._dlang import function_solve_max_d_d
    d = function_solve_max_d_d() + 1
    eye = np.eye(d)
    with pytest.raises(ValueError, match="exceeds the maximum"):
        function_solve_VIE_2(kernel=lambda u: np.exp(-u) * eye,
                             g=lambda t: np.zeros(d),
                             mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_divs=2, coll_choices=[0, 1, 2])


# --- (6) Vectorized vs non-vectorized kernel agree -------------------------

def test_vectorized_and_scalar_kernel_agree():
    """The same kernel, written to broadcast over an array vs scalar-only, must
    give identical results (exercises both integrand paths)."""
    import math
    mesh = np.linspace(0, 1, 21)
    g = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))
    common = dict(g=g, mesh_breakpoints=mesh, coll_divs=2, coll_choices=[0, 1, 2])
    y_vec = function_solve_VIE_2(kernel=lambda u: np.exp(-u), **common)  # broadcasts
    y_sca = function_solve_VIE_2(kernel=lambda u: math.exp(-u), **common)  # scalar-only
    assert np.allclose(y_vec, y_sca, atol=1e-12)


# --- (7) Breakpoint continuity for vector / VIDE / VIE-1 wrappers ----------

def _assert_breakpoint_continuous(y_func, mesh, atol=1e-6):
    for bp in mesh[1:-1]:
        assert np.allclose(y_func(bp - 1e-9), y_func(bp + 1e-9), atol=atol)


def test_vec_vie2_breakpoint_continuous(vie2_callable_vec_diagonal):
    p = vie2_callable_vec_diagonal
    mesh = np.linspace(0, 1, 11)
    _, y_func = function_solve_VIE_2(
        kernel=p["kernel"], g=p["g"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        return_function=True)
    _assert_breakpoint_continuous(y_func, mesh)


def test_vec_vide_breakpoint_continuous(vide_callable_vec_diagonal):
    p = vide_callable_vec_diagonal
    mesh = np.linspace(0, 1, 11)
    _, y_func = function_solve_VIDE(
        kernel=p["kernel"], a=p["a"], g=p["g"],
        soln_init_value=p["soln_init_value"], mesh_breakpoints=mesh,
        coll_divs=p["coll_divs"], coll_choices=p["coll_choices"],
        return_function=True)
    # VIDE solution is C^1 by construction, so continuity holds comfortably.
    _assert_breakpoint_continuous(y_func, mesh)


def test_vec_vie1_breakpoint_continuous_force_continuous(vie1_callable_vec_diagonal):
    """The default VIE-1 method is discontinuous across breakpoints; the
    force_continuous mode is what enforces continuity, so check that mode."""
    p = vie1_callable_vec_diagonal
    mesh = np.linspace(0, 1, 19)
    _, y_func = function_solve_VIE_1(
        kernel=p["kernel"], g=p["g"], soln_init_value=p["y_exact"](0.0),
        mesh_breakpoints=mesh, coll_divs=p["coll_divs"],
        coll_choices=p["coll_choices"], force_continuous=True,
        return_function=True)
    _assert_breakpoint_continuous(y_func, mesh, atol=1e-5)


# --- (8) Mixed real/complex inputs -----------------------------------------

def test_vie2_real_kernel_complex_g():
    """Real kernel + complex g: by linearity the complex solution equals the
    real solve of Re(g) plus i times the real solve of Im(g)."""
    kernel = lambda u: np.exp(-u)  # real
    gr = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))
    gi = lambda t: t**2 - 0.3 * t
    mesh = np.linspace(0, 2, 21)
    common = dict(mesh_breakpoints=mesh, coll_divs=2, coll_choices=[0, 1, 2])

    y = function_solve_VIE_2(kernel=kernel, g=lambda t: gr(t) + 1j * gi(t), **common)
    assert y.dtype == np.complex128
    y_re = function_solve_VIE_2(kernel=kernel, g=gr, **common)
    y_im = function_solve_VIE_2(kernel=kernel, g=gi, **common)
    assert np.allclose(y, y_re + 1j * y_im, atol=1e-10)


def test_vide_real_kernel_complex_a_matches_array_solver():
    """Real kernel, complex a and g (VIDE): cross-checked against the array
    solver on a uniform grid (a complex 'a' couples re/im, so no linearity)."""
    from voles import solve_VIDE
    coll_divs, coll_choices = 2, [0, 1, 2]
    time_step = 0.02
    N = 20 * coll_divs**2 + 1
    T = (N - 1) * time_step
    times = np.arange(N) * time_step

    kernel = lambda u: np.exp(-u)            # real
    a = lambda t: 0.5j / (1.0 + t**2)        # complex
    g = lambda t: np.cos(t) + 1j * np.sin(0.5 * t)
    init = 0.2 + 0.1j

    soln_arr = solve_VIDE(
        kernel_values=kernel(times), a_values=a(times), g_values=g(times),
        soln_init_value=init, time_step=time_step,
        coll_divs=coll_divs, coll_choices=coll_choices)

    mesh = np.linspace(0, T, 21)
    _, y_func = function_solve_VIDE(
        kernel=kernel, a=a, g=g, soln_init_value=init, mesh_breakpoints=mesh,
        coll_divs=coll_divs, coll_choices=coll_choices, return_function=True)
    assert np.max(np.abs(y_func(times) - soln_arr)) < 1e-3
