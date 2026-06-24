window.BENCHMARK_DATA = {
  "lastUpdate": 1782313946989,
  "repoUrl": "https://github.com/trout314/voles",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "atrout@Aarons-MacBook-Air.local",
            "name": "Aaron Trout"
          },
          "committer": {
            "email": "atrout@Aarons-MacBook-Air.local",
            "name": "Aaron Trout"
          },
          "distinct": true,
          "id": "ffe57b6f3d88752b56af1da6e1cd4d4c334e028e",
          "message": "docs: replace README figure with a real VIE-1 solution; drop generator script\n\nThe piecewise-polynomial illustration is now a single-panel figure of an actual\nvoles first-kind VIE solution on a deliberately coarse mesh, so the discontinuous\npieces and the deviation from the exact solution are both visually obvious. Adds\ncollocation-node dots and breakpoint labels t0..t4, and updates the README caption.\n\nThe image is now a hand-maintained static asset; the matplotlib generator script\nis removed (it was repo-only, never shipped in the wheel, and tripped the\ndoc-examples CI). Reproduction recipe:\n  function_solve_VIE_1(kernel=lambda u: exp(u), g=lambda t: sin(t),\n                       mesh_breakpoints=linspace(0, 8, 5),\n                       coll_divs=3, coll_choices=[1, 2, 3], return_function=True)\n  exact y(t) = cos(t) - sin(t); plot each .polynomials[i] piece vs exact.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-24T11:04:55-04:00",
          "tree_id": "6f0721aa3c886db58ea1ade585a4df3b219962cf",
          "url": "https://github.com/trout314/voles/commit/ffe57b6f3d88752b56af1da6e1cd4d4c334e028e"
        },
        "date": 1782313945678,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15803.85002091132,
            "unit": "iter/sec",
            "range": "stddev: 0.00007700397540687641",
            "extra": "mean: 63.27572070582934 usec\nrounds: 10992"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6212.757310004352,
            "unit": "iter/sec",
            "range": "stddev: 0.000015547370148370625",
            "extra": "mean: 160.95912814584085 usec\nrounds: 5962"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1857.3873743651277,
            "unit": "iter/sec",
            "range": "stddev: 0.000019594854073026477",
            "extra": "mean: 538.3906522686519 usec\nrounds: 1806"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 867.137911007166,
            "unit": "iter/sec",
            "range": "stddev: 0.000028169243889975504",
            "extra": "mean: 1.153219098492092 msec\nrounds: 863"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 498.77957252066744,
            "unit": "iter/sec",
            "range": "stddev: 0.00003605992896322277",
            "extra": "mean: 2.0048936546184715 msec\nrounds: 498"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28169.943887087316,
            "unit": "iter/sec",
            "range": "stddev: 0.000010840093493588015",
            "extra": "mean: 35.49882825497516 usec\nrounds: 16507"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17070.937072135283,
            "unit": "iter/sec",
            "range": "stddev: 0.000012680630233694878",
            "extra": "mean: 58.579092393954745 usec\nrounds: 15001"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7133.085135760531,
            "unit": "iter/sec",
            "range": "stddev: 0.000015609110249834357",
            "extra": "mean: 140.19179372844818 usec\nrounds: 5997"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3703.7597101732767,
            "unit": "iter/sec",
            "range": "stddev: 0.000016379287357458856",
            "extra": "mean: 269.9959171901073 usec\nrounds: 3659"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2233.3099606359883,
            "unit": "iter/sec",
            "range": "stddev: 0.000019235358324632408",
            "extra": "mean: 447.76588007301336 usec\nrounds: 2218"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22215.69464482875,
            "unit": "iter/sec",
            "range": "stddev: 0.000012020461142764267",
            "extra": "mean: 45.013222228132065 usec\nrounds: 17221"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13334.967130313955,
            "unit": "iter/sec",
            "range": "stddev: 0.00001377421508437362",
            "extra": "mean: 74.99081101795383 usec\nrounds: 11943"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5871.675616191973,
            "unit": "iter/sec",
            "range": "stddev: 0.00001683110120149481",
            "extra": "mean: 170.30913581846366 usec\nrounds: 5684"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3185.8278263307798,
            "unit": "iter/sec",
            "range": "stddev: 0.000019637325597236633",
            "extra": "mean: 313.8901580728962 usec\nrounds: 2986"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1972.9428995981627,
            "unit": "iter/sec",
            "range": "stddev: 0.000026850223185182323",
            "extra": "mean: 506.8570409228133 usec\nrounds: 1906"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1705.194212027577,
            "unit": "iter/sec",
            "range": "stddev: 0.00007004422491962749",
            "extra": "mean: 586.4434637101781 usec\nrounds: 1667"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 696.2696711438454,
            "unit": "iter/sec",
            "range": "stddev: 0.000021630671112618448",
            "extra": "mean: 1.4362251315028278 msec\nrounds: 692"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 243.56824824386206,
            "unit": "iter/sec",
            "range": "stddev: 0.0000336698331148893",
            "extra": "mean: 4.105625454918877 msec\nrounds: 244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 123.64030836457755,
            "unit": "iter/sec",
            "range": "stddev: 0.0003162117097852876",
            "extra": "mean: 8.087977240005785 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.41940797285196,
            "unit": "iter/sec",
            "range": "stddev: 0.00005056813792149699",
            "extra": "mean: 13.259186552617345 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10425.65778658603,
            "unit": "iter/sec",
            "range": "stddev: 0.000014481538046993753",
            "extra": "mean: 95.91720929941039 usec\nrounds: 7076"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4209.467749346033,
            "unit": "iter/sec",
            "range": "stddev: 0.00001767062722961516",
            "extra": "mean: 237.5597247788289 usec\nrounds: 4153"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1312.0661047003452,
            "unit": "iter/sec",
            "range": "stddev: 0.000022584802101102052",
            "extra": "mean: 762.156720928618 usec\nrounds: 1290"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 623.34434999996,
            "unit": "iter/sec",
            "range": "stddev: 0.00003146965722652107",
            "extra": "mean: 1.6042497216828295 msec\nrounds: 618"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 359.5941628289098,
            "unit": "iter/sec",
            "range": "stddev: 0.00011054896188674",
            "extra": "mean: 2.7809127715896405 msec\nrounds: 359"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9661.806054117975,
            "unit": "iter/sec",
            "range": "stddev: 0.0000158550766630968",
            "extra": "mean: 103.50031809775236 usec\nrounds: 8139"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3984.596163121044,
            "unit": "iter/sec",
            "range": "stddev: 0.000018470574476747312",
            "extra": "mean: 250.96646160917913 usec\nrounds: 3243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1268.0254983438135,
            "unit": "iter/sec",
            "range": "stddev: 0.00002376933937549376",
            "extra": "mean: 788.6276745271405 usec\nrounds: 1272"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 608.1361453980869,
            "unit": "iter/sec",
            "range": "stddev: 0.000030945393963946694",
            "extra": "mean: 1.6443686295696143 msec\nrounds: 602"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 343.49112380183345,
            "unit": "iter/sec",
            "range": "stddev: 0.00033313498699793977",
            "extra": "mean: 2.9112833802858877 msec\nrounds: 355"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3878.429053332947,
            "unit": "iter/sec",
            "range": "stddev: 0.000016260737518595962",
            "extra": "mean: 257.8363523604086 usec\nrounds: 3556"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1099.1542361787563,
            "unit": "iter/sec",
            "range": "stddev: 0.000019753799553717622",
            "extra": "mean: 909.7904252969364 usec\nrounds: 1091"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 288.3543095326774,
            "unit": "iter/sec",
            "range": "stddev: 0.00004163885582696134",
            "extra": "mean: 3.467955799310418 msec\nrounds: 289"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 129.53202752162468,
            "unit": "iter/sec",
            "range": "stddev: 0.00020926815989070487",
            "extra": "mean: 7.720098412209717 msec\nrounds: 131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.29837265746302,
            "unit": "iter/sec",
            "range": "stddev: 0.00017345350812100809",
            "extra": "mean: 13.6428676892076 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1011.5058257992242,
            "unit": "iter/sec",
            "range": "stddev: 0.00003304699266657559",
            "extra": "mean: 988.6250523667196 usec\nrounds: 993"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 308.51073015186614,
            "unit": "iter/sec",
            "range": "stddev: 0.00003464972884074952",
            "extra": "mean: 3.2413783452774703 msec\nrounds: 307"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 85.68771880678598,
            "unit": "iter/sec",
            "range": "stddev: 0.00006632219488168052",
            "extra": "mean: 11.670283839097904 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.24273313563989,
            "unit": "iter/sec",
            "range": "stddev: 0.00035821047000977283",
            "extra": "mean: 25.482424900008027 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.46718144565941,
            "unit": "iter/sec",
            "range": "stddev: 0.0011270901391658998",
            "extra": "mean: 44.509365913061465 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}