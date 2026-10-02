"""The final, irregular mesh interval: inputs that do not end on a mesh point
are solved in full, with the leftover samples absorbed by one stretched final
interval whose nodes are snapped to samples (see _product.solve_tail)."""
import numpy as np
import pytest
from voles import solve_VIE_1, solve_VIE_2, solve_VIDE
from voles._product import mesh_split, snap_nodes

# K = exp(-u), y = cos t, on [0, 2]
def _data(N, T=2.0):
    delta = T / (N - 1)
    t = np.arange(N) * delta
    K = np.exp(-t)
    integral = (np.cos(t) + np.sin(t) - np.exp(-t)) / 2          # int_0^t K(t-s) cos s ds
    return delta, t, K, integral, np.cos(t)


def _solve(kind, N, quad, q, choices, T=2.0):
    delta, t, K, I, y = _data(N, T)
    kw = dict(time_step=delta, coll_divs=q, coll_choices=choices, quadrature=quad,
              show_warnings=False)
    if quad == "product":
        kw["mesh_samples"] = q                    # the finest mesh for every kind
    if kind == "vie1":
        out = solve_VIE_1(kernel_values=K, g_values=I, **kw)
    elif kind == "vie1_cont":
        out = solve_VIE_1(kernel_values=K, g_values=I, force_continuous=True,
                          soln_init_value=1.0, **kw)
    elif kind == "vie2":
        out = solve_VIE_2(kernel_values=K, g_values=np.cos(t) - I, **kw)
    else:                                                        # y' = g + int K y
        out = solve_VIDE(kernel_values=K, g_values=-np.sin(t) - I, soln_init_value=1.0, **kw)
    return out, y


def test_mesh_split_and_snapping():
    assert mesh_split(41, 4) == (10, 0)
    assert mesh_split(42, 4) == (9, 5)
    assert mesh_split(44, 4) == (9, 7)
    assert mesh_split(6, 4) == (0, 5)                              # a single, stretched interval
    assert snap_nodes([1, 2, 3], 3, 5) == [2, 3, 5]
    assert snap_nodes([0, 1, 2], 2, 3) == [0, 2, 3]
    assert snap_nodes([1, 2, 3, 4], 4, 7) == [2, 4, 5, 7]


KINDS = ["vie1", "vie1_cont", "vie2", "vide"]
# (q, choices, order); the continuous set [1, 2, 3] has rho = -1: full order m + 1
SETTINGS = {"vie1": (3, [1, 2, 3], 3), "vie1_cont": (3, [1, 2, 3], 4),
            "vie2": (2, [1, 2], 2), "vide": (2, [1, 2], 2)}


@pytest.mark.parametrize("quad", ["collocation", "product"])
@pytest.mark.parametrize("kind", KINDS)
def test_final_interval_keeps_the_convergence_order(kind, quad):
    """With the leftover fixed and the step halving, the error on the final
    interval decreases at the method's order, like the interior."""
    q, choices, order = SETTINGS[kind]
    Q = q ** 2 if quad == "collocation" else q
    r = 1
    errs_tail, errs_int = [], []
    for M in (20, 40, 80, 160):
        N = M * Q + 1 + r
        y, exact = _solve(kind, N, quad, q, choices)
        assert len(y) == N
        Mreg, Qp = mesh_split(N, Q)
        assert Qp == Q + r
        start = Mreg * Q
        errs_tail.append(np.max(np.abs(y[start + 1:] - exact[start + 1:])))
        errs_int.append(np.max(np.abs(y[:start] - exact[:start])))
    rates_tail = np.log2(np.array(errs_tail[:-1]) / np.array(errs_tail[1:]))
    assert np.all(rates_tail[-2:] > order - 0.35), (errs_tail, rates_tail)
    assert errs_tail[-1] < 1e-4


@pytest.mark.parametrize("quad", ["collocation", "product"])
@pytest.mark.parametrize("kind", KINDS)
def test_single_stretched_interval(kind, quad):
    """Fewer samples than two regular intervals but more than one: the
    whole range is one stretched interval, solved without the D driver."""
    q, choices, _ = SETTINGS[kind]
    Q = q ** 2 if quad == "collocation" else q
    N = Q + 2
    y, exact = _solve(kind, N, quad, q, choices, T=0.1)           # one short interval
    assert len(y) == N and np.all(np.isfinite(y))
    assert np.max(np.abs(y - exact)) < 1e-2


@pytest.mark.parametrize("quad", ["collocation", "product"])
def test_solution_object_covers_the_whole_range(quad):
    N = 10 * 4 + 1 + 3 if quad == "collocation" else 20 * 2 + 1 + 1
    delta, t, K, I, exact = _data(N)
    y, f = solve_VIE_2(kernel_values=K, g_values=np.cos(t) - I, time_step=delta,
                       quadrature=quad, return_function=True)
    bps = f.mesh_breakpoints
    assert bps[-1] == pytest.approx(t[-1]) and len(f) == len(bps) - 1
    assert bps[-1] - bps[-2] > bps[1] - bps[0]                    # the stretched last interval
    assert np.isfinite(f(t[-1])) and np.isnan(f(t[-1] * 1.01))
    np.testing.assert_allclose(f(t[-6:]), y[-6:], rtol=0, atol=1e-12)
    assert abs(f[len(f) - 1](t[-1]) - exact[-1]) < 1e-4


@pytest.mark.parametrize("quad", ["collocation", "product"])
def test_vector_matrix_and_complex_agree_with_scalar_columns(quad):
    """The tail is solved per column for matrix input and through the real
    block form for complex input; all must agree with scalar solves."""
    N = 9 * 5 + 1 + 4 if quad == "collocation" else 3 * 15 + 1 + 2
    delta, t, K, I, exact = _data(N)
    g = np.cos(t) - I
    kw = dict(time_step=delta, coll_divs=3, coll_choices=[0, 1, 2, 3], quadrature=quad,
              show_warnings=False)
    ys = solve_VIE_2(kernel_values=K, g_values=g, **kw)
    assert np.max(np.abs(ys - exact)) < 1e-4
    d = 2
    Kv = K[:, None, None] * np.eye(d)
    gv = np.stack([g, 2 * g], axis=1)
    yv = solve_VIE_2(kernel_values=Kv, g_values=gv, **kw)
    np.testing.assert_allclose(yv[:, 0], ys, rtol=0, atol=1e-12)
    np.testing.assert_allclose(yv[:, 1], 2 * ys, rtol=0, atol=1e-11)
    ym = solve_VIE_2(kernel_values=Kv, g_values=np.stack([gv, -gv], axis=2), **kw)
    np.testing.assert_allclose(ym[:, :, 0], yv, rtol=0, atol=1e-12)
    np.testing.assert_allclose(ym[:, :, 1], -yv, rtol=0, atol=1e-12)
    yc = solve_VIE_2(kernel_values=K + 0j, g_values=g * (1 + 2j), **kw)
    np.testing.assert_allclose(yc, ys * (1 + 2j), rtol=0, atol=1e-11)


def test_vide_with_coefficient_and_matrix_init_on_the_tail():
    """a(t) != 0 enters the final interval's local system; matrix-valued
    initial values go through the per-column path."""
    N = 4 * 12 + 1 + 2
    delta, t, K, I, exact = _data(N)
    a = 0.3 * np.cos(t)
    g = -np.sin(t) - a * np.cos(t) - I                              # y' = a y + g + int K y
    kw = dict(time_step=delta, coll_divs=2, coll_choices=[0, 1, 2], show_warnings=False)
    y = solve_VIDE(kernel_values=K, a_values=a, g_values=g, soln_init_value=1.0, **kw)
    assert np.max(np.abs(y - exact)) < 1e-5
    Kv = K[:, None, None] * np.eye(2)
    ym = solve_VIDE(kernel_values=Kv, a_values=a[:, None, None] * np.eye(2),
                    g_values=np.stack([g, g], axis=1), soln_init_value=np.ones((2, 2)), **kw)
    np.testing.assert_allclose(ym[:, 0, 1], y, rtol=0, atol=1e-12)


def test_inputs_ending_on_a_mesh_point_are_unchanged():
    """No final interval: the solve is the regular one, bit for bit."""
    N = 4 * 10 + 1
    delta, t, K, I, exact = _data(N)
    g = np.cos(t) - I
    y = solve_VIE_2(kernel_values=K, g_values=g, time_step=delta)
    assert mesh_split(N, 4) == (10, 0)
    y2 = solve_VIE_2(kernel_values=K[:N], g_values=g[:N], time_step=delta)
    assert np.array_equal(y, y2)
    assert np.max(np.abs(y - exact)) < 1e-3
