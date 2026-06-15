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

scipy is required (optional extra `[callable]`); imported lazily.
"""

from __future__ import annotations

import numpy as np
from numpy.polynomial import polynomial as npp


_SCIPY_IMPORT_ERR = (
    "function_solve_* requires scipy. Install it via "
    "`pip install volterra-equation-solvers[callable]`."
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


# ---------------------------------------------------------------------------
# Lagrange basis construction (normalized [0, 1] coordinates)
# ---------------------------------------------------------------------------

def _lagrange_basis_coefs(coll_divs: int, coll_choices: list[int]) -> np.ndarray:
    """Return coefficient array (num_c_params, num_c_params) for the Lagrange
    basis polynomials L_k(x) on the normalized [0, 1] interval.

    Row k holds the polynomial coefficients (lowest-degree first) of L_k, the
    basis polynomial that is 1 at node k and 0 at the other nodes. Nodes are
    at positions `coll_choices[k] / coll_divs`.
    """
    nodes = np.asarray(coll_choices, dtype=float) / coll_divs
    p = len(nodes)
    basis = np.zeros((p, p))
    for k in range(p):
        coef = np.array([1.0])
        for kp in range(p):
            if kp == k:
                continue
            coef = npp.polymul(coef, [-nodes[kp], 1.0])
            coef = coef / (nodes[k] - nodes[kp])
        basis[k, :len(coef)] = coef
    return basis


def _eval_poly_at(coefs: np.ndarray, x: float) -> float:
    """Evaluate polynomial with coefficients `coefs` (lowest-degree first) at x."""
    return float(npp.polyval(x, coefs))


# ---------------------------------------------------------------------------
# Weight-tensor builder
# ---------------------------------------------------------------------------

def _normalize_kernel_singularity(kernel_singularity):
    """Return a callable `t -> list[float]` giving singular s-locations.

    Accepts None, float, list of float, or callable. The float/list form is
    wrapped as convolution-style: `lambda t: [t - u for u in declared_us]`.
    """
    if kernel_singularity is None:
        return lambda t: []
    if callable(kernel_singularity):
        return kernel_singularity
    if isinstance(kernel_singularity, (int, float)):
        declared = [float(kernel_singularity)]
    else:
        declared = [float(u) for u in kernel_singularity]
    return lambda t, _us=tuple(declared): [t - u for u in _us]


def _gauss_legendre_nodes_weights(order: int) -> tuple[np.ndarray, np.ndarray]:
    """Standard Gauss-Legendre nodes and weights on [-1, 1]."""
    nodes, weights = np.polynomial.legendre.leggauss(order)
    return nodes, weights


def _fixed_order_quad(integrand, a: float, b: float, order: int) -> float:
    """Apply Gauss-Legendre of given order on [a, b]."""
    if b <= a:
        return 0.0
    nodes, weights = _gauss_legendre_nodes_weights(order)
    half = 0.5 * (b - a)
    mid = 0.5 * (a + b)
    s_points = mid + half * nodes
    vals = np.array([integrand(s) for s in s_points])
    return float(half * np.dot(weights, vals))


def _fixed_order_quad_matrix(integrand, a: float, b: float, order: int,
                              d: int) -> np.ndarray:
    """Gauss-Legendre on a (d, d)-valued integrand on [a, b]."""
    if b <= a:
        return np.zeros((d, d), dtype=np.float64)
    nodes, weights = _gauss_legendre_nodes_weights(order)
    half = 0.5 * (b - a)
    mid = 0.5 * (a + b)
    result = np.zeros((d, d), dtype=np.float64)
    for x, w in zip(nodes, weights):
        result += w * np.asarray(integrand(mid + half * x), dtype=np.float64)
    return half * result


def _build_W_scalar(kernel, mesh_breakpoints: np.ndarray,
                    coll_divs: int, coll_choices: list[int],
                    kernel_singularity,
                    smooth_gl_order: int,
                    smooth_check_tol: float = 1e-9) -> np.ndarray:
    """Build the weight tensor W[n,i,l,k] for the scalar VIE-2 (and -1, VIDE)
    collocation linear systems.

    Shape: (M, p, M, p) where M = num mesh intervals, p = num collocation
    nodes per interval. For l < n, W[n,i,l,k] is the full-interval integral.
    For l == n, W[n,i,n,k] is the partial-interval integral from t_n up to
    the collocation point tau_{n,i}. For l > n, entries are zero.
    """
    M = len(mesh_breakpoints) - 1
    p = len(coll_choices)
    basis = _lagrange_basis_coefs(coll_divs, coll_choices)  # (p, p)
    node_pos = np.asarray(coll_choices, dtype=float) / coll_divs  # (p,)
    widths = np.diff(mesh_breakpoints)  # (M,)
    singular_locs = _normalize_kernel_singularity(kernel_singularity)

    quad = None  # lazy-load only if needed
    W = np.zeros((M, p, M, p), dtype=np.float64)

    for n in range(M):
        h_n = widths[n]
        t_n = mesh_breakpoints[n]
        # Collocation points in interval n (actual coords)
        tau_n = t_n + node_pos * h_n  # (p,)

        for i in range(p):
            tau = tau_n[i]
            sing_for_tau = singular_locs(tau)

            for l in range(n + 1):
                t_l = mesh_breakpoints[l]
                t_lp1 = mesh_breakpoints[l + 1]
                h_l = widths[l]
                a_int = t_l
                b_int = t_lp1 if l < n else tau  # partial for l == n

                if b_int <= a_int:
                    continue  # zero-length partial (e.g. tau == t_n)

                # Categorize singularities: interior ones need a `points=`
                # hint; endpoint ones just mean we route to scipy.quad (it
                # handles endpoint integrable singularities adaptively).
                tol = 1e-12 * max(1.0, abs(b_int - a_int))
                interior_sing = [sp for sp in sing_for_tau
                                 if a_int + tol < sp < b_int - tol]
                endpoint_sing = any(abs(sp - a_int) < tol or abs(sp - b_int) < tol
                                    for sp in sing_for_tau)
                use_adaptive = bool(interior_sing) or endpoint_sing

                for k in range(p):
                    L_k_coefs = basis[k]  # in normalized coords on interval l

                    def integrand(s, _tau=tau, _t_l=t_l, _h_l=h_l, _L_k=L_k_coefs):
                        x_norm = (s - _t_l) / _h_l
                        return kernel(_tau - s) * _eval_poly_at(_L_k, x_norm)

                    if use_adaptive:
                        if quad is None:
                            quad = _import_scipy_quad()
                        kwargs = {'limit': 100}
                        if interior_sing:
                            kwargs['points'] = interior_sing
                        val, _err = quad(integrand, a_int, b_int, **kwargs)
                    else:
                        v1 = _fixed_order_quad(integrand, a_int, b_int,
                                               smooth_gl_order)
                        v2 = _fixed_order_quad(integrand, a_int, b_int,
                                               smooth_gl_order + 2)
                        if abs(v1 - v2) <= smooth_check_tol * max(1.0, abs(v2)):
                            val = v2
                        else:
                            # GL orders disagree -- integrand isn't well-resolved
                            # by fixed-order quadrature. Escalate to scipy.quad.
                            # If the kernel has an undeclared singularity that
                            # scipy.quad can't handle either, the post-build
                            # finite check will catch it.
                            if quad is None:
                                quad = _import_scipy_quad()
                            val, _err = quad(integrand, a_int, b_int, limit=100)

                    W[n, i, l, k] = val

    if not np.isfinite(W).all():
        raise ValueError(
            "Kernel weight tensor contains non-finite entries -- your kernel "
            "appears to be singular. Pass `kernel_singularity=<location(s)>` "
            "to declare the singular point(s)."
        )

    return W


def _build_W_vector(kernel, mesh_breakpoints: np.ndarray,
                    coll_divs: int, coll_choices: list[int],
                    kernel_singularity, smooth_gl_order: int, d: int,
                    smooth_check_tol: float = 1e-9) -> np.ndarray:
    """Vector analogue of _build_W_scalar for matrix-valued kernels.

    Shape: (M, p, M, p, d, d). For each (n, i, l, k), the (d, d) block holds
    integral over interval l (or partial for l == n) of K(tau_{n,i} - s)
    multiplied by L_{l,k}(s).
    """
    M = len(mesh_breakpoints) - 1
    p = len(coll_choices)
    basis = _lagrange_basis_coefs(coll_divs, coll_choices)
    node_pos = np.asarray(coll_choices, dtype=float) / coll_divs
    widths = np.diff(mesh_breakpoints)
    singular_locs = _normalize_kernel_singularity(kernel_singularity)

    quad_vec = None
    W = np.zeros((M, p, M, p, d, d), dtype=np.float64)

    for n in range(M):
        h_n = widths[n]
        t_n = mesh_breakpoints[n]
        tau_n = t_n + node_pos * h_n

        for i in range(p):
            tau = tau_n[i]
            sing_for_tau = singular_locs(tau)

            for l in range(n + 1):
                t_l = mesh_breakpoints[l]
                t_lp1 = mesh_breakpoints[l + 1]
                h_l = widths[l]
                a_int = t_l
                b_int = t_lp1 if l < n else tau

                if b_int <= a_int:
                    continue

                tol = 1e-12 * max(1.0, abs(b_int - a_int))
                interior_sing = [sp for sp in sing_for_tau
                                 if a_int + tol < sp < b_int - tol]
                endpoint_sing = any(abs(sp - a_int) < tol or abs(sp - b_int) < tol
                                    for sp in sing_for_tau)
                use_adaptive = bool(interior_sing) or endpoint_sing

                for k in range(p):
                    L_k_coefs = basis[k]

                    def integrand(s, _tau=tau, _t_l=t_l, _h_l=h_l, _L_k=L_k_coefs):
                        x_norm = (s - _t_l) / _h_l
                        K = np.asarray(kernel(_tau - s), dtype=np.float64)
                        return K * _eval_poly_at(_L_k, x_norm)

                    if use_adaptive:
                        if quad_vec is None:
                            quad_vec = _import_scipy_quad_vec()
                        kwargs = {'limit': 100}
                        if interior_sing:
                            kwargs['points'] = interior_sing
                        val, _err = quad_vec(integrand, a_int, b_int, **kwargs)
                    else:
                        v1 = _fixed_order_quad_matrix(integrand, a_int, b_int,
                                                     smooth_gl_order, d)
                        v2 = _fixed_order_quad_matrix(integrand, a_int, b_int,
                                                     smooth_gl_order + 2, d)
                        err = float(np.max(np.abs(v1 - v2)))
                        ref = max(1.0, float(np.max(np.abs(v2))))
                        if err <= smooth_check_tol * ref:
                            val = v2
                        else:
                            if quad_vec is None:
                                quad_vec = _import_scipy_quad_vec()
                            val, _err = quad_vec(integrand, a_int, b_int,
                                                 limit=100)

                    W[n, i, l, k, :, :] = val

    if not np.isfinite(W).all():
        raise ValueError(
            "Kernel weight tensor contains non-finite entries -- your kernel "
            "appears to be singular. Pass `kernel_singularity=<location(s)>` "
            "to declare the singular point(s)."
        )

    return W


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

class _SolutionFunction:
    """Callable wrapping the per-interval Lagrange polynomials.

    `y(t)` evaluates the piecewise polynomial at scalar or array `t`.

    For scalar problems, `polynomials` is a list of `numpy.polynomial.Polynomial`
    objects, one per mesh interval. For vector problems with d components,
    `polynomials` is a list of object arrays of shape `(d,)`, each entry a
    Polynomial for that component on that interval.
    """

    def __init__(self, polynomials, mesh_breakpoints, d: int = 0):
        self.polynomials = polynomials
        self.mesh_breakpoints = np.asarray(mesh_breakpoints)
        # d == 0 marks a scalar problem; d >= 1 marks a vector problem
        self._d = d

    def __call__(self, t):
        scalar_input = (np.isscalar(t) or np.ndim(t) == 0)
        t_arr = np.atleast_1d(np.asarray(t, dtype=float))
        bps = self.mesh_breakpoints
        idx = np.searchsorted(bps, t_arr, side='right') - 1
        idx = np.clip(idx, 0, len(self.polynomials) - 1)

        if self._d == 0:
            out = np.empty(t_arr.shape, dtype=float)
            for j, (ti, ii) in enumerate(zip(t_arr, idx)):
                out[j] = self.polynomials[int(ii)](ti)
            return float(out[0]) if scalar_input else out

        # Vector case: each interval has d component polynomials
        out = np.empty((len(t_arr), self._d), dtype=float)
        for j, (ti, ii) in enumerate(zip(t_arr, idx)):
            polys_n = self.polynomials[int(ii)]
            for r in range(self._d):
                out[j, r] = polys_n[r](ti)
        return out[0] if scalar_input else out


def _build_polynomials(y: np.ndarray, mesh_breakpoints: np.ndarray,
                       coll_divs: int, coll_choices: list[int]) -> list:
    """Convert collocation-node values y[n,k] to a list of M Polynomial objects.

    Each Polynomial maps actual time t to the Lagrange interpolant on interval n.
    """
    p = len(coll_choices)
    M = len(mesh_breakpoints) - 1
    basis = _lagrange_basis_coefs(coll_divs, coll_choices)
    polys = []
    for n in range(M):
        t_l = mesh_breakpoints[n]
        t_r = mesh_breakpoints[n + 1]
        norm_coef = np.zeros(p)
        for k in range(p):
            norm_coef += y[n, k] * basis[k]
        poly = np.polynomial.Polynomial(norm_coef, domain=(t_l, t_r),
                                        window=(0.0, 1.0), symbol='t')
        polys.append(poly.convert(domain=(t_l, t_r), window=(t_l, t_r)).trim())
    return polys


def _build_polynomials_vector(y: np.ndarray, mesh_breakpoints: np.ndarray,
                               coll_divs: int, coll_choices: list[int],
                               d: int) -> list:
    """Vector analogue: y has shape (M, p, d); return list of (d,) Polynomial arrays."""
    p = len(coll_choices)
    M = len(mesh_breakpoints) - 1
    basis = _lagrange_basis_coefs(coll_divs, coll_choices)
    polys = []
    for n in range(M):
        t_l = mesh_breakpoints[n]
        t_r = mesh_breakpoints[n + 1]
        comps = np.empty(d, dtype=object)
        for r in range(d):
            norm_coef = np.zeros(p)
            for k in range(p):
                norm_coef += y[n, k, r] * basis[k]
            poly = np.polynomial.Polynomial(norm_coef, domain=(t_l, t_r),
                                            window=(0.0, 1.0), symbol='t')
            comps[r] = poly.convert(domain=(t_l, t_r), window=(t_l, t_r)).trim()
        polys.append(comps)
    return polys


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


def function_solve_VIE_2(*, kernel, g=None, mesh_breakpoints,
                          coll_divs: int = 2, coll_choices: list[int] = [0, 1, 2],
                          kernel_singularity=None,
                          return_function: bool = False,
                          show_warnings: bool = True,
                          _smooth_gl_order: int = 6):
    r"""Solve the scalar Volterra integral equation of the second kind

    $$y(t) = g(t) + \int_0^t K(t-s)\,y(s)\,ds$$

    with callable kernel and right-hand side, on an arbitrary mesh.

    Parameters
    ----------
    kernel : callable
        ``kernel(u)`` returns $K(u)$ for scalar $u > 0$.
    g : callable, optional
        ``g(t)`` returns the forcing term $g(t)$. Defaults to zero.
    mesh_breakpoints : array_like
        Strictly increasing 1-D array starting at 0. Defines the integration
        intervals directly.
    coll_divs, coll_choices : int, list of int
        Collocation node positions: nodes lie at
        ``coll_choices[k] / coll_divs`` in each interval. Unlike the array-
        based solvers, ``coll_divs`` does *not* sub-divide intervals.
    kernel_singularity : None, float, list of float, or callable
        Declare the singularity structure of the kernel.

        - ``None``: kernel is smooth everywhere.
        - ``float`` or list of float: convolution-style singularity locations
          (in $u = t - s$); e.g. ``0.0`` for $K(u) \sim u^{-\alpha}$.
        - callable ``f(t) -> list[float]``: returns the singular $s$-locations
          for collocation point $t$. Forward-compatible with non-convolution
          $K(s, t)$.
    return_function : bool, optional
        If True, also return a callable solution wrapper.
    show_warnings : bool, optional
        Currently unused; reserved for the graded-mesh / mesh-uniformity hint.

    Returns
    -------
    soln_values : ndarray of shape (M, p)
        Solution values at collocation nodes, where M is the number of
        intervals and p = ``len(coll_choices)``.
    (soln_values, y_callable) : tuple
        When ``return_function=True``. ``y_callable(t)`` evaluates the
        piecewise polynomial at any time t.

    Notes
    -----
    See the module docstring for the mesh-convention difference from the
    array-based solvers.
    """
    mesh_breakpoints = np.asarray(mesh_breakpoints, dtype=float)
    if mesh_breakpoints.ndim != 1 or len(mesh_breakpoints) < 2:
        raise ValueError("mesh_breakpoints must be 1-D with at least two entries")
    if not np.all(np.diff(mesh_breakpoints) > 0):
        raise ValueError("mesh_breakpoints must be strictly increasing")
    if mesh_breakpoints[0] != 0.0:
        raise ValueError("mesh_breakpoints[0] must be 0")

    if coll_divs < 1:
        raise ValueError("coll_divs must be a positive integer")
    for c in coll_choices:
        # bool is a subclass of int in Python; reject anyway since it's never intended
        if isinstance(c, bool) or not isinstance(c, (int, np.integer)):
            raise ValueError(
                f"coll_choices must be a list of integers, got {type(c).__name__}")
    coll_choices = sorted(int(c) for c in coll_choices)
    if len(set(coll_choices)) != len(coll_choices):
        raise ValueError("coll_choices entries must be distinct")
    for c in coll_choices:
        if not 0 <= c <= coll_divs:
            raise ValueError(f"coll_choices must lie in [0, {coll_divs}]")

    if not callable(kernel):
        raise TypeError("kernel must be callable")
    if g is not None and not callable(g):
        raise TypeError("g must be callable or None")

    M = len(mesh_breakpoints) - 1
    p = len(coll_choices)
    widths = np.diff(mesh_breakpoints)
    node_pos = np.asarray(coll_choices, dtype=float) / coll_divs

    # Detect scalar vs vector kernel by sampling at a non-singular point.
    sample_u = float(widths[0]) * 0.5
    is_vector, d = _detect_kernel_shape(kernel, sample_u)

    from . import _dlang as _dlang_module
    max_p = _dlang_module.function_solve_max_p_d()
    if p > max_p:
        raise ValueError(
            f"len(coll_choices) = {p} exceeds the maximum compiled into the "
            f"D extension ({max_p}). Use a smaller coll_choices.")

    if not is_vector:
        W = _build_W_scalar(kernel, mesh_breakpoints, coll_divs, coll_choices,
                            kernel_singularity, _smooth_gl_order)
        g_arr = np.zeros((M, p), dtype=np.float64)
        if g is not None:
            for n in range(M):
                t_n = mesh_breakpoints[n]
                h_n = widths[n]
                for i in range(p):
                    g_arr[n, i] = float(g(t_n + node_pos[i] * h_n))
        y = _dlang_module.function_solve_vie2_d(W, g_arr)

        if return_function:
            polys = _build_polynomials(y, mesh_breakpoints, coll_divs, coll_choices)
            y_func = _SolutionFunction(polys, mesh_breakpoints, d=0)
            return y, y_func
        return y

    # ----- Vector path -----
    max_d = _dlang_module.function_solve_max_d_d()
    if d > max_d:
        raise ValueError(
            f"kernel dimension d = {d} exceeds the maximum compiled into the "
            f"D extension ({max_d}).")

    W = _build_W_vector(kernel, mesh_breakpoints, coll_divs, coll_choices,
                        kernel_singularity, _smooth_gl_order, d)
    g_arr = np.zeros((M, p, d), dtype=np.float64)
    if g is not None:
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
    y = _dlang_module.function_solve_vie2_vec_d(W, g_arr)

    if return_function:
        polys = _build_polynomials_vector(y, mesh_breakpoints, coll_divs,
                                          coll_choices, d)
        y_func = _SolutionFunction(polys, mesh_breakpoints, d=d)
        return y, y_func
    return y
