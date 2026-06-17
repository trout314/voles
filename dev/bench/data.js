window.BENCHMARK_DATA = {
  "lastUpdate": 1781714345653,
  "repoUrl": "https://github.com/trout314/volterra-equation-solvers",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "atrout@aarons-air.myfiosgateway.com",
            "name": "Aaron Trout"
          },
          "committer": {
            "email": "atrout@aarons-air.myfiosgateway.com",
            "name": "Aaron Trout"
          },
          "distinct": true,
          "id": "1ba36fe0bcf699f169f40a33da6807a6eb4932df",
          "message": "test: close coverage gaps for callable solvers vs array solvers\n\nAdd the correctness checks the array-based suite had but the callable suite\nwas missing:\n\n- Coupled (non-diagonal) kernels for VIE-1 and VIDE. The callable vector/\n  matrix tests for these two previously used only diagonal fixtures, which\n  decouple the d-dimensional system into independent scalar solves and never\n  exercise the off-diagonal coupling in the per-step block solve. New\n  vie1_callable_vec_coupled / vide_callable_vec_coupled fixtures (same\n  polynomial-exact constructions as the array tests) with vector accuracy,\n  non-uniform-mesh, and matrix (per-column + analytic column-0) tests.\n- return_function test for the matrix VIE-1 path (was tested for VIE-2/VIDE).\n- Larger kernel dimension (d=6) diagonal test; callable tests otherwise d=2.\n- Explicit \"real inputs stay real\" dtype check for all three solvers.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-17T12:31:29-04:00",
          "tree_id": "4cbb3cb34df4052226025c49187d8101b8ee6500",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/1ba36fe0bcf699f169f40a33da6807a6eb4932df"
        },
        "date": 1781714345092,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15910.449028409805,
            "unit": "iter/sec",
            "range": "stddev: 0.00007945334732148018",
            "extra": "mean: 62.851777358036436 usec\nrounds: 10856"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6190.208978942036,
            "unit": "iter/sec",
            "range": "stddev: 0.000015356818271677857",
            "extra": "mean: 161.54543463747638 usec\nrounds: 5370"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1856.7447559949778,
            "unit": "iter/sec",
            "range": "stddev: 0.000021769322474284185",
            "extra": "mean: 538.576988986366 usec\nrounds: 1816"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 864.813940596053,
            "unit": "iter/sec",
            "range": "stddev: 0.000035775807366342654",
            "extra": "mean: 1.156318085380045 msec\nrounds: 855"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.00626510829693,
            "unit": "iter/sec",
            "range": "stddev: 0.000026546605543355997",
            "extra": "mean: 1.999974939880821 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28227.530644570226,
            "unit": "iter/sec",
            "range": "stddev: 0.000010911758973976182",
            "extra": "mean: 35.426407381913776 usec\nrounds: 15877"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16536.413668308647,
            "unit": "iter/sec",
            "range": "stddev: 0.00002227217144603283",
            "extra": "mean: 60.472604281571556 usec\nrounds: 14854"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6882.7881991719,
            "unit": "iter/sec",
            "range": "stddev: 0.000024269279059223653",
            "extra": "mean: 145.28995678238576 usec\nrounds: 6849"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3700.0371036525908,
            "unit": "iter/sec",
            "range": "stddev: 0.000017803640118308757",
            "extra": "mean: 270.26756002333684 usec\nrounds: 3407"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2229.749996287574,
            "unit": "iter/sec",
            "range": "stddev: 0.00002059908251090438",
            "extra": "mean: 448.48077213362563 usec\nrounds: 2146"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22255.422662942685,
            "unit": "iter/sec",
            "range": "stddev: 0.000012926061828962302",
            "extra": "mean: 44.93286940198586 usec\nrounds: 17305"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13174.984425480796,
            "unit": "iter/sec",
            "range": "stddev: 0.00001799299987401358",
            "extra": "mean: 75.90141799833718 usec\nrounds: 11890"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5850.070923259595,
            "unit": "iter/sec",
            "range": "stddev: 0.00001820670548361889",
            "extra": "mean: 170.93809854920718 usec\nrounds: 5652"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3182.0705162259496,
            "unit": "iter/sec",
            "range": "stddev: 0.00002046436066122069",
            "extra": "mean: 314.260791802325 usec\nrounds: 3074"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1966.8723726655053,
            "unit": "iter/sec",
            "range": "stddev: 0.000029828149414115015",
            "extra": "mean: 508.4213972891389 usec\nrounds: 1918"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1685.253582128142,
            "unit": "iter/sec",
            "range": "stddev: 0.00008964746317817667",
            "extra": "mean: 593.3825096738246 usec\nrounds: 1654"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 686.6195892048852,
            "unit": "iter/sec",
            "range": "stddev: 0.00009294806711617498",
            "extra": "mean: 1.456410530258849 msec\nrounds: 694"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 241.71439197631645,
            "unit": "iter/sec",
            "range": "stddev: 0.000054910703422244634",
            "extra": "mean: 4.137114020492341 msec\nrounds: 244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 123.13921025062231,
            "unit": "iter/sec",
            "range": "stddev: 0.00023507414046981335",
            "extra": "mean: 8.120890153223524 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 73.2197905385299,
            "unit": "iter/sec",
            "range": "stddev: 0.0007149058311339215",
            "extra": "mean: 13.657509706665678 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10135.119530527547,
            "unit": "iter/sec",
            "range": "stddev: 0.000020251626288716512",
            "extra": "mean: 98.66681857948927 usec\nrounds: 8224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4218.646447066221,
            "unit": "iter/sec",
            "range": "stddev: 0.000020155551938522135",
            "extra": "mean: 237.04285546266416 usec\nrounds: 4165"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1313.1294871596235,
            "unit": "iter/sec",
            "range": "stddev: 0.000023661602810192075",
            "extra": "mean: 761.5395204954684 usec\nrounds: 1293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 623.6595858043671,
            "unit": "iter/sec",
            "range": "stddev: 0.00002547690392062368",
            "extra": "mean: 1.6034388354830569 msec\nrounds: 620"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 361.03928637321735,
            "unit": "iter/sec",
            "range": "stddev: 0.00005183424549064536",
            "extra": "mean: 2.769781676795886 msec\nrounds: 362"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9633.499154791434,
            "unit": "iter/sec",
            "range": "stddev: 0.00001551176250471516",
            "extra": "mean: 103.80444155669312 usec\nrounds: 8427"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3978.4568786853315,
            "unit": "iter/sec",
            "range": "stddev: 0.000018217897956763385",
            "extra": "mean: 251.35373600692304 usec\nrounds: 3591"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1218.2345951117695,
            "unit": "iter/sec",
            "range": "stddev: 0.00010933322247548245",
            "extra": "mean: 820.859959167596 usec\nrounds: 1249"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 607.602139905459,
            "unit": "iter/sec",
            "range": "stddev: 0.000029967000985601462",
            "extra": "mean: 1.645813821780807 msec\nrounds: 606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 352.86142451178273,
            "unit": "iter/sec",
            "range": "stddev: 0.00008092852118095825",
            "extra": "mean: 2.8339737090377475 msec\nrounds: 354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3894.645822551083,
            "unit": "iter/sec",
            "range": "stddev: 0.00001664047776347557",
            "extra": "mean: 256.76275727300333 usec\nrounds: 3506"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1099.8715448178446,
            "unit": "iter/sec",
            "range": "stddev: 0.000022900011047126824",
            "extra": "mean: 909.1970827971691 usec\nrounds: 1087"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 286.9843289849451,
            "unit": "iter/sec",
            "range": "stddev: 0.00014830809199872132",
            "extra": "mean: 3.4845108216778593 msec\nrounds: 286"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 129.2964966758893,
            "unit": "iter/sec",
            "range": "stddev: 0.0003702243241455813",
            "extra": "mean: 7.7341616030535185 msec\nrounds: 131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.45919042825135,
            "unit": "iter/sec",
            "range": "stddev: 0.00012346192476008026",
            "extra": "mean: 13.613000554052043 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1019.3645039314204,
            "unit": "iter/sec",
            "range": "stddev: 0.0000269118568874073",
            "extra": "mean: 981.0033566435396 usec\nrounds: 1001"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 306.0862254954505,
            "unit": "iter/sec",
            "range": "stddev: 0.0003915219097611402",
            "extra": "mean: 3.2670532572360513 msec\nrounds: 311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 85.87197330722663,
            "unit": "iter/sec",
            "range": "stddev: 0.00017734215223877298",
            "extra": "mean: 11.645243045973467 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.67849263375416,
            "unit": "iter/sec",
            "range": "stddev: 0.00018204792402134418",
            "extra": "mean: 25.20257029999442 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.80260858034819,
            "unit": "iter/sec",
            "range": "stddev: 0.00011103735000297562",
            "extra": "mean: 43.854631652179606 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}