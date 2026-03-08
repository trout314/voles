window.BENCHMARK_DATA = {
  "lastUpdate": 1772988068920,
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
          "id": "4d7c97536a1d795afb61717fe423f3e462df0d6b",
          "message": "Remove legacy solve_VIE_1_trapz and solve_VIE_2_trapz\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T12:33:47-04:00",
          "tree_id": "050d18c3f21556bd497dc8aa9152adcbf7fe252b",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/4d7c97536a1d795afb61717fe423f3e462df0d6b"
        },
        "date": 1772988068350,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15902.980666448886,
            "unit": "iter/sec",
            "range": "stddev: 0.00013470685836937575",
            "extra": "mean: 62.88129382624086 usec\nrounds: 10319"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6177.420152501905,
            "unit": "iter/sec",
            "range": "stddev: 0.00002077367399359369",
            "extra": "mean: 161.87987465851614 usec\nrounds: 5864"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1848.1649927603532,
            "unit": "iter/sec",
            "range": "stddev: 0.000027295987251706244",
            "extra": "mean: 541.0772327780301 usec\nrounds: 1800"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 863.7580246451389,
            "unit": "iter/sec",
            "range": "stddev: 0.00003258701716027126",
            "extra": "mean: 1.1577316464421086 msec\nrounds: 857"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 496.36060349216916,
            "unit": "iter/sec",
            "range": "stddev: 0.00003634995789992216",
            "extra": "mean: 2.01466432461491 msec\nrounds: 459"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29174.718350270912,
            "unit": "iter/sec",
            "range": "stddev: 0.000012233944329953076",
            "extra": "mean: 34.27625206159751 usec\nrounds: 15643"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17246.703080883435,
            "unit": "iter/sec",
            "range": "stddev: 0.000014491333751906124",
            "extra": "mean: 57.98209636416937 usec\nrounds: 14715"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7032.132564229896,
            "unit": "iter/sec",
            "range": "stddev: 0.000020262022800385217",
            "extra": "mean: 142.20437269437514 usec\nrounds: 6885"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3637.6601251777934,
            "unit": "iter/sec",
            "range": "stddev: 0.000022652934711898352",
            "extra": "mean: 274.90198797808915 usec\nrounds: 3577"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2188.8640813076936,
            "unit": "iter/sec",
            "range": "stddev: 0.000029745642479731757",
            "extra": "mean: 456.85796963810094 usec\nrounds: 2108"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24380.077034039954,
            "unit": "iter/sec",
            "range": "stddev: 0.000012694368615350155",
            "extra": "mean: 41.017097632783525 usec\nrounds: 19645"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13915.627189873434,
            "unit": "iter/sec",
            "range": "stddev: 0.00001576254303350555",
            "extra": "mean: 71.86165498366555 usec\nrounds: 12640"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5906.855274896054,
            "unit": "iter/sec",
            "range": "stddev: 0.000022087778380249328",
            "extra": "mean: 169.29481991034518 usec\nrounds: 5103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3166.2542855890547,
            "unit": "iter/sec",
            "range": "stddev: 0.000025734253326879447",
            "extra": "mean: 315.8306029150651 usec\nrounds: 3158"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1955.0009330121206,
            "unit": "iter/sec",
            "range": "stddev: 0.000031447469314375155",
            "extra": "mean: 511.50870729216183 usec\nrounds: 1961"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1737.437771279075,
            "unit": "iter/sec",
            "range": "stddev: 0.000025667983538340957",
            "extra": "mean: 575.5601820857247 usec\nrounds: 1697"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 687.2879755147112,
            "unit": "iter/sec",
            "range": "stddev: 0.00005657603590090194",
            "extra": "mean: 1.4549941736592995 msec\nrounds: 691"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 240.3126955978782,
            "unit": "iter/sec",
            "range": "stddev: 0.000041234974527367615",
            "extra": "mean: 4.161244987544593 msec\nrounds: 241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 121.89078326778147,
            "unit": "iter/sec",
            "range": "stddev: 0.00004615785302529471",
            "extra": "mean: 8.204065747966384 msec\nrounds: 123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 73.69779438220662,
            "unit": "iter/sec",
            "range": "stddev: 0.00006157116649688949",
            "extra": "mean: 13.568927108101311 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10572.180393951221,
            "unit": "iter/sec",
            "range": "stddev: 0.000017272348611868393",
            "extra": "mean: 94.5878676618251 usec\nrounds: 6763"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4185.198385163,
            "unit": "iter/sec",
            "range": "stddev: 0.000023595718195138574",
            "extra": "mean: 238.93729949459805 usec\nrounds: 3763"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1304.767157796734,
            "unit": "iter/sec",
            "range": "stddev: 0.00003141987363188461",
            "extra": "mean: 766.4202720189768 usec\nrounds: 1283"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 620.5813359929363,
            "unit": "iter/sec",
            "range": "stddev: 0.000035639152678435875",
            "extra": "mean: 1.6113923220072195 msec\nrounds: 618"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 359.18680618492596,
            "unit": "iter/sec",
            "range": "stddev: 0.00005043260360379619",
            "extra": "mean: 2.7840666271164585 msec\nrounds: 354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9869.02205962554,
            "unit": "iter/sec",
            "range": "stddev: 0.000016811638358985713",
            "extra": "mean: 101.32716230223352 usec\nrounds: 8706"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3963.035394951416,
            "unit": "iter/sec",
            "range": "stddev: 0.000025175950083623352",
            "extra": "mean: 252.3318366709312 usec\nrounds: 3845"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1265.3155568859556,
            "unit": "iter/sec",
            "range": "stddev: 0.000032058040387394116",
            "extra": "mean: 790.3166878474815 usec\nrounds: 1259"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 602.5686319505052,
            "unit": "iter/sec",
            "range": "stddev: 0.000040445931803077226",
            "extra": "mean: 1.6595619933998484 msec\nrounds: 606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 348.42042809327006,
            "unit": "iter/sec",
            "range": "stddev: 0.00020966862590008153",
            "extra": "mean: 2.8700957790348216 msec\nrounds: 353"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3968.5509251983744,
            "unit": "iter/sec",
            "range": "stddev: 0.000022768367022205975",
            "extra": "mean: 251.9811434572969 usec\nrounds: 3339"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1123.9521486917854,
            "unit": "iter/sec",
            "range": "stddev: 0.00002805200311000034",
            "extra": "mean: 889.7175926608099 usec\nrounds: 1090"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 295.58310141362375,
            "unit": "iter/sec",
            "range": "stddev: 0.00003710071928347614",
            "extra": "mean: 3.383143336738495 msec\nrounds: 294"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.85674696661832,
            "unit": "iter/sec",
            "range": "stddev: 0.00004816181115702479",
            "extra": "mean: 7.526904149258303 msec\nrounds: 134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.0677056379385,
            "unit": "iter/sec",
            "range": "stddev: 0.00005606175643313451",
            "extra": "mean: 13.321307631581716 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1022.6484277032072,
            "unit": "iter/sec",
            "range": "stddev: 0.000032151117195745476",
            "extra": "mean: 977.8531633260574 usec\nrounds: 998"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 309.4320342376118,
            "unit": "iter/sec",
            "range": "stddev: 0.00013120845695102797",
            "extra": "mean: 3.2317274533770584 msec\nrounds: 311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.3329990195177,
            "unit": "iter/sec",
            "range": "stddev: 0.00007384875879074618",
            "extra": "mean: 11.583056436785258 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.75456722829457,
            "unit": "iter/sec",
            "range": "stddev: 0.00008848328757713329",
            "extra": "mean: 25.1543425000051 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.496039868054083,
            "unit": "iter/sec",
            "range": "stddev: 0.001229800663946752",
            "extra": "mean: 44.45226830434579 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}