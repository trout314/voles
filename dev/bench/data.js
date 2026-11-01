window.BENCHMARK_DATA = {
  "lastUpdate": 1793552221959,
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
          "id": "a05ac02396cff727cebff58f19e4e98277523155",
          "message": "Document the speed-up from declaring a singular kernel's exponent\n\n- Solver and optimal_graded_mesh docstrings, README, home page, Getting\n  Started and the callable-inputs example say that declaring the exponent\n  (kernel_singularity={0.0: alpha}) replaces adaptive quadrature with\n  Gauss-Jacobi rules in the singular blocks, typically 3-10x faster, and\n  that a kernel accepting arrays helps further.\n- New benchmark row \"VIE-2 (weakly singular, exponent declared)\"\n  (test_fn_vie2_sing_fast_*): the existing Abel problem with a vectorised\n  kernel and the declared exponent, 12-20x faster. The benchmarks page\n  explains what the two weakly singular rows measure.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-11-01T11:49:49-05:00",
          "tree_id": "d81934fedcca7c43577606b449c3d0592ce403fa",
          "url": "https://github.com/trout314/voles/commit/a05ac02396cff727cebff58f19e4e98277523155"
        },
        "date": 1793552221061,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 8300.486732667752,
            "unit": "iter/sec",
            "range": "stddev: 0.000012233560957133627",
            "extra": "mean: 120.47486276489751 usec\nrounds: 4904"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5440.874072885392,
            "unit": "iter/sec",
            "range": "stddev: 0.0002513973188052187",
            "extra": "mean: 183.79399828117732 usec\nrounds: 4651"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3290.134184090883,
            "unit": "iter/sec",
            "range": "stddev: 0.000014513927442065222",
            "extra": "mean: 303.9389714970899 usec\nrounds: 2526"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1800.4563467803657,
            "unit": "iter/sec",
            "range": "stddev: 0.000015904143551110495",
            "extra": "mean: 555.4147434833576 usec\nrounds: 1727"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 871.2306209798494,
            "unit": "iter/sec",
            "range": "stddev: 0.00003294923563255192",
            "extra": "mean: 1.147801713942661 msec\nrounds: 832"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 9019.327388078731,
            "unit": "iter/sec",
            "range": "stddev: 0.000010699588871887563",
            "extra": "mean: 110.87301269513145 usec\nrounds: 5514"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7102.3258897950445,
            "unit": "iter/sec",
            "range": "stddev: 0.000013449894942721914",
            "extra": "mean: 140.79894608002246 usec\nrounds: 5063"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4795.944658146953,
            "unit": "iter/sec",
            "range": "stddev: 0.000013067056675873506",
            "extra": "mean: 208.50949526727396 usec\nrounds: 4436"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3058.111865486815,
            "unit": "iter/sec",
            "range": "stddev: 0.000024488083397861804",
            "extra": "mean: 326.999156337537 usec\nrounds: 2904"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1749.1979528214097,
            "unit": "iter/sec",
            "range": "stddev: 0.000022268107046440198",
            "extra": "mean: 571.6905844687427 usec\nrounds: 1622"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 8540.100835981764,
            "unit": "iter/sec",
            "range": "stddev: 0.000011405078241120709",
            "extra": "mean: 117.09463614138237 usec\nrounds: 6093"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6700.19485122506,
            "unit": "iter/sec",
            "range": "stddev: 0.000013546061659056745",
            "extra": "mean: 149.24939083184432 usec\nrounds: 5125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 4580.822406700308,
            "unit": "iter/sec",
            "range": "stddev: 0.000013618377006985173",
            "extra": "mean: 218.30141210829592 usec\nrounds: 4295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2760.4380991535763,
            "unit": "iter/sec",
            "range": "stddev: 0.00003811706392746876",
            "extra": "mean: 362.2613382660624 usec\nrounds: 2838"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1636.1100671259753,
            "unit": "iter/sec",
            "range": "stddev: 0.00006742236413150118",
            "extra": "mean: 611.2058229411305 usec\nrounds: 1395"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 6971.5120472138915,
            "unit": "iter/sec",
            "range": "stddev: 0.000012276644661317476",
            "extra": "mean: 143.4409053914842 usec\nrounds: 6046"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4437.025518082047,
            "unit": "iter/sec",
            "range": "stddev: 0.00002326074033875889",
            "extra": "mean: 225.37621114071507 usec\nrounds: 4021"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 2700.560587220042,
            "unit": "iter/sec",
            "range": "stddev: 0.000027711085987127635",
            "extra": "mean: 370.293488223273 usec\nrounds: 2165"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1373.789527585075,
            "unit": "iter/sec",
            "range": "stddev: 0.00006010853964924919",
            "extra": "mean: 727.9135412815796 usec\nrounds: 1393"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 682.6177138751008,
            "unit": "iter/sec",
            "range": "stddev: 0.00003248039465651987",
            "extra": "mean: 1.464948798827935 msec\nrounds: 686"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 5128.038500318116,
            "unit": "iter/sec",
            "range": "stddev: 0.000013997228405423115",
            "extra": "mean: 195.00633623128323 usec\nrounds: 3792"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3452.0646043925135,
            "unit": "iter/sec",
            "range": "stddev: 0.000020177186861312722",
            "extra": "mean: 289.68171647992017 usec\nrounds: 2670"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 2078.9510678837046,
            "unit": "iter/sec",
            "range": "stddev: 0.000022124354835232618",
            "extra": "mean: 481.0118022729429 usec\nrounds: 1760"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 1218.0327534131666,
            "unit": "iter/sec",
            "range": "stddev: 0.000020888743097286186",
            "extra": "mean: 820.995984876272 usec\nrounds: 1124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 575.2930820278091,
            "unit": "iter/sec",
            "range": "stddev: 0.00016377750311355252",
            "extra": "mean: 1.7382444379048887 msec\nrounds: 612"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 4931.284679931448,
            "unit": "iter/sec",
            "range": "stddev: 0.000014810820174957166",
            "extra": "mean: 202.7869135338383 usec\nrounds: 3805"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2967.732066058024,
            "unit": "iter/sec",
            "range": "stddev: 0.000051314088682527925",
            "extra": "mean: 336.95764231448254 usec\nrounds: 3011"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1927.1971512145058,
            "unit": "iter/sec",
            "range": "stddev: 0.00003053428524785115",
            "extra": "mean: 518.8882722091029 usec\nrounds: 1756"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 1151.8729210144313,
            "unit": "iter/sec",
            "range": "stddev: 0.000052511981637618345",
            "extra": "mean: 868.1513227338655 usec\nrounds: 1100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 592.0292780750301,
            "unit": "iter/sec",
            "range": "stddev: 0.00009381946497890249",
            "extra": "mean: 1.6891056524290107 msec\nrounds: 515"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4160.846456050718,
            "unit": "iter/sec",
            "range": "stddev: 0.000029573832561557415",
            "extra": "mean: 240.33571307246785 usec\nrounds: 4123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 2707.467287483943,
            "unit": "iter/sec",
            "range": "stddev: 0.000018833553881688152",
            "extra": "mean: 369.3488762072183 usec\nrounds: 2593"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1265.5910672913562,
            "unit": "iter/sec",
            "range": "stddev: 0.00006199454486081466",
            "extra": "mean: 790.1446413810587 usec\nrounds: 1305"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 680.7697245781329,
            "unit": "iter/sec",
            "range": "stddev: 0.000025567264948254072",
            "extra": "mean: 1.468925488159291 msec\nrounds: 676"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 283.0765167700439,
            "unit": "iter/sec",
            "range": "stddev: 0.0002281963144946201",
            "extra": "mean: 3.5326137660947206 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 3274.4477107332586,
            "unit": "iter/sec",
            "range": "stddev: 0.000027296116880460013",
            "extra": "mean: 305.39501263743387 usec\nrounds: 2770"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 2012.3726407465829,
            "unit": "iter/sec",
            "range": "stddev: 0.000016770101311018467",
            "extra": "mean: 496.92585744407836 usec\nrounds: 1894"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 1016.8729086882261,
            "unit": "iter/sec",
            "range": "stddev: 0.0000348317244535047",
            "extra": "mean: 983.4070624322245 usec\nrounds: 961"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 456.99334632942737,
            "unit": "iter/sec",
            "range": "stddev: 0.00005695862166299748",
            "extra": "mean: 2.1882156666656187 msec\nrounds: 435"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 226.35653414925807,
            "unit": "iter/sec",
            "range": "stddev: 0.00005414314485563285",
            "extra": "mean: 4.417809292576491 msec\nrounds: 229"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1361.9135745968058,
            "unit": "iter/sec",
            "range": "stddev: 0.000027991639102631934",
            "extra": "mean: 734.2609829673295 usec\nrounds: 646"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 940.8931517323354,
            "unit": "iter/sec",
            "range": "stddev: 0.00015813525589080708",
            "extra": "mean: 1.0628199367365354 msec\nrounds: 901"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 732.9255252568679,
            "unit": "iter/sec",
            "range": "stddev: 0.00009755653827565487",
            "extra": "mean: 1.3643951063780055 msec\nrounds: 611"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1352.2173135471512,
            "unit": "iter/sec",
            "range": "stddev: 0.0000288488029473686",
            "extra": "mean: 739.5261027806167 usec\nrounds: 1080"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 1015.0521295000499,
            "unit": "iter/sec",
            "range": "stddev: 0.00003870017382046783",
            "extra": "mean: 985.1710773638163 usec\nrounds: 879"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 668.0743258375996,
            "unit": "iter/sec",
            "range": "stddev: 0.00003354977021381704",
            "extra": "mean: 1.4968394403515624 msec\nrounds: 570"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 897.9900858348109,
            "unit": "iter/sec",
            "range": "stddev: 0.00006340152676232778",
            "extra": "mean: 1.1135980405288732 msec\nrounds: 765"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 582.422330015714,
            "unit": "iter/sec",
            "range": "stddev: 0.0002489689953305709",
            "extra": "mean: 1.7169671361553387 msec\nrounds: 448"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 409.2952315473112,
            "unit": "iter/sec",
            "range": "stddev: 0.000045582975090912946",
            "extra": "mean: 2.443224164179905 msec\nrounds: 335"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 10.832213899251347,
            "unit": "iter/sec",
            "range": "stddev: 0.0004627055819544545",
            "extra": "mean: 92.31723166665991 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 4.561615565634591,
            "unit": "iter/sec",
            "range": "stddev: 0.0008383955287439602",
            "extra": "mean: 219.22057780002433 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.6857561771082115,
            "unit": "iter/sec",
            "range": "stddev: 0.015943543226725365",
            "extra": "mean: 593.2055973334324 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 1097.6075346342664,
            "unit": "iter/sec",
            "range": "stddev: 0.00003343700486164334",
            "extra": "mean: 911.0724630122094 usec\nrounds: 784"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 689.2722782469073,
            "unit": "iter/sec",
            "range": "stddev: 0.00011294475564418699",
            "extra": "mean: 1.4508054821868024 msec\nrounds: 477"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 392.72186069426766,
            "unit": "iter/sec",
            "range": "stddev: 0.00014800472362673468",
            "extra": "mean: 2.546331386371424 msec\nrounds: 220"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 897.0030168576681,
            "unit": "iter/sec",
            "range": "stddev: 0.000028297662497930603",
            "extra": "mean: 1.1148234523258855 msec\nrounds: 818"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 382.0692726620731,
            "unit": "iter/sec",
            "range": "stddev: 0.0000768819471653321",
            "extra": "mean: 2.6173264157896963 msec\nrounds: 380"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 321.0214570692173,
            "unit": "iter/sec",
            "range": "stddev: 0.00007035391713809939",
            "extra": "mean: 3.1150565732569837 msec\nrounds: 314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 282.86771883115097,
            "unit": "iter/sec",
            "range": "stddev: 0.0003832174504250988",
            "extra": "mean: 3.5352213541090514 msec\nrounds: 305"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 135.39625085257563,
            "unit": "iter/sec",
            "range": "stddev: 0.00011961045866064038",
            "extra": "mean: 7.3857288787769795 msec\nrounds: 132"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 112.30108903552924,
            "unit": "iter/sec",
            "range": "stddev: 0.0007054188430904075",
            "extra": "mean: 8.904633148157851 msec\nrounds: 108"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 420.4156340478979,
            "unit": "iter/sec",
            "range": "stddev: 0.00005158416215807029",
            "extra": "mean: 2.378598508270675 msec\nrounds: 423"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 180.84520851179735,
            "unit": "iter/sec",
            "range": "stddev: 0.00012427606226264593",
            "extra": "mean: 5.529590793304129 msec\nrounds: 179"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 143.7168857053518,
            "unit": "iter/sec",
            "range": "stddev: 0.0004382008690784673",
            "extra": "mean: 6.9581246148778835 msec\nrounds: 148"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 145.26507168137206,
            "unit": "iter/sec",
            "range": "stddev: 0.0005737808632375634",
            "extra": "mean: 6.8839672773743175 msec\nrounds: 137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 69.1990542696559,
            "unit": "iter/sec",
            "range": "stddev: 0.000771537810853761",
            "extra": "mean: 14.451064549281051 msec\nrounds: 71"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 53.452840545155205,
            "unit": "iter/sec",
            "range": "stddev: 0.00025768154559446956",
            "extra": "mean: 18.708079679231133 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 445.24464551281204,
            "unit": "iter/sec",
            "range": "stddev: 0.00006899951990051899",
            "extra": "mean: 2.2459562626480247 msec\nrounds: 415"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 337.9941252521373,
            "unit": "iter/sec",
            "range": "stddev: 0.00007935277532779063",
            "extra": "mean: 2.958631305363721 msec\nrounds: 298"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 87.20346111079652,
            "unit": "iter/sec",
            "range": "stddev: 0.00015965300678670385",
            "extra": "mean: 11.467434746992991 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 219.44106165185434,
            "unit": "iter/sec",
            "range": "stddev: 0.00009263348743924497",
            "extra": "mean: 4.557032273141802 msec\nrounds: 216"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 167.65469745206994,
            "unit": "iter/sec",
            "range": "stddev: 0.00010020850464122486",
            "extra": "mean: 5.964640509317585 msec\nrounds: 161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 43.335583829630565,
            "unit": "iter/sec",
            "range": "stddev: 0.0001910029861860972",
            "extra": "mean: 23.075724650010443 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 107.7973163314037,
            "unit": "iter/sec",
            "range": "stddev: 0.00012413890303598983",
            "extra": "mean: 9.27666878946854 msec\nrounds: 95"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 81.39040468976543,
            "unit": "iter/sec",
            "range": "stddev: 0.0001800847803499814",
            "extra": "mean: 12.286460594607988 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 18.661684511152238,
            "unit": "iter/sec",
            "range": "stddev: 0.001103081892479441",
            "extra": "mean: 53.58573066661797 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 51.792976690758216,
            "unit": "iter/sec",
            "range": "stddev: 0.00021328674449193054",
            "extra": "mean: 19.307637133326555 msec\nrounds: 45"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 36.786772098240185,
            "unit": "iter/sec",
            "range": "stddev: 0.00043796207299583276",
            "extra": "mean: 27.1836843235245 msec\nrounds: 34"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 8.202674697724207,
            "unit": "iter/sec",
            "range": "stddev: 0.0031865519074690853",
            "extra": "mean: 121.91145411111393 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 23.253956529026436,
            "unit": "iter/sec",
            "range": "stddev: 0.003426509350464972",
            "extra": "mean: 43.00343465215321 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 15.557188610931815,
            "unit": "iter/sec",
            "range": "stddev: 0.0030291975521499507",
            "extra": "mean: 64.27896614284886 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1008.863510434893,
            "unit": "iter/sec",
            "range": "stddev: 0.000019692106760103064",
            "extra": "mean: 991.2143611665844 usec\nrounds: 886"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 332.83468905660044,
            "unit": "iter/sec",
            "range": "stddev: 0.00005318515619915936",
            "extra": "mean: 3.004494521993603 msec\nrounds: 341"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 98.52309719630449,
            "unit": "iter/sec",
            "range": "stddev: 0.00019201719231803278",
            "extra": "mean: 10.149904219997552 msec\nrounds: 100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.115943950070143,
            "unit": "iter/sec",
            "range": "stddev: 0.0005316001904172744",
            "extra": "mean: 36.87867189286668 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.215204670065396,
            "unit": "iter/sec",
            "range": "stddev: 0.0005045107092005043",
            "extra": "mean: 138.5962070000346 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 365.49752879973045,
            "unit": "iter/sec",
            "range": "stddev: 0.00005307564328174462",
            "extra": "mean: 2.7359966106581717 msec\nrounds: 244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 299.03586921614016,
            "unit": "iter/sec",
            "range": "stddev: 0.00021384658657717454",
            "extra": "mean: 3.3440804363078263 msec\nrounds: 314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 171.1980680104441,
            "unit": "iter/sec",
            "range": "stddev: 0.0004504747169363533",
            "extra": "mean: 5.841187413043668 msec\nrounds: 92"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 190.39555421459255,
            "unit": "iter/sec",
            "range": "stddev: 0.00007228489197506022",
            "extra": "mean: 5.252223478248404 msec\nrounds: 184"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.5912248267433623,
            "unit": "iter/sec",
            "range": "stddev: 0.00348629487948303",
            "extra": "mean: 1.6914039376666399 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_25",
            "value": 95.06566746530699,
            "unit": "iter/sec",
            "range": "stddev: 0.00005699641276482429",
            "extra": "mean: 10.51904464211475 msec\nrounds: 95"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_50",
            "value": 44.83831031787596,
            "unit": "iter/sec",
            "range": "stddev: 0.00010835826646378425",
            "extra": "mean: 22.30235691110162 msec\nrounds: 45"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_100",
            "value": 21.00667245727239,
            "unit": "iter/sec",
            "range": "stddev: 0.0001745731118326254",
            "extra": "mean: 47.60392213635937 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_200",
            "value": 9.499265601806032,
            "unit": "iter/sec",
            "range": "stddev: 0.0017250744335623636",
            "extra": "mean: 105.27129589995639 msec\nrounds: 10"
          }
        ]
      }
    ]
  }
}