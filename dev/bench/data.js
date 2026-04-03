window.BENCHMARK_DATA = {
  "lastUpdate": 1775240260360,
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
          "id": "16cec8a70bb9ec6bc9aaaba2e182c13171193687",
          "message": "Add piecewise polynomial illustration and Mathematica verification comments\n\n- Add diagram and plotting script showing collocation method concept\n- Add Mathematica commands used to verify VIE-1 test exact solution\n\nCo-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-04-03T14:10:13-04:00",
          "tree_id": "f7acefde72adc7d88f8538843e7be9711fe3c4f6",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/16cec8a70bb9ec6bc9aaaba2e182c13171193687"
        },
        "date": 1775240259261,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15680.204530460613,
            "unit": "iter/sec",
            "range": "stddev: 0.00012265482866365837",
            "extra": "mean: 63.77467832497875 usec\nrounds: 10436"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5764.839567472978,
            "unit": "iter/sec",
            "range": "stddev: 0.00003915263374183144",
            "extra": "mean: 173.46536504542323 usec\nrounds: 5550"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1677.2648791523413,
            "unit": "iter/sec",
            "range": "stddev: 0.000048067853360651896",
            "extra": "mean: 596.2087517777046 usec\nrounds: 1547"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 768.4478268026613,
            "unit": "iter/sec",
            "range": "stddev: 0.00006470373507606886",
            "extra": "mean: 1.3013245208341278 msec\nrounds: 768"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 441.0265030466452,
            "unit": "iter/sec",
            "range": "stddev: 0.00007310560277928166",
            "extra": "mean: 2.2674374285715775 msec\nrounds: 441"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30651.09697551891,
            "unit": "iter/sec",
            "range": "stddev: 0.000016900748774156323",
            "extra": "mean: 32.62525973535962 usec\nrounds: 15793"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17500.76991199277,
            "unit": "iter/sec",
            "range": "stddev: 0.000026903173432108443",
            "extra": "mean: 57.140343255111816 usec\nrounds: 15152"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6822.511018705347,
            "unit": "iter/sec",
            "range": "stddev: 0.00003803265555255556",
            "extra": "mean: 146.5735998459057 usec\nrounds: 6475"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3488.1194543278766,
            "unit": "iter/sec",
            "range": "stddev: 0.000042623264188232985",
            "extra": "mean: 286.68742945693907 usec\nrounds: 3225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2071.782158235989,
            "unit": "iter/sec",
            "range": "stddev: 0.00006460491063267144",
            "extra": "mean: 482.6762292670028 usec\nrounds: 1893"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24979.7574698907,
            "unit": "iter/sec",
            "range": "stddev: 0.000023017700820147076",
            "extra": "mean: 40.03241429406783 usec\nrounds: 19421"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14050.697166475966,
            "unit": "iter/sec",
            "range": "stddev: 0.000034180593816872107",
            "extra": "mean: 71.17084569909697 usec\nrounds: 13182"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5807.237905075294,
            "unit": "iter/sec",
            "range": "stddev: 0.000047285718927925864",
            "extra": "mean: 172.19890356584838 usec\nrounds: 5496"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3087.929356256802,
            "unit": "iter/sec",
            "range": "stddev: 0.00005030131788627282",
            "extra": "mean: 323.84160537020944 usec\nrounds: 2719"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1877.4582699926286,
            "unit": "iter/sec",
            "range": "stddev: 0.00006938120148910474",
            "extra": "mean: 532.6350076499576 usec\nrounds: 1830"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1713.9906230416166,
            "unit": "iter/sec",
            "range": "stddev: 0.000033836624594410195",
            "extra": "mean: 583.4337636138395 usec\nrounds: 1616"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 691.1129089756474,
            "unit": "iter/sec",
            "range": "stddev: 0.00003626880587291091",
            "extra": "mean: 1.4469415735298279 msec\nrounds: 680"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 244.97469369594876,
            "unit": "iter/sec",
            "range": "stddev: 0.000052928622910804764",
            "extra": "mean: 4.082054292681977 msec\nrounds: 246"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 125.56749206557613,
            "unit": "iter/sec",
            "range": "stddev: 0.00008540255594927016",
            "extra": "mean: 7.9638446507935505 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 76.736980192798,
            "unit": "iter/sec",
            "range": "stddev: 0.00009116571370227001",
            "extra": "mean: 13.03152661842501 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 11114.033812522897,
            "unit": "iter/sec",
            "range": "stddev: 0.00002962256145032562",
            "extra": "mean: 89.97633234417873 usec\nrounds: 8425"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4318.880277619638,
            "unit": "iter/sec",
            "range": "stddev: 0.00003510926762134912",
            "extra": "mean: 231.54149587845313 usec\nrounds: 4003"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1315.2933595646323,
            "unit": "iter/sec",
            "range": "stddev: 0.000045849137227489864",
            "extra": "mean: 760.286663601042 usec\nrounds: 1305"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 619.5107886359673,
            "unit": "iter/sec",
            "range": "stddev: 0.000052922371000843435",
            "extra": "mean: 1.6141768930316613 msec\nrounds: 617"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 356.54978594885654,
            "unit": "iter/sec",
            "range": "stddev: 0.00007457065751538114",
            "extra": "mean: 2.804657412256699 msec\nrounds: 359"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10554.870949727163,
            "unit": "iter/sec",
            "range": "stddev: 0.000028528601095043022",
            "extra": "mean: 94.74298688851799 usec\nrounds: 9076"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3996.9392524128184,
            "unit": "iter/sec",
            "range": "stddev: 0.00005116770090146382",
            "extra": "mean: 250.19144321403772 usec\nrounds: 3795"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1279.4810109937985,
            "unit": "iter/sec",
            "range": "stddev: 0.00008625896486911821",
            "extra": "mean: 781.5668942388445 usec\nrounds: 1267"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 605.8009508999037,
            "unit": "iter/sec",
            "range": "stddev: 0.00008196742972165825",
            "extra": "mean: 1.6507072141674957 msec\nrounds: 607"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 346.7614041273119,
            "unit": "iter/sec",
            "range": "stddev: 0.00010459400550901431",
            "extra": "mean: 2.88382728901644 msec\nrounds: 346"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4199.005743941385,
            "unit": "iter/sec",
            "range": "stddev: 0.00004398125568215389",
            "extra": "mean: 238.15161516339168 usec\nrounds: 3825"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1193.3787844455176,
            "unit": "iter/sec",
            "range": "stddev: 0.00005603020495484576",
            "extra": "mean: 837.9569111115314 usec\nrounds: 1125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 311.57610011106715,
            "unit": "iter/sec",
            "range": "stddev: 0.00011446581518682724",
            "extra": "mean: 3.2094887882720506 msec\nrounds: 307"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 136.41758832399827,
            "unit": "iter/sec",
            "range": "stddev: 0.00036940063477597135",
            "extra": "mean: 7.330433064283121 msec\nrounds: 140"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 78.79696307726697,
            "unit": "iter/sec",
            "range": "stddev: 0.000291069888073414",
            "extra": "mean: 12.690844430380102 msec\nrounds: 79"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 968.339001739613,
            "unit": "iter/sec",
            "range": "stddev: 0.00006637958729625802",
            "extra": "mean: 1.0326961923494853 msec\nrounds: 941"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 295.2917623202249,
            "unit": "iter/sec",
            "range": "stddev: 0.00009066382281408885",
            "extra": "mean: 3.3864811945399427 msec\nrounds: 293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 81.04120226535927,
            "unit": "iter/sec",
            "range": "stddev: 0.00041491741004409606",
            "extra": "mean: 12.339402329269811 msec\nrounds: 82"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 37.950976446668996,
            "unit": "iter/sec",
            "range": "stddev: 0.0001315383855496849",
            "extra": "mean: 26.34978315789214 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.771619887532292,
            "unit": "iter/sec",
            "range": "stddev: 0.00012670727861022706",
            "extra": "mean: 45.9313549090878 msec\nrounds: 22"
          }
        ]
      }
    ]
  }
}