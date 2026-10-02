"""The default settings: product quadrature (with the first-kind mesh kept at
coll_divs**2 samples), reuse of adaptive blocks, and the node set implied by
coll_divs or coll_choices given alone."""
import numpy as np
import pytest
from voles import (solve_VIE_1, solve_VIE_2, solve_VIDE,
                   function_solve_VIE_1, function_solve_VIE_2)
from voles.solvers import _resolve_coll_setting
from voles._callable_solvers import _resolve_node_pos


def test_coll_setting_resolution():
    assert _resolve_coll_setting("vie1", None, None) == (3, [1, 2, 3])
    assert _resolve_coll_setting("vie2", None, None) == (2, [0, 1, 2])
    assert _resolve_coll_setting("vide", None, None) == (2, [0, 1, 2])
    assert _resolve_coll_setting("vie1", 4, None) == (4, [1, 2, 3, 4])
    assert _resolve_coll_setting("vie2", 4, None) == (4, [0, 1, 2, 3, 4])
    assert _resolve_coll_setting("vide", 1, None) == (1, [0, 1])
    assert _resolve_coll_setting("vie1", None, [2, 4]) == (4, [2, 4])
    assert _resolve_coll_setting("vie2", 3, [1, 3]) == (3, [1, 3])
    with pytest.raises(ValueError, match="at least one"):
        _resolve_coll_setting("vie2", None, [])
    with pytest.raises(ValueError, match="positive integer"):
        _resolve_coll_setting("vie2", 0, None)


def test_callable_node_resolution():
    for divs, choices, exclude, expected in [(3, None, True, [1, 2, 3]), (3, None, False, [0, 1, 2, 3]),
                                             (None, [1, 4], True, [1, 4]), (None, None, False, [0, 1, 2])]:
        nodes, d, ch = _resolve_node_pos(None, divs, choices, default_divs=2,
                                         default_choices=[0, 1, 2], exclude_zero=exclude, fname="f")
        assert ch == expected and d == (expected[-1] if divs is None else divs)
        np.testing.assert_allclose(nodes, np.array(expected) / d)


def _vie2_data(N, dt=0.02):
    t = dt * np.arange(N)
    return t, np.exp(-t), (np.cos(t) - np.sin(t) + np.exp(-t)) / 2, np.cos(t)   # y = cos t


def test_coll_divs_alone_is_the_full_node_set():
    t, K, g, y = _vie2_data(61)
    a = solve_VIE_2(kernel_values=K, g_values=g, time_step=0.02, coll_divs=3)
    b = solve_VIE_2(kernel_values=K, g_values=g, time_step=0.02, coll_divs=3, coll_choices=[0, 1, 2, 3])
    assert np.array_equal(a, b)
    c = solve_VIE_2(kernel_values=K, g_values=g, time_step=0.02, coll_choices=[0, 1, 2, 3])
    assert np.array_equal(a, c)
    I = (np.cos(t) + np.sin(t) - np.exp(-t)) / 2
    a1 = solve_VIE_1(kernel_values=K, g_values=I, time_step=0.02, coll_divs=2)
    b1 = solve_VIE_1(kernel_values=K, g_values=I, time_step=0.02, coll_divs=2, coll_choices=[1, 2])
    assert np.array_equal(a1, b1)
    mesh = np.linspace(0, 1, 11)
    fa = function_solve_VIE_2(kernel=lambda u: np.exp(-u), g=np.cos, mesh_breakpoints=mesh, coll_divs=3)
    fb = function_solve_VIE_2(kernel=lambda u: np.exp(-u), g=np.cos, mesh_breakpoints=mesh,
                              coll_divs=3, coll_choices=[0, 1, 2, 3])
    assert np.array_equal(fa, fb)
    fc = function_solve_VIE_1(kernel=lambda u: np.exp(-u), g=lambda s: 1 - np.exp(-s),
                              mesh_breakpoints=mesh, coll_choices=[1, 2])
    fd = function_solve_VIE_1(kernel=lambda u: np.exp(-u), g=lambda s: 1 - np.exp(-s),
                              mesh_breakpoints=mesh, coll_divs=2, coll_choices=[1, 2])
    assert np.array_equal(fc, fd)


def test_product_quadrature_is_the_default(capsys):
    """A non-compiled setting runs without the Numba fallback, and the
    default equals quadrature='product' explicitly."""
    t, K, g, y = _vie2_data(61)
    kw = dict(kernel_values=K, g_values=g, time_step=0.02, coll_divs=5, coll_choices=[0, 1, 2, 3, 4, 5])
    a = solve_VIE_2(**kw)
    assert "falling back" not in capsys.readouterr().out
    assert np.array_equal(a, solve_VIE_2(quadrature="product", **kw))
    assert np.max(np.abs(a - y)) < 1e-8


def test_first_kind_default_mesh_is_coll_divs_squared():
    """solve_VIE_1 keeps the collocation quadrature's mesh width by default
    (data-error amplification ~ 1/H); the other solvers take the finest."""
    N = 9 * 8 + 1
    t, K, g2, y = _vie2_data(N)
    I = (np.cos(t) + np.sin(t) - np.exp(-t)) / 2
    _, f1 = solve_VIE_1(kernel_values=K, g_values=I, time_step=0.02, return_function=True)
    assert len(f1) == (N - 1) // 9                                       # coll_divs**2 = 9
    _, f1b = solve_VIE_1(kernel_values=K, g_values=I, time_step=0.02, mesh_samples=9,
                         return_function=True)
    assert np.array_equal(f1(t[::7]), f1b(t[::7]))
    _, f2 = solve_VIE_2(kernel_values=K, g_values=g2, time_step=0.02, return_function=True)
    assert len(f2) == (N - 1) // 2                                       # coll_divs = 2
    _, fd = solve_VIDE(kernel_values=K, g_values=-np.sin(t) - I, soln_init_value=1.0, time_step=0.02,
                       return_function=True)
    assert len(fd) == (N - 1) // 2


def test_adaptive_block_reuse_is_the_default():
    mesh = np.linspace(0, 1, 17)
    kw = dict(kernel=lambda u: 1.0 / np.sqrt(np.maximum(u, 1e-300)), g=np.cos,
              kernel_singularity=0.0, mesh_breakpoints=mesh, show_warnings=False)
    y = function_solve_VIE_2(**kw)
    assert np.array_equal(y, function_solve_VIE_2(reuse_adaptive_blocks=True, **kw))
    y_rows = function_solve_VIE_2(reuse_adaptive_blocks=False, **kw)
    assert np.max(np.abs(y - y_rows)) < 1e-7                              # within the quadrature tolerance
