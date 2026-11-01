# Example: Volterra Integro-Differential Equation

Solve the VIDE

$$y'(t) = a(t)y(t) + g(t) + \int_0^t K(t-s)y(s)ds$$

with $a(t) = \frac{1}{1+t^2}$, $K(u) = e^{-u}$, and $g(t)$ chosen so the exact solution is $y(t) = \sin(t)$.

```python
import numpy as np
import voles

dt = 0.01
t = np.arange(91) * dt                 # 91 samples
a = 1.0 / (1.0 + t**2)
g = (np.cos(t)
     - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t))
     - np.sin(t) / (1.0 + t**2))

sol = voles.solve_vide(kernel=np.exp(-t), a=a, g=g, y0=0.0,      # sin(0) = 0
                       dt=dt, coll_setting=(3, [1, 2, 3]))

print(f"Max error: {np.max(np.abs(sol.y - np.sin(t))):.2e}")
assert np.max(np.abs(sol.y - np.sin(t))) < 1e-3

# The VIDE solution is continuous; evaluate it anywhere in [0, T].
print(f"y(0.5) = {sol(0.5):.6f}  (exact {np.sin(0.5):.6f})")
```
