window.BENCHMARK_DATA = {
  "lastUpdate": 1793553367527,
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
          "id": "e81473348e0cc4a969f72a688ac5d2ba177015ca",
          "message": "Test Python 3.14; settle the 1.0 breakpoint default and engine cleanup\n\n- CI test matrices (Linux, macOS, Windows), classifiers and the README\n  badge include Python 3.14.\n- Plan: at_breakpoints=\"mean\" is the final 1.0 default; Phase 8 gains the\n  engine cleanup (engines take validated 1.0 inputs, drop their own\n  checks, return raw coefficients; the legacy solution object goes).\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-11-01T12:09:18-05:00",
          "tree_id": "6668a95afaea899717b87a6629c94d759421c458",
          "url": "https://github.com/trout314/voles/commit/e81473348e0cc4a969f72a688ac5d2ba177015ca"
        },
        "date": 1793553366943,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 4847.991980960495,
            "unit": "iter/sec",
            "range": "stddev: 0.000017715924982885146",
            "extra": "mean: 206.27096825392803 usec\nrounds: 3213"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3455.9462463185514,
            "unit": "iter/sec",
            "range": "stddev: 0.000017818473178857995",
            "extra": "mean: 289.3563524216416 usec\nrounds: 3283"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2081.301477140116,
            "unit": "iter/sec",
            "range": "stddev: 0.0003682473637866645",
            "extra": "mean: 480.46859668503413 usec\nrounds: 1991"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1182.4454395954954,
            "unit": "iter/sec",
            "range": "stddev: 0.000037532790215505545",
            "extra": "mean: 845.704982668876 usec\nrounds: 1154"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 606.6939339665233,
            "unit": "iter/sec",
            "range": "stddev: 0.000027192709686657724",
            "extra": "mean: 1.648277564705598 msec\nrounds: 595"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 4857.571248664806,
            "unit": "iter/sec",
            "range": "stddev: 0.000017206829835926386",
            "extra": "mean: 205.86419607841444 usec\nrounds: 3876"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 3935.1638546158742,
            "unit": "iter/sec",
            "range": "stddev: 0.00001817897182161328",
            "extra": "mean: 254.11902450441002 usec\nrounds: 3632"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 2856.378547645817,
            "unit": "iter/sec",
            "range": "stddev: 0.00002063741383130525",
            "extra": "mean: 350.0936529663355 usec\nrounds: 2579"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1940.7938750494463,
            "unit": "iter/sec",
            "range": "stddev: 0.000032411317000016296",
            "extra": "mean: 515.2530687858456 usec\nrounds: 1919"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1149.5708748918073,
            "unit": "iter/sec",
            "range": "stddev: 0.000022068062860847457",
            "extra": "mean: 869.8898187500755 usec\nrounds: 1120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 4591.82854098696,
            "unit": "iter/sec",
            "range": "stddev: 0.000017454373182291417",
            "extra": "mean: 217.7781663827242 usec\nrounds: 3522"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 3730.5638248694104,
            "unit": "iter/sec",
            "range": "stddev: 0.000019502270596683062",
            "extra": "mean: 268.05599553976407 usec\nrounds: 3363"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 2739.4981341860616,
            "unit": "iter/sec",
            "range": "stddev: 0.000018829247925869527",
            "extra": "mean: 365.0303635987371 usec\nrounds: 2412"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1869.4337995203994,
            "unit": "iter/sec",
            "range": "stddev: 0.000020110230628489294",
            "extra": "mean: 534.921322304405 usec\nrounds: 1753"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1112.2819295358538,
            "unit": "iter/sec",
            "range": "stddev: 0.000021192976483370945",
            "extra": "mean: 899.0526353487481 usec\nrounds: 1075"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 4053.749124942007,
            "unit": "iter/sec",
            "range": "stddev: 0.00002211128228697676",
            "extra": "mean: 246.68522130468693 usec\nrounds: 3633"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 2781.662289349351,
            "unit": "iter/sec",
            "range": "stddev: 0.00006237915943122824",
            "extra": "mean: 359.497270329644 usec\nrounds: 2730"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1749.1794968343302,
            "unit": "iter/sec",
            "range": "stddev: 0.000020214303540501328",
            "extra": "mean: 571.6966165049402 usec\nrounds: 1648"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 960.8497953395347,
            "unit": "iter/sec",
            "range": "stddev: 0.000022197088322396808",
            "extra": "mean: 1.0407453952223937 msec\nrounds: 921"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 492.3852484839597,
            "unit": "iter/sec",
            "range": "stddev: 0.00003464526370741515",
            "extra": "mean: 2.0309300554372247 msec\nrounds: 469"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 2710.3685024589795,
            "unit": "iter/sec",
            "range": "stddev: 0.00003677471650694521",
            "extra": "mean: 368.9535201920886 usec\nrounds: 2080"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 1956.4645168358152,
            "unit": "iter/sec",
            "range": "stddev: 0.000044178056073817345",
            "extra": "mean: 511.1260599897295 usec\nrounds: 1917"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1273.5057477949529,
            "unit": "iter/sec",
            "range": "stddev: 0.00002210403633371193",
            "extra": "mean: 785.2339902913496 usec\nrounds: 1236"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 804.3101258703506,
            "unit": "iter/sec",
            "range": "stddev: 0.000023293016680147042",
            "extra": "mean: 1.2433015174562072 msec\nrounds: 802"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 442.6102973267694,
            "unit": "iter/sec",
            "range": "stddev: 0.000028259029622423155",
            "extra": "mean: 2.2593238477272077 msec\nrounds: 440"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 2593.1864972451626,
            "unit": "iter/sec",
            "range": "stddev: 0.00005009204062120394",
            "extra": "mean: 385.625947482889 usec\nrounds: 2304"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 1935.4739414377257,
            "unit": "iter/sec",
            "range": "stddev: 0.00002204567212171951",
            "extra": "mean: 516.669317313139 usec\nrounds: 1831"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1236.1180081699167,
            "unit": "iter/sec",
            "range": "stddev: 0.00003074247820784699",
            "extra": "mean: 808.9842502015714 usec\nrounds: 1239"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 779.4681469230192,
            "unit": "iter/sec",
            "range": "stddev: 0.0000240524002337648",
            "extra": "mean: 1.28292606176088 msec\nrounds: 761"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 429.1515611781638,
            "unit": "iter/sec",
            "range": "stddev: 0.0000350427472970962",
            "extra": "mean: 2.3301791032861847 msec\nrounds: 426"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2767.779420552006,
            "unit": "iter/sec",
            "range": "stddev: 0.00004007111126011677",
            "extra": "mean: 361.30046801220885 usec\nrounds: 2626"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1717.392858524998,
            "unit": "iter/sec",
            "range": "stddev: 0.00002145759811811084",
            "extra": "mean: 582.2779540721166 usec\nrounds: 1633"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 937.4415579663786,
            "unit": "iter/sec",
            "range": "stddev: 0.00002187846425850288",
            "extra": "mean: 1.066733164859185 msec\nrounds: 922"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 479.2986808649515,
            "unit": "iter/sec",
            "range": "stddev: 0.000054020736460107587",
            "extra": "mean: 2.0863817071129445 msec\nrounds: 478"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 205.28349800459944,
            "unit": "iter/sec",
            "range": "stddev: 0.00003904011924659799",
            "extra": "mean: 4.871312159624223 msec\nrounds: 213"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2264.2722310293766,
            "unit": "iter/sec",
            "range": "stddev: 0.00004256000533123532",
            "extra": "mean: 441.6430084227915 usec\nrounds: 2137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1362.8046364817983,
            "unit": "iter/sec",
            "range": "stddev: 0.000020801872424813913",
            "extra": "mean: 733.7808906943472 usec\nrounds: 1354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 737.3505956575179,
            "unit": "iter/sec",
            "range": "stddev: 0.00003118139934109972",
            "extra": "mean: 1.3562069467215518 msec\nrounds: 732"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 375.2799248809304,
            "unit": "iter/sec",
            "range": "stddev: 0.00003223137087159018",
            "extra": "mean: 2.664677574525954 msec\nrounds: 369"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 157.60975788795534,
            "unit": "iter/sec",
            "range": "stddev: 0.000052938035268923755",
            "extra": "mean: 6.344784824242287 msec\nrounds: 165"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 720.6350983134483,
            "unit": "iter/sec",
            "range": "stddev: 0.00002856387703918889",
            "extra": "mean: 1.3876648560975846 msec\nrounds: 410"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 574.4033422821982,
            "unit": "iter/sec",
            "range": "stddev: 0.00003334331704495278",
            "extra": "mean: 1.7409369451557102 msec\nrounds: 547"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 406.0108595351931,
            "unit": "iter/sec",
            "range": "stddev: 0.00005198192325451529",
            "extra": "mean: 2.462988308107852 msec\nrounds: 370"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 725.9633415885062,
            "unit": "iter/sec",
            "range": "stddev: 0.00002893071612078832",
            "extra": "mean: 1.377480022354661 msec\nrounds: 671"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 558.235944614234,
            "unit": "iter/sec",
            "range": "stddev: 0.00003781662832946196",
            "extra": "mean: 1.79135723818545 msec\nrounds: 529"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 377.75285895907945,
            "unit": "iter/sec",
            "range": "stddev: 0.00004577917575598373",
            "extra": "mean: 2.6472334392267998 msec\nrounds: 362"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 483.6258207991503,
            "unit": "iter/sec",
            "range": "stddev: 0.00003582043840549384",
            "extra": "mean: 2.067714247240947 msec\nrounds: 453"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 347.74507915730715,
            "unit": "iter/sec",
            "range": "stddev: 0.00004147859955128835",
            "extra": "mean: 2.8756697360701877 msec\nrounds: 341"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 223.07035772449626,
            "unit": "iter/sec",
            "range": "stddev: 0.00005094039604801742",
            "extra": "mean: 4.482890556149344 msec\nrounds: 187"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.344327855616374,
            "unit": "iter/sec",
            "range": "stddev: 0.0005577827388710463",
            "extra": "mean: 187.11426900000086 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.2310975613746726,
            "unit": "iter/sec",
            "range": "stddev: 0.002858008736511022",
            "extra": "mean: 448.20989333333233 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8521750312156817,
            "unit": "iter/sec",
            "range": "stddev: 0.0037701520697220577",
            "extra": "mean: 1.1734678480000014 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 601.2532259334973,
            "unit": "iter/sec",
            "range": "stddev: 0.000045660173957624117",
            "extra": "mean: 1.6631927395439983 msec\nrounds: 526"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 451.9591423210778,
            "unit": "iter/sec",
            "range": "stddev: 0.00004796868883920104",
            "extra": "mean: 2.21258938333321 msec\nrounds: 300"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 287.66091218515913,
            "unit": "iter/sec",
            "range": "stddev: 0.00008061090298969829",
            "extra": "mean: 3.4763151948719693 msec\nrounds: 195"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 607.2499173632253,
            "unit": "iter/sec",
            "range": "stddev: 0.000036174415990709506",
            "extra": "mean: 1.646768441471606 msec\nrounds: 598"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 293.67527245330723,
            "unit": "iter/sec",
            "range": "stddev: 0.00003523768796199403",
            "extra": "mean: 3.4051215536336805 msec\nrounds: 289"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 237.98800577804903,
            "unit": "iter/sec",
            "range": "stddev: 0.00006957495258862577",
            "extra": "mean: 4.201892430379933 msec\nrounds: 237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 225.01088130121943,
            "unit": "iter/sec",
            "range": "stddev: 0.00006420548588751318",
            "extra": "mean: 4.444229515555347 msec\nrounds: 225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 110.67501477104773,
            "unit": "iter/sec",
            "range": "stddev: 0.00015746817898980485",
            "extra": "mean: 9.035462991070656 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 86.33577348199013,
            "unit": "iter/sec",
            "range": "stddev: 0.00008403606913424",
            "extra": "mean: 11.582684206896028 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 307.4979910387706,
            "unit": "iter/sec",
            "range": "stddev: 0.000047766623119738835",
            "extra": "mean: 3.2520537666664495 msec\nrounds: 300"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 141.24801343184717,
            "unit": "iter/sec",
            "range": "stddev: 0.00006338383994790477",
            "extra": "mean: 7.079745588652153 msec\nrounds: 141"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 114.22984309302589,
            "unit": "iter/sec",
            "range": "stddev: 0.00018310185338913553",
            "extra": "mean: 8.754279730434588 msec\nrounds: 115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 111.71405748047447,
            "unit": "iter/sec",
            "range": "stddev: 0.00017258808107648084",
            "extra": "mean: 8.951424937499754 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 53.19824111561604,
            "unit": "iter/sec",
            "range": "stddev: 0.0000793722935426463",
            "extra": "mean: 18.797613962963442 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 39.8731375637977,
            "unit": "iter/sec",
            "range": "stddev: 0.0001804583858799083",
            "extra": "mean: 25.079541292680645 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 320.49503933234286,
            "unit": "iter/sec",
            "range": "stddev: 0.000031810286202208934",
            "extra": "mean: 3.120173098726289 msec\nrounds: 314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 239.32266195485778,
            "unit": "iter/sec",
            "range": "stddev: 0.00004101542501003081",
            "extra": "mean: 4.17845928936151 msec\nrounds: 235"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 69.7550569876338,
            "unit": "iter/sec",
            "range": "stddev: 0.00007310421547815817",
            "extra": "mean: 14.335878188405474 msec\nrounds: 69"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 162.6109487520317,
            "unit": "iter/sec",
            "range": "stddev: 0.00013988782845643935",
            "extra": "mean: 6.149647411041907 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 119.14082949020691,
            "unit": "iter/sec",
            "range": "stddev: 0.0008290874178292478",
            "extra": "mean: 8.3934282166652 msec\nrounds: 120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 27.84445284285445,
            "unit": "iter/sec",
            "range": "stddev: 0.00025391139475817244",
            "extra": "mean: 35.91379603124878 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 80.46414949749455,
            "unit": "iter/sec",
            "range": "stddev: 0.00007952025925829036",
            "extra": "mean: 12.427894984848345 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 59.450536933632144,
            "unit": "iter/sec",
            "range": "stddev: 0.00010995971295696377",
            "extra": "mean: 16.820705944445113 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.27018321532017,
            "unit": "iter/sec",
            "range": "stddev: 0.001390317215399861",
            "extra": "mean: 70.07618507143069 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 38.55907074507359,
            "unit": "iter/sec",
            "range": "stddev: 0.0001814190831685608",
            "extra": "mean: 25.934234945943622 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 28.491740159054874,
            "unit": "iter/sec",
            "range": "stddev: 0.00015599195205188068",
            "extra": "mean: 35.09789133333062 msec\nrounds: 27"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.635722151881873,
            "unit": "iter/sec",
            "range": "stddev: 0.0030075895182952546",
            "extra": "mean: 150.69949842857764 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 18.181646982652254,
            "unit": "iter/sec",
            "range": "stddev: 0.0003200441110701591",
            "extra": "mean: 55.00051788235329 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.37306629061972,
            "unit": "iter/sec",
            "range": "stddev: 0.0005310690109895099",
            "extra": "mean: 74.77716615384094 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 925.4644760017704,
            "unit": "iter/sec",
            "range": "stddev: 0.000024708691920954334",
            "extra": "mean: 1.0805385035633577 msec\nrounds: 842"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 327.54009538405955,
            "unit": "iter/sec",
            "range": "stddev: 0.00004681439733141333",
            "extra": "mean: 3.053061332315491 msec\nrounds: 328"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 99.38113400111288,
            "unit": "iter/sec",
            "range": "stddev: 0.00009211163858861729",
            "extra": "mean: 10.062271979999764 msec\nrounds: 100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.616356094227548,
            "unit": "iter/sec",
            "range": "stddev: 0.00035915951737429305",
            "extra": "mean: 36.210425321428374 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.231818525498213,
            "unit": "iter/sec",
            "range": "stddev: 0.0009776525135986641",
            "extra": "mean: 138.27780612499652 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 221.48308527129686,
            "unit": "iter/sec",
            "range": "stddev: 0.00006201613489375858",
            "extra": "mean: 4.515017473118048 msec\nrounds: 186"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 198.49379183930512,
            "unit": "iter/sec",
            "range": "stddev: 0.00006278377602904927",
            "extra": "mean: 5.037940938775412 msec\nrounds: 196"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 123.29617152670212,
            "unit": "iter/sec",
            "range": "stddev: 0.00043023348531115734",
            "extra": "mean: 8.110551914285766 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 111.72306223056489,
            "unit": "iter/sec",
            "range": "stddev: 0.0001043569818591248",
            "extra": "mean: 8.950703462963466 msec\nrounds: 108"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.2907547880690673,
            "unit": "iter/sec",
            "range": "stddev: 0.006400481510787129",
            "extra": "mean: 3.4393242726666813 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_25",
            "value": 47.44016506394513,
            "unit": "iter/sec",
            "range": "stddev: 0.00016042421415194828",
            "extra": "mean: 21.079184666665657 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_50",
            "value": 22.42931641316061,
            "unit": "iter/sec",
            "range": "stddev: 0.0001874109545932636",
            "extra": "mean: 44.58450634782792 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_100",
            "value": 10.56137133576906,
            "unit": "iter/sec",
            "range": "stddev: 0.00025187152843233947",
            "extra": "mean: 94.68467381818289 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_200",
            "value": 4.783693291200837,
            "unit": "iter/sec",
            "range": "stddev: 0.00030404568896114884",
            "extra": "mean: 209.04350239999872 msec\nrounds: 5"
          }
        ]
      }
    ]
  }
}