"""The 0.10 solvers, deprecated in 0.11 and removed in 1.0.

Each wrapper keeps its 0.10 signature, documentation and results exactly: it
emits one `DeprecationWarning` naming the equivalent 1.0 call (built by
`voles._migrate.describe` from the actual arguments) and calls the engine
function directly, so even its error messages are those of 0.10.
"""
from __future__ import annotations    # as 0.10 had, so signatures read the same

import functools
import inspect

from . import _functional, _sampled
from ._migrate import describe
from ._warnings import _warn

__all__ = ["solve_VIE_1", "solve_VIE_2", "solve_VIDE",
           "function_solve_VIE_1", "function_solve_VIE_2", "function_solve_VIDE"]


@functools.lru_cache(maxsize=None)
def _defaults(fn):
    return tuple((name, p.default) for name, p in inspect.signature(fn).parameters.items())


def _non_default(fn, kwargs):
    """The arguments that differ from ``fn``'s defaults (so the suggested 1.0
    call shows only what the caller actually set)."""
    out = {}
    for name, default in _defaults(fn):
        value = kwargs[name]
        if default is inspect.Parameter.empty:
            out[name] = value
        elif value is default:
            continue
        elif isinstance(default, (bool, int, float, str)) and type(value) is type(default) \
                and value == default:
            continue
        else:
            out[name] = value
    return out


def _deprecated_call(fn, kwargs):
    name = fn.__name__
    try:
        instead = describe(name, _non_default(fn, kwargs))
    except Exception:
        instead = f"voles.{_NEW[name]}()"
    _warn(f"{name}() is deprecated since voles 0.11 and will be removed in 1.0; use "
          f"{instead} instead. See the migration table in the changelog.", DeprecationWarning)


def solve_VIE_1(*, kernel_values, g_values=None, soln_init_value=None, time_step=1.0,
                coll_divs=None, coll_choices=None, return_function=False, return_polys=None,
                force_continuous=False, show_warnings=True,
                quadrature="product", mesh_samples=None, kernel_interp_degree=None):
    r'''
    Solve a Volterra integral equation of the first kind.

    **Deprecated since 0.11; removed in 1.0.** Use `voles.solve_vie1` instead; each call warns
    with the equivalent 1.0 call.

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
        It must be the value the equation implies: differentiating at
        $t = 0$ gives $g'(0) = K(0)\,y(0)$. Any other value gives a wrong
        solution on the whole interval, not only near $t = 0$, and is not
        detected. If $y(0)$ is not known independently, use the default
        method, or estimate it by solving with ``force_continuous=False,
        return_function=True`` and evaluating the solution at $t = 0$ (the
        continuous solve is then more accurate than the default method but
        falls short of its full order).
    time_step : float, optional
        Spacing $h$ between consecutive sample times. Must be positive.
        Default is 1.0.
    coll_divs : int, optional
        Number of collocation sub-intervals per mesh interval. Must be a
        positive integer. Given alone, the nodes are all its sub-interval
        points, ``coll_choices = [1, ..., coll_divs]`` (the right endpoint
        included, so $\rho_m = 0$ and the method has its full order); given
        neither, the setting is ``coll_divs=3, coll_choices=[1, 2, 3]``.
    coll_choices : list of int, optional
        Indices selecting the collocation nodes within each sub-interval.
        Each entry $k$ corresponds to the node $k / c$ where $c$ =
        ``coll_divs``, placed in $(0, 1]$; zero is excluded. Entries must be
        distinct integers in $\{1, \ldots, \text{coll\_divs}\}$. Given
        alone, ``coll_divs`` is the largest entry.
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
        If ``True`` (default), emit warnings through the `warnings` module:
        a `voles.AccuracyWarning` when the node set has $\rho = 1$ exactly
        and so converges one order lower (see Notes), when $g(0) \ne 0$, or
        when $K(0)$ is too small for ``quadrature="collocation"``; a
        `voles.PerformanceWarning` when the Numba fallback is used or when
        ``quadrature="product"`` has to step in NumPy because the loaded D
        extension predates its block drivers; and a `voles.VolesWarning`
        when ``soln_init_value`` has no effect. ``False`` emits nothing; the
        standard `warnings` filters work as well.
    quadrature : {"product", "collocation"}, optional
        How the integrals of the collocation equations are evaluated from the
        sampled kernel. ``"product"`` (default) replaces the kernel by a
        piecewise polynomial interpolant of degree ``kernel_interp_degree`` on
        the data grid and integrates its products with the collocation
        polynomial exactly (product integration): the mesh can be any
        multiple of ``coll_divs`` samples wide (``mesh_samples``), every
        sample is used, and any valid ``coll_divs``/``coll_choices`` setting
        is available without the Numba fallback. ``"collocation"`` applies
        the interpolatory rule on the method's own nodes; this forces the
        mesh to be ``coll_divs**2`` samples wide, reads only every
        ``coll_divs``-th sample of the data in the history sums, and is
        unstable when $K(0)$ is small next to the kernel's change over one
        mesh interval, but runs in compiled code specialised per setting and
        is a few times faster. See Notes.
    mesh_samples : int, optional
        Number of data samples per mesh interval; the mesh width is
        ``mesh_samples * time_step``. With ``quadrature="product"`` any
        positive multiple of ``coll_divs`` is admissible; the default is
        ``coll_divs**2``, the same mesh as the collocation quadrature,
        because inverting a first-kind equation amplifies errors in the data
        by roughly the inverse of the mesh width, so the finest mesh
        (``mesh_samples=coll_divs``) buys resolution at the price of a
        ``coll_divs``-fold larger amplification (see Notes). With
        ``quadrature="collocation"`` the only admissible value is
        ``coll_divs**2``.
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
        polynomial solution at scalar or array ``t`` (NaN for ``t`` outside
        the solved interval) -- and also behaves like
        the previous list of per-interval polynomials: ``len(solution)``,
        ``solution[n]``, and iteration operate on ``solution.polynomials``.
        For scalar equations each polynomial is a
        `numpy.polynomial.Polynomial`; for vector equations each interval entry
        is an object array of shape ``(d,)`` (or ``(d, m)`` for matrix
        equations), one polynomial per component.

    Raises
    ------
    ValueError
        For invalid input:

        - shapes that do not fit together (``g_values`` must have the length
          of ``kernel_values``), inputs too short to form one mesh interval,
          matrix input with zero columns, or inputs
          so large that a solver buffer would exceed $2^{31}$ elements;
        - a ``coll_divs`` below 1, or ``coll_choices`` that is empty or not
          made of distinct integers in ``1 .. coll_divs``;
        - node sets with $|\rho_m| > 1$, for which the method diverges (see
          Notes; e.g. ``(coll_divs=3, [1])``, ``(4, [1, 2])``, ``(5, [1])``);
        - with ``force_continuous=True``: a missing ``soln_init_value``, or a
          node set whose last node is not the right endpoint or whose
          $|\rho_{m-1}|$ exceeds 1 (see Notes);
        - an unknown ``quadrature`` (matched case-insensitively), a
          ``mesh_samples`` or ``kernel_interp_degree`` that is not admissible
          for the chosen quadrature, or ``kernel_interp_degree`` given with
          ``quadrature="collocation"``;
        - a ``time_step`` that is not positive and finite, or input data
          containing NaN or infinity.
    TypeError
        For an argument of the wrong type: a float (even an integer-valued
        one) or bool for ``coll_divs``, a ``coll_choices`` entry,
        ``mesh_samples`` or ``kernel_interp_degree``; a non-number
        ``time_step``; a non-string ``quadrature``; a flag (``show_warnings``,
        ``return_function``, ``force_continuous``) that is not a bool.
    NotImplementedError
        For a collocation setting not compiled into the D extension, on the
        vector/matrix path (no fallback exists) or on the scalar path when
        ``numba`` is not installed.
    numpy.linalg.LinAlgError
        If a collocation system is singular or nearly singular (e.g. a zero
        kernel).
    RuntimeError
        If the D extension reports an internal error. This is a bug in voles;
        please report it.

    Notes
    -----
    The mesh is ``coll_divs**2`` samples wide. Any input length $N$ of at
    least ``coll_divs**2 + 1`` is accepted and the solution is returned at
    every sample: the data are covered by regular mesh intervals, and when
    they do not end on a mesh point the last regular interval and the
    leftover samples form one final interval of between one and two
    regular widths, whose collocation nodes are snapped to the nearest
    samples. That interval is integrated with the product-integration rule
    (as for ``quadrature="product"``) and adds one local error of the
    method's order, so the convergence order is unchanged; superconvergence
    at the mesh points, where a node set has it, is kept at the final point
    but not at the samples inside the final interval.

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

    The equation forces $g(0) = 0$; for $g(0) \ne 0$ there is no bounded
    solution, and a `voles.AccuracyWarning` is emitted.

    The theory above assumes $K(0) \ne 0$ ($K(0)$ nonsingular for vector
    equations). With the default quadrature the scheme is also unstable when
    $K(0)$ is small next to the kernel's change over one mesh interval $H$
    (divergence was observed once $H |K'(0)| / |K(0)| \gtrsim 5$), and when
    $K(0) = 0$ it diverges without bound as the mesh is refined. A
    `voles.AccuracyWarning` is emitted when $|K(H) - K(0)| > 2 |K(0)|$ (vector: $\|K(0)^{-1}(K(H) -
    K(0))\|_2 > 2$ or $K(0)$ singular). ``quadrature="product"`` does not
    have this restriction.

    With ``quadrature="product"`` the scheme is exact collocation for the
    interpolated kernel $K_h$, so its error is the collocation error plus a
    kernel-perturbation term. For a first-kind equation that term enters
    through the derivative of the interpolation error and is of order
    $\delta^{p}$ for degree $p$ (Linz 1971 [2]; de Hoog and Weiss 1973 [3]);
    the default $p = m$ keeps it below the collocation error. The mesh is
    ``mesh_samples`` samples wide (with the same final-interval treatment of
    leftover samples as above, so any length of at least
    ``mesh_samples + 1`` is accepted), and the blocks depend on the mesh
    intervals only through their lag, so the FFT-accelerated history of the
    D extension is used. The
    convergence conditions on the node sets are unchanged (they are
    properties of the collocation method, not of the quadrature); the
    discontinuous method is admitted for any ``coll_divs`` provided
    $-1 \le \rho_m \le 1$, with order $m - 1$ rather than $m$ at
    $\rho_m = 1$ (e.g. ``coll_divs=3, coll_choices=[1, 2]``). Inverting a first-kind equation amplifies errors
    in the data by roughly the inverse of the mesh width, so on noisy data a
    finer mesh is not automatically better; ``mesh_samples`` is the knob.

    The solver dispatches at runtime to a D-extension routine specialised for
    the given collocation setting. For scalar equations, settings not compiled
    into the extension fall back to a Numba-JIT implementation (requires the
    ``numba`` optional dependency), with a `voles.PerformanceWarning`. For vector equations only the compiled settings are supported. The
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
    kwargs = dict(locals())
    _deprecated_call(solve_VIE_1, kwargs)
    return _sampled.vie1(**kwargs)


def solve_VIE_2(*, kernel_values, g_values=None, time_step=1.0,
                coll_divs=None, coll_choices=None, return_function=False, return_polys=None,
                show_warnings=True,
                quadrature="product", mesh_samples=None, kernel_interp_degree=None):
    r'''
    Solve a Volterra integral equation of the second kind.

    **Deprecated since 0.11; removed in 1.0.** Use `voles.solve_vie2` instead; each call warns
    with the equivalent 1.0 call.

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
        positive integer. Given alone, the nodes are all its sub-interval
        points, ``coll_choices = [0, 1, ..., coll_divs]``; given neither,
        the setting is ``coll_divs=2, coll_choices=[0, 1, 2]``.
    coll_choices : list of int, optional
        Indices selecting the collocation nodes within each sub-interval.
        Each entry $k$ corresponds to the node $k / c$ where $c$ =
        ``coll_divs``, placed in $[0, 1]$. Entries must be distinct integers
        in $\{0, 1, \ldots, \text{coll\_divs}\}$. Given alone, ``coll_divs``
        is the largest entry.
    return_function : bool, optional
        If ``True``, also return a callable solution object as the second
        element of a tuple (see Returns). Default is ``False``.
    return_polys : bool, optional
        Deprecated alias for ``return_function``; passing it emits a
        ``DeprecationWarning``.
    show_warnings : bool, optional
        If ``True`` (default), emit a `voles.PerformanceWarning` when the
        Numba fallback is used, or when ``quadrature="product"`` has to step
        in NumPy because the loaded D extension predates its block driver.
        ``False`` emits nothing; the standard `warnings` filters work as
        well, e.g. ``warnings.simplefilter("ignore", voles.VolesWarning)``.

    quadrature : {"product", "collocation"}, optional
        How the integrals are evaluated from the sampled kernel.
        ``"product"`` (default) replaces the kernel by a piecewise polynomial
        interpolant of degree ``kernel_interp_degree`` on the data grid and
        integrates its products with the collocation polynomial exactly
        (product integration), so the mesh can be any multiple of
        ``coll_divs`` samples wide (``mesh_samples``), every sample is used,
        and any node set is available without the Numba fallback.
        ``"collocation"`` applies the interpolatory rule on the collocation
        nodes, which forces a mesh ``coll_divs**2`` samples wide and reads
        only every ``coll_divs``-th sample of the data in the history sums;
        it runs in compiled code specialised per setting and is a few times
        faster. See ``solve_VIE_1`` for the construction; unlike the
        first-kind case this equation is well posed, so there is no
        amplification of data errors to trade against the finer mesh.
    mesh_samples : int, optional
        Samples per mesh interval; the mesh width is
        ``mesh_samples * time_step``. Any positive multiple of ``coll_divs``
        with ``quadrature="product"``, default ``coll_divs`` (the finest
        mesh); must be ``coll_divs**2`` with ``quadrature="collocation"``.
    kernel_interp_degree : int, optional
        Degree of the kernel interpolant for ``quadrature="product"``;
        defaults to the number of collocation nodes. Not accepted with
        ``quadrature="collocation"``.

    Returns
    -------
    soln_values : ndarray of shape (N,) or (N, d) or (N, d, m)
        Solution values $y(t)$ at the same times as the input arrays.
        Returned when ``return_function=False`` (default).
    (soln_values, solution) : tuple
        Returned when ``return_function=True``. ``soln_values`` is as above.
        ``solution`` is callable -- ``solution(t)`` evaluates the piecewise
        polynomial solution at scalar or array ``t`` (NaN for ``t`` outside
        the solved interval) -- and also behaves like
        the previous list of per-interval polynomials: ``len(solution)``,
        ``solution[n]``, and iteration operate on ``solution.polynomials``.
        For scalar equations each polynomial is a
        `numpy.polynomial.Polynomial`; for vector equations each interval entry
        is an object array of shape ``(d,)`` (or ``(d, m)`` for matrix
        equations), one polynomial per component.

    Raises
    ------
    ValueError
        For invalid input: shapes that do not fit together (``g_values`` and
        ``a_values`` must have the length of ``kernel_values``), inputs too
        short to form one mesh interval, matrix input
        with zero columns, inputs so large that a solver buffer would exceed
        $2^{31}$ elements, a ``coll_divs`` below 1 or ``coll_choices``
        that is empty or not made of distinct integers in ``0 .. coll_divs``,
        a ``time_step`` that is not positive and finite, an unknown
        ``quadrature`` (matched case-insensitively), a ``mesh_samples`` /
        ``kernel_interp_degree`` that is not admissible for the chosen
        quadrature, or input data containing NaN or infinity.
    TypeError
        For an argument of the wrong type: a float (even an integer-valued
        one) or bool for ``coll_divs``, a ``coll_choices`` entry,
        ``mesh_samples`` or ``kernel_interp_degree``; a non-number
        ``time_step``; a non-string ``quadrature``; a flag (``show_warnings``,
        ``return_function``) that is not a bool.
    NotImplementedError
        For a collocation setting not compiled into the D extension, on the
        vector/matrix path (no fallback exists) or on the scalar path when
        ``numba`` is not installed.
    numpy.linalg.LinAlgError
        If a collocation system is singular or nearly singular.
    RuntimeError
        If the D extension reports an internal error. This is a bug in voles;
        please report it.

    Notes
    -----
    The mesh is ``coll_divs**2`` samples wide. Any input length $N$ of at
    least ``coll_divs**2 + 1`` is accepted and the solution is returned at
    every sample: the data are covered by regular mesh intervals, and when
    they do not end on a mesh point the last regular interval and the
    leftover samples form one final interval of between one and two
    regular widths, whose collocation nodes are snapped to the nearest
    samples. That interval is integrated with the product-integration rule
    (as for ``quadrature="product"``) and adds one local error of the
    method's order, so the convergence order is unchanged; superconvergence
    at the mesh points, where a node set has it, is kept at the final point
    but not at the samples inside the final interval.

    With ``quadrature="product"`` the scheme is exact collocation for the
    interpolated kernel; the kernel-perturbation error is of order
    $\delta^{p+1}$ for interpolation degree $p$, the mesh is ``mesh_samples``
    samples wide (with the same final-interval treatment of leftover samples
    as above, so any length of at least ``mesh_samples + 1`` is accepted),
    and the lag structure of the blocks lets the FFT-accelerated history of
    the D extension be used.

    The solver dispatches at runtime to a D-extension routine specialised for
    the given collocation setting. For scalar equations, settings not compiled
    into the extension fall back to a Numba-JIT implementation (requires the
    ``numba`` optional dependency), with a `voles.PerformanceWarning`. For vector equations only the compiled settings are supported. The
    compiled settings are listed in ``fast_coll_settings_VIE_2``.

    References
    ----------
    .. [1] Brunner, H. *Collocation Methods for Volterra Integral and Related
       Functional Differential Equations.* Cambridge University Press, 2004.
       Section 2.2.
    '''
    kwargs = dict(locals())
    _deprecated_call(solve_VIE_2, kwargs)
    return _sampled.vie2(**kwargs)


def solve_VIDE(*, kernel_values, a_values=None, g_values=None, soln_init_value, time_step=1.0,
               coll_divs=None, coll_choices=None, return_function=False, return_polys=None,
               show_warnings=True,
               quadrature="product", mesh_samples=None, kernel_interp_degree=None):
    r'''
    Solve a Volterra integro-differential equation.

    **Deprecated since 0.11; removed in 1.0.** Use `voles.solve_vide` instead; each call warns
    with the equivalent 1.0 call.

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
        positive integer. Given alone, the nodes are all its sub-interval
        points, ``coll_choices = [0, 1, ..., coll_divs]``; given neither,
        the setting is ``coll_divs=2, coll_choices=[0, 1, 2]``.
    coll_choices : list of int, optional
        Indices selecting the collocation nodes within each sub-interval.
        Each entry $k$ corresponds to the node $k / c$ where $c$ =
        ``coll_divs``, placed in $[0, 1]$. Entries must be distinct integers
        in $\{0, 1, \ldots, \text{coll\_divs}\}$. Given alone, ``coll_divs``
        is the largest entry.
    return_function : bool, optional
        If ``True``, also return a callable solution object as the second
        element of a tuple (see Returns). Default is ``False``.
    return_polys : bool, optional
        Deprecated alias for ``return_function``; passing it emits a
        ``DeprecationWarning``.
    show_warnings : bool, optional
        If ``True`` (default), emit a `voles.PerformanceWarning` when the
        Numba fallback is used, or when ``quadrature="product"`` has to step
        in NumPy because the loaded D extension predates its block driver.
        ``False`` emits nothing; the standard `warnings` filters work as
        well, e.g. ``warnings.simplefilter("ignore", voles.VolesWarning)``.

    quadrature : {"product", "collocation"}, optional
        How the integrals are evaluated from the sampled kernel.
        ``"product"`` (default) replaces the kernel by a piecewise polynomial
        interpolant of degree ``kernel_interp_degree`` on the data grid and
        integrates its products with the collocation polynomial exactly
        (product integration), so the mesh can be any multiple of
        ``coll_divs`` samples wide (``mesh_samples``), every sample is used,
        and any node set is available without the Numba fallback.
        ``"collocation"`` applies the interpolatory rule on the collocation
        nodes, which forces a mesh ``coll_divs**2`` samples wide and reads
        only every ``coll_divs``-th sample of the data in the history sums;
        it runs in compiled code specialised per setting and is a few times
        faster. See ``solve_VIE_1`` for the construction; unlike the
        first-kind case this equation is well posed, so there is no
        amplification of data errors to trade against the finer mesh.
    mesh_samples : int, optional
        Samples per mesh interval; the mesh width is
        ``mesh_samples * time_step``. Any positive multiple of ``coll_divs``
        with ``quadrature="product"``, default ``coll_divs`` (the finest
        mesh); must be ``coll_divs**2`` with ``quadrature="collocation"``.
    kernel_interp_degree : int, optional
        Degree of the kernel interpolant for ``quadrature="product"``;
        defaults to the number of collocation nodes. Not accepted with
        ``quadrature="collocation"``.

    Returns
    -------
    soln_values : ndarray of shape (N,) or (N, d) or (N, d, m)
        Solution values $y(t)$ at the same times as the input arrays.
        Returned when ``return_function=False`` (default).
    (soln_values, solution) : tuple
        Returned when ``return_function=True``. ``soln_values`` is as above.
        ``solution`` is callable -- ``solution(t)`` evaluates the piecewise
        polynomial solution at scalar or array ``t`` (NaN for ``t`` outside
        the solved interval) -- and also behaves like
        the previous list of per-interval polynomials: ``len(solution)``,
        ``solution[n]``, and iteration operate on ``solution.polynomials``.
        For scalar equations each polynomial is a
        `numpy.polynomial.Polynomial`; for vector equations each interval entry
        is an object array of shape ``(d,)`` (or ``(d, m)`` for matrix
        equations), one polynomial per component.

    Raises
    ------
    ValueError
        For invalid input: shapes that do not fit together (``g_values`` and
        ``a_values`` must have the length of ``kernel_values``), inputs too
        short to form one mesh interval, matrix input
        with zero columns, inputs so large that a solver buffer would exceed
        $2^{31}$ elements, a ``coll_divs`` below 1 or ``coll_choices``
        that is empty or not made of distinct integers in ``0 .. coll_divs``,
        a ``time_step`` that is not positive and finite, an unknown
        ``quadrature`` (matched case-insensitively), a ``mesh_samples`` /
        ``kernel_interp_degree`` that is not admissible for the chosen
        quadrature, or input data containing NaN or infinity.
    TypeError
        For an argument of the wrong type: a float (even an integer-valued
        one) or bool for ``coll_divs``, a ``coll_choices`` entry,
        ``mesh_samples`` or ``kernel_interp_degree``; a non-number
        ``time_step``; a non-string ``quadrature``; a flag (``show_warnings``,
        ``return_function``) that is not a bool; ``soln_init_value=None``.
    NotImplementedError
        For a collocation setting not compiled into the D extension, on the
        vector/matrix path (no fallback exists) or on the scalar path when
        ``numba`` is not installed.
    numpy.linalg.LinAlgError
        If a collocation system is singular or nearly singular.
    RuntimeError
        If the D extension reports an internal error. This is a bug in voles;
        please report it.

    Notes
    -----
    The mesh is ``coll_divs**2`` samples wide. Any input length $N$ of at
    least ``coll_divs**2 + 1`` is accepted and the solution is returned at
    every sample: the data are covered by regular mesh intervals, and when
    they do not end on a mesh point the last regular interval and the
    leftover samples form one final interval of between one and two
    regular widths, whose collocation nodes are snapped to the nearest
    samples. That interval is integrated with the product-integration rule
    (as for ``quadrature="product"``) and adds one local error of the
    method's order, so the convergence order is unchanged; superconvergence
    at the mesh points, where a node set has it, is kept at the final point
    but not at the samples inside the final interval.

    With ``quadrature="product"`` the scheme is exact collocation for the
    interpolated kernel; the kernel-perturbation error is of order
    $\delta^{p+1}$ for interpolation degree $p$, the mesh is ``mesh_samples``
    samples wide (with the same final-interval treatment of leftover samples
    as above, so any length of at least ``mesh_samples + 1`` is accepted),
    and the lag structure of the blocks lets the FFT-accelerated history of
    the D extension be used.

    The solver dispatches at runtime to a D-extension routine specialised for
    the given collocation setting. For scalar equations, settings not compiled
    into the extension fall back to a Numba-JIT implementation (requires the
    ``numba`` optional dependency), with a `voles.PerformanceWarning`. For vector equations only the compiled settings are supported. The
    compiled settings are listed in ``fast_coll_settings_VIDE``.

    References
    ----------
    .. [1] Brunner, H. *Collocation Methods for Volterra Integral and Related
       Functional Differential Equations.* Cambridge University Press, 2004.
       Chapter 3, pp. 160–167.
    '''
    kwargs = dict(locals())
    _deprecated_call(solve_VIDE, kwargs)
    return _sampled.vide(**kwargs)


def function_solve_VIE_1(*, kernel, g=None, soln_init_value=None,
                          mesh_breakpoints,
                          coll_divs: int = None, coll_choices: list[int] = None,
                          coll_nodes=None,
                          kernel_singularity=None,
                          return_function: bool = False,
                          force_continuous: bool = False,
                          reuse_adaptive_blocks: bool = True,
                          show_warnings: bool = True):
    r"""Solve the Volterra integral equation of the first kind

    **Deprecated since 0.11; removed in 1.0.** Use `voles.solve_vie1` instead; each call warns
    with the equivalent 1.0 call.

    $$g(t) = \int_0^t K(t-s)\,y(s)\,ds$$

    with callable kernel and right-hand side on an arbitrary mesh. Zero is not
    a permitted collocation node (both sides of the equation vanish at t=0).

    Parameters
    ----------
    kernel : callable
        ``kernel(u)`` returns $K(u)$: a scalar, or a $(d, d)$ matrix for vector
        and matrix-valued equations.
        For the fastest weight assembly, make ``kernel`` accept a 1-D array
        of ``u`` values and return the matching ``(n,)`` or ``(n, d, d)``
        array (e.g. ``np.multiply.outer(np.exp(-u), A)`` rather than
        ``np.exp(-u) * A``): the smooth blocks of a whole mesh row are then
        evaluated in one call. A kernel that only accepts scalars still
        works, through a per-point path that can be several times slower.
    g : callable, optional
        ``g(t)`` returns the right-hand side: scalar, $(d,)$, or $(d, m)$ for
        the matrix-valued case ($m$ right-hand sides). Defaults to zero
        (trivial y=0). A 2-D return signals the matrix case.
    soln_init_value : float or array_like, optional
        $y(0)$. Required only when ``force_continuous=True``; ignored
        otherwise. A warning is emitted if a value is passed when it has no
        effect. For a matrix-valued problem with ``force_continuous=True`` it
        must have shape $(d, m)$.
        It must be the value the equation implies: differentiating at
        $t = 0$ gives $g'(0) = K(0)\,y(0)$. Any other value gives a wrong
        solution on the whole interval, not only near $t = 0$, and is not
        detected. If $y(0)$ is not known independently, use the default
        method, or estimate it by solving with ``force_continuous=False,
        return_function=True`` and evaluating the solution at $t = 0$ (the
        continuous solve is then more accurate than the default method but
        falls short of its full order).
    mesh_breakpoints : array_like
        Strictly-increasing 1-D array starting at 0.
    coll_divs, coll_choices : int, list of int, optional
        Collocation nodes lie at ``coll_choices[k] / coll_divs`` in (0, 1].
        Zero is excluded from ``coll_choices``. ``coll_divs`` alone selects
        ``coll_choices = [1, ..., coll_divs]`` (the right endpoint included,
        so $\rho_m = 0$ and the method has its full order), ``coll_choices``
        alone sets ``coll_divs`` to its largest entry, and neither gives
        ``coll_divs=3, coll_choices=[1, 2, 3]``. Mutually exclusive with
        ``coll_nodes``.
    coll_nodes : array_like, optional
        Collocation node positions given directly as floats in $(0, 1]$ (zero
        excluded); see ``function_solve_VIE_2``. Mutually exclusive with
        ``coll_divs``/``coll_choices``. The convergence check (see Notes) is
        applied to both the integer and the ``coll_nodes`` paths.
    force_continuous : bool, optional
        If ``True``, use the continuous collocation method (Brunner's
        $S_m^{(0)}$): the solution is a globally $C^0$ piecewise polynomial
        whose degree $m$ is the number of collocation nodes, anchored at
        $y(0) =$ ``soln_init_value``. This requires the last node to be the
        right endpoint, $c_m = 1$ -- a structural property of the continuous
        representation that is enforced regardless of ``kernel_singularity``
        (see Notes for the separate convergence condition). The default
        discontinuous method ($S_{m-1}^{(-1)}$) imposes no such restriction
        and is generally the better default.
    kernel_singularity : None, float, list of float, dict, or callable
        See ``function_solve_VIE_2``.
    return_function : bool, optional
        See ``function_solve_VIE_2``.
    reuse_adaptive_blocks : bool, optional
        See ``function_solve_VIE_2``.
    show_warnings : bool, optional
        See ``function_solve_VIE_2``; also gates the `voles.AccuracyWarning`
        for $g(0) \ne 0$ and the `voles.VolesWarning` emitted when
        ``soln_init_value`` is passed without ``force_continuous``.

    Returns
    -------
    soln_values : ndarray
        Solution values at collocation nodes, with M the number of intervals
        and p the number of nodes per interval. Shape ``(M, p)`` for scalar
        equations, ``(M, p, d)`` for vector equations, and ``(M, p, d, m)``
        for matrix-valued equations.
    (soln_values, y_callable) : tuple
        When ``return_function=True``; ``y_callable`` as in
        ``function_solve_VIE_2``.

    Raises
    ------
    ValueError, TypeError, numpy.linalg.LinAlgError, ImportError
        As for ``function_solve_VIE_2``; additionally ``ValueError`` for
        non-convergent node sets (see Notes), zero in ``coll_choices`` /
        ``coll_nodes``, ``force_continuous`` without $c_m = 1$,
        ``force_continuous`` without ``soln_init_value``, or a non-finite
        ``soln_init_value``; ``TypeError`` for a ``force_continuous`` that is
        not a bool.

    Notes
    -----
    The equation forces $g(0) = 0$; for $g(0) \ne 0$ there is no bounded
    solution, and a `voles.AccuracyWarning` is emitted.

    Whether a given node set yields a convergent method depends on the nodes
    (Brunner 2004, smooth-kernel chapter). For a smooth kernel with
    $|K(t, t)| \ge k_0 > 0$, writing $c_1 < \dots < c_m$ for the nodes:

    - Discontinuous (default): converges iff
      $|\rho_m| := \prod_{i=1}^{m} (1 - c_i)/c_i \le 1$ (Thm 2.4.2), with global
      order $m$ (reduced to $m - 1$ at $\rho_m = 1$).
    - Continuous (``force_continuous``): converges iff
      $|\rho_{m-1}| := \prod_{i=1}^{m-1} (1 - c_i)/c_i \le 1$ (Thm 2.4.5), with
      global order $m + 1$ (reduced to $m$ at $\rho_{m-1} = 1$).

    Node sets violating these are rejected with a ``ValueError``. The
    amplification criteria do not apply to weakly-singular kernels (where
    $|K(t, t)|$ is unbounded), so they are skipped when ``kernel_singularity``
    is given and convergence is then the caller's responsibility. The
    $c_m = 1$ requirement of ``force_continuous`` is *not* part of these
    criteria -- it is structural and always enforced.

    These theorems are proved for a *uniform* mesh. The amplification factors
    $\rho$ depend only on the nodes, so the conditions carry over to
    *quasi-uniform* meshes (all interval widths within fixed constant multiples
    of each other). They are not guaranteed on *strongly graded* meshes -- e.g.
    the geometric refinement of ``optimal_graded_mesh``, where the smallest
    interval shrinks far faster than the largest -- but such meshes normally
    accompany a declared ``kernel_singularity``, for which the check is already
    skipped.
    """
    kwargs = dict(locals())
    _deprecated_call(function_solve_VIE_1, kwargs)
    return _functional.vie1(**kwargs)


def function_solve_VIE_2(*, kernel, g=None, mesh_breakpoints,
                          coll_divs: int = None, coll_choices: list[int] = None,
                          coll_nodes=None,
                          kernel_singularity=None,
                          return_function: bool = False,
                          reuse_adaptive_blocks: bool = True,
                          show_warnings: bool = True):
    r"""Solve the scalar Volterra integral equation of the second kind

    **Deprecated since 0.11; removed in 1.0.** Use `voles.solve_vie2` instead; each call warns
    with the equivalent 1.0 call.

    $$y(t) = g(t) + \int_0^t K(t-s)\,y(s)\,ds$$

    with callable kernel and right-hand side, on an arbitrary mesh.

    Parameters
    ----------
    kernel : callable
        ``kernel(u)`` returns $K(u)$ for scalar $u > 0$: a scalar for scalar
        equations, or a square $(d, d)$ matrix for $d$-dimensional vector and
        matrix-valued equations.
        For the fastest weight assembly, make ``kernel`` accept a 1-D array
        of ``u`` values and return the matching ``(n,)`` or ``(n, d, d)``
        array (e.g. ``np.multiply.outer(np.exp(-u), A)`` rather than
        ``np.exp(-u) * A``): the smooth blocks of a whole mesh row are then
        evaluated in one call. A kernel that only accepts scalars still
        works, through a per-point path that can be several times slower.
    g : callable, optional
        ``g(t)`` returns the forcing term $g(t)$. Defaults to zero. Return a
        scalar for scalar equations, a $(d,)$ array for vector equations, or a
        $(d, m)$ array to solve $m$ right-hand sides simultaneously (the
        matrix-valued case). A 2-D return signals the matrix case; matrix-valued
        problems require a $(d, d)$ matrix kernel.
    mesh_breakpoints : array_like
        Strictly increasing 1-D array starting at 0. Defines the integration
        intervals directly.
    coll_divs, coll_choices : int, list of int, optional
        Collocation node positions: nodes lie at
        ``coll_choices[k] / coll_divs`` in each interval. Unlike the array-
        based solvers, ``coll_divs`` does *not* sub-divide intervals.
        ``coll_divs`` alone selects every admissible point of the
        subdivision, ``coll_choices = [0, ..., coll_divs]``; ``coll_choices``
        alone sets ``coll_divs`` to its largest entry; neither gives
        ``coll_divs=2, coll_choices=[0, 1, 2]``. Mutually exclusive with
        ``coll_nodes``.
    coll_nodes : array_like, optional
        Collocation node positions given directly as floats in $[0, 1]$, for
        node sets that are not rational multiples of $1/c$ (e.g. Gauss-Legendre
        or Radau IIA points; see ``gauss_legendre_nodes``, ``radau_iia_nodes``,
        ``lobatto_nodes``). Mutually exclusive with
        ``coll_divs``/``coll_choices``. Convergence of the chosen node set is
        the caller's responsibility.
    kernel_singularity : None, float, list of float, dict, or callable
        Declare the singularity structure of the kernel.

        - ``None``: kernel is smooth everywhere.
        - ``float`` or list of float: convolution-style singularity locations
          (in $u = t - s$); e.g. ``0.0`` for $K(u) \sim u^{-\alpha}$. Blocks
          touching a location are integrated adaptively.
        - dict ``{location: alpha}``: like the list form, but a non-None
          ``alpha`` additionally declares the power law
          $K(u) \sim |u - u_0|^{-\alpha}$ (with $0 < \alpha < 1$; use
          ``{0.0: 0.5}`` for an Abel kernel $u^{-1/2}$). Blocks touching such
          a location are integrated by deterministic fixed-order Gauss-Jacobi
          rules with the singular factor absorbed into the weight: typically
          much faster and more accurate than adaptive quadrature, and -- being
          deterministic -- reusable across the uniform-mesh Toeplitz assembly
          under the default strict policy, so the singular build runs at
          smooth-kernel speed with no ``reuse_adaptive_blocks`` flag needed.
          Each Jacobi block passes the same two-order acceptance check as the
          smooth path; a failing basis function (wrong declared ``alpha``, or
          extra structure like a log factor) falls back to the adaptive
          treatment automatically. ``alpha=None`` keeps a location fully
          adaptive.
        - callable ``f(t) -> list[float]``: returns the singular $s$-locations
          for collocation point $t$. Forward-compatible with non-convolution
          $K(s, t)$.

        Locations may be Python floats/ints, NumPy scalars, or 0-d arrays;
        booleans are rejected with a ``TypeError`` (``True`` would silently
        mean location 1.0). An empty list/tuple/dict declares nothing and
        behaves exactly like ``None``. The kernel's return value exactly *at*
        a declared singular point is never used (it is masked out of the
        quadrature), so returning 0, ``inf``, or a clamped value there are
        all equivalent.
    return_function : bool, optional
        If True, also return a callable solution wrapper.
    reuse_adaptive_blocks : bool, optional
        On a uniform mesh with a convolution kernel the weight tensor is
        Toeplitz and is assembled from one integrated row. Blocks evaluated
        by deterministic fixed-order quadrature are always reused across
        rows. With the default ``True``, blocks touching a declared
        singularity that need adaptive quadrature are reused too, computed
        once at a tightened tolerance: the singular-kernel build cost is
        about an order of magnitude lower than re-evaluating them per row.
        ``False`` re-evaluates those blocks for every row, which reproduces
        the general (non-Toeplitz) assembly to rounding level at an $O(M)$
        adaptive-quadrature cost; the two differ by at most the adaptive
        quadrature's own tolerance (scalar problems $\sim10^{-8}$, typically
        $\sim10^{-9}$; vector/matrix and complex problems, which integrate
        via ``scipy.integrate.quad_vec``, up to $\sim10^{-7}$), far below
        discretization error in practice. No effect on non-uniform meshes
        or on kernels with no declared ``kernel_singularity``. scipy
        ``IntegrationWarning``s raised by the deliberately tightened reuse
        quadratures are suppressed (the best-obtainable value is what reuse
        wants); default-tolerance quadratures still warn as usual.
    show_warnings : bool, optional
        If True (default), emit a `voles.AccuracyWarning` when a
        ``kernel_singularity`` is declared on a mesh that looks uniform
        (suggesting ``optimal_graded_mesh``), and a `voles.VolesWarning` when
        a declared location lies outside $[0, T]$. ``False`` emits nothing;
        the standard `warnings` filters work as well.

    Returns
    -------
    soln_values : ndarray
        Solution values at collocation nodes, where M is the number of
        intervals and p is the number of collocation nodes per interval
        (``len(coll_choices)`` or ``len(coll_nodes)``). Shape ``(M, p)`` for
        scalar equations, ``(M, p, d)`` for vector equations, and
        ``(M, p, d, m)`` for matrix-valued equations.
    (soln_values, y_callable) : tuple
        When ``return_function=True``. ``y_callable(t)`` evaluates the
        piecewise polynomial at any time t in the mesh (NaN outside it), returning a scalar / ``(d,)`` /
        ``(d, m)`` value for scalar t (with a leading time axis for array t).

    Raises
    ------
    ValueError
        For invalid meshes, collocation settings, ``kernel_singularity``
        declarations (out-of-range ``alpha``), non-finite weight-tensor
        entries, a ``g`` returning NaN or infinity at a collocation time,
        kernel dimension or node count past the compiled limits, or matrix
        input with zero columns.
    TypeError
        If ``kernel`` or ``g`` is not callable; for a ``coll_divs`` or
        ``coll_choices`` entry that is not an integer (floats are rejected,
        not truncated); for a ``kernel_singularity`` location that is a bool
        or not a number; or for a flag (``return_function``,
        ``reuse_adaptive_blocks``, ``show_warnings``) that is not a bool.
    numpy.linalg.LinAlgError
        If a collocation system is singular or nearly singular (e.g. a zero
        kernel).
    ImportError
        If scipy is not installed.

    Notes
    -----
    See the module docstring for the mesh-convention difference from the
    array-based solvers.

    Matrix-valued problems share the kernel weight tensor across all $m$
    right-hand sides (it is built once), so they are substantially cheaper than
    $m$ separate calls. The $m$ columns are solved in threads (capped at the
    CPU count).
    """
    kwargs = dict(locals())
    _deprecated_call(function_solve_VIE_2, kwargs)
    return _functional.vie2(**kwargs)


def function_solve_VIDE(*, kernel, a=None, g=None, soln_init_value,
                         mesh_breakpoints,
                         coll_divs: int = None, coll_choices: list[int] = None,
                         coll_nodes=None,
                         kernel_singularity=None,
                         return_function: bool = False,
                         reuse_adaptive_blocks: bool = True,
                         show_warnings: bool = True):
    r"""Solve the scalar Volterra integro-differential equation

    **Deprecated since 0.11; removed in 1.0.** Use `voles.solve_vide` instead; each call warns
    with the equivalent 1.0 call.

    $$y'(t) = a(t)\,y(t) + g(t) + \int_0^t K(t-s)\,y(s)\,ds,\quad y(0) = y_0$$

    with callable inputs on an arbitrary mesh.

    Parameters
    ----------
    kernel : callable
        ``kernel(u)`` returns $K(u)$: a scalar, or a $(d, d)$ matrix for vector
        and matrix-valued equations.
        For the fastest weight assembly, make ``kernel`` accept a 1-D array
        of ``u`` values and return the matching ``(n,)`` or ``(n, d, d)``
        array (e.g. ``np.multiply.outer(np.exp(-u), A)`` rather than
        ``np.exp(-u) * A``): the smooth blocks of a whole mesh row are then
        evaluated in one call. A kernel that only accepts scalars still
        works, through a per-point path that can be several times slower.
    a : callable, optional
        ``a(t)`` returns the coefficient $a(t)$ (a scalar, or a $(d, d)$ matrix
        for vector/matrix equations). Defaults to zero. ``a`` does not depend on
        the right-hand side, so it is sampled once in the matrix case.
    g : callable, optional
        ``g(t)`` returns the forcing term: scalar, $(d,)$, or $(d, m)$ for the
        matrix-valued case. Defaults to zero.
    soln_init_value : float or array_like
        $y(0)$. Required. A scalar/`(d,)` value gives the scalar/vector case; a
        $(d, m)$ array selects the matrix-valued case ($m$ right-hand sides).
    mesh_breakpoints : array_like
        Strictly-increasing 1-D array starting at 0.
    coll_divs, coll_choices : int, list of int, optional
        Collocation node positions; see ``function_solve_VIE_2`` for the
        convention (differs from the array-based solvers). ``coll_divs``
        alone selects ``coll_choices = [0, ..., coll_divs]``, ``coll_choices``
        alone sets ``coll_divs`` to its largest entry, and neither gives
        ``coll_divs=2, coll_choices=[0, 1, 2]``. Mutually exclusive with
        ``coll_nodes``.
    coll_nodes : array_like, optional
        Collocation node positions given directly as floats in $[0, 1]$; see
        ``function_solve_VIE_2``. Mutually exclusive with
        ``coll_divs``/``coll_choices``.
    kernel_singularity : None, float, list of float, dict, or callable
        Declare integrable singularities, optionally with known power-law
        exponents (dict form, enabling deterministic Gauss-Jacobi rules);
        see ``function_solve_VIE_2``.
    return_function : bool, optional
        If True, also return a callable solution wrapper.
    reuse_adaptive_blocks : bool, optional
        Reuse the adaptive-quadrature weight blocks across the uniform-mesh
        Toeplitz assembly; see ``function_solve_VIE_2``.
    show_warnings : bool, optional
        If True (default), emit the ``kernel_singularity`` warnings described
        in ``function_solve_VIE_2``.

    Returns
    -------
    soln_values : ndarray
        $y$ values at collocation nodes. Shape ``(M, p)`` (scalar),
        ``(M, p, d)`` (vector), or ``(M, p, d, m)`` (matrix-valued), with p
        the number of collocation nodes per interval.
    (soln_values, y_callable) : tuple
        When ``return_function=True``.

    Raises
    ------
    ValueError, TypeError, numpy.linalg.LinAlgError, ImportError
        As for ``function_solve_VIE_2``; additionally ``TypeError`` when
        ``soln_init_value`` is omitted or None, and ``ValueError`` when its
        shape is incompatible with the kernel dimension, when it or ``a(t)``
        is not finite.

    Notes
    -----
    Internally the unknowns are $y'$ at the collocation nodes; the returned
    values are $y$ itself (reconstructed via the antiderivative basis and the
    tracked boundary values).
    """
    kwargs = dict(locals())
    _deprecated_call(function_solve_VIDE, kwargs)
    return _functional.vide(**kwargs)


_NEW = {'solve_VIE_1': 'solve_vie1', 'solve_VIE_2': 'solve_vie2', 'solve_VIDE': 'solve_vide', 'function_solve_VIE_1': 'solve_vie1', 'function_solve_VIE_2': 'solve_vie2', 'function_solve_VIDE': 'solve_vide'}
