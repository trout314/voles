window.BENCHMARK_DATA = {
  "lastUpdate": 1793038501540,
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
          "id": "3c5e541976e2c80f65de3fb939f5b011989cd849",
          "message": "CI: per-test timeout + Windows forced-GC hang diagnostics\n\nWindows py3.10/3.11 test jobs intermittently deadlock in the forced-GC\nthread-safety tests (0x80000001 guard-page fault inside GC.collect, then a\nhang until the 30-minute job timeout).\n\n- pytest-timeout in the dev extra; test workflows run with --timeout=300 so\n  a hang fails within minutes instead of eating the job timeout.\n- volterra_debug_thread_stats export (+ debug_thread_stats_d wrapper):\n  registered druntime threads and the OS ids of dead-but-registered ones.\n- benchmarks/gc_stress_debug.py and a manually triggered Windows GC debug\n  workflow that loop the hammer-plus-solve scenario in timed subprocess\n  rounds (matrix fan-out vs persistent pool; py3.12 as control).\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-10-26T14:06:22-04:00",
          "tree_id": "c6824a905ee07945b6df49cf26543c88eded7d26",
          "url": "https://github.com/trout314/voles/commit/3c5e541976e2c80f65de3fb939f5b011989cd849"
        },
        "date": 1793038500307,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7908.927998534042,
            "unit": "iter/sec",
            "range": "stddev: 0.00002708292813076764",
            "extra": "mean: 126.43938599331727 usec\nrounds: 4969"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4447.123749262079,
            "unit": "iter/sec",
            "range": "stddev: 0.0003226289583625574",
            "extra": "mean: 224.86444191392965 usec\nrounds: 4347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2399.6606337928333,
            "unit": "iter/sec",
            "range": "stddev: 0.00003559774660572538",
            "extra": "mean: 416.725592743266 usec\nrounds: 2205"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1203.0930999468321,
            "unit": "iter/sec",
            "range": "stddev: 0.00005237636518542437",
            "extra": "mean: 831.1908696377634 usec\nrounds: 1212"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 590.6943349951397,
            "unit": "iter/sec",
            "range": "stddev: 0.00007131506477677164",
            "extra": "mean: 1.692922956520699 msec\nrounds: 598"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 8326.861092366215,
            "unit": "iter/sec",
            "range": "stddev: 0.000016156196883948695",
            "extra": "mean: 120.09327271194259 usec\nrounds: 6010"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 5646.40645778039,
            "unit": "iter/sec",
            "range": "stddev: 0.000019989193243774645",
            "extra": "mean: 177.10379291275842 usec\nrounds: 5249"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3567.7063514845026,
            "unit": "iter/sec",
            "range": "stddev: 0.000026280975317178737",
            "extra": "mean: 280.29212650416304 usec\nrounds: 3241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2193.8000584220763,
            "unit": "iter/sec",
            "range": "stddev: 0.00002736818574755247",
            "extra": "mean: 455.8300544121897 usec\nrounds: 2187"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1172.1711308507513,
            "unit": "iter/sec",
            "range": "stddev: 0.00006502300301682986",
            "extra": "mean: 853.1177519055677 usec\nrounds: 1181"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 7582.260982397824,
            "unit": "iter/sec",
            "range": "stddev: 0.000015578014065957236",
            "extra": "mean: 131.88678183479763 usec\nrounds: 5450"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 5101.80724621195,
            "unit": "iter/sec",
            "range": "stddev: 0.000020126902741384467",
            "extra": "mean: 196.00897324031436 usec\nrounds: 4858"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3218.308563365369,
            "unit": "iter/sec",
            "range": "stddev: 0.00002310509145916788",
            "extra": "mean: 310.72222576268604 usec\nrounds: 2950"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1952.604577148779,
            "unit": "iter/sec",
            "range": "stddev: 0.00002918398494299806",
            "extra": "mean: 512.1364620891211 usec\nrounds: 1952"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1046.3783792822085,
            "unit": "iter/sec",
            "range": "stddev: 0.00005273610607428501",
            "extra": "mean: 955.6772385587487 usec\nrounds: 1027"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 6442.620603003898,
            "unit": "iter/sec",
            "range": "stddev: 0.000019066276305176198",
            "extra": "mean: 155.21634155109894 usec\nrounds: 5273"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3722.381197975953,
            "unit": "iter/sec",
            "range": "stddev: 0.000024225456268414702",
            "extra": "mean: 268.6452426053921 usec\nrounds: 3685"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1973.692550601028,
            "unit": "iter/sec",
            "range": "stddev: 0.00003663316648983915",
            "extra": "mean: 506.66452568586755 usec\nrounds: 2005"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 991.1270460681746,
            "unit": "iter/sec",
            "range": "stddev: 0.00004681991603947513",
            "extra": "mean: 1.0089523880586497 msec\nrounds: 1005"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 487.43151036430186,
            "unit": "iter/sec",
            "range": "stddev: 0.00006051443558654656",
            "extra": "mean: 2.051570279591915 msec\nrounds: 490"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3611.8227782837944,
            "unit": "iter/sec",
            "range": "stddev: 0.00003405089891499788",
            "extra": "mean: 276.86851248974165 usec\nrounds: 2722"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2001.5179405127212,
            "unit": "iter/sec",
            "range": "stddev: 0.00006974280228879575",
            "extra": "mean: 499.6208026713134 usec\nrounds: 2321"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1402.8814923890582,
            "unit": "iter/sec",
            "range": "stddev: 0.000033817227417033635",
            "extra": "mean: 712.8185847665827 usec\nrounds: 1221"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 829.7212632770355,
            "unit": "iter/sec",
            "range": "stddev: 0.00004039444483338889",
            "extra": "mean: 1.2052240243313015 msec\nrounds: 822"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 437.2245142078358,
            "unit": "iter/sec",
            "range": "stddev: 0.00007025695158429975",
            "extra": "mean: 2.2871544652792446 msec\nrounds: 432"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 3683.6517667667717,
            "unit": "iter/sec",
            "range": "stddev: 0.000020891123341314288",
            "extra": "mean: 271.4697434273826 usec\nrounds: 3461"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 1925.0154522694918,
            "unit": "iter/sec",
            "range": "stddev: 0.00008477423620595905",
            "extra": "mean: 519.4763495643906 usec\nrounds: 2177"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1375.460325358154,
            "unit": "iter/sec",
            "range": "stddev: 0.000037527474578329646",
            "extra": "mean: 727.0293308820897 usec\nrounds: 1224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 809.7334075711285,
            "unit": "iter/sec",
            "range": "stddev: 0.00003641153682627963",
            "extra": "mean: 1.2349743639694872 msec\nrounds: 816"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 427.1304522451256,
            "unit": "iter/sec",
            "range": "stddev: 0.00008153004531144484",
            "extra": "mean: 2.34120511601011 msec\nrounds: 431"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3661.5153273485985,
            "unit": "iter/sec",
            "range": "stddev: 0.000025146599131871152",
            "extra": "mean: 273.1109692565801 usec\nrounds: 3513"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1881.7932887746565,
            "unit": "iter/sec",
            "range": "stddev: 0.000059940367775921695",
            "extra": "mean: 531.4079957481182 usec\nrounds: 1881"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 956.3514567444565,
            "unit": "iter/sec",
            "range": "stddev: 0.000047866119438424346",
            "extra": "mean: 1.045640693018996 msec\nrounds: 974"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 466.75907184309807,
            "unit": "iter/sec",
            "range": "stddev: 0.00006061273239201318",
            "extra": "mean: 2.1424329173748804 msec\nrounds: 472"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 225.10239201276607,
            "unit": "iter/sec",
            "range": "stddev: 0.00008588840867586289",
            "extra": "mean: 4.442422806165861 msec\nrounds: 227"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2767.253204101101,
            "unit": "iter/sec",
            "range": "stddev: 0.000029664863822474575",
            "extra": "mean: 361.36917233232884 usec\nrounds: 2530"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1439.2385958098428,
            "unit": "iter/sec",
            "range": "stddev: 0.00003956367964159525",
            "extra": "mean: 694.8118282204013 usec\nrounds: 1467"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 721.156525517994,
            "unit": "iter/sec",
            "range": "stddev: 0.0000531463313072854",
            "extra": "mean: 1.3866615146853418 msec\nrounds: 715"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 346.07991048563304,
            "unit": "iter/sec",
            "range": "stddev: 0.00025220833994364146",
            "extra": "mean: 2.8895060640669965 msec\nrounds: 359"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 163.11168329919258,
            "unit": "iter/sec",
            "range": "stddev: 0.0004310122516841445",
            "extra": "mean: 6.130768684213255 msec\nrounds: 171"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1049.0285666894738,
            "unit": "iter/sec",
            "range": "stddev: 0.0000206663527256752",
            "extra": "mean: 953.2628869734233 usec\nrounds: 522"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 865.054961850723,
            "unit": "iter/sec",
            "range": "stddev: 0.00002833276870576806",
            "extra": "mean: 1.1559959125147052 msec\nrounds: 823"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 633.502371173336,
            "unit": "iter/sec",
            "range": "stddev: 0.00003868046579743459",
            "extra": "mean: 1.5785260568920343 msec\nrounds: 457"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1034.4722394534967,
            "unit": "iter/sec",
            "range": "stddev: 0.00004381280194655308",
            "extra": "mean: 966.6764963439637 usec\nrounds: 957"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 813.2561124902811,
            "unit": "iter/sec",
            "range": "stddev: 0.00003181516360094427",
            "extra": "mean: 1.229624941813088 msec\nrounds: 739"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 565.4930484778947,
            "unit": "iter/sec",
            "range": "stddev: 0.000029477161702828657",
            "extra": "mean: 1.7683683339550198 msec\nrounds: 536"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 672.964914090524,
            "unit": "iter/sec",
            "range": "stddev: 0.00006365811141012667",
            "extra": "mean: 1.4859615695588624 msec\nrounds: 611"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 502.75967641827003,
            "unit": "iter/sec",
            "range": "stddev: 0.0001403641161896123",
            "extra": "mean: 1.9890218864093068 msec\nrounds: 493"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 333.79640277221097,
            "unit": "iter/sec",
            "range": "stddev: 0.000045205029394198615",
            "extra": "mean: 2.995838156717402 msec\nrounds: 268"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.31368148766866,
            "unit": "iter/sec",
            "range": "stddev: 0.0005519738564945236",
            "extra": "mean: 188.19344033335028 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.220664735158666,
            "unit": "iter/sec",
            "range": "stddev: 0.0014613450467100937",
            "extra": "mean: 450.31561233332695 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8415503005975616,
            "unit": "iter/sec",
            "range": "stddev: 0.003365860493742575",
            "extra": "mean: 1.1882830999999971 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 738.4391621012421,
            "unit": "iter/sec",
            "range": "stddev: 0.00002977381670076436",
            "extra": "mean: 1.3542077009492315 msec\nrounds: 632"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 525.4143400001973,
            "unit": "iter/sec",
            "range": "stddev: 0.00005630391042596363",
            "extra": "mean: 1.9032598158619436 msec\nrounds: 353"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 306.4020010405233,
            "unit": "iter/sec",
            "range": "stddev: 0.00017606243087117543",
            "extra": "mean: 3.2636862572831067 msec\nrounds: 206"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 595.1443576594553,
            "unit": "iter/sec",
            "range": "stddev: 0.00006262357123695432",
            "extra": "mean: 1.6802646066119729 msec\nrounds: 605"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 276.7871491588334,
            "unit": "iter/sec",
            "range": "stddev: 0.00021606101914700625",
            "extra": "mean: 3.6128844964046842 msec\nrounds: 278"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 229.67832884680124,
            "unit": "iter/sec",
            "range": "stddev: 0.000055559996921769137",
            "extra": "mean: 4.35391534334532 msec\nrounds: 233"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 219.06892212898924,
            "unit": "iter/sec",
            "range": "stddev: 0.00009734283696469693",
            "extra": "mean: 4.564773452489958 msec\nrounds: 221"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 105.6871293101016,
            "unit": "iter/sec",
            "range": "stddev: 0.00009362086106737735",
            "extra": "mean: 9.461890076187546 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 78.03878655429918,
            "unit": "iter/sec",
            "range": "stddev: 0.0007348167539951019",
            "extra": "mean: 12.814140815787836 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 296.6530342420576,
            "unit": "iter/sec",
            "range": "stddev: 0.00006920910320157801",
            "extra": "mean: 3.370941418330608 msec\nrounds: 251"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 132.7785028848555,
            "unit": "iter/sec",
            "range": "stddev: 0.00006138783568393602",
            "extra": "mean: 7.531339624059418 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 107.2789685644773,
            "unit": "iter/sec",
            "range": "stddev: 0.00011109981479372448",
            "extra": "mean: 9.321491559633847 msec\nrounds: 109"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 106.27548209819675,
            "unit": "iter/sec",
            "range": "stddev: 0.0002052509490196892",
            "extra": "mean: 9.409508009345155 msec\nrounds: 107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 44.72388997785109,
            "unit": "iter/sec",
            "range": "stddev: 0.0017121931048025513",
            "extra": "mean: 22.359414632654644 msec\nrounds: 49"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 34.28588525053239,
            "unit": "iter/sec",
            "range": "stddev: 0.003149872318970625",
            "extra": "mean: 29.166521228570932 msec\nrounds: 35"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 307.21994080588246,
            "unit": "iter/sec",
            "range": "stddev: 0.00020639875699657694",
            "extra": "mean: 3.254997046665835 msec\nrounds: 300"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 231.85701187710168,
            "unit": "iter/sec",
            "range": "stddev: 0.000052198509918881626",
            "extra": "mean: 4.313003052631683 msec\nrounds: 228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 65.54203056693194,
            "unit": "iter/sec",
            "range": "stddev: 0.00028441611017724185",
            "extra": "mean: 15.257385090911908 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 154.8672203499114,
            "unit": "iter/sec",
            "range": "stddev: 0.00011575742926611164",
            "extra": "mean: 6.457144370129273 msec\nrounds: 154"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 110.63198554741706,
            "unit": "iter/sec",
            "range": "stddev: 0.0006102183683203581",
            "extra": "mean: 9.038977245612196 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 30.002585033443378,
            "unit": "iter/sec",
            "range": "stddev: 0.0018555312263078575",
            "extra": "mean: 33.3304613214267 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 71.80133159743131,
            "unit": "iter/sec",
            "range": "stddev: 0.0012473795169539318",
            "extra": "mean: 13.92731830666738 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 50.531585914732005,
            "unit": "iter/sec",
            "range": "stddev: 0.0014841822913327911",
            "extra": "mean: 19.789602520835576 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.341680498701981,
            "unit": "iter/sec",
            "range": "stddev: 0.0018826442511578462",
            "extra": "mean: 69.72683571430187 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 36.024948809744025,
            "unit": "iter/sec",
            "range": "stddev: 0.0007239210478677342",
            "extra": "mean: 27.75854048485199 msec\nrounds: 33"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 25.24683604378265,
            "unit": "iter/sec",
            "range": "stddev: 0.0016732049084185337",
            "extra": "mean: 39.608923600003436 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.882006816311304,
            "unit": "iter/sec",
            "range": "stddev: 0.006883282431554888",
            "extra": "mean: 145.30645299999736 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 15.350358447228313,
            "unit": "iter/sec",
            "range": "stddev: 0.002634368257046759",
            "extra": "mean: 65.14505856249642 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 11.72454042305068,
            "unit": "iter/sec",
            "range": "stddev: 0.0036181555881573623",
            "extra": "mean: 85.29118958334436 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1062.392551353529,
            "unit": "iter/sec",
            "range": "stddev: 0.00001986190258160957",
            "extra": "mean: 941.2716596383904 usec\nrounds: 996"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 348.684740118627,
            "unit": "iter/sec",
            "range": "stddev: 0.000030994066553992144",
            "extra": "mean: 2.867920172416456 msec\nrounds: 348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 101.71381889386221,
            "unit": "iter/sec",
            "range": "stddev: 0.00007241774790868569",
            "extra": "mean: 9.831505796115023 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.526075303677935,
            "unit": "iter/sec",
            "range": "stddev: 0.0009374062529887281",
            "extra": "mean: 36.32918928570916 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.265482694807534,
            "unit": "iter/sec",
            "range": "stddev: 0.0003483909926675912",
            "extra": "mean: 137.63710437500265 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 307.6863694117274,
            "unit": "iter/sec",
            "range": "stddev: 0.00637829622965397",
            "extra": "mean: 3.250062724299171 msec\nrounds: 214"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 301.8980588728976,
            "unit": "iter/sec",
            "range": "stddev: 0.000044213126246803056",
            "extra": "mean: 3.312376382058856 msec\nrounds: 301"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 129.17885267418436,
            "unit": "iter/sec",
            "range": "stddev: 0.00041094746422799057",
            "extra": "mean: 7.74120515315464 msec\nrounds: 111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 171.49288867281743,
            "unit": "iter/sec",
            "range": "stddev: 0.00010740905790660645",
            "extra": "mean: 5.831145581248265 msec\nrounds: 160"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.2923528414469477,
            "unit": "iter/sec",
            "range": "stddev: 0.002812468265989174",
            "extra": "mean: 3.4205243056666745 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}