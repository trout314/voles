"""Tests that show_warnings controls warning output for all three solvers."""

import numpy as np
import pytest
from volterra_equation_solvers import solve_VIE_1, solve_VIE_2, solve_VIDE


def _make_data(n_pts, time_step=0.01):
    """Create simple test data with n_pts points."""
    times = np.arange(n_pts) * time_step
    kernel = np.exp(-times)
    g = np.sin(times)
    return kernel, g, time_step


class TestTruncationWarning:
    """Truncation warning when length isn't (multiple of coll_divs²) + 1."""

    def _bad_length_data(self, coll_divs=3):
        # 91 = 10*9+1 is valid; 90 is not
        n_pts = 90
        return _make_data(n_pts)

    def test_vie1_truncation_warns(self, capsys):
        kernel, g, h = self._bad_length_data()
        g[0] = 0.0
        solve_VIE_1(kernel_values=kernel, g_values=g, time_step=h,
                     coll_divs=3, coll_choices=[1, 2, 3], show_warnings=True)
        assert "truncated" in capsys.readouterr().out.lower()

    def test_vie1_truncation_silent(self, capsys):
        kernel, g, h = self._bad_length_data()
        g[0] = 0.0
        solve_VIE_1(kernel_values=kernel, g_values=g, time_step=h,
                     coll_divs=3, coll_choices=[1, 2, 3], show_warnings=False)
        assert capsys.readouterr().out == ""

    def test_vie2_truncation_warns(self, capsys):
        kernel, g, h = self._bad_length_data()
        solve_VIE_2(kernel_values=kernel, g_values=g, time_step=h,
                     coll_divs=3, coll_choices=[0, 1, 2, 3], show_warnings=True)
        assert "truncated" in capsys.readouterr().out.lower()

    def test_vie2_truncation_silent(self, capsys):
        kernel, g, h = self._bad_length_data()
        solve_VIE_2(kernel_values=kernel, g_values=g, time_step=h,
                     coll_divs=3, coll_choices=[0, 1, 2, 3], show_warnings=False)
        assert capsys.readouterr().out == ""

    def test_vide_truncation_warns(self, capsys):
        kernel, g, h = self._bad_length_data()
        solve_VIDE(kernel_values=kernel, g_values=g, soln_init_value=0.0,
                    time_step=h, coll_divs=3, coll_choices=[0, 1, 2], show_warnings=True)
        assert "truncated" in capsys.readouterr().out.lower()

    def test_vide_truncation_silent(self, capsys):
        kernel, g, h = self._bad_length_data()
        solve_VIDE(kernel_values=kernel, g_values=g, soln_init_value=0.0,
                    time_step=h, coll_divs=3, coll_choices=[0, 1, 2], show_warnings=False)
        assert capsys.readouterr().out == ""


class TestNumbaFallbackWarning:
    """Fallback warning when collocation setting isn't compiled in D extension."""

    # Use coll_divs=5 which is unlikely to be compiled
    def _unsupported_data(self):
        kernel, g, h = _make_data(5**2 + 1)
        return kernel, g, h

    def test_vie2_fallback_warns(self, capsys):
        kernel, g, h = self._unsupported_data()
        try:
            solve_VIE_2(kernel_values=kernel, g_values=g, time_step=h,
                         coll_divs=5, coll_choices=[0, 1, 2, 3, 4, 5],
                         show_warnings=True)
        except NotImplementedError:
            pytest.skip("numba not available")
        assert "falling back" in capsys.readouterr().out.lower()

    def test_vie2_fallback_silent(self, capsys):
        kernel, g, h = self._unsupported_data()
        try:
            solve_VIE_2(kernel_values=kernel, g_values=g, time_step=h,
                         coll_divs=5, coll_choices=[0, 1, 2, 3, 4, 5],
                         show_warnings=False)
        except NotImplementedError:
            pytest.skip("numba not available")
        assert capsys.readouterr().out == ""

    def test_vide_fallback_warns(self, capsys):
        kernel, g, h = self._unsupported_data()
        try:
            solve_VIDE(kernel_values=kernel, g_values=g, soln_init_value=0.0,
                        time_step=h, coll_divs=5, coll_choices=[0, 1, 2, 3, 4, 5],
                        show_warnings=True)
        except NotImplementedError:
            pytest.skip("numba not available")
        assert "falling back" in capsys.readouterr().out.lower()

    def test_vide_fallback_silent(self, capsys):
        kernel, g, h = self._unsupported_data()
        try:
            solve_VIDE(kernel_values=kernel, g_values=g, soln_init_value=0.0,
                        time_step=h, coll_divs=5, coll_choices=[0, 1, 2, 3, 4, 5],
                        show_warnings=False)
        except NotImplementedError:
            pytest.skip("numba not available")
        assert capsys.readouterr().out == ""

    def test_vie1_fallback_warns(self, capsys):
        kernel, g, h = self._unsupported_data()
        g[0] = 0.0
        try:
            solve_VIE_1(kernel_values=kernel, g_values=g, time_step=h,
                         coll_divs=5, coll_choices=[1, 2, 3, 4, 5],
                         show_warnings=True)
        except (NotImplementedError, ValueError):
            pytest.skip("numba not available or setting rejected")
        assert "falling back" in capsys.readouterr().out.lower()

    def test_vie1_fallback_silent(self, capsys):
        kernel, g, h = self._unsupported_data()
        g[0] = 0.0
        try:
            solve_VIE_1(kernel_values=kernel, g_values=g, time_step=h,
                         coll_divs=5, coll_choices=[1, 2, 3, 4, 5],
                         show_warnings=False)
        except (NotImplementedError, ValueError):
            pytest.skip("numba not available or setting rejected")
        assert capsys.readouterr().out == ""


class TestVIE1SolnInitValueWarning:
    """Warning when soln_init_value is set but force_continuous=False in VIE-1."""

    def test_scalar_warns(self, capsys):
        kernel, g, h = _make_data(10)
        g[0] = 0.0
        solve_VIE_1(kernel_values=kernel, g_values=g, time_step=h,
                     coll_divs=1, coll_choices=[1],
                     soln_init_value=1.0, force_continuous=False,
                     show_warnings=True)
        assert "no effect" in capsys.readouterr().out.lower()

    def test_scalar_silent(self, capsys):
        kernel, g, h = _make_data(10)
        g[0] = 0.0
        solve_VIE_1(kernel_values=kernel, g_values=g, time_step=h,
                     coll_divs=1, coll_choices=[1],
                     soln_init_value=1.0, force_continuous=False,
                     show_warnings=False)
        assert capsys.readouterr().out == ""

    def test_vector_warns(self, capsys):
        n = 10
        d = 2
        h = 0.01
        times = np.arange(n) * h
        kernel = np.zeros((n, d, d))
        for i in range(n):
            kernel[i] = np.eye(d) * np.exp(-times[i])
        g = np.column_stack([np.sin(times)] * d)
        g[0, :] = 0.0
        solve_VIE_1(kernel_values=kernel, g_values=g, time_step=h,
                     coll_divs=1, coll_choices=[1],
                     soln_init_value=np.ones(d), force_continuous=False,
                     show_warnings=True)
        assert "no effect" in capsys.readouterr().out.lower()

    def test_vector_silent(self, capsys):
        n = 10
        d = 2
        h = 0.01
        times = np.arange(n) * h
        kernel = np.zeros((n, d, d))
        for i in range(n):
            kernel[i] = np.eye(d) * np.exp(-times[i])
        g = np.column_stack([np.sin(times)] * d)
        g[0, :] = 0.0
        solve_VIE_1(kernel_values=kernel, g_values=g, time_step=h,
                     coll_divs=1, coll_choices=[1],
                     soln_init_value=np.ones(d), force_continuous=False,
                     show_warnings=False)
        assert capsys.readouterr().out == ""

    @staticmethod
    def _matrix_inputs(n=10, d=2, m=3):
        h = 0.01
        times = np.arange(n) * h
        kernel = np.zeros((n, d, d))
        for i in range(n):
            kernel[i] = np.eye(d) * np.exp(-times[i])
        g = np.zeros((n, d, m))
        for j in range(m):
            g[:, :, j] = np.column_stack([np.sin(times * (j + 1))] * d)
        g[0] = 0.0
        return kernel, g, h, d, m

    def test_matrix_no_init_silent(self, capsys):
        """When no soln_init_value is passed, no spurious 'no effect' warning fires."""
        kernel, g, h, d, m = self._matrix_inputs()
        solve_VIE_1(kernel_values=kernel, g_values=g, time_step=h,
                     coll_divs=1, coll_choices=[1],
                     force_continuous=False, show_warnings=True)
        assert "no effect" not in capsys.readouterr().out.lower()

    def test_matrix_warns_once(self, capsys):
        """When init is passed with force_continuous=False, warn exactly once (not per-column)."""
        kernel, g, h, d, m = self._matrix_inputs()
        solve_VIE_1(kernel_values=kernel, g_values=g, time_step=h,
                     coll_divs=1, coll_choices=[1],
                     soln_init_value=np.ones((d, m)), force_continuous=False,
                     show_warnings=True)
        out = capsys.readouterr().out.lower()
        assert out.count("no effect") == 1

    def test_matrix_silent(self, capsys):
        kernel, g, h, d, m = self._matrix_inputs()
        solve_VIE_1(kernel_values=kernel, g_values=g, time_step=h,
                     coll_divs=1, coll_choices=[1],
                     soln_init_value=np.ones((d, m)), force_continuous=False,
                     show_warnings=False)
        assert capsys.readouterr().out == ""
