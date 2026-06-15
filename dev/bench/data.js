window.BENCHMARK_DATA = {
  "lastUpdate": 1781537661103,
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
          "id": "b698f4c78fcc0d035099fe2631616b850bfd2e8f",
          "message": "Port function_solve_VIE_2 per-step solve to D\n\nReplace the Python solve scaffold with a templated D entry point. The\nweight tensor W and g samples are still built in Python (scipy.quad +\nGauss-Legendre); D handles the hot loop -- per-step assembly of the\np*p diagonal block and a stack-allocated LU solve via the existing\nlin_solve!p template.\n\nDispatch on p (the number of collocation nodes per interval) at the\nextern(C) boundary via static foreach over p in 1..MAX_FUNCTION_P=5,\neach generating a fully unrolled specialization.\n\nThe Python slow-solver scaffold (`_solve_VIE_2_slow`) is removed; the\nD extension is now mandatory for the callable-input solvers (matching\nthe existing array-based path).\n\nMicrobenchmark on a smooth M=40, p=3 problem: per-step solve is ~31x\nfaster than the Python reference (928 us -> 30 us). Total runtime is\nstill dominated by the W-building stage, which is one-shot setup and\namortizes across reuse (future feature).\n\nAll 163 tests pass (39 function-solver + 124 array-solver + 6 numba\nskips).\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-15T11:26:39-04:00",
          "tree_id": "ce8ae81dc4cb29f47a62fa60a93cacaacb047113",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/b698f4c78fcc0d035099fe2631616b850bfd2e8f"
        },
        "date": 1781537660184,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15698.961873770559,
            "unit": "iter/sec",
            "range": "stddev: 0.00008549479498386477",
            "extra": "mean: 63.698479430717995 usec\nrounds: 10258"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6170.583835395167,
            "unit": "iter/sec",
            "range": "stddev: 0.000016701764389995793",
            "extra": "mean: 162.05921946378672 usec\nrounds: 6042"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1855.1599458817052,
            "unit": "iter/sec",
            "range": "stddev: 0.00002076761908389902",
            "extra": "mean: 539.0370799131977 usec\nrounds: 1852"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 864.2221882040077,
            "unit": "iter/sec",
            "range": "stddev: 0.000039175568917644945",
            "extra": "mean: 1.157109842410041 msec\nrounds: 863"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 497.3216158996825,
            "unit": "iter/sec",
            "range": "stddev: 0.00002942941837619125",
            "extra": "mean: 2.01077123541261 msec\nrounds: 497"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27677.363628918574,
            "unit": "iter/sec",
            "range": "stddev: 0.000011120948641964924",
            "extra": "mean: 36.130608876170356 usec\nrounds: 16156"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16758.243772933572,
            "unit": "iter/sec",
            "range": "stddev: 0.000012831990718347542",
            "extra": "mean: 59.67212397370131 usec\nrounds: 14737"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6991.899736223482,
            "unit": "iter/sec",
            "range": "stddev: 0.00001565913342866905",
            "extra": "mean: 143.02264587966297 usec\nrounds: 6735"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3632.930647523179,
            "unit": "iter/sec",
            "range": "stddev: 0.000016384321108676135",
            "extra": "mean: 275.2598651124181 usec\nrounds: 3603"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2185.5160221378537,
            "unit": "iter/sec",
            "range": "stddev: 0.000019542152684712598",
            "extra": "mean: 457.557844404091 usec\nrounds: 2198"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21791.316600479226,
            "unit": "iter/sec",
            "range": "stddev: 0.000012788307696204359",
            "extra": "mean: 45.88983852302015 usec\nrounds: 17278"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13074.202130228168,
            "unit": "iter/sec",
            "range": "stddev: 0.000014688457720858166",
            "extra": "mean: 76.48650296509898 usec\nrounds: 11804"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5764.196966573512,
            "unit": "iter/sec",
            "range": "stddev: 0.000018071965085032177",
            "extra": "mean: 173.48470321173693 usec\nrounds: 5573"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3138.155131900632,
            "unit": "iter/sec",
            "range": "stddev: 0.00001969972123148408",
            "extra": "mean: 318.65856146963245 usec\nrounds: 2912"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1940.01618074685,
            "unit": "iter/sec",
            "range": "stddev: 0.000029085470614567946",
            "extra": "mean: 515.4596182878378 usec\nrounds: 1881"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1747.0366569863074,
            "unit": "iter/sec",
            "range": "stddev: 0.00001862062761621005",
            "extra": "mean: 572.3978349286792 usec\nrounds: 1672"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 698.3179702964374,
            "unit": "iter/sec",
            "range": "stddev: 0.000040541226240173545",
            "extra": "mean: 1.4320124105863952 msec\nrounds: 699"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 244.16378591267383,
            "unit": "iter/sec",
            "range": "stddev: 0.00003760333837901954",
            "extra": "mean: 4.09561146122486 msec\nrounds: 245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.5702766434783,
            "unit": "iter/sec",
            "range": "stddev: 0.00009736836340150863",
            "extra": "mean: 8.027597167998692 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.43261720085206,
            "unit": "iter/sec",
            "range": "stddev: 0.00026501966356755737",
            "extra": "mean: 13.25686469736734 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10230.194071581876,
            "unit": "iter/sec",
            "range": "stddev: 0.00001473727353358755",
            "extra": "mean: 97.74985625911707 usec\nrounds: 8084"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4119.62527645614,
            "unit": "iter/sec",
            "range": "stddev: 0.000017713613214938356",
            "extra": "mean: 242.7405244149386 usec\nrounds: 3932"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1260.9107174073754,
            "unit": "iter/sec",
            "range": "stddev: 0.0000431180211736891",
            "extra": "mean: 793.0775638549194 usec\nrounds: 1245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 604.4011530604575,
            "unit": "iter/sec",
            "range": "stddev: 0.00002965818376686244",
            "extra": "mean: 1.654530265100224 msec\nrounds: 596"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 346.82313339313947,
            "unit": "iter/sec",
            "range": "stddev: 0.00013961105364515496",
            "extra": "mean: 2.883314011428573 msec\nrounds: 350"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9489.819706168295,
            "unit": "iter/sec",
            "range": "stddev: 0.000016166403228018057",
            "extra": "mean: 105.37607994280536 usec\nrounds: 8381"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3883.1617608149345,
            "unit": "iter/sec",
            "range": "stddev: 0.000018071503824532896",
            "extra": "mean: 257.5221073948092 usec\nrounds: 3827"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1223.3325545611553,
            "unit": "iter/sec",
            "range": "stddev: 0.00002381504302686356",
            "extra": "mean: 817.4392124786777 usec\nrounds: 1186"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 588.4502163088613,
            "unit": "iter/sec",
            "range": "stddev: 0.000026958190485406767",
            "extra": "mean: 1.6993791017235818 msec\nrounds: 580"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 336.38104200979507,
            "unit": "iter/sec",
            "range": "stddev: 0.0002600823504099054",
            "extra": "mean: 2.9728191399409516 msec\nrounds: 343"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3936.150519020589,
            "unit": "iter/sec",
            "range": "stddev: 0.000017692701267070535",
            "extra": "mean: 254.05532516292712 usec\nrounds: 3386"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1117.902542412221,
            "unit": "iter/sec",
            "range": "stddev: 0.000020615780310722668",
            "extra": "mean: 894.532360434739 usec\nrounds: 1107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.68904601531403,
            "unit": "iter/sec",
            "range": "stddev: 0.00004281411586954009",
            "extra": "mean: 3.3934074358095865 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.81503872231983,
            "unit": "iter/sec",
            "range": "stddev: 0.000043653968706878713",
            "extra": "mean: 7.529267842105805 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.12465124482212,
            "unit": "iter/sec",
            "range": "stddev: 0.00006399752540857214",
            "extra": "mean: 13.31120988157564 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1020.4967939787344,
            "unit": "iter/sec",
            "range": "stddev: 0.00002221075827555858",
            "extra": "mean: 979.9148864556241 usec\nrounds: 1004"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 309.84802202389864,
            "unit": "iter/sec",
            "range": "stddev: 0.00003815601957340011",
            "extra": "mean: 3.22738868387183 msec\nrounds: 310"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.39962747816388,
            "unit": "iter/sec",
            "range": "stddev: 0.00005430395137736862",
            "extra": "mean: 11.57412397701291 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.59069238002768,
            "unit": "iter/sec",
            "range": "stddev: 0.00009085646306908415",
            "extra": "mean: 25.258462024384045 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.662944854071323,
            "unit": "iter/sec",
            "range": "stddev: 0.00010251337429611515",
            "extra": "mean: 44.12489226087285 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}