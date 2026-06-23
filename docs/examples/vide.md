# Example: Volterra Integro-Differential Equation

Solve the VIDE

$$y'(t) = a(t)y(t) + g(t) + \int_0^t K(t-s)y(s)ds$$

with $a(t) = \frac{1}{1+t^2}$, $K(s) = e^{-s}$, and $g(t)$ chosen so the exact solution is $y(t) = \sin(t)$.

```python
import numpy as np
import matplotlib.pyplot as plt
from voles import solve_VIDE

time_step = 0.01
coll_divs = 3
num_pts = 10 * coll_divs**2 + 1   # 91
times = np.array([i * time_step for i in range(num_pts)])

kernel = np.exp(-times)
a = 1.0 / (1.0 + times**2)
g = (np.cos(times)
     - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
     - np.sin(times) / (1.0 + times**2))

soln_vals, soln_polys = solve_VIDE(
    g_values=g,
    kernel_values=kernel,
    a_values=a,
    soln_init_value=0.0,   # sin(0) = 0
    coll_divs=coll_divs,
    coll_choices=[1, 2, 3],
    time_step=time_step,
    return_function=True,
)

exact = np.sin(times)
print(f"Max error: {np.max(np.abs(soln_vals - exact)):.2e}")

# Plot
for poly in soln_polys:
    t = np.linspace(poly.domain[0], poly.domain[1], coll_divs**2 + 1)
    plt.plot(t, poly(t))
plt.scatter(times[::5], exact[::5], marker='o', facecolors='none', color='black')
plt.xlabel('t')
plt.title('VIDE solution (piecewise polynomials) vs exact')
plt.show()
```
