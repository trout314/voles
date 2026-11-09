"""The default settings: product quadrature (with the first-kind mesh kept at
divs**2 samples), reuse of adaptive blocks, and the node set implied by a bare
divs."""
import numpy as np
import pytest
from voles import solve_vie1, solve_vie2, solve_vide
from voles._api import _resolve_coll_setting
from voles._functional import _resolve_node_pos
from conftest import with_sol


def test_coll_setting_resolution():
    assert _resolve_coll_setting("vie1", None) == (3, [1, 2, 3])
    assert _resolve_coll_setting("vie2", None) == (2, [0, 1, 2])
    assert _resolve_coll_setting("vide", None) == (2, [0, 1, 2])
    assert _resolve_coll_setting("vie1", 4) == (4, [1, 2, 3, 4])
    assert _resolve_coll_setting("vie2", 4) == (4, [0, 1, 2, 3, 4])
    assert _resolve_coll_setting("vide", 1) == (1, [0, 1])
    assert _resolve_coll_setting("vie2", (3, [3, 1])) == (3, [1, 3])
    with pytest.raises(ValueError, match="at least one"):
        _resolve_coll_setting("vie2", (3, []))
    with pytest.raises(ValueError, match="divs must be at least 1"):
        _resolve_coll_setting("vie2", 0)


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
    a = solve_vie2(kernel=K, g=g, dt=0.02, coll_setting=3).y
    b = solve_vie2(kernel=K, g=g, dt=0.02, coll_setting=(3, [0, 1, 2, 3])).y
    assert np.array_equal(a, b)
    I = (np.cos(t) + np.sin(t) - np.exp(-t)) / 2
    a1 = solve_vie1(kernel=K, g=I, dt=0.02, coll_setting=2).y
    b1 = solve_vie1(kernel=K, g=I, dt=0.02, coll_setting=(2, [1, 2])).y
    assert np.array_equal(a1, b1)


def test_product_quadrature_is_the_default(voles_warnings):
    """A non-compiled setting runs without the Numba fallback, and the
    default equals quadrature='product' explicitly."""
    t, K, g, y = _vie2_data(61)
    kw = dict(kernel=K, g=g, dt=0.02, coll_setting=(5, [0, 1, 2, 3, 4, 5]))
    a = solve_vie2(**kw).y
    assert "falling back" not in voles_warnings.text()
    assert np.array_equal(a, solve_vie2(quadrature="product", **kw).y)
    assert np.max(np.abs(a - y)) < 5e-12


def test_first_kind_default_mesh_is_coll_divs_squared():
    """solve_VIE_1 keeps the collocation quadrature's mesh width by default
    (data-error amplification ~ 1/H); the other solvers take the finest."""
    N = 9 * 8 + 1
    t, K, g2, y = _vie2_data(N)
    I = (np.cos(t) + np.sin(t) - np.exp(-t)) / 2
    _, f1 = with_sol(solve_vie1(kernel=K, g=I, dt=0.02))
    assert len(f1) == (N - 1) // 9                                       # coll_divs**2 = 9
    _, f1b = with_sol(solve_vie1(kernel=K, g=I, dt=0.02, samples_per_interval=9))
    assert np.array_equal(f1(t[::7]), f1b(t[::7]))
    _, f2 = with_sol(solve_vie2(kernel=K, g=g2, dt=0.02))
    assert len(f2) == (N - 1) // 2                                       # coll_divs = 2
    _, fd = with_sol(solve_vide(kernel=K, g=-np.sin(t) - I, y0=1.0, dt=0.02))
    assert len(fd) == (N - 1) // 2


@pytest.mark.filterwarnings("ignore:kernel_singularity is declared but the mesh appears uniform")
def test_adaptive_block_reuse_is_the_default():
    mesh = np.linspace(0, 1, 17)
    kw = dict(kernel=lambda u: 1.0 / np.sqrt(np.maximum(u, 1e-300)), g=np.cos, kernel_singularity=0.0, mesh=mesh)
    y = solve_vie2(**kw).node_values
    assert np.array_equal(y, solve_vie2(reuse_adaptive_blocks=True, **kw).node_values)
    y_rows = solve_vie2(reuse_adaptive_blocks=False, **kw).node_values
    assert np.max(np.abs(y - y_rows)) < 2e-8                              # within the quadrature tolerance
