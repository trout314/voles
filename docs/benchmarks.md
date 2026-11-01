# Benchmarks

Mean wall-clock execution time, measured on a GitHub Actions `ubuntu-22.04`
runner (2-core x86_64 VM on an Intel Xeon 8370C, 2.8 GHz base / 3.5 GHz boost).
Mean time is averaged over a variable number of calibrated rounds (from ~3 for
large inputs up to ~6000 for small inputs). A dash (—) marks sizes a row is
not benchmarked at (to keep the CI job fast).

These tables are regenerated automatically by the benchmark CI job on pushes
to `main` that touch code (docs-only pushes are skipped), and this page is
redeployed with the fresh numbers. An interactive history of the same
measurements is published at the
[benchmark dashboard](https://trout314.github.io/voles/dev/bench/).

For the asymptotic complexity (which is what stays fixed as the implementation
evolves), see the [Benchmarks section of the README](https://github.com/trout314/voles#benchmarks).

## Sampled inputs

Mean time in milliseconds with **sampled inputs** (arrays, `dt=`), by input
length $N$ (number of samples). These rows use `quadrature="collocation"`, the
compiled path:

<!-- BENCHMARKS:START -->
| Solver \ N | 500 | 1000 | 2000 | 4000 | 8000 | 16000 | 32000 |
|---|---|---|---|---|---|---|---|
| VIE-1 | 0.11 | 0.14 | 0.21 | 0.33 | 0.57 | 1.11 | 2.38 |
| VIE-2 | 0.12 | 0.18 | 0.30 | 0.56 | 1.15 | 2.62 | 5.53 |
| VIDE | 0.14 | 0.23 | 0.37 | 0.73 | 1.46 | 3.12 | 6.96 |
| VIE-2 (Numba fallback) | 0.99 | 3.00 | 10.1 | 36.9 | 139 | — | — |
| VIE-1 (d=2) | 0.20 | 0.29 | 0.48 | 0.82 | 1.74 | 3.54 | 6.88 |
| VIE-2 (d=2) | 0.24 | 0.37 | 0.79 | 1.47 | 3.53 | 7.39 | 14.5 |
| VIDE (d=2) | 0.31 | 0.50 | 0.98 | 2.19 | 4.42 | 8.90 | 18.7 |
| VIE-2 (d=8) | 2.25 | 4.56 | 9.28 | 19.3 | 43.0 | — | — |
| VIDE (d=8) | 2.96 | 5.96 | 12.3 | 27.2 | 64.3 | — | — |
| VIE-2 (d=16) | 11.5 | 23.1 | 53.6 | 122 | — | — | — |
<!-- BENCHMARKS:END -->

Notes on the rows:

- **VIE-1 with `continuous=True`** is not shown separately: its timings
  are indistinguishable from the default (discontinuous) VIE-1 rows.
- **d=8** is the largest compile-time-specialized dimension in the D
  extension; **d=16** exercises the runtime-dimension path (LAPACK, or the
  pure-D LU fallback used on the CI runner). Cost grows as $d^2$ either way.
- **Numba fallback**: scalar equations with a collocation setting that is not
  compiled into the D extension fall back to a Numba JIT solver. Every setting
  with `divs` ≤ 4 is compiled, so this row uses
  `coll_setting=(5, [0, 3, 5])` — a 3-node rule comparable to the default — whose
  mesh intervals are 25 fine steps wide instead of 4. The fallback therefore
  takes ~6× *fewer* (larger) steps at equal $N$ than the D rows above, and is
  still one to two orders of magnitude slower: its history sum is quadratic in
  the number of mesh intervals, while the D extension uses a blocked-FFT
  scheme. The one-time JIT compilation cost (seconds, on first call in a
  fresh environment) is excluded from the timings via a warmup round.

## Callable inputs

With **callable inputs** (`mesh=`) the solvers integrate the kernel
numerically (Python + adaptive quadrature), so they are benchmarked on much
smaller problems, sized by the number of mesh intervals $M$ (each carrying
`len(coll_nodes)` collocation nodes). The smooth rows use uniform meshes, on
which the weights are assembled from one row (Toeplitz structure).

The two *weakly singular* rows solve the same Abel problem, $K(u) = u^{-1/2}$
on a graded mesh, and show what the problem setup costs:

- **VIE-2 (weakly singular)** is the slowest supported path: a kernel that
  only accepts scalars (`1.0 / np.sqrt(u) if u > 0 else 0.0`) and the
  singularity declared by location only (`kernel_singularity=0.0`). Every
  block the singularity touches is then integrated by adaptive quadrature,
  one scalar kernel call at a time, which is most of the cost.
- **VIE-2 (weakly singular, exponent declared)** is the setup the docs
  recommend: a vectorised kernel (`u**-0.5`) and the exponent declared
  (`kernel_singularity={0.0: 0.5}`), so those blocks use Gauss–Jacobi rules.
  It is 9–16× faster, more so as M grows, with the same accuracy.

<!-- CALLABLE_BENCHMARKS:START -->
| Solver \ M | 25 | 50 | 100 | 200 |
|---|---|---|---|---|
| VIE-1 | 0.73 | 1.06 | 1.36 | 2.74 |
| VIE-2 | 0.74 | 0.99 | 1.50 | 3.34 |
| VIE-2 (vector, d=3) | 0.91 | 1.45 | 2.55 | 5.84 |
| VIDE | 1.11 | 1.72 | 2.44 | 5.25 |
| VIE-2 (weakly singular) | 92.3 | 219 | 593 | 1691 |
| VIE-2 (weakly singular, exponent declared) | 10.5 | 22.3 | 47.6 | 105 |
<!-- CALLABLE_BENCHMARKS:END -->
