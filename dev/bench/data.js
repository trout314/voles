window.BENCHMARK_DATA = {
  "lastUpdate": 1790124575017,
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
          "id": "93efc52a1d24157c5465b0d53ec5ba886549f1fc",
          "message": "Release 0.9.0\n\nProduct-integration quadrature for all three sampled-data solvers\n(quadrature=\"product\", mesh_samples, kernel_interp_degree), the\ncontinuous VIE-1 quadrature fix, exact convergence checks for VIE-1 node\nsets, ValueError-based input validation throughout, and the performance\nfollow-ups (folded continuous-mode history, shared lag blocks for\nmatrix input, factor-once block drivers).\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>",
          "timestamp": "2026-09-22T20:41:02-04:00",
          "tree_id": "7a5915b0b0d043d975dc1830cb680a79b7657b36",
          "url": "https://github.com/trout314/voles/commit/93efc52a1d24157c5465b0d53ec5ba886549f1fc"
        },
        "date": 1790124574416,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 9349.014449266024,
            "unit": "iter/sec",
            "range": "stddev: 0.000025980841187957244",
            "extra": "mean: 106.96314626816181 usec\nrounds: 5989"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4412.074558671825,
            "unit": "iter/sec",
            "range": "stddev: 0.00024477132431181717",
            "extra": "mean: 226.65074823690918 usec\nrounds: 4254"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2062.3810513882545,
            "unit": "iter/sec",
            "range": "stddev: 0.0000476257375971828",
            "extra": "mean: 484.876448669303 usec\nrounds: 2104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 935.8512706657161,
            "unit": "iter/sec",
            "range": "stddev: 0.00005900234364800828",
            "extra": "mean: 1.068545859096448 msec\nrounds: 951"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 418.31148562965876,
            "unit": "iter/sec",
            "range": "stddev: 0.0001101014433246242",
            "extra": "mean: 2.3905630955716193 msec\nrounds: 429"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 19972.694560771462,
            "unit": "iter/sec",
            "range": "stddev: 0.000012279042964280251",
            "extra": "mean: 50.068356923862865 usec\nrounds: 14017"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 9162.189895740445,
            "unit": "iter/sec",
            "range": "stddev: 0.00001978241260278913",
            "extra": "mean: 109.14421239674434 usec\nrounds: 8470"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4376.09760933105,
            "unit": "iter/sec",
            "range": "stddev: 0.00003138999618878035",
            "extra": "mean: 228.51409846702768 usec\nrounds: 4306"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2002.8110276531177,
            "unit": "iter/sec",
            "range": "stddev: 0.00004006146192415282",
            "extra": "mean: 499.2982294349528 usec\nrounds: 2018"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 919.7198250327832,
            "unit": "iter/sec",
            "range": "stddev: 0.00005874064600577362",
            "extra": "mean: 1.087287642151625 msec\nrounds: 911"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 18070.48389324245,
            "unit": "iter/sec",
            "range": "stddev: 0.000012801795568761588",
            "extra": "mean: 55.33886120083121 usec\nrounds: 14539"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 8257.959192571776,
            "unit": "iter/sec",
            "range": "stddev: 0.000020198039924948298",
            "extra": "mean: 121.09529445235367 usec\nrounds: 7733"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3964.997511871317,
            "unit": "iter/sec",
            "range": "stddev: 0.00003056743268476144",
            "extra": "mean: 252.20696784953108 usec\nrounds: 3888"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1827.6051061195885,
            "unit": "iter/sec",
            "range": "stddev: 0.00004474383923556451",
            "extra": "mean: 547.1641530501204 usec\nrounds: 1836"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 840.0906074948839,
            "unit": "iter/sec",
            "range": "stddev: 0.00010375805727778544",
            "extra": "mean: 1.1903477923434467 msec\nrounds: 862"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2557.3135112095406,
            "unit": "iter/sec",
            "range": "stddev: 0.00004702405435847153",
            "extra": "mean: 391.035356289588 usec\nrounds: 2425"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 1276.0604986421213,
            "unit": "iter/sec",
            "range": "stddev: 0.000037447220574307384",
            "extra": "mean: 783.6619040116968 usec\nrounds: 1271"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 619.6590779842569,
            "unit": "iter/sec",
            "range": "stddev: 0.00005437888416611764",
            "extra": "mean: 1.61379060765637 msec\nrounds: 627"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 298.0129829395722,
            "unit": "iter/sec",
            "range": "stddev: 0.0001499948110951991",
            "extra": "mean: 3.355558506666701 msec\nrounds: 300"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 142.81041785953934,
            "unit": "iter/sec",
            "range": "stddev: 0.0002112440341234863",
            "extra": "mean: 7.002290273973894 msec\nrounds: 146"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 9842.019068446803,
            "unit": "iter/sec",
            "range": "stddev: 0.000019502282912937063",
            "extra": "mean: 101.60516790766724 usec\nrounds: 8058"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3436.8199626897826,
            "unit": "iter/sec",
            "range": "stddev: 0.00004415068812155524",
            "extra": "mean: 290.9666525613879 usec\nrounds: 3474"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1578.7734671943704,
            "unit": "iter/sec",
            "range": "stddev: 0.00004620429185243146",
            "extra": "mean: 633.4030947309334 usec\nrounds: 1594"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 694.7559227725533,
            "unit": "iter/sec",
            "range": "stddev: 0.000057493067293493545",
            "extra": "mean: 1.4393544081053864 msec\nrounds: 691"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 317.87194258900803,
            "unit": "iter/sec",
            "range": "stddev: 0.00009302953172391608",
            "extra": "mean: 3.1459209386496507 msec\nrounds: 326"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9485.939735572825,
            "unit": "iter/sec",
            "range": "stddev: 0.000020338428282855616",
            "extra": "mean: 105.41918121722213 usec\nrounds: 8316"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3315.43729424745,
            "unit": "iter/sec",
            "range": "stddev: 0.00004677958491786439",
            "extra": "mean: 301.6193374355414 usec\nrounds: 3331"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1506.4429262512006,
            "unit": "iter/sec",
            "range": "stddev: 0.00006543081876800008",
            "extra": "mean: 663.8153909278932 usec\nrounds: 1499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 670.281612116831,
            "unit": "iter/sec",
            "range": "stddev: 0.0000818602880394208",
            "extra": "mean: 1.491910238805266 msec\nrounds: 670"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 307.67854593349364,
            "unit": "iter/sec",
            "range": "stddev: 0.00015112802008461455",
            "extra": "mean: 3.250145365079031 msec\nrounds: 315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3579.9084135257594,
            "unit": "iter/sec",
            "range": "stddev: 0.00005287071517549637",
            "extra": "mean: 279.3367551588075 usec\nrounds: 2520"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1677.590804571494,
            "unit": "iter/sec",
            "range": "stddev: 0.0000467296708310976",
            "extra": "mean: 596.0929192476287 usec\nrounds: 1647"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 760.8973237364062,
            "unit": "iter/sec",
            "range": "stddev: 0.00006228544096621038",
            "extra": "mean: 1.3142377674420958 msec\nrounds: 774"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 338.78830376773374,
            "unit": "iter/sec",
            "range": "stddev: 0.00016736620337543597",
            "extra": "mean: 2.9516957606823975 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 152.46766590907345,
            "unit": "iter/sec",
            "range": "stddev: 0.00021638790232098517",
            "extra": "mean: 6.558767683873157 msec\nrounds: 155"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1769.1131224373278,
            "unit": "iter/sec",
            "range": "stddev: 0.0000617952577318137",
            "extra": "mean: 565.2549785071337 usec\nrounds: 1768"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 842.2593549989477,
            "unit": "iter/sec",
            "range": "stddev: 0.00007088708669563533",
            "extra": "mean: 1.1872827461812512 msec\nrounds: 851"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 396.4223799590086,
            "unit": "iter/sec",
            "range": "stddev: 0.00007530156257415546",
            "extra": "mean: 2.5225619202008813 msec\nrounds: 401"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 185.4622135353318,
            "unit": "iter/sec",
            "range": "stddev: 0.00008935546709845825",
            "extra": "mean: 5.391933919787348 msec\nrounds: 187"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 81.64553275056578,
            "unit": "iter/sec",
            "range": "stddev: 0.0006347103427507689",
            "extra": "mean: 12.248067546513381 msec\nrounds: 86"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 881.5654549521162,
            "unit": "iter/sec",
            "range": "stddev: 0.000026608749712046503",
            "extra": "mean: 1.1343457191778423 msec\nrounds: 438"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 526.0080972063658,
            "unit": "iter/sec",
            "range": "stddev: 0.000027991237775860826",
            "extra": "mean: 1.9011114188374851 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 289.7809843254954,
            "unit": "iter/sec",
            "range": "stddev: 0.000050069649322408516",
            "extra": "mean: 3.450882059523801 msec\nrounds: 252"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 849.2158417983837,
            "unit": "iter/sec",
            "range": "stddev: 0.000029110787493362956",
            "extra": "mean: 1.1775569304999078 msec\nrounds: 777"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 498.26830410017834,
            "unit": "iter/sec",
            "range": "stddev: 0.000032069921568874775",
            "extra": "mean: 2.006950857140909 msec\nrounds: 469"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 270.78167184116836,
            "unit": "iter/sec",
            "range": "stddev: 0.00004186701254227662",
            "extra": "mean: 3.693012134833731 msec\nrounds: 267"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 664.979545584325,
            "unit": "iter/sec",
            "range": "stddev: 0.00003412475014826119",
            "extra": "mean: 1.503805653332222 msec\nrounds: 600"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 403.664007347774,
            "unit": "iter/sec",
            "range": "stddev: 0.0000416679672281541",
            "extra": "mean: 2.477307814908692 msec\nrounds: 389"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 226.2018022584308,
            "unit": "iter/sec",
            "range": "stddev: 0.00004807535125423185",
            "extra": "mean: 4.420831266664803 msec\nrounds: 195"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 8.034757417844276,
            "unit": "iter/sec",
            "range": "stddev: 0.00019335753716434064",
            "extra": "mean: 124.45926466667363 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.5219106492059273,
            "unit": "iter/sec",
            "range": "stddev: 0.0010756763573664093",
            "extra": "mean: 283.9367887500117 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.4267294271245168,
            "unit": "iter/sec",
            "range": "stddev: 0.003053825797673863",
            "extra": "mean: 700.9037459999945 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 531.3683164008611,
            "unit": "iter/sec",
            "range": "stddev: 0.00002570872651221888",
            "extra": "mean: 1.881933809628209 msec\nrounds: 457"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 296.4798189825194,
            "unit": "iter/sec",
            "range": "stddev: 0.00006898481891416237",
            "extra": "mean: 3.3729108558952556 msec\nrounds: 229"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 153.0761629448626,
            "unit": "iter/sec",
            "range": "stddev: 0.00016888194571917461",
            "extra": "mean: 6.532695755904176 msec\nrounds: 127"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 418.0970212430308,
            "unit": "iter/sec",
            "range": "stddev: 0.00007304141005701385",
            "extra": "mean: 2.391789343600039 msec\nrounds: 422"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 175.33343572466677,
            "unit": "iter/sec",
            "range": "stddev: 0.00006982294216477787",
            "extra": "mean: 5.703418722543832 msec\nrounds: 173"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 65.86267282758833,
            "unit": "iter/sec",
            "range": "stddev: 0.00042732853698541266",
            "extra": "mean: 15.183106865671013 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 143.16740945110647,
            "unit": "iter/sec",
            "range": "stddev: 0.0005241100754611785",
            "extra": "mean: 6.984829884356559 msec\nrounds: 147"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 60.92409621542213,
            "unit": "iter/sec",
            "range": "stddev: 0.0010351790601435182",
            "extra": "mean: 16.413866796876064 msec\nrounds: 64"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 36.83469543868713,
            "unit": "iter/sec",
            "range": "stddev: 0.0011128733891992023",
            "extra": "mean: 27.148317315791065 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 184.25862230607734,
            "unit": "iter/sec",
            "range": "stddev: 0.0002652797581568329",
            "extra": "mean: 5.427154439149507 msec\nrounds: 189"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 75.42953032571849,
            "unit": "iter/sec",
            "range": "stddev: 0.0006945479902908417",
            "extra": "mean: 13.257407220777026 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 30.805582867672076,
            "unit": "iter/sec",
            "range": "stddev: 0.0008697999569621008",
            "extra": "mean: 32.46164840625099 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 64.36971702813662,
            "unit": "iter/sec",
            "range": "stddev: 0.00022260027167741628",
            "extra": "mean: 15.535255492313109 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 27.239197792428172,
            "unit": "iter/sec",
            "range": "stddev: 0.0008179355583983114",
            "extra": "mean: 36.71180067857855 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 16.777599049525644,
            "unit": "iter/sec",
            "range": "stddev: 0.0014960241146725031",
            "extra": "mean: 59.60328394117115 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 293.6326520369474,
            "unit": "iter/sec",
            "range": "stddev: 0.0001628184644733447",
            "extra": "mean: 3.405615802816682 msec\nrounds: 284"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 186.92233115451455,
            "unit": "iter/sec",
            "range": "stddev: 0.00009598581816769696",
            "extra": "mean: 5.349815582887074 msec\nrounds: 187"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 65.53656092671969,
            "unit": "iter/sec",
            "range": "stddev: 0.00043873961334488237",
            "extra": "mean: 15.258658462688624 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 132.8145890198623,
            "unit": "iter/sec",
            "range": "stddev: 0.00033477896675844184",
            "extra": "mean: 7.529293335767887 msec\nrounds: 137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 83.01368770978995,
            "unit": "iter/sec",
            "range": "stddev: 0.0006546385238781362",
            "extra": "mean: 12.046206205125234 msec\nrounds: 78"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 29.86882860846888,
            "unit": "iter/sec",
            "range": "stddev: 0.00183326787552996",
            "extra": "mean: 33.47971937930181 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 61.138672380609286,
            "unit": "iter/sec",
            "range": "stddev: 0.0008490860618828348",
            "extra": "mean: 16.35625964814309 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 37.549994830140626,
            "unit": "iter/sec",
            "range": "stddev: 0.004398383005861602",
            "extra": "mean: 26.631162121953743 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 13.24981635703563,
            "unit": "iter/sec",
            "range": "stddev: 0.00425034830550922",
            "extra": "mean: 75.47274415384646 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 27.401600290643554,
            "unit": "iter/sec",
            "range": "stddev: 0.0013541350886483831",
            "extra": "mean: 36.49421892857317 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 18.196287071384553,
            "unit": "iter/sec",
            "range": "stddev: 0.0021691326704265214",
            "extra": "mean: 54.95626641176694 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.182386765062399,
            "unit": "iter/sec",
            "range": "stddev: 0.005243686414012868",
            "extra": "mean: 161.7498286666811 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 12.822700969811958,
            "unit": "iter/sec",
            "range": "stddev: 0.0013490323335443332",
            "extra": "mean: 77.98668957143003 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 8.36329163517568,
            "unit": "iter/sec",
            "range": "stddev: 0.0030797266882924023",
            "extra": "mean: 119.57014577777475 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1555.4269754942998,
            "unit": "iter/sec",
            "range": "stddev: 0.000013951318139701705",
            "extra": "mean: 642.9102849281687 usec\nrounds: 1453"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 495.2957132864538,
            "unit": "iter/sec",
            "range": "stddev: 0.000024991742243303328",
            "extra": "mean: 2.018995870900363 msec\nrounds: 488"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 144.8792811951692,
            "unit": "iter/sec",
            "range": "stddev: 0.0000632889280894144",
            "extra": "mean: 6.902298187501938 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 39.972178895521125,
            "unit": "iter/sec",
            "range": "stddev: 0.00012919925480552472",
            "extra": "mean: 25.017400292683316 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 10.440274559554618,
            "unit": "iter/sec",
            "range": "stddev: 0.00034883919439944905",
            "extra": "mean: 95.7829216363693 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 131.1075672967135,
            "unit": "iter/sec",
            "range": "stddev: 0.00006838785837763394",
            "extra": "mean: 7.6273248037382135 msec\nrounds: 107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 121.84460253771645,
            "unit": "iter/sec",
            "range": "stddev: 0.00006693617154453834",
            "extra": "mean: 8.207175198347047 msec\nrounds: 121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 67.52249980844492,
            "unit": "iter/sec",
            "range": "stddev: 0.0004454591516033128",
            "extra": "mean: 14.80987823076615 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 102.38039559247748,
            "unit": "iter/sec",
            "range": "stddev: 0.0000805958595728809",
            "extra": "mean: 9.767494980000606 msec\nrounds: 100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.5208735307533416,
            "unit": "iter/sec",
            "range": "stddev: 0.001826055422333706",
            "extra": "mean: 1.9198518276666807 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}