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
| VIE-1 | 0.21 | 0.26 | 0.35 | 0.51 | 0.87 | 1.63 | 3.24 |
| VIE-2 | 0.20 | 0.29 | 0.47 | 0.84 | 1.65 | 3.37 | 7.00 |
| VIDE | 0.25 | 0.35 | 0.57 | 1.03 | 2.02 | 4.18 | 8.70 |
| VIE-2 (Numba fallback) | 1.07 | 3.05 | 9.99 | 35.9 | 137 | — | — |
| VIE-1 (d=2) | 0.36 | 0.50 | 0.80 | 1.25 | 2.26 | 4.42 | 8.89 |
| VIE-2 (d=2) | 0.35 | 0.58 | 1.06 | 2.10 | 4.85 | 8.99 | 18.6 |
| VIDE (d=2) | 0.43 | 0.73 | 1.35 | 2.64 | 6.27 | 11.5 | 24.4 |
| VIE-2 (d=8) | 3.10 | 6.13 | 12.4 | 25.9 | 55.3 | — | — |
| VIDE (d=8) | 4.17 | 8.25 | 16.7 | 44.5 | 74.8 | — | — |
| VIE-2 (d=16) | 14.3 | 35.5 | 68.4 | 142 | — | — | — |
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
which the weights are assembled from one row (Toeplitz structure). The
*weakly singular* row uses an Abel kernel $K(u) = u^{-1/2}$ on a graded mesh,
with the singularity declared by location only (adaptive quadrature):

<!-- CALLABLE_BENCHMARKS:START -->
| Solver \ M | 25 | 50 | 100 | 200 |
|---|---|---|---|---|
| VIE-1 | 1.36 | 1.70 | 2.41 | 4.39 |
| VIE-2 | 1.35 | 1.76 | 2.60 | 4.95 |
| VIE-2 (vector, d=3) | 1.62 | 2.16 | 3.38 | 7.39 |
| VIDE | 2.03 | 2.81 | 4.41 | 8.77 |
| VIE-2 (weakly singular) | 181 | 431 | 1131 | 3328 |
<!-- CALLABLE_BENCHMARKS:END -->
