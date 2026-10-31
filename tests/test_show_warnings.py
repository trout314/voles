"""voles diagnostics go through `warnings`, and show_warnings silences them.

Every diagnostic is a `voles.VolesWarning` subclass, emitted with
`warnings.warn`, attributed to the caller's line, emitted at most once per
call and only from the calling thread. ``show_warnings=False`` (0.10 API)
emits nothing. Nothing is ever printed.
"""
import contextlib
import threading
import warnings

import numpy as np
import pytest

import voles
from voles import (solve_VIE_1, solve_VIE_2, solve_VIDE, VolesWarning, AccuracyWarning,
                   PerformanceWarning)


@contextlib.contextmanager
def recorded():
    """Record every warning (overriding the suite's "error" filter)."""
    with warnings.catch_warnings(record=True) as rec:
        warnings.simplefilter("always")
        yield rec


def _voles(rec, category=VolesWarning):
    return [w for w in rec if issubclass(w.category, category)]


def _make_data(n_pts, time_step=0.01):
    times = np.arange(n_pts) * time_step
    return np.exp(-times), np.sin(times), time_step


def _numba_or_skip(fn, **kw):
    try:
        return fn(**kw)
    except NotImplementedError:
        pytest.skip("numba not available")


# ---------------------------------------------------------------- the classes

def test_warning_classes_are_exported_and_nested():
    assert issubclass(VolesWarning, UserWarning)
    assert issubclass(AccuracyWarning, VolesWarning)
    assert issubclass(PerformanceWarning, VolesWarning)
    for name in ("VolesWarning", "AccuracyWarning", "PerformanceWarning"):
        assert name in voles.__all__


# --------------------------------------------- odd data lengths are not diagnosed

class TestOddLengthIsSilent:
    """Lengths that don't end on a mesh point used to be truncated with a
    warning; the final interval now absorbs the leftover samples."""

    @pytest.mark.parametrize("show", [True, False])
    def test_vie1(self, show):
        kernel, g, h = _make_data(90)
        g[0] = 0.0
        with recorded() as rec:
            y = solve_VIE_1(kernel_values=kernel, g_values=g, time_step=h, coll_divs=3,
                            coll_choices=[1, 2, 3], show_warnings=show)
        assert len(y) == len(kernel) and rec == []

    @pytest.mark.parametrize("show", [True, False])
    def test_vie2(self, show):
        kernel, g, h = _make_data(90)
        with recorded() as rec:
            y = solve_VIE_2(kernel_values=kernel, g_values=g, time_step=h, coll_divs=3,
                            coll_choices=[0, 1, 2, 3], show_warnings=show)
        assert len(y) == len(kernel) and rec == []

    @pytest.mark.parametrize("show", [True, False])
    def test_vide(self, show):
        kernel, g, h = _make_data(90)
        with recorded() as rec:
            y = solve_VIDE(kernel_values=kernel, g_values=g, soln_init_value=0.0, time_step=h,
                           coll_divs=3, coll_choices=[0, 1, 2], show_warnings=show)
        assert len(y) == len(kernel) and rec == []

    def test_matrix_vie2_and_vide(self):
        n, d, m = 90, 2, 3
        kernel = np.zeros((n, d, d))
        kernel[:, 0, 0] = kernel[:, 1, 1] = 1.0
        with recorded() as rec:
            solve_VIE_2(kernel_values=kernel, g_values=np.ones((n, d, m)), time_step=0.01,
                        coll_divs=3, coll_choices=[0, 1, 2])
            solve_VIDE(kernel_values=np.zeros((n, d, d)), g_values=np.ones((n, d, m)),
                       soln_init_value=np.zeros((d, m)), time_step=0.01, coll_divs=3,
                       coll_choices=[1, 2, 3])
        assert rec == []


# ---------------------------------------------------------------- numba fallback

class TestNumbaFallbackWarning:
    """An uncompiled setting under collocation quadrature runs on numba."""

    SETTINGS = dict(coll_divs=5, quadrature="collocation")

    def _calls(self):
        kernel, g, h = _make_data(5 ** 2 + 1)
        g1 = g.copy()
        g1[0] = 0.0
        return {
            "vie1": (solve_VIE_1, dict(kernel_values=kernel, g_values=g1, time_step=h,
                                       coll_choices=[1, 2, 3, 4, 5], **self.SETTINGS)),
            "vie2": (solve_VIE_2, dict(kernel_values=kernel, g_values=g, time_step=h,
                                       coll_choices=[0, 1, 2, 3, 4, 5], **self.SETTINGS)),
            "vide": (solve_VIDE, dict(kernel_values=kernel, g_values=g, soln_init_value=0.0,
                                      time_step=h, coll_choices=[0, 1, 2, 3, 4, 5],
                                      **self.SETTINGS)),
        }

    @pytest.mark.parametrize("kind", ["vie1", "vie2", "vide"])
    def test_warns(self, kind):
        fn, kw = self._calls()[kind]
        with pytest.warns(PerformanceWarning, match="falling back"):
            _numba_or_skip(fn, **kw)

    @pytest.mark.parametrize("kind", ["vie1", "vie2", "vide"])
    def test_silent(self, kind):
        fn, kw = self._calls()[kind]
        with recorded() as rec:
            _numba_or_skip(fn, show_warnings=False, **kw)
        assert _voles(rec) == []


# ----------------------------------------------- VIE-1: unused soln_init_value

class TestVIE1SolnInitValueWarning:
    """soln_init_value has no effect unless force_continuous=True."""

    @staticmethod
    def _inputs(d, m):
        n, h = 10, 0.01
        t = np.arange(n) * h
        if d == 0:
            kernel, g = np.exp(-t), np.sin(t)
        else:
            kernel = np.exp(-t)[:, None, None] * np.eye(d)
            shape = (n, d) if m is None else (n, d, m)
            g = np.broadcast_to(np.sin(t).reshape((n,) + (1,) * (len(shape) - 1)),
                                shape).copy()
        g[0] = 0.0
        init = 1.0 if d == 0 else (np.ones(d) if m is None else np.ones((d, m)))
        return dict(kernel_values=kernel, g_values=g, time_step=h, coll_divs=1,
                    coll_choices=[1], force_continuous=False), init

    @pytest.mark.parametrize("d,m", [(0, None), (2, None), (2, 3)])
    def test_warns_once(self, d, m):
        kw, init = self._inputs(d, m)
        with recorded() as rec:
            solve_VIE_1(soln_init_value=init, **kw)
        msgs = [str(w.message) for w in _voles(rec)]
        assert len(msgs) == 1 and "no effect" in msgs[0]

    @pytest.mark.parametrize("d,m", [(0, None), (2, None), (2, 3)])
    def test_silent(self, d, m):
        kw, init = self._inputs(d, m)
        with recorded() as rec:
            solve_VIE_1(soln_init_value=init, show_warnings=False, **kw)
        assert rec == []

    def test_no_init_no_warning(self):
        kw, _ = self._inputs(2, 3)
        with recorded() as rec:
            solve_VIE_1(**kw)
        assert rec == []


# ------------------------------------------------- where and how warnings arrive

def _g0_nonzero_matrix():
    n, d, m, h = 200, 2, 3, 0.01
    t = np.arange(n) * h
    kernel = np.exp(-t)[:, None, None] * np.eye(d)
    g = np.sin(t)[:, None, None] + np.ones((n, d, m))      # g(0) = 1 in every column
    return dict(kernel_values=kernel, g_values=g, time_step=h)


def test_warning_points_at_the_callers_line():
    with recorded() as rec:
        solve_VIE_1(**_g0_nonzero_matrix())
    (w,) = _voles(rec)
    assert w.category is AccuracyWarning
    assert w.filename == __file__


def test_matrix_solve_warns_once_from_the_calling_thread(monkeypatch):
    """The column fan-out runs in worker threads; diagnostics must not."""
    threads = []
    real_warn = warnings.warn

    def spy(message, category=None, stacklevel=1, **kw):
        threads.append(threading.current_thread())
        return real_warn(message, category, stacklevel=stacklevel + 1, **kw)

    monkeypatch.setattr(warnings, "warn", spy)
    kw = _g0_nonzero_matrix()
    with recorded() as rec:
        solve_VIE_1(soln_init_value=np.zeros((2, 3)), **kw)     # two diagnostics
    assert len(_voles(rec)) == 2
    assert threads and all(t is threading.main_thread() for t in threads)


def test_show_warnings_false_silences_matrix_workers():
    with recorded() as rec:
        solve_VIE_1(soln_init_value=np.zeros((2, 3)), show_warnings=False,
                    **_g0_nonzero_matrix())
    assert rec == []


def test_standard_filter_silences_voles():
    with recorded() as rec:
        warnings.simplefilter("ignore", VolesWarning)
        solve_VIE_1(**_g0_nonzero_matrix())
    assert rec == []


def test_error_filter_makes_a_diagnostic_fatal():
    with warnings.catch_warnings():
        warnings.simplefilter("error", AccuracyWarning)
        with pytest.raises(AccuracyWarning, match="g\\(0\\) is not zero"):
            solve_VIE_1(**_g0_nonzero_matrix())


def test_nothing_is_printed(capsys):
    with recorded():
        solve_VIE_1(soln_init_value=np.zeros((2, 3)), **_g0_nonzero_matrix())
    assert capsys.readouterr().out == ""
