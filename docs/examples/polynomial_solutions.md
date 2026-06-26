# Example: Polynomial Solutions (`return_function`)

The solvers approximate each component of $y(t)$ as a piecewise polynomial: the
time axis is divided into mesh intervals, and on each interval the solution is
an explicit polynomial fixed by requiring the Volterra equation to hold at a set
of collocation points within that interval.

Because the solution on each interval is an explicit polynomial, the solver can
return it. Passing `return_function=True` to any solver returns a
`(soln_values, solution)` tuple (`return_polys=True` is a deprecated alias).
`solution(t)` evaluates the piecewise polynomial at any time, and `solution`
also indexes/iterates like a list of `numpy.polynomial.Polynomial` objects
covering successive mesh intervals — these can be evaluated at any point,
differentiated, integrated, and so on.

The following example uses `solve_VIDE` to solve for $y(t) = \sin(t)$, then
evaluates the solution and its derivative at a point not on the time grid:

```python
import numpy as np
from voles import solve_VIDE

# y(t) = sin(t) satisfies this VIDE with K(s) = exp(-s), a(t) = -1
time_step = 0.1
times = np.arange(0, 9.1, time_step)   # 91 points
kernel = np.exp(-times)
a = np.full(len(times), -1.0)
g = 1.5*np.cos(times) + 0.5*np.sin(times) - 0.5*np.exp(-times)

soln_vals, solution = solve_VIDE(
    kernel_values=kernel,
    a_values=a,
    g_values=g,
    soln_init_value=0.0,
    time_step=time_step,
    return_function=True,
)

# solution(t) evaluates the piecewise polynomial directly:
print(f"y(0.2)  ≈ {solution(0.2):.6f},  exact = {np.sin(0.2):.6f}")

# solution also indexes like the per-interval polynomials:
p = solution[0]                         # numpy.polynomial.Polynomial on t ∈ [0, 0.4]

# Differentiate to recover y'(t):
print(f"y'(0.2) ≈ {p.deriv()(0.2):.6f},  exact = {np.cos(0.2):.6f}")
```
