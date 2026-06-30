window.BENCHMARK_DATA = {
  "lastUpdate": 1782782956735,
  "repoUrl": "https://github.com/trout314/voles",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "atrout@aarons-air.myfiosgateway.com",
            "name": "Aaron Trout"
          },
          "committer": {
            "email": "atrout@aarons-air.myfiosgateway.com",
            "name": "Aaron Trout"
          },
          "distinct": true,
          "id": "43bbbb6a1fed33ceaaf7e1950a2ac1610e5308ee",
          "message": "fix: take real part of Legendre roots in node helpers\n\nradau_iia_nodes and lobatto_nodes derive nodes via np.polynomial.legendre.legroots, whose companion-matrix eigensolver returns a complex-dtype array (tiny imaginary parts) on newer numpy/LAPACK versions. The complex nodes then tripped the callable solver's ComplexWarning guard, failing 3 Radau tests on CI (Linux/macOS/Windows) while passing locally on numpy 1.26.4.\n\nThe Gauss-type quadrature nodes are mathematically real, so take .real.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-29T21:21:35-04:00",
          "tree_id": "3b2ec20fc8af24dd27889cbebfe22484bf63791a",
          "url": "https://github.com/trout314/voles/commit/43bbbb6a1fed33ceaaf7e1950a2ac1610e5308ee"
        },
        "date": 1782782955651,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15556.74311673544,
            "unit": "iter/sec",
            "range": "stddev: 0.0000670631532607419",
            "extra": "mean: 64.28080688201584 usec\nrounds: 11392"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6165.828436179414,
            "unit": "iter/sec",
            "range": "stddev: 0.00001496150722947575",
            "extra": "mean: 162.18420774283473 usec\nrounds: 5786"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1842.343715948884,
            "unit": "iter/sec",
            "range": "stddev: 0.000021407283837847523",
            "extra": "mean: 542.7868813746072 usec\nrounds: 1804"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 498.4671269608028,
            "unit": "iter/sec",
            "range": "stddev: 0.00008073386151766317",
            "extra": "mean: 2.006150347560704 msec\nrounds: 492"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 128.4182359832077,
            "unit": "iter/sec",
            "range": "stddev: 0.00013777855172327665",
            "extra": "mean: 7.7870560387604355 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27366.456850060677,
            "unit": "iter/sec",
            "range": "stddev: 0.000010974523776307056",
            "extra": "mean: 36.541084053333805 usec\nrounds: 17013"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16675.198357738198,
            "unit": "iter/sec",
            "range": "stddev: 0.000012936853601495255",
            "extra": "mean: 59.96930162668475 usec\nrounds: 14508"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6977.908629389807,
            "unit": "iter/sec",
            "range": "stddev: 0.000015753033722164922",
            "extra": "mean: 143.30941448389908 usec\nrounds: 5841"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2196.9997244389506,
            "unit": "iter/sec",
            "range": "stddev: 0.000021078720604680534",
            "extra": "mean: 455.16619272920974 usec\nrounds: 2008"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 599.9468665238617,
            "unit": "iter/sec",
            "range": "stddev: 0.000026015974465558204",
            "extra": "mean: 1.6668142727273119 msec\nrounds: 594"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21858.182414591603,
            "unit": "iter/sec",
            "range": "stddev: 0.000012185980335840297",
            "extra": "mean: 45.7494580762782 usec\nrounds: 16864"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13121.008627834142,
            "unit": "iter/sec",
            "range": "stddev: 0.00001375696407413481",
            "extra": "mean: 76.21365310885159 usec\nrounds: 11580"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5750.190343127584,
            "unit": "iter/sec",
            "range": "stddev: 0.0000166981895809913",
            "extra": "mean: 173.9072865988103 usec\nrounds: 5007"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1954.4043036006562,
            "unit": "iter/sec",
            "range": "stddev: 0.000027872433098718327",
            "extra": "mean: 511.66485775623335 usec\nrounds: 1863"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 562.8662528368616,
            "unit": "iter/sec",
            "range": "stddev: 0.000039074674210490285",
            "extra": "mean: 1.7766209911501571 msec\nrounds: 565"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1717.964096940851,
            "unit": "iter/sec",
            "range": "stddev: 0.000030432845320077577",
            "extra": "mean: 582.0843414485103 usec\nrounds: 1643"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 692.6020448908693,
            "unit": "iter/sec",
            "range": "stddev: 0.000019505781895748408",
            "extra": "mean: 1.443830562408412 msec\nrounds: 681"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.98149841677647,
            "unit": "iter/sec",
            "range": "stddev: 0.00006643954220587779",
            "extra": "mean: 4.115539687242935 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.42753997389899,
            "unit": "iter/sec",
            "range": "stddev: 0.00007890592479971691",
            "extra": "mean: 13.25775705194735 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 21.29968658246976,
            "unit": "iter/sec",
            "range": "stddev: 0.00037383854495755763",
            "extra": "mean: 46.9490476363642 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10097.497477117557,
            "unit": "iter/sec",
            "range": "stddev: 0.000014352897956699537",
            "extra": "mean: 99.03443920299559 usec\nrounds: 8331"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4091.725935196962,
            "unit": "iter/sec",
            "range": "stddev: 0.000016834288136581064",
            "extra": "mean: 244.3956452210095 usec\nrounds: 3777"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1274.7553940613925,
            "unit": "iter/sec",
            "range": "stddev: 0.00003262000663802158",
            "extra": "mean: 784.4642232216668 usec\nrounds: 1223"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 351.4001009924063,
            "unit": "iter/sec",
            "range": "stddev: 0.00002778475769177793",
            "extra": "mean: 2.8457589999998603 msec\nrounds: 349"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 90.1738362590058,
            "unit": "iter/sec",
            "range": "stddev: 0.0007264637398054134",
            "extra": "mean: 11.089691217391549 msec\nrounds: 92"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9313.964676510257,
            "unit": "iter/sec",
            "range": "stddev: 0.000015802750280710117",
            "extra": "mean: 107.36566378891169 usec\nrounds: 8456"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3855.431675043217,
            "unit": "iter/sec",
            "range": "stddev: 0.00002139275176395981",
            "extra": "mean: 259.37432803521034 usec\nrounds: 3649"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1235.864509626871,
            "unit": "iter/sec",
            "range": "stddev: 0.00002085890391292768",
            "extra": "mean: 809.1501877515014 usec\nrounds: 1241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 345.5084789548159,
            "unit": "iter/sec",
            "range": "stddev: 0.000028261408638293772",
            "extra": "mean: 2.894284976811743 msec\nrounds: 345"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 89.23859443411911,
            "unit": "iter/sec",
            "range": "stddev: 0.0006726978084889733",
            "extra": "mean: 11.205913835165294 msec\nrounds: 91"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3928.173926085605,
            "unit": "iter/sec",
            "range": "stddev: 0.000023345188838142058",
            "extra": "mean: 254.57121268469194 usec\nrounds: 3658"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1117.3245817596717,
            "unit": "iter/sec",
            "range": "stddev: 0.000021173618237712332",
            "extra": "mean: 894.9950769230392 usec\nrounds: 1105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.3787111467397,
            "unit": "iter/sec",
            "range": "stddev: 0.00002813221099160813",
            "extra": "mean: 3.396984775510915 msec\nrounds: 294"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.3860446689334,
            "unit": "iter/sec",
            "range": "stddev: 0.00012372061967832256",
            "extra": "mean: 13.265054618419319 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 18.95751964873595,
            "unit": "iter/sec",
            "range": "stddev: 0.00010994996854146697",
            "extra": "mean: 52.74951673684158 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1020.9023180867301,
            "unit": "iter/sec",
            "range": "stddev: 0.000025605036614015408",
            "extra": "mean: 979.5256434269803 usec\nrounds: 1004"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 312.4759010449515,
            "unit": "iter/sec",
            "range": "stddev: 0.00004340382025369815",
            "extra": "mean: 3.200246792331496 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 87.54357600988884,
            "unit": "iter/sec",
            "range": "stddev: 0.00022135625774667055",
            "extra": "mean: 11.422882701148065 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 23.411188795918207,
            "unit": "iter/sec",
            "range": "stddev: 0.0008570680133540077",
            "extra": "mean: 42.71461858333107 msec\nrounds: 24"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.842834602828911,
            "unit": "iter/sec",
            "range": "stddev: 0.0032112057888627745",
            "extra": "mean: 171.14980449999942 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 65.60849161286168,
            "unit": "iter/sec",
            "range": "stddev: 0.00009766838978530493",
            "extra": "mean: 15.241929442620552 msec\nrounds: 61"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 18.01448306792494,
            "unit": "iter/sec",
            "range": "stddev: 0.0002847316593363439",
            "extra": "mean: 55.51089066666116 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 4.724258263626859,
            "unit": "iter/sec",
            "range": "stddev: 0.0007091956278959573",
            "extra": "mean: 211.6734403999942 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 65.88500049878522,
            "unit": "iter/sec",
            "range": "stddev: 0.00022837280088935978",
            "extra": "mean: 15.177961484851746 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 17.836607418844043,
            "unit": "iter/sec",
            "range": "stddev: 0.00041498866414270603",
            "extra": "mean: 56.06447327777807 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 4.636457783938395,
            "unit": "iter/sec",
            "range": "stddev: 0.000953866707219582",
            "extra": "mean: 215.6818947999909 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 64.9869480863369,
            "unit": "iter/sec",
            "range": "stddev: 0.00028478936543570896",
            "extra": "mean: 15.387705215383763 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 17.9172922024736,
            "unit": "iter/sec",
            "range": "stddev: 0.0009121082371998506",
            "extra": "mean: 55.8120048888829 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 4.646724287206411,
            "unit": "iter/sec",
            "range": "stddev: 0.0008275585815035456",
            "extra": "mean: 215.20536579999998 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.2247630081776615,
            "unit": "iter/sec",
            "range": "stddev: 0.0008288916764888001",
            "extra": "mean: 160.64868633332216 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.747334457809918,
            "unit": "iter/sec",
            "range": "stddev: 0.0015432431052507614",
            "extra": "mean: 363.98917400001096 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0810707920141558,
            "unit": "iter/sec",
            "range": "stddev: 0.002142624229897481",
            "extra": "mean: 925.0088036666758 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 38.04783986999003,
            "unit": "iter/sec",
            "range": "stddev: 0.00015848700060556436",
            "extra": "mean: 26.282701026313536 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 10.216085867133469,
            "unit": "iter/sec",
            "range": "stddev: 0.0005682103309416646",
            "extra": "mean: 97.88484679999954 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 2.625199532884595,
            "unit": "iter/sec",
            "range": "stddev: 0.006083270202752163",
            "extra": "mean: 380.9234260000001 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}