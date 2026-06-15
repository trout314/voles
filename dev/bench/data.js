window.BENCHMARK_DATA = {
  "lastUpdate": 1781543078052,
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
          "id": "ab0a2f6bb6c3b5dbf760e38d5f23cdef78cad8b2",
          "message": "Docs + non-uniform mesh stress tests + W builder perf fix - phase 6\n\nDocs: API reference pages for function_solve_VIE_1, function_solve_VIE_2,\nfunction_solve_VIDE, and optimal_graded_mesh. A new examples page walks\nthrough callable inputs with arbitrary mesh, weakly singular kernels\nwith optimal graded mesh, and vector-valued kernels. Updated index.md\nand mkdocs.yml navigation to surface the new family alongside the\nexisting array-based solvers.\n\nStress tests (7 new): extreme width ratio (~500x within one mesh),\n500-interval meshes for all three solvers, strong-grading on Abel,\nsingle-long-interval edge, long-time-domain solve to t=50.\n\nPerf fix in the W tensor builder, prompted by the new stress tests\ntiming out at 360s:\n\n1. Cache numpy.polynomial.legendre.leggauss via functools.lru_cache --\n   the nodes/weights were being recomputed in every GL call, and that\n   was the dominant cost.\n2. Detect once per W build whether the user's kernel broadcasts over\n   a numpy array of u values (_detect_kernel_vectorized). When it does\n   the integrand is invoked as a single numpy call on the array of GL\n   nodes instead of a Python for-loop. When it doesn't, fall back to\n   the scalar loop transparently.\n\nResult: M=500 stress runs go from >360s (timeout) to ~18s. Full suite\n226 passed, 6 skipped, in 45s.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-15T12:59:05-04:00",
          "tree_id": "3d6bee394154c61fa2a7f10017767bc9fefeacfc",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/ab0a2f6bb6c3b5dbf760e38d5f23cdef78cad8b2"
        },
        "date": 1781543077215,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15722.06901015984,
            "unit": "iter/sec",
            "range": "stddev: 0.00012062943893395641",
            "extra": "mean: 63.60486010802935 usec\nrounds: 11130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6174.06248118426,
            "unit": "iter/sec",
            "range": "stddev: 0.00001930053040006932",
            "extra": "mean: 161.96791060141456 usec\nrounds: 6018"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1852.0909227330662,
            "unit": "iter/sec",
            "range": "stddev: 0.000026284209965178867",
            "extra": "mean: 539.9302959297132 usec\nrounds: 1818"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 863.2832285523559,
            "unit": "iter/sec",
            "range": "stddev: 0.00006379542541531096",
            "extra": "mean: 1.1583683858620826 msec\nrounds: 863"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 499.54772447728726,
            "unit": "iter/sec",
            "range": "stddev: 0.00003602602891582619",
            "extra": "mean: 2.001810739997609 msec\nrounds: 500"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28264.687951908112,
            "unit": "iter/sec",
            "range": "stddev: 0.000011298752292311725",
            "extra": "mean: 35.37983513921976 usec\nrounds: 15874"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17114.23595376658,
            "unit": "iter/sec",
            "range": "stddev: 0.000013946474060807965",
            "extra": "mean: 58.43088775341533 usec\nrounds: 15172"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7081.981536171051,
            "unit": "iter/sec",
            "range": "stddev: 0.000020989547385633543",
            "extra": "mean: 141.2034181242247 usec\nrounds: 5948"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3681.59850053529,
            "unit": "iter/sec",
            "range": "stddev: 0.00002190048542622817",
            "extra": "mean: 271.6211449604306 usec\nrounds: 3601"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2221.853861570182,
            "unit": "iter/sec",
            "range": "stddev: 0.00002548761099054477",
            "extra": "mean: 450.07460539880014 usec\nrounds: 2149"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22052.70752572726,
            "unit": "iter/sec",
            "range": "stddev: 0.000012961334506680105",
            "extra": "mean: 45.34590588631234 usec\nrounds: 16597"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13256.71932990731,
            "unit": "iter/sec",
            "range": "stddev: 0.000015346941947452944",
            "extra": "mean: 75.43344436236112 usec\nrounds: 12051"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5812.398621693423,
            "unit": "iter/sec",
            "range": "stddev: 0.00002083076740826068",
            "extra": "mean: 172.04601148099738 usec\nrounds: 5662"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3163.8130936208327,
            "unit": "iter/sec",
            "range": "stddev: 0.00002446758683154604",
            "extra": "mean: 316.0742971878746 usec\nrounds: 2951"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1971.960307781732,
            "unit": "iter/sec",
            "range": "stddev: 0.000027410368754099396",
            "extra": "mean: 507.1095985318818 usec\nrounds: 1908"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1699.2516132092057,
            "unit": "iter/sec",
            "range": "stddev: 0.00003846305857602556",
            "extra": "mean: 588.4943655350726 usec\nrounds: 1532"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 694.4583942402877,
            "unit": "iter/sec",
            "range": "stddev: 0.000035569559683658297",
            "extra": "mean: 1.4399710742843908 msec\nrounds: 700"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 240.27772196680868,
            "unit": "iter/sec",
            "range": "stddev: 0.0000526602711828069",
            "extra": "mean: 4.161850677684289 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 122.37328869757035,
            "unit": "iter/sec",
            "range": "stddev: 0.00035218852646942293",
            "extra": "mean: 8.171717951221936 msec\nrounds: 123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.07167443744845,
            "unit": "iter/sec",
            "range": "stddev: 0.00017786620101563073",
            "extra": "mean: 13.320603376620092 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10243.271738332069,
            "unit": "iter/sec",
            "range": "stddev: 0.000018809336395108918",
            "extra": "mean: 97.62505823777276 usec\nrounds: 7933"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4141.509621035804,
            "unit": "iter/sec",
            "range": "stddev: 0.000020890004154881986",
            "extra": "mean: 241.45784786318978 usec\nrounds: 4095"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1287.71513593426,
            "unit": "iter/sec",
            "range": "stddev: 0.00002989944929299073",
            "extra": "mean: 776.5692676078413 usec\nrounds: 1278"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 613.4424308534235,
            "unit": "iter/sec",
            "range": "stddev: 0.0000291977795599131",
            "extra": "mean: 1.6301448183308678 msec\nrounds: 611"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 350.88853863875994,
            "unit": "iter/sec",
            "range": "stddev: 0.0001912107080941035",
            "extra": "mean: 2.849907847886422 msec\nrounds: 355"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9614.86081917698,
            "unit": "iter/sec",
            "range": "stddev: 0.000017592604748433317",
            "extra": "mean: 104.00566568841907 usec\nrounds: 8181"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3924.0734884469916,
            "unit": "iter/sec",
            "range": "stddev: 0.000020407409673515732",
            "extra": "mean: 254.83722538431977 usec\nrounds: 3758"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1248.728124169943,
            "unit": "iter/sec",
            "range": "stddev: 0.000028225800499888847",
            "extra": "mean: 800.814829620917 usec\nrounds: 1256"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 598.9443290071699,
            "unit": "iter/sec",
            "range": "stddev: 0.000037248828392924115",
            "extra": "mean: 1.6696042546352068 msec\nrounds: 593"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 341.73381398131767,
            "unit": "iter/sec",
            "range": "stddev: 0.0002443052905824805",
            "extra": "mean: 2.9262541752882236 msec\nrounds: 348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3923.9798805384567,
            "unit": "iter/sec",
            "range": "stddev: 0.000020470523660689856",
            "extra": "mean: 254.8433046152056 usec\nrounds: 3575"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1117.9023200186698,
            "unit": "iter/sec",
            "range": "stddev: 0.00002626273825719942",
            "extra": "mean: 894.5325383914574 usec\nrounds: 1107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 291.89857036749146,
            "unit": "iter/sec",
            "range": "stddev: 0.00005509502081372839",
            "extra": "mean: 3.4258475426619266 msec\nrounds: 293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 131.4311487706893,
            "unit": "iter/sec",
            "range": "stddev: 0.000046991883873175637",
            "extra": "mean: 7.608546446966853 msec\nrounds: 132"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.80933337724436,
            "unit": "iter/sec",
            "range": "stddev: 0.0001266959203329572",
            "extra": "mean: 13.367316013327581 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 979.4061622822668,
            "unit": "iter/sec",
            "range": "stddev: 0.00002930287197743955",
            "extra": "mean: 1.021026861490992 msec\nrounds: 953"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 296.631314862741,
            "unit": "iter/sec",
            "range": "stddev: 0.00003644600368587895",
            "extra": "mean: 3.3711882390526635 msec\nrounds: 297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 82.1607103506124,
            "unit": "iter/sec",
            "range": "stddev: 0.00008323155375282075",
            "extra": "mean: 12.171267698789393 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 37.58524531453484,
            "unit": "iter/sec",
            "range": "stddev: 0.00013334948001290914",
            "extra": "mean: 26.60618526316452 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.55267662002005,
            "unit": "iter/sec",
            "range": "stddev: 0.0002377563312787481",
            "extra": "mean: 46.39794943478671 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}