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
