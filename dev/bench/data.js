window.BENCHMARK_DATA = {
  "lastUpdate": 1793575282541,
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
          "id": "6563b53357c3b3bc4ff23468eacac1177ea682a5",
          "message": "1.0 Phase 8 (steps 1-3): remove the 0.10 API, migrate the tests\n\nSafety nets first:\n- docs/dev/battery.py runs every regression-battery case through the 1.0\n  API (cases translated by docs/dev/migrate_0_10.py, formerly\n  voles/_migrate.py) and compares bitwise; local reference saved at the\n  previous commit.\n- tests/test_reference_values.py + tests/data/reference_values.npz freeze\n  sampled outputs of the 493 battery calls (the 0.10 numbers) at rtol 1e-9,\n  replacing the 0.10-vs-1.0 equivalence test across platforms.\n\nTests: ~700 call sites in 20 files rewritten to solve_vie1/2/vide by an\nAST codemod, with small conftest helpers (with_sol, run, values_fn,\npolynomials, PolyView); validation tests rewritten for the 1.0 messages;\n0.10-only tests (show_warnings, return_polys, coll_divs with callables)\nremoved.\n\nRemoved: solve_VIE_1/2, solve_VIDE, function_solve_*, voles.solvers,\nfast_coll_settings_*, optimal_graded_mesh(T=, M=) (t_end and n_intervals\nnow required), the [callable]/[numba] extras, the pytest deprecation\nignores and the deprecated-functions docs page.\n\nFixed (found by the migration): to_ppoly() shared the read-only mesh, so\nPPoly.antiderivative() and roots() failed; non-numeric coll_nodes raised\nValueError instead of TypeError.\n\nBattery unchanged bitwise; 1802 tests pass (NumPy 1.26 and 2.5).\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-11-01T18:12:25-05:00",
          "tree_id": "b68259b0da21ac3bc76340f47ce65488044ddcf1",
          "url": "https://github.com/trout314/voles/commit/6563b53357c3b3bc4ff23468eacac1177ea682a5"
        },
        "date": 1793575281387,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 4772.212893486284,
            "unit": "iter/sec",
            "range": "stddev: 0.000020354912682453463",
            "extra": "mean: 209.54639332309034 usec\nrounds: 3295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3430.5496533742057,
            "unit": "iter/sec",
            "range": "stddev: 0.000017724513084777588",
            "extra": "mean: 291.4984772240286 usec\nrounds: 3271"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2081.488469920433,
            "unit": "iter/sec",
            "range": "stddev: 0.00041060707944407085",
            "extra": "mean: 480.42543326614054 usec\nrounds: 1978"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1179.7649094365554,
            "unit": "iter/sec",
            "range": "stddev: 0.000022040091077657544",
            "extra": "mean: 847.6264991451479 usec\nrounds: 1170"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 608.0910162304514,
            "unit": "iter/sec",
            "range": "stddev: 0.000036391694556171194",
            "extra": "mean: 1.644490665556922 msec\nrounds: 601"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 4796.351540327118,
            "unit": "iter/sec",
            "range": "stddev: 0.00001735349475340574",
            "extra": "mean: 208.49180707296503 usec\nrounds: 3478"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 3882.2512455649326,
            "unit": "iter/sec",
            "range": "stddev: 0.000018992093297775034",
            "extra": "mean: 257.5825047753918 usec\nrounds: 3560"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 2812.472522351716,
            "unit": "iter/sec",
            "range": "stddev: 0.00002149479463404579",
            "extra": "mean: 355.55902930700495 usec\nrounds: 2525"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1936.9829394391802,
            "unit": "iter/sec",
            "range": "stddev: 0.000023349595609744914",
            "extra": "mean: 516.2668083641112 usec\nrounds: 1889"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1132.8966718074887,
            "unit": "iter/sec",
            "range": "stddev: 0.000051409017585208194",
            "extra": "mean: 882.6930336060943 usec\nrounds: 1101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 4525.026337318211,
            "unit": "iter/sec",
            "range": "stddev: 0.000018726329588037814",
            "extra": "mean: 220.99318886896407 usec\nrounds: 3971"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 3693.347978423422,
            "unit": "iter/sec",
            "range": "stddev: 0.00001930022702113492",
            "extra": "mean: 270.75704911695584 usec\nrounds: 3115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 2668.6459151319127,
            "unit": "iter/sec",
            "range": "stddev: 0.00002029622466954984",
            "extra": "mean: 374.7218746142908 usec\nrounds: 2592"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1848.9955248315368,
            "unit": "iter/sec",
            "range": "stddev: 0.000022364590929796376",
            "extra": "mean: 540.8341916301342 usec\nrounds: 1816"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1098.6792544570899,
            "unit": "iter/sec",
            "range": "stddev: 0.00002474769600926964",
            "extra": "mean: 910.183746478537 usec\nrounds: 1065"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 3950.029705474198,
            "unit": "iter/sec",
            "range": "stddev: 0.00002010666936102824",
            "extra": "mean: 253.1626530843901 usec\nrounds: 3485"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 2791.9203395441154,
            "unit": "iter/sec",
            "range": "stddev: 0.000021425602748257575",
            "extra": "mean: 358.1764084871014 usec\nrounds: 2710"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1718.4602226277275,
            "unit": "iter/sec",
            "range": "stddev: 0.000023189552576763722",
            "extra": "mean: 581.9162915920641 usec\nrounds: 1677"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 948.4104006452583,
            "unit": "iter/sec",
            "range": "stddev: 0.000025148031305365324",
            "extra": "mean: 1.0543958599775396 msec\nrounds: 907"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 487.14588756521925,
            "unit": "iter/sec",
            "range": "stddev: 0.000035111752707156556",
            "extra": "mean: 2.0527731538452527 msec\nrounds: 481"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 2613.3952568700784,
            "unit": "iter/sec",
            "range": "stddev: 0.000054901358722478203",
            "extra": "mean: 382.6439943866913 usec\nrounds: 2316"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 1990.7236840123458,
            "unit": "iter/sec",
            "range": "stddev: 0.000023776048189983255",
            "extra": "mean: 502.3298853733828 usec\nrounds: 1928"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1271.898445716354,
            "unit": "iter/sec",
            "range": "stddev: 0.0000232935739103424",
            "extra": "mean: 786.226292962237 usec\nrounds: 1222"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 801.661216803472,
            "unit": "iter/sec",
            "range": "stddev: 0.000028897118467583885",
            "extra": "mean: 1.2474097274998286 msec\nrounds: 800"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 441.2711557421681,
            "unit": "iter/sec",
            "range": "stddev: 0.00003300168052793898",
            "extra": "mean: 2.2661802997708143 msec\nrounds: 437"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 2655.701355401856,
            "unit": "iter/sec",
            "range": "stddev: 0.000022537339359755684",
            "extra": "mean: 376.5483637555631 usec\nrounds: 2290"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 1917.1893974122358,
            "unit": "iter/sec",
            "range": "stddev: 0.000023586682107668194",
            "extra": "mean: 521.596875796293 usec\nrounds: 1884"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1223.8343068104787,
            "unit": "iter/sec",
            "range": "stddev: 0.000025147673984125422",
            "extra": "mean: 817.1040756376334 usec\nrounds: 1137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 770.0575535590696,
            "unit": "iter/sec",
            "range": "stddev: 0.000029508043790114058",
            "extra": "mean: 1.2986042346811315 msec\nrounds: 767"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 425.0067633892836,
            "unit": "iter/sec",
            "range": "stddev: 0.00003854409926953241",
            "extra": "mean: 2.3529037326967264 msec\nrounds: 419"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2813.1197886390314,
            "unit": "iter/sec",
            "range": "stddev: 0.000024136514467328175",
            "extra": "mean: 355.47721929175054 usec\nrounds: 2654"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1681.1024848661875,
            "unit": "iter/sec",
            "range": "stddev: 0.00006215764901708363",
            "extra": "mean: 594.8477317726397 usec\nrounds: 1495"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 936.4535011247112,
            "unit": "iter/sec",
            "range": "stddev: 0.000036646672576327315",
            "extra": "mean: 1.0678586804352455 msec\nrounds: 920"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 481.5100204813737,
            "unit": "iter/sec",
            "range": "stddev: 0.000033572676516546054",
            "extra": "mean: 2.0767999781194235 msec\nrounds: 457"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 207.64133925953098,
            "unit": "iter/sec",
            "range": "stddev: 0.00004047054451682787",
            "extra": "mean: 4.815996677569584 msec\nrounds: 214"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2245.96382953324,
            "unit": "iter/sec",
            "range": "stddev: 0.00002318024976720519",
            "extra": "mean: 445.24314543739627 usec\nrounds: 2104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1356.1450151873448,
            "unit": "iter/sec",
            "range": "stddev: 0.000025281395096434506",
            "extra": "mean: 737.3842684971672 usec\nrounds: 1311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 736.615064662563,
            "unit": "iter/sec",
            "range": "stddev: 0.00003476377910747202",
            "extra": "mean: 1.3575611577508144 msec\nrounds: 729"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 375.9909103097584,
            "unit": "iter/sec",
            "range": "stddev: 0.00003932728803622521",
            "extra": "mean: 2.6596387640758508 msec\nrounds: 373"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 159.0340623076643,
            "unit": "iter/sec",
            "range": "stddev: 0.00007764117978378126",
            "extra": "mean: 6.287961116565198 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 711.426563942916,
            "unit": "iter/sec",
            "range": "stddev: 0.00004299320788921956",
            "extra": "mean: 1.405626456310168 msec\nrounds: 412"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 567.0213981394401,
            "unit": "iter/sec",
            "range": "stddev: 0.000053254165075836615",
            "extra": "mean: 1.7636018733707173 msec\nrounds: 537"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 402.5803822898676,
            "unit": "iter/sec",
            "range": "stddev: 0.00005894962596894756",
            "extra": "mean: 2.483975980925906 msec\nrounds: 367"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 717.2750664211476,
            "unit": "iter/sec",
            "range": "stddev: 0.000025214290464610605",
            "extra": "mean: 1.394165288624226 msec\nrounds: 589"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 551.60419696958,
            "unit": "iter/sec",
            "range": "stddev: 0.00003548629057215848",
            "extra": "mean: 1.8128941104760088 msec\nrounds: 525"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 372.5002801179788,
            "unit": "iter/sec",
            "range": "stddev: 0.00018429125184628902",
            "extra": "mean: 2.6845617396134003 msec\nrounds: 361"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 478.2040233045118,
            "unit": "iter/sec",
            "range": "stddev: 0.000060777795891575895",
            "extra": "mean: 2.091157646666678 msec\nrounds: 450"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 344.8012095906315,
            "unit": "iter/sec",
            "range": "stddev: 0.0001675883442673718",
            "extra": "mean: 2.9002218443121457 msec\nrounds: 334"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 222.45664706297433,
            "unit": "iter/sec",
            "range": "stddev: 0.0000973564429829755",
            "extra": "mean: 4.495257899472493 msec\nrounds: 189"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.364866339067105,
            "unit": "iter/sec",
            "range": "stddev: 0.000615847291380013",
            "extra": "mean: 186.39793366667354 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.2304173986094487,
            "unit": "iter/sec",
            "range": "stddev: 0.00042551368227540087",
            "extra": "mean: 448.34657433332836 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8454299796188559,
            "unit": "iter/sec",
            "range": "stddev: 0.0012734286376811508",
            "extra": "mean: 1.1828300676666668 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 599.1409507743655,
            "unit": "iter/sec",
            "range": "stddev: 0.000030303420031530236",
            "extra": "mean: 1.669056335921523 msec\nrounds: 515"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 450.95177136786083,
            "unit": "iter/sec",
            "range": "stddev: 0.000052983205761197",
            "extra": "mean: 2.2175320366670803 msec\nrounds: 300"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 283.7688061461434,
            "unit": "iter/sec",
            "range": "stddev: 0.00020664300859276783",
            "extra": "mean: 3.5239955144505606 msec\nrounds: 173"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 608.844670193693,
            "unit": "iter/sec",
            "range": "stddev: 0.00004186208616003983",
            "extra": "mean: 1.6424550447027286 msec\nrounds: 604"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 295.04897865871504,
            "unit": "iter/sec",
            "range": "stddev: 0.00005024771269698137",
            "extra": "mean: 3.389267790540994 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 238.19688997634816,
            "unit": "iter/sec",
            "range": "stddev: 0.00006704078614304458",
            "extra": "mean: 4.19820762604959 msec\nrounds: 238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 225.9209387415848,
            "unit": "iter/sec",
            "range": "stddev: 0.00005882240172217201",
            "extra": "mean: 4.4263272168137995 msec\nrounds: 226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 110.68068301975471,
            "unit": "iter/sec",
            "range": "stddev: 0.00010444149326475291",
            "extra": "mean: 9.035000261260732 msec\nrounds: 111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 86.64622735280355,
            "unit": "iter/sec",
            "range": "stddev: 0.00011458043452932283",
            "extra": "mean: 11.541183390803958 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 308.4719565838573,
            "unit": "iter/sec",
            "range": "stddev: 0.00004153924937093679",
            "extra": "mean: 3.2417857722770096 msec\nrounds: 303"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 141.92529605926939,
            "unit": "iter/sec",
            "range": "stddev: 0.00007326417503691955",
            "extra": "mean: 7.045960288730983 msec\nrounds: 142"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 114.14481644176497,
            "unit": "iter/sec",
            "range": "stddev: 0.00013512553053847182",
            "extra": "mean: 8.76080080701856 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 112.01779817187878,
            "unit": "iter/sec",
            "range": "stddev: 0.000122348019159888",
            "extra": "mean: 8.9271527946444 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 52.692174948553834,
            "unit": "iter/sec",
            "range": "stddev: 0.00027714660625559925",
            "extra": "mean: 18.978150000001957 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 40.24667185178146,
            "unit": "iter/sec",
            "range": "stddev: 0.00046196039144080054",
            "extra": "mean: 24.846774999998825 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 321.8108550876873,
            "unit": "iter/sec",
            "range": "stddev: 0.00003552340961278552",
            "extra": "mean: 3.1074153782895833 msec\nrounds: 304"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 239.6023796031981,
            "unit": "iter/sec",
            "range": "stddev: 0.00004755434052720688",
            "extra": "mean: 4.173581254310099 msec\nrounds: 232"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 69.75172959157422,
            "unit": "iter/sec",
            "range": "stddev: 0.00014115501752619603",
            "extra": "mean: 14.33656205882523 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 163.18665665015163,
            "unit": "iter/sec",
            "range": "stddev: 0.00006761210331724105",
            "extra": "mean: 6.1279520061732375 msec\nrounds: 162"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 120.84868751028947,
            "unit": "iter/sec",
            "range": "stddev: 0.00008247366385913808",
            "extra": "mean: 8.274810596638517 msec\nrounds: 119"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 27.879238239369318,
            "unit": "iter/sec",
            "range": "stddev: 0.00024650384215114875",
            "extra": "mean: 35.86898578124931 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 80.56732770474683,
            "unit": "iter/sec",
            "range": "stddev: 0.00010584255285128418",
            "extra": "mean: 12.411979253732682 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 59.23756345695702,
            "unit": "iter/sec",
            "range": "stddev: 0.0001601945484518143",
            "extra": "mean: 16.881180481479735 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.395952762971227,
            "unit": "iter/sec",
            "range": "stddev: 0.0011948169977942075",
            "extra": "mean: 69.46396785714423 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 37.847334529661886,
            "unit": "iter/sec",
            "range": "stddev: 0.00035979698973129736",
            "extra": "mean: 26.42193994444379 msec\nrounds: 36"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 22.038860004036138,
            "unit": "iter/sec",
            "range": "stddev: 0.0003372922056287134",
            "extra": "mean: 45.37439775999587 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.94079249276592,
            "unit": "iter/sec",
            "range": "stddev: 0.0035191093151189065",
            "extra": "mean: 144.07576671428453 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 17.778269335950064,
            "unit": "iter/sec",
            "range": "stddev: 0.0007938526588566971",
            "extra": "mean: 56.24844472222416 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.387572017221187,
            "unit": "iter/sec",
            "range": "stddev: 0.0006949820266607085",
            "extra": "mean: 74.6961434615361 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 908.7145589466758,
            "unit": "iter/sec",
            "range": "stddev: 0.000051780982526131685",
            "extra": "mean: 1.100455572274683 msec\nrounds: 844"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 324.3686809557552,
            "unit": "iter/sec",
            "range": "stddev: 0.00006201345384973953",
            "extra": "mean: 3.082911694968488 msec\nrounds: 318"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 98.4102710422309,
            "unit": "iter/sec",
            "range": "stddev: 0.0000929388639611059",
            "extra": "mean: 10.161540959183712 msec\nrounds: 98"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.28529198136637,
            "unit": "iter/sec",
            "range": "stddev: 0.00024378954494279757",
            "extra": "mean: 36.64978189285709 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.125932004543963,
            "unit": "iter/sec",
            "range": "stddev: 0.007431616423248025",
            "extra": "mean: 140.33252062499812 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 220.17438192682096,
            "unit": "iter/sec",
            "range": "stddev: 0.0001455122065446348",
            "extra": "mean: 4.5418544666671 msec\nrounds: 180"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 197.33228250257744,
            "unit": "iter/sec",
            "range": "stddev: 0.00009421254357990441",
            "extra": "mean: 5.067594553298387 msec\nrounds: 197"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 124.6917027338269,
            "unit": "iter/sec",
            "range": "stddev: 0.00043447739711045694",
            "extra": "mean: 8.019779809524692 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 110.90586782211064,
            "unit": "iter/sec",
            "range": "stddev: 0.00010343204799074084",
            "extra": "mean: 9.016655472224132 msec\nrounds: 108"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.2854141201963361,
            "unit": "iter/sec",
            "range": "stddev: 0.011446168882012542",
            "extra": "mean: 3.5036808946666724 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_25",
            "value": 47.12011681121109,
            "unit": "iter/sec",
            "range": "stddev: 0.00014562016690558628",
            "extra": "mean: 21.222358255318973 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_50",
            "value": 22.089425101766153,
            "unit": "iter/sec",
            "range": "stddev: 0.0002393992746262343",
            "extra": "mean: 45.27053082608498 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_100",
            "value": 10.391148839068496,
            "unit": "iter/sec",
            "range": "stddev: 0.0013108394238863354",
            "extra": "mean: 96.23574981817353 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_200",
            "value": 4.7443463472503415,
            "unit": "iter/sec",
            "range": "stddev: 0.0003866027149283788",
            "extra": "mean: 210.7771917999969 msec\nrounds: 5"
          }
        ]
      }
    ]
  }
}