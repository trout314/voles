import os
import warnings

import numpy as np
from concurrent.futures import ThreadPoolExecutor
from . import _dlang as _dlang_module
from . import _complex as _cplx
from ._solution import _SolutionFunction, _ComplexSolutionFunction


def _column_workers(m_cols):
    """Thread count for the matrix-column fan-out.

    Columns are independent solves, each with its own D-side lag table, so
    one thread per column both oversubscribes the CPU and multiplies peak
    memory when m_cols is large; cap at the core count. Zero columns is a
    caller error (an executor would reject max_workers=0 with a confusing
    message).
    """
    if m_cols == 0:
        raise ValueError(
            "matrix-valued input has zero columns (trailing axis of length 0)")
    return min(m_cols, os.cpu_count() or 1)


def _resolve_return_flag(return_function, return_polys):
    """Reconcile the public ``return_function`` flag with the deprecated
    ``return_polys`` alias, returning a single effective boolean.

    ``return_polys`` defaults to ``None`` (not passed); any non-None value means
    the caller used the old keyword and gets a DeprecationWarning.
    """
    if return_polys is not None:
        warnings.warn(
            "`return_polys` is deprecated; use `return_function`. The second "
            "return value is now a callable solution object that also indexes "
            "and iterates like the old list of polynomials.",
            DeprecationWarning, stacklevel=3)
        return bool(return_function) or bool(return_polys)
    return bool(return_function)


def _wrap_polys(polys, time_step, coll_divs, d=0, m=0):
    """Wrap a per-interval list of polynomials in a callable `_SolutionFunction`.

    The array-based solvers use a uniform mesh of width ``coll_divs**2 *
    time_step``; the breakpoints are reconstructed from the interval count.
    """
    polys = list(polys)
    h = coll_divs ** 2 * time_step
    mesh_breakpoints = np.arange(len(polys) + 1) * h
    return _SolutionFunction(polys, mesh_breakpoints, d=d, m=m)


def _build_vec_polys(poly_coefs, mesh_divs, coll_divs, time_step):
    """Convert (mesh_divs, m+1, d) poly coef array to list of (d,) Polynomial arrays.

    poly_coefs[n, :, r] are coefficients in rel_x ∈ [0,1] for component r on interval n.
    Returns a list of length mesh_divs where each element is a (d,) object array of
    numpy.polynomial.Polynomial objects mapped to actual time.
    """
    d = poly_coefs.shape[2]
    h = coll_divs ** 2 * time_step
    polys = []
    for n in range(mesh_divs):
        t_start = n * h
        t_end = (n + 1) * h
        domain = (t_start, t_end)
        arr = np.empty(d, dtype=object)
        for r in range(d):
            coefs = poly_coefs[n, :, r]
            p = np.polynomial.Polynomial(coefs, domain=domain, window=(0.0, 1.0), symbol='t')
            arr[r] = p.convert(domain=domain, window=domain).trim()
        polys.append(arr)
    return polys

_all_fast = _dlang_module.supported_coll_settings_d()
# Non-convergent VIE-1 settings excluded (verified by grid-refinement study).
_VIE1_NONCONVERGENT = {(3, (1,)), (4, (1,)), (4, (1, 2))}
_fast_settings_VIE_1 = [
    (d, c) for d, c in _all_fast
    if 0 not in c and (d, tuple(c)) not in _VIE1_NONCONVERGENT
]
_fast_settings_VIE_2 = _all_fast
_fast_settings_VIDE  = _all_fast
del _all_fast


def _continuous_vie1_rho(coll_divs, coll_choices):
    r"""Brunner's $\rho_{m-1} = (-1)^m \prod_{i<m} (1 - c_i)/c_i$ for the
    continuous ($S_m^{(0)}$) VIE-1 method with $c_m = 1$ (Brunner 2004,
    Theorem 2.4.5): the constant-kernel amplification factor of the boundary
    value carried across mesh points."""
    c = [k / coll_divs for k in coll_choices]
    rho = (-1.0) ** len(c)
    for ci in c[:-1]:
        rho *= (1.0 - ci) / ci
    return rho


def _check_continuous_vie1_setting(coll_divs, coll_choices):
    """Reject collocation settings for which the continuous VIE-1 method is
    not defined or does not converge. ``coll_choices`` must be sorted."""
    if coll_choices[-1] != coll_divs:
        raise ValueError(
            f"force_continuous=True requires the last collocation node to be the right "
            f"endpoint of the mesh interval (max(coll_choices) == coll_divs); got "
            f"coll_divs={coll_divs}, coll_choices={coll_choices}. This is a structural "
            f"requirement of the continuous S_m^(0) method (Brunner 2004, Section 2.4.3).")
    rho = _continuous_vie1_rho(coll_divs, coll_choices)
    if abs(rho) > 1.0 + 1e-12:
        raise ValueError(
            f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) does "
            f"not produce a convergent continuous VIE-1 solver: |rho_(m-1)| = {abs(rho):.4g} "
            f"> 1 (Brunner 2004, Theorem 2.4.5). Use nodes with |rho_(m-1)| <= 1, e.g. "
            f"coll_choices=list(range(1, coll_divs + 1)).")

try:
    from . import _numba_solvers
    _numba_available = True
except ImportError:
    _numba_available = False


def _truncate_N(kernel_values_, coll_divs, show_warnings):
    """Truncate kernel_values_ to the largest valid length; return (N, kernel_values_).

    Valid lengths satisfy N ≡ 1 (mod coll_divs²).  Prints a warning when
    truncation is needed and show_warnings is True. Raises ValueError if the
    truncated length leaves zero mesh intervals (i.e. N < coll_divs² + 1).
    """
    N = len(kernel_values_)
    if coll_divs > 1 and N % coll_divs**2 != 1:
        N_used = (N - 1) // coll_divs**2 * coll_divs**2 + 1
        if show_warnings:
            print(
                f"warning: the length of kernel_values ({N}) is not of the form: "
                f"(multiple of coll_divs**2) + 1 where coll_divs = {coll_divs}. "
                f"All input data lists will be truncated to the next smaller number "
                f"of this form ({N_used}) which will also be the length of the "
                f"returned list of solution values."
            )
    else:
        N_used = N

    if N_used < coll_divs ** 2 + 1:
        raise ValueError(
            f"kernel_values has length {N} (truncated to {N_used}), which leaves "
            f"zero mesh intervals for coll_divs={coll_divs}. Need at least "
            f"{coll_divs ** 2 + 1} input points to form one mesh interval."
        )
    return N_used, kernel_values_[:N_used]


def solve_VIDE(*, kernel_values, a_values=None, g_values=None, soln_init_value, time_step=1.0,
               coll_divs=2, coll_choices=[0,1,2], return_function=False, return_polys=None,
               show_warnings=True):
    r'''
    Solve a Volterra integro-differential equation.

    Finds $y(t)$ satisfying

    $$y'(t) = a(t)\,y(t) + g(t) + \int_0^t K(t-s)\,y(s)\,ds, \quad y(0) = y_0$$

    Parameters
    ----------
    kernel_values : array_like of shape (N,) or (N, d, d)
        Values of $K(s)$ at times $s = 0, h, 2h, \ldots, (N-1)h$, where $h$
        is ``time_step``. Pass a 1-D array for scalar equations or a 3-D array
        of shape ``(N, d, d)`` for $d$-dimensional vector equations.
    a_values : array_like of shape (N,) or (N, d, d), optional
        Values of the coefficient $a(t)$ at the same times as
        ``kernel_values``. For vector equations $a(t)$ is a $d \times d$
        matrix. Defaults to zero.
    g_values : array_like of shape (N,) or (N, d) or (N, d, m), optional
        Forcing term $g(t)$ sampled at the same times as ``kernel_values``.
        Defaults to zero. In the matrix-valued case pass shape
        ``(N, d, m)`` (or a shared ``(N, d)`` forcing for all columns).
    soln_init_value : float or array_like of shape (d,) or (d, m)
        Initial value $y(0) = y_0$. Required. A ``(d, m)`` shape is what
        *selects* the matrix-valued case ($m$ right-hand sides solved
        simultaneously, in threads capped at the CPU count); ``g_values``
        alone does not.
    time_step : float, optional
        Spacing $h$ between consecutive sample times. Must be positive.
        Default is 1.0.
    coll_divs : int, optional
        Number of collocation sub-intervals per mesh interval. Must be a
        positive integer. Default is 2.
    coll_choices : list of int, optional
        Indices selecting the collocation nodes within each sub-interval.
        Each entry $k$ corresponds to the node $k / c$ where $c$ =
        ``coll_divs``, placed in $[0, 1]$. Entries must be distinct integers
        in $\{0, 1, \ldots, \text{coll\_divs}\}$. Default is ``[0, 1, 2]``.
    return_function : bool, optional
        If ``True``, also return a callable solution object as the second
        element of a tuple (see Returns). Default is ``False``.
    return_polys : bool, optional
        Deprecated alias for ``return_function``; passing it emits a
        ``DeprecationWarning``.
    show_warnings : bool, optional
        If ``True`` (default), print a warning when ``kernel_values`` is
        truncated or when the Numba fallback is used.

    Returns
    -------
    soln_values : ndarray of shape (N,) or (N, d) or (N, d, m)
        Solution values $y(t)$ at the same times as the input arrays.
        Returned when ``return_function=False`` (default).
    (soln_values, solution) : tuple
        Returned when ``return_function=True``. ``soln_values`` is as above.
        ``solution`` is callable -- ``solution(t)`` evaluates the piecewise
        polynomial solution at scalar or array ``t`` -- and also behaves like
        the previous list of per-interval polynomials: ``len(solution)``,
        ``solution[n]``, and iteration operate on ``solution.polynomials``.
        For scalar equations each polynomial is a
        `numpy.polynomial.Polynomial`; for vector equations each interval entry
        is an object array of shape ``(d,)`` (or ``(d, m)`` for matrix
        equations), one polynomial per component.

    Raises
    ------
    ValueError
        For invalid shapes or collocation settings, inputs too short to form
        one mesh interval, matrix input with zero columns, or inputs so large
        that a solver buffer would exceed $2^{31}$ elements.
    NotImplementedError
        For a collocation setting not compiled into the D extension, on the
        vector/matrix path (no fallback exists) or on the scalar path when
        ``numba`` is not installed.
    numpy.linalg.LinAlgError
        If a collocation system is singular or nearly singular.

    Notes
    -----
    The length $N$ of the input arrays must satisfy
    $N \equiv 1 \pmod{\text{coll\_divs}^2}$. If a longer array is supplied it
    is truncated to the largest conforming length and a warning is printed
    (unless ``show_warnings=False``).

    The solver dispatches at runtime to a D-extension routine specialised for
    the given collocation setting. For scalar equations, settings not compiled
    into the extension fall back to a Numba-JIT implementation (requires the
    ``numba`` optional dependency); a warning is printed when the fallback is
    used. For vector equations only the compiled settings are supported. The
    compiled settings are listed in ``fast_coll_settings_VIDE``.

    References
    ----------
    .. [1] Brunner, H. *Collocation Methods for Volterra Integral and Related
       Functional Differential Equations.* Cambridge University Press, 2004.
       Chapter 3, pp. 160–167.
    '''
    return_function = _resolve_return_flag(return_function, return_polys)
    # ------------------------------------------------------------------ complex dispatch
    if _cplx.is_complex(kernel_values, a_values, g_values, soln_init_value):
        K_arr = np.asarray(kernel_values)
        is_scalar = (K_arr.ndim == 1)
        d_orig = 0 if is_scalar else K_arr.shape[1]
        K_real = _cplx._block_kernel(K_arr)
        a_real = _cplx._block_a(np.asarray(a_values)) if a_values is not None else None
        g_real = _cplx._expand_g(np.asarray(g_values)) if g_values is not None else None
        init_real = _cplx._expand_init(soln_init_value)
        result = solve_VIDE(
            kernel_values=K_real, a_values=a_real, g_values=g_real,
            soln_init_value=init_real, time_step=time_step, coll_divs=coll_divs,
            coll_choices=coll_choices, return_function=return_function,
            show_warnings=show_warnings)
        if return_function:
            soln_real, sf_real = result
            return (_cplx._recombine(soln_real, d_orig),
                    _ComplexSolutionFunction(sf_real, d_orig))
        return _cplx._recombine(result, d_orig)

    kernel_values_ = np.asarray(kernel_values, dtype=float)
    ndim = kernel_values_.ndim

    if ndim not in (1, 3):
        raise ValueError(
            f"kernel_values must be 1-D (scalar) or 3-D (N, d, d), got shape {kernel_values_.shape}")

    N_orig = len(kernel_values_)
    N, kernel_values_ = _truncate_N(kernel_values_, coll_divs, show_warnings)

    # ------------------------------------------------------------------ vector path
    if ndim == 3:
        _, d1, d2 = kernel_values_.shape
        if d1 != d2:
            raise ValueError(f"kernel_values must have shape (N, d, d), got {kernel_values_.shape}")
        d = d1

        # ---- matrix case: detect via soln_init_value shape (d, m_cols) ----
        soln_init_values_ = np.asarray(soln_init_value, dtype=float)
        if soln_init_values_.ndim == 2:
            d_init, m_cols = soln_init_values_.shape
            if d_init != d:
                raise ValueError(
                    f"soln_init_value shape {soln_init_values_.shape} incompatible with d={d}")
            if g_values is not None:
                g_mat = np.asarray(g_values, dtype=float)
                if g_mat.ndim == 3:
                    if g_mat.shape[1:] != (d, m_cols):
                        raise ValueError(
                            f"g_values shape {g_mat.shape} incompatible with kernel/soln_init shapes")
                    g_cols = [g_mat[:N, :, j] for j in range(m_cols)]
                else:
                    g_cols = [g_values] * m_cols
            else:
                g_cols = [None] * m_cols
            a_trunc = np.asarray(a_values, dtype=float)[:N] if a_values is not None else None
            def _col_vide(j):
                # column 0 carries any per-solve warnings; the others would
                # only duplicate them m_cols times from interleaved threads
                return solve_VIDE(kernel_values=kernel_values_,
                                  a_values=a_trunc,
                                  g_values=g_cols[j],
                                  soln_init_value=soln_init_values_[:, j],
                                  time_step=time_step, coll_divs=coll_divs,
                                  coll_choices=coll_choices,
                                  return_function=return_function,
                                  show_warnings=show_warnings and j == 0)
            with ThreadPoolExecutor(max_workers=_column_workers(m_cols)) as ex:
                results = list(ex.map(_col_vide, range(m_cols)))
            if return_function:
                col_solns = [r[0] for r in results]
                col_polys = [r[1] for r in results]
                soln = np.stack(col_solns, axis=2)
                mesh_divs = len(col_polys[0])
                mat_polys = []
                for n in range(mesh_divs):
                    arr = np.empty((d, m_cols), dtype=object)
                    for j in range(m_cols):
                        arr[:, j] = col_polys[j][n]
                    mat_polys.append(arr)
                return (soln, _wrap_polys(mat_polys, time_step, coll_divs,
                                          d=d, m=m_cols))
            return np.stack(results, axis=2)

        if g_values is not None:
            g_values_ = np.asarray(g_values, dtype=float)
            if g_values_.shape != (N_orig, d):
                raise ValueError(
                    f"g_values shape {g_values_.shape} incompatible with kernel_values shape {kernel_values_.shape}")
            g_values_ = g_values_[:N]
        else:
            g_values_ = np.zeros((N, d), dtype=float)

        if a_values is not None:
            a_values_ = np.asarray(a_values, dtype=float)
            if a_values_.shape != (N_orig, d, d):
                raise ValueError(
                    f"a_values shape {a_values_.shape} incompatible with kernel_values shape {kernel_values_.shape}")
            a_values_ = a_values_[:N]
        else:
            a_values_ = np.zeros((N, d, d), dtype=float)

        soln_init_values_ = soln_init_values_.ravel()
        if soln_init_values_.shape != (d,):
            raise ValueError(
                f"soln_init_value must be a scalar or length-{d} array for d={d}")

        assert coll_divs > 0, "coll_divs must be a positive integer"
        assert all(isinstance(c, int) for c in coll_choices), "coll_choices must be a list of integers"
        assert all(coll_choices.count(c) <= 1 for c in coll_choices), \
            "all integers in coll_choices must be distinct"
        for choice in coll_choices:
            assert 0 <= choice <= coll_divs, "coll_choices must contain only integers from 0 to coll_divs"
        coll_choices = sorted(coll_choices)

        if (coll_divs, coll_choices) not in _fast_settings_VIDE:
            # NotImplementedError subclasses RuntimeError, so callers
            # catching the historical RuntimeError still work; this matches
            # the scalar path's error type for non-compiled settings.
            raise NotImplementedError(
                f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) "
                f"not supported by D extension (no vector-path fallback).")

        k_c = np.ascontiguousarray(kernel_values_, dtype=np.float64)
        g_c = np.ascontiguousarray(g_values_, dtype=np.float64)
        a_c = np.ascontiguousarray(a_values_, dtype=np.float64)
        N_used = len(k_c)
        mesh_divs = (N_used - 1) // coll_divs**2
        soln_vals, poly_coefs = _dlang_module.solve_vide_vec_d(
            g_c, k_c, a_c, soln_init_values_, time_step, coll_divs, coll_choices, return_function)
        if return_function:
            return (soln_vals, _wrap_polys(
                _build_vec_polys(poly_coefs, mesh_divs, coll_divs, time_step),
                time_step, coll_divs, d=d))
        return soln_vals

    # ------------------------------------------------------------------ scalar path
    assert len(kernel_values_.shape) == 1, "kernel_values must be a 1-dim array"

    if g_values is not None:
        g_values_ = np.asarray(g_values, dtype=float)
        assert len(g_values_.shape) == 1, "g_values must be a 1-dim array"
        assert len(g_values_) == N_orig, "kernel_values and g_values must have the same length"
        g_values_ = g_values_[:N]
    else:
        g_values_ = np.zeros(N)

    if a_values is not None:
        a_values_ = np.asarray(a_values, dtype=float)
        assert len(a_values_.shape) == 1, "a_values must be a 1-dim array"
        assert len(a_values_) == N_orig, "kernel_values and a_values must have the same length"
        a_values_ = a_values_[:N]
    else:
        a_values_ = np.zeros(N)

    assert coll_divs > 0, "coll_divs must be a positive integer"
    assert all([isinstance(choice, int) for choice in coll_choices]), \
        "coll_choices must be a list of integers"
    assert all([coll_choices.count(c) <= 1 for c in coll_choices]), \
        "all integers in coll_choices must be distinct"
    for choice in coll_choices:
        assert 0 <= choice <= coll_divs, "coll_choices must contain only integers from 0 to coll_divs"
    coll_choices = sorted(coll_choices)
    if (coll_divs, coll_choices) in _fast_settings_VIDE:
        soln_vals, poly_coefs = _dlang_module.solve_vide_d(
            g_values_, kernel_values_, a_values_, soln_init_value,
            time_step, coll_divs, coll_choices, return_function)
    elif _numba_available:
        if show_warnings:
            print("warning: falling back to slower python/numba code")
        soln_vals, poly_coefs = _numba_solvers.solve_VIDE_jit(
            g_values_, kernel_values_, a_values_, soln_init_value,
            time_step, coll_divs, coll_choices, return_function)
    else:
        raise NotImplementedError(
            f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) is not "
            f"supported by the D extension. Install numba to enable the fallback solver, or "
            f"use a supported setting (see fast_coll_settings_VIDE)."
        )
    if return_function:
        polys = []
        for i, coefs in enumerate(poly_coefs):
            domain = (i * coll_divs**2 * time_step, (i+1) * coll_divs**2 * time_step)
            poly = np.polynomial.Polynomial(coefs, domain=domain, window=(0.0, 1.0), symbol='t')
            poly = poly.convert(domain=domain, window=domain)
            polys.append(poly)
        return (soln_vals, _wrap_polys(polys, time_step, coll_divs, d=0))
    else:
        return soln_vals




def _vie1_rho_m(coll_divs, coll_choices):
    r"""Brunner's $\rho_m = (-1)^m \prod_{i=1}^{m} (1 - c_i)/c_i$ for the
    discontinuous ($S_{m-1}^{(-1)}$) VIE-1 method (Brunner 2004, Theorem 2.4.2)."""
    rho = (-1.0) ** len(coll_choices)
    for k in coll_choices:
        ci = k / coll_divs
        rho *= (1.0 - ci) / ci
    return rho


def _validate_vie1_coll_setting(coll_divs, coll_choices):
    """Structural checks shared by the VIE-1 paths; returns the sorted choices."""
    if not (isinstance(coll_divs, (int, np.integer)) and coll_divs > 0):
        raise ValueError("coll_divs must be a positive integer")
    choices = list(coll_choices)
    if not choices or not all(isinstance(c, (int, np.integer)) for c in choices):
        raise ValueError("coll_choices must be a non-empty list of integers")
    if 0 in choices:
        raise ValueError("zero cannot be a collocation parameter")
    if len(set(choices)) != len(choices):
        raise ValueError("all integers in coll_choices must be distinct")
    if any(c < 1 or c > coll_divs for c in choices):
        raise ValueError("coll_choices must contain only integers from 1 to coll_divs")
    return sorted(int(c) for c in choices)


def _solve_vie1_product_path(kernel_values_, g_values, soln_init_value, time_step,
                             coll_divs, coll_choices, return_function, force_continuous,
                             show_warnings, mesh_samples, kernel_interp_degree):
    """VIE-1 with product-integration quadrature (see ``_product``)."""
    from . import _product

    q = int(coll_divs)
    coll_choices = _validate_vie1_coll_setting(q, coll_choices)
    m = len(coll_choices)
    Q = q if mesh_samples is None else int(mesh_samples)
    if Q < 1 or Q % q != 0:
        raise ValueError(
            f"with quadrature='product', mesh_samples must be a positive multiple of "
            f"coll_divs={q} so that every collocation point is a sample; got {mesh_samples}")
    p = m if kernel_interp_degree is None else int(kernel_interp_degree)
    if p < 1:
        raise ValueError("kernel_interp_degree must be a positive integer")
    if not time_step > 0.0:
        raise ValueError("time_step must be positive")
    if ((q, tuple(coll_choices)) in _VIE1_NONCONVERGENT
            or abs(_vie1_rho_m(q, coll_choices)) > 1.0 + 1e-12):
        raise ValueError(
            f"Collocation setting (coll_divs={q}, coll_choices={coll_choices}) does not "
            f"produce a convergent VIE-1 solver: |rho_m| = {abs(_vie1_rho_m(q, coll_choices)):.4g} "
            f"> 1 (Brunner 2004, Theorem 2.4.2). Use nodes with |rho_m| <= 1, e.g. any set "
            f"whose last node is the right endpoint (max(coll_choices) == coll_divs).")
    if force_continuous:
        _check_continuous_vie1_setting(q, coll_choices)

    N_orig = len(kernel_values_)
    N = (N_orig - 1) // Q * Q + 1
    if N != N_orig and show_warnings:
        print(
            f"warning: the length of kernel_values ({N_orig}) is not of the form: "
            f"(multiple of mesh_samples) + 1 where mesh_samples = {Q}. All input data "
            f"lists will be truncated to the next smaller number of this form ({N}) "
            f"which will also be the length of the returned list of solution values.")
    if N < Q + 1:
        raise ValueError(
            f"kernel_values has length {N_orig} (truncated to {N}), which leaves zero mesh "
            f"intervals for mesh_samples={Q}. Need at least {Q + 1} input points.")
    if N < p + 1:
        raise ValueError(
            f"kernel interpolation of degree {p} needs at least {p + 1} samples, got {N}")
    K = kernel_values_[:N]
    d = 0 if K.ndim == 1 else K.shape[1]
    if K.ndim == 3 and K.shape[1] != K.shape[2]:
        raise ValueError(f"kernel_values must have shape (N, d, d), got {K.shape}")
    M = (N - 1) // Q
    breakpoints = np.arange(M + 1) * (Q * time_step)

    # ---------------------------------------------------------------- right-hand side
    if g_values is None:
        g = np.zeros((N,) if d == 0 else (N, d))
    else:
        g = np.asarray(g_values, dtype=float)
        if d and g.ndim == 3:
            # matrix case: independent solves per column, threaded as in the
            # collocation path
            m_cols = g.shape[2]
            if g.shape[0] != N_orig or g.shape[1] != d:
                raise ValueError(
                    f"g_values shape {g.shape} incompatible with kernel_values shape {K.shape}")
            init_cols = None
            if soln_init_value is not None:
                init_cols = np.asarray(soln_init_value, dtype=float)
                if init_cols.shape != (d, m_cols):
                    raise ValueError(
                        f"soln_init_value must have shape ({d}, {m_cols}) for matrix-valued g_values")
                if (not force_continuous) and show_warnings:
                    print("warning: setting soln_init_value has no effect when force_continuous=False.")
            g_cols = g[:N]

            def _col(j):
                return solve_VIE_1(
                    kernel_values=K, g_values=g_cols[:, :, j],
                    soln_init_value=(init_cols[:, j] if init_cols is not None else None),
                    time_step=time_step, coll_divs=q, coll_choices=coll_choices,
                    return_function=return_function, force_continuous=force_continuous,
                    show_warnings=False, quadrature="product", mesh_samples=Q,
                    kernel_interp_degree=p)
            with ThreadPoolExecutor(max_workers=_column_workers(m_cols)) as ex:
                results = list(ex.map(_col, range(m_cols)))
            if return_function:
                soln = np.stack([r[0] for r in results], axis=2)
                col_polys = [r[1] for r in results]
                mat_polys = []
                for n in range(M):
                    arr = np.empty((d, m_cols), dtype=object)
                    for j in range(m_cols):
                        arr[:, j] = col_polys[j][n]
                    mat_polys.append(arr)
                return soln, _SolutionFunction(mat_polys, breakpoints, d=d, m=m_cols)
            return np.stack(results, axis=2)
        expected = (N_orig,) if d == 0 else (N_orig, d)
        if g.shape != expected:
            raise ValueError(
                f"g_values shape {g.shape} incompatible with kernel_values shape "
                f"{kernel_values_.shape}: expected {expected}")
        g = g[:N]

    # ---------------------------------------------------------------- initial value
    if soln_init_value is None:
        if force_continuous:
            raise ValueError("must specify soln_init_value for continuous solutions")
        init = 0.0 if d == 0 else np.zeros(d)
    else:
        if (not force_continuous) and show_warnings:
            print("warning: setting soln_init_value has no effect, since "
                  "force_continuous is set to false.")
        init = np.asarray(soln_init_value, dtype=float)
        if d == 0:
            if init.shape != ():
                raise ValueError("soln_init_value must be a scalar for a scalar equation")
            init = float(init)
        elif init.shape != (d,):
            raise ValueError(f"soln_init_value must have shape ({d},) for d={d}")

    values, polys = _product.solve_vie1_product(
        K, g, time_step, q, coll_choices, Q, p, force_continuous, init, return_function)
    if return_function:
        return values, _SolutionFunction(polys, breakpoints, d=d, m=0)
    return values


def solve_VIE_1(*, kernel_values, g_values=None, soln_init_value=None, time_step=1.0, coll_divs=3,
                coll_choices=[1,2,3], return_function=False, return_polys=None,
                force_continuous=False, show_warnings=True,
                quadrature="collocation", mesh_samples=None, kernel_interp_degree=None):
    r'''
    Solve a Volterra integral equation of the first kind.

    Finds $y(t)$ satisfying

    $$g(t) = \int_0^t K(t-s)\,y(s)\,ds$$

    Parameters
    ----------
    kernel_values : array_like of shape (N,) or (N, d, d)
        Values of $K(s)$ at times $s = 0, h, 2h, \ldots, (N-1)h$, where $h$
        is ``time_step``. Pass a 1-D array for scalar equations or a 3-D array
        of shape ``(N, d, d)`` for $d$-dimensional vector equations.
    g_values : array_like of shape (N,) or (N, d) or (N, d, m), optional
        Right-hand side $g(t)$ sampled at the same times as ``kernel_values``.
        For matrix-valued equations pass shape ``(N, d, m)`` to solve $m$
        right-hand sides simultaneously. Defaults to zero.
    soln_init_value : float or array_like of shape (d,) or (d, m), optional
        Initial value $y(0)$ imposed when ``force_continuous=True``. Has no
        effect when ``force_continuous=False`` (default). Required when
        ``force_continuous=True``.
    time_step : float, optional
        Spacing $h$ between consecutive sample times. Must be positive.
        Default is 1.0.
    coll_divs : int, optional
        Number of collocation sub-intervals per mesh interval. Must be a
        positive integer. Default is 3.
    coll_choices : list of int, optional
        Indices selecting the collocation nodes within each sub-interval.
        Each entry $k$ corresponds to the node $k / c$ where $c$ =
        ``coll_divs``, placed in $(0, 1]$; zero is excluded. Entries must be
        distinct integers in $\{1, \ldots, \text{coll\_divs}\}$.
        Default is ``[1, 2, 3]``.
    return_function : bool, optional
        If ``True``, also return a callable solution object as the second
        element of a tuple (see Returns). Default is ``False``.
    return_polys : bool, optional
        Deprecated alias for ``return_function``; passing it emits a
        ``DeprecationWarning``.
    force_continuous : bool, optional
        If ``True``, use the continuous collocation method (Brunner's
        $S_m^{(0)}$): on each mesh interval the solution is a polynomial of
        degree $m$ (one more than the default) that is continuous across mesh
        points, starting from ``soln_init_value`` at $t = 0$. Requires the last
        collocation node to be the right endpoint of the mesh interval
        (``max(coll_choices) == coll_divs``) and a node set with
        $|\rho_{m-1}| \le 1$ (see Notes). Converges with order $m + 1$ when
        $-1 \le \rho_{m-1} < 1$ and with order $m$ when $\rho_{m-1} = 1$,
        versus order $m$ for the default discontinuous method with the same
        nodes. Default is ``False``.
    show_warnings : bool, optional
        If ``True`` (default), print a warning when ``kernel_values`` is
        truncated, when ``soln_init_value`` has no effect, or when the Numba
        fallback is used.
    quadrature : {"collocation", "product"}, optional
        How the integrals of the collocation equations are evaluated from the
        sampled kernel. ``"collocation"`` (default) applies the interpolatory
        rule on the method's own nodes; this forces the mesh to be
        ``coll_divs**2`` samples wide and reads only every ``coll_divs``-th
        sample of the data in the history sums. ``"product"`` replaces the
        kernel by a piecewise polynomial interpolant of degree
        ``kernel_interp_degree`` on the data grid and integrates its products
        with the collocation polynomial exactly (product integration). The
        mesh can then be any multiple of ``coll_divs`` samples wide
        (``mesh_samples``), every sample is used, and any valid
        ``coll_divs``/``coll_choices`` setting is available without the Numba
        fallback. See Notes.
    mesh_samples : int, optional
        Number of data samples per mesh interval; the mesh width is
        ``mesh_samples * time_step``. With ``quadrature="collocation"`` the
        only admissible value is ``coll_divs**2`` (the default). With
        ``quadrature="product"`` any positive multiple of ``coll_divs`` is
        admissible and the default is ``coll_divs``, the finest mesh that keeps
        every collocation point on a sample; larger values trade resolution
        for a milder amplification of errors in the data (see Notes).
    kernel_interp_degree : int, optional
        Degree of the kernel interpolant used by ``quadrature="product"``: on
        each cell of the data grid the kernel is represented by the polynomial
        through the ``kernel_interp_degree + 1`` nearest samples. Defaults to
        the number of collocation nodes, ``len(coll_choices)``. Not accepted
        with ``quadrature="collocation"``.

    Returns
    -------
    soln_values : ndarray of shape (N,) or (N, d) or (N, d, m)
        Solution values $y(t)$ at the same times as the input arrays.
        Returned when ``return_function=False`` (default).
    (soln_values, solution) : tuple
        Returned when ``return_function=True``. ``soln_values`` is as above.
        ``solution`` is callable -- ``solution(t)`` evaluates the piecewise
        polynomial solution at scalar or array ``t`` -- and also behaves like
        the previous list of per-interval polynomials: ``len(solution)``,
        ``solution[n]``, and iteration operate on ``solution.polynomials``.
        For scalar equations each polynomial is a
        `numpy.polynomial.Polynomial`; for vector equations each interval entry
        is an object array of shape ``(d,)`` (or ``(d, m)`` for matrix
        equations), one polynomial per component.

    Raises
    ------
    ValueError
        For invalid shapes or collocation settings — including the known
        non-convergent VIE-1 settings ``(coll_divs=3, [1])``,
        ``(4, [1])``, and ``(4, [1, 2])``, which are rejected outright, and,
        with ``force_continuous=True``, node sets whose last node is not the
        right endpoint or whose $|\rho_{m-1}|$ exceeds 1 (see Notes) —
        inputs too short to form one mesh interval, matrix input with zero
        columns, inputs so large that a solver buffer would exceed
        $2^{31}$ elements, an unknown ``quadrature``, a ``mesh_samples`` that
        is not admissible for the chosen quadrature, or
        ``kernel_interp_degree`` given with ``quadrature="collocation"``.
    NotImplementedError
        For a collocation setting not compiled into the D extension, on the
        vector/matrix path (no fallback exists) or on the scalar path when
        ``numba`` is not installed.
    numpy.linalg.LinAlgError
        If a collocation system is singular or nearly singular (e.g. a zero
        kernel).

    Notes
    -----
    The length $N$ of the input arrays must satisfy
    $N \equiv 1 \pmod{\text{coll\_divs}^2}$. If a longer array is supplied it
    is truncated to the largest conforming length and a warning is printed
    (unless ``show_warnings=False``).

    Zero is excluded from ``coll_choices`` because the VIE-1 collocation
    scheme does not place nodes at $t = 0$; doing so would require evaluating
    the equation at $t = 0$ where both sides are zero by definition, giving no
    information about $y(0)$.

    First-kind collocation converges only for some node sets. With
    $c_i = k_i / \text{coll\_divs}$, the default discontinuous method
    ($S_{m-1}^{(-1)}$) converges iff
    $-1 \le \rho_m := (-1)^m \prod_{i=1}^{m} (1 - c_i)/c_i \le 1$, with order
    $m$ for $\rho_m < 1$ (Brunner [1], Theorem 2.4.2); any set with
    $c_m = 1$ has $\rho_m = 0$. The continuous method (``force_continuous``)
    requires $c_m = 1$ and converges iff
    $-1 \le \rho_{m-1} := (-1)^m \prod_{i=1}^{m-1} (1 - c_i)/c_i \le 1$, with
    order $m + 1$ for $\rho_{m-1} < 1$ and order $m$ for $\rho_{m-1} = 1$
    ([1], Theorem 2.4.5). The equispaced sets ``list(range(1, coll_divs+1))``
    have $\rho_{m-1} = -1$ for odd $m$ and $+1$ for even $m$. All integrals
    are evaluated with the interpolatory quadrature rule on the method's own
    nodes, i.e. on $\{c_1, \ldots, c_m\}$ for the discontinuous method and on
    $\{0, c_1, \ldots, c_m\}$ for the continuous one ([1], Section 2.4.5);
    for ``coll_divs=1``, ``coll_choices=[1]`` the continuous method is the
    product trapezoidal rule.

    With ``quadrature="product"`` the scheme is exact collocation for the
    interpolated kernel $K_h$, so its error is the collocation error plus a
    kernel-perturbation term. For a first-kind equation that term enters
    through the derivative of the interpolation error and is of order
    $\delta^{p}$ for degree $p$ (Linz 1971 [2]; de Hoog and Weiss 1973 [3]);
    the default $p = m$ keeps it below the collocation error. The mesh is
    ``mesh_samples`` samples wide, the input length must satisfy
    $N \equiv 1 \pmod{\text{mesh\_samples}}$ (longer inputs are truncated
    with a warning), and the blocks depend on the mesh intervals only through
    their lag, so the FFT-accelerated history of the D extension is used. The
    convergence conditions on the node sets are unchanged (they are
    properties of the collocation method, not of the quadrature); the
    discontinuous method is admitted for any ``coll_divs`` provided
    $-1 \le \rho_m \le 1$. Inverting a first-kind equation amplifies errors
    in the data by roughly the inverse of the mesh width, so on noisy data a
    finer mesh is not automatically better; ``mesh_samples`` is the knob.

    The solver dispatches at runtime to a D-extension routine specialised for
    the given collocation setting. For scalar equations, settings not compiled
    into the extension fall back to a Numba-JIT implementation (requires the
    ``numba`` optional dependency); a warning is printed when the fallback is
    used. For vector equations only the compiled settings are supported. The
    supported settings (with the non-convergent ones excluded) are listed in
    ``fast_coll_settings_VIE_1``.

    References
    ----------
    .. [1] Brunner, H. *Collocation Methods for Volterra Integral and Related
       Functional Differential Equations.* Cambridge University Press, 2004.
       Sections 2.4.1--2.4.3 and 2.4.5.
    .. [2] Linz, P. Product integration methods for Volterra integral
       equations of the first kind. *BIT* 11 (1971) 413--421.
    .. [3] de Hoog, F. and Weiss, R. High order methods for Volterra integral
       equations of the first kind. *SIAM J. Numer. Anal.* 10 (1973) 647--664.
    '''
    return_function = _resolve_return_flag(return_function, return_polys)
    # ------------------------------------------------------------------ complex dispatch
    if _cplx.is_complex(kernel_values, g_values, soln_init_value):
        K_arr = np.asarray(kernel_values)
        is_scalar = (K_arr.ndim == 1)
        d_orig = 0 if is_scalar else K_arr.shape[1]
        K_real = _cplx._block_kernel(K_arr)
        g_real = _cplx._expand_g(np.asarray(g_values)) if g_values is not None else None
        init_real = _cplx._expand_init(soln_init_value) if soln_init_value is not None else None
        result = solve_VIE_1(
            kernel_values=K_real, g_values=g_real, soln_init_value=init_real,
            time_step=time_step, coll_divs=coll_divs, coll_choices=coll_choices,
            return_function=return_function, force_continuous=force_continuous,
            show_warnings=show_warnings, quadrature=quadrature,
            mesh_samples=mesh_samples, kernel_interp_degree=kernel_interp_degree)
        if return_function:
            soln_real, sf_real = result
            return (_cplx._recombine(soln_real, d_orig),
                    _ComplexSolutionFunction(sf_real, d_orig))
        return _cplx._recombine(result, d_orig)

    kernel_values_ = np.asarray(kernel_values, dtype=float)
    ndim = kernel_values_.ndim

    if ndim not in (1, 3):
        raise ValueError(
            f"kernel_values must be 1-D (scalar) or 3-D (N, d, d), got shape {kernel_values_.shape}")

    if quadrature not in ("collocation", "product"):
        raise ValueError(
            f"quadrature must be 'collocation' or 'product', got {quadrature!r}")
    if quadrature == "product":
        return _solve_vie1_product_path(
            kernel_values_, g_values, soln_init_value, time_step, coll_divs,
            coll_choices, return_function, force_continuous, show_warnings,
            mesh_samples, kernel_interp_degree)
    if kernel_interp_degree is not None:
        raise ValueError(
            "kernel_interp_degree applies only to quadrature='product'")
    if mesh_samples is not None and int(mesh_samples) != coll_divs ** 2:
        raise ValueError(
            f"with quadrature='collocation' the mesh is coll_divs**2 = {coll_divs ** 2} "
            f"samples wide (got mesh_samples={mesh_samples}); pass quadrature='product' "
            f"to choose the mesh width")

    N_orig = len(kernel_values_)
    N, kernel_values_ = _truncate_N(kernel_values_, coll_divs, show_warnings)

    # ------------------------------------------------------------------ vector path
    if ndim == 3:
        _, d1, d2 = kernel_values_.shape
        if d1 != d2:
            raise ValueError(f"kernel_values must have shape (N, d, d), got {kernel_values_.shape}")
        d = d1

        if g_values is not None:
            g_values_ = np.asarray(g_values, dtype=float)
            if g_values_.ndim == 3:  # matrix case: shape (N, d, m_cols)
                m_cols = g_values_.shape[2]
                if g_values_.shape[1] != d:
                    raise ValueError(
                        f"g_values shape {g_values_.shape} incompatible with kernel_values shape {kernel_values_.shape}")
                if soln_init_value is not None:
                    init_cols = np.asarray(soln_init_value, dtype=float)
                    if init_cols.shape != (d, m_cols):
                        raise ValueError(
                            f"soln_init_value must have shape ({d}, {m_cols}) for matrix-valued g_values")
                    if (not force_continuous) and show_warnings:
                        print("warning: setting soln_init_value has no effect when force_continuous=False.")
                else:
                    init_cols = None
                g_cols = g_values_[:N]
                def _col_vie1(j):
                    return solve_VIE_1(kernel_values=kernel_values_,
                                       g_values=g_cols[:, :, j],
                                       soln_init_value=init_cols[:, j] if init_cols is not None else None,
                                       time_step=time_step, coll_divs=coll_divs,
                                       coll_choices=coll_choices,
                                       return_function=return_function,
                                       force_continuous=force_continuous,
                                       show_warnings=False)
                with ThreadPoolExecutor(max_workers=_column_workers(m_cols)) as ex:
                    results = list(ex.map(_col_vie1, range(m_cols)))
                if return_function:
                    col_solns = [r[0] for r in results]
                    col_polys = [r[1] for r in results]
                    soln = np.stack(col_solns, axis=2)
                    mesh_divs = len(col_polys[0])
                    mat_polys = []
                    for n in range(mesh_divs):
                        arr = np.empty((d, m_cols), dtype=object)
                        for j in range(m_cols):
                            arr[:, j] = col_polys[j][n]
                        mat_polys.append(arr)
                    return (soln, _wrap_polys(mat_polys, time_step, coll_divs,
                                              d=d, m=m_cols))
                return np.stack(results, axis=2)
            else:
                if g_values_.shape != (N_orig, d):
                    raise ValueError(
                        f"g_values shape {g_values_.shape} incompatible with kernel_values shape {kernel_values_.shape}")
                g_values_ = g_values_[:N]
        else:
            g_values_ = np.zeros((N, d), dtype=float)

        assert time_step > 0.0, "time_step must be positive"

        if soln_init_value is not None:
            if (not force_continuous) and show_warnings:
                print("warning: setting soln_init_value has no effect when force_continuous=False.")
            soln_init_value_ = np.asarray(soln_init_value, dtype=float)
            if soln_init_value_.shape != (d,):
                raise ValueError(
                    f"soln_init_value must have shape ({d},) for d={d}")
        else:
            assert not force_continuous, "must specify soln_init_value for continuous solutions"
            soln_init_value_ = np.zeros(d)

        assert 0 not in coll_choices, "zero cannot be a collocation parameter"
        assert coll_divs > 0, "coll_divs must be a positive integer"
        assert all(isinstance(c, int) for c in coll_choices), "coll_choices must be a list of integers"
        assert all(coll_choices.count(c) <= 1 for c in coll_choices), "coll_choices must be distinct"
        for choice in coll_choices:
            assert 1 <= choice <= coll_divs, "coll_choices must contain only integers from 1 to coll_divs"
        coll_choices = sorted(coll_choices)

        if (coll_divs, tuple(coll_choices)) in _VIE1_NONCONVERGENT:
            raise ValueError(
                f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) "
                f"does not produce a convergent VIE-1 solver and is not supported. "
                f"Use a setting from fast_coll_settings_VIE_1.")
        if force_continuous:
            _check_continuous_vie1_setting(coll_divs, coll_choices)
        if (coll_divs, coll_choices) not in _fast_settings_VIE_1:
            # NotImplementedError subclasses RuntimeError, so callers
            # catching the historical RuntimeError still work; this matches
            # the scalar path's error type for non-compiled settings.
            raise NotImplementedError(
                f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) "
                f"not supported by D extension (no vector-path fallback).")

        # kernel must be C-contiguous (N, d, d) and g (N, d)
        k_c = np.ascontiguousarray(kernel_values_, dtype=np.float64)
        g_c = np.ascontiguousarray(g_values_, dtype=np.float64)
        N_used = len(k_c)
        mesh_divs = (N_used - 1) // coll_divs**2
        soln_vals, poly_coefs = _dlang_module.solve_vie1_vec_d(
            g_c, k_c, soln_init_value_, time_step,
            coll_divs, coll_choices, return_function, force_continuous)
        if return_function:
            return (soln_vals, _wrap_polys(
                _build_vec_polys(poly_coefs, mesh_divs, coll_divs, time_step),
                time_step, coll_divs, d=d))
        return soln_vals

    # ------------------------------------------------------------------ scalar path
    assert len(kernel_values_.shape) == 1, "kernel_values must be a 1-dim array"

    if g_values is not None:
        g_values_ = np.asarray(g_values, dtype=float)
        assert len(g_values_.shape) == 1, "g_values must be a 1-dim array"
        assert len(g_values_) == N_orig, "kernel_values and g_values must have the same length"
        g_values_ = g_values_[:N]
    else:
        g_values_ = np.zeros(N)

    assert time_step > 0.0, "time_step must be positive"

    if soln_init_value is None:
        assert not force_continuous, \
            "must specify an initial value for continuous solutions"
        # We still need a value to pass into the JIT version. It shouldn't be used!
        soln_init_value_ = 0.0
    else:
        if (not force_continuous) and show_warnings:
            print("warning: setting soln_init_value has no effect, since "
                  "force_continuous is set to false.")
            soln_init_value_ = 0.0
        else:
            soln_init_value_ = float(soln_init_value)

    assert 0 not in coll_choices, "zero cannot be a collocation parameter"
    assert coll_divs > 0, "coll_divs must be a positive integer"
    assert all([isinstance(choice, int) for choice in coll_choices]), \
        "coll_choices must be a list of integers"
    assert all([coll_choices.count(c) <= 1 for c in coll_choices]), \
        "all integers in coll_choices must be distinct"
    for choice in coll_choices:
        assert 1 <= choice <= coll_divs, \
            "coll_choices must contain only integers from 1 to coll_divs"
    coll_choices = sorted(coll_choices)
    if (coll_divs, tuple(coll_choices)) in _VIE1_NONCONVERGENT:
        raise ValueError(
            f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) "
            f"does not produce a convergent VIE-1 solver and is not supported. "
            f"Use a setting from fast_coll_settings_VIE_1.")
    if force_continuous:
        _check_continuous_vie1_setting(coll_divs, coll_choices)
    if (coll_divs, coll_choices) in _fast_settings_VIE_1:
        soln_vals, poly_coefs = _dlang_module.solve_vie1_d(
            g_values_, kernel_values_, soln_init_value_, time_step,
            coll_divs, coll_choices, return_function, force_continuous)
    elif _numba_available:
        if show_warnings:
            print("warning: falling back to slower python/numba code")
        soln_vals, poly_coefs = _numba_solvers.solve_VIE_1_jit(
            g_values_, kernel_values_, soln_init_value_, time_step,
            coll_divs, coll_choices, return_function, force_continuous)
    else:
        raise NotImplementedError(
            f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) is not "
            f"supported by the D extension. Install numba to enable the fallback solver, or "
            f"use a supported setting (see fast_coll_settings_VIE_1)."
        )

    if return_function:
        polys = []
        for i, coefs in enumerate(poly_coefs):
            domain = (i * coll_divs**2 * time_step, (i+1) * coll_divs**2 * time_step)
            poly = np.polynomial.Polynomial(coefs, domain=domain, window=(0.0, 1.0), symbol='t')
            poly = poly.convert(domain=domain, window=domain)
            polys.append(poly.trim())
        return (soln_vals, _wrap_polys(polys, time_step, coll_divs, d=0))
    else:
        return soln_vals

def solve_VIE_2(*, kernel_values, g_values=None, time_step=1.0, coll_divs=2,
                coll_choices=[0,1,2], return_function=False, return_polys=None,
                show_warnings=True):
    r'''
    Solve a Volterra integral equation of the second kind.

    Finds $y(t)$ satisfying

    $$y(t) = g(t) + \int_0^t K(t-s)\,y(s)\,ds$$

    Parameters
    ----------
    kernel_values : array_like of shape (N,) or (N, d, d)
        Values of $K(s)$ at times $s = 0, h, 2h, \ldots, (N-1)h$, where $h$
        is ``time_step``. Pass a 1-D array for scalar equations or a 3-D array
        of shape ``(N, d, d)`` for $d$-dimensional vector equations.
    g_values : array_like of shape (N,) or (N, d) or (N, d, m), optional
        Right-hand side $g(t)$ sampled at the same times as ``kernel_values``.
        For matrix-valued equations pass shape ``(N, d, m)`` to solve $m$
        right-hand sides simultaneously. Defaults to zero.
    time_step : float, optional
        Spacing $h$ between consecutive sample times. Must be positive.
        Default is 1.0.
    coll_divs : int, optional
        Number of collocation sub-intervals per mesh interval. Must be a
        positive integer. Default is 2.
    coll_choices : list of int, optional
        Indices selecting the collocation nodes within each sub-interval.
        Each entry $k$ corresponds to the node $k / c$ where $c$ =
        ``coll_divs``, placed in $[0, 1]$. Entries must be distinct integers
        in $\{0, 1, \ldots, \text{coll\_divs}\}$. Default is ``[0, 1, 2]``.
    return_function : bool, optional
        If ``True``, also return a callable solution object as the second
        element of a tuple (see Returns). Default is ``False``.
    return_polys : bool, optional
        Deprecated alias for ``return_function``; passing it emits a
        ``DeprecationWarning``.
    show_warnings : bool, optional
        If ``True`` (default), print a warning when ``kernel_values`` is
        truncated or when the Numba fallback is used.

    Returns
    -------
    soln_values : ndarray of shape (N,) or (N, d) or (N, d, m)
        Solution values $y(t)$ at the same times as the input arrays.
        Returned when ``return_function=False`` (default).
    (soln_values, solution) : tuple
        Returned when ``return_function=True``. ``soln_values`` is as above.
        ``solution`` is callable -- ``solution(t)`` evaluates the piecewise
        polynomial solution at scalar or array ``t`` -- and also behaves like
        the previous list of per-interval polynomials: ``len(solution)``,
        ``solution[n]``, and iteration operate on ``solution.polynomials``.
        For scalar equations each polynomial is a
        `numpy.polynomial.Polynomial`; for vector equations each interval entry
        is an object array of shape ``(d,)`` (or ``(d, m)`` for matrix
        equations), one polynomial per component.

    Raises
    ------
    ValueError
        For invalid shapes or collocation settings, inputs too short to form
        one mesh interval, matrix input with zero columns, or inputs so large
        that a solver buffer would exceed $2^{31}$ elements.
    NotImplementedError
        For a collocation setting not compiled into the D extension, on the
        vector/matrix path (no fallback exists) or on the scalar path when
        ``numba`` is not installed.
    numpy.linalg.LinAlgError
        If a collocation system is singular or nearly singular.

    Notes
    -----
    The length $N$ of the input arrays must satisfy
    $N \equiv 1 \pmod{\text{coll\_divs}^2}$. If a longer array is supplied it
    is truncated to the largest conforming length and a warning is printed
    (unless ``show_warnings=False``).

    The solver dispatches at runtime to a D-extension routine specialised for
    the given collocation setting. For scalar equations, settings not compiled
    into the extension fall back to a Numba-JIT implementation (requires the
    ``numba`` optional dependency); a warning is printed when the fallback is
    used. For vector equations only the compiled settings are supported. The
    compiled settings are listed in ``fast_coll_settings_VIE_2``.

    References
    ----------
    .. [1] Brunner, H. *Collocation Methods for Volterra Integral and Related
       Functional Differential Equations.* Cambridge University Press, 2004.
       Section 2.2.
    '''
    return_function = _resolve_return_flag(return_function, return_polys)
    # ------------------------------------------------------------------ complex dispatch
    if _cplx.is_complex(kernel_values, g_values):
        K_arr = np.asarray(kernel_values)
        is_scalar = (K_arr.ndim == 1)
        d_orig = 0 if is_scalar else K_arr.shape[1]
        K_real = _cplx._block_kernel(K_arr)
        g_real = _cplx._expand_g(np.asarray(g_values)) if g_values is not None else None
        result = solve_VIE_2(
            kernel_values=K_real, g_values=g_real,
            time_step=time_step, coll_divs=coll_divs, coll_choices=coll_choices,
            return_function=return_function, show_warnings=show_warnings)
        if return_function:
            soln_real, sf_real = result
            return (_cplx._recombine(soln_real, d_orig),
                    _ComplexSolutionFunction(sf_real, d_orig))
        return _cplx._recombine(result, d_orig)

    kernel_values_ = np.asarray(kernel_values, dtype=float)
    ndim = kernel_values_.ndim

    if ndim not in (1, 3):
        raise ValueError(
            f"kernel_values must be 1-D (scalar) or 3-D (N, d, d), got shape {kernel_values_.shape}")

    N_orig = len(kernel_values_)
    N, kernel_values_ = _truncate_N(kernel_values_, coll_divs, show_warnings)

    # ------------------------------------------------------------------ vector path
    if ndim == 3:
        _, d1, d2 = kernel_values_.shape
        if d1 != d2:
            raise ValueError(f"kernel_values must have shape (N, d, d), got {kernel_values_.shape}")
        d = d1

        if g_values is not None:
            g_values_ = np.asarray(g_values, dtype=float)
            if g_values_.ndim == 3:  # matrix case: shape (N, d, m_cols)
                m_cols = g_values_.shape[2]
                if g_values_.shape[1] != d:
                    raise ValueError(
                        f"g_values shape {g_values_.shape} incompatible with kernel_values shape {kernel_values_.shape}")
                g_cols = g_values_[:N]
                def _col_vie2(j):
                    # column 0 carries any per-solve warnings; the others
                    # would only duplicate them from interleaved threads
                    return solve_VIE_2(kernel_values=kernel_values_,
                                       g_values=g_cols[:, :, j],
                                       time_step=time_step, coll_divs=coll_divs,
                                       coll_choices=coll_choices,
                                       return_function=return_function,
                                       show_warnings=show_warnings and j == 0)
                with ThreadPoolExecutor(max_workers=_column_workers(m_cols)) as ex:
                    results = list(ex.map(_col_vie2, range(m_cols)))
                if return_function:
                    col_solns = [r[0] for r in results]
                    col_polys = [r[1] for r in results]
                    soln = np.stack(col_solns, axis=2)
                    mesh_divs = len(col_polys[0])
                    mat_polys = []
                    for n in range(mesh_divs):
                        arr = np.empty((d, m_cols), dtype=object)
                        for j in range(m_cols):
                            arr[:, j] = col_polys[j][n]
                        mat_polys.append(arr)
                    return (soln, _wrap_polys(mat_polys, time_step, coll_divs,
                                              d=d, m=m_cols))
                return np.stack(results, axis=2)
            else:
                if g_values_.shape != (N_orig, d):
                    raise ValueError(
                        f"g_values shape {g_values_.shape} incompatible with kernel_values shape {kernel_values_.shape}")
                g_values_ = g_values_[:N]
        else:
            g_values_ = np.zeros((N, d), dtype=float)

        assert coll_divs > 0, "coll_divs must be a positive integer"
        assert all(isinstance(c, int) for c in coll_choices), "coll_choices must be a list of integers"
        assert all(coll_choices.count(c) <= 1 for c in coll_choices), \
            "all integers in coll_choices must be distinct"
        for choice in coll_choices:
            assert 0 <= choice <= coll_divs, "coll_choices must contain only integers from 0 to coll_divs"
        coll_choices = sorted(coll_choices)

        if (coll_divs, coll_choices) not in _fast_settings_VIE_2:
            # NotImplementedError subclasses RuntimeError, so callers
            # catching the historical RuntimeError still work; this matches
            # the scalar path's error type for non-compiled settings.
            raise NotImplementedError(
                f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) "
                f"not supported by D extension (no vector-path fallback).")

        k_c = np.ascontiguousarray(kernel_values_, dtype=np.float64)
        g_c = np.ascontiguousarray(g_values_, dtype=np.float64)
        N_used = len(k_c)
        mesh_divs = (N_used - 1) // coll_divs**2
        soln_vals, poly_coefs = _dlang_module.solve_vie2_vec_d(
            g_c, k_c, time_step, coll_divs, coll_choices, return_function)
        if return_function:
            return (soln_vals, _wrap_polys(
                _build_vec_polys(poly_coefs, mesh_divs, coll_divs, time_step),
                time_step, coll_divs, d=d))
        return soln_vals

    # ------------------------------------------------------------------ scalar path
    assert len(kernel_values_.shape) == 1, "kernel_values must be a 1-dim array"

    if g_values is not None:
        g_values_ = np.asarray(g_values, dtype=float)
        assert len(g_values_.shape) == 1, "g_values must be a 1-dim array"
        assert len(g_values_) == N_orig, "kernel_values and g_values must have the same length"
        g_values_ = g_values_[:N]
    else:
        g_values_ = np.zeros(N)

    assert coll_divs > 0, "coll_divs must be a positive integer"
    assert all([isinstance(choice, int) for choice in coll_choices]), \
        "coll_choices must be a list of integers"
    assert all([coll_choices.count(c) <= 1 for c in coll_choices]), \
        "all integers in coll_choices must be distinct"
    for choice in coll_choices:
        assert 0 <= choice <= coll_divs, "coll_choices must contain only integers from 0 to coll_divs"
    coll_choices = sorted(coll_choices)
    if (coll_divs, coll_choices) in _fast_settings_VIE_2:
        soln_vals, poly_coefs = _dlang_module.solve_vie2_d(
            g_values_, kernel_values_, time_step, coll_divs, coll_choices, return_function)
    elif _numba_available:
        if show_warnings:
            print("warning: falling back to slower python/numba code")
        soln_vals, poly_coefs = _numba_solvers.solve_VIE_2_jit(
            g_values_, kernel_values_, time_step, coll_divs, coll_choices, return_function)
    else:
        raise NotImplementedError(
            f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) is not "
            f"supported by the D extension. Install numba to enable the fallback solver, or "
            f"use a supported setting (see fast_coll_settings_VIE_2)."
        )

    if return_function:
        polys = []
        for i, coefs in enumerate(poly_coefs):
            domain = (i * coll_divs**2 * time_step, (i+1) * coll_divs**2 * time_step)
            poly = np.polynomial.Polynomial(coefs, domain=domain, window=(0.0, 1.0), symbol='t')
            poly = poly.convert(domain=domain, window=domain)
            polys.append(poly.trim())
        return (soln_vals, _wrap_polys(polys, time_step, coll_divs, d=0))
    else:
        return soln_vals
