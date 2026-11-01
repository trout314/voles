# Example: Callable inputs and arbitrary meshes

Given callables `kernel(u)`, `g(t)` and `a(t)` in place of sampled arrays,
the solvers run on any mesh you supply with `mesh=`, and handle integrable
singularities in the kernel.

The breakpoints in `mesh` are the mesh intervals themselves. The
collocation nodes, `coll_nodes`, are positions in [0, 1] within each
interval. For finer resolution, pass more breakpoints.

## Smooth kernel, arbitrary mesh

The standard VIE-2 example, with callables and a hand-picked non-uniform
mesh:

```python
import numpy as np
import voles

kernel = lambda u: np.exp(-u)
g = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))  # exact y(t) = sin(t)

# Non-uniform mesh: more resolution where g is changing fastest
mesh = np.array([0.0, 0.05, 0.12, 0.22, 0.35, 0.50, 0.68, 0.85, 1.0])

sol = voles.solve_vie2(kernel=kernel, g=g, mesh=mesh)

print(sol(0.37), "vs exact", np.sin(0.37))
tt = np.linspace(0, 1, 100)
print("max error:", np.max(np.abs(sol(tt) - np.sin(tt))))
print(sol.t is sol.mesh, sol.y.shape)        # the grid is the mesh: (9,)
```

`sol.y` holds the solution at the breakpoints, and `sol.node_values` at the
collocation times `sol.node_times`, shape `(M, p)`.

## Weakly singular kernel and a graded mesh

For Abel-type kernels $K(u) \sim u^{-\alpha}$, declaring the singularity and
using `optimal_graded_mesh` recovers the full collocation convergence order,
which a uniform mesh does not achieve.

```python
import numpy as np
import voles

# y(t) = g(t) + int_0^t (t-s)^(-1/2) y(s) ds with exact solution y = sqrt(t)
kernel = lambda u: u**-0.5
g = lambda t: np.sqrt(t) - 0.5 * np.pi * t

nodes = np.array([0, 1, 2]) / 2
mesh = voles.optimal_graded_mesh(alpha=0.5, t_end=1.0, n_intervals=30, order=len(nodes))

sol = voles.solve_vie2(kernel=kernel, g=g, mesh=mesh, coll_nodes=nodes,
                       kernel_singularity=0.0)     # declare the singularity at u = 0

err = np.max(np.abs(sol.node_values - np.sqrt(sol.node_times)))
print(f"max error at the collocation times: {err:.2e}")
```

Declaring the singularity matters. The quadrature nodes are all interior,
so an undeclared endpoint singularity usually does **not** raise an error;
the solver quietly loses convergence order, and spends longer in adaptive
fallbacks, instead. If the kernel ever evaluates to `inf` or `nan` at a
quadrature node, a `ValueError` points you to `kernel_singularity`, but do
not rely on that safety net: declare every integrable singularity you know
about. Declaring a singularity on a near-uniform mesh gives a
`voles.AccuracyWarning` suggesting `optimal_graded_mesh`.

## Known power law? Declare it for a much faster build

If you also know the singularity's *exponent*, use the dict form
`kernel_singularity={location: alpha}` for $K(u) \sim |u - u_0|^{-\alpha}$.
Blocks touching the singularity are then integrated by deterministic
Gauss–Jacobi rules with the singular factor absorbed into the quadrature
weight. On the Abel problem above this makes the weight-tensor build several
times faster on a graded mesh, and an order of magnitude faster on a uniform
mesh (where the deterministic rules can be reused across the Toeplitz
assembly), with the same accuracy:

```python
import numpy as np
import voles

kernel = lambda u: u**-0.5
g = lambda t: np.sqrt(t) - 0.5 * np.pi * t   # exact y = sqrt(t)
mesh = voles.optimal_graded_mesh(alpha=0.5, t_end=1.0, n_intervals=30, order=3)

sol = voles.solve_vie2(kernel=kernel, g=g, mesh=mesh,
                       kernel_singularity={0.0: 0.5})   # K(u) ~ u^(-1/2) near u = 0
```

A wrongly declared exponent is caught by a two-order acceptance check and
falls back to the adaptive treatment automatically, so the dict form is never
less accurate than the location-only form. Relatedly, on uniform meshes
`reuse_adaptive_blocks=True` (the default) speeds up the location-only
(adaptive) path by reusing adaptive blocks across the Toeplitz assembly, at
the price of deviations bounded by the quadrature tolerance (~1e-8); with a
fully declared dict form it has no effect.

## Choosing collocation nodes

`coll_nodes` takes any distinct positions in [0, 1] ((0, 1] for VIE-1). The
classical families come from `gauss_legendre_nodes`, `radau_iia_nodes` and
`lobatto_nodes`:

```python
import numpy as np
import voles

kernel = lambda u: np.exp(-u)
g = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))  # exact y(t) = sin(t)

sol = voles.solve_vie2(kernel=kernel, g=g, mesh=np.linspace(0, 1, 21),
                       coll_nodes=voles.gauss_legendre_nodes(3))   # superconvergent
```

Gauss–Legendre nodes give mesh-point superconvergence for VIE-2 and VIDE.
For VIE-1 prefer `radau_iia_nodes`: the right-endpoint node gives the full
collocation order (see the `solve_vie1` notes on convergence).

## Vector-valued kernel

A `kernel(u)` returning a `(d, d)` matrix and a `g(t)` returning `(d,)`:

```python
import numpy as np
import voles

d = 2
identity = np.eye(d)
# np.multiply.outer gives a (d, d) matrix for scalar u and an (n, d, d) stack
# for an array of u values; the solver then assembles the weights of a whole
# mesh row in one call. (np.exp(-u) * identity would only accept scalars and
# runs several times slower.)
kernel = lambda u: np.multiply.outer(np.exp(-u), identity)
g_s = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))
g = lambda t: np.array([g_s(t), g_s(t)])

sol = voles.solve_vie2(kernel=kernel, g=g, mesh=np.linspace(0, 1, 21))

print(sol(0.5).shape)                     # (2,)
print(sol(np.linspace(0, 1, 5)).shape)    # (5, 2)
```

## Matrix-valued: many right-hand sides at once

To solve several right-hand sides that share the same kernel, return a
`(d, m)` array from `g(t)` (or, for `solve_vide`, pass a `(d, m)` `y0`). The
kernel weight tensor, the expensive part to build, is computed once and
reused across all `m` columns, so this is much cheaper than `m` separate
calls.

```python
import numpy as np
import voles

d = 2
identity = np.eye(d)
kernel = lambda u: np.multiply.outer(np.exp(-u), identity)   # vectorised, see above

# Two right-hand sides (m = 2), stacked column-wise into a (d, m) array.
def g(t):
    g0 = np.array([np.sin(t), np.cos(t)])
    g1 = np.array([t, 1.0 + 0.0 * t])
    return np.column_stack([g0, g1])   # shape (d, m)

sol = voles.solve_vie2(kernel=kernel, g=g, mesh=np.linspace(0, 1, 21))

print(sol.node_values.shape)              # (M, p, d, m) == (20, 3, 2, 2)
print(sol(0.5).shape)                     # (d, m) == (2, 2)
print(sol(np.linspace(0, 1, 5)).shape)    # (5, 2, 2)
```

Matrix problems need a `(d, d)` matrix kernel. Complex kernels, `g`, `a`
and initial values work here too.

`solve_vie1` and `solve_vide` take callables the same way. `solve_vide`
also takes an `a` callable and requires `y0`; `solve_vie1` has the optional
`continuous=True` method, which needs `y0` (of shape `(d, m)` in the matrix
case).
