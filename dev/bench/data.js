window.BENCHMARK_DATA = {
  "lastUpdate": 1782138862395,
  "repoUrl": "https://github.com/trout314/voles",
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
          "id": "a4092e5bf9830763a57053d3f29faa3383cacf83",
          "message": "Rename package to voles (0.5.0)\n\nPyPI name volterra-equation-solvers -> voles, and the Python import root\nvolterra_equation_solvers -> voles. The repo on GitHub has been renamed\ntrout314/volterra-equation-solvers -> trout314/voles (GitHub auto-\nredirects the old URLs).\n\nThe compiled D extension filename (volterra_dlang.so/.dylib/.dll) and\nthe extern(C) symbol names in the D extension are unchanged -- they're\nimplementation details with no user-visible impact and renaming them\nadds risk for zero benefit.\n\nA deprecation-shim release of the old PyPI name (re-exporting from\nvoles with a DeprecationWarning) is a follow-up project.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-22T10:26:24-04:00",
          "tree_id": "648e4045d222137aac2bd703320c2df814ce262c",
          "url": "https://github.com/trout314/voles/commit/a4092e5bf9830763a57053d3f29faa3383cacf83"
        },
        "date": 1782138861874,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16177.919839998536,
            "unit": "iter/sec",
            "range": "stddev: 0.00008657254995864774",
            "extra": "mean: 61.81264401666676 usec\nrounds: 11273"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6267.795027196782,
            "unit": "iter/sec",
            "range": "stddev: 0.000014848527936814598",
            "extra": "mean: 159.5457406728952 usec\nrounds: 6004"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1851.082817895759,
            "unit": "iter/sec",
            "range": "stddev: 0.00004870148065165496",
            "extra": "mean: 540.2243434665783 usec\nrounds: 1875"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 855.8424622686348,
            "unit": "iter/sec",
            "range": "stddev: 0.00009056273676143825",
            "extra": "mean: 1.1684393379468903 msec\nrounds: 867"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 501.74664918867705,
            "unit": "iter/sec",
            "range": "stddev: 0.00003072241411052013",
            "extra": "mean: 1.9930377245508213 msec\nrounds: 501"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29981.891041369643,
            "unit": "iter/sec",
            "range": "stddev: 0.000010817109088958034",
            "extra": "mean: 33.35346655153202 usec\nrounds: 17953"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17064.06169863477,
            "unit": "iter/sec",
            "range": "stddev: 0.00001287927352466427",
            "extra": "mean: 58.602694813275676 usec\nrounds: 11298"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7002.913590672798,
            "unit": "iter/sec",
            "range": "stddev: 0.000015340228245133784",
            "extra": "mean: 142.79770656200913 usec\nrounds: 6751"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3612.2102955305936,
            "unit": "iter/sec",
            "range": "stddev: 0.000017770949065015888",
            "extra": "mean: 276.8388100873599 usec\nrounds: 3549"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2144.7607455567722,
            "unit": "iter/sec",
            "range": "stddev: 0.00003383036198230011",
            "extra": "mean: 466.25247224972105 usec\nrounds: 2018"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 23357.80739747001,
            "unit": "iter/sec",
            "range": "stddev: 0.00001220814395904243",
            "extra": "mean: 42.81223759505417 usec\nrounds: 18944"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13353.05949045444,
            "unit": "iter/sec",
            "range": "stddev: 0.000012679108539204332",
            "extra": "mean: 74.88920428422111 usec\nrounds: 12184"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5625.379765956915,
            "unit": "iter/sec",
            "range": "stddev: 0.00002239028814373477",
            "extra": "mean: 177.76577610843188 usec\nrounds: 5458"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3072.4735696807024,
            "unit": "iter/sec",
            "range": "stddev: 0.00001836995975493234",
            "extra": "mean: 325.4706598188644 usec\nrounds: 2872"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1901.1383242828547,
            "unit": "iter/sec",
            "range": "stddev: 0.000021771304282497736",
            "extra": "mean: 526.0006529915274 usec\nrounds: 1755"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1732.7233939099676,
            "unit": "iter/sec",
            "range": "stddev: 0.000020522187976007648",
            "extra": "mean: 577.1261607679085 usec\nrounds: 1667"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 684.152447957168,
            "unit": "iter/sec",
            "range": "stddev: 0.00003173663748419725",
            "extra": "mean: 1.4616625329426667 msec\nrounds: 683"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 236.91566047664037,
            "unit": "iter/sec",
            "range": "stddev: 0.00007378400690568117",
            "extra": "mean: 4.220911348739645 msec\nrounds: 238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 120.8072578624047,
            "unit": "iter/sec",
            "range": "stddev: 0.00014249405426355397",
            "extra": "mean: 8.27764836065533 msec\nrounds: 122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 73.04949559589568,
            "unit": "iter/sec",
            "range": "stddev: 0.00007422115009926977",
            "extra": "mean: 13.689348459459938 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10251.197724337302,
            "unit": "iter/sec",
            "range": "stddev: 0.000014325522643169009",
            "extra": "mean: 97.54957682904764 usec\nrounds: 8174"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3913.868618343375,
            "unit": "iter/sec",
            "range": "stddev: 0.00001764822992961647",
            "extra": "mean: 255.5016781384119 usec\nrounds: 3545"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1190.8800136162595,
            "unit": "iter/sec",
            "range": "stddev: 0.000024010730286816326",
            "extra": "mean: 839.7151590136879 usec\nrounds: 1176"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 559.375075100076,
            "unit": "iter/sec",
            "range": "stddev: 0.00003378989589933563",
            "extra": "mean: 1.7877092571940094 msec\nrounds: 556"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 323.66249115933397,
            "unit": "iter/sec",
            "range": "stddev: 0.00003572484365464891",
            "extra": "mean: 3.0896382105262723 msec\nrounds: 323"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9466.214174639801,
            "unit": "iter/sec",
            "range": "stddev: 0.00001493642994231381",
            "extra": "mean: 105.63885219067008 usec\nrounds: 8308"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3689.22548198905,
            "unit": "iter/sec",
            "range": "stddev: 0.000017969445063292217",
            "extra": "mean: 271.05960448393324 usec\nrounds: 3479"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1148.7950822079579,
            "unit": "iter/sec",
            "range": "stddev: 0.000024566737399666083",
            "extra": "mean: 870.4772639503494 usec\nrounds: 1129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 546.1112335744166,
            "unit": "iter/sec",
            "range": "stddev: 0.000036493198999241725",
            "extra": "mean: 1.8311287857141902 msec\nrounds: 546"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 317.5806167626242,
            "unit": "iter/sec",
            "range": "stddev: 0.00003911253286354644",
            "extra": "mean: 3.1488067823341077 msec\nrounds: 317"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3598.7913862446053,
            "unit": "iter/sec",
            "range": "stddev: 0.00001709018519457382",
            "extra": "mean: 277.87106633138734 usec\nrounds: 3181"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 997.9209989209182,
            "unit": "iter/sec",
            "range": "stddev: 0.000025020602456901303",
            "extra": "mean: 1.0020833323292422 msec\nrounds: 996"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 258.8287015523799,
            "unit": "iter/sec",
            "range": "stddev: 0.00012525791447915406",
            "extra": "mean: 3.863559157088407 msec\nrounds: 261"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 116.07030563338658,
            "unit": "iter/sec",
            "range": "stddev: 0.00043766046326848887",
            "extra": "mean: 8.615467966101047 msec\nrounds: 118"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 66.01625788984832,
            "unit": "iter/sec",
            "range": "stddev: 0.0000725382220315601",
            "extra": "mean: 15.147783772726925 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1001.1707543842277,
            "unit": "iter/sec",
            "range": "stddev: 0.000026633495985320544",
            "extra": "mean: 998.830614678764 usec\nrounds: 981"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 303.74164028958603,
            "unit": "iter/sec",
            "range": "stddev: 0.000040063281828708834",
            "extra": "mean: 3.2922716788076998 msec\nrounds: 302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 83.97684800494156,
            "unit": "iter/sec",
            "range": "stddev: 0.00019361229965581125",
            "extra": "mean: 11.908043987804302 msec\nrounds: 82"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 38.79602006450157,
            "unit": "iter/sec",
            "range": "stddev: 0.0004707811906533419",
            "extra": "mean: 25.775839850000537 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.357615730783596,
            "unit": "iter/sec",
            "range": "stddev: 0.00008994718656497511",
            "extra": "mean: 44.72748847826055 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}