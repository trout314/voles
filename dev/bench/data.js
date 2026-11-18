window.BENCHMARK_DATA = {
  "lastUpdate": 1795012518738,
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
          "id": "78451d36cd1c00e293fb60335bcc890391f17290",
          "message": "Merge pull request #12 from trout314/docs/non-finite-kernel-contract\n\nCorrect the contract on non-finite callable kernels",
          "timestamp": "2026-11-18T09:28:44-05:00",
          "tree_id": "dd23f8aa060bcedda41d8ce6ecd1f75d1d0f36ea",
          "url": "https://github.com/trout314/voles/commit/78451d36cd1c00e293fb60335bcc890391f17290"
        },
        "date": 1795012517873,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 5443.605619927779,
            "unit": "iter/sec",
            "range": "stddev: 0.000020538883074182543",
            "extra": "mean: 183.70177228475768 usec\nrounds: 3904"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3659.35392368857,
            "unit": "iter/sec",
            "range": "stddev: 0.000355535116615743",
            "extra": "mean: 273.27228271815153 usec\nrounds: 3576"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2238.5441628753847,
            "unit": "iter/sec",
            "range": "stddev: 0.000025764859665526352",
            "extra": "mean: 446.7189062356988 usec\nrounds: 2197"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1165.0740847902018,
            "unit": "iter/sec",
            "range": "stddev: 0.0001246440363928261",
            "extra": "mean: 858.3145166945094 usec\nrounds: 1198"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 615.9447339492149,
            "unit": "iter/sec",
            "range": "stddev: 0.00008543161538956987",
            "extra": "mean: 1.6235222819235124 msec\nrounds: 603"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 5577.923177806463,
            "unit": "iter/sec",
            "range": "stddev: 0.000022044950648951395",
            "extra": "mean: 179.27819514955266 usec\nrounds: 4412"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 4415.043498558896,
            "unit": "iter/sec",
            "range": "stddev: 0.00002188442251056324",
            "extra": "mean: 226.49833468830093 usec\nrounds: 3690"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3110.5619367745207,
            "unit": "iter/sec",
            "range": "stddev: 0.00002363494396699927",
            "extra": "mean: 321.4853201209503 usec\nrounds: 2977"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2043.358600112185,
            "unit": "iter/sec",
            "range": "stddev: 0.00005100851996613931",
            "extra": "mean: 489.3903595507405 usec\nrounds: 1958"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1189.5199426603879,
            "unit": "iter/sec",
            "range": "stddev: 0.00003672532233119328",
            "extra": "mean: 840.675270868917 usec\nrounds: 1174"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 5333.252345888248,
            "unit": "iter/sec",
            "range": "stddev: 0.000019878338487765176",
            "extra": "mean: 187.50284725810232 usec\nrounds: 4249"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 4166.42650538714,
            "unit": "iter/sec",
            "range": "stddev: 0.00002692066795702694",
            "extra": "mean: 240.01383408707963 usec\nrounds: 3538"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 2971.777659484566,
            "unit": "iter/sec",
            "range": "stddev: 0.00002697887384108982",
            "extra": "mean: 336.49892912023677 usec\nrounds: 2864"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1993.81070432944,
            "unit": "iter/sec",
            "range": "stddev: 0.000027959558084835707",
            "extra": "mean: 501.55212720473423 usec\nrounds: 1871"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1146.9992704457761,
            "unit": "iter/sec",
            "range": "stddev: 0.0000522064056947495",
            "extra": "mean: 871.840136054624 usec\nrounds: 735"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 4482.465442390751,
            "unit": "iter/sec",
            "range": "stddev: 0.000025067372751717",
            "extra": "mean: 223.09151355479133 usec\nrounds: 3947"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3053.115981149334,
            "unit": "iter/sec",
            "range": "stddev: 0.000027755077274013605",
            "extra": "mean: 327.5342326247147 usec\nrounds: 2777"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1823.9501400653883,
            "unit": "iter/sec",
            "range": "stddev: 0.000028845145190478752",
            "extra": "mean: 548.26060100752 usec\nrounds: 1787"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 978.7692268798744,
            "unit": "iter/sec",
            "range": "stddev: 0.00006687318176407286",
            "extra": "mean: 1.0216912961064428 msec\nrounds: 976"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 483.3478660255343,
            "unit": "iter/sec",
            "range": "stddev: 0.00022648897886411967",
            "extra": "mean: 2.0689033102034466 msec\nrounds: 490"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 2976.065753533084,
            "unit": "iter/sec",
            "range": "stddev: 0.000027230597752467517",
            "extra": "mean: 336.01408127923054 usec\nrounds: 2596"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2112.7794289733006,
            "unit": "iter/sec",
            "range": "stddev: 0.00003479354480281424",
            "extra": "mean: 473.31017440185286 usec\nrounds: 2047"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1326.6514024545224,
            "unit": "iter/sec",
            "range": "stddev: 0.000048816120010828953",
            "extra": "mean: 753.7775169496947 usec\nrounds: 1298"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 822.7933689002704,
            "unit": "iter/sec",
            "range": "stddev: 0.00006870726180288976",
            "extra": "mean: 1.21537197284001 msec\nrounds: 810"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 447.8135738185597,
            "unit": "iter/sec",
            "range": "stddev: 0.00013248076121911433",
            "extra": "mean: 2.2330721051460785 msec\nrounds: 447"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 2774.345690642284,
            "unit": "iter/sec",
            "range": "stddev: 0.000057297969465861475",
            "extra": "mean: 360.4453487440103 usec\nrounds: 2747"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2043.0993878478475,
            "unit": "iter/sec",
            "range": "stddev: 0.0000332921912638993",
            "extra": "mean: 489.4524495224759 usec\nrounds: 1882"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1288.2676471911427,
            "unit": "iter/sec",
            "range": "stddev: 0.000034550485656876334",
            "extra": "mean: 776.2362131660581 usec\nrounds: 1276"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 799.9527003157623,
            "unit": "iter/sec",
            "range": "stddev: 0.00003905242255880511",
            "extra": "mean: 1.2500739101265286 msec\nrounds: 790"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 435.95222296630305,
            "unit": "iter/sec",
            "range": "stddev: 0.00005104004001754857",
            "extra": "mean: 2.2938293402790957 msec\nrounds: 432"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2953.2011056844563,
            "unit": "iter/sec",
            "range": "stddev: 0.00005166941646623896",
            "extra": "mean: 338.6156120811259 usec\nrounds: 2864"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1799.5408750671493,
            "unit": "iter/sec",
            "range": "stddev: 0.000026902217765742848",
            "extra": "mean: 555.6972969356339 usec\nrounds: 1795"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 961.3672228360289,
            "unit": "iter/sec",
            "range": "stddev: 0.0000655006255713633",
            "extra": "mean: 1.0401852447704683 msec\nrounds: 956"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 489.3964363389417,
            "unit": "iter/sec",
            "range": "stddev: 0.000036341317073221957",
            "extra": "mean: 2.043333227926141 msec\nrounds: 487"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 209.13176160748833,
            "unit": "iter/sec",
            "range": "stddev: 0.00006272921276154928",
            "extra": "mean: 4.781674444443608 msec\nrounds: 216"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2424.988412572127,
            "unit": "iter/sec",
            "range": "stddev: 0.000030591114443357134",
            "extra": "mean: 412.37310447158967 usec\nrounds: 2326"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1411.8158289909954,
            "unit": "iter/sec",
            "range": "stddev: 0.000040898003207992154",
            "extra": "mean: 708.3076839524357 usec\nrounds: 1427"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 754.5964957932476,
            "unit": "iter/sec",
            "range": "stddev: 0.00003527590674248184",
            "extra": "mean: 1.3252115608472037 msec\nrounds: 756"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 381.11079732090633,
            "unit": "iter/sec",
            "range": "stddev: 0.00004324263563088498",
            "extra": "mean: 2.6239088659510506 msec\nrounds: 373"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 155.15250086941646,
            "unit": "iter/sec",
            "range": "stddev: 0.00041796018512700963",
            "extra": "mean: 6.4452715515146375 msec\nrounds: 165"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 745.3209379889227,
            "unit": "iter/sec",
            "range": "stddev: 0.000033364996441087914",
            "extra": "mean: 1.3417038875873666 msec\nrounds: 427"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 583.5503276035902,
            "unit": "iter/sec",
            "range": "stddev: 0.00009859701659193111",
            "extra": "mean: 1.713648253967406 msec\nrounds: 567"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 406.6078612915957,
            "unit": "iter/sec",
            "range": "stddev: 0.00007214754991484291",
            "extra": "mean: 2.459372026953649 msec\nrounds: 371"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 744.0182951098828,
            "unit": "iter/sec",
            "range": "stddev: 0.00009384948937602864",
            "extra": "mean: 1.3440529709720532 msec\nrounds: 689"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 569.8069343045668,
            "unit": "iter/sec",
            "range": "stddev: 0.00004612321315697811",
            "extra": "mean: 1.7549803973875322 msec\nrounds: 536"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 380.7684403559134,
            "unit": "iter/sec",
            "range": "stddev: 0.000056282072656744933",
            "extra": "mean: 2.6262680779564507 msec\nrounds: 372"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 494.0545136876737,
            "unit": "iter/sec",
            "range": "stddev: 0.00005694731796683142",
            "extra": "mean: 2.02406813882925 msec\nrounds: 461"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 334.50087778270074,
            "unit": "iter/sec",
            "range": "stddev: 0.0004910476382815608",
            "extra": "mean: 2.98952877681123 msec\nrounds: 345"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 223.66120951429681,
            "unit": "iter/sec",
            "range": "stddev: 0.00007926509523686457",
            "extra": "mean: 4.471047984456502 msec\nrounds: 193"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.371931968113307,
            "unit": "iter/sec",
            "range": "stddev: 0.00030684894862425177",
            "extra": "mean: 186.1527669999911 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.2152255864527346,
            "unit": "iter/sec",
            "range": "stddev: 0.012466207437915466",
            "extra": "mean: 451.4212936666695 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.844151046691968,
            "unit": "iter/sec",
            "range": "stddev: 0.0006818318812430159",
            "extra": "mean: 1.184622116999994 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 624.5197402415868,
            "unit": "iter/sec",
            "range": "stddev: 0.000054364280996896626",
            "extra": "mean: 1.6012304104481372 msec\nrounds: 536"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 463.0612947765257,
            "unit": "iter/sec",
            "range": "stddev: 0.00006969393963403254",
            "extra": "mean: 2.159541320512659 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 290.91039799602305,
            "unit": "iter/sec",
            "range": "stddev: 0.0002594723555370362",
            "extra": "mean: 3.4374845549992017 msec\nrounds: 200"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 624.8183848084924,
            "unit": "iter/sec",
            "range": "stddev: 0.00004880307440182755",
            "extra": "mean: 1.6004650700323124 msec\nrounds: 614"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 298.6458395466816,
            "unit": "iter/sec",
            "range": "stddev: 0.000052270433222219416",
            "extra": "mean: 3.348447785235894 msec\nrounds: 298"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 239.62375115762148,
            "unit": "iter/sec",
            "range": "stddev: 0.00006356815151330507",
            "extra": "mean: 4.17320902109663 msec\nrounds: 237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 227.49963382601229,
            "unit": "iter/sec",
            "range": "stddev: 0.0000988658404611713",
            "extra": "mean: 4.395611470587168 msec\nrounds: 221"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 109.5066500924809,
            "unit": "iter/sec",
            "range": "stddev: 0.00019197263986673433",
            "extra": "mean: 9.131865499999105 msec\nrounds: 110"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 84.6996878590554,
            "unit": "iter/sec",
            "range": "stddev: 0.0001257902233877372",
            "extra": "mean: 11.806418952382103 msec\nrounds: 84"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 310.1795448431719,
            "unit": "iter/sec",
            "range": "stddev: 0.00010253581120518682",
            "extra": "mean: 3.2239392204460295 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 139.8029368558616,
            "unit": "iter/sec",
            "range": "stddev: 0.0001393832725681093",
            "extra": "mean: 7.152925557143419 msec\nrounds: 140"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 113.44748008598461,
            "unit": "iter/sec",
            "range": "stddev: 0.00011590892135220205",
            "extra": "mean: 8.81465149549444 msec\nrounds: 111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 111.29090439855433,
            "unit": "iter/sec",
            "range": "stddev: 0.00028663344931651884",
            "extra": "mean: 8.985460271028133 msec\nrounds: 107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 52.29479351832335,
            "unit": "iter/sec",
            "range": "stddev: 0.0002544476318135283",
            "extra": "mean: 19.12236252830053 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 40.77740345369723,
            "unit": "iter/sec",
            "range": "stddev: 0.0008175036892805388",
            "extra": "mean: 24.523385878051325 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 324.0835766523926,
            "unit": "iter/sec",
            "range": "stddev: 0.00005751670139204433",
            "extra": "mean: 3.0856238083072802 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 237.32077303113445,
            "unit": "iter/sec",
            "range": "stddev: 0.00024276137054024416",
            "extra": "mean: 4.213706146443441 msec\nrounds: 239"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 69.2123244472221,
            "unit": "iter/sec",
            "range": "stddev: 0.00016414494376792822",
            "extra": "mean: 14.448293826088022 msec\nrounds: 69"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 163.19129104546852,
            "unit": "iter/sec",
            "range": "stddev: 0.0000865702055430151",
            "extra": "mean: 6.127777981248883 msec\nrounds: 160"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 119.46819818738365,
            "unit": "iter/sec",
            "range": "stddev: 0.00012350184628396208",
            "extra": "mean: 8.370428408332723 msec\nrounds: 120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 27.59607925730927,
            "unit": "iter/sec",
            "range": "stddev: 0.00034445995718050524",
            "extra": "mean: 36.23703174193246 msec\nrounds: 31"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 79.91440972988018,
            "unit": "iter/sec",
            "range": "stddev: 0.0001547949426102458",
            "extra": "mean: 12.51338780302719 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 57.66117967267593,
            "unit": "iter/sec",
            "range": "stddev: 0.0008046882032483489",
            "extra": "mean: 17.342690622645602 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.244561138106068,
            "unit": "iter/sec",
            "range": "stddev: 0.001649109645619527",
            "extra": "mean: 70.20223299999527 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 37.21642999647211,
            "unit": "iter/sec",
            "range": "stddev: 0.0006824234938734034",
            "extra": "mean: 26.869852914285275 msec\nrounds: 35"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 21.650808615612718,
            "unit": "iter/sec",
            "range": "stddev: 0.0004811783141405955",
            "extra": "mean: 46.18765135999979 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.962224065290828,
            "unit": "iter/sec",
            "range": "stddev: 0.0037901875850412806",
            "extra": "mean: 143.63226328571596 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 17.902509361021348,
            "unit": "iter/sec",
            "range": "stddev: 0.0004318850969740549",
            "extra": "mean: 55.85809116666477 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.224321561456176,
            "unit": "iter/sec",
            "range": "stddev: 0.0005044222041317504",
            "extra": "mean: 75.61824592307377 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 953.1468054213467,
            "unit": "iter/sec",
            "range": "stddev: 0.00002040397647975295",
            "extra": "mean: 1.0491563254602123 msec\nrounds: 762"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 326.2547536226001,
            "unit": "iter/sec",
            "range": "stddev: 0.0002472977022321574",
            "extra": "mean: 3.065089439759595 msec\nrounds: 332"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 98.45156210119768,
            "unit": "iter/sec",
            "range": "stddev: 0.00021316236802371857",
            "extra": "mean: 10.157279160000598 msec\nrounds: 100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.318258036877054,
            "unit": "iter/sec",
            "range": "stddev: 0.00028397125867799113",
            "extra": "mean: 36.60555510714098 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.248329166125501,
            "unit": "iter/sec",
            "range": "stddev: 0.0009059745241196743",
            "extra": "mean: 137.96282937499882 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 214.06390333539537,
            "unit": "iter/sec",
            "range": "stddev: 0.0001606850683181532",
            "extra": "mean: 4.6715022216202415 msec\nrounds: 185"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 196.94807060645553,
            "unit": "iter/sec",
            "range": "stddev: 0.00012764011626432216",
            "extra": "mean: 5.077480560843951 msec\nrounds: 189"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 117.6895486145333,
            "unit": "iter/sec",
            "range": "stddev: 0.0006173426340335416",
            "extra": "mean: 8.49693122093011 msec\nrounds: 86"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 109.91181157230284,
            "unit": "iter/sec",
            "range": "stddev: 0.00025788564080136977",
            "extra": "mean: 9.098203238531594 msec\nrounds: 109"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.2838488116976907,
            "unit": "iter/sec",
            "range": "stddev: 0.013303262417959599",
            "extra": "mean: 3.523002241999999 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_25",
            "value": 46.92666332340509,
            "unit": "iter/sec",
            "range": "stddev: 0.00042453484577412837",
            "extra": "mean: 21.30984666666554 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_50",
            "value": 22.07626220976131,
            "unit": "iter/sec",
            "range": "stddev: 0.0005024644829938724",
            "extra": "mean: 45.29752321739668 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_100",
            "value": 10.451456795117943,
            "unit": "iter/sec",
            "range": "stddev: 0.0006385523651604261",
            "extra": "mean: 95.68044145454606 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_200",
            "value": 4.753390818743966,
            "unit": "iter/sec",
            "range": "stddev: 0.0008789039278949204",
            "extra": "mean: 210.37613740000438 msec\nrounds: 5"
          }
        ]
      }
    ]
  }
}