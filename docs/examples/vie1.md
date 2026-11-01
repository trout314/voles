# Example: Type-1 Volterra Integral Equation

Solve the VIE-1

$$g(t) = \int_0^t K(t-s)y(s)ds$$

with $K(u) = e^u$ (as a function of the lag $u = t - s$), $g(t) = \sin(t)$, whose exact solution is $y(t) = \cos(t) - \sin(t)$.

```python
import numpy as np
import voles

dt = 0.01
t = np.arange(91) * dt                 # 91 samples

sol = voles.solve_vie1(kernel=np.exp(t), g=np.sin(t), dt=dt, coll_setting=(3, [1, 2, 3]))

exact = np.cos(t) - np.sin(t)
print(f"Max error: {np.max(np.abs(sol.y - exact)):.2e}")
assert np.max(np.abs(sol.y - exact)) < 1e-3

# The solution is a piecewise polynomial: evaluate it anywhere in [0, T].
print(f"y(0.5) = {sol(0.5):.6f}  (exact {np.cos(0.5) - np.sin(0.5):.6f})")
```

The same equation with callables, on a mesh of 30 intervals and the Radau
IIA nodes, which give the first-kind method its full order (see
[Conventions](../guide/conventions.md#collocation-nodes)):

```python
import numpy as np
import voles

sol = voles.solve_vie1(kernel=np.exp, g=np.sin, mesh=np.linspace(0, 0.9, 31),
                       coll_nodes=voles.radau_iia_nodes(3))
tt = np.linspace(0, 0.9, 200)
print(f"Max error: {np.max(np.abs(sol(tt) - (np.cos(tt) - np.sin(tt)))):.2e}")
```
