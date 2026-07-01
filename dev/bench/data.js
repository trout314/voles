window.BENCHMARK_DATA = {
  "lastUpdate": 1782932977712,
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
          "id": "a6ff808a8c7c53dc9513831a7f488ad74272c7ec",
          "message": "tests: generalize coupled-vector fixture generation to all solvers\n\nReplace the VIE-2-only make_coupled_vie2_data with a single make_coupled_data\nthat serves VIE-1, VIE-2, and VIDE. It conjugates each matrix coefficient by P\n(the kernel, and for VIDE also a), maps g and the initial value, and detects an\n'a' term in the specs to decide whether to emit a_Z / soln_init_value.\n\nRoll the generated pattern out to VIE-1 and VIDE: scalar specs plus coupled_vie1\n/ coupled_vide factory fixtures in conftest, a parametrized accuracy test over\ntwo coupled solutions each, and a hand-checked anchor test per solver that\nreproduces the former hand-written arrays to machine precision. Remove the now\n-redundant hand-written test_vie1_vec_coupled_kernel and\ntest_vide_vec_coupled_a_matrix.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-07-01T15:01:07-04:00",
          "tree_id": "363ef134ad138c3dbd8d187895fd0b4246df3884",
          "url": "https://github.com/trout314/voles/commit/a6ff808a8c7c53dc9513831a7f488ad74272c7ec"
        },
        "date": 1782932976523,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15536.540962032106,
            "unit": "iter/sec",
            "range": "stddev: 0.00011086121557783844",
            "extra": "mean: 64.36439117585957 usec\nrounds: 10085"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6148.534153460992,
            "unit": "iter/sec",
            "range": "stddev: 0.000017122104634406065",
            "extra": "mean: 162.64039119585976 usec\nrounds: 5225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1851.7832059485315,
            "unit": "iter/sec",
            "range": "stddev: 0.000019883010244726128",
            "extra": "mean: 540.020017887447 usec\nrounds: 1845"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 498.2659953936067,
            "unit": "iter/sec",
            "range": "stddev: 0.00005547333810568731",
            "extra": "mean: 2.0069601563117847 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 128.51641061076438,
            "unit": "iter/sec",
            "range": "stddev: 0.0000657929553766873",
            "extra": "mean: 7.781107449605671 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27646.671005507313,
            "unit": "iter/sec",
            "range": "stddev: 0.000010912706547070321",
            "extra": "mean: 36.17072014930103 usec\nrounds: 16105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16820.705210239812,
            "unit": "iter/sec",
            "range": "stddev: 0.000013496618801446694",
            "extra": "mean: 59.45053952858276 usec\nrounds: 14559"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6960.530859470655,
            "unit": "iter/sec",
            "range": "stddev: 0.000016445647680487726",
            "extra": "mean: 143.66720300354353 usec\nrounds: 6660"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2178.5940992283595,
            "unit": "iter/sec",
            "range": "stddev: 0.000021002159256946548",
            "extra": "mean: 459.0116168744751 usec\nrounds: 2169"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 597.8793801253094,
            "unit": "iter/sec",
            "range": "stddev: 0.00003406975583870245",
            "extra": "mean: 1.6725781708518035 msec\nrounds: 597"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21689.14527753505,
            "unit": "iter/sec",
            "range": "stddev: 0.00001293946206158535",
            "extra": "mean: 46.10601234875627 usec\nrounds: 16844"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 12990.859844656763,
            "unit": "iter/sec",
            "range": "stddev: 0.000014462595389540253",
            "extra": "mean: 76.97719873494805 usec\nrounds: 11699"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5750.509592418744,
            "unit": "iter/sec",
            "range": "stddev: 0.000017884179016667833",
            "extra": "mean: 173.8976318409002 usec\nrounds: 5408"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1938.4154762498804,
            "unit": "iter/sec",
            "range": "stddev: 0.00002205850092790412",
            "extra": "mean: 515.8852744689345 usec\nrounds: 1931"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 561.8117124318258,
            "unit": "iter/sec",
            "range": "stddev: 0.000030100788378436335",
            "extra": "mean: 1.7799557714300005 msec\nrounds: 560"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1722.1968470492989,
            "unit": "iter/sec",
            "range": "stddev: 0.000018431073071895093",
            "extra": "mean: 580.6537166255621 usec\nrounds: 1648"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 688.5702851284157,
            "unit": "iter/sec",
            "range": "stddev: 0.000026987499086642247",
            "extra": "mean: 1.4522845693428434 msec\nrounds: 685"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.62440116717167,
            "unit": "iter/sec",
            "range": "stddev: 0.00003094726230838168",
            "extra": "mean: 4.121596983606715 msec\nrounds: 244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.19803982611467,
            "unit": "iter/sec",
            "range": "stddev: 0.000042010659156356124",
            "extra": "mean: 13.298218973690874 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 21.251304226350058,
            "unit": "iter/sec",
            "range": "stddev: 0.0001526884857245645",
            "extra": "mean: 47.05593545454369 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10202.564725622646,
            "unit": "iter/sec",
            "range": "stddev: 0.000015437159163893174",
            "extra": "mean: 98.01457054113143 usec\nrounds: 8045"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4175.005483667937,
            "unit": "iter/sec",
            "range": "stddev: 0.000018334245195074684",
            "extra": "mean: 239.5206434846292 usec\nrounds: 4098"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1301.8041018165852,
            "unit": "iter/sec",
            "range": "stddev: 0.000051640390421612574",
            "extra": "mean: 768.1647327770463 usec\nrounds: 1321"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 361.1642661766211,
            "unit": "iter/sec",
            "range": "stddev: 0.00003433008534132188",
            "extra": "mean: 2.768823202212833 msec\nrounds: 361"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 93.81714222775341,
            "unit": "iter/sec",
            "range": "stddev: 0.00011381213672175687",
            "extra": "mean: 10.65903284042024 msec\nrounds: 94"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9223.277707192921,
            "unit": "iter/sec",
            "range": "stddev: 0.000021042978147112304",
            "extra": "mean: 108.42132609973719 usec\nrounds: 8295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3930.2207585794768,
            "unit": "iter/sec",
            "range": "stddev: 0.000019256453535843314",
            "extra": "mean: 254.43863371212663 usec\nrounds: 3874"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1263.0371180017155,
            "unit": "iter/sec",
            "range": "stddev: 0.000026304806156865622",
            "extra": "mean: 791.7423690462292 usec\nrounds: 1260"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 353.80613955983074,
            "unit": "iter/sec",
            "range": "stddev: 0.00004458789207084351",
            "extra": "mean: 2.8264065774666807 msec\nrounds: 355"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 92.52818021089766,
            "unit": "iter/sec",
            "range": "stddev: 0.0003077004611979777",
            "extra": "mean: 10.807518290327549 msec\nrounds: 93"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3886.983607561909,
            "unit": "iter/sec",
            "range": "stddev: 0.000019912186973969234",
            "extra": "mean: 257.2689007626778 usec\nrounds: 3406"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1093.062195453507,
            "unit": "iter/sec",
            "range": "stddev: 0.00007006612223633732",
            "extra": "mean: 914.8610245230411 usec\nrounds: 1101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 292.6889436954701,
            "unit": "iter/sec",
            "range": "stddev: 0.000040824618380296636",
            "extra": "mean: 3.4165964295544278 msec\nrounds: 291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.65647606432782,
            "unit": "iter/sec",
            "range": "stddev: 0.00007121975048502377",
            "extra": "mean: 13.394685266665268 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 18.792973187053658,
            "unit": "iter/sec",
            "range": "stddev: 0.0001127749028734392",
            "extra": "mean: 53.21137799999059 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1017.3410134329345,
            "unit": "iter/sec",
            "range": "stddev: 0.000028172216071671715",
            "extra": "mean: 982.9545715704328 usec\nrounds: 999"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 311.7497752905321,
            "unit": "iter/sec",
            "range": "stddev: 0.00004032370623707245",
            "extra": "mean: 3.2077007884546505 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.74910052125941,
            "unit": "iter/sec",
            "range": "stddev: 0.00006762555247152441",
            "extra": "mean: 11.527497045977233 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.868370664667,
            "unit": "iter/sec",
            "range": "stddev: 0.00028867954807234366",
            "extra": "mean: 43.728519826078376 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.898565396835467,
            "unit": "iter/sec",
            "range": "stddev: 0.00021672630911938963",
            "extra": "mean: 169.53274783331076 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 63.67834779382958,
            "unit": "iter/sec",
            "range": "stddev: 0.00018573462851670955",
            "extra": "mean: 15.70392503332035 msec\nrounds: 60"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 17.46227872522359,
            "unit": "iter/sec",
            "range": "stddev: 0.0003098780988160127",
            "extra": "mean: 57.26629472220819 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 4.584022308830418,
            "unit": "iter/sec",
            "range": "stddev: 0.0008469077255294544",
            "extra": "mean: 218.1490255999961 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 64.05062519011305,
            "unit": "iter/sec",
            "range": "stddev: 0.0001319238319470715",
            "extra": "mean: 15.612650103442885 msec\nrounds: 58"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 17.275365298657515,
            "unit": "iter/sec",
            "range": "stddev: 0.0004995798881550695",
            "extra": "mean: 57.88589605556479 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 4.47406548214518,
            "unit": "iter/sec",
            "range": "stddev: 0.0011054973796679457",
            "extra": "mean: 223.51036299999123 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 62.803007289981366,
            "unit": "iter/sec",
            "range": "stddev: 0.0002526010026846527",
            "extra": "mean: 15.92280438710018 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 17.30742585654989,
            "unit": "iter/sec",
            "range": "stddev: 0.00031424212197130513",
            "extra": "mean: 57.778667277754415 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 4.478979181450537,
            "unit": "iter/sec",
            "range": "stddev: 0.0013083009090288943",
            "extra": "mean: 223.2651591999911 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.240680388930609,
            "unit": "iter/sec",
            "range": "stddev: 0.000445732295253666",
            "extra": "mean: 160.23893833335023 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.6936296359453302,
            "unit": "iter/sec",
            "range": "stddev: 0.0017329840088024066",
            "extra": "mean: 371.24628666667076 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.067167065762188,
            "unit": "iter/sec",
            "range": "stddev: 0.0010078649295495164",
            "extra": "mean: 937.0604023333348 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 37.361593912237616,
            "unit": "iter/sec",
            "range": "stddev: 0.0002552277955084867",
            "extra": "mean: 26.765453378381018 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 10.095172725439285,
            "unit": "iter/sec",
            "range": "stddev: 0.001017680018632082",
            "extra": "mean: 99.05724519998103 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 2.6241339937956996,
            "unit": "iter/sec",
            "range": "stddev: 0.0005933094348405151",
            "extra": "mean: 381.0781013333629 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}