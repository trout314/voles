window.BENCHMARK_DATA = {
  "lastUpdate": 1772732860858,
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
      }
    ]
  }
}