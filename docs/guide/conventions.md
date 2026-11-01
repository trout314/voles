# Conventions

This page collects the rules every solver follows: how the input types
select a regime, what the shapes mean, how a solution is evaluated, and why
the first-kind solver uses a wider mesh by default.

## The three equations

All kernels are of convolution type, $K(t - s)$:

$$\text{VIE-1:}\quad g(t) = \int_0^t K(t-s)\,y(s)\,ds$$

$$\text{VIE-2:}\quad y(t) = g(t) + \int_0^t K(t-s)\,y(s)\,ds$$

$$\text{VIDE:}\quad y'(t) = a(t)\,y(t) + g(t) + \int_0^t K(t-s)\,y(s)\,ds,\qquad y(0) = y_0$$

They are solved by `solve_vie1`, `solve_vie2` and `solve_vide`. Every
parameter is keyword-only. `g=None` means g ≡ 0 and `a=None` means a ≡ 0;
`solve_vide` requires `y0`.

## Two input regimes

The types of the data inputs (`kernel`, `g`, and for the VIDE `a`) decide
how the problem is posed:

| | sampled | functional |
|---|---|---|
| Inputs | arrays of samples at t = 0, dt, …, (N−1)·dt | callables, `kernel(u)`, `g(t)`, `a(t)` |
| Grid | `dt` (default 1.0); the solver builds a uniform mesh | `mesh`, required: the breakpoints, from 0 to T |
| Node set | `coll_setting` | `coll_nodes` |
| Options of this regime only | `dt`, `coll_setting`, `quadrature`, `samples_per_interval`, `kernel_interp_degree` | `mesh`, `coll_nodes`, `kernel_singularity`, `reuse_adaptive_blocks` |

- Anything for which `callable(x)` is true counts as a callable: functions,
  lambdas, `numpy.polynomial.Polynomial`, scipy interpolators, numba
  functions. NumPy arrays are not callable.
- An option of the other regime is a `ValueError` that names the regime and
  why it was chosen. In particular `mesh=` with arrays and `coll_setting=`
  with callables are errors, so you can't silently get a different method
  from the one you asked for.
- Mixing the two, e.g. an analytic kernel with sampled `g`, raises
  `NotImplementedError` for now. The combination is reserved for a later
  release.

```python
import numpy as np
import voles

t = np.linspace(0, 2, 201)
sampled = voles.solve_vie2(kernel=np.exp(-t), g=np.cos(t), dt=t[1])
functional = voles.solve_vie2(kernel=lambda u: np.exp(-u), g=np.cos,
                              mesh=np.linspace(0, 2, 41))
print(sampled.regime, functional.regime)          # sampled functional
print(abs(sampled(1.3) - functional(1.3)) < 1e-5)  # True
```

### The sampled mesh

In the sampled regime the mesh is uniform, `samples_per_interval` (Q)
samples wide, so its width is h = Q·dt. When N − 1 is not a multiple of Q,
the final interval is made longer (up to 2Q samples) to take up the
leftover samples. The solution is still returned at every sample, and the
convergence order is kept. The kernel needs at least Q + 1 samples.

| `quadrature` | allowed Q | default Q |
|---|---|---|
| `"product"` (default) | any positive multiple of `divs` | `divs²` for VIE-1, `divs` for VIE-2 and VIDE |
| `"collocation"` | exactly `divs²` | `divs²` |

`"product"` integrates a piecewise polynomial interpolant of the kernel
exactly, uses every sample and accepts any node set. `"collocation"` uses
the interpolatory rule on the nodes. It is a few times faster, but runs only
the settings compiled into the extension (`divs` ≤ 4 in current builds) or,
for scalar problems, the numba fallback. See
[Product integration](../examples/product_integration.md).

## Collocation nodes

On each mesh interval the solution is a polynomial, fixed by requiring the
equation to hold at p collocation nodes cᵢ ∈ [0, 1] (local coordinates).

**Sampled regime: `coll_setting`.** The nodes must sit on samples, so they
are given as integers: `coll_setting=(divs, choices)` means
cᵢ = choicesᵢ / divs.

| value | meaning |
|---|---|
| `None` | VIE-1 `(3, [1, 2, 3])`; VIE-2 and VIDE `(2, [0, 1, 2])` |
| `divs` | every admissible point: `(divs, [1, …, divs])` for VIE-1, `(divs, [0, …, divs])` otherwise |
| `(divs, choices)` | nodes `choices / divs`; `choices` in any order, distinct |

`divs` also fixes the mesh width (above), so settings with the same node
positions but different `divs` are different methods. Floats are rejected,
even integer-valued ones, rather than rounded: running a different
discretisation silently is worse than an error.

**Functional regime: `coll_nodes`.** Any distinct floats in [0, 1]
((0, 1] for VIE-1). The default has the same positions as the sampled
default. The classical families come from
[`gauss_legendre_nodes`](../api/coll_nodes.md),
`radau_iia_nodes` and `lobatto_nodes`.

**VIE-1 admissibility.** A first-kind collocation method converges only if
the node set's amplification factor satisfies |ρ| ≤ 1, where

$$\rho = (-1)^p \prod_{i=1}^{p} \frac{1 - c_i}{c_i}$$

for the default discontinuous method (Brunner 2004, Theorem 2.4.2), and the
same product over i < p, with c_p = 1, for `continuous=True` (Theorem
2.4.5). Other node sets are a `ValueError`. A node set with −1 ≤ ρ < 1 has
the method's full order; ρ = +1 converges one order lower and gives an
`AccuracyWarning`.

- Radau IIA nodes have ρ = 0 and the full order p, which makes them the
  usual choice for the discontinuous method. They don't suit
  `continuous=True`: there |ρ| = p, so that method diverges for every
  p ≥ 2. The default nodes {1/3, 2/3, 1} work for both methods.
- Gauss–Legendre nodes are symmetric, so ρ = (−1)ᵖ: odd p keeps the full
  order, even p loses one.

## Shapes

The time axis comes first. The component shape `cs` is `()` for a scalar
problem, `(d,)` for a system of d equations, and `(d, m)` for m right-hand
sides solved together.

| input | sampled | functional (the callable's return value) |
|---|---|---|
| `kernel` | `(N,)` or `(N, d, d)` | scalar or `(d, d)` |
| `g` | `(N,)`, `(N, d)` or `(N, d, m)` | scalar, `(d,)` or `(d, m)` |
| `a` (VIDE) | `(N,)` or `(N, d, d)` | scalar or `(d, d)` |
| `y0` | scalar, `(d,)` or `(d, m)` | the same |

- **Matrix mode.** The problem has m columns exactly when some input has a
  column axis (`g` of `(N, d, m)` or `(d, m)`, or `y0` of `(d, m)`). Inputs
  without one are shared by all columns, so a `(d,)` `y0` with a matrix `g`,
  or a vector `g` with a `(d, m)` `y0`, both work. The columns are
  independent problems with a common kernel; the kernel's work is shared
  and the columns may run in parallel threads.
- **Callable kernels** are called with one argument u = t − s ≥ 0. A kernel
  that also accepts a 1-D array of u, returning the stacked values, is
  detected and used vectorised, which is much faster. For a matrix kernel
  `np.multiply.outer(np.exp(-u), A)` vectorises, `np.exp(-u) * A` does not.
- **Complex** inputs give a complex solution. Integer and `float32` inputs
  are converted to `float64`.
- **Non-finite data** (NaN or inf in an array, or returned by `g` or `a` at
  a collocation time) is a `ValueError` naming the input and the first bad
  index. Callable kernels are not checked point by point, since a weakly
  singular kernel may return inf at u = 0, which the quadrature never
  samples. A kernel that is non-finite where the quadrature does sample it
  gives a `ValueError` suggesting `kernel_singularity`.
- A 2-D sampled kernel is rejected; that shape is reserved for
  non-convolution kernels K(t, s) in a later release.

## The solution object

Every solver returns a [`VolterraSolution`](../api/solution.md):

| attribute | shape | meaning |
|---|---|---|
| `t` | `(K,)` | the grid the problem was posed on: the sample times, or the mesh breakpoints |
| `y` | `(K, *cs)` | the solution at `t` |
| `mesh` | `(M + 1,)` | the breakpoints |
| `node_times`, `node_values` | `(M, p)`, `(M, p, *cs)` | the collocation times and the solution there |
| `coefficients` | `(M, P, *cs)` | each interval's polynomial in x = (t − tₙ)/hₙ ∈ [0, 1], monomial, lowest degree first |

`sol(t)` evaluates the piecewise polynomial:

- a scalar `t` gives a Python `float` (or `complex`) for a scalar problem,
  and an array of shape `cs` otherwise; an array `t` gives
  `(*t.shape, *cs)`;
- outside [0, T] the result is NaN. The solution is never extrapolated;
- `sol(sol.t)` equals `sol.y` to rounding.

`sol.to_ppoly()` gives the same function as a `scipy.interpolate.PPoly`,
for derivatives, antiderivatives, integrals and roots.

### Values at breakpoints

Collocation solutions of VIE-1 and VIE-2 are in general discontinuous: at
an interior breakpoint the polynomials of the two neighbouring intervals
give two different one-sided limits. By default `sol(t)` and `sol.y` report
their **mean**. `sol(t, at_breakpoints="left")` or `"right"` gives either
limit. A point within a few ulps of a breakpoint counts as the breakpoint.
VIDE solutions, and VIE-1 with `continuous=True`, are continuous, and the
three choices agree to rounding.

The mean is the most accurate choice for most node sets. Measured errors at
interior breakpoints, for K(u) = e⁻ᵘ and y = cos t on [0, 4]:

| method | left | right | mean |
|---|---|---|---|
| VIE-1, default nodes {1/3, 2/3, 1} | O(h³) | O(h³) | **O(h⁴)** |
| VIE-1, Radau IIA, p = 3 | O(h³) | O(h³) | O(h³), smallest constant |
| VIE-2, default nodes {0, 1/2, 1} | O(h⁴) | the same (the limits agree to 10⁻¹⁶) | the same |
| VIE-2, Gauss–Legendre, p = 3 | O(h³) | O(h³) | **O(h⁴)** |
| VIE-2, Radau IIA, p = 3 | **O(h⁵)** | O(h³) | O(h³) |

So with VIE-2 and a node set that ends at c_p = 1 (Radau IIA) ask for
`at_breakpoints="left"`: the left limit there is the collocation value at
the last node, which is superconvergent.

```python
import numpy as np
import voles

sol = voles.solve_vie2(kernel=lambda u: np.exp(-u),
                       g=lambda t: (np.cos(t) - np.sin(t) + np.exp(-t)) / 2,
                       mesh=np.linspace(0, 4, 41), coll_nodes=voles.radau_iia_nodes(3))
inner = sol.mesh[1:-1]                                 # y = cos t
for side in ("left", "mean", "right"):
    err = np.max(np.abs(sol(inner, at_breakpoints=side) - np.cos(inner)))
    print(f"{side:5s} {err:.1e}")
# left  1.4e-10
# mean  8.5e-06
# right 1.7e-05
```

## VIE-1: mesh width and noisy data

A first-kind equation is ill-posed: recovering y from g amounts to
differentiating g. The collocation method regularises it through the mesh
width h, and the error behaves like

$$\lVert y_h - y \rVert \lesssim C_1 h^{m} + C_2 \frac{\varepsilon}{|K(0)|\, h},$$

with m the method's order and ε the noise in g. Shrinking the mesh reduces
the first term but amplifies the noise. This is why the sampled VIE-1
default is `samples_per_interval = divs²` rather than the finest mesh
`divs`, and why `samples_per_interval` is the parameter to tune on real
data. (Noise in the kernel is not amplified this way; it enters as an O(ε)
error.) VIE-2 and VIDE are well posed and have no such trade-off, so their
default is the finest mesh.

Measured on K(u) = e⁻ᵘ, y = cos t, t ∈ [0, 4] with dt = 10⁻³, the default
nodes, and Gaussian noise of standard deviation ε added to g:

| ε \ `samples_per_interval` | 3 | 9 (default) | 27 | 81 | 243 |
|---|---|---|---|---|---|
| 0 | 3.8e-10 | 1.5e-08 | 2.0e-07 | 9.3e-06 | 2.6e-04 |
| 10⁻⁶ | 8.5e-03 | 2.4e-03 | 1.2e-03 | 3.9e-04 | 2.8e-04 |
| 10⁻⁴ | 8.5e-01 | 2.4e-01 | 1.2e-01 | 3.9e-02 | 1.0e-02 |

(maximum error over the samples). With exact data the finest mesh wins by
six orders of magnitude; with noise of 10⁻⁶ it is the worst choice, and the
best mesh is 80 to 240 samples wide. The noise term is about 20 ε / h here.
The same noise realisation is used in every row.

```python
import numpy as np
import voles

dt = 1e-3
t = np.arange(4001) * dt
g = (np.cos(t) + np.sin(t) - np.exp(-t)) / 2          # y = cos t
noisy = g + 1e-6 * np.random.default_rng(0).standard_normal(t.size)
noisy[0] = 0.0
for Q in (3, 9, 81):
    sol = voles.solve_vie1(kernel=np.exp(-t), g=noisy, dt=dt, samples_per_interval=Q)
    print(Q, f"{np.max(np.abs(sol.y - np.cos(t))):.1e}")
```

## Threads

Solver calls are thread-safe: concurrent calls from different threads give
the same results as serial ones. The compiled code releases the GIL. A
matrix-mode solve may use a thread pool of its own, sized by the column
count and the number of CPUs.
