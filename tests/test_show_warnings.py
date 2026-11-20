"""voles diagnostics go through `warnings`.

Every diagnostic is a `voles.VolesWarning` subclass, emitted with
`warnings.warn`, attributed to the caller's line, emitted at most once per
call and only from the calling thread. Nothing is ever printed.
"""
import contextlib
import threading
import warnings

import numpy as np
import pytest

import voles
from voles import (
    solve_vie1,
    solve_vie2,
    solve_vide,
    VolesWarning,
    AccuracyWarning,
    PerformanceWarning,
)
from conftest import values_fn


@contextlib.contextmanager
def recorded():
    """Record every warning (overriding the suite's "error" filter)."""
    with warnings.catch_warnings(record=True) as rec:
        warnings.simplefilter("always")
        yield rec


def _voles(rec, category=VolesWarning):
    """The voles diagnostics among the recorded warnings (the 0.10 API's
    DeprecationWarning is not one)."""
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

    def test_vie1(self):
        kernel, g, h = _make_data(90)
        g[0] = 0.0
        with recorded() as rec:
            y = solve_vie1(kernel=kernel, g=g, dt=h, coll_setting=(3, [1, 2, 3])).y
        assert len(y) == len(kernel) and _voles(rec) == []

    def test_vie2(self):
        kernel, g, h = _make_data(90)
        with recorded() as rec:
            y = solve_vie2(kernel=kernel, g=g, dt=h, coll_setting=(3, [0, 1, 2, 3])).y
        assert len(y) == len(kernel) and _voles(rec) == []

    def test_vide(self):
        kernel, g, h = _make_data(90)
        with recorded() as rec:
            y = solve_vide(kernel=kernel, g=g, y0=0.0, dt=h, coll_setting=(3, [0, 1, 2])).y
        assert len(y) == len(kernel) and _voles(rec) == []

    def test_matrix_vie2_and_vide(self):
        n, d, m = 90, 2, 3
        kernel = np.zeros((n, d, d))
        kernel[:, 0, 0] = kernel[:, 1, 1] = 1.0
        with recorded() as rec:
            solve_vie2(kernel=kernel, g=np.ones((n, d, m)), dt=0.01, coll_setting=(3, [0, 1, 2])).y
            solve_vide(kernel=np.zeros((n, d, d)), g=np.ones((n, d, m)), y0=np.zeros((d, m)), dt=0.01, coll_setting=(3, [1, 2, 3])).y
        assert _voles(rec) == []


# ---------------------------------------------------------------- numba fallback

class TestNumbaFallbackWarning:
    """An uncompiled setting under collocation quadrature runs on numba."""

    SETTINGS = dict(quadrature="collocation")

    def _calls(self):
        kernel, g, h = _make_data(5 ** 2 + 1)
        g1 = g.copy()
        g1[0] = 0.0
        return {
            "vie1": (values_fn(solve_vie1), dict(kernel=kernel, g=g1, dt=h, coll_setting=(max([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]), **self.SETTINGS)),
            "vie2": (values_fn(solve_vie2), dict(kernel=kernel, g=g, dt=h, coll_setting=(max([0, 1, 2, 3, 4, 5]), [0, 1, 2, 3, 4, 5]), **self.SETTINGS)),
            "vide": (values_fn(solve_vide), dict(kernel=kernel, g=g, y0=0.0, dt=h, coll_setting=(max([0, 1, 2, 3, 4, 5]), [0, 1, 2, 3, 4, 5]), **self.SETTINGS)),
        }

    @pytest.mark.parametrize("kind", ["vie1", "vie2", "vide"])
    def test_warns(self, kind):
        fn, kw = self._calls()[kind]
        with pytest.warns(PerformanceWarning, match="falling back"):
            _numba_or_skip(fn, **kw)


# ------------------------------------------------- VIE-1: y0 needs continuous

class TestVIE1InitialValueNeedsContinuous:
    """y0 has no effect on the discontinuous method; 0.10 warned, 1.0 refuses."""

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
        return dict(kernel=kernel, g=g, dt=h, coll_setting=(1, [1])), init

    @pytest.mark.parametrize("d,m", [(0, None), (2, None), (2, 3)])
    def test_raises(self, d, m):
        kw, init = self._inputs(d, m)
        with pytest.raises(ValueError, match="y0 is used only by the continuous method"):
            solve_vie1(y0=init, **kw)

    def test_no_init_no_warning(self):
        kw, _ = self._inputs(2, 3)
        with recorded() as rec:
            solve_vie1(**kw).y
        assert _voles(rec) == []


# ------------------------------------------------- where and how warnings arrive

def _g0_nonzero_matrix():
    n, d, m, h = 200, 2, 3, 0.01
    t = np.arange(n) * h
    kernel = np.exp(-t)[:, None, None] * np.eye(d)
    g = np.sin(t)[:, None, None] + np.ones((n, d, m))      # g(0) = 1 in every column
    return dict(kernel=kernel, g=g, dt=h)


def test_warning_points_at_the_callers_line():
    with recorded() as rec:
        solve_vie1(**_g0_nonzero_matrix()).y
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
        solve_vie1(coll_setting=(3, [1, 2]), **kw)     # two diagnostics: g(0), rho = 1
    assert len(_voles(rec)) == 2
    assert threads and all(t is threading.main_thread() for t in threads)


def test_standard_filter_silences_voles():
    with recorded() as rec:
        warnings.simplefilter("ignore", VolesWarning)
        solve_vie1(**_g0_nonzero_matrix()).y
    assert _voles(rec) == []


def test_error_filter_makes_a_diagnostic_fatal():
    with warnings.catch_warnings():
        warnings.simplefilter("error", AccuracyWarning)
        with pytest.raises(AccuracyWarning, match="g\\(0\\) is not zero"):
            solve_vie1(**_g0_nonzero_matrix()).y


def test_nothing_is_printed(capsys):
    with recorded():
        solve_vie1(**_g0_nonzero_matrix()).y
    assert capsys.readouterr().out == ""


_LOOP_CASES = {
    "vie2 scalar": lambda: solve_vie2(kernel=lambda u: u ** -0.5, g=lambda t: 1.0,
                                      mesh=np.linspace(0, 1, 9), kernel_singularity=0.0),
    "vie2 vector": lambda: solve_vie2(kernel=lambda u: u ** -0.5 * np.eye(2) / 4,
                                      g=lambda t: np.ones(2), mesh=np.linspace(0, 1, 9),
                                      kernel_singularity=0.0),
    "vide scalar": lambda: solve_vide(kernel=lambda u: u ** -0.5, a=lambda t: -1.0,
                                      g=lambda t: 0.0, y0=1.0, mesh=np.linspace(0, 1, 9),
                                      kernel_singularity=0.0),
}


@pytest.mark.parametrize("case", list(_LOOP_CASES))
def test_repeated_callable_solve_warns_once_under_default_filter(case):
    """Python's "default" action shows a warning once per call site, which
    keeps a solve in a loop from repeating it. That relies on the warning
    filters not changing in between: any change (warnings.catch_warnings
    inside the solver included) clears the record of warnings already shown.
    The callable-input solvers used to do that on every solve, through
    their ComplexWarning escalation and their IntegrationWarning
    suppression on the adaptive-reuse path that this mesh exercises."""
    solve = _LOOP_CASES[case]
    with warnings.catch_warnings():         # first call: lazy scipy imports
        warnings.simplefilter("ignore", VolesWarning)
        solve()
    with warnings.catch_warnings(record=True) as rec:
        warnings.simplefilter("default")
        for _ in range(3):
            solve()
    assert len(_voles(rec, AccuracyWarning)) == 1
