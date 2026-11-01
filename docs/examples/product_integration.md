# Example: Product integration for sampled kernels

With sampled inputs the kernel is given as samples `K(u)` on a grid of
spacing `dt`. With `quadrature="collocation"` every integral in the
collocation equations is evaluated with the interpolatory rule on the
collocation nodes themselves (Brunner 2004, Section 2.4.5). That rule needs the
kernel at the *scaled* nodes of each partial interval, which fall on samples
only when the mesh is `divs**2` samples wide, for `coll_setting=(divs, choices)`,
so:

* the mesh width is `divs**2 * dt`, and at a fixed sampling rate an order-$m$
  method carries an error constant $\text{divs}^{m}$ times larger than the
  same method on a mesh `divs` samples wide;
* only every `divs`-th sample of the data enters the history sums.

`quadrature="product"` removes the constraint in the classical way (Linz, *BIT*
11, 1971; de Hoog and Weiss, *SIAM J. Numer. Anal.* 10, 1973): the kernel is
replaced by its piecewise-polynomial interpolant of degree `kernel_interp_degree`
on the data grid (default: the number of collocation nodes) and its products
with the collocation polynomial are integrated exactly. The mesh can then be any
multiple `samples_per_interval` of `divs` samples wide, every sample is used, any
convergent node set works without the numba fallback, and the FFT-accelerated
history of the D extension is still used. Product integration is the default
quadrature of all three solvers. The default mesh is the finest one,
`samples_per_interval=divs`, for `solve_vie2` and `solve_vide`; for
`solve_vie1` it stays at `divs**2` samples, because inverting a first-kind
equation amplifies errors in the data by roughly the inverse of the mesh
width (see below). The collocation quadrature remains available as
`quadrature="collocation"`; it runs in compiled code specialised per setting
and is a few times faster.

## A first-kind equation on coarsely sampled data

The Rubin model (a particle at the end of a semi-infinite harmonic chain) has
the correlation function $C(t) = J_1(2t)/t$ and the memory kernel
$\mathcal{K}(t) = -C(t)$, related by $\dot C(t) = \int_0^t C(t-s)\mathcal{K}(s)ds$.
Sampled at `dt = 0.125`, about 25 samples per oscillation period, the
collocation quadrature puts the order-3 method on a mesh of width 1.125.

```python
import numpy as np
from scipy.special import j1, jv
import voles

dt = 0.125
times = dt * np.arange(32 * 3**2 + 1)
with np.errstate(all="ignore"):
    C = j1(2 * times) / times                # kernel
    C_dot = -2 * jv(2, 2 * times) / times    # right-hand side
    K_exact = -j1(2 * times) / times
C[0], C_dot[0], K_exact[0] = 1.0, 0.0, -1.0

common = dict(kernel=C, g=C_dot, dt=dt, coll_setting=(3, [1, 2, 3]))

K_coll = voles.solve_vie1(quadrature="collocation", **common)   # mesh 9 samples wide
K_prod = voles.solve_vie1(samples_per_interval=3, **common)     # product: 3 samples wide

err_coll = np.max(np.abs(K_coll.y - K_exact))
err_prod = np.max(np.abs(K_prod.y - K_exact))
print(f"collocation quadrature: max error {err_coll:.1e}")
print(f"product integration:    max error {err_prod:.1e}")
assert err_prod < err_coll / 10
```

`samples_per_interval` chooses the mesh explicitly. With `samples_per_interval=9` the mesh is
the same as the collocation quadrature's, but the integrals now use all nine
samples of each interval rather than three of them:

```python
import numpy as np
from scipy.special import j1, jv
import voles

dt = 0.125
times = dt * np.arange(32 * 9 + 1)
with np.errstate(all="ignore"):
    C = j1(2 * times) / times
    C_dot = -2 * jv(2, 2 * times) / times
    K_exact = -j1(2 * times) / times
C[0], C_dot[0], K_exact[0] = 1.0, 0.0, -1.0

K_prod9 = voles.solve_vie1(kernel=C, g=C_dot, dt=dt, coll_setting=(3, [1, 2, 3]),
                           quadrature="product", samples_per_interval=9)
print(f"product integration, samples_per_interval=9: max error "
      f"{np.max(np.abs(K_prod9.y - K_exact)):.1e}")
```

Any input length of at least `samples_per_interval + 1` is accepted; as for the
default quadrature, leftover samples past the last regular mesh interval are
absorbed by stretching that interval, so the solution covers every sample.

**Noisy data and first-kind equations.** Inverting a first-kind equation
amplifies errors in the data by roughly the inverse of the mesh width, so on
noisy data the finest mesh is not automatically the best choice.
`samples_per_interval` is the knob: larger values trade resolution for a
milder amplification; [Conventions](../guide/conventions.md#vie-1-mesh-width-and-noisy-data)
has measurements. The second-kind equation and the VIDE below are well posed
and have no such trade-off.

## Propagating with a sampled kernel: the VIDE

The same keywords apply to `solve_vie2` and `solve_vide`. Here the memory
kernel $K(u) = -e^{-u/2}$ is sampled and the correlation function is
propagated forward from $y(0) = 1$; the exact solution satisfies
$y'' + y'/2 + y = 0$.

```python
import numpy as np
import voles

dt = 0.1
times = dt * np.arange(20 * 3**2 + 1)
kernel = -np.exp(-times / 2)
omega = np.sqrt(1 - 1 / 16)
exact = np.exp(-times / 4) * (np.cos(omega * times) + np.sin(omega * times) / (4 * omega))

common = dict(kernel=kernel, y0=1.0, dt=dt, coll_setting=(3, [1, 2, 3]))
y_coll = voles.solve_vide(quadrature="collocation", **common)
y_prod = voles.solve_vide(**common)                 # product integration is the default

err_coll = np.max(np.abs(y_coll.y - exact))
err_prod = np.max(np.abs(y_prod.y - exact))
print(f"collocation quadrature: max error {err_coll:.1e}")
print(f"product integration:    max error {err_prod:.1e}")
assert err_prod < err_coll / 5
```

Because product integration evaluates the weights in Python from the samples
and only needs the D extension for the stepping, node sets that are not
compiled into the extension are also available:

```python
import numpy as np
import voles

dt = 0.1
times = dt * np.arange(20 * 5 + 1)
kernel = -np.exp(-times / 2)
y5 = voles.solve_vide(kernel=kernel, y0=1.0, dt=dt, coll_setting=(5, [1, 2, 3, 4, 5]))
omega = np.sqrt(1 - 1 / 16)
exact = np.exp(-times / 4) * (np.cos(omega * times) + np.sin(omega * times) / (4 * omega))
assert np.max(np.abs(y5.y - exact)) < 1e-4
```
