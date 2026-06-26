window.BENCHMARK_DATA = {
  "lastUpdate": 1782482280796,
  "repoUrl": "https://github.com/trout314/voles",
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
          "id": "d281ae4d8c8a330f84893be7460c3285a96d6036",
          "message": "deps: make scipy a core dependency; recommend pip install voles[full]\n\nscipy moves from the [callable] extra into core dependencies so the\ncallable-input solvers work out of the box. numba stays optional (it is\nthe dependency most likely to break installs on new Python). Adds a\n[full] extra (numba) and documents slimmer install options. Cuts 0.6.0.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-26T09:50:00-04:00",
          "tree_id": "d1acb7252b9acabd0fb652172a01e364ada7ac07",
          "url": "https://github.com/trout314/voles/commit/d281ae4d8c8a330f84893be7460c3285a96d6036"
        },
        "date": 1782482280354,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15500.391254147833,
            "unit": "iter/sec",
            "range": "stddev: 0.00007131711864572323",
            "extra": "mean: 64.51450054413334 usec\nrounds: 11032"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6141.288666839625,
            "unit": "iter/sec",
            "range": "stddev: 0.000015743636633033266",
            "extra": "mean: 162.8322741771738 usec\nrounds: 5894"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1853.7163435600073,
            "unit": "iter/sec",
            "range": "stddev: 0.000018732021637926845",
            "extra": "mean: 539.4568610640448 usec\nrounds: 1785"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 498.4366215723773,
            "unit": "iter/sec",
            "range": "stddev: 0.00002774235652431391",
            "extra": "mean: 2.006273128257273 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 128.27695131410843,
            "unit": "iter/sec",
            "range": "stddev: 0.00014281839938227618",
            "extra": "mean: 7.795632728683471 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27281.005186898437,
            "unit": "iter/sec",
            "range": "stddev: 0.000011271043083906769",
            "extra": "mean: 36.65554084789533 usec\nrounds: 16537"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16681.990392365617,
            "unit": "iter/sec",
            "range": "stddev: 0.000013075013881665131",
            "extra": "mean: 59.94488526127207 usec\nrounds: 14642"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7065.25669179016,
            "unit": "iter/sec",
            "range": "stddev: 0.000015641662776208527",
            "extra": "mean: 141.5376742308601 usec\nrounds: 6566"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2222.186145248395,
            "unit": "iter/sec",
            "range": "stddev: 0.000018414621377789545",
            "extra": "mean: 450.00730570580555 usec\nrounds: 2208"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 610.5380751428835,
            "unit": "iter/sec",
            "range": "stddev: 0.00005972812240302168",
            "extra": "mean: 1.6378994868845342 msec\nrounds: 610"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21629.247535640112,
            "unit": "iter/sec",
            "range": "stddev: 0.000012531700776854862",
            "extra": "mean: 46.23369344459284 usec\nrounds: 16170"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13016.146517438066,
            "unit": "iter/sec",
            "range": "stddev: 0.000013731606105457557",
            "extra": "mean: 76.82765391894401 usec\nrounds: 7923"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5796.813196817518,
            "unit": "iter/sec",
            "range": "stddev: 0.00001706923169029389",
            "extra": "mean: 172.50857773871437 usec\nrounds: 5094"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1970.9766691023412,
            "unit": "iter/sec",
            "range": "stddev: 0.00002424936270300243",
            "extra": "mean: 507.36267743617617 usec\nrounds: 1919"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 572.8696211883362,
            "unit": "iter/sec",
            "range": "stddev: 0.00002933452275869263",
            "extra": "mean: 1.7455978865237136 msec\nrounds: 564"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1720.2103645277793,
            "unit": "iter/sec",
            "range": "stddev: 0.000036168343114707345",
            "extra": "mean: 581.3242499992222 usec\nrounds: 1608"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 699.4502391075598,
            "unit": "iter/sec",
            "range": "stddev: 0.00003846925144092329",
            "extra": "mean: 1.4296942714265373 msec\nrounds: 700"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 245.76246042716969,
            "unit": "iter/sec",
            "range": "stddev: 0.00003546016180885528",
            "extra": "mean: 4.068969680161321 msec\nrounds: 247"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 76.49588431973396,
            "unit": "iter/sec",
            "range": "stddev: 0.000113437598488881",
            "extra": "mean: 13.072598727275917 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 21.64662405744514,
            "unit": "iter/sec",
            "range": "stddev: 0.0001192142461017569",
            "extra": "mean: 46.196580000014364 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 9048.01287673529,
            "unit": "iter/sec",
            "range": "stddev: 0.00001549813047131229",
            "extra": "mean: 110.52150495621538 usec\nrounds: 7567"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3446.590704804089,
            "unit": "iter/sec",
            "range": "stddev: 0.00001779272356562006",
            "extra": "mean: 290.14179101862396 usec\nrounds: 3407"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1029.9112666558767,
            "unit": "iter/sec",
            "range": "stddev: 0.000020148559795402515",
            "extra": "mean: 970.9574333010273 usec\nrounds: 1027"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 279.2903533235436,
            "unit": "iter/sec",
            "range": "stddev: 0.000026418461494991117",
            "extra": "mean: 3.5805031863794845 msec\nrounds: 279"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 72.29833883771671,
            "unit": "iter/sec",
            "range": "stddev: 0.00004447298454868172",
            "extra": "mean: 13.831576438355432 msec\nrounds: 73"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 8243.585697462273,
            "unit": "iter/sec",
            "range": "stddev: 0.000022281990902754868",
            "extra": "mean: 121.30643590056238 usec\nrounds: 7777"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3267.7866315292736,
            "unit": "iter/sec",
            "range": "stddev: 0.000018901915071760957",
            "extra": "mean: 306.0175319745449 usec\nrounds: 3190"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1009.7361012175518,
            "unit": "iter/sec",
            "range": "stddev: 0.000021553848038417177",
            "extra": "mean: 990.3577764469231 usec\nrounds: 1002"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 275.9607123011869,
            "unit": "iter/sec",
            "range": "stddev: 0.000033054881403087546",
            "extra": "mean: 3.6237042282619845 msec\nrounds: 276"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 71.40013398772814,
            "unit": "iter/sec",
            "range": "stddev: 0.000058344788603234854",
            "extra": "mean: 14.005575958329075 msec\nrounds: 72"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3921.9623435025965,
            "unit": "iter/sec",
            "range": "stddev: 0.000016691421357439235",
            "extra": "mean: 254.97440118380322 usec\nrounds: 3719"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1106.3607121711368,
            "unit": "iter/sec",
            "range": "stddev: 0.00006252652970372169",
            "extra": "mean: 903.8643446020303 usec\nrounds: 1065"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.799515056217,
            "unit": "iter/sec",
            "range": "stddev: 0.000034556019026165726",
            "extra": "mean: 3.392135837839843 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.24500054346005,
            "unit": "iter/sec",
            "range": "stddev: 0.00006090581210717747",
            "extra": "mean: 13.289919499999465 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 18.96010322175548,
            "unit": "iter/sec",
            "range": "stddev: 0.00007680937887151511",
            "extra": "mean: 52.74232889473751 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1014.7916918551078,
            "unit": "iter/sec",
            "range": "stddev: 0.000024368684421223998",
            "extra": "mean: 985.4239131303218 usec\nrounds: 990"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 309.8294089005522,
            "unit": "iter/sec",
            "range": "stddev: 0.000027695726734318135",
            "extra": "mean: 3.2275825705137495 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.07619617643802,
            "unit": "iter/sec",
            "range": "stddev: 0.00005123573376165213",
            "extra": "mean: 11.617613747129477 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.70446039825673,
            "unit": "iter/sec",
            "range": "stddev: 0.00014303481158444356",
            "extra": "mean: 44.04420904346975 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.826812433430811,
            "unit": "iter/sec",
            "range": "stddev: 0.00022089442541415262",
            "extra": "mean: 171.6204204999959 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 42.35968537161821,
            "unit": "iter/sec",
            "range": "stddev: 0.0007397021960637154",
            "extra": "mean: 23.607351924998454 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 11.155029889149736,
            "unit": "iter/sec",
            "range": "stddev: 0.0009741207720007473",
            "extra": "mean: 89.6456584999991 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 2.858110695084495,
            "unit": "iter/sec",
            "range": "stddev: 0.0003500962985974665",
            "extra": "mean: 349.8814800000029 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 41.92891765433,
            "unit": "iter/sec",
            "range": "stddev: 0.00017569891146240497",
            "extra": "mean: 23.849888238093595 msec\nrounds: 42"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 10.838063059124737,
            "unit": "iter/sec",
            "range": "stddev: 0.00022236265970197055",
            "extra": "mean: 92.26740927273754 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 2.7468932060991404,
            "unit": "iter/sec",
            "range": "stddev: 0.00047433767466478977",
            "extra": "mean: 364.0476440000005 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 41.22271685468839,
            "unit": "iter/sec",
            "range": "stddev: 0.00009616589938923438",
            "extra": "mean: 24.258469026314717 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 10.736577805856786,
            "unit": "iter/sec",
            "range": "stddev: 0.0005048670484601595",
            "extra": "mean: 93.1395476363522 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 2.7376921146695903,
            "unit": "iter/sec",
            "range": "stddev: 0.0016593398986311442",
            "extra": "mean: 365.27116933333065 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.977385434904593,
            "unit": "iter/sec",
            "range": "stddev: 0.0010457893791435155",
            "extra": "mean: 167.2972256666867 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.4835381817437456,
            "unit": "iter/sec",
            "range": "stddev: 0.0039744497245933425",
            "extra": "mean: 402.6513493333444 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.9392892350392049,
            "unit": "iter/sec",
            "range": "stddev: 0.0017049899551708325",
            "extra": "mean: 1.064634792666671 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}