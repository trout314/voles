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
| VIE-1 | 0.06 | 0.14 | 0.29 | 0.63 | 1.35 | 2.96 | 6.57 |
| VIE-2 | 0.14 | 0.30 | 0.61 | 1.34 | 3.00 | 7.17 | 16.3 |
| VIDE | 0.50 | 1.00 | 2.03 | 4.21 | 8.76 | 19.0 | 40.8 |
| VIE-2 (Numba fallback) | 0.91 | 2.84 | 9.77 | 36.1 | 137 | — | — |
| VIE-1 (d=2) | 0.13 | 0.37 | 0.81 | 1.80 | 3.96 | 8.58 | 19.8 |
| VIE-2 (d=2) | 0.35 | 0.75 | 1.66 | 3.75 | 8.29 | 20.9 | 45.8 |
| VIDE (d=2) | 0.71 | 1.51 | 3.22 | 6.83 | 15.4 | 33.8 | 75.5 |
| VIE-2 (d=8) | 4.25 | 9.46 | 20.2 | 46.1 | 102 | — | — |
| VIDE (d=8) | 6.69 | 15.1 | 31.8 | 71.8 | 148 | — | — |
| VIE-2 (d=16) | 19.1 | 43.4 | 94.6 | 212 | — | — | — |
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
| function_solve_VIE_1 | 1.84 | 3.09 | 5.60 | 12.6 |
| function_solve_VIE_2 | 1.89 | 3.23 | 5.93 | 13.1 |
| function_solve_VIE_2 (vector, d=3) | 3.03 | 5.51 | 11.0 | 24.1 |
| function_solve_VIDE | 2.40 | 3.89 | 7.02 | 15.0 |
| function_solve_VIE_2 (weakly singular) | 177 | 406 | 1027 | 2870 |
<!-- CALLABLE_BENCHMARKS:END -->
