window.BENCHMARK_DATA = {
  "lastUpdate": 1773242175256,
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
          "id": "a34a836d1710c914d0b666b31ea49aa2bbb4fceb",
          "message": "Add CLAUDE.md with build, test, and architecture guidance\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-11T11:07:08-04:00",
          "tree_id": "23b68c78b832ef2c995e2a357cf32b0498acea14",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/a34a836d1710c914d0b666b31ea49aa2bbb4fceb"
        },
        "date": 1773242174212,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15625.587920358947,
            "unit": "iter/sec",
            "range": "stddev: 0.00009855864791155203",
            "extra": "mean: 63.997591968816515 usec\nrounds: 10634"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6224.885868172187,
            "unit": "iter/sec",
            "range": "stddev: 0.000016137210258789883",
            "extra": "mean: 160.64551562511298 usec\nrounds: 5440"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1867.608077610862,
            "unit": "iter/sec",
            "range": "stddev: 0.000019868294512284643",
            "extra": "mean: 535.4442465676472 usec\nrounds: 1821"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 869.8942119851934,
            "unit": "iter/sec",
            "range": "stddev: 0.00002443316531660953",
            "extra": "mean: 1.1495650692029449 msec\nrounds: 867"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.8734371330676,
            "unit": "iter/sec",
            "range": "stddev: 0.000042471009114965836",
            "extra": "mean: 1.9965123439643073 msec\nrounds: 439"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27885.18175074971,
            "unit": "iter/sec",
            "range": "stddev: 0.000010609060597552846",
            "extra": "mean: 35.86134058362788 usec\nrounds: 15861"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16908.481261171986,
            "unit": "iter/sec",
            "range": "stddev: 0.00001333037237503927",
            "extra": "mean: 59.14191727534768 usec\nrounds: 15062"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7122.82979903704,
            "unit": "iter/sec",
            "range": "stddev: 0.000015761613057846283",
            "extra": "mean: 140.39363963676254 usec\nrounds: 6832"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3702.2909690324664,
            "unit": "iter/sec",
            "range": "stddev: 0.000016351121767296512",
            "extra": "mean: 270.1030276562335 usec\nrounds: 3435"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2232.257793336307,
            "unit": "iter/sec",
            "range": "stddev: 0.00001915779114727072",
            "extra": "mean: 447.9769330339806 usec\nrounds: 2225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21905.384192299804,
            "unit": "iter/sec",
            "range": "stddev: 0.0000124427987630352",
            "extra": "mean: 45.65087702737123 usec\nrounds: 17142"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13191.998739536031,
            "unit": "iter/sec",
            "range": "stddev: 0.000013818874887140323",
            "extra": "mean: 75.80352452604696 usec\nrounds: 12028"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5859.531623134894,
            "unit": "iter/sec",
            "range": "stddev: 0.000016718687099408624",
            "extra": "mean: 170.66210480915407 usec\nrounds: 5677"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3186.9274596222012,
            "unit": "iter/sec",
            "range": "stddev: 0.00002344779170321889",
            "extra": "mean: 313.7818518525509 usec\nrounds: 3024"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1934.3138273248294,
            "unit": "iter/sec",
            "range": "stddev: 0.00006176632865064028",
            "extra": "mean: 516.9791922456594 usec\nrounds: 1238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1771.7502316295213,
            "unit": "iter/sec",
            "range": "stddev: 0.000016834236383926696",
            "extra": "mean: 564.4136414647318 usec\nrounds: 1693"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 709.5866310328493,
            "unit": "iter/sec",
            "range": "stddev: 0.00002073585123449589",
            "extra": "mean: 1.4092711957445354 msec\nrounds: 705"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 246.9948494163993,
            "unit": "iter/sec",
            "range": "stddev: 0.00002403417298710577",
            "extra": "mean: 4.048667421052727 msec\nrounds: 247"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 125.11653065692856,
            "unit": "iter/sec",
            "range": "stddev: 0.00020068166401181515",
            "extra": "mean: 7.992548984130764 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.87173921112921,
            "unit": "iter/sec",
            "range": "stddev: 0.00021407585438889932",
            "extra": "mean: 13.180138090907445 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10425.977815369577,
            "unit": "iter/sec",
            "range": "stddev: 0.000014827470522023584",
            "extra": "mean: 95.9142650894421 usec\nrounds: 8284"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4233.00033953052,
            "unit": "iter/sec",
            "range": "stddev: 0.00001752193549056421",
            "extra": "mean: 236.2390549940068 usec\nrounds: 4055"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1320.4996903985489,
            "unit": "iter/sec",
            "range": "stddev: 0.000021409299326285178",
            "extra": "mean: 757.2890832698214 usec\nrounds: 1285"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 614.949415553826,
            "unit": "iter/sec",
            "range": "stddev: 0.00017047301622871223",
            "extra": "mean: 1.626150012841944 msec\nrounds: 623"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 362.2334293008435,
            "unit": "iter/sec",
            "range": "stddev: 0.00003491635187711282",
            "extra": "mean: 2.7606507823701607 msec\nrounds: 363"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9501.994583911901,
            "unit": "iter/sec",
            "range": "stddev: 0.000017313294955287355",
            "extra": "mean: 105.24106188116846 usec\nrounds: 8484"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3961.0714758702375,
            "unit": "iter/sec",
            "range": "stddev: 0.000018969892689029923",
            "extra": "mean: 252.45694405963795 usec\nrounds: 3897"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1248.7810826249847,
            "unit": "iter/sec",
            "range": "stddev: 0.00002348526694713967",
            "extra": "mean: 800.7808685714252 usec\nrounds: 1225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 605.1437803236144,
            "unit": "iter/sec",
            "range": "stddev: 0.0000819662675428818",
            "extra": "mean: 1.6524998397326787 msec\nrounds: 599"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 354.80736207852203,
            "unit": "iter/sec",
            "range": "stddev: 0.0000309465549197545",
            "extra": "mean: 2.8184308074720588 msec\nrounds: 348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3945.6801176319377,
            "unit": "iter/sec",
            "range": "stddev: 0.000017020046908941412",
            "extra": "mean: 253.44173125726317 usec\nrounds: 3468"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1079.7911031201056,
            "unit": "iter/sec",
            "range": "stddev: 0.00005429998051753566",
            "extra": "mean: 926.105055978378 usec\nrounds: 1054"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 293.5427540943961,
            "unit": "iter/sec",
            "range": "stddev: 0.000040886228004102064",
            "extra": "mean: 3.406658778156809 msec\nrounds: 293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.1082227919156,
            "unit": "iter/sec",
            "range": "stddev: 0.000055457128794144066",
            "extra": "mean: 7.56955153030183 msec\nrounds: 132"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.60625697374851,
            "unit": "iter/sec",
            "range": "stddev: 0.00008345555036505226",
            "extra": "mean: 13.403701519992712 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1032.1509626252366,
            "unit": "iter/sec",
            "range": "stddev: 0.00002830832318364556",
            "extra": "mean: 968.8505230441662 usec\nrounds: 933"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 310.7633507040505,
            "unit": "iter/sec",
            "range": "stddev: 0.00004092090883554949",
            "extra": "mean: 3.217882667742024 msec\nrounds: 310"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.46966098936642,
            "unit": "iter/sec",
            "range": "stddev: 0.0004513039703494096",
            "extra": "mean: 11.564749862069826 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 40.05890636778805,
            "unit": "iter/sec",
            "range": "stddev: 0.00008866782226202954",
            "extra": "mean: 24.963237658532652 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.962173500757,
            "unit": "iter/sec",
            "range": "stddev: 0.00009831844722475043",
            "extra": "mean: 43.54988433333773 msec\nrounds: 24"
          }
        ]
      }
    ]
  }
}