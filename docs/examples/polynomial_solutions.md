# Example: Working with the Solution

Every solver returns a `VolterraSolution`: on each mesh interval the
solution is an explicit polynomial, fixed by requiring the equation to hold
at the collocation nodes. The object evaluates it, exposes its pieces, and
converts it to a `scipy.interpolate.PPoly` for calculus.

```python
import numpy as np
import voles

# y(t) = sin(t) satisfies this VIDE with K(u) = exp(-u), a(t) = -1
dt = 0.1
t = np.arange(89) * dt
g = 1.5 * np.cos(t) + 0.5 * np.sin(t) - 0.5 * np.exp(-t)
sol = voles.solve_vide(kernel=np.exp(-t), a=-np.ones_like(t), g=g, y0=0.0, dt=dt)
print(sol)
```

## Evaluating

`sol(t)` takes a scalar or an array, anywhere in $[0, T]$; outside it the
result is NaN, never an extrapolation. `sol.y` holds the values on the input
grid `sol.t` (here the samples).

```python
import numpy as np
import voles

dt = 0.1
t = np.arange(89) * dt
g = 1.5 * np.cos(t) + 0.5 * np.sin(t) - 0.5 * np.exp(-t)
sol = voles.solve_vide(kernel=np.exp(-t), a=-np.ones_like(t), g=g, y0=0.0, dt=dt)

print(f"y(0.25) = {sol(0.25):.6f},  exact {np.sin(0.25):.6f}")
print(sol(np.array([0.0, 4.0, 100.0])))          # the last is nan
print(np.max(np.abs(sol(sol.t) - sol.y)))        # the same values, to rounding
```

## Derivatives and integrals

`sol.to_ppoly()` returns the same piecewise polynomial as a
`scipy.interpolate.PPoly`, which differentiates, integrates and finds roots:

```python
import numpy as np
import voles

dt = 0.1
t = np.arange(89) * dt
g = 1.5 * np.cos(t) + 0.5 * np.sin(t) - 0.5 * np.exp(-t)
sol = voles.solve_vide(kernel=np.exp(-t), a=-np.ones_like(t), g=g, y0=0.0, dt=dt)

pp = sol.to_ppoly()
print(f"y'(0.25) = {pp.derivative()(0.25):.6f},  exact {np.cos(0.25):.6f}")
print(f"integral over [0, pi] = {pp.integrate(0, np.pi):.6f},  exact 2")
print("zeros:", pp.roots())                      # 0, π and 2π
```

## The pieces

| attribute | shape | |
|---|---|---|
| `mesh` | `(M + 1,)` | the breakpoints |
| `coefficients` | `(M, P, ...)` | interval n's polynomial in the local variable x = (t − tₙ)/hₙ ∈ [0, 1], monomial, lowest degree first |
| `node_times` | `(M, p)` | the collocation times |
| `node_values` | `(M, p, ...)` | the solution there |
| `nodes` | `(p,)` | the node positions in [0, 1] |

So interval n's polynomial evaluates as
`np.polynomial.polynomial.polyval(x, sol.coefficients[n])`:

```python
import numpy as np
import voles

dt = 0.1
t = np.arange(89) * dt
g = 1.5 * np.cos(t) + 0.5 * np.sin(t) - 0.5 * np.exp(-t)
sol = voles.solve_vide(kernel=np.exp(-t), a=-np.ones_like(t), g=g, y0=0.0, dt=dt)

n, tq = 3, 0.65
x = (tq - sol.mesh[n]) / (sol.mesh[n + 1] - sol.mesh[n])
print(np.polynomial.polynomial.polyval(x, sol.coefficients[n]), sol(tq))
print(sol.node_times[n], sol.node_values[n])
```

## Values at breakpoints

VIE-1 and VIE-2 solutions are in general discontinuous at the breakpoints.
There `sol(t)` reports the mean of the two one-sided limits; ask for either
limit with `at_breakpoints`:

```python
import numpy as np
import voles

sol = voles.solve_vie1(kernel=lambda u: np.exp(-u), g=np.sin, mesh=np.linspace(0, 1, 5))
for side in ("left", "mean", "right"):
    print(side, sol(0.5, at_breakpoints=side))
print("exact", np.cos(0.5) + np.sin(0.5))
```

Which convention is the most accurate depends on the node set; see
[Values at breakpoints](../guide/conventions.md#values-at-breakpoints).
`to_ppoly()` is right-continuous: at a breakpoint it uses the polynomial of
the interval on the right.
