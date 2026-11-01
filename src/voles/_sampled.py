"""The sampled-data engine: VIE-1, VIE-2 and VIDE from samples on a uniform grid.

Called by the 1.0 layer (`voles._api`), which validates every argument and
resolves the collocation setting (``divs``, sorted ``choices``), the mesh
width ``Q`` (samples per interval) and the kernel interpolation degree ``p``
before calling. The entry points `vie1`, `vie2`, `vide` therefore trust
their inputs; each returns ``(values, pieces)``: the solution at every
sample and its `_Pieces` (local coefficients and mesh). `solve` wraps them in
a `VolterraSolution`.

Two quadratures: ``"product"`` (`voles._product`, any node set and mesh
width) and ``"collocation"`` (the D extension's compiled drivers for a fixed
list of settings, or the numba fallback for scalar problems). Complex
problems are solved as real block systems (`voles._complex`); matrix-valued
ones column by column, in threads, sharing the kernel's work.

``diagnose=False`` suppresses the solve-time diagnostics; the matrix fan-out
passes it to the worker threads so that warnings come from the calling
thread, once.
"""
import numpy as np
from concurrent.futures import ThreadPoolExecutor
from . import _dlang as _dlang_module
from . import _complex as _cplx
from ._solution import _Pieces, _complex_solution
from ._warnings import _warn, AccuracyWarning, PerformanceWarning
from ._common import _column_workers, _vie1_rho, _warn_g_start_columns, _scalar_init


def _numba_args(args, choices_pos):
    """``args`` for a Numba fallback driver, with ``coll_choices`` (at
    ``choices_pos``) as an int64 array: Numba deprecates passing Python lists
    ("reflected lists") to jitted functions."""
    args = list(args)
    args[choices_pos] = np.asarray(args[choices_pos], dtype=np.int64)
    return args


def _wrap_unit_coefs(poly_coefs, time_step, coll_divs, d=0):
    """`_Pieces` over the D/Numba drivers' per-interval coefficient array
    (``(mesh_divs, P)`` scalar, ``(mesh_divs, P, d)`` vector), in the local
    variable on [0, 1] of each mesh interval of ``coll_divs**2`` samples."""
    poly_coefs = np.asarray(poly_coefs)
    M = poly_coefs.shape[0]
    mesh_breakpoints = np.arange(M + 1) * (coll_divs ** 2 * time_step)
    return _Pieces(poly_coefs, mesh_breakpoints, d=d)


def _stack_columns(results, d, m_cols):
    """The matrix-valued ``(values, pieces)`` from per-column vector results."""
    values = np.stack([r[0] for r in results], axis=2)
    unit = np.stack([r[1]._unit for r in results], axis=-1)     # (M, P, d, m)
    return values, _Pieces(unit, results[0][1].mesh_breakpoints, d=d, m=m_cols)


def _fan_out(solve_column, m_cols, d):
    with ThreadPoolExecutor(max_workers=_column_workers(m_cols)) as ex:
        results = list(ex.map(solve_column, range(m_cols)))
    return _stack_columns(results, d, m_cols)


def _warn_reduced_order(coll_divs, coll_choices, force_continuous, diagnose):
    """An admissible node set with rho = +1 exactly converges one order lower
    than the method's nominal order (Brunner 2004, Theorems 2.4.2 and 2.4.5)."""
    if diagnose and _vie1_rho(coll_divs, coll_choices, continuous=force_continuous) == 1:
        m = len(coll_choices)
        nominal = m + 1 if force_continuous else m
        _warn(f"collocation setting ({coll_divs}, {coll_choices}) "
              f"has amplification factor rho = 1 exactly, so the "
              f"{'continuous' if force_continuous else 'discontinuous'} VIE-1 method converges "
              f"at order {nominal - 1} rather than {nominal}.", AccuracyWarning)


def _warn_vie1_g_start(g_values, kernel_values_, diagnose):
    """A first-kind equation forces g(0) = 0 (the integral vanishes at t = 0);
    with g(0) != 0 there is no bounded solution and the solver returns
    meaningless values near t = 0. Warn when g(0) is not negligible next to
    the scale of g. Only a g whose shape fits the kernel is diagnosed: a
    shape the solver is about to reject gets its ValueError without a
    misleading warning first."""
    if not diagnose or g_values is None:
        return
    try:
        g = np.abs(np.asarray(g_values, dtype=float))
    except (TypeError, ValueError):
        return
    N = len(kernel_values_)
    if kernel_values_.ndim == 1:
        fits = g.shape == (N,)
    else:
        d = kernel_values_.shape[1]
        fits = g.ndim in (2, 3) and g.shape[:2] == (N, d)
    if not fits:
        return
    if g.ndim == 3:                                       # (N, d, m): per column
        g0, scale = g[0].max(axis=0), g.max(axis=(0, 1))
    else:
        g0, scale = g[0].max(), g.max()
    _warn_g_start_columns(g0, scale)


def _warn_vie1_kernel_start(kernel_values_, samples_per_mesh, diagnose):
    """The collocation-quadrature VIE-1 scheme is unstable when K(0) is small
    next to the kernel's change over one mesh interval: the error grows
    geometrically, and without bound as the mesh is refined when K(0) = 0.
    Warn when |K(H) - K(0)| > 2 |K(0)| (vector: ||K(0)^-1 (K(H) - K(0))|| > 2,
    or K(0) numerically singular), where divergence was observed from a
    ratio of about 5. Product quadrature does not have this restriction."""
    if not diagnose or len(kernel_values_) <= samples_per_mesh:
        return
    K0 = kernel_values_[0]
    dK = kernel_values_[samples_per_mesh] - K0
    if not (np.all(np.isfinite(K0)) and np.all(np.isfinite(dK))):
        return
    if np.ndim(K0) == 0:
        ratio = np.inf if K0 == 0 else abs(dK) / abs(K0)
    else:
        if np.linalg.cond(K0) > 1e12:
            ratio = np.inf
        else:
            ratio = np.linalg.norm(np.linalg.solve(K0, dK), 2)
    if ratio > 2:
        which = ("K(0) is zero or singular" if not np.isfinite(ratio) else
                 f"K changes by {ratio:.3g} x |K(0)| over one mesh interval")
        _warn(f"{which}. The first-kind collocation scheme is unstable in "
              f"this regime and can return values that grow without bound. Use "
              f"quadrature='product' (stable here), or a finer sample spacing if K(0) != 0.",
              AccuracyWarning)


_all_fast = _dlang_module.supported_coll_settings_d()
# The compiled VIE-1 settings that fail the convergence criterion |rho_m| <= 1
# (the rule voles._api._check_vie1_admissible applies to every setting).
# Kept as a named constant for reference; it is derived, not a blacklist.
_VIE1_NONCONVERGENT = {
    (d, tuple(c)) for d, c in _all_fast
    if 0 not in c and abs(_vie1_rho(d, c)) > 1
}
_fast_settings_VIE_1 = [
    (d, c) for d, c in _all_fast
    if 0 not in c and (d, tuple(c)) not in _VIE1_NONCONVERGENT
]
_fast_settings_VIE_2 = _all_fast
_fast_settings_VIDE  = _all_fast
del _all_fast

try:
    from . import _numba_solvers
    _numba_available = True
except ImportError:
    _numba_available = False


def _split_regular(kernel, divs):
    """Regular / final-interval split for the collocation quadrature (mesh
    width divs**2 samples): ``(M, Qp, kernel_reg)``, with M regular
    intervals, a final interval of Qp samples (0 if the data end on a mesh
    point; see `_product.mesh_split`) and the regular part's kernel."""
    from . import _product
    Q = divs ** 2
    M, Qp = _product.mesh_split(len(kernel), Q)
    return M, Qp, kernel[:M * Q + 1]


def _with_tail(kind, regular, kernel_full, g_full, a_full, init, time_step, coll_divs,
               coll_choices, M, Qp, d):
    """Run ``regular()`` -> ``(values, poly_coefs)`` for the ``M`` regular
    intervals (skipped when there are none) and, when ``Qp > 0``, solve the
    final interval of ``Qp`` samples with `_product.solve_tail` from the
    regular intervals' polynomials. ``poly_coefs`` must be the driver's
    coefficient array whenever a tail is needed. Returns the values on the
    whole sample grid and the solution's `_Pieces`."""
    from . import _product
    Q = _samples_per_interval(None, "collocation", None, coll_divs)
    if M:
        values, poly_coefs = regular()
    else:
        values, poly_coefs = None, None
    if not Qp:
        return values, _wrap_unit_coefs(poly_coefs, time_step, coll_divs, d=d)
    dd = max(d, 1)
    N = len(kernel_full)
    unit_reg = (np.asarray(poly_coefs, dtype=float).reshape(M, -1, dd) if M
                else np.zeros((0, len(coll_choices) + 1, dd)))
    # The tail's history uses the regular rows' node rule (every kernel
    # argument is a sample), so the kernel interpolant is needed only for
    # the local block, i.e. its first Qp cells: build it from a prefix.
    p = len(coll_choices)
    coef = _product.interp_cell_coefs(kernel_full[:min(N, Qp + 2 * p + 2)], p)
    if kind in ("vie1_cont", "vide"):
        y_prev = unit_reg[-1].sum(axis=0) if M else np.broadcast_to(np.asarray(init, dtype=float), (dd,))
    else:
        y_prev = None
    g_tail = None if g_full is None else np.asarray(g_full, dtype=float)[M * Q:]
    a_tail = None if a_full is None else np.asarray(a_full, dtype=float)[M * Q:]
    unit_t, vals_t = _product.solve_tail(
        kind, coef, unit_reg[:, :, 0] if d == 0 else unit_reg, g_tail, a_tail, y_prev,
        coll_choices, coll_divs, Q, Qp, time_step, d,
        # integrate the tail's history the way the regular rows did (the node
        # rule): for the first kind a quadrature mismatch costs an order, and
        # it is far cheaper than the product rule on the whole array
        node_rule_kernel=kernel_full)
    unit_t = unit_t.reshape(unit_t.shape[0], dd)
    vals_t = vals_t.reshape(Qp + 1, dd)
    full = np.zeros((N, dd))
    if M:
        v = np.asarray(values, dtype=float).reshape(M * Q + 1, dd)
        full[:M * Q + 1] = v
        full[M * Q] = 0.5 * (v[M * Q] + vals_t[0])              # shared mesh point: average
        full[M * Q + 1:] = vals_t[1:]
    else:
        full[:] = vals_t
    full = full[:, 0] if d == 0 else full
    P = max(unit_reg.shape[1], unit_t.shape[0])
    unit_all = np.zeros((M + 1, P, dd))
    unit_all[:M, :unit_reg.shape[1]] = unit_reg
    unit_all[M, :unit_t.shape[0]] = unit_t
    bps = np.r_[np.arange(M + 1) * (Q * time_step), (N - 1) * time_step]
    return full, _Pieces(unit_all[:, :, 0] if d == 0 else unit_all, bps, d=d)


def _samples_per_interval(equation, quadrature, mesh_samples, coll_divs):
    """The mesh width in samples, Q: the single source of this rule for the
    engine and for `solve`.

    ``quadrature="collocation"`` fixes Q = coll_divs**2. With ``"product"``,
    an explicit ``mesh_samples`` is used as given (validated by the caller);
    otherwise Q = coll_divs**2 for the first kind (inverting it amplifies data
    error by about 1/H, so the default is wider) and coll_divs otherwise (the
    finest mesh)."""
    if quadrature == "collocation":
        return coll_divs ** 2
    if mesh_samples is not None:
        return int(mesh_samples)
    return coll_divs ** 2 if equation == "vie1" else coll_divs


def _no_compiled_driver(divs, choices):
    # Reached only by a complex scalar problem (solved as a 2x2 real system)
    # with an uncompiled setting: the 1.0 layer checks real problems.
    return NotImplementedError(
        f"coll_setting=({divs}, {choices}) is not compiled into the extension, and complex "
        f"problems under quadrature='collocation' have no fallback for it. Use "
        f"quadrature='product', which accepts every valid setting.")


def _fallback_warning():
    _warn("falling back to slower python/numba code", PerformanceWarning)


# ---------------------------------------------------------------------------
# VIE-2
# ---------------------------------------------------------------------------

def vie2(*, kernel, g, dt, divs, choices, quadrature, Q, p, diagnose=True):
    """y = g + K * y from samples; see the module docstring."""
    if _cplx.is_complex(kernel, g):
        kernel = np.asarray(kernel)
        d_orig = 0 if kernel.ndim == 1 else kernel.shape[1]
        values, pieces = vie2(
            kernel=_cplx._block_kernel(kernel),
            g=None if g is None else _cplx._expand_g(np.asarray(g)),
            dt=dt, divs=divs, choices=choices, quadrature=quadrature, Q=Q, p=p,
            diagnose=diagnose)
        return _cplx._recombine(values, d_orig), _complex_solution(pieces, d_orig)
    K = np.asarray(kernel, dtype=float)
    N = len(K)
    d = 0 if K.ndim == 1 else K.shape[1]
    if quadrature == "product":
        from . import _product
        setup = _product.ProductSetup("vie2", K, dt, divs, choices, Q, p)
        if g is None:
            g = np.zeros((N,) if d == 0 else (N, d))
        g = np.asarray(g, dtype=float)
        if d and g.ndim == 3:
            _product.block_drivers_available("vie2", show_warnings=diagnose)
            return _fan_out(lambda j: _product.solve_vie2_product(
                K, g[:, :, j], dt, divs, choices, Q, p, True, setup=setup), g.shape[2], d)
        return _product.solve_vie2_product(K, g, dt, divs, choices, Q, p, True, setup=setup,
                                           show_warnings=diagnose)
    M_reg, Qp, kernel_reg = _split_regular(K, divs)
    N_reg = len(kernel_reg)
    if d:
        g = np.zeros((N, d)) if g is None else np.asarray(g, dtype=float)
        if g.ndim == 3:
            return _fan_out(lambda j: vie2(
                kernel=K, g=g[:, :, j], dt=dt, divs=divs, choices=choices,
                quadrature="collocation", Q=Q, p=p, diagnose=False), g.shape[2], d)
        if (divs, choices) not in _fast_settings_VIE_2:
            raise _no_compiled_driver(divs, choices)

        def _regular():
            k_c = np.ascontiguousarray(kernel_reg, dtype=np.float64)
            g_c = np.ascontiguousarray(g[:N_reg], dtype=np.float64)
            return _dlang_module.solve_vie2_vec_d(g_c, k_c, dt, divs, choices, True)
        return _with_tail("vie2", _regular, K, g, None, None, dt, divs, choices, M_reg, Qp, d)
    g = np.zeros(N) if g is None else np.asarray(g, dtype=float)
    fast = (divs, choices) in _fast_settings_VIE_2

    def _regular():
        args = (g[:N_reg], kernel_reg, dt, divs, choices, True)
        if fast:
            return _dlang_module.solve_vie2_d(*args)
        if diagnose:
            _fallback_warning()
        return _numba_solvers.solve_vie2_jit(*_numba_args(args, 4))
    return _with_tail("vie2", _regular, K, g, None, None, dt, divs, choices, M_reg, Qp, 0)


# ---------------------------------------------------------------------------
# VIDE
# ---------------------------------------------------------------------------

def vide(*, kernel, a, g, y0, dt, divs, choices, quadrature, Q, p, diagnose=True):
    """y' = a y + g + K * y, y(0) = y0, from samples; see the module docstring."""
    if _cplx.is_complex(kernel, a, g, y0):
        kernel = np.asarray(kernel)
        d_orig = 0 if kernel.ndim == 1 else kernel.shape[1]
        values, pieces = vide(
            kernel=_cplx._block_kernel(kernel),
            a=None if a is None else _cplx._block_a(np.asarray(a)),
            g=None if g is None else _cplx._expand_g(np.asarray(g)),
            y0=_cplx._expand_init(y0), dt=dt, divs=divs, choices=choices,
            quadrature=quadrature, Q=Q, p=p, diagnose=diagnose)
        return _cplx._recombine(values, d_orig), _complex_solution(pieces, d_orig)
    K = np.asarray(kernel, dtype=float)
    N = len(K)
    d = 0 if K.ndim == 1 else K.shape[1]
    init = np.asarray(y0, dtype=float)
    a_ = None if a is None else np.asarray(a, dtype=float)
    if quadrature == "product":
        from . import _product
        setup = _product.ProductSetup("vide", K, dt, divs, choices, Q, p, a_values=a_)
        if d and init.ndim == 2:
            m_cols = init.shape[1]
            g_cols = _vide_columns(g, m_cols)
            _product.block_drivers_available("vide", show_warnings=diagnose)
            return _fan_out(lambda j: _product.solve_vide_product(
                K, a_, g_cols[j], dt, divs, choices, Q, p, init[:, j], True, setup=setup),
                m_cols, d)
        g_ = None if g is None else np.asarray(g, dtype=float)
        init = _scalar_init(init) if d == 0 else init.ravel()
        return _product.solve_vide_product(K, a_, g_, dt, divs, choices, Q, p, init, True,
                                           setup=setup, show_warnings=diagnose)
    M_reg, Qp, kernel_reg = _split_regular(K, divs)
    N_reg = len(kernel_reg)
    if d:
        if init.ndim == 2:
            m_cols = init.shape[1]
            g_cols = _vide_columns(g, m_cols)
            return _fan_out(lambda j: vide(
                kernel=K, a=a_, g=g_cols[j], y0=init[:, j], dt=dt, divs=divs,
                choices=choices, quadrature="collocation", Q=Q, p=p, diagnose=False),
                m_cols, d)
        g_ = np.zeros((N, d)) if g is None else np.asarray(g, dtype=float)
        a_ = np.zeros((N, d, d)) if a_ is None else a_
        init = init.ravel()
        if (divs, choices) not in _fast_settings_VIDE:
            raise _no_compiled_driver(divs, choices)

        def _regular():
            k_c = np.ascontiguousarray(kernel_reg, dtype=np.float64)
            g_c = np.ascontiguousarray(g_[:N_reg], dtype=np.float64)
            a_c = np.ascontiguousarray(a_[:N_reg], dtype=np.float64)
            return _dlang_module.solve_vide_vec_d(g_c, k_c, a_c, init, dt, divs, choices, True)
        return _with_tail("vide", _regular, K, g_, a_, init, dt, divs, choices, M_reg, Qp, d)
    g_ = np.zeros(N) if g is None else np.asarray(g, dtype=float)
    a_ = np.zeros(N) if a_ is None else a_
    fast = (divs, choices) in _fast_settings_VIDE
    init = _scalar_init(init)

    def _regular():
        args = (g_[:N_reg], kernel_reg, a_[:N_reg], init, dt, divs, choices, True)
        if fast:
            return _dlang_module.solve_vide_d(*args)
        if diagnose:
            _fallback_warning()
        return _numba_solvers.solve_vide_jit(*_numba_args(args, 6))
    return _with_tail("vide", _regular, K, g_, a_, init, dt, divs, choices, M_reg, Qp, 0)


def _vide_columns(g, m_cols):
    """Per-column right-hand sides of a matrix VIDE: g's columns, one shared
    (N, d) g, or none."""
    if g is None:
        return [None] * m_cols
    g = np.asarray(g, dtype=float)
    if g.ndim == 3:
        return [g[:, :, j] for j in range(m_cols)]
    return [g] * m_cols


# ---------------------------------------------------------------------------
# VIE-1
# ---------------------------------------------------------------------------

def vie1(*, kernel, g, y0, dt, divs, choices, quadrature, Q, p, continuous, diagnose=True):
    """g = K * y from samples (``continuous``: the S_m^(0) method, with y(0) =
    y0); see the module docstring."""
    if _cplx.is_complex(kernel, g, y0):
        kernel = np.asarray(kernel)
        d_orig = 0 if kernel.ndim == 1 else kernel.shape[1]
        values, pieces = vie1(
            kernel=_cplx._block_kernel(kernel),
            g=None if g is None else _cplx._expand_g(np.asarray(g)),
            y0=None if y0 is None else _cplx._expand_init(y0), dt=dt, divs=divs,
            choices=choices, quadrature=quadrature, Q=Q, p=p, continuous=continuous,
            diagnose=diagnose)
        return _cplx._recombine(values, d_orig), _complex_solution(pieces, d_orig)
    K = np.asarray(kernel, dtype=float)
    N = len(K)
    d = 0 if K.ndim == 1 else K.shape[1]
    kind = "vie1_cont" if continuous else "vie1"
    _warn_vie1_g_start(g, K, diagnose)
    _warn_reduced_order(divs, choices, continuous, diagnose)
    if quadrature == "product":
        from . import _product
        setup = _product.ProductSetup(kind, K, dt, divs, choices, Q, p)
        g_ = np.zeros((N,) if d == 0 else (N, d)) if g is None else np.asarray(g, dtype=float)
        if d and g_.ndim == 3:
            init_cols = None if y0 is None else np.asarray(y0, dtype=float)
            _product.block_drivers_available(kind, show_warnings=diagnose)
            return _fan_out(lambda j: _product.solve_vie1_product(
                K, g_[:, :, j], dt, divs, choices, Q, p, continuous,
                None if init_cols is None else init_cols[:, j], True, setup=setup),
                g_.shape[2], d)
        if y0 is None:
            init = 0.0 if d == 0 else np.zeros(d)
        else:
            init = np.asarray(y0, dtype=float)
            init = _scalar_init(init) if d == 0 else init
        return _product.solve_vie1_product(K, g_, dt, divs, choices, Q, p, continuous, init,
                                           True, setup=setup, show_warnings=diagnose)
    M_reg, Qp, kernel_reg = _split_regular(K, divs)
    N_reg = len(kernel_reg)
    _warn_vie1_kernel_start(K, divs ** 2, diagnose)
    if d:
        g_ = np.zeros((N, d)) if g is None else np.asarray(g, dtype=float)
        if g_.ndim == 3:
            init_cols = None if y0 is None else np.asarray(y0, dtype=float)
            return _fan_out(lambda j: vie1(
                kernel=K, g=g_[:, :, j], y0=None if init_cols is None else init_cols[:, j],
                dt=dt, divs=divs, choices=choices, quadrature="collocation", Q=Q, p=p,
                continuous=continuous, diagnose=False), g_.shape[2], d)
        init = np.zeros(d) if y0 is None else np.asarray(y0, dtype=float)
        if (divs, choices) not in _fast_settings_VIE_1:
            raise _no_compiled_driver(divs, choices)

        def _regular():
            k_c = np.ascontiguousarray(kernel_reg, dtype=np.float64)
            g_c = np.ascontiguousarray(g_[:N_reg], dtype=np.float64)
            return _dlang_module.solve_vie1_vec_d(g_c, k_c, init, dt, divs, choices, True,
                                                  continuous)
        return _with_tail(kind, _regular, K, g_, None, init, dt, divs, choices, M_reg, Qp, d)
    g_ = np.zeros(N) if g is None else np.asarray(g, dtype=float)
    init = 0.0 if y0 is None else _scalar_init(y0)
    fast = (divs, choices) in _fast_settings_VIE_1

    def _regular():
        args = (g_[:N_reg], kernel_reg, init, dt, divs, choices, True, continuous)
        if fast:
            return _dlang_module.solve_vie1_d(*args)
        if diagnose:
            _fallback_warning()
        return _numba_solvers.solve_vie1_jit(*_numba_args(args, 5))
    return _with_tail(kind, _regular, K, g_, None, init, dt, divs, choices, M_reg, Qp, 0)


# ---------------------------------------------------------------------------
# Entry point for the 1.0 layer
# ---------------------------------------------------------------------------

_ENGINE = {"vie1": vie1, "vie2": vie2, "vide": vide}


def solve(equation, *, continuous=False, **engine_kw):
    """Solve with the sampled-data engine and return a `VolterraSolution`.

    ``engine_kw`` are the entry point's keyword arguments (the 1.0 layer's
    validated inputs). The solution's metadata is checked against the mesh
    the engine actually built."""
    from ._product import mesh_split
    from ._solution import _from_sampled_engine
    if equation == "vie1":
        engine_kw["continuous"] = continuous
    values, pieces = _ENGINE[equation](**engine_kw)
    Q, dt = engine_kw["Q"], float(engine_kw["dt"])
    sol = _from_sampled_engine(values, pieces, equation=equation,
                               continuous=equation == "vide" or continuous,
                               coll_setting=(engine_kw["divs"], engine_kw["choices"]),
                               samples_per_interval=Q, dt=dt,
                               quadrature=engine_kw["quadrature"])
    M_reg, Qp = mesh_split(len(values), Q)
    mesh = sol.mesh
    if len(mesh) - 1 != M_reg + (1 if Qp else 0) or (M_reg and mesh[1] != Q * dt):
        raise RuntimeError(
            f"internal error: solution metadata (Q={Q}, {M_reg} regular intervals, final "
            f"interval of {Qp} samples) disagrees with the engine's mesh of "
            f"{len(mesh) - 1} intervals. This is a bug in voles; please report it.")
    return sol
