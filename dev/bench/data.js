window.BENCHMARK_DATA = {
  "lastUpdate": 1793213723692,
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
          "id": "f3e5cd7c36a4b6d101cbf43d3310b0d27628502c",
          "message": "Linux segfault hunt v2: full-speed loops with post-mortem core analysis\n\nRunning the loop under gdb cost ~7x per iteration (every druntime\nsuspend/resume signal goes through ptrace) and perturbs thread timing; the\nfirst hunt got 2400 iterations and no crash. All three CI crashes happened\nduring a full `pytest tests/` run, not the isolated test body.\n\nNow each job loops either the full suite as CI runs it (mode suite) or the\nd49 body alone (mode body, the control) at full speed with core dumps\nenabled, and runs gdb on each new core (all threads' backtraces, faulting\ninstruction, registers). A sanity step proves a deliberate crash leaves a\ncore before the budget is spent.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-10-28T14:47:58-04:00",
          "tree_id": "1f133ba678efaafeeaeeb61453cfe23758965ff4",
          "url": "https://github.com/trout314/voles/commit/f3e5cd7c36a4b6d101cbf43d3310b0d27628502c"
        },
        "date": 1793213721613,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7720.084583845019,
            "unit": "iter/sec",
            "range": "stddev: 0.00003113303001924188",
            "extra": "mean: 129.5322595418956 usec\nrounds: 4847"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4353.492399983876,
            "unit": "iter/sec",
            "range": "stddev: 0.00035440235517061777",
            "extra": "mean: 229.70064217953012 usec\nrounds: 4424"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2371.779251225476,
            "unit": "iter/sec",
            "range": "stddev: 0.00003651819089397956",
            "extra": "mean: 421.62439842717635 usec\nrounds: 2417"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1185.5583632505425,
            "unit": "iter/sec",
            "range": "stddev: 0.000051529044831249336",
            "extra": "mean: 843.4844129125944 usec\nrounds: 1177"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 585.6291550224202,
            "unit": "iter/sec",
            "range": "stddev: 0.00006287230968387685",
            "extra": "mean: 1.707565259386234 msec\nrounds: 586"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 8224.906983804414,
            "unit": "iter/sec",
            "range": "stddev: 0.000019600604790374335",
            "extra": "mean: 121.5819220775494 usec\nrounds: 5544"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 5598.255195831192,
            "unit": "iter/sec",
            "range": "stddev: 0.000022330625237311945",
            "extra": "mean: 178.62708380008505 usec\nrounds: 5179"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3525.049997766858,
            "unit": "iter/sec",
            "range": "stddev: 0.000028428144265035552",
            "extra": "mean: 283.68391955674576 usec\nrounds: 3431"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2161.4452401074614,
            "unit": "iter/sec",
            "range": "stddev: 0.000033544840753977366",
            "extra": "mean: 462.65340497373995 usec\nrounds: 2131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1166.7669102051664,
            "unit": "iter/sec",
            "range": "stddev: 0.00004461975670589957",
            "extra": "mean: 857.0692151564001 usec\nrounds: 1148"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 7457.255453152166,
            "unit": "iter/sec",
            "range": "stddev: 0.000023435359633169902",
            "extra": "mean: 134.09759210773746 usec\nrounds: 5651"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 5081.655225271882,
            "unit": "iter/sec",
            "range": "stddev: 0.000023525379005750665",
            "extra": "mean: 196.78627448529772 usec\nrounds: 4758"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3175.380828750173,
            "unit": "iter/sec",
            "range": "stddev: 0.000029342778501244218",
            "extra": "mean: 314.92285616449954 usec\nrounds: 3066"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1923.6789891278927,
            "unit": "iter/sec",
            "range": "stddev: 0.00004245314461236953",
            "extra": "mean: 519.8372522919502 usec\nrounds: 1855"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1034.671411505973,
            "unit": "iter/sec",
            "range": "stddev: 0.0000620984814395337",
            "extra": "mean: 966.4904131684584 usec\nrounds: 1048"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 6327.754977095646,
            "unit": "iter/sec",
            "range": "stddev: 0.000024224066447018288",
            "extra": "mean: 158.03393203745486 usec\nrounds: 5606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3625.0231322475693,
            "unit": "iter/sec",
            "range": "stddev: 0.000033323820438257194",
            "extra": "mean: 275.8603086154612 usec\nrounds: 3668"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1923.405771250959,
            "unit": "iter/sec",
            "range": "stddev: 0.00004473158694221117",
            "extra": "mean: 519.9110946566478 usec\nrounds: 1965"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 960.395346939431,
            "unit": "iter/sec",
            "range": "stddev: 0.00009287278749530535",
            "extra": "mean: 1.04123786437198 msec\nrounds: 988"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 477.66160281699814,
            "unit": "iter/sec",
            "range": "stddev: 0.00006310932439509795",
            "extra": "mean: 2.0935323126299528 msec\nrounds: 483"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3638.0782833461444,
            "unit": "iter/sec",
            "range": "stddev: 0.00003735272669124271",
            "extra": "mean: 274.87039093624014 usec\nrounds: 2008"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 1973.003120341137,
            "unit": "iter/sec",
            "range": "stddev: 0.00008440823937164617",
            "extra": "mean: 506.8415704416613 usec\nrounds: 2172"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1396.9206512106525,
            "unit": "iter/sec",
            "range": "stddev: 0.00003798952584630976",
            "extra": "mean: 715.8602739055665 usec\nrounds: 1234"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 804.3095145281301,
            "unit": "iter/sec",
            "range": "stddev: 0.00010468647487068858",
            "extra": "mean: 1.2433024624689129 msec\nrounds: 826"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 426.18373110865247,
            "unit": "iter/sec",
            "range": "stddev: 0.0001771219189367624",
            "extra": "mean: 2.3464058503562564 msec\nrounds: 421"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 3681.657852840733,
            "unit": "iter/sec",
            "range": "stddev: 0.000024868877336505115",
            "extra": "mean: 271.61676613387885 usec\nrounds: 3378"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 1930.3918472272005,
            "unit": "iter/sec",
            "range": "stddev: 0.00008669230158417945",
            "extra": "mean: 518.0295396690532 usec\nrounds: 2168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1365.2647995248633,
            "unit": "iter/sec",
            "range": "stddev: 0.00003804720281025553",
            "extra": "mean: 732.4586412452867 usec\nrounds: 1285"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 794.9496424045283,
            "unit": "iter/sec",
            "range": "stddev: 0.00005817323028643917",
            "extra": "mean: 1.2579413168552973 msec\nrounds: 789"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 411.19928683920006,
            "unit": "iter/sec",
            "range": "stddev: 0.00009466072023314623",
            "extra": "mean: 2.4319108325473606 msec\nrounds: 424"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3592.025423615357,
            "unit": "iter/sec",
            "range": "stddev: 0.00002937157011502163",
            "extra": "mean: 278.39446609303354 usec\nrounds: 3141"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1874.401553197571,
            "unit": "iter/sec",
            "range": "stddev: 0.00004197903372890232",
            "extra": "mean: 533.5036125498744 usec\nrounds: 1737"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 935.7824542692074,
            "unit": "iter/sec",
            "range": "stddev: 0.00005802772401308045",
            "extra": "mean: 1.0686244387654638 msec\nrounds: 939"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 455.0080770158126,
            "unit": "iter/sec",
            "range": "stddev: 0.00008340522607958483",
            "extra": "mean: 2.19776318380662 msec\nrounds: 457"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 216.03382846230724,
            "unit": "iter/sec",
            "range": "stddev: 0.00039125541545590673",
            "extra": "mean: 4.628904681816887 msec\nrounds: 220"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2724.982264456955,
            "unit": "iter/sec",
            "range": "stddev: 0.000032487880339191237",
            "extra": "mean: 366.9748655040454 usec\nrounds: 2580"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1409.9682138927174,
            "unit": "iter/sec",
            "range": "stddev: 0.00004802333013137966",
            "extra": "mean: 709.2358466997957 usec\nrounds: 1409"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 706.7954425123901,
            "unit": "iter/sec",
            "range": "stddev: 0.00006600838153697103",
            "extra": "mean: 1.4148365140066252 msec\nrounds: 714"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 343.8040798737092,
            "unit": "iter/sec",
            "range": "stddev: 0.00008720449275515206",
            "extra": "mean: 2.9086333133898052 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 157.1026620480844,
            "unit": "iter/sec",
            "range": "stddev: 0.0004438379560976985",
            "extra": "mean: 6.365264515339213 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1043.844298843853,
            "unit": "iter/sec",
            "range": "stddev: 0.000036261883566561507",
            "extra": "mean: 957.9972809235875 usec\nrounds: 477"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 864.7341409513986,
            "unit": "iter/sec",
            "range": "stddev: 0.000031828858572552776",
            "extra": "mean: 1.1564247930581057 msec\nrounds: 778"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 627.6193142916377,
            "unit": "iter/sec",
            "range": "stddev: 0.00003785357348871495",
            "extra": "mean: 1.5933225399996647 msec\nrounds: 450"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1041.8887344785069,
            "unit": "iter/sec",
            "range": "stddev: 0.00003145463825142802",
            "extra": "mean: 959.79538592528 usec\nrounds: 881"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 814.4182422361907,
            "unit": "iter/sec",
            "range": "stddev: 0.000029581472199028607",
            "extra": "mean: 1.2278703350925047 msec\nrounds: 758"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 556.9095568630798,
            "unit": "iter/sec",
            "range": "stddev: 0.000042211926492600724",
            "extra": "mean: 1.7956237016881667 msec\nrounds: 533"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 675.4117556698296,
            "unit": "iter/sec",
            "range": "stddev: 0.000044205093274934266",
            "extra": "mean: 1.4805783162720711 msec\nrounds: 547"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 498.16045302216224,
            "unit": "iter/sec",
            "range": "stddev: 0.00007392303507891829",
            "extra": "mean: 2.0073853593422677 msec\nrounds: 487"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 326.149216344121,
            "unit": "iter/sec",
            "range": "stddev: 0.00005288279180987004",
            "extra": "mean: 3.066081259397837 msec\nrounds: 266"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.258126918901508,
            "unit": "iter/sec",
            "range": "stddev: 0.0016042851614142476",
            "extra": "mean: 190.18179199997576 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.23500400650177,
            "unit": "iter/sec",
            "range": "stddev: 0.0011595246247659368",
            "extra": "mean: 447.42649099998744 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8472309394715714,
            "unit": "iter/sec",
            "range": "stddev: 0.004662019717094039",
            "extra": "mean: 1.1803157243333355 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 749.5908395349683,
            "unit": "iter/sec",
            "range": "stddev: 0.00003518825483103599",
            "extra": "mean: 1.334061126761342 msec\nrounds: 639"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 528.2436342703886,
            "unit": "iter/sec",
            "range": "stddev: 0.00007233606367732077",
            "extra": "mean: 1.893065879310032 msec\nrounds: 348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 314.46738960691977,
            "unit": "iter/sec",
            "range": "stddev: 0.00011333538009015284",
            "extra": "mean: 3.1799799694651556 msec\nrounds: 262"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 589.1633974296999,
            "unit": "iter/sec",
            "range": "stddev: 0.0000664805187431383",
            "extra": "mean: 1.6973220067007335 msec\nrounds: 597"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 271.99883002678536,
            "unit": "iter/sec",
            "range": "stddev: 0.00035604464155708705",
            "extra": "mean: 3.6764864021713772 msec\nrounds: 276"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 224.2614768584714,
            "unit": "iter/sec",
            "range": "stddev: 0.00011338058895789591",
            "extra": "mean: 4.459080596490887 msec\nrounds: 228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 210.53970943940104,
            "unit": "iter/sec",
            "range": "stddev: 0.0001318936241119629",
            "extra": "mean: 4.749697824997838 msec\nrounds: 200"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 102.52157242007924,
            "unit": "iter/sec",
            "range": "stddev: 0.0001404979723114468",
            "extra": "mean: 9.754044699027132 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 75.88780574785184,
            "unit": "iter/sec",
            "range": "stddev: 0.0007536111954950714",
            "extra": "mean: 13.177347666667869 msec\nrounds: 72"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 283.38370083170173,
            "unit": "iter/sec",
            "range": "stddev: 0.00024480923406792934",
            "extra": "mean: 3.5287844610155905 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 129.2075522932179,
            "unit": "iter/sec",
            "range": "stddev: 0.00009427708048071978",
            "extra": "mean: 7.739485674418197 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 105.43654562410886,
            "unit": "iter/sec",
            "range": "stddev: 0.00010527117976562128",
            "extra": "mean: 9.484377490562839 msec\nrounds: 106"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 103.55159106989355,
            "unit": "iter/sec",
            "range": "stddev: 0.000147124137092544",
            "extra": "mean: 9.657022066662757 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 44.419244106108074,
            "unit": "iter/sec",
            "range": "stddev: 0.0016679339786065393",
            "extra": "mean: 22.512764909083415 msec\nrounds: 44"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 33.85512039776686,
            "unit": "iter/sec",
            "range": "stddev: 0.0032493611118376326",
            "extra": "mean: 29.53762941176726 msec\nrounds: 34"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 303.32239587537657,
            "unit": "iter/sec",
            "range": "stddev: 0.00022990516411702786",
            "extra": "mean: 3.296822172045817 msec\nrounds: 279"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 228.1694089411941,
            "unit": "iter/sec",
            "range": "stddev: 0.00007588894018769689",
            "extra": "mean: 4.382708464909638 msec\nrounds: 228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 64.0919885331834,
            "unit": "iter/sec",
            "range": "stddev: 0.0007251182060206048",
            "extra": "mean: 15.602574095235843 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 153.36926917924274,
            "unit": "iter/sec",
            "range": "stddev: 0.00009600940266052424",
            "extra": "mean: 6.520211026312576 msec\nrounds: 152"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 108.61110283471487,
            "unit": "iter/sec",
            "range": "stddev: 0.000691836422369658",
            "extra": "mean: 9.207161826924885 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 29.738949626616304,
            "unit": "iter/sec",
            "range": "stddev: 0.001580168139614406",
            "extra": "mean: 33.62593543334167 msec\nrounds: 30"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 74.78912571812441,
            "unit": "iter/sec",
            "range": "stddev: 0.00016216612324246934",
            "extra": "mean: 13.370927797296872 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 55.46925073921786,
            "unit": "iter/sec",
            "range": "stddev: 0.00043940182255720195",
            "extra": "mean: 18.02800626785788 msec\nrounds: 56"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.4058328087626,
            "unit": "iter/sec",
            "range": "stddev: 0.0017148786122728236",
            "extra": "mean: 69.41632693333304 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 35.4854248096233,
            "unit": "iter/sec",
            "range": "stddev: 0.0013120834332865647",
            "extra": "mean: 28.180584151519298 msec\nrounds: 33"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 24.829492276259696,
            "unit": "iter/sec",
            "range": "stddev: 0.001878769540003968",
            "extra": "mean: 40.27468580000459 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.916470238500323,
            "unit": "iter/sec",
            "range": "stddev: 0.005563389338778618",
            "extra": "mean: 144.5824192857117 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 15.587678713126367,
            "unit": "iter/sec",
            "range": "stddev: 0.003461793656960316",
            "extra": "mean: 64.15323399999906 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 12.002828226413866,
            "unit": "iter/sec",
            "range": "stddev: 0.003657263430759044",
            "extra": "mean: 83.31369750000779 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1047.860006375994,
            "unit": "iter/sec",
            "range": "stddev: 0.00001777725752089031",
            "extra": "mean: 954.325953767892 usec\nrounds: 995"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 342.8366710125774,
            "unit": "iter/sec",
            "range": "stddev: 0.00012020987722116317",
            "extra": "mean: 2.916840829910268 msec\nrounds: 341"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 100.9886904676692,
            "unit": "iter/sec",
            "range": "stddev: 0.00018045157461232746",
            "extra": "mean: 9.902098892154093 msec\nrounds: 102"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.49325707004964,
            "unit": "iter/sec",
            "range": "stddev: 0.0002781262463691574",
            "extra": "mean: 36.37255482142824 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.200342381319103,
            "unit": "iter/sec",
            "range": "stddev: 0.0006434767756347626",
            "extra": "mean: 138.8822846250264 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 351.8848022695599,
            "unit": "iter/sec",
            "range": "stddev: 0.00011451320018541597",
            "extra": "mean: 2.8418391290282385 msec\nrounds: 217"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 298.5958298969345,
            "unit": "iter/sec",
            "range": "stddev: 0.00007012846547848886",
            "extra": "mean: 3.3490085924681776 msec\nrounds: 292"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 120.81094579956566,
            "unit": "iter/sec",
            "range": "stddev: 0.0004102449717707231",
            "extra": "mean: 8.277395672897672 msec\nrounds: 107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 168.99058318820607,
            "unit": "iter/sec",
            "range": "stddev: 0.00009437051125312476",
            "extra": "mean: 5.917489490442746 msec\nrounds: 157"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.2864717090008094,
            "unit": "iter/sec",
            "range": "stddev: 0.02413383491915854",
            "extra": "mean: 3.49074609666665 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}