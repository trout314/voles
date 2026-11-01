# Example: Type-2 Volterra Integral Equation

Solve the VIE-2

$$y(t) = g(t) + \int_0^t K(t-s)y(s)ds$$

with $K(u) = e^{-u}$ (as a function of the lag $u = t - s$) and $g(t)$ chosen so the exact solution is $y(t) = \sin(t)$.

```python
import numpy as np
import voles

dt = 0.05
t = np.arange(91) * dt                 # 91 samples
g = np.sin(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t))

sol = voles.solve_vie2(kernel=np.exp(-t), g=g, dt=dt, coll_setting=(3, [0, 1, 2, 3]))

print(f"Max error: {np.max(np.abs(sol.y - np.sin(t))):.2e}")
assert np.max(np.abs(sol.y - np.sin(t))) < 1e-3

# The solution is a piecewise polynomial: evaluate it anywhere in [0, T].
print(f"y(0.5) = {sol(0.5):.6f}  (exact {np.sin(0.5):.6f})")
```
