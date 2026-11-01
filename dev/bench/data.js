window.BENCHMARK_DATA = {
  "lastUpdate": 1793503786194,
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
          "id": "97f6cf6af453279d82865e6762bc5a6ed8825b5e",
          "message": "1.0 API Phase 5: deprecate the 0.10 API\n\n- The six 0.10 solvers move to voles._legacy: exact 0.10 signatures and\n  docstrings plus a deprecation notice. Each call emits one\n  DeprecationWarning at the caller's line naming the equivalent 1.0 call\n  (built from the arguments actually passed), then calls the engine\n  directly, so values, return types and error messages are 0.10's.\n- Engine functions renamed: _sampled.vie1/vie2/vide and\n  _functional.vie1/vie2/vide.\n- fast_coll_settings_* warn via a module __getattr__ (out of __all__);\n  importing voles.solvers warns; optimal_graded_mesh takes t_end= and\n  n_intervals= (T=/M= still accepted, with a warning).\n- VolterraSolution drops its 0.10 compatibility aliases: the wrappers\n  return the unchanged 0.10 object, so D5's breakpoint exception never\n  arises.\n- _warn caches its package-file test: abspath() called getcwd() for\n  every frame with a relative filename (~30 us each).\n- pytest ignores exactly the four 0.10 deprecation messages until the\n  tests, docs and benchmarks move to the 1.0 API; test_legacy_shims.py\n  checks them directly.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-10-31T23:20:56-04:00",
          "tree_id": "5652f83a716d847af8a0b75a75ba083960a4aba5",
          "url": "https://github.com/trout314/voles/commit/97f6cf6af453279d82865e6762bc5a6ed8825b5e"
        },
        "date": 1793503785013,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 6349.247810726956,
            "unit": "iter/sec",
            "range": "stddev: 0.00002217835411326456",
            "extra": "mean: 157.49897150187073 usec\nrounds: 3895"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4151.669145612967,
            "unit": "iter/sec",
            "range": "stddev: 0.000021698864513247903",
            "extra": "mean: 240.8669778170284 usec\nrounds: 3967"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2293.7821609334,
            "unit": "iter/sec",
            "range": "stddev: 0.0004952294257387724",
            "extra": "mean: 435.9611897901733 usec\nrounds: 2292"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1261.6012993488084,
            "unit": "iter/sec",
            "range": "stddev: 0.000031117258751262015",
            "extra": "mean: 792.6434448951208 usec\nrounds: 1234"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 629.2812447342826,
            "unit": "iter/sec",
            "range": "stddev: 0.000029299870538444342",
            "extra": "mean: 1.5891145785256244 msec\nrounds: 624"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 6220.382210557026,
            "unit": "iter/sec",
            "range": "stddev: 0.00001789741188003587",
            "extra": "mean: 160.76182558409886 usec\nrounds: 4409"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 4820.195728646478,
            "unit": "iter/sec",
            "range": "stddev: 0.000019335224603939963",
            "extra": "mean: 207.46045519624622 usec\nrounds: 4330"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3331.6773443228717,
            "unit": "iter/sec",
            "range": "stddev: 0.000023068551262912607",
            "extra": "mean: 300.14911308983295 usec\nrounds: 3201"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2188.4246766937763,
            "unit": "iter/sec",
            "range": "stddev: 0.000022631263848512206",
            "extra": "mean: 456.94970023404136 usec\nrounds: 2135"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1241.6626305106972,
            "unit": "iter/sec",
            "range": "stddev: 0.000024440365956581343",
            "extra": "mean: 805.371745454479 usec\nrounds: 1210"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 5824.476639796196,
            "unit": "iter/sec",
            "range": "stddev: 0.000019352566862638783",
            "extra": "mean: 171.6892455482474 usec\nrounds: 5054"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 4534.926682937366,
            "unit": "iter/sec",
            "range": "stddev: 0.00002137860839747447",
            "extra": "mean: 220.51073146617645 usec\nrounds: 4249"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3179.869227642003,
            "unit": "iter/sec",
            "range": "stddev: 0.000021889296929679927",
            "extra": "mean: 314.4783412183082 usec\nrounds: 3086"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2050.796078728622,
            "unit": "iter/sec",
            "range": "stddev: 0.00002464345631716804",
            "extra": "mean: 487.6155217831037 usec\nrounds: 1974"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1186.854364602651,
            "unit": "iter/sec",
            "range": "stddev: 0.00002978552298065197",
            "extra": "mean: 842.5633589297131 usec\nrounds: 1159"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 5179.379497647419,
            "unit": "iter/sec",
            "range": "stddev: 0.000019398575885626156",
            "extra": "mean: 193.07332093626673 usec\nrounds: 4571"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3399.505031852362,
            "unit": "iter/sec",
            "range": "stddev: 0.000020444845197780263",
            "extra": "mean: 294.16047060683667 usec\nrounds: 3130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1970.4623742986312,
            "unit": "iter/sec",
            "range": "stddev: 0.000025773460471743836",
            "extra": "mean: 507.495100156856 usec\nrounds: 1917"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1039.3381958462053,
            "unit": "iter/sec",
            "range": "stddev: 0.000029290189107260083",
            "extra": "mean: 962.150726295422 usec\nrounds: 1023"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 516.8036596654697,
            "unit": "iter/sec",
            "range": "stddev: 0.00003511661291816997",
            "extra": "mean: 1.9349708178291662 msec\nrounds: 516"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3202.6763747838154,
            "unit": "iter/sec",
            "range": "stddev: 0.000023663090380025977",
            "extra": "mean: 312.2388536892059 usec\nrounds: 2440"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2131.932917835785,
            "unit": "iter/sec",
            "range": "stddev: 0.00007317105331893799",
            "extra": "mean: 469.0579106096557 usec\nrounds: 2215"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1381.7578781450968,
            "unit": "iter/sec",
            "range": "stddev: 0.00003606801694941414",
            "extra": "mean: 723.7157940741563 usec\nrounds: 1350"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 850.8386890647384,
            "unit": "iter/sec",
            "range": "stddev: 0.000028876059135376513",
            "extra": "mean: 1.1753109171601297 msec\nrounds: 845"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 459.4735651068655,
            "unit": "iter/sec",
            "range": "stddev: 0.000041975360925659765",
            "extra": "mean: 2.1764037714931814 msec\nrounds: 442"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 3088.0015455521516,
            "unit": "iter/sec",
            "range": "stddev: 0.000024692011084348127",
            "extra": "mean: 323.8340348114025 usec\nrounds: 2413"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2159.785443088153,
            "unit": "iter/sec",
            "range": "stddev: 0.00002448870433147201",
            "extra": "mean: 463.0089545238149 usec\nrounds: 2089"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1325.0539596083713,
            "unit": "iter/sec",
            "range": "stddev: 0.000048439145352040986",
            "extra": "mean: 754.6862471137076 usec\nrounds: 1299"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 810.399362195379,
            "unit": "iter/sec",
            "range": "stddev: 0.0001003289000835778",
            "extra": "mean: 1.233959510149405 msec\nrounds: 739"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 444.6046191553056,
            "unit": "iter/sec",
            "range": "stddev: 0.000034966351397868584",
            "extra": "mean: 2.2491894076581516 msec\nrounds: 444"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3390.467361674108,
            "unit": "iter/sec",
            "range": "stddev: 0.000020600684955219584",
            "extra": "mean: 294.9445882606081 usec\nrounds: 2334"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1918.5172905251502,
            "unit": "iter/sec",
            "range": "stddev: 0.000024791930496313424",
            "extra": "mean: 521.2358548649165 usec\nrounds: 1881"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1005.8595460339977,
            "unit": "iter/sec",
            "range": "stddev: 0.000025610631339291685",
            "extra": "mean: 994.1745882344097 usec\nrounds: 986"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 497.5391305106697,
            "unit": "iter/sec",
            "range": "stddev: 0.00006970954633760979",
            "extra": "mean: 2.0098921646094627 msec\nrounds: 486"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 238.9040819940395,
            "unit": "iter/sec",
            "range": "stddev: 0.00005138628308543437",
            "extra": "mean: 4.185780299999015 msec\nrounds: 220"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2643.8746903610927,
            "unit": "iter/sec",
            "range": "stddev: 0.000025786110969881464",
            "extra": "mean: 378.23275197033746 usec\nrounds: 2411"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1472.2466347719783,
            "unit": "iter/sec",
            "range": "stddev: 0.000025193680199609546",
            "extra": "mean: 679.2340198861314 usec\nrounds: 1408"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 779.5971991382528,
            "unit": "iter/sec",
            "range": "stddev: 0.000030494200039722122",
            "extra": "mean: 1.28271368997397 msec\nrounds: 758"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 387.29317036296067,
            "unit": "iter/sec",
            "range": "stddev: 0.00005493810562456855",
            "extra": "mean: 2.5820233263158943 msec\nrounds: 380"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 159.49121088556765,
            "unit": "iter/sec",
            "range": "stddev: 0.000060074479828441365",
            "extra": "mean: 6.269937976190322 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 851.7928907320279,
            "unit": "iter/sec",
            "range": "stddev: 0.000027853201549927497",
            "extra": "mean: 1.1739943017610812 msec\nrounds: 454"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 656.6596181431656,
            "unit": "iter/sec",
            "range": "stddev: 0.00003119618294495224",
            "extra": "mean: 1.5228589856457093 msec\nrounds: 627"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 443.61716277743386,
            "unit": "iter/sec",
            "range": "stddev: 0.00003615845622695603",
            "extra": "mean: 2.2541959236633673 msec\nrounds: 393"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 846.4394737097747,
            "unit": "iter/sec",
            "range": "stddev: 0.000027042872091273213",
            "extra": "mean: 1.1814193820819818 msec\nrounds: 759"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 624.1479733310623,
            "unit": "iter/sec",
            "range": "stddev: 0.000035696073030540394",
            "extra": "mean: 1.602184165820526 msec\nrounds: 591"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 405.970719632483,
            "unit": "iter/sec",
            "range": "stddev: 0.000038911312658903475",
            "extra": "mean: 2.463231833333398 msec\nrounds: 396"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 536.8040861589269,
            "unit": "iter/sec",
            "range": "stddev: 0.000039809788852892443",
            "extra": "mean: 1.8628770268040373 msec\nrounds: 485"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 373.95004801992684,
            "unit": "iter/sec",
            "range": "stddev: 0.00004136751959141817",
            "extra": "mean: 2.6741539553077223 msec\nrounds: 358"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 231.83937550747896,
            "unit": "iter/sec",
            "range": "stddev: 0.00006376346395715738",
            "extra": "mean: 4.313331149253983 msec\nrounds: 201"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.467721839048555,
            "unit": "iter/sec",
            "range": "stddev: 0.0011449450356005623",
            "extra": "mean: 182.89152766666916 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.300340701927789,
            "unit": "iter/sec",
            "range": "stddev: 0.0011584290765595025",
            "extra": "mean: 434.71821333333577 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8704210703882305,
            "unit": "iter/sec",
            "range": "stddev: 0.0004148126420831066",
            "extra": "mean: 1.1488692473333326 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 716.1091175933345,
            "unit": "iter/sec",
            "range": "stddev: 0.00004984968483378539",
            "extra": "mean: 1.3964352295370186 msec\nrounds: 562"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 498.2101356048634,
            "unit": "iter/sec",
            "range": "stddev: 0.00012018086048423381",
            "extra": "mean: 2.0071851785711408 msec\nrounds: 336"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 277.57603247811835,
            "unit": "iter/sec",
            "range": "stddev: 0.00013286429254577415",
            "extra": "mean: 3.602616519417364 msec\nrounds: 206"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 640.8486180135328,
            "unit": "iter/sec",
            "range": "stddev: 0.00002910834201214482",
            "extra": "mean: 1.5604309222039752 msec\nrounds: 617"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 296.968820686737,
            "unit": "iter/sec",
            "range": "stddev: 0.00004890989886392594",
            "extra": "mean: 3.367356874999576 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 240.6751735406085,
            "unit": "iter/sec",
            "range": "stddev: 0.00004800434205990795",
            "extra": "mean: 4.154977787234347 msec\nrounds: 235"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 227.01429835058798,
            "unit": "iter/sec",
            "range": "stddev: 0.00016971476935601215",
            "extra": "mean: 4.4050088794656315 msec\nrounds: 224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 111.12361141496129,
            "unit": "iter/sec",
            "range": "stddev: 0.0000817080778337888",
            "extra": "mean: 8.99898758928711 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 84.98474825123871,
            "unit": "iter/sec",
            "range": "stddev: 0.00010822121134833099",
            "extra": "mean: 11.76681722988365 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 313.97581770440786,
            "unit": "iter/sec",
            "range": "stddev: 0.00003762400266207974",
            "extra": "mean: 3.184958661184056 msec\nrounds: 304"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 139.40286651617862,
            "unit": "iter/sec",
            "range": "stddev: 0.00006998098706785581",
            "extra": "mean: 7.173453638300496 msec\nrounds: 141"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 114.47492014021448,
            "unit": "iter/sec",
            "range": "stddev: 0.00006800648641208299",
            "extra": "mean: 8.735537869562618 msec\nrounds: 115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 111.56224563296463,
            "unit": "iter/sec",
            "range": "stddev: 0.00023619195078399376",
            "extra": "mean: 8.963605871559457 msec\nrounds: 109"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 51.55957844186982,
            "unit": "iter/sec",
            "range": "stddev: 0.0000859837130029777",
            "extra": "mean: 19.395038326921874 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 39.75658091105455,
            "unit": "iter/sec",
            "range": "stddev: 0.00013018846036776382",
            "extra": "mean: 25.153068425004932 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 329.27441267721935,
            "unit": "iter/sec",
            "range": "stddev: 0.00003520105066702502",
            "extra": "mean: 3.036980589743785 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 243.58626365472918,
            "unit": "iter/sec",
            "range": "stddev: 0.00004760611070774788",
            "extra": "mean: 4.105321806723255 msec\nrounds: 238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 68.7058991769317,
            "unit": "iter/sec",
            "range": "stddev: 0.00013131901458274947",
            "extra": "mean: 14.554790956520288 msec\nrounds: 69"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 163.12632469954903,
            "unit": "iter/sec",
            "range": "stddev: 0.00004974716048641059",
            "extra": "mean: 6.130218417179631 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 119.90790030747779,
            "unit": "iter/sec",
            "range": "stddev: 0.00014365509830210674",
            "extra": "mean: 8.339734057853711 msec\nrounds: 121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 27.54041231908039,
            "unit": "iter/sec",
            "range": "stddev: 0.0003871213236368304",
            "extra": "mean: 36.310276999999225 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 78.8284054744025,
            "unit": "iter/sec",
            "range": "stddev: 0.0002166354781774393",
            "extra": "mean: 12.685782415384821 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 58.05779771813445,
            "unit": "iter/sec",
            "range": "stddev: 0.0001288453347184496",
            "extra": "mean: 17.22421516666741 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.292196467670495,
            "unit": "iter/sec",
            "range": "stddev: 0.001563951297428241",
            "extra": "mean: 69.96825171428611 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 37.801026662395266,
            "unit": "iter/sec",
            "range": "stddev: 0.00018663800583941872",
            "extra": "mean: 26.454307945948127 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 21.934459566538514,
            "unit": "iter/sec",
            "range": "stddev: 0.00019029851203509118",
            "extra": "mean: 45.5903641923105 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.950048486417852,
            "unit": "iter/sec",
            "range": "stddev: 0.0037814399185912705",
            "extra": "mean: 143.883888285708 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 17.90003015737423,
            "unit": "iter/sec",
            "range": "stddev: 0.0002272085861869316",
            "extra": "mean: 55.8658276666664 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.39474397562142,
            "unit": "iter/sec",
            "range": "stddev: 0.0002818853544119282",
            "extra": "mean: 74.65614884614524 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1019.7464516590904,
            "unit": "iter/sec",
            "range": "stddev: 0.000018117015711590394",
            "extra": "mean: 980.6359202064751 usec\nrounds: 777"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 345.76720572060395,
            "unit": "iter/sec",
            "range": "stddev: 0.000025473374725305776",
            "extra": "mean: 2.8921192740529786 msec\nrounds: 343"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 101.70648708550122,
            "unit": "iter/sec",
            "range": "stddev: 0.00008244652582500806",
            "extra": "mean: 9.83221452884646 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 28.175938386363754,
            "unit": "iter/sec",
            "range": "stddev: 0.00017727004490127328",
            "extra": "mean: 35.49127579310607 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.383766624050306,
            "unit": "iter/sec",
            "range": "stddev: 0.0006732512962289753",
            "extra": "mean: 135.4322327499915 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 228.15187842647646,
            "unit": "iter/sec",
            "range": "stddev: 0.00010854510560083565",
            "extra": "mean: 4.383045219249672 msec\nrounds: 187"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 203.05641317297216,
            "unit": "iter/sec",
            "range": "stddev: 0.00013136306473942908",
            "extra": "mean: 4.924739801978857 msec\nrounds: 202"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 116.26717948482599,
            "unit": "iter/sec",
            "range": "stddev: 0.000305280090484257",
            "extra": "mean: 8.600879495236313 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 110.05802249508118,
            "unit": "iter/sec",
            "range": "stddev: 0.00037950227604498064",
            "extra": "mean: 9.086116371432105 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.2945578120168758,
            "unit": "iter/sec",
            "range": "stddev: 0.007892810415344766",
            "extra": "mean: 3.3949192966666524 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}