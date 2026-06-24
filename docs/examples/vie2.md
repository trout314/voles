# Example: Type-2 Volterra Integral Equation

Solve the VIE-2

$$y(t) = g(t) + \int_0^t K(t-s)y(s)ds$$

with $K(s) = e^{-s}$ and $g(t)$ chosen so the exact solution is $y(t) = \sin(t)$.

```python
import numpy as np
from voles import solve_VIE_2

time_step = 0.05
coll_divs = 3
num_pts = 10 * coll_divs**2 + 1   # 91
times = np.array([i * time_step for i in range(num_pts)])

kernel = np.exp(-times)
g = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))

soln_vals, solution = solve_VIE_2(
    g_values=g,
    kernel_values=kernel,
    coll_divs=coll_divs,
    coll_choices=[0, 1, 2, 3],
    time_step=time_step,
    return_function=True,
)

exact = np.sin(times)
print(f"Max error: {np.max(np.abs(soln_vals - exact)):.2e}")
assert np.max(np.abs(soln_vals - exact)) < 1e-3

# `solution` is callable at any time, and also indexes/iterates like the
# per-interval polynomials (solution[n], for poly in solution, ...).
print(f"y(0.5) = {solution(0.5):.6f}  (exact {np.sin(0.5):.6f})")
```
