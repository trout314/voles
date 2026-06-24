window.BENCHMARK_DATA = {
  "lastUpdate": 1782315623255,
  "repoUrl": "https://github.com/trout314/voles",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "atrout@Aarons-MacBook-Air.local",
            "name": "Aaron Trout"
          },
          "committer": {
            "email": "atrout@Aarons-MacBook-Air.local",
            "name": "Aaron Trout"
          },
          "distinct": true,
          "id": "c1d9027f1cbb4ce1ec2a4d774bf7af6294ae572c",
          "message": "docs: replace benchmark chart with an auto-updated table of times\n\nThe README benchmark section now shows a markdown table of mean wall-clock times\n(scalar VIE-1/2/VIDE, VIE-1 continuous, and their d=2 vector variants) instead of\nthe line-chart PNG. CI (bench.yml) regenerates the table from pytest-benchmark\nJSON via the new benchmarks/make_table.py and commits it between markers in\nREADME, replacing the previous chart-render-and-commit step.\n\nMatrix (d x m) timings are intentionally omitted: their wall-clock is bound by\nthe runner's core count (columns run in parallel), which would be misleading on\nthe 2-core CI VM; the big-O table and parallelism note already cover that case.\n\nRemoves benchmarks/results.png and benchmarks/plot_results.py. Seeded with local\nnumbers; CI overwrites with reference-runner values on push.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-24T11:32:57-04:00",
          "tree_id": "545486e7bdc579b29d37ea4772e8a2170f2dbf1e",
          "url": "https://github.com/trout314/voles/commit/c1d9027f1cbb4ce1ec2a4d774bf7af6294ae572c"
        },
        "date": 1782315621749,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15499.936051288403,
            "unit": "iter/sec",
            "range": "stddev: 0.00008695105922546371",
            "extra": "mean: 64.51639520905488 usec\nrounds: 8641"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6157.055545837043,
            "unit": "iter/sec",
            "range": "stddev: 0.00001784130672061598",
            "extra": "mean: 162.4152961680081 usec\nrounds: 5767"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1856.6862577825987,
            "unit": "iter/sec",
            "range": "stddev: 0.000018272039279463068",
            "extra": "mean: 538.5939578150801 usec\nrounds: 1849"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 866.4226429219632,
            "unit": "iter/sec",
            "range": "stddev: 0.000026814243259336564",
            "extra": "mean: 1.154171129031848 msec\nrounds: 775"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 499.14033896416504,
            "unit": "iter/sec",
            "range": "stddev: 0.00004286049340023906",
            "extra": "mean: 2.0034445664624863 msec\nrounds: 489"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27627.076608773845,
            "unit": "iter/sec",
            "range": "stddev: 0.000011331125696566556",
            "extra": "mean: 36.19637409201735 usec\nrounds: 16520"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16878.897235318607,
            "unit": "iter/sec",
            "range": "stddev: 0.000013152958304931462",
            "extra": "mean: 59.24557665458907 usec\nrounds: 14187"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7037.5000898933795,
            "unit": "iter/sec",
            "range": "stddev: 0.000019732478188101915",
            "extra": "mean: 142.09591292739157 usec\nrounds: 5972"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3679.265795326096,
            "unit": "iter/sec",
            "range": "stddev: 0.000020797537440139034",
            "extra": "mean: 271.79335650888174 usec\nrounds: 3380"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2227.528508634842,
            "unit": "iter/sec",
            "range": "stddev: 0.000019630102037472747",
            "extra": "mean: 448.9280366664567 usec\nrounds: 2100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21998.21591480818,
            "unit": "iter/sec",
            "range": "stddev: 0.000012526616891523582",
            "extra": "mean: 45.45823187992469 usec\nrounds: 17729"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13193.948240327769,
            "unit": "iter/sec",
            "range": "stddev: 0.000013821853686404574",
            "extra": "mean: 75.79232400984148 usec\nrounds: 11941"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5860.985103655791,
            "unit": "iter/sec",
            "range": "stddev: 0.000017042720547752405",
            "extra": "mean: 170.619781882102 usec\nrounds: 5685"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3183.1035444446525,
            "unit": "iter/sec",
            "range": "stddev: 0.000018664341858755574",
            "extra": "mean: 314.15880320489777 usec\nrounds: 3120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1977.464313764054,
            "unit": "iter/sec",
            "range": "stddev: 0.000020912898331702682",
            "extra": "mean: 505.69812716191325 usec\nrounds: 1966"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1727.1712617767814,
            "unit": "iter/sec",
            "range": "stddev: 0.00002163031603781696",
            "extra": "mean: 578.9813796295317 usec\nrounds: 1620"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 684.1663584218527,
            "unit": "iter/sec",
            "range": "stddev: 0.00003093026111040151",
            "extra": "mean: 1.461632814432256 msec\nrounds: 679"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 239.79108366012997,
            "unit": "iter/sec",
            "range": "stddev: 0.00003826034489133886",
            "extra": "mean: 4.170296846472236 msec\nrounds: 241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 121.90885143380066,
            "unit": "iter/sec",
            "range": "stddev: 0.00005102056558828274",
            "extra": "mean: 8.202849819670586 msec\nrounds: 122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 73.89193079307913,
            "unit": "iter/sec",
            "range": "stddev: 0.00006120158925405055",
            "extra": "mean: 13.533277439999742 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10288.715247469281,
            "unit": "iter/sec",
            "range": "stddev: 0.000015770278737832447",
            "extra": "mean: 97.19386492360844 usec\nrounds: 8262"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4152.903786255655,
            "unit": "iter/sec",
            "range": "stddev: 0.0000196415845960488",
            "extra": "mean: 240.79536908838932 usec\nrounds: 4102"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1299.9555965516763,
            "unit": "iter/sec",
            "range": "stddev: 0.000021837052472110368",
            "extra": "mean: 769.257044358013 usec\nrounds: 1285"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 615.3106088607623,
            "unit": "iter/sec",
            "range": "stddev: 0.000028448492287342915",
            "extra": "mean: 1.6251954469816212 msec\nrounds: 613"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 355.8232157676432,
            "unit": "iter/sec",
            "range": "stddev: 0.0000414817802797161",
            "extra": "mean: 2.8103843585434065 msec\nrounds: 357"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9565.589284250234,
            "unit": "iter/sec",
            "range": "stddev: 0.000015216392235337193",
            "extra": "mean: 104.54139000578901 usec\nrounds: 8505"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3898.345752786713,
            "unit": "iter/sec",
            "range": "stddev: 0.000025482168595259225",
            "extra": "mean: 256.5190630628786 usec\nrounds: 3885"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1255.364688367354,
            "unit": "iter/sec",
            "range": "stddev: 0.000023508941091049384",
            "extra": "mean: 796.5812717741292 usec\nrounds: 1240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 597.8140911759176,
            "unit": "iter/sec",
            "range": "stddev: 0.00010449949039414648",
            "extra": "mean: 1.6727608377931862 msec\nrounds: 598"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 350.8841728912708,
            "unit": "iter/sec",
            "range": "stddev: 0.00003795393133611198",
            "extra": "mean: 2.849943306818435 msec\nrounds: 352"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3938.7789414418894,
            "unit": "iter/sec",
            "range": "stddev: 0.00001691445073852027",
            "extra": "mean: 253.88578919179577 usec\nrounds: 3738"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1117.5358503090436,
            "unit": "iter/sec",
            "range": "stddev: 0.000024985789681471363",
            "extra": "mean: 894.8258793876365 usec\nrounds: 1111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 295.1423220198814,
            "unit": "iter/sec",
            "range": "stddev: 0.000031624872578496465",
            "extra": "mean: 3.3881958817571336 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.74065910222535,
            "unit": "iter/sec",
            "range": "stddev: 0.00011430245400309112",
            "extra": "mean: 7.53348677611949 msec\nrounds: 134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.26312650052586,
            "unit": "iter/sec",
            "range": "stddev: 0.000050815825097806885",
            "extra": "mean: 13.286718828947572 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1022.3331923943616,
            "unit": "iter/sec",
            "range": "stddev: 0.000021724738858409497",
            "extra": "mean: 978.1546832671489 usec\nrounds: 1004"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 311.11319610142345,
            "unit": "iter/sec",
            "range": "stddev: 0.00003636074627788542",
            "extra": "mean: 3.2142641730760855 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.4663075022491,
            "unit": "iter/sec",
            "range": "stddev: 0.00005882653714247846",
            "extra": "mean: 11.565198386365566 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.95901539651303,
            "unit": "iter/sec",
            "range": "stddev: 0.00006514571785455534",
            "extra": "mean: 25.025641650000807 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.88252940041449,
            "unit": "iter/sec",
            "range": "stddev: 0.00009187664778000704",
            "extra": "mean: 43.70146247826458 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}