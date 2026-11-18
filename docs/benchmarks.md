# Benchmarks

Mean wall-clock execution time, measured on a GitHub Actions `ubuntu-22.04`
runner (2-core x86_64 VM on an Intel Xeon 8370C, 2.8 GHz base / 3.5 GHz boost).
Mean time is averaged over a variable number of calibrated rounds (from ~3 for
large inputs up to ~6000 for small inputs). A dash (—) marks sizes a row is
not benchmarked at (to keep the CI job fast). The timings are for warm calls:
the first solve in a process that needs scipy's quadrature (callable inputs
with a declared singularity) also imports it, about half a second once.

These tables are regenerated automatically by the benchmark CI job on pushes
to `main` that touch code (docs-only pushes are skipped), and this page is
redeployed with the fresh numbers. An interactive history of the same
measurements is published at the
[benchmark dashboard](https://trout314.github.io/voles/dev/bench/).

For the asymptotic complexity (which is what stays fixed as the implementation
evolves), see the [Benchmarks section of the README](https://github.com/trout314/voles#benchmarks).

## Sampled inputs

Mean time in milliseconds with **sampled inputs** (arrays, `dt=`), by input
length $N$ (number of samples). These rows use `quadrature="collocation"`, the
compiled path:

<!-- BENCHMARKS:START -->
| Solver \ N | 500 | 1000 | 2000 | 4000 | 8000 | 16000 | 32000 |
|---|---|---|---|---|---|---|---|
| VIE-1 | 0.07 | 0.09 | 0.14 | 0.23 | 0.44 | 0.87 | 1.73 |
| VIE-2 | 0.08 | 0.13 | 0.23 | 0.45 | 0.88 | 1.87 | 3.93 |
| VIDE | 0.10 | 0.16 | 0.28 | 0.55 | 1.11 | 2.36 | 4.92 |
| VIE-2 (Numba fallback) | 0.86 | 2.70 | 9.18 | 33.1 | 128 | — | — |
| VIE-1 (d=2) | 0.14 | 0.21 | 0.35 | 0.64 | 1.21 | 2.38 | 4.97 |
| VIE-2 (d=2) | 0.15 | 0.28 | 0.55 | 1.22 | 2.48 | 4.92 | 10.7 |
| VIDE (d=2) | 0.19 | 0.35 | 0.70 | 1.60 | 3.27 | 6.18 | 13.2 |
| VIE-2 (d=8) | 1.65 | 3.36 | 6.88 | 14.7 | 31.3 | — | — |
| VIDE (d=8) | 2.17 | 4.33 | 9.07 | 23.0 | 43.3 | — | — |
| VIE-2 (d=16) | 8.56 | 19.5 | 39.8 | 87.4 | — | — | — |
<!-- BENCHMARKS:END -->

Notes on the rows:

- **VIE-1 with `continuous=True`** is not shown separately: its timings
  are indistinguishable from the default (discontinuous) VIE-1 rows.
- **d=8** is the largest compile-time-specialized dimension in the D
  extension; **d=16** exercises the runtime-dimension path (LAPACK, or the
  pure-D LU fallback used on the CI runner). Cost grows as $d^2$ either way.
- **Numba fallback**: scalar equations with a collocation setting that is not
  compiled into the D extension fall back to a Numba JIT solver. Every setting
  with `divs` ≤ 4 is compiled, so this row uses
  `coll_setting=(5, [0, 3, 5])` — a 3-node rule comparable to the default — whose
  mesh intervals are 25 fine steps wide instead of 4. The fallback therefore
  takes ~6× *fewer* (larger) steps at equal $N$ than the D rows above, and is
  still one to two orders of magnitude slower: its history sum is quadratic in
  the number of mesh intervals, while the D extension uses a blocked-FFT
  scheme. The one-time JIT compilation cost (seconds, on first call in a
  fresh environment) is excluded from the timings via a warmup round.

## Callable inputs

With **callable inputs** (`mesh=`) the solvers integrate the kernel
numerically (Python + adaptive quadrature), so they are benchmarked on much
smaller problems, sized by the number of mesh intervals $M$ (each carrying
`len(coll_nodes)` collocation nodes). The smooth rows use uniform meshes, on
which the weights are assembled from one row (Toeplitz structure).

The two *weakly singular* rows solve the same Abel problem, $K(u) = u^{-1/2}$
on a graded mesh, and show what the problem setup costs:

- **VIE-2 (weakly singular)** is the slowest supported path: a kernel that
  only accepts scalars (`1.0 / np.sqrt(u) if u > 0 else 0.0`) and the
  singularity declared by location only (`kernel_singularity=0.0`). Every
  block the singularity touches is then integrated by adaptive quadrature,
  one scalar kernel call at a time, which is most of the cost.
- **VIE-2 (weakly singular, exponent declared)** is the setup the docs
  recommend: a vectorised kernel (`u**-0.5`) and the exponent declared
  (`kernel_singularity={0.0: 0.5}`), so those blocks use Gauss–Jacobi rules.
  It is 9–16× faster, more so as M grows, with the same accuracy.

<!-- CALLABLE_BENCHMARKS:START -->
| Solver \ M | 25 | 50 | 100 | 200 |
|---|---|---|---|---|
| VIE-1 | 0.59 | 0.79 | 1.18 | 2.25 |
| VIE-2 | 0.62 | 0.84 | 1.30 | 2.54 |
| VIE-2 (vector, d=3) | 0.74 | 1.07 | 1.72 | 3.90 |
| VIDE | 0.97 | 1.41 | 2.34 | 4.72 |
| VIE-2 (weakly singular) | 97.6 | 225 | 572 | 1603 |
| VIE-2 (weakly singular, exponent declared) | 9.10 | 19.6 | 43.5 | 91.3 |
<!-- CALLABLE_BENCHMARKS:END -->
