window.BENCHMARK_DATA = {
  "lastUpdate": 1793405264627,
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
          "id": "fcd8b06fd364afc49b14a905f44f74a9e8fa316f",
          "message": "No-GC phase 6: remove the thread-registration machinery and its tooling\n\nWith no GC use in the extension, threads never need to register with\ndruntime and collections never run, so all of this is dead:\n\n- ensureThreadAttached, the thread-exit detach hooks (Windows FLS,\n  pthread key), the attach lock, and both druntime workarounds:\n  precommitStack (Windows guard page) and fixTlsRange (Linux TLS range)\n- volterra_gc_collect, volterra_debug_thread_stats, volterra_debug_veh.d\n  and their Python wrappers\n- the block drivers' shim/_impl split (it existed for the closure\n  allocation race); the bodies are the exported functions again\n- tests/test_thread_safety.py, replaced by tests/test_threading.py:\n  threaded solves (matrix fan-out on fresh pools, user threads, product\n  block drivers, compile-time and runtime d) must equal serial ones bit\n  for bit\n- the Windows GC and Linux segfault debug workflows and their drivers\n\nvolterra_rt_init just initializes druntime and disables automatic\ncollections. CHANGELOG Unreleased rewritten to describe the final fix;\nCLAUDE.md notes the no-GC rule. ldc2 -vgc lists only the two compile-time\narray literals. Bitwise battery unchanged; 704 tests pass; Windows and\nLinux cross-compiles clean.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-10-30T19:57:11-04:00",
          "tree_id": "6503d91e9e5bd60defea0b8761d8dc2994ecc62b",
          "url": "https://github.com/trout314/voles/commit/fcd8b06fd364afc49b14a905f44f74a9e8fa316f"
        },
        "date": 1793405263872,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 9571.241717492145,
            "unit": "iter/sec",
            "range": "stddev: 0.0000211273179014657",
            "extra": "mean: 104.47965159760064 usec\nrounds: 6880"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5382.9458830619305,
            "unit": "iter/sec",
            "range": "stddev: 0.0002277081006348707",
            "extra": "mean: 185.77188434062046 usec\nrounds: 4911"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2788.9327553323856,
            "unit": "iter/sec",
            "range": "stddev: 0.00001516435225368841",
            "extra": "mean: 358.5600972587164 usec\nrounds: 2663"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1367.8333757977703,
            "unit": "iter/sec",
            "range": "stddev: 0.000018898379905823384",
            "extra": "mean: 731.0831989435582 usec\nrounds: 1327"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 646.3306130227695,
            "unit": "iter/sec",
            "range": "stddev: 0.0000709816198023594",
            "extra": "mean: 1.5471957847133122 msec\nrounds: 641"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 11657.451723921542,
            "unit": "iter/sec",
            "range": "stddev: 0.00001184431999002327",
            "extra": "mean: 85.78204085100016 usec\nrounds: 6389"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7722.026182241845,
            "unit": "iter/sec",
            "range": "stddev: 0.000013174920494390176",
            "extra": "mean: 129.49969041799878 usec\nrounds: 6189"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4526.029810997376,
            "unit": "iter/sec",
            "range": "stddev: 0.000014995739691517801",
            "extra": "mean: 220.94419209749648 usec\nrounds: 4050"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2621.669197461228,
            "unit": "iter/sec",
            "range": "stddev: 0.000016749316396757513",
            "extra": "mean: 381.4363768580643 usec\nrounds: 2420"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1356.4795264405263,
            "unit": "iter/sec",
            "range": "stddev: 0.00002103499362676283",
            "extra": "mean: 737.2024276872447 usec\nrounds: 1293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 11282.13344969207,
            "unit": "iter/sec",
            "range": "stddev: 0.00001269544095730601",
            "extra": "mean: 88.63571809880457 usec\nrounds: 7868"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 7375.728071056775,
            "unit": "iter/sec",
            "range": "stddev: 0.000017043317268081035",
            "extra": "mean: 135.5798356943388 usec\nrounds: 5648"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 4394.45939548947,
            "unit": "iter/sec",
            "range": "stddev: 0.000015175803819008379",
            "extra": "mean: 227.5592763529487 usec\nrounds: 3861"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2536.755072418033,
            "unit": "iter/sec",
            "range": "stddev: 0.000024072637374724718",
            "extra": "mean: 394.20439555751074 usec\nrounds: 2341"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1314.3597424580187,
            "unit": "iter/sec",
            "range": "stddev: 0.000022838470756426036",
            "extra": "mean: 760.8267110569544 usec\nrounds: 1284"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 7971.951735206723,
            "unit": "iter/sec",
            "range": "stddev: 0.000013099717620144689",
            "extra": "mean: 125.43979607699778 usec\nrounds: 6424"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4445.487635261862,
            "unit": "iter/sec",
            "range": "stddev: 0.00001536887744387209",
            "extra": "mean: 224.94720085777382 usec\nrounds: 3500"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 2268.8906845563793,
            "unit": "iter/sec",
            "range": "stddev: 0.00001641883875863507",
            "extra": "mean: 440.7440194482191 usec\nrounds: 2108"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1113.0959273862013,
            "unit": "iter/sec",
            "range": "stddev: 0.00001984387048378048",
            "extra": "mean: 898.3951655884898 usec\nrounds: 1081"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 532.2981089281142,
            "unit": "iter/sec",
            "range": "stddev: 0.00002708977699281864",
            "extra": "mean: 1.8786465388984652 msec\nrounds: 527"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 4849.400535086074,
            "unit": "iter/sec",
            "range": "stddev: 0.00001682571060143995",
            "extra": "mean: 206.21105490562465 usec\nrounds: 3333"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2928.3445407260765,
            "unit": "iter/sec",
            "range": "stddev: 0.00001848801928398833",
            "extra": "mean: 341.4898711857356 usec\nrounds: 2523"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1612.2184505178393,
            "unit": "iter/sec",
            "range": "stddev: 0.000020360297909365174",
            "extra": "mean: 620.2633394245074 usec\nrounds: 1532"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 912.1715745391291,
            "unit": "iter/sec",
            "range": "stddev: 0.000027822186260334232",
            "extra": "mean: 1.0962849840012234 msec\nrounds: 875"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 473.59795989382354,
            "unit": "iter/sec",
            "range": "stddev: 0.000034608709560879506",
            "extra": "mean: 2.111495582084414 msec\nrounds: 469"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 4461.504461855596,
            "unit": "iter/sec",
            "range": "stddev: 0.00004130266606843564",
            "extra": "mean: 224.13963911717963 usec\nrounds: 3630"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2803.8976028769825,
            "unit": "iter/sec",
            "range": "stddev: 0.000019382682874765647",
            "extra": "mean: 356.64640498067206 usec\nrounds: 2410"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1535.560810400754,
            "unit": "iter/sec",
            "range": "stddev: 0.000020521468174113215",
            "extra": "mean: 651.2278727268495 usec\nrounds: 1375"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 866.2298548849419,
            "unit": "iter/sec",
            "range": "stddev: 0.00002497346712975102",
            "extra": "mean: 1.154428001252423 msec\nrounds: 797"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 452.3404399286235,
            "unit": "iter/sec",
            "range": "stddev: 0.00002926441761757659",
            "extra": "mean: 2.21072429464364 msec\nrounds: 448"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4326.523010064527,
            "unit": "iter/sec",
            "range": "stddev: 0.000013891424265912424",
            "extra": "mean: 231.13248159636757 usec\nrounds: 3858"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 2167.1625422589404,
            "unit": "iter/sec",
            "range": "stddev: 0.00003649961534376976",
            "extra": "mean: 461.4328554043993 usec\nrounds: 2137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1064.4590426320428,
            "unit": "iter/sec",
            "range": "stddev: 0.000032997250688162065",
            "extra": "mean: 939.4443186159068 usec\nrounds: 1042"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 519.3861685692042,
            "unit": "iter/sec",
            "range": "stddev: 0.000023531957907324464",
            "extra": "mean: 1.925349692608839 msec\nrounds: 514"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 246.07863495218945,
            "unit": "iter/sec",
            "range": "stddev: 0.0000277198596258134",
            "extra": "mean: 4.0637416580041155 msec\nrounds: 231"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 3348.822046891786,
            "unit": "iter/sec",
            "range": "stddev: 0.000015911309504766733",
            "extra": "mean: 298.6124631280875 usec\nrounds: 2563"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1699.0215264496323,
            "unit": "iter/sec",
            "range": "stddev: 0.000019150822579190047",
            "extra": "mean: 588.574061265518 usec\nrounds: 1616"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 825.6828081665176,
            "unit": "iter/sec",
            "range": "stddev: 0.00009592414856606006",
            "extra": "mean: 1.2111188341447547 msec\nrounds: 820"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 404.0815428371906,
            "unit": "iter/sec",
            "range": "stddev: 0.00003913101370407099",
            "extra": "mean: 2.4747480248136755 msec\nrounds: 403"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 191.19665122719869,
            "unit": "iter/sec",
            "range": "stddev: 0.0000480549273185066",
            "extra": "mean: 5.230217127661413 msec\nrounds: 188"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1198.5065896631886,
            "unit": "iter/sec",
            "range": "stddev: 0.00002459256010144427",
            "extra": "mean: 834.3717161213322 usec\nrounds: 546"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 966.7043733745217,
            "unit": "iter/sec",
            "range": "stddev: 0.000051877558696769165",
            "extra": "mean: 1.0344424081886086 msec\nrounds: 855"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 680.9364131702923,
            "unit": "iter/sec",
            "range": "stddev: 0.00012308121333200103",
            "extra": "mean: 1.4685659052131121 msec\nrounds: 633"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1175.7333383821813,
            "unit": "iter/sec",
            "range": "stddev: 0.00002851029181601858",
            "extra": "mean: 850.5329970280575 usec\nrounds: 1009"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 891.7836799167166,
            "unit": "iter/sec",
            "range": "stddev: 0.000045123051516208605",
            "extra": "mean: 1.1213481727916232 msec\nrounds: 816"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 602.7328337043573,
            "unit": "iter/sec",
            "range": "stddev: 0.00003251517430911153",
            "extra": "mean: 1.6591098809966336 msec\nrounds: 563"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 742.4168800880252,
            "unit": "iter/sec",
            "range": "stddev: 0.00003622722945093357",
            "extra": "mean: 1.3469521327174487 msec\nrounds: 648"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 546.2828153019644,
            "unit": "iter/sec",
            "range": "stddev: 0.000042325912680388424",
            "extra": "mean: 1.8305536472847637 msec\nrounds: 516"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 355.89629532113094,
            "unit": "iter/sec",
            "range": "stddev: 0.00004531599437530575",
            "extra": "mean: 2.809807275733747 msec\nrounds: 272"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.930736376951686,
            "unit": "iter/sec",
            "range": "stddev: 0.000349779716495796",
            "extra": "mean: 168.61312600004416 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.540791350707454,
            "unit": "iter/sec",
            "range": "stddev: 0.00035617682814911264",
            "extra": "mean: 393.5781659999596 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.9991668237614488,
            "unit": "iter/sec",
            "range": "stddev: 0.0007341194379134648",
            "extra": "mean: 1.0008338710000544 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 832.1793479079748,
            "unit": "iter/sec",
            "range": "stddev: 0.00003691195368741603",
            "extra": "mean: 1.2016640433506447 msec\nrounds: 669"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 575.1578047429608,
            "unit": "iter/sec",
            "range": "stddev: 0.000092893363278015",
            "extra": "mean: 1.7386532735079585 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 336.4113650448966,
            "unit": "iter/sec",
            "range": "stddev: 0.00015054265112614116",
            "extra": "mean: 2.972551179614703 msec\nrounds: 206"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 669.023277697089,
            "unit": "iter/sec",
            "range": "stddev: 0.000023458998286827526",
            "extra": "mean: 1.4947163026108725 msec\nrounds: 651"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 304.3249074776289,
            "unit": "iter/sec",
            "range": "stddev: 0.000028777354454452618",
            "extra": "mean: 3.2859617317833587 msec\nrounds: 302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 250.66385539724638,
            "unit": "iter/sec",
            "range": "stddev: 0.00002878994182771195",
            "extra": "mean: 3.989406444001361 msec\nrounds: 250"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 236.0216205324396,
            "unit": "iter/sec",
            "range": "stddev: 0.00003477102193911981",
            "extra": "mean: 4.236899982908797 msec\nrounds: 234"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 114.41819703067523,
            "unit": "iter/sec",
            "range": "stddev: 0.00011537128152682756",
            "extra": "mean: 8.739868534477102 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 90.01069684157453,
            "unit": "iter/sec",
            "range": "stddev: 0.0000643599058385396",
            "extra": "mean: 11.10979067032526 msec\nrounds: 91"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 323.2122028419906,
            "unit": "iter/sec",
            "range": "stddev: 0.000029626832516736532",
            "extra": "mean: 3.093942590060166 msec\nrounds: 322"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 143.81501449999644,
            "unit": "iter/sec",
            "range": "stddev: 0.00005604806952358819",
            "extra": "mean: 6.9533769021038125 msec\nrounds: 143"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 118.36553457579095,
            "unit": "iter/sec",
            "range": "stddev: 0.000041793945973904",
            "extra": "mean: 8.448405218494472 msec\nrounds: 119"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 114.27637604409294,
            "unit": "iter/sec",
            "range": "stddev: 0.00013081253534998817",
            "extra": "mean: 8.750715017547941 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 53.99099732515365,
            "unit": "iter/sec",
            "range": "stddev: 0.00007919303327397511",
            "extra": "mean: 18.521606370366378 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 41.33758296678033,
            "unit": "iter/sec",
            "range": "stddev: 0.00016483265836985094",
            "extra": "mean: 24.191061214285778 msec\nrounds: 42"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 332.31312172946724,
            "unit": "iter/sec",
            "range": "stddev: 0.00003920660941496298",
            "extra": "mean: 3.0092100931665584 msec\nrounds: 322"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 242.8189315982508,
            "unit": "iter/sec",
            "range": "stddev: 0.00004340652638491441",
            "extra": "mean: 4.118295033331758 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 68.5850691107257,
            "unit": "iter/sec",
            "range": "stddev: 0.00006388394777466985",
            "extra": "mean: 14.580432927545372 msec\nrounds: 69"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 164.93195221032252,
            "unit": "iter/sec",
            "range": "stddev: 0.0000856114089335968",
            "extra": "mean: 6.063106551511572 msec\nrounds: 165"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 120.23862714248699,
            "unit": "iter/sec",
            "range": "stddev: 0.00003823361477276735",
            "extra": "mean: 8.316794891669588 msec\nrounds: 120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 27.654200039792137,
            "unit": "iter/sec",
            "range": "stddev: 0.00023074553407114774",
            "extra": "mean: 36.16087243749888 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 81.04199471340702,
            "unit": "iter/sec",
            "range": "stddev: 0.000053269902742707045",
            "extra": "mean: 12.339281671636433 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 58.45281029122057,
            "unit": "iter/sec",
            "range": "stddev: 0.001042024197498574",
            "extra": "mean: 17.107817314819453 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.26698479189141,
            "unit": "iter/sec",
            "range": "stddev: 0.0010686333966464575",
            "extra": "mean: 70.09189500001055 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 38.56489956817534,
            "unit": "iter/sec",
            "range": "stddev: 0.00036061373950934056",
            "extra": "mean: 25.930315162164284 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 21.796699180477496,
            "unit": "iter/sec",
            "range": "stddev: 0.000649120730032164",
            "extra": "mean: 45.87850626922737 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.843369566422841,
            "unit": "iter/sec",
            "range": "stddev: 0.003494772296620541",
            "extra": "mean: 146.1268444285874 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 18.286436635701122,
            "unit": "iter/sec",
            "range": "stddev: 0.00023728287943445512",
            "extra": "mean: 54.68533973686662 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.088316425395,
            "unit": "iter/sec",
            "range": "stddev: 0.0007133617228863571",
            "extra": "mean: 76.40402076921978 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1181.369704799859,
            "unit": "iter/sec",
            "range": "stddev: 0.000012216111116779526",
            "extra": "mean: 846.4750669811823 usec\nrounds: 1060"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 380.71395478280033,
            "unit": "iter/sec",
            "range": "stddev: 0.000052003727539927985",
            "extra": "mean: 2.6266439342117263 msec\nrounds: 380"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 111.87509159086083,
            "unit": "iter/sec",
            "range": "stddev: 0.00006132212504352208",
            "extra": "mean: 8.938540168146694 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 30.284563025160445,
            "unit": "iter/sec",
            "range": "stddev: 0.0006888203488534012",
            "extra": "mean: 33.02012312904099 msec\nrounds: 31"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 8.024577683664054,
            "unit": "iter/sec",
            "range": "stddev: 0.0003024475077324193",
            "extra": "mean: 124.61714988886443 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 384.94664517512973,
            "unit": "iter/sec",
            "range": "stddev: 0.00004492099898581628",
            "extra": "mean: 2.5977626056334495 msec\nrounds: 213"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 319.9968253027913,
            "unit": "iter/sec",
            "range": "stddev: 0.000032403383873169323",
            "extra": "mean: 3.1250310032100095 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 151.78524933236181,
            "unit": "iter/sec",
            "range": "stddev: 0.00035336054532474076",
            "extra": "mean: 6.588255475407333 msec\nrounds: 122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 184.36167765765416,
            "unit": "iter/sec",
            "range": "stddev: 0.00007203989792486136",
            "extra": "mean: 5.424120743015396 msec\nrounds: 179"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.34941929231517044,
            "unit": "iter/sec",
            "range": "stddev: 0.0023348307117969026",
            "extra": "mean: 2.8618912063333255 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}