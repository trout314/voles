# Benchmarks

Mean wall-clock execution time, measured on a GitHub Actions `ubuntu-22.04`
runner (2-core x86_64 VM on an Intel Xeon 8370C, 2.8 GHz base / 3.5 GHz boost).
Mean time is averaged over a variable number of calibrated rounds (from ~9 for
large inputs up to ~6000 for small inputs).

These tables are regenerated automatically by the benchmark CI job on each push
to `main`. An interactive history of the same measurements is published at the
[benchmark dashboard](https://trout314.github.io/voles/dev/bench/).

For the asymptotic complexity (which is what stays fixed as the implementation
evolves), see the [Benchmarks section of the README](https://github.com/trout314/voles#benchmarks).

## Array-based solvers

Mean time in milliseconds for the **array-based** solvers, by input length $N$
(number of sampled points):

<!-- BENCHMARKS:START -->
| Solver \ N | 500 | 1000 | 2000 | 4000 | 8000 |
|---|---|---|---|---|---|
| VIE-1 | 0.07 | 0.13 | 0.28 | 0.63 | 1.39 |
| VIE-1 (continuous) | 0.08 | 0.15 | 0.31 | 0.68 | 1.48 |
| VIE-2 | 0.14 | 0.29 | 0.62 | 1.38 | 3.05 |
| VIDE | 0.56 | 1.12 | 2.28 | 4.70 | 9.83 |
| VIE-1 (d=2) | 0.16 | 0.35 | 0.76 | 1.80 | 3.96 |
| VIE-1 (d=2, continuous) | 0.17 | 0.37 | 0.78 | 1.85 | 4.08 |
| VIE-2 (d=2) | 0.34 | 0.79 | 1.68 | 3.76 | 8.42 |
| VIDE (d=2) | 0.70 | 1.51 | 3.23 | 7.03 | 15.7 |
<!-- BENCHMARKS:END -->

## Callable-input solvers

The **callable-input** solvers run the general path (Python + adaptive
quadrature, no Toeplitz reuse), so they are benchmarked on much smaller
problems, sized by the number of mesh intervals $M$ (each carrying
`len(coll_choices)` collocation nodes). The *weakly singular* row uses an Abel
kernel $K(u) = u^{-1/2}$ on a graded mesh with the singularity declared:

<!-- CALLABLE_BENCHMARKS:START -->
| Solver \ M | 25 | 50 | 100 |
|---|---|---|---|
| function_solve_VIE_1 | 1.77 | 2.97 | 5.40 |
| function_solve_VIE_2 | 1.83 | 3.13 | 5.73 |
| function_solve_VIE_2 (vector, d=3) | 2.96 | 5.32 | 10.4 |
| function_solve_VIDE | 2.30 | 3.77 | 6.76 |
| function_solve_VIE_2 (weakly singular) | 166 | 382 | 970 |
<!-- CALLABLE_BENCHMARKS:END -->
