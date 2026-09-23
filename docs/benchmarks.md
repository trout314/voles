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
| VIE-1 | 0.05 | 0.11 | 0.23 | 0.49 | 1.07 | 2.38 | 5.35 |
| VIE-2 | 0.11 | 0.23 | 0.48 | 1.06 | 2.37 | 5.71 | 13.1 |
| VIDE | 0.38 | 0.78 | 1.60 | 3.33 | 6.95 | 15.1 | 32.2 |
| VIE-2 (Numba fallback) | 0.77 | 2.41 | 8.26 | 30.5 | 117 | — | — |
| VIE-1 (d=2) | 0.10 | 0.28 | 0.62 | 1.43 | 3.13 | 7.17 | 15.5 |
| VIE-2 (d=2) | 0.27 | 0.59 | 1.30 | 2.90 | 6.46 | 15.9 | 36.5 |
| VIDE (d=2) | 0.55 | 1.18 | 2.50 | 5.34 | 12.2 | 27.2 | 61.1 |
| VIE-2 (d=8) | 3.41 | 7.44 | 16.0 | 38.7 | 79.7 | — | — |
| VIDE (d=8) | 5.40 | 11.5 | 25.4 | 57.0 | 122 | — | — |
| VIE-2 (d=16) | 15.0 | 33.8 | 75.6 | 169 | — | — | — |
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
| function_solve_VIE_1 | 1.14 | 1.92 | 3.44 | 7.50 |
| function_solve_VIE_2 | 1.20 | 2.01 | 3.70 | 8.15 |
| function_solve_VIE_2 (vector, d=3) | 1.88 | 3.40 | 6.60 | 14.5 |
| function_solve_VIDE | 1.52 | 2.49 | 4.43 | 9.56 |
| function_solve_VIE_2 (weakly singular) | 130 | 292 | 714 | 1939 |
<!-- CALLABLE_BENCHMARKS:END -->
