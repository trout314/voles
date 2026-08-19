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
| VIE-1 | 0.07 | 0.12 | 0.26 | 0.57 | 1.23 |
| VIE-1 (continuous) | 0.08 | 0.14 | 0.28 | 0.62 | 1.32 |
| VIE-2 | 0.13 | 0.27 | 0.56 | 1.23 | 2.72 |
| VIDE | 0.54 | 1.08 | 2.20 | 4.52 | 9.34 |
| VIE-1 (d=2) | 0.15 | 0.33 | 0.72 | 1.64 | 3.57 |
| VIE-1 (d=2, continuous) | 0.16 | 0.34 | 0.76 | 1.69 | 3.65 |
| VIE-2 (d=2) | 0.32 | 0.70 | 1.53 | 3.40 | 7.37 |
| VIDE (d=2) | 0.68 | 1.42 | 3.02 | 6.46 | 14.1 |
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
| function_solve_VIE_1 | 1.82 | 3.09 | 5.58 |
| function_solve_VIE_2 | 1.88 | 3.28 | 5.90 |
| function_solve_VIE_2 (vector, d=3) | 2.99 | 5.42 | 10.6 |
| function_solve_VIDE | 2.33 | 3.86 | 6.97 |
| function_solve_VIE_2 (weakly singular) | 166 | 383 | 970 |
<!-- CALLABLE_BENCHMARKS:END -->
