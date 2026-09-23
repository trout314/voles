window.BENCHMARK_DATA = {
  "lastUpdate": 1790121644593,
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
          "id": "c24952c1cac117354caf922e039bb827e1deeb95",
          "message": "VIE-1 product quadrature: strict validation, announced fallback, shared blocks\n\nFollow-ups to the review of #5 (product-integration quadrature for\nsolve_VIE_1).\n\nValidation\n- Non-integer mesh_samples / kernel_interp_degree / coll_divs raise\n  ValueError instead of being int()-truncated into a different method;\n  NumPy integers are accepted everywhere.\n- The collocation path validates its setting once up front with the same\n  ValueError-based checks as the product path (was assert, gone under\n  python -O). solve_VIE_2 / solve_VIDE unchanged.\n- The product path uses the exact rational |rho| <= 1 criterion shared\n  with the collocation path. rho = 1 settings stay admitted and now print\n  a warning that the order drops by one.\n- Matrix g_values must match the kernel length on both paths; shape\n  errors report the kernel shape that was passed, not the truncated one.\n- A D extension without the block drivers now announces the O(M^2) NumPy\n  fallback, and that fallback applies the extension's relative pivot\n  threshold (LinAlgError instead of garbage from np.linalg.solve).\n\nPerformance\n- Matrix-valued g builds the kernel-only lag blocks once\n  (_product.Vie1ProductSetup) and shares them between the column threads\n  (1.9x at d = 8, 8 columns; one copy of the dominant allocation).\n- evaluate_on_grid handles all mesh intervals at once (2.4x end to end\n  for a scalar solve at N = 32001).\n- The D block drivers and the NumPy stepper factor the constant diagonal\n  block once (lu_factor_rt / lu_solve_rt) instead of on every step.\n- _product.py reuses the callable solvers' Lagrange-basis helpers.\n\nResults agree with the merged #5 code to ~1e-12 relative. 17 new tests;\n538 pass. #6 merges on top without conflict and passes its suite.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>",
          "timestamp": "2026-09-22T19:52:29-04:00",
          "tree_id": "0e872e36fc609562f78a952014fb1ec3340c9ce1",
          "url": "https://github.com/trout314/voles/commit/c24952c1cac117354caf922e039bb827e1deeb95"
        },
        "date": 1790121643582,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 9668.195567564211,
            "unit": "iter/sec",
            "range": "stddev: 0.00002125152843575654",
            "extra": "mean: 103.43191684649985 usec\nrounds: 6025"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4402.393974763627,
            "unit": "iter/sec",
            "range": "stddev: 0.00024678322885986166",
            "extra": "mean: 227.14913879412438 usec\nrounds: 4395"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1997.9131880947277,
            "unit": "iter/sec",
            "range": "stddev: 0.0000476164404009091",
            "extra": "mean: 500.52224789287817 usec\nrounds: 2017"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 885.218672077191,
            "unit": "iter/sec",
            "range": "stddev: 0.0000641019367466909",
            "extra": "mean: 1.1296643773379422 msec\nrounds: 909"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 389.80955129005366,
            "unit": "iter/sec",
            "range": "stddev: 0.00011048323424666367",
            "extra": "mean: 2.5653553041236528 msec\nrounds: 388"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 20541.324192518256,
            "unit": "iter/sec",
            "range": "stddev: 0.00001319181801368716",
            "extra": "mean: 48.68235322259452 usec\nrounds: 14631"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 9165.220700910795,
            "unit": "iter/sec",
            "range": "stddev: 0.00001908294251273602",
            "extra": "mean: 109.1081199932943 usec\nrounds: 5967"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4347.527760659223,
            "unit": "iter/sec",
            "range": "stddev: 0.00002810514035233387",
            "extra": "mean: 230.01578254404714 usec\nrounds: 4033"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1915.015212715015,
            "unit": "iter/sec",
            "range": "stddev: 0.00003921132413835677",
            "extra": "mean: 522.1890632305991 usec\nrounds: 1882"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 856.0066235570775,
            "unit": "iter/sec",
            "range": "stddev: 0.00008803207033513649",
            "extra": "mean: 1.1682152596490056 msec\nrounds: 855"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 18511.89021891085,
            "unit": "iter/sec",
            "range": "stddev: 0.000013842847398924492",
            "extra": "mean: 54.01933504221241 usec\nrounds: 15410"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 8374.856507186903,
            "unit": "iter/sec",
            "range": "stddev: 0.000019688549265107676",
            "extra": "mean: 119.4050308971679 usec\nrounds: 8059"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3989.548399066925,
            "unit": "iter/sec",
            "range": "stddev: 0.000028332022074153604",
            "extra": "mean: 250.65493634163704 usec\nrounds: 3723"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1782.8255811907143,
            "unit": "iter/sec",
            "range": "stddev: 0.00003797827237108545",
            "extra": "mean: 560.9073655607519 usec\nrounds: 1748"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 809.4529153136881,
            "unit": "iter/sec",
            "range": "stddev: 0.00006593574837490476",
            "extra": "mean: 1.2354023082521965 msec\nrounds: 824"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2117.799954823458,
            "unit": "iter/sec",
            "range": "stddev: 0.000024164941028570745",
            "extra": "mean: 472.1881298195424 usec\nrounds: 2049"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 1034.4436929494068,
            "unit": "iter/sec",
            "range": "stddev: 0.000035533593576687246",
            "extra": "mean: 966.7031727447619 usec\nrounds: 1042"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 500.45259035719823,
            "unit": "iter/sec",
            "range": "stddev: 0.000051266463430297027",
            "extra": "mean: 1.9981912757934766 msec\nrounds: 504"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 239.56108536585867,
            "unit": "iter/sec",
            "range": "stddev: 0.00008796334925047171",
            "extra": "mean: 4.17430067355387 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 114.50071673747311,
            "unit": "iter/sec",
            "range": "stddev: 0.00009885735059234164",
            "extra": "mean: 8.733569784482631 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10148.491668982351,
            "unit": "iter/sec",
            "range": "stddev: 0.0000168980970074665",
            "extra": "mean: 98.53681045592029 usec\nrounds: 8378"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3587.8871523386874,
            "unit": "iter/sec",
            "range": "stddev: 0.000029705378061683167",
            "extra": "mean: 278.7155664436579 usec\nrounds: 3582"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1565.7247762034076,
            "unit": "iter/sec",
            "range": "stddev: 0.000042714652355048275",
            "extra": "mean: 638.6818521354785 usec\nrounds: 1569"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 654.9682861687157,
            "unit": "iter/sec",
            "range": "stddev: 0.00010406030711045091",
            "extra": "mean: 1.5267914815380943 msec\nrounds: 650"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 295.84839358403957,
            "unit": "iter/sec",
            "range": "stddev: 0.000138532020183493",
            "extra": "mean: 3.3801096158933075 msec\nrounds: 302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9789.700995728916,
            "unit": "iter/sec",
            "range": "stddev: 0.00001858711096099326",
            "extra": "mean: 102.14816575463168 usec\nrounds: 8953"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3477.509524707433,
            "unit": "iter/sec",
            "range": "stddev: 0.00002981055846242318",
            "extra": "mean: 287.56211676634626 usec\nrounds: 3340"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1513.6030944623867,
            "unit": "iter/sec",
            "range": "stddev: 0.000044968827005598525",
            "extra": "mean: 660.6751820596587 usec\nrounds: 1505"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 644.7145190452819,
            "unit": "iter/sec",
            "range": "stddev: 0.00007984760363258003",
            "extra": "mean: 1.5510741118112843 msec\nrounds: 635"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 290.2906084217661,
            "unit": "iter/sec",
            "range": "stddev: 0.0001023313737522502",
            "extra": "mean: 3.444823810996635 msec\nrounds: 291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3710.339782941317,
            "unit": "iter/sec",
            "range": "stddev: 0.000030366811968247237",
            "extra": "mean: 269.51709506434065 usec\nrounds: 3566"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1619.3357643317331,
            "unit": "iter/sec",
            "range": "stddev: 0.00005797735257520385",
            "extra": "mean: 617.5371544472 usec\nrounds: 1664"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 711.7248538015095,
            "unit": "iter/sec",
            "range": "stddev: 0.00007613857387779763",
            "extra": "mean: 1.4050373464671597 msec\nrounds: 736"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 318.2051957245019,
            "unit": "iter/sec",
            "range": "stddev: 0.00005874529388707195",
            "extra": "mean: 3.142626246951001 msec\nrounds: 328"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 139.2194567737356,
            "unit": "iter/sec",
            "range": "stddev: 0.00019303695797169595",
            "extra": "mean: 7.182904050726441 msec\nrounds: 138"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1536.0065943055008,
            "unit": "iter/sec",
            "range": "stddev: 0.00008242516914407602",
            "extra": "mean: 651.0388716476481 usec\nrounds: 1566"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 736.0104696974742,
            "unit": "iter/sec",
            "range": "stddev: 0.000053913928741123385",
            "extra": "mean: 1.3586763248232525 msec\nrounds: 705"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 337.25853178841146,
            "unit": "iter/sec",
            "range": "stddev: 0.00016982037195137646",
            "extra": "mean: 2.965084366278917 msec\nrounds: 344"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 153.73108999412216,
            "unit": "iter/sec",
            "range": "stddev: 0.0005850088652957336",
            "extra": "mean: 6.504865086419635 msec\nrounds: 162"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 71.36728312090166,
            "unit": "iter/sec",
            "range": "stddev: 0.00035716103037181725",
            "extra": "mean: 14.01202282432306 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1005.9030136709771,
            "unit": "iter/sec",
            "range": "stddev: 0.00005000672228316954",
            "extra": "mean: 994.1316274126326 usec\nrounds: 518"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 599.9601511454612,
            "unit": "iter/sec",
            "range": "stddev: 0.00005494782425846248",
            "extra": "mean: 1.6667773652812963 msec\nrounds: 553"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 326.27183470481117,
            "unit": "iter/sec",
            "range": "stddev: 0.00009528976254962743",
            "extra": "mean: 3.0649289752660773 msec\nrounds: 283"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 977.2001368620842,
            "unit": "iter/sec",
            "range": "stddev: 0.000018888655589265627",
            "extra": "mean: 1.0233318255676151 msec\nrounds: 837"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 566.5878681887992,
            "unit": "iter/sec",
            "range": "stddev: 0.00005493245992261378",
            "extra": "mean: 1.7649513096647853 msec\nrounds: 507"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 305.298139690742,
            "unit": "iter/sec",
            "range": "stddev: 0.00004366531153302418",
            "extra": "mean: 3.2754867128013636 msec\nrounds: 289"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 764.4067608896864,
            "unit": "iter/sec",
            "range": "stddev: 0.00004075471824708511",
            "extra": "mean: 1.3082040232560328 msec\nrounds: 645"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 463.9593501555703,
            "unit": "iter/sec",
            "range": "stddev: 0.000034651111012640037",
            "extra": "mean: 2.1553612394376573 msec\nrounds: 426"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 255.55201769287194,
            "unit": "iter/sec",
            "range": "stddev: 0.000050030729838812724",
            "extra": "mean: 3.913097650443215 msec\nrounds: 226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 9.098384792560532,
            "unit": "iter/sec",
            "range": "stddev: 0.0004168671820857523",
            "extra": "mean: 109.9096183333188 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.9554661111279943,
            "unit": "iter/sec",
            "range": "stddev: 0.0009161413177778589",
            "extra": "mean: 252.8147054999863 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.5897484574718548,
            "unit": "iter/sec",
            "range": "stddev: 0.0013144507302844768",
            "extra": "mean: 629.0303319999945 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 609.5204207453223,
            "unit": "iter/sec",
            "range": "stddev: 0.00008843727908205417",
            "extra": "mean: 1.6406341214576514 msec\nrounds: 494"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 329.0342802837354,
            "unit": "iter/sec",
            "range": "stddev: 0.000046376548093933",
            "extra": "mean: 3.0391970074901384 msec\nrounds: 267"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 163.49982714267455,
            "unit": "iter/sec",
            "range": "stddev: 0.00012493525951565903",
            "extra": "mean: 6.116214417323952 msec\nrounds: 127"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 387.59509688728895,
            "unit": "iter/sec",
            "range": "stddev: 0.00009260787498380239",
            "extra": "mean: 2.580011997135237 msec\nrounds: 349"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 155.91897685570103,
            "unit": "iter/sec",
            "range": "stddev: 0.00014063623088717169",
            "extra": "mean: 6.413587493749873 msec\nrounds: 160"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 53.368056989485616,
            "unit": "iter/sec",
            "range": "stddev: 0.00013253822059897718",
            "extra": "mean: 18.737800407405057 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 135.10348220423734,
            "unit": "iter/sec",
            "range": "stddev: 0.00010887906303523212",
            "extra": "mean: 7.401733720588264 msec\nrounds: 136"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 55.37895903251396,
            "unit": "iter/sec",
            "range": "stddev: 0.00036398798207007177",
            "extra": "mean: 18.05739973214163 msec\nrounds: 56"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 31.16767949271366,
            "unit": "iter/sec",
            "range": "stddev: 0.00009811487653505693",
            "extra": "mean: 32.084518843752186 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 169.27574255150728,
            "unit": "iter/sec",
            "range": "stddev: 0.0003224217473381044",
            "extra": "mean: 5.907520976880191 msec\nrounds: 173"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 66.09587072637932,
            "unit": "iter/sec",
            "range": "stddev: 0.00017562679037820748",
            "extra": "mean: 15.129538184612993 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 25.014843132513025,
            "unit": "iter/sec",
            "range": "stddev: 0.0003207289034948171",
            "extra": "mean: 39.97626508000167 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 58.721778269816284,
            "unit": "iter/sec",
            "range": "stddev: 0.0004476301472781497",
            "extra": "mean: 17.029457033899337 msec\nrounds: 59"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 23.69699175605677,
            "unit": "iter/sec",
            "range": "stddev: 0.0007627182775650361",
            "extra": "mean: 42.19944920833285 msec\nrounds: 24"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 13.608083712662735,
            "unit": "iter/sec",
            "range": "stddev: 0.005881943955878728",
            "extra": "mean: 73.4857325333375 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 298.286809321175,
            "unit": "iter/sec",
            "range": "stddev: 0.00007175387871299141",
            "extra": "mean: 3.3524781141873015 msec\nrounds: 289"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 181.43503607449716,
            "unit": "iter/sec",
            "range": "stddev: 0.00008420225178637812",
            "extra": "mean: 5.511614634283757 msec\nrounds: 175"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 62.692363741885366,
            "unit": "iter/sec",
            "range": "stddev: 0.0015790104307751578",
            "extra": "mean: 15.95090598461341 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 131.52824652840837,
            "unit": "iter/sec",
            "range": "stddev: 0.00011342482888129101",
            "extra": "mean: 7.60292960937492 msec\nrounds: 128"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 81.77905694939572,
            "unit": "iter/sec",
            "range": "stddev: 0.00009223189587192991",
            "extra": "mean: 12.228069597559587 msec\nrounds: 82"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 28.412325288264324,
            "unit": "iter/sec",
            "range": "stddev: 0.0014066258280101866",
            "extra": "mean: 35.19599293103436 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 58.827515051793256,
            "unit": "iter/sec",
            "range": "stddev: 0.00013640865727092684",
            "extra": "mean: 16.99884822807107 msec\nrounds: 57"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 35.97731594058105,
            "unit": "iter/sec",
            "range": "stddev: 0.001551539039759666",
            "extra": "mean: 27.795291945946357 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 12.847702981963842,
            "unit": "iter/sec",
            "range": "stddev: 0.0023924739958949017",
            "extra": "mean: 77.83492515384602 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 26.393863112448102,
            "unit": "iter/sec",
            "range": "stddev: 0.001004058726259882",
            "extra": "mean: 37.8875951481453 msec\nrounds: 27"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 16.556519316983632,
            "unit": "iter/sec",
            "range": "stddev: 0.004930295591040369",
            "extra": "mean: 60.399168500000044 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 5.737571807934354,
            "unit": "iter/sec",
            "range": "stddev: 0.005493851675004623",
            "extra": "mean: 174.28975766667065 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 11.326012604634357,
            "unit": "iter/sec",
            "range": "stddev: 0.0029012640131925345",
            "extra": "mean: 88.29232625000098 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 7.334404345839817,
            "unit": "iter/sec",
            "range": "stddev: 0.0035902409812130455",
            "extra": "mean: 136.34372375000225 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 895.8810746119174,
            "unit": "iter/sec",
            "range": "stddev: 0.000017962771417553014",
            "extra": "mean: 1.1162195835347737 msec\nrounds: 826"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 284.78461661052603,
            "unit": "iter/sec",
            "range": "stddev: 0.00010283815434312322",
            "extra": "mean: 3.511425623693744 msec\nrounds: 287"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 82.74384973041634,
            "unit": "iter/sec",
            "range": "stddev: 0.0002618972867772406",
            "extra": "mean: 12.085490380953397 msec\nrounds: 84"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 22.448812422879737,
            "unit": "iter/sec",
            "range": "stddev: 0.00038290626713415613",
            "extra": "mean: 44.54578626087161 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 5.907105043302315,
            "unit": "iter/sec",
            "range": "stddev: 0.0007269465833939779",
            "extra": "mean: 169.28766166666284 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 143.47426495534023,
            "unit": "iter/sec",
            "range": "stddev: 0.00006253191118594592",
            "extra": "mean: 6.969891083333124 msec\nrounds: 120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 133.388508074965,
            "unit": "iter/sec",
            "range": "stddev: 0.00004607121383926336",
            "extra": "mean: 7.496897704545845 msec\nrounds: 132"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 75.17728724035707,
            "unit": "iter/sec",
            "range": "stddev: 0.0005258823618363603",
            "extra": "mean: 13.301889928573729 msec\nrounds: 56"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 113.71181551017798,
            "unit": "iter/sec",
            "range": "stddev: 0.0000787799217817881",
            "extra": "mean: 8.794160883927608 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.5703083312852133,
            "unit": "iter/sec",
            "range": "stddev: 0.019538121499206584",
            "extra": "mean: 1.7534374743333292 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}