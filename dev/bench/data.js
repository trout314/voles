window.BENCHMARK_DATA = {
  "lastUpdate": 1773003630482,
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
          "id": "cdbfbce9ce51a9c8e60dca4cf5f68b348ff44bde",
          "message": "Remove compiled extension from version control; update CHANGELOG for 0.2.0\n\nThe .so/.dylib/.dll files were already in .gitignore but the Linux .so had\nbeen committed. Untracked with git rm --cached; local file is preserved.\n\nCHANGELOG: move [Unreleased] entries to [0.2.0] (2026-03-08), add items\nfrom this session (truncation fix, non-convergent VIE-1 settings removal,\nmatrix-valued parallel columns, _truncate_N refactor), remove stale\nnotebooks reference from [0.1.0].\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T16:53:10-04:00",
          "tree_id": "c0136b20752bbff617fc0faf9ca66beb0d41290f",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/cdbfbce9ce51a9c8e60dca4cf5f68b348ff44bde"
        },
        "date": 1773003629803,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16270.37328765576,
            "unit": "iter/sec",
            "range": "stddev: 0.00010960209759878169",
            "extra": "mean: 61.46140486885414 usec\nrounds: 11584"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6268.543600444066,
            "unit": "iter/sec",
            "range": "stddev: 0.000020253090462059495",
            "extra": "mean: 159.5266881336136 usec\nrounds: 6118"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1864.9482082076916,
            "unit": "iter/sec",
            "range": "stddev: 0.00003063322775774322",
            "extra": "mean: 536.2079201979823 usec\nrounds: 1817"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 869.9886977639891,
            "unit": "iter/sec",
            "range": "stddev: 0.00003582623519007958",
            "extra": "mean: 1.1494402198214309 msec\nrounds: 787"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.06972693555497,
            "unit": "iter/sec",
            "range": "stddev: 0.0000367717883167671",
            "extra": "mean: 1.9997211311471212 msec\nrounds: 488"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30124.37840859352,
            "unit": "iter/sec",
            "range": "stddev: 0.000011466332140320005",
            "extra": "mean: 33.19570569843632 usec\nrounds: 12161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17821.16084330092,
            "unit": "iter/sec",
            "range": "stddev: 0.000014203182904929896",
            "extra": "mean: 56.11306742545371 usec\nrounds: 15291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7240.872022276351,
            "unit": "iter/sec",
            "range": "stddev: 0.000019617475374050706",
            "extra": "mean: 138.10491290600444 usec\nrounds: 6958"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3737.1078030055764,
            "unit": "iter/sec",
            "range": "stddev: 0.000022640393574156816",
            "extra": "mean: 267.5866078028972 usec\nrounds: 3409"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2248.9546764119514,
            "unit": "iter/sec",
            "range": "stddev: 0.00003005712051725614",
            "extra": "mean: 444.6510240906364 usec\nrounds: 2034"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24933.572893707795,
            "unit": "iter/sec",
            "range": "stddev: 0.000012414692830215882",
            "extra": "mean: 40.10656652630633 usec\nrounds: 18301"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14249.311086915639,
            "unit": "iter/sec",
            "range": "stddev: 0.000015019142195673449",
            "extra": "mean: 70.17883137650388 usec\nrounds: 10135"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6027.467022000484,
            "unit": "iter/sec",
            "range": "stddev: 0.00002161480464412916",
            "extra": "mean: 165.90717068213928 usec\nrounds: 5894"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3245.353227084473,
            "unit": "iter/sec",
            "range": "stddev: 0.000024432217587507378",
            "extra": "mean: 308.1328687596727 usec\nrounds: 3185"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2005.896388689611,
            "unit": "iter/sec",
            "range": "stddev: 0.000027911654948362492",
            "extra": "mean: 498.5302359775763 usec\nrounds: 1979"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1772.6332799586767,
            "unit": "iter/sec",
            "range": "stddev: 0.000034658317262562805",
            "extra": "mean: 564.1324752874502 usec\nrounds: 1740"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 699.1674666860437,
            "unit": "iter/sec",
            "range": "stddev: 0.000046460868733190954",
            "extra": "mean: 1.4302724992909934 msec\nrounds: 705"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 240.96726784027996,
            "unit": "iter/sec",
            "range": "stddev: 0.00012225360570438458",
            "extra": "mean: 4.149941230453045 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 119.053878089165,
            "unit": "iter/sec",
            "range": "stddev: 0.0011066685058426149",
            "extra": "mean: 8.399558385246833 msec\nrounds: 122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 73.99084632012787,
            "unit": "iter/sec",
            "range": "stddev: 0.00007814243424429685",
            "extra": "mean: 13.515185319997727 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10577.114486140812,
            "unit": "iter/sec",
            "range": "stddev: 0.000016342921760519394",
            "extra": "mean: 94.54374359947597 usec\nrounds: 7929"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4204.327118612191,
            "unit": "iter/sec",
            "range": "stddev: 0.000022937042450455004",
            "extra": "mean: 237.85018905239005 usec\nrounds: 4147"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1297.3270211368217,
            "unit": "iter/sec",
            "range": "stddev: 0.00005374884403732404",
            "extra": "mean: 770.8156723072954 usec\nrounds: 1300"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 617.4488779478711,
            "unit": "iter/sec",
            "range": "stddev: 0.00003089479840643151",
            "extra": "mean: 1.6195672803286336 msec\nrounds: 610"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 356.5275172556711,
            "unit": "iter/sec",
            "range": "stddev: 0.000041885450515174865",
            "extra": "mean: 2.804832591036403 msec\nrounds: 357"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9800.712771548799,
            "unit": "iter/sec",
            "range": "stddev: 0.00001820625959803382",
            "extra": "mean: 102.03339525498315 usec\nrounds: 8177"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3969.187876507175,
            "unit": "iter/sec",
            "range": "stddev: 0.000025177744962487405",
            "extra": "mean: 251.9407070445818 usec\nrounds: 3847"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1260.8119059505036,
            "unit": "iter/sec",
            "range": "stddev: 0.000029324712847681954",
            "extra": "mean: 793.1397183675211 usec\nrounds: 1225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 593.3216768813006,
            "unit": "iter/sec",
            "range": "stddev: 0.00011010939176471373",
            "extra": "mean: 1.6854263698173615 msec\nrounds: 603"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 348.706745431773,
            "unit": "iter/sec",
            "range": "stddev: 0.00015647014129493072",
            "extra": "mean: 2.8677391908831233 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3975.701350335997,
            "unit": "iter/sec",
            "range": "stddev: 0.00002223497486053851",
            "extra": "mean: 251.52794736845297 usec\nrounds: 3610"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1126.313854210467,
            "unit": "iter/sec",
            "range": "stddev: 0.00002729297938582487",
            "extra": "mean: 887.8519928186345 usec\nrounds: 1114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 295.663657331943,
            "unit": "iter/sec",
            "range": "stddev: 0.0000364722953784057",
            "extra": "mean: 3.3822215723906006 msec\nrounds: 297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.49283281504154,
            "unit": "iter/sec",
            "range": "stddev: 0.00009148783344108709",
            "extra": "mean: 7.547578074626787 msec\nrounds: 134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.10011052246811,
            "unit": "iter/sec",
            "range": "stddev: 0.0000756622217672057",
            "extra": "mean: 13.315559631577699 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1032.6579084874566,
            "unit": "iter/sec",
            "range": "stddev: 0.000035518857896794424",
            "extra": "mean: 968.3749010983794 usec\nrounds: 1001"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 313.1188097732748,
            "unit": "iter/sec",
            "range": "stddev: 0.000039820785274443183",
            "extra": "mean: 3.1936759108278636 msec\nrounds: 314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.44237373304713,
            "unit": "iter/sec",
            "range": "stddev: 0.0000694714891133023",
            "extra": "mean: 11.568400505615656 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.65629314265892,
            "unit": "iter/sec",
            "range": "stddev: 0.0007806280638564462",
            "extra": "mean: 25.216678634148078 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.838334237753223,
            "unit": "iter/sec",
            "range": "stddev: 0.00012778526978122595",
            "extra": "mean: 43.78603052174165 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}