"""Tests for the callable-input function_solve_* solvers.

Currently exercises only the scalar VIE-2 prototype (`function_solve_VIE_2`).
The per-step linear solve is currently a Python scaffold that will be ported
to D in a follow-up commit. These tests pin the math and the API; they should
continue to pass after the D port.
"""

import numpy as np
import pytest

from volterra_equation_solvers._callable_solvers import function_solve_VIE_2


def _collect_node_values(y, mesh_bps, coll_divs, coll_choices, ref):
    """Max |y_node - ref(t_node)| across all collocation nodes."""
    node_pos = np.asarray(coll_choices, dtype=float) / coll_divs
    err = 0.0
    M = len(mesh_bps) - 1
    for n in range(M):
        t_n = mesh_bps[n]
        h_n = mesh_bps[n + 1] - t_n
        for i, pos in enumerate(node_pos):
            t = t_n + pos * h_n
            err = max(err, abs(y[n, i] - ref(t)))
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
