window.BENCHMARK_DATA = {
  "lastUpdate": 1772731888537,
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
          "id": "75cceea15dd1f3c39b2a2a2f70fecb50fb584d34",
          "message": "Annotate benchmark chart bars with actual input size (n=...)\n\nEach bar now shows the number of data points used for that benchmark\ncase (e.g. n=451, n=4501 for VIE-1 small/large), making the chart\nself-contained without needing to cross-reference the bench_solvers.py\nsource.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:04:41-05:00",
          "tree_id": "297334321fd345c7d2f17f242a63cf71b289b0cb",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/75cceea15dd1f3c39b2a2a2f70fecb50fb584d34"
        },
        "date": 1772731624141,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_small",
            "value": 76.00017446087506,
            "unit": "iter/sec",
            "range": "stddev: 0.00008748787501018491",
            "extra": "mean: 13.157864532466313 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_large",
            "value": 0.8191183759720313,
            "unit": "iter/sec",
            "range": "stddev: 0.006152682720769811",
            "extra": "mean: 1.220824766399997 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_small",
            "value": 273.4457942068192,
            "unit": "iter/sec",
            "range": "stddev: 0.000039152489217208275",
            "extra": "mean: 3.657031928030517 msec\nrounds: 264"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_large",
            "value": 3.246791904659986,
            "unit": "iter/sec",
            "range": "stddev: 0.0008009525239240572",
            "extra": "mean: 307.9963327999991 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_small",
            "value": 23.490221232312376,
            "unit": "iter/sec",
            "range": "stddev: 0.0019193988218500747",
            "extra": "mean: 42.570906000001095 msec\nrounds: 24"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_large",
            "value": 0.2440009665432657,
            "unit": "iter/sec",
            "range": "stddev: 0.008272783906138873",
            "extra": "mean: 4.098344421199997 sec\nrounds: 5"
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
          "id": "d1e76bce97d450e00345a1c3dec2e74aab62839b",
          "message": "Change benchmark sizes to ~1000/2000/3000/4000 pts; update chart\n\nReplaces the two-case (small/large) benchmark structure with four\ncases per solver at approximately 1000, 2000, 3000 and 4000 data\npoints. Exact sizes differ slightly per solver due to the coll_divs\nconstraint (pts = n_intervals * coll_divs^2 + 1):\n\n  VIE-1 (coll_divs=3): 1000, 1999, 2998, 3997 pts\n  VIE-2 (coll_divs=2):  997, 1997, 2997, 3997 pts\n  VIDE  (coll_divs=2):  997, 1997, 2997, 3997 pts\n\nThe chart is updated to show four colour-coded bars per solver group,\neach annotated with its exact n, with the legend using ≈1000/2000/3000/\n4000 pts labels. Figure width increased from 7 to 9 inches. Results PNG\nregenerated from local benchmark run.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:11:00-05:00",
          "tree_id": "f59a8c43c9d785039325c13bd9de96b1609fbfcb",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/d1e76bce97d450e00345a1c3dec2e74aab62839b"
        },
        "date": 1772731888026,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.876222827148812,
            "unit": "iter/sec",
            "range": "stddev: 0.00015085103727912716",
            "extra": "mean: 77.66252676922883 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.257990980035617,
            "unit": "iter/sec",
            "range": "stddev: 0.0015083179113659355",
            "extra": "mean: 306.93762080000226 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4539816784896986,
            "unit": "iter/sec",
            "range": "stddev: 0.00023199106928178479",
            "extra": "mean: 687.7665755999999 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8139780040644976,
            "unit": "iter/sec",
            "range": "stddev: 0.007087695158485603",
            "extra": "mean: 1.228534425999996 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.177349164619336,
            "unit": "iter/sec",
            "range": "stddev: 0.0000873878015241196",
            "extra": "mean: 16.34591909677462 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.987710123088428,
            "unit": "iter/sec",
            "range": "stddev: 0.0001541046808025666",
            "extra": "mean: 62.54804423529446 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.211235045790391,
            "unit": "iter/sec",
            "range": "stddev: 0.0002840491261934024",
            "extra": "mean: 138.67250112499897 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.064046188216547,
            "unit": "iter/sec",
            "range": "stddev: 0.0015367007210043257",
            "extra": "mean: 246.0601956000005 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.955877791092656,
            "unit": "iter/sec",
            "range": "stddev: 0.000635249570687607",
            "extra": "mean: 252.78839560000392 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9867670831795483,
            "unit": "iter/sec",
            "range": "stddev: 0.005830227170331655",
            "extra": "mean: 1.0134103752000043 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.43909280680204055,
            "unit": "iter/sec",
            "range": "stddev: 0.006482316676691818",
            "extra": "mean: 2.277422869399993 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2487167309049192,
            "unit": "iter/sec",
            "range": "stddev: 0.025158919784989353",
            "extra": "mean: 4.020638243199994 sec\nrounds: 5"
          }
        ]
      }
    ]
  }
}