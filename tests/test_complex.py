"""Tests for complex-valued Volterra equation solvers.

Each test constructs a complex-valued problem with a known analytic solution
and verifies the solver produces the correct result. The complex support
works by decomposing into a doubled-dimension real system, so we also verify
that pure-real inputs still produce real (not complex) outputs.
"""
import numpy as np
import pytest
from voles import solve_vie1, solve_vie2, solve_vide
from conftest import TOLERANCE
from conftest import run, with_sol


# ---------------------------------------------------------------------------
# Helper: build time grid
# ---------------------------------------------------------------------------

def _times(time_step, coll_divs, n_mesh=10):
    num_pts = n_mesh * coll_divs**2 + 1
    return np.arange(num_pts) * time_step


# ---------------------------------------------------------------------------
# solve_VIE_2 complex tests
# ---------------------------------------------------------------------------

class TestVIE2Complex:
    """Scalar complex VIE-2: K(s) = exp(-s), exact y(t) = exp(it)."""

# Checked using Mathematica commands:
# g[t_] := Exp[I t] - (1 - I)/2 (Exp[I t] - Exp[-t]);
# K[s_] := Exp[-s];
# expected[t_] := Exp[I t];
# rhs = g[t] + Integrate[K[t - s] expected[s], {s, 0, t}];
# Simplify[rhs] == expected[t]
    def setup_method(self):
        self.time_step = 0.05
        self.coll_divs = 3
        self.coll_choices = [0, 1, 2, 3]
        self.times = _times(self.time_step, self.coll_divs)
        self.kernel = np.exp(-self.times).astype(complex)
        self.exact = np.exp(1j * self.times)
        # g(t) = y(t) - integral_0^t K(t-s) y(s) ds
        # integral_0^t exp(-(t-s)) exp(is) ds = exp(it)/(1+i) - exp(-t)/(1+i)
        #   = (1-i)/2 * (exp(it) - exp(-t))
        integral = (1 - 1j) / 2 * (np.exp(1j * self.times) - np.exp(-self.times))
        self.g = self.exact - integral

    def test_accuracy(self, quadrature):
        soln = solve_vie2(kernel=self.kernel, g=self.g, dt=self.time_step, quadrature=quadrature, coll_setting=(self.coll_divs, self.coll_choices)).y
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE

    def test_return_polys(self, quadrature):
        soln, polys = with_sol(solve_vie2(kernel=self.kernel, g=self.g, dt=self.time_step, quadrature=quadrature, coll_setting=(self.coll_divs, self.coll_choices)))
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE
        # Polynomials should evaluate to complex values
        h = self.coll_divs**2 * self.time_step
        t_mid = 0.5 * h
        val = polys[0](t_mid)
        assert np.iscomplexobj(val)
        assert abs(val - np.exp(1j * t_mid)) < TOLERANCE


class TestVIE2ComplexPurelyImaginaryKernel:
    """Scalar VIE-2 with purely imaginary kernel: K(s) = i."""

    def setup_method(self):
        self.time_step = 0.05
        self.coll_divs = 3
        self.coll_choices = [0, 1, 2, 3]
        self.times = _times(self.time_step, self.coll_divs)
        N = len(self.times)
        self.kernel = 1j * np.ones(N)
        # exact y(t) = exp(it): y = g + integral[i * exp(is)] ds
        # integral = i * (exp(it) - 1) / i = exp(it) - 1 (wait, let me redo)
        # integral_0^t i * exp(is) ds  ... K(t-s) = i (constant), y(s) = exp(is)
        # = i * integral_0^t exp(is) ds = i * (exp(it) - 1) / i = exp(it) - 1
        self.exact = np.exp(1j * self.times)
        self.g = self.exact - (np.exp(1j * self.times) - 1)  # = 1+0j

    def test_accuracy(self, quadrature):
        soln = solve_vie2(kernel=self.kernel, g=self.g, dt=self.time_step, quadrature=quadrature, coll_setting=(self.coll_divs, self.coll_choices)).y
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE


class TestVIE2ComplexVector:
    """2D complex vector VIE-2: diagonal K = exp(-s)*I, exact y_r = exp(it)."""

    def setup_method(self):
        self.time_step = 0.05
        self.coll_divs = 3
        self.coll_choices = [0, 1, 2, 3]
        self.times = _times(self.time_step, self.coll_divs)
        N = len(self.times)
        k1d = np.exp(-self.times).astype(complex)
        self.kernel = np.zeros((N, 2, 2), dtype=complex)
        self.kernel[:, 0, 0] = k1d
        self.kernel[:, 1, 1] = k1d
        self.exact_1d = np.exp(1j * self.times)
        integral = (1 - 1j) / 2 * (np.exp(1j * self.times) - np.exp(-self.times))
        g1d = self.exact_1d - integral
        self.g = np.column_stack([g1d, g1d])
        self.exact = np.column_stack([self.exact_1d, self.exact_1d])

    def test_accuracy(self, quadrature):
        soln = solve_vie2(kernel=self.kernel, g=self.g, dt=self.time_step, quadrature=quadrature, coll_setting=(self.coll_divs, self.coll_choices)).y
        assert np.iscomplexobj(soln)
        assert soln.shape == self.exact.shape
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE

    def test_matches_scalar(self, quadrature):
        """Vector solve with diagonal kernel should match scalar solve."""
        soln_vec = solve_vie2(kernel=self.kernel, g=self.g, dt=self.time_step, quadrature=quadrature, coll_setting=(self.coll_divs, self.coll_choices)).y
        soln_scalar = solve_vie2(kernel=self.kernel[:, 0, 0], g=self.g[:, 0], dt=self.time_step, quadrature=quadrature, coll_setting=(self.coll_divs, self.coll_choices)).y
        assert np.max(np.abs(soln_vec[:, 0] - soln_scalar)) < TOLERANCE
        assert np.max(np.abs(soln_vec[:, 1] - soln_scalar)) < TOLERANCE


# ---------------------------------------------------------------------------
# solve_VIE_1 complex tests
# ---------------------------------------------------------------------------

class TestVIE1Complex:
    """Scalar complex VIE-1: K(s) = exp(s), exact y(t) = exp(it).

    g(t) = integral_0^t exp(t-s) exp(is) ds
         = exp(t) * integral_0^t exp(s(i-1)) ds
         = exp(t) * (exp(t(i-1)) - 1) / (i-1)
         = (exp(it) - exp(t)) / (i-1)
         = (exp(it) - exp(t)) * (i+1) / ((i-1)(i+1))
         = (exp(it) - exp(t)) * (i+1) / (-2)
         = (exp(t) - exp(it)) * (1+i) / 2
    """

    def setup_method(self):
        self.time_step = 0.01
        self.coll_divs = 3
        self.coll_choices = [1, 2, 3]
        self.times = _times(self.time_step, self.coll_divs)
        self.kernel = np.exp(self.times).astype(complex)
        self.exact = np.exp(1j * self.times)
        self.g = (np.exp(self.times) - np.exp(1j * self.times)) * (1 + 1j) / 2
        self.g[0] = 0.0  # g(0) = 0 for VIE-1

    def test_accuracy(self, quadrature):
        soln = solve_vie1(kernel=self.kernel, g=self.g, dt=self.time_step, quadrature=quadrature, coll_setting=(self.coll_divs, self.coll_choices)).y
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE

    def test_return_polys(self, quadrature):
        soln, polys = with_sol(solve_vie1(kernel=self.kernel, g=self.g, dt=self.time_step, quadrature=quadrature, coll_setting=(self.coll_divs, self.coll_choices)))
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE
        h = self.coll_divs**2 * self.time_step
        t_mid = 0.5 * h
        val = polys[0](t_mid)
        assert np.iscomplexobj(val)

    def test_force_continuous(self, quadrature):
        soln = solve_vie1(kernel=self.kernel, g=self.g, y0=1.0 + 0j, dt=self.time_step, quadrature=quadrature, coll_setting=(self.coll_divs, self.coll_choices), continuous=True).y
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE


class TestVIE1ComplexVector:
    """2D complex vector VIE-1: same as scalar but wrapped in diagonal 2x2."""

    def setup_method(self):
        self.time_step = 0.01
        self.coll_divs = 3
        self.coll_choices = [1, 2, 3]
        self.times = _times(self.time_step, self.coll_divs)
        N = len(self.times)
        k1d = np.exp(self.times).astype(complex)
        self.kernel = np.zeros((N, 2, 2), dtype=complex)
        self.kernel[:, 0, 0] = k1d
        self.kernel[:, 1, 1] = k1d
        exact_1d = np.exp(1j * self.times)
        g1d = (np.exp(self.times) - np.exp(1j * self.times)) * (1 + 1j) / 2
        g1d[0] = 0.0
        self.g = np.column_stack([g1d, g1d])
        self.exact = np.column_stack([exact_1d, exact_1d])

    def test_accuracy(self, quadrature):
        soln = solve_vie1(kernel=self.kernel, g=self.g, dt=self.time_step, quadrature=quadrature, coll_setting=(self.coll_divs, self.coll_choices)).y
        assert np.iscomplexobj(soln)
        assert soln.shape == self.exact.shape
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE


# ---------------------------------------------------------------------------
# solve_VIDE complex tests
# ---------------------------------------------------------------------------

class TestVIDEComplex:
    """Scalar complex VIDE: K(s) = exp(-s), a(t) = i, exact y(t) = exp((1+i)t).

    y'(t) = i*y(t) + g(t) + integral_0^t exp(-(t-s)) y(s) ds
    y(0) = 1

    y'(t) = (1+i) exp((1+i)t)
    i*y(t) = i*exp((1+i)t)
    integral = exp(-t) * integral_0^t exp(s) exp((1+i)s) ds
             = exp(-t) * integral_0^t exp((2+i)s) ds
             = exp(-t) * (exp((2+i)t) - 1) / (2+i)
             = (exp((1+i)t) - exp(-t)) / (2+i)

    g(t) = y'(t) - i*y(t) - integral
         = (1+i) exp((1+i)t) - i*exp((1+i)t) - (exp((1+i)t) - exp(-t))/(2+i)
         = exp((1+i)t) - (exp((1+i)t) - exp(-t))/(2+i)
         = exp((1+i)t) * (1 - 1/(2+i)) + exp(-t)/(2+i)
         = exp((1+i)t) * (1+i)/(2+i) + exp(-t)/(2+i)
    """

    def setup_method(self):
        self.time_step = 0.01
        self.coll_divs = 3
        self.coll_choices = [1, 2, 3]
        self.times = _times(self.time_step, self.coll_divs)
        N = len(self.times)
        self.kernel = np.exp(-self.times).astype(complex)
        self.a = 1j * np.ones(N)
        self.exact = np.exp((1 + 1j) * self.times)
        self.g = (self.exact * (1 + 1j) / (2 + 1j)
                  + np.exp(-self.times) / (2 + 1j))
        self.soln_init = 1.0 + 0j

    def test_accuracy(self, quadrature):
        soln = solve_vide(kernel=self.kernel, a=self.a, g=self.g, y0=self.soln_init, dt=self.time_step, quadrature=quadrature, coll_setting=(self.coll_divs, self.coll_choices)).y
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE

    def test_return_polys(self, quadrature):
        soln, polys = with_sol(solve_vide(kernel=self.kernel, a=self.a, g=self.g, y0=self.soln_init, dt=self.time_step, quadrature=quadrature, coll_setting=(self.coll_divs, self.coll_choices)))
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE
        h = self.coll_divs**2 * self.time_step
        t_mid = 0.5 * h
        val = polys[0](t_mid)
        assert np.iscomplexobj(val)


class TestVIDEComplexVector:
    """2D complex vector VIDE with diagonal kernel and a."""

    def setup_method(self):
        self.time_step = 0.01
        self.coll_divs = 3
        self.coll_choices = [1, 2, 3]
        self.times = _times(self.time_step, self.coll_divs)
        N = len(self.times)
        k1d = np.exp(-self.times).astype(complex)
        self.kernel = np.zeros((N, 2, 2), dtype=complex)
        self.kernel[:, 0, 0] = k1d
        self.kernel[:, 1, 1] = k1d
        a1d = 1j * np.ones(N)
        self.a = np.zeros((N, 2, 2), dtype=complex)
        self.a[:, 0, 0] = a1d
        self.a[:, 1, 1] = a1d
        exact_1d = np.exp((1 + 1j) * self.times)
        g1d = (exact_1d * (1 + 1j) / (2 + 1j)
               + np.exp(-self.times) / (2 + 1j))
        self.g = np.column_stack([g1d, g1d])
        self.exact = np.column_stack([exact_1d, exact_1d])
        self.soln_init = np.array([1.0 + 0j, 1.0 + 0j])

    def test_accuracy(self, quadrature):
        soln = solve_vide(kernel=self.kernel, a=self.a, g=self.g, y0=self.soln_init, dt=self.time_step, quadrature=quadrature, coll_setting=(self.coll_divs, self.coll_choices)).y
        assert np.iscomplexobj(soln)
        assert soln.shape == self.exact.shape
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE


# ---------------------------------------------------------------------------
# Plain Python lists of complex numbers
# ---------------------------------------------------------------------------

def _complex_list_inputs():
    """9-point complex lists, valid for coll_divs=2."""
    return [complex(x, x * 0.1) for x in range(9)]


def _vie1_cplx(**kw):
    # VIE-1 needs K(0) != 0 (the shared lists start at 0; g(0) = 0 is fine).
    base = dict(kernel=[complex(1 + 0.1 * x, 0.05 * x) for x in range(9)], g=_complex_list_inputs(), coll_setting=(2, [1, 2]))
    base.update(kw)
    return solve_vie1(**base).y


def _vie2_cplx(**kw):
    base = dict(kernel=_complex_list_inputs(), g=_complex_list_inputs(), coll_setting=(2, [0, 1, 2]))
    base.update(kw)
    return solve_vie2(**base).y


def _vide_cplx(**kw):
    base = dict(kernel=_complex_list_inputs(), g=_complex_list_inputs(), a=_complex_list_inputs(), y0=1+0.5j, coll_setting=(2, [0, 1, 2]))
    base.update(kw)
    return solve_vide(**base).y


@pytest.mark.parametrize("solver", [_vie1_cplx, _vie2_cplx, _vide_cplx])
def test_list_complex_kernel_values(solver):
    """Plain Python lists of complex numbers are accepted for kernel_values."""
    soln = solver()
    assert np.iscomplexobj(soln)


@pytest.mark.parametrize("solver", [_vie1_cplx, _vie2_cplx, _vide_cplx])
def test_list_complex_g_values(solver):
    """Plain Python lists of complex numbers are accepted for g_values."""
    soln = solver(g=_complex_list_inputs())
    assert np.iscomplexobj(soln)


# ---------------------------------------------------------------------------
# Mixed real/complex inputs
# ---------------------------------------------------------------------------

class TestMixedInputs:
    """Real kernel + complex g should promote to complex output."""

    def test_vie2_real_kernel_complex_g(self, quadrature):
        time_step = 0.05
        coll_divs = 3
        coll_choices = [0, 1, 2, 3]
        times = _times(time_step, coll_divs)
        kernel = np.exp(-times)  # real
        exact = np.exp(1j * times)
        integral = (1 - 1j) / 2 * (np.exp(1j * times) - np.exp(-times))
        g = exact - integral  # complex
        soln = solve_vie2(kernel=kernel, g=g, dt=time_step, quadrature=quadrature, coll_setting=(coll_divs, coll_choices)).y
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - exact)) < TOLERANCE

    def test_vide_real_kernel_complex_a(self, quadrature):
        """Real kernel, complex a, complex init."""
        time_step = 0.01
        coll_divs = 3
        coll_choices = [1, 2, 3]
        times = _times(time_step, coll_divs)
        N = len(times)
        kernel = np.exp(-times)  # real
        a = 1j * np.ones(N)  # complex
        exact = np.exp((1 + 1j) * times)
        g = (exact * (1 + 1j) / (2 + 1j) + np.exp(-times) / (2 + 1j))
        soln = solve_vide(kernel=kernel, a=a, g=g, y0=1.0 + 0j, dt=time_step, quadrature=quadrature, coll_setting=(coll_divs, coll_choices)).y
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - exact)) < TOLERANCE


# ---------------------------------------------------------------------------
# Real inputs still produce real outputs
# ---------------------------------------------------------------------------

def test_real_inputs_stay_real(quadrature):
    """Passing real arrays must return real (not complex) arrays."""
    time_step = 0.05
    coll_divs = 3
    coll_choices = [0, 1, 2, 3]
    times = _times(time_step, coll_divs)
    kernel = np.exp(-times)
    g = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
    soln = solve_vie2(kernel=kernel, g=g, dt=time_step, quadrature=quadrature, coll_setting=(coll_divs, coll_choices)).y
    assert not np.iscomplexobj(soln)
    assert soln.dtype == np.float64


# ---------------------------------------------------------------------------
# Matrix-valued complex
# ---------------------------------------------------------------------------

class TestVIE2ComplexMatrix:
    """Matrix-valued complex VIE-2: (N, 2, 2) kernel, (N, 2, 2) g."""

    def setup_method(self):
        self.time_step = 0.05
        self.coll_divs = 3
        self.coll_choices = [0, 1, 2, 3]
        self.times = _times(self.time_step, self.coll_divs)
        N = len(self.times)
        k1d = np.exp(-self.times).astype(complex)
        self.kernel = np.zeros((N, 2, 2), dtype=complex)
        self.kernel[:, 0, 0] = k1d
        self.kernel[:, 1, 1] = k1d
        exact_1d = np.exp(1j * self.times)
        integral = (1 - 1j) / 2 * (np.exp(1j * self.times) - np.exp(-self.times))
        g1d = exact_1d - integral
        # (N, 2, 2) g and exact
        self.g = np.zeros((N, 2, 2), dtype=complex)
        self.g[:, 0, 0] = g1d
        self.g[:, 1, 0] = g1d
        self.g[:, 0, 1] = g1d
        self.g[:, 1, 1] = g1d
        self.exact = np.zeros((N, 2, 2), dtype=complex)
        self.exact[:, 0, 0] = exact_1d
        self.exact[:, 1, 0] = exact_1d
        self.exact[:, 0, 1] = exact_1d
        self.exact[:, 1, 1] = exact_1d

    def test_accuracy(self, quadrature):
        soln = solve_vie2(kernel=self.kernel, g=self.g, dt=self.time_step, quadrature=quadrature, coll_setting=(self.coll_divs, self.coll_choices)).y
        assert np.iscomplexobj(soln)
        assert soln.shape == self.exact.shape
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE


# ---------------------------------------------------------------------------
# Notebook-bug regression: large-d complex matrix-valued VIE-1 -> VIDE chain.
#
# Before the _truncate_N fix, calling solve_VIE_1 with too-short input plus
# large coll_divs silently truncated to mesh_divs=0 and the D extension
# aborted via an uncatchable ArrayIndexError. This test exercises a
# *long-enough* input at the same large d (49) the user's notebook used,
# to confirm the workflow itself runs cleanly when N >= coll_divs**2 + 1.
# ---------------------------------------------------------------------------

def test_complex_matrix_valued_d49_workflow_smoke(quadrature):
    d = 49
    N = 19  # = 2 * coll_divs**2 + 1 for coll_divs=3, so mesh_divs = 2

    rng = np.random.default_rng(0)
    # A well-posed first-kind problem at the same size (the old random-noise
    # data had no meaningful solution): smooth kernel with K(0) close to I,
    # right-hand side with lhs(0) = 0.
    t = np.arange(N, dtype=float)[:, None, None]
    R1, R2, R3 = ((rng.standard_normal((d, d)) + 1j * rng.standard_normal((d, d)))
                  / np.sqrt(2 * d) for _ in range(3))
    C = (np.eye(d) + 0.1 * np.exp(-0.2 * t) * R1).astype(np.complex128)
    lhs = (0.1 * t * R2 + 0.01 * t ** 2 * R3).astype(np.complex128)
    L = (rng.standard_normal((d, d))
         + 1j * rng.standard_normal((d, d))).astype(np.complex128)

    K = solve_vie1(g=lhs, kernel=C, dt=1.0, quadrature=quadrature, coll_setting=(3, [1, 2, 3])).y
    assert K.shape == (N, d, d)
    assert K.dtype == np.complex128
    assert np.all(np.isfinite(K))

    a_arr = np.broadcast_to(L, K.shape).copy()
    soln = solve_vide(kernel=K, a=a_arr, y0=C[0], dt=1.0, quadrature=quadrature, coll_setting=(3, [0, 1, 2, 3])).y
    assert soln.shape == (N, d, d)
    assert soln.dtype == np.complex128
    assert np.all(np.isfinite(soln))


# ---------------------------------------------------------------------------
# Complex vector crossing the runtime-dimension boundary.
#
# The real-block embedding doubles d, so complex d = 5 runs on the runtime
# (d > 8) driver. A diagonal system decouples, so both the sampled solution
# and the returned polynomials must match per-component scalar complex
# solves (regression: the runtime drivers used to return all-zero
# polynomial coefficients).
# ---------------------------------------------------------------------------

def test_complex_vector_d5_runtime_return_function_matches_scalar(quadrature):
    N, ts, d = 91, 0.01, 5
    t = np.linspace(0.0, ts * (N - 1), N)
    K = np.zeros((N, d, d), dtype=complex)
    g = np.zeros((N, d), dtype=complex)
    for i in range(d):
        K[:, i, i] = (0.5 + 0.3j) * np.exp(-(1 + 0.1 * i) * t)
        g[:, i] = np.sin(t + 0.1 * i) + 1j * np.cos(0.2 * i * t)

    soln, f_vec = with_sol(run(solve_vie2, show_warnings=False, kernel=K, g=g, dt=ts, quadrature=quadrature, coll_setting=(3, [0, 1, 2])))
    assert soln.dtype == np.complex128

    for i in range(d):
        s_soln, f_s = with_sol(run(solve_vie2, show_warnings=False, kernel=K[:, i, i].copy(), g=g[:, i].copy(), dt=ts, quadrature=quadrature, coll_setting=(3, [0, 1, 2])))
        assert np.max(np.abs(soln[:, i] - s_soln)) < 1e-9
        for tt in (0.13, 0.45, 0.77):
            v_vec = np.asarray(f_vec(tt)).ravel()[i]
            v_s = np.asarray(f_s(tt)).ravel()[0]
            assert abs(v_vec - v_s) < 1e-9


def test_complex_solution_object_is_built_from_complex_coefficients():
    """A complex solution object is an ordinary _SolutionFunction with
    complex coefficients: evaluation, lazy Polynomial objects and the list
    protocol all agree with the real block solve it came from. (The former
    wrapper recombined trimmed real polynomials and could fail when their
    coefficient arrays differed in length.)"""
    import voles
    t = np.arange(201) * 0.01
    A = np.array([[1.0, 0.3], [0.1, 0.8]]) * (1 + 0.4j)
    K = np.exp(-t)[:, None, None] * A
    g = np.outer(np.sin(t), [1.0, 1j])
    y, f = with_sol(solve_vie2(kernel=K, g=g, dt=0.01))
    assert isinstance(f._sol, voles.VolterraSolution) and f.coefficients.dtype == np.complex128
    assert len(f) == (len(t) - 1) // 2 and f[3].shape == (2,)   # product mesh: 2 samples
    assert f[3][1].coef.dtype == np.complex128
    assert isinstance(f(0.37), np.ndarray) and f(0.37).shape == (2,)
    np.testing.assert_allclose(f(t[::25]), y[::25], rtol=0, atol=1e-10)
    # the Polynomial objects and the Horner evaluation agree
    n = int(np.searchsorted(f.mesh_breakpoints, 0.37, side="right") - 1)
    np.testing.assert_allclose([p(0.37) for p in f[n]], f(0.37), rtol=0, atol=1e-12)
    # scalar complex problem: a scalar t gives a Python complex
    ys, fs = with_sol(solve_vie2(kernel=np.exp(-t) * (1 + 0.5j), g=np.sin(t) + 0j, dt=0.01))
    assert type(fs(0.37)) is complex
    assert fs(0.0) == pytest.approx(ys[0])
