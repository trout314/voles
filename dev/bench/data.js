window.BENCHMARK_DATA = {
  "lastUpdate": 1781541884774,
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
          "id": "2319ba4b48e270466e6c4d94388b123fc2876ae7",
          "message": "Add optimal_graded_mesh helper + foot-gun warning, expose new solvers - phase 5\n\nThree deliverables to round out the singular-kernel story:\n\n1. optimal_graded_mesh(*, alpha, T, M, coll_choices) returns the\n   Brunner-graded mesh t_n = T * (n/M)^r with r = p / (1 - alpha) where\n   p = len(coll_choices). This is the grading that recovers the full\n   polynomial-order convergence rate for Abel-type kernels.\n\n2. A foot-gun warning fired from all three solvers when\n   kernel_singularity is declared but the mesh's max/min interval ratio\n   is below 1.5 (i.e. ~uniform). Points the user at optimal_graded_mesh.\n\n3. function_solve_VIE_1, function_solve_VIE_2, function_solve_VIDE,\n   and optimal_graded_mesh are now exported at the package level\n   alongside the existing solve_* trio.\n\nTests (15 new): mesh shape / monotonicity / grading-with-alpha /\nalpha=0-is-uniform / validation; graded vs uniform recovery on VIE-2,\nVIE-1, VIDE Abel problems; warning fires only when both\nkernel_singularity is set AND the mesh is ~uniform; undeclared-\nsingularity loud-failure for VIE-1 and VIDE (parity with VIE-2);\nformal Abel convergence with the optimal graded mesh; package-level\nexport smoke test.\n\nAlso fixed the Beta-function exponent in the new vide_callable_abel\nfixture (a+b+1 = 2, not 3) -- caught by the convergence test refusing\nto improve with M.\n\nFull suite: 219 passed, 6 skipped.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-15T12:37:00-04:00",
          "tree_id": "1245a62d55e0e5a0def8dd0eeff3f9e3d27b2713",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/2319ba4b48e270466e6c4d94388b123fc2876ae7"
        },
        "date": 1781541883533,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15911.594451910234,
            "unit": "iter/sec",
            "range": "stddev: 0.00007814548445816226",
            "extra": "mean: 62.84725286471508 usec\nrounds: 11433"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6215.17675880439,
            "unit": "iter/sec",
            "range": "stddev: 0.000017149337740110443",
            "extra": "mean: 160.8964698523505 usec\nrounds: 5987"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1861.4369985599055,
            "unit": "iter/sec",
            "range": "stddev: 0.00001907632119602968",
            "extra": "mean: 537.2193637354617 usec\nrounds: 1853"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 867.2674028821143,
            "unit": "iter/sec",
            "range": "stddev: 0.000030073154801517055",
            "extra": "mean: 1.1530469111104453 msec\nrounds: 855"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 499.22869876349836,
            "unit": "iter/sec",
            "range": "stddev: 0.00003052541390119301",
            "extra": "mean: 2.0030899715437513 msec\nrounds: 492"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28979.665811731862,
            "unit": "iter/sec",
            "range": "stddev: 0.000010866165945332658",
            "extra": "mean: 34.506954169056336 usec\nrounds: 17521"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17299.995344650128,
            "unit": "iter/sec",
            "range": "stddev: 0.000012871976506742074",
            "extra": "mean: 57.80348376274224 usec\nrounds: 11609"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7040.104046264956,
            "unit": "iter/sec",
            "range": "stddev: 0.000020923933653220572",
            "extra": "mean: 142.0433552442365 usec\nrounds: 6846"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3714.137457129496,
            "unit": "iter/sec",
            "range": "stddev: 0.000017087994489446926",
            "extra": "mean: 269.24151611040776 usec\nrounds: 3662"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2235.204202464911,
            "unit": "iter/sec",
            "range": "stddev: 0.00002050279764634563",
            "extra": "mean: 447.38641726658904 usec\nrounds: 2224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22623.472477001524,
            "unit": "iter/sec",
            "range": "stddev: 0.000012441068000868793",
            "extra": "mean: 44.20187930993246 usec\nrounds: 16737"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13323.032552552682,
            "unit": "iter/sec",
            "range": "stddev: 0.000013874944251138942",
            "extra": "mean: 75.0579866900048 usec\nrounds: 11946"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5872.210963006087,
            "unit": "iter/sec",
            "range": "stddev: 0.00001789311516912699",
            "extra": "mean: 170.29360939173117 usec\nrounds: 5686"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3172.6829892167216,
            "unit": "iter/sec",
            "range": "stddev: 0.000022734794030267504",
            "extra": "mean: 315.19064570862844 usec\nrounds: 3006"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1963.543637820499,
            "unit": "iter/sec",
            "range": "stddev: 0.00002840809874935139",
            "extra": "mean: 509.2833083709733 usec\nrounds: 1923"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1736.5524989767614,
            "unit": "iter/sec",
            "range": "stddev: 0.00002099595249942004",
            "extra": "mean: 575.8535953213252 usec\nrounds: 1710"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 695.2119131040715,
            "unit": "iter/sec",
            "range": "stddev: 0.000024365062535524564",
            "extra": "mean: 1.4384103338147234 msec\nrounds: 695"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.53845781857905,
            "unit": "iter/sec",
            "range": "stddev: 0.00003525064863627285",
            "extra": "mean: 4.1230574688819415 msec\nrounds: 241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 123.67460045541792,
            "unit": "iter/sec",
            "range": "stddev: 0.00020097475325113137",
            "extra": "mean: 8.085734631990817 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.4367241351212,
            "unit": "iter/sec",
            "range": "stddev: 0.0007121862167587457",
            "extra": "mean: 13.43422902631705 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10303.719238955931,
            "unit": "iter/sec",
            "range": "stddev: 0.000015035550198085765",
            "extra": "mean: 97.052333900873 usec\nrounds: 8224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4118.029153447555,
            "unit": "iter/sec",
            "range": "stddev: 0.000019773315336957892",
            "extra": "mean: 242.83460916317566 usec\nrounds: 3994"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1260.4806879271277,
            "unit": "iter/sec",
            "range": "stddev: 0.00007031940727060967",
            "extra": "mean: 793.3481326433563 usec\nrounds: 1259"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 599.0293022713646,
            "unit": "iter/sec",
            "range": "stddev: 0.00011332039994529384",
            "extra": "mean: 1.6693674186024923 msec\nrounds: 602"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 350.0662200618905,
            "unit": "iter/sec",
            "range": "stddev: 0.00006725937020738904",
            "extra": "mean: 2.8566023874660162 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9551.42323633329,
            "unit": "iter/sec",
            "range": "stddev: 0.000016441583716082327",
            "extra": "mean: 104.69643897634374 usec\nrounds: 8595"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3884.184816322516,
            "unit": "iter/sec",
            "range": "stddev: 0.000021767567594595904",
            "extra": "mean: 257.4542786423804 usec\nrounds: 3858"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1236.499660276268,
            "unit": "iter/sec",
            "range": "stddev: 0.00002484869153711624",
            "extra": "mean: 808.7345529691229 usec\nrounds: 1246"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 580.3430053393394,
            "unit": "iter/sec",
            "range": "stddev: 0.00014107733103322623",
            "extra": "mean: 1.7231188983061456 msec\nrounds: 590"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 344.3783523100129,
            "unit": "iter/sec",
            "range": "stddev: 0.000049544077256830326",
            "extra": "mean: 2.903782985464167 msec\nrounds: 344"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3922.0011460495894,
            "unit": "iter/sec",
            "range": "stddev: 0.000024108362487273596",
            "extra": "mean: 254.9718785797 usec\nrounds: 2166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1119.157072372915,
            "unit": "iter/sec",
            "range": "stddev: 0.000022033972800893697",
            "extra": "mean: 893.5296257206596 usec\nrounds: 1042"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.3471826897706,
            "unit": "iter/sec",
            "range": "stddev: 0.00004550727224139415",
            "extra": "mean: 3.3973486372857775 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 131.43171537114569,
            "unit": "iter/sec",
            "range": "stddev: 0.00039673566432879266",
            "extra": "mean: 7.6085136466197145 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.91111958247697,
            "unit": "iter/sec",
            "range": "stddev: 0.00010645093939344274",
            "extra": "mean: 13.52976393334302 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1017.9964224566503,
            "unit": "iter/sec",
            "range": "stddev: 0.0000241178772882583",
            "extra": "mean: 982.321723279517 usec\nrounds: 1001"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 309.8561185293854,
            "unit": "iter/sec",
            "range": "stddev: 0.00007757934250560367",
            "extra": "mean: 3.2273043525689307 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 85.23926868469142,
            "unit": "iter/sec",
            "range": "stddev: 0.0007182036008223968",
            "extra": "mean: 11.731682068966359 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.58305658386817,
            "unit": "iter/sec",
            "range": "stddev: 0.0005014067927098366",
            "extra": "mean: 25.263334524993297 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.57370421897672,
            "unit": "iter/sec",
            "range": "stddev: 0.00010134667474437049",
            "extra": "mean: 44.299331217396926 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}