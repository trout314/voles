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
mesh = optimal_graded_mesh(alpha=0.5, T=1.0, M=30, coll_choices=coll_choices)

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

If you forget to declare the singularity, the solver raises a `ValueError`
with a clear pointer to the `kernel_singularity` parameter — the weight
tensor's `np.isfinite` check fires before any garbage solution can be
returned.

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
