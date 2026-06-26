window.BENCHMARK_DATA = {
  "lastUpdate": 1782493244976,
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
          "id": "1e9ca7c896242f0489ea1957679904bfb98da6c6",
          "message": "Fix corrupted benchmark tables and the bench workflow that caused them\n\nThe benchmark CI job's commit step used `git pull --rebase --autostash`,\nwhich on a stash-pop conflict (benchmark numbers differ every run, and\nconcurrent runs race on the same README lines) left Git conflict markers in\nREADME, then blindly `git add`ed and committed them. Repeated runs nested the\nmarkers; the result was visible on the GitHub project page.\n\n- README: collapse the three stacked, conflict-marked benchmark tables back to\n  a single clean table (keeping the most recent numbers).\n- bench.yml: replace the stash/rebase-then-commit logic with a retry loop that\n  resets to the latest origin tip, regenerates the table on it (no stash), and\n  refuses to commit if any conflict marker is present (hard safety net). Pushes\n  with a fast-forward and retries on concurrent-run rejections.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-26T12:52:24-04:00",
          "tree_id": "55150e58de425c9863208b07360cace1d08793bf",
          "url": "https://github.com/trout314/voles/commit/1e9ca7c896242f0489ea1957679904bfb98da6c6"
        },
        "date": 1782493243823,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 14825.603737114825,
            "unit": "iter/sec",
            "range": "stddev: 0.0000946569277345879",
            "extra": "mean: 67.45087874543499 usec\nrounds: 10647"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6057.840396707516,
            "unit": "iter/sec",
            "range": "stddev: 0.000016397911039461006",
            "extra": "mean: 165.07532957512512 usec\nrounds: 5234"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1787.6946600690774,
            "unit": "iter/sec",
            "range": "stddev: 0.00011048845840258457",
            "extra": "mean: 559.3796425846904 usec\nrounds: 1841"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 488.76109724450527,
            "unit": "iter/sec",
            "range": "stddev: 0.00026745467172669345",
            "extra": "mean: 2.04598935070265 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 128.81647208055057,
            "unit": "iter/sec",
            "range": "stddev: 0.00003976488240440457",
            "extra": "mean: 7.762982356594019 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 25455.596343609126,
            "unit": "iter/sec",
            "range": "stddev: 0.000011596571044476376",
            "extra": "mean: 39.284092444805744 usec\nrounds: 14679"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 15911.178001774126,
            "unit": "iter/sec",
            "range": "stddev: 0.000013620891290359388",
            "extra": "mean: 62.84889779301684 usec\nrounds: 14001"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6701.664974436519,
            "unit": "iter/sec",
            "range": "stddev: 0.00003154785954679259",
            "extra": "mean: 149.21665046141473 usec\nrounds: 6397"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2141.494309555889,
            "unit": "iter/sec",
            "range": "stddev: 0.00009150450160537916",
            "extra": "mean: 466.9636503528155 usec\nrounds: 2125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 611.6483231148582,
            "unit": "iter/sec",
            "range": "stddev: 0.000026742686466950665",
            "extra": "mean: 1.6349264147532296 msec\nrounds: 610"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 20689.04804634432,
            "unit": "iter/sec",
            "range": "stddev: 0.000012335629516101691",
            "extra": "mean: 48.334751688910906 usec\nrounds: 17168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 12606.278783887938,
            "unit": "iter/sec",
            "range": "stddev: 0.000015467781421499376",
            "extra": "mean: 79.32555015982182 usec\nrounds: 11284"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5696.865773434097,
            "unit": "iter/sec",
            "range": "stddev: 0.000017961084810768854",
            "extra": "mean: 175.53511698717725 usec\nrounds: 5257"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1957.9411593398631,
            "unit": "iter/sec",
            "range": "stddev: 0.00003354358080181935",
            "extra": "mean: 510.74057830070785 usec\nrounds: 1954"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 572.4863589284114,
            "unit": "iter/sec",
            "range": "stddev: 0.00004116597882617858",
            "extra": "mean: 1.7467665113834592 msec\nrounds: 571"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1716.489051118104,
            "unit": "iter/sec",
            "range": "stddev: 0.00002492877631249286",
            "extra": "mean: 582.5845491694864 usec\nrounds: 1688"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 694.4241430070853,
            "unit": "iter/sec",
            "range": "stddev: 0.00002606481102215558",
            "extra": "mean: 1.4400420982912123 msec\nrounds: 702"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 240.79307455796004,
            "unit": "iter/sec",
            "range": "stddev: 0.00010778236905246565",
            "extra": "mean: 4.152943359503869 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.6824141540465,
            "unit": "iter/sec",
            "range": "stddev: 0.00008876807046410706",
            "extra": "mean: 13.390033133333267 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 21.062557767836406,
            "unit": "iter/sec",
            "range": "stddev: 0.00036204783254554737",
            "extra": "mean: 47.477614590904565 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 9636.933867563384,
            "unit": "iter/sec",
            "range": "stddev: 0.000015829969647615063",
            "extra": "mean: 103.76744447379312 usec\nrounds: 7546"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4013.8068413908954,
            "unit": "iter/sec",
            "range": "stddev: 0.00001762988634658771",
            "extra": "mean: 249.1400407433339 usec\nrounds: 3657"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1253.3889423681912,
            "unit": "iter/sec",
            "range": "stddev: 0.000052583771513773604",
            "extra": "mean: 797.8369412694591 usec\nrounds: 1277"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 350.0754681655731,
            "unit": "iter/sec",
            "range": "stddev: 0.00003452885519361587",
            "extra": "mean: 2.856526923294825 msec\nrounds: 352"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 91.20006229342525,
            "unit": "iter/sec",
            "range": "stddev: 0.000048451721751047865",
            "extra": "mean: 10.964904791211875 msec\nrounds: 91"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9109.57872505344,
            "unit": "iter/sec",
            "range": "stddev: 0.000016184359442441983",
            "extra": "mean: 109.77456040308095 usec\nrounds: 7748"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3802.143596233066,
            "unit": "iter/sec",
            "range": "stddev: 0.000022774946172228595",
            "extra": "mean: 263.00952993746466 usec\nrounds: 3474"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1222.3679770707872,
            "unit": "iter/sec",
            "range": "stddev: 0.00004158373812927582",
            "extra": "mean: 818.0842583886588 usec\nrounds: 1192"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 338.2438300469131,
            "unit": "iter/sec",
            "range": "stddev: 0.00019531461397147214",
            "extra": "mean: 2.9564471282781533 msec\nrounds: 343"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 90.08033375051714,
            "unit": "iter/sec",
            "range": "stddev: 0.00005411664963519732",
            "extra": "mean: 11.10120220879243 msec\nrounds: 91"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3856.251141888016,
            "unit": "iter/sec",
            "range": "stddev: 0.000021688951181341326",
            "extra": "mean: 259.31921008401986 usec\nrounds: 3570"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1113.6007640969867,
            "unit": "iter/sec",
            "range": "stddev: 0.000023014448130510114",
            "extra": "mean: 897.9878895924564 usec\nrounds: 1105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.2831548947353,
            "unit": "iter/sec",
            "range": "stddev: 0.000060350383537409294",
            "extra": "mean: 3.398087805459673 msec\nrounds: 293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.21276721999922,
            "unit": "iter/sec",
            "range": "stddev: 0.00006943989528202085",
            "extra": "mean: 13.295615052627634 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 18.830373173891473,
            "unit": "iter/sec",
            "range": "stddev: 0.0004611410555492674",
            "extra": "mean: 53.10569210526912 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1014.5683413141575,
            "unit": "iter/sec",
            "range": "stddev: 0.000022376102810653265",
            "extra": "mean: 985.640847717279 usec\nrounds: 985"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 309.5655383043794,
            "unit": "iter/sec",
            "range": "stddev: 0.00010088855718514404",
            "extra": "mean: 3.2303337299023025 msec\nrounds: 311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.3949159272968,
            "unit": "iter/sec",
            "range": "stddev: 0.00011213095599435802",
            "extra": "mean: 11.57475517241688 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.789750580782666,
            "unit": "iter/sec",
            "range": "stddev: 0.00005950710735168484",
            "extra": "mean: 43.87937447824658 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.852825733729355,
            "unit": "iter/sec",
            "range": "stddev: 0.0002345032177090626",
            "extra": "mean: 170.8576413333276 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 62.97532119335128,
            "unit": "iter/sec",
            "range": "stddev: 0.00031018848212963237",
            "extra": "mean: 15.879236199998557 msec\nrounds: 60"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 17.447341821422732,
            "unit": "iter/sec",
            "range": "stddev: 0.0001569772572081459",
            "extra": "mean: 57.315321166697686 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 4.696844130685283,
            "unit": "iter/sec",
            "range": "stddev: 0.0038013745808079596",
            "extra": "mean: 212.9089175999752 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 64.72766587775318,
            "unit": "iter/sec",
            "range": "stddev: 0.0003471814480252484",
            "extra": "mean: 15.449344363639394 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 17.475751637323533,
            "unit": "iter/sec",
            "range": "stddev: 0.001481308760386964",
            "extra": "mean: 57.22214533332388 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 4.612241691981157,
            "unit": "iter/sec",
            "range": "stddev: 0.0017198051742461327",
            "extra": "mean: 216.81430999997247 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 62.32685684380847,
            "unit": "iter/sec",
            "range": "stddev: 0.0002774511939945291",
            "extra": "mean: 16.044447781251137 msec\nrounds: 64"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 17.205894920836414,
            "unit": "iter/sec",
            "range": "stddev: 0.00028320125708844614",
            "extra": "mean: 58.11961566666292 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 4.4949728417013235,
            "unit": "iter/sec",
            "range": "stddev: 0.0013484718147105223",
            "extra": "mean: 222.47075460004453 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.219295274445168,
            "unit": "iter/sec",
            "range": "stddev: 0.0029216190315834102",
            "extra": "mean: 160.78992166668135 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.717383573096141,
            "unit": "iter/sec",
            "range": "stddev: 0.0019368697827014244",
            "extra": "mean: 368.001047000007 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0590728828890208,
            "unit": "iter/sec",
            "range": "stddev: 0.0036756899751656255",
            "extra": "mean: 944.2220796666257 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 37.14716387603806,
            "unit": "iter/sec",
            "range": "stddev: 0.00018233439819565498",
            "extra": "mean: 26.91995554053736 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 9.915503883458138,
            "unit": "iter/sec",
            "range": "stddev: 0.00034544573930015457",
            "extra": "mean: 100.85216160000527 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 2.5511808960982045,
            "unit": "iter/sec",
            "range": "stddev: 0.003175455466861787",
            "extra": "mean: 391.9753403333364 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}