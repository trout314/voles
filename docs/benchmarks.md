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
| VIE-1 | 0.16 | 0.21 | 0.30 | 0.46 | 0.81 | 1.56 | 3.18 |
| VIE-2 | 0.16 | 0.24 | 0.44 | 0.79 | 1.59 | 3.37 | 7.17 |
| VIDE | 0.19 | 0.29 | 0.51 | 0.96 | 1.93 | 4.15 | 8.74 |
| VIE-2 (Numba fallback) | 0.98 | 2.89 | 9.83 | 35.5 | 135 | — | — |
| VIE-1 (d=2) | 0.31 | 0.47 | 0.72 | 1.18 | 2.18 | 4.41 | 8.96 |
| VIE-2 (d=2) | 0.29 | 0.52 | 0.99 | 2.01 | 4.19 | 9.00 | 19.4 |
| VIDE (d=2) | 0.38 | 0.68 | 1.28 | 2.58 | 6.27 | 11.8 | 25.2 |
| VIE-2 (d=8) | 3.04 | 6.13 | 12.7 | 26.5 | 55.9 | — | — |
| VIDE (d=8) | 4.11 | 8.34 | 17.2 | 45.6 | 74.7 | — | — |
| VIE-2 (d=16) | 14.6 | 36.3 | 70.0 | 144 | — | — | — |
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
| function_solve_VIE_1 | 1.17 | 1.52 | 2.25 | 4.38 |
| function_solve_VIE_2 | 1.18 | 1.60 | 2.46 | 4.92 |
| function_solve_VIE_2 (vector, d=3) | 1.40 | 2.01 | 3.60 | 8.60 |
| function_solve_VIDE | 1.86 | 2.67 | 4.31 | 9.09 |
| function_solve_VIE_2 (weakly singular) | 183 | 435 | 1149 | 3395 |
<!-- CALLABLE_BENCHMARKS:END -->
