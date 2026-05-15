window.BENCHMARK_DATA = {
  "lastUpdate": 1778851070076,
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
          "id": "119320c52d46de502902c8e22122d4544ecda75f",
          "message": "Replace LAPACK-unavailable assert with pure-D LU fallback and LinAlgError\n\nThe LAPACK-unavailable path in lin_solve_lapack previously assert(false)-ed\nfor d > max_d_compile, terminating the process. Add a pure-D Gaussian\nelimination fallback (lin_solve_rt) and a SingularMatrixException that the\nextern(C) entries catch and surface as return code 2, which _dlang.py\ntranslates to numpy.linalg.LinAlgError.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-05-15T09:10:07-04:00",
          "tree_id": "e627cefb2aa26f5880aa63928cd7b19f1d72d184",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/119320c52d46de502902c8e22122d4544ecda75f"
        },
        "date": 1778851068795,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15630.594321499528,
            "unit": "iter/sec",
            "range": "stddev: 0.00007746494673390614",
            "extra": "mean: 63.97709386037374 usec\nrounds: 11336"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5771.17539363242,
            "unit": "iter/sec",
            "range": "stddev: 0.000024250024601683307",
            "extra": "mean: 173.27492786016205 usec\nrounds: 5323"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1675.334544533309,
            "unit": "iter/sec",
            "range": "stddev: 0.0000301504191035766",
            "extra": "mean: 596.8957085395537 usec\nrounds: 1616"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 764.5855818390148,
            "unit": "iter/sec",
            "range": "stddev: 0.000047575117576854744",
            "extra": "mean: 1.3078980610578037 msec\nrounds: 737"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 434.66038940890115,
            "unit": "iter/sec",
            "range": "stddev: 0.00007045190451533528",
            "extra": "mean: 2.300646721823237 msec\nrounds: 417"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 31000.647279130633,
            "unit": "iter/sec",
            "range": "stddev: 0.000012315514099296179",
            "extra": "mean: 32.25739098270994 usec\nrounds: 9737"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17461.594321087545,
            "unit": "iter/sec",
            "range": "stddev: 0.000018407577457591813",
            "extra": "mean: 57.26853926461613 usec\nrounds: 16376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6885.065664042498,
            "unit": "iter/sec",
            "range": "stddev: 0.00002428923795864361",
            "extra": "mean: 145.24189728829106 usec\nrounds: 5900"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3511.9584913664658,
            "unit": "iter/sec",
            "range": "stddev: 0.000024310314761849607",
            "extra": "mean: 284.7414063857317 usec\nrounds: 3226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2089.6615213589107,
            "unit": "iter/sec",
            "range": "stddev: 0.00003295141747978444",
            "extra": "mean: 478.5464008303594 usec\nrounds: 1926"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24996.831098763847,
            "unit": "iter/sec",
            "range": "stddev: 0.000014434496827444458",
            "extra": "mean: 40.005070884743155 usec\nrounds: 19962"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14210.74816077179,
            "unit": "iter/sec",
            "range": "stddev: 0.000020082843499202264",
            "extra": "mean: 70.36927181360238 usec\nrounds: 13134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5894.765229302174,
            "unit": "iter/sec",
            "range": "stddev: 0.00002720383568672649",
            "extra": "mean: 169.6420402001965 usec\nrounds: 5597"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3113.8819505209362,
            "unit": "iter/sec",
            "range": "stddev: 0.000030123199916415476",
            "extra": "mean: 321.14255321487224 usec\nrounds: 2753"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1898.4708770248928,
            "unit": "iter/sec",
            "range": "stddev: 0.00003587688732687568",
            "extra": "mean: 526.7397104174214 usec\nrounds: 1699"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1677.634024563878,
            "unit": "iter/sec",
            "range": "stddev: 0.000022868763987546988",
            "extra": "mean: 596.0775624230455 usec\nrounds: 1618"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 676.7486021472773,
            "unit": "iter/sec",
            "range": "stddev: 0.00002871919798335886",
            "extra": "mean: 1.4776535877976962 msec\nrounds: 672"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 241.38276886357428,
            "unit": "iter/sec",
            "range": "stddev: 0.000048872546722742676",
            "extra": "mean: 4.142797784232826 msec\nrounds: 241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 123.56816645226557,
            "unit": "iter/sec",
            "range": "stddev: 0.0003069717999149742",
            "extra": "mean: 8.092699185483992 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 76.04064378730273,
            "unit": "iter/sec",
            "range": "stddev: 0.00005663233402559113",
            "extra": "mean: 13.150861831169559 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10550.626470240974,
            "unit": "iter/sec",
            "range": "stddev: 0.000030337198648230658",
            "extra": "mean: 94.78110165501482 usec\nrounds: 6827"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4541.021501597693,
            "unit": "iter/sec",
            "range": "stddev: 0.00002467420063216749",
            "extra": "mean: 220.2147687801444 usec\nrounds: 3927"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1379.070883478343,
            "unit": "iter/sec",
            "range": "stddev: 0.00003187321740610332",
            "extra": "mean: 725.1258887271722 usec\nrounds: 1375"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 645.5140143334147,
            "unit": "iter/sec",
            "range": "stddev: 0.00004162196794466666",
            "extra": "mean: 1.549153043613844 msec\nrounds: 642"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 372.0162519815497,
            "unit": "iter/sec",
            "range": "stddev: 0.00006781766168027046",
            "extra": "mean: 2.688054606951944 msec\nrounds: 374"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10889.17685995268,
            "unit": "iter/sec",
            "range": "stddev: 0.000021399813148992205",
            "extra": "mean: 91.83430601423306 usec\nrounds: 9444"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4349.838528743605,
            "unit": "iter/sec",
            "range": "stddev: 0.000028055721406686285",
            "extra": "mean: 229.89359108206648 usec\nrounds: 3947"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1343.0408068188158,
            "unit": "iter/sec",
            "range": "stddev: 0.00003401732662359055",
            "extra": "mean: 744.5790142212009 usec\nrounds: 1336"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 629.2434531864228,
            "unit": "iter/sec",
            "range": "stddev: 0.00016574581036574715",
            "extra": "mean: 1.5892100186916605 msec\nrounds: 642"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 371.45754563914295,
            "unit": "iter/sec",
            "range": "stddev: 0.00005448076713404489",
            "extra": "mean: 2.692097688524175 msec\nrounds: 366"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3911.942816562088,
            "unit": "iter/sec",
            "range": "stddev: 0.0000313059446120881",
            "extra": "mean: 255.62745850125305 usec\nrounds: 3470"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1100.4140408598548,
            "unit": "iter/sec",
            "range": "stddev: 0.00003456092809986014",
            "extra": "mean: 908.7488553114134 usec\nrounds: 1092"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 285.85038179875454,
            "unit": "iter/sec",
            "range": "stddev: 0.00004521747680018318",
            "extra": "mean: 3.4983336167240933 msec\nrounds: 287"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 128.2098479636302,
            "unit": "iter/sec",
            "range": "stddev: 0.00006610649523078754",
            "extra": "mean: 7.799712860463527 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 72.36557921669228,
            "unit": "iter/sec",
            "range": "stddev: 0.0001753598032345975",
            "extra": "mean: 13.818724465751723 msec\nrounds: 73"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 965.1690186591686,
            "unit": "iter/sec",
            "range": "stddev: 0.00003142448747429624",
            "extra": "mean: 1.0360879604167352 msec\nrounds: 960"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 295.1511132599937,
            "unit": "iter/sec",
            "range": "stddev: 0.0000395655270995778",
            "extra": "mean: 3.3880949624578127 msec\nrounds: 293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 81.59405303533148,
            "unit": "iter/sec",
            "range": "stddev: 0.0003121263916529075",
            "extra": "mean: 12.255795156627219 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 37.9911725231173,
            "unit": "iter/sec",
            "range": "stddev: 0.00011555923212971799",
            "extra": "mean: 26.321904105263105 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.80413949824354,
            "unit": "iter/sec",
            "range": "stddev: 0.00021638811677181542",
            "extra": "mean: 45.86285095454266 msec\nrounds: 22"
          }
        ]
      }
    ]
  }
}