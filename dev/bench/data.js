window.BENCHMARK_DATA = {
  "lastUpdate": 1787097776923,
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
          "id": "99f0b45d8858803ccc64ea250db700db5c1f22d7",
          "message": "fix: register foreign threads with the D runtime (GC thread-attach hazard)\n\nThe solver entry points allocate from the D GC, and the Python layer calls\nthem from ThreadPoolExecutor worker threads (matrix columns run in\nparallel), but no thread was ever attached to druntime. The stop-the-world\ncollector only suspends and stack-scans registered threads, so a collection\ntriggered mid-solve could free memory whose only references live on an\nunregistered thread's stack, or sweep while sibling threads keep mutating\nthe heap -- rare nondeterministic crashes or corrupted results, made much\nmore likely by the lag-table allocation volume introduced in #1.\n\nEvery entry point now calls ensureThreadAttached(); volterra_rt_init(),\ncalled by _dlang.py at load, initializes druntime explicitly (refcounted\nno-op if the DSO constructor already did) and creates the detach hook.\n\nTwo further druntime races surfaced by the new stress test shaped the\ndesign:\n\n- Attachment is persistent, not per-call: thread_attachThis allocates the\n  Thread object BEFORE registering the thread, so a concurrent collection\n  can free the half-constructed object (reproduced; segfault in\n  _d_dynamic_cast inside the attach path). ensureThreadAttached closes the\n  window with GC.disable around the attach plus a lock shared with\n  volterra_gc_collect.\n- Threads detach at death by instance, not via TLS: pthread key destructors\n  can run after druntime's own TLS is gone, so Thread.getThis() is unusable\n  there; dying pool workers stayed registered and a later suspend-all\n  aborted with ThreadError. The destructor now receives the Thread object\n  as its stored TLS value and calls thread_detachInstance. Windows uses an\n  FlsAlloc callback for the same hook (compile-checked by CI).\n\nAdds volterra_gc_collect / gc_collect_d and tests/test_thread_safety.py:\nforced collections hammer from a foreign thread while matrix columns and\nuser threads solve concurrently across dying thread pools, asserting\nbit-identical results. Both secondary races reproduced deterministically\nunder this test before the fixes.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>",
          "timestamp": "2026-08-18T19:55:38-04:00",
          "tree_id": "9bdaf7a5c4c031c2a3177b42b13c81566a6d6142",
          "url": "https://github.com/trout314/voles/commit/99f0b45d8858803ccc64ea250db700db5c1f22d7"
        },
        "date": 1787097776192,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 9812.778745918758,
            "unit": "iter/sec",
            "range": "stddev: 0.0001017662788068367",
            "extra": "mean: 101.90793310364926 usec\nrounds: 6966"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4367.338898895226,
            "unit": "iter/sec",
            "range": "stddev: 0.000019806617295733982",
            "extra": "mean: 228.97238413372563 usec\nrounds: 4311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1866.4035837752144,
            "unit": "iter/sec",
            "range": "stddev: 0.00002350791256987296",
            "extra": "mean: 535.7897984621733 usec\nrounds: 1821"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 794.0915605223132,
            "unit": "iter/sec",
            "range": "stddev: 0.000033185709181596696",
            "extra": "mean: 1.2593006269229843 msec\nrounds: 780"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 340.4743189150954,
            "unit": "iter/sec",
            "range": "stddev: 0.00010177649687083625",
            "extra": "mean: 2.93707908187158 msec\nrounds: 342"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 21326.616022880597,
            "unit": "iter/sec",
            "range": "stddev: 0.000012734936131792046",
            "extra": "mean: 46.88976436426362 usec\nrounds: 11191"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 10175.5540002237,
            "unit": "iter/sec",
            "range": "stddev: 0.00001265150438978722",
            "extra": "mean: 98.27474749561705 usec\nrounds: 9683"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4660.8405680180185,
            "unit": "iter/sec",
            "range": "stddev: 0.000016714444570719278",
            "extra": "mean: 214.55357363258645 usec\nrounds: 4278"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2028.3451555906306,
            "unit": "iter/sec",
            "range": "stddev: 0.000020637480285223067",
            "extra": "mean: 493.0127386079967 usec\nrounds: 1997"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 869.332066775814,
            "unit": "iter/sec",
            "range": "stddev: 0.00002914660364214799",
            "extra": "mean: 1.1503084243847215 msec\nrounds: 853"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 18897.37640643569,
            "unit": "iter/sec",
            "range": "stddev: 0.000012087368363877107",
            "extra": "mean: 52.91739861092252 usec\nrounds: 16126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 9057.573906346246,
            "unit": "iter/sec",
            "range": "stddev: 0.000013546504573456625",
            "extra": "mean: 110.40484022982619 usec\nrounds: 8700"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 4196.884787065051,
            "unit": "iter/sec",
            "range": "stddev: 0.000022084792364649087",
            "extra": "mean: 238.27196855201643 usec\nrounds: 4102"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1848.4376292750774,
            "unit": "iter/sec",
            "range": "stddev: 0.000024894232505730027",
            "extra": "mean: 540.9974262383856 usec\nrounds: 1837"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 809.2832500655984,
            "unit": "iter/sec",
            "range": "stddev: 0.00002943064547688943",
            "extra": "mean: 1.2356613088420434 msec\nrounds: 803"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2410.2756472742126,
            "unit": "iter/sec",
            "range": "stddev: 0.000023761745961801205",
            "extra": "mean: 414.8903056506847 usec\nrounds: 2336"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 1075.7126733850907,
            "unit": "iter/sec",
            "range": "stddev: 0.00006351624144611956",
            "extra": "mean: 929.6162671888625 usec\nrounds: 1149"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 521.5365080326312,
            "unit": "iter/sec",
            "range": "stddev: 0.00021338118461657868",
            "extra": "mean: 1.9174113117646454 msec\nrounds: 510"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 255.38511679351478,
            "unit": "iter/sec",
            "range": "stddev: 0.00008534611665324988",
            "extra": "mean: 3.9156549628086776 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 118.46278063080912,
            "unit": "iter/sec",
            "range": "stddev: 0.0005921576205990526",
            "extra": "mean: 8.441469925617513 msec\nrounds: 121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 9020.080867320845,
            "unit": "iter/sec",
            "range": "stddev: 0.000014850415057537642",
            "extra": "mean: 110.8637510804292 usec\nrounds: 7404"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3647.138168213865,
            "unit": "iter/sec",
            "range": "stddev: 0.000019029449248060018",
            "extra": "mean: 274.18758321671595 usec\nrounds: 3563"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1553.5496492802959,
            "unit": "iter/sec",
            "range": "stddev: 0.00004336218145121613",
            "extra": "mean: 643.687184676244 usec\nrounds: 1527"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 647.9771966561129,
            "unit": "iter/sec",
            "range": "stddev: 0.00008780028849205393",
            "extra": "mean: 1.5432641845430688 msec\nrounds: 634"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 272.0631946594206,
            "unit": "iter/sec",
            "range": "stddev: 0.00027386970406395703",
            "extra": "mean: 3.675616620071815 msec\nrounds: 279"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 8656.797358533466,
            "unit": "iter/sec",
            "range": "stddev: 0.000013308053411965865",
            "extra": "mean: 115.51616129887189 usec\nrounds: 7452"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3512.6932028373403,
            "unit": "iter/sec",
            "range": "stddev: 0.000018434583366930622",
            "extra": "mean: 284.68185015197474 usec\nrounds: 3290"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1514.502239323178,
            "unit": "iter/sec",
            "range": "stddev: 0.000027393973700708922",
            "extra": "mean: 660.2829457993367 usec\nrounds: 1476"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 634.1748796679959,
            "unit": "iter/sec",
            "range": "stddev: 0.00009408482825385603",
            "extra": "mean: 1.5768521145516223 msec\nrounds: 646"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 266.96289983194544,
            "unit": "iter/sec",
            "range": "stddev: 0.00015391010135084338",
            "extra": "mean: 3.7458388436352217 msec\nrounds: 275"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3816.200164751422,
            "unit": "iter/sec",
            "range": "stddev: 0.00001807956860330989",
            "extra": "mean: 262.04076223164714 usec\nrounds: 3495"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1534.44127112706,
            "unit": "iter/sec",
            "range": "stddev: 0.000024780318406405903",
            "extra": "mean: 651.7030132182848 usec\nrounds: 1513"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 628.630041283613,
            "unit": "iter/sec",
            "range": "stddev: 0.00003353795768970621",
            "extra": "mean: 1.5907607564507718 msec\nrounds: 620"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 261.7226159464072,
            "unit": "iter/sec",
            "range": "stddev: 0.00004969013308558391",
            "extra": "mean: 3.8208390833322925 msec\nrounds: 264"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 109.15834309225257,
            "unit": "iter/sec",
            "range": "stddev: 0.0005543822614713716",
            "extra": "mean: 9.161003837836507 msec\nrounds: 111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1788.714111645699,
            "unit": "iter/sec",
            "range": "stddev: 0.000025332825534642",
            "extra": "mean: 559.0608322980994 usec\nrounds: 1771"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 780.4368274745066,
            "unit": "iter/sec",
            "range": "stddev: 0.00003333816478876615",
            "extra": "mean: 1.281333690051506 msec\nrounds: 784"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 340.06901425638375,
            "unit": "iter/sec",
            "range": "stddev: 0.00010667314195457718",
            "extra": "mean: 2.9405795826081444 msec\nrounds: 345"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 149.31340069245016,
            "unit": "iter/sec",
            "range": "stddev: 0.00005693862668783138",
            "extra": "mean: 6.697322513333954 msec\nrounds: 150"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 65.81243268480921,
            "unit": "iter/sec",
            "range": "stddev: 0.00007396025132236002",
            "extra": "mean: 15.194697402985065 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 811.5622482759474,
            "unit": "iter/sec",
            "range": "stddev: 0.000023742923987989857",
            "extra": "mean: 1.2321913717947857 msec\nrounds: 468"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 471.2019858503804,
            "unit": "iter/sec",
            "range": "stddev: 0.00003522318112183884",
            "extra": "mean: 2.122232142539245 msec\nrounds: 449"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 255.56210281157945,
            "unit": "iter/sec",
            "range": "stddev: 0.00005366726144758688",
            "extra": "mean: 3.912943229839046 msec\nrounds: 248"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 776.0116924299424,
            "unit": "iter/sec",
            "range": "stddev: 0.00002567217632538436",
            "extra": "mean: 1.2886403771426154 msec\nrounds: 700"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 439.42928224373725,
            "unit": "iter/sec",
            "range": "stddev: 0.00016562192704241613",
            "extra": "mean: 2.275679023696314 msec\nrounds: 422"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 237.41768243789312,
            "unit": "iter/sec",
            "range": "stddev: 0.00004350140653258325",
            "extra": "mean: 4.211986191304825 msec\nrounds: 230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 615.3748739713411,
            "unit": "iter/sec",
            "range": "stddev: 0.00003621678902352043",
            "extra": "mean: 1.6250257238266304 msec\nrounds: 554"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 366.6162800954888,
            "unit": "iter/sec",
            "range": "stddev: 0.00008786241670047537",
            "extra": "mean: 2.7276475549300216 msec\nrounds: 355"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 203.40692370071,
            "unit": "iter/sec",
            "range": "stddev: 0.00005235672364084519",
            "extra": "mean: 4.916253497208313 msec\nrounds: 179"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 8.534535092979237,
            "unit": "iter/sec",
            "range": "stddev: 0.0002279577372537252",
            "extra": "mean: 117.1709986666561 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.7428591324006986,
            "unit": "iter/sec",
            "range": "stddev: 0.00016814851453677388",
            "extra": "mean: 267.1754304999965 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.5054313834127975,
            "unit": "iter/sec",
            "range": "stddev: 0.0018781846042997912",
            "extra": "mean: 664.2614276666734 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 500.8630001907537,
            "unit": "iter/sec",
            "range": "stddev: 0.00003440328249194774",
            "extra": "mean: 1.9965539471255611 msec\nrounds: 435"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 274.6491806518905,
            "unit": "iter/sec",
            "range": "stddev: 0.00006199457980927522",
            "extra": "mean: 3.641008495370207 msec\nrounds: 216"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 142.00805131707696,
            "unit": "iter/sec",
            "range": "stddev: 0.00008945594598678755",
            "extra": "mean: 7.041854252102863 msec\nrounds: 119"
          }
        ]
      }
    ]
  }
}