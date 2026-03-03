# Example: Type-2 Volterra Integral Equation

Solve the VIE-2

```
y(t) = g(t) + ∫₀ᵗ K(t−s) y(s) ds
```

with `K(s) = e⁻ˢ` and `g(t)` chosen so the exact solution is `y(t) = sin(t)`.

```python
import numpy as np
import matplotlib.pyplot as plt
from volterra_equation_solvers import solve_VIE_2

time_step = 0.05
coll_divs = 3
num_pts = 10 * coll_divs**2 + 1   # 91
times = np.array([i * time_step for i in range(num_pts)])

kernel = np.exp(-times)
g = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))

soln_vals, soln_polys = solve_VIE_2(
    g_values=g,
    kernel_values=kernel,
    coll_divs=coll_divs,
    coll_choices=[0, 1, 2, 3],
    time_step=time_step,
    return_polys=True,
)

exact = np.sin(times)
print(f"Max error: {np.max(np.abs(soln_vals - exact)):.2e}")

# Plot
for poly in soln_polys:
    t = np.linspace(poly.domain[0], poly.domain[1], coll_divs**2 + 1)
    plt.plot(t, poly(t))
plt.scatter(times[::5], exact[::5], marker='o', facecolors='none', color='black')
plt.xlabel('t')
plt.title('VIE-2 solution (piecewise polynomials) vs exact')
plt.show()
```
