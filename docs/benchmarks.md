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

## Array-based solvers

Mean time in milliseconds for the **array-based** solvers, by input length $N$
(number of sampled points):

<!-- BENCHMARKS:START -->
| Solver \ N | 500 | 1000 | 2000 | 4000 | 8000 | 16000 | 32000 |
|---|---|---|---|---|---|---|---|
| VIE-1 | 0.12 | 0.18 | 0.28 | 0.46 | 0.86 | 1.70 | 3.53 |
| VIE-2 | 0.13 | 0.23 | 0.42 | 0.84 | 1.71 | 3.68 | 7.74 |
| VIDE | 0.16 | 0.28 | 0.52 | 1.04 | 2.09 | 4.46 | 9.48 |
| VIE-2 (Numba fallback) | 0.95 | 2.92 | 9.90 | 36.4 | 139 | — | — |
| VIE-1 (d=2) | 0.27 | 0.51 | 0.72 | 1.24 | 2.35 | 4.75 | 9.66 |
| VIE-2 (d=2) | 0.28 | 0.53 | 1.07 | 2.20 | 4.63 | 9.75 | 22.5 |
| VIDE (d=2) | 0.37 | 0.71 | 1.41 | 2.91 | 6.37 | 13.2 | 29.5 |
| VIE-2 (d=8) | 3.30 | 6.52 | 13.4 | 28.2 | 64.2 | — | — |
| VIDE (d=8) | 4.38 | 9.21 | 18.0 | 40.3 | 83.3 | — | — |
| VIE-2 (d=16) | 15.6 | 33.6 | 69.4 | 145 | — | — | — |
<!-- BENCHMARKS:END -->

Notes on the rows:

- **VIE-1 with `force_continuous=True`** is not shown separately: its timings
  are indistinguishable from the default (discontinuous) VIE-1 rows.
- **d=8** is the largest compile-time-specialized dimension in the D
  extension; **d=16** exercises the runtime-dimension path (LAPACK, or the
  pure-D LU fallback used on the CI runner). Cost grows as $d^2$ either way.
- **Numba fallback**: scalar equations with a collocation setting that is not
  compiled into the D extension fall back to a Numba JIT solver. Every setting
  with `coll_divs` ≤ 4 is compiled, so this row uses `coll_divs=5,
  coll_choices=[0, 3, 5]` — a 3-node rule comparable to the default — whose
  mesh intervals are 25 fine steps wide instead of 4. The fallback therefore
  takes ~6× *fewer* (larger) steps at equal $N$ than the D rows above, and is
  still one to two orders of magnitude slower: its history sum is quadratic in
  the number of mesh intervals, while the D extension uses a blocked-FFT
  scheme. The one-time JIT compilation cost (seconds, on first call in a
  fresh environment) is excluded from the timings via a warmup round.

## Callable-input solvers

The **callable-input** solvers run the general path (Python + adaptive
quadrature, no Toeplitz reuse), so they are benchmarked on much smaller
problems, sized by the number of mesh intervals $M$ (each carrying
`len(coll_choices)` collocation nodes). The *weakly singular* row uses an Abel
kernel $K(u) = u^{-1/2}$ on a graded mesh with the singularity declared:

<!-- CALLABLE_BENCHMARKS:START -->
| Solver \ M | 25 | 50 | 100 | 200 |
|---|---|---|---|---|
| function_solve_VIE_1 | 0.96 | 1.16 | 1.59 | 2.84 |
| function_solve_VIE_2 | 0.96 | 1.23 | 1.80 | 3.35 |
| function_solve_VIE_2 (vector, d=3) | 1.33 | 1.89 | 3.18 | 8.28 |
| function_solve_VIDE | 1.48 | 2.01 | 3.07 | 5.92 |
| function_solve_VIE_2 (weakly singular) | 190 | 447 | 1180 | 3491 |
<!-- CALLABLE_BENCHMARKS:END -->
