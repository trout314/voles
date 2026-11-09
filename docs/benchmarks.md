# Benchmarks

Mean wall-clock execution time, measured on a GitHub Actions `ubuntu-22.04`
runner (2-core x86_64 VM on an Intel Xeon 8370C, 2.8 GHz base / 3.5 GHz boost).
Mean time is averaged over a variable number of calibrated rounds (from ~3 for
large inputs up to ~6000 for small inputs). A dash (—) marks sizes a row is
not benchmarked at (to keep the CI job fast). The timings are for warm calls:
the first solve in a process that needs scipy's quadrature (callable inputs
with a declared singularity) also imports it, about half a second once.

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
| VIE-1 | 0.18 | 0.23 | 0.32 | 0.48 | 0.84 | 1.59 | 3.20 |
| VIE-2 | 0.18 | 0.27 | 0.44 | 0.82 | 1.61 | 3.36 | 7.06 |
| VIDE | 0.22 | 0.33 | 0.55 | 1.01 | 1.99 | 4.16 | 8.68 |
| VIE-2 (Numba fallback) | 1.06 | 3.03 | 10.2 | 38.3 | 140 | — | — |
| VIE-1 (d=2) | 0.33 | 0.48 | 0.76 | 1.20 | 2.20 | 4.36 | 8.85 |
| VIE-2 (d=2) | 0.33 | 0.55 | 1.03 | 2.09 | 4.79 | 8.89 | 18.7 |
| VIDE (d=2) | 0.41 | 0.70 | 1.31 | 2.60 | 6.24 | 11.5 | 24.2 |
| VIE-2 (d=8) | 3.09 | 6.13 | 12.4 | 26.4 | 55.3 | — | — |
| VIDE (d=8) | 4.17 | 8.31 | 16.9 | 45.8 | 74.3 | — | — |
| VIE-2 (d=16) | 14.5 | 36.3 | 65.2 | 146 | — | — | — |
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
| VIE-1 | 1.39 | 1.70 | 2.42 | 4.54 |
| VIE-2 | 1.33 | 1.76 | 2.60 | 5.12 |
| VIE-2 (vector, d=3) | 1.59 | 2.13 | 3.41 | 8.02 |
| VIDE | 2.02 | 2.82 | 4.43 | 9.18 |
| VIE-2 (weakly singular) | 188 | 448 | 1189 | 3526 |
| VIE-2 (weakly singular, exponent declared) | 21.2 | 44.8 | 95.4 | 210 |
<!-- CALLABLE_BENCHMARKS:END -->
