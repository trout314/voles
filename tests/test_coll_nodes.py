"""Tests for arbitrary collocation node sets (`coll_nodes`) and the node-set
helper functions, across the three callable-input solvers."""

import numpy as np
import pytest

from voles._callable_solvers import (
    function_solve_VIE_1, function_solve_VIE_2, function_solve_VIDE,
    gauss_legendre_nodes, radau_iia_nodes, lobatto_nodes,
    optimal_graded_mesh,
)


# ---------------------------------------------------------------------------
# Node-set helpers: closed-form values on [0, 1]
# ---------------------------------------------------------------------------

def test_gauss_legendre_known_values():
    assert np.allclose(gauss_legendre_nodes(1), [0.5])
    # 2-point Gauss: 0.5 +/- sqrt(3)/6
    s = np.sqrt(3) / 6
    assert np.allclose(gauss_legendre_nodes(2), [0.5 - s, 0.5 + s])
    # 3-point Gauss: 0.5 +/- sqrt(15)/10 and 0.5
    t = np.sqrt(15) / 10
    assert np.allclose(gauss_legendre_nodes(3), [0.5 - t, 0.5, 0.5 + t])


def test_radau_iia_known_values():
    assert np.allclose(radau_iia_nodes(1), [1.0])
    assert np.allclose(radau_iia_nodes(2), [1.0 / 3.0, 1.0])
    # 3-point Radau IIA (standard tabulated values)
    assert np.allclose(radau_iia_nodes(3), [0.155051025721682, 0.644948974968252, 1.0])
    assert radau_iia_nodes(4)[-1] == 1.0


def test_lobatto_known_values():
    assert np.allclose(lobatto_nodes(2), [0.0, 1.0])
    assert np.allclose(lobatto_nodes(3), [0.0, 0.5, 1.0])
    # 4-point Lobatto: 0, 0.5 -/+ sqrt(5)/10, 1
    s = np.sqrt(5) / 10
    assert np.allclose(lobatto_nodes(4), [0.0, 0.5 - s, 0.5 + s, 1.0])
    assert lobatto_nodes(5)[0] == 0.0 and lobatto_nodes(5)[-1] == 1.0


@pytest.mark.parametrize("fn", [gauss_legendre_nodes, radau_iia_nodes, lobatto_nodes])
@pytest.mark.parametrize("p", [2, 3, 4, 5])
def test_node_sets_sorted_distinct_in_range(fn, p):
    nodes = fn(p)
    assert nodes.shape == (p,)
    assert np.all(np.diff(nodes) > 0)          # strictly increasing (distinct)
    assert nodes[0] >= 0.0 and nodes[-1] <= 1.0


@pytest.mark.parametrize("fn", [gauss_legendre_nodes, radau_iia_nodes])
def test_node_count_must_be_positive(fn):
    with pytest.raises(ValueError, match="integer"):
        fn(0)
    with pytest.raises(ValueError, match="integer"):
        fn(2.5)


def test_lobatto_requires_at_least_two():
    with pytest.raises(ValueError, match=">= 2"):
        lobatto_nodes(1)


# ---------------------------------------------------------------------------
# coll_nodes path reproduces the equivalent rational (coll_divs, coll_choices)
# ---------------------------------------------------------------------------

def test_vie2_coll_nodes_matches_rational():
    mesh = np.linspace(0, 1, 6)
    K = lambda u: np.exp(-u)
    g = lambda t: t**2 + 1.0
    y_int = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                                 coll_divs=2, coll_choices=[1, 2])
    y_nod = function_solve_VIE_2(kernel=K, g=g, mesh_breakpoints=mesh,
                                 coll_nodes=[0.5, 1.0])
    assert np.allclose(y_int, y_nod, atol=1e-12, rtol=0)


def test_vide_coll_nodes_matches_rational():
    mesh = np.linspace(0, 1, 5)
    K = lambda u: np.cos(u)
    g = lambda t: np.sin(t)
    y_int = function_solve_VIDE(kernel=K, g=g, soln_init_value=0.3,
                                mesh_breakpoints=mesh, coll_divs=3,
                                coll_choices=[1, 2, 3])
    y_nod = function_solve_VIDE(kernel=K, g=g, soln_init_value=0.3,
                                mesh_breakpoints=mesh,
                                coll_nodes=[1 / 3, 2 / 3, 1.0])
    assert np.allclose(y_int, y_nod, atol=1e-12, rtol=0)


def test_vie1_coll_nodes_matches_rational():
    mesh = np.linspace(0, 1, 6)
    K = lambda u: 1.0 + u
    g = lambda t: t**2
    y_int = function_solve_VIE_1(kernel=K, g=g, mesh_breakpoints=mesh,
                                 coll_divs=2, coll_choices=[1, 2])
    y_nod = function_solve_VIE_1(kernel=K, g=g, mesh_breakpoints=mesh,
                                 coll_nodes=[0.5, 1.0])
    assert np.allclose(y_int, y_nod, atol=1e-12, rtol=0)


def test_radau_helper_matches_rational_for_p2():
    # radau_iia_nodes(2) == [1/3, 1] == (coll_divs=3, coll_choices=[1, 3])
    mesh = np.linspace(0, 1, 5)
    K = lambda u: np.exp(-2 * u)
    g = lambda t: t
    y_int = function_solve_VIDE(kernel=K, g=g, soln_init_value=0.0,
                                mesh_breakpoints=mesh, coll_divs=3,
                                coll_choices=[1, 3])
    y_nod = function_solve_VIDE(kernel=K, g=g, soln_init_value=0.0,
                                mesh_breakpoints=mesh,
                                coll_nodes=radau_iia_nodes(2))
    assert np.allclose(y_int, y_nod, atol=1e-12, rtol=0)


# ---------------------------------------------------------------------------
# Accuracy on problems with known exact solutions, using arbitrary node sets.
#
# Correctness rides on the observed *convergence order* under mesh refinement,
# not an absolute error magnitude: an order assertion catches a regression that
# silently degrades the method (e.g. order 3 -> 2) which a loose absolute bound
# would let pass, and it needs no platform-dependent tuned constant. The
# expected orders below were confirmed by a refinement study; thresholds sit
# ~0.3 below the nominal order to allow for the pre-asymptotic regime.
# ---------------------------------------------------------------------------

def _max_err(y_func, exact, T=1.0, n=60):
    ts = np.linspace(0, T, n + 1)[1:]
    vals = np.array([float(y_func(t)) for t in ts])
    return np.max(np.abs(vals - exact(ts)))


def _convergence_rates(solve, exact, meshes):
    """``solve(M)`` returns the callable solution on an M-interval uniform mesh;
    return the observed log2 error ratios on a fixed interior grid as M is
    refined through ``meshes``."""
    errs = [_max_err(solve(M), exact) for M in meshes]
    return [np.log2(errs[i] / errs[i + 1]) for i in range(len(errs) - 1)]


def test_vie2_gauss_third_order():
    # y(t) = g(t) + \int_0^t y(s) ds with K=1, g=1  ->  y(t) = e^t.
    # Gauss(3) collocation is globally third order at interior points.
    def solve(M):
        _, yf = function_solve_VIE_2(kernel=lambda u: 1.0, g=lambda t: 1.0,
                                     mesh_breakpoints=np.linspace(0, 1, M + 1),
                                     coll_nodes=gauss_legendre_nodes(3),
                                     return_function=True)
        return yf
    rates = _convergence_rates(solve, np.exp, (20, 40, 80))
    assert min(rates) > 2.7, rates


def test_vide_radau_fourth_order():
    # y' = g + \int_0^t y ds with K=1, g=1, y(0)=1  ->  y(t) = e^t.
    # Radau IIA(3) yields ~fourth-order accuracy for the recovered y.
    def solve(M):
        _, yf = function_solve_VIDE(kernel=lambda u: 1.0, g=lambda t: 1.0,
                                    soln_init_value=1.0,
                                    mesh_breakpoints=np.linspace(0, 1, M + 1),
                                    coll_nodes=radau_iia_nodes(3),
                                    return_function=True)
        return yf
    rates = _convergence_rates(solve, np.exp, (20, 40, 80))
    assert min(rates) > 3.5, rates


def test_vie1_gauss_third_order():
    # g(t) = \int_0^t y(s) ds with K=1 and y(t) = e^t  ->  g(t) = e^t - 1.
    # A non-polynomial solution so there is a genuine rate to measure; Gauss(3)
    # is third order (Gauss(2) would show the first-kind order reduction to 1).
    def solve(M):
        _, yf = function_solve_VIE_1(kernel=lambda u: 1.0,
                                     g=lambda t: np.exp(t) - 1.0,
                                     mesh_breakpoints=np.linspace(0, 1, M + 1),
                                     coll_nodes=gauss_legendre_nodes(3),
                                     return_function=True)
        return yf
    rates = _convergence_rates(solve, np.exp, (20, 40, 80))
    assert min(rates) > 2.7, rates


def test_lobatto_runs_on_vie2():
    # Lobatto includes node 0; valid for VIE-2.
    mesh = np.linspace(0, 1, 11)
    _, yf = function_solve_VIE_2(kernel=lambda u: 1.0, g=lambda t: 1.0,
                                 mesh_breakpoints=mesh,
                                 coll_nodes=lobatto_nodes(3),
                                 return_function=True)
    assert _max_err(yf, np.exp, 1.0) < 1e-4


# ---------------------------------------------------------------------------
# Validation of the coll_nodes path
# ---------------------------------------------------------------------------

def test_conflict_coll_nodes_and_coll_divs():
    with pytest.raises(ValueError, match="not both"):
        function_solve_VIE_2(kernel=lambda u: 1.0, mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_nodes=[0.5, 1.0], coll_divs=2)


def test_conflict_coll_nodes_and_coll_choices():
    with pytest.raises(ValueError, match="not both"):
        function_solve_VIDE(kernel=lambda u: 1.0, soln_init_value=0.0,
                            mesh_breakpoints=np.linspace(0, 1, 5),
                            coll_nodes=[0.5, 1.0], coll_choices=[1, 2])


def test_coll_nodes_out_of_range():
    with pytest.raises(ValueError, match=r"\[0, 1\]"):
        function_solve_VIE_2(kernel=lambda u: 1.0, mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_nodes=[0.5, 1.5])


def test_coll_nodes_vie1_excludes_zero():
    with pytest.raises(ValueError, match=r"\(0, 1\]"):
        function_solve_VIE_1(kernel=lambda u: 1.0, g=lambda t: t,
                             mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_nodes=[0.0, 0.5])


def test_coll_nodes_distinct():
    with pytest.raises(ValueError, match="distinct"):
        function_solve_VIE_2(kernel=lambda u: 1.0, mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_nodes=[0.5, 0.5])


def test_coll_nodes_empty():
    with pytest.raises(ValueError, match="at least one"):
        function_solve_VIE_2(kernel=lambda u: 1.0, mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_nodes=[])


def test_coll_nodes_nonfinite():
    with pytest.raises(ValueError, match="finite"):
        function_solve_VIE_2(kernel=lambda u: 1.0, mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_nodes=[0.5, np.nan])


# ---------------------------------------------------------------------------
# VIE-1 convergence detection (|rho_m| = prod (1-c_i)/c_i > 1 is rejected)
# ---------------------------------------------------------------------------

def test_vie1_coll_nodes_nonconvergent_rejected():
    # Single node c = 0.25 < 0.5  ->  |rho_1| = 3 > 1: divergent.
    with pytest.raises(ValueError, match="convergent"):
        function_solve_VIE_1(kernel=lambda u: 1.0, g=lambda t: t,
                             mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_nodes=[0.25])


def test_vie1_coll_nodes_convergent_accepted():
    # Including c = 1 gives a zero factor  ->  |rho| = 0, always convergent.
    y = function_solve_VIE_1(kernel=lambda u: 1.0, g=lambda t: t,
                             mesh_breakpoints=np.linspace(0, 1, 5),
                             coll_nodes=[0.3, 1.0])
    assert y.shape == (4, 2)


def test_vie1_gauss_nodes_are_boundary_but_accepted():
    # Symmetric (Gauss) nodes give |rho_m| == 1 exactly; treated as convergent.
    y = function_solve_VIE_1(kernel=lambda u: 1.0, g=lambda t: np.exp(t) - 1.0,
                             mesh_breakpoints=np.linspace(0, 1, 6),
                             coll_nodes=gauss_legendre_nodes(3))
    assert np.all(np.isfinite(y))


def test_vie1_integer_path_rejects_beyond_original_blocklist():
    # node 0.4 (coll_divs=5, coll_choices=[2]) has |rho_1| = 1.5 > 1: divergent,
    # yet was never in the hard-coded blocklist. The analytic test rejects it.
    with pytest.raises(ValueError, match="convergent"):
        function_solve_VIE_1(kernel=lambda u: 1.0, g=lambda t: t,
                             mesh_breakpoints=np.linspace(0, 1, 6),
                             coll_divs=5, coll_choices=[2])


def test_vie1_singular_kernel_skips_convergence_guard():
    # |rho_m| = 2 > 1 (node 1/3) would be rejected for a smooth kernel, but with
    # a declared singularity the smooth criterion does not apply (Thm 2.4.2(b)),
    # so the guard is skipped. K(u)=u^-1/2, y=1 -> g(t)=2 sqrt(t).
    mesh = optimal_graded_mesh(alpha=0.5, T=1.0, M=8, order=1)
    y = function_solve_VIE_1(kernel=lambda u: 1.0 / np.sqrt(u),
                             g=lambda t: 2.0 * np.sqrt(t),
                             mesh_breakpoints=mesh, coll_nodes=[1 / 3],
                             kernel_singularity=0.0, show_warnings=False)
    assert np.all(np.isfinite(y))


# ---------------------------------------------------------------------------
# VIE-1 force_continuous: Brunner's S_m^(0) (degree-m, c_m=1) method.
# Convergence and order follow Thm 2.4.5: converges iff c_m=1 and
# |rho_{m-1}| = prod_{i<m}(1-c_i)/c_i <= 1; order O(h^{m+1}) for rho_{m-1} in
# [-1,1), O(h^m) at rho_{m-1}=+1.  (K=1, g=e^t-1, y=e^t, g(0)=0.)
# ---------------------------------------------------------------------------

def _vie1_cont_rates(nodes, meshes=(20, 40, 80)):
    ts = np.linspace(0.05, 1, 40)
    errs = []
    for M in meshes:
        _, yf = function_solve_VIE_1(kernel=lambda u: 1.0,
                                     g=lambda t: np.exp(t) - 1.0,
                                     soln_init_value=1.0,
                                     mesh_breakpoints=np.linspace(0, 1, M + 1),
                                     coll_nodes=nodes, force_continuous=True,
                                     return_function=True, show_warnings=False)
        errs.append(np.max(np.abs([float(yf(t)) for t in ts] - np.exp(ts))))
    return [np.log2(errs[i] / errs[i + 1]) for i in range(len(errs) - 1)]


def test_vie1_continuous_order_m_plus_1():
    # [0.7, 1]: m=2, rho_1 = 0.43 in [-1,1)  ->  O(h^{m+1}) = O(h^3).
    assert min(_vie1_cont_rates([0.7, 1.0])) > 2.7


def test_vie1_continuous_odd_m_boundary_keeps_full_order():
    # [1/3, 2/3, 1]: m=3, rho_2 = -1 in [-1,1)  ->  O(h^{m+1}) = O(h^4).
    assert min(_vie1_cont_rates([1 / 3, 2 / 3, 1.0])) > 3.6


def test_vie1_continuous_even_m_boundary_order_reduction():
    # [0.5, 1]: m=2, rho_1 = +1  ->  reduced to O(h^m) = O(h^2).
    rates = _vie1_cont_rates([0.5, 1.0])
    assert 1.7 < min(rates) < 2.4


def test_vie1_continuous_requires_right_endpoint():
    with pytest.raises(ValueError, match="c_m = 1"):
        function_solve_VIE_1(kernel=lambda u: 1.0, g=lambda t: t,
                             soln_init_value=0.0,
                             mesh_breakpoints=np.linspace(0, 1, 6),
                             coll_nodes=[0.3, 0.7], force_continuous=True)


def test_vie1_continuous_rejects_large_leading_amplification():
    # c_m=1 but |rho_{m-1}| = 2 > 1: divergent by Thm 2.4.5.
    with pytest.raises(ValueError, match="leading-node"):
        function_solve_VIE_1(kernel=lambda u: 1.0, g=lambda t: t,
                             soln_init_value=0.0,
                             mesh_breakpoints=np.linspace(0, 1, 6),
                             coll_nodes=[1 / 3, 1.0], force_continuous=True)


def test_vie1_continuous_vector_order_m_plus_1():
    # d=2 diagonal kernel decouples into independent scalar VIE-1 (y=e^t per
    # component); the vector S_m^(0) path must also show O(h^{m+1}) = O(h^3).
    K = lambda u: np.eye(2)
    g = lambda t: np.array([np.exp(t) - 1.0, np.exp(t) - 1.0])
    ts = np.linspace(0.05, 1, 30)

    def err(M):
        _, yf = function_solve_VIE_1(kernel=K, g=g,
                                     soln_init_value=np.array([1.0, 1.0]),
                                     mesh_breakpoints=np.linspace(0, 1, M + 1),
                                     coll_nodes=[0.7, 1.0], force_continuous=True,
                                     return_function=True, show_warnings=False)
        return np.max(np.abs(np.array([yf(t) for t in ts]) - np.exp(ts)[:, None]))

    es = [err(M) for M in (20, 40, 80)]
    rates = [np.log2(es[i] / es[i + 1]) for i in range(2)]
    assert min(rates) > 2.7
