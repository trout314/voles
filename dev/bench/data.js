window.BENCHMARK_DATA = {
  "lastUpdate": 1778853065105,
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
          "id": "fc0e38ee6e2488141d34a23451f9d00b7ce99d46",
          "message": "Bump version to 0.3.2\n\nPATCH bump under semver: no public API additions and no behavior changes for\ncalls that previously worked. The LAPACK-fallback work fixes a previously\nprocess-aborting path (d > 8 without LAPACK) and turns singular-matrix aborts\ninto catchable numpy.linalg.LinAlgError.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-05-15T09:35:20-04:00",
          "tree_id": "e36292a614704c137cd60f7b01db805c05db6ce9",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/fc0e38ee6e2488141d34a23451f9d00b7ce99d46"
        },
        "date": 1778853064016,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15821.207528547455,
            "unit": "iter/sec",
            "range": "stddev: 0.00009243292121357261",
            "extra": "mean: 63.20630066925176 usec\nrounds: 10460"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6199.7954277246545,
            "unit": "iter/sec",
            "range": "stddev: 0.00001796638457990946",
            "extra": "mean: 161.29564461564874 usec\nrounds: 5971"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1858.1938252151226,
            "unit": "iter/sec",
            "range": "stddev: 0.00002292173214877705",
            "extra": "mean: 538.1569922525333 usec\nrounds: 1807"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 863.4236873226885,
            "unit": "iter/sec",
            "range": "stddev: 0.00002932514209119337",
            "extra": "mean: 1.1581799465113223 msec\nrounds: 860"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 495.89062923011875,
            "unit": "iter/sec",
            "range": "stddev: 0.00009532614728656221",
            "extra": "mean: 2.0165736980199087 msec\nrounds: 404"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28182.740391728476,
            "unit": "iter/sec",
            "range": "stddev: 0.000011380409994154432",
            "extra": "mean: 35.48270984653771 usec\nrounds: 15640"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16948.54621934149,
            "unit": "iter/sec",
            "range": "stddev: 0.000013706059712020326",
            "extra": "mean: 59.00211068597797 usec\nrounds: 14898"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7028.349368841684,
            "unit": "iter/sec",
            "range": "stddev: 0.000016760173838188123",
            "extra": "mean: 142.280917968198 usec\nrounds: 6595"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3634.0835466362614,
            "unit": "iter/sec",
            "range": "stddev: 0.00002168162677278869",
            "extra": "mean: 275.1725399724529 usec\nrounds: 3615"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2182.063456152528,
            "unit": "iter/sec",
            "range": "stddev: 0.00002410248759214797",
            "extra": "mean: 458.2818144817963 usec\nrounds: 2113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22122.070251449484,
            "unit": "iter/sec",
            "range": "stddev: 0.000013371519359872569",
            "extra": "mean: 45.203725900584644 usec\nrounds: 16961"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13198.803561336003,
            "unit": "iter/sec",
            "range": "stddev: 0.000014538158496276212",
            "extra": "mean: 75.76444299310252 usec\nrounds: 11867"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5739.13931225213,
            "unit": "iter/sec",
            "range": "stddev: 0.00002068209101026923",
            "extra": "mean: 174.24215471911657 usec\nrounds: 5022"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3124.3793276189112,
            "unit": "iter/sec",
            "range": "stddev: 0.000022769543461064347",
            "extra": "mean: 320.0635694776856 usec\nrounds: 2929"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1911.5924137778145,
            "unit": "iter/sec",
            "range": "stddev: 0.0000469400372193649",
            "extra": "mean: 523.1240680766955 usec\nrounds: 1939"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1732.5580707896108,
            "unit": "iter/sec",
            "range": "stddev: 0.00002510257722139284",
            "extra": "mean: 577.181230955365 usec\nrounds: 1654"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 690.6516708381746,
            "unit": "iter/sec",
            "range": "stddev: 0.00003143833604309445",
            "extra": "mean: 1.4479078850072142 msec\nrounds: 687"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 240.5418656464779,
            "unit": "iter/sec",
            "range": "stddev: 0.00004251797413706361",
            "extra": "mean: 4.157280468879752 msec\nrounds: 241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 121.69569691792385,
            "unit": "iter/sec",
            "range": "stddev: 0.0002018079355958207",
            "extra": "mean: 8.217217414634122 msec\nrounds: 123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.02057938308025,
            "unit": "iter/sec",
            "range": "stddev: 0.00007445564735161767",
            "extra": "mean: 13.509756453332784 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10314.381524533517,
            "unit": "iter/sec",
            "range": "stddev: 0.000015996330957348363",
            "extra": "mean: 96.95200799208622 usec\nrounds: 7007"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4146.322606188569,
            "unit": "iter/sec",
            "range": "stddev: 0.000021056039344147992",
            "extra": "mean: 241.17756744433152 usec\nrounds: 3729"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1293.9614176536465,
            "unit": "iter/sec",
            "range": "stddev: 0.000026632539943900427",
            "extra": "mean: 772.820569730209 usec\nrounds: 1262"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 612.1054238379263,
            "unit": "iter/sec",
            "range": "stddev: 0.00005830050130963115",
            "extra": "mean: 1.6337055040779718 msec\nrounds: 613"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 356.2522004155693,
            "unit": "iter/sec",
            "range": "stddev: 0.00005028114391860378",
            "extra": "mean: 2.807000206127841 msec\nrounds: 359"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9518.83660869085,
            "unit": "iter/sec",
            "range": "stddev: 0.000018539385711238942",
            "extra": "mean: 105.0548550320723 usec\nrounds: 8595"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3897.477357169767,
            "unit": "iter/sec",
            "range": "stddev: 0.000022296484588279204",
            "extra": "mean: 256.57621798890204 usec\nrounds: 3491"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1249.9840576415115,
            "unit": "iter/sec",
            "range": "stddev: 0.000028243683630147883",
            "extra": "mean: 800.0102032395635 usec\nrounds: 1235"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 599.8302158431774,
            "unit": "iter/sec",
            "range": "stddev: 0.00003393196813372387",
            "extra": "mean: 1.6671384228190416 msec\nrounds: 596"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 349.6621407049537,
            "unit": "iter/sec",
            "range": "stddev: 0.00003876287515014263",
            "extra": "mean: 2.8599035571420472 msec\nrounds: 350"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3926.3635652060552,
            "unit": "iter/sec",
            "range": "stddev: 0.00002008803782573878",
            "extra": "mean: 254.68858993640342 usec\nrounds: 3458"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1114.2111371289652,
            "unit": "iter/sec",
            "range": "stddev: 0.000032430545562015146",
            "extra": "mean: 897.49596524115 usec\nrounds: 1122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.40690756920054,
            "unit": "iter/sec",
            "range": "stddev: 0.00004177836796101632",
            "extra": "mean: 3.39665943389915 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.80300520139414,
            "unit": "iter/sec",
            "range": "stddev: 0.00003746150043568089",
            "extra": "mean: 7.529950082707181 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.1927155909029,
            "unit": "iter/sec",
            "range": "stddev: 0.00005342003947315366",
            "extra": "mean: 13.299160592106393 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1015.2566049511978,
            "unit": "iter/sec",
            "range": "stddev: 0.000030396912686134997",
            "extra": "mean: 984.972661220036 usec\nrounds: 918"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 310.87071539779464,
            "unit": "iter/sec",
            "range": "stddev: 0.0000638667610324734",
            "extra": "mean: 3.2167713151120894 msec\nrounds: 311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.28483675900684,
            "unit": "iter/sec",
            "range": "stddev: 0.00018735615223380208",
            "extra": "mean: 11.589521839080435 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.771309719307766,
            "unit": "iter/sec",
            "range": "stddev: 0.0000793950496622112",
            "extra": "mean: 25.143753299995808 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.813760504904646,
            "unit": "iter/sec",
            "range": "stddev: 0.00008695449309646113",
            "extra": "mean: 43.83319443478043 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}