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
| VIE-1 | 0.05 | 0.11 | 0.23 | 0.50 | 1.09 | 2.39 | 5.43 |
| VIE-2 | 0.11 | 0.23 | 0.48 | 1.07 | 2.39 | 5.70 | 13.3 |
| VIDE | 0.39 | 0.78 | 1.61 | 3.36 | 7.00 | 15.2 | 32.5 |
| VIE-2 (Numba fallback) | 0.64 | 2.02 | 6.90 | 25.0 | 95.8 | — | — |
| VIE-1 (d=2) | 0.10 | 0.29 | 0.63 | 1.44 | 3.15 | 6.98 | 15.5 |
| VIE-2 (d=2) | 0.28 | 0.60 | 1.31 | 2.95 | 6.56 | 16.4 | 36.7 |
| VIDE (d=2) | 0.57 | 1.19 | 2.52 | 5.39 | 12.2 | 27.1 | 59.6 |
| VIE-2 (d=8) | 3.41 | 7.53 | 16.4 | 36.5 | 78.0 | — | — |
| VIDE (d=8) | 5.35 | 12.0 | 26.6 | 55.0 | 120 | — | — |
| VIE-2 (d=16) | 15.3 | 33.5 | 75.5 | 162 | — | — | — |
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
| function_solve_VIE_1 | 1.13 | 1.90 | 3.45 | 7.63 |
| function_solve_VIE_2 | 1.18 | 2.01 | 3.69 | 8.21 |
| function_solve_VIE_2 (vector, d=3) | 1.88 | 3.37 | 6.53 | 14.8 |
| function_solve_VIDE | 1.50 | 2.48 | 4.42 | 9.77 |
| function_solve_VIE_2 (weakly singular) | 124 | 284 | 701 | 1920 |
<!-- CALLABLE_BENCHMARKS:END -->
