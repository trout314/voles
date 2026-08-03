# Notes on the fast-uniform-mesh optimizations

Documentation for the optimizations on this branch (commits `782fb58`,
`382ec8d`, `a56349d`): Toeplitz weight-tensor assembly for the
callable-input solvers, and O(Q log^2 Q) blocked-FFT history summation
for the sampled-data solvers (compile-time and runtime-dimension
drivers).

- `fast_uniform_mesh_notes.tex` / `.pdf` — self-contained technical
  notes: the Hairer–Lubich–Schlichte algorithm from first principles
  (schedule correctness proof, FFT window lemma, operation count), its
  application here, the floating-point reproducibility policy, and the
  verification methodology. Written to be reproducible without reading
  the code.
- `voles_optimization_benchmarks.docx` — benchmark summary: before/after
  tables, d = 10 scaling, np.allclose verification, figures with
  commentary.
- `plot_speedups.png` — per-test speedups for the full 363-test suite
  plus six added large-N benchmarks, vs. runtime on upstream main.
- `plot_differences.png` — max |new − old| (absolute and
  scale-relative) for every test-suite problem spec plus extra
  batteries, old vs. new build.
