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
| VIE-1 | 0.05 | 0.10 | 0.21 | 0.49 | 1.15 |
| VIE-1 (continuous) | 0.05 | 0.11 | 0.24 | 0.54 | 1.24 |
| VIE-2 | 0.10 | 0.23 | 0.54 | 1.26 | 2.94 |
| VIDE | 0.41 | 0.93 | 1.92 | 3.92 | 8.44 |
| VIE-1 (d=2) | 0.11 | 0.27 | 0.64 | 1.54 | 3.68 |
| VIE-1 (d=2, continuous) | 0.12 | 0.28 | 0.66 | 1.58 | 3.75 |
| VIE-2 (d=2) | 0.26 | 0.65 | 1.59 | 3.82 | 9.16 |
| VIDE (d=2) | 0.56 | 1.28 | 2.94 | 6.70 | 15.2 |
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
| function_solve_VIE_1 | 1.23 | 2.12 | 3.91 |
| function_solve_VIE_2 | 1.29 | 2.28 | 4.21 |
| function_solve_VIE_2 (vector, d=3) | 2.00 | 3.64 | 7.04 |
| function_solve_VIDE | 1.63 | 2.73 | 4.92 |
| function_solve_VIE_2 (weakly singular) | 117 | 267 | 664 |
<!-- CALLABLE_BENCHMARKS:END -->
