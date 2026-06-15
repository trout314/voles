window.BENCHMARK_DATA = {
  "lastUpdate": 1781529554621,
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
          "id": "94a441595c6b8a36228561384b3278635d3b73b5",
          "message": "Fix spurious soln_init_value warning in matrix-valued VIE-1\n\nThe matrix path defaulted init_cols to zeros when the user omitted\nsoln_init_value, then unconditionally forwarded init_cols[:, j] into the\nper-column recursive call. That tripped the \"no effect when\nforce_continuous=False\" warning even though the user never passed an\ninit. It also fired once per column when an init was provided.\n\nPass None to the recursive call when no init was given, and emit the\nwarning once at the matrix level (suppressing per-column re-emission).\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-15T09:11:19-04:00",
          "tree_id": "5b9ff5f0f25066ce7d13d1cb65d4a546cc43f6d5",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/94a441595c6b8a36228561384b3278635d3b73b5"
        },
        "date": 1781529553584,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 20302.240664547666,
            "unit": "iter/sec",
            "range": "stddev: 0.00006695728912336226",
            "extra": "mean: 49.25564702551417 usec\nrounds: 14052"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 7764.531914658187,
            "unit": "iter/sec",
            "range": "stddev: 0.00001154754142278526",
            "extra": "mean: 128.79076433598797 usec\nrounds: 7273"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2291.1041139156437,
            "unit": "iter/sec",
            "range": "stddev: 0.000017569194710410488",
            "extra": "mean: 436.47078014754027 usec\nrounds: 2297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1065.3554242675032,
            "unit": "iter/sec",
            "range": "stddev: 0.00001950524092336038",
            "extra": "mean: 938.6538775897827 usec\nrounds: 1062"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 612.1952069550974,
            "unit": "iter/sec",
            "range": "stddev: 0.000023218347543672606",
            "extra": "mean: 1.6334659086498644 msec\nrounds: 613"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 38266.48726995253,
            "unit": "iter/sec",
            "range": "stddev: 0.000008221089642274628",
            "extra": "mean: 26.132526692232247 usec\nrounds: 21692"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 21877.958832382188,
            "unit": "iter/sec",
            "range": "stddev: 0.000009420798959678355",
            "extra": "mean: 45.7081031947035 usec\nrounds: 19749"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 8897.108606136158,
            "unit": "iter/sec",
            "range": "stddev: 0.000011577299414628143",
            "extra": "mean: 112.3960653138841 usec\nrounds: 8620"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 4574.744007666016,
            "unit": "iter/sec",
            "range": "stddev: 0.000013198345360553943",
            "extra": "mean: 218.5914661725933 usec\nrounds: 4464"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2668.812150875183,
            "unit": "iter/sec",
            "range": "stddev: 0.000046962394779727194",
            "extra": "mean: 374.69853382976777 usec\nrounds: 2675"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 30153.72864916891,
            "unit": "iter/sec",
            "range": "stddev: 0.000008925028505859797",
            "extra": "mean: 33.163394538524564 usec\nrounds: 24061"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 16908.53973442923,
            "unit": "iter/sec",
            "range": "stddev: 0.000010218037960145067",
            "extra": "mean: 59.14171275026172 usec\nrounds: 15443"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 7060.964387054783,
            "unit": "iter/sec",
            "range": "stddev: 0.000015131837960285927",
            "extra": "mean: 141.62371387021147 usec\nrounds: 6899"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3843.6409711328806,
            "unit": "iter/sec",
            "range": "stddev: 0.000016828468592654434",
            "extra": "mean: 260.1699814083464 usec\nrounds: 3819"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2367.1698471799123,
            "unit": "iter/sec",
            "range": "stddev: 0.000024733119986359243",
            "extra": "mean: 422.44539452516807 usec\nrounds: 2375"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2250.242912487489,
            "unit": "iter/sec",
            "range": "stddev: 0.000016189292583203908",
            "extra": "mean: 444.39646691057396 usec\nrounds: 2191"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 886.4362174805701,
            "unit": "iter/sec",
            "range": "stddev: 0.000020116637811441064",
            "extra": "mean: 1.1281127511263032 msec\nrounds: 888"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 304.84250655314594,
            "unit": "iter/sec",
            "range": "stddev: 0.00015322929467099318",
            "extra": "mean: 3.2803824220808293 msec\nrounds: 308"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 156.08030476449463,
            "unit": "iter/sec",
            "range": "stddev: 0.00005842754785611936",
            "extra": "mean: 6.4069582738762145 msec\nrounds: 157"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 94.27332237649803,
            "unit": "iter/sec",
            "range": "stddev: 0.00020441054080495082",
            "extra": "mean: 10.607454736837578 msec\nrounds: 95"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 12957.404708429282,
            "unit": "iter/sec",
            "range": "stddev: 0.000010786160783049926",
            "extra": "mean: 77.17594861797149 usec\nrounds: 10023"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4879.422738722578,
            "unit": "iter/sec",
            "range": "stddev: 0.000012703685864824828",
            "extra": "mean: 204.94227566390316 usec\nrounds: 4734"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1468.3427808347835,
            "unit": "iter/sec",
            "range": "stddev: 0.00001734305353960575",
            "extra": "mean: 681.0398859532506 usec\nrounds: 1438"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 689.6779066023164,
            "unit": "iter/sec",
            "range": "stddev: 0.000021602042858885407",
            "extra": "mean: 1.4499522029442393 msec\nrounds: 680"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 395.9577430010267,
            "unit": "iter/sec",
            "range": "stddev: 0.00006757162131054683",
            "extra": "mean: 2.525522022680605 msec\nrounds: 397"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 11899.773253510772,
            "unit": "iter/sec",
            "range": "stddev: 0.00001196092045461049",
            "extra": "mean: 84.03521467982354 usec\nrounds: 10313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4588.963356924164,
            "unit": "iter/sec",
            "range": "stddev: 0.000013529187842013659",
            "extra": "mean: 217.91413925568324 usec\nrounds: 4481"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1408.4739456731456,
            "unit": "iter/sec",
            "range": "stddev: 0.000023964284935045776",
            "extra": "mean: 709.988284179495 usec\nrounds: 1397"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 666.8808925982522,
            "unit": "iter/sec",
            "range": "stddev: 0.00006618094431966186",
            "extra": "mean: 1.4995181464922076 msec\nrounds: 669"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 388.7969258422804,
            "unit": "iter/sec",
            "range": "stddev: 0.00003433327283873719",
            "extra": "mean: 2.5720367974454117 msec\nrounds: 390"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4356.660412023665,
            "unit": "iter/sec",
            "range": "stddev: 0.000020833943781682097",
            "extra": "mean: 229.53361185557745 usec\nrounds: 3965"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1223.1910275123028,
            "unit": "iter/sec",
            "range": "stddev: 0.000019321192060552446",
            "extra": "mean: 817.5337927664303 usec\nrounds: 1216"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 314.1206220805839,
            "unit": "iter/sec",
            "range": "stddev: 0.00018250203310710397",
            "extra": "mean: 3.1834904482758275 msec\nrounds: 319"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 141.1924236711729,
            "unit": "iter/sec",
            "range": "stddev: 0.0004051726531727757",
            "extra": "mean: 7.082532999992471 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 80.75453460299777,
            "unit": "iter/sec",
            "range": "stddev: 0.0000517411570640747",
            "extra": "mean: 12.383205536582686 msec\nrounds: 82"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1244.6830482429873,
            "unit": "iter/sec",
            "range": "stddev: 0.000018751767311502694",
            "extra": "mean: 803.4173851822072 usec\nrounds: 1215"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 373.9466875378594,
            "unit": "iter/sec",
            "range": "stddev: 0.0000475047328783962",
            "extra": "mean: 2.6741779866648963 msec\nrounds: 375"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 103.08022147164911,
            "unit": "iter/sec",
            "range": "stddev: 0.00021832425405772065",
            "extra": "mean: 9.701182105774162 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 47.38388095736408,
            "unit": "iter/sec",
            "range": "stddev: 0.0003567862482013896",
            "extra": "mean: 21.10422320408491 msec\nrounds: 49"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 26.58371355566988,
            "unit": "iter/sec",
            "range": "stddev: 0.002477957199549952",
            "extra": "mean: 37.617016821440885 msec\nrounds: 28"
          }
        ]
      }
    ]
  }
}