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
| VIE-1 | 0.05 | 0.13 | 0.28 | 0.62 | 1.36 |
| VIE-1 (continuous) | 0.06 | 0.14 | 0.31 | 0.67 | 1.46 |
| VIE-2 | 0.14 | 0.28 | 0.61 | 1.35 | 3.00 |
| VIDE | 0.55 | 1.11 | 2.27 | 4.67 | 9.71 |
| VIE-1 (d=2) | 0.12 | 0.34 | 0.78 | 1.78 | 4.07 |
| VIE-1 (d=2, continuous) | 0.13 | 0.36 | 0.81 | 1.85 | 4.05 |
| VIE-2 (d=2) | 0.35 | 0.75 | 1.68 | 3.74 | 8.21 |
| VIDE (d=2) | 0.73 | 1.52 | 3.24 | 6.95 | 15.5 |
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
| function_solve_VIE_1 | 1.72 | 2.89 | 5.23 |
| function_solve_VIE_2 | 1.79 | 3.11 | 5.58 |
| function_solve_VIE_2 (vector, d=3) | 2.94 | 5.24 | 10.2 |
| function_solve_VIDE | 2.25 | 3.70 | 6.60 |
| function_solve_VIE_2 (weakly singular) | 164 | 377 | 951 |
<!-- CALLABLE_BENCHMARKS:END -->
