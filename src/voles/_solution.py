"""Solution objects.

`VolterraSolution` is the 1.0 return type of every solver (contract §8): a
piecewise polynomial on the mesh together with the values on the grid the
problem was posed on, the collocation data and the method's metadata.

`_Pieces` is what the engines return: the coefficients and the mesh.
"""
from __future__ import annotations

from typing import TYPE_CHECKING, List, Literal, Optional, Tuple, Union

import numpy as np
from numpy.typing import ArrayLike

if TYPE_CHECKING:
    from scipy.interpolate import PPoly

from . import _validate as _v


class _Pieces:
    """What an engine hands to the `VolterraSolution` builders: the
    per-interval local monomial coefficients ``_unit`` (``(M, P)``,
    ``(M, P, d)`` or ``(M, P, d, m)``, in the local variable on [0, 1] of
    each interval), the ``mesh_breakpoints``, and the component counts
    (``_d = 0`` scalar, ``_m = 0`` not matrix-valued). Real coefficients are
    stored as float64, complex ones as they come."""

    __slots__ = ("_unit", "mesh_breakpoints", "_d", "_m")

    def __init__(self, unit_coefs, mesh_breakpoints, d=0, m=0):
        unit = np.asarray(unit_coefs)
        if not np.issubdtype(unit.dtype, np.complexfloating):
            unit = unit.astype(float)
        self._unit = unit
        self.mesh_breakpoints = np.asarray(mesh_breakpoints, dtype=float)
        if len(unit) != len(self.mesh_breakpoints) - 1:
            raise RuntimeError(
                f"internal error: {len(unit)} coefficient blocks for "
                f"{len(self.mesh_breakpoints) - 1} mesh intervals. This is a bug in voles; "
                f"please report it.")
        self._d = d
        self._m = m

    from_unit_coefs = classmethod(lambda cls, *a, **k: cls(*a, **k))


def _complex_solution(real, d_orig: int):
    """The complex-valued pieces behind a real-block solve.

    The complex solvers run the real solvers on the block form of the
    problem (real and imaginary parts stacked along the component axis), so
    ``real`` has 2 components for a complex scalar problem and 2d for a
    complex d-vector one. Recombining its coefficients gives the complex
    solution's coefficients."""
    unit = real._unit
    if d_orig == 0:
        unit_c = unit[:, :, 0] + 1j * unit[:, :, 1]
    else:
        unit_c = unit[:, :, :d_orig] + 1j * unit[:, :, d_orig:]
    return _Pieces(unit_c, real.mesh_breakpoints, d=d_orig, m=real._m)


# ===========================================================================
# VolterraSolution (1.0)
# ===========================================================================

_AT_BREAKPOINTS = ("mean", "left", "right")
_EQUATIONS = ("vie1", "vie2", "vide")
_REGIMES = ("sampled", "functional")


def _read_only(a, dtype=None, copy=True):
    """``a`` as a read-only array. ``copy=False`` is for arrays the caller
    owns outright (built by voles for this solution): it marks them in place
    instead of copying. Anything that may alias user data (the mesh, which
    the engine takes with np.asarray) must be copied."""
    a = np.array(a, dtype=dtype) if copy else np.asarray(a, dtype=dtype)
    a.setflags(write=False)
    return a


class VolterraSolution:
    r"""The solution of a Volterra equation, as returned by the solvers.

    A piecewise polynomial on ``mesh`` (continuous or discontinuous at the
    breakpoints), together with its values on the grid the problem was posed
    on, the collocation data, and a record of the method. Call it to evaluate
    the solution anywhere in ``[0, T]``.

    Users don't construct it; every solver returns one.

    Attributes
    ----------
    t : ndarray, shape (K,)
        The grid the problem was posed on: the sample times ``n * dt`` for
        sampled inputs, the mesh breakpoints for callable inputs. Read-only.
    y : ndarray, shape (K, *shape)
        The solution at ``t``. At an interior breakpoint of a discontinuous
        solution this is the mean of the two one-sided limits, the same
        value ``sol(t)`` gives. Writable; changing it doesn't change the
        solution.
    mesh : ndarray, shape (M + 1,)
        The breakpoints ``0 = t_0 < ... < t_M = T``.
    node_times : ndarray, shape (M, p)
        The collocation times actually used. For sampled inputs the final
        interval may be longer than the others, and its nodes sit on its
        own sample grid, so they can differ from ``mesh[n] + nodes * h_n``.
    node_values : ndarray, shape (M, p, *shape)
        The solution at ``node_times``: the collocation values.
    coefficients : ndarray, shape (M, P, *shape)
        Interval n's polynomial in the local variable
        ``x = (t - mesh[n]) / (mesh[n+1] - mesh[n])`` in ``[0, 1]``, as
        monomial coefficients, lowest degree first.
    nodes : ndarray, shape (p,)
        The nominal node positions in ``[0, 1]``, sorted.
    coll_setting : tuple or None
        ``(divs, choices)`` for sampled inputs, ``None`` for callable inputs.
    dt, samples_per_interval, quadrature : float, int, str or None
        For sampled inputs: the sample spacing, the mesh width in samples, and
        ``"product"`` or ``"collocation"``. ``None`` for callable inputs.
    equation : {"vie1", "vie2", "vide"}
    regime : {"sampled", "functional"}
    continuous : bool
        Whether the solution space is continuous across breakpoints (VIDE,
        and VIE-1 with ``continuous=True``).

    Here ``shape`` is ``()`` for scalar problems, ``(d,)`` for vector
    problems and ``(d, m)`` for m right-hand sides. The dtype is complex for
    complex problems.

    See Also
    --------
    - [solve_vie1][voles.solve_vie1], [solve_vie2][voles.solve_vie2],
      [solve_vide][voles.solve_vide]: the solvers that return it.
    - [to_ppoly][voles.VolterraSolution.to_ppoly]: derivatives, integrals and roots.

    Examples
    --------
    $g(t) = \int_0^t e^{-(t-s)} y(s)\,ds$ with $g = \sin t$ has the solution
    $y = \cos t + \sin t$. Solve it on four intervals:

    >>> import numpy as np
    >>> import voles
    >>> sol = voles.solve_vie1(kernel=lambda u: np.exp(-u), g=np.sin,
    ...                        mesh=np.linspace(0, 1, 5))
    >>> sol.mesh
    array([0.  , 0.25, 0.5 , 0.75, 1.  ])
    >>> sol.coefficients.shape, sol.node_times.shape
    ((4, 3), (4, 3))

    Evaluate anywhere in $[0, T]$; outside it the result is NaN:

    >>> print(f"{sol(0.3):.5f}  {np.cos(0.3) + np.sin(0.3):.5f}")
    1.25088  1.25086
    >>> sol(1.5)
    nan

    This (discontinuous) solution has two one-sided limits at each interior
    breakpoint; ``sol(t)`` gives their mean unless asked otherwise:

    >>> for side in ("left", "mean", "right"):
    ...     print(side, f"{sol(0.5, at_breakpoints=side):.5f}")
    left 1.35708
    mean 1.35703
    right 1.35697

    Integrals and derivatives through `scipy.interpolate.PPoly`:

    >>> print(f"{sol.to_ppoly().integrate(0, 1):.6f}  {np.sin(1) - np.cos(1) + 1:.6f}")
    1.301168  1.301169
    """

    equation: Literal["vie1", "vie2", "vide"]
    regime: Literal["sampled", "functional"]
    continuous: bool
    coll_setting: Optional[Tuple[int, List[int]]]
    # State set by `_build` (and restored by unpickling).
    _coef: np.ndarray
    _mesh: np.ndarray
    _nodes: np.ndarray
    _local_nodes: Optional[np.ndarray]
    _node_times: Optional[np.ndarray]
    _node_values: Optional[np.ndarray]
    _node_layout: Optional[tuple]
    _y: Optional[np.ndarray]
    _t: Optional[np.ndarray]
    _dt: Optional[float]
    _n: Optional[int]
    _Q: Optional[int]
    _quadrature: Optional[str]
    _d: int
    _m: int

    def __init__(self, *args, **kwargs):
        raise TypeError("VolterraSolution objects are returned by the solvers; "
                        "they are not constructed directly")

    # ------------------------------------------------------------ building

    @classmethod
    def _build(cls, *, coefficients, mesh, nodes, equation, regime, continuous, d, m,
               local_nodes=None, node_times=None, node_layout=None, coll_setting=None,
               y=None, node_values=None, dt=None, n_samples=None, copy_mesh=True,
               samples_per_interval=None, quadrature=None):
        """The solvers' constructor.

        ``local_nodes`` (M, p): each interval's node positions in its local
        variable, which `node_values` evaluates at when the solver hasn't
        supplied them; ``node_times`` (M, p) the times. Instead of both, the
        sampled builder passes ``node_layout`` (a tuple for `_sampled_layout`),
        and they are computed on first access. Sampled regime: ``y`` (the
        values on the sample grid), ``dt`` and ``n_samples`` are required.
        Functional regime: ``y`` is computed on first access, at the
        breakpoints. ``copy_mesh=False`` is for a mesh voles built itself."""
        if equation not in _EQUATIONS or regime not in _REGIMES:
            raise ValueError(f"bad equation/regime {equation!r}/{regime!r}")
        self = cls.__new__(cls)
        coef = np.asarray(coefficients)
        if not np.issubdtype(coef.dtype, np.complexfloating):
            coef = coef.astype(float, copy=False)
        self._coef = _read_only(coef, copy=False)          # computed by the engine
        self._mesh = _read_only(mesh, dtype=float, copy=copy_mesh)   # may alias user data
        M = len(self._mesh) - 1
        if self._coef.shape[0] != M or M < 1:
            raise ValueError(f"{self._coef.shape[0]} coefficient blocks for {M} mesh intervals")
        self._node_layout = node_layout
        if node_layout is None:
            self._set_node_arrays(local_nodes, node_times)
        else:
            self._local_nodes = self._node_times = None
        self._nodes = _read_only(np.sort(np.asarray(nodes, dtype=float)))
        self._node_values = (None if node_values is None
                             else _read_only(node_values, copy=False))   # engine output
        self.equation = equation
        self.regime = regime
        self.continuous = bool(continuous)
        self.coll_setting = (None if coll_setting is None
                             else (int(coll_setting[0]), [int(c) for c in coll_setting[1]]))
        self._d, self._m = int(d), int(m)
        if regime == "sampled":
            if y is None or dt is None or n_samples is None:
                raise ValueError("the sampled regime needs y, dt and n_samples")
            self._y = np.asarray(y)
            self._dt, self._n = float(dt), int(n_samples)
            self._Q = None if samples_per_interval is None else int(samples_per_interval)
            self._quadrature = quadrature
        else:
            self._y = None if y is None else np.asarray(y)
            self._dt = self._n = self._Q = self._quadrature = None
        self._t = None
        return self

    def __getstate__(self):
        state = self.__dict__.copy()
        state["_t"] = None               # rebuilt on demand
        return state

    def __setstate__(self, state):
        self.__dict__.update(state)
        # numpy doesn't keep the read-only flag through pickle or deepcopy
        for name in ("_coef", "_mesh", "_local_nodes", "_node_times", "_nodes", "_node_values"):
            if state.get(name) is not None:
                state[name].setflags(write=False)

    # ------------------------------------------------------------ attributes

    @property
    def mesh(self) -> np.ndarray:
        return self._mesh

    @property
    def coefficients(self) -> np.ndarray:
        return self._coef

    def _set_node_arrays(self, local_nodes, node_times):
        self._local_nodes = _read_only(local_nodes, dtype=float, copy=False)
        self._node_times = _read_only(node_times, dtype=float, copy=False)
        if (self._local_nodes.shape != self._node_times.shape
                or self._node_times.shape[0] != len(self._mesh) - 1):
            raise ValueError("node arrays must have shape (M, p)")

    def _nodes_local_and_times(self) -> Tuple[np.ndarray, np.ndarray]:
        if self._local_nodes is None or self._node_times is None:
            assert self._node_layout is not None
            self._set_node_arrays(*_sampled_layout(*self._node_layout))
        assert self._local_nodes is not None and self._node_times is not None
        return self._local_nodes, self._node_times

    @property
    def node_times(self) -> np.ndarray:
        return self._nodes_local_and_times()[1]

    @property
    def nodes(self) -> np.ndarray:
        return self._nodes

    # Sampled-regime settings (None for callable inputs). getattr: a 0.11.0
    # pickle has no _Q / _quadrature.
    @property
    def dt(self) -> Optional[float]:
        return self._dt

    @property
    def samples_per_interval(self) -> Optional[int]:
        return getattr(self, "_Q", None)

    @property
    def quadrature(self) -> Optional[str]:
        return getattr(self, "_quadrature", None)

    @property
    def t(self) -> np.ndarray:
        t = self._t
        if t is None:
            if self.regime == "sampled":
                assert self._n is not None and self._dt is not None
                t = _read_only(np.arange(self._n) * self._dt)
            else:
                t = self._mesh
            self._t = t
        return t

    @property
    def y(self) -> np.ndarray:
        y = self._y
        if y is None:                             # functional regime, first access
            y = np.asarray(self(self._mesh))
            self._y = y
        return y

    @property
    def node_values(self) -> np.ndarray:
        nv = self._node_values
        if nv is None:
            x = self._nodes_local_and_times()[0]                # (M, p)
            c = self._coef                                      # (M, P, *cs)
            extra = (1,) * (c.ndim - 2)
            xb = x.reshape(x.shape + extra)
            out = np.broadcast_to(c[:, -1][:, None], x.shape + c.shape[2:])
            for k in range(c.shape[1] - 2, -1, -1):
                out = out * xb + c[:, k][:, None]
            nv = self._node_values = _read_only(out)
        return nv

    @property
    def _shape(self):
        return self._coef.shape[2:]

    # ------------------------------------------------------------ evaluation

    def _horner(self, idx, x):
        """Interval ``idx[i]``'s polynomial at local ``x[i]``, without
        gathering an (n, P, *shape) copy of the coefficients."""
        c = self._coef
        xb = x.reshape(x.shape + (1,) * (c.ndim - 2))
        out = c[idx, -1]                  # a fresh gather, so updating in place is safe
        for k in range(c.shape[1] - 2, -1, -1):
            out *= xb                     # same operations as out = out * x + c_k
            out += c[idx, k]
        return out

    def __call__(self, t: ArrayLike, *,
                 at_breakpoints: Literal["mean", "left", "right"] = "mean"
                 ) -> Union[float, complex, np.ndarray]:
        """Evaluate the solution at ``t`` (scalar or array).

        Parameters
        ----------
        t : float or array_like
            Times in ``[0, T]``. Points outside (beyond a rounding-level
            tolerance) give NaN; the solution is never extrapolated.
        at_breakpoints : {"mean", "left", "right"}, optional
            The value at an interior breakpoint, where a discontinuous
            solution has two one-sided limits: their mean (default), the
            limit from the left, or from the right. A point within a few
            ulps of a breakpoint counts as that breakpoint. For a continuous
            solution the three agree to rounding.

        Returns
        -------
        float, complex or ndarray
            A scalar ``t`` gives a Python float or complex for scalar problems
            and an array of shape ``shape`` otherwise; an array ``t`` gives an
            array of shape ``t.shape + shape``.
        """
        mode = _v.choice("at_breakpoints", at_breakpoints, _AT_BREAKPOINTS)
        scalar_input = np.ndim(t) == 0
        t_arr = np.asarray(t, dtype=float)
        tf = t_arr.ravel()
        bps = self._mesh
        M = len(bps) - 1
        idx = np.clip(np.searchsorted(bps, tf, side="right") - 1, 0, M - 1)
        x = (tf - bps[idx]) / (bps[idx + 1] - bps[idx])
        out = self._horner(idx, x)
        if M > 1 and tf.size:
            interior = bps[1:-1]
            tol = 4.0 * np.spacing(np.abs(interior))
            j = np.searchsorted(interior, tf)
            lo, hi = np.clip(j - 1, 0, M - 2), np.clip(j, 0, M - 2)
            hit_hi = np.abs(tf - interior[hi]) <= tol[hi]
            hit_lo = np.abs(tf - interior[lo]) <= tol[lo]
            at = hit_hi | hit_lo
            if at.any():
                k = np.where(hit_hi, hi, lo)[at] + 1          # interval to the right
                n = k.size
                left = self._horner(k - 1, np.ones(n))
                right = self._horner(k, np.zeros(n))
                out = np.array(out, copy=True)
                out[at] = (0.5 * (left + right) if mode == "mean"
                           else left if mode == "left" else right)
        # Defined on [t_0, t_M] only. The tolerance is relative to the solved
        # interval, but never below a few ulps of the endpoints, so an exactly
        # computed T passes.
        tol_end = max(1e-12 * float(bps[-1] - bps[0]),
                      4.0 * float(np.spacing(np.max(np.abs(bps)))))
        outside = (tf < bps[0] - tol_end) | (tf > bps[-1] + tol_end)
        if outside.any():
            out = np.array(out, copy=True)
            out[outside] = np.nan
        if scalar_input:
            v = out[0]
            return v.item() if not self._shape else v
        return out.reshape(t_arr.shape + self._shape)

    def to_ppoly(self) -> PPoly:
        """The solution as a `scipy.interpolate.PPoly`.

        Useful for derivatives (``.derivative()``), antiderivatives and
        integrals (``.antiderivative()``, ``.integrate(a, b)``) and roots.
        The trailing axes are the problem's ``shape``. PPoly is
        right-continuous at breakpoints (it uses the right-hand interval's
        polynomial there), and returns NaN outside ``[0, T]``.
        """
        from scipy.interpolate import PPoly
        c = self._coef
        h = np.diff(self._mesh)
        P = c.shape[1]
        scale = h[:, None] ** -np.arange(P)[None, :]             # (M, P): 1 / h^k
        scaled = c * scale.reshape(scale.shape + (1,) * (c.ndim - 2))
        pc = np.ascontiguousarray(np.moveaxis(scaled, 1, 0)[::-1])   # (P, M, *shape)
        # Copies: scipy's Cython routines (antiderivative, roots) need writable
        # buffers, and the solution's arrays are read-only.
        return PPoly(pc, np.array(self._mesh), extrapolate=False)

    def __repr__(self) -> str:
        M = len(self._mesh) - 1
        nodes = (f"coll_setting={self.coll_setting}" if self.coll_setting is not None
                 else "coll_nodes=[" + ", ".join(f"{c:.4g}" for c in self._nodes) + "]")
        if self.samples_per_interval is not None:
            nodes += f", samples_per_interval={self.samples_per_interval}, {self.quadrature}"
        shape = f", shape={self._shape}" if self._shape else ""
        return (f"<VolterraSolution {self.equation}, {self.regime}, {M} intervals on "
                f"[0, {self._mesh[-1]:.6g}], degree {self._coef.shape[1] - 1}, {nodes}"
                f"{shape}, {self._coef.dtype}>")


# ---------------------------------------------------------------------------
# Builders from the engines' output: values (sampled) or node values
# (functional) plus the engine's `_Pieces`. Used by
# `_sampled.solve` and `_functional.solve`, which supply the metadata.
# ---------------------------------------------------------------------------

def _from_sampled_engine(values, legacy, *, equation, continuous, coll_setting,
                         samples_per_interval, dt, quadrature=None):
    """`VolterraSolution` from the sampled engine's ``(values,
    _Pieces)`` pair, given the resolved setting and mesh width."""
    divs, choices = coll_setting[0], sorted(int(c) for c in coll_setting[1])
    N = len(values)
    # The engine builds its mesh from the sample count (never the user's
    # array), so it needs no defensive copy. The node arrays are built on
    # first access: most callers never look at them.
    return VolterraSolution._build(
        coefficients=legacy._unit, mesh=legacy.mesh_breakpoints, copy_mesh=False,
        node_layout=(tuple(choices), int(divs), int(samples_per_interval), N, float(dt)),
        nodes=np.array(choices) / divs,
        equation=equation, regime="sampled", continuous=continuous, d=legacy._d,
        m=legacy._m, coll_setting=(divs, choices), y=values, dt=dt, n_samples=N,
        samples_per_interval=int(samples_per_interval), quadrature=quadrature)


def _sampled_layout(choices, divs, Q, N, dt):
    """``(local_nodes, node_times)`` of the sampled mesh: Q samples per regular
    interval, with the leftover samples absorbed by a longer final interval
    whose nodes are snapped to its own sample grid."""
    from ._product import mesh_split, snap_nodes
    M_reg, Qp = mesh_split(N, Q)
    ch = np.array(choices)
    M = M_reg + (1 if Qp else 0)
    local = np.empty((M, len(choices)))
    sample_idx = np.empty((M, len(choices)), dtype=np.int64)
    local[:M_reg] = ch / divs
    sample_idx[:M_reg] = np.arange(M_reg)[:, None] * Q + (ch * Q // divs)[None, :]
    if Qp:
        kap = np.array(snap_nodes(list(choices), divs, Qp))
        local[M_reg] = kap / Qp
        sample_idx[M_reg] = M_reg * Q + kap
    return local, sample_idx * dt


def _from_functional_engine(node_values, legacy, *, equation, continuous, node_pos):
    """`VolterraSolution` from the callable engine's ``(node_values,
    _Pieces)`` pair and the node positions it was solved with."""
    mesh = np.asarray(legacy.mesh_breakpoints, dtype=float)
    node_pos = np.asarray(node_pos, dtype=float)
    widths = np.diff(mesh)
    node_times = mesh[:-1, None] + node_pos[None, :] * widths[:, None]   # as the solver samples g
    return VolterraSolution._build(
        coefficients=legacy._unit, mesh=mesh,
        local_nodes=np.broadcast_to(node_pos, node_times.shape), node_times=node_times,
        nodes=node_pos, equation=equation, regime="functional", continuous=continuous,
        d=legacy._d, m=legacy._m, node_values=node_values)
