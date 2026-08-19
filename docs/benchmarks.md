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
| VIE-1 | 0.06 | 0.11 | 0.23 | 0.56 | 1.24 |
| VIE-1 (continuous) | 0.06 | 0.12 | 0.26 | 0.59 | 1.33 |
| VIE-2 | 0.11 | 0.24 | 0.54 | 1.22 | 2.77 |
| VIDE | 0.59 | 1.20 | 2.46 | 5.08 | 10.5 |
| VIE-1 (d=2) | 0.13 | 0.30 | 0.68 | 1.68 | 3.71 |
| VIE-1 (d=2, continuous) | 0.14 | 0.31 | 0.70 | 1.69 | 3.79 |
| VIE-2 (d=2) | 0.30 | 0.68 | 1.55 | 3.52 | 7.84 |
| VIDE (d=2) | 0.72 | 1.56 | 3.35 | 7.18 | 15.6 |
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
| function_solve_VIE_1 | 1.33 | 2.20 | 4.10 |
| function_solve_VIE_2 | 1.35 | 2.39 | 4.43 |
| function_solve_VIE_2 (vector, d=3) | 2.06 | 3.83 | 7.81 |
| function_solve_VIDE | 1.66 | 2.81 | 5.16 |
| function_solve_VIE_2 (weakly singular) | 122 | 281 | 705 |
<!-- CALLABLE_BENCHMARKS:END -->
