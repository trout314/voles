# Example: Vector- and Matrix-Valued Equations

All solvers can solve for vector-valued and matrix-valued functions $y(t)$.
When $y(t)$ is a $d$-dimensional vector, $g(t)$ is also a $d$-dimensional
vector and $K(t)$ and $a(t)$ are $d \times d$ matrices. When $y(t)$ is a
$d \times m$ matrix ($m$ right-hand sides solved together), $g(t)$ is a
$d \times m$ matrix and $K(t)$ and $a(t)$ are still $d \times d$.

The case is detected from the shapes: of the arrays for sampled inputs, of
the callables' return values otherwise. A problem is matrix-valued when `g`
or `y0` has a column axis; an input without one is shared by every column.
The kernel's work is shared across the $m$ columns, so a matrix solve is much
cheaper than $m$ separate calls. Shapes are summarised on the
[Conventions](../guide/conventions.md#shapes) page.

## A 2×2 system from samples

A 2×2 VIE-1 with constant kernel $K = \begin{bmatrix} 3/2 & -1/2 \\ -1/2 & 3/2 \end{bmatrix}$,
$g(t) = [t + \tfrac{3}{2}t^2,\ t - \tfrac{1}{2}t^2]$, and exact solution
$y(t) = [1 + 2t,\ 1]$:

```python
import numpy as np
import voles

dt = 0.1
t = np.arange(91) * dt
N = len(t)

kernel = np.full((N, 2, 2), [[1.5, -0.5], [-0.5, 1.5]])
g = np.column_stack([t + 1.5 * t**2, t - 0.5 * t**2])      # (N, 2)

sol = voles.solve_vie1(kernel=kernel, g=g, dt=dt)
print(sol.y.shape)                                          # (91, 2)
exact = np.column_stack([1 + 2 * t, np.ones(N)])
print(f"Max error: {np.max(np.abs(sol.y - exact)):.2e}")
print(sol(0.55))                                            # an array of shape (2,)
```

## Several right-hand sides at once

Three initial values for the same VIDE system, $y' = \int_0^t K(t-s) y(s)\,ds$
with a shared vector forcing: `y0` of shape `(d, m)` makes the problem
matrix-valued, and the `(N, d)` forcing is used for every column.

```python
import numpy as np
import voles

dt = 0.01
t = np.arange(201) * dt
N, d = len(t), 2
A = np.array([[-1.0, 0.5], [0.2, -0.8]])
kernel = np.exp(-t)[:, None, None] * A                     # (N, 2, 2)
g = np.column_stack([np.cos(t), np.zeros(N)])              # (N, 2), shared
y0 = np.array([[1.0, 0.0, 2.0],
               [0.0, 1.0, -1.0]])                          # (2, 3): three columns

sol = voles.solve_vide(kernel=kernel, g=g, y0=y0, dt=dt)
print(sol.y.shape)                                         # (201, 2, 3)

# Each column is the vector problem with that initial value:
col = voles.solve_vide(kernel=kernel, g=g, y0=y0[:, 2], dt=dt)
print(np.max(np.abs(sol.y[..., 2] - col.y)))
```

## Callables

A kernel callable returning a `(d, d)` matrix, and `g(t)` returning `(d,)`
or `(d, m)`. Write the kernel so it also accepts a 1-D array of lags,
returning the stacked matrices, and the solver uses it vectorised, which is
much faster: `np.multiply.outer(np.exp(-u), A)` does this, while
`np.exp(-u) * A` works only for scalar `u`.

```python
import numpy as np
import voles

A = np.array([[-1.0, 0.5], [0.2, -0.8]])
kernel = lambda u: np.multiply.outer(np.exp(-u), A)

def g(t):                                                  # two right-hand sides
    return np.column_stack([[np.sin(t), np.cos(t)], [t, 1.0]])   # (2, 2)

sol = voles.solve_vie2(kernel=kernel, g=g, mesh=np.linspace(0, 1, 21))
print(sol.node_values.shape)                               # (20, 3, 2, 2)
print(sol(0.5).shape, sol(np.linspace(0, 1, 5)).shape)     # (2, 2) (5, 2, 2)
```
