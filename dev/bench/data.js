window.BENCHMARK_DATA = {
  "lastUpdate": 1772899163981,
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
          "id": "981a49a5fafa85d08fe14c117e79bb1311a8e1fa",
          "message": "Remove scope heading from SECURITY.md\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T13:57:36-05:00",
          "tree_id": "d694dfa2867abc4581cadd0e9e5a154481384ce6",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/981a49a5fafa85d08fe14c117e79bb1311a8e1fa"
        },
        "date": 1772737230169,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 51.64874784661374,
            "unit": "iter/sec",
            "range": "stddev: 0.0013469064111025402",
            "extra": "mean: 19.361553603773636 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 13.468415343760478,
            "unit": "iter/sec",
            "range": "stddev: 0.00043947157368730885",
            "extra": "mean: 74.2477844999984 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.3736955157586426,
            "unit": "iter/sec",
            "range": "stddev: 0.007874305011918995",
            "extra": "mean: 296.4108632000034 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4927837836212807,
            "unit": "iter/sec",
            "range": "stddev: 0.004107927462102995",
            "extra": "mean: 669.889377800007 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.845186686987263,
            "unit": "iter/sec",
            "range": "stddev: 0.010520964842359069",
            "extra": "mean: 1.1831705532000059 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 233.82177024235682,
            "unit": "iter/sec",
            "range": "stddev: 0.000035254972587710447",
            "extra": "mean: 4.276761735930309 msec\nrounds: 231"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 64.04285165927217,
            "unit": "iter/sec",
            "range": "stddev: 0.00005200773128571632",
            "extra": "mean: 15.61454516922997 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.758641773045994,
            "unit": "iter/sec",
            "range": "stddev: 0.00014496381303644518",
            "extra": "mean: 59.67070682353056 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.506661035669916,
            "unit": "iter/sec",
            "range": "stddev: 0.00018531546355960674",
            "extra": "mean: 133.21502000000152 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.323699612165438,
            "unit": "iter/sec",
            "range": "stddev: 0.00034111772064255496",
            "extra": "mean: 300.86954800000285 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 172.36524367497051,
            "unit": "iter/sec",
            "range": "stddev: 0.00011089656486373665",
            "extra": "mean: 5.801633662791683 msec\nrounds: 172"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 53.018412081963845,
            "unit": "iter/sec",
            "range": "stddev: 0.00007205922406973607",
            "extra": "mean: 18.861372129630166 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.675531411631429,
            "unit": "iter/sec",
            "range": "stddev: 0.003295003749974811",
            "extra": "mean: 68.14063300000346 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.9943301013837385,
            "unit": "iter/sec",
            "range": "stddev: 0.0002763380992412709",
            "extra": "mean: 142.97294887499845 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 4.030709924093769,
            "unit": "iter/sec",
            "range": "stddev: 0.001485371090271843",
            "extra": "mean: 248.09525340001528 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 16.01162934057742,
            "unit": "iter/sec",
            "range": "stddev: 0.00025961877279615544",
            "extra": "mean: 62.45460588234784 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4.074417315664771,
            "unit": "iter/sec",
            "range": "stddev: 0.0015417380196185656",
            "extra": "mean: 245.43386759999635 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9728734067946588,
            "unit": "iter/sec",
            "range": "stddev: 0.08297310171106848",
            "extra": "mean: 1.027882963000002 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.41126128809554235,
            "unit": "iter/sec",
            "range": "stddev: 0.16723982687538727",
            "extra": "mean: 2.4315442005999954 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.22265297830147787,
            "unit": "iter/sec",
            "range": "stddev: 0.05740492311972783",
            "extra": "mean: 4.491294064999994 sec\nrounds: 5"
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
          "id": "50295169e2faa4efd7be64f561482a9b9829bb82",
          "message": "Add CONTRIBUTING.md\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T14:00:54-05:00",
          "tree_id": "f453bcdea08d71b74c06e15ca2270fdeb1526797",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/50295169e2faa4efd7be64f561482a9b9829bb82"
        },
        "date": 1772737426651,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.80229112950389,
            "unit": "iter/sec",
            "range": "stddev: 0.00025164837063434135",
            "extra": "mean: 20.079397499999345 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.813910017400241,
            "unit": "iter/sec",
            "range": "stddev: 0.00013893964250192724",
            "extra": "mean: 78.04019215384545 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.242590611062345,
            "unit": "iter/sec",
            "range": "stddev: 0.0006463194000054708",
            "extra": "mean: 308.39539119999415 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4451703864151955,
            "unit": "iter/sec",
            "range": "stddev: 0.005478923457105874",
            "extra": "mean: 691.9599304000002 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8131657558502996,
            "unit": "iter/sec",
            "range": "stddev: 0.015833368113447665",
            "extra": "mean: 1.2297615742000034 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 226.6287750369474,
            "unit": "iter/sec",
            "range": "stddev: 0.00005244818065856761",
            "extra": "mean: 4.4125023392857745 msec\nrounds: 224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 60.76383679102247,
            "unit": "iter/sec",
            "range": "stddev: 0.0001245359930181991",
            "extra": "mean: 16.45715696721351 msec\nrounds: 61"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.827386757434544,
            "unit": "iter/sec",
            "range": "stddev: 0.00041046865701908073",
            "extra": "mean: 63.18162406249872 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.186158327958981,
            "unit": "iter/sec",
            "range": "stddev: 0.0010101290739353357",
            "extra": "mean: 139.15641075000096 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.094532137298576,
            "unit": "iter/sec",
            "range": "stddev: 0.00031222779150510445",
            "extra": "mean: 244.2281477999984 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 166.62216717221537,
            "unit": "iter/sec",
            "range": "stddev: 0.00004466652631595728",
            "extra": "mean: 6.0016024096387595 msec\nrounds: 166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 50.72207004032367,
            "unit": "iter/sec",
            "range": "stddev: 0.000301281231025486",
            "extra": "mean: 19.715283686273203 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.411898860314835,
            "unit": "iter/sec",
            "range": "stddev: 0.00044189397867936623",
            "extra": "mean: 69.38710919999853 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.6190576822217055,
            "unit": "iter/sec",
            "range": "stddev: 0.000674351032587201",
            "extra": "mean: 151.0789069999987 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.8343642497079644,
            "unit": "iter/sec",
            "range": "stddev: 0.0012653199057720906",
            "extra": "mean: 260.79942720000133 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.418489405551675,
            "unit": "iter/sec",
            "range": "stddev: 0.0006215779857911717",
            "extra": "mean: 64.85719668750001 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.920009976143167,
            "unit": "iter/sec",
            "range": "stddev: 0.0008220517636707383",
            "extra": "mean: 255.10139159999878 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9719920101805711,
            "unit": "iter/sec",
            "range": "stddev: 0.013686728122086643",
            "extra": "mean: 1.028815041200005 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.43699866571337287,
            "unit": "iter/sec",
            "range": "stddev: 0.013843511569592468",
            "extra": "mean: 2.2883365063999976 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2475953424221735,
            "unit": "iter/sec",
            "range": "stddev: 0.02237147864721584",
            "extra": "mean: 4.038848187600013 sec\nrounds: 5"
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
          "id": "ef0e8e2ff51ca70532cd92becf2f60d0b638b262",
          "message": "Fix crash when loading D extension after max_coll_params increase\n\nAdded volterra_max_coll_params() to the D library so Python can query\nthe row width for volterra_get_supported_settings() at runtime, rather\nthan relying on the hardcoded ncols=4 which was stale after the\nmax_coll_params 3→6 change.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T14:08:34-05:00",
          "tree_id": "81168c2e0d09b565b65b7380707cf941f86b98e3",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/ef0e8e2ff51ca70532cd92becf2f60d0b638b262"
        },
        "date": 1772737885605,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 48.49381533418912,
            "unit": "iter/sec",
            "range": "stddev: 0.000505207956537257",
            "extra": "mean: 20.62118629166676 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.783033256954086,
            "unit": "iter/sec",
            "range": "stddev: 0.00041678779292504605",
            "extra": "mean: 78.22869423076803 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.252496170793946,
            "unit": "iter/sec",
            "range": "stddev: 0.0014843566500927028",
            "extra": "mean: 307.45616520000283 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4446469638521253,
            "unit": "iter/sec",
            "range": "stddev: 0.002665651108594189",
            "extra": "mean: 692.2106404000033 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8172493070192115,
            "unit": "iter/sec",
            "range": "stddev: 0.006621996445005762",
            "extra": "mean: 1.2236168222000003 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 229.36067401872805,
            "unit": "iter/sec",
            "range": "stddev: 0.00003779800472238255",
            "extra": "mean: 4.3599453318590555 msec\nrounds: 226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.49023871594938,
            "unit": "iter/sec",
            "range": "stddev: 0.00013378532752662475",
            "extra": "mean: 16.26274382539711 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.957169829788702,
            "unit": "iter/sec",
            "range": "stddev: 0.0008703218385025544",
            "extra": "mean: 62.667754411763475 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.222953682214528,
            "unit": "iter/sec",
            "range": "stddev: 0.0004325179118562947",
            "extra": "mean: 138.44751662499988 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.088089595349985,
            "unit": "iter/sec",
            "range": "stddev: 0.0004055931874110426",
            "extra": "mean: 244.61303419999751 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 167.53513957808343,
            "unit": "iter/sec",
            "range": "stddev: 0.000059471002317952064",
            "extra": "mean: 5.968897047618647 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.141393234807516,
            "unit": "iter/sec",
            "range": "stddev: 0.00008739846209674312",
            "extra": "mean: 19.553632326922738 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.451770426901534,
            "unit": "iter/sec",
            "range": "stddev: 0.0005337197558789175",
            "extra": "mean: 69.19567433333498 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.667380889206983,
            "unit": "iter/sec",
            "range": "stddev: 0.0012989099148422907",
            "extra": "mean: 149.98393171429265 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.8562066952085927,
            "unit": "iter/sec",
            "range": "stddev: 0.0021069644869122503",
            "extra": "mean: 259.3221989999961 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.564377570141477,
            "unit": "iter/sec",
            "range": "stddev: 0.0004972691464163023",
            "extra": "mean: 64.24927662500224 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9322880663087396,
            "unit": "iter/sec",
            "range": "stddev: 0.0015070399363449835",
            "extra": "mean: 254.304868600002 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9945525326391165,
            "unit": "iter/sec",
            "range": "stddev: 0.0071973897079720735",
            "extra": "mean: 1.0054773048000072 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4354197228989299,
            "unit": "iter/sec",
            "range": "stddev: 0.023160734847860093",
            "extra": "mean: 2.296634597399992 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24805186735970877,
            "unit": "iter/sec",
            "range": "stddev: 0.01138752082110183",
            "extra": "mean: 4.031414924000006 sec\nrounds: 5"
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
          "id": "f42149ddbb6512906825433716ceb247117072d7",
          "message": "Fix remaining CI failures: pin meson, upgrade ldc2 to 1.41.0\n\n- test-dlang: pin meson==1.5.2 (newer meson broke ldc2 detection);\n  upgrade ldc2 1.40.1 → 1.41.0; use curl -fL to fail loudly on 404\n- test-dlang-macos: upgrade ldc2 1.40.1 → 1.41.0 (1.40.1 arm64 build\n  was missing, causing silent curl 404 + tar failure); curl -fL\n- test-dlang-windows: upgrade ldc2 1.40.1 → 1.41.0\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T14:13:50-05:00",
          "tree_id": "0f20bf2790f38977e851ccf8804c155745e0ab65",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/f42149ddbb6512906825433716ceb247117072d7"
        },
        "date": 1772738197154,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.13264887549096,
            "unit": "iter/sec",
            "range": "stddev: 0.0001050892099464824",
            "extra": "mean: 19.947080843136614 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.80137368114117,
            "unit": "iter/sec",
            "range": "stddev: 0.0003234430464487595",
            "extra": "mean: 78.11661661538622 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.249107746438649,
            "unit": "iter/sec",
            "range": "stddev: 0.0020414745324464803",
            "extra": "mean: 307.7768046000017 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.441499151691157,
            "unit": "iter/sec",
            "range": "stddev: 0.0030410979186869438",
            "extra": "mean: 693.7222257999991 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8175517152144013,
            "unit": "iter/sec",
            "range": "stddev: 0.011505378650694868",
            "extra": "mean: 1.2231642125999969 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 230.83323810452686,
            "unit": "iter/sec",
            "range": "stddev: 0.00003330741882296733",
            "extra": "mean: 4.332131751091998 msec\nrounds: 229"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.925329684538404,
            "unit": "iter/sec",
            "range": "stddev: 0.000045404802347712874",
            "extra": "mean: 16.148480841268437 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.036286410822008,
            "unit": "iter/sec",
            "range": "stddev: 0.00020015437436088742",
            "extra": "mean: 62.3585769411773 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.270766426339603,
            "unit": "iter/sec",
            "range": "stddev: 0.00028056952990593997",
            "extra": "mean: 137.53708224999883 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.19522237467402,
            "unit": "iter/sec",
            "range": "stddev: 0.0004220798148836045",
            "extra": "mean: 312.96726260000014 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 168.72972939437693,
            "unit": "iter/sec",
            "range": "stddev: 0.00006968070640734757",
            "extra": "mean: 5.9266378461537785 msec\nrounds: 169"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.386245832760494,
            "unit": "iter/sec",
            "range": "stddev: 0.0003775897674830985",
            "extra": "mean: 19.46046035848888 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.584288677163096,
            "unit": "iter/sec",
            "range": "stddev: 0.0006719038046426204",
            "extra": "mean: 68.56693680000016 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.5539691141714735,
            "unit": "iter/sec",
            "range": "stddev: 0.01096509655912708",
            "extra": "mean: 152.5792970000006 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.8777669354207625,
            "unit": "iter/sec",
            "range": "stddev: 0.0006963853199553926",
            "extra": "mean: 257.8803772000015 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.406583810238843,
            "unit": "iter/sec",
            "range": "stddev: 0.004309335036093879",
            "extra": "mean: 64.9073157499993 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9736967564700207,
            "unit": "iter/sec",
            "range": "stddev: 0.00031819153014298724",
            "extra": "mean: 251.65483459999504 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9977915685641358,
            "unit": "iter/sec",
            "range": "stddev: 0.001678868663785014",
            "extra": "mean: 1.002213319400005 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.44373685719486977,
            "unit": "iter/sec",
            "range": "stddev: 0.003556914769086366",
            "extra": "mean: 2.253587872600008 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24788787579151164,
            "unit": "iter/sec",
            "range": "stddev: 0.016094800075747873",
            "extra": "mean: 4.0340819283999965 sec\nrounds: 5"
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
          "id": "67676aab0567b73181eb88960b3f9fd76bf55719",
          "message": "Fix test-dlang: use ldc2 1.36.0 + meson 1.5.2 on Ubuntu 20.04\n\nldc2 1.41.0 requires glibc 2.32+ and cannot run on Ubuntu 20.04 (glibc\n2.31). ldc2 1.36.0 is the right version: runs on glibc 2.31, and is\nrecognised by meson 1.5.2. Also add libxml2 which ldc2 1.36.0 requires.\n\nVerified locally via docker run ubuntu:20.04.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T14:37:57-05:00",
          "tree_id": "720afa2c954303bb7bce33cf015975f4446fc748",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/67676aab0567b73181eb88960b3f9fd76bf55719"
        },
        "date": 1772739650535,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.667809619983146,
            "unit": "iter/sec",
            "range": "stddev: 0.0000995967622736615",
            "extra": "mean: 20.13376486000027 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.413008775141845,
            "unit": "iter/sec",
            "range": "stddev: 0.006511830648971619",
            "extra": "mean: 80.56064553846035 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2289266592700168,
            "unit": "iter/sec",
            "range": "stddev: 0.0011193605404288026",
            "extra": "mean: 309.70043779999514 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4386759497853694,
            "unit": "iter/sec",
            "range": "stddev: 0.003136382960576116",
            "extra": "mean: 695.0835594000068 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8021771366003214,
            "unit": "iter/sec",
            "range": "stddev: 0.014795439160784806",
            "extra": "mean: 1.2466074566000032 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 228.49513874680446,
            "unit": "iter/sec",
            "range": "stddev: 0.000042699872917724844",
            "extra": "mean: 4.376460722466837 msec\nrounds: 227"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.01800143975315,
            "unit": "iter/sec",
            "range": "stddev: 0.00008033555215312415",
            "extra": "mean: 16.388606253965264 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.949730637244599,
            "unit": "iter/sec",
            "range": "stddev: 0.00021373434760638783",
            "extra": "mean: 62.69698358822913 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.530497812201048,
            "unit": "iter/sec",
            "range": "stddev: 0.006695374716525803",
            "extra": "mean: 180.81554933334587 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.171341241733568,
            "unit": "iter/sec",
            "range": "stddev: 0.0013914665967507994",
            "extra": "mean: 315.3239982000059 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 165.92126720621232,
            "unit": "iter/sec",
            "range": "stddev: 0.00015129979895666746",
            "extra": "mean: 6.026954933734731 msec\nrounds: 166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 50.415480861436826,
            "unit": "iter/sec",
            "range": "stddev: 0.0001651749304097377",
            "extra": "mean: 19.835177269228573 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.341591489102687,
            "unit": "iter/sec",
            "range": "stddev: 0.000263180680659746",
            "extra": "mean: 69.7272684666719 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.652717521013274,
            "unit": "iter/sec",
            "range": "stddev: 0.00034926579417052",
            "extra": "mean: 150.3145138571418 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.833677764106048,
            "unit": "iter/sec",
            "range": "stddev: 0.0006804653610012394",
            "extra": "mean: 260.8461277999936 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.268293567092021,
            "unit": "iter/sec",
            "range": "stddev: 0.00025133436035231177",
            "extra": "mean: 65.49520387499719 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.900300475560327,
            "unit": "iter/sec",
            "range": "stddev: 0.0009565501756669697",
            "extra": "mean: 256.3905028000022 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.980541891954331,
            "unit": "iter/sec",
            "range": "stddev: 0.0015537400902631566",
            "extra": "mean: 1.0198442393999982 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.43325882396191584,
            "unit": "iter/sec",
            "range": "stddev: 0.016996662039602407",
            "extra": "mean: 2.3080891714000074 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24517706924365046,
            "unit": "iter/sec",
            "range": "stddev: 0.005585059139182304",
            "extra": "mean: 4.078684858599996 sec\nrounds: 5"
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
          "id": "97473576c589b08da86eaabbb1e80f823fbfd883",
          "message": "Clarify given/unknown functions in solver descriptions\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T14:40:39-05:00",
          "tree_id": "e5bcd85e41d6f02d96b0f84bc60534eaabd172e6",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/97473576c589b08da86eaabbb1e80f823fbfd883"
        },
        "date": 1772739807279,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.41370873291791,
            "unit": "iter/sec",
            "range": "stddev: 0.00038666849306270753",
            "extra": "mean: 19.8358745098046 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.91553651493883,
            "unit": "iter/sec",
            "range": "stddev: 0.0007729987044615782",
            "extra": "mean: 77.42612928571292 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.25327682518152,
            "unit": "iter/sec",
            "range": "stddev: 0.0019135943367163872",
            "extra": "mean: 307.3823881999971 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4462744376022687,
            "unit": "iter/sec",
            "range": "stddev: 0.012319637332764994",
            "extra": "mean: 691.4317048000015 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8192244439251082,
            "unit": "iter/sec",
            "range": "stddev: 0.00445609300266339",
            "extra": "mean: 1.220666701799999 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 231.59805046669564,
            "unit": "iter/sec",
            "range": "stddev: 0.00004182284399469877",
            "extra": "mean: 4.317825637931277 msec\nrounds: 232"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.72039215354281,
            "unit": "iter/sec",
            "range": "stddev: 0.0002689367585282914",
            "extra": "mean: 16.20210055555519 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.094455458296288,
            "unit": "iter/sec",
            "range": "stddev: 0.000858512723229913",
            "extra": "mean: 62.1331987647041 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.2933936739130125,
            "unit": "iter/sec",
            "range": "stddev: 0.0007529150205129172",
            "extra": "mean: 137.11038300000132 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.119209921960051,
            "unit": "iter/sec",
            "range": "stddev: 0.0005585533530624739",
            "extra": "mean: 242.76500080000005 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 168.97327865020654,
            "unit": "iter/sec",
            "range": "stddev: 0.00004143159259130506",
            "extra": "mean: 5.918095499999802 msec\nrounds: 170"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.335141133238324,
            "unit": "iter/sec",
            "range": "stddev: 0.0004174966197606235",
            "extra": "mean: 19.479833461537382 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.577012671802608,
            "unit": "iter/sec",
            "range": "stddev: 0.00030678279367101494",
            "extra": "mean: 68.60116146666826 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.796454466800727,
            "unit": "iter/sec",
            "range": "stddev: 0.0007978524009045444",
            "extra": "mean: 147.13554028571707 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.9289992463542864,
            "unit": "iter/sec",
            "range": "stddev: 0.0005510141467244336",
            "extra": "mean: 254.51773780000053 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.597137982500085,
            "unit": "iter/sec",
            "range": "stddev: 0.0008645777881513977",
            "extra": "mean: 64.11432668749839 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.974060597507723,
            "unit": "iter/sec",
            "range": "stddev: 0.0010765372115615498",
            "extra": "mean: 251.63179459999586 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1.0033659316897583,
            "unit": "iter/sec",
            "range": "stddev: 0.004385015461677805",
            "extra": "mean: 996.6453597999987 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.44444792038274034,
            "unit": "iter/sec",
            "range": "stddev: 0.00973284178244608",
            "extra": "mean: 2.2499824031999993 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2506922533154608,
            "unit": "iter/sec",
            "range": "stddev: 0.01328660940729832",
            "extra": "mean: 3.9889545320000024 sec\nrounds: 5"
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
          "id": "eb4336c6ada48ff74d1500e8ebbfddb432d12bd2",
          "message": "Simplify solver description wording\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T14:40:57-05:00",
          "tree_id": "ec7883aa9f6985f1ea5fd01c9058d90a694b5c72",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/eb4336c6ada48ff74d1500e8ebbfddb432d12bd2"
        },
        "date": 1772739828359,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.38661728964037,
            "unit": "iter/sec",
            "range": "stddev: 0.00012136584570326085",
            "extra": "mean: 19.846539692308394 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.923231779180865,
            "unit": "iter/sec",
            "range": "stddev: 0.0004319641890364491",
            "extra": "mean: 77.38002514285824 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2659063624462346,
            "unit": "iter/sec",
            "range": "stddev: 0.002995091800561561",
            "extra": "mean: 306.1937143999984 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.454165390494742,
            "unit": "iter/sec",
            "range": "stddev: 0.004041436304802541",
            "extra": "mean: 687.6796866000063 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8180245578092351,
            "unit": "iter/sec",
            "range": "stddev: 0.009248506464671635",
            "extra": "mean: 1.2224571871999985 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 229.24498050543016,
            "unit": "iter/sec",
            "range": "stddev: 0.000029905773719767386",
            "extra": "mean: 4.3621456740088265 msec\nrounds: 227"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.43212039281356,
            "unit": "iter/sec",
            "range": "stddev: 0.00010490946907838565",
            "extra": "mean: 16.278129317460152 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.059371382642478,
            "unit": "iter/sec",
            "range": "stddev: 0.00035207786810367733",
            "extra": "mean: 62.26893794117212 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.240573695090896,
            "unit": "iter/sec",
            "range": "stddev: 0.00039104063766425793",
            "extra": "mean: 138.11060312499814 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.1071266037760665,
            "unit": "iter/sec",
            "range": "stddev: 0.0022613594526293855",
            "extra": "mean: 243.47922439999934 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 168.6237771233103,
            "unit": "iter/sec",
            "range": "stddev: 0.00005632931764963276",
            "extra": "mean: 5.9303617619045825 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.35475127419757,
            "unit": "iter/sec",
            "range": "stddev: 0.00013243621109982262",
            "extra": "mean: 19.472394962263895 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.533689423452179,
            "unit": "iter/sec",
            "range": "stddev: 0.00026373958990760945",
            "extra": "mean: 68.80565359999764 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.726361620625423,
            "unit": "iter/sec",
            "range": "stddev: 0.0025315053881103658",
            "extra": "mean: 148.66878357143977 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.8871631150146504,
            "unit": "iter/sec",
            "range": "stddev: 0.0019056159151131964",
            "extra": "mean: 257.25702019999517 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.652890837561097,
            "unit": "iter/sec",
            "range": "stddev: 0.0004789396068121575",
            "extra": "mean: 63.885962687503905 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.972178420635578,
            "unit": "iter/sec",
            "range": "stddev: 0.0006413694890731583",
            "extra": "mean: 251.75102780000313 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9991156256103559,
            "unit": "iter/sec",
            "range": "stddev: 0.005470896139883051",
            "extra": "mean: 1.0008851572000026 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.44428180263095446,
            "unit": "iter/sec",
            "range": "stddev: 0.016872085872699998",
            "extra": "mean: 2.250823675600003 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24995076649766065,
            "unit": "iter/sec",
            "range": "stddev: 0.004772345348003491",
            "extra": "mean: 4.0007878912000026 sec\nrounds: 5"
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
          "id": "1c696fe123e36dd1b18ef84b69eabfc64f45511e",
          "message": "Rewrite solver descriptions as single sentences\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T14:44:16-05:00",
          "tree_id": "00d6bb81644c319c276dbea34ac579f301208ed0",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/1c696fe123e36dd1b18ef84b69eabfc64f45511e"
        },
        "date": 1772740023583,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.787701212820345,
            "unit": "iter/sec",
            "range": "stddev: 0.00009722623186139425",
            "extra": "mean: 19.68980631372955 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.956093929874081,
            "unit": "iter/sec",
            "range": "stddev: 0.0006746887697102153",
            "extra": "mean: 77.18375657143132 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2229194227731313,
            "unit": "iter/sec",
            "range": "stddev: 0.013553503324284361",
            "extra": "mean: 310.277691999994 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4534012018209594,
            "unit": "iter/sec",
            "range": "stddev: 0.0014912705965099892",
            "extra": "mean: 688.0412639999918 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8287309989352125,
            "unit": "iter/sec",
            "range": "stddev: 0.008361840241382212",
            "extra": "mean: 1.206664166400003 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 231.80109263533987,
            "unit": "iter/sec",
            "range": "stddev: 0.000043405603448390204",
            "extra": "mean: 4.314043513044004 msec\nrounds: 230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 62.01141995814567,
            "unit": "iter/sec",
            "range": "stddev: 0.00006805331289071329",
            "extra": "mean: 16.126061952378215 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.175527568971557,
            "unit": "iter/sec",
            "range": "stddev: 0.00025197368459753796",
            "extra": "mean: 61.82178576470258 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.299057820919448,
            "unit": "iter/sec",
            "range": "stddev: 0.0004594095746140452",
            "extra": "mean: 137.00398387500812 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.143649144481527,
            "unit": "iter/sec",
            "range": "stddev: 0.008036563849160822",
            "extra": "mean: 318.1016563999947 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 167.3921637337555,
            "unit": "iter/sec",
            "range": "stddev: 0.000030712109627537",
            "extra": "mean: 5.973995303570741 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 50.893865201421335,
            "unit": "iter/sec",
            "range": "stddev: 0.0008132163946413381",
            "extra": "mean: 19.64873361538421 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.330557561973723,
            "unit": "iter/sec",
            "range": "stddev: 0.0033775916109947905",
            "extra": "mean: 69.78095553333598 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.807996935405148,
            "unit": "iter/sec",
            "range": "stddev: 0.000371821468630004",
            "extra": "mean: 146.88608257143545 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.920897649617956,
            "unit": "iter/sec",
            "range": "stddev: 0.0008452294062577038",
            "extra": "mean: 255.0436377999915 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.760466348890755,
            "unit": "iter/sec",
            "range": "stddev: 0.00019395280525188864",
            "extra": "mean: 63.44989912499521 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4.002385034049317,
            "unit": "iter/sec",
            "range": "stddev: 0.00046728008676490254",
            "extra": "mean: 249.85102420000658 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1.0014204600447318,
            "unit": "iter/sec",
            "range": "stddev: 0.0033890394395043144",
            "extra": "mean: 998.5815548000005 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.44731236120719203,
            "unit": "iter/sec",
            "range": "stddev: 0.008368854930143277",
            "extra": "mean: 2.235574258000008 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2511360440441164,
            "unit": "iter/sec",
            "range": "stddev: 0.01850750270040366",
            "extra": "mean: 3.9819055197999886 sec\nrounds: 5"
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
          "id": "40d33582a065f98256594e30f410a09a98a6fb80",
          "message": "Move equation type names into description sentences\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T14:46:06-05:00",
          "tree_id": "55d9d5411d8ab3ee7325934fd75f70103ac48052",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/40d33582a065f98256594e30f410a09a98a6fb80"
        },
        "date": 1772740145487,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 48.90156067423422,
            "unit": "iter/sec",
            "range": "stddev: 0.0011247384521608978",
            "extra": "mean: 20.449245100001292 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.712787530017088,
            "unit": "iter/sec",
            "range": "stddev: 0.0008179415971830167",
            "extra": "mean: 78.66095438461684 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2220878400367208,
            "unit": "iter/sec",
            "range": "stddev: 0.0017216553609687923",
            "extra": "mean: 310.3577709999996 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4356158095391327,
            "unit": "iter/sec",
            "range": "stddev: 0.005274919251010627",
            "extra": "mean: 696.5651906000005 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8096395510060602,
            "unit": "iter/sec",
            "range": "stddev: 0.009583815222616466",
            "extra": "mean: 1.2351175270000057 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 228.19674985026037,
            "unit": "iter/sec",
            "range": "stddev: 0.00006671480334224005",
            "extra": "mean: 4.382183360000466 msec\nrounds: 225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 60.95053293970956,
            "unit": "iter/sec",
            "range": "stddev: 0.00025192100161231304",
            "extra": "mean: 16.40674743548461 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.80363071849891,
            "unit": "iter/sec",
            "range": "stddev: 0.0009142941817684989",
            "extra": "mean: 63.27659876470359 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.562057997909293,
            "unit": "iter/sec",
            "range": "stddev: 0.001653305466713011",
            "extra": "mean: 179.78956716666517 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.049472171509295,
            "unit": "iter/sec",
            "range": "stddev: 0.004469219908239397",
            "extra": "mean: 246.9457642000009 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 166.5181541139369,
            "unit": "iter/sec",
            "range": "stddev: 0.00008959050204056879",
            "extra": "mean: 6.0053512202385395 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 50.85838657718949,
            "unit": "iter/sec",
            "range": "stddev: 0.0001370287345313834",
            "extra": "mean: 19.66244050000025 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.345520130668232,
            "unit": "iter/sec",
            "range": "stddev: 0.0005203242438150595",
            "extra": "mean: 69.70817306666864 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.808643682092647,
            "unit": "iter/sec",
            "range": "stddev: 0.00031926698691514484",
            "extra": "mean: 146.87213000000148 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.8885841319091408,
            "unit": "iter/sec",
            "range": "stddev: 0.0007037993802960559",
            "extra": "mean: 257.16301000000215 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.526887689182116,
            "unit": "iter/sec",
            "range": "stddev: 0.0002579361248578169",
            "extra": "mean: 64.40440737500275 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9433840092459396,
            "unit": "iter/sec",
            "range": "stddev: 0.000970039760459139",
            "extra": "mean: 253.58930240000177 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9928720559400998,
            "unit": "iter/sec",
            "range": "stddev: 0.000895288942472673",
            "extra": "mean: 1.007179116399999 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4438752549193911,
            "unit": "iter/sec",
            "range": "stddev: 0.0017414063663249778",
            "extra": "mean: 2.2528852169999936 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2503474965449423,
            "unit": "iter/sec",
            "range": "stddev: 0.010999227629206845",
            "extra": "mean: 3.9944477727999983 sec\nrounds: 5"
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
          "id": "d0129c5e54e5ff703bb059f2c941857866c810be",
          "message": "Add abbreviated equation names as parenthetical references\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T14:46:58-05:00",
          "tree_id": "69585b8d11a3fc6279d36ee2bf84d92a3fd59ddd",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/d0129c5e54e5ff703bb059f2c941857866c810be"
        },
        "date": 1772740201160,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.463108192660584,
            "unit": "iter/sec",
            "range": "stddev: 0.00008678573307347385",
            "extra": "mean: 19.816456730769534 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.987003047979996,
            "unit": "iter/sec",
            "range": "stddev: 0.00024781805862403956",
            "extra": "mean: 77.00005892857169 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.263664345291636,
            "unit": "iter/sec",
            "range": "stddev: 0.007624019807885853",
            "extra": "mean: 306.404058199999 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4697074996746538,
            "unit": "iter/sec",
            "range": "stddev: 0.0047459487379246075",
            "extra": "mean: 680.4074962000044 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8300418933714383,
            "unit": "iter/sec",
            "range": "stddev: 0.007522736012787293",
            "extra": "mean: 1.2047584681999979 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 175.84611552011324,
            "unit": "iter/sec",
            "range": "stddev: 0.0000614447634849756",
            "extra": "mean: 5.686790390804056 msec\nrounds: 174"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 46.380804204856275,
            "unit": "iter/sec",
            "range": "stddev: 0.00020466098624810012",
            "extra": "mean: 21.560643829787143 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 11.951376574585138,
            "unit": "iter/sec",
            "range": "stddev: 0.00036734687514658465",
            "extra": "mean: 83.6723697692299 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.372589666444019,
            "unit": "iter/sec",
            "range": "stddev: 0.0008810507844152018",
            "extra": "mean: 186.12997866667058 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.0740961626846475,
            "unit": "iter/sec",
            "range": "stddev: 0.0008970638651978841",
            "extra": "mean: 325.2988673999994 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 138.45290357995788,
            "unit": "iter/sec",
            "range": "stddev: 0.000136019290706125",
            "extra": "mean: 7.222672649999647 msec\nrounds: 140"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 40.80673810494248,
            "unit": "iter/sec",
            "range": "stddev: 0.00018674550212132555",
            "extra": "mean: 24.505756804876317 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 11.161252760104356,
            "unit": "iter/sec",
            "range": "stddev: 0.00042449410418527394",
            "extra": "mean: 89.59567725000166 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 5.1191321184487935,
            "unit": "iter/sec",
            "range": "stddev: 0.0012557231670045981",
            "extra": "mean: 195.34561266666847 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2.9712893026504688,
            "unit": "iter/sec",
            "range": "stddev: 0.0011160676039542817",
            "extra": "mean: 336.55423560000486 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 12.888192903119531,
            "unit": "iter/sec",
            "range": "stddev: 0.0003011206466786915",
            "extra": "mean: 77.59039669230543 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.2591158562301894,
            "unit": "iter/sec",
            "range": "stddev: 0.0003164417221509807",
            "extra": "mean: 306.83168200000637 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.8169296997525435,
            "unit": "iter/sec",
            "range": "stddev: 0.00551839459864907",
            "extra": "mean: 1.2240955376000044 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.3650557689904849,
            "unit": "iter/sec",
            "range": "stddev: 0.007976330699041504",
            "extra": "mean: 2.739307483800002 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.20537315928564745,
            "unit": "iter/sec",
            "range": "stddev: 0.014682362213699523",
            "extra": "mean: 4.869185454800009 sec\nrounds: 5"
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
          "id": "e9eebf78c1bfe9394342e1a0167794480c54cda5",
          "message": "Fix test-dlang-macos: discover ldc2 bin dir dynamically after extraction\n\nHardcoded path assumed directory name matched the download URL, but\nldc2 1.41.0 on macOS extracts to a different name. Use ls -d to find\nthe actual extracted directory.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T14:49:01-05:00",
          "tree_id": "d7da675d8b50eaf5e45d5a6abf04aa225767d6cb",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/e9eebf78c1bfe9394342e1a0167794480c54cda5"
        },
        "date": 1772740307548,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.686465536873065,
            "unit": "iter/sec",
            "range": "stddev: 0.00006245148122450721",
            "extra": "mean: 19.729132607846296 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.867481543746,
            "unit": "iter/sec",
            "range": "stddev: 0.0010495397158859895",
            "extra": "mean: 77.71528535714367 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2265153649158274,
            "unit": "iter/sec",
            "range": "stddev: 0.010520283233033802",
            "extra": "mean: 309.931888400007 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.46795505335477,
            "unit": "iter/sec",
            "range": "stddev: 0.0029689864686571602",
            "extra": "mean: 681.219767400006 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8224143561407952,
            "unit": "iter/sec",
            "range": "stddev: 0.010871093233770479",
            "extra": "mean: 1.215932081599999 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 232.03808845086982,
            "unit": "iter/sec",
            "range": "stddev: 0.000029399629867582273",
            "extra": "mean: 4.309637295653438 msec\nrounds: 230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 62.063963589803535,
            "unit": "iter/sec",
            "range": "stddev: 0.00008543990840685457",
            "extra": "mean: 16.112409555555516 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.251185931487527,
            "unit": "iter/sec",
            "range": "stddev: 0.00015316444293163447",
            "extra": "mean: 61.53397076470877 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.335930710689484,
            "unit": "iter/sec",
            "range": "stddev: 0.00034711569770370823",
            "extra": "mean: 136.31535512499582 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.969274569552749,
            "unit": "iter/sec",
            "range": "stddev: 0.02120181321582754",
            "extra": "mean: 251.93520440000157 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 169.07967913694011,
            "unit": "iter/sec",
            "range": "stddev: 0.0002120576858657057",
            "extra": "mean: 5.914371289941267 msec\nrounds: 169"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.190092033672485,
            "unit": "iter/sec",
            "range": "stddev: 0.00011325398057434132",
            "extra": "mean: 19.535030320754394 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.536800522036886,
            "unit": "iter/sec",
            "range": "stddev: 0.00013211433330278459",
            "extra": "mean: 68.79092813333045 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.805071853884016,
            "unit": "iter/sec",
            "range": "stddev: 0.00035377111024073414",
            "extra": "mean: 146.9492198571345 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.9193180105725225,
            "unit": "iter/sec",
            "range": "stddev: 0.00028837155210476744",
            "extra": "mean: 255.14643039999785 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.58429614697734,
            "unit": "iter/sec",
            "range": "stddev: 0.0002769892310970501",
            "extra": "mean: 64.16715843749898 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9513229726721812,
            "unit": "iter/sec",
            "range": "stddev: 0.0006431888350072236",
            "extra": "mean: 253.07979299999488 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9875239557313796,
            "unit": "iter/sec",
            "range": "stddev: 0.01645897944090033",
            "extra": "mean: 1.0126336623999976 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.444208095452544,
            "unit": "iter/sec",
            "range": "stddev: 0.006301559387291832",
            "extra": "mean: 2.251197153399994 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24928692144210424,
            "unit": "iter/sec",
            "range": "stddev: 0.010243099361334907",
            "extra": "mean: 4.011441892800002 sec\nrounds: 5"
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
          "id": "c372e31df80214c790e179b7fdd7beba554c73c8",
          "message": "Update CHANGELOG with unreleased changes since 0.1.0\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T14:58:33-05:00",
          "tree_id": "8f5eb076fe35fef088e7b16ae57881f6acd8d44c",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/c372e31df80214c790e179b7fdd7beba554c73c8"
        },
        "date": 1772740884241,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.18383198654194,
            "unit": "iter/sec",
            "range": "stddev: 0.00008861517431383132",
            "extra": "mean: 19.92673656862583 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.927554617374623,
            "unit": "iter/sec",
            "range": "stddev: 0.00041789065863167505",
            "extra": "mean: 77.3541500769218 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.245969066997704,
            "unit": "iter/sec",
            "range": "stddev: 0.003441110078260697",
            "extra": "mean: 308.0744083999946 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4601548303676661,
            "unit": "iter/sec",
            "range": "stddev: 0.0026903799203763677",
            "extra": "mean: 684.8588787999972 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8211123281150848,
            "unit": "iter/sec",
            "range": "stddev: 0.002722870274640837",
            "extra": "mean: 1.2178601705999994 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 228.66215394488648,
            "unit": "iter/sec",
            "range": "stddev: 0.00003473665295530775",
            "extra": "mean: 4.373264148648866 msec\nrounds: 222"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.813766317255116,
            "unit": "iter/sec",
            "range": "stddev: 0.00004370530389019894",
            "extra": "mean: 16.177626111108736 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.053772052829455,
            "unit": "iter/sec",
            "range": "stddev: 0.0001490973826125626",
            "extra": "mean: 62.290656470592616 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.2407754093894265,
            "unit": "iter/sec",
            "range": "stddev: 0.0005023953405725298",
            "extra": "mean: 138.10675562499242 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.16708003437511,
            "unit": "iter/sec",
            "range": "stddev: 0.003039029638225094",
            "extra": "mean: 315.7482567999921 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 166.98910888583453,
            "unit": "iter/sec",
            "range": "stddev: 0.000051263185419472894",
            "extra": "mean: 5.988414494047454 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.08888656995015,
            "unit": "iter/sec",
            "range": "stddev: 0.00009660889338810527",
            "extra": "mean: 19.57372859615593 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.606676014771026,
            "unit": "iter/sec",
            "range": "stddev: 0.00016262135753206214",
            "extra": "mean: 68.461845733331 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.780648285906759,
            "unit": "iter/sec",
            "range": "stddev: 0.0003767110088147902",
            "extra": "mean: 147.47852385714364 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.8950124023427026,
            "unit": "iter/sec",
            "range": "stddev: 0.0011723383266736929",
            "extra": "mean: 256.73859199999924 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.487007511408,
            "unit": "iter/sec",
            "range": "stddev: 0.0004770029615348508",
            "extra": "mean: 64.57025343749478 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.975981145611156,
            "unit": "iter/sec",
            "range": "stddev: 0.0012609715567899109",
            "extra": "mean: 251.5102469999988 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9972797362194425,
            "unit": "iter/sec",
            "range": "stddev: 0.006864688488629347",
            "extra": "mean: 1.0027276838000034 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4441285464289779,
            "unit": "iter/sec",
            "range": "stddev: 0.013066021208737483",
            "extra": "mean: 2.251600371199993 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24938004824504864,
            "unit": "iter/sec",
            "range": "stddev: 0.010659104717100364",
            "extra": "mean: 4.009943887000008 sec\nrounds: 5"
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
          "id": "5d77dc11faa749317e2b456e75e929c200ccce02",
          "message": "Read __version__ from package metadata instead of hardcoding it\n\nEliminates the duplicate version string between __init__.py and\npyproject.toml; pyproject.toml is now the single source of truth.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T15:06:35-05:00",
          "tree_id": "99d9aab929a0284feccf83f3b1b0c5839a036e09",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/5d77dc11faa749317e2b456e75e929c200ccce02"
        },
        "date": 1772741404785,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 33.88770438239466,
            "unit": "iter/sec",
            "range": "stddev: 0.0002105038690462144",
            "extra": "mean: 29.509228147053832 msec\nrounds: 34"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 8.588430777018496,
            "unit": "iter/sec",
            "range": "stddev: 0.0003610192131998158",
            "extra": "mean: 116.43570588888805 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2.176844201106665,
            "unit": "iter/sec",
            "range": "stddev: 0.0013869778663131048",
            "extra": "mean: 459.38060220001944 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 0.9687737876954108,
            "unit": "iter/sec",
            "range": "stddev: 0.010009058246141666",
            "extra": "mean: 1.0322327180000115 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.5469211718544351,
            "unit": "iter/sec",
            "range": "stddev: 0.005956240966056665",
            "extra": "mean: 1.8284170580000023 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 159.23023338288905,
            "unit": "iter/sec",
            "range": "stddev: 0.00002265979949841321",
            "extra": "mean: 6.280214371069687 msec\nrounds: 159"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 42.37350906678198,
            "unit": "iter/sec",
            "range": "stddev: 0.00006429573200621554",
            "extra": "mean: 23.599650395344142 msec\nrounds: 43"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 11.033905850217959,
            "unit": "iter/sec",
            "range": "stddev: 0.0004819960374280883",
            "extra": "mean: 90.62973833334335 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 4.969325644819145,
            "unit": "iter/sec",
            "range": "stddev: 0.0008183964969597179",
            "extra": "mean: 201.23454800000218 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2.5157238602904104,
            "unit": "iter/sec",
            "range": "stddev: 0.0003770542196554646",
            "extra": "mean: 397.4999068000102 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 116.8879047460107,
            "unit": "iter/sec",
            "range": "stddev: 0.00003808161952600903",
            "extra": "mean: 8.555205110168846 msec\nrounds: 118"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 35.583384784850274,
            "unit": "iter/sec",
            "range": "stddev: 0.00009310555035818833",
            "extra": "mean: 28.103003861109716 msec\nrounds: 36"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 10.040500228856862,
            "unit": "iter/sec",
            "range": "stddev: 0.0003462745958298254",
            "extra": "mean: 99.59663136364001 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 4.66489445646886,
            "unit": "iter/sec",
            "range": "stddev: 0.000409769413444407",
            "extra": "mean: 214.367122200008 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2.687634065368684,
            "unit": "iter/sec",
            "range": "stddev: 0.00039236158780829583",
            "extra": "mean: 372.07446240000763 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 10.330056421565759,
            "unit": "iter/sec",
            "range": "stddev: 0.0005945713963573299",
            "extra": "mean: 96.80489236363985 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 2.6436699332111235,
            "unit": "iter/sec",
            "range": "stddev: 0.0016467174640106897",
            "extra": "mean: 378.2620467999777 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.6753727124210069,
            "unit": "iter/sec",
            "range": "stddev: 0.005381133919940249",
            "extra": "mean: 1.480663908400004 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.30115875504989353,
            "unit": "iter/sec",
            "range": "stddev: 0.016450239617987833",
            "extra": "mean: 3.320507815999997 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.17083577921708745,
            "unit": "iter/sec",
            "range": "stddev: 0.02262005735132471",
            "extra": "mean: 5.8535747288000035 sec\nrounds: 5"
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
          "id": "033a4892db9a47f90351f7d1d289fcea60903fd8",
          "message": "Skip benchmarks for docs-only changes\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T15:09:26-05:00",
          "tree_id": "9f035927c7a64ba1a5dc71203427df359b5b72bc",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/033a4892db9a47f90351f7d1d289fcea60903fd8"
        },
        "date": 1772741537730,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.58368019885225,
            "unit": "iter/sec",
            "range": "stddev: 0.00015963564692342408",
            "extra": "mean: 20.167926140003374 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.677315367128651,
            "unit": "iter/sec",
            "range": "stddev: 0.0006699894948721124",
            "extra": "mean: 78.8810541538571 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2341564007816346,
            "unit": "iter/sec",
            "range": "stddev: 0.0028539831982583876",
            "extra": "mean: 309.19964159999154 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4542099206186827,
            "unit": "iter/sec",
            "range": "stddev: 0.0025291883677684545",
            "extra": "mean: 687.6586287999999 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8097217328916431,
            "unit": "iter/sec",
            "range": "stddev: 0.013904335279094812",
            "extra": "mean: 1.2349921699999868 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 227.81167760588772,
            "unit": "iter/sec",
            "range": "stddev: 0.000040091854329365606",
            "extra": "mean: 4.389590606193558 msec\nrounds: 226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 60.869110551593195,
            "unit": "iter/sec",
            "range": "stddev: 0.00006412166723952338",
            "extra": "mean: 16.428694142859065 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.85855381959481,
            "unit": "iter/sec",
            "range": "stddev: 0.0004493085537622319",
            "extra": "mean: 63.05745223529785 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.180150227698477,
            "unit": "iter/sec",
            "range": "stddev: 0.0011061625847022297",
            "extra": "mean: 139.27285199999773 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.075491150725024,
            "unit": "iter/sec",
            "range": "stddev: 0.001957527173963523",
            "extra": "mean: 245.369199199979 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 166.1041378354928,
            "unit": "iter/sec",
            "range": "stddev: 0.000041459595536999554",
            "extra": "mean: 6.0203196201553135 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 50.76791439927957,
            "unit": "iter/sec",
            "range": "stddev: 0.0002444022662315465",
            "extra": "mean: 19.697480423071916 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.219974611769056,
            "unit": "iter/sec",
            "range": "stddev: 0.0003717581857417422",
            "extra": "mean: 70.32361360001005 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.6941411816786855,
            "unit": "iter/sec",
            "range": "stddev: 0.0004906778245053854",
            "extra": "mean: 149.38436057143787 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.7571287074416277,
            "unit": "iter/sec",
            "range": "stddev: 0.009931981674596206",
            "extra": "mean: 266.1606982000194 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.541567372160403,
            "unit": "iter/sec",
            "range": "stddev: 0.0001825383101023716",
            "extra": "mean: 64.34357462499563 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.8447726559396926,
            "unit": "iter/sec",
            "range": "stddev: 0.006461843724463069",
            "extra": "mean: 260.09340200001816 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9880463114063447,
            "unit": "iter/sec",
            "range": "stddev: 0.00415162393070944",
            "extra": "mean: 1.0120983079999974 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4313993995314006,
            "unit": "iter/sec",
            "range": "stddev: 0.09591930201161844",
            "extra": "mean: 2.318037533399979 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24674936954066765,
            "unit": "iter/sec",
            "range": "stddev: 0.03597731980376304",
            "extra": "mean: 4.052695258599988 sec\nrounds: 5"
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
          "id": "b6afe8e4dab91cb5262297b3b491a6a317f75d4e",
          "message": "Fix test-dlang-macos: try osx-universal before arch-specific ldc2 download\n\nldc2 1.41.0 ships a universal macOS binary (osx-universal) rather than\nseparate arm64/x86_64 archives.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-05T15:47:51-05:00",
          "tree_id": "f4461192cdc05c93839cf2b651d01cd34266c4a7",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/b6afe8e4dab91cb5262297b3b491a6a317f75d4e"
        },
        "date": 1772743838300,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.46550395955012,
            "unit": "iter/sec",
            "range": "stddev: 0.00013147393178731983",
            "extra": "mean: 20.216108600000098 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.64230033461995,
            "unit": "iter/sec",
            "range": "stddev: 0.000716444377942629",
            "extra": "mean: 79.09952884615296 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.213603396044528,
            "unit": "iter/sec",
            "range": "stddev: 0.0029133593271018186",
            "extra": "mean: 311.1771668000017 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.424794136481994,
            "unit": "iter/sec",
            "range": "stddev: 0.0023498959831228226",
            "extra": "mean: 701.8557800000025 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8108088021087049,
            "unit": "iter/sec",
            "range": "stddev: 0.012097759375711507",
            "extra": "mean: 1.233336388799995 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 225.53869805261598,
            "unit": "iter/sec",
            "range": "stddev: 0.00008542937402237931",
            "extra": "mean: 4.433828911110899 msec\nrounds: 225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 60.40042867509152,
            "unit": "iter/sec",
            "range": "stddev: 0.00009417158268987322",
            "extra": "mean: 16.55617388709675 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.83347061777036,
            "unit": "iter/sec",
            "range": "stddev: 0.0002827665065528756",
            "extra": "mean: 63.15734712499932 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.556498359559588,
            "unit": "iter/sec",
            "range": "stddev: 0.0006701888379723896",
            "extra": "mean: 179.96945833333436 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.0080083148408745,
            "unit": "iter/sec",
            "range": "stddev: 0.001163680732531894",
            "extra": "mean: 249.50048040000183 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 165.10969418612675,
            "unit": "iter/sec",
            "range": "stddev: 0.00013871915929413353",
            "extra": "mean: 6.056579566265253 msec\nrounds: 166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 50.44384232109132,
            "unit": "iter/sec",
            "range": "stddev: 0.00008213153611492568",
            "extra": "mean: 19.824025173076183 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.325409285395038,
            "unit": "iter/sec",
            "range": "stddev: 0.0004702531369998424",
            "extra": "mean: 69.80603346666783 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.647148094951694,
            "unit": "iter/sec",
            "range": "stddev: 0.0003236763710049998",
            "extra": "mean: 150.44045742857293 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.832055002448054,
            "unit": "iter/sec",
            "range": "stddev: 0.0020064382870285157",
            "extra": "mean: 260.95658840000056 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.526310404295781,
            "unit": "iter/sec",
            "range": "stddev: 0.0003185351834347161",
            "extra": "mean: 64.40680199999882 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9304626355210113,
            "unit": "iter/sec",
            "range": "stddev: 0.002154275439432994",
            "extra": "mean: 254.42297580000854 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9963524203454558,
            "unit": "iter/sec",
            "range": "stddev: 0.007208345949722055",
            "extra": "mean: 1.0036609332000013 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.44054591536668464,
            "unit": "iter/sec",
            "range": "stddev: 0.021319264046105617",
            "extra": "mean: 2.26991095620001 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2485348112855265,
            "unit": "iter/sec",
            "range": "stddev: 0.026459161793223235",
            "extra": "mean: 4.0235812232 sec\nrounds: 5"
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
          "id": "6acd7d96cba3d5b8d63a3429a27e1cdfdf197d76",
          "message": "Fix test-dlang-macos: use .tar.xz extension for ldc2 macOS archives\n\nmacOS ldc2 releases use .tar.xz (not .tar.gz), so tar -xz was\nsilently failing. Also bump to ldc2 1.42.0 which fixes ldmd2\ncrashes on macOS 15.4.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T10:40:31-05:00",
          "tree_id": "04fa38f05fb0f6c99e873b44f1a91076c7bd4bb5",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/6acd7d96cba3d5b8d63a3429a27e1cdfdf197d76"
        },
        "date": 1772811804154,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.39712195910294,
            "unit": "iter/sec",
            "range": "stddev: 0.00023858915372081254",
            "extra": "mean: 19.842402921569526 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.954760318757332,
            "unit": "iter/sec",
            "range": "stddev: 0.0003255014624418663",
            "extra": "mean: 77.19170215384761 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.256095078679604,
            "unit": "iter/sec",
            "range": "stddev: 0.000609956661819733",
            "extra": "mean: 307.11633900000095 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4467388835160826,
            "unit": "iter/sec",
            "range": "stddev: 0.004261966157991289",
            "extra": "mean: 691.2097348000003 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8153941148615347,
            "unit": "iter/sec",
            "range": "stddev: 0.004703584782389079",
            "extra": "mean: 1.2264008063999996 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 229.37537873115866,
            "unit": "iter/sec",
            "range": "stddev: 0.0000404708661775723",
            "extra": "mean: 4.359665826087021 msec\nrounds: 230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.932063744573675,
            "unit": "iter/sec",
            "range": "stddev: 0.00008966530797205566",
            "extra": "mean: 16.146724968253903 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.01913500376133,
            "unit": "iter/sec",
            "range": "stddev: 0.0005195795963638007",
            "extra": "mean: 62.425343176469745 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.610713220005972,
            "unit": "iter/sec",
            "range": "stddev: 0.0007222294937628437",
            "extra": "mean: 178.2304603333363 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.121488112642047,
            "unit": "iter/sec",
            "range": "stddev: 0.0009867378041761735",
            "extra": "mean: 242.63081019999788 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 163.03021102628006,
            "unit": "iter/sec",
            "range": "stddev: 0.0002857699144058136",
            "extra": "mean: 6.133832457830792 msec\nrounds: 166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.58655844403004,
            "unit": "iter/sec",
            "range": "stddev: 0.00030202728287164593",
            "extra": "mean: 19.384894634616337 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.487777540531342,
            "unit": "iter/sec",
            "range": "stddev: 0.00022873439212580754",
            "extra": "mean: 69.02369926666645 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.758043687885176,
            "unit": "iter/sec",
            "range": "stddev: 0.0008105229942614684",
            "extra": "mean: 147.97181642856978 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.8733219820209874,
            "unit": "iter/sec",
            "range": "stddev: 0.0008640185075256155",
            "extra": "mean: 258.17631600000084 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.58226387614206,
            "unit": "iter/sec",
            "range": "stddev: 0.0001535844211251246",
            "extra": "mean: 64.17552724999709 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.910084745354635,
            "unit": "iter/sec",
            "range": "stddev: 0.0007308866741876719",
            "extra": "mean: 255.74893260000238 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9915503289622817,
            "unit": "iter/sec",
            "range": "stddev: 0.006019941997214711",
            "extra": "mean: 1.008521676399988 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4392754789891476,
            "unit": "iter/sec",
            "range": "stddev: 0.013265124333572634",
            "extra": "mean: 2.2764758057999983 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24939770254071283,
            "unit": "iter/sec",
            "range": "stddev: 0.01489731598574314",
            "extra": "mean: 4.009660032199998 sec\nrounds: 5"
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
          "id": "4ca341b6097cd2e6c2c67706ba305ade1e66e1c0",
          "message": "Add tests verifying solvers accept plain Python lists as inputs\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T10:46:59-05:00",
          "tree_id": "e8a1c22ab4d958116585b91e6d6ef6572a8805cb",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/4ca341b6097cd2e6c2c67706ba305ade1e66e1c0"
        },
        "date": 1772812197259,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.29968691541969,
            "unit": "iter/sec",
            "range": "stddev: 0.00011484678008204072",
            "extra": "mean: 19.880839450979636 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.539351450891594,
            "unit": "iter/sec",
            "range": "stddev: 0.005804993575222573",
            "extra": "mean: 79.74894107692438 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.261676335186445,
            "unit": "iter/sec",
            "range": "stddev: 0.001775865942406606",
            "extra": "mean: 306.59081319999757 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4493450195208846,
            "unit": "iter/sec",
            "range": "stddev: 0.002386606784514642",
            "extra": "mean: 689.9668377999973 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8184610946521441,
            "unit": "iter/sec",
            "range": "stddev: 0.0061563703244494035",
            "extra": "mean: 1.2218051737999986 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 230.84367569288315,
            "unit": "iter/sec",
            "range": "stddev: 0.00003479889992618504",
            "extra": "mean: 4.331935873913264 msec\nrounds: 230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.711052115608986,
            "unit": "iter/sec",
            "range": "stddev: 0.00009610983784198864",
            "extra": "mean: 16.20455276190411 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.152816253205177,
            "unit": "iter/sec",
            "range": "stddev: 0.00030042897541883256",
            "extra": "mean: 61.90870894117746 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.263896547091394,
            "unit": "iter/sec",
            "range": "stddev: 0.0008552961644519921",
            "extra": "mean: 137.6671588750007 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.1960901109762623,
            "unit": "iter/sec",
            "range": "stddev: 0.001258157842086055",
            "extra": "mean: 312.88229219999835 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 164.51338555313814,
            "unit": "iter/sec",
            "range": "stddev: 0.0006031354298037969",
            "extra": "mean: 6.078532738462172 msec\nrounds: 130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.12555791563776,
            "unit": "iter/sec",
            "range": "stddev: 0.00025984985971885593",
            "extra": "mean: 19.55968875000052 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.585254731994347,
            "unit": "iter/sec",
            "range": "stddev: 0.0002948091744941577",
            "extra": "mean: 68.5623952666655 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.752825569367904,
            "unit": "iter/sec",
            "range": "stddev: 0.0004019947758827237",
            "extra": "mean: 148.0861588571441 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.886345534826023,
            "unit": "iter/sec",
            "range": "stddev: 0.000965794225288679",
            "extra": "mean: 257.3111400000016 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.745121809949465,
            "unit": "iter/sec",
            "range": "stddev: 0.00026841828286171694",
            "extra": "mean: 63.51173475000316 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9725761973662492,
            "unit": "iter/sec",
            "range": "stddev: 0.001038245046960958",
            "extra": "mean: 251.7258198000036 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9974884875763905,
            "unit": "iter/sec",
            "range": "stddev: 0.0044575735236152625",
            "extra": "mean: 1.002517836000004 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4464177882467567,
            "unit": "iter/sec",
            "range": "stddev: 0.004476429599115652",
            "extra": "mean: 2.2400541069999917 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24919416439623637,
            "unit": "iter/sec",
            "range": "stddev: 0.010007997501210366",
            "extra": "mean: 4.012935063800006 sec\nrounds: 5"
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
          "id": "b77a6db78ebf81b195e9a27bc182917402430851",
          "message": "Fix coll_choices mutation: use sorted() instead of list.sort()\n\nAll three solvers called coll_choices.sort() in-place, silently\nmodifying the caller's list. Replace with sorted() so the caller's\nlist is never touched.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T10:50:46-05:00",
          "tree_id": "47d1c901736fdd1fff4311c3445f6393f9955935",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/b77a6db78ebf81b195e9a27bc182917402430851"
        },
        "date": 1772812412171,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.86433054715689,
            "unit": "iter/sec",
            "range": "stddev: 0.00018328953072477226",
            "extra": "mean: 20.054415431373254 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.800509739141527,
            "unit": "iter/sec",
            "range": "stddev: 0.00018064326897761438",
            "extra": "mean: 78.12188892307859 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2305065385019356,
            "unit": "iter/sec",
            "range": "stddev: 0.0017613815277469276",
            "extra": "mean: 309.5489788000009 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4459712179157185,
            "unit": "iter/sec",
            "range": "stddev: 0.0023395748345997488",
            "extra": "mean: 691.5766978000022 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8167099726775731,
            "unit": "iter/sec",
            "range": "stddev: 0.0030741256505021773",
            "extra": "mean: 1.2244248674000062 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 229.35529340305328,
            "unit": "iter/sec",
            "range": "stddev: 0.00003993410331825925",
            "extra": "mean: 4.3600476150453105 msec\nrounds: 226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.34225430440223,
            "unit": "iter/sec",
            "range": "stddev: 0.00007204789955131336",
            "extra": "mean: 16.30197669354703 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.041132770783765,
            "unit": "iter/sec",
            "range": "stddev: 0.00014871908375256568",
            "extra": "mean: 62.33973711765122 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.238617394037591,
            "unit": "iter/sec",
            "range": "stddev: 0.0007441131869058643",
            "extra": "mean: 138.14792874999782 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.1949512307149277,
            "unit": "iter/sec",
            "range": "stddev: 0.0013138050114184798",
            "extra": "mean: 312.99382299999365 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 165.9641483298143,
            "unit": "iter/sec",
            "range": "stddev: 0.0002492924152681318",
            "extra": "mean: 6.025397714286689 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.070096832009426,
            "unit": "iter/sec",
            "range": "stddev: 0.0002686698215886724",
            "extra": "mean: 19.58093017307979 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.476610300463816,
            "unit": "iter/sec",
            "range": "stddev: 0.000428860652397237",
            "extra": "mean: 69.07694406666185 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.738023406204716,
            "unit": "iter/sec",
            "range": "stddev: 0.001090235723104259",
            "extra": "mean: 148.41147614286245 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.8629850682169904,
            "unit": "iter/sec",
            "range": "stddev: 0.001331103378569356",
            "extra": "mean: 258.8671667999904 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.613894175576608,
            "unit": "iter/sec",
            "range": "stddev: 0.00033889275186192296",
            "extra": "mean: 64.04552181250267 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9543069675242735,
            "unit": "iter/sec",
            "range": "stddev: 0.0009087427290753403",
            "extra": "mean: 252.88881419999709 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9936053915817055,
            "unit": "iter/sec",
            "range": "stddev: 0.0014418066634950034",
            "extra": "mean: 1.0064357625999947 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4419112317532043,
            "unit": "iter/sec",
            "range": "stddev: 0.0027581685687023323",
            "extra": "mean: 2.2628979037999954 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2493461210282049,
            "unit": "iter/sec",
            "range": "stddev: 0.005719185117222882",
            "extra": "mean: 4.010489499000005 sec\nrounds: 5"
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
          "id": "3e5d0d629b91fb5d295c524a6cea3038efaaeca1",
          "message": "Enable bounds checking explicitly and build D extension in release mode\n\nAdd -boundscheck=on to meson.build so array bounds checking is always\non regardless of buildtype (it would otherwise be silently disabled by\nany future -release flag). Switch CI D-extension jobs to\n--buildtype=release for an optimized build.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T11:03:25-05:00",
          "tree_id": "7252dec02deabce6bb4c4b80805ea37d398aed1e",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/3e5d0d629b91fb5d295c524a6cea3038efaaeca1"
        },
        "date": 1772813174994,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.15851719360534,
            "unit": "iter/sec",
            "range": "stddev: 0.000278059982719718",
            "extra": "mean: 20.342354836733815 msec\nrounds: 49"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.80642059235295,
            "unit": "iter/sec",
            "range": "stddev: 0.00021611254087101103",
            "extra": "mean: 78.08583146153471 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2166706483365846,
            "unit": "iter/sec",
            "range": "stddev: 0.003117088714154276",
            "extra": "mean: 310.8804442000064 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4447035009390887,
            "unit": "iter/sec",
            "range": "stddev: 0.001906591490587931",
            "extra": "mean: 692.1835513999781 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.806340932595993,
            "unit": "iter/sec",
            "range": "stddev: 0.021353143847106848",
            "extra": "mean: 1.2401702053999997 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 228.970034794891,
            "unit": "iter/sec",
            "range": "stddev: 0.00004851981195994649",
            "extra": "mean: 4.3673837098194515 msec\nrounds: 224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.45614099185674,
            "unit": "iter/sec",
            "range": "stddev: 0.00008453994004268532",
            "extra": "mean: 16.27176688709604 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.054824801474368,
            "unit": "iter/sec",
            "range": "stddev: 0.00020821936384416822",
            "extra": "mean: 62.28657194117539 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.487324722079286,
            "unit": "iter/sec",
            "range": "stddev: 0.00020246177498385581",
            "extra": "mean: 182.23816716665434 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.109725127043329,
            "unit": "iter/sec",
            "range": "stddev: 0.0009237480272149685",
            "extra": "mean: 243.32527579999805 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 165.57375667788133,
            "unit": "iter/sec",
            "range": "stddev: 0.0005833833269119174",
            "extra": "mean: 6.039604464283971 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.18761790107055,
            "unit": "iter/sec",
            "range": "stddev: 0.00007761345118402894",
            "extra": "mean: 19.535974538465204 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.43819764486834,
            "unit": "iter/sec",
            "range": "stddev: 0.0002395552500828181",
            "extra": "mean: 69.26072246665929 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.730793798167483,
            "unit": "iter/sec",
            "range": "stddev: 0.0003473391670803181",
            "extra": "mean: 148.57088628569468 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.878086713188901,
            "unit": "iter/sec",
            "range": "stddev: 0.00036763311632845823",
            "extra": "mean: 257.85911300000635 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.71525467198825,
            "unit": "iter/sec",
            "range": "stddev: 0.00024072013503961953",
            "extra": "mean: 63.632439999999235 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.92103108945448,
            "unit": "iter/sec",
            "range": "stddev: 0.0036366847975210356",
            "extra": "mean: 255.03495820001942 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9875658280667742,
            "unit": "iter/sec",
            "range": "stddev: 0.014560492648633827",
            "extra": "mean: 1.012590727199995 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4330191422677271,
            "unit": "iter/sec",
            "range": "stddev: 0.007791627746243669",
            "extra": "mean: 2.309366728600003 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2513352048292224,
            "unit": "iter/sec",
            "range": "stddev: 0.01546759012947845",
            "extra": "mean: 3.97875021399999 sec\nrounds: 5"
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
          "id": "00720f304df642634435bfb010bae1db8a0e3f5b",
          "message": "Remove debug writeln statements from D entry points\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T11:12:41-05:00",
          "tree_id": "f5a7118ec5704c91cae5dfb0bf87e0b05be09361",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/00720f304df642634435bfb010bae1db8a0e3f5b"
        },
        "date": 1772813731659,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.24021264211324,
            "unit": "iter/sec",
            "range": "stddev: 0.00013882374856073607",
            "extra": "mean: 19.904374352941378 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.954877204037585,
            "unit": "iter/sec",
            "range": "stddev: 0.0003418596122409278",
            "extra": "mean: 77.19100569230673 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2562034681197956,
            "unit": "iter/sec",
            "range": "stddev: 0.0007922559615699339",
            "extra": "mean: 307.10611599999993 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4515187333258823,
            "unit": "iter/sec",
            "range": "stddev: 0.0034920317387961814",
            "extra": "mean: 688.9335818000006 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8156466199743426,
            "unit": "iter/sec",
            "range": "stddev: 0.007750531734406276",
            "extra": "mean: 1.2260211414000053 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 230.1090453561591,
            "unit": "iter/sec",
            "range": "stddev: 0.0000315215533005569",
            "extra": "mean: 4.345765714912319 msec\nrounds: 228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.495754681570645,
            "unit": "iter/sec",
            "range": "stddev: 0.0000821001871172451",
            "extra": "mean: 16.26128511111166 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.07816434780541,
            "unit": "iter/sec",
            "range": "stddev: 0.00014904348831649742",
            "extra": "mean: 62.19615488235106 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.592494207639476,
            "unit": "iter/sec",
            "range": "stddev: 0.0002668096296583494",
            "extra": "mean: 178.81109266666328 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.160679192738353,
            "unit": "iter/sec",
            "range": "stddev: 0.0012693171098490704",
            "extra": "mean: 316.38769360000083 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 168.11559245352643,
            "unit": "iter/sec",
            "range": "stddev: 0.000045471206179195494",
            "extra": "mean: 5.94828823076859 msec\nrounds: 169"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.22425594782013,
            "unit": "iter/sec",
            "range": "stddev: 0.00025206873481745806",
            "extra": "mean: 19.522001471698395 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.506935392983452,
            "unit": "iter/sec",
            "range": "stddev: 0.0002282634202721973",
            "extra": "mean: 68.93254659999855 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.73141197705274,
            "unit": "iter/sec",
            "range": "stddev: 0.00040754319648901447",
            "extra": "mean: 148.55724228571685 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.829669748574757,
            "unit": "iter/sec",
            "range": "stddev: 0.005165546393134888",
            "extra": "mean: 261.11912140000015 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.19724964811006,
            "unit": "iter/sec",
            "range": "stddev: 0.000342967305505499",
            "extra": "mean: 65.80138006250102 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.8098472299949986,
            "unit": "iter/sec",
            "range": "stddev: 0.001487223051389073",
            "extra": "mean: 262.47771620000435 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9325510286845112,
            "unit": "iter/sec",
            "range": "stddev: 0.03389744930457806",
            "extra": "mean: 1.072327378600005 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.42363982657768334,
            "unit": "iter/sec",
            "range": "stddev: 0.007281042545731185",
            "extra": "mean: 2.3604957259999937 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2403255522951904,
            "unit": "iter/sec",
            "range": "stddev: 0.015829050010302034",
            "extra": "mean: 4.161022373400004 sec\nrounds: 5"
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
          "id": "c5287db4efd287edf60d0076e1a3d0b59be9a266",
          "message": "Add three additional analytic solution tests from notebooks\n\nVIE-1: K(s)=2+s, g(t)=t²+t³/6, y(t)=t (polynomial; near-exact error ~3e-13)\nVIE-2: K(s)=2cos(s), g(t)=cos(t)-sin(t), y(t)=exp(t) (error ~2e-5)\nVIDE:  K=0, a(t)=-1, g(t)=t, y(t)=3exp(-t)+t-1 (pure ODE; error ~4e-6)\n\nThe VIDE case also serves as a regression test for the a(t)·y(t)+g(t)\nterms in isolation, since the integral contribution is exactly zero.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T11:20:27-05:00",
          "tree_id": "4f6d9f5770861aa551b52cdafce44f5d211168e0",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/c5287db4efd287edf60d0076e1a3d0b59be9a266"
        },
        "date": 1772814196017,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.51490811568444,
            "unit": "iter/sec",
            "range": "stddev: 0.0001442162787369818",
            "extra": "mean: 19.796136176470817 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 13.004464146443667,
            "unit": "iter/sec",
            "range": "stddev: 0.0004941289445774749",
            "extra": "mean: 76.89667092307454 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.1971161582559255,
            "unit": "iter/sec",
            "range": "stddev: 0.01779891969320326",
            "extra": "mean: 312.78187920000846 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.463375904511032,
            "unit": "iter/sec",
            "range": "stddev: 0.0032659947855960656",
            "extra": "mean: 683.3514184000023 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8253572773155102,
            "unit": "iter/sec",
            "range": "stddev: 0.0074959881956340926",
            "extra": "mean: 1.2115965139999958 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 227.455491786144,
            "unit": "iter/sec",
            "range": "stddev: 0.000025090757131365936",
            "extra": "mean: 4.396464522123784 msec\nrounds: 226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 60.66560054245121,
            "unit": "iter/sec",
            "range": "stddev: 0.00009623119054567723",
            "extra": "mean: 16.48380616128975 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.82774743191306,
            "unit": "iter/sec",
            "range": "stddev: 0.0002329270794794479",
            "extra": "mean: 63.18018431250216 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 6.756250677060917,
            "unit": "iter/sec",
            "range": "stddev: 0.0004810346533683752",
            "extra": "mean: 148.0110859999968 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.053772842736353,
            "unit": "iter/sec",
            "range": "stddev: 0.0010234843222713286",
            "extra": "mean: 246.68377799999917 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 166.1310983054535,
            "unit": "iter/sec",
            "range": "stddev: 0.00010499281142618541",
            "extra": "mean: 6.019342616765048 msec\nrounds: 167"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 50.59225817301344,
            "unit": "iter/sec",
            "range": "stddev: 0.00009034835290496774",
            "extra": "mean: 19.76587003846001 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.332029234602835,
            "unit": "iter/sec",
            "range": "stddev: 0.00028542673743449273",
            "extra": "mean: 69.773790133335 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.528040250329218,
            "unit": "iter/sec",
            "range": "stddev: 0.0009077930819328684",
            "extra": "mean: 153.18533000000554 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.764600948309061,
            "unit": "iter/sec",
            "range": "stddev: 0.002287804068701942",
            "extra": "mean: 265.63240399999586 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.458740506131308,
            "unit": "iter/sec",
            "range": "stddev: 0.0004107674767694053",
            "extra": "mean: 64.6883230625015 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.8823920788859887,
            "unit": "iter/sec",
            "range": "stddev: 0.009083317125092156",
            "extra": "mean: 257.57316099999343 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9896866006352922,
            "unit": "iter/sec",
            "range": "stddev: 0.002630433903280768",
            "extra": "mean: 1.010420873999999 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.43817392486622614,
            "unit": "iter/sec",
            "range": "stddev: 0.013711815791804818",
            "extra": "mean: 2.2821987874 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2473250757140451,
            "unit": "iter/sec",
            "range": "stddev: 0.023410605845309913",
            "extra": "mean: 4.043261675399992 sec\nrounds: 5"
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
          "id": "950af42680543bc1244ee921d9248dda0f92f273",
          "message": "Add force_continuous=True test for polynomial VIE-1 case\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T11:27:25-05:00",
          "tree_id": "414872d8a958f2f8147fe445bd9f1d64ae26bec1",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/950af42680543bc1244ee921d9248dda0f92f273"
        },
        "date": 1772814614595,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.62397171918688,
            "unit": "iter/sec",
            "range": "stddev: 0.0002214249665763278",
            "extra": "mean: 19.75348764705856 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.993425266488368,
            "unit": "iter/sec",
            "range": "stddev: 0.0002101203535884017",
            "extra": "mean: 76.96200035714388 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2956408429381727,
            "unit": "iter/sec",
            "range": "stddev: 0.0009269121405999706",
            "extra": "mean: 303.4311223999964 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4658225302342305,
            "unit": "iter/sec",
            "range": "stddev: 0.0062149196691158445",
            "extra": "mean: 682.2108266000015 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8311769399324371,
            "unit": "iter/sec",
            "range": "stddev: 0.009352880876698564",
            "extra": "mean: 1.2031132626000016 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 233.08555655895307,
            "unit": "iter/sec",
            "range": "stddev: 0.000031422670293030544",
            "extra": "mean: 4.290270125541114 msec\nrounds: 231"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 62.397320566351894,
            "unit": "iter/sec",
            "range": "stddev: 0.00008452715490060645",
            "extra": "mean: 16.02632919047578 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.30182606179909,
            "unit": "iter/sec",
            "range": "stddev: 0.00015544455387158808",
            "extra": "mean: 61.342821117650836 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.341766070546661,
            "unit": "iter/sec",
            "range": "stddev: 0.0007010351619195051",
            "extra": "mean: 136.2070093749992 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.201547961245465,
            "unit": "iter/sec",
            "range": "stddev: 0.0015800653428764161",
            "extra": "mean: 312.3489049999989 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 161.15254132942832,
            "unit": "iter/sec",
            "range": "stddev: 0.00005578163507062028",
            "extra": "mean: 6.205300839505833 msec\nrounds: 162"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.34409586505734,
            "unit": "iter/sec",
            "range": "stddev: 0.00047204542036867654",
            "extra": "mean: 19.476436056605262 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.642530282882893,
            "unit": "iter/sec",
            "range": "stddev: 0.0002291407202471253",
            "extra": "mean: 68.29420740000103 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.803141117938242,
            "unit": "iter/sec",
            "range": "stddev: 0.0005527388187045345",
            "extra": "mean: 146.9909241428553 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.912935433607167,
            "unit": "iter/sec",
            "range": "stddev: 0.0016112734960560843",
            "extra": "mean: 255.56261199999997 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.652239666060884,
            "unit": "iter/sec",
            "range": "stddev: 0.00012645611129337913",
            "extra": "mean: 63.88862049999933 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.957113663186297,
            "unit": "iter/sec",
            "range": "stddev: 0.001031491187855176",
            "extra": "mean: 252.70944560000146 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9986111870837876,
            "unit": "iter/sec",
            "range": "stddev: 0.005105131615090214",
            "extra": "mean: 1.0013907443999983 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4440533501599099,
            "unit": "iter/sec",
            "range": "stddev: 0.00554897753120495",
            "extra": "mean: 2.251981658599999 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24789229779549918,
            "unit": "iter/sec",
            "range": "stddev: 0.04709082369060048",
            "extra": "mean: 4.034009966800011 sec\nrounds: 5"
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
          "id": "f906893791cdcd98869cc993645fdb4aedf2ec94",
          "message": "Add vector-valued VIE-1 solver (D extension)\n\n- New D entry point volterra_solve_vie1_vec handles (N,d,d) matrix kernels\n  and (N,d) vector g/solution arrays for any d.\n- solve_VIE_1_vec_impl!(cd,cc,d): fully compile-time specialised for d=1..8,\n  with fixed-size stack arrays and lin_solve!(d*m) fully unrolled.\n- solve_VIE_1_vec_runtime_impl!(cd,cc): runtime-d LAPACK path for d>8;\n  meson.build updated to detect and link liblapack with Have_lapack flag.\n- volterra_solve_vie1 is now a thin wrapper calling volterra_solve_vie1_vec\n  with d=1; scalar path is unchanged.\n- force_continuous=True is fully supported for both compile-time and runtime d.\n- Python: solve_vie1_vec_d() in _dlang.py; solve_VIE_1() in solvers.py\n  accepts 3-D kernel_values (N,d,d) and 2-D g_values (N,d) on the vector\n  path; 2-D kernel now raises ValueError with a clear message.\n- 59/59 tests pass, including 3 new vector VIE-1 tests.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T15:51:28-05:00",
          "tree_id": "7d3f22670af37fae25ea4f310548305f409acb7b",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/f906893791cdcd98869cc993645fdb4aedf2ec94"
        },
        "date": 1772830460235,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.26165381612193,
            "unit": "iter/sec",
            "range": "stddev: 0.00035941899899422227",
            "extra": "mean: 20.2997650816329 msec\nrounds: 49"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.27607522800096,
            "unit": "iter/sec",
            "range": "stddev: 0.008229630006906153",
            "extra": "mean: 81.45925969230478 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.1934767764499643,
            "unit": "iter/sec",
            "range": "stddev: 0.0008840361802224553",
            "extra": "mean: 313.13833479999573 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.424342574188599,
            "unit": "iter/sec",
            "range": "stddev: 0.0019788540735385008",
            "extra": "mean: 702.0782907999973 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8024880309379631,
            "unit": "iter/sec",
            "range": "stddev: 0.016356125251503168",
            "extra": "mean: 1.2461245046000016 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 224.6966434064292,
            "unit": "iter/sec",
            "range": "stddev: 0.000044174296548934606",
            "extra": "mean: 4.450444763392435 msec\nrounds: 224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 59.663081326822635,
            "unit": "iter/sec",
            "range": "stddev: 0.00046280858200791034",
            "extra": "mean: 16.760783683333358 msec\nrounds: 60"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.577777913477243,
            "unit": "iter/sec",
            "range": "stddev: 0.00020889243391543336",
            "extra": "mean: 64.19400800000119 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.035975783219751,
            "unit": "iter/sec",
            "range": "stddev: 0.00038312481700504986",
            "extra": "mean: 142.12669724999927 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.9702437977276617,
            "unit": "iter/sec",
            "range": "stddev: 0.00044303501429299695",
            "extra": "mean: 251.8737011999974 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 164.01981999100065,
            "unit": "iter/sec",
            "range": "stddev: 0.00011868873943263353",
            "extra": "mean: 6.096824152440037 msec\nrounds: 164"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 50.06521711148573,
            "unit": "iter/sec",
            "range": "stddev: 0.00008739722437493682",
            "extra": "mean: 19.973947137254793 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.166222000763227,
            "unit": "iter/sec",
            "range": "stddev: 0.00018271450568647178",
            "extra": "mean: 70.59045100000012 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.540464816351999,
            "unit": "iter/sec",
            "range": "stddev: 0.0016241588340989838",
            "extra": "mean: 152.8943321428581 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.777774805760393,
            "unit": "iter/sec",
            "range": "stddev: 0.001699073033869528",
            "extra": "mean: 264.7060905999979 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.540345636518497,
            "unit": "iter/sec",
            "range": "stddev: 0.00019707539094606573",
            "extra": "mean: 64.3486331249985 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.953916783574046,
            "unit": "iter/sec",
            "range": "stddev: 0.0010209324060940252",
            "extra": "mean: 252.91377000000352 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9990995808852602,
            "unit": "iter/sec",
            "range": "stddev: 0.002679907125451911",
            "extra": "mean: 1.000901230599999 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4344147329651325,
            "unit": "iter/sec",
            "range": "stddev: 0.029805090572488403",
            "extra": "mean: 2.3019477106000066 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24637085623859914,
            "unit": "iter/sec",
            "range": "stddev: 0.050502237080488864",
            "extra": "mean: 4.058921640599993 sec\nrounds: 5"
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
          "id": "56b77786cac1f32fe6befdbb32cbd76cb604faff",
          "message": "Add vector-valued VIE-2 and VIDE solvers (D extension only)\n\n- New extern(C) entry points: volterra_solve_vie2_vec, volterra_solve_vide_vec\n- Compile-time (d≤8) and LAPACK runtime (d>8) implementations\n- Python wrappers: solve_vie2_vec_d, solve_vide_vec_d in _dlang.py\n- solve_VIE_2 and solve_VIDE now dispatch to vector path for 3-D kernels\n- solve_VIDE accepts soln_init_value as scalar or length-d array in vector mode\n- Tests: 4 new vector accuracy tests (VIE-2 diagonal, VIE-2 analytic 2D,\n  VIDE diagonal, VIDE analytic 2D); 63/63 pass\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T16:22:30-05:00",
          "tree_id": "30004992e7201165cdea58f9c89a86c48587324a",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/56b77786cac1f32fe6befdbb32cbd76cb604faff"
        },
        "date": 1772832320433,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.02560550997748,
            "unit": "iter/sec",
            "range": "stddev: 0.00009208664552378655",
            "extra": "mean: 19.989763038461426 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.735572129139847,
            "unit": "iter/sec",
            "range": "stddev: 0.0012153119700847015",
            "extra": "mean: 78.52022585714329 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.267480238183126,
            "unit": "iter/sec",
            "range": "stddev: 0.001974242927997156",
            "extra": "mean: 306.04622740000025 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4589935904873832,
            "unit": "iter/sec",
            "range": "stddev: 0.004649096317097373",
            "extra": "mean: 685.403970599998 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8245771892520956,
            "unit": "iter/sec",
            "range": "stddev: 0.008378701051912253",
            "extra": "mean: 1.2127427401999995 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 229.05899232327525,
            "unit": "iter/sec",
            "range": "stddev: 0.00004797064241967541",
            "extra": "mean: 4.365687589285651 msec\nrounds: 224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.3258854456629,
            "unit": "iter/sec",
            "range": "stddev: 0.00012760849232503868",
            "extra": "mean: 16.306327951612513 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.976024325448021,
            "unit": "iter/sec",
            "range": "stddev: 0.00046872467774561154",
            "extra": "mean: 62.59379552941165 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.175798440059738,
            "unit": "iter/sec",
            "range": "stddev: 0.0002993265288580745",
            "extra": "mean: 139.35731449999798 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.108974669454816,
            "unit": "iter/sec",
            "range": "stddev: 0.0014307030061914464",
            "extra": "mean: 243.36971639999945 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 167.73114392011863,
            "unit": "iter/sec",
            "range": "stddev: 0.00005275029357229545",
            "extra": "mean: 5.961922017751494 msec\nrounds: 169"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.09352052469146,
            "unit": "iter/sec",
            "range": "stddev: 0.00009898270715888347",
            "extra": "mean: 19.571953346153546 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.233535689232754,
            "unit": "iter/sec",
            "range": "stddev: 0.00073982133392698",
            "extra": "mean: 70.25661240000053 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.765517566510781,
            "unit": "iter/sec",
            "range": "stddev: 0.0007919220085163253",
            "extra": "mean: 147.80835171428512 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.892917542084587,
            "unit": "iter/sec",
            "range": "stddev: 0.001886547140837245",
            "extra": "mean: 256.8767483999977 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.653557668825439,
            "unit": "iter/sec",
            "range": "stddev: 0.00019682504842664724",
            "extra": "mean: 63.883241187498996 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.977166596582258,
            "unit": "iter/sec",
            "range": "stddev: 0.0003220386696921075",
            "extra": "mean: 251.4352807999899 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1.0023611127214316,
            "unit": "iter/sec",
            "range": "stddev: 0.0005409975200072668",
            "extra": "mean: 997.6444490000006 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.44501713085879846,
            "unit": "iter/sec",
            "range": "stddev: 0.010874751346277906",
            "extra": "mean: 2.247104506000005 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.25033047065421987,
            "unit": "iter/sec",
            "range": "stddev: 0.009909224563927241",
            "extra": "mean: 3.994719449799999 sec\nrounds: 5"
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
          "id": "a9be842692723573d4a3a9944a4721b3ecdf88b5",
          "message": "Strip debug symbols from .so to reduce size from 101 MB to 46 MB\n\nAdds an automatic strip --strip-unneeded step in meson.build so the\nlibrary is stripped on every build. Keeps the binary well under\nGitHub's 100 MB file size limit.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T16:25:33-05:00",
          "tree_id": "7b1c2f8199a2e068a3403a90de57378e28dec063",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/a9be842692723573d4a3a9944a4721b3ecdf88b5"
        },
        "date": 1772832504935,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.279594721020004,
            "unit": "iter/sec",
            "range": "stddev: 0.00007537039960186503",
            "extra": "mean: 19.888784019612185 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.95572094288128,
            "unit": "iter/sec",
            "range": "stddev: 0.00023205881580463616",
            "extra": "mean: 77.18597864285316 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2754415418028073,
            "unit": "iter/sec",
            "range": "stddev: 0.0008171947171544783",
            "extra": "mean: 305.3023499999938 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4618285193974263,
            "unit": "iter/sec",
            "range": "stddev: 0.0017393568255976407",
            "extra": "mean: 684.0747644000032 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8199562419528051,
            "unit": "iter/sec",
            "range": "stddev: 0.011704733625118865",
            "extra": "mean: 1.2195772760000012 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 224.56139084521686,
            "unit": "iter/sec",
            "range": "stddev: 0.00003406899086636273",
            "extra": "mean: 4.453125251122391 msec\nrounds: 223"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 60.250108829481555,
            "unit": "iter/sec",
            "range": "stddev: 0.000059913979325282165",
            "extra": "mean: 16.597480393440893 msec\nrounds: 61"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.727077564516781,
            "unit": "iter/sec",
            "range": "stddev: 0.0007382507769744995",
            "extra": "mean: 63.58460406249833 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.037339742015589,
            "unit": "iter/sec",
            "range": "stddev: 0.0006174369235628653",
            "extra": "mean: 142.099150625004 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.986695650305289,
            "unit": "iter/sec",
            "range": "stddev: 0.0012253690926886905",
            "extra": "mean: 250.83429680001356 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 165.94964643929293,
            "unit": "iter/sec",
            "range": "stddev: 0.0002579852143083368",
            "extra": "mean: 6.025924257487443 msec\nrounds: 167"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 50.77324693305436,
            "unit": "iter/sec",
            "range": "stddev: 0.00012210542649888716",
            "extra": "mean: 19.695411666670086 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.451386633669822,
            "unit": "iter/sec",
            "range": "stddev: 0.00031579098490052115",
            "extra": "mean: 69.1975119999995 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.737841307878295,
            "unit": "iter/sec",
            "range": "stddev: 0.0008362006789526254",
            "extra": "mean: 148.41548714285378 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.90954908521289,
            "unit": "iter/sec",
            "range": "stddev: 0.001416900386277397",
            "extra": "mean: 255.78397360000054 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.124897823516536,
            "unit": "iter/sec",
            "range": "stddev: 0.00028537218255879945",
            "extra": "mean: 66.11614912499952 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.852942297767475,
            "unit": "iter/sec",
            "range": "stddev: 0.001102302921192679",
            "extra": "mean: 259.5419091999986 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9684696323813847,
            "unit": "iter/sec",
            "range": "stddev: 0.0034158633984481723",
            "extra": "mean: 1.032556898599995 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.42965202403517366,
            "unit": "iter/sec",
            "range": "stddev: 0.004370194294280052",
            "extra": "mean: 2.327464888000003 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24273172326130382,
            "unit": "iter/sec",
            "range": "stddev: 0.008987354042079137",
            "extra": "mean: 4.119774648999988 sec\nrounds: 5"
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
          "id": "948ed8b41e5d2882ae782612959d9eda01df4df8",
          "message": "Add coupled (off-diagonal) vector solver tests for VIE-1, VIE-2, VIDE\n\nEach test is constructed via a similarity transform P=[[1,1],[1,-1]]\napplied to a solvable diagonal system, yielding a fully coupled 2×2\nkernel/a-matrix with exact analytic solutions:\n\n  VIE-1: K̃=[[3/2,-1/2],[-1/2,3/2]], z_exact=[1+2t, 1]         (polynomial)\n  VIE-2: K̃=[[3/2,-1/2],[-1/2,3/2]], z_exact=[t+t², t-t²]      (polynomial)\n  VIDE:  ã=[[0,1],[1,0]], K̃=0,       z_exact=[2cosh(t),2sinh(t)]\n\nThese exercise off-diagonal matrix-vector products in the D solver,\nwhich the earlier diagonal-only tests could not detect. 66/66 pass.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T16:55:01-05:00",
          "tree_id": "5cc046544fdbe0dd9c212e9537212cb0e1023d8f",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/948ed8b41e5d2882ae782612959d9eda01df4df8"
        },
        "date": 1772834271752,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.520053530096064,
            "unit": "iter/sec",
            "range": "stddev: 0.00020671058877694425",
            "extra": "mean: 19.79411996078498 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.957798678445428,
            "unit": "iter/sec",
            "range": "stddev: 0.0002535670913756475",
            "extra": "mean: 77.17360215384763 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2892452699302925,
            "unit": "iter/sec",
            "range": "stddev: 0.0010693024943068167",
            "extra": "mean: 304.0211105999987 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4562309209958124,
            "unit": "iter/sec",
            "range": "stddev: 0.003724504522044378",
            "extra": "mean: 686.7042758000025 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8223198103203405,
            "unit": "iter/sec",
            "range": "stddev: 0.00727433369679828",
            "extra": "mean: 1.2160718828000057 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 231.7708319382487,
            "unit": "iter/sec",
            "range": "stddev: 0.00008907101645241483",
            "extra": "mean: 4.314606767543694 msec\nrounds: 228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 62.025567785742645,
            "unit": "iter/sec",
            "range": "stddev: 0.0000860117254823476",
            "extra": "mean: 16.122383650792838 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.00721576662126,
            "unit": "iter/sec",
            "range": "stddev: 0.0007758151766917578",
            "extra": "mean: 62.47182611764568 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.594876534334616,
            "unit": "iter/sec",
            "range": "stddev: 0.0003603533334591174",
            "extra": "mean: 178.73495400000414 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.139269277939231,
            "unit": "iter/sec",
            "range": "stddev: 0.0014015492985654278",
            "extra": "mean: 241.58853480000175 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 169.1293543873195,
            "unit": "iter/sec",
            "range": "stddev: 0.00003953789091619016",
            "extra": "mean: 5.912634170588278 msec\nrounds: 170"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.26031064182158,
            "unit": "iter/sec",
            "range": "stddev: 0.00019191731138874638",
            "extra": "mean: 19.508270384614743 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.543817006855058,
            "unit": "iter/sec",
            "range": "stddev: 0.00036222054326374444",
            "extra": "mean: 68.75774080000194 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.778314853466493,
            "unit": "iter/sec",
            "range": "stddev: 0.0007752238920104798",
            "extra": "mean: 147.52929328571847 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.9168964673266222,
            "unit": "iter/sec",
            "range": "stddev: 0.0007681839551308654",
            "extra": "mean: 255.3041696000008 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.698196166293565,
            "unit": "iter/sec",
            "range": "stddev: 0.00031414807409826733",
            "extra": "mean: 63.701586437501234 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9567333456082996,
            "unit": "iter/sec",
            "range": "stddev: 0.0013050456347598203",
            "extra": "mean: 252.73373579999543 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1.000503147830435,
            "unit": "iter/sec",
            "range": "stddev: 0.0037232277512988772",
            "extra": "mean: 999.4971051999926 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.443587247536131,
            "unit": "iter/sec",
            "range": "stddev: 0.007908016440561022",
            "extra": "mean: 2.2543479451999984 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.25030343407999983,
            "unit": "iter/sec",
            "range": "stddev: 0.006287937903426192",
            "extra": "mean: 3.9951509402 sec\nrounds: 5"
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
          "id": "35d38690d943de9d11ea674bec56ee8606b292b0",
          "message": "Replace VIDE coupled test with fully non-zero a, K, and g case\n\nPrevious test used K=0 and g=0 with an off-diagonal-only a-matrix.\nNew test uses the same similarity transform P=[[1,1],[1,-1]] applied to\na diagonal VIDE with a_diag=diag(1,2) and K_diag=diag(1,2), giving:\n\n  ã = K̃ = [[3/2,-1/2],[-1/2,3/2]]  (all four entries non-zero)\n  z_exact = [t+t², t-t²]            (polynomial, machine-precision)\n  g̃₀ = 1+t-5t²/2-2t³/3,  g̃₁ = 1-3t+3t²/2+2t³/3\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T16:59:48-05:00",
          "tree_id": "46b4c83fa2944c1ee71f3f5690df442426af6803",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/35d38690d943de9d11ea674bec56ee8606b292b0"
        },
        "date": 1772834552221,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 51.0209638507738,
            "unit": "iter/sec",
            "range": "stddev: 0.000054088737303473545",
            "extra": "mean: 19.599786529411745 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 13.073276260651335,
            "unit": "iter/sec",
            "range": "stddev: 0.0006588665863448066",
            "extra": "mean: 76.49191985714054 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.305922864560059,
            "unit": "iter/sec",
            "range": "stddev: 0.0014443034881593969",
            "extra": "mean: 302.4873963999994 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4594940731049022,
            "unit": "iter/sec",
            "range": "stddev: 0.008955998196588918",
            "extra": "mean: 685.1689352000022 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8295739541514032,
            "unit": "iter/sec",
            "range": "stddev: 0.011260831636737485",
            "extra": "mean: 1.2054380384000012 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 232.5030150463219,
            "unit": "iter/sec",
            "range": "stddev: 0.00003203927145850857",
            "extra": "mean: 4.301019493449444 msec\nrounds: 229"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 62.443198804384885,
            "unit": "iter/sec",
            "range": "stddev: 0.00009241740230045261",
            "extra": "mean: 16.014554333334026 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.147267916178016,
            "unit": "iter/sec",
            "range": "stddev: 0.0007134027146187968",
            "extra": "mean: 61.92998129411699 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 5.648226642896153,
            "unit": "iter/sec",
            "range": "stddev: 0.0003922604253554308",
            "extra": "mean: 177.04671983333262 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.2091325257224583,
            "unit": "iter/sec",
            "range": "stddev: 0.0030668716382907676",
            "extra": "mean: 311.61068980000266 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 169.73206599302233,
            "unit": "iter/sec",
            "range": "stddev: 0.00003760299660352786",
            "extra": "mean: 5.891638649123083 msec\nrounds: 171"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.57610849725498,
            "unit": "iter/sec",
            "range": "stddev: 0.0003345847255923024",
            "extra": "mean: 19.388822250000167 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.624278605907184,
            "unit": "iter/sec",
            "range": "stddev: 0.0004182588481394771",
            "extra": "mean: 68.37944126666666 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.8267541822743,
            "unit": "iter/sec",
            "range": "stddev: 0.0005638096448048964",
            "extra": "mean: 146.48249714285961 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.9348791013236095,
            "unit": "iter/sec",
            "range": "stddev: 0.0002955539183975891",
            "extra": "mean: 254.1374141999995 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.780305311252178,
            "unit": "iter/sec",
            "range": "stddev: 0.00020302367750281303",
            "extra": "mean: 63.37013006249936 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4.0183597248484215,
            "unit": "iter/sec",
            "range": "stddev: 0.0006025296451632039",
            "extra": "mean: 248.85776000000135 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1.0018256886649137,
            "unit": "iter/sec",
            "range": "stddev: 0.0025168138981266725",
            "extra": "mean: 998.1776384000028 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4442272032847153,
            "unit": "iter/sec",
            "range": "stddev: 0.0026727046819548517",
            "extra": "mean: 2.251100321199999 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.25130281406308297,
            "unit": "iter/sec",
            "range": "stddev: 0.01014567206696823",
            "extra": "mean: 3.9792630406000002 sec\nrounds: 5"
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
          "id": "62908f9bdb4f30ec40513324b5eb734b9f8eb224",
          "message": "Add build-wheels.yml to publish platform wheels and sdist to PyPI\n\nBuilds and publishes on v* tags:\n- Linux x86_64 wheel (manylinux_2_31, built in Ubuntu 20.04 Docker)\n- macOS arm64 wheel (macosx_11_0_arm64, macos-latest runner)\n- macOS x86_64 wheel (macosx_10_9_x86_64, macos-13 runner)\n- Windows x64 wheel (win_amd64)\n- Pure-Python sdist (Numba fallback, no D extension)\n\nUses OIDC trusted publishing (no PyPI token needed once configured).\nRequires a Trusted Publisher to be added on pypi.org pointing to this\nworkflow and the 'pypi' environment.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T21:29:14-05:00",
          "tree_id": "8ed8b2ccea2e529dc3b401cf5b3047181fe18d6d",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/62908f9bdb4f30ec40513324b5eb734b9f8eb224"
        },
        "date": 1772850723480,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 49.833745829722616,
            "unit": "iter/sec",
            "range": "stddev: 0.00034876044635558096",
            "extra": "mean: 20.06672352941136 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.857422323713015,
            "unit": "iter/sec",
            "range": "stddev: 0.00032898568437406285",
            "extra": "mean: 77.77608721428513 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.2625247787941003,
            "unit": "iter/sec",
            "range": "stddev: 0.0019819371578878157",
            "extra": "mean: 306.51108200000294 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4525143733792196,
            "unit": "iter/sec",
            "range": "stddev: 0.0023093807561493686",
            "extra": "mean: 688.4613456000011 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8140279102301345,
            "unit": "iter/sec",
            "range": "stddev: 0.009338491081774264",
            "extra": "mean: 1.228459107400002 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 229.5312460213003,
            "unit": "iter/sec",
            "range": "stddev: 0.00003262091905005205",
            "extra": "mean: 4.35670531718022 msec\nrounds: 227"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 61.6871191072858,
            "unit": "iter/sec",
            "range": "stddev: 0.00013305629567108697",
            "extra": "mean: 16.210839709677593 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 16.03317477384843,
            "unit": "iter/sec",
            "range": "stddev: 0.00030568259306416683",
            "extra": "mean: 62.370679176471725 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.204386683330462,
            "unit": "iter/sec",
            "range": "stddev: 0.0005477284970635373",
            "extra": "mean: 138.80432074999584 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.057822025852676,
            "unit": "iter/sec",
            "range": "stddev: 0.002258935386629106",
            "extra": "mean: 246.43761939999536 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 165.79395573837786,
            "unit": "iter/sec",
            "range": "stddev: 0.0002820734032843505",
            "extra": "mean: 6.031582970238044 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.24950809712218,
            "unit": "iter/sec",
            "range": "stddev: 0.00009839357674318255",
            "extra": "mean: 19.512382403845024 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.443194501505399,
            "unit": "iter/sec",
            "range": "stddev: 0.00019684577171331198",
            "extra": "mean: 69.23676060000237 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.764726067669537,
            "unit": "iter/sec",
            "range": "stddev: 0.0005804454576898036",
            "extra": "mean: 147.8256458571577 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.8755107326316294,
            "unit": "iter/sec",
            "range": "stddev: 0.0016401236180075963",
            "extra": "mean: 258.0305072000044 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.610329445924005,
            "unit": "iter/sec",
            "range": "stddev: 0.00045903861280216523",
            "extra": "mean: 64.06014706250218 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9774922464256854,
            "unit": "iter/sec",
            "range": "stddev: 0.000765233027226881",
            "extra": "mean: 251.4146950000054 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9930237022432314,
            "unit": "iter/sec",
            "range": "stddev: 0.0041610259967256764",
            "extra": "mean: 1.0070253084 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.43649435230830724,
            "unit": "iter/sec",
            "range": "stddev: 0.020897617690249923",
            "extra": "mean: 2.290980386599995 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.24594787164944715,
            "unit": "iter/sec",
            "range": "stddev: 0.014387702763134304",
            "extra": "mean: 4.0659022308000035 sec\nrounds: 5"
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
          "id": "308a4f2c36cbb764c29662fc82a281e6976af37a",
          "message": "Add vector solver benchmarks, charts, and README section\n\n- bench_solvers.py: add d=2 benchmarks for VIE-1 vec, VIE-2 vec, VIDE vec\n  (5 problem sizes each, skipped if D extension unavailable)\n- plot_results.py: refactored to generate both results.png (scalar) and\n  results_vec.png (vector) from a single benchmark JSON run\n- bench.yml: commit both chart files on benchmark runs\n- README.md: add Vector-valued systems section with 2x2 VIE-2 example\n  and reference both benchmark charts\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T21:42:46-05:00",
          "tree_id": "79966203b677ed23dc3880eb76ebe31fc2689a22",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/308a4f2c36cbb764c29662fc82a281e6976af37a"
        },
        "date": 1772851531969,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 50.69123909144118,
            "unit": "iter/sec",
            "range": "stddev: 0.00012880892235221653",
            "extra": "mean: 19.727274730769842 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.946019061993164,
            "unit": "iter/sec",
            "range": "stddev: 0.0007480150556908196",
            "extra": "mean: 77.24382261538555 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.267465737524264,
            "unit": "iter/sec",
            "range": "stddev: 0.0075626003588912544",
            "extra": "mean: 306.04758559999254 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.4675227822022894,
            "unit": "iter/sec",
            "range": "stddev: 0.004196879077716006",
            "extra": "mean: 681.4204264000011 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.8197171291834003,
            "unit": "iter/sec",
            "range": "stddev: 0.01677389972115742",
            "extra": "mean: 1.2199330285999963 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 229.11316000685684,
            "unit": "iter/sec",
            "range": "stddev: 0.00003602140100143074",
            "extra": "mean: 4.364655439129172 msec\nrounds: 230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 62.11452263361946,
            "unit": "iter/sec",
            "range": "stddev: 0.00005681263555022612",
            "extra": "mean: 16.09929461904534 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 12.529374286739191,
            "unit": "iter/sec",
            "range": "stddev: 0.0003672920912889354",
            "extra": "mean: 79.81244530769406 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 7.086488360857971,
            "unit": "iter/sec",
            "range": "stddev: 0.0006586782492174973",
            "extra": "mean: 141.11361637499797 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4.133393804113128,
            "unit": "iter/sec",
            "range": "stddev: 0.0007719504126782855",
            "extra": "mean: 241.93194439999957 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 168.0896860999804,
            "unit": "iter/sec",
            "range": "stddev: 0.00031617153851933835",
            "extra": "mean: 5.949204994083908 msec\nrounds: 169"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 51.559651701072276,
            "unit": "iter/sec",
            "range": "stddev: 0.00010941704316664712",
            "extra": "mean: 19.39501076922913 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 14.625453043518743,
            "unit": "iter/sec",
            "range": "stddev: 0.00015147563134873673",
            "extra": "mean: 68.37395033332996 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.811408633051041,
            "unit": "iter/sec",
            "range": "stddev: 0.0009496039523162876",
            "extra": "mean: 146.81251028571296 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.866345062950191,
            "unit": "iter/sec",
            "range": "stddev: 0.00838340288650599",
            "extra": "mean: 258.64220180000075 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.75964835788136,
            "unit": "iter/sec",
            "range": "stddev: 0.00027237575379344606",
            "extra": "mean: 63.45319243750147 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.9662206631964763,
            "unit": "iter/sec",
            "range": "stddev: 0.0003830088575924139",
            "extra": "mean: 252.1291891999965 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1.0028143390760171,
            "unit": "iter/sec",
            "range": "stddev: 0.0014383856329801756",
            "extra": "mean: 997.1935591999909 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.44229979740090763,
            "unit": "iter/sec",
            "range": "stddev: 0.006052430469494395",
            "extra": "mean: 2.260909920999995 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.25038801467581856,
            "unit": "iter/sec",
            "range": "stddev: 0.017312972891944684",
            "extra": "mean: 3.9938013858000203 sec\nrounds: 5"
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
          "id": "d6daa5e77f968617c78e00794e08e667cf64d99b",
          "message": "Add VIE-1 continuous vector benchmark and switch vector chart to 2x2 layout\n\n- bench_solvers.py: add test_vie1_vec_fc_* (force_continuous=True, d=2, 5 sizes)\n- plot_results.py: vector chart now uses 2x2 grid (matching scalar layout):\n  VIE-1 vec, VIE-1 continuous vec, VIE-2 vec, VIDE vec\n- Regenerate both benchmark charts\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-06T21:52:01-05:00",
          "tree_id": "cc13abfb16bddc8d1990bb5fee7804c67242dd52",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/d6daa5e77f968617c78e00794e08e667cf64d99b"
        },
        "date": 1772852093811,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 47.405286617078886,
            "unit": "iter/sec",
            "range": "stddev: 0.0004980105341143512",
            "extra": "mean: 21.09469368000248 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 12.181103546457253,
            "unit": "iter/sec",
            "range": "stddev: 0.00014057669072400033",
            "extra": "mean: 82.09436823076999 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3.0556768766224165,
            "unit": "iter/sec",
            "range": "stddev: 0.004479833861015599",
            "extra": "mean: 327.2597334000011 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1.3715451420440754,
            "unit": "iter/sec",
            "range": "stddev: 0.013820472966812474",
            "extra": "mean: 729.1046932000029 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 0.7772999866419781,
            "unit": "iter/sec",
            "range": "stddev: 0.007490638687001419",
            "extra": "mean: 1.2865045891999956 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 219.32918001260663,
            "unit": "iter/sec",
            "range": "stddev: 0.00004703414957723281",
            "extra": "mean: 4.559356853212701 msec\nrounds: 218"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 58.43402692707114,
            "unit": "iter/sec",
            "range": "stddev: 0.0008067640361888794",
            "extra": "mean: 17.11331654838806 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 15.391615743049426,
            "unit": "iter/sec",
            "range": "stddev: 0.00031064512990553616",
            "extra": "mean: 64.97043693749838 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 6.933086928651059,
            "unit": "iter/sec",
            "range": "stddev: 0.0002229456773517453",
            "extra": "mean: 144.2358952499916 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3.1103312404794803,
            "unit": "iter/sec",
            "range": "stddev: 0.0005378370301896817",
            "extra": "mean: 321.50916500000903 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 160.91761349720136,
            "unit": "iter/sec",
            "range": "stddev: 0.00005876766852653808",
            "extra": "mean: 6.214360120481103 msec\nrounds: 166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 49.29582675498056,
            "unit": "iter/sec",
            "range": "stddev: 0.00018855543024035113",
            "extra": "mean: 20.285692843136378 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 13.94594083354739,
            "unit": "iter/sec",
            "range": "stddev: 0.0008006124278617916",
            "extra": "mean: 71.7054526428557 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 6.4601896772971665,
            "unit": "iter/sec",
            "range": "stddev: 0.0003362708743622842",
            "extra": "mean: 154.79421657142163 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3.7769977323978714,
            "unit": "iter/sec",
            "range": "stddev: 0.005362743327993493",
            "extra": "mean: 264.76055079999696 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 15.339060131168265,
            "unit": "iter/sec",
            "range": "stddev: 0.0001964350122281088",
            "extra": "mean: 65.19304256250003 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3.900609541856134,
            "unit": "iter/sec",
            "range": "stddev: 0.0004171213875246679",
            "extra": "mean: 256.3701875999982 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 0.9397745403139555,
            "unit": "iter/sec",
            "range": "stddev: 0.004994969993732361",
            "extra": "mean: 1.0640850088000093 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 0.4263322878730835,
            "unit": "iter/sec",
            "range": "stddev: 0.036849758353909065",
            "extra": "mean: 2.345588238199997 sec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 0.2400268338901447,
            "unit": "iter/sec",
            "range": "stddev: 0.056042981321667205",
            "extra": "mean: 4.166200852600002 sec\nrounds: 5"
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
          "id": "a7ccd223bf35c7b2011aa26b9c71c71fcc5ea01b",
          "message": "Fix bench CI: remove volterra_dlang.so before gh-pages branch switch\n\nThe github-action-benchmark action switches to the gh-pages branch to\nstore JSON results, but git refused because volterra_dlang.so (untracked,\ngitignored) was present in the working tree and would be overwritten.\nThis caused every bench run to fail before the chart-generation steps.\n\nRemoving the .so after benchmarks have run (it is no longer needed) lets\nthe branch switch succeed.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-07T10:52:17-05:00",
          "tree_id": "1207628706be01a59b609523e54700c3c5ae5215",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/a7ccd223bf35c7b2011aa26b9c71c71fcc5ea01b"
        },
        "date": 1772899163531,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16412.96139596808,
            "unit": "iter/sec",
            "range": "stddev: 0.00008196419878693397",
            "extra": "mean: 60.92745701855209 usec\nrounds: 9853"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6315.680876378824,
            "unit": "iter/sec",
            "range": "stddev: 0.000014516487818022076",
            "extra": "mean: 158.33605585426014 usec\nrounds: 5944"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1873.9297305308132,
            "unit": "iter/sec",
            "range": "stddev: 0.00001696359973332409",
            "extra": "mean: 533.6379394102136 usec\nrounds: 1865"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 870.5202591716845,
            "unit": "iter/sec",
            "range": "stddev: 0.000027691880554163083",
            "extra": "mean: 1.1487383429209537 msec\nrounds: 869"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 502.4845378420015,
            "unit": "iter/sec",
            "range": "stddev: 0.000026152139005293597",
            "extra": "mean: 1.99011098788165 msec\nrounds: 495"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30464.131839280806,
            "unit": "iter/sec",
            "range": "stddev: 0.000010484887119625011",
            "extra": "mean: 32.82548819298991 usec\nrounds: 17405"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17882.66615963977,
            "unit": "iter/sec",
            "range": "stddev: 0.000012136583052015013",
            "extra": "mean: 55.92007316319235 usec\nrounds: 16060"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7241.259519367533,
            "unit": "iter/sec",
            "range": "stddev: 0.00001717842302642613",
            "extra": "mean: 138.0975225822789 usec\nrounds: 7019"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3757.17900283908,
            "unit": "iter/sec",
            "range": "stddev: 0.00001490943409880702",
            "extra": "mean: 266.1571352454484 usec\nrounds: 3697"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2238.4678970961145,
            "unit": "iter/sec",
            "range": "stddev: 0.00001939842737558347",
            "extra": "mean: 446.7341261839246 usec\nrounds: 2219"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 25397.69328497506,
            "unit": "iter/sec",
            "range": "stddev: 0.000011068026293963261",
            "extra": "mean: 39.37365448032978 usec\nrounds: 20242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14427.873013547995,
            "unit": "iter/sec",
            "range": "stddev: 0.000013031575548486236",
            "extra": "mean: 69.31028565755913 usec\nrounds: 12494"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6079.708177351498,
            "unit": "iter/sec",
            "range": "stddev: 0.000015909266513236552",
            "extra": "mean: 164.48157885690327 usec\nrounds: 5865"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3265.7767987897146,
            "unit": "iter/sec",
            "range": "stddev: 0.0000175635402447773",
            "extra": "mean: 306.2058620695072 usec\nrounds: 3190"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2006.4683840795776,
            "unit": "iter/sec",
            "range": "stddev: 0.000023077529481966",
            "extra": "mean: 498.38811711888883 usec\nrounds: 1998"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1763.371268903989,
            "unit": "iter/sec",
            "range": "stddev: 0.00001725521341744154",
            "extra": "mean: 567.0955502306346 usec\nrounds: 1732"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 699.0064413838874,
            "unit": "iter/sec",
            "range": "stddev: 0.000020358135212841578",
            "extra": "mean: 1.430601981321099 msec\nrounds: 696"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.67303497185017,
            "unit": "iter/sec",
            "range": "stddev: 0.000030780013627403554",
            "extra": "mean: 4.120770979420928 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 123.25985440314967,
            "unit": "iter/sec",
            "range": "stddev: 0.000049011705404354905",
            "extra": "mean: 8.112941596777082 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.51789211497618,
            "unit": "iter/sec",
            "range": "stddev: 0.00009587610878468008",
            "extra": "mean: 13.419595906672537 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10818.14272880202,
            "unit": "iter/sec",
            "range": "stddev: 0.00001724181317492849",
            "extra": "mean: 92.43730879401495 usec\nrounds: 8517"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4334.9180220404405,
            "unit": "iter/sec",
            "range": "stddev: 0.000015757961404674734",
            "extra": "mean: 230.6848699134802 usec\nrounds: 4251"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1296.0980273893854,
            "unit": "iter/sec",
            "range": "stddev: 0.00010344818694318491",
            "extra": "mean: 771.5465797091064 usec\nrounds: 1311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 628.5948565922225,
            "unit": "iter/sec",
            "range": "stddev: 0.000031560038355500893",
            "extra": "mean: 1.5908497969920752 msec\nrounds: 532"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 359.39221206319854,
            "unit": "iter/sec",
            "range": "stddev: 0.00014811247745779446",
            "extra": "mean: 2.7824754305587223 msec\nrounds: 360"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9623.040420188152,
            "unit": "iter/sec",
            "range": "stddev: 0.00001573439726735584",
            "extra": "mean: 103.9172606925876 usec\nrounds: 8604"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4015.629076338751,
            "unit": "iter/sec",
            "range": "stddev: 0.000018141402894254778",
            "extra": "mean: 249.026984561968 usec\nrounds: 3951"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1270.4062405256832,
            "unit": "iter/sec",
            "range": "stddev: 0.000055099950000354874",
            "extra": "mean: 787.1497857143779 usec\nrounds: 1260"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 611.1491427661098,
            "unit": "iter/sec",
            "range": "stddev: 0.000028115517382015476",
            "extra": "mean: 1.6362618058726555 msec\nrounds: 613"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 352.4736200397393,
            "unit": "iter/sec",
            "range": "stddev: 0.0001673253116406321",
            "extra": "mean: 2.8370917513976113 msec\nrounds: 358"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3840.029808147603,
            "unit": "iter/sec",
            "range": "stddev: 0.000016734796828217645",
            "extra": "mean: 260.4146451879735 usec\nrounds: 3678"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1132.6777028949464,
            "unit": "iter/sec",
            "range": "stddev: 0.000023716720723556378",
            "extra": "mean: 882.863675557625 usec\nrounds: 1125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 296.5388520182437,
            "unit": "iter/sec",
            "range": "stddev: 0.000036075840841730765",
            "extra": "mean: 3.372239398628541 msec\nrounds: 291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 133.30146910932544,
            "unit": "iter/sec",
            "range": "stddev: 0.00007117260132093181",
            "extra": "mean: 7.50179279104466 msec\nrounds: 134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.36090246951244,
            "unit": "iter/sec",
            "range": "stddev: 0.00016170970736987088",
            "extra": "mean: 13.269480157891609 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1011.1960306096848,
            "unit": "iter/sec",
            "range": "stddev: 0.00002226439498184811",
            "extra": "mean: 988.9279325958842 usec\nrounds: 994"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 313.4720688736006,
            "unit": "iter/sec",
            "range": "stddev: 0.00002931023327720682",
            "extra": "mean: 3.1900768817882263 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.85155731337487,
            "unit": "iter/sec",
            "range": "stddev: 0.0000592362431852309",
            "extra": "mean: 11.513898321843945 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.991140694323335,
            "unit": "iter/sec",
            "range": "stddev: 0.00010969825338515694",
            "extra": "mean: 25.00553829268361 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.94069882118661,
            "unit": "iter/sec",
            "range": "stddev: 0.0001594142048804791",
            "extra": "mean: 43.59065117390677 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}