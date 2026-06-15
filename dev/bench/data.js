window.BENCHMARK_DATA = {
  "lastUpdate": 1781536621253,
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
          "id": "599b68e0969e8e1b3e50882a55583e21b98298e5",
          "message": "Refactor function_solve_VIE_2 tests to use fixtures, flat style\n\nMove the two test problems (smooth K=exp(-u) and Abel K=1/sqrt(u)) into\nconftest.py as callable-form fixtures alongside the existing array-form\nones. Convert the test classes to module-level functions to match the\nexisting style in test_vie1/2/de.py.\n\nAlso wrap the undeclared-singularity test in pytest.warns() so the\nscipy IntegrationWarning no longer leaks into the test output.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-15T11:09:17-04:00",
          "tree_id": "83d079547ed3bc494c228da5f21bcb9383c13865",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/599b68e0969e8e1b3e50882a55583e21b98298e5"
        },
        "date": 1781536620182,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 20012.181693143662,
            "unit": "iter/sec",
            "range": "stddev: 0.0000594615318506588",
            "extra": "mean: 49.96956430505567 usec\nrounds: 14921"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 7738.12679671742,
            "unit": "iter/sec",
            "range": "stddev: 0.000011474938248459832",
            "extra": "mean: 129.23024218525453 usec\nrounds: 6846"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2281.0340882342925,
            "unit": "iter/sec",
            "range": "stddev: 0.000025754575943882804",
            "extra": "mean: 438.39765707933014 usec\nrounds: 2260"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1035.9307585452018,
            "unit": "iter/sec",
            "range": "stddev: 0.0001109065462203749",
            "extra": "mean: 965.3154824790985 usec\nrounds: 742"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 610.7629850680881,
            "unit": "iter/sec",
            "range": "stddev: 0.000024734893394641205",
            "extra": "mean: 1.637296339902654 msec\nrounds: 609"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 38215.71443756367,
            "unit": "iter/sec",
            "range": "stddev: 0.00000824186649853986",
            "extra": "mean: 26.167245980283496 usec\nrounds: 22949"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 21666.90347759772,
            "unit": "iter/sec",
            "range": "stddev: 0.000010347310189793086",
            "extra": "mean: 46.15334171003901 usec\nrounds: 19698"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 8828.937387689448,
            "unit": "iter/sec",
            "range": "stddev: 0.000011415004501620812",
            "extra": "mean: 113.26391343474033 usec\nrounds: 8664"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 4553.93194486766,
            "unit": "iter/sec",
            "range": "stddev: 0.000013289195046727682",
            "extra": "mean: 219.59045767625338 usec\nrounds: 4501"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2727.0971545081993,
            "unit": "iter/sec",
            "range": "stddev: 0.00001545191696434426",
            "extra": "mean: 366.69027296914857 usec\nrounds: 2634"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 30114.73664024637,
            "unit": "iter/sec",
            "range": "stddev: 0.000008859172275450994",
            "extra": "mean: 33.20633389380419 usec\nrounds: 19617"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 16978.992210942957,
            "unit": "iter/sec",
            "range": "stddev: 0.000009984691457873366",
            "extra": "mean: 58.896310662979175 usec\nrounds: 15718"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 7201.66162907399,
            "unit": "iter/sec",
            "range": "stddev: 0.000014891185496499178",
            "extra": "mean: 138.85684325446192 usec\nrounds: 7005"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3913.013614936575,
            "unit": "iter/sec",
            "range": "stddev: 0.000013812806478716046",
            "extra": "mean: 255.55750590359463 usec\nrounds: 3896"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2400.3189151828938,
            "unit": "iter/sec",
            "range": "stddev: 0.000023487636892735407",
            "extra": "mean: 416.6113068037063 usec\nrounds: 2337"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2236.0094305137927,
            "unit": "iter/sec",
            "range": "stddev: 0.00001556230920062893",
            "extra": "mean: 447.2253052037526 usec\nrounds: 2133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 874.3698872824566,
            "unit": "iter/sec",
            "range": "stddev: 0.000022688267420637104",
            "extra": "mean: 1.1436807403191822 msec\nrounds: 878"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 304.050744360214,
            "unit": "iter/sec",
            "range": "stddev: 0.00003314832342841189",
            "extra": "mean: 3.2889246895422275 msec\nrounds: 306"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 154.1049870528313,
            "unit": "iter/sec",
            "range": "stddev: 0.00003359323119359056",
            "extra": "mean: 6.489082664516064 msec\nrounds: 155"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 93.03858485303444,
            "unit": "iter/sec",
            "range": "stddev: 0.000053129029085290965",
            "extra": "mean: 10.748228829787335 msec\nrounds: 94"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 12726.647023901536,
            "unit": "iter/sec",
            "range": "stddev: 0.000010663143001854898",
            "extra": "mean: 78.57529152194839 usec\nrounds: 10356"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4731.577399604208,
            "unit": "iter/sec",
            "range": "stddev: 0.000014100956624737215",
            "extra": "mean: 211.34600906743046 usec\nrounds: 4632"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1426.9129474559504,
            "unit": "iter/sec",
            "range": "stddev: 0.000025729978820922776",
            "extra": "mean: 700.8136002850802 usec\nrounds: 1406"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 670.508383487143,
            "unit": "iter/sec",
            "range": "stddev: 0.000022524058090774856",
            "extra": "mean: 1.4914056626693544 msec\nrounds: 667"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 387.0758529782307,
            "unit": "iter/sec",
            "range": "stddev: 0.000027724380772494248",
            "extra": "mean: 2.583472960934715 msec\nrounds: 384"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 11802.364693805872,
            "unit": "iter/sec",
            "range": "stddev: 0.000010847875874399294",
            "extra": "mean: 84.72878325178522 usec\nrounds: 10616"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4507.705086420437,
            "unit": "iter/sec",
            "range": "stddev: 0.00001370090753310326",
            "extra": "mean: 221.84237451836026 usec\nrounds: 4419"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1376.6596876964768,
            "unit": "iter/sec",
            "range": "stddev: 0.00003875705991304608",
            "extra": "mean: 726.3959342582841 usec\nrounds: 1369"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 646.8224490751007,
            "unit": "iter/sec",
            "range": "stddev: 0.00009237137934319495",
            "extra": "mean: 1.54601931554774 msec\nrounds: 656"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 380.8714429383428,
            "unit": "iter/sec",
            "range": "stddev: 0.000028936327961499977",
            "extra": "mean: 2.6255578320212485 msec\nrounds: 381"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4523.668493035082,
            "unit": "iter/sec",
            "range": "stddev: 0.000012332013517502459",
            "extra": "mean: 221.0595231590603 usec\nrounds: 4318"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1254.9768415817186,
            "unit": "iter/sec",
            "range": "stddev: 0.0000182333569303384",
            "extra": "mean: 796.8274527995618 usec\nrounds: 1250"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 325.64484979872066,
            "unit": "iter/sec",
            "range": "stddev: 0.000029872094756225627",
            "extra": "mean: 3.0708300795117585 msec\nrounds: 327"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 145.9974799375097,
            "unit": "iter/sec",
            "range": "stddev: 0.00009021847981524787",
            "extra": "mean: 6.849433294520037 msec\nrounds: 146"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 82.3730644548972,
            "unit": "iter/sec",
            "range": "stddev: 0.00018639926146021629",
            "extra": "mean: 12.139890710846906 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1244.6398292224962,
            "unit": "iter/sec",
            "range": "stddev: 0.000019221481875420962",
            "extra": "mean: 803.4452831424186 usec\nrounds: 1222"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 373.933550936584,
            "unit": "iter/sec",
            "range": "stddev: 0.00003435812620131392",
            "extra": "mean: 2.6742719327947966 msec\nrounds: 372"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 103.06694723865556,
            "unit": "iter/sec",
            "range": "stddev: 0.00004250039685106748",
            "extra": "mean: 9.702431543688402 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 47.19090128513115,
            "unit": "iter/sec",
            "range": "stddev: 0.00007293513479616382",
            "extra": "mean: 21.1905255625003 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 27.26517010231818,
            "unit": "iter/sec",
            "range": "stddev: 0.0000732335656853988",
            "extra": "mean: 36.676829678571366 msec\nrounds: 28"
          }
        ]
      }
    ]
  }
}