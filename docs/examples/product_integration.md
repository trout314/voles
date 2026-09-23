# Example: Product integration for sampled kernels

The array-based solvers take the kernel as samples `K(u)` on a grid of spacing
`time_step`. By default (`quadrature="collocation"`) every integral in the
collocation equations is evaluated with the interpolatory rule on the
collocation nodes themselves (Brunner 2004, Section 2.4.5). That rule needs the
kernel at the *scaled* nodes of each partial interval, which fall on samples
only when the mesh is `coll_divs**2` samples wide, so:

* the mesh width is `coll_divs**2 * time_step`, and at a fixed sampling rate an
  order-$m$ method carries an error constant $\text{coll\_divs}^{2m}$ times
  larger than the same method on a mesh one sample wide;
* only every `coll_divs`-th sample of the data enters the history sums.

`quadrature="product"` removes the constraint in the classical way (Linz, *BIT*
11, 1971; de Hoog and Weiss, *SIAM J. Numer. Anal.* 10, 1973): the kernel is
replaced by its piecewise-polynomial interpolant of degree `kernel_interp_degree`
on the data grid (default: the number of collocation nodes) and its products
with the collocation polynomial are integrated exactly. The mesh can then be any
multiple `mesh_samples` of `coll_divs` samples wide (default `coll_divs`, the
finest), every sample is used, any convergent node set works without the numba
fallback, and the FFT-accelerated history of the D extension is still used.

## A first-kind equation on coarsely sampled data

The Rubin model (a particle at the end of a semi-infinite harmonic chain) has
the correlation function $C(t) = J_1(2t)/t$ and the memory kernel
$\mathcal{K}(t) = -C(t)$, related by $\dot C(t) = \int_0^t C(t-s)\mathcal{K}(s)ds$.
Sampled at `time_step = 0.125`, about 25 samples per oscillation period, the
default quadrature puts the order-3 method on a mesh of width 1.125.

```python
import numpy as np
from scipy.special import j1, jv
from voles import solve_VIE_1

time_step = 0.125
num_pts = 32 * 3**2 + 1                      # valid for both quadratures
times = time_step * np.arange(num_pts)
with np.errstate(all="ignore"):
    C = j1(2 * times) / times                # kernel
    C_dot = -2 * jv(2, 2 * times) / times    # right-hand side
    K_exact = -j1(2 * times) / times
C[0], C_dot[0], K_exact[0] = 1.0, 0.0, -1.0

common = dict(kernel_values=C, g_values=C_dot, time_step=time_step,
              coll_divs=3, coll_choices=[1, 2, 3], show_warnings=False)

K_coll = solve_VIE_1(**common)                             # mesh 9 samples wide
K_prod = solve_VIE_1(quadrature="product", **common)       # mesh 3 samples wide

err_coll = np.max(np.abs(K_coll - K_exact))
err_prod = np.max(np.abs(K_prod - K_exact))
print(f"collocation quadrature: max error {err_coll:.1e}")
print(f"product integration:    max error {err_prod:.1e}")
assert err_prod < err_coll / 10
```

`mesh_samples` chooses the mesh explicitly. With `mesh_samples=9` the mesh is
the same as the default quadrature's, but the integrals now use all nine
samples of each interval rather than three of them:

```python
import numpy as np
from scipy.special import j1, jv
from voles import solve_VIE_1

time_step = 0.125
times = time_step * np.arange(32 * 9 + 1)
with np.errstate(all="ignore"):
    C = j1(2 * times) / times
    C_dot = -2 * jv(2, 2 * times) / times
    K_exact = -j1(2 * times) / times
C[0], C_dot[0], K_exact[0] = 1.0, 0.0, -1.0

K_prod9 = solve_VIE_1(kernel_values=C, g_values=C_dot, time_step=time_step,
                      coll_divs=3, coll_choices=[1, 2, 3],
                      quadrature="product", mesh_samples=9, show_warnings=False)
print(f"product integration, mesh_samples=9: max error "
      f"{np.max(np.abs(K_prod9 - K_exact)):.1e}")
```

The input length must satisfy `len(kernel_values) = (N × mesh_samples) + 1`;
longer inputs are truncated with a warning, as for the default quadrature.

**Noisy data and first-kind equations.** Inverting a first-kind equation
amplifies errors in the data by roughly the inverse of the mesh width, so on
noisy data the finest mesh is not automatically the best choice.
`mesh_samples` is the knob: larger values trade resolution for a milder
amplification. The second-kind equation and the VIDE below are well posed and
have no such trade-off.

## Propagating with a sampled kernel: the VIDE

The same keywords apply to `solve_VIE_2` and `solve_VIDE`. Here the memory
kernel $K(u) = -e^{-u/2}$ is sampled and the correlation function is
propagated forward from $y(0) = 1$; the exact solution satisfies
$y'' + y'/2 + y = 0$.

```python
import numpy as np
from voles import solve_VIDE

time_step = 0.1
num_pts = 20 * 3**2 + 1
times = time_step * np.arange(num_pts)
kernel = -np.exp(-times / 2)
omega = np.sqrt(1 - 1 / 16)
exact = np.exp(-times / 4) * (np.cos(omega * times) + np.sin(omega * times) / (4 * omega))

common = dict(kernel_values=kernel, soln_init_value=1.0, time_step=time_step,
              coll_divs=3, coll_choices=[1, 2, 3], show_warnings=False)
y_coll = solve_VIDE(**common)
y_prod = solve_VIDE(quadrature="product", **common)

err_coll = np.max(np.abs(y_coll - exact))
err_prod = np.max(np.abs(y_prod - exact))
print(f"collocation quadrature: max error {err_coll:.1e}")
print(f"product integration:    max error {err_prod:.1e}")
assert err_prod < err_coll / 5
```

Because product integration evaluates the weights in Python from the samples
and only needs the D extension for the stepping, node sets that are not
compiled into the extension are also available:

```python
import numpy as np
from voles import solve_VIDE

time_step = 0.1
times = time_step * np.arange(20 * 5 + 1)
kernel = -np.exp(-times / 2)
y5 = solve_VIDE(quadrature="product", kernel_values=kernel, soln_init_value=1.0,
                time_step=time_step, coll_divs=5, coll_choices=[1, 2, 3, 4, 5],
                show_warnings=False)
omega = np.sqrt(1 - 1 / 16)
exact = np.exp(-times / 4) * (np.cos(omega * times) + np.sin(omega * times) / (4 * omega))
assert np.max(np.abs(y5 - exact)) < 1e-4
```
