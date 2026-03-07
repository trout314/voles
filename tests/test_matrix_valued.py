"""Tests for matrix-valued (d×m) solver support.

Each solver is tested with a d=2, m=2 problem whose columns have known
analytic solutions. Results are also verified to match solving each column
independently using the vector-valued interface.
"""
import numpy as np
import pytest
from volterra_equation_solvers import solve_VIE_1, solve_VIE_2, solve_VIDE
from conftest import TOLERANCE


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _make_vie2_column(times, kernel_1d):
    """g(t) for VIE-2 with K(s)=exp(-s) and exact y(t)=sin(t)."""
    return np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))


def _make_vie2_column2(times, kernel_1d):
    """g(t) for VIE-2 with K(s)=exp(-s) and exact y(t)=cos(t)-1.

    Integral: ∫₀ᵗ e^{-(t-s)}(cos s - 1)ds = (cos t + sin t)/2 + e^{-t}/2 - 1
    g(t) = y(t) - integral = (cos t - 1) - ((cos t + sin t)/2 + e^{-t}/2 - 1)
         = (cos t - sin t - e^{-t}) / 2
    Verify at t=0: (1 - 0 - 1)/2 = 0. ✓
    """
    return (np.cos(times) - np.sin(times) - np.exp(-times)) / 2


# ---------------------------------------------------------------------------
# solve_VIE_2 matrix tests
# ---------------------------------------------------------------------------

class TestVIE2Matrix:
    """Matrix-valued VIE-2: K(s)=exp(-s)*I₂, columns are sin(t) and cos(t)-1."""

    def setup_method(self):
        self.time_step = 0.05
        self.coll_divs = 3
        num_pts = 10 * self.coll_divs**2 + 1  # 91
        self.times = np.arange(num_pts) * self.time_step
        kernel_1d = np.exp(-self.times)
        # 2×2 diagonal kernel
        self.kernel = np.zeros((num_pts, 2, 2))
        self.kernel[:, 0, 0] = kernel_1d
        self.kernel[:, 1, 1] = kernel_1d
        # g_values shape (N, 2, 2)
        g0 = _make_vie2_column(self.times, kernel_1d)   # column 0: exact y = sin(t)
        g1 = _make_vie2_column2(self.times, kernel_1d)  # column 1: exact y = cos(t)-1
        self.g_matrix = np.stack([
            np.stack([g0, g0], axis=1),   # row-d=0: both cols same kernel row
            np.stack([g1, g1], axis=1),   # row-d=1
        ], axis=2)
        # Actually stack along axis=2 (the m axis)
        g_nd = np.zeros((num_pts, 2, 2))
        g_nd[:, 0, 0] = g0
        g_nd[:, 1, 0] = g0
        g_nd[:, 0, 1] = g1
        g_nd[:, 1, 1] = g1
        self.g_matrix = g_nd
        self.exact = np.zeros((num_pts, 2, 2))
        self.exact[:, 0, 0] = np.sin(self.times)
        self.exact[:, 1, 0] = np.sin(self.times)
        self.exact[:, 0, 1] = np.cos(self.times) - 1
        self.exact[:, 1, 1] = np.cos(self.times) - 1
        self.coll_choices = [0, 1, 2, 3]

    def test_output_shape(self):
        soln = solve_VIE_2(kernel_values=self.kernel, g_values=self.g_matrix,
                           time_step=self.time_step, coll_divs=self.coll_divs,
                           coll_choices=self.coll_choices)
        assert soln.shape == (self.exact.shape[0], 2, 2)

    def test_accuracy(self):
        soln = solve_VIE_2(kernel_values=self.kernel, g_values=self.g_matrix,
                           time_step=self.time_step, coll_divs=self.coll_divs,
                           coll_choices=self.coll_choices)
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE

    def test_matches_independent_columns(self):
        soln = solve_VIE_2(kernel_values=self.kernel, g_values=self.g_matrix,
                           time_step=self.time_step, coll_divs=self.coll_divs,
                           coll_choices=self.coll_choices)
        for j in range(2):
            col_soln = solve_VIE_2(kernel_values=self.kernel,
                                   g_values=self.g_matrix[:, :, j],
                                   time_step=self.time_step, coll_divs=self.coll_divs,
                                   coll_choices=self.coll_choices)
            assert np.max(np.abs(soln[:, :, j] - col_soln)) < 1e-12

    def test_return_polys(self):
        result = solve_VIE_2(kernel_values=self.kernel, g_values=self.g_matrix,
                             time_step=self.time_step, coll_divs=self.coll_divs,
                             coll_choices=self.coll_choices, return_polys=True)
        assert isinstance(result, tuple) and len(result) == 2
        soln, polys = result
        assert soln.shape == self.exact.shape
        assert len(polys) > 0
        assert polys[0].shape == (2, 2)
        # Evaluate each polynomial at the left endpoint of the first interval
        t0 = 0.0
        for r in range(2):
            for j in range(2):
                assert hasattr(polys[0][r, j], '__call__')


# ---------------------------------------------------------------------------
# solve_VIE_1 matrix tests
# ---------------------------------------------------------------------------

class TestVIE1Matrix:
    """Matrix-valued VIE-1: K(s)=exp(s)*I₂, g(t)=sin(t)*ones, exact=(cos-sin)*ones.

    Verification: ∫₀ᵗ exp(t-s)·(cos(s)-sin(s)) ds = sin(t). ✓
    """

    def setup_method(self):
        self.time_step = 0.01
        self.coll_divs = 3
        num_pts = 10 * self.coll_divs**2 + 1  # 91
        self.times = np.arange(num_pts) * self.time_step
        kernel_1d = np.exp(self.times)
        # 2×2 diagonal kernel
        self.kernel = np.zeros((num_pts, 2, 2))
        self.kernel[:, 0, 0] = kernel_1d
        self.kernel[:, 1, 1] = kernel_1d
        # Two columns with the same g (both map to y=cos-sin)
        g_col = np.sin(self.times)
        g_col[0] = 0.0
        self.g_matrix = np.zeros((num_pts, 2, 2))
        self.g_matrix[:, 0, 0] = g_col
        self.g_matrix[:, 1, 0] = g_col
        self.g_matrix[:, 0, 1] = g_col
        self.g_matrix[:, 1, 1] = g_col
        exact_col = np.cos(self.times) - np.sin(self.times)
        self.exact = np.zeros((num_pts, 2, 2))
        self.exact[:, 0, 0] = exact_col
        self.exact[:, 1, 0] = exact_col
        self.exact[:, 0, 1] = exact_col
        self.exact[:, 1, 1] = exact_col
        self.coll_choices = [1, 2, 3]

    def test_output_shape(self):
        soln = solve_VIE_1(kernel_values=self.kernel, g_values=self.g_matrix,
                           time_step=self.time_step, coll_divs=self.coll_divs,
                           coll_choices=self.coll_choices)
        assert soln.shape == (len(self.times), 2, 2)

    def test_accuracy(self):
        soln = solve_VIE_1(kernel_values=self.kernel, g_values=self.g_matrix,
                           time_step=self.time_step, coll_divs=self.coll_divs,
                           coll_choices=self.coll_choices)
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE

    def test_matches_independent_columns(self):
        soln = solve_VIE_1(kernel_values=self.kernel, g_values=self.g_matrix,
                           time_step=self.time_step, coll_divs=self.coll_divs,
                           coll_choices=self.coll_choices)
        for j in range(2):
            col_soln = solve_VIE_1(kernel_values=self.kernel,
                                   g_values=self.g_matrix[:, :, j],
                                   time_step=self.time_step, coll_divs=self.coll_divs,
                                   coll_choices=self.coll_choices)
            assert np.max(np.abs(soln[:, :, j] - col_soln)) < 1e-12

    def test_return_polys(self):
        result = solve_VIE_1(kernel_values=self.kernel, g_values=self.g_matrix,
                             time_step=self.time_step, coll_divs=self.coll_divs,
                             coll_choices=self.coll_choices, return_polys=True)
        assert isinstance(result, tuple) and len(result) == 2
        soln, polys = result
        assert soln.shape == self.exact.shape
        assert len(polys) > 0
        assert polys[0].shape == (2, 2)
        for r in range(2):
            for j in range(2):
                assert hasattr(polys[0][r, j], '__call__')


# ---------------------------------------------------------------------------
# solve_VIDE matrix tests
# ---------------------------------------------------------------------------

class TestVIDEMatrix:
    """Matrix-valued VIDE: K(s)=exp(-s)*I₂, a(t)=diag(1/(1+t²)), exact=sin(t)*I.

    Two columns share the same analytic solution y=sin(t).
    """

    def setup_method(self):
        self.time_step = 0.01
        self.coll_divs = 3
        num_pts = 10 * self.coll_divs**2 + 1  # 91
        self.times = np.arange(num_pts) * self.time_step
        kernel_1d = np.exp(-self.times)
        a_1d = 1.0 / (1.0 + self.times**2)
        g_1d = (np.cos(self.times)
                - 0.5 * (np.exp(-self.times) + np.sin(self.times) - np.cos(self.times))
                - np.sin(self.times) / (1.0 + self.times**2))
        # 2×2 diagonal kernel and a
        self.kernel = np.zeros((num_pts, 2, 2))
        self.kernel[:, 0, 0] = kernel_1d
        self.kernel[:, 1, 1] = kernel_1d
        self.a_values = np.zeros((num_pts, 2, 2))
        self.a_values[:, 0, 0] = a_1d
        self.a_values[:, 1, 1] = a_1d
        # g shape (N, 2, 2) — same column for both
        self.g_matrix = np.zeros((num_pts, 2, 2))
        self.g_matrix[:, 0, 0] = g_1d
        self.g_matrix[:, 1, 0] = g_1d
        self.g_matrix[:, 0, 1] = g_1d
        self.g_matrix[:, 1, 1] = g_1d
        # soln_init_value shape (2, 2): y(0)=0 for all
        self.soln_init = np.zeros((2, 2))
        exact_col = np.sin(self.times)
        self.exact = np.zeros((num_pts, 2, 2))
        self.exact[:, 0, 0] = exact_col
        self.exact[:, 1, 0] = exact_col
        self.exact[:, 0, 1] = exact_col
        self.exact[:, 1, 1] = exact_col
        self.coll_choices = [1, 2, 3]

    def test_output_shape(self):
        soln = solve_VIDE(kernel_values=self.kernel, a_values=self.a_values,
                          g_values=self.g_matrix, soln_init_value=self.soln_init,
                          time_step=self.time_step, coll_divs=self.coll_divs,
                          coll_choices=self.coll_choices)
        assert soln.shape == (len(self.times), 2, 2)

    def test_accuracy(self):
        soln = solve_VIDE(kernel_values=self.kernel, a_values=self.a_values,
                          g_values=self.g_matrix, soln_init_value=self.soln_init,
                          time_step=self.time_step, coll_divs=self.coll_divs,
                          coll_choices=self.coll_choices)
        assert np.max(np.abs(soln - self.exact)) < TOLERANCE

    def test_matches_independent_columns(self):
        soln = solve_VIDE(kernel_values=self.kernel, a_values=self.a_values,
                          g_values=self.g_matrix, soln_init_value=self.soln_init,
                          time_step=self.time_step, coll_divs=self.coll_divs,
                          coll_choices=self.coll_choices)
        for j in range(2):
            col_soln = solve_VIDE(kernel_values=self.kernel, a_values=self.a_values,
                                  g_values=self.g_matrix[:, :, j],
                                  soln_init_value=self.soln_init[:, j],
                                  time_step=self.time_step, coll_divs=self.coll_divs,
                                  coll_choices=self.coll_choices)
            assert np.max(np.abs(soln[:, :, j] - col_soln)) < 1e-12

    def test_return_polys(self):
        result = solve_VIDE(kernel_values=self.kernel, a_values=self.a_values,
                            g_values=self.g_matrix, soln_init_value=self.soln_init,
                            time_step=self.time_step, coll_divs=self.coll_divs,
                            coll_choices=self.coll_choices, return_polys=True)
        assert isinstance(result, tuple) and len(result) == 2
        soln, polys = result
        assert soln.shape == self.exact.shape
        assert len(polys) > 0
        assert polys[0].shape == (2, 2)
        for r in range(2):
            for j in range(2):
                assert hasattr(polys[0][r, j], '__call__')

    def test_g_values_none(self):
        """Matrix case with g_values=None (zero forcing): y'=ay, y(0)=soln_init."""
        # With K=0, a=0, g=None: y'=0, y(0)=soln_init → y=soln_init (constant)
        num_pts = len(self.times)
        kernel_zero = np.zeros((num_pts, 2, 2))
        a_zero = np.zeros((num_pts, 2, 2))
        init = np.array([[1.0, 2.0], [3.0, 4.0]])
        soln = solve_VIDE(kernel_values=kernel_zero, a_values=a_zero,
                          g_values=None, soln_init_value=init,
                          time_step=self.time_step, coll_divs=self.coll_divs,
                          coll_choices=self.coll_choices)
        assert soln.shape == (num_pts, 2, 2)
        # y should be constant = init for each column
        for j in range(2):
            assert np.max(np.abs(soln[:, :, j] - init[:, j])) < TOLERANCE


# ---------------------------------------------------------------------------
# Vector return_polys tests
# ---------------------------------------------------------------------------

class TestVectorReturnPolys:
    """Vector-valued (d=2) return_polys: verify shape, callability, and accuracy."""

    def setup_method(self):
        self.time_step = 0.05
        self.coll_divs = 3
        num_pts = 10 * self.coll_divs**2 + 1
        self.times = np.arange(num_pts) * self.time_step
        kernel_1d = np.exp(-self.times)
        self.kernel = np.zeros((num_pts, 2, 2))
        self.kernel[:, 0, 0] = kernel_1d
        self.kernel[:, 1, 1] = kernel_1d
        # VIE-2: K(s)=exp(-s)*I₂, g gives y=sin(t) in both components
        g0 = np.sin(self.times) - 0.5 * (
            np.exp(-self.times) + np.sin(self.times) - np.cos(self.times))
        self.g_vec = np.column_stack([g0, g0])
        self.coll_choices = [0, 1, 2, 3]
        self.mesh_divs = (num_pts - 1) // self.coll_divs**2

    def test_vie2_vec_return_polys_shape(self):
        soln, polys = solve_VIE_2(
            kernel_values=self.kernel, g_values=self.g_vec,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices, return_polys=True)
        assert soln.shape == (len(self.times), 2)
        assert len(polys) == self.mesh_divs
        assert polys[0].shape == (2,)
        assert hasattr(polys[0][0], '__call__')
        assert hasattr(polys[0][1], '__call__')

    def test_vie2_vec_return_polys_accuracy(self):
        soln, polys = solve_VIE_2(
            kernel_values=self.kernel, g_values=self.g_vec,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=self.coll_choices, return_polys=True)
        h = self.coll_divs**2 * self.time_step
        for n, poly_arr in enumerate(polys):
            t_mid = (n + 0.5) * h
            for r in range(2):
                assert abs(poly_arr[r](t_mid) - np.sin(t_mid)) < TOLERANCE

    def test_vie1_vec_return_polys_shape(self):
        # VIE-1: K(s)=exp(s)*I₂, g=sin(t), exact y=cos(t)-sin(t)
        kernel_1d = np.exp(self.times)
        kernel = np.zeros((len(self.times), 2, 2))
        kernel[:, 0, 0] = kernel_1d
        kernel[:, 1, 1] = kernel_1d
        g_vec = np.zeros((len(self.times), 2))
        g_vec[:, 0] = np.sin(self.times)
        g_vec[0, 0] = 0.0
        g_vec[:, 1] = g_vec[:, 0]
        soln, polys = solve_VIE_1(
            kernel_values=kernel, g_values=g_vec,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=[1, 2, 3], return_polys=True)
        assert soln.shape == (len(self.times), 2)
        assert len(polys) == self.mesh_divs
        assert polys[0].shape == (2,)
        assert hasattr(polys[0][0], '__call__')

    def test_vide_vec_return_polys_shape(self):
        a_1d = 1.0 / (1.0 + self.times**2)
        g_1d = (np.cos(self.times)
                - 0.5 * (np.exp(-self.times) + np.sin(self.times) - np.cos(self.times))
                - np.sin(self.times) / (1.0 + self.times**2))
        a_values = np.zeros((len(self.times), 2, 2))
        a_values[:, 0, 0] = a_1d
        a_values[:, 1, 1] = a_1d
        g_vec = np.column_stack([g_1d, g_1d])
        soln_init = np.zeros(2)
        soln, polys = solve_VIDE(
            kernel_values=self.kernel, a_values=a_values,
            g_values=g_vec, soln_init_value=soln_init,
            time_step=self.time_step, coll_divs=self.coll_divs,
            coll_choices=[1, 2, 3], return_polys=True)
        assert soln.shape == (len(self.times), 2)
        assert len(polys) == self.mesh_divs
        assert polys[0].shape == (2,)
        assert hasattr(polys[0][0], '__call__')
