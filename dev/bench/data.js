window.BENCHMARK_DATA = {
  "lastUpdate": 1773444908562,
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
          "id": "242207b804559d58ec392b7bb2e0f04fd4a8950c",
          "message": "Add wheel verification and smoke tests to build workflow\n\nEach platform job now verifies the wheel contains the compiled D\nextension (.so/.dylib/.dll) and smoke-tests the import in a fresh\nvenv before uploading artifacts. For the cross-compiled macOS x86_64\nwheel, an x86_64 Python is installed via Rosetta to test the import.\n\nCo-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-03-13T19:27:51-04:00",
          "tree_id": "689d12ead104a887781b5b230a05991854f213d2",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/242207b804559d58ec392b7bb2e0f04fd4a8950c"
        },
        "date": 1773444908028,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15839.327930768639,
            "unit": "iter/sec",
            "range": "stddev: 0.00007826121791819875",
            "extra": "mean: 63.13399181902491 usec\nrounds: 11612"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5829.371277366395,
            "unit": "iter/sec",
            "range": "stddev: 0.0000251921035132479",
            "extra": "mean: 171.54508649718088 usec\nrounds: 5191"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1687.45609774164,
            "unit": "iter/sec",
            "range": "stddev: 0.00003177728051062356",
            "extra": "mean: 592.6080099733097 usec\nrounds: 1604"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 764.466032254258,
            "unit": "iter/sec",
            "range": "stddev: 0.00011987888592285464",
            "extra": "mean: 1.308102594239798 msec\nrounds: 764"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 442.0859885442961,
            "unit": "iter/sec",
            "range": "stddev: 0.00004196257812240712",
            "extra": "mean: 2.262003379235807 msec\nrounds: 443"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30781.315945207967,
            "unit": "iter/sec",
            "range": "stddev: 0.000012960940014603865",
            "extra": "mean: 32.48724004457905 usec\nrounds: 16172"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17649.45441133738,
            "unit": "iter/sec",
            "range": "stddev: 0.000017908904097779195",
            "extra": "mean: 56.65897521215362 usec\nrounds: 15693"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6926.000238133109,
            "unit": "iter/sec",
            "range": "stddev: 0.000025122751496533406",
            "extra": "mean: 144.38347756533548 usec\nrounds: 6508"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3508.350975747273,
            "unit": "iter/sec",
            "range": "stddev: 0.000027111766784106813",
            "extra": "mean: 285.034196097499 usec\nrounds: 3126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2092.168383903161,
            "unit": "iter/sec",
            "range": "stddev: 0.00003280021354359283",
            "extra": "mean: 477.97300049740466 usec\nrounds: 2004"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24762.53929295527,
            "unit": "iter/sec",
            "range": "stddev: 0.000014818265442539373",
            "extra": "mean: 40.383580543554814 usec\nrounds: 19685"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14145.02856528237,
            "unit": "iter/sec",
            "range": "stddev: 0.000020075164173269282",
            "extra": "mean: 70.69621636922 usec\nrounds: 12756"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5757.076775212212,
            "unit": "iter/sec",
            "range": "stddev: 0.00003897376969117866",
            "extra": "mean: 173.69926423521403 usec\nrounds: 5567"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3110.4809849007906,
            "unit": "iter/sec",
            "range": "stddev: 0.00003211664782385738",
            "extra": "mean: 321.49368694240553 usec\nrounds: 3025"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1884.5654608962184,
            "unit": "iter/sec",
            "range": "stddev: 0.000054269519032522316",
            "extra": "mean: 530.6263012612164 usec\nrounds: 1746"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1722.4629100044783,
            "unit": "iter/sec",
            "range": "stddev: 0.000023143634969506",
            "extra": "mean: 580.5640250316915 usec\nrounds: 1638"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 693.0528857148868,
            "unit": "iter/sec",
            "range": "stddev: 0.00004598679938438098",
            "extra": "mean: 1.4428913299574475 msec\nrounds: 691"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 244.98706106310135,
            "unit": "iter/sec",
            "range": "stddev: 0.000043813763819986375",
            "extra": "mean: 4.081848223577937 msec\nrounds: 246"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 126.08778168324643,
            "unit": "iter/sec",
            "range": "stddev: 0.000054028524562155654",
            "extra": "mean: 7.930982579360204 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 76.7028830984032,
            "unit": "iter/sec",
            "range": "stddev: 0.00015108948823706062",
            "extra": "mean: 13.03731958441622 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 11451.866081801907,
            "unit": "iter/sec",
            "range": "stddev: 0.000019207873807000312",
            "extra": "mean: 87.32201309872931 usec\nrounds: 8932"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4531.344589933584,
            "unit": "iter/sec",
            "range": "stddev: 0.000024603342445000753",
            "extra": "mean: 220.68504836765396 usec\nrounds: 4011"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1364.8162400778529,
            "unit": "iter/sec",
            "range": "stddev: 0.000053175883989177246",
            "extra": "mean: 732.6993705342759 usec\nrounds: 1344"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 642.6098636721324,
            "unit": "iter/sec",
            "range": "stddev: 0.00003793159790897173",
            "extra": "mean: 1.55615414037624 msec\nrounds: 634"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 370.1114490691995,
            "unit": "iter/sec",
            "range": "stddev: 0.00005049019661625168",
            "extra": "mean: 2.701888856761712 msec\nrounds: 370"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10815.70292787596,
            "unit": "iter/sec",
            "range": "stddev: 0.000019792521187411242",
            "extra": "mean: 92.45816075649046 usec\nrounds: 9362"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4262.6135016224325,
            "unit": "iter/sec",
            "range": "stddev: 0.00003283123880084491",
            "extra": "mean: 234.59785871259047 usec\nrounds: 3914"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1332.8392700091015,
            "unit": "iter/sec",
            "range": "stddev: 0.00004438009692623767",
            "extra": "mean: 750.2780136371367 usec\nrounds: 1320"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 638.219159497128,
            "unit": "iter/sec",
            "range": "stddev: 0.00004332062924465297",
            "extra": "mean: 1.5668598867948902 msec\nrounds: 636"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 369.66205753473076,
            "unit": "iter/sec",
            "range": "stddev: 0.000052828342756321606",
            "extra": "mean: 2.7051734945939026 msec\nrounds: 370"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3952.051422992838,
            "unit": "iter/sec",
            "range": "stddev: 0.000025201494998309633",
            "extra": "mean: 253.03314480728915 usec\nrounds: 3515"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1100.3681068893993,
            "unit": "iter/sec",
            "range": "stddev: 0.00004359194080169087",
            "extra": "mean: 908.7867902922712 usec\nrounds: 1092"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 287.3477367451466,
            "unit": "iter/sec",
            "range": "stddev: 0.00012293541737467656",
            "extra": "mean: 3.480103972027858 msec\nrounds: 286"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 129.20368718366737,
            "unit": "iter/sec",
            "range": "stddev: 0.0001280853251339383",
            "extra": "mean: 7.739717200008902 msec\nrounds: 130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.10619069966276,
            "unit": "iter/sec",
            "range": "stddev: 0.00007072892307119582",
            "extra": "mean: 13.67873213512427 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 974.226792614981,
            "unit": "iter/sec",
            "range": "stddev: 0.000040785524160417425",
            "extra": "mean: 1.026455038580739 msec\nrounds: 959"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 295.9264026849736,
            "unit": "iter/sec",
            "range": "stddev: 0.00005257270381344258",
            "extra": "mean: 3.379218585860833 msec\nrounds: 297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 82.31518621659927,
            "unit": "iter/sec",
            "range": "stddev: 0.000055337981929173885",
            "extra": "mean: 12.148426626511657 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 38.06494787808489,
            "unit": "iter/sec",
            "range": "stddev: 0.00007393717766257753",
            "extra": "mean: 26.27088846155309 msec\nrounds: 39"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.7954360794669,
            "unit": "iter/sec",
            "range": "stddev: 0.00012772942625852903",
            "extra": "mean: 45.88116504546944 msec\nrounds: 22"
          }
        ]
      }
    ]
  }
}