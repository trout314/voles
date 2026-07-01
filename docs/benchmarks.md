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
| VIE-1 | 0.03 | 0.05 | 0.11 | 0.37 | 1.34 |
| VIE-1 (continuous) | 0.03 | 0.06 | 0.14 | 0.42 | 1.47 |
| VIE-2 | 0.05 | 0.13 | 0.44 | 1.64 | 6.33 |
| VIDE | 0.44 | 1.13 | 3.26 | 10.6 | 37.6 |
| VIE-1 (d=2) | 0.08 | 0.21 | 0.69 | 2.53 | 9.76 |
| VIE-1 (d=2, continuous) | 0.08 | 0.22 | 0.72 | 2.63 | 9.81 |
| VIE-2 (d=2) | 0.23 | 0.82 | 3.18 | 12.4 | 49.2 |
| VIDE (d=2) | 0.81 | 2.68 | 9.69 | 36.9 | 143 |
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
| function_solve_VIE_1 | 9.42 | 34.5 | 131 |
| function_solve_VIE_2 | 9.34 | 34.7 | 136 |
| function_solve_VIE_2 (vector, d=3) | 16.2 | 60.5 | 236 |
| function_solve_VIDE | 9.64 | 35.1 | 134 |
| function_solve_VIE_2 (weakly singular) | 117 | 266 | 653 |
<!-- CALLABLE_BENCHMARKS:END -->
