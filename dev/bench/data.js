window.BENCHMARK_DATA = {
  "lastUpdate": 1793492100970,
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
          "id": "0d137f38f1d41d4cc3c0b3b3fab079bda5770912",
          "message": "1.0 API Phase 2: VolterraSolution\n\nThe 1.0 solution object (contract §8), exported as voles.VolterraSolution;\nthe solvers start returning it in Phase 4 and 5.\n\n- Grid output t/y: sample times in the sampled regime, mesh breakpoints\n  in the functional one. sol(sol.t) == sol.y to rounding.\n- Structure, all read-only:\n  - mesh and coefficients;\n  - node_times, stored because the final sampled interval has its own\n    snapped nodes;\n  - node_values, the solver output or computed lazily;\n  - nodes, coll_setting, equation, regime and continuous.\n- sol(t, at_breakpoints=\"mean\"|\"left\"|\"right\"): points within 4 ulps of a\n  breakpoint count as that breakpoint, and points outside [0, T] give NaN.\n  An in-place, copy-free Horner loop is bitwise equal to 0.10 off the\n  breakpoints, and peak memory in a 400k-point matrix evaluation falls\n  from 134 MiB to 43 MiB.\n- to_ppoly() returns a scipy PPoly (complex supported) for derivatives,\n  antiderivatives and integrals.\n- 0.11-only deprecated aliases: mesh_breakpoints, polynomials, len,\n  indexing, iteration.\n- The legacy _SolutionFunction is untouched; a genuine 0.10.0 pickle\n  fixture still loads.\n\nPrivate adapters build solutions from the 0.10 solvers' output until\nPhase 3. tests/test_solution.py adds 114 tests.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-10-31T20:07:21-04:00",
          "tree_id": "b920722c7d9c2bd26664b1d364d86cbe98447528",
          "url": "https://github.com/trout314/voles/commit/0d137f38f1d41d4cc3c0b3b3fab079bda5770912"
        },
        "date": 1793492099956,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7968.340467900755,
            "unit": "iter/sec",
            "range": "stddev: 0.000014015764597151594",
            "extra": "mean: 125.496645635104 usec\nrounds: 5040"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4684.232204358613,
            "unit": "iter/sec",
            "range": "stddev: 0.00023023533182355398",
            "extra": "mean: 213.48215809402316 usec\nrounds: 4491"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2600.268071531355,
            "unit": "iter/sec",
            "range": "stddev: 0.00002701239254204544",
            "extra": "mean: 384.5757331516508 usec\nrounds: 2567"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1293.0302751353959,
            "unit": "iter/sec",
            "range": "stddev: 0.00009483831891934836",
            "extra": "mean: 773.3770965999137 usec\nrounds: 1294"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 646.3242056192264,
            "unit": "iter/sec",
            "range": "stddev: 0.00002964935201404861",
            "extra": "mean: 1.5472111230027754 msec\nrounds: 626"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 7891.41406929414,
            "unit": "iter/sec",
            "range": "stddev: 0.000014878292421655369",
            "extra": "mean: 126.72000115809999 usec\nrounds: 6044"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 5704.208334307795,
            "unit": "iter/sec",
            "range": "stddev: 0.000015441606879843478",
            "extra": "mean: 175.3091649871077 usec\nrounds: 5061"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3778.4360516773536,
            "unit": "iter/sec",
            "range": "stddev: 0.00001730723479339262",
            "extra": "mean: 264.65976566047004 usec\nrounds: 3512"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2366.4797086414073,
            "unit": "iter/sec",
            "range": "stddev: 0.000029868424115213668",
            "extra": "mean: 422.5685926435002 usec\nrounds: 2175"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1298.4359319073549,
            "unit": "iter/sec",
            "range": "stddev: 0.00002235165509535607",
            "extra": "mean: 770.1573681275414 usec\nrounds: 1255"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 7370.421290020076,
            "unit": "iter/sec",
            "range": "stddev: 0.00001479485450716797",
            "extra": "mean: 135.67745460548514 usec\nrounds: 6058"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 5372.3073416500965,
            "unit": "iter/sec",
            "range": "stddev: 0.00001627808064958063",
            "extra": "mean: 186.1397601450053 usec\nrounds: 4411"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3608.326065879744,
            "unit": "iter/sec",
            "range": "stddev: 0.000017204134434994834",
            "extra": "mean: 277.1368168348141 usec\nrounds: 3172"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2266.7880767102747,
            "unit": "iter/sec",
            "range": "stddev: 0.00003056598938777693",
            "extra": "mean: 441.15284100632454 usec\nrounds: 2107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1256.2668734652432,
            "unit": "iter/sec",
            "range": "stddev: 0.00002239489404770217",
            "extra": "mean: 796.0092088089806 usec\nrounds: 1226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 6320.073081596183,
            "unit": "iter/sec",
            "range": "stddev: 0.000014447506864324459",
            "extra": "mean: 158.22601844778706 usec\nrounds: 4716"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3871.802062556531,
            "unit": "iter/sec",
            "range": "stddev: 0.00001613193689858194",
            "extra": "mean: 258.27766601779877 usec\nrounds: 3596"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 2116.5996793587383,
            "unit": "iter/sec",
            "range": "stddev: 0.000023783083452557906",
            "extra": "mean: 472.45589695211896 usec\nrounds: 2067"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1083.5729017341168,
            "unit": "iter/sec",
            "range": "stddev: 0.00002410798836638683",
            "extra": "mean: 922.8728389198649 usec\nrounds: 1074"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 531.2945992123999,
            "unit": "iter/sec",
            "range": "stddev: 0.000023843946246357195",
            "extra": "mean: 1.8821949281668153 msec\nrounds: 529"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3626.769421259783,
            "unit": "iter/sec",
            "range": "stddev: 0.00001893623803368484",
            "extra": "mean: 275.72748191216505 usec\nrounds: 3096"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2464.661473523487,
            "unit": "iter/sec",
            "range": "stddev: 0.000019129139204821094",
            "extra": "mean: 405.7352341254384 usec\nrounds: 2315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1463.265488409407,
            "unit": "iter/sec",
            "range": "stddev: 0.00002258352530154521",
            "extra": "mean: 683.4029832050614 usec\nrounds: 1429"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 868.3826856404505,
            "unit": "iter/sec",
            "range": "stddev: 0.00006906455004332717",
            "extra": "mean: 1.1515660278998756 msec\nrounds: 681"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 468.046060746356,
            "unit": "iter/sec",
            "range": "stddev: 0.000031193463878302494",
            "extra": "mean: 2.1365418574517627 msec\nrounds: 463"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 3566.77633724995,
            "unit": "iter/sec",
            "range": "stddev: 0.00001905202130440806",
            "extra": "mean: 280.36521089265113 usec\nrounds: 3305"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2400.9426515730684,
            "unit": "iter/sec",
            "range": "stddev: 0.000018787738654395914",
            "extra": "mean: 416.503076133373 usec\nrounds: 2338"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1427.704740276623,
            "unit": "iter/sec",
            "range": "stddev: 0.000019117469863063516",
            "extra": "mean: 700.4249350648275 usec\nrounds: 1386"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 840.412361636789,
            "unit": "iter/sec",
            "range": "stddev: 0.00009243098555913113",
            "extra": "mean: 1.189892064477012 msec\nrounds: 822"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 452.0338878451939,
            "unit": "iter/sec",
            "range": "stddev: 0.00004081909867969445",
            "extra": "mean: 2.212223523255995 msec\nrounds: 430"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3704.3601953302555,
            "unit": "iter/sec",
            "range": "stddev: 0.000031196357010521715",
            "extra": "mean: 269.95215024192504 usec\nrounds: 3308"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 2057.784184160923,
            "unit": "iter/sec",
            "range": "stddev: 0.00001767822727159638",
            "extra": "mean: 485.9596101948648 usec\nrounds: 2001"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1042.669420078503,
            "unit": "iter/sec",
            "range": "stddev: 0.000024339360557269732",
            "extra": "mean: 959.0767512148861 usec\nrounds: 1029"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 498.53719471483544,
            "unit": "iter/sec",
            "range": "stddev: 0.00018382069489604127",
            "extra": "mean: 2.005868389763782 msec\nrounds: 508"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 241.32121180552699,
            "unit": "iter/sec",
            "range": "stddev: 0.00013233884030351697",
            "extra": "mean: 4.143854543569373 msec\nrounds: 241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2940.23058968353,
            "unit": "iter/sec",
            "range": "stddev: 0.000018090017865222456",
            "extra": "mean: 340.1093790088193 usec\nrounds: 2744"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1584.228663851566,
            "unit": "iter/sec",
            "range": "stddev: 0.00002151416356312159",
            "extra": "mean: 631.2220090556921 usec\nrounds: 1546"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 804.1971568122374,
            "unit": "iter/sec",
            "range": "stddev: 0.00005144840853887462",
            "extra": "mean: 1.243476169405904 msec\nrounds: 791"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 395.44563054454096,
            "unit": "iter/sec",
            "range": "stddev: 0.000044014107529389434",
            "extra": "mean: 2.528792639895828 msec\nrounds: 386"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 188.44408478131604,
            "unit": "iter/sec",
            "range": "stddev: 0.000059946132787851026",
            "extra": "mean: 5.306613901733617 msec\nrounds: 173"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 895.8050969256483,
            "unit": "iter/sec",
            "range": "stddev: 0.00002679093624589162",
            "extra": "mean: 1.116314255670059 msec\nrounds: 485"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 685.1565219257867,
            "unit": "iter/sec",
            "range": "stddev: 0.00003948613111082943",
            "extra": "mean: 1.4595205153842437 msec\nrounds: 650"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 460.26067681315624,
            "unit": "iter/sec",
            "range": "stddev: 0.000035607514368779605",
            "extra": "mean: 2.1726818091956006 msec\nrounds: 435"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 857.7300480637214,
            "unit": "iter/sec",
            "range": "stddev: 0.00016858200113219717",
            "extra": "mean: 1.1658679817239064 msec\nrounds: 766"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 650.8059043280108,
            "unit": "iter/sec",
            "range": "stddev: 0.00003597110445185056",
            "extra": "mean: 1.5365564346447491 msec\nrounds: 635"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 419.25289012512485,
            "unit": "iter/sec",
            "range": "stddev: 0.00005399698141355511",
            "extra": "mean: 2.385195245050196 msec\nrounds: 404"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 557.9813285901147,
            "unit": "iter/sec",
            "range": "stddev: 0.000037739077906880144",
            "extra": "mean: 1.792174663848987 msec\nrounds: 473"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 385.5328032157739,
            "unit": "iter/sec",
            "range": "stddev: 0.00003837840485202222",
            "extra": "mean: 2.5938130080213244 msec\nrounds: 374"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 237.3912414574157,
            "unit": "iter/sec",
            "range": "stddev: 0.000055590774036127085",
            "extra": "mean: 4.212455328430407 msec\nrounds: 204"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.354737212763698,
            "unit": "iter/sec",
            "range": "stddev: 0.0005366137837264505",
            "extra": "mean: 186.75052766667477 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.251462499381706,
            "unit": "iter/sec",
            "range": "stddev: 0.0012205761454504656",
            "extra": "mean: 444.1557433333306 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8594230220742031,
            "unit": "iter/sec",
            "range": "stddev: 0.0015868481740355185",
            "extra": "mean: 1.163571343000001 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 748.0165708617586,
            "unit": "iter/sec",
            "range": "stddev: 0.000027828762694516056",
            "extra": "mean: 1.3368687793212144 msec\nrounds: 648"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 531.7634346335758,
            "unit": "iter/sec",
            "range": "stddev: 0.0000450087583751977",
            "extra": "mean: 1.880535469102109 msec\nrounds: 356"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 313.97816522389365,
            "unit": "iter/sec",
            "range": "stddev: 0.00019456247891174228",
            "extra": "mean: 3.1849348482144078 msec\nrounds: 224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 659.1735326937493,
            "unit": "iter/sec",
            "range": "stddev: 0.000024066735765196785",
            "extra": "mean: 1.5170512018488431 msec\nrounds: 649"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 303.8404540344414,
            "unit": "iter/sec",
            "range": "stddev: 0.0000724216081964691",
            "extra": "mean: 3.2912009797307844 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 249.79194147492126,
            "unit": "iter/sec",
            "range": "stddev: 0.00007018695289500045",
            "extra": "mean: 4.003331709163238 msec\nrounds: 251"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 234.8019759827756,
            "unit": "iter/sec",
            "range": "stddev: 0.00004691850235105833",
            "extra": "mean: 4.258907940678307 msec\nrounds: 236"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 111.48132994443175,
            "unit": "iter/sec",
            "range": "stddev: 0.0006534555519282306",
            "extra": "mean: 8.970111860869022 msec\nrounds: 115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 88.21212362628289,
            "unit": "iter/sec",
            "range": "stddev: 0.00009019577346830496",
            "extra": "mean: 11.33631023595547 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 322.24391350753456,
            "unit": "iter/sec",
            "range": "stddev: 0.00004468167817203181",
            "extra": "mean: 3.1032393726704743 msec\nrounds: 322"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 144.84324950940777,
            "unit": "iter/sec",
            "range": "stddev: 0.00006674556342473964",
            "extra": "mean: 6.904015226025765 msec\nrounds: 146"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 118.26985263398535,
            "unit": "iter/sec",
            "range": "stddev: 0.00008834891920376629",
            "extra": "mean: 8.455240094825701 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 113.32020830348615,
            "unit": "iter/sec",
            "range": "stddev: 0.00039774095328825253",
            "extra": "mean: 8.824551375001631 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 53.30437953152115,
            "unit": "iter/sec",
            "range": "stddev: 0.0001742207916040429",
            "extra": "mean: 18.760184600003786 msec\nrounds: 55"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 40.64677247465418,
            "unit": "iter/sec",
            "range": "stddev: 0.00016519225470380204",
            "extra": "mean: 24.602199365855256 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 331.8791347719506,
            "unit": "iter/sec",
            "range": "stddev: 0.00003229337705633618",
            "extra": "mean: 3.0131451339571136 msec\nrounds: 321"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 245.34146043832743,
            "unit": "iter/sec",
            "range": "stddev: 0.00004760134491111577",
            "extra": "mean: 4.075951933331604 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 69.3953849364553,
            "unit": "iter/sec",
            "range": "stddev: 0.00020116452617898245",
            "extra": "mean: 14.41018017142913 msec\nrounds: 70"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 164.60426593201862,
            "unit": "iter/sec",
            "range": "stddev: 0.00007779600258952248",
            "extra": "mean: 6.075176693251674 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 122.14946990895463,
            "unit": "iter/sec",
            "range": "stddev: 0.0000991402888914225",
            "extra": "mean: 8.18669127868799 msec\nrounds: 122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 27.78992467666269,
            "unit": "iter/sec",
            "range": "stddev: 0.00029966988441712696",
            "extra": "mean: 35.984264499996144 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 80.13306023147453,
            "unit": "iter/sec",
            "range": "stddev: 0.00010291285797341919",
            "extra": "mean: 12.479243861539457 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 58.847239400420335,
            "unit": "iter/sec",
            "range": "stddev: 0.0002141263107257822",
            "extra": "mean: 16.99315057407531 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.404663690792228,
            "unit": "iter/sec",
            "range": "stddev: 0.0012635403797363668",
            "extra": "mean: 69.4219609333345 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 38.41082032725612,
            "unit": "iter/sec",
            "range": "stddev: 0.00026011147357206914",
            "extra": "mean: 26.034330729729433 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 22.04988398513036,
            "unit": "iter/sec",
            "range": "stddev: 0.00026390370465020116",
            "extra": "mean: 45.35171253845887 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 7.0292729361816395,
            "unit": "iter/sec",
            "range": "stddev: 0.0031951410189176585",
            "extra": "mean: 142.26222385713885 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 18.266383619632368,
            "unit": "iter/sec",
            "range": "stddev: 0.00041964444040679057",
            "extra": "mean: 54.74537384210078 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.598073514304284,
            "unit": "iter/sec",
            "range": "stddev: 0.0004276535598861635",
            "extra": "mean: 73.53982892856591 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1055.2439289087445,
            "unit": "iter/sec",
            "range": "stddev: 0.000047375937428778957",
            "extra": "mean: 947.6481907212926 usec\nrounds: 970"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 345.14437294856543,
            "unit": "iter/sec",
            "range": "stddev: 0.00003299454345737007",
            "extra": "mean: 2.897338268785924 msec\nrounds: 346"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 99.99448510417301,
            "unit": "iter/sec",
            "range": "stddev: 0.00009043460666994558",
            "extra": "mean: 10.000551519998453 msec\nrounds: 100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.40806460276905,
            "unit": "iter/sec",
            "range": "stddev: 0.0005003823828885623",
            "extra": "mean: 36.48561160713878 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 6.884805012269973,
            "unit": "iter/sec",
            "range": "stddev: 0.00889713251104225",
            "extra": "mean: 145.24739600000558 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 216.7182752560959,
            "unit": "iter/sec",
            "range": "stddev: 0.0059344764923746265",
            "extra": "mean: 4.614285522613635 msec\nrounds: 199"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 211.65354922697327,
            "unit": "iter/sec",
            "range": "stddev: 0.00006222004049046974",
            "extra": "mean: 4.7247022488038635 msec\nrounds: 209"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 137.21840022753267,
            "unit": "iter/sec",
            "range": "stddev: 0.0005367236236803033",
            "extra": "mean: 7.287652372727135 msec\nrounds: 110"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 116.42074978292113,
            "unit": "iter/sec",
            "range": "stddev: 0.00022849535494671067",
            "extra": "mean: 8.589534098213646 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.29128926261669785,
            "unit": "iter/sec",
            "range": "stddev: 0.004965821957727498",
            "extra": "mean: 3.4330135996666704 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}