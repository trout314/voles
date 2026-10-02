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


def _polys_from_unit_coefs(unit_coefs, bps, trim):
    """Per-interval ``numpy.polynomial.Polynomial`` objects on the time axis.

    ``unit_coefs[n]`` has shape ``(P,)``, ``(P, d)`` or ``(P, d, m)``: monomial
    coefficients in the local variable ``x = (t - bps[n]) / (bps[n+1] -
    bps[n])`` on interval n, for each component. Returns a list of M
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
        domain = (bps[n], bps[n + 1])
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


class _SolutionFunction:
    """Callable wrapping the per-interval Lagrange polynomials.

    `y(t)` evaluates the piecewise polynomial at scalar or array `t`; points
    outside ``[mesh_breakpoints[0], mesh_breakpoints[-1]]`` give NaN.
    Constructed from per-interval local monomial coefficients, real or
    complex (see `_polys_from_unit_coefs`); the `polynomials` list described
    below is built lazily on first access. ``len(sol)``, ``sol[n]`` and
    iteration operate on that list, as the previous plain-list return did.

    For scalar problems, `polynomials` is a list of `numpy.polynomial.Polynomial`
    objects, one per mesh interval. For vector problems with d components,
    `polynomials` is a list of object arrays of shape `(d,)`, each entry a
    Polynomial for that component on that interval. For matrix-valued problems
    (m simultaneous right-hand sides) `polynomials` is a list of `(d, m)` object
    arrays.
    """

    def __init__(self, unit_coefs, mesh_breakpoints, d: int = 0, m: int = 0,
                 trim: bool = True):
        """``unit_coefs[n]`` holds the local monomial coefficients of
        interval n (shape ``(P,)``, ``(P, d)`` or ``(P, d, m)``) in the local
        variable ``(t - mesh_breakpoints[n]) / (mesh_breakpoints[n+1] -
        mesh_breakpoints[n])``.

        ``__call__`` evaluates straight from these coefficients, vectorized
        over ``t``; the ``Polynomial`` list is built only if ``.polynomials``
        (or indexing / iteration) is used.
        """
        self._unit = np.asarray(unit_coefs)
        if not np.issubdtype(self._unit.dtype, np.number):
            raise TypeError(
                "_SolutionFunction takes a numeric coefficient array, got dtype "
                f"{self._unit.dtype}")
        if not np.issubdtype(self._unit.dtype, np.complexfloating):
            self._unit = self._unit.astype(float)
        if self._unit.ndim < 2:
            raise TypeError(
                "_SolutionFunction takes per-interval coefficient arrays "
                f"(M, P[, d[, m]]), got shape {self._unit.shape}")
        self.mesh_breakpoints = np.asarray(mesh_breakpoints, dtype=float)
        if len(self._unit) != len(self.mesh_breakpoints) - 1:
            raise ValueError(
                f"{len(self._unit)} coefficient blocks for "
                f"{len(self.mesh_breakpoints) - 1} mesh intervals")
        self._trim = trim
        self._polys = None
        # d == 0 marks a scalar problem; d >= 1 marks a vector problem.
        # m >= 1 marks a matrix problem (m right-hand sides); m == 0 otherwise.
        self._d = d
        self._m = m

    # Kept as the name the call sites use; same signature as __init__.
    from_unit_coefs = classmethod(lambda cls, *a, **k: cls(*a, **k))

    @property
    def polynomials(self):
        if self._polys is None:
            self._polys = _polys_from_unit_coefs(self._unit, self.mesh_breakpoints, self._trim)
        return self._polys

    def __len__(self):
        return len(self._unit)

    def __getitem__(self, index):
        return self.polynomials[index]

    def __iter__(self):
        return iter(self.polynomials)

    def __call__(self, t):
        scalar_input = (np.isscalar(t) or np.ndim(t) == 0)
        t_arr = np.atleast_1d(np.asarray(t, dtype=float))
        out = self._evaluate(t_arr)
        # The solution is only defined on [t_0, t_M]: extrapolating the end
        # polynomials gave plausible-looking but meaningless values, so
        # points outside (beyond a rounding-level tolerance) evaluate to NaN.
        bps = self.mesh_breakpoints
        # Tolerance relative to the solved interval (not an absolute floor,
        # which would swamp a short interval such as [0, 1e-9]), but never
        # below a few ulps of the endpoints so an exactly computed T passes.
        tol = max(1e-12 * float(bps[-1] - bps[0]),
                  4.0 * float(np.spacing(np.max(np.abs(bps)))))
        outside = (t_arr < bps[0] - tol) | (t_arr > bps[-1] + tol)
        if outside.any():
            out[outside] = np.nan
        if scalar_input:
            return out[0].item() if self._d == 0 else out[0]   # Python float / complex
        return out

    def _evaluate(self, t_arr):
        bps = self.mesh_breakpoints
        idx = np.searchsorted(bps, t_arr, side='right') - 1
        idx = np.clip(idx, 0, len(self) - 1)

        # Horner in the local variable of each point's interval, all points
        # at once. Evaluating in the local variable also avoids the
        # cancellation of the absolute-time monomial form, whose coefficients
        # grow like (t / h)^degree.
        x = (t_arr - bps[idx]) / (bps[idx + 1] - bps[idx])
        c = self._unit[idx]                  # (T, P, *comp), a copy
        x = x.reshape(x.shape + (1,) * (c.ndim - 2))
        out = c[:, -1]
        for k in range(c.shape[1] - 2, -1, -1):
            out = out * x + c[:, k]
        return out


def _complex_solution(real, d_orig: int):
    """The complex-valued solution behind a real-block one.

    The complex solvers run the real solvers on the block form of the
    problem (real and imaginary parts stacked along the component axis), so
    ``real`` has 2 components for a complex scalar problem and 2d for a
    complex d-vector one. Recombining its coefficients gives an ordinary
    `_SolutionFunction` with complex coefficients: the Horner evaluation,
    the lazy Polynomial objects and the list protocol all work unchanged
    on complex arrays, and a scalar ``t`` returns a Python complex."""
    unit = real._unit
    if d_orig == 0:
        unit_c = unit[:, :, 0] + 1j * unit[:, :, 1]
    else:
        unit_c = unit[:, :, :d_orig] + 1j * unit[:, :, d_orig:]
    return _SolutionFunction(unit_c, real.mesh_breakpoints, d=d_orig, m=real._m,
                             trim=real._trim)
