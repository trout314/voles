# Example: Callable-input solvers with arbitrary mesh

The `function_solve_*` family accepts callable `kernel(u)`, `g(t)`, and `a(t)`
instead of pre-sampled arrays, supports arbitrary `mesh_breakpoints`, and
handles integrable singularities in the kernel.

> Convention note: unlike the array-based solvers, `mesh_breakpoints` here
> defines the integration intervals **directly**. `coll_divs` only controls
> where collocation nodes sit *within* each interval (at fractional positions
> `coll_choices[k] / coll_divs`), not sub-division. Pass more breakpoints for
> finer resolution.

## Smooth kernel, arbitrary mesh

The same problem as the standard VIE-2 example, but expressed with callables
and a hand-picked non-uniform mesh:

```python
import numpy as np
from voles import function_solve_VIE_2

kernel = lambda u: np.exp(-u)
g = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))  # exact y(t) = sin(t)

# Non-uniform mesh: more resolution where g is changing fastest
mesh = np.array([0.0, 0.05, 0.12, 0.22, 0.35, 0.50, 0.68, 0.85, 1.0])

y_arr, y = function_solve_VIE_2(
    kernel=kernel, g=g, mesh_breakpoints=mesh,
    coll_divs=2, coll_choices=[0, 1, 2],
    return_function=True,
)

print(y(0.37), "vs exact", np.sin(0.37))
print("max nodal error:", np.max(np.abs(y(np.linspace(0, 1, 100))
                                        - np.sin(np.linspace(0, 1, 100)))))
```

`y` is a callable object: evaluate at any scalar or array of times. The
underlying per-interval polynomials are available as `y.polynomials`.

## Weakly singular kernel + graded mesh

For Abel-type kernels $K(u) \sim u^{-\alpha}$, declaring the singularity and
using `optimal_graded_mesh` recovers full collocation convergence order
that a uniform mesh fails to achieve.

```python
import numpy as np
from voles import function_solve_VIE_2, optimal_graded_mesh

# Classical Abel equation: integral of (t-s)^(-1/2) y(s) ds = pi*t/2  =>  y = sqrt(t)
kernel = lambda u: 1.0 / np.sqrt(u) if u > 0 else 0.0
g = lambda t: np.sqrt(t) - 0.5 * np.pi * t

coll_choices = [0, 1, 2]
mesh = optimal_graded_mesh(alpha=0.5, T=1.0, M=30, order=len(coll_choices))

y_arr = function_solve_VIE_2(
    kernel=kernel, g=g,
    mesh_breakpoints=mesh,
    coll_divs=2, coll_choices=coll_choices,
    kernel_singularity=0.0,   # declare the singularity at u=0
)

# Check accuracy at the collocation nodes
node_pos = np.array([0, 1, 2]) / 2.0
err = 0.0
for n in range(len(mesh) - 1):
    h = mesh[n + 1] - mesh[n]
    for i, c in enumerate(node_pos):
        t = mesh[n] + c * h
        err = max(err, abs(y_arr[n, i] - np.sqrt(t)))
print(f"max error: {err:.2e}")
```

Declaring the singularity matters: the quadrature nodes are all interior, so
an undeclared endpoint singularity usually does **not** raise an error — the
solver quietly loses convergence order (and spends longer in adaptive
fallbacks) instead. If the kernel ever evaluates to `inf`/`nan` at a
quadrature node, a `ValueError` from the weight tensor's `np.isfinite` check
points you to `kernel_singularity`, but do not rely on that safety net:
declare every integrable singularity you know about. (The solver also prints
a hint if you declare a singularity on a near-uniform mesh, suggesting
`optimal_graded_mesh`; silence it with `show_warnings=False`.)

## Known power law? Declare it for a much faster build

If you also know the singularity's *exponent*, use the dict form
`kernel_singularity={location: alpha}` for $K(u) \sim |u - u_0|^{-\alpha}$.
Blocks touching the singularity are then integrated by deterministic
Gauss–Jacobi rules with the singular factor absorbed into the quadrature
weight — on the Abel problem above this makes the weight-tensor build several
times faster on a graded mesh, and an order of magnitude faster on a uniform
mesh (where the deterministic rules can be reused across the Toeplitz
assembly), with the same accuracy:

```python
import numpy as np
from voles import function_solve_VIE_2, optimal_graded_mesh

kernel = lambda u: 1.0 / np.sqrt(u) if u > 0 else 0.0
g = lambda t: np.sqrt(t) - 0.5 * np.pi * t   # exact y = sqrt(t)
mesh = optimal_graded_mesh(alpha=0.5, T=1.0, M=30, order=3)

y_arr = function_solve_VIE_2(
    kernel=kernel, g=g,
    mesh_breakpoints=mesh,
    coll_divs=2, coll_choices=[0, 1, 2],
    kernel_singularity={0.0: 0.5},   # K(u) ~ u^(-1/2) near u = 0
)
```

A wrongly declared exponent is caught by a two-order acceptance check and
falls back to the adaptive treatment automatically, so the dict form is never
less accurate than the location-only form. Relatedly, on uniform meshes the
`reuse_adaptive_blocks=True` flag speeds up the *location-only* (adaptive)
path by reusing adaptive blocks across the Toeplitz assembly, at the price of
deviations from the default path bounded by the quadrature tolerance
(~1e-8); with a fully declared dict form it is unnecessary (a no-op).

## Choosing collocation nodes directly

Instead of the rational `coll_divs`/`coll_choices` grid, nodes can be given
directly with `coll_nodes` — including the classical families via the
`gauss_legendre_nodes`, `radau_iia_nodes`, and `lobatto_nodes` helpers:

```python
import numpy as np
from voles import function_solve_VIE_2, gauss_legendre_nodes

kernel = lambda u: np.exp(-u)
g = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))  # exact y(t) = sin(t)

y_arr = function_solve_VIE_2(
    kernel=kernel, g=g, mesh_breakpoints=np.linspace(0, 1, 21),
    coll_nodes=gauss_legendre_nodes(3),   # superconvergent for VIE-2/VIDE
)
```

Gauss–Legendre nodes give mesh-point superconvergence for VIE-2 and VIDE;
for VIE-1 prefer `radau_iia_nodes` (the right-endpoint node gives the full
collocation order — see the `function_solve_VIE_1` API notes on convergence).

## Vector-valued kernel

Pass a `kernel(u)` that returns a `(d, d)` matrix; `g(t)` returns `(d,)`:

```python
import numpy as np
from voles import function_solve_VIE_2

d = 2
identity = np.eye(d)
kernel = lambda u: np.exp(-u) * identity
g_s = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))
g = lambda t: np.array([g_s(t), g_s(t)])

mesh = np.linspace(0, 1, 21)
y_arr, y = function_solve_VIE_2(
    kernel=kernel, g=g, mesh_breakpoints=mesh,
    coll_divs=2, coll_choices=[0, 1, 2],
    return_function=True,
)

# y(t) returns (d,); y(array) returns (len(array), d)
print(y(0.5).shape)             # (2,)
print(y(np.linspace(0, 1, 5)).shape)  # (5, 2)
```

## Matrix-valued: many right-hand sides at once

To solve several right-hand sides that share the same kernel, return a
`(d, m)` array from `g(t)` (and, for `function_solve_VIDE`, pass a `(d, m)`
`soln_init_value`). The kernel weight tensor — the expensive part to build —
is computed once and reused across all `m` columns, so this is much cheaper
than `m` separate calls.

```python
import numpy as np
from voles import function_solve_VIE_2

d = 2
identity = np.eye(d)
kernel = lambda u: np.exp(-u) * identity

# Two right-hand sides (m = 2), stacked column-wise into a (d, m) array.
def g(t):
    g0 = np.array([np.sin(t), np.cos(t)])
    g1 = np.array([t, 1.0 + 0.0 * t])
    return np.column_stack([g0, g1])   # shape (d, m)

mesh = np.linspace(0, 1, 21)
y_arr, y = function_solve_VIE_2(
    kernel=kernel, g=g, mesh_breakpoints=mesh,
    coll_divs=2, coll_choices=[0, 1, 2],
    return_function=True,
)

print(y_arr.shape)              # (M, p, d, m) == (20, 3, 2, 2)
print(y(0.5).shape)             # (d, m) == (2, 2)
print(y(np.linspace(0, 1, 5)).shape)  # (len(array), d, m) == (5, 2, 2)
```

A 2-D `g(t)` return (or a 2-D `soln_init_value` for `function_solve_VIDE`)
selects the matrix-valued case; matrix problems require a `(d, d)` matrix
kernel. Complex kernels, `g`, `a`, and initial values are supported here too.

The same `function_solve_VIE_1`, `function_solve_VIDE` entry points exist
with the analogous API. `function_solve_VIDE` additionally takes an
`a` callable and a required `soln_init_value`. `function_solve_VIE_1`
adds the optional `force_continuous` mode (whose `soln_init_value` is `(d, m)`
in the matrix case).
