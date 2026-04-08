"""Tests for complex-valued Volterra equation solvers.

Each test constructs a complex-valued problem with a known analytic solution
and verifies the solver produces the correct result. The complex support
works by decomposing into a doubled-dimension real system, so we also verify
that pure-real inputs still produce real (not complex) outputs.
"""
import numpy as np
import pytest
from volterra_equation_solvers import solve_VIE_1, solve_VIE_2, solve_VIDE
from conftest import TOLERANCE


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

    def test_accuracy(self):
        soln = solve_VIE_2(
            kernel_values=self.kernel, g_values=self.g,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices)
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE

    def test_return_polys(self):
        soln, polys = solve_VIE_2(
            kernel_values=self.kernel, g_values=self.g,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices, return_polys=True)
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

    def test_accuracy(self):
        soln = solve_VIE_2(
            kernel_values=self.kernel, g_values=self.g,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices)
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

    def test_accuracy(self):
        soln = solve_VIE_2(
            kernel_values=self.kernel, g_values=self.g,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices)
        assert np.iscomplexobj(soln)
        assert soln.shape == self.exact.shape
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE

    def test_matches_scalar(self):
        """Vector solve with diagonal kernel should match scalar solve."""
        soln_vec = solve_VIE_2(
            kernel_values=self.kernel, g_values=self.g,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices)
        soln_scalar = solve_VIE_2(
            kernel_values=self.kernel[:, 0, 0], g_values=self.g[:, 0],
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices)
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

    def test_accuracy(self):
        soln = solve_VIE_1(
            kernel_values=self.kernel, g_values=self.g,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices)
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE

    def test_return_polys(self):
        soln, polys = solve_VIE_1(
            kernel_values=self.kernel, g_values=self.g,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices, return_polys=True)
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE
        h = self.coll_divs**2 * self.time_step
        t_mid = 0.5 * h
        val = polys[0](t_mid)
        assert np.iscomplexobj(val)

    def test_force_continuous(self):
        soln = solve_VIE_1(
            kernel_values=self.kernel, g_values=self.g,
            soln_init_value=1.0 + 0j,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices, force_continuous=True)
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

    def test_accuracy(self):
        soln = solve_VIE_1(
            kernel_values=self.kernel, g_values=self.g,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices)
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

    def test_accuracy(self):
        soln = solve_VIDE(
            kernel_values=self.kernel, a_values=self.a,
            g_values=self.g, soln_init_value=self.soln_init,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices)
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE

    def test_return_polys(self):
        soln, polys = solve_VIDE(
            kernel_values=self.kernel, a_values=self.a,
            g_values=self.g, soln_init_value=self.soln_init,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices, return_polys=True)
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

    def test_accuracy(self):
        soln = solve_VIDE(
            kernel_values=self.kernel, a_values=self.a,
            g_values=self.g, soln_init_value=self.soln_init,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices)
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
    base = dict(kernel_values=_complex_list_inputs(),
                g_values=_complex_list_inputs(),
                coll_divs=2, coll_choices=[1, 2])
    base.update(kw)
    return solve_VIE_1(**base)


def _vie2_cplx(**kw):
    base = dict(kernel_values=_complex_list_inputs(),
                g_values=_complex_list_inputs(),
                coll_divs=2, coll_choices=[0, 1, 2])
    base.update(kw)
    return solve_VIE_2(**base)


def _vide_cplx(**kw):
    base = dict(kernel_values=_complex_list_inputs(),
                g_values=_complex_list_inputs(),
                a_values=_complex_list_inputs(),
                soln_init_value=1+0.5j,
                coll_divs=2, coll_choices=[0, 1, 2])
    base.update(kw)
    return solve_VIDE(**base)


@pytest.mark.parametrize("solver", [_vie1_cplx, _vie2_cplx, _vide_cplx])
def test_list_complex_kernel_values(solver):
    """Plain Python lists of complex numbers are accepted for kernel_values."""
    soln = solver()
    assert np.iscomplexobj(soln)


@pytest.mark.parametrize("solver", [_vie1_cplx, _vie2_cplx, _vide_cplx])
def test_list_complex_g_values(solver):
    """Plain Python lists of complex numbers are accepted for g_values."""
    soln = solver(g_values=_complex_list_inputs())
    assert np.iscomplexobj(soln)


# ---------------------------------------------------------------------------
# Mixed real/complex inputs
# ---------------------------------------------------------------------------

class TestMixedInputs:
    """Real kernel + complex g should promote to complex output."""

    def test_vie2_real_kernel_complex_g(self):
        time_step = 0.05
        coll_divs = 3
        coll_choices = [0, 1, 2, 3]
        times = _times(time_step, coll_divs)
        kernel = np.exp(-times)  # real
        exact = np.exp(1j * times)
        integral = (1 - 1j) / 2 * (np.exp(1j * times) - np.exp(-times))
        g = exact - integral  # complex
        soln = solve_VIE_2(
            kernel_values=kernel, g_values=g,
            time_step=time_step, coll_divs=coll_divs,
            coll_choices=coll_choices)
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - exact)) < TOLERANCE

    def test_vide_real_kernel_complex_a(self):
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
        soln = solve_VIDE(
            kernel_values=kernel, a_values=a,
            g_values=g, soln_init_value=1.0 + 0j,
            time_step=time_step, coll_divs=coll_divs,
            coll_choices=coll_choices)
        assert np.iscomplexobj(soln)
        assert np.max(np.abs(soln - exact)) < TOLERANCE


# ---------------------------------------------------------------------------
# Real inputs still produce real outputs
# ---------------------------------------------------------------------------

def test_real_inputs_stay_real():
    """Passing real arrays must return real (not complex) arrays."""
    time_step = 0.05
    coll_divs = 3
    coll_choices = [0, 1, 2, 3]
    times = _times(time_step, coll_divs)
    kernel = np.exp(-times)
    g = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
    soln = solve_VIE_2(
        kernel_values=kernel, g_values=g,
        time_step=time_step, coll_divs=coll_divs,
        coll_choices=coll_choices)
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

    def test_accuracy(self):
        soln = solve_VIE_2(
            kernel_values=self.kernel, g_values=self.g,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices)
        assert np.iscomplexobj(soln)
        assert soln.shape == self.exact.shape
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE
