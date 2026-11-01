# Accuracy

How accurate is a solution, and how do you make it more accurate? This page
gives the convergence orders of the common node sets, a way to check the
accuracy of a particular solve, and a procedure for noisy first-kind data.

## What controls the error

The error of a collocation solution is governed by the mesh width h and the
order of the node set:

- **Callable inputs:** h is set by `mesh`. Refine the mesh (more intervals)
  to reduce the error.
- **Sampled inputs:** h = `samples_per_interval` × `dt`. With the data fixed,
  you can't make dt smaller, but you can choose a node set of higher order
  (larger `divs`), or a narrower mesh (smaller `samples_per_interval`, down
  to `divs`) where that is allowed.
- **Weakly singular kernels:** the solution itself is singular at t = 0, and
  a uniform mesh loses most of the method's order. Use
  `optimal_graded_mesh`, which restores it.
- **First-kind equations with noisy data:** refining amplifies the noise;
  see [below](#noisy-first-kind-data).

## Convergence orders

The error decreases like h^q. The order q depends on the equation, the node
set, and on *where* you look: anywhere in [0, T], at the mesh breakpoints,
or at the collocation nodes. Measured on a smooth problem
(K(u) = e⁻ᵘ, y = cos t on [0, 4]), with p the number of nodes:

| equation | node set | anywhere | breakpoints (mean, the default) | breakpoints (left) | nodes |
|---|---|---|---|---|---|
| VIE-1 | default {1/3, 2/3, 1} | 3 | 4 | 3 | 3 |
| VIE-1 | Radau IIA, p = 3 | 3 | 3 | 3 | 3 |
| VIE-1 | Gauss–Legendre, p = 3 | 3 | 4 | 3 | 3 |
| VIE-1 | Gauss–Legendre, p = 4 | 3 (= p − 1, ρ = +1) | 4 | 3 | 3 |
| VIE-1 | default, `continuous=True` | 4 | 4 | 4 | 4 |
| VIE-2 | default {0, 1/2, 1} (Lobatto, p = 3) | 3 | 4 | 4 | 4 |
| VIE-2 | Gauss–Legendre, p = 2 | 2 | 2 | 2 | 3 |
| VIE-2 | Gauss–Legendre, p = 3 | 3 | 4 | 3 | 4 |
| VIE-2 | Radau IIA, p = 3 | 3 | 3 | **5** (2p − 1) | 4 |
| VIE-2 | {1/3, 2/3, 1} | 3 | 3 | 3 | 3 |
| VIDE | default {0, 1/2, 1} (Lobatto, p = 3) | 4 | 4 (2p − 2) | 4 | 4 |
| VIDE | Gauss–Legendre, p = 2 | 3 | 4 (2p) | 4 | 3 |
| VIDE | Gauss–Legendre, p = 3 | 4 | **6** (2p) | 6 | 4 |
| VIDE | Radau IIA, p = 3 | 4 | 5 (2p − 1) | 5 | 4 |
| VIDE | {1/3, 2/3, 1} | 3 | 3 | 3 | 3 |

The sampled settings behave like the callable node sets at the same
positions: `(3, [1, 2, 3])` is {1/3, 2/3, 1} and `(2, [0, 1, 2])` is
{0, 1/2, 1}, with h = `samples_per_interval` × `dt`.

Rules behind the table (Brunner 2004, chapters 2 and 3):

- **VIE-1, discontinuous:** order p, or p − 1 when ρ = +1 (see
  [VIE-1 admissibility](conventions.md#collocation-nodes)). The mean at the
  breakpoints gains one order for some node sets.
  **`continuous=True`:** order p + 1.
- **VIE-2:** order p anywhere. Only node sets ending at c = 1 (Radau IIA)
  are superconvergent at the breakpoints, and then only in the left limit,
  which is the collocation value at the last node.
- **VIDE:** order p + 1 for symmetric node sets (Gauss–Legendre, Lobatto, the
  default), p otherwise. At the breakpoints the solution is continuous and
  superconverges: 2p for Gauss–Legendre, 2p − 1 for Radau IIA, 2p − 2 for
  Lobatto.

These are the orders for a smooth solution. They are asymptotic: on a coarse
mesh the observed rate can differ, and a singular kernel or noisy data
changes the picture (above).

voles does not compute an order for you. The order depends on what you
measure, on the problem's smoothness and on the data, not only on the
settings, so a single number would mislead as often as it helped. The check
below measures it on your problem instead.

## Checking a solve

Solve twice, on a mesh and on one twice as fine, and compare the two
solutions at many points (not at one point: see the caveat below). If the
method has order q, the error of the finer solution is about
|difference| / (2^q − 1).

With callable inputs, refine the mesh:

```python
import numpy as np
import voles

kernel = lambda u: np.exp(-u)
g = lambda t: (np.cos(t) - np.sin(t) + np.exp(-t)) / 2      # y = cos t

tt = np.linspace(0, 4, 1001)
coarse = voles.solve_vie2(kernel=kernel, g=g, mesh=np.linspace(0, 4, 41))
fine = voles.solve_vie2(kernel=kernel, g=g, mesh=np.linspace(0, 4, 81))
diff = np.max(np.abs(fine(tt) - coarse(tt)))
print(f"estimated error of the fine solution: {diff / (2**3 - 1):.1e}")   # order 3
print(f"actual error:                         {np.max(np.abs(fine(tt) - np.cos(tt))):.1e}")
```

On a graded mesh, refine with `optimal_graded_mesh(..., n_intervals=2 * M)`;
halving every interval of a graded mesh by hand works too.

With sampled inputs and fixed data, there are two checks:

- **Sub-sample the data:** solve with every sample and with every second
  sample (`dt` doubled). The two solutions differ by about (2^q − 1) times
  the error of the finer one.
- **Compare node sets of different order**, e.g. the default and
  `coll_setting=3`. The difference estimates the error of the lower-order
  one.

```python
import numpy as np
import voles

dt = 0.02
t = np.arange(201) * dt
kernel = np.exp(-t)
g = (np.cos(t) - np.sin(t) + np.exp(-t)) / 2                # y = cos t

full = voles.solve_vie2(kernel=kernel, g=g, dt=dt)
half = voles.solve_vie2(kernel=kernel[::2], g=g[::2], dt=2 * dt)
diff = np.max(np.abs(full(half.t) - half.y))
print(f"estimated error with every sample: {diff / (2**3 - 1):.1e}")
print(f"actual error:                      {np.max(np.abs(full.y - np.cos(t))):.1e}")
```

**Caveat: compare in a norm, not at one point.** A discontinuous solution's
error varies across each interval and jumps at the breakpoints. Under
refinement a fixed time t moves to a different position within its
interval, so the error at that one point can stall or even grow while the
maximum error converges at the expected rate. Compare the maximum over many
points, or the node values.

## Noisy first-kind data

A first-kind equation amplifies noise in g by about 1/h
([Conventions](conventions.md#vie-1-mesh-width-and-noisy-data)), so
`samples_per_interval` (Q) trades resolution against noise. Without knowing
y you can still choose Q well, because the solution depends linearly on g:

1. **Set `g[0] = 0`.** A first-kind equation requires g(0) = 0. A measured
   g[0] is that zero plus noise, and leaving it in makes voles warn
   (`g(0) is not zero`) and spoils the first interval.
2. **Estimate the noise level** σ of g, e.g. from fourth differences: for
   smooth g sampled finely, the fourth difference of the data is almost
   pure noise, with variance 70σ².
3. **Compute the noise-induced error for each candidate Q** by solving with
   g replaced by synthetic noise of level σ. By linearity this *is* the
   noise part of the error. A few draws give its size.
4. **Pick the smallest Q whose noise error is acceptable**, then check the
   discretisation error by comparing the solutions for Q and 2Q on the real
   data. If they differ by much more than the noise error, the coarser mesh
   is too coarse for y.

```python
import numpy as np
import voles

dt = 1e-3
t = np.arange(4001) * dt
kernel = np.exp(-t)
rng = np.random.default_rng(0)
g = (np.cos(t) + np.sin(t) - np.exp(-t)) / 2 + 1e-5 * rng.standard_normal(t.size)

g[0] = 0.0                                                  # step 1
sigma = np.std(np.diff(g, 4)) / np.sqrt(70)                 # step 2
print(f"estimated noise level {sigma:.1e}")

def synthetic_noise():
    e = sigma * rng.standard_normal(t.size)
    e[0] = 0.0                                              # as for the data
    return e

for Q in (27, 81, 243):                                     # step 3
    noise = [voles.solve_vie1(kernel=kernel, g=synthetic_noise(), dt=dt,
                              samples_per_interval=Q).y for _ in range(10)]
    print(f"Q = {Q:3d}: noise-induced error (rms) {np.std(noise):.1e}")

sol = voles.solve_vie1(kernel=kernel, g=g, dt=dt, samples_per_interval=81)   # step 4
check = voles.solve_vie1(kernel=kernel, g=g, dt=dt, samples_per_interval=162)
print(f"Q = 81 vs 162: rms difference {np.std(sol.y - check.y):.1e}")
# About the noise level, so the discretisation error at Q = 81 is negligible.
```

Two more points for noisy solutions:

- Values at the **breakpoints** are the noisiest: about 1.5× the noise of
  mid-interval values with the default mean, and more than 2× with
  `at_breakpoints="left"`. Prefer values inside the intervals, or average
  over a few samples.
- The first interval is the least reliable, since it carries the error in
  g near 0.
