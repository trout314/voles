window.BENCHMARK_DATA = {
  "lastUpdate": 1787164986674,
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
          "id": "3eabf1be2e7b0a585931f4e52fdf178301c4d057",
          "message": "fix: Windows build broken since the GC thread-attach fix (FlsAlloc attribute mismatch)\n\nThe FlsCallback alias inherits nothrow @nogc from its extern(Windows)\ndeclaration block, so FlsAlloc(&detachThisThread) failed to compile on\nWindows -- ldc2 rejects passing a plain extern(Windows) function where a\nnothrow @nogc callback is expected. Every Windows CI run since 99f0b45\nfailed at this compile step (Linux/macOS were unaffected: the POSIX branch's\npthread_key_create binding takes an unattributed callback, and function\npointers convert covariantly).\n\nMark both platform detach hooks nothrow @nogc; valid since their bodies\nonly null-check, cast, and call thread_detachInstance, which is itself\nnothrow @nogc in druntime.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01CraQZWqxJ5up98AWhv3Sic",
          "timestamp": "2026-08-19T14:25:54-04:00",
          "tree_id": "4c84dc6b2c9734ba62f9e2efa7d3f8dc12484c9c",
          "url": "https://github.com/trout314/voles/commit/3eabf1be2e7b0a585931f4e52fdf178301c4d057"
        },
        "date": 1787164983903,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 9087.848167462951,
            "unit": "iter/sec",
            "range": "stddev: 0.00013918907146205468",
            "extra": "mean: 110.0370496483734 usec\nrounds: 3122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4450.043811177209,
            "unit": "iter/sec",
            "range": "stddev: 0.00003119458245012451",
            "extra": "mean: 224.71688873900354 usec\nrounds: 4449"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2041.9222890573974,
            "unit": "iter/sec",
            "range": "stddev: 0.000044626065469318846",
            "extra": "mean: 489.7346022221175 usec\nrounds: 2069"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 917.9555471509225,
            "unit": "iter/sec",
            "range": "stddev: 0.00007550518157476987",
            "extra": "mean: 1.0893773702917537 msec\nrounds: 929"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 411.99920510487306,
            "unit": "iter/sec",
            "range": "stddev: 0.00018705561223334225",
            "extra": "mean: 2.4271891489340454 msec\nrounds: 423"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 25277.444424531153,
            "unit": "iter/sec",
            "range": "stddev: 0.000013068631669917772",
            "extra": "mean: 39.560961274610655 usec\nrounds: 18515"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 9769.465020691176,
            "unit": "iter/sec",
            "range": "stddev: 0.000027299996846890485",
            "extra": "mean: 102.35975029155193 usec\nrounds: 9427"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4509.671158798064,
            "unit": "iter/sec",
            "range": "stddev: 0.000034727730018729564",
            "extra": "mean: 221.74565833898274 usec\nrounds: 4402"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2011.0571307892271,
            "unit": "iter/sec",
            "range": "stddev: 0.00005011828067675557",
            "extra": "mean: 497.2509157944986 usec\nrounds: 2007"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 895.7202160427915,
            "unit": "iter/sec",
            "range": "stddev: 0.00015761129453376505",
            "extra": "mean: 1.1164200406438372 msec\nrounds: 935"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21483.062361268294,
            "unit": "iter/sec",
            "range": "stddev: 0.000013445229565437825",
            "extra": "mean: 46.54829852390574 usec\nrounds: 18089"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 8868.48708746691,
            "unit": "iter/sec",
            "range": "stddev: 0.00002225660090919626",
            "extra": "mean: 112.7588043075821 usec\nrounds: 8360"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 4074.8564783855463,
            "unit": "iter/sec",
            "range": "stddev: 0.00003693986088177991",
            "extra": "mean: 245.40741626222842 usec\nrounds: 4120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1847.247507444467,
            "unit": "iter/sec",
            "range": "stddev: 0.00004504655221873451",
            "extra": "mean: 541.3459733847077 usec\nrounds: 1841"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 852.4682596585128,
            "unit": "iter/sec",
            "range": "stddev: 0.00005913800639803575",
            "extra": "mean: 1.1730642034702692 msec\nrounds: 865"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2371.0260421529124,
            "unit": "iter/sec",
            "range": "stddev: 0.00003133423969907678",
            "extra": "mean: 421.7583367797982 usec\nrounds: 2224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 1163.3759697229812,
            "unit": "iter/sec",
            "range": "stddev: 0.000041363172762927184",
            "extra": "mean: 859.5673505600397 usec\nrounds: 1161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 567.0271060741137,
            "unit": "iter/sec",
            "range": "stddev: 0.00005418216645805337",
            "extra": "mean: 1.7635841202083455 msec\nrounds: 574"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 273.54677561850866,
            "unit": "iter/sec",
            "range": "stddev: 0.00007866939729112087",
            "extra": "mean: 3.65568191304368 msec\nrounds: 276"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 131.31292741490654,
            "unit": "iter/sec",
            "range": "stddev: 0.00016287459250656085",
            "extra": "mean: 7.615396440293515 msec\nrounds: 134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 11090.994505374298,
            "unit": "iter/sec",
            "range": "stddev: 0.000017512111163899447",
            "extra": "mean: 90.16324005168661 usec\nrounds: 7790"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3647.979482408091,
            "unit": "iter/sec",
            "range": "stddev: 0.0000334593518371147",
            "extra": "mean: 274.12434878605285 usec\nrounds: 3667"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1594.1397563579428,
            "unit": "iter/sec",
            "range": "stddev: 0.000050709429632262735",
            "extra": "mean: 627.2975728832292 usec\nrounds: 1571"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 694.7063997280206,
            "unit": "iter/sec",
            "range": "stddev: 0.00006143286852886091",
            "extra": "mean: 1.4394570143466399 msec\nrounds: 697"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 311.6585195847277,
            "unit": "iter/sec",
            "range": "stddev: 0.00019730472315860017",
            "extra": "mean: 3.2086400247696076 msec\nrounds: 323"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10399.735335669775,
            "unit": "iter/sec",
            "range": "stddev: 0.000019660820324928044",
            "extra": "mean: 96.15629318662819 usec\nrounds: 9482"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3447.5868144031465,
            "unit": "iter/sec",
            "range": "stddev: 0.00004780740177337169",
            "extra": "mean: 290.05796049058216 usec\nrounds: 3341"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1539.3286387823327,
            "unit": "iter/sec",
            "range": "stddev: 0.00005484171512143073",
            "extra": "mean: 649.6338564785216 usec\nrounds: 1505"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 673.6232679336786,
            "unit": "iter/sec",
            "range": "stddev: 0.00006824301899269829",
            "extra": "mean: 1.4845092911761693 msec\nrounds: 680"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 308.87994269924354,
            "unit": "iter/sec",
            "range": "stddev: 0.00009510399168232132",
            "extra": "mean: 3.2375038380970573 msec\nrounds: 315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3646.421736273993,
            "unit": "iter/sec",
            "range": "stddev: 0.0000366104481006593",
            "extra": "mean: 274.2414543145593 usec\nrounds: 3568"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1644.084460876387,
            "unit": "iter/sec",
            "range": "stddev: 0.00006167217467488964",
            "extra": "mean: 608.2412575488642 usec\nrounds: 1689"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 749.0019760512246,
            "unit": "iter/sec",
            "range": "stddev: 0.00007081772503476256",
            "extra": "mean: 1.3351099622888172 msec\nrounds: 769"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 335.5170054038077,
            "unit": "iter/sec",
            "range": "stddev: 0.00009554977945245674",
            "extra": "mean: 2.9804748608687106 msec\nrounds: 345"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 153.32974593534377,
            "unit": "iter/sec",
            "range": "stddev: 0.00016391654255411625",
            "extra": "mean: 6.521891717095005 msec\nrounds: 152"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1767.124021406538,
            "unit": "iter/sec",
            "range": "stddev: 0.00003221194502855419",
            "extra": "mean: 565.8912379019399 usec\nrounds: 1715"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 832.8594261909992,
            "unit": "iter/sec",
            "range": "stddev: 0.000047102746159910975",
            "extra": "mean: 1.2006828145938166 msec\nrounds: 836"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 391.04534009638365,
            "unit": "iter/sec",
            "range": "stddev: 0.00006500033854621304",
            "extra": "mean: 2.557248220253751 msec\nrounds: 395"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 182.19480417350277,
            "unit": "iter/sec",
            "range": "stddev: 0.0001919833293513299",
            "extra": "mean: 5.488630724330137 msec\nrounds: 185"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 84.01146886281323,
            "unit": "iter/sec",
            "range": "stddev: 0.00041097496425313614",
            "extra": "mean: 11.903136720927387 msec\nrounds: 86"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 916.0988921125206,
            "unit": "iter/sec",
            "range": "stddev: 0.00002612746399626144",
            "extra": "mean: 1.0915852083326985 msec\nrounds: 504"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 545.0412069818968,
            "unit": "iter/sec",
            "range": "stddev: 0.0000491341872601865",
            "extra": "mean: 1.8347236634407615 msec\nrounds: 517"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 299.3962538766548,
            "unit": "iter/sec",
            "range": "stddev: 0.00004180309977690178",
            "extra": "mean: 3.3400551511642487 msec\nrounds: 258"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 873.6363686233673,
            "unit": "iter/sec",
            "range": "stddev: 0.000029087215023328906",
            "extra": "mean: 1.14464099242543 msec\nrounds: 792"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 509.45792338443897,
            "unit": "iter/sec",
            "range": "stddev: 0.000036870220671888787",
            "extra": "mean: 1.9628706397513342 msec\nrounds: 483"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 273.47602559344324,
            "unit": "iter/sec",
            "range": "stddev: 0.00029339786006510506",
            "extra": "mean: 3.656627661711841 msec\nrounds: 269"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 683.0729473513014,
            "unit": "iter/sec",
            "range": "stddev: 0.00006922758945183244",
            "extra": "mean: 1.4639724847508921 msec\nrounds: 623"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 416.4844719347871,
            "unit": "iter/sec",
            "range": "stddev: 0.00003841925653189306",
            "extra": "mean: 2.4010499007429487 msec\nrounds: 403"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 232.3069225785866,
            "unit": "iter/sec",
            "range": "stddev: 0.00012552131733026294",
            "extra": "mean: 4.304650024631583 msec\nrounds: 203"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 8.121007692316738,
            "unit": "iter/sec",
            "range": "stddev: 0.00037344686253097865",
            "extra": "mean: 123.13742799998788 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.592764475934135,
            "unit": "iter/sec",
            "range": "stddev: 0.0006033644706077118",
            "extra": "mean: 278.33719874999474 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.4534868341010985,
            "unit": "iter/sec",
            "range": "stddev: 0.0022883365855421224",
            "extra": "mean: 688.00072800002 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 542.1564510932968,
            "unit": "iter/sec",
            "range": "stddev: 0.000030389399213092576",
            "extra": "mean: 1.8444860297861057 msec\nrounds: 470"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 301.6636485444957,
            "unit": "iter/sec",
            "range": "stddev: 0.00006185495766630586",
            "extra": "mean: 3.3149502925689736 msec\nrounds: 229"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 156.9136515011005,
            "unit": "iter/sec",
            "range": "stddev: 0.00014315226944605972",
            "extra": "mean: 6.372931803151535 msec\nrounds: 127"
          }
        ]
      }
    ]
  }
}