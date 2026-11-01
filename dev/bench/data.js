window.BENCHMARK_DATA = {
  "lastUpdate": 1793495945273,
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
          "id": "f0995782a8e21e0e495df1b8f13393777a369355",
          "message": "1.0 API Phase 4: solve_vie1, solve_vie2, solve_vide\n\nThe 1.0 solvers (src/voles/_api.py), one per equation for sampled inputs\n(dt=) and callable inputs (mesh=). Each returns a VolterraSolution, and\nevery parameter is keyword-only.\n\nThe layer validates everything with 1.0 names before calling the engine:\n- regime classification; mixed callable and sampled inputs raise\n  NotImplementedError (reserved);\n- options from the other regime raise ValueError;\n- coll_setting=(divs, choices) | divs | None, with the exact VIE-1 rho\n  rule;\n- samples_per_interval and kernel_interp_degree;\n- shapes, with a 2-D kernel reserved for non-convolution kernels;\n- the matrix rule: inputs without a column axis are shared by every column\n  in every solver (new);\n- uncompiled collocation settings.\n\nSo the engine's 0.10-named checks are never what a 1.0 user sees.\n\nAlso:\n- _migrate.translate / describe map a 0.10 call to its 1.0 equivalent\n  (for Phase 5's deprecation messages).\n- Engine warning texts no longer name 0.10 parameters.\n- The sampled solution builder no longer copies arrays it owns; it still\n  copies the mesh, which may alias the user's array.\n\nTests:\n- test_api.py (104): invalid calls with their exception types, and no\n  0.10 names in any message;\n- test_api_shapes.py (17): matrix columns equal vector solves, including\n  shared inputs;\n- test_api_equivalence.py: all 418 valid battery cases are bitwise\n  identical through the 1.0 API.\n\n1711 tests pass under NumPy 1 and 2. Overhead is about 72 us per call over\nthe 0.10 return_function path.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-10-31T21:12:29-04:00",
          "tree_id": "78d1147b5d21ab5844dffa6a7e5b8598c4818545",
          "url": "https://github.com/trout314/voles/commit/f0995782a8e21e0e495df1b8f13393777a369355"
        },
        "date": 1793495944725,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 8041.83635102583,
            "unit": "iter/sec",
            "range": "stddev: 0.000013648880596064813",
            "extra": "mean: 124.34970774709167 usec\nrounds: 5899"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4791.000558714851,
            "unit": "iter/sec",
            "range": "stddev: 0.00023147439920231095",
            "extra": "mean: 208.7246677901124 usec\nrounds: 4154"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2650.4089372039043,
            "unit": "iter/sec",
            "range": "stddev: 0.000017793677246150582",
            "extra": "mean: 377.3002671259356 usec\nrounds: 2467"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1347.2354187417766,
            "unit": "iter/sec",
            "range": "stddev: 0.000019103137645021466",
            "extra": "mean: 742.2607705295708 usec\nrounds: 1303"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 653.5147877920285,
            "unit": "iter/sec",
            "range": "stddev: 0.000047249735494758624",
            "extra": "mean: 1.5301872561730545 msec\nrounds: 648"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 7874.348249674111,
            "unit": "iter/sec",
            "range": "stddev: 0.000013514407825093593",
            "extra": "mean: 126.99463730746048 usec\nrounds: 5972"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 5699.214574076894,
            "unit": "iter/sec",
            "range": "stddev: 0.000016154268893907193",
            "extra": "mean: 175.46277421252748 usec\nrounds: 5080"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3789.0377454450118,
            "unit": "iter/sec",
            "range": "stddev: 0.000015420564852632436",
            "extra": "mean: 263.91925000012185 usec\nrounds: 3596"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2369.2067107025928,
            "unit": "iter/sec",
            "range": "stddev: 0.000019029839439472493",
            "extra": "mean: 422.08220814276183 usec\nrounds: 2186"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1301.4249505847245,
            "unit": "iter/sec",
            "range": "stddev: 0.000020480759459989956",
            "extra": "mean: 768.3885264000082 usec\nrounds: 1250"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 7297.335242226398,
            "unit": "iter/sec",
            "range": "stddev: 0.000014355412811684181",
            "extra": "mean: 137.03632446724518 usec\nrounds: 6241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 5406.42473963218,
            "unit": "iter/sec",
            "range": "stddev: 0.000014783846367801499",
            "extra": "mean: 184.96511986367426 usec\nrounds: 4989"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3577.5977092770577,
            "unit": "iter/sec",
            "range": "stddev: 0.000023586435399168306",
            "extra": "mean: 279.5171736069998 usec\nrounds: 3410"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2271.735164907934,
            "unit": "iter/sec",
            "range": "stddev: 0.000019490095463704458",
            "extra": "mean: 440.19215595517124 usec\nrounds: 2225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1256.5581883238324,
            "unit": "iter/sec",
            "range": "stddev: 0.000020311984866122482",
            "extra": "mean: 795.8246655763196 usec\nrounds: 1223"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 6261.714542293519,
            "unit": "iter/sec",
            "range": "stddev: 0.000014610522034813966",
            "extra": "mean: 159.70066876183776 usec\nrounds: 5250"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3841.0899881206756,
            "unit": "iter/sec",
            "range": "stddev: 0.00001568997524942362",
            "extra": "mean: 260.3427680925717 usec\nrounds: 3717"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 2122.2713609954394,
            "unit": "iter/sec",
            "range": "stddev: 0.00001615890712948225",
            "extra": "mean: 471.19327828603207 usec\nrounds: 2077"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1081.9314444305103,
            "unit": "iter/sec",
            "range": "stddev: 0.000019356046847790562",
            "extra": "mean: 924.2729797231874 usec\nrounds: 1085"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 525.894403976854,
            "unit": "iter/sec",
            "range": "stddev: 0.000024611681706711726",
            "extra": "mean: 1.901522420542837 msec\nrounds: 516"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3658.4443510810415,
            "unit": "iter/sec",
            "range": "stddev: 0.00001771252739951991",
            "extra": "mean: 273.3402244329636 usec\nrounds: 2865"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2458.579469075615,
            "unit": "iter/sec",
            "range": "stddev: 0.000019179789239361643",
            "extra": "mean: 406.73893708873413 usec\nrounds: 2432"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1467.562587623473,
            "unit": "iter/sec",
            "range": "stddev: 0.0000187826233859078",
            "extra": "mean: 681.4019438989446 usec\nrounds: 1426"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 848.7709498024022,
            "unit": "iter/sec",
            "range": "stddev: 0.00011938122041953759",
            "extra": "mean: 1.1781741590387897 msec\nrounds: 874"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 468.3841534627545,
            "unit": "iter/sec",
            "range": "stddev: 0.000069795344960971",
            "extra": "mean: 2.1349996420822954 msec\nrounds: 461"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 3597.8513186434798,
            "unit": "iter/sec",
            "range": "stddev: 0.0000188751644500924",
            "extra": "mean: 277.9436701061444 usec\nrounds: 3198"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2408.7234311378593,
            "unit": "iter/sec",
            "range": "stddev: 0.00001900725332797235",
            "extra": "mean: 415.1576669504182 usec\nrounds: 2348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1435.8068584549308,
            "unit": "iter/sec",
            "range": "stddev: 0.000020948129991745436",
            "extra": "mean: 696.4725054148984 usec\nrounds: 1385"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 847.8473545675488,
            "unit": "iter/sec",
            "range": "stddev: 0.0000628426504335389",
            "extra": "mean: 1.1794575929414295 msec\nrounds: 850"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 455.4190149543771,
            "unit": "iter/sec",
            "range": "stddev: 0.000026895994053249978",
            "extra": "mean: 2.1957800776065044 msec\nrounds: 451"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3798.701001409906,
            "unit": "iter/sec",
            "range": "stddev: 0.000014383993061952497",
            "extra": "mean: 263.2478838499912 usec\nrounds: 3418"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 2059.161093458532,
            "unit": "iter/sec",
            "range": "stddev: 0.000016537219085961078",
            "extra": "mean: 485.6346612107055 usec\nrounds: 2016"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1035.5881590080708,
            "unit": "iter/sec",
            "range": "stddev: 0.000044502041339883965",
            "extra": "mean: 965.6348339844301 usec\nrounds: 1024"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 509.37187422390485,
            "unit": "iter/sec",
            "range": "stddev: 0.000026051626932256667",
            "extra": "mean: 1.9632022312257262 msec\nrounds: 506"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 240.74733048963844,
            "unit": "iter/sec",
            "range": "stddev: 0.0002196401556175689",
            "extra": "mean: 4.153732454545489 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2930.213879679855,
            "unit": "iter/sec",
            "range": "stddev: 0.000025568792054282045",
            "extra": "mean: 341.2720166724678 usec\nrounds: 2759"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1595.1742297138671,
            "unit": "iter/sec",
            "range": "stddev: 0.00001765295684760861",
            "extra": "mean: 626.8907692793997 usec\nrounds: 1582"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 809.8091393685006,
            "unit": "iter/sec",
            "range": "stddev: 0.000021591546164242566",
            "extra": "mean: 1.2348588715358442 msec\nrounds: 794"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 391.61950052936055,
            "unit": "iter/sec",
            "range": "stddev: 0.00023131397113469566",
            "extra": "mean: 2.5534989923849003 msec\nrounds: 394"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 188.6165397484733,
            "unit": "iter/sec",
            "range": "stddev: 0.000042515203455820776",
            "extra": "mean: 5.301761984041987 msec\nrounds: 188"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 872.4760442007024,
            "unit": "iter/sec",
            "range": "stddev: 0.0001228618038813327",
            "extra": "mean: 1.1461632747935508 msec\nrounds: 484"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 674.4482779625849,
            "unit": "iter/sec",
            "range": "stddev: 0.00002999961536264352",
            "extra": "mean: 1.4826933846148467 msec\nrounds: 650"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 452.57910978369523,
            "unit": "iter/sec",
            "range": "stddev: 0.00003747728487451958",
            "extra": "mean: 2.209558458139922 msec\nrounds: 430"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 874.3665888695626,
            "unit": "iter/sec",
            "range": "stddev: 0.000028389913035575255",
            "extra": "mean: 1.143685054678112 msec\nrounds: 823"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 638.0714862371566,
            "unit": "iter/sec",
            "range": "stddev: 0.00011618042972758322",
            "extra": "mean: 1.5672225159240587 msec\nrounds: 628"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 413.9221144535797,
            "unit": "iter/sec",
            "range": "stddev: 0.00003559840163718423",
            "extra": "mean: 2.4159134413973122 msec\nrounds: 401"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 551.6391755797711,
            "unit": "iter/sec",
            "range": "stddev: 0.00003084136592995464",
            "extra": "mean: 1.8127791575879344 msec\nrounds: 514"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 380.90739220023295,
            "unit": "iter/sec",
            "range": "stddev: 0.00004557201827108365",
            "extra": "mean: 2.6253100372342644 msec\nrounds: 376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 236.15229481400033,
            "unit": "iter/sec",
            "range": "stddev: 0.00005125764376022632",
            "extra": "mean: 4.234555504902572 msec\nrounds: 204"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.348346689209719,
            "unit": "iter/sec",
            "range": "stddev: 0.00042265837919750317",
            "extra": "mean: 186.97366833333717 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.2461886592213336,
            "unit": "iter/sec",
            "range": "stddev: 0.0003402096747030761",
            "extra": "mean: 445.1985793333411 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8559714372420405,
            "unit": "iter/sec",
            "range": "stddev: 0.002371628265995275",
            "extra": "mean: 1.1682632813333385 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 737.4691253370943,
            "unit": "iter/sec",
            "range": "stddev: 0.000032930394079880576",
            "extra": "mean: 1.3559889704438866 msec\nrounds: 609"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 526.5589953575139,
            "unit": "iter/sec",
            "range": "stddev: 0.0000454012087187961",
            "extra": "mean: 1.8991224322756795 msec\nrounds: 347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 316.08075795379443,
            "unit": "iter/sec",
            "range": "stddev: 0.00014447955978676133",
            "extra": "mean: 3.1637484245282113 msec\nrounds: 212"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 662.1728477577146,
            "unit": "iter/sec",
            "range": "stddev: 0.000021923720520172175",
            "extra": "mean: 1.5101797112132487 msec\nrounds: 651"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 309.12670408356473,
            "unit": "iter/sec",
            "range": "stddev: 0.00005014109386075111",
            "extra": "mean: 3.234919490260779 msec\nrounds: 308"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 250.1267383982639,
            "unit": "iter/sec",
            "range": "stddev: 0.00003304386588679681",
            "extra": "mean: 3.9979732131146717 msec\nrounds: 244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 235.09447244249534,
            "unit": "iter/sec",
            "range": "stddev: 0.00003565886795539822",
            "extra": "mean: 4.253609153846024 msec\nrounds: 234"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 113.14424010235594,
            "unit": "iter/sec",
            "range": "stddev: 0.00026960934265439767",
            "extra": "mean: 8.83827580701722 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 84.35552315385874,
            "unit": "iter/sec",
            "range": "stddev: 0.0014964816196083093",
            "extra": "mean: 11.854588325841664 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 323.65596864230537,
            "unit": "iter/sec",
            "range": "stddev: 0.00003944989748850902",
            "extra": "mean: 3.0897004748433026 msec\nrounds: 318"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 145.52522588080413,
            "unit": "iter/sec",
            "range": "stddev: 0.00013450151064186165",
            "extra": "mean: 6.871660868055092 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 117.66651438926814,
            "unit": "iter/sec",
            "range": "stddev: 0.0003004572265123097",
            "extra": "mean: 8.498594567794944 msec\nrounds: 118"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 113.38324671224926,
            "unit": "iter/sec",
            "range": "stddev: 0.00013478309800152533",
            "extra": "mean: 8.81964513274046 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 52.22325295595867,
            "unit": "iter/sec",
            "range": "stddev: 0.0006214973335366404",
            "extra": "mean: 19.1485582264155 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 41.647295096685575,
            "unit": "iter/sec",
            "range": "stddev: 0.0001898273823653137",
            "extra": "mean: 24.01116321428479 msec\nrounds: 42"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 329.5806550901795,
            "unit": "iter/sec",
            "range": "stddev: 0.0002313644398616261",
            "extra": "mean: 3.034158663609613 msec\nrounds: 327"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 248.05422428751254,
            "unit": "iter/sec",
            "range": "stddev: 0.000035779917360904956",
            "extra": "mean: 4.031376618851404 msec\nrounds: 244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 69.84782949811074,
            "unit": "iter/sec",
            "range": "stddev: 0.00031596843749672604",
            "extra": "mean: 14.316837147059069 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 166.54044890433812,
            "unit": "iter/sec",
            "range": "stddev: 0.00015434870335804648",
            "extra": "mean: 6.004547283131237 msec\nrounds: 166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 120.34195250042698,
            "unit": "iter/sec",
            "range": "stddev: 0.00008691052119498293",
            "extra": "mean: 8.3096541083331 msec\nrounds: 120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 28.1205799748348,
            "unit": "iter/sec",
            "range": "stddev: 0.00022515185130730063",
            "extra": "mean: 35.56114421875023 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 81.18032951908316,
            "unit": "iter/sec",
            "range": "stddev: 0.0001457823607572961",
            "extra": "mean: 12.318254999998846 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 59.69643241823421,
            "unit": "iter/sec",
            "range": "stddev: 0.00012852984420777088",
            "extra": "mean: 16.751419799997144 msec\nrounds: 55"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.520770502867299,
            "unit": "iter/sec",
            "range": "stddev: 0.0011522915036808995",
            "extra": "mean: 68.86686899999818 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 38.15814999206392,
            "unit": "iter/sec",
            "range": "stddev: 0.0002696599325034808",
            "extra": "mean: 26.206721243246296 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 24.729237427958328,
            "unit": "iter/sec",
            "range": "stddev: 0.003917170996501813",
            "extra": "mean: 40.43796347999887 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.996298300546567,
            "unit": "iter/sec",
            "range": "stddev: 0.0037958741255599616",
            "extra": "mean: 142.93272771429397 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 17.95416327440845,
            "unit": "iter/sec",
            "range": "stddev: 0.00035438573887428703",
            "extra": "mean: 55.69738810526372 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.541564427855084,
            "unit": "iter/sec",
            "range": "stddev: 0.0006000983428274047",
            "extra": "mean: 73.84671138461621 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1049.8088760265327,
            "unit": "iter/sec",
            "range": "stddev: 0.000014064123500880717",
            "extra": "mean: 952.5543390192541 usec\nrounds: 938"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 342.97351044092386,
            "unit": "iter/sec",
            "range": "stddev: 0.000028799948571239934",
            "extra": "mean: 2.915677069970822 msec\nrounds: 343"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 101.63155750242434,
            "unit": "iter/sec",
            "range": "stddev: 0.00004526526112838611",
            "extra": "mean: 9.83946349514663 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.786189881370998,
            "unit": "iter/sec",
            "range": "stddev: 0.00011053772372613718",
            "extra": "mean: 35.98910121428491 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.23852467770371,
            "unit": "iter/sec",
            "range": "stddev: 0.0006874014213652603",
            "extra": "mean: 138.14969825000745 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 237.3886934757867,
            "unit": "iter/sec",
            "range": "stddev: 0.00003492826652162337",
            "extra": "mean: 4.212500542288879 msec\nrounds: 201"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 209.83763912070668,
            "unit": "iter/sec",
            "range": "stddev: 0.000043484059243306826",
            "extra": "mean: 4.7655892631577 msec\nrounds: 209"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 131.84541080238373,
            "unit": "iter/sec",
            "range": "stddev: 0.0004096324493198292",
            "extra": "mean: 7.584640177570143 msec\nrounds: 107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 115.22060578165954,
            "unit": "iter/sec",
            "range": "stddev: 0.00009219597037717498",
            "extra": "mean: 8.679003145452796 msec\nrounds: 110"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.29143772483135705,
            "unit": "iter/sec",
            "range": "stddev: 0.010200574617262438",
            "extra": "mean: 3.4312647773333347 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}