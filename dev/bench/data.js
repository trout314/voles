window.BENCHMARK_DATA = {
  "lastUpdate": 1773005126144,
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
          "id": "cdb7abe3415ae6ef0ba4367a9c64135fcca35b13",
          "message": "Remove redundant results_vec.png benchmark chart\n\nThe combined 2×3 chart (results.png) now covers both scalar and vector\nsolvers, making this file obsolete.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T17:18:10-04:00",
          "tree_id": "41ffd190c7304032d6bb438f299ba4c968400d52",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/cdb7abe3415ae6ef0ba4367a9c64135fcca35b13"
        },
        "date": 1773005125734,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16410.994303657426,
            "unit": "iter/sec",
            "range": "stddev: 0.00009548536871084946",
            "extra": "mean: 60.9347600454127 usec\nrounds: 10602"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6314.199339168953,
            "unit": "iter/sec",
            "range": "stddev: 0.00001576963793903742",
            "extra": "mean: 158.3732071613082 usec\nrounds: 6116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1838.6531624302295,
            "unit": "iter/sec",
            "range": "stddev: 0.00006375888563812228",
            "extra": "mean: 543.8763658276124 usec\nrounds: 1867"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 870.643219052413,
            "unit": "iter/sec",
            "range": "stddev: 0.000030258188254338314",
            "extra": "mean: 1.1485761080048102 msec\nrounds: 787"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 501.76395317652606,
            "unit": "iter/sec",
            "range": "stddev: 0.000034623867841241196",
            "extra": "mean: 1.992968992031576 msec\nrounds: 502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30151.27303566959,
            "unit": "iter/sec",
            "range": "stddev: 0.000010933478681246193",
            "extra": "mean: 33.16609546857205 usec\nrounds: 16728"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17824.614376281632,
            "unit": "iter/sec",
            "range": "stddev: 0.000012942527172525442",
            "extra": "mean: 56.102195474739275 usec\nrounds: 14585"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7252.304114379359,
            "unit": "iter/sec",
            "range": "stddev: 0.00001784977776862355",
            "extra": "mean: 137.88721270213563 usec\nrounds: 6991"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3753.440231169973,
            "unit": "iter/sec",
            "range": "stddev: 0.000017779080501071955",
            "extra": "mean: 266.4222522302675 usec\nrounds: 3699"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2262.1909683061576,
            "unit": "iter/sec",
            "range": "stddev: 0.000020757534480401816",
            "extra": "mean: 442.0493291725773 usec\nrounds: 2163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 25218.258006668322,
            "unit": "iter/sec",
            "range": "stddev: 0.000011510924518039404",
            "extra": "mean: 39.6538095428945 usec\nrounds: 20015"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14316.401576886276,
            "unit": "iter/sec",
            "range": "stddev: 0.00001400022209616268",
            "extra": "mean: 69.8499545873659 usec\nrounds: 12970"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6035.433097108721,
            "unit": "iter/sec",
            "range": "stddev: 0.000019103208734480204",
            "extra": "mean: 165.6881923650269 usec\nrounds: 5344"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3252.3280094875468,
            "unit": "iter/sec",
            "range": "stddev: 0.000019652025901539615",
            "extra": "mean: 307.47206219140395 usec\nrounds: 3039"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2008.596472426067,
            "unit": "iter/sec",
            "range": "stddev: 0.00002911313315925056",
            "extra": "mean: 497.86007977608267 usec\nrounds: 1968"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1790.451294838336,
            "unit": "iter/sec",
            "range": "stddev: 0.00002387681372438286",
            "extra": "mean: 558.518404205065 usec\nrounds: 1712"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 709.691874913552,
            "unit": "iter/sec",
            "range": "stddev: 0.00002651136153112625",
            "extra": "mean: 1.409062207626106 msec\nrounds: 708"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 245.23681391029228,
            "unit": "iter/sec",
            "range": "stddev: 0.00005308403779188375",
            "extra": "mean: 4.0776912081633885 msec\nrounds: 245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.63076975392741,
            "unit": "iter/sec",
            "range": "stddev: 0.000054449554861680995",
            "extra": "mean: 8.023700744000962 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.48997740776852,
            "unit": "iter/sec",
            "range": "stddev: 0.0000505446752188371",
            "extra": "mean: 13.246791618420753 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10713.698302444744,
            "unit": "iter/sec",
            "range": "stddev: 0.00001443540447221433",
            "extra": "mean: 93.33845062370399 usec\nrounds: 7534"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4259.422226503984,
            "unit": "iter/sec",
            "range": "stddev: 0.00001789501590298487",
            "extra": "mean: 234.77362581656348 usec\nrounds: 3827"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1319.291001791449,
            "unit": "iter/sec",
            "range": "stddev: 0.00003655251953067934",
            "extra": "mean: 757.9828852331383 usec\nrounds: 1307"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 624.5132624335832,
            "unit": "iter/sec",
            "range": "stddev: 0.000038910468401721095",
            "extra": "mean: 1.6012470193238686 msec\nrounds: 621"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 360.2171606961,
            "unit": "iter/sec",
            "range": "stddev: 0.00010014591199283216",
            "extra": "mean: 2.7761031652893897 msec\nrounds: 363"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9896.86928471273,
            "unit": "iter/sec",
            "range": "stddev: 0.000015539749649218286",
            "extra": "mean: 101.04205392958531 usec\nrounds: 8678"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4035.8589470919164,
            "unit": "iter/sec",
            "range": "stddev: 0.000018826623703825178",
            "extra": "mean: 247.77872891731295 usec\nrounds: 3593"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1278.8016038683065,
            "unit": "iter/sec",
            "range": "stddev: 0.000024017290009915267",
            "extra": "mean: 781.9821284044792 usec\nrounds: 1285"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 611.1075093565365,
            "unit": "iter/sec",
            "range": "stddev: 0.00003228163981332996",
            "extra": "mean: 1.6363732807880997 msec\nrounds: 609"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 356.00800753948323,
            "unit": "iter/sec",
            "range": "stddev: 0.00003998665056227201",
            "extra": "mean: 2.8089255826334036 msec\nrounds: 357"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3980.9937123973677,
            "unit": "iter/sec",
            "range": "stddev: 0.000018472767764128493",
            "extra": "mean: 251.19356428166688 usec\nrounds: 3438"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1122.1022424755954,
            "unit": "iter/sec",
            "range": "stddev: 0.000024822157824340108",
            "extra": "mean: 891.1843877914262 usec\nrounds: 1114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 293.27121223144917,
            "unit": "iter/sec",
            "range": "stddev: 0.000034146996827782266",
            "extra": "mean: 3.4098130273038927 msec\nrounds: 293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 131.93140116687113,
            "unit": "iter/sec",
            "range": "stddev: 0.0000502502486358058",
            "extra": "mean: 7.579696654135944 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.23586823444478,
            "unit": "iter/sec",
            "range": "stddev: 0.00018468405146301574",
            "extra": "mean: 13.470577280000194 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1037.8015376968517,
            "unit": "iter/sec",
            "range": "stddev: 0.00002534137569036353",
            "extra": "mean: 963.5753693516941 usec\nrounds: 1018"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 313.51388493132254,
            "unit": "iter/sec",
            "range": "stddev: 0.0001291204965731105",
            "extra": "mean: 3.1896513936505784 msec\nrounds: 315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.85960347956475,
            "unit": "iter/sec",
            "range": "stddev: 0.00006691186481564418",
            "extra": "mean: 11.512831741573256 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 40.004650335696375,
            "unit": "iter/sec",
            "range": "stddev: 0.0000770381458528171",
            "extra": "mean: 24.99709387805083 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.957985302793098,
            "unit": "iter/sec",
            "range": "stddev: 0.000056548989616792316",
            "extra": "mean: 43.55782908695994 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}