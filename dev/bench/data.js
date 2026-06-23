window.BENCHMARK_DATA = {
  "lastUpdate": 1782247001418,
  "repoUrl": "https://github.com/trout314/voles",
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
          "id": "df681781b40b36367d193d81e03a4c55ca2c6850",
          "message": "Unify solver return contract: add return_function to array solvers\n\nThe array-based solvers (solve_VIE_1/2, solve_VIDE) now accept\nreturn_function=True and return a callable solution object as the second tuple\nelement, matching the callable-input family. The object evaluates the piecewise\npolynomial at any time and also indexes/iterates like the previous list of\nper-interval polynomials (new _SolutionListMixin), so existing code keeps\nworking. return_polys becomes a deprecated alias emitting DeprecationWarning.\n\n_SolutionFunction and _ComplexSolutionFunction move to a shared _solution.py\nimported by both solver modules. Complex and matrix paths reuse list semantics\nso their internal consumers are unaffected.\n\nTests migrated to return_function; added VIE-2 coverage for callable evaluation,\nlist semantics, and the deprecation alias. Docs and CHANGELOG updated.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-23T16:29:13-04:00",
          "tree_id": "69036c5ab150a5091a91f3728dacecdb80c06edd",
          "url": "https://github.com/trout314/voles/commit/df681781b40b36367d193d81e03a4c55ca2c6850"
        },
        "date": 1782247000674,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15806.561997329403,
            "unit": "iter/sec",
            "range": "stddev: 0.00007633642554198798",
            "extra": "mean: 63.26486431198352 usec\nrounds: 10362"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6214.724660774841,
            "unit": "iter/sec",
            "range": "stddev: 0.000015978002910635432",
            "extra": "mean: 160.9081744701658 usec\nrounds: 5852"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1858.742249606715,
            "unit": "iter/sec",
            "range": "stddev: 0.000019288018864116113",
            "extra": "mean: 537.9982083108008 usec\nrounds: 1853"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 866.903683161871,
            "unit": "iter/sec",
            "range": "stddev: 0.000027621844022628594",
            "extra": "mean: 1.1535306856151364 msec\nrounds: 862"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 498.5564792695027,
            "unit": "iter/sec",
            "range": "stddev: 0.0000323747149024685",
            "extra": "mean: 2.0057908012051606 msec\nrounds: 498"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28212.676237491007,
            "unit": "iter/sec",
            "range": "stddev: 0.000011019283558085343",
            "extra": "mean: 35.44505992916507 usec\nrounds: 13833"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17013.760445455693,
            "unit": "iter/sec",
            "range": "stddev: 0.000012869285929184087",
            "extra": "mean: 58.77595392305503 usec\nrounds: 14606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7098.473928234174,
            "unit": "iter/sec",
            "range": "stddev: 0.000016154049768227972",
            "extra": "mean: 140.8753501259617 usec\nrounds: 5955"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3698.4282757113797,
            "unit": "iter/sec",
            "range": "stddev: 0.000016824100016041205",
            "extra": "mean: 270.3851272626488 usec\nrounds: 3646"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2229.8151665984255,
            "unit": "iter/sec",
            "range": "stddev: 0.000019308571543166736",
            "extra": "mean: 448.4676644860641 usec\nrounds: 2140"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22366.567235229275,
            "unit": "iter/sec",
            "range": "stddev: 0.000012362877573766383",
            "extra": "mean: 44.7095877289973 usec\nrounds: 17195"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13302.642703602842,
            "unit": "iter/sec",
            "range": "stddev: 0.0000139550183237528",
            "extra": "mean: 75.17303307929659 usec\nrounds: 11941"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5847.079421994294,
            "unit": "iter/sec",
            "range": "stddev: 0.0000172406007582953",
            "extra": "mean: 171.0255544397796 usec\nrounds: 5676"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3171.5306769959134,
            "unit": "iter/sec",
            "range": "stddev: 0.000019106447618531118",
            "extra": "mean: 315.30516392393974 usec\nrounds: 3160"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1974.755459742193,
            "unit": "iter/sec",
            "range": "stddev: 0.000020454455701749476",
            "extra": "mean: 506.39181427079154 usec\nrounds: 1906"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1726.898652513365,
            "unit": "iter/sec",
            "range": "stddev: 0.000017530231730002733",
            "extra": "mean: 579.0727779795177 usec\nrounds: 1653"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 689.888586442536,
            "unit": "iter/sec",
            "range": "stddev: 0.000022039350769769954",
            "extra": "mean: 1.4495094130438908 msec\nrounds: 690"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 239.388376343561,
            "unit": "iter/sec",
            "range": "stddev: 0.00013512313083307553",
            "extra": "mean: 4.177312262500325 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 122.10416804259583,
            "unit": "iter/sec",
            "range": "stddev: 0.00004301089664194311",
            "extra": "mean: 8.18972862295046 msec\nrounds: 122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 73.95877048822479,
            "unit": "iter/sec",
            "range": "stddev: 0.0000994158707459318",
            "extra": "mean: 13.52104683999869 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10273.15936237116,
            "unit": "iter/sec",
            "range": "stddev: 0.000014856299104098937",
            "extra": "mean: 97.34103840176279 usec\nrounds: 8385"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4140.986751426672,
            "unit": "iter/sec",
            "range": "stddev: 0.000019202215582831172",
            "extra": "mean: 241.48833599998247 usec\nrounds: 3750"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1297.4690476206545,
            "unit": "iter/sec",
            "range": "stddev: 0.000022614846533464865",
            "extra": "mean: 770.731295543301 usec\nrounds: 1279"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 613.6703442922575,
            "unit": "iter/sec",
            "range": "stddev: 0.00004056932556127127",
            "extra": "mean: 1.6295393924457833 msec\nrounds: 609"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 356.66392172417665,
            "unit": "iter/sec",
            "range": "stddev: 0.000030625518215978666",
            "extra": "mean: 2.803759895774775 msec\nrounds: 355"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9577.935812217293,
            "unit": "iter/sec",
            "range": "stddev: 0.000016350983867186643",
            "extra": "mean: 104.40662994676093 usec\nrounds: 8642"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3813.4401447448254,
            "unit": "iter/sec",
            "range": "stddev: 0.000018603298654087038",
            "extra": "mean: 262.23041716757155 usec\nrounds: 3495"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1254.0716081570101,
            "unit": "iter/sec",
            "range": "stddev: 0.000022920784439571348",
            "extra": "mean: 797.4026311540574 usec\nrounds: 1239"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 585.6305704907245,
            "unit": "iter/sec",
            "range": "stddev: 0.00017711354628966057",
            "extra": "mean: 1.7075611322032898 msec\nrounds: 590"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 350.6189634439839,
            "unit": "iter/sec",
            "range": "stddev: 0.000038684800517794154",
            "extra": "mean: 2.8520990142045286 msec\nrounds: 352"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3923.525557323104,
            "unit": "iter/sec",
            "range": "stddev: 0.00002283433009220346",
            "extra": "mean: 254.87281410300486 usec\nrounds: 3744"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1119.178843989137,
            "unit": "iter/sec",
            "range": "stddev: 0.000024501862526492464",
            "extra": "mean: 893.5122437050876 usec\nrounds: 1112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 295.07394876548864,
            "unit": "iter/sec",
            "range": "stddev: 0.00003281956961727536",
            "extra": "mean: 3.388980979797558 msec\nrounds: 297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.52057435472545,
            "unit": "iter/sec",
            "range": "stddev: 0.00012470494644718866",
            "extra": "mean: 7.545998082707085 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.23164089500617,
            "unit": "iter/sec",
            "range": "stddev: 0.00006743283556023643",
            "extra": "mean: 13.292279526318021 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1022.1185465966711,
            "unit": "iter/sec",
            "range": "stddev: 0.000021943056435127286",
            "extra": "mean: 978.360096614704 usec\nrounds: 1004"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 312.05037435414795,
            "unit": "iter/sec",
            "range": "stddev: 0.00003055006149704128",
            "extra": "mean: 3.2046108006430196 msec\nrounds: 311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.57371966177266,
            "unit": "iter/sec",
            "range": "stddev: 0.00005858999047334829",
            "extra": "mean: 11.550849425285332 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.63243020536218,
            "unit": "iter/sec",
            "range": "stddev: 0.00010182487165518359",
            "extra": "mean: 25.231861756100493 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.79196016141983,
            "unit": "iter/sec",
            "range": "stddev: 0.00015004807851394088",
            "extra": "mean: 43.87512056522061 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}