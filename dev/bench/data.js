window.BENCHMARK_DATA = {
  "lastUpdate": 1793579192402,
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
          "id": "6a9549f0cdba8f6f8d818d8699bc804cc5609c08",
          "message": "Fix the package type-check under NumPy 2\n\nnp.ComplexWarning, used only by the NumPy < 1.25 fallback, no longer exists\nin NumPy 2, so mypy rejected the line there (test_package_type_checks failed\nin CI, which runs NumPy 2). The fallback is unchanged; its line now carries\na type-ignore that is harmless under NumPy 1.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-11-01T19:18:04-05:00",
          "tree_id": "910750cd379ca05164615fcb53dd6754ee36db03",
          "url": "https://github.com/trout314/voles/commit/6a9549f0cdba8f6f8d818d8699bc804cc5609c08"
        },
        "date": 1793579191502,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 12273.111423883563,
            "unit": "iter/sec",
            "range": "stddev: 0.000013407909667058706",
            "extra": "mean: 81.4789310927295 usec\nrounds: 5921"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 7414.291024390487,
            "unit": "iter/sec",
            "range": "stddev: 0.00022461176031259277",
            "extra": "mean: 134.87466255510355 usec\nrounds: 6810"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 4340.466786888684,
            "unit": "iter/sec",
            "range": "stddev: 0.000009892013175642671",
            "extra": "mean: 230.38996704702726 usec\nrounds: 3945"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 2197.0050806947984,
            "unit": "iter/sec",
            "range": "stddev: 0.000027863676611981487",
            "extra": "mean: 455.16508304284486 usec\nrounds: 2011"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 1082.777921536285,
            "unit": "iter/sec",
            "range": "stddev: 0.00002182647482828439",
            "extra": "mean: 923.5504161196445 usec\nrounds: 1067"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 14254.737980395075,
            "unit": "iter/sec",
            "range": "stddev: 0.000007653831147671139",
            "extra": "mean: 70.15211373055939 usec\nrounds: 8441"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 10296.09344280452,
            "unit": "iter/sec",
            "range": "stddev: 0.000020013512243005103",
            "extra": "mean: 97.12421566053825 usec\nrounds: 8365"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6805.698008795472,
            "unit": "iter/sec",
            "range": "stddev: 0.000011470175409673747",
            "extra": "mean: 146.93569986614617 usec\nrounds: 5984"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4065.3810994985856,
            "unit": "iter/sec",
            "range": "stddev: 0.0000391186323270542",
            "extra": "mean: 245.9793991080781 usec\nrounds: 3811"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 2205.4803427807833,
            "unit": "iter/sec",
            "range": "stddev: 0.000018276662445603407",
            "extra": "mean: 453.41596594742185 usec\nrounds: 2085"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 13512.094130789787,
            "unit": "iter/sec",
            "range": "stddev: 0.000012593330410827888",
            "extra": "mean: 74.00777335626434 usec\nrounds: 10479"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 9986.39725208661,
            "unit": "iter/sec",
            "range": "stddev: 0.000012455243305056002",
            "extra": "mean: 100.13621276592565 usec\nrounds: 7332"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6388.264905058681,
            "unit": "iter/sec",
            "range": "stddev: 0.000028871593094129678",
            "extra": "mean: 156.53702763768126 usec\nrounds: 5753"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3963.1672518351256,
            "unit": "iter/sec",
            "range": "stddev: 0.000018851577035478227",
            "extra": "mean: 252.3234414436975 usec\nrounds: 3629"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 2159.454071127538,
            "unit": "iter/sec",
            "range": "stddev: 0.000016572548935913486",
            "extra": "mean: 463.08000404836565 usec\nrounds: 1976"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 10365.202790333027,
            "unit": "iter/sec",
            "range": "stddev: 0.000008904077585764209",
            "extra": "mean: 96.47664596901443 usec\nrounds: 7827"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 6147.9405939144535,
            "unit": "iter/sec",
            "range": "stddev: 0.000023419517416804146",
            "extra": "mean: 162.65609348760646 usec\nrounds: 5712"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 3327.121339720895,
            "unit": "iter/sec",
            "range": "stddev: 0.00003567000724207396",
            "extra": "mean: 300.5601232697717 usec\nrounds: 3034"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1714.4756257868912,
            "unit": "iter/sec",
            "range": "stddev: 0.00006181669958788336",
            "extra": "mean: 583.2687178279544 usec\nrounds: 1694"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 843.7499395930472,
            "unit": "iter/sec",
            "range": "stddev: 0.000033248078287747254",
            "extra": "mean: 1.1851852700366585 msec\nrounds: 811"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 7042.31426959976,
            "unit": "iter/sec",
            "range": "stddev: 0.000018738330783046776",
            "extra": "mean: 141.99877507835694 usec\nrounds: 4157"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4519.1359050620595,
            "unit": "iter/sec",
            "range": "stddev: 0.00001263894050981505",
            "extra": "mean: 221.2812407079551 usec\nrounds: 3901"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 2594.2831286430896,
            "unit": "iter/sec",
            "range": "stddev: 0.000014377757573248067",
            "extra": "mean: 385.4629392448151 usec\nrounds: 2436"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 1480.344965913337,
            "unit": "iter/sec",
            "range": "stddev: 0.00002474232527774938",
            "extra": "mean: 675.5182224590632 usec\nrounds: 1407"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 766.2146663908511,
            "unit": "iter/sec",
            "range": "stddev: 0.000025195279159828105",
            "extra": "mean: 1.305117278308392 msec\nrounds: 733"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 6764.6376420592815,
            "unit": "iter/sec",
            "range": "stddev: 0.0000109363675390565",
            "extra": "mean: 147.82757819612956 usec\nrounds: 5256"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4276.526998169626,
            "unit": "iter/sec",
            "range": "stddev: 0.000022801153622193",
            "extra": "mean: 233.83460467524347 usec\nrounds: 3850"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 2418.8755506517905,
            "unit": "iter/sec",
            "range": "stddev: 0.00004369355802005726",
            "extra": "mean: 413.41523326015675 usec\nrounds: 2285"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 1401.0696762877274,
            "unit": "iter/sec",
            "range": "stddev: 0.00006767057356304948",
            "extra": "mean: 713.7403777445237 usec\nrounds: 1321"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 732.6300991446573,
            "unit": "iter/sec",
            "range": "stddev: 0.00002927567858614245",
            "extra": "mean: 1.3649452857144362 msec\nrounds: 707"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 6219.52774666855,
            "unit": "iter/sec",
            "range": "stddev: 0.000009737120855938531",
            "extra": "mean: 160.78391169420274 usec\nrounds: 4994"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 3331.3063211199988,
            "unit": "iter/sec",
            "range": "stddev: 0.00001759424292187082",
            "extra": "mean: 300.18254210372226 usec\nrounds: 3147"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1703.537263605816,
            "unit": "iter/sec",
            "range": "stddev: 0.000018079387072324948",
            "extra": "mean: 587.0138689442789 usec\nrounds: 1610"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 751.6153238237993,
            "unit": "iter/sec",
            "range": "stddev: 0.00016497576240898966",
            "extra": "mean: 1.33046781818199 msec\nrounds: 737"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 376.4479607603656,
            "unit": "iter/sec",
            "range": "stddev: 0.00040760127297499623",
            "extra": "mean: 2.656409661458007 msec\nrounds: 384"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 5091.959903567933,
            "unit": "iter/sec",
            "range": "stddev: 0.000013743904192580039",
            "extra": "mean: 196.38803504703574 usec\nrounds: 3909"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 2775.679094400895,
            "unit": "iter/sec",
            "range": "stddev: 0.000013012035717824872",
            "extra": "mean: 360.27219501606004 usec\nrounds: 2528"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 1413.3054848470188,
            "unit": "iter/sec",
            "range": "stddev: 0.000016176523311673972",
            "extra": "mean: 707.5611116787278 usec\nrounds: 1370"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 606.7456640517631,
            "unit": "iter/sec",
            "range": "stddev: 0.00022490882953993046",
            "extra": "mean: 1.6481370354130578 msec\nrounds: 593"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 307.2987505377561,
            "unit": "iter/sec",
            "range": "stddev: 0.00009596236150322831",
            "extra": "mean: 3.254162271242738 msec\nrounds: 306"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1586.8990743701434,
            "unit": "iter/sec",
            "range": "stddev: 0.000018604857538305875",
            "extra": "mean: 630.1597979045455 usec\nrounds: 668"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 1223.5715508150759,
            "unit": "iter/sec",
            "range": "stddev: 0.000018607141605871702",
            "extra": "mean: 817.279544734311 usec\nrounds: 883"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 790.057642137716,
            "unit": "iter/sec",
            "range": "stddev: 0.00024334883068589534",
            "extra": "mean: 1.2657304311293387 msec\nrounds: 726"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1593.6785471570229,
            "unit": "iter/sec",
            "range": "stddev: 0.000020076701013314494",
            "extra": "mean: 627.4791122613207 usec\nrounds: 1256"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 1171.2120141615917,
            "unit": "iter/sec",
            "range": "stddev: 0.000025701123074784393",
            "extra": "mean: 853.8163781694527 usec\nrounds: 907"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 744.7272598926637,
            "unit": "iter/sec",
            "range": "stddev: 0.000051930038801604954",
            "extra": "mean: 1.3427734606413204 msec\nrounds: 686"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 982.4394210607542,
            "unit": "iter/sec",
            "range": "stddev: 0.00009324038128109142",
            "extra": "mean: 1.0178744648909603 msec\nrounds: 826"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 681.0633464837404,
            "unit": "iter/sec",
            "range": "stddev: 0.00003696287289510119",
            "extra": "mean: 1.4682922009573656 msec\nrounds: 627"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 415.7309613668426,
            "unit": "iter/sec",
            "range": "stddev: 0.00028339465558881876",
            "extra": "mean: 2.4054017932948613 msec\nrounds: 358"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 9.944103267416994,
            "unit": "iter/sec",
            "range": "stddev: 0.0009224023132218541",
            "extra": "mean: 100.56210933333887 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 4.346940736086992,
            "unit": "iter/sec",
            "range": "stddev: 0.0005043181924169181",
            "extra": "mean: 230.0468445999968 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.7411532076615683,
            "unit": "iter/sec",
            "range": "stddev: 0.009775028915565767",
            "extra": "mean: 574.3319976666706 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 1296.2475240569233,
            "unit": "iter/sec",
            "range": "stddev: 0.00012127508009865634",
            "extra": "mean: 771.4575969798235 usec\nrounds: 861"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 958.2504740980377,
            "unit": "iter/sec",
            "range": "stddev: 0.000043331917694028",
            "extra": "mean: 1.0435684896908184 msec\nrounds: 582"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 565.1532949552087,
            "unit": "iter/sec",
            "range": "stddev: 0.000038559422865015574",
            "extra": "mean: 1.7694314249362293 msec\nrounds: 393"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 1132.5463230075943,
            "unit": "iter/sec",
            "range": "stddev: 0.000049081210728795714",
            "extra": "mean: 882.9660912627363 usec\nrounds: 1030"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 521.5661073342818,
            "unit": "iter/sec",
            "range": "stddev: 0.00007077739721705111",
            "extra": "mean: 1.9173024971100754 msec\nrounds: 519"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 409.06498784671396,
            "unit": "iter/sec",
            "range": "stddev: 0.00037858830199430816",
            "extra": "mean: 2.4445993416936553 msec\nrounds: 319"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 396.7979033467763,
            "unit": "iter/sec",
            "range": "stddev: 0.00009374895123356103",
            "extra": "mean: 2.5201746066840056 msec\nrounds: 389"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 198.3880496040499,
            "unit": "iter/sec",
            "range": "stddev: 0.00010300109447200041",
            "extra": "mean: 5.040626196970213 msec\nrounds: 198"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 153.75291472126298,
            "unit": "iter/sec",
            "range": "stddev: 0.00010379084401217113",
            "extra": "mean: 6.503941741936337 msec\nrounds: 155"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 553.4891387849303,
            "unit": "iter/sec",
            "range": "stddev: 0.00004058168666724131",
            "extra": "mean: 1.806720186407435 msec\nrounds: 515"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 247.83666919130738,
            "unit": "iter/sec",
            "range": "stddev: 0.0001455292044511776",
            "extra": "mean: 4.034915427418413 msec\nrounds: 248"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 193.32308026874756,
            "unit": "iter/sec",
            "range": "stddev: 0.0008655296434077056",
            "extra": "mean: 5.172688116751774 msec\nrounds: 197"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 192.45930388578793,
            "unit": "iter/sec",
            "range": "stddev: 0.00010242571266997567",
            "extra": "mean: 5.195903652407653 msec\nrounds: 187"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 91.77143884691795,
            "unit": "iter/sec",
            "range": "stddev: 0.00013909708122099873",
            "extra": "mean: 10.896636388888698 msec\nrounds: 90"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 71.53276486165504,
            "unit": "iter/sec",
            "range": "stddev: 0.00013952047049264465",
            "extra": "mean: 13.979607833333555 msec\nrounds: 72"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 606.9303473116171,
            "unit": "iter/sec",
            "range": "stddev: 0.000042451378318804585",
            "extra": "mean: 1.6476355226418897 msec\nrounds: 530"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 457.7053449784627,
            "unit": "iter/sec",
            "range": "stddev: 0.00010707947067123199",
            "extra": "mean: 2.184811715596319 msec\nrounds: 436"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 124.07592680995697,
            "unit": "iter/sec",
            "range": "stddev: 0.0014100925802171746",
            "extra": "mean: 8.059581142856723 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 296.97980302788415,
            "unit": "iter/sec",
            "range": "stddev: 0.00028593503601063606",
            "extra": "mean: 3.367232349824502 msec\nrounds: 283"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 225.3998915572634,
            "unit": "iter/sec",
            "range": "stddev: 0.00008158296001809775",
            "extra": "mean: 4.436559366072045 msec\nrounds: 224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 53.678157330918886,
            "unit": "iter/sec",
            "range": "stddev: 0.0005736230302294444",
            "extra": "mean: 18.629551566666674 msec\nrounds: 60"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 142.15777198495113,
            "unit": "iter/sec",
            "range": "stddev: 0.00014327945697032953",
            "extra": "mean: 7.034437766131143 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 106.80757114115362,
            "unit": "iter/sec",
            "range": "stddev: 0.0005660019653868863",
            "extra": "mean: 9.36263215534066 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 26.73481583782041,
            "unit": "iter/sec",
            "range": "stddev: 0.0007142058902557596",
            "extra": "mean: 37.404409518518165 msec\nrounds: 27"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 63.780283846861174,
            "unit": "iter/sec",
            "range": "stddev: 0.0005107045595003583",
            "extra": "mean: 15.678826428572142 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 39.43724134550883,
            "unit": "iter/sec",
            "range": "stddev: 0.001194520168585508",
            "extra": "mean: 25.356743166668814 msec\nrounds: 42"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 11.733382111871045,
            "unit": "iter/sec",
            "range": "stddev: 0.007154691811642279",
            "extra": "mean: 85.22691841666585 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 29.932867940695143,
            "unit": "iter/sec",
            "range": "stddev: 0.00028115174927223637",
            "extra": "mean: 33.408091799999326 msec\nrounds: 30"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 21.687656004795873,
            "unit": "iter/sec",
            "range": "stddev: 0.0004432772949861779",
            "extra": "mean: 46.10917840908515 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1160.622826435975,
            "unit": "iter/sec",
            "range": "stddev: 0.000014109778864439628",
            "extra": "mean: 861.6063524020001 usec\nrounds: 979"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 376.39939094908516,
            "unit": "iter/sec",
            "range": "stddev: 0.00005433683371813159",
            "extra": "mean: 2.656752439153835 msec\nrounds: 378"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 110.26935174670865,
            "unit": "iter/sec",
            "range": "stddev: 0.0001545786494171856",
            "extra": "mean: 9.068702990990861 msec\nrounds: 111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 30.103275530711933,
            "unit": "iter/sec",
            "range": "stddev: 0.0005813897489626105",
            "extra": "mean: 33.218976419352806 msec\nrounds: 31"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.836411810682053,
            "unit": "iter/sec",
            "range": "stddev: 0.002447674953083242",
            "extra": "mean: 127.60942433332426 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 434.2744271698745,
            "unit": "iter/sec",
            "range": "stddev: 0.00010213724356050805",
            "extra": "mean: 2.3026914260572644 msec\nrounds: 284"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 390.21220404005874,
            "unit": "iter/sec",
            "range": "stddev: 0.00006404874122041407",
            "extra": "mean: 2.5627081614734455 msec\nrounds: 353"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 228.62425965571808,
            "unit": "iter/sec",
            "range": "stddev: 0.00022641397234873215",
            "extra": "mean: 4.373989013702594 msec\nrounds: 146"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 207.66920978264542,
            "unit": "iter/sec",
            "range": "stddev: 0.00010606206217059288",
            "extra": "mean: 4.815350340315921 msec\nrounds: 191"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.5993109036928552,
            "unit": "iter/sec",
            "range": "stddev: 0.014110989025991358",
            "extra": "mean: 1.6685830240000048 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_25",
            "value": 101.77874602974974,
            "unit": "iter/sec",
            "range": "stddev: 0.00011968411960470148",
            "extra": "mean: 9.825234039606872 msec\nrounds: 101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_50",
            "value": 49.601845630836586,
            "unit": "iter/sec",
            "range": "stddev: 0.00022324539986297537",
            "extra": "mean: 20.160540142851413 msec\nrounds: 49"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_100",
            "value": 23.50675954500799,
            "unit": "iter/sec",
            "range": "stddev: 0.0007430526639223002",
            "extra": "mean: 42.54095499999977 msec\nrounds: 24"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_200",
            "value": 10.695642195933567,
            "unit": "iter/sec",
            "range": "stddev: 0.0021921166209235296",
            "extra": "mean: 93.49602218183732 msec\nrounds: 11"
          }
        ]
      }
    ]
  }
}