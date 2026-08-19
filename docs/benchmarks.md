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
| VIE-1 | 0.07 | 0.13 | 0.28 | 0.64 | 1.46 |
| VIE-1 (continuous) | 0.08 | 0.15 | 0.31 | 0.69 | 1.56 |
| VIE-2 | 0.14 | 0.30 | 0.69 | 1.59 | 3.71 |
| VIDE | 0.55 | 1.13 | 2.36 | 5.00 | 10.6 |
| VIE-1 (d=2) | 0.15 | 0.35 | 0.81 | 1.91 | 4.53 |
| VIE-1 (d=2, continuous) | 0.16 | 0.37 | 0.84 | 1.96 | 4.59 |
| VIE-2 (d=2) | 0.34 | 0.83 | 2.01 | 4.82 | 11.4 |
| VIDE (d=2) | 0.71 | 1.62 | 3.70 | 8.47 | 19.2 |
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
| function_solve_VIE_1 | 1.99 | 3.47 | 6.24 |
| function_solve_VIE_2 | 2.04 | 3.55 | 6.56 |
| function_solve_VIE_2 (vector, d=3) | 3.19 | 5.92 | 11.7 |
| function_solve_VIDE | 2.51 | 4.20 | 7.59 |
| function_solve_VIE_2 (weakly singular) | 166 | 381 | 967 |
<!-- CALLABLE_BENCHMARKS:END -->
