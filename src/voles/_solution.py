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

    `y(t)` evaluates the piecewise polynomial at scalar or array `t`.

    For scalar problems, `polynomials` is a list of `numpy.polynomial.Polynomial`
    objects, one per mesh interval. For vector problems with d components,
    `polynomials` is a list of object arrays of shape `(d,)`, each entry a
    Polynomial for that component on that interval. For matrix-valued problems
    (m simultaneous right-hand sides) `polynomials` is a list of `(d, m)` object
    arrays.
    """

    def __init__(self, polynomials, mesh_breakpoints, d: int = 0, m: int = 0):
        self.polynomials = polynomials
        self.mesh_breakpoints = np.asarray(mesh_breakpoints)
        # d == 0 marks a scalar problem; d >= 1 marks a vector problem.
        # m >= 1 marks a matrix problem (m right-hand sides); m == 0 otherwise.
        self._d = d
        self._m = m

    def __call__(self, t):
        scalar_input = (np.isscalar(t) or np.ndim(t) == 0)
        t_arr = np.atleast_1d(np.asarray(t, dtype=float))
        bps = self.mesh_breakpoints
        idx = np.searchsorted(bps, t_arr, side='right') - 1
        idx = np.clip(idx, 0, len(self.polynomials) - 1)

        if self._m:
            # Matrix case: each interval has a (d, m) array of polynomials.
            out = np.empty((len(t_arr), self._d, self._m), dtype=float)
            for j, (ti, ii) in enumerate(zip(t_arr, idx)):
                polys_n = self.polynomials[int(ii)]
                for r in range(self._d):
                    for c in range(self._m):
                        out[j, r, c] = polys_n[r, c](ti)
            return out[0] if scalar_input else out

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


class _ComplexSolutionFunction(_SolutionListMixin):
    """Wraps a real-block SolutionFunction so the user sees complex outputs."""

    def __init__(self, real_y_func, d_orig: int):
        self._real = real_y_func
        self._d_orig = d_orig
        # m >= 1 marks a matrix problem; inherited from the real wrapper.
        self._m = getattr(real_y_func, "_m", 0)
        self.mesh_breakpoints = real_y_func.mesh_breakpoints
        # Convert the per-interval (2d,) or (2d, m) polynomial arrays to complex.
        from ._complex import _recombine_polys
        self.polynomials = _recombine_polys(real_y_func.polynomials, d_orig)

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
