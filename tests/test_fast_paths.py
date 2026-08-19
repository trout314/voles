"""Value-checked coverage for the two fast history-sum paths added by the
uniform-mesh optimization (PR #1) that the rest of the suite does not reach:

1. The blocked-FFT merge in dlang/source/toeplitz_history.d engages only for
   merge blocks of size S >= FFT_CUTOFF = 32, i.e. mesh_divs >= 33; every other
   test stays far below that, so these tests solve at mesh_divs = 80 (several
   FFT merges: S = 32 at boundaries 32 and 96-ish, S = 64 at 64) and compare
   against analytic solutions.

2. The runtime-dimension (d > 8) drivers take a separate lag-block fill and
   LAPACK solve path. The d = 10 tests below are built from ten scalar specs
   with known solutions via the constant change of coordinates Z = P Y (see
   conftest's coupled-fixture section) and are value-checked, with
   mesh_divs = 40 so the runtime drivers also cross the FFT cutoff.
"""
import numpy as np
from voles import solve_VIDE, solve_VIE_1, solve_VIE_2
from conftest import (TOLERANCE, make_coupled_data_nd,
                      VIE1_SPEC_POLY_A, VIE1_SPEC_POLY_B, VIE1_SPEC_SMOOTH,
                      VIE1_SPEC_POLY, VIE1_SPEC_DAMPED,
                      VIE2_SPEC_SMOOTH, VIE2_SPEC_EXP, VIE2_SPEC_POLY,
                      VIE2_SPEC_RATIONAL, VIE2_SPEC_POLY2,
                      VIDE_SPEC_POLY_A, VIDE_SPEC_POLY_B, VIDE_SPEC_SMOOTH,
                      VIDE_SPEC_ODE, VIDE_SPEC_LOG,
                      as_array)

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

def test_vie1_fft_path_accuracy():
    d = as_array(VIE1_SPEC_DAMPED, time_step=0.01, coll_divs=3,
                 coll_choices=[1, 2, 3], num_blocks=FFT_BLOCKS)
    soln = solve_VIE_1(
        kernel_values=d["kernel"], g_values=d["g"],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"])
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie1_fft_path_force_continuous_accuracy():
    """The continuous VIE-1 driver is a separate D entry point with its own
    ToeplitzHistory instance; exercise its FFT path too."""
    d = as_array(VIE1_SPEC_DAMPED, time_step=0.01, coll_divs=3,
                 coll_choices=[1, 2, 3], num_blocks=FFT_BLOCKS)
    soln = solve_VIE_1(
        kernel_values=d["kernel"], g_values=d["g"],
        soln_init_value=d["exact"][0], force_continuous=True,
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"])
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie2_fft_path_accuracy():
    d = as_array(VIE2_SPEC_SMOOTH, time_step=0.02, coll_divs=3,
                 coll_choices=[0, 1, 2, 3], num_blocks=FFT_BLOCKS)
    soln = solve_VIE_2(
        kernel_values=d["kernel"], g_values=d["g"],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"])
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vide_fft_path_accuracy():
    d = as_array(VIDE_SPEC_SMOOTH, time_step=0.01, coll_divs=3,
                 coll_choices=[1, 2, 3], num_blocks=FFT_BLOCKS)
    soln = solve_VIDE(
        kernel_values=d["kernel"], a_values=d["a"], g_values=d["g"],
        soln_init_value=d["soln_init_value"],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"])
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


# ---------------------------------------------------------------------------
# 1b. Blocked-FFT history path, compiled vector (d = 2) drivers
# ---------------------------------------------------------------------------

def test_vie2_vec_fft_path_accuracy():
    # time_step keeps T = 3.6: with the rational spec's K = 1 the second-kind
    # resolvent grows like e^t, so longer horizons amplify discretization
    # error past TOLERANCE. mesh_divs = 80 is what engages the FFT path.
    d = make_coupled_data_nd(
        [VIE2_SPEC_SMOOTH, VIE2_SPEC_RATIONAL], [[1, 1], [1, -1]],
        time_step=0.005, coll_divs=3, coll_choices=[0, 1, 2, 3],
        num_blocks=FFT_BLOCKS)
    soln = solve_VIE_2(
        kernel_values=d["kernel"], g_values=d["g"],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"])
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vide_vec_fft_path_accuracy():
    # As above: the log spec's a = 1 gives e^t error growth, so keep T = 3.6.
    d = make_coupled_data_nd(
        [VIDE_SPEC_SMOOTH, VIDE_SPEC_LOG], [[1, 1], [1, -1]],
        time_step=0.005, coll_divs=3, coll_choices=[1, 2, 3],
        num_blocks=FFT_BLOCKS)
    soln = solve_VIDE(
        kernel_values=d["kernel"], a_values=d["a"], g_values=d["g"],
        soln_init_value=d["soln_init_value"],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"])
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


# ---------------------------------------------------------------------------
# 2. Runtime-dimension (d > 8) drivers, value-checked at d = 10
# ---------------------------------------------------------------------------

def test_vie1_runtime_d10_accuracy():
    specs = 2 * [VIE1_SPEC_POLY_A, VIE1_SPEC_POLY_B, VIE1_SPEC_SMOOTH,
                 VIE1_SPEC_POLY, VIE1_SPEC_DAMPED]
    d = make_coupled_data_nd(
        specs, coupling_matrix(10),
        time_step=0.01, coll_divs=3, coll_choices=[1, 2, 3], num_blocks=40)
    soln = solve_VIE_1(
        kernel_values=d["kernel"], g_values=d["g"],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"])
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vie2_runtime_d10_accuracy():
    specs = 2 * [VIE2_SPEC_SMOOTH, VIE2_SPEC_EXP, VIE2_SPEC_POLY,
                 VIE2_SPEC_RATIONAL, VIE2_SPEC_POLY2]
    d = make_coupled_data_nd(
        specs, coupling_matrix(10),
        time_step=0.01, coll_divs=3, coll_choices=[0, 1, 2, 3], num_blocks=40)
    soln = solve_VIE_2(
        kernel_values=d["kernel"], g_values=d["g"],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"])
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


def test_vide_runtime_d10_accuracy():
    specs = 2 * [VIDE_SPEC_POLY_A, VIDE_SPEC_POLY_B, VIDE_SPEC_SMOOTH,
                 VIDE_SPEC_ODE, VIDE_SPEC_LOG]
    d = make_coupled_data_nd(
        specs, coupling_matrix(10),
        time_step=0.01, coll_divs=3, coll_choices=[1, 2, 3], num_blocks=40)
    soln = solve_VIDE(
        kernel_values=d["kernel"], a_values=d["a"], g_values=d["g"],
        soln_init_value=d["soln_init_value"],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"])
    assert np.max(np.abs(soln - d["exact"])) < TOLERANCE


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


def test_vie2_runtime_d9_return_function_matches_scalar():
    d = make_coupled_data_nd(
        VIE2_SPECS_9, np.eye(9),
        time_step=0.01, coll_divs=3, coll_choices=[0, 1, 2], num_blocks=10)
    _, f_vec = solve_VIE_2(
        kernel_values=d["kernel"], g_values=d["g"],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"], return_function=True,
        show_warnings=False)
    for i, spec in enumerate(VIE2_SPECS_9):
        s = as_array(spec, time_step=0.01, coll_divs=3,
                     coll_choices=[0, 1, 2], num_blocks=10)
        _, f_s = solve_VIE_2(
            kernel_values=s["kernel"], g_values=s["g"],
            time_step=s["time_step"], coll_divs=s["coll_divs"],
            coll_choices=s["coll_choices"], return_function=True,
            show_warnings=False)
        for t in _poly_eval_points(d):
            assert abs(np.asarray(f_vec(t)).ravel()[i] - float(f_s(t))) < 1e-9


def test_vie1_runtime_d9_return_function_matches_scalar():
    d = make_coupled_data_nd(
        VIE1_SPECS_9, np.eye(9),
        time_step=0.01, coll_divs=3, coll_choices=[1, 2, 3], num_blocks=10)
    _, f_vec = solve_VIE_1(
        kernel_values=d["kernel"], g_values=d["g"],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"], return_function=True,
        show_warnings=False)
    for i, spec in enumerate(VIE1_SPECS_9):
        s = as_array(spec, time_step=0.01, coll_divs=3,
                     coll_choices=[1, 2, 3], num_blocks=10)
        _, f_s = solve_VIE_1(
            kernel_values=s["kernel"], g_values=s["g"],
            time_step=s["time_step"], coll_divs=s["coll_divs"],
            coll_choices=s["coll_choices"], return_function=True,
            show_warnings=False)
        for t in _poly_eval_points(d):
            assert abs(np.asarray(f_vec(t)).ravel()[i] - float(f_s(t))) < 1e-9


def test_vie1_runtime_d9_force_continuous_return_function_matches_scalar():
    d = make_coupled_data_nd(
        VIE1_SPECS_9, np.eye(9),
        time_step=0.01, coll_divs=3, coll_choices=[1, 2, 3], num_blocks=10)
    _, f_vec = solve_VIE_1(
        kernel_values=d["kernel"], g_values=d["g"],
        soln_init_value=d["exact"][0], force_continuous=True,
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"], return_function=True,
        show_warnings=False)
    for i, spec in enumerate(VIE1_SPECS_9):
        s = as_array(spec, time_step=0.01, coll_divs=3,
                     coll_choices=[1, 2, 3], num_blocks=10)
        _, f_s = solve_VIE_1(
            kernel_values=s["kernel"], g_values=s["g"],
            soln_init_value=s["exact"][0], force_continuous=True,
            time_step=s["time_step"], coll_divs=s["coll_divs"],
            coll_choices=s["coll_choices"], return_function=True,
            show_warnings=False)
        for t in _poly_eval_points(d):
            assert abs(np.asarray(f_vec(t)).ravel()[i] - float(f_s(t))) < 1e-9


def test_vide_runtime_d9_return_function_matches_scalar():
    d = make_coupled_data_nd(
        VIDE_SPECS_9, np.eye(9),
        time_step=0.01, coll_divs=3, coll_choices=[1, 2, 3], num_blocks=10)
    _, f_vec = solve_VIDE(
        kernel_values=d["kernel"], a_values=d["a"], g_values=d["g"],
        soln_init_value=d["soln_init_value"],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"], return_function=True,
        show_warnings=False)
    for i, spec in enumerate(VIDE_SPECS_9):
        s = as_array(spec, time_step=0.01, coll_divs=3,
                     coll_choices=[1, 2, 3], num_blocks=10)
        _, f_s = solve_VIDE(
            kernel_values=s["kernel"], a_values=s["a"], g_values=s["g"],
            soln_init_value=s["soln_init_value"],
            time_step=s["time_step"], coll_divs=s["coll_divs"],
            coll_choices=s["coll_choices"], return_function=True,
            show_warnings=False)
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

def _vie2_soln_at_blocks(num_blocks, coll_divs=2, coll_choices=[0, 1, 2],
                         time_step=0.004):
    d = as_array(VIE2_SPEC_SMOOTH, time_step=time_step, coll_divs=coll_divs,
                 coll_choices=coll_choices, num_blocks=num_blocks)
    soln = solve_VIE_2(
        kernel_values=d["kernel"], g_values=d["g"],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"], show_warnings=False)
    return soln, d


def test_fft_cutoff_boundary_accuracy():
    for num_blocks in (63, 64, 65):
        soln, d = _vie2_soln_at_blocks(num_blocks)
        assert np.max(np.abs(soln - d["exact"])) < 1e-5


def test_fft_vs_direct_prefix_consistency():
    # Q = 63: every merge is direct. Q = 64: the S = 32 merge at boundary 32
    # gets output width 32 and routes through the FFT. The first 63 blocks
    # solve identical collocation equations either way.
    s63, _ = _vie2_soln_at_blocks(63)
    s64, _ = _vie2_soln_at_blocks(64)
    n_shared = 63 * 4  # samples strictly before the 63rd mesh boundary
    scale = np.max(np.abs(s63[:n_shared]))
    assert np.max(np.abs(s63[:n_shared] - s64[:n_shared])) < 1e-12 * scale


def test_clamped_merge_prefix_consistency():
    # Q = 129 = 2^7 + 1 appends the pathological clamped tail merges after
    # the full power-of-two schedule of Q = 128.
    s128, _ = _vie2_soln_at_blocks(128)
    s129, _ = _vie2_soln_at_blocks(129)
    n_shared = 128 * 4
    scale = np.max(np.abs(s128[:n_shared]))
    assert np.max(np.abs(s128[:n_shared] - s129[:n_shared])) < 1e-12 * scale


def test_runtime_d10_fft_boundary_prefix_consistency():
    # Same boundary check through the runtime-dimension (d > 8) driver.
    def solve_at(num_blocks):
        d = make_coupled_data_nd(
            [VIE2_SPEC_SMOOTH, VIE2_SPEC_EXP, VIE2_SPEC_POLY,
             VIE2_SPEC_RATIONAL, VIE2_SPEC_POLY2] * 2, coupling_matrix(10),
            time_step=0.004, coll_divs=2, coll_choices=[0, 1, 2],
            num_blocks=num_blocks)
        return solve_VIE_2(
            kernel_values=d["kernel"], g_values=d["g"],
            time_step=d["time_step"], coll_divs=d["coll_divs"],
            coll_choices=d["coll_choices"], show_warnings=False)
    s63 = solve_at(63)
    s64 = solve_at(64)
    n_shared = 63 * 4
    scale = np.max(np.abs(s63[:n_shared]))
    assert np.max(np.abs(s63[:n_shared] - s64[:n_shared])) < 1e-12 * scale


# ---------------------------------------------------------------------------
# 5. Top of the compiled collocation range: coll_divs = 4 with p = 5 choices
# (the largest compiled setting; everything above falls back or errors).
# ---------------------------------------------------------------------------

def test_vie2_largest_compiled_setting_accuracy():
    d = as_array(VIE2_SPEC_SMOOTH, time_step=0.002, coll_divs=4,
                 coll_choices=[0, 1, 2, 3, 4], num_blocks=10)
    soln = solve_VIE_2(
        kernel_values=d["kernel"], g_values=d["g"],
        time_step=d["time_step"], coll_divs=d["coll_divs"],
        coll_choices=d["coll_choices"], show_warnings=False)
    assert np.max(np.abs(soln - d["exact"])) < 1e-6
