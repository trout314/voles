"""Callable solution-function wrappers shared by the array-based and
callable-input solver families.

Both families, when asked for more than the raw collocation values, return one of
these objects as the second element of a ``(values, solution)`` tuple. The object
is callable -- ``solution(t)`` evaluates the piecewise polynomial at scalar or
array ``t`` -- and also behaves like the old plain ``list`` of per-interval
polynomials (it supports ``len()``, indexing, and iteration via
``.polynomials``) so code written against the previous list return keeps working.
"""
from __future__ import annotations

import numpy as np


def _polys_from_unit_coefs(unit_coefs, edges, trim):
    """Per-interval ``numpy.polynomial.Polynomial`` objects on the time axis.

    ``unit_coefs[n]`` has shape ``(P,)``, ``(P, d)`` or ``(P, d, m)``: monomial
    coefficients in the local variable ``x = (t - edges[n]) / (edges[n+1] -
    edges[n])`` on interval n, for each component. Returns a list of M
    Polynomials (scalar) or ``(d,)`` / ``(d, m)`` object arrays of them.

    Building these costs one ``Polynomial.convert`` per interval and
    component -- orders of magnitude more than the solve itself -- so
    ``_SolutionFunction`` calls this only when ``.polynomials`` is first
    accessed; evaluation does not need it.
    """
    unit_coefs = np.asarray(unit_coefs)
    comp_shape = unit_coefs.shape[2:]
    polys = []
    for n in range(unit_coefs.shape[0]):
        domain = (edges[n], edges[n + 1])
        if not comp_shape:
            poly = np.polynomial.Polynomial(unit_coefs[n], domain=domain,
                                            window=(0.0, 1.0), symbol='t')
            poly = poly.convert(domain=domain, window=domain)
            polys.append(poly.trim() if trim else poly)
            continue
        arr = np.empty(comp_shape, dtype=object)
        for idx in np.ndindex(comp_shape):
            poly = np.polynomial.Polynomial(unit_coefs[(n, slice(None)) + idx],
                                            domain=domain, window=(0.0, 1.0),
                                            symbol='t')
            poly = poly.convert(domain=domain, window=domain)
            arr[idx] = poly.trim() if trim else poly
        polys.append(arr)
    return polys


class _SolutionListMixin:
    """List-like access delegating to ``.polynomials``.

    Preserves backward compatibility with the previous return value, which was a
    plain list of per-interval polynomials: ``len(sol)``, ``sol[n]``, and
    iteration all operate on ``self.polynomials``.
    """

    def __len__(self):
        return len(self.polynomials)

    def __getitem__(self, index):
        return self.polynomials[index]

    def __iter__(self):
        return iter(self.polynomials)


class _SolutionFunction(_SolutionListMixin):
    """Callable wrapping the per-interval Lagrange polynomials.

    `y(t)` evaluates the piecewise polynomial at scalar or array `t`; points
    outside ``[mesh_breakpoints[0], mesh_breakpoints[-1]]`` give NaN.
    Construct via `from_unit_coefs`; the `polynomials` list described below
    is built lazily on first access.

    For scalar problems, `polynomials` is a list of `numpy.polynomial.Polynomial`
    objects, one per mesh interval. For vector problems with d components,
    `polynomials` is a list of object arrays of shape `(d,)`, each entry a
    Polynomial for that component on that interval. For matrix-valued problems
    (m simultaneous right-hand sides) `polynomials` is a list of `(d, m)` object
    arrays.
    """

    def __init__(self, polynomials, mesh_breakpoints, d: int = 0, m: int = 0):
        self._polys = polynomials
        self._unit = None
        self.mesh_breakpoints = np.asarray(mesh_breakpoints)
        # d == 0 marks a scalar problem; d >= 1 marks a vector problem.
        # m >= 1 marks a matrix problem (m right-hand sides); m == 0 otherwise.
        self._d = d
        self._m = m

    @classmethod
    def from_unit_coefs(cls, unit_coefs, mesh_breakpoints, d: int = 0,
                        m: int = 0, edges=None, trim: bool = True):
        """Solution backed by per-interval local monomial coefficients
        (see `_polys_from_unit_coefs`; ``edges`` are the interval ends the
        coefficients are relative to, default ``mesh_breakpoints``).

        ``__call__`` evaluates straight from these coefficients, vectorized
        over ``t``; the ``Polynomial`` list is built only if ``.polynomials``
        (or indexing / iteration) is used.
        """
        self = cls(None, mesh_breakpoints, d=d, m=m)
        self._unit = np.asarray(unit_coefs, dtype=float)
        self._edges = np.asarray(self.mesh_breakpoints if edges is None else edges,
                                 dtype=float)
        self._trim = trim
        return self

    @property
    def polynomials(self):
        if self._polys is None:
            self._polys = _polys_from_unit_coefs(self._unit, self._edges, self._trim)
        return self._polys

    def __len__(self):
        return len(self._unit)

    def __call__(self, t):
        scalar_input = (np.isscalar(t) or np.ndim(t) == 0)
        t_arr = np.atleast_1d(np.asarray(t, dtype=float))
        out = self._evaluate(t_arr)
        # The solution is only defined on [t_0, t_M]: extrapolating the end
        # polynomials gave plausible-looking but meaningless values, so
        # points outside (beyond a rounding-level tolerance) evaluate to NaN.
        bps = self.mesh_breakpoints
        tol = 1e-12 * max(1.0, float(np.max(np.abs(bps))))
        outside = (t_arr < bps[0] - tol) | (t_arr > bps[-1] + tol)
        if outside.any():
            out[outside] = np.nan
        if scalar_input:
            return float(out[0]) if self._d == 0 else out[0]
        return out

    def _evaluate(self, t_arr):
        bps = self.mesh_breakpoints
        idx = np.searchsorted(bps, t_arr, side='right') - 1
        idx = np.clip(idx, 0, len(self) - 1)

        # Horner in the local variable of each point's interval, all points
        # at once. Evaluating in the local variable also avoids the
        # cancellation of the absolute-time monomial form, whose coefficients
        # grow like (t / h)^degree.
        e = self._edges
        x = (t_arr - e[idx]) / (e[idx + 1] - e[idx])
        c = self._unit[idx]                  # (T, P, *comp), a copy
        x = x.reshape(x.shape + (1,) * (c.ndim - 2))
        out = c[:, -1]
        for k in range(c.shape[1] - 2, -1, -1):
            out = out * x + c[:, k]
        return out


class _ComplexSolutionFunction(_SolutionListMixin):
    """Wraps a real-block SolutionFunction so the user sees complex outputs."""

    def __init__(self, real_y_func, d_orig: int):
        self._real = real_y_func
        self._d_orig = d_orig
        # m >= 1 marks a matrix problem; inherited from the real wrapper.
        self._m = getattr(real_y_func, "_m", 0)
        self.mesh_breakpoints = real_y_func.mesh_breakpoints
        self._polys = None

    @property
    def polynomials(self):
        # Convert the per-interval (2d,) or (2d, m) polynomial arrays to
        # complex, on first use (see _SolutionFunction.polynomials).
        if self._polys is None:
            from ._complex import _recombine_polys
            self._polys = _recombine_polys(self._real.polynomials, self._d_orig)
        return self._polys

    def __len__(self):
        return len(self._real)

    def __call__(self, t):
        val = self._real(t)
        scalar_input = (np.isscalar(t) or np.ndim(t) == 0)
        if self._d_orig == 0:
            # real returns shape (2,) for scalar t or (n, 2) for array t
            if scalar_input:
                return complex(val[0], val[1])
            return val[..., 0] + 1j * val[..., 1]
        d = self._d_orig
        if self._m:
            # matrix: real returns (2d, m) for scalar t or (n, 2d, m) for array t;
            # the component axis is -2.
            if scalar_input:
                return val[:d, :] + 1j * val[d:, :]
            return val[..., :d, :] + 1j * val[..., d:, :]
        # vector: real returns (2*d,) for scalar t or (n, 2*d) for array t
        if scalar_input:
            return val[:d] + 1j * val[d:]
        return val[..., :d] + 1j * val[..., d:]
