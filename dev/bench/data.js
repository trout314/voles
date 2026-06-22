window.BENCHMARK_DATA = {
  "lastUpdate": 1782134453864,
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
          "id": "66295a6c300b183caa6a42f658f255e2fc59f6b4",
          "message": "Regression test: large-d complex matrix-valued VIE-1 -> VIDE chain works\n\nCompanion test to the prior _truncate_N fix. The bug-triggering notebook\nused d=49 complex matrix-valued data; the fix landed on the\ntoo-short-input path, but it's worth pinning that a *long-enough*\ninput at the same large d actually runs cleanly through the full\nworkflow (solve_VIE_1 -> solve_VIDE chain, complex kernel, matrix-\nvalued soln_init_value).\n\nTest runs at d=49, N=19 (mesh_divs=2). Adds ~0.58s to the suite.\n\nFull suite: 294 passed, 6 skipped in 68.74s.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-22T09:13:09-04:00",
          "tree_id": "01f34a5fe20119d269aca2f1968f25c0a7ca8b20",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/66295a6c300b183caa6a42f658f255e2fc59f6b4"
        },
        "date": 1782134453399,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15637.502012936582,
            "unit": "iter/sec",
            "range": "stddev: 0.00008980377972398551",
            "extra": "mean: 63.94883269544719 usec\nrounds: 11237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6172.772107599881,
            "unit": "iter/sec",
            "range": "stddev: 0.000015508457506841064",
            "extra": "mean: 162.0017688274618 usec\nrounds: 5909"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1854.289167070773,
            "unit": "iter/sec",
            "range": "stddev: 0.000020175975925033467",
            "extra": "mean: 539.2902130683875 usec\nrounds: 1760"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 866.6630691804445,
            "unit": "iter/sec",
            "range": "stddev: 0.000026578205717280964",
            "extra": "mean: 1.1538509434186979 msec\nrounds: 866"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 498.9617260121848,
            "unit": "iter/sec",
            "range": "stddev: 0.000031445701900026844",
            "extra": "mean: 2.0041617379998797 msec\nrounds: 500"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27296.227440677463,
            "unit": "iter/sec",
            "range": "stddev: 0.000010583770775561508",
            "extra": "mean: 36.63509919725306 usec\nrounds: 16321"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16725.20571239863,
            "unit": "iter/sec",
            "range": "stddev: 0.000012951424799142702",
            "extra": "mean: 59.78999703774561 usec\nrounds: 14854"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7083.178179908572,
            "unit": "iter/sec",
            "range": "stddev: 0.000015665901928628083",
            "extra": "mean: 141.17956298720523 usec\nrounds: 6803"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3697.0683904312737,
            "unit": "iter/sec",
            "range": "stddev: 0.00001708901217558331",
            "extra": "mean: 270.48458248383855 usec\nrounds: 3631"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2223.9288118124987,
            "unit": "iter/sec",
            "range": "stddev: 0.000019329364970786558",
            "extra": "mean: 449.6546808011366 usec\nrounds: 2146"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21822.066262272776,
            "unit": "iter/sec",
            "range": "stddev: 0.000012057120122431153",
            "extra": "mean: 45.82517475574055 usec\nrounds: 17121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13160.371293541888,
            "unit": "iter/sec",
            "range": "stddev: 0.000013860228443730498",
            "extra": "mean: 75.98569810038141 usec\nrounds: 11739"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5836.459003732667,
            "unit": "iter/sec",
            "range": "stddev: 0.00001692740275867728",
            "extra": "mean: 171.33676418534884 usec\nrounds: 5657"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3179.486663988796,
            "unit": "iter/sec",
            "range": "stddev: 0.00001921114781025262",
            "extra": "mean: 314.5161800255703 usec\nrounds: 3144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1979.0938352426867,
            "unit": "iter/sec",
            "range": "stddev: 0.000020757134080633028",
            "extra": "mean: 505.28175177574377 usec\nrounds: 1970"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1730.4698190749239,
            "unit": "iter/sec",
            "range": "stddev: 0.000025488921697739487",
            "extra": "mean: 577.877746827495 usec\nrounds: 1655"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 688.8622339022972,
            "unit": "iter/sec",
            "range": "stddev: 0.00010069592233550494",
            "extra": "mean: 1.45166907225434 msec\nrounds: 692"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 243.4233346001839,
            "unit": "iter/sec",
            "range": "stddev: 0.000042848145464519174",
            "extra": "mean: 4.108069596706792 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.18073683674226,
            "unit": "iter/sec",
            "range": "stddev: 0.00003983381942402379",
            "extra": "mean: 8.052778759999455 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.2859228093282,
            "unit": "iter/sec",
            "range": "stddev: 0.000046679766447518284",
            "extra": "mean: 13.282695657893914 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10177.988814681874,
            "unit": "iter/sec",
            "range": "stddev: 0.000014563816520235762",
            "extra": "mean: 98.25123786317073 usec\nrounds: 8198"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4124.9884962070855,
            "unit": "iter/sec",
            "range": "stddev: 0.000017854964365985514",
            "extra": "mean: 242.42491849843876 usec\nrounds: 4049"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1278.132785428165,
            "unit": "iter/sec",
            "range": "stddev: 0.000021490664777569167",
            "extra": "mean: 782.3913222482649 usec\nrounds: 1263"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 606.8451833255474,
            "unit": "iter/sec",
            "range": "stddev: 0.000026734560019902137",
            "extra": "mean: 1.64786675000029 msec\nrounds: 604"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 351.3507292701825,
            "unit": "iter/sec",
            "range": "stddev: 0.00003064427659741822",
            "extra": "mean: 2.8461588853883315 msec\nrounds: 349"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9442.648709823638,
            "unit": "iter/sec",
            "range": "stddev: 0.00001647024600405653",
            "extra": "mean: 105.90248888107554 usec\nrounds: 8364"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3819.243645550165,
            "unit": "iter/sec",
            "range": "stddev: 0.000030657124626383074",
            "extra": "mean: 261.8319470571376 usec\nrounds: 3551"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1235.67835389384,
            "unit": "iter/sec",
            "range": "stddev: 0.00002385573892371428",
            "extra": "mean: 809.2720867439524 usec\nrounds: 1222"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 592.8535586502651,
            "unit": "iter/sec",
            "range": "stddev: 0.00002844412897228013",
            "extra": "mean: 1.6867571854956476 msec\nrounds: 593"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 345.0151121699562,
            "unit": "iter/sec",
            "range": "stddev: 0.000031862445742409164",
            "extra": "mean: 2.8984237638477555 msec\nrounds: 343"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3936.852746438809,
            "unit": "iter/sec",
            "range": "stddev: 0.00001683475706726566",
            "extra": "mean: 254.01000860511692 usec\nrounds: 3370"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1111.7540755520868,
            "unit": "iter/sec",
            "range": "stddev: 0.0000398827539308173",
            "extra": "mean: 899.4794999995024 usec\nrounds: 1104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 292.35062268856774,
            "unit": "iter/sec",
            "range": "stddev: 0.00017038511363355488",
            "extra": "mean: 3.420550265306839 msec\nrounds: 294"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.06811732697548,
            "unit": "iter/sec",
            "range": "stddev: 0.00004963895680896296",
            "extra": "mean: 7.5718501954880635 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.72119549320155,
            "unit": "iter/sec",
            "range": "stddev: 0.000056786351323454176",
            "extra": "mean: 13.38308352000316 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1017.6600453360231,
            "unit": "iter/sec",
            "range": "stddev: 0.00002194283401956085",
            "extra": "mean: 982.6464196791849 usec\nrounds: 996"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 308.52287369485447,
            "unit": "iter/sec",
            "range": "stddev: 0.000032454108202256635",
            "extra": "mean: 3.241250763757157 msec\nrounds: 309"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 85.89079069679063,
            "unit": "iter/sec",
            "range": "stddev: 0.00004067610055752645",
            "extra": "mean: 11.642691747130064 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.54331301263092,
            "unit": "iter/sec",
            "range": "stddev: 0.0004994890060084389",
            "extra": "mean: 25.288725800000122 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.70151077468606,
            "unit": "iter/sec",
            "range": "stddev: 0.0001279476701904917",
            "extra": "mean: 44.049931739128006 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}