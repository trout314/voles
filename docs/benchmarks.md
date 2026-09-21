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
| VIE-1 | 0.05 | 0.13 | 0.28 | 0.61 | 1.33 | 2.97 | 6.53 |
| VIE-2 | 0.14 | 0.28 | 0.61 | 1.32 | 3.01 | 7.04 | 16.3 |
| VIDE | 0.49 | 0.98 | 2.00 | 4.19 | 8.64 | 18.7 | 40.0 |
| VIE-2 (Numba fallback) | 0.91 | 2.82 | 9.76 | 35.6 | 135 | — | — |
| VIE-1 (d=2) | 0.12 | 0.34 | 0.78 | 1.76 | 3.94 | 8.71 | 19.2 |
| VIE-2 (d=2) | 0.34 | 0.75 | 1.65 | 3.68 | 8.15 | 19.8 | 45.8 |
| VIDE (d=2) | 0.71 | 1.48 | 3.15 | 6.74 | 15.2 | 34.1 | 73.7 |
| VIE-2 (d=8) | 4.31 | 9.21 | 20.0 | 46.0 | 104 | — | — |
| VIDE (d=8) | 6.62 | 14.4 | 31.4 | 69.9 | 149 | — | — |
| VIE-2 (d=16) | 18.9 | 42.3 | 91.4 | 204 | — | — | — |
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
| function_solve_VIE_1 | 1.80 | 3.06 | 5.68 | 12.1 |
| function_solve_VIE_2 | 1.88 | 3.24 | 5.97 | 13.0 |
| function_solve_VIE_2 (vector, d=3) | 3.00 | 5.40 | 10.7 | 22.8 |
| function_solve_VIDE | 2.34 | 3.90 | 6.99 | 15.4 |
| function_solve_VIE_2 (weakly singular) | 175 | 402 | 1010 | 2845 |
<!-- CALLABLE_BENCHMARKS:END -->
