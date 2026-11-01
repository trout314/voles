# Example: Complex-Valued Equations

Pass complex arrays for the kernel, the forcing function and (for the VIDE)
the initial value, and the solution is complex. This works for scalar,
vector, and matrix problems alike, and for callables that return complex
values.

```python
import numpy as np
import voles

dt = 0.05
t = np.arange(41) * dt
sol = voles.solve_vie2(kernel=np.exp(-1j * t), g=np.ones_like(t), dt=dt)
print(sol.y.dtype, type(sol(0.5)))      # complex128 <class 'complex'>
```

A complex oscillator as a VIDE with callables: $y' = i\omega y$, $y(0) = 1$,
has the solution $e^{i\omega t}$.

```python
import numpy as np
import voles

omega = 2.0
sol = voles.solve_vide(kernel=lambda u: np.zeros_like(u), a=lambda t: 1j * omega,
                       y0=1.0, mesh=np.linspace(0, 3, 61))
tt = np.linspace(0, 3, 301)
print(f"max error {np.max(np.abs(sol(tt) - np.exp(1j * omega * tt))):.1e}")
```
