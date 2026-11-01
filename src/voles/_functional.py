"""Callable-input Volterra solvers with arbitrary mesh and singular-kernel support.

These solvers accept callables (`kernel(u)`, `g(t)`, `a(t)`) rather than sampled
arrays. The user supplies `mesh_breakpoints` (a strictly-increasing 1-D array
starting at 0); each interval gets one Lagrange polynomial of degree
`len(coll_choices) - 1`, with collocation nodes at fractional positions
`coll_choices[k] / coll_divs` within the interval.

This convention differs from the existing array-based solvers, which nest a
mesh interval as `coll_divs` uniform sub-intervals. Here `coll_divs` only sets
node positions; users wanting finer resolution pass more breakpoints.

Architecture: Python precomputes a weight tensor `W[n,i,l,k]` such that
`integral over interval l of K(tau_{n,i} - s) y(s) ds = sum_k W[n,i,l,k] y_{l,k}`,
where `y` on interval `l` is expanded in the Lagrange basis on the collocation
nodes. The D extension then runs the per-step linear-algebra hot loop on `W`
with zero kernel callbacks.

scipy (a core dependency since 0.6.0) is imported lazily, so the array-based
solvers work without it.
"""

from __future__ import annotations

import contextlib
import functools
import warnings
from concurrent.futures import ThreadPoolExecutor

from ._common import (_column_workers, _check_vie1_setting, _warn_g_start_columns,
                      _scalar_init, _lagrange_basis_coefs, _lagrange_antideriv_coefs, _vide_basis_coefs, _eval_poly_at, _vie1_cont_basis_coefs, _vie1_cont_advance)

import numpy as np
from numpy.polynomial import polynomial as npp

from ._solution import _SolutionFunction, _complex_solution
from . import _validate as _v
from ._warnings import _warn, AccuracyWarning, VolesWarning


try:
    _ComplexWarning = np.exceptions.ComplexWarning
except AttributeError:  # numpy < 1.25
    _ComplexWarning = np.ComplexWarning


# Gauss-Legendre order of the smooth-block quadrature (formerly the private
# keyword _smooth_gl_order of the public solvers).
_SMOOTH_GL_ORDER = 6


def _scalar_callable_value(value, t, name="g"):
    """``name(t)`` (g or a) for a scalar equation as a 0-d array. A non-scalar
    return (e.g. a (d,) vector with a scalar kernel) gets a ValueError naming
    the shapes instead of float()'s TypeError; a complex value is left for
    the float64 assignment, whose ComplexWarning _escalate_complex_warning
    turns into its clear error."""
    arr = np.asarray(value)
    if arr.size != 1:
        raise ValueError(
            f"{name}(t) returned shape {arr.shape} at t={t:.6g}, but kernel(u) returns a "
            f"scalar: for a vector equation kernel(u) must return a (d, d) matrix.")
    if arr.dtype.kind in "biufc" and not np.isfinite(arr).all():
        raise ValueError(f"{name}(t) returned a non-finite value ({arr.item()!r}) at "
                         f"t={t:.6g}; inputs must be finite")
    return arr.reshape(())


_scalar_g_value = _scalar_callable_value


def _escalate_complex_warning(fn):
    """Decorator: while ``fn`` runs, escalate numpy ComplexWarning to an
    exception, then catch it and re-raise as a clear ValueError.

    Multi-point sampling can miss kernels whose complex range falls outside the
    sample u-values (a real false negative of any finite sampling scheme). When
    the real-path build then encounters a complex value, numpy's default behavior
    is to lossy-cast it to float64 with a ``ComplexWarning`` -- which most users
    won't see. This wrapper turns that silent data loss into a loud, actionable
    error: detection guarantees become "either fast path via sampling, or clean
    error" with no third path of silently wrong answers.

    Note: the complex dispatch happens *inside* fn (before the real-path build),
    so the wrapped function still routes complex inputs through block
    decomposition normally. This wrapper only fires when sampling missed and the
    real-path build hits a complex value.
    """
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        with warnings.catch_warnings():
            warnings.filterwarnings('error', category=_ComplexWarning)
            try:
                return fn(*args, **kwargs)
            except _ComplexWarning as e:
                raise ValueError(
                    "Complex values were encountered during the real-path "
                    "solver build, but multi-point sampling of kernel/g/a "
                    "did not detect them. Make your callables return a "
                    "consistent dtype (either always complex or always real) "
                    "across the integration domain and re-run."
                ) from e
    return wrapper


_SCIPY_IMPORT_ERR = (
    "function_solve_* requires scipy, which is a core dependency and should "
    "normally be present. If you used a slim/--no-deps install, add it via "
    "`pip install scipy`."
)


def _import_scipy_quad():
    try:
        from scipy.integrate import quad
    except ImportError as e:
        raise ImportError(_SCIPY_IMPORT_ERR) from e
    return quad


def _import_scipy_quad_vec():
    try:
        from scipy.integrate import quad_vec
    except ImportError as e:
        raise ImportError(_SCIPY_IMPORT_ERR) from e
    return quad_vec


# Quadrature options for the weight builders. Under reuse_adaptive_blocks the
# tightened options apply ONLY to declared-singularity blocks: their one
# computed value is reused for every row, so it is requested at a tighter
# tolerance than the per-row defaults it replaces. Two-order-check fallback
# quadratures always use the defaults and stay on the per-row repair path, so
# the flag is a strict no-op for kernels with no declared singularity.
# scipy.integrate.quad converges when err <= max(epsabs, epsrel*|result|).
# Its default epsabs=1.49e-8 is an ABSOLUTE floor, which on the tiny leading
# intervals of a graded mesh exceeds the block weights themselves (a weight
# of an Abel kernel over width h is ~2 sqrt(h) ~ 1e-5 at h ~ 1e-11), letting
# first-kind solves lose accuracy as the mesh is refined. Relative-only
# convergence (epsabs=0) keeps every block at its own scale, matching the
# vector path's quad_vec options below.
_QUAD_OPTS_DEFAULT = {'limit': 100, 'epsabs': 0.0, 'epsrel': 1.49e-8}
# Strictly tighter than the defaults in relative terms.
_QUAD_OPTS_REUSE = {'limit': 200, 'epsabs': 0.0, 'epsrel': 1e-12}
# scipy.integrate.quad_vec defaults to epsabs=1e-200 (pure-relative 1e-8
# convergence). Keep that epsabs so small-magnitude blocks are never computed
# *less* accurately than the per-row defaults; tighten only epsrel.
_QUAD_VEC_OPTS_REUSE = {'limit': 200, 'epsabs': 1e-200, 'epsrel': 1e-12}
# quad_vec's convergence test is strict (err < max(epsabs, epsrel*norm)), so
# with epsabs=0 an identically zero block never converges and runs to the
# subdivision limit; the vector builder therefore keeps the 1e-200 floor in
# its default options too.
_QUAD_VEC_OPTS_DEFAULT = {'limit': 100, 'epsabs': 1e-200, 'epsrel': 1.49e-8}


@contextlib.contextmanager
def _reuse_quad_warnings_suppressed(active):
    """Silence scipy's IntegrationWarning around a tightened reuse quadrature.

    The 1e-12 reuse tolerances sit near QUADPACK's roundoff floor, so on
    harder singular integrands quad/quad_vec may report non-convergence while
    still returning its best-obtainable value -- which is exactly what the
    reuse policy wants stored. The default-tolerance path never triggers
    these, so with ``active`` False this is a no-op and any warning from a
    default-tolerance quadrature propagates as before."""
    if not active:
        yield
        return
    from scipy.integrate import IntegrationWarning
    with warnings.catch_warnings():
        warnings.simplefilter('ignore', IntegrationWarning)
        yield


# ---------------------------------------------------------------------------
# Lagrange basis construction (normalized [0, 1] coordinates)
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# Collocation-node resolution
# ---------------------------------------------------------------------------

def _resolve_node_pos(coll_nodes, coll_divs, coll_choices, *,
                      default_divs: int, default_choices: list[int],
                      exclude_zero: bool, fname: str):
    """Resolve collocation node positions in [0, 1] from either an explicit
    ``coll_nodes`` float array or the ``(coll_divs, coll_choices)`` integer pair.

    Exactly one specification may be given; supplying ``coll_nodes`` together
    with either integer parameter is an error. When neither integer parameter is
    supplied they fall back to ``(default_divs, default_choices)``.

    ``exclude_zero`` is ``True`` for VIE-1, where 0 is not a permitted node.

    Returns ``(node_pos, divs, choices)``: a sorted float array of node
    positions, plus the resolved integer setting -- or ``(None, None)`` for the
    ``coll_nodes`` path, so callers can skip integer-only checks (e.g. the
    VIE-1 non-convergent-setting blocklist).
    """
    if coll_nodes is not None:
        if coll_divs is not None or coll_choices is not None:
            raise ValueError(
                f"{fname}: pass either coll_nodes or coll_divs/coll_choices, "
                f"not both")
        nodes = np.asarray(coll_nodes, dtype=float)
        if nodes.ndim != 1 or nodes.size < 1:
            raise ValueError(
                "coll_nodes must be a 1-D array with at least one entry")
        if not np.all(np.isfinite(nodes)):
            raise ValueError("coll_nodes entries must be finite")
        if exclude_zero:
            if np.any(nodes <= 0.0) or np.any(nodes > 1.0):
                raise ValueError("coll_nodes must lie in (0, 1]")
        else:
            if np.any(nodes < 0.0) or np.any(nodes > 1.0):
                raise ValueError("coll_nodes must lie in [0, 1]")
        nodes = np.sort(nodes)
        if nodes.size > 1 and np.min(np.diff(nodes)) < 1e-12:
            raise ValueError("coll_nodes entries must be distinct")
        return nodes, None, None

    # Integer (coll_divs, coll_choices) path -- preserves the original messages.
    # Only coll_divs given: every sub-interval point the method admits; only
    # coll_choices given: coll_divs is the largest choice.
    if coll_divs is None and coll_choices is None:
        divs, choices = default_divs, default_choices
    elif coll_choices is None:
        divs = _v.integer("coll_divs", coll_divs, minimum=1,
                          type_msg=f"coll_divs must be a positive integer, got {coll_divs!r}",
                          value_msg="coll_divs must be a positive integer")
        choices = list(range(1 if exclude_zero else 0, divs + 1))
    elif coll_divs is None:
        choices = list(coll_choices)
        if not choices:
            raise ValueError("coll_choices must contain at least one entry")
        for c in choices:
            if isinstance(c, bool) or not isinstance(c, (int, np.integer)):
                raise TypeError(
                    f"coll_choices must be a list of integers, got {type(c).__name__}")
        divs = max(int(c) for c in choices)
    else:
        divs, choices = coll_divs, coll_choices
    divs = _v.integer("coll_divs", divs, minimum=1,
                      type_msg=f"coll_divs must be a positive integer, got {divs!r}",
                      value_msg="coll_divs must be a positive integer")
    for c in choices:
        # bool is a subclass of int in Python; reject anyway since it's never intended
        if isinstance(c, bool) or not isinstance(c, (int, np.integer)):
            raise TypeError(
                f"coll_choices must be a list of integers, got {type(c).__name__}")
    choices = sorted(int(c) for c in choices)
    if exclude_zero and 0 in choices:
        raise ValueError(
            "zero is not a valid VIE-1 collocation choice (both sides of the "
            "equation vanish at t=0)")
    if len(set(choices)) != len(choices):
        raise ValueError("coll_choices entries must be distinct")
    lo = 1 if exclude_zero else 0
    for c in choices:
        if not lo <= c <= divs:
            raise ValueError(f"coll_choices must lie in [{lo}, {divs}]")
    node_pos = np.asarray(choices, dtype=float) / divs
    return node_pos, divs, choices


# ---------------------------------------------------------------------------
# Weight-tensor builder
# ---------------------------------------------------------------------------

def _normalize_kernel_singularity(kernel_singularity):
    """Return ``(locator, is_convolution)``.

    ``locator`` is a callable `t -> list[(s_location, alpha_or_None)]`.
    Accepts None, float, list of float, dict, or callable. The
    float/list/dict forms are convolution-style (`s = t - u` for each
    declared u); the dict form additionally attaches a known power-law
    exponent to each location: ``{u: alpha}`` declares
    K(v) ~ |v - u|^{-alpha} near v = u, enabling deterministic Gauss-Jacobi
    quadrature for the blocks that singularity touches, with ``alpha=None``
    keeping the adaptive treatment for that location. A callable locator is
    reserved for non-convolution kernels: ``is_convolution`` is False and
    every location it yields is treated as power-unknown (adaptive).
    """
    if kernel_singularity is None:
        return (lambda t: []), True
    if callable(kernel_singularity):
        return (lambda t, _f=kernel_singularity: [(s, None) for s in _f(t)],
                False)

    def _location(u):
        # bool is an int subclass: True would silently declare location 1.0.
        if isinstance(u, (bool, np.bool_)):
            raise TypeError(
                "kernel_singularity locations must be real numbers, got a "
                f"bool ({u}); pass the singular location in kernel "
                "coordinates, e.g. kernel_singularity=0.0 for K(u) ~ u^-a.")
        try:
            return float(u)  # accepts numpy scalars and 0-d arrays too
        except (TypeError, ValueError) as exc:
            raise TypeError(
                "kernel_singularity locations must be real numbers, got "
                f"{u!r}") from exc

    if isinstance(kernel_singularity, dict):
        declared = []
        for u, alpha in kernel_singularity.items():
            if alpha is not None:
                alpha = float(alpha)
                if not 0.0 < alpha < 1.0:
                    raise ValueError(
                        "kernel_singularity power-law exponents must satisfy "
                        f"0 < alpha < 1 (got alpha={alpha} for location {u}); "
                        "use None to keep adaptive quadrature for a location "
                        "with unknown or non-power-law behavior.")
            declared.append((_location(u), alpha))
    elif np.ndim(kernel_singularity) == 0:
        declared = [(_location(kernel_singularity), None)]
    else:
        declared = [(_location(u), None) for u in kernel_singularity]
    return (lambda t, _us=tuple(declared): [(t - u, al) for u, al in _us],
            True)


def _empty_singularity_to_none(kernel_singularity):
    """Canonicalize an empty list/tuple/dict/array declaration to None.

    An empty container declares no singular locations, so it must behave
    exactly like ``kernel_singularity=None`` everywhere — including the
    ``is None`` checks that gate the VIE-1 convergence guard and the
    uniform-mesh warning. Called once at each public entry point.
    """
    if kernel_singularity is None or callable(kernel_singularity):
        return kernel_singularity
    if isinstance(kernel_singularity, dict):
        return kernel_singularity or None
    if np.ndim(kernel_singularity) == 0:
        return kernel_singularity
    return kernel_singularity if len(kernel_singularity) > 0 else None


@functools.lru_cache(maxsize=16)
def _gauss_legendre_nodes_weights(order: int) -> tuple[np.ndarray, np.ndarray]:
    """Standard Gauss-Legendre nodes and weights on [-1, 1] (cached per order)."""
    nodes, weights = np.polynomial.legendre.leggauss(order)
    nodes.setflags(write=False)
    weights.setflags(write=False)
    return nodes, weights


@functools.lru_cache(maxsize=64)
def _gauss_jacobi_nodes_weights(order: int, alpha: float, left: bool):
    """Gauss-Jacobi nodes and weights on [-1, 1] for the weight
    (1-x)^{-alpha} (singularity at the right endpoint) or (1+x)^{-alpha}
    (``left=True``), cached per (order, alpha, side). Nodes are interior, so
    integrands are never evaluated at the singular point."""
    try:
        from scipy.special import roots_jacobi
    except ImportError as e:
        raise ImportError(_SCIPY_IMPORT_ERR) from e
    a, b = (0.0, -alpha) if left else (-alpha, 0.0)
    nodes, weights = roots_jacobi(order, a, b)
    nodes.setflags(write=False)
    weights.setflags(write=False)
    return nodes, weights


# Off-diagonal blocks per batched kernel call in the W builders' smooth path
# (bounds the (blocks, nodes, GL order[, d, d]) scratch arrays).
_SMOOTH_BATCH = 256


def _smooth_offdiag_batch_vals(kernel, ls, taus, mesh_breakpoints, orders, gl,
                               B_off, tail):
    """Two-order estimates for many full off-diagonal blocks l in ``ls`` at
    once (all nodes ``taus`` smooth, kernel vectorized): one kernel call and
    one einsum per order for the whole batch instead of per block. ``tail``
    is the kernel value shape, () for scalar or (d, d) for vector equations.
    Returns two (L, p, n_basis, *tail) arrays."""
    a_int = mesh_breakpoints[ls]
    b_int = mesh_breakpoints[ls + 1]
    half = 0.5 * (b_int - a_int)
    mid = 0.5 * (a_int + b_int)
    half_b = half.reshape((-1, 1, 1) + (1,) * len(tail))
    est = []
    for o in orders:
        nodes, weights = gl[o]
        s_points = mid[:, None] + half[:, None] * nodes[None, :]      # (L, o)
        arg = taus[None, :, None] - s_points[:, None, :]              # (L, p, o)
        kvals = np.asarray(kernel(arg.reshape(-1)),
                           dtype=np.float64).reshape(arg.shape + tail)
        est.append(half_b
                   * np.einsum('kq,q,liq...->lik...', B_off[o], weights, kvals))
    return est[0], est[1]


def _store_two_order(W, n, is_, ls, v1, v2, tol, fallback):
    """The W builders' one acceptance rule for fixed-order block estimates.

    Store the higher-order estimate ``v2`` for blocks ``ls`` of row n at
    nodes ``is_`` (``v1``, ``v2``: ``(L, n_i, n_basis, *tail)``, ``tail`` the
    kernel value shape), then accept each (block, node, basis) iff
    ``max|v1 - v2| <= tol * max(1, max|v2|)`` over the ``tail`` entries. The
    negation (which also catches NaN) sends the entry to ``fallback(bj, bi,
    bk)``, which returns the adaptively integrated value to store instead.
    Returns the ``(L, n_i, n_basis)`` acceptance mask. Used for the batched
    and per-block smooth paths, the diagonal blocks and the Gauss-Jacobi
    blocks of both the scalar and the vector builder."""
    is_ = np.asarray(is_, dtype=np.intp)
    ls = np.asarray(ls, dtype=np.intp)
    W[n][is_[:, None], ls[None, :]] = np.swapaxes(v2, 0, 1)
    tail_axes = tuple(range(3, v2.ndim))
    err = np.max(np.abs(v1 - v2), axis=tail_axes)               # (L, n_i, n_basis)
    ref = np.maximum(1.0, np.max(np.abs(v2), axis=tail_axes))
    ok = err <= tol * ref
    for bj, bi, bk in zip(*(ix.tolist() for ix in np.nonzero(~ok))):
        W[n, is_[bi], ls[bj], bk] = fallback(bj, bi, bk)
    return ok


def _integrate_smooth_batch(W, n, ls, tau_n, ok_off, *, kernel, mesh_breakpoints,
                            widths, orders, gl, B_off, tol, get_quad,
                            make_integrand):
    """Off-diagonal blocks ``ls`` of row n of W whose nodes are all smooth:
    batched two-order values, stored and checked by `_store_two_order`
    (fallback: adaptive quadrature via ``get_quad()``). When ``ok_off`` is
    given, records per-(node, lag) acceptance. Shared by the scalar and
    vector W builders; the kernel value shape is W.shape[4:]."""
    tail = W.shape[4:]
    p = W.shape[1]
    for c0 in range(0, len(ls), _SMOOTH_BATCH):
        lb = np.asarray(ls[c0:c0 + _SMOOTH_BATCH])
        v1, v2 = _smooth_offdiag_batch_vals(kernel, lb, tau_n, mesh_breakpoints,
                                            orders, gl, B_off, tail)

        def fallback(bj, bi, bk, lb=lb):
            l = int(lb[bj])
            val, _err = get_quad()(
                make_integrand(tau_n[bi], mesh_breakpoints[l], widths[l], bk),
                mesh_breakpoints[l], mesh_breakpoints[l + 1], **_QUAD_OPTS_DEFAULT)
            return val
        ok = _store_two_order(W, n, np.arange(p), lb, v1, v2, tol, fallback)
        if ok_off is not None:
            ok_off[:, n - lb] = ok.all(axis=2).T


def _classify_sing_block(sing, a_int, b_int):
    """Classify block [a_int, b_int] against declared singular locations.

    ``sing`` is a list of (s_location, alpha_or_None) pairs from the
    normalized locator. Returns ``(interior, mode, jinfo)``: ``interior`` is
    the raw interior s-locations (fed to quad's `points`); ``mode`` is
    'smooth' (no singularity touches the block), 'jacobi' (exactly one
    touching singularity, with a declared power -- deterministic fixed-order
    rule), or 'adaptive'; ``jinfo`` is the (s0, alpha) pair when mode is
    'jacobi', else None."""
    tol = 1e-12 * max(1.0, abs(b_int - a_int))
    touching = []
    interior = []
    for sp, alpha in sing:
        if a_int + tol < sp < b_int - tol:
            touching.append((sp, alpha))
            interior.append(sp)
        elif abs(sp - a_int) < tol or abs(sp - b_int) < tol:
            touching.append((sp, alpha))
    if not touching:
        return interior, 'smooth', None
    if len(touching) == 1 and touching[0][1] is not None:
        return interior, 'jacobi', touching[0]
    return interior, 'adaptive', None


def _detect_kernel_vectorized(kernel, sample_u: float, is_vector: bool, d: int) -> bool:
    """Return True if ``kernel`` returns the expected shape when called with
    a small array of u values. Detected once at the top of a W build to pick
    the vectorized GL path uniformly.
    """
    test_arr = np.array([sample_u, sample_u * 1.1, sample_u * 1.2])
    try:
        result = kernel(test_arr)
    except Exception:
        return False
    arr = np.asarray(result)
    expected = (3, d, d) if is_vector else (3,)
    return arr.shape == expected


def _toeplitz_w_rows(widths: np.ndarray, is_convolution: bool) -> bool:
    """Return True when the weight tensor is Toeplitz in (n, l), so blocks of
    equal lag are the same integral.

    On a uniform mesh the convolution kernel makes every block integral
    shift-invariant: substituting sigma = s - t_l,

        W[n, i, l, k] = integral_0^h K((n - l + x_i) h - sigma) L_k(sigma/h) dsigma

    depends on (n, l) only through the lag n - l. ``is_convolution`` comes
    from _normalize_kernel_singularity: a callable ``kernel_singularity`` is
    reserved for non-convolution kernels and disables the fast path.

    Reuse policy: only blocks evaluated by a deterministic fixed-order rule
    (Gauss-Legendre, or Gauss-Jacobi for declared power-law singularities)
    and accepted by the two-order check are copied across rows -- the copy
    reproduces a per-row evaluation to rounding level (~1e-15). Blocks that
    involve adaptive quadrature (power-unknown singular blocks and two-order
    fallbacks) are recomputed for every row with exactly the same calls as
    the general path, because adaptive results are reproducible only to the
    quadrature tolerance (~1e-8), not to rounding.

    The uniformity test is deliberately strict (1e-12 relative): meshes from
    ``np.linspace``/``optimal_graded_mesh(alpha=0)`` pass at ~1e-16, and a mesh
    that is merely close to uniform must take the general path.
    """
    if len(widths) < 2 or not is_convolution:
        return False
    w_mean = float(widths.mean())
    return float(widths.max() - widths.min()) <= 1e-12 * w_mean


def _maybe_singular_blocks(sing_per_i, mesh_breakpoints, n):
    """Boolean mask over blocks l < n: False only where no declared singular
    location of any node can touch [t_l, t_{l+1}] under _classify_sing_block's
    tolerance. A conservative screen (it may flag extra blocks, never miss
    one), so unflagged blocks are known smooth without the per-(node, block)
    classification call; flagged ones still go through it."""
    flagged = np.zeros(n, dtype=bool)
    if n == 0:
        return flagged
    bps = mesh_breakpoints[:n + 1]
    # >= every per-block tol 1e-12 * max(1, width) used by the classifier
    tol = 2e-12 * max(1.0, float(bps[-1] - bps[0]))
    for sing in sing_per_i:
        for sp, _alpha in sing:
            lo = np.searchsorted(bps, sp - tol, side='left') - 1
            hi = np.searchsorted(bps, sp + tol, side='right')
            flagged[max(lo, 0):min(hi, n)] = True
    return flagged


def _pending_lags(dirty_lags: np.ndarray, n: int) -> list:
    """Off-diagonal blocks of row n that still need integration, as block
    indices l = n - m for the pending lags m <= n. ``dirty_lags`` is the
    sorted array of lags (>= 1) whose blocks are not fully reusable,
    computed once per assembly rather than rescanned per row. Block order
    is irrelevant (blocks are independent)."""
    prefix = dirty_lags[:np.searchsorted(dirty_lags, n, side="right")]
    return (n - prefix).tolist()


def _assemble_w_rows(W, M, toeplitz, reuse_sing, integrate_row):
    """Shared row-assembly policy for the scalar and vector W builders.

    On the Toeplitz fast path: integrate the last row (which contains every
    lag), band-copy it with _fill_toeplitz_w, then recompute the
    non-reusable entries of every other row exactly as the general path
    would (see _toeplitz_w_rows for the reuse policy). With ``reuse_sing``
    the declared-singularity entries also keep their one tightened-tolerance
    value; two-order fallback entries are always repaired per row, so the
    reuse flag cannot change results for kernels with no declared
    singularity. Off the fast path: integrate every row.

    ``integrate_row`` is the builder's closure implementing the skip/record
    contract documented on the scalar builder's integrate_row.
    """
    if not toeplitz:
        for n in range(M):
            integrate_row(n)
        return
    # (_toeplitz_w_rows returns False for M < 2, so M >= 2 here.)
    ok_off, ok_diag, sing_off, sing_diag = integrate_row(M - 1, record=True)
    _fill_toeplitz_w(W, M)
    skip_off = ok_off | sing_off if reuse_sing else ok_off
    skip_diag = ok_diag | sing_diag if reuse_sing else ok_diag
    # Lags whose blocks are not fully reusable, computed once (lag 0 is the
    # diagonal, handled separately). When no lag and no diagonal entry needs
    # work, the repair loop would visit every row and find nothing -- skip
    # its O(M) per-row scaffolding entirely; results are identical.
    dirty_lags = np.nonzero(~skip_off.all(axis=0)[1:])[0] + 1
    if dirty_lags.size == 0 and skip_diag.all():
        return
    for n in range(M - 1):
        integrate_row(n, skip_off=skip_off, dirty_lags=dirty_lags,
                      skip_diag=skip_diag)


def _fill_toeplitz_w(W: np.ndarray, M: int) -> None:
    """Provisionally fill rows 0..M-2 of a Toeplitz weight tensor from the
    integrated row M-1: blocks of equal lag are equal, so

        W[n, :, l, ...]  =  W[M-1, :, l + (M-1-n), ...]   (lag n - l, l < n)
        W[n, :, n, ...]  =  W[M-1, :, M-1, ...]           (diagonal, lag 0)

    Entries with l > n stay zero. One contiguous slice copy per row. Entries
    whose row-(M-1) values involved adaptive quadrature are overwritten by an
    exact per-row recomputation afterwards (see _toeplitz_w_rows).
    """
    top = W[M - 1]
    for n in range(M - 1):
        if n:
            W[n, :, :n] = top[:, M - 1 - n:M - 1]
        W[n, :, n] = top[:, M - 1]


def _build_w_with_basis_scalar(kernel, mesh_breakpoints: np.ndarray,
                                node_pos: np.ndarray,
                                kernel_singularity,
                                smooth_gl_order: int, basis: np.ndarray,
                                smooth_check_tol: float = 1e-9,
                                reuse_adaptive_blocks: bool = False) -> np.ndarray:
    """Build the weight tensor W[n, i, l, k] = integral of K(tau_{n,i} - s)
    times basis[k](s_norm) on interval l. Shape (M, p, M, n_basis).

    `basis` rows hold the polynomial coefficients of each basis function in
    normalized [0, 1] coordinates. VIE-2 uses the Lagrange basis (n_basis = p);
    VIDE uses the antiderivative basis plus a constant function (n_basis = p+1).
    `node_pos` holds the collocation node positions in [0, 1].

    ``reuse_adaptive_blocks`` extends the uniform-mesh Toeplitz reuse to the
    adaptive-quadrature blocks (see the public solvers' docstrings); it has
    no effect off the Toeplitz fast path.
    """
    M = len(mesh_breakpoints) - 1
    node_pos = np.asarray(node_pos, dtype=float)
    p = len(node_pos)
    n_basis = basis.shape[0]
    widths = np.diff(mesh_breakpoints)
    singular_locs, is_convolution = _normalize_kernel_singularity(kernel_singularity)

    # Uniform mesh + convolution kernel: W is Toeplitz in (n, l) (see
    # _toeplitz_w_rows). With reuse_adaptive_blocks the declared-singularity
    # entries of the one integrated row are reused everywhere, so they are
    # computed at tightened tolerance: the reused value is then closer to the
    # exact integral than the default-tolerance per-row values it replaces.
    # Two-order fallback quadratures always use the default options (see the
    # module-level _QUAD_OPTS_* constants), keeping the flag a strict no-op
    # for kernels with no declared singularity.
    toeplitz = _toeplitz_w_rows(widths, is_convolution)
    reuse_sing = reuse_adaptive_blocks and toeplitz
    sing_quad_opts = _QUAD_OPTS_REUSE if reuse_sing else _QUAD_OPTS_DEFAULT

    # Detect once whether the kernel broadcasts over a numpy array of u values;
    # if so, the smooth-path GL quadrature can be done in a single numpy call.
    sample_u = float(widths[0]) * 0.5
    kernel_vec = _detect_kernel_vectorized(kernel, sample_u, is_vector=False, d=0)

    # On a smooth block the kernel K(tau - s) sampled at the Gauss-Legendre nodes
    # is the same for every basis function, and the basis values at those nodes
    # are the same for every block of a given kind. Precompute, per GL order:
    #   - the nodes/weights,
    #   - B_off[k, q] = L_k(s_norm) for a full interval l < n  (s_norm in [0,1]),
    #   - B_diag[i, k, q] = L_k(s_norm) for the partial diagonal block l == n,
    #     where the upper limit is the collocation node tau_{n,i}.
    # Then each smooth block costs one kernel evaluation plus a small matmul,
    # instead of a separate quadrature (with its own kernel evals and polyval)
    # per basis function. The two-order convergence check is kept per block.
    orders = (smooth_gl_order, smooth_gl_order + 2)
    gl = {}
    B_off = {}
    B_diag = {}
    for o in orders:
        nodes, weights = _gauss_legendre_nodes_weights(o)
        gl[o] = (nodes, weights)
        xn_full = 0.5 * (nodes + 1.0)
        B_off[o] = np.array([npp.polyval(xn_full, basis[k]) for k in range(n_basis)])
        Bd = np.empty((p, n_basis, o), dtype=np.float64)
        for i in range(p):
            xn = node_pos[i] * 0.5 * (nodes + 1.0)
            for k in range(n_basis):
                Bd[i, k] = npp.polyval(xn, basis[k])
        B_diag[o] = Bd

    def smooth_diag_vals(a_int, b_int, tau, i):
        """Two-order estimates for the partial diagonal block l == n, whose upper
        limit is the collocation node tau and whose basis-at-nodes table is the
        node-specific B_diag[o][i]. Returns two length-n_basis arrays."""
        half = 0.5 * (b_int - a_int)
        mid = 0.5 * (a_int + b_int)
        est = []
        for o in orders:
            nodes, weights = gl[o]
            s_points = mid + half * nodes
            arg = tau - s_points
            if kernel_vec:
                kvals = np.asarray(kernel(arg), dtype=np.float64)
            else:
                # No forced float dtype: a complex value here (a kernel the
                # sampler misclassified as real) must reach the float64 W
                # assignment so the ComplexWarning fires and is escalated, as
                # in the original per-node path.
                kvals = np.array([kernel(a) for a in arg])
            est.append(half * (B_diag[o][i] @ (weights * kvals)))
        return est[0], est[1]

    def smooth_offdiag_vals(a_int, b_int, taus):
        """Two-order estimates for a full off-diagonal block [a_int, b_int] shared
        by all collocation nodes in `taus`. The kernel is sampled once across the
        (n_i, order) grid of tau_i - s; returns two (n_i, n_basis) arrays."""
        half = 0.5 * (b_int - a_int)
        mid = 0.5 * (a_int + b_int)
        est = []
        for o in orders:
            nodes, weights = gl[o]
            s_points = mid + half * nodes              # (o,)
            arg = taus[:, None] - s_points[None, :]    # (n_i, o)
            if kernel_vec:
                kvals = np.asarray(kernel(arg.reshape(-1)),
                                   dtype=np.float64).reshape(len(taus), o)
            else:
                # No forced float dtype (see note in smooth_diag_vals).
                kvals = np.array([[kernel(a) for a in row] for row in arg])  # (n_i, o)
            est.append(half * np.einsum('kq,q,iq->ik', B_off[o], weights, kvals))
        return est[0], est[1]

    quad = None
    W = np.zeros((M, p, M, n_basis), dtype=np.float64)

    def get_quad():
        nonlocal quad
        if quad is None:
            quad = _import_scipy_quad()
        return quad

    def make_integrand(tau, t_l, h_l, k, sing_pts=()):
        L_k = basis[k]
        def integrand(s, _tau=tau, _t_l=t_l, _h_l=h_l, _L_k=L_k, _sp=sing_pts):
            # The integrand's value exactly AT a declared singular point is
            # irrelevant (a measure-zero set), but adaptive subdivision can
            # place an evaluation there to the last ulp -- and whatever the
            # kernel returns for it (0, inf, or a huge clamped value) must
            # not leak into the weights.
            for spt in _sp:
                if s == spt:
                    return 0.0
            x_norm = (s - _t_l) / _h_l
            return kernel(_tau - s) * npp.polyval(x_norm, _L_k)
        return integrand

    def adaptive_block(n, i, l, tau, t_l, h_l, a_int, b_int, interior_sing,
                       sing_pts):
        """Singular block: per-basis adaptive quadrature."""
        for k in range(n_basis):
            kwargs = dict(sing_quad_opts)
            if interior_sing:
                kwargs['points'] = interior_sing
            with _reuse_quad_warnings_suppressed(reuse_sing):
                val, _err = get_quad()(make_integrand(tau, t_l, h_l, k, sing_pts),
                                       a_int, b_int, **kwargs)
            W[n, i, l, k] = val

    def jacobi_vals(tau, t_l, h_l, a_int, b_int, s0, alpha):
        """Two-order Gauss-Jacobi estimates for a block touched by one
        declared power-law singularity: K(tau - s) ~ |s - s0|^{-alpha} times
        a smooth factor near s = s0. An interior s0 splits the block into
        two endpoint-singular halves. On each half the singular factor is
        absorbed into the Jacobi weight and the smooth remainder
        g_k(s) = K(tau - s) |s - s0|^alpha L_k(s_norm) is sampled at the
        (interior) Jacobi nodes. Returns two length-n_basis arrays."""
        tol = 1e-12 * max(1.0, abs(b_int - a_int))
        if s0 <= a_int + tol:
            segs = [(a_int, b_int, True)]
        elif s0 >= b_int - tol:
            segs = [(a_int, b_int, False)]
        else:
            segs = [(a_int, s0, False), (s0, b_int, True)]
        est = [np.zeros(n_basis), np.zeros(n_basis)]
        for aa, bb, left in segs:
            half = 0.5 * (bb - aa)
            mid = 0.5 * (aa + bb)
            for oi, o in enumerate(orders):
                nodes, jw = _gauss_jacobi_nodes_weights(o, alpha, left)
                s_pts = mid + half * nodes
                if kernel_vec:
                    kv = np.asarray(kernel(tau - s_pts), dtype=np.float64)
                else:
                    kv = np.array([kernel(tau - s) for s in s_pts])
                g = jw * kv * np.abs(s_pts - s0) ** alpha   # (o,)
                x_norm = (s_pts - t_l) / h_l
                scale = half ** (1.0 - alpha)
                for k in range(n_basis):
                    est[oi][k] += scale * float(
                        np.dot(g, npp.polyval(x_norm, basis[k])))
        return est[0], est[1]

    def store_jacobi(n, i, l, tau, t_l, h_l, a_int, b_int, interior_sing,
                     sing_pts, s0, alpha):
        """Store the higher-order Gauss-Jacobi estimate for every basis
        function, with the same two-order acceptance as the smooth path; any
        failing basis function (wrong declared alpha, extra structure like a
        log factor) falls back to adaptive quadrature at default tolerance
        and stays on the per-row repair path. Returns True iff all passed."""
        v1, v2 = jacobi_vals(tau, t_l, h_l, a_int, b_int, s0, alpha)
        kwargs = dict(_QUAD_OPTS_DEFAULT)
        if interior_sing:
            kwargs['points'] = interior_sing

        def fallback(bj, bi, bk):
            val, _err = get_quad()(make_integrand(tau, t_l, h_l, bk, sing_pts),
                                   a_int, b_int, **kwargs)
            return val
        ok = _store_two_order(W, n, [i], [l], v1[None, None], v2[None, None],
                              smooth_check_tol, fallback)
        return bool(ok.all())

    def store_smooth(n, i, l, tau, t_l, h_l, a_int, b_int, v1, v2):
        """Diagonal block of node i: store the order-(ord+2) estimate v2 under
        the two-order acceptance rule, adaptive quadrature for the failing
        basis functions. Returns True iff no fallback ran."""
        def fallback(bj, bi, bk):
            val, _err = get_quad()(make_integrand(tau, t_l, h_l, bk),
                                   a_int, b_int, **_QUAD_OPTS_DEFAULT)
            return val
        ok = _store_two_order(W, n, [i], [l], v1[None, None], v2[None, None],
                              smooth_check_tol, fallback)
        return bool(ok.all())

    def store_smooth_offdiag(n, l, smooth_is, taus, t_l, h_l, a_int, b_int, v1, v2):
        """Full off-diagonal block across all its smooth collocation nodes at
        once (v1, v2: (n_i, n_basis)); the rare failing pairs fall back to
        per-node adaptive quadrature. Returns the set of nodes (entries of
        smooth_is) that needed a fallback."""
        def fallback(bj, bi, bk):
            val, _err = get_quad()(make_integrand(taus[bi], t_l, h_l, bk),
                                   a_int, b_int, **_QUAD_OPTS_DEFAULT)
            return val
        ok = _store_two_order(W, n, smooth_is, [l], v1[None], v2[None],
                              smooth_check_tol, fallback)
        return {smooth_is[bi] for bi in np.nonzero(~ok[0].all(axis=1))[0].tolist()}

    def integrate_smooth_batch(n, ls, tau_n, ok_off):
        _integrate_smooth_batch(
            W, n, ls, tau_n, ok_off, kernel=kernel,
            mesh_breakpoints=mesh_breakpoints, widths=widths, orders=orders,
            gl=gl, B_off=B_off, tol=smooth_check_tol, get_quad=get_quad,
            make_integrand=make_integrand)

    def integrate_row(n, skip_off=None, dirty_lags=None, skip_diag=None,
                      record=False):
        """Integrate row n of W, exactly as the general path does.

        skip_off[i, m] / skip_diag[i] mark entries already holding a reusable
        GL-clean value for lag m = n - l (see _toeplitz_w_rows); dirty_lags
        is the sorted array of lags not fully clean across nodes, letting
        whole blocks be skipped without a per-row mask scan (_pending_lags).
        With record=True, return boolean masks marking which entries
        of this row were computed purely by the fixed-order GL path (ok_*)
        and which by declared-singularity adaptive quadrature (sing_*)."""
        ok_off = np.zeros((p, M), dtype=bool) if record else None
        ok_diag = np.zeros(p, dtype=bool) if record else None
        sing_off = np.zeros((p, M), dtype=bool) if record else None
        sing_diag = np.zeros(p, dtype=bool) if record else None
        t_n = mesh_breakpoints[n]
        h_n = widths[n]
        tau_n = t_n + node_pos * h_n
        sing_per_i = [singular_locs(tau_n[i]) for i in range(p)]

        # Off-diagonal blocks l < n share the interval [t_l, t_{l+1}] across all
        # collocation nodes; only tau_i differs. Sample the kernel once across the
        # smooth nodes and combine via a single einsum, peeling off any node whose
        # declared singularity falls in this block to the adaptive path.
        if dirty_lags is None:
            l_iter = range(n)
        else:
            l_iter = _pending_lags(dirty_lags, n)
        batch_ls = []   # blocks with every node smooth: done together below
        if kernel_vec and n > 0:
            # Blocks that no declared singularity can touch and that have no
            # reused entries are smooth for every node: send them straight to
            # the batch, leaving only the rest for per-node classification.
            ls_all = np.asarray(l_iter, dtype=np.intp)
            slow = _maybe_singular_blocks(sing_per_i, mesh_breakpoints, n)[ls_all]
            if skip_off is not None:
                slow |= skip_off[:, n - ls_all].any(axis=0)
            batch_ls = ls_all[~slow].tolist()
            l_iter = ls_all[slow].tolist()
        for l in l_iter:
            lag = n - l
            t_l = mesh_breakpoints[l]
            t_lp1 = mesh_breakpoints[l + 1]
            h_l = widths[l]
            a_int, b_int = t_l, t_lp1

            smooth_is = []
            for i in range(p):
                if skip_off is not None and skip_off[i, lag]:
                    continue
                interior_sing, mode, jinfo = _classify_sing_block(
                    sing_per_i[i], a_int, b_int)
                sing_pts = tuple(sp for sp, _ in sing_per_i[i])
                if mode == 'adaptive':
                    adaptive_block(n, i, l, tau_n[i], t_l, h_l, a_int, b_int,
                                   interior_sing, sing_pts)
                    if record:
                        sing_off[i, lag] = True
                elif mode == 'jacobi':
                    clean = store_jacobi(n, i, l, tau_n[i], t_l, h_l, a_int,
                                         b_int, interior_sing, sing_pts, *jinfo)
                    if record:
                        ok_off[i, lag] = clean
                else:
                    smooth_is.append(i)

            if kernel_vec and len(smooth_is) == p:
                batch_ls.append(l)
                continue
            if smooth_is:
                taus = tau_n[smooth_is]
                v1, v2 = smooth_offdiag_vals(a_int, b_int, taus)
                bad = store_smooth_offdiag(n, l, smooth_is, taus, t_l, h_l,
                                           a_int, b_int, v1, v2)
                if record:
                    for i in smooth_is:
                        ok_off[i, lag] = i not in bad

        if batch_ls:
            integrate_smooth_batch(n, batch_ls, tau_n, ok_off)

        # Diagonal block l == n: the upper limit is tau_i, so it stays per-node.
        l = n
        t_l = mesh_breakpoints[l]
        h_l = widths[l]
        a_int = t_l
        for i in range(p):
            if skip_diag is not None and skip_diag[i]:
                continue
            tau = tau_n[i]
            b_int = tau
            if b_int <= a_int:
                # Zero-width block (collocation node at the interval start):
                # W stays 0 in every row, so the entry is vacuously reusable.
                if record:
                    ok_diag[i] = True
                continue
            interior_sing, mode, jinfo = _classify_sing_block(
                sing_per_i[i], a_int, b_int)
            sing_pts = tuple(sp for sp, _ in sing_per_i[i])
            if mode == 'adaptive':
                adaptive_block(n, i, l, tau, t_l, h_l, a_int, b_int,
                               interior_sing, sing_pts)
                if record:
                    sing_diag[i] = True
                continue
            if mode == 'jacobi':
                clean = store_jacobi(n, i, l, tau, t_l, h_l, a_int, b_int,
                                     interior_sing, sing_pts, *jinfo)
                if record and clean:
                    ok_diag[i] = True
                continue
            v1, v2 = smooth_diag_vals(a_int, b_int, tau, i)
            clean = store_smooth(n, i, l, tau, t_l, h_l, a_int, b_int, v1, v2)
            if record and clean:
                ok_diag[i] = True
        return ok_off, ok_diag, sing_off, sing_diag

    # Uniform mesh + convolution kernel: W is Toeplitz in (n, l); see
    # _assemble_w_rows for the shared reuse policy.
    _assemble_w_rows(W, M, toeplitz, reuse_sing, integrate_row)

    if not np.isfinite(W).all():
        raise ValueError(
            "Kernel weight tensor contains non-finite entries -- your kernel "
            "appears to be singular. Pass `kernel_singularity=<location(s)>` "
            "to declare the singular point(s)."
        )

    return W


def _build_w_scalar(kernel, mesh_breakpoints, node_pos,
                    kernel_singularity, smooth_gl_order,
                    smooth_check_tol=1e-9, reuse_adaptive_blocks=False):
    """VIE-2 weight tensor: Lagrange basis, shape (M, p, M, p)."""
    basis = _lagrange_basis_coefs(node_pos)
    return _build_w_with_basis_scalar(kernel, mesh_breakpoints, node_pos,
                                       kernel_singularity,
                                       smooth_gl_order, basis, smooth_check_tol,
                                       reuse_adaptive_blocks)


def _build_w_with_basis_vector(kernel, mesh_breakpoints: np.ndarray,
                                node_pos: np.ndarray,
                                kernel_singularity, smooth_gl_order: int,
                                d: int, basis: np.ndarray,
                                smooth_check_tol: float = 1e-9,
                                reuse_adaptive_blocks: bool = False) -> np.ndarray:
    """Vector analogue of _build_w_with_basis_scalar. Returns (M, p, M, n_basis, d, d)."""
    M = len(mesh_breakpoints) - 1
    node_pos = np.asarray(node_pos, dtype=float)
    p = len(node_pos)
    n_basis = basis.shape[0]
    widths = np.diff(mesh_breakpoints)
    singular_locs, is_convolution = _normalize_kernel_singularity(kernel_singularity)

    # Same Toeplitz / adaptive-reuse setup as the scalar builder, except that
    # both option sets keep quad_vec's tiny absolute floor (see the
    # module-level _QUAD_VEC_OPTS_DEFAULT note).
    toeplitz = _toeplitz_w_rows(widths, is_convolution)
    reuse_sing = reuse_adaptive_blocks and toeplitz
    sing_quad_opts = _QUAD_VEC_OPTS_REUSE if reuse_sing else _QUAD_VEC_OPTS_DEFAULT

    sample_u = float(widths[0]) * 0.5
    kernel_vec = _detect_kernel_vectorized(kernel, sample_u, is_vector=True, d=d)

    # Same factorization as the scalar path: on a smooth block the (d, d) kernel
    # K(tau - s) sampled at the Gauss-Legendre nodes is the same for every basis
    # function, and the basis values at those nodes are the same for every block
    # of a given kind. Precompute, per GL order, the nodes/weights and the
    # basis-at-nodes tables (B_off for full off-diagonal blocks, B_diag for the
    # partial diagonal block l == n). Each smooth block then costs one kernel
    # evaluation per order plus a small einsum across all basis functions at
    # once, instead of a separate (d, d) quadrature per basis function.
    orders = (smooth_gl_order, smooth_gl_order + 2)
    gl = {}
    B_off = {}
    B_diag = {}
    for o in orders:
        nodes, weights = _gauss_legendre_nodes_weights(o)
        gl[o] = (nodes, weights)
        xn_full = 0.5 * (nodes + 1.0)
        B_off[o] = np.array([npp.polyval(xn_full, basis[k]) for k in range(n_basis)])
        Bd = np.empty((p, n_basis, o), dtype=np.float64)
        for i in range(p):
            xn = node_pos[i] * 0.5 * (nodes + 1.0)
            for k in range(n_basis):
                Bd[i, k] = npp.polyval(xn, basis[k])
        B_diag[o] = Bd

    def smooth_diag_vals(a_int, b_int, tau, i):
        """Two-order estimates for the partial diagonal block l == n, whose upper
        limit is the collocation node tau and whose basis-at-nodes table is the
        node-specific B_diag[o][i]. Returns two (n_basis, d, d) arrays."""
        half = 0.5 * (b_int - a_int)
        mid = 0.5 * (a_int + b_int)
        est = []
        for o in orders:
            nodes, weights = gl[o]
            s_points = mid + half * nodes
            arg = tau - s_points
            if kernel_vec:
                kvals = np.asarray(kernel(arg), dtype=np.float64)  # (o, d, d)
            else:
                kvals = np.array([np.asarray(kernel(a), dtype=np.float64)
                                  for a in arg])  # (o, d, d)
            est.append(half * np.einsum('kq,q,qde->kde', B_diag[o][i], weights, kvals))
        return est[0], est[1]

    def smooth_offdiag_vals(a_int, b_int, taus):
        """Two-order estimates for a full off-diagonal block [a_int, b_int] shared
        by all collocation nodes in `taus`. The kernel is sampled once across the
        (n_i, order) grid of tau_i - s; returns two (n_i, n_basis, d, d) arrays."""
        half = 0.5 * (b_int - a_int)
        mid = 0.5 * (a_int + b_int)
        est = []
        for o in orders:
            nodes, weights = gl[o]
            s_points = mid + half * nodes              # (o,)
            arg = taus[:, None] - s_points[None, :]    # (n_i, o)
            if kernel_vec:
                flat = np.asarray(kernel(arg.reshape(-1)), dtype=np.float64)
                kvals = flat.reshape(len(taus), o, d, d)  # (n_i, o, d, d)
            else:
                kvals = np.array([[np.asarray(kernel(a), dtype=np.float64)
                                   for a in row] for row in arg])  # (n_i, o, d, d)
            est.append(half * np.einsum('kq,q,iqde->ikde', B_off[o], weights, kvals))
        return est[0], est[1]

    quad_vec = None
    W = np.zeros((M, p, M, n_basis, d, d), dtype=np.float64)

    def get_quad_vec():
        nonlocal quad_vec
        if quad_vec is None:
            quad_vec = _import_scipy_quad_vec()
        return quad_vec

    def make_integrand(tau, t_l, h_l, k, sing_pts=()):
        L_k_coefs = basis[k]
        # The masking of exact hits on declared singular points mirrors the
        # scalar builder's make_integrand: quad_vec in particular subdivides
        # all the way to ulp scale at an endpoint singularity, where
        # tau - s rounds to the singular location exactly.
        if kernel_vec:
            def integrand(s, _tau=tau, _t_l=t_l, _h_l=h_l, _L_k=L_k_coefs,
                          _sp=sing_pts):
                if np.ndim(s) == 0:
                    for spt in _sp:
                        if s == spt:
                            return np.zeros((d, d))
                x_norm = (s - _t_l) / _h_l
                K = np.asarray(kernel(_tau - s), dtype=np.float64)
                # poly is scalar/(n,); K is (d,d)/(n,d,d). Broadcast.
                return K * npp.polyval(x_norm, _L_k)[..., None, None] \
                    if K.ndim == 3 else K * float(npp.polyval(x_norm, _L_k))
        else:
            def integrand(s, _tau=tau, _t_l=t_l, _h_l=h_l, _L_k=L_k_coefs,
                          _sp=sing_pts):
                for spt in _sp:
                    if s == spt:
                        return np.zeros((d, d))
                x_norm = (s - _t_l) / _h_l
                K = np.asarray(kernel(_tau - s), dtype=np.float64)
                return K * _eval_poly_at(_L_k, x_norm)
        return integrand

    def adaptive_block(n, i, l, tau, t_l, h_l, a_int, b_int, interior_sing,
                       sing_pts):
        """Singular block: per-basis adaptive quadrature."""
        for k in range(n_basis):
            kwargs = dict(sing_quad_opts)
            if interior_sing:
                kwargs['points'] = interior_sing
            with _reuse_quad_warnings_suppressed(reuse_sing):
                val, _err = get_quad_vec()(make_integrand(tau, t_l, h_l, k,
                                                          sing_pts),
                                           a_int, b_int, **kwargs)
            W[n, i, l, k, :, :] = val

    def jacobi_vals(tau, t_l, h_l, a_int, b_int, s0, alpha):
        """Vector analogue of the scalar builder's jacobi_vals: two-order
        Gauss-Jacobi estimates for a block touched by one declared power-law
        singularity. Returns two (n_basis, d, d) arrays."""
        tol = 1e-12 * max(1.0, abs(b_int - a_int))
        if s0 <= a_int + tol:
            segs = [(a_int, b_int, True)]
        elif s0 >= b_int - tol:
            segs = [(a_int, b_int, False)]
        else:
            segs = [(a_int, s0, False), (s0, b_int, True)]
        est = [np.zeros((n_basis, d, d)), np.zeros((n_basis, d, d))]
        for aa, bb, left in segs:
            half = 0.5 * (bb - aa)
            mid = 0.5 * (aa + bb)
            for oi, o in enumerate(orders):
                nodes, jw = _gauss_jacobi_nodes_weights(o, alpha, left)
                s_pts = mid + half * nodes
                if kernel_vec:
                    kv = np.asarray(kernel(tau - s_pts), dtype=np.float64)
                else:
                    kv = np.array([np.asarray(kernel(tau - s), dtype=np.float64)
                                   for s in s_pts])                    # (o, d, d)
                g = (jw * np.abs(s_pts - s0) ** alpha)[:, None, None] * kv
                x_norm = (s_pts - t_l) / h_l
                Bv = np.array([npp.polyval(x_norm, basis[k])
                               for k in range(n_basis)])               # (n_basis, o)
                scale = half ** (1.0 - alpha)
                est[oi] += scale * np.einsum('kq,qde->kde', Bv, g)
        return est[0], est[1]

    def store_jacobi(n, i, l, tau, t_l, h_l, a_int, b_int, interior_sing,
                     sing_pts, s0, alpha):
        """Vector analogue of the scalar builder's store_jacobi: two-order
        acceptance over the (d, d) entries, adaptive fallback at default
        tolerance for failing basis functions. Returns True iff all passed."""
        v1, v2 = jacobi_vals(tau, t_l, h_l, a_int, b_int, s0, alpha)
        kwargs = dict(_QUAD_VEC_OPTS_DEFAULT)
        if interior_sing:
            kwargs['points'] = interior_sing

        def fallback(bj, bi, bk):
            val, _err = get_quad_vec()(make_integrand(tau, t_l, h_l, bk, sing_pts),
                                       a_int, b_int, **kwargs)
            return val
        ok = _store_two_order(W, n, [i], [l], v1[None, None], v2[None, None],
                              smooth_check_tol, fallback)
        return bool(ok.all())

    def store_smooth(n, i, l, tau, t_l, h_l, a_int, b_int, v1, v2):
        """Diagonal block of node i: store the order-(ord+2) estimate v2 under
        the two-order acceptance rule (over the (d, d) entries), adaptive
        quadrature for the failing basis functions. Returns True iff no
        fallback ran."""
        def fallback(bj, bi, bk):
            val, _err = get_quad_vec()(make_integrand(tau, t_l, h_l, bk),
                                       a_int, b_int, **_QUAD_VEC_OPTS_DEFAULT)
            return val
        ok = _store_two_order(W, n, [i], [l], v1[None, None], v2[None, None],
                              smooth_check_tol, fallback)
        return bool(ok.all())

    def store_smooth_offdiag(n, l, smooth_is, taus, t_l, h_l, a_int, b_int, v1, v2):
        """Full off-diagonal block across all its smooth collocation nodes at
        once (v1, v2: (n_i, n_basis, d, d)); the rare failing pairs fall back
        to per-node adaptive quadrature. Returns the set of nodes (entries of
        smooth_is) that needed a fallback."""
        def fallback(bj, bi, bk):
            val, _err = get_quad_vec()(make_integrand(taus[bi], t_l, h_l, bk),
                                       a_int, b_int, **_QUAD_VEC_OPTS_DEFAULT)
            return val
        ok = _store_two_order(W, n, smooth_is, [l], v1[None], v2[None],
                              smooth_check_tol, fallback)
        return {smooth_is[bi] for bi in np.nonzero(~ok[0].all(axis=1))[0].tolist()}

    def integrate_smooth_batch(n, ls, tau_n, ok_off):
        _integrate_smooth_batch(
            W, n, ls, tau_n, ok_off, kernel=kernel,
            mesh_breakpoints=mesh_breakpoints, widths=widths, orders=orders,
            gl=gl, B_off=B_off, tol=smooth_check_tol, get_quad=get_quad_vec,
            make_integrand=make_integrand)

    def integrate_row(n, skip_off=None, dirty_lags=None, skip_diag=None,
                      record=False):
        """Integrate row n of W, exactly as the general path does; see the
        scalar builder's integrate_row for the skip/record contract."""
        ok_off = np.zeros((p, M), dtype=bool) if record else None
        ok_diag = np.zeros(p, dtype=bool) if record else None
        sing_off = np.zeros((p, M), dtype=bool) if record else None
        sing_diag = np.zeros(p, dtype=bool) if record else None
        t_n = mesh_breakpoints[n]
        h_n = widths[n]
        tau_n = t_n + node_pos * h_n
        sing_per_i = [singular_locs(tau_n[i]) for i in range(p)]

        # Off-diagonal blocks l < n share the interval [t_l, t_{l+1}] across all
        # collocation nodes; only tau_i differs. Sample the kernel once across the
        # smooth nodes and combine via a single einsum, peeling off any node whose
        # declared singularity falls in this block to the adaptive path.
        if dirty_lags is None:
            l_iter = range(n)
        else:
            l_iter = _pending_lags(dirty_lags, n)
        batch_ls = []   # blocks with every node smooth: done together below
        if kernel_vec and n > 0:
            # Blocks that no declared singularity can touch and that have no
            # reused entries are smooth for every node: send them straight to
            # the batch, leaving only the rest for per-node classification.
            ls_all = np.asarray(l_iter, dtype=np.intp)
            slow = _maybe_singular_blocks(sing_per_i, mesh_breakpoints, n)[ls_all]
            if skip_off is not None:
                slow |= skip_off[:, n - ls_all].any(axis=0)
            batch_ls = ls_all[~slow].tolist()
            l_iter = ls_all[slow].tolist()
        for l in l_iter:
            lag = n - l
            t_l = mesh_breakpoints[l]
            t_lp1 = mesh_breakpoints[l + 1]
            h_l = widths[l]
            a_int, b_int = t_l, t_lp1

            smooth_is = []
            for i in range(p):
                if skip_off is not None and skip_off[i, lag]:
                    continue
                interior_sing, mode, jinfo = _classify_sing_block(
                    sing_per_i[i], a_int, b_int)
                sing_pts = tuple(sp for sp, _ in sing_per_i[i])
                if mode == 'adaptive':
                    adaptive_block(n, i, l, tau_n[i], t_l, h_l, a_int, b_int,
                                   interior_sing, sing_pts)
                    if record:
                        sing_off[i, lag] = True
                elif mode == 'jacobi':
                    clean = store_jacobi(n, i, l, tau_n[i], t_l, h_l, a_int,
                                         b_int, interior_sing, sing_pts, *jinfo)
                    if record:
                        ok_off[i, lag] = clean
                else:
                    smooth_is.append(i)

            if kernel_vec and len(smooth_is) == p:
                batch_ls.append(l)
                continue
            if smooth_is:
                taus = tau_n[smooth_is]
                v1, v2 = smooth_offdiag_vals(a_int, b_int, taus)
                bad = store_smooth_offdiag(n, l, smooth_is, taus, t_l, h_l,
                                           a_int, b_int, v1, v2)
                if record:
                    for i in smooth_is:
                        ok_off[i, lag] = i not in bad

        if batch_ls:
            integrate_smooth_batch(n, batch_ls, tau_n, ok_off)

        # Diagonal block l == n: the upper limit is tau_i, so it stays per-node.
        l = n
        t_l = mesh_breakpoints[l]
        h_l = widths[l]
        a_int = t_l
        for i in range(p):
            if skip_diag is not None and skip_diag[i]:
                continue
            tau = tau_n[i]
            b_int = tau
            if b_int <= a_int:
                # Zero-width block (collocation node at the interval start):
                # W stays 0 in every row, so the entry is vacuously reusable.
                if record:
                    ok_diag[i] = True
                continue
            interior_sing, mode, jinfo = _classify_sing_block(
                sing_per_i[i], a_int, b_int)
            sing_pts = tuple(sp for sp, _ in sing_per_i[i])
            if mode == 'adaptive':
                adaptive_block(n, i, l, tau, t_l, h_l, a_int, b_int,
                               interior_sing, sing_pts)
                if record:
                    sing_diag[i] = True
                continue
            if mode == 'jacobi':
                clean = store_jacobi(n, i, l, tau, t_l, h_l, a_int, b_int,
                                     interior_sing, sing_pts, *jinfo)
                if record and clean:
                    ok_diag[i] = True
                continue
            v1, v2 = smooth_diag_vals(a_int, b_int, tau, i)
            clean = store_smooth(n, i, l, tau, t_l, h_l, a_int, b_int, v1, v2)
            if record and clean:
                ok_diag[i] = True
        return ok_off, ok_diag, sing_off, sing_diag

    # Uniform mesh + convolution kernel: same Toeplitz / adaptive-reuse
    # policy as the scalar builder (see _assemble_w_rows).
    _assemble_w_rows(W, M, toeplitz, reuse_sing, integrate_row)

    if not np.isfinite(W).all():
        raise ValueError(
            "Kernel weight tensor contains non-finite entries -- your kernel "
            "appears to be singular. Pass `kernel_singularity=<location(s)>` "
            "to declare the singular point(s)."
        )

    return W


def _build_w_vector(kernel, mesh_breakpoints, node_pos,
                    kernel_singularity, smooth_gl_order, d,
                    smooth_check_tol=1e-9, reuse_adaptive_blocks=False):
    """VIE-2 vector weight tensor: Lagrange basis, shape (M, p, M, p, d, d)."""
    basis = _lagrange_basis_coefs(node_pos)
    return _build_w_with_basis_vector(kernel, mesh_breakpoints, node_pos,
                                       kernel_singularity,
                                       smooth_gl_order, d, basis, smooth_check_tol,
                                       reuse_adaptive_blocks)


# ---------------------------------------------------------------------------
# Collocation-point sampling of g and a (shared by vector and matrix paths)
# ---------------------------------------------------------------------------

def _check_finite_samples(arr, name, mesh_breakpoints, node_pos, widths):
    """ValueError naming the first collocation time where a sampled callable
    (``g`` or ``a``, array ``(M, p, ...)``) returned a non-finite value."""
    ok = np.isfinite(arr).reshape(arr.shape[0], arr.shape[1], -1).all(axis=2)
    if not ok.all():
        n, i = (int(k) for k in np.argwhere(~ok)[0])
        t = mesh_breakpoints[n] + node_pos[i] * widths[n]
        raise ValueError(f"{name}(t) returned a non-finite value at t={t:.6g}; "
                         f"inputs must be finite")
    return arr


def _sample_g_at_coll_vec(g, mesh_breakpoints, node_pos, widths, M, p, d):
    """Sample a vector forcing term g(t) -> (d,) at the collocation nodes.

    Returns an (M, p, d) array; zeros when g is None.
    """
    g_arr = np.zeros((M, p, d), dtype=np.float64)
    if g is None:
        return g_arr
    for n in range(M):
        t_n = mesh_breakpoints[n]
        h_n = widths[n]
        for i in range(p):
            g_val = np.asarray(g(t_n + node_pos[i] * h_n), dtype=np.float64)
            if g_val.shape != (d,):
                raise ValueError(
                    f"g(t) must return a shape ({d},) array for vector kernel; "
                    f"got shape {tuple(g_val.shape)}")
            g_arr[n, i, :] = g_val
    return _check_finite_samples(g_arr, "g", mesh_breakpoints, node_pos, widths)


def _sample_a_at_coll(a, mesh_breakpoints, node_pos, widths, M, p, d):
    """Sample the VIDE coefficient a(t) -> (d, d) at the collocation nodes.

    Returns an (M, p, d, d) array; zeros when a is None. Independent of the
    number of right-hand sides, so the matrix path samples it once.
    """
    a_arr = np.zeros((M, p, d, d), dtype=np.float64)
    if a is None:
        return a_arr
    for n in range(M):
        t_n = mesh_breakpoints[n]
        h_n = widths[n]
        for i in range(p):
            a_val = np.asarray(a(t_n + node_pos[i] * h_n), dtype=np.float64)
            if a_val.shape != (d, d):
                raise ValueError(
                    f"a(t) must return a shape ({d}, {d}) array for vector "
                    f"kernel; got shape {tuple(a_val.shape)}")
            a_arr[n, i, :, :] = a_val
    return _check_finite_samples(a_arr, "a", mesh_breakpoints, node_pos, widths)


def _sample_g_at_coll_matrix(g, mesh_breakpoints, node_pos, widths, M, p, d, m):
    """Sample a matrix forcing term g(t) -> (d, m) at the collocation nodes.

    Returns an (M, p, d, m) array; zeros when g is None. g is called once per
    collocation node (not once per column).
    """
    G = np.zeros((M, p, d, m), dtype=np.float64)
    if g is None:
        return G
    for n in range(M):
        t_n = mesh_breakpoints[n]
        h_n = widths[n]
        for i in range(p):
            g_val = np.asarray(g(t_n + node_pos[i] * h_n), dtype=np.float64)
            if g_val.shape != (d, m):
                raise ValueError(
                    f"g(t) must return a shape ({d}, {m}) array for a "
                    f"matrix-valued problem; got shape {tuple(g_val.shape)}")
            G[n, i, :, :] = g_val
    return _check_finite_samples(G, "g", mesh_breakpoints, node_pos, widths)


def _detect_g_matrix_cols(g, d, sample_t):
    """Return the number of right-hand-side columns m if g(sample_t) is a 2-D
    (d, m) array, else None (scalar/vector forcing).

    A 2-D return signals the matrix-valued problem (m simultaneous RHS); a 1-D
    (d,) return is an ordinary vector problem. Raises if the first axis does
    not match the kernel dimension d.
    """
    if g is None:
        return None
    arr = np.asarray(g(sample_t))
    if arr.ndim < 2:
        return None
    if arr.ndim > 2:
        raise ValueError(
            f"g(t) must return a 1-D (d,) or 2-D (d, m) array; got "
            f"ndim {arr.ndim} (shape {tuple(arr.shape)}).")
    if arr.shape[0] != d:
        raise ValueError(
            f"g(t) returned shape {tuple(arr.shape)}; first axis must equal "
            f"the kernel dimension d = {d}.")
    return int(arr.shape[1])


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------


def _combine_basis(coefs, basis, out, scale=None):
    """``out + sum_k [scale *] coefs[:, k] * basis[k]``, vectorized over
    intervals and components (``coefs`` is ``(M, p, *comp)``, ``basis``
    ``(p, P)``, ``out`` ``(M, P, *comp)``; ``scale`` is per-interval). Terms
    are added in k order, matching the per-interval loops this replaced."""
    extra = (1,) * (coefs.ndim - 2)
    for k in range(coefs.shape[1]):
        c = coefs[:, k]
        if scale is not None:
            c = scale.reshape((-1,) + extra) * c
        out = out + c[:, None] * basis[k].reshape((1, -1) + extra)
    return out


def _lagrange_solution(y: np.ndarray, mesh_breakpoints: np.ndarray,
                       node_pos: np.ndarray, d: int = 0, m: int = 0):
    """Solution function for collocation-node values ``y`` (shape ``(M, p)``,
    ``(M, p, d)`` or ``(M, p, d, m)``): on interval n the Lagrange
    interpolant of ``y[n]`` in the local variable. Polynomial objects on
    the time axis are built only on first access to ``.polynomials``."""
    basis = _lagrange_basis_coefs(node_pos)
    y = np.asarray(y, dtype=float)
    unit = np.zeros((y.shape[0], basis.shape[1]) + y.shape[2:])
    unit = _combine_basis(y, basis, unit)
    return _SolutionFunction.from_unit_coefs(unit, mesh_breakpoints, d=d, m=m)


def _detect_kernel_shape(kernel, sample_u: float):
    """Sample kernel(u) at a non-singular point and return (is_vector, d)."""
    sample = np.asarray(kernel(sample_u))
    if sample.ndim == 0:
        return False, 1
    if sample.ndim == 2 and sample.shape[0] == sample.shape[1] and sample.shape[0] >= 1:
        return True, int(sample.shape[0])
    raise ValueError(
        f"kernel(u) must return a scalar or square (d, d) matrix; got shape "
        f"{tuple(sample.shape)} at u={sample_u}.")


# ---------------------------------------------------------------------------
# Complex-input dispatch: block-decompose the complex problem into a real one
# at double the dimension, route through the existing real solver, recombine.
#
# Identity used:  K_complex (d x d) <-> [[K_R, -K_I], [K_I, K_R]]  (2d x 2d real)
# (Same trick as _complex.py for the array-based solvers, but applied to
# callables rather than pre-sampled arrays.)
# ---------------------------------------------------------------------------

def _is_complex_value(v) -> bool:
    """True when np.asarray(v) has a complex dtype."""
    if v is None:
        return False
    return np.iscomplexobj(np.asarray(v))


def _samples_indicate_complex(callables, mesh_breakpoints, soln_init_value) -> bool:
    """Sample each callable at several mesh-interior points to detect complex
    returns. Multi-point sampling catches the case where one sample happens
    to be real but other values are complex (e.g. kernels with branches).
    """
    widths = np.diff(mesh_breakpoints)
    T = float(mesh_breakpoints[-1])
    sample_us = [float(widths[0]) * 0.5, T * 0.25, T * 0.5, T * 0.75, T * 0.9]
    for fn in callables:
        if fn is None:
            continue
        for u in sample_us:
            try:
                if _is_complex_value(fn(u)):
                    return True
            except Exception:
                # Some callables may not accept all sample points; keep trying.
                pass
    if _is_complex_value(soln_init_value):
        return True
    return False


def _detect_complex_d_orig(kernel, sample_u: float) -> int:
    """Determine the original (complex) problem dimension. 0 = scalar, k = (k, k) matrix."""
    sample = np.asarray(kernel(sample_u))
    if sample.ndim == 0:
        return 0
    if sample.ndim == 2 and sample.shape[0] == sample.shape[1] and sample.shape[0] >= 1:
        return int(sample.shape[0])
    raise ValueError(
        f"complex kernel(u) must return a scalar or square (d, d) matrix; got shape "
        f"{tuple(sample.shape)} at u={sample_u}.")


def _block_wrap_kernel(kernel, d_orig: int):
    """Wrap a complex-valued kernel into a real-valued block-matrix kernel.

    Scalar complex K(u) -> (2, 2) real block.
    Vector complex K(u) of shape (d, d) -> (2d, 2d) real block.
    Vectorized over u: input shape (n,) gives output shape (n, 2, 2) or (n, 2d, 2d),
    matching the convention used by `_detect_kernel_vectorized`.
    """
    if d_orig == 0:
        def K_real(u):
            K = np.asarray(kernel(u), dtype=complex)
            R, I = K.real, K.imag
            # R, I are scalar or arrays of u's shape. Output appends two trailing axes.
            out = np.empty(R.shape + (2, 2), dtype=np.float64)
            out[..., 0, 0] = R
            out[..., 0, 1] = -I
            out[..., 1, 0] = I
            out[..., 1, 1] = R
            return out
        return K_real
    else:
        def K_real(u):
            K = np.asarray(kernel(u), dtype=complex)
            R, I = K.real, K.imag
            d2 = 2 * d_orig
            out = np.empty(R.shape[:-2] + (d2, d2), dtype=np.float64)
            out[..., :d_orig, :d_orig] = R
            out[..., :d_orig, d_orig:] = -I
            out[..., d_orig:, :d_orig] = I
            out[..., d_orig:, d_orig:] = R
            return out
        return K_real


def _block_wrap_g(g, d_orig: int):
    """Wrap complex g into a real-valued callable. None passes through.

    Scalar: complex g(t) -> (2,). Vector: complex (d,) -> (2d,). Matrix: complex
    (d, m) -> (2d, m). Only the component (first) axis doubles; concatenating on
    axis 0 covers both the vector and matrix cases.
    """
    if g is None:
        return None
    if d_orig == 0:
        def g_real(t):
            gv = np.asarray(g(t), dtype=complex)
            return np.array([gv.real, gv.imag])
        return g_real
    else:
        def g_real(t):
            gv = np.asarray(g(t), dtype=complex)
            return np.concatenate([gv.real, gv.imag], axis=0)
        return g_real


def _block_wrap_a(a, d_orig: int):
    """a has the same block structure as kernel."""
    if a is None:
        return None
    return _block_wrap_kernel(a, d_orig)


def _block_expand_init(init, d_orig: int) -> np.ndarray:
    """Complex scalar -> (2,) real; complex (d,) -> (2d,) real; complex (d, m)
    -> (2d, m) real (component axis doubles)."""
    arr = np.asarray(init, dtype=complex)
    if d_orig == 0:
        return np.array([float(arr.real), float(arr.imag)])
    return np.concatenate([arr.real, arr.imag], axis=0)


def _recombine_complex_y(y_real: np.ndarray, d_orig: int) -> np.ndarray:
    """Convert a real solution from the block-decomposed system back to complex.

    d_orig == 0: y_real shape (M, p, 2) -> (M, p) complex
    d_orig >  0: y_real shape (M, p, 2*d_orig) -> (M, p, d_orig) complex
    matrix:      y_real shape (M, p, 2*d_orig, m) -> (M, p, d_orig, m) complex
                 (the component axis is -2, ahead of the right-hand-side axis)
    """
    if d_orig == 0:
        return y_real[..., 0] + 1j * y_real[..., 1]
    if y_real.ndim == 4:
        return y_real[..., :d_orig, :] + 1j * y_real[..., d_orig:, :]
    return y_real[..., :d_orig] + 1j * y_real[..., d_orig:]


@_escalate_complex_warning
def vie2(*, kernel, g=None, mesh_breakpoints,
                          coll_divs: int = None, coll_choices: list[int] = None,
                          coll_nodes=None,
                          kernel_singularity=None,
                          return_function: bool = False,
                          reuse_adaptive_blocks: bool = True,
                          show_warnings: bool = True):
    """Engine for the 0.10 ``function_solve_VIE_2`` (see `voles._legacy.function_solve_VIE_2` for the documentation). Called by the deprecated wrapper and by
    `solve`; internal recursion calls this function directly."""
    return_function = _v.flag("return_function", return_function)
    reuse_adaptive_blocks = _v.flag("reuse_adaptive_blocks", reuse_adaptive_blocks)
    show_warnings = _v.flag("show_warnings", show_warnings)
    _smooth_gl_order = _SMOOTH_GL_ORDER
    kernel_singularity = _empty_singularity_to_none(kernel_singularity)
    mesh_breakpoints = np.asarray(mesh_breakpoints, dtype=float)
    if mesh_breakpoints.ndim != 1 or len(mesh_breakpoints) < 2:
        raise ValueError("mesh_breakpoints must be 1-D with at least two entries")
    if not np.all(np.isfinite(mesh_breakpoints)):
        raise ValueError("mesh_breakpoints must be finite (no inf or NaN)")
    if not np.all(np.diff(mesh_breakpoints) > 0):
        raise ValueError("mesh_breakpoints must be strictly increasing")
    if mesh_breakpoints[0] != 0.0:
        raise ValueError("mesh_breakpoints[0] must be 0")

    node_pos, _, _ = _resolve_node_pos(
        coll_nodes, coll_divs, coll_choices,
        default_divs=2, default_choices=[0, 1, 2],
        exclude_zero=False, fname="function_solve_VIE_2")

    if not callable(kernel):
        raise TypeError("kernel must be callable")
    if g is not None and not callable(g):
        raise TypeError("g must be callable or None")

    # Complex dispatch: block-decompose to a real problem of doubled dimension.
    if _samples_indicate_complex([kernel, g], mesh_breakpoints, None):
        sample_u = float(np.diff(mesh_breakpoints)[0]) * 0.5
        d_orig = _detect_complex_d_orig(kernel, sample_u)
        result = vie2(
            kernel=_block_wrap_kernel(kernel, d_orig),
            g=_block_wrap_g(g, d_orig),
            mesh_breakpoints=mesh_breakpoints,
            coll_nodes=node_pos,
            kernel_singularity=kernel_singularity,
            return_function=return_function, show_warnings=show_warnings,
            reuse_adaptive_blocks=reuse_adaptive_blocks)
        if return_function:
            y_real, y_func_real = result
            return (_recombine_complex_y(y_real, d_orig),
                    _complex_solution(y_func_real, d_orig))
        return _recombine_complex_y(result, d_orig)

    M = len(mesh_breakpoints) - 1
    p = len(node_pos)
    widths = np.diff(mesh_breakpoints)

    # Detect scalar vs vector kernel by sampling at a non-singular point.
    sample_u = float(widths[0]) * 0.5
    is_vector, d = _detect_kernel_shape(kernel, sample_u)

    _maybe_warn_mesh_uniform_with_singularity(
        mesh_breakpoints, kernel_singularity, show_warnings)

    from . import _dlang as _dlang_module
    max_p = _dlang_module.function_solve_max_p_d()
    if p > max_p:
        raise ValueError(
            f"number of collocation nodes p = {p} exceeds the maximum compiled "
            f"into the D extension ({max_p}). Use fewer collocation nodes.")

    if not is_vector:
        W = _build_w_scalar(kernel, mesh_breakpoints, node_pos,
                            kernel_singularity, _smooth_gl_order,
                            reuse_adaptive_blocks=reuse_adaptive_blocks)
        g_arr = np.zeros((M, p), dtype=np.float64)
        if g is not None:
            for n in range(M):
                t_n = mesh_breakpoints[n]
                h_n = widths[n]
                for i in range(p):
                    t_ni = t_n + node_pos[i] * h_n
                    g_arr[n, i] = _scalar_g_value(g(t_ni), t_ni)
        y = _dlang_module.function_solve_vie2_d(W, g_arr)

        if return_function:
            return y, _lagrange_solution(y, mesh_breakpoints, node_pos)
        return y

    # ----- Vector / matrix path -----
    max_d = _dlang_module.function_solve_max_d_d()
    if d > max_d:
        raise ValueError(
            f"kernel dimension d = {d} exceeds the maximum compiled into the "
            f"D extension ({max_d}).")

    # The weight tensor depends only on the kernel, so it is built once and
    # shared across all right-hand sides in the matrix case.
    W = _build_w_vector(kernel, mesh_breakpoints, node_pos,
                        kernel_singularity, _smooth_gl_order, d,
                        reuse_adaptive_blocks=reuse_adaptive_blocks)

    sample_t = float(mesh_breakpoints[0] + node_pos[0] * widths[0])
    m = _detect_g_matrix_cols(g, d, sample_t)

    if m is not None:
        # Matrix-valued problem: m simultaneous right-hand sides sharing W.
        G = _sample_g_at_coll_matrix(g, mesh_breakpoints, node_pos, widths,
                                     M, p, d, m)

        def _col_solve(j):
            g_arr_j = np.ascontiguousarray(G[:, :, :, j])
            return _dlang_module.function_solve_vie2_vec_d(W, g_arr_j)

        with ThreadPoolExecutor(max_workers=_column_workers(m)) as ex:
            cols = list(ex.map(_col_solve, range(m)))
        y = np.stack(cols, axis=3)  # (M, p, d, m)

        if return_function:
            return y, _lagrange_solution(y, mesh_breakpoints, node_pos, d=d, m=m)
        return y

    g_arr = _sample_g_at_coll_vec(g, mesh_breakpoints, node_pos, widths, M, p, d)
    y = _dlang_module.function_solve_vie2_vec_d(W, g_arr)

    if return_function:
        return y, _lagrange_solution(y, mesh_breakpoints, node_pos, d=d)
    return y


# ---------------------------------------------------------------------------
# VIDE helpers
# ---------------------------------------------------------------------------

def _vide_solution(y_prime: np.ndarray, y_boundary: np.ndarray,
                   mesh_breakpoints: np.ndarray, node_pos: np.ndarray,
                   d: int = 0, m: int = 0):
    """Solution function for y(t) given y' at the nodes and boundary y values.

    On interval n, y(t) = y_n + h_n * sum_k y_prime[n, k] * I_k((t - t_n)/h_n),
    where I_k is the antiderivative-of-Lagrange basis. ``y_prime`` is
    ``(M, p, *comp)``, ``y_boundary`` ``(M+1, *comp)``.
    """
    anti = _lagrange_antideriv_coefs(node_pos)  # (p, p+1)
    y_prime = np.asarray(y_prime, dtype=float)
    M = y_prime.shape[0]
    bps = np.asarray(mesh_breakpoints, dtype=float)
    h = bps[1:M + 1] - bps[:M]
    unit = np.zeros((M, anti.shape[1]) + y_prime.shape[2:])
    unit[:, 0] = np.asarray(y_boundary, dtype=float)[:M]   # constant: y_n
    unit = _combine_basis(y_prime, anti, unit, scale=h)
    return _SolutionFunction.from_unit_coefs(unit, mesh_breakpoints, d=d, m=m)


@_escalate_complex_warning
def vide(*, kernel, a=None, g=None, soln_init_value,
                         mesh_breakpoints,
                         coll_divs: int = None, coll_choices: list[int] = None,
                         coll_nodes=None,
                         kernel_singularity=None,
                         return_function: bool = False,
                         reuse_adaptive_blocks: bool = True,
                         show_warnings: bool = True):
    """Engine for the 0.10 ``function_solve_VIDE`` (see `voles._legacy.function_solve_VIDE` for the documentation). Called by the deprecated wrapper and by
    `solve`; internal recursion calls this function directly."""
    return_function = _v.flag("return_function", return_function)
    reuse_adaptive_blocks = _v.flag("reuse_adaptive_blocks", reuse_adaptive_blocks)
    show_warnings = _v.flag("show_warnings", show_warnings)
    if soln_init_value is None:
        raise TypeError("function_solve_VIDE: soln_init_value is required (got None)")
    _v.finite("soln_init_value", soln_init_value)
    _smooth_gl_order = _SMOOTH_GL_ORDER
    kernel_singularity = _empty_singularity_to_none(kernel_singularity)
    mesh_breakpoints = np.asarray(mesh_breakpoints, dtype=float)
    if mesh_breakpoints.ndim != 1 or len(mesh_breakpoints) < 2:
        raise ValueError("mesh_breakpoints must be 1-D with at least two entries")
    if not np.all(np.isfinite(mesh_breakpoints)):
        raise ValueError("mesh_breakpoints must be finite (no inf or NaN)")
    if not np.all(np.diff(mesh_breakpoints) > 0):
        raise ValueError("mesh_breakpoints must be strictly increasing")
    if mesh_breakpoints[0] != 0.0:
        raise ValueError("mesh_breakpoints[0] must be 0")

    node_pos, _, _ = _resolve_node_pos(
        coll_nodes, coll_divs, coll_choices,
        default_divs=2, default_choices=[0, 1, 2],
        exclude_zero=False, fname="function_solve_VIDE")

    if not callable(kernel):
        raise TypeError("kernel must be callable")
    if g is not None and not callable(g):
        raise TypeError("g must be callable or None")
    if a is not None and not callable(a):
        raise TypeError("a must be callable or None")

    # Complex dispatch.
    if _samples_indicate_complex([kernel, g, a], mesh_breakpoints, soln_init_value):
        sample_u = float(np.diff(mesh_breakpoints)[0]) * 0.5
        d_orig = _detect_complex_d_orig(kernel, sample_u)
        result = vide(
            kernel=_block_wrap_kernel(kernel, d_orig),
            a=_block_wrap_a(a, d_orig),
            g=_block_wrap_g(g, d_orig),
            soln_init_value=_block_expand_init(soln_init_value, d_orig),
            mesh_breakpoints=mesh_breakpoints,
            coll_nodes=node_pos,
            kernel_singularity=kernel_singularity,
            return_function=return_function, show_warnings=show_warnings,
            reuse_adaptive_blocks=reuse_adaptive_blocks)
        if return_function:
            y_real, y_func_real = result
            return (_recombine_complex_y(y_real, d_orig),
                    _complex_solution(y_func_real, d_orig))
        return _recombine_complex_y(result, d_orig)

    M = len(mesh_breakpoints) - 1
    p = len(node_pos)
    widths = np.diff(mesh_breakpoints)

    from . import _dlang as _dlang_module
    max_p = _dlang_module.function_solve_max_p_d()
    if p > max_p:
        raise ValueError(
            f"number of collocation nodes p = {p} exceeds the maximum compiled "
            f"into the D extension ({max_p}).")

    # Detect scalar vs vector by sampling kernel at a non-singular point.
    sample_u = float(widths[0]) * 0.5
    is_vector, d = _detect_kernel_shape(kernel, sample_u)

    _maybe_warn_mesh_uniform_with_singularity(
        mesh_breakpoints, kernel_singularity, show_warnings)

    # Precomputed scalar tables: alpha[i,k] = I_k(c_i); w[k] = I_k(1)
    anti = _lagrange_antideriv_coefs(node_pos)  # (p, p+1)
    alpha = np.zeros((p, p), dtype=np.float64)
    for i in range(p):
        for k in range(p):
            alpha[i, k] = _eval_poly_at(anti[k], node_pos[i])
    w_vec = np.array([_eval_poly_at(anti[k], 1.0) for k in range(p)],
                     dtype=np.float64)

    # Sample g and a at collocation points
    def _sample_callable_scalar(f, name):
        out = np.zeros((M, p), dtype=np.float64)
        if f is None:
            return out
        for n in range(M):
            t_n = mesh_breakpoints[n]
            h_n = widths[n]
            for i in range(p):
                t_ni = t_n + node_pos[i] * h_n
                out[n, i] = _scalar_callable_value(f(t_ni), t_ni, name)
        return out

    if not is_vector:
        vide_basis = _vide_basis_coefs(node_pos)
        W = _build_w_with_basis_scalar(
            kernel, mesh_breakpoints, node_pos,
            kernel_singularity, _smooth_gl_order, vide_basis,
            reuse_adaptive_blocks=reuse_adaptive_blocks)
        g_arr = _sample_callable_scalar(g, "g")
        a_arr = _sample_callable_scalar(a, "a")
        y_prime, y_boundary = _dlang_module.function_solve_vide_d(
            W, g_arr, a_arr, alpha, w_vec, widths, _scalar_init(soln_init_value))

        # Reconstruct y at collocation nodes: y_{n,i} = y_n + h_n * sum_k Y'_{n,k} alpha[i,k]
        y_at_coll = np.zeros((M, p), dtype=np.float64)
        for n in range(M):
            y_at_coll[n, :] = y_boundary[n] + widths[n] * (alpha @ y_prime[n])

        if return_function:
            return y_at_coll, _vide_solution(y_prime, y_boundary,
                                             mesh_breakpoints, node_pos)
        return y_at_coll

    # ----- Vector / matrix path -----
    max_d = _dlang_module.function_solve_max_d_d()
    if d > max_d:
        raise ValueError(
            f"kernel dimension d = {d} exceeds the maximum compiled into the "
            f"D extension ({max_d}).")

    # W and a(t) depend only on the kernel and a, not on the right-hand side,
    # so both are built once and shared across all columns in the matrix case.
    vide_basis = _vide_basis_coefs(node_pos)
    W = _build_w_with_basis_vector(
        kernel, mesh_breakpoints, node_pos,
        kernel_singularity, _smooth_gl_order, d, vide_basis,
        reuse_adaptive_blocks=reuse_adaptive_blocks)
    a_arr = _sample_a_at_coll(a, mesh_breakpoints, node_pos, widths, M, p, d)

    # Matrix-valued problem is signalled by a 2-D (d, m) initial value.
    init_arr = np.asarray(soln_init_value, dtype=np.float64)
    if init_arr.ndim == 2:
        if init_arr.shape[0] != d:
            raise ValueError(
                f"soln_init_value shape {tuple(init_arr.shape)} incompatible "
                f"with kernel dimension d = {d}.")
        m = init_arr.shape[1]
        G = _sample_g_at_coll_matrix(g, mesh_breakpoints, node_pos, widths,
                                     M, p, d, m)

        def _col_solve(j):
            g_arr_j = np.ascontiguousarray(G[:, :, :, j])
            return _dlang_module.function_solve_vide_vec_d(
                W, g_arr_j, a_arr, alpha, w_vec, widths,
                np.ascontiguousarray(init_arr[:, j]))

        with ThreadPoolExecutor(max_workers=_column_workers(m)) as ex:
            results = list(ex.map(_col_solve, range(m)))

        # y_prime_j: (M, p, d); y_boundary_j: (M+1, d). Stack on a new last axis.
        y_prime = np.stack([r[0] for r in results], axis=3)      # (M, p, d, m)
        y_boundary = np.stack([r[1] for r in results], axis=2)   # (M+1, d, m)

        y_at_coll = np.zeros((M, p, d, m), dtype=np.float64)
        for n in range(M):
            # alpha (p,p) @ y_prime[n] (p,d,m) over the p axis -> (p,d,m)
            y_at_coll[n] = y_boundary[n] + widths[n] * np.tensordot(
                alpha, y_prime[n], axes=([1], [0]))

        if return_function:
            return y_at_coll, _vide_solution(y_prime, y_boundary,
                                             mesh_breakpoints, node_pos, d=d, m=m)
        return y_at_coll

    # Vector path
    if init_arr.shape != (d,):
        raise ValueError(
            f"soln_init_value must have shape ({d},) for vector kernel; "
            f"got shape {tuple(init_arr.shape)}")

    g_arr = _sample_g_at_coll_vec(g, mesh_breakpoints, node_pos, widths, M, p, d)

    y_prime, y_boundary = _dlang_module.function_solve_vide_vec_d(
        W, g_arr, a_arr, alpha, w_vec, widths, init_arr)

    # Reconstruct y at collocation: y[n,i] = y_n + h_n * sum_k alpha[i,k] Y'_{n,k}
    y_at_coll = np.zeros((M, p, d), dtype=np.float64)
    for n in range(M):
        # alpha (p,p) @ y_prime[n] (p,d) -> (p,d)
        y_at_coll[n, :, :] = y_boundary[n] + widths[n] * (alpha @ y_prime[n])

    if return_function:
        return y_at_coll, _vide_solution(y_prime, y_boundary,
                                         mesh_breakpoints, node_pos, d=d)
    return y_at_coll


# ---------------------------------------------------------------------------
# Mesh helpers
# ---------------------------------------------------------------------------

def optimal_graded_mesh(*, alpha: float, t_end: float = None, n_intervals: int = None,
                        order: int, T: float = None, M: int = None) -> np.ndarray:
    r"""Return a graded mesh of ``n_intervals + 1`` breakpoints suitable for a
    weakly singular convolution kernel $K(u) \sim u^{-\alpha}$,
    $\alpha \in [0, 1)$.

    Grading: $t_n = T (n/M)^r$ with $T$ = ``t_end``, $M$ = ``n_intervals``
    and $r = p / (1 - \alpha)$, where $p$ = ``order`` is the order of the
    collocation method (the number of collocation nodes per interval). This
    recovers the optimal convergence order for Abel-type kernels (Brunner
    2004, ch. 6). At ``alpha == 0`` the kernel is non-singular and the
    solution smooth, so a uniform mesh ($r = 1$) is returned instead.

    Parameters
    ----------
    alpha : float
        Singularity exponent, in $[0, 1)$.
    t_end : float
        Right endpoint of the mesh (positive).
    n_intervals : int
        Number of intervals (positive). The returned array has length
        ``n_intervals + 1``.
    order : int
        Order of the collocation method (positive). For a matched mesh,
        pass the number of collocation nodes the solver uses.
    T, M : float, int
        Deprecated spellings of ``t_end`` and ``n_intervals`` (0.10); they
        still work in 0.11, with a `DeprecationWarning`, and are removed in
        1.0.

    Returns
    -------
    ndarray of shape (n_intervals + 1,)
        Strictly increasing breakpoints with ``[0] == 0`` and
        ``[-1] == t_end``.

    Raises
    ------
    ValueError
        If ``alpha`` is outside $[0, 1)$, ``t_end`` is not positive and
        finite, or ``n_intervals`` / ``order`` is less than 1.
    TypeError
        If ``alpha`` or ``t_end`` is not a real number, ``n_intervals`` /
        ``order`` is not an integer, or ``t_end`` / ``n_intervals`` is
        missing (or given together with its deprecated spelling).

    Examples
    --------
    Grade for the same order as the solver's collocation method::

        nodes = voles.radau_iia_nodes(3)
        mesh = optimal_graded_mesh(alpha=0.5, t_end=1.0, n_intervals=30,
                                   order=len(nodes))
        sol = voles.solve_vie2(kernel=..., g=..., mesh=mesh, coll_nodes=nodes,
                               kernel_singularity={0.0: 0.5})
    """
    t_end = _renamed("t_end", t_end, "T", T)
    n_intervals = _renamed("n_intervals", n_intervals, "M", M)
    alpha = _v.real("alpha", alpha)
    if not 0.0 <= alpha < 1.0:
        raise ValueError(f"alpha must satisfy 0 <= alpha < 1, got {alpha}")
    t_end = _v.real("t_end", t_end, positive=True,
                    value_msg=f"t_end must be positive and finite, got {t_end}")
    n_intervals = _v.integer("n_intervals", n_intervals, minimum=1,
                             value_msg=f"n_intervals must be a positive integer, got {n_intervals}")
    order = _v.integer("order", order, minimum=1,
                       type_msg=f"order must be a positive integer, got {order!r}",
                       value_msg=f"order must be a positive integer, got {order}")
    p = order
    # At alpha=0 the kernel is non-singular and the solution is smooth, so a
    # uniform mesh (r=1) is optimal; grading would only waste resolution near 0.
    r = p / (1.0 - alpha) if alpha > 0.0 else 1.0
    n = np.arange(n_intervals + 1, dtype=np.float64)
    return t_end * (n / n_intervals) ** r


def _renamed(name, value, old_name, old_value):
    """A parameter renamed in 0.11, accepting the old spelling with a warning."""
    if old_value is not None:
        if value is not None:
            raise TypeError(f"optimal_graded_mesh: pass {name} or the deprecated {old_name}, "
                            f"not both")
        _warn(f"optimal_graded_mesh({old_name}=...) is deprecated since voles 0.11 and will be "
              f"removed in 1.0; use {name}=", DeprecationWarning)
        return old_value
    if value is None:
        raise TypeError(f"optimal_graded_mesh() missing required keyword argument {name!r}")
    return value


# ---------------------------------------------------------------------------
# Collocation node sets
#
# Each helper returns p collocation node positions on the normalized interval
# [0, 1], sorted ascending, for use as the ``coll_nodes`` argument of the
# callable-input solvers. The classical families below are obtained by mapping
# the standard Gauss-type nodes from [-1, 1] onto [0, 1]. Convergence for a
# given equation is the caller's responsibility (see the solver docstrings).
# ---------------------------------------------------------------------------

def _check_node_count(p, *, minimum: int, name: str) -> int:
    _v.integer("p", p, type_msg=f"p must be a positive integer, got {p!r}")
    if p < minimum:
        raise ValueError(
            f"p must be an integer >= {minimum} for {name} nodes, got {p}")
    return int(p)


def gauss_legendre_nodes(p: int) -> np.ndarray:
    r"""Return the ``p`` Gauss-Legendre collocation nodes on $[0, 1]$.

    These interior nodes (none at 0 or 1) give the maximal collocation order.
    For **VIE-2 / VIDE** the solution superconverges to order $2p$ at the mesh
    points. For **VIE-1** (first kind) there is no mesh-point
    superconvergence, and Gauss nodes are the *borderline* case of the
    convergence criterion: being symmetric about $1/2$ they give
    amplification $|\rho_p| = 1$ exactly, which costs one global order
    (order $p - 1$ instead of $p$; see ``function_solve_VIE_1`` Notes).
    Prefer ``radau_iia_nodes`` for VIE-1.

    Parameters
    ----------
    p : int
        Number of nodes (the order of the collocation method), ``p >= 1``.

    Returns
    -------
    ndarray of shape (p,)
        Node positions in $(0, 1)$, sorted ascending.
    """
    p = _check_node_count(p, minimum=1, name="Gauss-Legendre")
    x, _ = np.polynomial.legendre.leggauss(p)
    return np.sort(0.5 * (x + 1.0))


def radau_iia_nodes(p: int) -> np.ndarray:
    r"""Return the ``p`` Radau IIA collocation nodes on $[0, 1]$.

    The Radau IIA nodes include the right endpoint (``1.0``) and exclude 0.
    For **VIE-2 / VIDE** they give mesh-point superconvergence of order
    $2p - 1$; the right-endpoint node also makes them a common choice for stiff
    VIDEs. For **VIE-1** they are the recommended family: the endpoint node
    makes the amplification factor $\rho_p = 0$, giving the full global order
    $p$ -- one order better than Gauss-Legendre nodes, whose $|\rho_p| = 1$
    reduces VIE-1 to order $p - 1$ (see ``function_solve_VIE_1`` Notes).

    Parameters
    ----------
    p : int
        Number of nodes, ``p >= 1``.

    Returns
    -------
    ndarray of shape (p,)
        Node positions in $(0, 1]$ (the last is exactly ``1.0``), sorted
        ascending.
    """
    p = _check_node_count(p, minimum=1, name="Radau IIA")
    # On [-1, 1] the Radau IIA nodes are the roots of P_{p-1}(x) - P_p(x); one
    # of those roots is +1. Map the roots to [0, 1].
    c = np.zeros(p + 1)
    c[p - 1] += 1.0
    c[p] -= 1.0
    # legroots may return a complex-dtype array (tiny imaginary parts from the
    # companion-matrix eigensolver) on some numpy/LAPACK versions; these nodes
    # are mathematically real, so take the real part.
    x = np.polynomial.legendre.legroots(c).real
    nodes = np.sort(0.5 * (x + 1.0))
    nodes[-1] = 1.0  # pin the endpoint exactly
    return nodes


def lobatto_nodes(p: int) -> np.ndarray:
    r"""Return the ``p`` Gauss-Lobatto collocation nodes on $[0, 1]$ (``p >= 2``).

    The Lobatto nodes include both endpoints (``0.0`` and ``1.0``) and have
    local order $2p - 2$. Because 0 is included they suit VIE-2 and VIDE but
    **not** VIE-1, which forbids a node at $t = 0$.

    Parameters
    ----------
    p : int
        Number of nodes, ``p >= 2``.

    Returns
    -------
    ndarray of shape (p,)
        Node positions in $[0, 1]$ (the first is ``0.0`` and the last ``1.0``),
        sorted ascending.
    """
    p = _check_node_count(p, minimum=2, name="Lobatto")
    if p == 2:
        interior = np.array([])
    else:
        # The interior Lobatto nodes are the roots of P'_{p-1}.
        c = np.zeros(p)
        c[p - 1] = 1.0
        # .real: legroots may return complex dtype (see radau_iia_nodes); these
        # interior nodes are mathematically real.
        interior = np.polynomial.legendre.legroots(
            np.polynomial.legendre.legder(c)).real
    x = np.concatenate(([-1.0], interior, [1.0]))
    nodes = np.sort(0.5 * (x + 1.0))
    nodes[0] = 0.0   # pin the endpoints exactly
    nodes[-1] = 1.0
    return nodes


def _maybe_warn_mesh_uniform_with_singularity(mesh_breakpoints: np.ndarray,
                                              kernel_singularity,
                                              show_warnings: bool) -> None:
    """If a singularity is declared but the mesh appears uniform (max/min
    interval ratio < 1.5), suggest `optimal_graded_mesh`. Also warn about
    declared locations outside [0, T]: the kernel is only evaluated at
    u = t - s in [0, T], so such a declaration has no effect.
    """
    if not show_warnings or kernel_singularity is None:
        return
    # Validate first: an invalid declaration gets its error, not a warning
    # followed by the error.
    _normalize_kernel_singularity(kernel_singularity)
    if not callable(kernel_singularity):
        # Parse the declared locations leniently: anything that does not
        # convert is left to _normalize_kernel_singularity, whose error
        # names the offending entry.
        try:
            raw = (list(kernel_singularity.keys()) if isinstance(kernel_singularity, dict)
                   else list(np.atleast_1d(kernel_singularity)))
            locs = [float(u) for u in raw]
        except (TypeError, ValueError):
            return
        T = float(mesh_breakpoints[-1])
        tol = 1e-12 * max(1.0, T)
        outside = [u for u in locs if not (-tol <= u <= T + tol)]
        if outside:
            _warn(f"kernel_singularity location(s) {outside} lie outside "
                  f"[0, T] = [0, {T:.6g}]; the kernel is only evaluated at u in "
                  f"[0, T], so they have no effect.", VolesWarning)
            if len(outside) == len(locs):
                return
    widths = np.diff(mesh_breakpoints)
    ratio = float(widths.max() / widths.min())
    if ratio < 1.5:
        _warn(
            "kernel_singularity is declared but the mesh appears "
            "uniform (max/min interval ratio = {:.2f}). For optimal "
            "convergence on weakly singular problems, consider a graded mesh "
            "from `voles.optimal_graded_mesh`, graded for the method's order "
            "(the number of collocation nodes).".format(ratio),
            AccuracyWarning)


# ---------------------------------------------------------------------------
# VIE-1: g(t) = integral_0^t K(t-s) y(s) ds
# ---------------------------------------------------------------------------

# VIE-1 collocation convergence depends on the nodes (Brunner 2009, smooth-kernel
# chapter, read in papers/). Two methods, two conditions:
#
# * Discontinuous S_{m-1}^{(-1)} (the default): the inter-subinterval error
#   recurrence has amplification rho_m = prod_i (c_i - 1)/c_i, and the method
#   converges IFF -1 <= rho_m <= 1, i.e. |rho_m| = prod_i (1 - c_i)/c_i <= 1
#   (Thm 2.4.2/2.4.8; necessary and sufficient). Reproduces the empirical
#   blocklist {(3,(1,)), (4,(1,)), (4,(1,2))} exactly. Any set with c_m = 1 has
#   a zero factor, hence always converges.
# * Continuous S_m^(0) (force_continuous): converges IFF c_m = 1 AND
#   |rho_{m-1}| = prod_{i=1}^{m-1} (1 - c_i)/c_i <= 1 (Thm 2.4.5).
#
# Both require a smooth kernel with |K(t,t)| >= k0 > 0 (Thm 2.4.2(b)); for a
# declared weakly-singular kernel the criteria do not apply and the check is
# skipped (convergence is then the caller's responsibility).

def _vie1_amplification(node_pos: np.ndarray) -> float:
    """Return |rho_m| = prod_i (1 - c_i) / c_i for the discontinuous method."""
    c = np.asarray(node_pos, dtype=float)
    return float(np.prod((1.0 - c) / c))


def _vie1_convergent(node_pos: np.ndarray, tol: float = 1e-9) -> bool:
    """True if the discontinuous VIE-1 method converges for these nodes.

    The boundary |rho_m| == 1 is treated as (marginally) convergent.
    """
    return _vie1_amplification(node_pos) <= 1.0 + tol


def _vie1_cont_amplification(node_pos: np.ndarray) -> float:
    """Return |rho_{m-1}| = prod_{i=1}^{m-1} (1 - c_i)/c_i for the continuous
    S_m^(0) method (Brunner Thm 2.4.5). For m == 1 the product is empty and
    |rho_0| = 1 (the trapezoidal method), matching solvers._vie1_rho."""
    c = np.asarray(node_pos, dtype=float)
    return float(np.prod((1.0 - c[:-1]) / c[:-1]))


def _vie1_cont_solution(U, boundary, mesh_breakpoints, node_pos, d=0, m=0):
    """Solution function for the continuous VIE-1 method (degree m pieces).

    On interval n: y(theta) = boundary[n]*Lt_0(theta) + sum_k U[n,k]*Lt_{k+1}(theta),
    with Lt the augmented Lagrange basis on {0} ∪ node_pos. ``U`` is
    ``(M, p, *comp)``, ``boundary`` ``(M+1, *comp)``.
    """
    aug = np.concatenate(([0.0], np.asarray(node_pos, dtype=float)))
    lag = _lagrange_basis_coefs(aug)            # rows: Lt_0, Lt_1, ..., Lt_p
    U = np.asarray(U, dtype=float)
    M = U.shape[0]
    extra = (1,) * (U.ndim - 2)
    b = np.asarray(boundary, dtype=float)[:M]
    unit = b[:, None] * lag[0].reshape((1, -1) + extra)
    unit = _combine_basis(U, lag[1:], unit)
    return _SolutionFunction.from_unit_coefs(unit, mesh_breakpoints, d=d, m=m)


def _warn_vie1_g_start_callable(g, g_samples, show_warnings):
    """Callable-input analogue of solvers._warn_vie1_g_start: warn when g(0)
    is not negligible next to the scale of g. A first-kind equation forces
    g(0) = 0. The scale comes from ``g_samples``, the values the solver has
    already taken at its collocation nodes ((M, p), (M, p, d) or
    (M, p, d, m)); the VIE-1 nodes exclude t = 0, so g is evaluated once
    more there. A failure of that call is left to the user to see later."""
    if not show_warnings or g is None:
        return
    try:
        a = np.abs(np.asarray(g_samples, dtype=float))
        g0 = np.abs(np.asarray(g(0.0), dtype=float))
        if a.ndim == 4:                           # (M, p, d, m) matrix problem: per column
            g0, scale = g0.reshape(a.shape[2:]).max(axis=0), a.max(axis=(0, 1, 2))
        else:
            g0, scale = g0.max(), a.max()
    except Exception:
        return
    _warn_g_start_columns(g0, scale)


@_escalate_complex_warning
def vie1(*, kernel, g=None, soln_init_value=None,
                          mesh_breakpoints,
                          coll_divs: int = None, coll_choices: list[int] = None,
                          coll_nodes=None,
                          kernel_singularity=None,
                          return_function: bool = False,
                          force_continuous: bool = False,
                          reuse_adaptive_blocks: bool = True,
                          show_warnings: bool = True):
    """Engine for the 0.10 ``function_solve_VIE_1`` (see `voles._legacy.function_solve_VIE_1` for the documentation). Called by the deprecated wrapper and by
    `solve`; internal recursion calls this function directly."""
    return_function = _v.flag("return_function", return_function)
    force_continuous = _v.flag("force_continuous", force_continuous)
    reuse_adaptive_blocks = _v.flag("reuse_adaptive_blocks", reuse_adaptive_blocks)
    show_warnings = _v.flag("show_warnings", show_warnings)
    _v.finite("soln_init_value", soln_init_value)
    _smooth_gl_order = _SMOOTH_GL_ORDER
    kernel_singularity = _empty_singularity_to_none(kernel_singularity)
    mesh_breakpoints = np.asarray(mesh_breakpoints, dtype=float)
    if mesh_breakpoints.ndim != 1 or len(mesh_breakpoints) < 2:
        raise ValueError("mesh_breakpoints must be 1-D with at least two entries")
    if not np.all(np.isfinite(mesh_breakpoints)):
        raise ValueError("mesh_breakpoints must be finite (no inf or NaN)")
    if not np.all(np.diff(mesh_breakpoints) > 0):
        raise ValueError("mesh_breakpoints must be strictly increasing")
    if mesh_breakpoints[0] != 0.0:
        raise ValueError("mesh_breakpoints[0] must be 0")

    node_pos, _divs, _choices = _resolve_node_pos(
        coll_nodes, coll_divs, coll_choices,
        default_divs=3, default_choices=[1, 2, 3],
        exclude_zero=True, fname="function_solve_VIE_1")

    # The continuous S_m^(0) representation extrapolates through the right
    # endpoint, so c_m = 1 is a structural requirement of the method itself,
    # independent of kernel smoothness — it must hold even when a singular
    # kernel is declared (only the amplification criteria below assume
    # smoothness).
    if force_continuous and abs(node_pos[-1] - 1.0) > 1e-12:
        raise ValueError(
            "force_continuous (continuous S_m^(0) collocation) requires the "
            "last collocation node to be the right endpoint c_m = 1; got "
            f"c_m = {node_pos[-1]:.6g}. Append 1.0 to your nodes.")

    # Reject node sets for which the chosen VIE-1 method does not converge.
    # The criteria assume a smooth kernel (Brunner Thm 2.4.2(b): |K(t,t)|>=k0>0),
    # so they are skipped when a weakly-singular kernel is declared.
    if kernel_singularity is None:
        if _choices is not None:
            # Rational nodes k/coll_divs: the exact criterion shared with the
            # array-input solve_VIE_1 (no tolerance needed at |rho| = 1).
            _check_vie1_setting(_divs, _choices, force_continuous)
        elif force_continuous:
            # Continuous S_m^(0): converges iff c_m = 1 and |rho_{m-1}| <= 1.
            rho = _vie1_cont_amplification(node_pos)
            if rho > 1.0 + 1e-9:
                raise ValueError(
                    "Collocation nodes do not yield a convergent continuous (S_m^(0)) "
                    f"VIE-1 solver: the leading-node amplification |rho_{{m-1}}| = "
                    f"prod_(i<m) (1 - c_i)/c_i = {rho:.4g} exceeds 1 (Brunner Thm 2.4.5).")
        elif not _vie1_convergent(node_pos):
            # Discontinuous S_{m-1}^{(-1)}: converges iff |rho_m| <= 1.
            rho = _vie1_amplification(node_pos)
            raise ValueError(
                f"Collocation nodes {np.array2string(node_pos, precision=6)} do not "
                f"produce a convergent VIE-1 solver: the amplification factor "
                f"|rho_m| = prod (1 - c_i)/c_i = {rho:.4g} exceeds 1. Choose nodes "
                f"with a smaller amplification (e.g. include c = 1, as Radau IIA does).")

    if not callable(kernel):
        raise TypeError("kernel must be callable")
    if g is not None and not callable(g):
        raise TypeError("g must be callable or None")

    if force_continuous and soln_init_value is None:
        raise ValueError("must specify soln_init_value when force_continuous=True")
    if not force_continuous and soln_init_value is not None and show_warnings:
        _warn("setting soln_init_value has no effect when force_continuous=False.", VolesWarning)

    # Complex dispatch. soln_init_value only contributes to the complex check
    # when force_continuous=True (otherwise it has no effect on the result).
    init_for_complex = soln_init_value if force_continuous else None
    if _samples_indicate_complex([kernel, g], mesh_breakpoints, init_for_complex):
        sample_u = float(np.diff(mesh_breakpoints)[0]) * 0.5
        d_orig = _detect_complex_d_orig(kernel, sample_u)
        init_wrapped = (_block_expand_init(soln_init_value, d_orig)
                        if force_continuous else None)
        result = vie1(
            kernel=_block_wrap_kernel(kernel, d_orig),
            g=_block_wrap_g(g, d_orig),
            soln_init_value=init_wrapped,
            mesh_breakpoints=mesh_breakpoints,
            coll_nodes=node_pos,
            kernel_singularity=kernel_singularity,
            return_function=return_function,
            force_continuous=force_continuous,
            show_warnings=show_warnings,
            reuse_adaptive_blocks=reuse_adaptive_blocks)
        if return_function:
            y_real, y_func_real = result
            return (_recombine_complex_y(y_real, d_orig),
                    _complex_solution(y_func_real, d_orig))
        return _recombine_complex_y(result, d_orig)

    M = len(mesh_breakpoints) - 1
    p = len(node_pos)
    widths = np.diff(mesh_breakpoints)

    from . import _dlang as _dlang_module
    max_p = _dlang_module.function_solve_max_p_d()
    if p > max_p:
        raise ValueError(
            f"number of collocation nodes p = {p} exceeds the maximum compiled "
            f"into the D extension ({max_p}).")

    sample_u = float(widths[0]) * 0.5
    is_vector, d = _detect_kernel_shape(kernel, sample_u)

    _maybe_warn_mesh_uniform_with_singularity(
        mesh_breakpoints, kernel_singularity, show_warnings)

    if not is_vector:
        g_arr = np.zeros((M, p), dtype=np.float64)
        if g is not None:
            for n in range(M):
                t_n = mesh_breakpoints[n]
                h_n = widths[n]
                for i in range(p):
                    t_ni = t_n + node_pos[i] * h_n
                    g_arr[n, i] = _scalar_g_value(g(t_ni), t_ni)
        _warn_vie1_g_start_callable(g, g_arr, show_warnings)
        if force_continuous:
            # Brunner S_m^(0): degree-m polynomial on {0} ∪ node_pos, with the
            # boundary value carried forward for continuity. Extended weight
            # tensor against the augmented basis (value cols + boundary col).
            cont_basis = _vie1_cont_basis_coefs(node_pos)
            W = _build_w_with_basis_scalar(
                kernel, mesh_breakpoints, node_pos,
                kernel_singularity, _smooth_gl_order, cont_basis,
                reuse_adaptive_blocks=reuse_adaptive_blocks)
            adv_U, adv_0 = _vie1_cont_advance(node_pos)
            y, boundary = _dlang_module.function_solve_vie1_cont_d(
                W, g_arr, adv_U, adv_0, _scalar_init(soln_init_value))
            if return_function:
                return y, _vie1_cont_solution(y, boundary, mesh_breakpoints, node_pos)
            return y

        W = _build_w_scalar(kernel, mesh_breakpoints, node_pos,
                            kernel_singularity, _smooth_gl_order,
                            reuse_adaptive_blocks=reuse_adaptive_blocks)
        y = _dlang_module.function_solve_vie1_d(W, g_arr)
        if return_function:
            return y, _lagrange_solution(y, mesh_breakpoints, node_pos)
        return y

    # ----- Vector / matrix path -----
    max_d = _dlang_module.function_solve_max_d_d()
    if d > max_d:
        raise ValueError(
            f"kernel dimension d = {d} exceeds the maximum compiled into the "
            f"D extension ({max_d}).")

    # W depends only on the kernel; built once and shared across columns. The
    # continuous (S_m^(0)) method uses the augmented value+boundary basis.
    if force_continuous:
        cont_basis = _vie1_cont_basis_coefs(node_pos)
        W = _build_w_with_basis_vector(kernel, mesh_breakpoints, node_pos,
                                       kernel_singularity, _smooth_gl_order, d,
                                       cont_basis,
                                       reuse_adaptive_blocks=reuse_adaptive_blocks)
        adv_U, adv_0 = _vie1_cont_advance(node_pos)
    else:
        W = _build_w_vector(kernel, mesh_breakpoints, node_pos,
                            kernel_singularity, _smooth_gl_order, d,
                            reuse_adaptive_blocks=reuse_adaptive_blocks)

    sample_t = float(mesh_breakpoints[0] + node_pos[0] * widths[0])
    m = _detect_g_matrix_cols(g, d, sample_t)

    if m is not None:
        # Matrix-valued problem: m simultaneous right-hand sides sharing W.
        if force_continuous:
            init_mat = np.asarray(soln_init_value, dtype=np.float64)
            if init_mat.shape != (d, m):
                raise ValueError(
                    f"soln_init_value must have shape ({d}, {m}) for a "
                    f"matrix-valued problem with force_continuous=True; "
                    f"got shape {tuple(init_mat.shape)}")

        G = _sample_g_at_coll_matrix(g, mesh_breakpoints, node_pos, widths,
                                     M, p, d, m)
        _warn_vie1_g_start_callable(g, G, show_warnings)

        if force_continuous:
            def _col_solve(j):
                g_arr_j = np.ascontiguousarray(G[:, :, :, j])
                return _dlang_module.function_solve_vie1_cont_vec_d(
                    W, g_arr_j, adv_U, adv_0,
                    np.ascontiguousarray(init_mat[:, j]))
            with ThreadPoolExecutor(max_workers=_column_workers(m)) as ex:
                results = list(ex.map(_col_solve, range(m)))
            y = np.stack([r[0] for r in results], axis=3)        # (M, p, d, m)
            if return_function:
                boundary = np.stack([r[1] for r in results], axis=2)  # (M+1, d, m)
                return y, _vie1_cont_solution(y, boundary, mesh_breakpoints,
                                              node_pos, d=d, m=m)
            return y

        def _col_solve(j):
            g_arr_j = np.ascontiguousarray(G[:, :, :, j])
            return _dlang_module.function_solve_vie1_vec_d(W, g_arr_j)

        with ThreadPoolExecutor(max_workers=_column_workers(m)) as ex:
            cols = list(ex.map(_col_solve, range(m)))
        y = np.stack(cols, axis=3)  # (M, p, d, m)

        if return_function:
            return y, _lagrange_solution(y, mesh_breakpoints, node_pos, d=d, m=m)
        return y

    g_arr = _sample_g_at_coll_vec(g, mesh_breakpoints, node_pos, widths, M, p, d)
    _warn_vie1_g_start_callable(g, g_arr, show_warnings)

    if force_continuous:
        init_vec = np.asarray(soln_init_value, dtype=np.float64)
        if init_vec.shape != (d,):
            raise ValueError(
                f"soln_init_value must have shape ({d},) for vector kernel; "
                f"got shape {tuple(init_vec.shape)}")
        y, boundary = _dlang_module.function_solve_vie1_cont_vec_d(
            W, g_arr, adv_U, adv_0, init_vec)
        if return_function:
            return y, _vie1_cont_solution(y, boundary, mesh_breakpoints,
                                          node_pos, d=d)
        return y

    y = _dlang_module.function_solve_vie1_vec_d(W, g_arr)

    if return_function:
        return y, _lagrange_solution(y, mesh_breakpoints, node_pos, d=d)
    return y


# ---------------------------------------------------------------------------
# Engine entry point (1.0 plan, Phase 3)
# ---------------------------------------------------------------------------

_ENGINE = {"vie1": vie1, "vie2": vie2,
           "vide": vide}
_DEFAULT_SETTING = {"vie1": (3, [1, 2, 3], True), "vie2": (2, [0, 1, 2], False),
                    "vide": (2, [0, 1, 2], False)}


def solve(equation, **engine_kw):
    """Solve with the callable-input engine and return a `VolterraSolution`.

    ``engine_kw`` are the engine's (0.10) keyword arguments; the engine
    validates them. The node positions are resolved with the engine's own
    `_resolve_node_pos`, and checked against the shape of its output."""
    from ._solution import _from_functional_engine
    node_values, engine_sol = _ENGINE[equation](return_function=True, **engine_kw)
    divs, choices, exclude_zero = _DEFAULT_SETTING[equation]
    node_pos, _, _ = _resolve_node_pos(
        engine_kw.get("coll_nodes"), engine_kw.get("coll_divs"), engine_kw.get("coll_choices"),
        default_divs=divs, default_choices=choices, exclude_zero=exclude_zero,
        fname={"vie1": "function_solve_VIE_1", "vie2": "function_solve_VIE_2",
               "vide": "function_solve_VIDE"}[equation])
    M = len(engine_sol.mesh_breakpoints) - 1
    if np.shape(node_values)[:2] != (M, len(node_pos)):
        raise RuntimeError(
            f"internal error: the engine returned node values of shape "
            f"{np.shape(node_values)} for {M} intervals and {len(node_pos)} nodes. This is a "
            f"bug in voles; please report it.")
    continuous = equation == "vide" or (equation == "vie1"
                                        and bool(engine_kw.get("force_continuous", False)))
    return _from_functional_engine(node_values, engine_sol, equation=equation,
                                   continuous=continuous, node_pos=node_pos)
