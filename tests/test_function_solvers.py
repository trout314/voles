"""Tests for the callable-input function_solve_* solvers.

Currently exercises only the scalar VIE-2 prototype (`function_solve_VIE_2`).
The Python implementation is provisional -- the per-step linear solve will be
ported to D. These tests pin the math and the API; they should continue to
pass after the D port.
"""

import numpy as np
import pytest

from volterra_equation_solvers._callable_solvers import function_solve_VIE_2


def _collect_node_values(y, mesh_bps, coll_divs, coll_choices, ref):
    """Compute max |y_node - ref(t_node)| across all collocation nodes."""
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

class TestSmoothKernel:
    """VIE-2 with smooth K — verify convergence to known exact solutions."""

    def test_exponential_growth(self):
        """K(u)=1, g(t)=1 → y(t) = exp(t)."""
        K = lambda u: 1.0
        g = lambda t: 1.0
        mesh = np.linspace(0, 1, 21)
        y = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                                 coll_divs=2, coll_choices=[0, 1, 2])
        err = _collect_node_values(y, mesh, 2, [0, 1, 2], np.exp)
        assert err < 1e-6

    def test_exp_decay_kernel_sine_solution(self):
        """K(u)=exp(-u), g(t)=(sin t + cos t - exp(-t))/2 → y(t) = sin(t)."""
        K = lambda u: np.exp(-u)
        g = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))
        mesh = np.linspace(0, 1, 21)
        y = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                                 coll_divs=2, coll_choices=[0, 1, 2])
        err = _collect_node_values(y, mesh, 2, [0, 1, 2], np.sin)
        assert err < 1e-6

    @pytest.mark.parametrize("M_target,expected_ratio", [
        (10, 16.0), (20, 16.0), (40, 16.0)])
    def test_convergence_rate(self, M_target, expected_ratio):
        """Halving h should reduce error by ~16 (order 4) for coll_choices=[0,1,2]."""
        K = lambda u: np.exp(-u)
        g = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))

        def err_at(M):
            mesh = np.linspace(0, 1, M + 1)
            y = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                                     coll_divs=2, coll_choices=[0, 1, 2])
            return _collect_node_values(y, mesh, 2, [0, 1, 2], np.sin)

        # Reduce-by-2 in h => order-4 method gives ratio ≈ 16
        e_coarse = err_at(M_target)
        e_fine = err_at(M_target * 2)
        ratio = e_coarse / e_fine
        assert ratio > expected_ratio / 2  # generous lower bound

    def test_g_none_treated_as_zero(self):
        """g=None should be equivalent to g(t)=0 (trivial solution y=0)."""
        K = lambda u: np.exp(-u)
        mesh = np.linspace(0, 1, 11)
        y = function_solve_VIE_2(kernel=K, mesh_breakpoints=mesh,
                                 coll_divs=2, coll_choices=[0, 1, 2])
        assert np.allclose(y, 0.0, atol=1e-12)


# ---------------------------------------------------------------------------
# Non-uniform mesh
# ---------------------------------------------------------------------------

class TestNonUniformMesh:
    """Arbitrary mesh: math should still hold."""

    def test_geometric_mesh_smooth_problem(self):
        """Geometric grading on a smooth problem should give similar accuracy."""
        K = lambda u: np.exp(-u)
        g = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))
        raw = np.linspace(0, 1, 21)
        mesh = raw ** 1.5
        y = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                                 coll_divs=2, coll_choices=[0, 1, 2])
        err = _collect_node_values(y, mesh, 2, [0, 1, 2], np.sin)
        assert err < 1e-5

    def test_random_breakpoints(self):
        """Random-spacing mesh: solver still produces a sensible solution."""
        rng = np.random.default_rng(42)
        raw = np.sort(rng.uniform(0.01, 0.99, size=15))
        mesh = np.concatenate([[0.0], raw, [1.0]])
        K = lambda u: np.exp(-u)
        g = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))
        y = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                                 coll_divs=2, coll_choices=[0, 1, 2])
        err = _collect_node_values(y, mesh, 2, [0, 1, 2], np.sin)
        assert err < 1e-3  # generous since mesh is random


# ---------------------------------------------------------------------------
# Singular kernel
# ---------------------------------------------------------------------------

class TestSingularKernel:
    """Abel-type kernel K(u)=u^(-1/2)."""

    @staticmethod
    def _abel_problem():
        # Choose y(t)=sqrt(t); then int_0^t (t-s)^{-1/2} sqrt(s) ds = pi*t/2.
        K = lambda u: 1.0 / np.sqrt(u) if u > 0 else 0.0
        g = lambda t: np.sqrt(t) - 0.5 * np.pi * t
        y_exact = lambda t: np.sqrt(t)
        return K, g, y_exact

    def test_graded_mesh_recovers_high_order(self):
        """Graded mesh r=3 should give much better error than uniform mesh."""
        K, g, y_exact = self._abel_problem()
        M = 20

        mesh_uniform = np.linspace(0, 1, M + 1)
        y_uniform = function_solve_VIE_2(
            kernel=K, g=g, mesh_breakpoints=mesh_uniform,
            coll_divs=2, coll_choices=[0, 1, 2], kernel_singularity=0.0)
        err_uniform = _collect_node_values(
            y_uniform, mesh_uniform, 2, [0, 1, 2], y_exact)

        mesh_graded = np.linspace(0, 1, M + 1) ** 3
        y_graded = function_solve_VIE_2(
            kernel=K, g=g, mesh_breakpoints=mesh_graded,
            coll_divs=2, coll_choices=[0, 1, 2], kernel_singularity=0.0)
        err_graded = _collect_node_values(
            y_graded, mesh_graded, 2, [0, 1, 2], y_exact)

        assert err_graded < err_uniform / 100  # graded should be 100x better

    def test_undeclared_singularity_raises(self):
        """K with non-integrable singularity but no kernel_singularity → error."""
        K_bad = lambda u: 1.0 / u if u > 0 else float('inf')
        g = lambda t: t
        mesh = np.linspace(0, 1, 11)
        with pytest.raises(ValueError, match="non-finite"):
            function_solve_VIE_2(kernel=K_bad, g=g, mesh_breakpoints=mesh,
                                 coll_divs=2, coll_choices=[0, 1, 2])


# ---------------------------------------------------------------------------
# Solution callable wrapper
# ---------------------------------------------------------------------------

class TestSolutionCallable:
    """return_function=True returns a (y_arr, y_callable) tuple."""

    @staticmethod
    def _make_problem():
        K = lambda u: np.exp(-u)
        g = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))
        mesh = np.linspace(0, 1, 21)
        return K, g, mesh

    def test_scalar_evaluation(self):
        K, g, mesh = self._make_problem()
        y, y_func = function_solve_VIE_2(
            kernel=K, g=g, mesh_breakpoints=mesh,
            coll_divs=2, coll_choices=[0, 1, 2], return_function=True)
        assert isinstance(y_func(0.37), float)
        assert abs(y_func(0.37) - np.sin(0.37)) < 1e-5

    def test_array_evaluation(self):
        K, g, mesh = self._make_problem()
        _, y_func = function_solve_VIE_2(
            kernel=K, g=g, mesh_breakpoints=mesh,
            coll_divs=2, coll_choices=[0, 1, 2], return_function=True)
        ts = np.array([0.1, 0.37, 0.5, 0.9])
        vals = y_func(ts)
        assert vals.shape == ts.shape
        assert np.max(np.abs(vals - np.sin(ts))) < 1e-5

    def test_exposes_polynomials_and_mesh(self):
        K, g, mesh = self._make_problem()
        _, y_func = function_solve_VIE_2(
            kernel=K, g=g, mesh_breakpoints=mesh,
            coll_divs=2, coll_choices=[0, 1, 2], return_function=True)
        assert len(y_func.polynomials) == len(mesh) - 1
        assert np.array_equal(y_func.mesh_breakpoints, mesh)

    def test_evaluation_at_breakpoint(self):
        """Evaluating at a mesh breakpoint should match the adjacent node value."""
        K, g, mesh = self._make_problem()
        y, y_func = function_solve_VIE_2(
            kernel=K, g=g, mesh_breakpoints=mesh,
            coll_divs=2, coll_choices=[0, 1, 2], return_function=True)
        # At t=mesh[5], the left interval (4) ends and right interval (5) begins.
        # coll_choices=[0,1,2] means node 2 of interval 4 = right endpoint = mesh[5],
        # and node 0 of interval 5 = left endpoint = mesh[5]. Both should give
        # equal values (continuity is enforced by g being smooth and the
        # collocation method).
        assert abs(y_func(mesh[5]) - np.sin(mesh[5])) < 1e-5


# ---------------------------------------------------------------------------
# Input validation
# ---------------------------------------------------------------------------

class TestInputValidation:

    def test_mesh_not_increasing(self):
        K = lambda u: 1.0
        with pytest.raises(ValueError, match="strictly increasing"):
            function_solve_VIE_2(kernel=K,
                                 mesh_breakpoints=np.array([0.0, 0.5, 0.3, 1.0]),
                                 coll_divs=2, coll_choices=[0, 1, 2])

    def test_mesh_not_starting_at_zero(self):
        K = lambda u: 1.0
        with pytest.raises(ValueError, match="must be 0"):
            function_solve_VIE_2(kernel=K,
                                 mesh_breakpoints=np.array([0.1, 0.5, 1.0]),
                                 coll_divs=2, coll_choices=[0, 1, 2])

    def test_coll_choices_out_of_range(self):
        K = lambda u: 1.0
        with pytest.raises(ValueError, match=r"\[0, 2\]"):
            function_solve_VIE_2(kernel=K,
                                 mesh_breakpoints=np.linspace(0, 1, 5),
                                 coll_divs=2, coll_choices=[0, 1, 5])

    def test_kernel_not_callable(self):
        with pytest.raises(TypeError, match="kernel"):
            function_solve_VIE_2(kernel=np.zeros(10),
                                 mesh_breakpoints=np.linspace(0, 1, 5),
                                 coll_divs=2, coll_choices=[0, 1, 2])
