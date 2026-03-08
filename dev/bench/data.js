window.BENCHMARK_DATA = {
  "lastUpdate": 1773004331259,
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
          "id": "2dfc33314ab859e54bc33c62d9874662c7ad7ee4",
          "message": "Improve benchmark chart y-axis tick formatting and spacing\n\nLimit y-axis labels to 1 decimal place, reduce to at most 4 major ticks\nper panel, and increase column spacing slightly (wspace 0.15 → 0.2).\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T17:05:05-04:00",
          "tree_id": "5971b743bf80dda1455ff1ef56832b95373f7a86",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/2dfc33314ab859e54bc33c62d9874662c7ad7ee4"
        },
        "date": 1773004330103,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16256.012039475852,
            "unit": "iter/sec",
            "range": "stddev: 0.00007626632873201919",
            "extra": "mean: 61.51570247189872 usec\nrounds: 12298"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5819.68979033657,
            "unit": "iter/sec",
            "range": "stddev: 0.0001319434029805069",
            "extra": "mean: 171.8304645138426 usec\nrounds: 5636"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1690.7266008731553,
            "unit": "iter/sec",
            "range": "stddev: 0.00003093501663676564",
            "extra": "mean: 591.461682500034 usec\nrounds: 1600"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 766.3183952186629,
            "unit": "iter/sec",
            "range": "stddev: 0.00005312695371203681",
            "extra": "mean: 1.304940617684974 msec\nrounds: 769"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 438.8312077518187,
            "unit": "iter/sec",
            "range": "stddev: 0.00014299456307616007",
            "extra": "mean: 2.2787805022416516 msec\nrounds: 446"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 32188.334527979667,
            "unit": "iter/sec",
            "range": "stddev: 0.0000127832687774001",
            "extra": "mean: 31.067155684328785 usec\nrounds: 16572"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 18132.57998911688,
            "unit": "iter/sec",
            "range": "stddev: 0.000018553200558156176",
            "extra": "mean: 55.14934998771257 usec\nrounds: 16232"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6993.536463456332,
            "unit": "iter/sec",
            "range": "stddev: 0.00002477579003367399",
            "extra": "mean: 142.98917367848856 usec\nrounds: 6489"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3540.840299482775,
            "unit": "iter/sec",
            "range": "stddev: 0.0000240278936354934",
            "extra": "mean: 282.4188371743493 usec\nrounds: 3341"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2096.886085251597,
            "unit": "iter/sec",
            "range": "stddev: 0.00003636730945252565",
            "extra": "mean: 476.8976278842606 usec\nrounds: 2037"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 27317.94669959764,
            "unit": "iter/sec",
            "range": "stddev: 0.000013982793864626467",
            "extra": "mean: 36.60597229347141 usec\nrounds: 22630"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 15028.197972677213,
            "unit": "iter/sec",
            "range": "stddev: 0.000019961836817060535",
            "extra": "mean: 66.54157749439429 usec\nrounds: 14272"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6022.43526269191,
            "unit": "iter/sec",
            "range": "stddev: 0.000027177866409098238",
            "extra": "mean: 166.04578652673132 usec\nrounds: 5715"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3149.2623211926875,
            "unit": "iter/sec",
            "range": "stddev: 0.0000309059414939805",
            "extra": "mean: 317.5346789216594 usec\nrounds: 2856"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1899.5845384891363,
            "unit": "iter/sec",
            "range": "stddev: 0.00023454329822709323",
            "extra": "mean: 526.4309009355095 usec\nrounds: 1817"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1733.9119564967941,
            "unit": "iter/sec",
            "range": "stddev: 0.000020266150771131418",
            "extra": "mean: 576.730552121231 usec\nrounds: 1650"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 694.046565646225,
            "unit": "iter/sec",
            "range": "stddev: 0.000030062858583676338",
            "extra": "mean: 1.4408255144507525 msec\nrounds: 692"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 244.55316199998225,
            "unit": "iter/sec",
            "range": "stddev: 0.0000425196547189264",
            "extra": "mean: 4.089090453060969 msec\nrounds: 245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 125.00689288006105,
            "unit": "iter/sec",
            "range": "stddev: 0.00017820373604404368",
            "extra": "mean: 7.999558880000792 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 76.2470959164577,
            "unit": "iter/sec",
            "range": "stddev: 0.00015938322829004456",
            "extra": "mean: 13.115253610389022 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 11284.340449040403,
            "unit": "iter/sec",
            "range": "stddev: 0.00001888845142432589",
            "extra": "mean: 88.6183826618806 usec\nrounds: 7521"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4272.537848303061,
            "unit": "iter/sec",
            "range": "stddev: 0.0000256960537651875",
            "extra": "mean: 234.0529295479907 usec\nrounds: 3804"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1283.6962416954123,
            "unit": "iter/sec",
            "range": "stddev: 0.000030396635550051766",
            "extra": "mean: 779.0004889936213 usec\nrounds: 1272"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 597.4275741725028,
            "unit": "iter/sec",
            "range": "stddev: 0.00007207625074622017",
            "extra": "mean: 1.6738430618725635 msec\nrounds: 598"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 341.2074290230721,
            "unit": "iter/sec",
            "range": "stddev: 0.00004520674901735478",
            "extra": "mean: 2.930768544117429 msec\nrounds: 340"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10700.586742517151,
            "unit": "iter/sec",
            "range": "stddev: 0.000020659260684820833",
            "extra": "mean: 93.45281936986242 usec\nrounds: 9107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4098.156930417942,
            "unit": "iter/sec",
            "range": "stddev: 0.00002881232712599391",
            "extra": "mean: 244.0121295935871 usec\nrounds: 3619"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1253.994458157986,
            "unit": "iter/sec",
            "range": "stddev: 0.00003580802542458963",
            "extra": "mean: 797.4516900727913 usec\nrounds: 1239"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 583.3809165590426,
            "unit": "iter/sec",
            "range": "stddev: 0.000048675976933821",
            "extra": "mean: 1.7141458892730037 msec\nrounds: 578"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 332.410812863063,
            "unit": "iter/sec",
            "range": "stddev: 0.0001741609870974376",
            "extra": "mean: 3.008325726190956 msec\nrounds: 336"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4242.811158228582,
            "unit": "iter/sec",
            "range": "stddev: 0.000026791681350965385",
            "extra": "mean: 235.69279015885087 usec\nrounds: 3841"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1198.5547467799843,
            "unit": "iter/sec",
            "range": "stddev: 0.00003202833419577852",
            "extra": "mean: 834.3381916316982 usec\nrounds: 1195"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 310.4870328024114,
            "unit": "iter/sec",
            "range": "stddev: 0.000043459938190312804",
            "extra": "mean: 3.2207464220780606 msec\nrounds: 308"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 139.3454288887945,
            "unit": "iter/sec",
            "range": "stddev: 0.00007481512270419474",
            "extra": "mean: 7.176410507143771 msec\nrounds: 140"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 78.5618219877955,
            "unit": "iter/sec",
            "range": "stddev: 0.0001047744004363641",
            "extra": "mean: 12.728829025316507 msec\nrounds: 79"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 977.5351945345059,
            "unit": "iter/sec",
            "range": "stddev: 0.000033766068406665344",
            "extra": "mean: 1.0229810707492653 msec\nrounds: 947"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 295.8511231496338,
            "unit": "iter/sec",
            "range": "stddev: 0.0001285197582691046",
            "extra": "mean: 3.380078430509206 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 82.30697135048916,
            "unit": "iter/sec",
            "range": "stddev: 0.00006911807397891597",
            "extra": "mean: 12.149639132530865 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 37.800721175288906,
            "unit": "iter/sec",
            "range": "stddev: 0.00024244847577762054",
            "extra": "mean: 26.45452173684242 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.758258610133808,
            "unit": "iter/sec",
            "range": "stddev: 0.00018553674903449478",
            "extra": "mean: 45.95956036363382 msec\nrounds: 22"
          }
        ]
      }
    ]
  }
}