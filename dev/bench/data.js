window.BENCHMARK_DATA = {
  "lastUpdate": 1790122713257,
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
          "id": "29f81f62909d391fcf5e9f1aca3f130fa23b453f",
          "message": "VIE-2/VIDE product quadrature: fix matrix-path bugs, one validation policy\n\nFollow-ups to the review of #6 (product-integration quadrature for\nsolve_VIE_2 and solve_VIDE), plus cleanup deferred from the #4/#5 rounds.\n\nBugs\n- solve_VIDE with matrix-valued soln_init_value and a shared 2-D g failed\n  whenever the kernel was truncated: the shared g was forwarded at its\n  original length while the kernel and a were truncated, so every column\n  raised ValueError. Both quadratures (the flaw predates #6).\n- The VIDE matrix path sliced a_values without validation and solved the\n  wrong model for a mismatched a; it now checks a and g like the\n  single-column path.\n- A D extension predating one lag-block driver silently dropped the\n  others to the O(M^2) NumPy stepper; drivers are now gated one by one\n  (_dlang.have_block_driver), and the fallback warning names the missing\n  driver.\n\nValidation\n- All three array-input solvers raise ValueError for bad input\n  (solve_VIE_2 / solve_VIDE used assert), with one policy: g_values and\n  a_values must have the kernel's untruncated length on every path and\n  both quadratures (the VIDE product path also accepted a pre-truncated\n  g). Messages report the kernel shape that was passed.\n- The three quadrature dispatch blocks and the three product paths share\n  one implementation (_use_product_quadrature, _product_mesh_setup,\n  _check_series); the VIE-1 product path is retrofitted onto #6's\n  helpers, and the temporary wrappers kept for the stack are removed.\n\nPerformance\n- _product.ProductSetup builds the kernel-only blocks once per solve for\n  all four equation kinds and shares them between matrix columns\n  (VIE-2 d=8, 8 columns: 0.67 s -> 0.34 s); the second-kind transform is\n  applied in place instead of in a second full-size copy; a_values=None\n  no longer materialises a dense zero array.\n\nAlso: LinAlgError from a second-kind product solve names solve_VIE_2;\nthe VIDE NumPy fallback applies the extension's pivot threshold;\ndocstring blank lines before \"Returns\" restored.\n\nResults are bitwise identical to the merged #6 code. 17 new tests; 614\npass.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>",
          "timestamp": "2026-09-22T20:09:55-04:00",
          "tree_id": "bce8326514909cc8b849299e8adb73d852a80a0c",
          "url": "https://github.com/trout314/voles/commit/29f81f62909d391fcf5e9f1aca3f130fa23b453f"
        },
        "date": 1790122712543,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7207.899333993942,
            "unit": "iter/sec",
            "range": "stddev: 0.000025684405266679963",
            "extra": "mean: 138.73667675737278 usec\nrounds: 4096"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3566.1817495883183,
            "unit": "iter/sec",
            "range": "stddev: 0.00002450956359559735",
            "extra": "mean: 280.4119560410628 usec\nrounds: 3526"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1620.4045997846115,
            "unit": "iter/sec",
            "range": "stddev: 0.0005484517286198507",
            "extra": "mean: 617.129820621913 usec\nrounds: 1639"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 758.6595098960227,
            "unit": "iter/sec",
            "range": "stddev: 0.0000402467466291112",
            "extra": "mean: 1.318114367454583 msec\nrounds: 762"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 341.28364153418846,
            "unit": "iter/sec",
            "range": "stddev: 0.00010386442138378459",
            "extra": "mean: 2.9301140702339348 msec\nrounds: 299"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 13750.25900681631,
            "unit": "iter/sec",
            "range": "stddev: 0.000012783234000595545",
            "extra": "mean: 72.72590279966927 usec\nrounds: 7716"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 6696.949771720767,
            "unit": "iter/sec",
            "range": "stddev: 0.00001763965310033259",
            "extra": "mean: 149.32171123975027 usec\nrounds: 6379"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3378.669920570591,
            "unit": "iter/sec",
            "range": "stddev: 0.000027341304408321326",
            "extra": "mean: 295.9744584434338 usec\nrounds: 3405"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1597.0713716724244,
            "unit": "iter/sec",
            "range": "stddev: 0.000030317923990393165",
            "extra": "mean: 626.1460932411668 usec\nrounds: 1598"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 746.5737196327276,
            "unit": "iter/sec",
            "range": "stddev: 0.00004218569505201269",
            "extra": "mean: 1.3394524528561544 msec\nrounds: 753"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 12072.543774735064,
            "unit": "iter/sec",
            "range": "stddev: 0.000014507081366191024",
            "extra": "mean: 82.83258430528618 usec\nrounds: 10118"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6008.236726109313,
            "unit": "iter/sec",
            "range": "stddev: 0.000019464025048816058",
            "extra": "mean: 166.43818237960122 usec\nrounds: 4858"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3097.2554434975327,
            "unit": "iter/sec",
            "range": "stddev: 0.00002454127718495004",
            "extra": "mean: 322.86649204198795 usec\nrounds: 3016"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1462.5617807397307,
            "unit": "iter/sec",
            "range": "stddev: 0.00003708545237857548",
            "extra": "mean: 683.7318007135552 usec\nrounds: 1400"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 691.8309236213817,
            "unit": "iter/sec",
            "range": "stddev: 0.00007984107585731156",
            "extra": "mean: 1.4454398695645325 msec\nrounds: 690"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2000.1160490896248,
            "unit": "iter/sec",
            "range": "stddev: 0.000021939643448857",
            "extra": "mean: 499.97098941092 usec\nrounds: 1700"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 994.5566506554496,
            "unit": "iter/sec",
            "range": "stddev: 0.000036878561726583835",
            "extra": "mean: 1.0054731415661067 msec\nrounds: 996"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 482.64056526321616,
            "unit": "iter/sec",
            "range": "stddev: 0.00012101790507581278",
            "extra": "mean: 2.0719352494845378 msec\nrounds: 485"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 234.19794300328894,
            "unit": "iter/sec",
            "range": "stddev: 0.00019629282682274708",
            "extra": "mean: 4.269892327730465 msec\nrounds: 238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 113.21742024301538,
            "unit": "iter/sec",
            "range": "stddev: 0.00008888711408982571",
            "extra": "mean: 8.832563026551492 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 6966.004270903704,
            "unit": "iter/sec",
            "range": "stddev: 0.000018916765662511288",
            "extra": "mean: 143.55431910613362 usec\nrounds: 5998"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2739.088729647145,
            "unit": "iter/sec",
            "range": "stddev: 0.00003003789165598488",
            "extra": "mean: 365.08492374718435 usec\nrounds: 2754"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1198.3745709105895,
            "unit": "iter/sec",
            "range": "stddev: 0.00013698669484618977",
            "extra": "mean: 834.463634554717 usec\nrounds: 1256"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 549.2920616821503,
            "unit": "iter/sec",
            "range": "stddev: 0.00019356645146229194",
            "extra": "mean: 1.8205251263555549 msec\nrounds: 554"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 251.5113743758093,
            "unit": "iter/sec",
            "range": "stddev: 0.0004710121178683992",
            "extra": "mean: 3.9759633236538874 msec\nrounds: 241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 6551.197475825379,
            "unit": "iter/sec",
            "range": "stddev: 0.000029920803590570173",
            "extra": "mean: 152.6438492642158 usec\nrounds: 5367"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2617.8738465359083,
            "unit": "iter/sec",
            "range": "stddev: 0.00004988608844598393",
            "extra": "mean: 381.98937711351 usec\nrounds: 2543"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1221.154528768334,
            "unit": "iter/sec",
            "range": "stddev: 0.00006647613972774361",
            "extra": "mean: 818.8971800388013 usec\nrounds: 1022"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 537.7177406566137,
            "unit": "iter/sec",
            "range": "stddev: 0.00023427905971765698",
            "extra": "mean: 1.8597117491025827 msec\nrounds: 558"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 248.8819555374085,
            "unit": "iter/sec",
            "range": "stddev: 0.0003824639185857109",
            "extra": "mean: 4.017969072288545 msec\nrounds: 249"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2917.8597048406414,
            "unit": "iter/sec",
            "range": "stddev: 0.000026969837837351003",
            "extra": "mean: 342.71695734412117 usec\nrounds: 2696"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1342.8352299146163,
            "unit": "iter/sec",
            "range": "stddev: 0.00005249847208398271",
            "extra": "mean: 744.6930030749824 usec\nrounds: 1301"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 615.0726495544656,
            "unit": "iter/sec",
            "range": "stddev: 0.00005931032302479173",
            "extra": "mean: 1.6258242025951906 msec\nrounds: 617"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 274.0923964721131,
            "unit": "iter/sec",
            "range": "stddev: 0.00014285747701904268",
            "extra": "mean: 3.6484047455207054 msec\nrounds: 279"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 124.61782082593686,
            "unit": "iter/sec",
            "range": "stddev: 0.00013924855149127077",
            "extra": "mean: 8.024534479677474 msec\nrounds: 123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1392.7338109437771,
            "unit": "iter/sec",
            "range": "stddev: 0.00004822763783850162",
            "extra": "mean: 718.0122950575577 usec\nrounds: 1376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 667.4613893795323,
            "unit": "iter/sec",
            "range": "stddev: 0.000054752809793268995",
            "extra": "mean: 1.498214002954678 msec\nrounds: 677"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 314.18872695896266,
            "unit": "iter/sec",
            "range": "stddev: 0.00006883080194244225",
            "extra": "mean: 3.182800381410927 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 147.0945337326556,
            "unit": "iter/sec",
            "range": "stddev: 0.00021363560967973397",
            "extra": "mean: 6.798349161074201 msec\nrounds: 149"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 64.96783872129757,
            "unit": "iter/sec",
            "range": "stddev: 0.0007874696723642246",
            "extra": "mean: 15.392231289851772 msec\nrounds: 69"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 541.1278242326881,
            "unit": "iter/sec",
            "range": "stddev: 0.00004248386142140074",
            "extra": "mean: 1.847992202984547 msec\nrounds: 335"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 321.7093743146389,
            "unit": "iter/sec",
            "range": "stddev: 0.00004855188143240611",
            "extra": "mean: 3.108395588814822 msec\nrounds: 304"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 175.75214622119208,
            "unit": "iter/sec",
            "range": "stddev: 0.00010362536448325511",
            "extra": "mean: 5.689830943751062 msec\nrounds: 160"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 524.6111907746266,
            "unit": "iter/sec",
            "range": "stddev: 0.00004245142734299433",
            "extra": "mean: 1.906173595960519 msec\nrounds: 495"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 305.2773770293801,
            "unit": "iter/sec",
            "range": "stddev: 0.000056605185877872885",
            "extra": "mean: 3.275709486667135 msec\nrounds: 300"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 165.37903094304198,
            "unit": "iter/sec",
            "range": "stddev: 0.00008797039688091832",
            "extra": "mean: 6.046715803676519 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 420.4345063440982,
            "unit": "iter/sec",
            "range": "stddev: 0.00004466586907154382",
            "extra": "mean: 2.3784917386908417 msec\nrounds: 398"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 252.64816513606812,
            "unit": "iter/sec",
            "range": "stddev: 0.00006269522182567776",
            "extra": "mean: 3.958073471309132 msec\nrounds: 244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 141.12679400860168,
            "unit": "iter/sec",
            "range": "stddev: 0.0001233436741865888",
            "extra": "mean: 7.085826664063877 msec\nrounds: 128"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.657013602140736,
            "unit": "iter/sec",
            "range": "stddev: 0.0005999072639885081",
            "extra": "mean: 176.77171566665115 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.4701314850249165,
            "unit": "iter/sec",
            "range": "stddev: 0.0007491802067574542",
            "extra": "mean: 404.83674899998806 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.9779715790877548,
            "unit": "iter/sec",
            "range": "stddev: 0.003773038188948632",
            "extra": "mean: 1.0225246023333245 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 331.8041900233917,
            "unit": "iter/sec",
            "range": "stddev: 0.00004287411793139365",
            "extra": "mean: 3.013825714284987 msec\nrounds: 280"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 183.60175870194712,
            "unit": "iter/sec",
            "range": "stddev: 0.00008377293477592734",
            "extra": "mean: 5.44657092105183 msec\nrounds: 152"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 93.76864290786914,
            "unit": "iter/sec",
            "range": "stddev: 0.0002921812145772453",
            "extra": "mean: 10.664545939760842 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 340.4592323378904,
            "unit": "iter/sec",
            "range": "stddev: 0.00006473516794727285",
            "extra": "mean: 2.9372092309940507 msec\nrounds: 342"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 141.77251085634433,
            "unit": "iter/sec",
            "range": "stddev: 0.00008562970499578796",
            "extra": "mean: 7.05355356944537 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 52.38543264861623,
            "unit": "iter/sec",
            "range": "stddev: 0.00010631612263186253",
            "extra": "mean: 19.089276339620252 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 116.56498272063786,
            "unit": "iter/sec",
            "range": "stddev: 0.00020252263189793048",
            "extra": "mean: 8.578905745618489 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 49.549155825896804,
            "unit": "iter/sec",
            "range": "stddev: 0.0005500926521899356",
            "extra": "mean: 20.181978549013973 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 28.668155364479933,
            "unit": "iter/sec",
            "range": "stddev: 0.0032625401524993356",
            "extra": "mean: 34.881909466662364 msec\nrounds: 30"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 148.62186585517276,
            "unit": "iter/sec",
            "range": "stddev: 0.00019759726300529198",
            "extra": "mean: 6.728485033113956 msec\nrounds: 151"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 60.8214219483508,
            "unit": "iter/sec",
            "range": "stddev: 0.0005264417540333004",
            "extra": "mean: 16.44157548386807 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 24.22665064313941,
            "unit": "iter/sec",
            "range": "stddev: 0.0010084567720303095",
            "extra": "mean: 41.27685723999093 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 51.966536143174736,
            "unit": "iter/sec",
            "range": "stddev: 0.0003932304129634853",
            "extra": "mean: 19.24315288678981 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 21.44337426324936,
            "unit": "iter/sec",
            "range": "stddev: 0.0013263584006279173",
            "extra": "mean: 46.63445163636611 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 13.271576026071834,
            "unit": "iter/sec",
            "range": "stddev: 0.0018413090614042477",
            "extra": "mean: 75.34900135714955 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 238.50668595023106,
            "unit": "iter/sec",
            "range": "stddev: 0.00017154724450911432",
            "extra": "mean: 4.192754580509617 msec\nrounds: 236"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 148.40432507380655,
            "unit": "iter/sec",
            "range": "stddev: 0.00043654968477046846",
            "extra": "mean: 6.738348087245206 msec\nrounds: 149"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 51.166663227803355,
            "unit": "iter/sec",
            "range": "stddev: 0.00031333377954455966",
            "extra": "mean: 19.543975254900186 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 108.70113571817643,
            "unit": "iter/sec",
            "range": "stddev: 0.000186943340335895",
            "extra": "mean: 9.199535896226937 msec\nrounds: 106"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 65.85596654729036,
            "unit": "iter/sec",
            "range": "stddev: 0.0009347767904790311",
            "extra": "mean: 15.184652999996779 msec\nrounds: 70"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 22.91460181041644,
            "unit": "iter/sec",
            "range": "stddev: 0.0023518888656375156",
            "extra": "mean: 43.64029574999743 msec\nrounds: 24"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 49.78356584378049,
            "unit": "iter/sec",
            "range": "stddev: 0.00016056590048477376",
            "extra": "mean: 20.08695004166583 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 32.001039073735335,
            "unit": "iter/sec",
            "range": "stddev: 0.0006451630343881527",
            "extra": "mean: 31.248985312503308 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 10.402921091972688,
            "unit": "iter/sec",
            "range": "stddev: 0.003861830068407425",
            "extra": "mean: 96.12684660000355 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 21.36211961303696,
            "unit": "iter/sec",
            "range": "stddev: 0.0029240104265695213",
            "extra": "mean: 46.811834130435074 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 14.069574057787072,
            "unit": "iter/sec",
            "range": "stddev: 0.002498489202853963",
            "extra": "mean: 71.07535707141973 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 4.733929084990389,
            "unit": "iter/sec",
            "range": "stddev: 0.007496161553344466",
            "extra": "mean: 211.2410182000076 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 10.039022040073794,
            "unit": "iter/sec",
            "range": "stddev: 0.0029395953014524513",
            "extra": "mean: 99.61129640000763 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 6.407589984394813,
            "unit": "iter/sec",
            "range": "stddev: 0.002125028626503262",
            "extra": "mean: 156.0649171428606 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1060.261285499186,
            "unit": "iter/sec",
            "range": "stddev: 0.00007008997154573854",
            "extra": "mean: 943.1637405577682 usec\nrounds: 1006"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 331.38223526983666,
            "unit": "iter/sec",
            "range": "stddev: 0.00010065474451902173",
            "extra": "mean: 3.0176632708923696 msec\nrounds: 347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 99.27880037321935,
            "unit": "iter/sec",
            "range": "stddev: 0.0001186680174939093",
            "extra": "mean: 10.072643869997364 msec\nrounds: 100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.101092298009156,
            "unit": "iter/sec",
            "range": "stddev: 0.00024023528576136503",
            "extra": "mean: 36.89888174999721 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.16619291592378,
            "unit": "iter/sec",
            "range": "stddev: 0.0010144044522329126",
            "extra": "mean: 139.54410824999286 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 80.8477803923658,
            "unit": "iter/sec",
            "range": "stddev: 0.00036271189918327617",
            "extra": "mean: 12.368923366193325 msec\nrounds: 71"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 75.8825236850932,
            "unit": "iter/sec",
            "range": "stddev: 0.0001534245848951715",
            "extra": "mean: 13.178264921049875 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 43.18186844656231,
            "unit": "iter/sec",
            "range": "stddev: 0.0006799983763841843",
            "extra": "mean: 23.15786778048993 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 65.77416016427584,
            "unit": "iter/sec",
            "range": "stddev: 0.0001419047157185674",
            "extra": "mean: 15.203538859370092 msec\nrounds: 64"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.3495976339942507,
            "unit": "iter/sec",
            "range": "stddev: 0.0032202214283135995",
            "extra": "mean: 2.8604312580000055 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}