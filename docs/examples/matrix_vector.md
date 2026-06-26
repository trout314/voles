# Example: Vector- and Matrix-Valued Equations

All solvers can solve for vector-valued and matrix-valued functions $y(t)$.
When $y(t)$ is a $d$-dimensional vector, $g(t)$ is also a $d$-dimensional vector
and $K(t)$ and $a(t)$ are $d \times d$ matrices. When $y(t)$ is a $d \times m$
matrix, $g(t)$ is also a $d \times m$ matrix and $K(t)$ and $a(t)$ are
$d \times d$ matrices.

The case is detected automatically: for the array-based family from the shapes
of the input arrays, and for the callable family from the shape returned by
`g(t)` (a `(d, m)` return — or a `(d, m)` `soln_init_value` for VIDE — selects
the matrix case). The callable family builds the kernel weight tensor once and
shares it across the $m$ columns, so a matrix solve is much cheaper than $m$
separate calls; see the [callable-solver examples](function_solvers.md) for a
worked case.

## Array-based 2×2 example

A 2×2 VIE-1 with constant kernel $K = \begin{bmatrix} 3/2 & -1/2 \\ -1/2 & 3/2 \end{bmatrix}$,
$g(t) = [t + \tfrac{3}{2}t^2,\ t - \tfrac{1}{2}t^2]$, and exact solution
$y(t) = [1 + 2t,\ 1]$:

```python
import numpy as np
from voles import solve_VIE_1

time_step = 0.1
times = np.arange(0, 9.1, time_step)   # 91 pts = 10×3² + 1
N = len(times)

kernel = np.full((N, 2, 2), [[1.5, -0.5], [-0.5, 1.5]])

g = np.zeros((N, 2))
g[:, 0] = times + 1.5 * times**2
g[:, 1] = times - 0.5 * times**2

soln = solve_VIE_1(kernel_values=kernel, g_values=g, time_step=time_step)
# soln shape: (N, 2)
exact = np.column_stack([1 + 2*times, np.ones(N)])
print(f"Max error: {np.max(np.abs(soln - exact)):.2e}")
```
