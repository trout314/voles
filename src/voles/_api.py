"""The 1.0 solvers: `solve_vie1`, `solve_vie2`, `solve_vide`.

Each call is classified into one of two regimes by the types of its data
inputs (docs/dev/api-contract-1.0.md §3):

- sampled: the inputs are arrays of samples at t = 0, dt, 2 dt, ...;
- functional: the inputs are callables, solved on a user-given ``mesh``.

This layer validates every argument with its 1.0 name, applies the shape and
matrix rule of contract §6, and then calls the engine (`_sampled.solve` or
`_functional.solve`) with the engine's own keyword names. Everything a user
can get wrong is caught here, so the engine's internal checks, which still
use the 0.10 names, are never what a 1.0 user sees.
"""
from __future__ import annotations

import numbers
from typing import Any, Callable, Literal, Mapping, Optional, Sequence, Tuple, Union

import numpy as np
from numpy.typing import ArrayLike

from . import _functional, _sampled
from . import _validate as _v
from ._common import _vie1_rho
from ._solution import VolterraSolution

__all__ = ["solve_vie1", "solve_vie2", "solve_vide"]

# Public input types. `Data`: samples, or a callable of one argument (the lag
# u for the kernel, the time t for g and a) that may be vectorised.
Data = Union[ArrayLike, Callable[[Any], ArrayLike]]
CollSetting = Union[int, Tuple[int, Sequence[int]], None]
KernelSingularity = Union[None, float, Sequence[float], Mapping[float, Optional[float]],
                          Callable[[float], Sequence[float]]]
Quadrature = Literal["product", "collocation"]

_DEFAULT_SETTING = {"vie1": (3, [1, 2, 3]), "vie2": (2, [0, 1, 2]), "vide": (2, [0, 1, 2])}
_FAST = {"vie1": "_fast_settings_VIE_1", "vie2": "_fast_settings_VIE_2",
         "vide": "_fast_settings_VIDE"}
_SAMPLED_ONLY = ("dt", "coll_setting", "quadrature", "samples_per_interval",
                 "kernel_interp_degree")
_FUNCTIONAL_ONLY = ("mesh", "coll_nodes", "kernel_singularity", "reuse_adaptive_blocks")


# ---------------------------------------------------------------------------
# Regime
# ---------------------------------------------------------------------------

def _classify(data):
    """``"sampled"`` or ``"functional"`` from the given data inputs
    (``[(name, value), ...]``, ``None`` values left out)."""
    callables = [n for n, v in data if callable(v)]
    arrays = [n for n, v in data if not callable(v)]
    if callables and arrays:
        raise NotImplementedError(
            f"mixed inputs: {_and(callables)} {'is' if len(callables) == 1 else 'are'} "
            f"callable but {_and(arrays)} {'is' if len(arrays) == 1 else 'are'} sampled. "
            f"Combining callable and sampled inputs (for example an analytic kernel with a "
            f"measured forcing) is planned but not supported yet: pass every input as an "
            f"array of samples (with dt=) or every input as a callable (with mesh=).")
    return "functional" if callables else "sampled"


def _and(names):
    names = [f"'{n}'" for n in names]
    return names[0] if len(names) == 1 else ", ".join(names[:-1]) + " and " + names[-1]


def _check_regime_options(regime, why, given):
    """Reject options that belong to the other regime. ``given`` maps option
    names to whether the caller set them (to a non-default value)."""
    wrong = [n for n, set_ in given.items() if set_ and
             n in (_FUNCTIONAL_ONLY if regime == "sampled" else _SAMPLED_ONLY)]
    if not wrong:
        return
    if regime == "sampled":
        hint = ("for sampled inputs give the sample spacing dt= and, optionally, "
                "coll_setting=, quadrature=, samples_per_interval= or kernel_interp_degree=")
    else:
        hint = ("for callable inputs give mesh= (breakpoints starting at 0) and, optionally, "
                "coll_nodes=, kernel_singularity= or reuse_adaptive_blocks=")
    raise ValueError(
        f"{_and(wrong)} {'applies' if len(wrong) == 1 else 'apply'} only to "
        f"{'callable' if regime == 'sampled' else 'sampled'} inputs, but {why}, so the "
        f"problem is {regime}; {hint}.")


def _is_default(value, default):
    if default is None:
        return value is None
    if isinstance(default, bool):
        return isinstance(value, (bool, np.bool_)) and bool(value) is default
    if isinstance(default, str):
        return isinstance(value, str) and value.lower() == default
    return (isinstance(value, numbers.Real) and not isinstance(value, (bool, np.bool_))
            and value == default)


# ---------------------------------------------------------------------------
# Collocation settings
# ---------------------------------------------------------------------------

def _resolve_coll_setting(equation, coll_setting):
    """``coll_setting`` as ``(divs, sorted choices)`` with the 1.0 rules
    (contract §5.1)."""
    lo = 1 if equation == "vie1" else 0
    if coll_setting is None:
        divs, choices = _DEFAULT_SETTING[equation]
        return divs, list(choices)
    if isinstance(coll_setting, numbers.Integral) and not isinstance(coll_setting,
                                                                       (bool, np.bool_)):
        divs = _v.integer("coll_setting", coll_setting, minimum=1,
                          value_msg=f"coll_setting={coll_setting!r}: divs must be at least 1")
        return divs, list(range(lo, divs + 1))
    if isinstance(coll_setting, (str, bytes)) or not hasattr(coll_setting, "__len__") \
            or len(coll_setting) != 2:
        raise TypeError(
            f"coll_setting must be None, an integer divs, or a (divs, choices) pair, got "
            f"{coll_setting!r}")
    divs, choices = coll_setting
    divs = _v.integer("coll_setting divs", divs, minimum=1,
                      type_msg=f"coll_setting: divs must be an integer, got {divs!r}",
                      value_msg=f"coll_setting: divs must be at least 1, got {divs!r}")
    if isinstance(choices, (str, bytes)) or not hasattr(choices, "__iter__"):
        raise TypeError(f"coll_setting: choices must be a sequence of integers, got {choices!r}")
    choices = list(np.asarray(choices).ravel()) if isinstance(choices, np.ndarray) else list(choices)
    for c in choices:
        if isinstance(c, (bool, np.bool_)) or not isinstance(c, numbers.Integral):
            raise TypeError(f"coll_setting: choices must be integers, got {c!r}")
    choices = sorted(int(c) for c in choices)
    if not choices:
        raise ValueError("coll_setting: choices must contain at least one node")
    if len(set(choices)) != len(choices):
        raise ValueError(f"coll_setting: choices must be distinct, got {choices}")
    if choices[0] < lo or choices[-1] > divs:
        raise ValueError(f"coll_setting: choices must lie in {lo}..{divs} for "
                         f"{'VIE-1' if equation == 'vie1' else 'this equation'}, got {choices}")
    return divs, choices


def _check_vie1_admissible(divs, choices, continuous):
    """The VIE-1 convergence rule, exactly (contract §5.3)."""
    setting = f"coll_setting=({divs}, {choices})"
    if continuous and choices[-1] != divs:
        raise ValueError(
            f"{setting}: continuous=True needs a node at the right end of each interval "
            f"(the largest choice equal to divs); this is a structural requirement of the "
            f"continuous method (Brunner 2004, Section 2.4.3)")
    rho = _vie1_rho(divs, choices, continuous=continuous)
    if abs(rho) > 1:
        which = "rho_(m-1)" if continuous else "rho_m"
        raise ValueError(
            f"{setting} does not give a convergent {'continuous' if continuous else ''}"
            f"{' ' if continuous else ''}VIE-1 method: |{which}| = {float(abs(rho)):.4g} > 1 "
            f"(Brunner 2004, Theorem {'2.4.5' if continuous else '2.4.2'}). Use nodes with "
            f"|{which}| <= 1; for example, all of 1..divs.")


# ---------------------------------------------------------------------------
# Arrays and shapes
# ---------------------------------------------------------------------------

def _numeric_array(name, value):
    try:
        arr = np.asarray(value)
    except Exception as exc:          # ragged lists and the like
        raise ValueError(f"{name} could not be converted to an array: {exc}") from None
    if arr.dtype.kind not in "biufc":
        raise TypeError(f"{name} must be numeric, got an array of dtype {arr.dtype}")
    _v.finite(name, arr)
    return arr


def _initial_value(y0, d):
    """``y0`` as an array of shape (), (d,) or (d, m) (contract §6)."""
    arr = _numeric_array("y0", y0)
    if d == 0:
        if arr.size != 1:
            raise ValueError(f"y0 must be a single number for a scalar equation, got shape "
                             f"{arr.shape}")
        return arr.reshape(())
    if arr.shape == (d,) or (arr.ndim == 2 and arr.shape[0] == d):
        return arr
    raise ValueError(f"y0 must have shape ({d},) or ({d}, m) for a ({d}, {d}) kernel, got "
                     f"shape {arr.shape}")


def _columns(m_values):
    """The common column count of the inputs that have a column axis."""
    ms = {name: m for name, m in m_values if m is not None}
    if len(set(ms.values())) > 1:
        raise ValueError("inputs with a column axis must agree on the number of columns m: "
                         + ", ".join(f"{n} has m = {m}" for n, m in ms.items()))
    m = next(iter(ms.values()), None)
    if m == 0:
        raise ValueError("a matrix-valued input has zero columns (a trailing axis of length 0)")
    return m


def _sampled_inputs(equation, kernel, g, a, y0, Q, p, continuous):
    """Validate and shape the sampled inputs for the engine. Returns the
    engine keyword arguments for the data."""
    K = _numeric_array("kernel", kernel)
    if K.ndim == 2:
        raise ValueError(
            f"kernel has shape {K.shape}: a 2-D kernel is reserved for non-convolution "
            f"kernels K(t_i, s_j), which are not supported yet; a convolution kernel is "
            f"(N,) for scalar or (N, d, d) for vector equations")
    if K.ndim not in (1, 3):
        raise ValueError(f"kernel must have shape (N,) or (N, d, d), got {K.shape}")
    if K.ndim == 3 and K.shape[1] != K.shape[2]:
        raise ValueError(f"kernel must have shape (N, d, d), got {K.shape}")
    N, d = K.shape[0], (0 if K.ndim == 1 else K.shape[1])
    if N < Q + 1:
        raise ValueError(f"kernel has {N} samples, but one mesh interval of "
                         f"samples_per_interval={Q} needs at least {Q + 1}")
    if N < p + 1:
        raise ValueError(f"kernel_interp_degree={p} needs at least {p + 1} kernel samples, "
                         f"got {N}")
    G = None if g is None else _numeric_array("g", g)
    if G is not None:
        ok = (G.shape == (N,)) if d == 0 else (G.ndim in (2, 3) and G.shape[:2] == (N, d))
        if not ok:
            want = f"({N},)" if d == 0 else f"({N}, {d}) or ({N}, {d}, m)"
            raise ValueError(f"g must have shape {want} to match kernel {K.shape}, got {G.shape}")
    A = None
    if equation == "vide" and a is not None:
        A = _numeric_array("a", a)
        want = (N,) if d == 0 else (N, d, d)
        if A.shape != want:
            raise ValueError(f"a must have shape {want} to match kernel {K.shape}, got {A.shape}")
    Y0 = None if y0 is None else _initial_value(y0, d)
    # Matrix rule: m from whichever inputs carry a column axis; the rest are shared.
    m = None
    if d:
        m = _columns([("g", G.shape[2] if G is not None and G.ndim == 3 else None),
                      ("y0", Y0.shape[1] if Y0 is not None and Y0.ndim == 2 else None)])
    if m is not None:
        if equation == "vie1" and continuous:
            if G is None:
                G = np.zeros((N, d, m), dtype=Y0.dtype if Y0 is not None else float)
            elif G.ndim == 2:
                G = np.broadcast_to(G[:, :, None], (N, d, m))
            if Y0 is not None and Y0.ndim == 1:
                Y0 = np.broadcast_to(Y0[:, None], (d, m))
        elif equation == "vide":
            if Y0.ndim == 1:                      # g has the columns; y0 is shared
                Y0 = np.broadcast_to(Y0[:, None], (d, m))
            # a shared (N, d) g is accepted by the engine as it is
    kw = dict(kernel_values=K, g_values=G)
    if equation == "vide":
        kw.update(a_values=A, soln_init_value=Y0)
    elif equation == "vie1" and continuous:
        kw["soln_init_value"] = Y0
    return kw, d, m


def _check_compiled(equation, divs, choices, d, m):
    """``quadrature="collocation"`` with a setting the extension doesn't have."""
    if (divs, choices) in getattr(_sampled, _FAST[equation]):
        return
    product = " Use quadrature='product', which accepts every valid setting."
    if d:
        raise NotImplementedError(
            f"coll_setting=({divs}, {choices}) is not compiled into the extension, and "
            f"vector and matrix problems under quadrature='collocation' have no fallback."
            + product)
    if not _sampled._numba_available:
        raise NotImplementedError(
            f"coll_setting=({divs}, {choices}) is not compiled into the extension; under "
            f"quadrature='collocation' it needs the numba fallback (pip install numba)."
            + product)


# ---------------------------------------------------------------------------
# The two regimes
# ---------------------------------------------------------------------------

def _solve_sampled(equation, *, kernel, g, a, y0, continuous, dt, coll_setting, quadrature,
                   samples_per_interval, kernel_interp_degree):
    dt = _v.real("dt", dt, positive=True, value_msg=f"dt must be positive and finite, got {dt!r}")
    quadrature = _v.choice("quadrature", quadrature, ("product", "collocation"))
    divs, choices = _resolve_coll_setting(equation, coll_setting)
    if equation == "vie1":
        _check_vie1_admissible(divs, choices, continuous)
    if samples_per_interval is not None:
        Q = _v.integer("samples_per_interval", samples_per_interval, minimum=1)
        if quadrature == "collocation" and Q != divs ** 2:
            raise ValueError(
                f"with quadrature='collocation' the mesh is divs**2 = {divs ** 2} samples wide "
                f"(got samples_per_interval={Q}); use quadrature='product' to choose the mesh "
                f"width")
        if quadrature == "product" and Q % divs:
            raise ValueError(
                f"samples_per_interval={Q} must be a multiple of divs={divs}, so that every "
                f"collocation node is a sample")
    else:
        Q = _sampled._samples_per_interval(equation, quadrature, None, divs)
    if kernel_interp_degree is not None:
        if quadrature == "collocation":
            raise ValueError("kernel_interp_degree applies only to quadrature='product'")
        p = _v.integer("kernel_interp_degree", kernel_interp_degree, minimum=1)
    else:
        p = len(choices) if quadrature == "product" else 0
    data, d, m = _sampled_inputs(equation, kernel, g, a, y0, Q, p, continuous)
    if quadrature == "collocation":
        _check_compiled(equation, divs, choices, d, m)
    kw = dict(data, time_step=dt, coll_divs=divs, coll_choices=choices, quadrature=quadrature,
              mesh_samples=samples_per_interval, kernel_interp_degree=kernel_interp_degree)
    if equation == "vie1":
        kw["force_continuous"] = continuous
    return _sampled.solve(equation, **kw)


def _validate_mesh(mesh):
    try:
        arr = np.asarray(mesh, dtype=float)
    except (TypeError, ValueError):
        raise TypeError(f"mesh must be a 1-D array of breakpoints, got {mesh!r}") from None
    if arr.ndim != 1 or arr.size < 2:
        raise ValueError(f"mesh must be 1-D with at least two breakpoints, got shape {arr.shape}")
    if not np.all(np.isfinite(arr)):
        raise ValueError("mesh must be finite (no inf or NaN)")
    if not np.all(np.diff(arr) > 0):
        raise ValueError("mesh must be strictly increasing")
    if arr[0] != 0.0:
        raise ValueError(f"mesh must start at 0, got mesh[0] = {arr[0]!r}")
    return arr


def _shared_g(g, d, m):
    """``g`` returning (d,), broadcast to the (d, m) of a matrix problem."""
    def g_columns(t):
        return np.broadcast_to(np.asarray(g(t))[:, None], (d, m))
    return g_columns


def _solve_functional(equation, *, kernel, g, a, y0, continuous, mesh, coll_nodes,
                      kernel_singularity, reuse_adaptive_blocks):
    mesh = _validate_mesh(mesh)
    reuse_adaptive_blocks = _v.flag("reuse_adaptive_blocks", reuse_adaptive_blocks)
    divs, choices = _DEFAULT_SETTING[equation]
    node_pos, _, _ = _functional._resolve_node_pos(
        coll_nodes, None, None, default_divs=divs, default_choices=choices,
        exclude_zero=equation == "vie1", fname=f"solve_{equation}")
    if equation == "vie1" and continuous and abs(node_pos[-1] - 1.0) > 1e-12:
        raise ValueError(
            f"continuous=True needs a node at the right end of each interval (c_m = 1); "
            f"got coll_nodes ending at {node_pos[-1]:.6g}. Append 1.0 to the nodes; this is a "
            f"structural requirement of the continuous method (Brunner 2004, Section 2.4.3)")
    widths = np.diff(mesh)
    is_vector, d = _functional._detect_kernel_shape(kernel, float(widths[0]) * 0.5)
    d = d if is_vector else 0
    Y0 = None if y0 is None else _initial_value(y0, d)
    m = None
    if d:
        sample_t = float(mesh[0] + node_pos[0] * widths[0])
        m_g = _functional._detect_g_matrix_cols(g, d, sample_t)
        m = _columns([("g(t)", m_g), ("y0", Y0.shape[1] if Y0 is not None and Y0.ndim == 2
                                       else None)])
        if m is not None:
            if g is not None and m_g is None:
                g = _shared_g(g, d, m)
            if Y0 is not None and Y0.ndim == 1:
                Y0 = np.broadcast_to(Y0[:, None], (d, m))
    kw = dict(kernel=kernel, g=g, mesh_breakpoints=mesh, coll_nodes=node_pos,
              kernel_singularity=kernel_singularity, reuse_adaptive_blocks=reuse_adaptive_blocks)
    if equation == "vide":
        kw.update(a=a, soln_init_value=Y0)
    elif equation == "vie1":
        kw["force_continuous"] = continuous
        if continuous:
            kw["soln_init_value"] = Y0
    return _functional.solve(equation, **kw)


def _solve(equation, *, kernel, g, a=None, y0=None, continuous=False, dt, coll_setting,
           quadrature, samples_per_interval, kernel_interp_degree, mesh, coll_nodes,
           kernel_singularity, reuse_adaptive_blocks):
    if kernel is None:
        raise TypeError(f"solve_{equation}: kernel is required")
    data = [("kernel", kernel)] + [(n, v) for n, v in (("g", g), ("a", a)) if v is not None]
    regime = _classify(data)
    why = ("the inputs are callable" if regime == "functional"
           else "kernel is an array" if len(data) == 1
           else "the inputs are arrays")
    _check_regime_options(regime, why, {
        "dt": not _is_default(dt, 1.0), "coll_setting": coll_setting is not None,
        "quadrature": not _is_default(quadrature, "product"),
        "samples_per_interval": samples_per_interval is not None,
        "kernel_interp_degree": kernel_interp_degree is not None,
        "mesh": mesh is not None, "coll_nodes": coll_nodes is not None,
        "kernel_singularity": kernel_singularity is not None,
        "reuse_adaptive_blocks": not _is_default(reuse_adaptive_blocks, True)})
    if regime == "functional" and mesh is None:
        raise TypeError(f"solve_{equation}: callable inputs need mesh=, the mesh breakpoints "
                        f"(a 1-D increasing array starting at 0)")
    if equation == "vie1":
        continuous = _v.flag("continuous", continuous)
        if continuous and y0 is None:
            raise ValueError("solve_vie1: continuous=True needs the initial value y0")
        if not continuous and y0 is not None:
            raise ValueError("solve_vie1: y0 is used only by the continuous method; pass "
                             "continuous=True with it, or leave y0 out")
    if equation == "vide" and y0 is None:
        raise TypeError("solve_vide: y0 is required")
    common = dict(kernel=kernel, g=g, a=a, y0=y0, continuous=continuous)
    if regime == "sampled":
        return _solve_sampled(equation, dt=dt, coll_setting=coll_setting, quadrature=quadrature,
                              samples_per_interval=samples_per_interval,
                              kernel_interp_degree=kernel_interp_degree, **common)
    return _solve_functional(equation, mesh=mesh, coll_nodes=coll_nodes,
                             kernel_singularity=kernel_singularity,
                             reuse_adaptive_blocks=reuse_adaptive_blocks, **common)


# ---------------------------------------------------------------------------
# Public solvers
# ---------------------------------------------------------------------------

def solve_vie1(*, kernel: Data, g: Optional[Data] = None, continuous: bool = False,
               y0: Optional[ArrayLike] = None,
               dt: float = 1.0, coll_setting: CollSetting = None,
               quadrature: Quadrature = "product",
               samples_per_interval: Optional[int] = None,
               kernel_interp_degree: Optional[int] = None,
               mesh: Optional[ArrayLike] = None, coll_nodes: Optional[ArrayLike] = None,
               kernel_singularity: KernelSingularity = None,
               reuse_adaptive_blocks: bool = True) -> VolterraSolution:
    r"""Solve a Volterra integral equation of the first kind.

    $$g(t) = \int_0^t K(t-s)\, y(s)\, ds, \qquad 0 \le t \le T$$

    by collocation: on each mesh interval $y$ is a polynomial that satisfies
    the equation at the collocation nodes.

    The inputs are either arrays of samples at $t = 0, dt, 2\,dt, \ldots$
    (the *sampled* regime) or callables (the *functional* regime, solved on
    the breakpoints ``mesh``); see Notes.

    Parameters
    ----------
    kernel : array_like or callable
        $K$. Sampled: shape ``(N,)``, or ``(N, d, d)`` for a system of $d$
        equations, at $u = 0, dt, \ldots, (N-1)\,dt$. Callable: ``kernel(u)``
        returning a scalar or a ``(d, d)`` matrix; it may be vectorised
        over a 1-D ``u``, which is faster.
    g : array_like or callable, optional
        $g$, with $g(0) = 0$. Sampled: ``(N,)``, ``(N, d)`` or ``(N, d, m)``
        for $m$ right-hand sides. Callable: ``g(t)`` returning a scalar,
        ``(d,)`` or ``(d, m)``. Default zero.
    continuous : bool, optional
        Use the continuous collocation method (Brunner's $S_m^{(0)}$, degree
        $m$ on $m$ nodes, one order higher) instead of the default
        discontinuous one ($S_{m-1}^{(-1)}$). Needs ``y0`` and a node at the
        right end of each interval.
    y0 : array_like, optional
        $y(0)$, for ``continuous=True`` only. Scalar, ``(d,)`` or ``(d, m)``.
    dt : float, optional
        Sampled inputs: the sample spacing. Default 1.0.
    coll_setting : int or (int, sequence of int), optional
        Sampled inputs: the collocation nodes ``choices / divs`` as
        ``(divs, choices)``, with choices in ``1..divs``, or a bare ``divs``
        meaning every point ``1..divs``. ``divs`` also sets the mesh
        width (see ``samples_per_interval``). Default ``(3, [1, 2, 3])``.
    quadrature : {"product", "collocation"}, optional
        Sampled inputs: how the integrals are evaluated from the samples.
        ``"product"`` (default) integrates a piecewise polynomial
        interpolant of the kernel exactly and accepts any mesh width and
        node set. ``"collocation"`` applies the interpolatory rule on the
        nodes; it is faster but fixes the mesh at ``divs**2`` samples, runs
        only compiled settings (or the numba fallback), and is unstable when
        $K(0)$ is small.
    samples_per_interval : int, optional
        Sampled inputs: samples per mesh interval. A multiple of ``divs``
        with product quadrature; default ``divs**2``, because a first-kind
        inversion amplifies data errors by about the inverse of the mesh
        width. Must be ``divs**2`` with collocation quadrature.
    kernel_interp_degree : int, optional
        Sampled inputs, product quadrature: the degree of the kernel
        interpolant. Default: the number of nodes.
    mesh : array_like, optional
        Callable inputs: the mesh breakpoints, strictly increasing from 0 to
        $T$. Required for callable inputs.
    coll_nodes : array_like, optional
        Callable inputs: node positions in $(0, 1]$, e.g.
        ``voles.radau_iia_nodes(3)``. Default ``[1/3, 2/3, 1]``.
    kernel_singularity : float, list, dict or callable, optional
        Callable inputs: where the kernel is weakly singular, in
        $u = t - s$: a location, a list of locations, ``{location: alpha}``
        for $K \sim |u - u_0|^{-\alpha}$ (enables Gauss–Jacobi rules), or
        a callable returning the singular $s$-locations for a time $t$.
    reuse_adaptive_blocks : bool, optional
        Callable inputs: on a uniform mesh, reuse adaptive-quadrature blocks
        across mesh intervals. Default True.

    Returns
    -------
    VolterraSolution
        The solution: ``sol.t`` and ``sol.y`` on the input grid (the samples,
        or the mesh breakpoints), ``sol(t)`` anywhere in $[0, T]$, plus the
        collocation data and coefficients.

    Raises
    ------
    TypeError
        An argument of the wrong type (a float where an integer is needed, a
        non-bool flag, a non-numeric array), or a required one missing.
    ValueError
        A wrong value: shapes that don't fit, an option from the other
        regime, a node set for which the method diverges, NaN or inf in
        the data, too few samples for one mesh interval.
    NotImplementedError
        Mixed callable and sampled inputs, or an uncompiled setting under
        ``quadrature="collocation"`` with no fallback.
    numpy.linalg.LinAlgError
        A collocation system is singular (e.g. $K(0) = 0$).

    Warns
    -----
    AccuracyWarning
        $g(0) \ne 0$; a node set with $\rho = 1$ (one order lower);
        $K(0)$ too small for collocation quadrature; a singularity declared
        on a uniform mesh.
    PerformanceWarning
        The numba fallback is used.

    See Also
    --------
    - [solve_vie2][voles.solve_vie2], [solve_vide][voles.solve_vide]: the other two
      equations.
    - [VolterraSolution][voles.VolterraSolution]: the returned object.
    - [optimal_graded_mesh][voles.optimal_graded_mesh]: a mesh for a weakly singular
      kernel.
    - [radau_iia_nodes][voles.radau_iia_nodes]: node sets for ``coll_nodes``.

    Notes
    -----
    The regime is chosen by the input types: arrays give the sampled regime
    (``dt``, ``coll_setting``, ``quadrature``, ``samples_per_interval``,
    ``kernel_interp_degree`` apply), callables the functional regime
    (``mesh``, ``coll_nodes``, ``kernel_singularity``,
    ``reuse_adaptive_blocks`` apply). An option from the other regime is
    an error. Mixing callable and sampled inputs is not supported yet.

    The discontinuous method converges iff
    $|\rho_m| = \prod_i (1 - c_i)/c_i \le 1$, and the continuous one iff
    $|\rho_{m-1}| \le 1$ with $c_m = 1$ (Brunner 2004, Theorems 2.4.2 and
    2.4.5); $\rho = 1$ costs one order.
    Examples
    --------
    Sampled data: with $K = 1$ and $g(t) = \sin t$ the solution is
    $y = \cos t$.

    >>> import numpy as np
    >>> import voles
    >>> t = np.linspace(0, 2, 201)
    >>> sol = voles.solve_vie1(kernel=np.ones_like(t), g=np.sin(t), dt=t[1])
    >>> sol
    <VolterraSolution vie1, sampled, 22 intervals on [0, 2], degree 2, ...>
    >>> sol.y.shape
    (201,)
    >>> print(f"{sol(1.0):.6f}  {np.cos(1.0):.6f}")
    0.540303  0.540302

    Callables: Abel's equation, $K(u) = u^{-1/2}$ and $g(t) = \pi t / 2$,
    whose solution $y = \sqrt{t}$ has an unbounded derivative at 0. Declare
    the singularity and grade the mesh to match it:

    >>> mesh = voles.optimal_graded_mesh(alpha=0.5, t_end=1.0, n_intervals=16, order=3)
    >>> sol = voles.solve_vie1(kernel=lambda u: u**-0.5, g=lambda t: np.pi / 2 * t,
    ...                        mesh=mesh, kernel_singularity={0.0: 0.5})
    >>> print(f"{sol(0.25):.4f}")
    0.5000
    """
    return _solve("vie1", kernel=kernel, g=g, y0=y0, continuous=continuous, dt=dt,
                  coll_setting=coll_setting, quadrature=quadrature,
                  samples_per_interval=samples_per_interval,
                  kernel_interp_degree=kernel_interp_degree, mesh=mesh, coll_nodes=coll_nodes,
                  kernel_singularity=kernel_singularity,
                  reuse_adaptive_blocks=reuse_adaptive_blocks)


def solve_vie2(*, kernel: Data, g: Optional[Data] = None,
               dt: float = 1.0, coll_setting: CollSetting = None,
               quadrature: Quadrature = "product",
               samples_per_interval: Optional[int] = None,
               kernel_interp_degree: Optional[int] = None,
               mesh: Optional[ArrayLike] = None, coll_nodes: Optional[ArrayLike] = None,
               kernel_singularity: KernelSingularity = None,
               reuse_adaptive_blocks: bool = True) -> VolterraSolution:
    r"""Solve a Volterra integral equation of the second kind.

    $$y(t) = g(t) + \int_0^t K(t-s)\, y(s)\, ds, \qquad 0 \le t \le T$$

    by collocation: on each mesh interval $y$ is a polynomial that satisfies
    the equation at the collocation nodes.

    The inputs are either arrays of samples at $t = 0, dt, 2\,dt, \ldots$
    (the *sampled* regime) or callables (the *functional* regime, solved on
    the breakpoints ``mesh``); see Notes.

    Parameters
    ----------
    kernel : array_like or callable
        $K$. Sampled: shape ``(N,)``, or ``(N, d, d)`` for a system of $d$
        equations, at $u = 0, dt, \ldots, (N-1)\,dt$. Callable: ``kernel(u)``
        returning a scalar or a ``(d, d)`` matrix; it may be vectorised
        over a 1-D ``u``, which is faster.
    g : array_like or callable, optional
        $g$. Sampled: ``(N,)``, ``(N, d)`` or ``(N, d, m)`` for $m$
        right-hand sides. Callable: ``g(t)`` returning a scalar, ``(d,)`` or
        ``(d, m)``. Default zero.
    dt : float, optional
        Sampled inputs: the sample spacing. Default 1.0.
    coll_setting : int or (int, sequence of int), optional
        Sampled inputs: the collocation nodes ``choices / divs`` as
        ``(divs, choices)``, with choices in ``0..divs``, or a bare ``divs``
        meaning every point ``0..divs``. ``divs`` also sets the mesh
        width (see ``samples_per_interval``). Default ``(2, [0, 1, 2])``.
    quadrature : {"product", "collocation"}, optional
        Sampled inputs: how the integrals are evaluated from the samples.
        ``"product"`` (default) integrates a piecewise polynomial
        interpolant of the kernel exactly and accepts any mesh width and
        node set. ``"collocation"`` applies the interpolatory rule on the
        nodes; it is faster but fixes the mesh at ``divs**2`` samples and
        runs only compiled settings (or the numba fallback).
    samples_per_interval : int, optional
        Sampled inputs: samples per mesh interval. A multiple of ``divs``
        with product quadrature (default ``divs``, the finest mesh); must
        be ``divs**2`` with collocation quadrature.
    kernel_interp_degree : int, optional
        Sampled inputs, product quadrature: the degree of the kernel
        interpolant. Default: the number of nodes.
    mesh : array_like, optional
        Callable inputs: the mesh breakpoints, strictly increasing from 0 to
        $T$. Required for callable inputs.
    coll_nodes : array_like, optional
        Callable inputs: node positions in $[0, 1]$, e.g.
        ``voles.gauss_legendre_nodes(3)``. Default ``[0, 1/2, 1]``.
    kernel_singularity : float, list, dict or callable, optional
        Callable inputs: where the kernel is weakly singular, in
        $u = t - s$: a location, a list of locations, ``{location: alpha}``
        for $K \sim |u - u_0|^{-\alpha}$ (enables Gauss–Jacobi rules), or
        a callable returning the singular $s$-locations for a time $t$.
    reuse_adaptive_blocks : bool, optional
        Callable inputs: on a uniform mesh, reuse adaptive-quadrature blocks
        across mesh intervals. Default True.

    Returns
    -------
    VolterraSolution
        The solution: ``sol.t`` and ``sol.y`` on the input grid (the samples,
        or the mesh breakpoints), ``sol(t)`` anywhere in $[0, T]$, plus the
        collocation data and coefficients.

    Raises
    ------
    TypeError
        An argument of the wrong type (a float where an integer is needed, a
        non-bool flag, a non-numeric array), or a required one missing.
    ValueError
        A wrong value: shapes that don't fit, an option from the other
        regime, an invalid node set, NaN or inf in the data, too few
        samples for one mesh interval.
    NotImplementedError
        Mixed callable and sampled inputs, or an uncompiled setting under
        ``quadrature="collocation"`` with no fallback.
    numpy.linalg.LinAlgError
        A collocation system is singular.

    Warns
    -----
    AccuracyWarning
        A singularity declared on a uniform mesh.
    PerformanceWarning
        The numba fallback is used.

    See Also
    --------
    - [solve_vie1][voles.solve_vie1], [solve_vide][voles.solve_vide]: the other two
      equations.
    - [VolterraSolution][voles.VolterraSolution]: the returned object.
    - [optimal_graded_mesh][voles.optimal_graded_mesh]: a mesh for a weakly singular
      kernel.
    - [gauss_legendre_nodes][voles.gauss_legendre_nodes]: node sets for ``coll_nodes``.

    Notes
    -----
    The regime is chosen by the input types: arrays give the sampled regime
    (``dt``, ``coll_setting``, ``quadrature``, ``samples_per_interval``,
    ``kernel_interp_degree`` apply), callables the functional regime
    (``mesh``, ``coll_nodes``, ``kernel_singularity``,
    ``reuse_adaptive_blocks`` apply). An option from the other regime is
    an error. Mixing callable and sampled inputs is not supported yet.
    Examples
    --------
    Sampled data: $y(t) = 1 + \int_0^t y(s)\,ds$ has the solution $e^t$.

    >>> import numpy as np
    >>> import voles
    >>> t = np.linspace(0, 1, 101)
    >>> sol = voles.solve_vie2(kernel=np.ones_like(t), g=np.ones_like(t), dt=t[1])
    >>> sol
    <VolterraSolution vie2, sampled, 50 intervals on [0, 1], degree 2, ...>
    >>> print(f"{sol(1.0):.8f}  {np.e:.8f}")
    2.71828183  2.71828183

    Callables, on a mesh of your choice: $K(u) = e^{-u}$ and $g = 1$ give
    $y = 1 + t$, which the quadratic collocation polynomials represent
    exactly.

    >>> sol = voles.solve_vie2(kernel=lambda u: np.exp(-u), g=lambda t: np.ones_like(t),
    ...                        mesh=np.linspace(0, 1, 11))
    >>> sol.t.shape, sol.node_values.shape
    ((11,), (10, 3))
    >>> print(f"{sol(0.55):.6f}")
    1.550000
    """
    return _solve("vie2", kernel=kernel, g=g, dt=dt, coll_setting=coll_setting,
                  quadrature=quadrature, samples_per_interval=samples_per_interval,
                  kernel_interp_degree=kernel_interp_degree, mesh=mesh, coll_nodes=coll_nodes,
                  kernel_singularity=kernel_singularity,
                  reuse_adaptive_blocks=reuse_adaptive_blocks)


def solve_vide(*, kernel: Data, a: Optional[Data] = None, g: Optional[Data] = None,
               y0: ArrayLike,
               dt: float = 1.0, coll_setting: CollSetting = None,
               quadrature: Quadrature = "product",
               samples_per_interval: Optional[int] = None,
               kernel_interp_degree: Optional[int] = None,
               mesh: Optional[ArrayLike] = None, coll_nodes: Optional[ArrayLike] = None,
               kernel_singularity: KernelSingularity = None,
               reuse_adaptive_blocks: bool = True) -> VolterraSolution:
    r"""Solve a Volterra integro-differential equation.

    $$y'(t) = a(t)\, y(t) + g(t) + \int_0^t K(t-s)\, y(s)\, ds, \qquad y(0) = y_0$$

    by collocation: on each mesh interval $y$ is a polynomial whose
    derivative satisfies the equation at the collocation nodes, continuous
    across the breakpoints.

    The inputs are either arrays of samples at $t = 0, dt, 2\,dt, \ldots$
    (the *sampled* regime) or callables (the *functional* regime, solved on
    the breakpoints ``mesh``); see Notes.

    Parameters
    ----------
    kernel : array_like or callable
        $K$. Sampled: shape ``(N,)``, or ``(N, d, d)`` for a system of $d$
        equations, at $u = 0, dt, \ldots, (N-1)\,dt$. Callable: ``kernel(u)``
        returning a scalar or a ``(d, d)`` matrix; it may be vectorised
        over a 1-D ``u``, which is faster.
    a : array_like or callable, optional
        $a$. Sampled: ``(N,)`` or ``(N, d, d)``. Callable: ``a(t)`` returning
        a scalar or a ``(d, d)`` matrix. Default zero.
    g : array_like or callable, optional
        $g$. Sampled: ``(N,)``, ``(N, d)`` or ``(N, d, m)`` for $m$
        right-hand sides. Callable: ``g(t)`` returning a scalar, ``(d,)`` or
        ``(d, m)``. Default zero.
    y0 : array_like
        $y(0)$: scalar, ``(d,)``, or ``(d, m)`` for $m$ initial values. A
        ``(d,)`` value is shared by all columns of a matrix ``g``, and a
        ``(N, d)`` or ``(d,)``-valued ``g`` by all columns of a ``(d, m)``
        ``y0``.
    dt : float, optional
        Sampled inputs: the sample spacing. Default 1.0.
    coll_setting : int or (int, sequence of int), optional
        Sampled inputs: the collocation nodes ``choices / divs`` as
        ``(divs, choices)``, with choices in ``0..divs``, or a bare ``divs``
        meaning every point ``0..divs``. ``divs`` also sets the mesh
        width (see ``samples_per_interval``). Default ``(2, [0, 1, 2])``.
    quadrature : {"product", "collocation"}, optional
        Sampled inputs: how the integrals are evaluated from the samples.
        ``"product"`` (default) integrates a piecewise polynomial
        interpolant of the kernel exactly and accepts any mesh width and
        node set. ``"collocation"`` applies the interpolatory rule on the
        nodes; it is faster but fixes the mesh at ``divs**2`` samples and
        runs only compiled settings (or the numba fallback).
    samples_per_interval : int, optional
        Sampled inputs: samples per mesh interval. A multiple of ``divs``
        with product quadrature (default ``divs``); must be ``divs**2``
        with collocation quadrature.
    kernel_interp_degree : int, optional
        Sampled inputs, product quadrature: the degree of the kernel
        interpolant. Default: the number of nodes.
    mesh : array_like, optional
        Callable inputs: the mesh breakpoints, strictly increasing from 0 to
        $T$. Required for callable inputs.
    coll_nodes : array_like, optional
        Callable inputs: node positions in $[0, 1]$, e.g.
        ``voles.gauss_legendre_nodes(3)``. Default ``[0, 1/2, 1]``.
    kernel_singularity : float, list, dict or callable, optional
        Callable inputs: where the kernel is weakly singular, in
        $u = t - s$: a location, a list of locations, ``{location: alpha}``
        for $K \sim |u - u_0|^{-\alpha}$ (enables Gauss–Jacobi rules), or
        a callable returning the singular $s$-locations for a time $t$.
    reuse_adaptive_blocks : bool, optional
        Callable inputs: on a uniform mesh, reuse adaptive-quadrature blocks
        across mesh intervals. Default True.

    Returns
    -------
    VolterraSolution
        The solution: ``sol.t`` and ``sol.y`` on the input grid (the samples,
        or the mesh breakpoints), ``sol(t)`` anywhere in $[0, T]$, plus the
        collocation data and coefficients.

    Raises
    ------
    TypeError
        An argument of the wrong type (a float where an integer is needed, a
        non-bool flag, a non-numeric array), or ``y0`` missing.
    ValueError
        A wrong value: shapes that don't fit, an option from the other
        regime, an invalid node set, NaN or inf in the data, too few
        samples for one mesh interval.
    NotImplementedError
        Mixed callable and sampled inputs, or an uncompiled setting under
        ``quadrature="collocation"`` with no fallback.
    numpy.linalg.LinAlgError
        A collocation system is singular.

    Warns
    -----
    AccuracyWarning
        A singularity declared on a uniform mesh.
    PerformanceWarning
        The numba fallback is used.

    See Also
    --------
    - [solve_vie1][voles.solve_vie1], [solve_vie2][voles.solve_vie2]: the other two
      equations.
    - [VolterraSolution][voles.VolterraSolution]: the returned object.
    - [optimal_graded_mesh][voles.optimal_graded_mesh]: a mesh for a weakly singular
      kernel.
    - [gauss_legendre_nodes][voles.gauss_legendre_nodes]: node sets for ``coll_nodes``.

    Notes
    -----
    The regime is chosen by the input types: arrays give the sampled regime
    (``dt``, ``coll_setting``, ``quadrature``, ``samples_per_interval``,
    ``kernel_interp_degree`` apply), callables the functional regime
    (``mesh``, ``coll_nodes``, ``kernel_singularity``,
    ``reuse_adaptive_blocks`` apply). An option from the other regime is
    an error. Mixing callable and sampled inputs is not supported yet.
    Examples
    --------
    Sampled data: $y' = \int_0^t y(s)\,ds$ with $y(0) = 1$ is
    $y'' = y$, $y'(0) = 0$, so $y = \cosh t$.

    >>> import numpy as np
    >>> import voles
    >>> t = np.linspace(0, 1, 101)
    >>> sol = voles.solve_vide(kernel=np.ones_like(t), y0=1.0, dt=t[1])
    >>> print(f"{sol(1.0):.8f}  {np.cosh(1.0):.8f}")
    1.54308063  1.54308063

    Callables: $y' = -\int_0^t y(s)\,ds$ with $y(0) = 1$ gives
    $y = \cos t$. The solution is continuous, and its derivative comes from
    `VolterraSolution.to_ppoly`:

    >>> sol = voles.solve_vide(kernel=lambda u: -np.ones_like(u), y0=1.0,
    ...                        mesh=np.linspace(0, np.pi, 21))
    >>> sol.continuous
    True
    >>> print(f"{sol(np.pi / 3):.4f}  {sol.to_ppoly().derivative()(np.pi / 3):.4f}")
    0.5000  -0.8660
    """
    return _solve("vide", kernel=kernel, g=g, a=a, y0=y0, dt=dt, coll_setting=coll_setting,
                  quadrature=quadrature, samples_per_interval=samples_per_interval,
                  kernel_interp_degree=kernel_interp_degree, mesh=mesh, coll_nodes=coll_nodes,
                  kernel_singularity=kernel_singularity,
                  reuse_adaptive_blocks=reuse_adaptive_blocks)
