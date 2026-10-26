window.BENCHMARK_DATA = {
  "lastUpdate": 1793041404012,
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
          "id": "d2e3f1446ac46e85e42b4ebcc7b64c740ba1e372",
          "message": "CI: step-level test timeouts; VEH fault logger for the Windows GC hang\n\nThe forced-GC hang wedges the GIL, so pytest-timeout's watchdog thread never\nruns (the 3.12 job on 3c5e541 sat to the 30-minute cancel with\n--timeout=300). Add timeout-minutes: 10 to every \"Run tests\" step.\n\nDiagnostics: volterra_debug_veh.d adds volterra_debug_install_veh(), a\nfirst-in-chain vectored exception handler (Windows only; lock- and\nallocation-free) that at a guard-page fault or access violation dumps the\nfault, VirtualQuery of the region, a module+offset backtrace, and druntime's\nregistered threads (with TEB stack bounds) and StackContext list -- the\nranges the collector scans -- flagging orphan contexts and the one that\ncontains the fault. gc_stress_debug.py installs it per round and symbolizes\nthe backtrace with DbgHelp; the debug workflow builds with -Ddebug=true so\nthe PDB ships next to the DLL.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-10-26T14:55:20-04:00",
          "tree_id": "3cc4412b195e4bdae344c5a87c5c2ef7398bd09b",
          "url": "https://github.com/trout314/voles/commit/d2e3f1446ac46e85e42b4ebcc7b64c740ba1e372"
        },
        "date": 1793041403031,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15107.861814741602,
            "unit": "iter/sec",
            "range": "stddev: 0.000012740165299771155",
            "extra": "mean: 66.19070337433475 usec\nrounds: 7646"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 7816.2495139476905,
            "unit": "iter/sec",
            "range": "stddev: 0.0002818741375670641",
            "extra": "mean: 127.9385974328931 usec\nrounds: 7713"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 4148.322337768466,
            "unit": "iter/sec",
            "range": "stddev: 0.000018294097537635634",
            "extra": "mean: 241.06130589117538 usec\nrounds: 3972"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 2015.0444809659512,
            "unit": "iter/sec",
            "range": "stddev: 0.00003163261700572551",
            "extra": "mean: 496.26696057877115 usec\nrounds: 2004"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 986.3515604334948,
            "unit": "iter/sec",
            "range": "stddev: 0.00004603727836800231",
            "extra": "mean: 1.0138372970794578 msec\nrounds: 993"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 19984.92906100035,
            "unit": "iter/sec",
            "range": "stddev: 0.000007015995985691797",
            "extra": "mean: 50.03770576055999 usec\nrounds: 11110"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 12315.591705751207,
            "unit": "iter/sec",
            "range": "stddev: 0.000010782212598399036",
            "extra": "mean: 81.19788507871807 usec\nrounds: 10294"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7173.0970356758335,
            "unit": "iter/sec",
            "range": "stddev: 0.00001028073626154838",
            "extra": "mean: 139.40979677626544 usec\nrounds: 6328"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4038.292607426431,
            "unit": "iter/sec",
            "range": "stddev: 0.00001249127575243449",
            "extra": "mean: 247.6294060913261 usec\nrounds: 3743"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 2047.2221569206972,
            "unit": "iter/sec",
            "range": "stddev: 0.000025414091629372005",
            "extra": "mean: 488.46677270440307 usec\nrounds: 1993"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 16590.77956893061,
            "unit": "iter/sec",
            "range": "stddev: 0.000020689174692326124",
            "extra": "mean: 60.27444315351463 usec\nrounds: 13255"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 10839.48771686682,
            "unit": "iter/sec",
            "range": "stddev: 0.000009943125053055721",
            "extra": "mean: 92.25528236393927 usec\nrounds: 8613"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6273.285210125398,
            "unit": "iter/sec",
            "range": "stddev: 0.000011791628344856302",
            "extra": "mean: 159.40611123274766 usec\nrounds: 5484"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3461.4187411500966,
            "unit": "iter/sec",
            "range": "stddev: 0.000015210193549289633",
            "extra": "mean: 288.89888071379033 usec\nrounds: 3194"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1783.3349415639145,
            "unit": "iter/sec",
            "range": "stddev: 0.00006874324613940161",
            "extra": "mean: 560.7471578631435 usec\nrounds: 1666"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 12611.066961257327,
            "unit": "iter/sec",
            "range": "stddev: 0.000008468369353181218",
            "extra": "mean: 79.29543178797773 usec\nrounds: 10526"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 6718.977986806017,
            "unit": "iter/sec",
            "range": "stddev: 0.000011992438058045638",
            "extra": "mean: 148.83215899258622 usec\nrounds: 6472"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 3399.9674701025365,
            "unit": "iter/sec",
            "range": "stddev: 0.000016160605394081516",
            "extra": "mean: 294.120461090718 usec\nrounds: 3264"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1656.2915032934488,
            "unit": "iter/sec",
            "range": "stddev: 0.000026897499499203725",
            "extra": "mean: 603.758455568692 usec\nrounds: 1688"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 797.7542342019899,
            "unit": "iter/sec",
            "range": "stddev: 0.00002663190410050613",
            "extra": "mean: 1.2535188873053376 msec\nrounds: 772"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 8700.366273568497,
            "unit": "iter/sec",
            "range": "stddev: 0.000009790806061861902",
            "extra": "mean: 114.93768981174686 usec\nrounds: 4407"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4409.472952735109,
            "unit": "iter/sec",
            "range": "stddev: 0.000028933800862410984",
            "extra": "mean: 226.78447304676624 usec\nrounds: 4211"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 2661.174678398537,
            "unit": "iter/sec",
            "range": "stddev: 0.00001741219998248906",
            "extra": "mean: 375.773904703538 usec\nrounds: 2445"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 1486.1147269933317,
            "unit": "iter/sec",
            "range": "stddev: 0.000020522418250183",
            "extra": "mean: 672.8955590280527 usec\nrounds: 1440"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 750.2372477427264,
            "unit": "iter/sec",
            "range": "stddev: 0.000028834079949965785",
            "extra": "mean: 1.3329116929461267 msec\nrounds: 723"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 8545.723804719935,
            "unit": "iter/sec",
            "range": "stddev: 0.00000986302675779391",
            "extra": "mean: 117.01758948114899 usec\nrounds: 6940"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4337.010180018495,
            "unit": "iter/sec",
            "range": "stddev: 0.00002529091725827801",
            "extra": "mean: 230.5735883690583 usec\nrounds: 3955"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 2604.7671377830884,
            "unit": "iter/sec",
            "range": "stddev: 0.000017839211350228036",
            "extra": "mean: 383.9114773426917 usec\nrounds: 2273"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 1430.6411417123206,
            "unit": "iter/sec",
            "range": "stddev: 0.000022727077381038095",
            "extra": "mean: 698.987307748685 usec\nrounds: 1368"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 727.4978601137192,
            "unit": "iter/sec",
            "range": "stddev: 0.00003282857976922157",
            "extra": "mean: 1.3745744899423957 msec\nrounds: 696"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 6774.110996785161,
            "unit": "iter/sec",
            "range": "stddev: 0.00000985028149796292",
            "extra": "mean: 147.620846554563 usec\nrounds: 5950"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 3256.2429155064506,
            "unit": "iter/sec",
            "range": "stddev: 0.00005851480582183091",
            "extra": "mean: 307.10239559767854 usec\nrounds: 3271"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1572.5565081418167,
            "unit": "iter/sec",
            "range": "stddev: 0.00011585734182148987",
            "extra": "mean: 635.9071962263743 usec\nrounds: 1590"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 766.1383376690368,
            "unit": "iter/sec",
            "range": "stddev: 0.00017454111410130762",
            "extra": "mean: 1.3052473043477806 msec\nrounds: 759"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 371.94752128714515,
            "unit": "iter/sec",
            "range": "stddev: 0.0002868462753885665",
            "extra": "mean: 2.6885513218086365 msec\nrounds: 376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 5048.865537257799,
            "unit": "iter/sec",
            "range": "stddev: 0.000017318379790000243",
            "extra": "mean: 198.06429634945917 usec\nrounds: 3479"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 2506.904674403612,
            "unit": "iter/sec",
            "range": "stddev: 0.00005574907058395737",
            "extra": "mean: 398.8982948615301 usec\nrounds: 2530"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 1238.8116978525934,
            "unit": "iter/sec",
            "range": "stddev: 0.00007316136897226604",
            "extra": "mean: 807.2251834023208 usec\nrounds: 1205"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 585.9555907217937,
            "unit": "iter/sec",
            "range": "stddev: 0.0002141254070265111",
            "extra": "mean: 1.706613975247129 msec\nrounds: 606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 270.1430624473981,
            "unit": "iter/sec",
            "range": "stddev: 0.0005942416796976738",
            "extra": "mean: 3.7017422951393346 msec\nrounds: 288"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 2170.664629671452,
            "unit": "iter/sec",
            "range": "stddev: 0.0000206341721638514",
            "extra": "mean: 460.6883930067807 usec\nrounds: 715"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 1729.2836500726733,
            "unit": "iter/sec",
            "range": "stddev: 0.000023268170113004786",
            "extra": "mean: 578.2741310009927 usec\nrounds: 1458"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 1218.6361076746048,
            "unit": "iter/sec",
            "range": "stddev: 0.000024402250430223336",
            "extra": "mean: 820.5895046948797 usec\nrounds: 852"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 2125.3632852199044,
            "unit": "iter/sec",
            "range": "stddev: 0.000014710083718204686",
            "extra": "mean: 470.50779833930056 usec\nrounds: 1686"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 1594.5310706468056,
            "unit": "iter/sec",
            "range": "stddev: 0.0000810206403058898",
            "extra": "mean: 627.1436276211036 usec\nrounds: 1383"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 1087.6918066388102,
            "unit": "iter/sec",
            "range": "stddev: 0.000021510706577816898",
            "extra": "mean: 919.3780755692223 usec\nrounds: 966"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 1320.7110634415592,
            "unit": "iter/sec",
            "range": "stddev: 0.000027033374131921055",
            "extra": "mean: 757.1678830297385 usec\nrounds: 1043"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 964.5956483987746,
            "unit": "iter/sec",
            "range": "stddev: 0.000022828276831720263",
            "extra": "mean: 1.0367038267900093 msec\nrounds: 866"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 617.9388296536256,
            "unit": "iter/sec",
            "range": "stddev: 0.00003997181112990166",
            "extra": "mean: 1.6182831568628433 msec\nrounds: 510"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 9.83517112138855,
            "unit": "iter/sec",
            "range": "stddev: 0.00006831059568370019",
            "extra": "mean: 101.6759126666642 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 4.271561392139503,
            "unit": "iter/sec",
            "range": "stddev: 0.0019306947420157114",
            "extra": "mean: 234.10643280000443 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.7085969378521042,
            "unit": "iter/sec",
            "range": "stddev: 0.0025200446444171368",
            "extra": "mean: 585.2755426666695 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 1462.8587564172947,
            "unit": "iter/sec",
            "range": "stddev: 0.00012945729733432432",
            "extra": "mean: 683.5929959835031 usec\nrounds: 996"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 1020.2356707138408,
            "unit": "iter/sec",
            "range": "stddev: 0.00009281224678210401",
            "extra": "mean: 980.1656898550879 usec\nrounds: 690"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 600.5868141396905,
            "unit": "iter/sec",
            "range": "stddev: 0.00004989950598196288",
            "extra": "mean: 1.665038220048917 msec\nrounds: 409"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 1022.6694942469903,
            "unit": "iter/sec",
            "range": "stddev: 0.000028341105780044926",
            "extra": "mean: 977.8330199790672 usec\nrounds: 951"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 468.2582787136485,
            "unit": "iter/sec",
            "range": "stddev: 0.00013520978979843313",
            "extra": "mean: 2.135573561554743 msec\nrounds: 463"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 388.7564991545228,
            "unit": "iter/sec",
            "range": "stddev: 0.0000354009289105933",
            "extra": "mean: 2.572304262886471 msec\nrounds: 388"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 366.0618737650721,
            "unit": "iter/sec",
            "range": "stddev: 0.00004750214045052843",
            "extra": "mean: 2.7317786190478035 msec\nrounds: 357"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 176.99775507679465,
            "unit": "iter/sec",
            "range": "stddev: 0.00010228094524030645",
            "extra": "mean: 5.649789171428341 msec\nrounds: 175"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 132.11543784554462,
            "unit": "iter/sec",
            "range": "stddev: 0.0003085058885419607",
            "extra": "mean: 7.569138143939652 msec\nrounds: 132"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 484.23715415290843,
            "unit": "iter/sec",
            "range": "stddev: 0.00007927487688242676",
            "extra": "mean: 2.0651038265523676 msec\nrounds: 467"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 223.00665486276054,
            "unit": "iter/sec",
            "range": "stddev: 0.00007496216596192152",
            "extra": "mean: 4.484171114155338 msec\nrounds: 219"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 179.34679177175505,
            "unit": "iter/sec",
            "range": "stddev: 0.00011212593637882096",
            "extra": "mean: 5.575789731843353 msec\nrounds: 179"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 170.6073117005166,
            "unit": "iter/sec",
            "range": "stddev: 0.0008576708031674128",
            "extra": "mean: 5.86141349999932 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 78.00443637544359,
            "unit": "iter/sec",
            "range": "stddev: 0.0004028445639538471",
            "extra": "mean: 12.81978367469889 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 61.946643721554445,
            "unit": "iter/sec",
            "range": "stddev: 0.000488533618027117",
            "extra": "mean: 16.142924619046763 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 536.7746004483055,
            "unit": "iter/sec",
            "range": "stddev: 0.00019458281047605278",
            "extra": "mean: 1.8629793570053725 msec\nrounds: 521"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 413.4905928214022,
            "unit": "iter/sec",
            "range": "stddev: 0.000044773864124390424",
            "extra": "mean: 2.418434705313664 msec\nrounds: 414"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 115.28293679305207,
            "unit": "iter/sec",
            "range": "stddev: 0.00026704659260642954",
            "extra": "mean: 8.674310594595024 msec\nrounds: 111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 265.5974019978891,
            "unit": "iter/sec",
            "range": "stddev: 0.00004335611292008004",
            "extra": "mean: 3.7650970697670747 msec\nrounds: 258"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 194.55172130438189,
            "unit": "iter/sec",
            "range": "stddev: 0.00023579221322059536",
            "extra": "mean: 5.140021343915383 msec\nrounds: 189"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 53.239765764276704,
            "unit": "iter/sec",
            "range": "stddev: 0.0006030252400716018",
            "extra": "mean: 18.782952660377575 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 125.04550928903019,
            "unit": "iter/sec",
            "range": "stddev: 0.00015537037163202515",
            "extra": "mean: 7.997088465516982 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 94.00242716047953,
            "unit": "iter/sec",
            "range": "stddev: 0.00019029679208445687",
            "extra": "mean: 10.638023189473769 msec\nrounds: 95"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 25.634880601155217,
            "unit": "iter/sec",
            "range": "stddev: 0.0009123352065050096",
            "extra": "mean: 39.00934884615518 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 55.61809319062088,
            "unit": "iter/sec",
            "range": "stddev: 0.00240608809802075",
            "extra": "mean: 17.979760589286695 msec\nrounds: 56"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 43.06825429869895,
            "unit": "iter/sec",
            "range": "stddev: 0.0007607532574704313",
            "extra": "mean: 23.218958285713683 msec\nrounds: 42"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 12.116843582966432,
            "unit": "iter/sec",
            "range": "stddev: 0.0019375440480246032",
            "extra": "mean: 82.5297440833334 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 25.651938311762148,
            "unit": "iter/sec",
            "range": "stddev: 0.0031978508453966077",
            "extra": "mean: 38.98340888888975 msec\nrounds: 27"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 19.182225800725934,
            "unit": "iter/sec",
            "range": "stddev: 0.0014565127799733425",
            "extra": "mean: 52.13159361111034 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1109.5318994767767,
            "unit": "iter/sec",
            "range": "stddev: 0.0000701174958248112",
            "extra": "mean: 901.2809820714223 usec\nrounds: 1004"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 353.71519364160093,
            "unit": "iter/sec",
            "range": "stddev: 0.00004001897740194571",
            "extra": "mean: 2.827133292479491 msec\nrounds: 359"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 102.0251775045157,
            "unit": "iter/sec",
            "range": "stddev: 0.00008557581708614834",
            "extra": "mean: 9.801502182691516 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.91043196293832,
            "unit": "iter/sec",
            "range": "stddev: 0.0002030972410275923",
            "extra": "mean: 35.82889728571307 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.188510416181653,
            "unit": "iter/sec",
            "range": "stddev: 0.005415087771559569",
            "extra": "mean: 139.11087862500082 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 670.1751908286894,
            "unit": "iter/sec",
            "range": "stddev: 0.00003091371070075795",
            "extra": "mean: 1.4921471485142166 msec\nrounds: 404"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 552.3449664525336,
            "unit": "iter/sec",
            "range": "stddev: 0.00006494083125078244",
            "extra": "mean: 1.8104627736947723 msec\nrounds: 517"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 227.10089351951066,
            "unit": "iter/sec",
            "range": "stddev: 0.0003867091406960354",
            "extra": "mean: 4.403329218579618 msec\nrounds: 183"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 304.82160675810127,
            "unit": "iter/sec",
            "range": "stddev: 0.00018834959569100397",
            "extra": "mean: 3.28060733829008 msec\nrounds: 269"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.6028311297276455,
            "unit": "iter/sec",
            "range": "stddev: 0.009534253714143216",
            "extra": "mean: 1.6588393509999928 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}