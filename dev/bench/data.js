window.BENCHMARK_DATA = {
  "lastUpdate": 1772737214756,
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
          "id": "66639f0e7ff65dea79c0d234a710eb563f51880e",
          "message": "Add ~500 pt benchmark cases; split chart into one subplot per solver\n\nAdds test_vie1_500 (496 pts), test_vie2_500 (497 pts), test_vide_500\n(497 pts) so the benchmark now covers five sizes: ~500, ~1000, ~2000,\n~3000, ~4000 data points per solver.\n\nThe chart is restructured into three side-by-side subplots (one per\nsolver) each with an independent y-axis, making it easy to read the\nscaling curve for each solver without the VIDE scale dominating the\nothers.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:14:10-05:00",
          "tree_id": "13021f977eefe2deba7aea54e5927477aa104cc8",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/66639f0e7ff65dea79c0d234a710eb563f51880e"
        },
        "date": 1772732031326,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.84448390915813,
            "unit": "iter/sec",
            "range": "stddev: 0.00009668160741505122",
            "extra": "mean: 19.66781690196052 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.820317698095328,
            "unit": "iter/sec",
            "range": "stddev: 0.005185741895298691",
            "extra": "mean: 78.0011871428558 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2909174854890453,
            "unit": "iter/sec",
            "range": "stddev: 0.0012881728450467689",
            "extra": "mean: 303.8666282000065 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.469212095624145,
            "unit": "iter/sec",
            "range": "stddev: 0.003865911125469942",
            "extra": "mean: 680.6369230000001 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8232472613349512,
            "unit": "iter/sec",
            "range": "stddev: 0.014117819677860865",
            "extra": "mean: 1.214701884799996 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 232.1006511436972,
            "unit": "iter/sec",
            "range": "stddev: 0.00002601362731975302",
            "extra": "mean: 4.3084756336201915 msec\nrounds: 232"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 62.09838675400035,
            "unit": "iter/sec",
            "range": "stddev: 0.00006220502558244795",
            "extra": "mean: 16.103477920633427 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.204334677636858,
            "unit": "iter/sec",
            "range": "stddev: 0.0001985562490518719",
            "extra": "mean: 61.71188264705935 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.320120896371784,
            "unit": "iter/sec",
            "range": "stddev: 0.0003257785675773413",
            "extra": "mean: 136.60976562499803 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.172821614114746,
            "unit": "iter/sec",
            "range": "stddev: 0.0017940280505541063",
            "extra": "mean: 315.1768745999959 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.724370280836453,
            "unit": "iter/sec",
            "range": "stddev: 0.00020747737965669773",
            "extra": "mean: 63.595551499999736 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9612098682104335,
            "unit": "iter/sec",
            "range": "stddev: 0.00039360911703282544",
            "extra": "mean: 252.44812399999716 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9919765840895814,
            "unit": "iter/sec",
            "range": "stddev: 0.0008363291069611558",
            "extra": "mean: 1.008088311800003 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4441258196988768,
            "unit": "iter/sec",
            "range": "stddev: 0.0023590641296468108",
            "extra": "mean: 2.251614194999996 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2497674923654968,
            "unit": "iter/sec",
            "range": "stddev: 0.003659874559290214",
            "extra": "mean: 4.003723585199998 sec\nrounds: 5"
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
          "id": "b72928fdf1b3d11db84222048f291bc07a0e2bef",
          "message": "Split benchmark chart into three separate PNGs, one per solver\n\n- plot_results.py now generates results_vie1.png, results_vie2.png,\n  results_vide.png (one 5×4 figure per solver) instead of a single file\n- Each chart title includes the CPU brand from benchmark JSON\n- README benchmarks section now shows all three charts and lists the\n  processor used (12th Gen Intel i5-12600KF)\n- bench.yml updated to commit the three new PNG files\n- Remove old benchmarks/results.png\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:19:56-05:00",
          "tree_id": "98cb95fadf6b5df45666191f83f3a47e6b461d78",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/b72928fdf1b3d11db84222048f291bc07a0e2bef"
        },
        "date": 1772732542628,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.735156283530955,
            "unit": "iter/sec",
            "range": "stddev: 0.00008176452432685236",
            "extra": "mean: 20.10650161224355 msec\nrounds: 49"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.486148563127262,
            "unit": "iter/sec",
            "range": "stddev: 0.004105091778749461",
            "extra": "mean: 80.08874753845966 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.243836713164452,
            "unit": "iter/sec",
            "range": "stddev: 0.002066414489689896",
            "extra": "mean: 308.27692279999894 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4474847825258883,
            "unit": "iter/sec",
            "range": "stddev: 0.00569018797358499",
            "extra": "mean: 690.8535496000042 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8059014738809062,
            "unit": "iter/sec",
            "range": "stddev: 0.01104895665693475",
            "extra": "mean: 1.2408464711999982 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 225.81652734841975,
            "unit": "iter/sec",
            "range": "stddev: 0.000030977427175105285",
            "extra": "mean: 4.428373829596038 msec\nrounds: 223"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 60.257949079450036,
            "unit": "iter/sec",
            "range": "stddev: 0.0000981197976512984",
            "extra": "mean: 16.59532087096926 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.664108276252138,
            "unit": "iter/sec",
            "range": "stddev: 0.0009125773454838927",
            "extra": "mean: 63.84021243750393 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.067920094325642,
            "unit": "iter/sec",
            "range": "stddev: 0.0006036619550471381",
            "extra": "mean: 141.48433862499843 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.1382220178084372,
            "unit": "iter/sec",
            "range": "stddev: 0.00040984227562388737",
            "extra": "mean: 318.65176980000456 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.56255670022952,
            "unit": "iter/sec",
            "range": "stddev: 0.0006606710916207967",
            "extra": "mean: 64.25679400000206 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9600844962278545,
            "unit": "iter/sec",
            "range": "stddev: 0.001110172810081395",
            "extra": "mean: 252.51986439999996 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9895544823673255,
            "unit": "iter/sec",
            "range": "stddev: 0.004062849979665861",
            "extra": "mean: 1.0105557781999892 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.440803990399564,
            "unit": "iter/sec",
            "range": "stddev: 0.004028478736368702",
            "extra": "mean: 2.268582004199999 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24918796189386483,
            "unit": "iter/sec",
            "range": "stddev: 0.012991319307881784",
            "extra": "mean: 4.01303494920001 sec\nrounds: 5"
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
          "id": "9472e8caf4d52a0ddfad57a619e2d29d70892358",
          "message": "Update benchmark charts: n labels on bars, simpler titles, trial info in README\n\n- Remove CPU brand from chart titles (now just \"VIE-1\", \"VIE-2\", \"VIDE\")\n- Annotate each bar with its n= value\n- README benchmarks section now states the processor and that mean time\n  is averaged over auto-calibrated rounds (~9 for large inputs, ~6000\n  for small inputs)\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:25:33-05:00",
          "tree_id": "994f7afe4372580b9d6251ef7ba265129cabf6cd",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/9472e8caf4d52a0ddfad57a619e2d29d70892358"
        },
        "date": 1772732761961,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.68114590568178,
            "unit": "iter/sec",
            "range": "stddev: 0.00019212639351969324",
            "extra": "mean: 19.731203431370947 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.97281980754785,
            "unit": "iter/sec",
            "range": "stddev: 0.000755991386449939",
            "extra": "mean: 77.08424342857053 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.291300490233016,
            "unit": "iter/sec",
            "range": "stddev: 0.0026788268654016722",
            "extra": "mean: 303.8312676000004 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4621716103918558,
            "unit": "iter/sec",
            "range": "stddev: 0.009316162781118237",
            "extra": "mean: 683.9142497999973 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8287740303914849,
            "unit": "iter/sec",
            "range": "stddev: 0.00591317064052382",
            "extra": "mean: 1.2066015141999968 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 230.83031566625334,
            "unit": "iter/sec",
            "range": "stddev: 0.00015914290699211946",
            "extra": "mean: 4.3321865982536405 msec\nrounds: 229"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.81511617019633,
            "unit": "iter/sec",
            "range": "stddev: 0.00008814196151369455",
            "extra": "mean: 16.177272841268916 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.14557433338999,
            "unit": "iter/sec",
            "range": "stddev: 0.0002442149740904642",
            "extra": "mean: 61.93647741176613 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.299443927631528,
            "unit": "iter/sec",
            "range": "stddev: 0.00017379267169325164",
            "extra": "mean: 136.99673700000227 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.1259151199281066,
            "unit": "iter/sec",
            "range": "stddev: 0.0005541919859608365",
            "extra": "mean: 242.3704731999976 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.502616726887336,
            "unit": "iter/sec",
            "range": "stddev: 0.0005970396005669749",
            "extra": "mean: 64.50523918749963 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9114001375053364,
            "unit": "iter/sec",
            "range": "stddev: 0.002223375000841364",
            "extra": "mean: 255.66292499999577 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9833362273508487,
            "unit": "iter/sec",
            "range": "stddev: 0.010687982602829773",
            "extra": "mean: 1.016946159600002 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.44256829950705473,
            "unit": "iter/sec",
            "range": "stddev: 0.00989859628512467",
            "extra": "mean: 2.259538247800009 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24570769698236028,
            "unit": "iter/sec",
            "range": "stddev: 0.029040008822704664",
            "extra": "mean: 4.069876574000006 sec\nrounds: 5"
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
          "id": "7c776290138b5b53d65408892e1edfb205c029ba",
          "message": "Revert \"Halve benchmark chart size (5x7 -> 2.5x3.5 inches)\"\n\nThis reverts commit 10c82249e1c6489a573444ba4d1093bc347ae872.",
          "timestamp": "2026-03-05T12:39:20-05:00",
          "tree_id": "0cde6ae091b109a849f0061e5e76f9e10301858e",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/7c776290138b5b53d65408892e1edfb205c029ba"
        },
        "date": 1772732815081,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 48.8739266467075,
            "unit": "iter/sec",
            "range": "stddev: 0.00013471688057546162",
            "extra": "mean: 20.460807399999794 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.680917540976697,
            "unit": "iter/sec",
            "range": "stddev: 0.00027217304486223693",
            "extra": "mean: 78.85864700000084 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.1486858138893417,
            "unit": "iter/sec",
            "range": "stddev: 0.014417738117904796",
            "extra": "mean: 317.59281779999924 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.437291593707058,
            "unit": "iter/sec",
            "range": "stddev: 0.001829010675431074",
            "extra": "mean: 695.7530429999963 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8089224828054034,
            "unit": "iter/sec",
            "range": "stddev: 0.0047633836564608305",
            "extra": "mean: 1.236212395200002 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 225.61553468002307,
            "unit": "iter/sec",
            "range": "stddev: 0.00003772299891116021",
            "extra": "mean: 4.432318906666777 msec\nrounds: 225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 60.38106677333069,
            "unit": "iter/sec",
            "range": "stddev: 0.00008381431684861917",
            "extra": "mean: 16.561482819672268 msec\nrounds: 61"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.646686868865208,
            "unit": "iter/sec",
            "range": "stddev: 0.0011317714421288142",
            "extra": "mean: 63.91129370588126 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.096189351374457,
            "unit": "iter/sec",
            "range": "stddev: 0.0002867670838414453",
            "extra": "mean: 140.9207041249978 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.030645780199764,
            "unit": "iter/sec",
            "range": "stddev: 0.0013478050788373085",
            "extra": "mean: 248.0992016000073 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.444148195115307,
            "unit": "iter/sec",
            "range": "stddev: 0.0005685968401699597",
            "extra": "mean: 64.74944343750089 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.94351980827508,
            "unit": "iter/sec",
            "range": "stddev: 0.0014877743683324258",
            "extra": "mean: 253.5805698000047 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9913435020945605,
            "unit": "iter/sec",
            "range": "stddev: 0.0022614441075319656",
            "extra": "mean: 1.0087320871999963 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.44102234854457556,
            "unit": "iter/sec",
            "range": "stddev: 0.003967314563857785",
            "extra": "mean: 2.267458788199997 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24817224123637152,
            "unit": "iter/sec",
            "range": "stddev: 0.008452994423967167",
            "extra": "mean: 4.029459519800002 sec\nrounds: 5"
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
          "id": "5f934f612eda784bde2fe6672411e2a57e8d8839",
          "message": "Remove x-axis labels from benchmark charts (n values shown on bars)\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:27:28-05:00",
          "tree_id": "d850a340e083199eacfacac6c1d7cb4d71cbb4d2",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/5f934f612eda784bde2fe6672411e2a57e8d8839"
        },
        "date": 1772732859914,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.73380656416142,
            "unit": "iter/sec",
            "range": "stddev: 0.0001029492148506499",
            "extra": "mean: 20.107047280000643 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.722571827731104,
            "unit": "iter/sec",
            "range": "stddev: 0.0003602366906757142",
            "extra": "mean: 78.60046015384424 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2175395918503926,
            "unit": "iter/sec",
            "range": "stddev: 0.0007153293261777427",
            "extra": "mean: 310.79648640000244 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4358973675045372,
            "unit": "iter/sec",
            "range": "stddev: 0.0014725604640094842",
            "extra": "mean: 696.4286046000012 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.801575503320885,
            "unit": "iter/sec",
            "range": "stddev: 0.011412002927177858",
            "extra": "mean: 1.2475431146000004 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 225.59315374085716,
            "unit": "iter/sec",
            "range": "stddev: 0.00003713893565355158",
            "extra": "mean: 4.4327586339287475 msec\nrounds: 224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 60.35068511864339,
            "unit": "iter/sec",
            "range": "stddev: 0.0003617702911477446",
            "extra": "mean: 16.5698201774197 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.773003265154104,
            "unit": "iter/sec",
            "range": "stddev: 0.0001994602126767362",
            "extra": "mean: 63.3994669999981 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.571835845963665,
            "unit": "iter/sec",
            "range": "stddev: 0.0009331940451132562",
            "extra": "mean: 179.47405983333434 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.999749148532581,
            "unit": "iter/sec",
            "range": "stddev: 0.00277115437568775",
            "extra": "mean: 250.01567920000127 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.610239786550855,
            "unit": "iter/sec",
            "range": "stddev: 0.0005311077504878211",
            "extra": "mean: 64.06051500000399 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9466357042466553,
            "unit": "iter/sec",
            "range": "stddev: 0.0008403790769694903",
            "extra": "mean: 253.3803661999968 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9915140655940403,
            "unit": "iter/sec",
            "range": "stddev: 0.0011879345755716737",
            "extra": "mean: 1.008558561800004 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.44334369232146054,
            "unit": "iter/sec",
            "range": "stddev: 0.005735926103709503",
            "extra": "mean: 2.2555863933999944 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2494193468967468,
            "unit": "iter/sec",
            "range": "stddev: 0.006714125692069514",
            "extra": "mean: 4.009312078000005 sec\nrounds: 5"
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
          "id": "8a320fb5846496356fadee6e9d0ba335db09914d",
          "message": "Move subplot titles inside graph area\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:40:33-05:00",
          "tree_id": "8dcc251ba24d20340efe37357b8792b6f19651a0",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/8a320fb5846496356fadee6e9d0ba335db09914d"
        },
        "date": 1772732912100,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 33.86988861964923,
            "unit": "iter/sec",
            "range": "stddev: 0.00021485634186124833",
            "extra": "mean: 29.52475017646977 msec\nrounds: 34"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 8.731934865001133,
            "unit": "iter/sec",
            "range": "stddev: 0.0002090303500533676",
            "extra": "mean: 114.52215522222293 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2.213753383698799,
            "unit": "iter/sec",
            "range": "stddev: 0.0003025606066814056",
            "extra": "mean: 451.72150040000076 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 0.9818179806561754,
            "unit": "iter/sec",
            "range": "stddev: 0.001487459704997319",
            "extra": "mean: 1.0185187271999978 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.5543441945528317,
            "unit": "iter/sec",
            "range": "stddev: 0.0028859214755758813",
            "extra": "mean: 1.8039333861999978 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 158.88371515836258,
            "unit": "iter/sec",
            "range": "stddev: 0.000038710525085763383",
            "extra": "mean: 6.293911235668677 msec\nrounds: 157"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 42.40754049385387,
            "unit": "iter/sec",
            "range": "stddev: 0.00009857781966407948",
            "extra": "mean: 23.5807120232528 msec\nrounds: 43"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 11.04605225663058,
            "unit": "iter/sec",
            "range": "stddev: 0.000349239412899476",
            "extra": "mean: 90.53008050000244 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 4.97928927365676,
            "unit": "iter/sec",
            "range": "stddev: 0.0007162937397040575",
            "extra": "mean: 200.8318747999965 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2.763938030647578,
            "unit": "iter/sec",
            "range": "stddev: 0.0014551080416791435",
            "extra": "mean: 361.8026123999982 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 10.145614704463675,
            "unit": "iter/sec",
            "range": "stddev: 0.0004054595470436678",
            "extra": "mean: 98.56475227272715 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 2.609802185152625,
            "unit": "iter/sec",
            "range": "stddev: 0.0013085820022670461",
            "extra": "mean: 383.17080339999734 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.666325412371198,
            "unit": "iter/sec",
            "range": "stddev: 0.0030219789983168864",
            "extra": "mean: 1.5007682154000122 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.30132006563455915,
            "unit": "iter/sec",
            "range": "stddev: 0.021609603076037584",
            "extra": "mean: 3.3187301943999956 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.17141086708575362,
            "unit": "iter/sec",
            "range": "stddev: 0.004486464591691669",
            "extra": "mean: 5.833935835 sec\nrounds: 5"
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
          "id": "f110ab25408ace596c00b491550f86eeb345fa7a",
          "message": "Slightly decrease n= label font size (10 -> 9)\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:37:20-05:00",
          "tree_id": "0cde6ae091b109a849f0061e5e76f9e10301858e",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/f110ab25408ace596c00b491550f86eeb345fa7a"
        },
        "date": 1772732926280,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.89481615107281,
            "unit": "iter/sec",
            "range": "stddev: 0.00011614470426869847",
            "extra": "mean: 20.04216223529463 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.779737241366703,
            "unit": "iter/sec",
            "range": "stddev: 0.00019786473000754464",
            "extra": "mean: 78.2488701538481 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2501370932201823,
            "unit": "iter/sec",
            "range": "stddev: 0.00043897819162183507",
            "extra": "mean: 307.6793290000012 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.451261229906204,
            "unit": "iter/sec",
            "range": "stddev: 0.0015784514087137937",
            "extra": "mean: 689.0558221999981 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8156468679905852,
            "unit": "iter/sec",
            "range": "stddev: 0.003424730434789615",
            "extra": "mean: 1.2260207686000002 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 230.59375032560632,
            "unit": "iter/sec",
            "range": "stddev: 0.00002839607713319832",
            "extra": "mean: 4.336630973684089 msec\nrounds: 228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.21200825697153,
            "unit": "iter/sec",
            "range": "stddev: 0.0010524244364981173",
            "extra": "mean: 16.3366638095248 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.102605834688926,
            "unit": "iter/sec",
            "range": "stddev: 0.00020350140906791857",
            "extra": "mean: 62.10174988235488 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.2516450200363,
            "unit": "iter/sec",
            "range": "stddev: 0.00028562680286629117",
            "extra": "mean: 137.8997451250026 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.205413392401571,
            "unit": "iter/sec",
            "range": "stddev: 0.000804029725280005",
            "extra": "mean: 311.9722411999959 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.407732004950233,
            "unit": "iter/sec",
            "range": "stddev: 0.0007906492960357715",
            "extra": "mean: 64.90247881250255 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.8830520705400753,
            "unit": "iter/sec",
            "range": "stddev: 0.0005476654507644697",
            "extra": "mean: 257.52938199999846 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9711970085040544,
            "unit": "iter/sec",
            "range": "stddev: 0.011967602542275595",
            "extra": "mean: 1.0296572078000026 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4368937440029308,
            "unit": "iter/sec",
            "range": "stddev: 0.031133253102071864",
            "extra": "mean: 2.2888860591999958 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24901749612760338,
            "unit": "iter/sec",
            "range": "stddev: 0.004006702750780995",
            "extra": "mean: 4.015782085799998 sec\nrounds: 5"
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
          "id": "798ad171e2651e1386059584f64b2e6c0e076381",
          "message": "Reduce benchmark chart height from 9 to 7 inches\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:37:11-05:00",
          "tree_id": "f95e3a9e069c0498db63cd5a7de5365602d0b6fb",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/798ad171e2651e1386059584f64b2e6c0e076381"
        },
        "date": 1772732927168,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.710139417123244,
            "unit": "iter/sec",
            "range": "stddev: 0.00012861190575620522",
            "extra": "mean: 19.71992211999975 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.879548172927025,
            "unit": "iter/sec",
            "range": "stddev: 0.0005707863230452972",
            "extra": "mean: 77.64247523077034 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2828710098919065,
            "unit": "iter/sec",
            "range": "stddev: 0.0013701931280944149",
            "extra": "mean: 304.6114199999977 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4535407992814544,
            "unit": "iter/sec",
            "range": "stddev: 0.00421914097725874",
            "extra": "mean: 687.9751848000012 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8170443163832255,
            "unit": "iter/sec",
            "range": "stddev: 0.011448079605506756",
            "extra": "mean: 1.2239238189999981 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 229.2250093955899,
            "unit": "iter/sec",
            "range": "stddev: 0.00004231106438019027",
            "extra": "mean: 4.362525723684142 msec\nrounds: 228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.928774878498416,
            "unit": "iter/sec",
            "range": "stddev: 0.00008870011928254791",
            "extra": "mean: 16.147582476190703 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.125437081157596,
            "unit": "iter/sec",
            "range": "stddev: 0.00019529399912285948",
            "extra": "mean: 62.01382294117717 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.3906382811849864,
            "unit": "iter/sec",
            "range": "stddev: 0.0005476534420049007",
            "extra": "mean: 185.50678933333606 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.123786071712447,
            "unit": "iter/sec",
            "range": "stddev: 0.0003796443880714289",
            "extra": "mean: 242.4956054000006 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.659344612895225,
            "unit": "iter/sec",
            "range": "stddev: 0.00021189778323225928",
            "extra": "mean: 63.85963299999897 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9011520902638352,
            "unit": "iter/sec",
            "range": "stddev: 0.0004991124294110886",
            "extra": "mean: 256.334533200004 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1.003755193925726,
            "unit": "iter/sec",
            "range": "stddev: 0.0016008102149407885",
            "extra": "mean: 996.2588548000042 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4443300060862439,
            "unit": "iter/sec",
            "range": "stddev: 0.005310169513355975",
            "extra": "mean: 2.250579493400005 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24982894983776047,
            "unit": "iter/sec",
            "range": "stddev: 0.0033818897040665146",
            "extra": "mean: 4.002738676400003 sec\nrounds: 5"
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
          "id": "b6e4cb5f333fd386b557f517b95bd3068c126e5a",
          "message": "Use absolute 4pt offset for n= labels above bars\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:34:27-05:00",
          "tree_id": "275f98d14ee2a756ec1f28c2b1a9bc98475d55c2",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/b6e4cb5f333fd386b557f517b95bd3068c126e5a"
        },
        "date": 1772733052971,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.68217194766776,
            "unit": "iter/sec",
            "range": "stddev: 0.00009044308260145359",
            "extra": "mean: 19.73080398039289 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.761620419806151,
            "unit": "iter/sec",
            "range": "stddev: 0.004294877864263856",
            "extra": "mean: 78.35995485714265 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.294982569904654,
            "unit": "iter/sec",
            "range": "stddev: 0.002208289388886158",
            "extra": "mean: 303.49174199999993 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4807101170626276,
            "unit": "iter/sec",
            "range": "stddev: 0.002596026108021597",
            "extra": "mean: 675.351636000002 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8175333164336883,
            "unit": "iter/sec",
            "range": "stddev: 0.0063051046492839605",
            "extra": "mean: 1.2231917401999994 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 234.52140272216025,
            "unit": "iter/sec",
            "range": "stddev: 0.000028336687218216216",
            "extra": "mean: 4.264003150214437 msec\nrounds: 233"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 63.015385421985364,
            "unit": "iter/sec",
            "range": "stddev: 0.00007091027242526956",
            "extra": "mean: 15.86914042187404 msec\nrounds: 64"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.530756089663665,
            "unit": "iter/sec",
            "range": "stddev: 0.000055703040188180724",
            "extra": "mean: 60.49330076470483 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.3258868379783335,
            "unit": "iter/sec",
            "range": "stddev: 0.002468636656377464",
            "extra": "mean: 136.50224500000087 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.224216148368635,
            "unit": "iter/sec",
            "range": "stddev: 0.00038989788901209994",
            "extra": "mean: 236.73031040000012 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.975975806862287,
            "unit": "iter/sec",
            "range": "stddev: 0.00012321104442243464",
            "extra": "mean: 62.59398562499463 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4.073641661236349,
            "unit": "iter/sec",
            "range": "stddev: 0.0005019192773216944",
            "extra": "mean: 245.48060019999411 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1.0229233204453003,
            "unit": "iter/sec",
            "range": "stddev: 0.0008518661453576554",
            "extra": "mean: 977.5903824000011 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4579778673045218,
            "unit": "iter/sec",
            "range": "stddev: 0.006366927966707122",
            "extra": "mean: 2.1835116310000044 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.25538728696855006,
            "unit": "iter/sec",
            "range": "stddev: 0.06987647237778584",
            "extra": "mean: 3.915621689200003 sec\nrounds: 5"
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
          "id": "10c82249e1c6489a573444ba4d1093bc347ae872",
          "message": "Halve benchmark chart size (5x7 -> 2.5x3.5 inches)\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:38:44-05:00",
          "tree_id": "f9ee93772da40a40a9248fb37019f270b7a41806",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/10c82249e1c6489a573444ba4d1093bc347ae872"
        },
        "date": 1772733120918,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 34.62576946629224,
            "unit": "iter/sec",
            "range": "stddev: 0.00016285658047877726",
            "extra": "mean: 28.880224625000395 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 8.834600638798568,
            "unit": "iter/sec",
            "range": "stddev: 0.0007862778454649154",
            "extra": "mean: 113.19130777777768 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2.2333884068898344,
            "unit": "iter/sec",
            "range": "stddev: 0.0022510278269554547",
            "extra": "mean: 447.7501526000026 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 0.9985045186141767,
            "unit": "iter/sec",
            "range": "stddev: 0.0049315296002414785",
            "extra": "mean: 1.0014977211999991 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.5609857222571277,
            "unit": "iter/sec",
            "range": "stddev: 0.010033829586965672",
            "extra": "mean: 1.7825765617999991 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 156.45717051201294,
            "unit": "iter/sec",
            "range": "stddev: 0.00019675652271810347",
            "extra": "mean: 6.39152553205108 msec\nrounds: 156"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 41.593794586134166,
            "unit": "iter/sec",
            "range": "stddev: 0.00022689549566024846",
            "extra": "mean: 24.042047857142684 msec\nrounds: 42"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 10.853091425739262,
            "unit": "iter/sec",
            "range": "stddev: 0.00015932652457281764",
            "extra": "mean: 92.13964581818536 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 4.88989034886415,
            "unit": "iter/sec",
            "range": "stddev: 0.00011968847034935852",
            "extra": "mean: 204.50356319999798 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2.765628861854992,
            "unit": "iter/sec",
            "range": "stddev: 0.0008637381104429396",
            "extra": "mean: 361.58141600000135 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 10.179879092873017,
            "unit": "iter/sec",
            "range": "stddev: 0.001533478900271579",
            "extra": "mean: 98.23299381817853 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 2.6248486062131544,
            "unit": "iter/sec",
            "range": "stddev: 0.0021374333435816555",
            "extra": "mean: 380.9743532000084 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.6712761833670097,
            "unit": "iter/sec",
            "range": "stddev: 0.004645200425641829",
            "extra": "mean: 1.4896998058000008 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.30143643935086534,
            "unit": "iter/sec",
            "range": "stddev: 0.003950097703767154",
            "extra": "mean: 3.3174489525999946 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.17102284162773324,
            "unit": "iter/sec",
            "range": "stddev: 0.0026553789026872794",
            "extra": "mean: 5.847172170000005 sec\nrounds: 5"
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
          "id": "eb2bfe659574236e892a3f152a05cb6366fa2e2f",
          "message": "Arrange benchmark subplots in 2x2 grid (VIE-1 variants in left column)\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:44:42-05:00",
          "tree_id": "6bb31f5a20fe29f8fbb14629166cd4c688e377a4",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/eb2bfe659574236e892a3f152a05cb6366fa2e2f"
        },
        "date": 1772733232955,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 48.26413217488032,
            "unit": "iter/sec",
            "range": "stddev: 0.0026596052218740562",
            "extra": "mean: 20.71932001960791 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.741765222620394,
            "unit": "iter/sec",
            "range": "stddev: 0.00036861073286547307",
            "extra": "mean: 78.48206135714264 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2545010599083573,
            "unit": "iter/sec",
            "range": "stddev: 0.000571743221881584",
            "extra": "mean: 307.2667611999975 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.432746016956838,
            "unit": "iter/sec",
            "range": "stddev: 0.0019468008929438277",
            "extra": "mean: 697.9604117999969 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8110176889292005,
            "unit": "iter/sec",
            "range": "stddev: 0.005967950091509516",
            "extra": "mean: 1.2330187289999999 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 229.1775393278374,
            "unit": "iter/sec",
            "range": "stddev: 0.00011185109190031555",
            "extra": "mean: 4.363429343612529 msec\nrounds: 227"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 60.5430539292085,
            "unit": "iter/sec",
            "range": "stddev: 0.00006429087273484507",
            "extra": "mean: 16.517171419355147 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.701961200076653,
            "unit": "iter/sec",
            "range": "stddev: 0.003966363693092614",
            "extra": "mean: 63.68631200000152 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.162866245174359,
            "unit": "iter/sec",
            "range": "stddev: 0.0005695258984747283",
            "extra": "mean: 139.608917124999 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.052855328984325,
            "unit": "iter/sec",
            "range": "stddev: 0.0013015676823035247",
            "extra": "mean: 246.73962400000278 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 166.32654591373208,
            "unit": "iter/sec",
            "range": "stddev: 0.00004120317821235595",
            "extra": "mean: 6.012269385541536 msec\nrounds: 166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.17502321269523,
            "unit": "iter/sec",
            "range": "stddev: 0.0000987496411861226",
            "extra": "mean: 19.540782538461563 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.51449063655521,
            "unit": "iter/sec",
            "range": "stddev: 0.0001609291606852141",
            "extra": "mean: 68.89666506666572 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.682721650852949,
            "unit": "iter/sec",
            "range": "stddev: 0.000198182174865176",
            "extra": "mean: 149.63963071428614 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.8510236729511758,
            "unit": "iter/sec",
            "range": "stddev: 0.0005826687270019452",
            "extra": "mean: 259.6712159999953 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.447487415918216,
            "unit": "iter/sec",
            "range": "stddev: 0.0006748126414915295",
            "extra": "mean: 64.7354468125041 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.941542252154863,
            "unit": "iter/sec",
            "range": "stddev: 0.0012760737584071515",
            "extra": "mean: 253.70779659999698 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9890279709473,
            "unit": "iter/sec",
            "range": "stddev: 0.0009230898927239455",
            "extra": "mean: 1.0110937500000035 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4402745031855292,
            "unit": "iter/sec",
            "range": "stddev: 0.009946951593806687",
            "extra": "mean: 2.271310268399998 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2483198998022766,
            "unit": "iter/sec",
            "range": "stddev: 0.008515303112279915",
            "extra": "mean: 4.027063480600003 sec\nrounds: 5"
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
          "id": "a705e8e3477cb80b1492427d586ba0b5b713b7ba",
          "message": "Rename force_continuous subplot title to \"VIE-1 (continuous)\"\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:46:25-05:00",
          "tree_id": "88bd73f0e74fe33bac2dd38a619344733073fdc1",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/a705e8e3477cb80b1492427d586ba0b5b713b7ba"
        },
        "date": 1772733379350,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.53233888689859,
            "unit": "iter/sec",
            "range": "stddev: 0.00009619105712221912",
            "extra": "mean: 20.188830619999294 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.642962474225806,
            "unit": "iter/sec",
            "range": "stddev: 0.0007782834908331254",
            "extra": "mean: 79.0953862307683 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2232999428727096,
            "unit": "iter/sec",
            "range": "stddev: 0.00036914692275967715",
            "extra": "mean: 310.2410627999973 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4350064670216616,
            "unit": "iter/sec",
            "range": "stddev: 0.0008770353978433071",
            "extra": "mean: 696.8609710000038 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.813212399250997,
            "unit": "iter/sec",
            "range": "stddev: 0.0020988449407326457",
            "extra": "mean: 1.2296910388000015 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 226.5032704957841,
            "unit": "iter/sec",
            "range": "stddev: 0.00004710730007885961",
            "extra": "mean: 4.414947288889644 msec\nrounds: 225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 60.56822222260281,
            "unit": "iter/sec",
            "range": "stddev: 0.00010750616527042413",
            "extra": "mean: 16.51030793548404 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.785384267520959,
            "unit": "iter/sec",
            "range": "stddev: 0.00039786118766907424",
            "extra": "mean: 63.34974068750032 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.124156892542947,
            "unit": "iter/sec",
            "range": "stddev: 0.0013074544853705684",
            "extra": "mean: 140.36748700000246 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.0398509611397175,
            "unit": "iter/sec",
            "range": "stddev: 0.0014420430221996521",
            "extra": "mean: 247.53388419999567 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 165.90323196289592,
            "unit": "iter/sec",
            "range": "stddev: 0.00004624618480061775",
            "extra": "mean: 6.027610120480648 msec\nrounds: 166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 50.38207654681079,
            "unit": "iter/sec",
            "range": "stddev: 0.0003152395146710061",
            "extra": "mean: 19.848328384616785 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.312130757939793,
            "unit": "iter/sec",
            "range": "stddev: 0.00019683534904331798",
            "extra": "mean: 69.87079819999829 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.653561014465156,
            "unit": "iter/sec",
            "range": "stddev: 0.00029399454703550864",
            "extra": "mean: 150.2954580000022 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.8414056176415756,
            "unit": "iter/sec",
            "range": "stddev: 0.00047641663095767523",
            "extra": "mean: 260.3213770000025 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.606064463980806,
            "unit": "iter/sec",
            "range": "stddev: 0.00008436835816053776",
            "extra": "mean: 64.07765406249766 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.8987369511418306,
            "unit": "iter/sec",
            "range": "stddev: 0.008041914352921826",
            "extra": "mean: 256.4933240000016 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9931490224680621,
            "unit": "iter/sec",
            "range": "stddev: 0.005908131074302546",
            "extra": "mean: 1.006898237200005 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.44342374604575785,
            "unit": "iter/sec",
            "range": "stddev: 0.01444251297159262",
            "extra": "mean: 2.255179179999999 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24908599557817016,
            "unit": "iter/sec",
            "range": "stddev: 0.020986443479620663",
            "extra": "mean: 4.0146777328000045 sec\nrounds: 5"
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
          "id": "cf3e5131c2a0bdd17ab58b9ce278921acb088b35",
          "message": "Combine three benchmark charts into one vertically stacked PNG\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:31:06-05:00",
          "tree_id": "4a51536cc70ffc6e008247fe0f6f2220a7623b55",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/cf3e5131c2a0bdd17ab58b9ce278921acb088b35"
        },
        "date": 1772733434739,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.64757990800728,
            "unit": "iter/sec",
            "range": "stddev: 0.00009762378913426517",
            "extra": "mean: 19.74428001922955 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 13.014184297974332,
            "unit": "iter/sec",
            "range": "stddev: 0.0003345156787919844",
            "extra": "mean: 76.83923764285794 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.283541286405915,
            "unit": "iter/sec",
            "range": "stddev: 0.0011009068100103461",
            "extra": "mean: 304.54923899999926 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4670740484048113,
            "unit": "iter/sec",
            "range": "stddev: 0.0012699231509606687",
            "extra": "mean: 681.6288524000043 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8256930239014092,
            "unit": "iter/sec",
            "range": "stddev: 0.011758100972545454",
            "extra": "mean: 1.2111038498 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 228.72873142895193,
            "unit": "iter/sec",
            "range": "stddev: 0.0002489097897883191",
            "extra": "mean: 4.371991195651875 msec\nrounds: 230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.89798279838379,
            "unit": "iter/sec",
            "range": "stddev: 0.00006398746918935639",
            "extra": "mean: 16.155615333333785 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.180432456702757,
            "unit": "iter/sec",
            "range": "stddev: 0.000129983101902703",
            "extra": "mean: 61.80304529411691 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.306219554378066,
            "unit": "iter/sec",
            "range": "stddev: 0.0005693593905644127",
            "extra": "mean: 136.86968925000008 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.1668199495137617,
            "unit": "iter/sec",
            "range": "stddev: 0.002565172726440406",
            "extra": "mean: 315.77418859999966 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.624444828686833,
            "unit": "iter/sec",
            "range": "stddev: 0.0003090422302377684",
            "extra": "mean: 64.00227406249837 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9891987688209767,
            "unit": "iter/sec",
            "range": "stddev: 0.0003918840876560444",
            "extra": "mean: 250.67690479999672 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1.001516689463289,
            "unit": "iter/sec",
            "range": "stddev: 0.0031254807304815775",
            "extra": "mean: 998.4856074000106 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.44575961778116957,
            "unit": "iter/sec",
            "range": "stddev: 0.007253555796874766",
            "extra": "mean: 2.2433615789999974 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24972128330379822,
            "unit": "iter/sec",
            "range": "stddev: 0.01826982506076461",
            "extra": "mean: 4.004464444400003 sec\nrounds: 5"
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
          "id": "02ad90a271caea2260669ee6f2ebe08ebc5cb884",
          "message": "Add fourth benchmark subplot: VIE-1 with force_continuous=True\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:43:59-05:00",
          "tree_id": "688ab6576952bd78c9e0babe9a843fe0b077a580",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/02ad90a271caea2260669ee6f2ebe08ebc5cb884"
        },
        "date": 1772733488627,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.045480351256735,
            "unit": "iter/sec",
            "range": "stddev: 0.000609491795706475",
            "extra": "mean: 19.981824392157886 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.890494559991861,
            "unit": "iter/sec",
            "range": "stddev: 0.00040964647374993116",
            "extra": "mean: 77.57654257143035 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2543247862725346,
            "unit": "iter/sec",
            "range": "stddev: 0.0010728647566290803",
            "extra": "mean: 307.28340460000254 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4409897315083264,
            "unit": "iter/sec",
            "range": "stddev: 0.011536715856053686",
            "extra": "mean: 693.9674711999999 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8196551544768554,
            "unit": "iter/sec",
            "range": "stddev: 0.003248698908916013",
            "extra": "mean: 1.2200252686 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 223.95522859949037,
            "unit": "iter/sec",
            "range": "stddev: 0.0004693172481352111",
            "extra": "mean: 4.4651781798242665 msec\nrounds: 228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.29415146277623,
            "unit": "iter/sec",
            "range": "stddev: 0.00009724429568684964",
            "extra": "mean: 16.314770269840466 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.067809240011922,
            "unit": "iter/sec",
            "range": "stddev: 0.00013164264426456751",
            "extra": "mean: 62.23623800000118 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.236986834287145,
            "unit": "iter/sec",
            "range": "stddev: 0.0006655655094559492",
            "extra": "mean: 138.17905475000103 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.1425746069036915,
            "unit": "iter/sec",
            "range": "stddev: 0.0018667113662140307",
            "extra": "mean: 318.21042459999944 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 167.67505279004763,
            "unit": "iter/sec",
            "range": "stddev: 0.000044729443894521534",
            "extra": "mean: 5.963916416666578 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.094159263450145,
            "unit": "iter/sec",
            "range": "stddev: 0.00006617604494479661",
            "extra": "mean: 19.571708673076124 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.4418664161728,
            "unit": "iter/sec",
            "range": "stddev: 0.00020000550117255773",
            "extra": "mean: 69.24312766666674 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.707258696065562,
            "unit": "iter/sec",
            "range": "stddev: 0.0005241217342103141",
            "extra": "mean: 149.09220671428614 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.89728582243222,
            "unit": "iter/sec",
            "range": "stddev: 0.000823572087728421",
            "extra": "mean: 256.5888276000038 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.454882269995208,
            "unit": "iter/sec",
            "range": "stddev: 0.0005952571205726862",
            "extra": "mean: 64.70447218750053 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9439781006735046,
            "unit": "iter/sec",
            "range": "stddev: 0.002653262568243942",
            "extra": "mean: 253.55110360000026 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9900584308368129,
            "unit": "iter/sec",
            "range": "stddev: 0.0037900002816235604",
            "extra": "mean: 1.0100413963999926 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4420733197495016,
            "unit": "iter/sec",
            "range": "stddev: 0.003975895366871407",
            "extra": "mean: 2.262068203000001 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24978174393433447,
            "unit": "iter/sec",
            "range": "stddev: 0.016597098177961574",
            "extra": "mean: 4.003495148400003 sec\nrounds: 5"
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
          "id": "9c9a445a6bbbbbf9f2f66ac969f7767ca20fec83",
          "message": "Benchmark chart: shared y-axis label, n= annotations on bars\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:32:58-05:00",
          "tree_id": "db520c86cffd09d0b88999ee3ce9d986af3523d8",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/9c9a445a6bbbbbf9f2f66ac969f7767ca20fec83"
        },
        "date": 1772733575932,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.85116466189199,
            "unit": "iter/sec",
            "range": "stddev: 0.00015391192928416463",
            "extra": "mean: 20.05971188000018 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.490047509806185,
            "unit": "iter/sec",
            "range": "stddev: 0.004456141870030896",
            "extra": "mean: 80.06374669230681 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.257377819064237,
            "unit": "iter/sec",
            "range": "stddev: 0.0016811035714902902",
            "extra": "mean: 306.9953980000008 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4420309607427448,
            "unit": "iter/sec",
            "range": "stddev: 0.003101251892659236",
            "extra": "mean: 693.4663867999973 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8076971628282998,
            "unit": "iter/sec",
            "range": "stddev: 0.007670556230928246",
            "extra": "mean: 1.2380877957999956 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 226.842656052019,
            "unit": "iter/sec",
            "range": "stddev: 0.00003198355249539288",
            "extra": "mean: 4.40834196444377 msec\nrounds: 225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 60.69964613240299,
            "unit": "iter/sec",
            "range": "stddev: 0.000055433260358796645",
            "extra": "mean: 16.474560622951884 msec\nrounds: 61"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.80883033910624,
            "unit": "iter/sec",
            "range": "stddev: 0.00021398264262089962",
            "extra": "mean: 63.25578670588324 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.52676348204081,
            "unit": "iter/sec",
            "range": "stddev: 0.0011637061566379336",
            "extra": "mean: 180.9377229999972 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.989503011173222,
            "unit": "iter/sec",
            "range": "stddev: 0.0010137670157258894",
            "extra": "mean: 250.6577879999952 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.790869794486229,
            "unit": "iter/sec",
            "range": "stddev: 0.0002628687219616129",
            "extra": "mean: 63.327733875000014 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9678996442630616,
            "unit": "iter/sec",
            "range": "stddev: 0.0003066680329236955",
            "extra": "mean: 252.02250300000344 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1.0028969076330005,
            "unit": "iter/sec",
            "range": "stddev: 0.0024049330079601314",
            "extra": "mean: 997.1114601999943 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.44699344546664366,
            "unit": "iter/sec",
            "range": "stddev: 0.006091825377809859",
            "extra": "mean: 2.237169269800006 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2509841301455989,
            "unit": "iter/sec",
            "range": "stddev: 0.009352458710492213",
            "extra": "mean: 3.9843156594000106 sec\nrounds: 5"
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
          "id": "32e3e7d6e2d026c903cd69a97351953a856f471e",
          "message": "Increase n= label size and padding above bars\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:33:52-05:00",
          "tree_id": "d413374bab1080141077c1a1438ba36989306934",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/32e3e7d6e2d026c903cd69a97351953a856f471e"
        },
        "date": 1772733597452,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.806988349390345,
            "unit": "iter/sec",
            "range": "stddev: 0.0004743853487702709",
            "extra": "mean: 20.077503843137713 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.848143223142092,
            "unit": "iter/sec",
            "range": "stddev: 0.0018404311701943805",
            "extra": "mean: 77.83225814285747 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2399200491927793,
            "unit": "iter/sec",
            "range": "stddev: 0.0048631154367236844",
            "extra": "mean: 308.649591599999 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4517619663043666,
            "unit": "iter/sec",
            "range": "stddev: 0.006938386822535506",
            "extra": "mean: 688.8181555999978 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8203738003556597,
            "unit": "iter/sec",
            "range": "stddev: 0.004529008428247884",
            "extra": "mean: 1.218956528800001 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 231.78527373035428,
            "unit": "iter/sec",
            "range": "stddev: 0.000027992901478410846",
            "extra": "mean: 4.3143379383253775 msec\nrounds: 227"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.275398377135296,
            "unit": "iter/sec",
            "range": "stddev: 0.0011425914042473108",
            "extra": "mean: 16.319763338709627 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.184307426098375,
            "unit": "iter/sec",
            "range": "stddev: 0.000214713689942138",
            "extra": "mean: 61.78824794117708 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.304821544081795,
            "unit": "iter/sec",
            "range": "stddev: 0.00044699768817290243",
            "extra": "mean: 136.89588362499805 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.197287550157099,
            "unit": "iter/sec",
            "range": "stddev: 0.0011801411453033251",
            "extra": "mean: 312.7651123999982 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.666229645766835,
            "unit": "iter/sec",
            "range": "stddev: 0.0000916612913802801",
            "extra": "mean: 63.83156781250232 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9889830956477876,
            "unit": "iter/sec",
            "range": "stddev: 0.00040940313475121916",
            "extra": "mean: 250.69045820000042 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.995389020619615,
            "unit": "iter/sec",
            "range": "stddev: 0.0030298130458109563",
            "extra": "mean: 1.004632338999997 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.44398345070512407,
            "unit": "iter/sec",
            "range": "stddev: 0.005596388831700973",
            "extra": "mean: 2.2523362039999997 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.25152296774655647,
            "unit": "iter/sec",
            "range": "stddev: 0.01698051329252052",
            "extra": "mean: 3.975780060799997 sec\nrounds: 5"
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
          "id": "0d7744071aa1d545b4865be9e8cd7b96d150c1ef",
          "message": "Extend y-axis top so n= labels are fully inside each subplot\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T12:35:35-05:00",
          "tree_id": "5eb12e850d4fdbb1e61c0bcda030b78c2d26d2a9",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/0d7744071aa1d545b4865be9e8cd7b96d150c1ef"
        },
        "date": 1772733731842,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.99640925788982,
            "unit": "iter/sec",
            "range": "stddev: 0.00013459672784743256",
            "extra": "mean: 20.00143639999891 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.852775378139567,
            "unit": "iter/sec",
            "range": "stddev: 0.00039959422902277185",
            "extra": "mean: 77.80420730769431 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2221484005826757,
            "unit": "iter/sec",
            "range": "stddev: 0.0012633081573694609",
            "extra": "mean: 310.3519377999987 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4488898954513725,
            "unit": "iter/sec",
            "range": "stddev: 0.003767278790007915",
            "extra": "mean: 690.1835696000006 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.81360846610339,
            "unit": "iter/sec",
            "range": "stddev: 0.013597025678887063",
            "extra": "mean: 1.2290924218000014 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 227.90268520067417,
            "unit": "iter/sec",
            "range": "stddev: 0.00014533651166155365",
            "extra": "mean: 4.387837726086792 msec\nrounds: 230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.4181345430755,
            "unit": "iter/sec",
            "range": "stddev: 0.00011238724836513633",
            "extra": "mean: 16.281836096774505 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.9286459924372,
            "unit": "iter/sec",
            "range": "stddev: 0.0004571095365713265",
            "extra": "mean: 62.7799751764709 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.234000288929704,
            "unit": "iter/sec",
            "range": "stddev: 0.00035195121020844975",
            "extra": "mean: 138.23610174999777 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.04638008110688,
            "unit": "iter/sec",
            "range": "stddev: 0.0012013969273697404",
            "extra": "mean: 247.13447079999753 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.522079879229922,
            "unit": "iter/sec",
            "range": "stddev: 0.000344818418848607",
            "extra": "mean: 64.42435600000351 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9309128667123834,
            "unit": "iter/sec",
            "range": "stddev: 0.0005985660331509465",
            "extra": "mean: 254.39383520000263 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9876080449423066,
            "unit": "iter/sec",
            "range": "stddev: 0.010851777889081928",
            "extra": "mean: 1.0125474424000032 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.42652438355542827,
            "unit": "iter/sec",
            "range": "stddev: 0.06175091271043265",
            "extra": "mean: 2.344531845199998 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24357200139358717,
            "unit": "iter/sec",
            "range": "stddev: 0.03960991647455378",
            "extra": "mean: 4.105562192200011 sec\nrounds: 5"
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
          "id": "32e4caa098fc49f390dae357e902b6a4348d46d8",
          "message": "Raise max_coll_divs to 5 and max_coll_params to 6\n\nExpands supported collocation settings from 49 to 119 combinations,\nenabling higher-order quadrature (up to 6 nodes) and a fifth subdivision\nlevel. Library grows from 18 MB to 34 MB; compile time from ~4 s to ~10 s.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T13:24:42-05:00",
          "tree_id": "33a4094cce6da9494989d64fc7ecd56751ca26d1",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/32e4caa098fc49f390dae357e902b6a4348d46d8"
        },
        "date": 1772735499919,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 51.30658114064759,
            "unit": "iter/sec",
            "range": "stddev: 0.00006341902104253478",
            "extra": "mean: 19.49067698076945 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 13.149939122545144,
            "unit": "iter/sec",
            "range": "stddev: 0.00009042435500793692",
            "extra": "mean: 76.0459794285688 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.3284862762303615,
            "unit": "iter/sec",
            "range": "stddev: 0.0009314457857948225",
            "extra": "mean: 300.4368704000001 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4873157491906903,
            "unit": "iter/sec",
            "range": "stddev: 0.0019726250430836113",
            "extra": "mean: 672.3521892000008 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8320119072006288,
            "unit": "iter/sec",
            "range": "stddev: 0.00936983284639448",
            "extra": "mean: 1.2019058758 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 235.21514482968794,
            "unit": "iter/sec",
            "range": "stddev: 0.00008972601799282334",
            "extra": "mean: 4.251426925439131 msec\nrounds: 228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.02352282395699,
            "unit": "iter/sec",
            "range": "stddev: 0.00013022542926898847",
            "extra": "mean: 16.38712341935484 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.633186003780107,
            "unit": "iter/sec",
            "range": "stddev: 0.0011793322351462369",
            "extra": "mean: 60.120772999997534 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.918120810103697,
            "unit": "iter/sec",
            "range": "stddev: 0.0007667490154215054",
            "extra": "mean: 168.97255599999792 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.245529817123481,
            "unit": "iter/sec",
            "range": "stddev: 0.0003974660527127081",
            "extra": "mean: 235.54186240000092 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 170.10217766040333,
            "unit": "iter/sec",
            "range": "stddev: 0.00011913443308583488",
            "extra": "mean: 5.878819505746879 msec\nrounds: 174"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 49.17697082948122,
            "unit": "iter/sec",
            "range": "stddev: 0.00038008393021344243",
            "extra": "mean: 20.33472137735876 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.98103132711721,
            "unit": "iter/sec",
            "range": "stddev: 0.0003368084592345223",
            "extra": "mean: 66.75107862500073 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.9660766902925815,
            "unit": "iter/sec",
            "range": "stddev: 0.000644718113076794",
            "extra": "mean: 143.55282671428628 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 4.009083184126982,
            "unit": "iter/sec",
            "range": "stddev: 0.0016029740849632886",
            "extra": "mean: 249.4335872000022 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 16.200341195386173,
            "unit": "iter/sec",
            "range": "stddev: 0.0002270433413730519",
            "extra": "mean: 61.727094999999025 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4.100611498194841,
            "unit": "iter/sec",
            "range": "stddev: 0.0011967592114963332",
            "extra": "mean: 243.86606740000047 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1.0327398345840508,
            "unit": "iter/sec",
            "range": "stddev: 0.0015784244450667401",
            "extra": "mean: 968.298081000006 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4606019611525784,
            "unit": "iter/sec",
            "range": "stddev: 0.008022883892087147",
            "extra": "mean: 2.1710719543999972 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.25775319483602943,
            "unit": "iter/sec",
            "range": "stddev: 0.020557428340925728",
            "extra": "mean: 3.8796803299999967 sec\nrounds: 5"
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
          "id": "d899f6637333ee71f1960daa1959de55ce5ffbfe",
          "message": "Fix four CI failures\n\n- pyproject.toml: restore scipy dependency (Numba linalg requires it at runtime)\n- volterra_solvers.d: use `export extern(C):` so symbols are visible in Windows DLL\n- tests.yml test-dlang: upgrade ldc2 1.30.0 → 1.40.1 (fixes meson \"Unknown compiler\" error)\n- tests.yml test-dlang-macos: use `brew install meson ninja` (avoids PEP 668 error)\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T13:16:14-05:00",
          "tree_id": "1223b9bb27761b01d11ef2e2b0eebbee2551bb2c",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/d899f6637333ee71f1960daa1959de55ce5ffbfe"
        },
        "date": 1772735797480,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.679759465195055,
            "unit": "iter/sec",
            "range": "stddev: 0.0000896275144475532",
            "extra": "mean: 19.73174321568677 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.828711708363212,
            "unit": "iter/sec",
            "range": "stddev: 0.0005668606878509214",
            "extra": "mean: 77.95014984615224 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.263158873340957,
            "unit": "iter/sec",
            "range": "stddev: 0.0024324683830654666",
            "extra": "mean: 306.4515210000053 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4598824872088412,
            "unit": "iter/sec",
            "range": "stddev: 0.001998495296160217",
            "extra": "mean: 684.9866401999975 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8206052110648157,
            "unit": "iter/sec",
            "range": "stddev: 0.006681767372861482",
            "extra": "mean: 1.2186127830000033 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 230.63809895817357,
            "unit": "iter/sec",
            "range": "stddev: 0.000030835437034061425",
            "extra": "mean: 4.335797097344923 msec\nrounds: 226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.23149541687072,
            "unit": "iter/sec",
            "range": "stddev: 0.00013058734418696977",
            "extra": "mean: 16.331464603173426 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.787630649710803,
            "unit": "iter/sec",
            "range": "stddev: 0.00033254720449623623",
            "extra": "mean: 63.340726812501025 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.242915255753969,
            "unit": "iter/sec",
            "range": "stddev: 0.0007398427531482513",
            "extra": "mean: 138.06595337499948 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.087270169753361,
            "unit": "iter/sec",
            "range": "stddev: 0.001035435757971046",
            "extra": "mean: 244.66207479999866 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 168.9520641419754,
            "unit": "iter/sec",
            "range": "stddev: 0.00007085178835136179",
            "extra": "mean: 5.918838607142855 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.195033407564615,
            "unit": "iter/sec",
            "range": "stddev: 0.00009482822765996082",
            "extra": "mean: 19.533144788459875 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.60143003543928,
            "unit": "iter/sec",
            "range": "stddev: 0.0009470697671221362",
            "extra": "mean: 68.48644259999806 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.759366948939006,
            "unit": "iter/sec",
            "range": "stddev: 0.00045447311387356953",
            "extra": "mean: 147.9428484285746 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.885326041023907,
            "unit": "iter/sec",
            "range": "stddev: 0.0022517044752593533",
            "extra": "mean: 257.37865740000245 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.703221919549293,
            "unit": "iter/sec",
            "range": "stddev: 0.00032810935832523357",
            "extra": "mean: 63.68119900000124 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.981316069079215,
            "unit": "iter/sec",
            "range": "stddev: 0.001807183883885775",
            "extra": "mean: 251.1732257999995 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9942492721523658,
            "unit": "iter/sec",
            "range": "stddev: 0.0006190841046003943",
            "extra": "mean: 1.0057839899999976 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4444274879358418,
            "unit": "iter/sec",
            "range": "stddev: 0.0035828750112042408",
            "extra": "mean: 2.250085845599995 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24953852995616788,
            "unit": "iter/sec",
            "range": "stddev: 0.016211935860271278",
            "extra": "mean: 4.0073971749999995 sec\nrounds: 5"
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
          "id": "40bdd6b4bd25317cd71ee94b3773154f5f50f624",
          "message": "Skip CI for docs-only changes (md, docs/, notebooks/)\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T13:35:36-05:00",
          "tree_id": "954450aca6f1b9a5e9fa9e66799cdb2c7eb2fed0",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/40bdd6b4bd25317cd71ee94b3773154f5f50f624"
        },
        "date": 1772735909221,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.51627867759596,
            "unit": "iter/sec",
            "range": "stddev: 0.00016387088731473836",
            "extra": "mean: 20.195378705881183 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.591420346424949,
            "unit": "iter/sec",
            "range": "stddev: 0.0011502036032242573",
            "extra": "mean: 79.41915784615415 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.1986740375299365,
            "unit": "iter/sec",
            "range": "stddev: 0.004946157114109303",
            "extra": "mean: 312.629542199997 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4274176941579502,
            "unit": "iter/sec",
            "range": "stddev: 0.023705266783940453",
            "extra": "mean: 700.5657867999957 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8140026826620831,
            "unit": "iter/sec",
            "range": "stddev: 0.009784450165031268",
            "extra": "mean: 1.2284971797999957 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 229.4720838669341,
            "unit": "iter/sec",
            "range": "stddev: 0.00003501498412561968",
            "extra": "mean: 4.357828556522276 msec\nrounds: 230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.12525914526096,
            "unit": "iter/sec",
            "range": "stddev: 0.0004995845211105495",
            "extra": "mean: 16.359848841271212 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.05386548575894,
            "unit": "iter/sec",
            "range": "stddev: 0.0004152434130893473",
            "extra": "mean: 62.29029394117447 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.67772051285633,
            "unit": "iter/sec",
            "range": "stddev: 0.0007813683118009518",
            "extra": "mean: 176.12702100000396 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.1867626874805324,
            "unit": "iter/sec",
            "range": "stddev: 0.0011956130944976756",
            "extra": "mean: 313.7980760000062 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 164.0318519940662,
            "unit": "iter/sec",
            "range": "stddev: 0.0000612343449950706",
            "extra": "mean: 6.096376940474798 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 50.60715664046606,
            "unit": "iter/sec",
            "range": "stddev: 0.00008041165064663017",
            "extra": "mean: 19.76005107547158 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.528288539589479,
            "unit": "iter/sec",
            "range": "stddev: 0.00035022829710302345",
            "extra": "mean: 68.83123206666824 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.754491889565214,
            "unit": "iter/sec",
            "range": "stddev: 0.0015010181476855194",
            "extra": "mean: 148.0496262857116 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.900470715202726,
            "unit": "iter/sec",
            "range": "stddev: 0.0014084090768702734",
            "extra": "mean: 256.37931239999716 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.632467890451847,
            "unit": "iter/sec",
            "range": "stddev: 0.0001241722518137826",
            "extra": "mean: 63.9694261333356 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.952083088733941,
            "unit": "iter/sec",
            "range": "stddev: 0.00015866915642653382",
            "extra": "mean: 253.0311174000019 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9942373810500764,
            "unit": "iter/sec",
            "range": "stddev: 0.002972719889071197",
            "extra": "mean: 1.0057960191999995 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.43893874146764855,
            "unit": "iter/sec",
            "range": "stddev: 0.0134675724926253",
            "extra": "mean: 2.278222233600002 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2485633092303375,
            "unit": "iter/sec",
            "range": "stddev: 0.010013938579774692",
            "extra": "mean: 4.023119916999997 sec\nrounds: 5"
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
          "id": "27ac6d0551eb65c38eb25f93b5ed45574d2beb95",
          "message": "Add PyPI metadata: keywords, classifiers, and project URLs\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T13:40:08-05:00",
          "tree_id": "c5c3059ccdbba9bfa118630a886b8956131b5619",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/27ac6d0551eb65c38eb25f93b5ed45574d2beb95"
        },
        "date": 1772736434687,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.92800753325683,
            "unit": "iter/sec",
            "range": "stddev: 0.00009622166118236226",
            "extra": "mean: 20.02883850980643 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.85560523775653,
            "unit": "iter/sec",
            "range": "stddev: 0.0002597575907667209",
            "extra": "mean: 77.78708053845881 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2440159713546874,
            "unit": "iter/sec",
            "range": "stddev: 0.0014576555887687685",
            "extra": "mean: 308.2598879999978 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4514263336542603,
            "unit": "iter/sec",
            "range": "stddev: 0.0033855416934924056",
            "extra": "mean: 688.9774402000114 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8146984140245563,
            "unit": "iter/sec",
            "range": "stddev: 0.0050757883655083635",
            "extra": "mean: 1.2274480750000065 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 229.86679688894273,
            "unit": "iter/sec",
            "range": "stddev: 0.0000324366203298653",
            "extra": "mean: 4.350345563318297 msec\nrounds: 229"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.34782258608651,
            "unit": "iter/sec",
            "range": "stddev: 0.00010320634814172031",
            "extra": "mean: 16.300497032258107 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.031560628020106,
            "unit": "iter/sec",
            "range": "stddev: 0.0001811989041469408",
            "extra": "mean: 62.376958999998486 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.239722850522415,
            "unit": "iter/sec",
            "range": "stddev: 0.0001129308418934639",
            "extra": "mean: 138.12683450000307 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.083388783575292,
            "unit": "iter/sec",
            "range": "stddev: 0.001981077305208346",
            "extra": "mean: 244.8946335999949 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 168.26836576708655,
            "unit": "iter/sec",
            "range": "stddev: 0.00004971623721353689",
            "extra": "mean: 5.942887692771548 msec\nrounds: 166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.29024841469345,
            "unit": "iter/sec",
            "range": "stddev: 0.00008671038530476263",
            "extra": "mean: 19.49688353846076 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.537044317314269,
            "unit": "iter/sec",
            "range": "stddev: 0.00027270523083572693",
            "extra": "mean: 68.78977446666758 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.737719486434215,
            "unit": "iter/sec",
            "range": "stddev: 0.0002539937479206386",
            "extra": "mean: 148.4181705714239 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.890854666256535,
            "unit": "iter/sec",
            "range": "stddev: 0.001211684584544758",
            "extra": "mean: 257.0129408000014 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.123123992419591,
            "unit": "iter/sec",
            "range": "stddev: 0.0002878687371966458",
            "extra": "mean: 66.12390406249702 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.8378645635234703,
            "unit": "iter/sec",
            "range": "stddev: 0.00038747056366575757",
            "extra": "mean: 260.56156579999765 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.966767944535345,
            "unit": "iter/sec",
            "range": "stddev: 0.005171288269627898",
            "extra": "mean: 1.0343743870000026 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.43118663123615003,
            "unit": "iter/sec",
            "range": "stddev: 0.005003853818491812",
            "extra": "mean: 2.3191813649999857 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2421624273154112,
            "unit": "iter/sec",
            "range": "stddev: 0.014033971796435587",
            "extra": "mean: 4.12945976420001 sec\nrounds: 5"
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
          "id": "22a4a5d8d825e0f1d941a56f7f3f331e657753e3",
          "message": "Remove requirements.txt (redundant with pyproject.toml)\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T13:50:02-05:00",
          "tree_id": "8e1f167ebf1de127fbfd5754637c5801e066de73",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/22a4a5d8d825e0f1d941a56f7f3f331e657753e3"
        },
        "date": 1772736785168,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.02278485602605,
            "unit": "iter/sec",
            "range": "stddev: 0.00012380211429882342",
            "extra": "mean: 20.39867794000031 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.526268391798785,
            "unit": "iter/sec",
            "range": "stddev: 0.00026223954076982534",
            "extra": "mean: 79.8322348461511 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.1735110253920307,
            "unit": "iter/sec",
            "range": "stddev: 0.0008679568639676768",
            "extra": "mean: 315.1084057999981 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.403271826379969,
            "unit": "iter/sec",
            "range": "stddev: 0.009541551068621165",
            "extra": "mean: 712.620307200001 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.7987282108847055,
            "unit": "iter/sec",
            "range": "stddev: 0.010617997827002642",
            "extra": "mean: 1.2519903345999979 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 224.04324004515306,
            "unit": "iter/sec",
            "range": "stddev: 0.00004473324963222977",
            "extra": "mean: 4.463424113124158 msec\nrounds: 221"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 60.046470632990754,
            "unit": "iter/sec",
            "range": "stddev: 0.00009740863396713996",
            "extra": "mean: 16.653768147541708 msec\nrounds: 61"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.676697169792737,
            "unit": "iter/sec",
            "range": "stddev: 0.00015799871287773413",
            "extra": "mean: 63.78894668750057 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.475626542064851,
            "unit": "iter/sec",
            "range": "stddev: 0.0009548596616642729",
            "extra": "mean: 182.62750249999726 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.113160582205394,
            "unit": "iter/sec",
            "range": "stddev: 0.0005754440423200358",
            "extra": "mean: 321.2169670000094 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 164.5269061368611,
            "unit": "iter/sec",
            "range": "stddev: 0.00004207944420300846",
            "extra": "mean: 6.078033213413456 msec\nrounds: 164"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 49.97094317031006,
            "unit": "iter/sec",
            "range": "stddev: 0.00008689667927197056",
            "extra": "mean: 20.0116294901983 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.190870253103258,
            "unit": "iter/sec",
            "range": "stddev: 0.00012946892560558593",
            "extra": "mean: 70.46784179999956 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.614337318076517,
            "unit": "iter/sec",
            "range": "stddev: 0.0002475158121921763",
            "extra": "mean: 151.18672542857325 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.7890660716387807,
            "unit": "iter/sec",
            "range": "stddev: 0.0008966751306789668",
            "extra": "mean: 263.9172770000016 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.19776505922372,
            "unit": "iter/sec",
            "range": "stddev: 0.00022657824553041995",
            "extra": "mean: 65.79914850000179 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.8688958468693846,
            "unit": "iter/sec",
            "range": "stddev: 0.0011356986456089314",
            "extra": "mean: 258.47167759999934 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9701068732225863,
            "unit": "iter/sec",
            "range": "stddev: 0.005170398500120832",
            "extra": "mean: 1.0308142613999962 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.43231608139673,
            "unit": "iter/sec",
            "range": "stddev: 0.009342160357325926",
            "extra": "mean: 2.313122372799995 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24477343761288672,
            "unit": "iter/sec",
            "range": "stddev: 0.006641992917267456",
            "extra": "mean: 4.085410613800002 sec\nrounds: 5"
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
          "id": "cf1e2297fa45c009648bab8ee2041bafa557d3e7",
          "message": "Gitignore scratch.ipynb\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T13:51:20-05:00",
          "tree_id": "09902ab361e59e5b201ce6c5eb816f2dfc6f2118",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/cf1e2297fa45c009648bab8ee2041bafa557d3e7"
        },
        "date": 1772736850779,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.333484265428254,
            "unit": "iter/sec",
            "range": "stddev: 0.0010088330847707484",
            "extra": "mean: 20.270208254898723 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.704656463770213,
            "unit": "iter/sec",
            "range": "stddev: 0.0011287589414451513",
            "extra": "mean: 78.71129792857394 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.3002365851160507,
            "unit": "iter/sec",
            "range": "stddev: 0.0013706332883668755",
            "extra": "mean: 303.0085796000094 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4698846088812791,
            "unit": "iter/sec",
            "range": "stddev: 0.00796293834321241",
            "extra": "mean: 680.3255125999954 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8315405081602418,
            "unit": "iter/sec",
            "range": "stddev: 0.00639568134642236",
            "extra": "mean: 1.202587234400005 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 230.40830525410254,
            "unit": "iter/sec",
            "range": "stddev: 0.00003118974574995672",
            "extra": "mean: 4.340121328947601 msec\nrounds: 228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.84583166698079,
            "unit": "iter/sec",
            "range": "stddev: 0.00007168024795662387",
            "extra": "mean: 16.169238460316407 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.15865891388685,
            "unit": "iter/sec",
            "range": "stddev: 0.0002217431989488385",
            "extra": "mean: 61.88632394119007 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.205382538203605,
            "unit": "iter/sec",
            "range": "stddev: 0.002562432725486751",
            "extra": "mean: 138.78513662500325 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.121617911831144,
            "unit": "iter/sec",
            "range": "stddev: 0.0004620331813120589",
            "extra": "mean: 242.62316920001012 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 167.13742529589607,
            "unit": "iter/sec",
            "range": "stddev: 0.00005301592921450181",
            "extra": "mean: 5.98310042307774 msec\nrounds: 130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.5457829932053,
            "unit": "iter/sec",
            "range": "stddev: 0.00013419139311507684",
            "extra": "mean: 19.40022911538309 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.720618572485334,
            "unit": "iter/sec",
            "range": "stddev: 0.00024048339982569593",
            "extra": "mean: 67.93192793332234 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.7929060719234515,
            "unit": "iter/sec",
            "range": "stddev: 0.0006391059187844232",
            "extra": "mean: 147.212399142867 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.9090506698918106,
            "unit": "iter/sec",
            "range": "stddev: 0.003149424370008045",
            "extra": "mean: 255.816586800006 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.239760508497083,
            "unit": "iter/sec",
            "range": "stddev: 0.00016570455318537365",
            "extra": "mean: 65.61782906250002 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.858651594215867,
            "unit": "iter/sec",
            "range": "stddev: 0.0016207988155354878",
            "extra": "mean: 259.15788859999793 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9086776091410221,
            "unit": "iter/sec",
            "range": "stddev: 0.06215619294968486",
            "extra": "mean: 1.100500320399999 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4223862439205234,
            "unit": "iter/sec",
            "range": "stddev: 0.22157500312562448",
            "extra": "mean: 2.3675013436000087 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.22955880916715918,
            "unit": "iter/sec",
            "range": "stddev: 0.20060676640082098",
            "extra": "mean: 4.356182207200004 sec\nrounds: 5"
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
          "id": "17c7586b7f0f256e06258420fd9e6d78d9cbf1ee",
          "message": "Add SECURITY.md\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T13:57:28-05:00",
          "tree_id": "a2b0cc101da79898cfe54263c7373649b5f9aad2",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/17c7586b7f0f256e06258420fd9e6d78d9cbf1ee"
        },
        "date": 1772737214377,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.01689540717232,
            "unit": "iter/sec",
            "range": "stddev: 0.00014962827299757917",
            "extra": "mean: 19.99324411999794 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.790794632760115,
            "unit": "iter/sec",
            "range": "stddev: 0.0004506673181934631",
            "extra": "mean: 78.18122553846453 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2208299866816192,
            "unit": "iter/sec",
            "range": "stddev: 0.0015154784617869173",
            "extra": "mean: 310.4789772000004 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4435939452010305,
            "unit": "iter/sec",
            "range": "stddev: 0.003962864890155623",
            "extra": "mean: 692.715568199992 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8055266012419847,
            "unit": "iter/sec",
            "range": "stddev: 0.003643710351288829",
            "extra": "mean: 1.2414239312000006 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 228.48490725857255,
            "unit": "iter/sec",
            "range": "stddev: 0.000029642447199313688",
            "extra": "mean: 4.376656699115433 msec\nrounds: 226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.003675346487015,
            "unit": "iter/sec",
            "range": "stddev: 0.00008562614337159725",
            "extra": "mean: 16.39245495161115 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.891606871854753,
            "unit": "iter/sec",
            "range": "stddev: 0.0002332702225319446",
            "extra": "mean: 62.9262986470598 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.798404112580784,
            "unit": "iter/sec",
            "range": "stddev: 0.01584544516467749",
            "extra": "mean: 172.461246333332 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.053282844691068,
            "unit": "iter/sec",
            "range": "stddev: 0.0006504445202964575",
            "extra": "mean: 246.71359939999888 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 165.0541430386889,
            "unit": "iter/sec",
            "range": "stddev: 0.00022208931121936633",
            "extra": "mean: 6.058617987950771 msec\nrounds: 166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 50.355407727215436,
            "unit": "iter/sec",
            "range": "stddev: 0.00019813725803264178",
            "extra": "mean: 19.85884029411866 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.404183924535849,
            "unit": "iter/sec",
            "range": "stddev: 0.0003332636816135032",
            "extra": "mean: 69.42427319999828 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.654789167271595,
            "unit": "iter/sec",
            "range": "stddev: 0.0007338289899302048",
            "extra": "mean: 150.2677207142824 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.8354774406537397,
            "unit": "iter/sec",
            "range": "stddev: 0.0007139090515226388",
            "extra": "mean: 260.72373399999833 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.464099831766651,
            "unit": "iter/sec",
            "range": "stddev: 0.0011040014802651181",
            "extra": "mean: 64.66590431250197 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.914901445891189,
            "unit": "iter/sec",
            "range": "stddev: 0.004860360196462451",
            "extra": "mean: 255.43427180000432 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9795527103448345,
            "unit": "iter/sec",
            "range": "stddev: 0.017731594521467928",
            "extra": "mean: 1.0208741086000033 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4380044136902346,
            "unit": "iter/sec",
            "range": "stddev: 0.03507813750531953",
            "extra": "mean: 2.283082016399999 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24538513255545208,
            "unit": "iter/sec",
            "range": "stddev: 0.05401178406100001",
            "extra": "mean: 4.075226520799992 sec\nrounds: 5"
          }
        ]
      }
    ]
  }
}