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
| VIE-1 | 0.07 | 0.15 | 0.33 | 0.75 | 1.70 |
| VIE-1 (continuous) | 0.08 | 0.17 | 0.36 | 0.81 | 1.82 |
| VIE-2 | 0.16 | 0.35 | 0.80 | 1.84 | 4.17 |
| VIDE | 0.57 | 1.22 | 2.50 | 5.27 | 11.2 |
| VIE-1 (d=2) | 0.17 | 0.41 | 0.94 | 2.19 | 5.07 |
| VIE-1 (d=2, continuous) | 0.17 | 0.42 | 0.96 | 2.23 | 5.18 |
| VIE-2 (d=2) | 0.39 | 0.95 | 2.27 | 5.37 | 12.5 |
| VIDE (d=2) | 0.79 | 1.78 | 4.04 | 9.15 | 20.6 |
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
| function_solve_VIE_1 | 1.60 | 2.76 | 5.08 |
| function_solve_VIE_2 | 1.67 | 2.91 | 5.43 |
| function_solve_VIE_2 (vector, d=3) | 2.60 | 4.73 | 9.13 |
| function_solve_VIDE | 2.10 | 3.51 | 6.37 |
| function_solve_VIE_2 (weakly singular) | 150 | 345 | 854 |
<!-- CALLABLE_BENCHMARKS:END -->
