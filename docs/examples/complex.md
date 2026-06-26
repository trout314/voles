# Example: Complex-Valued Equations

All three solvers accept complex-valued inputs. Pass complex NumPy arrays for
the kernel, forcing function, and (for VIDE) initial value, and the solver
returns a complex-valued solution. This works for scalar, vector, and matrix
cases alike (and for the callable-input family too — pass callables that return
complex values).

```python
import numpy as np
from voles import solve_VIE_2

time_step = 0.05
times = np.arange(0, 2.1, time_step)
kernel = np.exp(-1j * times)               # complex kernel
g = np.ones_like(times, dtype=complex)

soln = solve_VIE_2(kernel_values=kernel, g_values=g, time_step=time_step)
# soln is a complex-valued array
print(soln.dtype)
```
