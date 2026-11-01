"""Bitwise regression battery for the 1.0 API work (docs/dev/api-1.0-plan.md).

SINCE 1.0 (the 0.10 API is gone) this file only supplies the case lists and
comparison helpers to docs/dev/battery.py, which runs every case through the
1.0 API; its own save/compare modes call the 0.10 functions and no longer run.

  python docs/dev/api_battery.py save    ~/.cache/voles_api_battery_<commit>.npz
  python docs/dev/api_battery.py compare ~/.cache/voles_api_battery_<commit>.npz
  python docs/dev/api_battery.py list                 # case names only

Every case goes through the *0.10 API* (solve_VIE_*, function_solve_*), which
stays available as deprecation wrappers until 1.0. The reference is saved from
`main` before Phase 1; after each phase `compare` must report no strict
mismatches.

Per case it records, each under ``<case>/<field>``:

  values     the plain return (return_function=False)
  rf_values  the sample values from return_function=True
  coefs      the solution's local monomial coefficients (M, P, ...)
  mesh       the solution's mesh breakpoints
  dense      dense evaluation on a grid that avoids every breakpoint
  dense_bp   dense evaluation exactly at the interior breakpoints
  warnings   every diagnostic text: printed "warning: ..." lines (0.10) and
             warnings.warn messages (from Phase 1), minus deprecations
  error      "<ExceptionType>: <message>" when the call raised

Comparison classes:

  strict     values, rf_values, coefs, mesh, dense, error, and the
             helper outputs: exact equality (NaN == NaN), same shape and dtype
  expected   dense_bp: changes in Phase 2 by decision D5 (mean of the
             one-sided limits); reported, never fatal
  text       warnings: reported for review. Phase 1 moves them from print
             to warnings.warn and must keep each message.

`save` also reports every case where ``values`` and ``rf_values`` differ.
The new API always requests coefficients from the extension (plan, Phase 7),
so any such case would break the wrappers' bitwise promise.
"""
import contextlib
import io
import math
import re
import subprocess
import sys
import warnings

import numpy as np
import voles

# ---------------------------------------------------------------------------
# Test data
# ---------------------------------------------------------------------------

def kernel_arr(N, d, ts, cplx=False, k0=1.0):
    t = np.arange(N) * ts
    rng = np.random.default_rng(d * 1000 + N)
    if d == 0:
        k = k0 * np.exp(-t) * (1.0 + 0.3 * np.cos(3 * t))
        return k * (1 + 0.2j) if cplx else k
    M = rng.standard_normal((d, d)) * (0.3 / np.sqrt(d))
    K = np.eye(d)[None] + np.exp(-t)[:, None, None] * M[None]
    return K * (1 + 0.2j) if cplx else K


def rhs_arr(N, d, ts, m=None, vie1=False, cplx=False):
    t = np.arange(N) * ts
    rng = np.random.default_rng(7 * N + d + (m or 0))
    shape = (N,) if d == 0 else ((N, d) if m is None else (N, d, m))
    phase = rng.uniform(0, 2 * np.pi, shape[1:]) if d else 0.0
    tt = t.reshape((N,) + (1,) * (len(shape) - 1))
    g = np.sin(2 * tt + phase) + 0.5 * tt
    if vie1:
        g = g - g[0]
    return g * (1 - 0.3j) if cplx else g


def a_arr(N, d):
    return np.broadcast_to(-0.5 * np.eye(d), (N, d, d)).copy() if d else np.full(N, -0.5)


def y0_of(d, m):
    return (np.ones(d) if m is None else np.ones((d, m))) if d else 1.0


# Callable data. Module-level functions (not lambdas) keep the case table
# readable; each is deterministic.
_A2 = np.array([[0.2, -0.1], [0.05, 0.15]])


def kc_scalar(u):
    return np.exp(-u) * (1 + 0.3 * np.cos(3 * u))


def kc_scalar_complex(u):
    return kc_scalar(u) * (1 + 0.2j)


def kc_scalar_only(u):                     # not vectorised: math.* on a float
    return math.exp(-u) * (1 + 0.3 * math.cos(3 * u))


def kc_vec(u):
    u = np.asarray(u, dtype=float)
    out = np.eye(2) + np.exp(-u)[..., None, None] * _A2
    return out


def kc_vec_complex(u):
    return kc_vec(u) * (1 + 0.2j)


def kc_abel(u):                            # u^(-1/2)
    return np.power(np.asarray(u, dtype=float), -0.5)


def kc_interior(u):                        # |u - 0.25|^(-1/2), integrable
    return np.power(np.abs(np.asarray(u, dtype=float) - 0.25), -0.5)


def gc_scalar(t):
    return np.sin(2 * t) + 1.0


def gc_vie1(t):
    return np.sin(2 * t)


def gc_vec(t):
    return np.array([np.sin(2 * t) + 1.0, np.cos(t)])


def gc_mat(t):
    return np.array([[np.sin(2 * t) + 1.0, np.cos(t), t],
                     [np.cos(t), 1.0 + 0 * t, np.sin(t)]])


def gc_vie1_vec(t):
    return np.array([np.sin(2 * t), t])


def gc_vie1_mat(t):
    return np.array([[np.sin(2 * t), t, t * t], [t, np.sin(t), 0 * t]])


def ac_scalar(t):
    return -0.5 + 0 * t


def ac_vec(t):
    return -0.5 * np.eye(2)


def sing_callable(t):                      # s-locations for collocation time t
    return [t]


MESHES = {
    "uniform": np.linspace(0, 1, 21),
    "graded": np.linspace(0, 1, 21) ** 2,
    "random": np.concatenate([[0.0], np.sort(np.random.default_rng(3).uniform(0, 1, 19)), [1.0]]),
}

# ---------------------------------------------------------------------------
# Case table
# ---------------------------------------------------------------------------

ARRAY_FNS = ("solve_VIE_1", "solve_VIE_2", "solve_VIDE")
SHAPES = ((0, None, False), (0, None, True), (1, None, False), (2, None, False),
          (10, None, False), (2, 3, False), (2, None, True), (2, 3, True))


def array_spec(kind, N, d, m, cplx, ts, **kw):
    """kind: VIE1 (discontinuous), VIE1fc (continuous), VIE2, VIDE."""
    K = kernel_arr(N, d, ts, cplx)
    if kind in ("VIE1", "VIE1fc"):
        spec = dict(fn="solve_VIE_1", kernel_values=K,
                    g_values=rhs_arr(N, d, ts, m, vie1=True, cplx=cplx), time_step=ts)
        if kind == "VIE1fc":
            spec.update(force_continuous=True,
                        soln_init_value=(np.zeros((d,) if m is None else (d, m)) if d else 0.0))
    elif kind == "VIE2":
        spec = dict(fn="solve_VIE_2", kernel_values=K,
                    g_values=rhs_arr(N, d, ts, m, cplx=cplx), time_step=ts)
    else:
        spec = dict(fn="solve_VIDE", kernel_values=K, a_values=a_arr(N, d),
                    g_values=rhs_arr(N, d, ts, m, cplx=cplx),
                    soln_init_value=y0_of(d, m), time_step=ts)
    spec.update(kw)
    return spec


def solve_cases():
    out = []
    add = lambda name, spec: out.append((name, spec))

    # A. Shapes x quadratures x histories (81: direct merge, VIE-1 has a short
    #    final interval; 1030: FFT merge, short final interval for every
    #    default mesh width) x the four methods, default settings.
    for N in (81, 1030):
        ts = 1.0 / (N - 1)
        for quad in ("collocation", "product"):
            for d, m, cplx in SHAPES:
                for kind in ("VIE1", "VIE1fc", "VIE2", "VIDE"):
                    add(f"A-{kind}-N{N}-{quad}-d{d}-m{m}-c{int(cplx)}",
                        array_spec(kind, N, d, m, cplx, ts, quadrature=quad))
    # A2. Data lengths that end exactly on a mesh point for some method.
    for N in (82, 1025):
        ts = 1.0 / (N - 1)
        for quad in ("collocation", "product"):
            for kind in ("VIE1", "VIE1fc", "VIE2", "VIDE"):
                add(f"A2-{kind}-N{N}-{quad}", array_spec(kind, N, 0, None, False, ts,
                                                         quadrature=quad))

    # B. Collocation settings (scalar and d=2, both quadratures, N=1030).
    N, ts = 1030, 1.0 / 1029
    settings = {
        "VIE1": [dict(coll_divs=2), dict(coll_divs=4), dict(coll_divs=4, coll_choices=[1, 2, 4]),
                 dict(coll_divs=2, coll_choices=[1, 2]), dict(coll_divs=3, coll_choices=[1, 2]),
                 dict(coll_choices=[1, 3]), dict(coll_divs=4, coll_choices=[2, 4]),
                 dict(coll_divs=2, coll_choices=[1]), dict(coll_divs=4, coll_choices=[4, 1, 2]),
                 dict(coll_divs=5)],
        "VIE1fc": [dict(coll_divs=2, coll_choices=[1, 2]), dict(coll_divs=3, coll_choices=[1, 2, 3]),
                   dict(coll_divs=4, coll_choices=[1, 2, 4]), dict(coll_divs=4),
                   dict(coll_divs=1, coll_choices=[1]), dict(coll_divs=5)],
        "VIE2": [dict(coll_divs=3), dict(coll_divs=2, coll_choices=[1, 2]),
                 dict(coll_divs=4, coll_choices=[1, 3]), dict(coll_divs=1, coll_choices=[0, 1]),
                 dict(coll_divs=3, coll_choices=[0, 3]), dict(coll_choices=[0, 2]),
                 dict(coll_divs=4, coll_choices=[0, 2, 4]), dict(coll_divs=5)],
        "VIDE": [dict(coll_divs=3, coll_choices=[1, 2, 3]), dict(coll_divs=2, coll_choices=[1]),
                 dict(coll_divs=4), dict(coll_divs=1, coll_choices=[0, 1]), dict(coll_divs=5)],
    }
    for kind, lst in settings.items():
        for kw in lst:
            label = "-".join(f"{k}{v}" for k, v in kw.items()).replace(" ", "")
            for quad in ("collocation", "product"):
                for d in (0, 2):
                    add(f"B-{kind}-{label}-{quad}-d{d}",
                        array_spec(kind, N, d, None, False, ts, quadrature=quad, **kw))

    # B2. Mesh width and interpolation degree (product quadrature).
    for kind, kws in {
        "VIE1": [dict(mesh_samples=3), dict(mesh_samples=6), dict(mesh_samples=27),
                 dict(kernel_interp_degree=1), dict(kernel_interp_degree=5),
                 dict(coll_divs=2, coll_choices=[1, 2], mesh_samples=2)],
        "VIE1fc": [dict(mesh_samples=3), dict(kernel_interp_degree=2)],
        "VIE2": [dict(mesh_samples=4), dict(mesh_samples=10), dict(kernel_interp_degree=1),
                 dict(kernel_interp_degree=6)],
        "VIDE": [dict(mesh_samples=6), dict(kernel_interp_degree=2)],
    }.items():
        for kw in kws:
            label = "-".join(f"{k}{v}" for k, v in kw.items()).replace(" ", "")
            for d, m in ((0, None), (2, None), (2, 3)):
                add(f"B2-{kind}-{label}-d{d}-m{m}",
                    array_spec(kind, N, d, m, False, ts, quadrature="product", **kw))
    # Explicit mesh_samples equal to the collocation quadrature's mesh.
    add("B2-VIE2-collocation-explicit-ms", array_spec("VIE2", N, 0, None, False, ts,
                                                      quadrature="collocation", mesh_samples=4))

    # C. Diagnostic triggers (print sites in 0.10).
    for quad in ("collocation", "product"):
        for d, m in ((0, None), (2, None), (2, 3)):
            K = kernel_arr(N, d, ts)
            g_raw = rhs_arr(N, d, ts, m) + 0.25          # g(0) != 0
            add(f"C-VIE1-g0nonzero-{quad}-d{d}-m{m}",
                dict(fn="solve_VIE_1", kernel_values=K, g_values=g_raw, time_step=ts,
                     quadrature=quad))
            add(f"C-VIE1-init-ignored-{quad}-d{d}-m{m}",
                dict(fn="solve_VIE_1", kernel_values=K, g_values=rhs_arr(N, d, ts, m, vie1=True),
                     soln_init_value=(np.zeros((d,) if m is None else (d, m)) if d else 0.0),
                     time_step=ts, quadrature=quad))
            add(f"C-VIE1-quiet-{quad}-d{d}-m{m}",
                dict(fn="solve_VIE_1", kernel_values=K, g_values=g_raw, time_step=ts,
                     quadrature=quad, show_warnings=False))
        Ksmall = kernel_arr(N, 0, ts, k0=1.0)
        Ksmall = Ksmall - Ksmall[0] + 1e-4                # K(0) tiny next to its change
        add(f"C-VIE1-K0small-{quad}", dict(fn="solve_VIE_1", kernel_values=Ksmall,
                                           g_values=rhs_arr(N, 0, ts, vie1=True),
                                           time_step=ts, quadrature=quad))
    add("C-VIE1-return_polys", dict(fn="solve_VIE_1", kernel_values=kernel_arr(N, 0, ts),
                                    g_values=rhs_arr(N, 0, ts, vie1=True), time_step=ts,
                                    return_polys=True))

    # D. Coercions and edge inputs.
    add("D-VIE2-float32", dict(fn="solve_VIE_2",
                               kernel_values=kernel_arr(N, 0, ts).astype(np.float32),
                               g_values=rhs_arr(N, 0, ts).astype(np.float32), time_step=ts))
    add("D-VIE2-lists", dict(fn="solve_VIE_2", kernel_values=list(kernel_arr(81, 0, 0.0125)),
                             g_values=list(rhs_arr(81, 0, 0.0125)), time_step=0.0125))
    add("D-VIE2-int-g", dict(fn="solve_VIE_2", kernel_values=kernel_arr(N, 0, ts),
                             g_values=np.ones(N, dtype=int), time_step=ts))
    add("D-VIE2-no-g", dict(fn="solve_VIE_2", kernel_values=kernel_arr(N, 0, ts), time_step=ts))
    add("D-VIDE-no-a-no-g", dict(fn="solve_VIDE", kernel_values=kernel_arr(N, 0, ts),
                                 soln_init_value=1.0, time_step=ts))
    add("D-VIDE-shared-g", dict(fn="solve_VIDE", kernel_values=kernel_arr(N, 2, ts),
                                a_values=a_arr(N, 2), g_values=rhs_arr(N, 2, ts),
                                soln_init_value=np.ones((2, 3)), time_step=ts))
    add("D-VIDE-init-None", dict(fn="solve_VIDE", kernel_values=kernel_arr(N, 0, ts),
                                 g_values=rhs_arr(N, 0, ts), soln_init_value=None,
                                 time_step=ts))                      # F5: all-NaN in 0.10
    add("D-VIE2-nan-in-g", dict(fn="solve_VIE_2", kernel_values=kernel_arr(N, 0, ts),
                                g_values=np.where(np.arange(N) == 500, np.nan,
                                                  rhs_arr(N, 0, ts)), time_step=ts))   # F6
    add("D-VIE2-show_warnings-str", dict(fn="solve_VIE_2", kernel_values=kernel_arr(N, 0, ts),
                                         g_values=rhs_arr(N, 0, ts), time_step=ts,
                                         show_warnings="no"))                     # F3
    add("D-VIE2-time_step-large", dict(fn="solve_VIE_2", kernel_values=kernel_arr(N, 0, 1.0),
                                       g_values=rhs_arr(N, 0, 1.0), time_step=1.0))

    # E. Callable family: shapes x methods x meshes, default nodes.
    shapes = {
        "s": dict(k=kc_scalar, g=gc_scalar, g1=gc_vie1, a=ac_scalar, y0=1.0, z0=0.0),
        "sc": dict(k=kc_scalar_complex, g=gc_scalar, g1=gc_vie1, a=ac_scalar, y0=1.0, z0=0.0),
        "v": dict(k=kc_vec, g=gc_vec, g1=gc_vie1_vec, a=ac_vec, y0=np.ones(2), z0=np.zeros(2)),
        "vc": dict(k=kc_vec_complex, g=gc_vec, g1=gc_vie1_vec, a=ac_vec, y0=np.ones(2),
                   z0=np.zeros(2)),
        "m": dict(k=kc_vec, g=gc_mat, g1=gc_vie1_mat, a=ac_vec, y0=np.ones((2, 3)),
                  z0=np.zeros((2, 3))),
    }

    def fspec(kind, sh, mesh, **kw):
        s = shapes[sh]
        if kind == "VIE1":
            spec = dict(fn="function_solve_VIE_1", kernel=s["k"], g=s["g1"])
        elif kind == "VIE1fc":
            spec = dict(fn="function_solve_VIE_1", kernel=s["k"], g=s["g1"],
                        force_continuous=True, soln_init_value=s["z0"])
        elif kind == "VIE2":
            spec = dict(fn="function_solve_VIE_2", kernel=s["k"], g=s["g"])
        else:
            spec = dict(fn="function_solve_VIDE", kernel=s["k"], a=s["a"], g=s["g"],
                        soln_init_value=s["y0"])
        spec["mesh_breakpoints"] = mesh
        spec.update(kw)
        return spec

    for mname in ("uniform", "graded"):
        for sh in shapes:
            for kind in ("VIE1", "VIE1fc", "VIE2", "VIDE"):
                add(f"E-{kind}-{mname}-{sh}", fspec(kind, sh, MESHES[mname]))
    for kind in ("VIE1", "VIE2", "VIDE"):
        add(f"E-{kind}-random-s", fspec(kind, "s", MESHES["random"]))
        add(f"E-{kind}-uniform-scalar-only-kernel",
            dict(fspec(kind, "s", MESHES["uniform"]), kernel=kc_scalar_only))

    # F. Callable family: node specifications.
    gl, rr, lo = voles.gauss_legendre_nodes(3), voles.radau_iia_nodes(3), voles.lobatto_nodes(3)
    node_kws = {
        "VIE1": [dict(coll_divs=4), dict(coll_divs=4, coll_choices=[1, 2, 4]),
                 dict(coll_choices=[1, 3]), dict(coll_nodes=rr), dict(coll_nodes=gl),
                 dict(coll_nodes=[1.0, 0.3]), dict(coll_divs=3, coll_choices=[1, 2])],
        "VIE1fc": [dict(coll_nodes=rr), dict(coll_divs=3, coll_choices=[1, 2, 3])],
        "VIE2": [dict(coll_divs=3), dict(coll_nodes=gl), dict(coll_nodes=rr), dict(coll_nodes=lo),
                 dict(coll_nodes=[0.9, 0.1, 0.5]), dict(coll_divs=4, coll_choices=[1, 3])],
        "VIDE": [dict(coll_nodes=gl), dict(coll_nodes=rr), dict(coll_divs=3, coll_choices=[1, 2, 3])],
    }
    for kind, lst in node_kws.items():
        for i, kw in enumerate(lst):
            for sh in ("s", "v"):
                add(f"F-{kind}-nodes{i}-{sh}", fspec(kind, sh, MESHES["uniform"], **kw))

    # G. Singular kernels: each kernel_singularity form, graded and uniform.
    T = 1.0
    graded = voles.optimal_graded_mesh(alpha=0.5, t_end=T, n_intervals=16, order=3)
    uni = np.linspace(0, T, 17)
    sing_forms = {"float": 0.0, "list": [0.0], "dict-alpha": {0.0: 0.5},
                  "dict-none": {0.0: None}, "callable": sing_callable, "empty": []}
    for fname, form in sing_forms.items():
        add(f"G-VIE2-abel-{fname}", dict(fn="function_solve_VIE_2", kernel=kc_abel, g=gc_scalar,
                                         mesh_breakpoints=graded, kernel_singularity=form))
    add("G-VIE1-abel-dict", dict(fn="function_solve_VIE_1", kernel=kc_abel, g=gc_vie1,
                                 mesh_breakpoints=graded, kernel_singularity={0.0: 0.5}))
    add("G-VIDE-abel-dict", dict(fn="function_solve_VIDE", kernel=kc_abel, a=ac_scalar,
                                 g=gc_scalar, soln_init_value=1.0, mesh_breakpoints=graded,
                                 kernel_singularity={0.0: 0.5}))
    add("G-VIE2-abel-uniform-mesh", dict(fn="function_solve_VIE_2", kernel=kc_abel, g=gc_scalar,
                                         mesh_breakpoints=uni, kernel_singularity={0.0: 0.5}))
    add("G-VIE2-abel-noreuse", dict(fn="function_solve_VIE_2", kernel=kc_abel, g=gc_scalar,
                                    mesh_breakpoints=uni, kernel_singularity=0.0,
                                    reuse_adaptive_blocks=False))
    add("G-VIE2-abel-reuse", dict(fn="function_solve_VIE_2", kernel=kc_abel, g=gc_scalar,
                                  mesh_breakpoints=uni, kernel_singularity=0.0))
    add("G-VIE2-interior", dict(fn="function_solve_VIE_2", kernel=kc_interior, g=gc_scalar,
                                mesh_breakpoints=uni, kernel_singularity={0.25: 0.5}))
    add("G-VIE2-outside", dict(fn="function_solve_VIE_2", kernel=kc_scalar, g=gc_scalar,
                               mesh_breakpoints=graded, kernel_singularity=[0.0, 3.0]))
    add("G-VIE2-quiet", dict(fn="function_solve_VIE_2", kernel=kc_abel, g=gc_scalar,
                             mesh_breakpoints=uni, kernel_singularity={0.0: 0.5},
                             show_warnings=False))
    return out


def error_cases():
    """Invalid calls, one per validation branch. All recorded as outcomes
    ("error" or, where 0.10 accepts the call, the values)."""
    N, ts = 81, 0.0125
    K, g, g1 = kernel_arr(N, 0, ts), rhs_arr(N, 0, ts), rhs_arr(N, 0, ts, vie1=True)
    K2 = kernel_arr(N, 2, ts)
    base2 = dict(fn="solve_VIE_2", kernel_values=K, g_values=g, time_step=ts)
    base1 = dict(fn="solve_VIE_1", kernel_values=K, g_values=g1, time_step=ts)
    based = dict(fn="solve_VIDE", kernel_values=K, g_values=g, soln_init_value=1.0, time_step=ts)
    mesh = MESHES["uniform"]
    fb2 = dict(fn="function_solve_VIE_2", kernel=kc_scalar, g=gc_scalar, mesh_breakpoints=mesh)
    fb1 = dict(fn="function_solve_VIE_1", kernel=kc_scalar, g=gc_vie1, mesh_breakpoints=mesh)
    E = []
    add = lambda name, base, **kw: E.append((name, dict(base, **kw)))
    # array family
    add("kernel-2d", base2, kernel_values=np.ones((N, 3)))
    add("kernel-dd-mismatch", base2, kernel_values=np.ones((N, 2, 3)))
    add("g-length", base2, g_values=g[:50])
    add("g-shape-vs-d", base2, kernel_values=K2, g_values=np.ones((N, 3)))
    add("a-shape", based, a_values=np.ones((N, 2, 2)))
    add("init-shape", dict(based, kernel_values=K2, g_values=rhs_arr(N, 2, ts)),
        soln_init_value=np.ones(3))
    add("init-matrix-shape", dict(base1, kernel_values=K2, g_values=rhs_arr(N, 2, ts, 3, vie1=True)),
        soln_init_value=np.ones((2, 2)), force_continuous=True)
    add("time_step-zero", base2, time_step=0.0)
    add("time_step-negative", base2, time_step=-0.1)
    add("time_step-inf", base2, time_step=np.inf)
    add("time_step-str", base2, time_step="0.1")
    add("coll_divs-zero", base2, coll_divs=0)
    add("coll_divs-float", base2, coll_divs=2.0)
    add("coll_divs-bool", base2, coll_divs=True)
    add("coll_choices-empty", base2, coll_divs=2, coll_choices=[])
    add("coll_choices-dupes", base2, coll_divs=2, coll_choices=[1, 1])
    add("coll_choices-range", base2, coll_divs=4, coll_choices=[1, 5])
    add("coll_choices-float", base2, coll_divs=2, coll_choices=[0.5, 1])
    add("vie1-zero-choice", base1, coll_divs=2, coll_choices=[0, 1, 2])
    add("vie1-nonconvergent", base1, coll_divs=3, coll_choices=[1])
    add("vie1fc-no-endpoint", base1, coll_divs=3, coll_choices=[1, 2], force_continuous=True,
        soln_init_value=0.0)
    add("vie1fc-no-init", base1, force_continuous=True)
    add("mesh_samples-not-multiple", base2, coll_divs=2, mesh_samples=5)
    add("mesh_samples-float", base2, mesh_samples=4.0)
    add("mesh_samples-zero", base2, mesh_samples=0)
    add("mesh_samples-collocation", base2, quadrature="collocation", mesh_samples=10)
    add("interp-collocation", base2, quadrature="collocation", kernel_interp_degree=2)
    add("interp-zero", base2, kernel_interp_degree=0)
    add("quadrature-case", base2, quadrature="Product")
    add("quadrature-unknown", base2, quadrature="simpson")
    add("too-short-vie1", base1, kernel_values=K[:6], g_values=g1[:6])
    add("too-short-vie2", base2, kernel_values=K[:2], g_values=g[:2])
    add("vector-uncompiled-collocation", dict(base2, kernel_values=K2, g_values=rhs_arr(N, 2, ts)),
        quadrature="collocation", coll_divs=5)
    add("return_function-int", base2, return_function=1)
    add("matrix-zero-cols", dict(base2, kernel_values=K2), g_values=np.ones((N, 2, 0)))
    # callable family
    add("f-kernel-array", fb2, kernel=np.ones(5))
    add("f-g-noncallable", fb2, g="x")
    add("f-mesh-start", fb2, mesh_breakpoints=mesh + 0.1)
    add("f-mesh-decreasing", fb2, mesh_breakpoints=mesh[::-1])
    add("f-mesh-nan", fb2, mesh_breakpoints=np.where(np.arange(21) == 5, np.nan, mesh))
    add("f-mesh-2d", fb2, mesh_breakpoints=mesh.reshape(3, 7))
    add("f-mesh-short", fb2, mesh_breakpoints=[0.0])
    add("f-nodes-zero-vie1", fb1, coll_nodes=[0.0, 1.0])
    add("f-nodes-range", fb2, coll_nodes=[0.5, 1.5])
    add("f-nodes-dupes", fb2, coll_nodes=[0.5, 0.5])
    add("f-nodes-and-divs", fb2, coll_nodes=[0.5, 1.0], coll_divs=2)
    add("f-nodes-nonconvergent-vie1", fb1, coll_nodes=[0.2])
    add("f-sing-bool", fb2, kernel_singularity=True)
    add("f-sing-bad-alpha", fb2, kernel_singularity={0.0: 1.5})
    add("f-sing-bad-loc", fb2, kernel_singularity={"a": 0.5})
    add("f-g-wrong-shape", fb2, g=gc_vec)
    add("f-vide-init-None", dict(fn="function_solve_VIDE", kernel=kc_scalar, g=gc_scalar,
                                 mesh_breakpoints=mesh), soln_init_value=None)
    add("f-vide-a-noncallable", dict(fn="function_solve_VIDE", kernel=kc_scalar, g=gc_scalar,
                                     soln_init_value=1.0, mesh_breakpoints=mesh), a=np.ones(3))
    add("f-coll_divs-float", fb2, coll_divs=2.5)
    # helpers
    add("h-ogm-alpha", dict(fn="optimal_graded_mesh", alpha=1.5, T=1.0, M=10, order=3))
    add("h-ogm-M0", dict(fn="optimal_graded_mesh", alpha=0.5, T=1.0, M=0, order=3))
    add("h-ogm-T", dict(fn="optimal_graded_mesh", alpha=0.5, T=-1.0, M=10, order=3))
    add("h-ogm-order", dict(fn="optimal_graded_mesh", alpha=0.5, T=1.0, M=10, order=0))
    add("h-ogm-M-float", dict(fn="optimal_graded_mesh", alpha=0.5, T=1.0, M=10.0, order=3))
    add("h-gl-0", dict(fn="gauss_legendre_nodes", p=0))
    add("h-gl-float", dict(fn="gauss_legendre_nodes", p=2.0))
    add("h-lobatto-1", dict(fn="lobatto_nodes", p=1))
    add("h-radau-neg", dict(fn="radau_iia_nodes", p=-1))
    return E


def helper_cases():
    """Outputs of the public helpers (strict)."""
    H = []
    for p in (1, 2, 3, 5, 8):
        H.append((f"H-gl-{p}", dict(fn="gauss_legendre_nodes", p=p)))
        H.append((f"H-radau-{p}", dict(fn="radau_iia_nodes", p=p)))
        if p >= 2:
            H.append((f"H-lobatto-{p}", dict(fn="lobatto_nodes", p=p)))
    for alpha, M, order in ((0.5, 16, 3), (0.25, 40, 2), (0.9, 8, 4)):
        H.append((f"H-ogm-{alpha}-{M}-{order}",
                  dict(fn="optimal_graded_mesh", alpha=alpha, T=2.0, M=M, order=order)))
    return H

# ---------------------------------------------------------------------------
# Running
# ---------------------------------------------------------------------------

_WARN_SPLIT = re.compile(r"(?m)^warning: ")


def _norm(msg):
    return " ".join(str(msg).split())


def _call(spec):
    """Run one call; return (result, exception, diagnostics list)."""
    spec = dict(spec)
    fn = getattr(voles, spec.pop("fn"))
    buf = io.StringIO()
    res = exc = None
    with warnings.catch_warnings(record=True) as rec, contextlib.redirect_stdout(buf):
        warnings.simplefilter("always")
        try:
            res = fn(**spec)
        except Exception as e:                       # recorded, compared as text
            exc = e
    diags = [_norm(m) for m in _WARN_SPLIT.split(buf.getvalue()) if m.strip()]
    diags += [_norm(w.message) for w in rec
              if not issubclass(w.category, (DeprecationWarning, PendingDeprecationWarning))]
    return res, exc, sorted(diags)


def _coefs_and_mesh(sol):
    coefs = getattr(sol, "coefficients", None)
    if coefs is None:
        coefs = sol._unit
    mesh = getattr(sol, "mesh", None)
    if mesh is None or callable(mesh):
        mesh = sol.mesh_breakpoints
    return np.asarray(coefs), np.asarray(mesh, dtype=float)


def _dense_grids(mesh):
    """Points strictly inside every interval, and the interior breakpoints."""
    x = np.array([0.1, 0.37, 0.5, 0.83])
    h = np.diff(mesh)
    inside = (mesh[:-1, None] + x[None, :] * h[:, None]).ravel()
    return inside, mesh[1:-1]


def _err_text(e):
    return np.array(f"{type(e).__name__}: {e}")


def run_solve(name, spec, out):
    """Plain call, then return_function=True. Fields go into `out`."""
    res, exc, diags = _call(spec)
    out[f"{name}/warnings"] = np.array("\n".join(diags))
    if exc is not None:
        out[f"{name}/error"] = _err_text(exc)
        return
    if isinstance(res, tuple):                       # return_polys=True: already a tuple
        out[f"{name}/values"] = np.asarray(res[0])
        _record_solution(name, res, out)
        return
    out[f"{name}/values"] = np.asarray(res)
    res_rf, exc_rf, _ = _call(dict(spec, return_function=True))
    if exc_rf is not None:
        out[f"{name}/rf_error"] = _err_text(exc_rf)
        return
    _record_solution(name, res_rf, out)


def _record_solution(name, res_rf, out):
    values, sol = res_rf
    out[f"{name}/rf_values"] = np.asarray(values)
    coefs, mesh = _coefs_and_mesh(sol)
    out[f"{name}/coefs"] = coefs
    out[f"{name}/mesh"] = mesh
    inside, bps = _dense_grids(mesh)
    out[f"{name}/dense"] = np.asarray(sol(inside))
    if len(bps):
        out[f"{name}/dense_bp"] = np.asarray(sol(bps))


def run_plain(name, spec, out):
    res, exc, diags = _call(spec)
    if diags:
        out[f"{name}/warnings"] = np.array("\n".join(diags))
    if exc is not None:
        out[f"{name}/error"] = _err_text(exc)
    elif isinstance(res, tuple):
        out[f"{name}/values"] = np.asarray(res[0])
    else:
        out[f"{name}/values"] = np.asarray(res)


def collect(only=None):
    out = {}
    for name, spec in solve_cases():
        if only is None or re.search(only, name):
            run_solve(name, spec, out)
    for name, spec in error_cases():
        if only is None or re.search(only, f"X-{name}"):
            run_plain(f"X-{name}", spec, out)
    for name, spec in helper_cases():
        if only is None or re.search(only, name):
            run_plain(name, spec, out)
    return out


def _meta():
    try:
        head = subprocess.run(["git", "rev-parse", "--short", "HEAD"], capture_output=True,
                              text=True, check=True).stdout.strip()
        dirty = subprocess.run(["git", "status", "--porcelain", "--", "src", "dlang"],
                               capture_output=True, text=True).stdout.strip()
    except Exception:
        head, dirty = "unknown", ""
    return f"commit={head}{'+dirty' if dirty else ''} numpy={np.__version__} " \
           f"python={sys.version.split()[0]}"


def _field(key):
    return key.rsplit("/", 1)[-1] if "/" in key else ""


def _same(a, b):
    if a.dtype.kind in "USO" or b.dtype.kind in "USO":
        return str(a) == str(b)
    return a.shape == b.shape and a.dtype == b.dtype and np.array_equal(a, b, equal_nan=True)


def _describe(a, b):
    if a.dtype.kind in "USO" or b.dtype.kind in "USO":
        return f"\n        was: {str(a)[:300]}\n        now: {str(b)[:300]}"
    if a.shape != b.shape:
        return f"shape {a.shape} -> {b.shape}"
    if a.dtype != b.dtype:
        return f"dtype {a.dtype} -> {b.dtype}"
    with np.errstate(invalid="ignore"):
        d = np.abs(a.astype(complex) - b.astype(complex))
    return f"max abs diff {np.nanmax(d):.3e} at {int(np.nanargmax(d))} of {a.size}"


def main():
    mode = sys.argv[1]
    if mode == "list":
        for n, _ in solve_cases():
            print(n)
        for n, _ in error_cases():
            print(f"X-{n}")
        for n, _ in helper_cases():
            print(n)
        return 0
    path = sys.argv[2]
    only = sys.argv[3] if len(sys.argv) > 3 else None
    res = collect(only)
    if mode == "save":
        res["__meta__"] = np.array(_meta())
        np.savez(path, **res)
        cases = {k.rsplit("/", 1)[0] for k in res if "/" in k}
        errs = sorted(k for k in res if _field(k) in ("error", "rf_error"))
        print(f"saved {len(res)} fields from {len(cases)} cases to {path} ({_meta()})")
        print(f"{len(errs)} recorded errors")
        rf_bad = [k[:-len("/values")] for k in res if _field(k) == "values"
                  and f"{k[:-len('/values')]}/rf_values" in res
                  and not _same(res[k], res[k[:-len('/values')] + "/rf_values"])]
        print(f"{len(rf_bad)} cases where values != rf_values (return_function changes numerics)")
        for k in rf_bad:
            print("   ", k, _describe(res[k + "/values"], res[k + "/rf_values"]))
        nwarn = sum(1 for k in res if _field(k) == "warnings" and str(res[k]))
        print(f"{nwarn} cases emit diagnostics")
        return 0
    base = dict(np.load(path))
    print(f"reference: {base.pop('__meta__', 'unknown')}\ncurrent:   {_meta()}")
    if only:
        base = {k: v for k, v in base.items() if re.search(only, k.split("/")[0])}
    strict, expected, text = [], [], []
    for k in sorted(set(base) | set(res)):
        if k not in base or k not in res:
            strict.append((k, "only in " + ("reference" if k in base else "current")))
            continue
        if _same(base[k], res[k]):
            continue
        f = _field(k)
        bucket = expected if f == "dense_bp" else text if f == "warnings" else strict
        bucket.append((k, _describe(base[k], res[k])))
    print(f"compared {len(res)} fields: {len(strict)} strict mismatches, "
          f"{len(text)} diagnostic-text changes, {len(expected)} expected (dense_bp) changes")
    for title, lst in (("STRICT", strict), ("DIAGNOSTIC TEXT", text), ("EXPECTED (D5)", expected)):
        if lst:
            print(f"--- {title}")
            for k, why in lst:
                print("  ", k, why)
    return 1 if strict else 0


if __name__ == "__main__":
    sys.exit(main())
