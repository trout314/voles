# Example: Type-1 Volterra Integral Equation

Solve the VIE-1

$$g(t) = \int_0^t K(t-s)y(s)ds$$

with $K(s) = e^s$, $g(t) = \sin(t)$, whose exact solution is $y(t) = \cos(t) - \sin(t)$.

```python
import numpy as np
from voles import solve_VIE_1

time_step = 0.01
coll_divs = 3
num_pts = 10 * coll_divs**2 + 1   # 91
times = np.array([i * time_step for i in range(num_pts)])

kernel = np.exp(times)
g = np.sin(times)
g[0] = 0.0

sol_vals, solution = solve_VIE_1(
    g_values=g,
    kernel_values=kernel,
    coll_divs=coll_divs,
    coll_choices=[1, 2, 3],
    time_step=time_step,
    return_function=True,
)

exact = np.cos(times) - np.sin(times)
print(f"Max error: {np.max(np.abs(sol_vals - exact)):.2e}")
assert np.max(np.abs(sol_vals - exact)) < 1e-3

# `solution` is callable at any time, and also indexes/iterates like the
# per-interval polynomials (solution[n], for poly in solution, ...).
exact_at = np.cos(0.5) - np.sin(0.5)
print(f"y(0.5) = {solution(0.5):.6f}  (exact {exact_at:.6f})")
```
