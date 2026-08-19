window.BENCHMARK_DATA = {
  "lastUpdate": 1787171578480,
  "repoUrl": "https://github.com/trout314/voles",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "adtrout@gmail.com",
            "name": "Aaron Trout"
          },
          "committer": {
            "email": "adtrout@gmail.com",
            "name": "Aaron Trout"
          },
          "distinct": true,
          "id": "c121750003916ba70738f6ea46db13e679cfdb59",
          "message": "ci: bench build container to ubuntu:22.04 to match its LDC 1.42 bump\n\nThe previous commit bumped bench.yml's LDC to 1.42.0 but left its build\ncontainer at ubuntu:20.04, where the 1.42 binaries cannot run (glibc too\nold) -- meson failed with \"Unknown compiler: ldc2\". Same container move as\ntests-linux.yml.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01CraQZWqxJ5up98AWhv3Sic",
          "timestamp": "2026-08-19T16:25:20-04:00",
          "tree_id": "84cb186e2c178c6d79e614a5aa6cde7cb7052426",
          "url": "https://github.com/trout314/voles/commit/c121750003916ba70738f6ea46db13e679cfdb59"
        },
        "date": 1787171576955,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 1551.0430074695732,
            "unit": "iter/sec",
            "range": "stddev: 0.0019274337009443092",
            "extra": "mean: 644.7274480360384 usec\nrounds: 2877"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 849.3458559575625,
            "unit": "iter/sec",
            "range": "stddev: 0.0021542585100204348",
            "extra": "mean: 1.177376675220942 msec\nrounds: 2377"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 456.37846767026684,
            "unit": "iter/sec",
            "range": "stddev: 0.0028036664043531246",
            "extra": "mean: 2.1911638493919905 msec\nrounds: 1069"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 167.62876976377214,
            "unit": "iter/sec",
            "range": "stddev: 0.003356503900302151",
            "extra": "mean: 5.965563079710196 msec\nrounds: 828"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 357.21305165941607,
            "unit": "iter/sec",
            "range": "stddev: 0.00022858131780858904",
            "extra": "mean: 2.7994497831323573 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 19941.8603983442,
            "unit": "iter/sec",
            "range": "stddev: 0.000014492457991171054",
            "extra": "mean: 50.14577276265716 usec\nrounds: 12850"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 8566.851551784977,
            "unit": "iter/sec",
            "range": "stddev: 0.000024078958888220967",
            "extra": "mean: 116.72899827377555 usec\nrounds: 8110"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3909.4802680792486,
            "unit": "iter/sec",
            "range": "stddev: 0.00004228986636141338",
            "extra": "mean: 255.78847607058162 usec\nrounds: 3970"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1758.7189560418567,
            "unit": "iter/sec",
            "range": "stddev: 0.0000499460523227636",
            "extra": "mean: 568.5956795795181 usec\nrounds: 1807"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 802.88352943314,
            "unit": "iter/sec",
            "range": "stddev: 0.000060011303062428396",
            "extra": "mean: 1.245510666666721 msec\nrounds: 819"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 18676.37962976714,
            "unit": "iter/sec",
            "range": "stddev: 0.000012655523552013566",
            "extra": "mean: 53.54356785541889 usec\nrounds: 14553"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 8335.335843962344,
            "unit": "iter/sec",
            "range": "stddev: 0.000016840012560165146",
            "extra": "mean: 119.97117077464188 usec\nrounds: 7952"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3884.833652026367,
            "unit": "iter/sec",
            "range": "stddev: 0.000028365196259058765",
            "extra": "mean: 257.41127923930287 usec\nrounds: 3839"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1750.0503161585007,
            "unit": "iter/sec",
            "range": "stddev: 0.00003374005162357262",
            "extra": "mean: 571.412142134907 usec\nrounds: 1780"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 801.30048334223,
            "unit": "iter/sec",
            "range": "stddev: 0.000040797132342669093",
            "extra": "mean: 1.2479712926529045 msec\nrounds: 803"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 457.5406944222549,
            "unit": "iter/sec",
            "range": "stddev: 0.0022759780363619865",
            "extra": "mean: 2.1855979417584233 msec\nrounds: 910"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 400.5051878407579,
            "unit": "iter/sec",
            "range": "stddev: 0.0012719203084765515",
            "extra": "mean: 2.4968465586957715 msec\nrounds: 460"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 219.16380078115503,
            "unit": "iter/sec",
            "range": "stddev: 0.000777176703964928",
            "extra": "mean: 4.562797307017618 msec\nrounds: 228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 104.44530190307047,
            "unit": "iter/sec",
            "range": "stddev: 0.0030969660336647403",
            "extra": "mean: 9.574389482142921 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 28.396003944775092,
            "unit": "iter/sec",
            "range": "stddev: 0.023222791771436522",
            "extra": "mean: 35.21622274545435 msec\nrounds: 55"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 8211.017051633615,
            "unit": "iter/sec",
            "range": "stddev: 0.0001888631611073278",
            "extra": "mean: 121.78759265894423 usec\nrounds: 4468"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3145.8894585674875,
            "unit": "iter/sec",
            "range": "stddev: 0.000040500822758315764",
            "extra": "mean: 317.87512344930263 usec\nrounds: 3143"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1382.0697611872129,
            "unit": "iter/sec",
            "range": "stddev: 0.0000627623005875552",
            "extra": "mean: 723.5524776556787 usec\nrounds: 1365"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 602.9397193858618,
            "unit": "iter/sec",
            "range": "stddev: 0.00006866415367891385",
            "extra": "mean: 1.6585405934420328 msec\nrounds: 610"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 272.0341228326324,
            "unit": "iter/sec",
            "range": "stddev: 0.00012496594809330495",
            "extra": "mean: 3.676009427005761 msec\nrounds: 274"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 1466.668296214668,
            "unit": "iter/sec",
            "range": "stddev: 0.0018209900705459764",
            "extra": "mean: 681.817424281213 usec\nrounds: 7825"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3057.4234064049365,
            "unit": "iter/sec",
            "range": "stddev: 0.000036924991158427726",
            "extra": "mean: 327.07278877538505 usec\nrounds: 1960"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1360.0521190457594,
            "unit": "iter/sec",
            "range": "stddev: 0.000043638658326296334",
            "extra": "mean: 735.2659401770725 usec\nrounds: 1354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 593.0730824841504,
            "unit": "iter/sec",
            "range": "stddev: 0.00004575141552057304",
            "extra": "mean: 1.6861328384882897 msec\nrounds: 582"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 263.36725567140377,
            "unit": "iter/sec",
            "range": "stddev: 0.00029724432342326495",
            "extra": "mean: 3.796979231342537 msec\nrounds: 268"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3205.341081227548,
            "unit": "iter/sec",
            "range": "stddev: 0.00002918214067335142",
            "extra": "mean: 311.97927916520837 usec\nrounds: 3163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1456.5514348363824,
            "unit": "iter/sec",
            "range": "stddev: 0.00004727184228616344",
            "extra": "mean: 686.5531666668071 usec\nrounds: 1440"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 652.1234307040156,
            "unit": "iter/sec",
            "range": "stddev: 0.00009974278880235317",
            "extra": "mean: 1.5334520321105867 msec\nrounds: 654"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 288.4429574795984,
            "unit": "iter/sec",
            "range": "stddev: 0.00012197314059624018",
            "extra": "mean: 3.4668899831632394 msec\nrounds: 297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 127.84384792093769,
            "unit": "iter/sec",
            "range": "stddev: 0.00010389347474222702",
            "extra": "mean: 7.822042407691207 msec\nrounds: 130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 815.1723181076147,
            "unit": "iter/sec",
            "range": "stddev: 0.000031008374591569804",
            "extra": "mean: 1.2267344925566832 msec\nrounds: 806"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 394.7672049681149,
            "unit": "iter/sec",
            "range": "stddev: 0.00008455680168484889",
            "extra": "mean: 2.5331384862143485 msec\nrounds: 399"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 189.6348251556189,
            "unit": "iter/sec",
            "range": "stddev: 0.00015377913688805056",
            "extra": "mean: 5.2732930208329405 msec\nrounds: 192"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 91.28224107484216,
            "unit": "iter/sec",
            "range": "stddev: 0.00007718726513706419",
            "extra": "mean: 10.955033402171859 msec\nrounds: 92"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 42.80217959165588,
            "unit": "iter/sec",
            "range": "stddev: 0.0006890767187213365",
            "extra": "mean: 23.3632962045453 msec\nrounds: 44"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 562.4684067926787,
            "unit": "iter/sec",
            "range": "stddev: 0.00003409398283598005",
            "extra": "mean: 1.7778776335229647 msec\nrounds: 352"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 334.09692000133083,
            "unit": "iter/sec",
            "range": "stddev: 0.000042954394375442394",
            "extra": "mean: 2.993143426751784 msec\nrounds: 314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 183.78188164967742,
            "unit": "iter/sec",
            "range": "stddev: 0.00005875018630516902",
            "extra": "mean: 5.441232786516935 msec\nrounds: 178"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 543.9068716304696,
            "unit": "iter/sec",
            "range": "stddev: 0.00003533779187802658",
            "extra": "mean: 1.8385500389107057 msec\nrounds: 514"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 316.40980447330395,
            "unit": "iter/sec",
            "range": "stddev: 0.000043485160588059934",
            "extra": "mean: 3.1604583229163867 msec\nrounds: 288"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 172.9448338970966,
            "unit": "iter/sec",
            "range": "stddev: 0.00005123442867604195",
            "extra": "mean: 5.782190641178719 msec\nrounds: 170"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 435.9105366855968,
            "unit": "iter/sec",
            "range": "stddev: 0.00003619232714287065",
            "extra": "mean: 2.2940487000002396 msec\nrounds: 410"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 264.1678119041023,
            "unit": "iter/sec",
            "range": "stddev: 0.00005308559827559945",
            "extra": "mean: 3.7854725478932236 msec\nrounds: 261"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 147.3698717840747,
            "unit": "iter/sec",
            "range": "stddev: 0.00006156141815236406",
            "extra": "mean: 6.785647486110275 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.791425728958057,
            "unit": "iter/sec",
            "range": "stddev: 0.0007222685698199676",
            "extra": "mean: 172.66905366667137 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.5217057185649208,
            "unit": "iter/sec",
            "range": "stddev: 0.0004445821430992535",
            "extra": "mean: 396.5569783333365 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0032270865888009,
            "unit": "iter/sec",
            "range": "stddev: 0.0013016994244620117",
            "extra": "mean: 996.7832939999918 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 340.5678307766156,
            "unit": "iter/sec",
            "range": "stddev: 0.0000493052367037781",
            "extra": "mean: 2.9362726295071524 msec\nrounds: 305"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 189.58169102022217,
            "unit": "iter/sec",
            "range": "stddev: 0.00008262577865130701",
            "extra": "mean: 5.274770968749998 msec\nrounds: 160"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 98.34096897642804,
            "unit": "iter/sec",
            "range": "stddev: 0.00024463368934594503",
            "extra": "mean: 10.168701919539721 msec\nrounds: 87"
          }
        ]
      }
    ]
  }
}