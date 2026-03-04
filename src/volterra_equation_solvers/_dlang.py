"""
Optional ctypes loader for the D language extension (libvolterra_dlang.so).

If the shared library is not present, `available` is set to False and the
wrapper functions raise RuntimeError.  The rest of the package is unaffected.
"""

import ctypes
import os

import numpy as np

_lib = None
available = False

# ctypes shorthand
_dp = ctypes.POINTER(ctypes.c_double)
_ip = ctypes.POINTER(ctypes.c_int)


def _setup_argtypes() -> None:
    _lib.volterra_num_supported_settings.restype = ctypes.c_int
    _lib.volterra_num_supported_settings.argtypes = []

    _lib.volterra_get_supported_settings.restype = None
    _lib.volterra_get_supported_settings.argtypes = [_ip]

    _lib.volterra_solve_vie1.restype = ctypes.c_int
    _lib.volterra_solve_vie1.argtypes = [
        _dp, _dp, ctypes.c_int,           # g_values, kernel_values, n
        ctypes.c_double, ctypes.c_double,  # soln_init_value, time_step
        ctypes.c_int, _ip, ctypes.c_int,  # coll_divs, coll_choices, num_choices
        ctypes.c_int, ctypes.c_int,        # return_polys, force_continuous
        _dp, _dp, _ip,                     # out_soln, out_poly_coefs, out_mesh_divs
    ]

    _lib.volterra_solve_vie2.restype = ctypes.c_int
    _lib.volterra_solve_vie2.argtypes = [
        _dp, _dp, ctypes.c_int,           # g_values, kernel_values, n
        ctypes.c_double, ctypes.c_int,     # time_step, coll_divs
        _ip, ctypes.c_int, ctypes.c_int,  # coll_choices, num_choices, return_polys
        _dp, _dp, _ip,                     # out_soln, out_poly_coefs, out_mesh_divs
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
    global _lib, available
    here = os.path.dirname(os.path.abspath(__file__))
    candidates = [
        os.path.join(here, "libvolterra_dlang.so"),
        os.path.normpath(os.path.join(here, "..", "..", "..", "dlang", "build", "libvolterra_dlang.so")),
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                _lib = ctypes.CDLL(path)
                _setup_argtypes()
                available = True
                return
            except OSError:
                pass
    available = False


_load()


# ---------------------------------------------------------------------------
# Wrapper functions
# ---------------------------------------------------------------------------

def solve_vie1_d(g_values, kernel_values, soln_init_value, time_step,
                 coll_divs, coll_choices, return_polys, force_continuous):
    """Call the D stub for solve_VIE_1. Returns (soln_values, poly_coefs_or_None)."""
    if not available:
        raise RuntimeError("D extension not available")

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
    if ret != 0:
        raise RuntimeError(f"volterra_solve_vie1 returned error code {ret}")

    if return_polys:
        return (out_soln, out_poly_coefs.reshape(mesh_divs, num_choices + 1))
    return (out_soln, None)


def solve_vie2_d(g_values, kernel_values, time_step, coll_divs,
                 coll_choices, return_polys):
    """Call the D stub for solve_VIE_2. Returns (soln_values, poly_coefs_or_None)."""
    if not available:
        raise RuntimeError("D extension not available")

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
    if ret != 0:
        raise RuntimeError(f"volterra_solve_vie2 returned error code {ret}")

    if return_polys:
        return (out_soln, out_poly_coefs.reshape(mesh_divs, num_choices + 1))
    return (out_soln, None)


def solve_vide_d(g_values, kernel_values, a_values, soln_init_value, time_step,
                 coll_divs, coll_choices, return_polys):
    """Call the D stub for solve_VIDE. Returns (soln_values, poly_coefs_or_None)."""
    if not available:
        raise RuntimeError("D extension not available")

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
    if ret != 0:
        raise RuntimeError(f"volterra_solve_vide returned error code {ret}")

    if return_polys:
        return (out_soln, out_poly_coefs.reshape(mesh_divs, num_choices + 1))
    return (out_soln, None)


def supported_coll_settings_d():
    """Return list of (coll_divs, coll_choices) for all settings compiled into the D library."""
    if not available:
        raise RuntimeError("D extension not available")

    num = _lib.volterra_num_supported_settings()
    ncols = 4  # max_coll_params + 1
    buf = np.zeros(num * ncols, dtype=np.int32)
    _lib.volterra_get_supported_settings(buf.ctypes.data_as(_ip))
    rows = buf.reshape(num, ncols)
    result = []
    for row in rows:
        coll_divs = int(row[0])
        choices = [int(x) for x in row[1:] if x != -1]
        result.append((coll_divs, choices))
    return result
