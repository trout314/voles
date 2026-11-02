window.BENCHMARK_DATA = {
  "lastUpdate": 1793577803651,
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
          "id": "e5e8750357cc13d24ea161d4d75e819522ef7eb3",
          "message": "Release 1.0.0\n\nThe first stable release: the API 0.11 introduced, without the deprecated\n0.10 functions. From here voles follows semantic versioning.\n\n- py.typed, so type checkers use voles' annotations (without it mypy saw\n  every voles name as Any, and test_typing checked nothing against the\n  installed package); a new test type-checks src/voles itself (two\n  annotation fixes in _dlang and _functional).\n- Classifiers: Development Status :: 5 - Production/Stable, Typing :: Typed.\n- Docs for the removal: the migration guide is written for 1.0 (route via\n  0.11 with -W error::DeprecationWarning), README note, stability and\n  warnings pages, CHANGELOG [1.0.0]; stale _api/_warnings docstrings fixed.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-11-01T18:55:42-05:00",
          "tree_id": "f34dfebcf4935ae9b9377e5f6c4d8c73121f9b66",
          "url": "https://github.com/trout314/voles/commit/e5e8750357cc13d24ea161d4d75e819522ef7eb3"
        },
        "date": 1793577802705,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 8757.67724098132,
            "unit": "iter/sec",
            "range": "stddev: 0.00001288199408661837",
            "extra": "mean: 114.18552802112029 usec\nrounds: 5032"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5444.284790714654,
            "unit": "iter/sec",
            "range": "stddev: 0.00020349402752492353",
            "extra": "mean: 183.67885561488657 usec\nrounds: 4862"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3100.789681293809,
            "unit": "iter/sec",
            "range": "stddev: 0.00001858130178368708",
            "extra": "mean: 322.49849321697576 usec\nrounds: 2875"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1603.0864171465205,
            "unit": "iter/sec",
            "range": "stddev: 0.00001782551533579152",
            "extra": "mean: 623.7966895009885 usec\nrounds: 1562"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 791.2965093314832,
            "unit": "iter/sec",
            "range": "stddev: 0.00006097507561548428",
            "extra": "mean: 1.263748782166166 msec\nrounds: 785"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 9795.762173900594,
            "unit": "iter/sec",
            "range": "stddev: 0.000012299194006913167",
            "extra": "mean: 102.08496105227593 usec\nrounds: 5777"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 6997.949448899355,
            "unit": "iter/sec",
            "range": "stddev: 0.00001772697098423954",
            "extra": "mean: 142.89900310115573 usec\nrounds: 5482"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4659.3868259128585,
            "unit": "iter/sec",
            "range": "stddev: 0.00001417805906886663",
            "extra": "mean: 214.62051496531024 usec\nrounds: 4076"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2892.3065151604956,
            "unit": "iter/sec",
            "range": "stddev: 0.000024491456191907414",
            "extra": "mean: 345.7448215665722 usec\nrounds: 2578"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1591.0336242964522,
            "unit": "iter/sec",
            "range": "stddev: 0.000026045272008365866",
            "extra": "mean: 628.5222290271806 usec\nrounds: 1502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 9282.213597900305,
            "unit": "iter/sec",
            "range": "stddev: 0.00001530977882771987",
            "extra": "mean: 107.73292269703923 usec\nrounds: 6882"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6797.034646006893,
            "unit": "iter/sec",
            "range": "stddev: 0.000014058717098737299",
            "extra": "mean: 147.1229811352334 usec\nrounds: 5619"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 4480.42476949202,
            "unit": "iter/sec",
            "range": "stddev: 0.000014531286716681877",
            "extra": "mean: 223.19312374334936 usec\nrounds: 3976"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2807.670960466208,
            "unit": "iter/sec",
            "range": "stddev: 0.000015646201944251773",
            "extra": "mean: 356.1670915433595 usec\nrounds: 2578"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1540.2521309304955,
            "unit": "iter/sec",
            "range": "stddev: 0.00002062924386725232",
            "extra": "mean: 649.2443541667955 usec\nrounds: 1488"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 7035.1843617190625,
            "unit": "iter/sec",
            "range": "stddev: 0.000014406153265808711",
            "extra": "mean: 142.14268576120836 usec\nrounds: 5499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4410.290942164375,
            "unit": "iter/sec",
            "range": "stddev: 0.00002242514837302682",
            "extra": "mean: 226.74241067398705 usec\nrounds: 3991"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 2495.899424011126,
            "unit": "iter/sec",
            "range": "stddev: 0.000016372694999969303",
            "extra": "mean: 400.6571700685413 usec\nrounds: 2352"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1291.3958827540107,
            "unit": "iter/sec",
            "range": "stddev: 0.00001953079556288185",
            "extra": "mean: 774.3558837026919 usec\nrounds: 1264"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 638.7484922660246,
            "unit": "iter/sec",
            "range": "stddev: 0.00004989818639716888",
            "extra": "mean: 1.5655614253622723 msec\nrounds: 623"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 4658.384917028232,
            "unit": "iter/sec",
            "range": "stddev: 0.00002528227011218475",
            "extra": "mean: 214.66667478348688 usec\nrounds: 3450"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3126.6487553287634,
            "unit": "iter/sec",
            "range": "stddev: 0.000017233612897699592",
            "extra": "mean: 319.8312564837016 usec\nrounds: 2429"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1845.737478262238,
            "unit": "iter/sec",
            "range": "stddev: 0.000020645343291588295",
            "extra": "mean: 541.7888577207091 usec\nrounds: 1729"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 1091.4887514333216,
            "unit": "iter/sec",
            "range": "stddev: 0.000030243368458346616",
            "extra": "mean: 916.1798494824795 usec\nrounds: 1063"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 584.7894233657518,
            "unit": "iter/sec",
            "range": "stddev: 0.0000594624873322603",
            "extra": "mean: 1.7100172473101625 msec\nrounds: 558"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 4547.82244939709,
            "unit": "iter/sec",
            "range": "stddev: 0.000015626092937657925",
            "extra": "mean: 219.8854531211022 usec\nrounds: 3573"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2941.204437176084,
            "unit": "iter/sec",
            "range": "stddev: 0.00002923868996420796",
            "extra": "mean: 339.99676709318527 usec\nrounds: 2735"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1722.8281669200749,
            "unit": "iter/sec",
            "range": "stddev: 0.00003961116410265488",
            "extra": "mean: 580.4409396136788 usec\nrounds: 1656"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 1038.8211663943785,
            "unit": "iter/sec",
            "range": "stddev: 0.00004309889368523404",
            "extra": "mean: 962.6295962671593 usec\nrounds: 1018"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 555.9848795984284,
            "unit": "iter/sec",
            "range": "stddev: 0.00004332707235937389",
            "extra": "mean: 1.798610064220219 msec\nrounds: 545"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4524.332697622581,
            "unit": "iter/sec",
            "range": "stddev: 0.000014067646391216776",
            "extra": "mean: 221.02707003078575 usec\nrounds: 3627"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 2490.5560650717803,
            "unit": "iter/sec",
            "range": "stddev: 0.00001703927312986181",
            "extra": "mean: 401.51675925881193 usec\nrounds: 2268"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1289.882860162225,
            "unit": "iter/sec",
            "range": "stddev: 0.00003467378316177404",
            "extra": "mean: 775.2641971490596 usec\nrounds: 1263"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 541.2559856044198,
            "unit": "iter/sec",
            "range": "stddev: 0.00003930433122284881",
            "extra": "mean: 1.8475546259009061 msec\nrounds: 556"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 262.5426768779354,
            "unit": "iter/sec",
            "range": "stddev: 0.000029713614897925232",
            "extra": "mean: 3.808904563218621 msec\nrounds: 261"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 3543.5971141351365,
            "unit": "iter/sec",
            "range": "stddev: 0.00001536151291751643",
            "extra": "mean: 282.1991235998802 usec\nrounds: 2945"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1899.8060625537598,
            "unit": "iter/sec",
            "range": "stddev: 0.00004642952624793701",
            "extra": "mean: 526.3695172420803 usec\nrounds: 1856"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 999.7102731842002,
            "unit": "iter/sec",
            "range": "stddev: 0.000040621653963256516",
            "extra": "mean: 1.0002898107817548 msec\nrounds: 983"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 393.6117502159295,
            "unit": "iter/sec",
            "range": "stddev: 0.00008175029678337021",
            "extra": "mean: 2.5405745622467193 msec\nrounds: 249"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 203.0330235631881,
            "unit": "iter/sec",
            "range": "stddev: 0.0001627983943529888",
            "extra": "mean: 4.925307136987887 msec\nrounds: 219"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1113.4195549234732,
            "unit": "iter/sec",
            "range": "stddev: 0.000020813896582069423",
            "extra": "mean: 898.1340372351654 usec\nrounds: 564"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 850.3238648180076,
            "unit": "iter/sec",
            "range": "stddev: 0.000041690562435775676",
            "extra": "mean: 1.1760225031600486 msec\nrounds: 791"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 584.7681276144483,
            "unit": "iter/sec",
            "range": "stddev: 0.000028744744397705262",
            "extra": "mean: 1.7100795217404943 msec\nrounds: 552"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1094.3103425987133,
            "unit": "iter/sec",
            "range": "stddev: 0.000021203127464865374",
            "extra": "mean: 913.817553460429 usec\nrounds: 954"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 814.3749556438036,
            "unit": "iter/sec",
            "range": "stddev: 0.0000277521269383408",
            "extra": "mean: 1.2279356002659128 msec\nrounds: 753"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 535.4204145917985,
            "unit": "iter/sec",
            "range": "stddev: 0.0000291544095797541",
            "extra": "mean: 1.8676912062876692 msec\nrounds: 509"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 704.4842925750293,
            "unit": "iter/sec",
            "range": "stddev: 0.00007022496833769425",
            "extra": "mean: 1.4194780643650726 msec\nrounds: 637"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 493.68862165910366,
            "unit": "iter/sec",
            "range": "stddev: 0.00019440038539998293",
            "extra": "mean: 2.025568255228108 msec\nrounds: 478"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 311.05026503524346,
            "unit": "iter/sec",
            "range": "stddev: 0.00003639993832350846",
            "extra": "mean: 3.2149144765611926 msec\nrounds: 256"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 7.625430767890683,
            "unit": "iter/sec",
            "range": "stddev: 0.0001008996482022338",
            "extra": "mean: 131.14013233335223 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.2545123290686204,
            "unit": "iter/sec",
            "range": "stddev: 0.0007365902518704996",
            "extra": "mean: 307.26569725000275 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.2697848704314698,
            "unit": "iter/sec",
            "range": "stddev: 0.0010628779275421885",
            "extra": "mean: 787.5349780000155 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 909.6116870482864,
            "unit": "iter/sec",
            "range": "stddev: 0.000019211192317384304",
            "extra": "mean: 1.0993702194449877 msec\nrounds: 720"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 659.2852783394011,
            "unit": "iter/sec",
            "range": "stddev: 0.00003689754636610418",
            "extra": "mean: 1.5167940690542743 msec\nrounds: 391"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 405.56314422711455,
            "unit": "iter/sec",
            "range": "stddev: 0.00010463320523628432",
            "extra": "mean: 2.4657072868534673 msec\nrounds: 251"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 812.272854826023,
            "unit": "iter/sec",
            "range": "stddev: 0.00001922868989732512",
            "extra": "mean: 1.2311134048843542 msec\nrounds: 778"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 378.3354587008436,
            "unit": "iter/sec",
            "range": "stddev: 0.000035159784201350334",
            "extra": "mean: 2.6431569576742135 msec\nrounds: 378"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 307.8754823047096,
            "unit": "iter/sec",
            "range": "stddev: 0.000032878934691726205",
            "extra": "mean: 3.248066369280692 msec\nrounds: 306"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 294.32527754935666,
            "unit": "iter/sec",
            "range": "stddev: 0.00006587482148218722",
            "extra": "mean: 3.3976014847460925 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 145.53696299105235,
            "unit": "iter/sec",
            "range": "stddev: 0.000044086126684934025",
            "extra": "mean: 6.8711066896557424 msec\nrounds: 145"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 113.81264810604573,
            "unit": "iter/sec",
            "range": "stddev: 0.0000553753570663318",
            "extra": "mean: 8.786369675435747 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 396.68991899449935,
            "unit": "iter/sec",
            "range": "stddev: 0.000047328393783125667",
            "extra": "mean: 2.520860632240736 msec\nrounds: 397"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 178.19862527881972,
            "unit": "iter/sec",
            "range": "stddev: 0.00016336651499413097",
            "extra": "mean: 5.611715569833062 msec\nrounds: 179"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 146.54963142040378,
            "unit": "iter/sec",
            "range": "stddev: 0.00012973874215601192",
            "extra": "mean: 6.82362685124278 msec\nrounds: 121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 144.4425661003908,
            "unit": "iter/sec",
            "range": "stddev: 0.00006247575380683657",
            "extra": "mean: 6.923166951388676 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 69.40156906870516,
            "unit": "iter/sec",
            "range": "stddev: 0.00006673216154748257",
            "extra": "mean: 14.40889613043236 msec\nrounds: 69"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 52.97945074761186,
            "unit": "iter/sec",
            "range": "stddev: 0.00033081172057443744",
            "extra": "mean: 18.87524287037039 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 413.3522600755992,
            "unit": "iter/sec",
            "range": "stddev: 0.000029379315836114455",
            "extra": "mean: 2.4192440603012724 msec\nrounds: 398"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 301.88152274264263,
            "unit": "iter/sec",
            "range": "stddev: 0.00004039678303578125",
            "extra": "mean: 3.3125578237277913 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 84.89358639882776,
            "unit": "iter/sec",
            "range": "stddev: 0.0009632911657422767",
            "extra": "mean: 11.779452870585855 msec\nrounds: 85"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 208.24992742631244,
            "unit": "iter/sec",
            "range": "stddev: 0.00003352130998574817",
            "extra": "mean: 4.801922441744149 msec\nrounds: 206"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 151.85822839765302,
            "unit": "iter/sec",
            "range": "stddev: 0.00007233346001483487",
            "extra": "mean: 6.585089333331477 msec\nrounds: 150"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 35.10216944499594,
            "unit": "iter/sec",
            "range": "stddev: 0.000763909368599144",
            "extra": "mean: 28.488267700005565 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 102.61960828741756,
            "unit": "iter/sec",
            "range": "stddev: 0.00007473905774966027",
            "extra": "mean: 9.744726341180279 msec\nrounds: 85"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 74.86603078563998,
            "unit": "iter/sec",
            "range": "stddev: 0.00011102595439556915",
            "extra": "mean: 13.357192701496999 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 17.820502295627335,
            "unit": "iter/sec",
            "range": "stddev: 0.0007182766411571909",
            "extra": "mean: 56.115141055556705 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 49.431436618567716,
            "unit": "iter/sec",
            "range": "stddev: 0.00018849933221711242",
            "extra": "mean: 20.230041212768928 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 27.297981022722357,
            "unit": "iter/sec",
            "range": "stddev: 0.0004382806623537149",
            "extra": "mean: 36.63274581250597 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 8.695001661774482,
            "unit": "iter/sec",
            "range": "stddev: 0.002374263378213791",
            "extra": "mean: 115.00860366666326 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 23.382681176424708,
            "unit": "iter/sec",
            "range": "stddev: 0.0004496219481802115",
            "extra": "mean: 42.766695249997134 msec\nrounds: 24"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 16.598531544718576,
            "unit": "iter/sec",
            "range": "stddev: 0.0005351229755460594",
            "extra": "mean: 60.24629331250608 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1365.9284749897931,
            "unit": "iter/sec",
            "range": "stddev: 0.000019573135104616067",
            "extra": "mean: 732.1027552394152 usec\nrounds: 1193"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 470.7806948728509,
            "unit": "iter/sec",
            "range": "stddev: 0.000031700590769085254",
            "extra": "mean: 2.124131280000938 msec\nrounds: 450"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 142.7058393118434,
            "unit": "iter/sec",
            "range": "stddev: 0.00007549846514389953",
            "extra": "mean: 7.007421734262617 msec\nrounds: 143"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 39.234151327795026,
            "unit": "iter/sec",
            "range": "stddev: 0.0002609103870424081",
            "extra": "mean: 25.487998749996166 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 10.457739130102125,
            "unit": "iter/sec",
            "range": "stddev: 0.001014022457333177",
            "extra": "mean: 95.62296281818176 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 311.7955432153669,
            "unit": "iter/sec",
            "range": "stddev: 0.00016474929162937953",
            "extra": "mean: 3.207229935641732 msec\nrounds: 202"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 276.7069095121492,
            "unit": "iter/sec",
            "range": "stddev: 0.00003689989044314451",
            "extra": "mean: 3.6139321629628247 msec\nrounds: 270"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 153.0134385513496,
            "unit": "iter/sec",
            "range": "stddev: 0.0002953512580018925",
            "extra": "mean: 6.53537368656944 msec\nrounds: 134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 152.86505515707293,
            "unit": "iter/sec",
            "range": "stddev: 0.00006758233815736568",
            "extra": "mean: 6.541717457743846 msec\nrounds: 142"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.43640323695811173,
            "unit": "iter/sec",
            "range": "stddev: 0.012678112172658447",
            "extra": "mean: 2.291458713666657 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_25",
            "value": 74.30970611810413,
            "unit": "iter/sec",
            "range": "stddev: 0.00009903312355311446",
            "extra": "mean: 13.45719223287803 msec\nrounds: 73"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_50",
            "value": 35.19095876701831,
            "unit": "iter/sec",
            "range": "stddev: 0.00016433262890852056",
            "extra": "mean: 28.416389750006488 msec\nrounds: 36"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_100",
            "value": 16.23174890575798,
            "unit": "iter/sec",
            "range": "stddev: 0.003926818248177853",
            "extra": "mean: 61.607655823536334 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_200",
            "value": 7.608637112188166,
            "unit": "iter/sec",
            "range": "stddev: 0.0004234731552894239",
            "extra": "mean: 131.42958262500315 msec\nrounds: 8"
          }
        ]
      }
    ]
  }
}