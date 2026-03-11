"""Complex-to-real decomposition helpers for Volterra solvers.

A complex-valued Volterra equation with d-dimensional unknowns is equivalent
to a 2d-dimensional real system via the block-matrix identity:

    K_complex (d×d)  →  [[K_R, -K_I], [K_I, K_R]]  (2d×2d real)

This module provides functions to transform inputs into the doubled-dimension
real system and to recombine the real solution back into complex form.
"""
import numpy as np


def is_complex(*arrays):
    """Return True if any of the given arrays has a complex dtype."""
    return any(np.iscomplexobj(a) for a in arrays if a is not None)


def _block_kernel(K):
    """Convert complex kernel to real block kernel.

    Scalar: (N,) complex → (N, 2, 2) real
    Vector: (N, d, d) complex → (N, 2d, 2d) real
    """
    K = np.asarray(K)
    K_R = K.real
    K_I = K.imag
    if K.ndim == 1:
        # (N,) → (N, 2, 2)
        N = len(K)
        out = np.empty((N, 2, 2))
        out[:, 0, 0] = K_R
        out[:, 0, 1] = -K_I
        out[:, 1, 0] = K_I
        out[:, 1, 1] = K_R
        return out
    else:
        # (N, d, d) → (N, 2d, 2d)
        N, d, _ = K.shape
        out = np.zeros((N, 2 * d, 2 * d))
        out[:, :d, :d] = K_R
        out[:, :d, d:] = -K_I
        out[:, d:, :d] = K_I
        out[:, d:, d:] = K_R
        return out


def _block_a(a):
    """Convert complex a(t) coefficient to real block form.

    Scalar: (N,) complex → (N, 2, 2) real
    Vector: (N, d, d) complex → (N, 2d, 2d) real

    Same block structure as kernel: [[a_R, -a_I], [a_I, a_R]].
    """
    return _block_kernel(a)


def _expand_g(g):
    """Convert complex g to doubled-dimension real g.

    Scalar: (N,) complex → (N, 2) real
    Vector: (N, d) complex → (N, 2d) real
    Matrix: (N, d, m) complex → (N, 2d, m) real  [not 2m — only d doubles]
    """
    g = np.asarray(g)
    g_R = g.real
    g_I = g.imag
    if g.ndim == 1:
        return np.column_stack([g_R, g_I])
    elif g.ndim == 2:
        return np.concatenate([g_R, g_I], axis=1)
    else:
        # (N, d, m) → (N, 2d, m)
        return np.concatenate([g_R, g_I], axis=1)


def _expand_init(init):
    """Convert complex initial value to doubled-dimension real.

    Scalar complex → (2,) real [re, im]
    (d,) complex → (2d,) real
    (d, m) complex → (2d, m) real
    """
    init = np.asarray(init)
    if init.ndim == 0:
        return np.array([init.real, init.imag])
    elif init.ndim == 1:
        return np.concatenate([init.real, init.imag])
    else:
        # (d, m)
        return np.concatenate([init.real, init.imag], axis=0)


def _recombine(soln, d_orig):
    """Extract complex solution from doubled-dimension real solution.

    (N, 2) real → (N,) complex  when d_orig == 0 (scalar)
    (N, 2d) real → (N, d) complex
    (N, 2d, m) real → (N, d, m) complex
    """
    if d_orig == 0:
        # scalar case: (N, 2) → (N,)
        return soln[:, 0] + 1j * soln[:, 1]
    elif soln.ndim == 2:
        return soln[:, :d_orig] + 1j * soln[:, d_orig:]
    else:
        # (N, 2d, m)
        return soln[:, :d_orig, :] + 1j * soln[:, d_orig:, :]


def _recombine_polys(polys, d_orig):
    """Recombine real polynomial pairs into complex polynomials.

    For scalar (d_orig == 0): each element of polys is a (2,) object array
    of Polynomials. Combine into a single complex polynomial.

    For vector (d_orig > 0): each element is a (2d,) object array.
    Combine into (d,) complex polynomials.

    For matrix: each element is a (2d, m) object array.
    Combine into (d, m) complex polynomials.
    """
    out = []
    for poly_arr in polys:
        poly_arr = np.asarray(poly_arr, dtype=object)
        if d_orig == 0:
            # (2,) → scalar complex polynomial
            p_r = poly_arr[0]
            p_i = poly_arr[1]
            # Build complex polynomial from real/imag coefficient arrays
            coefs = np.array(p_r.coef) + 1j * np.array(p_i.coef)
            cp = np.polynomial.Polynomial(coefs, domain=p_r.domain,
                                          window=p_r.window, symbol='t')
            out.append(cp)
        elif poly_arr.ndim == 1:
            # (2d,) → (d,)
            d2 = len(poly_arr)
            d = d_orig
            arr = np.empty(d, dtype=object)
            for r in range(d):
                p_r = poly_arr[r]
                p_i = poly_arr[d + r]
                coefs = np.array(p_r.coef) + 1j * np.array(p_i.coef)
                arr[r] = np.polynomial.Polynomial(coefs, domain=p_r.domain,
                                                  window=p_r.window, symbol='t')
            out.append(arr)
        else:
            # (2d, m) → (d, m)
            d = d_orig
            m = poly_arr.shape[1]
            arr = np.empty((d, m), dtype=object)
            for r in range(d):
                for j in range(m):
                    p_r = poly_arr[r, j]
                    p_i = poly_arr[d + r, j]
                    coefs = np.array(p_r.coef) + 1j * np.array(p_i.coef)
                    arr[r, j] = np.polynomial.Polynomial(
                        coefs, domain=p_r.domain, window=p_r.window, symbol='t')
            out.append(arr)
    return out
