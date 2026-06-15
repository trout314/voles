"""
ctypes loader for the D language extension (libvolterra_dlang.so).

The shared library is a required part of the package.  If it cannot be found
or loaded, ImportError is raised at import time.
"""

import ctypes
import os
import sys

import numpy as np

_lib = None

# ctypes shorthand
_dp = ctypes.POINTER(ctypes.c_double)
_ip = ctypes.POINTER(ctypes.c_int)


def _setup_argtypes() -> None:
    _lib.volterra_have_lapack.restype = ctypes.c_int
    _lib.volterra_have_lapack.argtypes = []

    _lib.function_solve_vie2.restype = ctypes.c_int
    _lib.function_solve_vie2.argtypes = [
        _dp, _dp, ctypes.c_int, ctypes.c_int,  # W, g, M, p
        _dp,                                    # out_y
    ]

    _lib.function_solve_max_p.restype = ctypes.c_int
    _lib.function_solve_max_p.argtypes = []

    _lib.volterra_max_coll_params.restype = ctypes.c_int
    _lib.volterra_max_coll_params.argtypes = []

    _lib.volterra_num_supported_settings.restype = ctypes.c_int
    _lib.volterra_num_supported_settings.argtypes = []

    _lib.volterra_get_supported_settings.restype = None
    _lib.volterra_get_supported_settings.argtypes = [_ip]

    _lib.volterra_solve_vie1_vec.restype = ctypes.c_int
    _lib.volterra_solve_vie1_vec.argtypes = [
        _dp, _dp, ctypes.c_int, ctypes.c_int,  # g_values, kernel_values, n, d
        _dp, ctypes.c_double,                    # soln_init_values (d,), time_step
        ctypes.c_int, _ip, ctypes.c_int,         # coll_divs, coll_choices, num_choices
        ctypes.c_int, ctypes.c_int,              # return_polys, force_continuous
        _dp, _dp, _ip,                           # out_soln, out_poly_coefs, out_mesh_divs
    ]

    _lib.volterra_solve_vie1.restype = ctypes.c_int
    _lib.volterra_solve_vie1.argtypes = [
        _dp, _dp, ctypes.c_int,           # g_values, kernel_values, n
        ctypes.c_double, ctypes.c_double,  # soln_init_value, time_step
        ctypes.c_int, _ip, ctypes.c_int,  # coll_divs, coll_choices, num_choices
        ctypes.c_int, ctypes.c_int,        # return_polys, force_continuous
        _dp, _dp, _ip,                     # out_soln, out_poly_coefs, out_mesh_divs
    ]

    _lib.volterra_solve_vie2_vec.restype = ctypes.c_int
    _lib.volterra_solve_vie2_vec.argtypes = [
        _dp, _dp, ctypes.c_int, ctypes.c_int,  # g_values, kernel_values, n, d
        ctypes.c_double,                         # time_step
        ctypes.c_int, _ip, ctypes.c_int,         # coll_divs, coll_choices, num_choices
        ctypes.c_int,                            # return_polys
        _dp, _dp, _ip,                           # out_soln, out_poly_coefs, out_mesh_divs
    ]

    _lib.volterra_solve_vie2.restype = ctypes.c_int
    _lib.volterra_solve_vie2.argtypes = [
        _dp, _dp, ctypes.c_int,           # g_values, kernel_values, n
        ctypes.c_double, ctypes.c_int,     # time_step, coll_divs
        _ip, ctypes.c_int, ctypes.c_int,  # coll_choices, num_choices, return_polys
        _dp, _dp, _ip,                     # out_soln, out_poly_coefs, out_mesh_divs
    ]

    _lib.volterra_solve_vide_vec.restype = ctypes.c_int
    _lib.volterra_solve_vide_vec.argtypes = [
        _dp, _dp, _dp, ctypes.c_int, ctypes.c_int,  # g, kernel, a, n, d
        _dp,                                          # soln_init_values (length d)
        ctypes.c_double,                              # time_step
        ctypes.c_int, _ip, ctypes.c_int,             # coll_divs, coll_choices, num_choices
        ctypes.c_int,                                # return_polys
        _dp, _dp, _ip,                               # out_soln, out_poly_coefs, out_mesh_divs
    ]

    _lib.volterra_solve_vide.restype = ctypes.c_int
    _lib.volterra_solve_vide.argtypes = [
        _dp, _dp, _dp, ctypes.c_int,          # g_values, kernel_values, a_values, n
        ctypes.c_double, ctypes.c_double,      # soln_init_value, time_step
        ctypes.c_int, _ip, ctypes.c_int,      # coll_divs, coll_choices, num_choices
        ctypes.c_int,                          # return_polys
        _dp, _dp, _ip,                         # out_soln, out_poly_coefs, out_mesh_divs
    ]


def _load() -> None:
    global _lib
    here = os.path.dirname(os.path.abspath(__file__))

    if sys.platform == "win32":
        lib_name = "volterra_dlang.dll"
    elif sys.platform == "darwin":
        lib_name = "volterra_dlang.dylib"
    else:
        lib_name = "volterra_dlang.so"

    candidates = [
        os.path.join(here, lib_name),
        os.path.normpath(os.path.join(here, "..", "..", "..", "dlang", "build", lib_name)),
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                _lib = ctypes.CDLL(path)
                _setup_argtypes()
                return
            except OSError as e:
                raise ImportError(f"Found {lib_name} at {path} but could not load it: {e}") from e
    raise ImportError(
        f"volterra_equation_solvers requires the compiled D extension ({lib_name}). "
        f"Searched: {candidates}. "
        "Install the package from a pre-built wheel or build the extension manually "
        "(see dlang/README or the project documentation)."
    )


_load()


# ---------------------------------------------------------------------------
# Wrapper functions
# ---------------------------------------------------------------------------

def _check_return(ret: int, func_name: str) -> None:
    if ret == 0:
        return
    if ret == 2:
        raise np.linalg.LinAlgError(
            f"{func_name}: singular or nearly singular coefficient matrix"
        )
    raise RuntimeError(f"{func_name} returned error code {ret}")

def solve_vie1_d(g_values, kernel_values, soln_init_value, time_step,
                 coll_divs, coll_choices, return_polys, force_continuous):
    """Call the D stub for solve_VIE_1. Returns (soln_values, poly_coefs_or_None)."""

    g = np.ascontiguousarray(g_values, dtype=np.float64)
    k = np.ascontiguousarray(kernel_values, dtype=np.float64)
    n = len(k)
    choices = np.ascontiguousarray(coll_choices, dtype=np.int32)
    num_choices = len(choices)
    mesh_divs = (n - 1) // (coll_divs ** 2)

    out_soln = np.zeros(n, dtype=np.float64)
    out_mesh_divs = ctypes.c_int(0)

    if return_polys:
        out_poly_coefs = np.zeros(mesh_divs * (num_choices + 1), dtype=np.float64)
        poly_ptr = out_poly_coefs.ctypes.data_as(_dp)
    else:
        out_poly_coefs = None
        poly_ptr = None

    ret = _lib.volterra_solve_vie1(
        g.ctypes.data_as(_dp),
        k.ctypes.data_as(_dp),
        ctypes.c_int(n),
        ctypes.c_double(soln_init_value),
        ctypes.c_double(time_step),
        ctypes.c_int(coll_divs),
        choices.ctypes.data_as(_ip),
        ctypes.c_int(num_choices),
        ctypes.c_int(int(return_polys)),
        ctypes.c_int(int(force_continuous)),
        out_soln.ctypes.data_as(_dp),
        poly_ptr,
        ctypes.byref(out_mesh_divs),
    )
    _check_return(ret, "volterra_solve_vie1")

    if return_polys:
        return (out_soln, out_poly_coefs.reshape(mesh_divs, num_choices + 1))
    return (out_soln, None)


def solve_vie1_vec_d(g_values, kernel_values, soln_init_value, time_step,
                     coll_divs, coll_choices, return_polys, force_continuous):
    """Call the D VIE-1 vector solver.

    Parameters
    ----------
    g_values : ndarray, shape (N, d)
    kernel_values : ndarray, shape (N, d, d)

    Returns
    -------
    out_soln : ndarray, shape (N, d)
    poly_coefs : ndarray, shape (mesh_divs, num_choices+1, d) or None
    """

    g = np.ascontiguousarray(g_values, dtype=np.float64)
    k = np.ascontiguousarray(kernel_values, dtype=np.float64)
    if g.ndim != 2:
        raise ValueError(f"g_values must be 2-D, got shape {g.shape}")
    if k.ndim != 3 or k.shape[1] != k.shape[2] or k.shape[0] != g.shape[0]:
        raise ValueError(f"kernel_values shape {k.shape} incompatible with g_values shape {g.shape}")
    n, d = g.shape
    choices = np.ascontiguousarray(coll_choices, dtype=np.int32)
    num_choices = len(choices)
    mesh_divs = (n - 1) // (coll_divs ** 2)

    init = np.ascontiguousarray(
        np.broadcast_to(np.asarray(soln_init_value, dtype=np.float64), (d,)),
        dtype=np.float64)

    out_soln = np.zeros((n, d), dtype=np.float64)
    out_mesh_divs = ctypes.c_int(0)

    if return_polys:
        out_poly_coefs = np.zeros(mesh_divs * (num_choices + 1) * d, dtype=np.float64)
        poly_ptr = out_poly_coefs.ctypes.data_as(_dp)
    else:
        out_poly_coefs = None
        poly_ptr = None

    ret = _lib.volterra_solve_vie1_vec(
        g.ctypes.data_as(_dp),
        k.ctypes.data_as(_dp),
        ctypes.c_int(n),
        ctypes.c_int(d),
        init.ctypes.data_as(_dp),
        ctypes.c_double(time_step),
        ctypes.c_int(coll_divs),
        choices.ctypes.data_as(_ip),
        ctypes.c_int(num_choices),
        ctypes.c_int(int(return_polys)),
        ctypes.c_int(int(force_continuous)),
        out_soln.ctypes.data_as(_dp),
        poly_ptr,
        ctypes.byref(out_mesh_divs),
    )
    _check_return(ret, "volterra_solve_vie1_vec")

    if return_polys:
        return (out_soln, out_poly_coefs.reshape(mesh_divs, num_choices + 1, d))
    return (out_soln, None)


def solve_vie2_vec_d(g_values, kernel_values, time_step, coll_divs, coll_choices, return_polys):
    """Call the D VIE-2 vector solver.

    Parameters
    ----------
    g_values : ndarray, shape (N, d)
    kernel_values : ndarray, shape (N, d, d)

    Returns
    -------
    out_soln : ndarray, shape (N, d)
    poly_coefs : ndarray, shape (mesh_divs, num_choices+1, d) or None
    """

    g = np.ascontiguousarray(g_values, dtype=np.float64)
    k = np.ascontiguousarray(kernel_values, dtype=np.float64)
    if g.ndim != 2:
        raise ValueError(f"g_values must be 2-D, got shape {g.shape}")
    if k.ndim != 3 or k.shape[1] != k.shape[2] or k.shape[0] != g.shape[0]:
        raise ValueError(f"kernel_values shape {k.shape} incompatible with g_values shape {g.shape}")
    n, d = g.shape
    choices = np.ascontiguousarray(coll_choices, dtype=np.int32)
    num_choices = len(choices)
    mesh_divs = (n - 1) // (coll_divs ** 2)

    out_soln = np.zeros((n, d), dtype=np.float64)
    out_mesh_divs = ctypes.c_int(0)

    if return_polys:
        out_poly_coefs = np.zeros(mesh_divs * (num_choices + 1) * d, dtype=np.float64)
        poly_ptr = out_poly_coefs.ctypes.data_as(_dp)
    else:
        out_poly_coefs = None
        poly_ptr = None

    ret = _lib.volterra_solve_vie2_vec(
        g.ctypes.data_as(_dp),
        k.ctypes.data_as(_dp),
        ctypes.c_int(n),
        ctypes.c_int(d),
        ctypes.c_double(time_step),
        ctypes.c_int(coll_divs),
        choices.ctypes.data_as(_ip),
        ctypes.c_int(num_choices),
        ctypes.c_int(int(return_polys)),
        out_soln.ctypes.data_as(_dp),
        poly_ptr,
        ctypes.byref(out_mesh_divs),
    )
    _check_return(ret, "volterra_solve_vie2_vec")

    if return_polys:
        return (out_soln, out_poly_coefs.reshape(mesh_divs, num_choices + 1, d))
    return (out_soln, None)


def solve_vie2_d(g_values, kernel_values, time_step, coll_divs,
                 coll_choices, return_polys):
    """Call the D stub for solve_VIE_2. Returns (soln_values, poly_coefs_or_None)."""

    g = np.ascontiguousarray(g_values, dtype=np.float64)
    k = np.ascontiguousarray(kernel_values, dtype=np.float64)
    n = len(k)
    choices = np.ascontiguousarray(coll_choices, dtype=np.int32)
    num_choices = len(choices)
    mesh_divs = (n - 1) // (coll_divs ** 2)

    out_soln = np.zeros(n, dtype=np.float64)
    out_mesh_divs = ctypes.c_int(0)

    if return_polys:
        out_poly_coefs = np.zeros(mesh_divs * (num_choices + 1), dtype=np.float64)
        poly_ptr = out_poly_coefs.ctypes.data_as(_dp)
    else:
        out_poly_coefs = None
        poly_ptr = None

    ret = _lib.volterra_solve_vie2(
        g.ctypes.data_as(_dp),
        k.ctypes.data_as(_dp),
        ctypes.c_int(n),
        ctypes.c_double(time_step),
        ctypes.c_int(coll_divs),
        choices.ctypes.data_as(_ip),
        ctypes.c_int(num_choices),
        ctypes.c_int(int(return_polys)),
        out_soln.ctypes.data_as(_dp),
        poly_ptr,
        ctypes.byref(out_mesh_divs),
    )
    _check_return(ret, "volterra_solve_vie2")

    if return_polys:
        return (out_soln, out_poly_coefs.reshape(mesh_divs, num_choices + 1))
    return (out_soln, None)


def solve_vide_d(g_values, kernel_values, a_values, soln_init_value, time_step,
                 coll_divs, coll_choices, return_polys):
    """Call the D stub for solve_VIDE. Returns (soln_values, poly_coefs_or_None)."""

    g = np.ascontiguousarray(g_values, dtype=np.float64)
    k = np.ascontiguousarray(kernel_values, dtype=np.float64)
    a = np.ascontiguousarray(a_values, dtype=np.float64)
    n = len(k)
    choices = np.ascontiguousarray(coll_choices, dtype=np.int32)
    num_choices = len(choices)
    mesh_divs = (n - 1) // (coll_divs ** 2)

    out_soln = np.zeros(n, dtype=np.float64)
    out_mesh_divs = ctypes.c_int(0)

    if return_polys:
        out_poly_coefs = np.zeros(mesh_divs * (num_choices + 1), dtype=np.float64)
        poly_ptr = out_poly_coefs.ctypes.data_as(_dp)
    else:
        out_poly_coefs = None
        poly_ptr = None

    ret = _lib.volterra_solve_vide(
        g.ctypes.data_as(_dp),
        k.ctypes.data_as(_dp),
        a.ctypes.data_as(_dp),
        ctypes.c_int(n),
        ctypes.c_double(soln_init_value),
        ctypes.c_double(time_step),
        ctypes.c_int(coll_divs),
        choices.ctypes.data_as(_ip),
        ctypes.c_int(num_choices),
        ctypes.c_int(int(return_polys)),
        out_soln.ctypes.data_as(_dp),
        poly_ptr,
        ctypes.byref(out_mesh_divs),
    )
    _check_return(ret, "volterra_solve_vide")

    if return_polys:
        return (out_soln, out_poly_coefs.reshape(mesh_divs, num_choices + 1))
    return (out_soln, None)


def solve_vide_vec_d(g_values, kernel_values, a_values, soln_init_values, time_step,
                     coll_divs, coll_choices, return_polys):
    """Call the D VIDE vector solver.

    Parameters
    ----------
    g_values : ndarray, shape (N, d)
    kernel_values : ndarray, shape (N, d, d)
    a_values : ndarray, shape (N, d, d)
    soln_init_values : ndarray, shape (d,)

    Returns
    -------
    out_soln : ndarray, shape (N, d)
    poly_coefs : ndarray, shape (mesh_divs, num_choices+1, d) or None
    """

    g = np.ascontiguousarray(g_values, dtype=np.float64)
    k = np.ascontiguousarray(kernel_values, dtype=np.float64)
    a = np.ascontiguousarray(a_values, dtype=np.float64)
    init = np.ascontiguousarray(soln_init_values, dtype=np.float64)
    if g.ndim != 2:
        raise ValueError(f"g_values must be 2-D, got shape {g.shape}")
    n, d = g.shape
    if k.ndim != 3 or k.shape != (n, d, d):
        raise ValueError(f"kernel_values shape {k.shape} incompatible with g_values shape {g.shape}")
    if a.ndim != 3 or a.shape != (n, d, d):
        raise ValueError(f"a_values shape {a.shape} incompatible with g_values shape {g.shape}")
    if init.shape != (d,):
        raise ValueError(f"soln_init_values must have shape ({d},), got {init.shape}")
    choices = np.ascontiguousarray(coll_choices, dtype=np.int32)
    num_choices = len(choices)
    mesh_divs = (n - 1) // (coll_divs ** 2)

    out_soln = np.zeros((n, d), dtype=np.float64)
    out_mesh_divs = ctypes.c_int(0)

    if return_polys:
        out_poly_coefs = np.zeros(mesh_divs * (num_choices + 1) * d, dtype=np.float64)
        poly_ptr = out_poly_coefs.ctypes.data_as(_dp)
    else:
        out_poly_coefs = None
        poly_ptr = None

    ret = _lib.volterra_solve_vide_vec(
        g.ctypes.data_as(_dp),
        k.ctypes.data_as(_dp),
        a.ctypes.data_as(_dp),
        ctypes.c_int(n),
        ctypes.c_int(d),
        init.ctypes.data_as(_dp),
        ctypes.c_double(time_step),
        ctypes.c_int(coll_divs),
        choices.ctypes.data_as(_ip),
        ctypes.c_int(num_choices),
        ctypes.c_int(int(return_polys)),
        out_soln.ctypes.data_as(_dp),
        poly_ptr,
        ctypes.byref(out_mesh_divs),
    )
    _check_return(ret, "volterra_solve_vide_vec")

    if return_polys:
        return (out_soln, out_poly_coefs.reshape(mesh_divs, num_choices + 1, d))
    return (out_soln, None)


def function_solve_vie2_d(W, g_arr):
    """Call the D solver for the callable-input scalar VIE-2.

    Parameters
    ----------
    W : ndarray, shape (M, p, M, p), float64, C-contiguous
        Precomputed weight tensor.
    g_arr : ndarray, shape (M, p), float64, C-contiguous
        g sampled at collocation points.

    Returns
    -------
    out_y : ndarray, shape (M, p), float64
        Solution values at collocation nodes.
    """
    W_c = np.ascontiguousarray(W, dtype=np.float64)
    g_c = np.ascontiguousarray(g_arr, dtype=np.float64)
    M, p = g_c.shape
    if W_c.shape != (M, p, M, p):
        raise ValueError(
            f"W shape {W_c.shape} incompatible with g shape {g_c.shape}")
    out_y = np.zeros((M, p), dtype=np.float64)
    ret = _lib.function_solve_vie2(
        W_c.ctypes.data_as(_dp),
        g_c.ctypes.data_as(_dp),
        ctypes.c_int(M),
        ctypes.c_int(p),
        out_y.ctypes.data_as(_dp),
    )
    _check_return(ret, "function_solve_vie2")
    return out_y


def function_solve_max_p_d() -> int:
    """Max p (number of collocation nodes per interval) compiled into the D extension."""
    return int(_lib.function_solve_max_p())


def have_lapack_d() -> bool:
    """True if the D extension was built with LAPACK; False if it falls back to the pure-D LU."""
    return bool(_lib.volterra_have_lapack())


def supported_coll_settings_d():
    """Return list of (coll_divs, coll_choices) for all settings compiled into the D library."""

    num = _lib.volterra_num_supported_settings()
    ncols = _lib.volterra_max_coll_params() + 1
    buf = np.zeros(num * ncols, dtype=np.int32)
    _lib.volterra_get_supported_settings(buf.ctypes.data_as(_ip))
    rows = buf.reshape(num, ncols)
    result = []
    for row in rows:
        coll_divs = int(row[0])
        choices = [int(x) for x in row[1:] if x != -1]
        result.append((coll_divs, choices))
    return result
