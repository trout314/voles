"""Value-checked coverage for the two fast history-sum paths added by the
uniform-mesh optimization (PR #1) that the rest of the suite does not reach:

1. The blocked-FFT merge in dlang/source/toeplitz_history.d engages only for
   merge blocks with S >= FFT_CUTOFF = 32 and output width >= 32, which first
   happens at 64 mesh intervals. These tests solve at num_blocks = 80 and
   compare against analytic solutions.

2. The runtime-dimension (d > 8) drivers take a separate lag-block fill and
   LAPACK solve path. The d = 10 tests below are built from ten scalar specs
   with known solutions via the constant change of coordinates Z = P Y (see
   conftest's coupled-fixture section) and are value-checked; section 4 takes
   the runtime drivers across the FFT cutoff.

Every test runs under both quadratures: num_blocks is the number of collocation
mesh intervals, and these drivers are reached only with
quadrature="collocation". Under the default, product, voles uses the block
drivers on a mesh of num_blocks * coll_divs intervals.
"""
import numpy as np
import pytest
from voles import solve_vide, solve_vie1, solve_vie2
from conftest import (TOLERANCE, make_coupled_data_nd,
                      VIE1_SPEC_POLY_A, VIE1_SPEC_POLY_B, VIE1_SPEC_SMOOTH,
                      VIE1_SPEC_POLY, VIE1_SPEC_DAMPED,
                      VIE2_SPEC_SMOOTH, VIE2_SPEC_EXP, VIE2_SPEC_POLY,
                      VIE2_SPEC_RATIONAL, VIE2_SPEC_POLY2,
                      VIDE_SPEC_POLY_A, VIDE_SPEC_POLY_B, VIDE_SPEC_SMOOTH,
                      VIDE_SPEC_ODE, VIDE_SPEC_LOG,
                      as_array)
from conftest import run, with_sol

# Accuracy bounds in this file are a few times the measured discretization
# error of each scheme, which is what lets them notice a wrong history sum.

# mesh_divs for the scalar FFT-path tests; must be well above FFT_CUTOFF = 32.
FFT_BLOCKS = 80


def coupling_matrix(d):
    """Deterministic, well-conditioned d x d change of coordinates: identity
    plus off-diagonal 0.2/(1+|i-j|) decay. Strictly diagonally dominant for
    d <= 10, hence invertible."""
    i = np.arange(d)
    off = 0.2 / (1.0 + np.abs(i[:, None] - i[None, :]))
    return np.eye(d) + off - np.diag(np.diag(off))


# ---------------------------------------------------------------------------
# 1. Blocked-FFT history path (mesh_divs >= 33), scalar drivers
# ---------------------------------------------------------------------------

def test_vie1_fft_path_accuracy(quadrature):
    d = as_array(VIE1_SPEC_DAMPED, time_step=0.01, coll_divs=3,
                 coll_choices=[1, 2, 3], num_blocks=FFT_BLOCKS)
    soln = solve_vie1(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < (6e-5 if quadrature == "product" else 4e-4)


def test_vie1_fft_path_force_continuous_accuracy(quadrature):
    """The continuous VIE-1 driver is a separate D entry point with its own
    ToeplitzHistory instance; exercise its FFT path too."""
    d = as_array(VIE1_SPEC_DAMPED, time_step=0.01, coll_divs=3,
                 coll_choices=[1, 2, 3], num_blocks=FFT_BLOCKS)
    soln = solve_vie1(kernel=d["kernel"], g=d["g"], y0=d["exact"][0], continuous=True, dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < (1.5e-5 if quadrature == "product" else 1e-5)


def test_vie2_fft_path_accuracy(quadrature):
    d = as_array(VIE2_SPEC_SMOOTH, time_step=0.02, coll_divs=3,
                 coll_choices=[0, 1, 2, 3], num_blocks=FFT_BLOCKS)
    soln = solve_vie2(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < (2e-8 if quadrature == "product" else 8e-6)


def test_vide_fft_path_accuracy(quadrature):
    d = as_array(VIDE_SPEC_SMOOTH, time_step=0.01, coll_divs=3,
                 coll_choices=[1, 2, 3], num_blocks=FFT_BLOCKS)
    soln = solve_vide(kernel=d["kernel"], a=d["a"], g=d["g"], y0=d["soln_init_value"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < (5e-5 if quadrature == "product" else TOLERANCE)


# ---------------------------------------------------------------------------
# 1b. Blocked-FFT history path, compiled vector (d = 2) drivers
# ---------------------------------------------------------------------------

def test_vie2_vec_fft_path_accuracy(quadrature):
    # time_step keeps T = 3.6: with the rational spec's K = 1 the second-kind
    # resolvent grows like e^t, so longer horizons amplify discretization
    # error past TOLERANCE. mesh_divs = 80 is what engages the FFT path.
    d = make_coupled_data_nd(
        [VIE2_SPEC_SMOOTH, VIE2_SPEC_RATIONAL], [[1, 1], [1, -1]],
        time_step=0.005, coll_divs=3, coll_choices=[0, 1, 2, 3],
        num_blocks=FFT_BLOCKS)
    soln = solve_vie2(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < (7e-9 if quadrature == "product" else 6e-7)


def test_vide_vec_fft_path_accuracy(quadrature):
    # As above: the log spec's a = 1 gives e^t error growth, so keep T = 3.6.
    d = make_coupled_data_nd(
        [VIDE_SPEC_SMOOTH, VIDE_SPEC_LOG], [[1, 1], [1, -1]],
        time_step=0.005, coll_divs=3, coll_choices=[1, 2, 3],
        num_blocks=FFT_BLOCKS)
    soln = solve_vide(kernel=d["kernel"], a=d["a"], g=d["g"], y0=d["soln_init_value"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < (2.5e-5 if quadrature == "product" else 5e-4)


# ---------------------------------------------------------------------------
# 2. Runtime-dimension (d > 8) drivers, value-checked at d = 10
# ---------------------------------------------------------------------------

def test_vie1_runtime_d10_accuracy(quadrature):
    specs = 2 * [VIE1_SPEC_POLY_A, VIE1_SPEC_POLY_B, VIE1_SPEC_SMOOTH,
                 VIE1_SPEC_POLY, VIE1_SPEC_DAMPED]
    d = make_coupled_data_nd(
        specs, coupling_matrix(10),
        time_step=0.01, coll_divs=3, coll_choices=[1, 2, 3], num_blocks=40)
    soln = solve_vie1(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < (7e-5 if quadrature == "product" else 4e-4)


def test_vie2_runtime_d10_accuracy(quadrature):
    specs = 2 * [VIE2_SPEC_SMOOTH, VIE2_SPEC_EXP, VIE2_SPEC_POLY,
                 VIE2_SPEC_RATIONAL, VIE2_SPEC_POLY2]
    d = make_coupled_data_nd(
        specs, coupling_matrix(10),
        time_step=0.01, coll_divs=3, coll_choices=[0, 1, 2, 3], num_blocks=40)
    soln = solve_vie2(kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < (5e-7 if quadrature == "product" else 1.5e-4)


def test_vide_runtime_d10_accuracy(quadrature):
    specs = 2 * [VIDE_SPEC_POLY_A, VIDE_SPEC_POLY_B, VIDE_SPEC_SMOOTH,
                 VIDE_SPEC_ODE, VIDE_SPEC_LOG]
    d = make_coupled_data_nd(
        specs, coupling_matrix(10),
        time_step=0.01, coll_divs=3, coll_choices=[1, 2, 3], num_blocks=40)
    soln = solve_vide(kernel=d["kernel"], a=d["a"], g=d["g"], y0=d["soln_init_value"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < (2e-4 if quadrature == "product" else TOLERANCE)


# ---------------------------------------------------------------------------
# 3. Runtime-dimension (d > 8) drivers with return_function=True
#
# Regression for the runtime drivers silently returning all-zero polynomial
# coefficients (out_poly_coefs was never written for d > 8). A diagonal
# d = 9 system decouples into nine scalar problems, so the vector polynomials
# must match per-component scalar (compile-time path) solves.
# ---------------------------------------------------------------------------

VIE2_SPECS_9 = [VIE2_SPEC_SMOOTH, VIE2_SPEC_EXP, VIE2_SPEC_POLY,
                VIE2_SPEC_RATIONAL, VIE2_SPEC_POLY2, VIE2_SPEC_SMOOTH,
                VIE2_SPEC_EXP, VIE2_SPEC_POLY, VIE2_SPEC_RATIONAL]
VIE1_SPECS_9 = [VIE1_SPEC_POLY_A, VIE1_SPEC_POLY_B, VIE1_SPEC_SMOOTH,
                VIE1_SPEC_POLY, VIE1_SPEC_DAMPED, VIE1_SPEC_POLY_A,
                VIE1_SPEC_POLY_B, VIE1_SPEC_SMOOTH, VIE1_SPEC_POLY]
VIDE_SPECS_9 = [VIDE_SPEC_POLY_A, VIDE_SPEC_POLY_B, VIDE_SPEC_SMOOTH,
                VIDE_SPEC_ODE, VIDE_SPEC_LOG, VIDE_SPEC_POLY_A,
                VIDE_SPEC_POLY_B, VIDE_SPEC_SMOOTH, VIDE_SPEC_ODE]


def _poly_eval_points(data):
    """A few strictly interior evaluation times of the solved domain."""
    T = (len(data["kernel"]) - 1) * data["time_step"]
    return [0.137 * T, 0.5 * T, 0.861 * T]


def test_vie2_runtime_d9_return_function_matches_scalar(quadrature):
    d = make_coupled_data_nd(
        VIE2_SPECS_9, np.eye(9),
        time_step=0.01, coll_divs=3, coll_choices=[0, 1, 2], num_blocks=10)
    _, f_vec = with_sol(run(solve_vie2, show_warnings=False, kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])))
    for i, spec in enumerate(VIE2_SPECS_9):
        s = as_array(spec, time_step=0.01, coll_divs=3,
                     coll_choices=[0, 1, 2], num_blocks=10)
        _, f_s = with_sol(run(solve_vie2, show_warnings=False, kernel=s["kernel"], g=s["g"], dt=s["time_step"], quadrature=quadrature, coll_setting=(s["coll_divs"], s["coll_choices"])))
        for t in _poly_eval_points(d):
            assert abs(np.asarray(f_vec(t)).ravel()[i] - float(f_s(t))) < 1e-9


def test_vie1_runtime_d9_return_function_matches_scalar(quadrature):
    d = make_coupled_data_nd(
        VIE1_SPECS_9, np.eye(9),
        time_step=0.01, coll_divs=3, coll_choices=[1, 2, 3], num_blocks=10)
    _, f_vec = with_sol(run(solve_vie1, show_warnings=False, kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])))
    for i, spec in enumerate(VIE1_SPECS_9):
        s = as_array(spec, time_step=0.01, coll_divs=3,
                     coll_choices=[1, 2, 3], num_blocks=10)
        _, f_s = with_sol(run(solve_vie1, show_warnings=False, kernel=s["kernel"], g=s["g"], dt=s["time_step"], quadrature=quadrature, coll_setting=(s["coll_divs"], s["coll_choices"])))
        for t in _poly_eval_points(d):
            assert abs(np.asarray(f_vec(t)).ravel()[i] - float(f_s(t))) < 1e-9


def test_vie1_runtime_d9_force_continuous_return_function_matches_scalar(quadrature):
    d = make_coupled_data_nd(
        VIE1_SPECS_9, np.eye(9),
        time_step=0.01, coll_divs=3, coll_choices=[1, 2, 3], num_blocks=10)
    _, f_vec = with_sol(run(solve_vie1, show_warnings=False, kernel=d["kernel"], g=d["g"], y0=d["exact"][0], continuous=True, dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])))
    for i, spec in enumerate(VIE1_SPECS_9):
        s = as_array(spec, time_step=0.01, coll_divs=3,
                     coll_choices=[1, 2, 3], num_blocks=10)
        _, f_s = with_sol(run(solve_vie1, show_warnings=False, kernel=s["kernel"], g=s["g"], y0=s["exact"][0], continuous=True, dt=s["time_step"], quadrature=quadrature, coll_setting=(s["coll_divs"], s["coll_choices"])))
        for t in _poly_eval_points(d):
            assert abs(np.asarray(f_vec(t)).ravel()[i] - float(f_s(t))) < 1e-9


def test_vide_runtime_d9_return_function_matches_scalar(quadrature):
    d = make_coupled_data_nd(
        VIDE_SPECS_9, np.eye(9),
        time_step=0.01, coll_divs=3, coll_choices=[1, 2, 3], num_blocks=10)
    _, f_vec = with_sol(run(solve_vide, show_warnings=False, kernel=d["kernel"], a=d["a"], g=d["g"], y0=d["soln_init_value"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])))
    for i, spec in enumerate(VIDE_SPECS_9):
        s = as_array(spec, time_step=0.01, coll_divs=3,
                     coll_choices=[1, 2, 3], num_blocks=10)
        _, f_s = with_sol(run(solve_vide, show_warnings=False, kernel=s["kernel"], a=s["a"], g=s["g"], y0=s["soln_init_value"], dt=s["time_step"], quadrature=quadrature, coll_setting=(s["coll_divs"], s["coll_choices"])))
        for t in _poly_eval_points(d):
            assert abs(np.asarray(f_vec(t)).ravel()[i] - float(f_s(t))) < 1e-9


# ---------------------------------------------------------------------------
# 4. FFT-cutoff and clamped-merge boundaries
#
# The FFT merge engages only when a merge has both S >= 32 and output width
# >= 32, which first happens at mesh_divs = 64. mesh_divs = 63 is the largest
# all-direct mesh, 64 the first mesh with an FFT merge, and 2^k + 1 meshes
# exercise the clamped end-of-mesh merges that route direct. Volterra
# causality makes the solution on a shared prefix independent of later mesh
# intervals up to summation-order rounding, so solving the same problem at
# Q and Q' > Q blocks must agree on the common prefix to ~1e-12 relative —
# a direct A/B comparison of the FFT and direct history paths on identical
# data. (The last shared sample sits on a mesh boundary where the shorter
# run skips the two-sided average, so it is excluded.)
# ---------------------------------------------------------------------------

# coll_divs**2 samples per interval in both schemes, so num_blocks really is the
# number of mesh intervals (product's own default would be coll_divs).
SAME_MESH = [dict(quadrature="collocation"),
             dict(quadrature="product", samples_per_interval=4)]
same_mesh = pytest.mark.parametrize("scheme", SAME_MESH, ids=lambda s: s["quadrature"])


def _vie2_soln_at_blocks(num_blocks, scheme, coll_divs=2, coll_choices=[0, 1, 2],
                         time_step=0.004):
    d = as_array(VIE2_SPEC_SMOOTH, time_step=time_step, coll_divs=coll_divs,
                 coll_choices=coll_choices, num_blocks=num_blocks)
    sol = run(solve_vie2, show_warnings=False, kernel=d["kernel"], g=d["g"], dt=d["time_step"], coll_setting=(d["coll_divs"], d["coll_choices"]), **scheme)
    assert len(sol.mesh) - 1 == num_blocks
    return sol.y, d


@same_mesh
def test_fft_cutoff_boundary_accuracy(scheme):
    for num_blocks in (63, 64, 65):
        soln, d = _vie2_soln_at_blocks(num_blocks, scheme)
        assert np.max(np.abs(soln - d["exact"])) < 2e-7


@same_mesh
def test_fft_vs_direct_prefix_consistency(scheme):
    # Q = 63: every merge is direct. Q = 64: the S = 32 merge at boundary 32
    # gets output width 32 and routes through the FFT. The first 63 blocks
    # solve identical collocation equations either way.
    s63, _ = _vie2_soln_at_blocks(63, scheme)
    s64, _ = _vie2_soln_at_blocks(64, scheme)
    n_shared = 63 * 4  # samples strictly before the 63rd mesh boundary
    scale = np.max(np.abs(s63[:n_shared]))
    assert np.max(np.abs(s63[:n_shared] - s64[:n_shared])) < 1e-12 * scale


@same_mesh
def test_clamped_merge_prefix_consistency(scheme):
    # Q = 129 = 2^7 + 1 appends the pathological clamped tail merges after
    # the full power-of-two schedule of Q = 128.
    s128, _ = _vie2_soln_at_blocks(128, scheme)
    s129, _ = _vie2_soln_at_blocks(129, scheme)
    n_shared = 128 * 4
    scale = np.max(np.abs(s128[:n_shared]))
    assert np.max(np.abs(s128[:n_shared] - s129[:n_shared])) < 1e-12 * scale


@same_mesh
def test_runtime_d10_fft_boundary_prefix_consistency(scheme):
    # Same boundary check through the runtime-dimension (d > 8) driver.
    def solve_at(num_blocks):
        d = make_coupled_data_nd(
            [VIE2_SPEC_SMOOTH, VIE2_SPEC_EXP, VIE2_SPEC_POLY,
             VIE2_SPEC_RATIONAL, VIE2_SPEC_POLY2] * 2, coupling_matrix(10),
            time_step=0.004, coll_divs=2, coll_choices=[0, 1, 2],
            num_blocks=num_blocks)
        return run(solve_vie2, show_warnings=False, kernel=d["kernel"], g=d["g"], dt=d["time_step"], coll_setting=(d["coll_divs"], d["coll_choices"]), **scheme).y
    s63 = solve_at(63)
    s64 = solve_at(64)
    n_shared = 63 * 4
    scale = np.max(np.abs(s63[:n_shared]))
    assert np.max(np.abs(s63[:n_shared] - s64[:n_shared])) < 1e-12 * scale


# ---------------------------------------------------------------------------
# 5. Top of the compiled collocation range: coll_divs = 4 with p = 5 choices
# (the largest compiled setting; everything above falls back or errors).
# ---------------------------------------------------------------------------

def test_vie2_largest_compiled_setting_accuracy(quadrature):
    d = as_array(VIE2_SPEC_SMOOTH, time_step=0.002, coll_divs=4,
                 coll_choices=[0, 1, 2, 3, 4], num_blocks=10)
    soln = run(solve_vie2, show_warnings=False, kernel=d["kernel"], g=d["g"], dt=d["time_step"], quadrature=quadrature, coll_setting=(d["coll_divs"], d["coll_choices"])).y
    assert np.max(np.abs(soln - d["exact"])) < 1e-11
