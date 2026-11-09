window.BENCHMARK_DATA = {
  "lastUpdate": 1794257702593,
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
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "774c0fb25ba27955ce4546007ca9379e6fce5c1c",
          "message": "Merge pull request #9 from trout314/test/tight-tolerances\n\nFix two solver bugs and overhaul the test suite",
          "timestamp": "2026-11-09T15:47:20-05:00",
          "tree_id": "9560f38d0d84ecd954f91b045538ee49a23a1091",
          "url": "https://github.com/trout314/voles/commit/774c0fb25ba27955ce4546007ca9379e6fce5c1c"
        },
        "date": 1794257700880,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 5487.310652096579,
            "unit": "iter/sec",
            "range": "stddev: 0.000017118193581346964",
            "extra": "mean: 182.23863444252464 usec\nrounds: 4117"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3692.5134061461936,
            "unit": "iter/sec",
            "range": "stddev: 0.00029186628028594246",
            "extra": "mean: 270.81824492106074 usec\nrounds: 3544"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2243.9111094462783,
            "unit": "iter/sec",
            "range": "stddev: 0.000022388700226878027",
            "extra": "mean: 445.6504519231006 usec\nrounds: 2080"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1216.5069615143775,
            "unit": "iter/sec",
            "range": "stddev: 0.0000353226117029234",
            "extra": "mean: 822.0257110202992 usec\nrounds: 1225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 620.3673382218585,
            "unit": "iter/sec",
            "range": "stddev: 0.00003191811520628113",
            "extra": "mean: 1.6119481771336834 msec\nrounds: 621"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 5650.898334546784,
            "unit": "iter/sec",
            "range": "stddev: 0.00001932649736232678",
            "extra": "mean: 176.96301380729096 usec\nrounds: 3911"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 4415.623049816073,
            "unit": "iter/sec",
            "range": "stddev: 0.000020329541289688342",
            "extra": "mean: 226.46860674433103 usec\nrounds: 4033"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3104.54540666899,
            "unit": "iter/sec",
            "range": "stddev: 0.000021750814418837935",
            "extra": "mean: 322.10835050177155 usec\nrounds: 2990"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2074.2731748164138,
            "unit": "iter/sec",
            "range": "stddev: 0.000027759004414283463",
            "extra": "mean: 482.0965782814534 usec\nrounds: 1897"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1195.0981610973229,
            "unit": "iter/sec",
            "range": "stddev: 0.00004434224923938396",
            "extra": "mean: 836.7513502671726 usec\nrounds: 1122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 5415.352535203957,
            "unit": "iter/sec",
            "range": "stddev: 0.00001773859699340369",
            "extra": "mean: 184.66018481700513 usec\nrounds: 4729"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 4235.963238590195,
            "unit": "iter/sec",
            "range": "stddev: 0.00002159533531179521",
            "extra": "mean: 236.07381454349402 usec\nrounds: 3548"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3001.3205874983228,
            "unit": "iter/sec",
            "range": "stddev: 0.000024230197759233783",
            "extra": "mean: 333.1866659514456 usec\nrounds: 2796"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2003.4753544467699,
            "unit": "iter/sec",
            "range": "stddev: 0.00002659397750683976",
            "extra": "mean: 499.13266853044723 usec\nrounds: 1967"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1161.3462262817272,
            "unit": "iter/sec",
            "range": "stddev: 0.000023214027617608577",
            "extra": "mean: 861.0696598220255 usec\nrounds: 1120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 4538.542334848967,
            "unit": "iter/sec",
            "range": "stddev: 0.00001904814674343566",
            "extra": "mean: 220.33506051525637 usec\nrounds: 3999"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3077.6102611027336,
            "unit": "iter/sec",
            "range": "stddev: 0.00002443980729479812",
            "extra": "mean: 324.92743237790336 usec\nrounds: 2965"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1814.689503144076,
            "unit": "iter/sec",
            "range": "stddev: 0.000050362173973748226",
            "extra": "mean: 551.0584583574381 usec\nrounds: 1741"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 992.9894559763117,
            "unit": "iter/sec",
            "range": "stddev: 0.00002455293092647862",
            "extra": "mean: 1.0070600387360564 msec\nrounds: 981"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 501.73024742520465,
            "unit": "iter/sec",
            "range": "stddev: 0.00003790536158276998",
            "extra": "mean: 1.9931028777551925 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3041.408583817375,
            "unit": "iter/sec",
            "range": "stddev: 0.00002094064221154907",
            "extra": "mean: 328.7950212677003 usec\nrounds: 2351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2151.1963178173824,
            "unit": "iter/sec",
            "range": "stddev: 0.000023081555702249165",
            "extra": "mean: 464.85761978925586 usec\nrounds: 1991"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1334.992404313896,
            "unit": "iter/sec",
            "range": "stddev: 0.00003397473972929853",
            "extra": "mean: 749.0679323482283 usec\nrounds: 1286"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 788.033423927686,
            "unit": "iter/sec",
            "range": "stddev: 0.0001846252667416623",
            "extra": "mean: 1.2689817076740708 msec\nrounds: 821"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 453.56167862565763,
            "unit": "iter/sec",
            "range": "stddev: 0.000044447018638776",
            "extra": "mean: 2.2047718030987786 msec\nrounds: 452"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 2965.7826970863425,
            "unit": "iter/sec",
            "range": "stddev: 0.0000217461574582484",
            "extra": "mean: 337.17912002872777 usec\nrounds: 2766"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2094.9133821360897,
            "unit": "iter/sec",
            "range": "stddev: 0.000020810986989341336",
            "extra": "mean: 477.3467048935191 usec\nrounds: 2023"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1308.6636882016353,
            "unit": "iter/sec",
            "range": "stddev: 0.000023049996267784188",
            "extra": "mean: 764.1382648694099 usec\nrounds: 1261"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 787.9205395698315,
            "unit": "iter/sec",
            "range": "stddev: 0.00013265923780394104",
            "extra": "mean: 1.2691635130440364 msec\nrounds: 805"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 440.6355989602055,
            "unit": "iter/sec",
            "range": "stddev: 0.00004324526416903501",
            "extra": "mean: 2.269448955916772 msec\nrounds: 431"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3091.2439701862877,
            "unit": "iter/sec",
            "range": "stddev: 0.000019318706781878324",
            "extra": "mean: 323.4943633192876 usec\nrounds: 2868"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1815.0818564985793,
            "unit": "iter/sec",
            "range": "stddev: 0.00002484568609311191",
            "extra": "mean: 550.9393399640226 usec\nrounds: 1659"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 968.4480005352467,
            "unit": "iter/sec",
            "range": "stddev: 0.000051769696094063594",
            "extra": "mean: 1.0325799624216427 msec\nrounds: 958"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 489.96755880616934,
            "unit": "iter/sec",
            "range": "stddev: 0.000028117575307104658",
            "extra": "mean: 2.0409514508196227 msec\nrounds: 488"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 205.04553956999527,
            "unit": "iter/sec",
            "range": "stddev: 0.00015584908193668162",
            "extra": "mean: 4.876965390698662 msec\nrounds: 215"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2451.473578517328,
            "unit": "iter/sec",
            "range": "stddev: 0.000026841380554756618",
            "extra": "mean: 407.91791874208513 usec\nrounds: 2289"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1424.1878441331266,
            "unit": "iter/sec",
            "range": "stddev: 0.00003435840477375044",
            "extra": "mean: 702.1545676853317 usec\nrounds: 1374"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 753.8279965140931,
            "unit": "iter/sec",
            "range": "stddev: 0.00009740338348391895",
            "extra": "mean: 1.3265625641715 msec\nrounds: 748"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 316.18915840384807,
            "unit": "iter/sec",
            "range": "stddev: 0.0000780834557862237",
            "extra": "mean: 3.162663783439293 msec\nrounds: 314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 158.2243339871484,
            "unit": "iter/sec",
            "range": "stddev: 0.00007327001795824463",
            "extra": "mean: 6.320140365269124 msec\nrounds: 167"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 757.5191237343676,
            "unit": "iter/sec",
            "range": "stddev: 0.000036980458118600904",
            "extra": "mean: 1.3200986861826884 msec\nrounds: 427"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 598.6709598725503,
            "unit": "iter/sec",
            "range": "stddev: 0.000033442719468443456",
            "extra": "mean: 1.6703666404879365 msec\nrounds: 573"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 417.2379740200144,
            "unit": "iter/sec",
            "range": "stddev: 0.00003419149235723367",
            "extra": "mean: 2.396713775510834 msec\nrounds: 392"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 758.0614934565596,
            "unit": "iter/sec",
            "range": "stddev: 0.00006125370004727154",
            "extra": "mean: 1.3191541961065254 msec\nrounds: 719"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 575.1026229885306,
            "unit": "iter/sec",
            "range": "stddev: 0.00004143862557771102",
            "extra": "mean: 1.7388200992780785 msec\nrounds: 554"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 384.8284818832223,
            "unit": "iter/sec",
            "range": "stddev: 0.0000433140254706269",
            "extra": "mean: 2.598560260161445 msec\nrounds: 369"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 499.89756586150787,
            "unit": "iter/sec",
            "range": "stddev: 0.00003511742493988963",
            "extra": "mean: 2.0004098205131906 msec\nrounds: 468"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 354.79783806794046,
            "unit": "iter/sec",
            "range": "stddev: 0.00009108078993925461",
            "extra": "mean: 2.8185064639782538 msec\nrounds: 347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 225.06827128232263,
            "unit": "iter/sec",
            "range": "stddev: 0.00006093500671642216",
            "extra": "mean: 4.443096284973964 msec\nrounds: 193"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.335151012169585,
            "unit": "iter/sec",
            "range": "stddev: 0.00091669759740528",
            "extra": "mean: 187.4361190000021 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.236884187824204,
            "unit": "iter/sec",
            "range": "stddev: 0.0016117275599333602",
            "extra": "mean: 447.050413000009 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8426624469427021,
            "unit": "iter/sec",
            "range": "stddev: 0.009077970328223956",
            "extra": "mean: 1.1867148033333403 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 638.5770129932625,
            "unit": "iter/sec",
            "range": "stddev: 0.000033565835766131535",
            "extra": "mean: 1.5659818309346984 msec\nrounds: 556"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 471.0048489528498,
            "unit": "iter/sec",
            "range": "stddev: 0.00011311780183717985",
            "extra": "mean: 2.123120392970956 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 292.657736111609,
            "unit": "iter/sec",
            "range": "stddev: 0.00019281321615955554",
            "extra": "mean: 3.416960758620221 msec\nrounds: 203"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 628.7927335643712,
            "unit": "iter/sec",
            "range": "stddev: 0.000037102424461882775",
            "extra": "mean: 1.5903491669367824 msec\nrounds: 617"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 297.6801265058617,
            "unit": "iter/sec",
            "range": "stddev: 0.0000519266684282083",
            "extra": "mean: 3.3593105852845992 msec\nrounds: 299"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 240.2743982874297,
            "unit": "iter/sec",
            "range": "stddev: 0.0001011217221572697",
            "extra": "mean: 4.161908247934696 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 227.54439344343527,
            "unit": "iter/sec",
            "range": "stddev: 0.00015205191718592297",
            "extra": "mean: 4.394746822222133 msec\nrounds: 225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 110.50235091927878,
            "unit": "iter/sec",
            "range": "stddev: 0.00012285915918529614",
            "extra": "mean: 9.049581223213009 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 86.45445191868728,
            "unit": "iter/sec",
            "range": "stddev: 0.000119963047823246",
            "extra": "mean: 11.566784333333427 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 312.6929641524289,
            "unit": "iter/sec",
            "range": "stddev: 0.00004837457150885529",
            "extra": "mean: 3.198025266448044 msec\nrounds: 304"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 140.35124341109037,
            "unit": "iter/sec",
            "range": "stddev: 0.0001231814800307319",
            "extra": "mean: 7.1249814087573755 msec\nrounds: 137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 114.6725498030374,
            "unit": "iter/sec",
            "range": "stddev: 0.00011091190961254902",
            "extra": "mean: 8.720482815788163 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 111.85502012236228,
            "unit": "iter/sec",
            "range": "stddev: 0.00011076666485641174",
            "extra": "mean: 8.940144116071533 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 52.28698265263192,
            "unit": "iter/sec",
            "range": "stddev: 0.0004625543992733554",
            "extra": "mean: 19.12521911320626 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 39.48013961595027,
            "unit": "iter/sec",
            "range": "stddev: 0.0003902234014717998",
            "extra": "mean: 25.329191074997937 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 325.4921007541557,
            "unit": "iter/sec",
            "range": "stddev: 0.00003296124363402502",
            "extra": "mean: 3.072271178572473 msec\nrounds: 308"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 240.46878188703556,
            "unit": "iter/sec",
            "range": "stddev: 0.00004490847201526511",
            "extra": "mean: 4.158543957983567 msec\nrounds: 238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 68.9737344195389,
            "unit": "iter/sec",
            "range": "stddev: 0.00011862842810691184",
            "extra": "mean: 14.49827254411673 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 162.23372191273077,
            "unit": "iter/sec",
            "range": "stddev: 0.00021961087867252904",
            "extra": "mean: 6.163946608695342 msec\nrounds: 161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 118.99383761062928,
            "unit": "iter/sec",
            "range": "stddev: 0.00022912618795819208",
            "extra": "mean: 8.403796533331349 msec\nrounds: 120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 27.52142316200253,
            "unit": "iter/sec",
            "range": "stddev: 0.0006101841163886558",
            "extra": "mean: 36.33533026666479 msec\nrounds: 30"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 79.9408248944828,
            "unit": "iter/sec",
            "range": "stddev: 0.00009374084760584205",
            "extra": "mean: 12.509252954544081 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 59.01342174599352,
            "unit": "iter/sec",
            "range": "stddev: 0.00015157742125248026",
            "extra": "mean: 16.945297703702312 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.442227475414386,
            "unit": "iter/sec",
            "range": "stddev: 0.0013118295368126592",
            "extra": "mean: 69.24139657143209 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 38.31986648944756,
            "unit": "iter/sec",
            "range": "stddev: 0.0001330437867188052",
            "extra": "mean: 26.09612432432085 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 21.9813844795103,
            "unit": "iter/sec",
            "range": "stddev: 0.00021519677192336986",
            "extra": "mean: 45.49303984615431 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.963455576232335,
            "unit": "iter/sec",
            "range": "stddev: 0.0033739952821418354",
            "extra": "mean: 143.60686142857 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 17.895961029942743,
            "unit": "iter/sec",
            "range": "stddev: 0.0008132200482635092",
            "extra": "mean: 55.87853026316069 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.45092608180097,
            "unit": "iter/sec",
            "range": "stddev: 0.0007167076709451165",
            "extra": "mean: 74.34432350000009 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 936.1120515581348,
            "unit": "iter/sec",
            "range": "stddev: 0.00006884556605634537",
            "extra": "mean: 1.0682481849641028 msec\nrounds: 838"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 322.1494767605335,
            "unit": "iter/sec",
            "range": "stddev: 0.00009047838587629843",
            "extra": "mean: 3.1041490740751376 msec\nrounds: 324"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 97.87424549266896,
            "unit": "iter/sec",
            "range": "stddev: 0.00008887017381552065",
            "extra": "mean: 10.217192428573078 msec\nrounds: 98"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 26.934847270041654,
            "unit": "iter/sec",
            "range": "stddev: 0.0009353668662851676",
            "extra": "mean: 37.126625964285765 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.158955518090639,
            "unit": "iter/sec",
            "range": "stddev: 0.001766716439985615",
            "extra": "mean: 139.6851813749933 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 223.1740728328945,
            "unit": "iter/sec",
            "range": "stddev: 0.00024289963261387104",
            "extra": "mean: 4.48080723404088 msec\nrounds: 188"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 199.42537353497104,
            "unit": "iter/sec",
            "range": "stddev: 0.0002335401920869425",
            "extra": "mean: 5.014407055001158 msec\nrounds: 200"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 124.38397148771462,
            "unit": "iter/sec",
            "range": "stddev: 0.00044490581425803757",
            "extra": "mean: 8.039621086538226 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 110.79751811427278,
            "unit": "iter/sec",
            "range": "stddev: 0.00038926936929457504",
            "extra": "mean: 9.025472925924516 msec\nrounds: 108"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.28768851838912013,
            "unit": "iter/sec",
            "range": "stddev: 0.0016408347735904817",
            "extra": "mean: 3.475981612333328 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_25",
            "value": 47.67601146620806,
            "unit": "iter/sec",
            "range": "stddev: 0.00021059193991438899",
            "extra": "mean: 20.974908958329763 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_50",
            "value": 22.39847585032881,
            "unit": "iter/sec",
            "range": "stddev: 0.0003160893289544965",
            "extra": "mean: 44.645894956523115 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_100",
            "value": 10.554925293246031,
            "unit": "iter/sec",
            "range": "stddev: 0.0003965969138364088",
            "extra": "mean: 94.74249909091141 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_200",
            "value": 4.807920415777991,
            "unit": "iter/sec",
            "range": "stddev: 0.0022880721136837034",
            "extra": "mean: 207.99013160000186 msec\nrounds: 5"
          }
        ]
      }
    ]
  }
}