# Example: Type-1 Volterra Integral Equation

Solve the VIE-1

$$g(t) = \int_0^t K(t-s)y(s)ds$$

with $K(s) = e^s$, $g(t) = \sin(t)$, whose exact solution is $y(t) = \cos(t) - \sin(t)$.

```python
import numpy as np
import matplotlib.pyplot as plt
from voles import solve_VIE_1

time_step = 0.1
coll_divs = 3
num_pts = 10 * coll_divs**2 + 1   # 91
times = np.array([i * time_step for i in range(num_pts)])

kernel = np.exp(times)
g = np.sin(times)
g[0] = 0.0

sol_vals, soln_polys = solve_VIE_1(
    g_values=g,
    kernel_values=kernel,
    coll_divs=coll_divs,
    coll_choices=[1, 2, 3],
    time_step=time_step,
    return_polys=True,
)

exact = np.cos(times) - np.sin(times)
print(f"Max error: {np.max(np.abs(sol_vals - exact)):.2e}")

# Plot
for poly in soln_polys:
    t = np.linspace(poly.domain[0], poly.domain[1], coll_divs**2 + 1)
    plt.plot(t, poly(t))
plt.scatter(times[::5], exact[::5], marker='o', facecolors='none', color='black')
plt.xlabel('t')
plt.title('VIE-1 solution (piecewise polynomials) vs exact')
plt.show()
```
