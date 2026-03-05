window.BENCHMARK_DATA = {
  "lastUpdate": 1772727576708,
  "repoUrl": "https://github.com/trout314/volterra-equation-solvers",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "committer": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "distinct": true,
          "id": "81954ab0f2d5591f7cfc375b71fe6dc3b441dff1",
          "message": "Trigger benchmark workflow (gh-pages branch now exists)",
          "timestamp": "2026-03-04T15:21:44-05:00",
          "tree_id": "3b3c9d4ef251749cb20346069139ba04ea8c9e99",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/81954ab0f2d5591f7cfc375b71fe6dc3b441dff1"
        },
        "date": 1772655813883,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_small",
            "value": 75.1284679255058,
            "unit": "iter/sec",
            "range": "stddev: 0.00008356399613555836",
            "extra": "mean: 13.31053364473714 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_large",
            "value": 0.8135136445498962,
            "unit": "iter/sec",
            "range": "stddev: 0.0014908885762788201",
            "extra": "mean: 1.2292356823999966 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_small",
            "value": 242.8183861023552,
            "unit": "iter/sec",
            "range": "stddev: 0.0009710608035270153",
            "extra": "mean: 4.118304285156027 msec\nrounds: 256"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_large",
            "value": 2.994807522456756,
            "unit": "iter/sec",
            "range": "stddev: 0.0007918887557519832",
            "extra": "mean: 333.9112755999963 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_small",
            "value": 23.71089828107858,
            "unit": "iter/sec",
            "range": "stddev: 0.0002663252729486738",
            "extra": "mean: 42.17469908333271 msec\nrounds: 24"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_large",
            "value": 0.24764137152925733,
            "unit": "iter/sec",
            "range": "stddev: 0.015035588459756015",
            "extra": "mean: 4.0380974868000035 sec\nrounds: 5"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "committer": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "distinct": true,
          "id": "0f50c2438c418def2dcedaec29ce83c989a9f5e7",
          "message": "Replace Cramer's rule linear solvers with generic LU factorization\n\nRemoves the five hard-coded solver functions (determinant2, solve2,\ndeterminant3, solve3, and the static-if dispatch shell of lin_solve)\nand replaces them with a single generic lin_solve!(dim) template using\nLU factorization with partial pivoting.\n\nBecause dim is a compile-time template parameter, the compiler emits a\nfully specialised, inlinable version for each distinct system size with\nall loop bounds known at compile time — matching the performance profile\nof the old hand-coded solvers while removing the static assert barrier\nthat prevented use beyond dim=3.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T11:17:11-05:00",
          "tree_id": "79b9b4fb622b24a627041e1be24c81627534c493",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/0f50c2438c418def2dcedaec29ce83c989a9f5e7"
        },
        "date": 1772727575718,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_small",
            "value": 52.1981075643068,
            "unit": "iter/sec",
            "range": "stddev: 0.00011403117277566883",
            "extra": "mean: 19.157782660377567 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_large",
            "value": 0.5556429622064879,
            "unit": "iter/sec",
            "range": "stddev: 0.006137972529357075",
            "extra": "mean: 1.7997168469999991 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_small",
            "value": 189.27681425905075,
            "unit": "iter/sec",
            "range": "stddev: 0.000021840441572178014",
            "extra": "mean: 5.283267281915288 msec\nrounds: 188"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_large",
            "value": 2.2224217581618597,
            "unit": "iter/sec",
            "range": "stddev: 0.00007714727305909702",
            "extra": "mean: 449.9595976000023 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_small",
            "value": 15.304895568336379,
            "unit": "iter/sec",
            "range": "stddev: 0.0006844114403676729",
            "extra": "mean: 65.33857062500026 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_large",
            "value": 0.16724627030692935,
            "unit": "iter/sec",
            "range": "stddev: 0.007946181274037479",
            "extra": "mean: 5.979206580600009 sec\nrounds: 5"
          }
        ]
      }
    ]
  }
}