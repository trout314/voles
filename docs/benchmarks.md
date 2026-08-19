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
| VIE-1 | 0.06 | 0.13 | 0.28 | 0.64 | 1.50 |
| VIE-1 (continuous) | 0.07 | 0.14 | 0.31 | 0.70 | 1.61 |
| VIE-2 | 0.13 | 0.30 | 0.69 | 1.63 | 3.80 |
| VIDE | 0.53 | 1.18 | 2.39 | 4.95 | 10.6 |
| VIE-1 (d=2) | 0.14 | 0.35 | 0.82 | 1.96 | 4.65 |
| VIE-1 (d=2, continuous) | 0.15 | 0.37 | 0.85 | 2.02 | 4.77 |
| VIE-2 (d=2) | 0.34 | 0.84 | 2.05 | 4.94 | 11.7 |
| VIDE (d=2) | 0.71 | 1.62 | 3.74 | 8.57 | 19.5 |
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
| function_solve_VIE_1 | 1.62 | 2.75 | 5.05 |
| function_solve_VIE_2 | 1.67 | 2.91 | 5.39 |
| function_solve_VIE_2 (vector, d=3) | 2.61 | 4.72 | 9.15 |
| function_solve_VIDE | 2.12 | 3.50 | 6.32 |
| function_solve_VIE_2 (weakly singular) | 149 | 342 | 857 |
<!-- CALLABLE_BENCHMARKS:END -->
