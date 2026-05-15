window.BENCHMARK_DATA = {
  "lastUpdate": 1778856029169,
  "repoUrl": "https://github.com/trout314/volterra-equation-solvers",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "committer": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "distinct": true,
          "id": "62a5cb893b67c7bdd3d443bc6157a58c45886fc1",
          "message": "Replace SingularMatrixException with bool return for Windows DLL compatibility\n\nWindows DLLs built by LDC cannot reliably unwind D exceptions across the\nextern(C) boundary — the test_vie1_singular_matrix_raises_linalgerror case\nfaulted with an access violation in the .so/.dll on all four Windows Python\nversions. Linux and macOS use DWARF unwinding and worked fine.\n\nReplace the exception with portable bool returns:\n\n- lin_solve_lapack / lin_solve_rt now return bool (true = success)\n- solve_VIE_{1,2}_vec_runtime_impl, solve_VIDE_vec_runtime_impl, and the three\n  dispatch helpers (dispatch_VIE_{1,2}_vec, dispatch_VIDE_vec) propagate the\n  bool back to the extern(C) entry points\n- Vec extern(C) entries map false → return code 2 (Python-side LinAlgError\n  translation in _check_return is unchanged)\n- SingularMatrixException class deleted\n- Scalar extern(C) entries (vie2, vide) lose their dead try/catch — their\n  compile-time impls use the assert-based lin_solve, not lin_solve_lapack\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-05-15T10:32:32-04:00",
          "tree_id": "20503ce50470f2ce6e7214ffd0f374812b4fc8ea",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/62a5cb893b67c7bdd3d443bc6157a58c45886fc1"
        },
        "date": 1778856028423,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16250.749350082056,
            "unit": "iter/sec",
            "range": "stddev: 0.00009817665774827676",
            "extra": "mean: 61.53562389385758 usec\nrounds: 11752"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6270.725723507526,
            "unit": "iter/sec",
            "range": "stddev: 0.000017026858430420632",
            "extra": "mean: 159.47117512271782 usec\nrounds: 5499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1865.4117641654805,
            "unit": "iter/sec",
            "range": "stddev: 0.000021354040328795952",
            "extra": "mean: 536.0746722037345 usec\nrounds: 1806"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 863.6763842951567,
            "unit": "iter/sec",
            "range": "stddev: 0.00003495615750030337",
            "extra": "mean: 1.157841082821891 msec\nrounds: 652"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 494.5446420142653,
            "unit": "iter/sec",
            "range": "stddev: 0.0002180467356493772",
            "extra": "mean: 2.0220621457489263 msec\nrounds: 494"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30016.203992372262,
            "unit": "iter/sec",
            "range": "stddev: 0.000010665365306436846",
            "extra": "mean: 33.31533861690574 usec\nrounds: 17034"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17195.653031880163,
            "unit": "iter/sec",
            "range": "stddev: 0.000011959047266158061",
            "extra": "mean: 58.1542322438138 usec\nrounds: 15755"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6986.664715925755,
            "unit": "iter/sec",
            "range": "stddev: 0.000014508927403776953",
            "extra": "mean: 143.1298109555121 usec\nrounds: 6718"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3552.842890823092,
            "unit": "iter/sec",
            "range": "stddev: 0.000032031205060715355",
            "extra": "mean: 281.4647398518454 usec\nrounds: 3375"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2120.208992278895,
            "unit": "iter/sec",
            "range": "stddev: 0.0000220427947954548",
            "extra": "mean: 471.651617195131 usec\nrounds: 2082"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 23121.02778570857,
            "unit": "iter/sec",
            "range": "stddev: 0.000011909017720199605",
            "extra": "mean: 43.2506724730513 usec\nrounds: 17739"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13266.712220144716,
            "unit": "iter/sec",
            "range": "stddev: 0.000012699203945736714",
            "extra": "mean: 75.37662560295529 usec\nrounds: 12233"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5626.563934222542,
            "unit": "iter/sec",
            "range": "stddev: 0.000018311866620647495",
            "extra": "mean: 177.72836347200882 usec\nrounds: 5530"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 2964.7037566538434,
            "unit": "iter/sec",
            "range": "stddev: 0.00007888757899086508",
            "extra": "mean: 337.3018291475654 usec\nrounds: 3026"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1911.618355411487,
            "unit": "iter/sec",
            "range": "stddev: 0.00002087190346546399",
            "extra": "mean: 523.1169690169376 usec\nrounds: 1872"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1744.6846395385576,
            "unit": "iter/sec",
            "range": "stddev: 0.00002159997915461527",
            "extra": "mean: 573.1694871025429 usec\nrounds: 1667"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 688.4276495997109,
            "unit": "iter/sec",
            "range": "stddev: 0.000025178069379011483",
            "extra": "mean: 1.452585468613084 msec\nrounds: 685"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 237.5549690395453,
            "unit": "iter/sec",
            "range": "stddev: 0.00015792938149606893",
            "extra": "mean: 4.209552020919975 msec\nrounds: 239"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 120.88470921089106,
            "unit": "iter/sec",
            "range": "stddev: 0.00005056778781048923",
            "extra": "mean: 8.272344836065548 msec\nrounds: 122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 73.29318166446636,
            "unit": "iter/sec",
            "range": "stddev: 0.00009065450888096534",
            "extra": "mean: 13.643833945945548 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10256.801803427752,
            "unit": "iter/sec",
            "range": "stddev: 0.000014094581215702908",
            "extra": "mean: 97.49627799825545 usec\nrounds: 7813"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3841.701403580958,
            "unit": "iter/sec",
            "range": "stddev: 0.000019135461693058807",
            "extra": "mean: 260.30133395267836 usec\nrounds: 3767"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1164.3310732757257,
            "unit": "iter/sec",
            "range": "stddev: 0.000026787713439465887",
            "extra": "mean: 858.86224541496 usec\nrounds: 1145"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 548.0423985636496,
            "unit": "iter/sec",
            "range": "stddev: 0.000032554192574280626",
            "extra": "mean: 1.8246763436932518 msec\nrounds: 547"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 316.7175654512226,
            "unit": "iter/sec",
            "range": "stddev: 0.00003937134569918403",
            "extra": "mean: 3.1573872405065866 msec\nrounds: 316"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9384.874569081161,
            "unit": "iter/sec",
            "range": "stddev: 0.000015525603644966276",
            "extra": "mean: 106.55443422702093 usec\nrounds: 7199"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3594.6277047299886,
            "unit": "iter/sec",
            "range": "stddev: 0.00002604016462724902",
            "extra": "mean: 278.19292626164054 usec\nrounds: 3309"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1120.6252813905078,
            "unit": "iter/sec",
            "range": "stddev: 0.000027217709539811034",
            "extra": "mean: 892.3589504951807 usec\nrounds: 1111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 533.0699668076667,
            "unit": "iter/sec",
            "range": "stddev: 0.000032743023660692466",
            "extra": "mean: 1.8759263553874217 msec\nrounds: 529"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 309.80578461243704,
            "unit": "iter/sec",
            "range": "stddev: 0.00003820741227055599",
            "extra": "mean: 3.2278286903228324 msec\nrounds: 310"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3647.713433391793,
            "unit": "iter/sec",
            "range": "stddev: 0.000018753982625650215",
            "extra": "mean: 274.14434227366354 usec\nrounds: 3281"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1018.3155763995402,
            "unit": "iter/sec",
            "range": "stddev: 0.000030147221248980235",
            "extra": "mean: 982.013850299434 usec\nrounds: 1002"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 266.2684461763281,
            "unit": "iter/sec",
            "range": "stddev: 0.00004310228473223221",
            "extra": "mean: 3.7556083507460762 msec\nrounds: 268"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 119.71006366231425,
            "unit": "iter/sec",
            "range": "stddev: 0.00005821892069165997",
            "extra": "mean: 8.353516566667807 msec\nrounds: 120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 67.63383737076208,
            "unit": "iter/sec",
            "range": "stddev: 0.00007420736018605096",
            "extra": "mean: 14.785498485293653 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 994.4365830172517,
            "unit": "iter/sec",
            "range": "stddev: 0.00003625169824402587",
            "extra": "mean: 1.0055945417513386 msec\nrounds: 982"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 300.50223107039267,
            "unit": "iter/sec",
            "range": "stddev: 0.00007499736671330046",
            "extra": "mean: 3.3277623145691386 msec\nrounds: 302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 83.72772130180591,
            "unit": "iter/sec",
            "range": "stddev: 0.00006270845816458889",
            "extra": "mean: 11.943475642856546 msec\nrounds: 84"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 38.76732514369906,
            "unit": "iter/sec",
            "range": "stddev: 0.00009578668321269925",
            "extra": "mean: 25.794918692308393 msec\nrounds: 39"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.22332898694989,
            "unit": "iter/sec",
            "range": "stddev: 0.00006209382851668255",
            "extra": "mean: 44.99775891304249 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}