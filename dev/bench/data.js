window.BENCHMARK_DATA = {
  "lastUpdate": 1781615621818,
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
          "id": "5883c2075cdb04c5644346439ee31be43ac662fb",
          "message": "Wire foot-gun warning into VIE-1 and VIDE; add API test gap-fillers\n\nBug fix: when the singularity-on-uniform-mesh warning was introduced in\nphase 5, its call site was only added inside function_solve_VIE_2 -- a\nreplace_all edit only matched one of the three solver entry points.\nVIE-1 and VIDE silently skipped the warning. Now wired into all three.\n\nTests (6 new):\n- test_uniform_mesh_with_singularity_warns_vie1 / _vide cover the now-\n  fixed call sites.\n- test_vide_vec_validation_a_wrong_shape covers the a(t) shape check\n  in the vector VIDE path (we already tested wrong-shape g).\n- test_mesh_breakpoints_accepts_plain_list parametrized over all three\n  solvers verifies that a Python list works as well as an ndarray, and\n  produces identical results.\n\nFull suite: 232 passed, 6 skipped.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-16T09:07:19-04:00",
          "tree_id": "4df5f3e7f8a772615dba7679185c54ad11784f0a",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/5883c2075cdb04c5644346439ee31be43ac662fb"
        },
        "date": 1781615620683,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15861.008487470004,
            "unit": "iter/sec",
            "range": "stddev: 0.00009293683884522644",
            "extra": "mean: 63.04769339162685 usec\nrounds: 10502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6231.324693994823,
            "unit": "iter/sec",
            "range": "stddev: 0.000015224334690374685",
            "extra": "mean: 160.47952066495716 usec\nrounds: 5831"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1855.673880090138,
            "unit": "iter/sec",
            "range": "stddev: 0.000024218667156581344",
            "extra": "mean: 538.8877920464266 usec\nrounds: 1861"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 867.168654082956,
            "unit": "iter/sec",
            "range": "stddev: 0.00003186394365817162",
            "extra": "mean: 1.1531782142857956 msec\nrounds: 854"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 494.31938615826124,
            "unit": "iter/sec",
            "range": "stddev: 0.00016652459591716867",
            "extra": "mean: 2.0229835770184423 msec\nrounds: 409"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28584.47656807639,
            "unit": "iter/sec",
            "range": "stddev: 0.00001089876211326833",
            "extra": "mean: 34.984023500252455 usec\nrounds: 15702"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17151.866747205044,
            "unit": "iter/sec",
            "range": "stddev: 0.00001293790465026233",
            "extra": "mean: 58.30269175586695 usec\nrounds: 14920"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7145.11844254427,
            "unit": "iter/sec",
            "range": "stddev: 0.000015884037802125266",
            "extra": "mean: 139.95569255307055 usec\nrounds: 6889"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3691.809265433741,
            "unit": "iter/sec",
            "range": "stddev: 0.000016597773447884976",
            "extra": "mean: 270.8698982265848 usec\nrounds: 3665"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2233.548155892588,
            "unit": "iter/sec",
            "range": "stddev: 0.00002007543657617918",
            "extra": "mean: 447.71812837873296 usec\nrounds: 2220"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22474.322423645288,
            "unit": "iter/sec",
            "range": "stddev: 0.000012400031591731924",
            "extra": "mean: 44.49522353331986 usec\nrounds: 17371"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13443.608651201557,
            "unit": "iter/sec",
            "range": "stddev: 0.000013991080088584934",
            "extra": "mean: 74.38478952677804 usec\nrounds: 11897"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5877.258715604613,
            "unit": "iter/sec",
            "range": "stddev: 0.000017012728795020165",
            "extra": "mean: 170.14735072746012 usec\nrounds: 5155"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3188.750109316559,
            "unit": "iter/sec",
            "range": "stddev: 0.000018917461441877834",
            "extra": "mean: 313.6024980691663 usec\nrounds: 3108"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1982.8495454711829,
            "unit": "iter/sec",
            "range": "stddev: 0.000020147774274716674",
            "extra": "mean: 504.3246989081922 usec\nrounds: 1923"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1727.3278617807864,
            "unit": "iter/sec",
            "range": "stddev: 0.000024968823629854123",
            "extra": "mean: 578.9288890234488 usec\nrounds: 1658"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 693.3460735908249,
            "unit": "iter/sec",
            "range": "stddev: 0.00004076540856498186",
            "extra": "mean: 1.4422811898551915 msec\nrounds: 690"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.77304313514793,
            "unit": "iter/sec",
            "range": "stddev: 0.00003796552348510226",
            "extra": "mean: 4.119073465019407 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 123.93923445738167,
            "unit": "iter/sec",
            "range": "stddev: 0.00004795801091919778",
            "extra": "mean: 8.068470040000648 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.0514654314814,
            "unit": "iter/sec",
            "range": "stddev: 0.00004750877013173731",
            "extra": "mean: 13.324190197364697 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10253.16094549962,
            "unit": "iter/sec",
            "range": "stddev: 0.000014528257296048419",
            "extra": "mean: 97.53089855074654 usec\nrounds: 5727"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4125.178917299192,
            "unit": "iter/sec",
            "range": "stddev: 0.00001730918285383074",
            "extra": "mean: 242.41372799769684 usec\nrounds: 3511"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1281.8787136116525,
            "unit": "iter/sec",
            "range": "stddev: 0.00002191683892982621",
            "extra": "mean: 780.1050047726683 usec\nrounds: 1257"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 607.0926648138103,
            "unit": "iter/sec",
            "range": "stddev: 0.000027413368378674014",
            "extra": "mean: 1.6471949966759867 msec\nrounds: 602"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 351.8419278266759,
            "unit": "iter/sec",
            "range": "stddev: 0.00003245065273233201",
            "extra": "mean: 2.842185427350828 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9454.26569782367,
            "unit": "iter/sec",
            "range": "stddev: 0.000016677908087793952",
            "extra": "mean: 105.77236053670413 usec\nrounds: 8504"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3878.651297576045,
            "unit": "iter/sec",
            "range": "stddev: 0.000020179895689987085",
            "extra": "mean: 257.82157850202924 usec\nrounds: 3777"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1220.383079042297,
            "unit": "iter/sec",
            "range": "stddev: 0.000053648309093934426",
            "extra": "mean: 819.4148355324265 usec\nrounds: 1137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 591.2668467300063,
            "unit": "iter/sec",
            "range": "stddev: 0.00003169560370032068",
            "extra": "mean: 1.691283733445376 msec\nrounds: 589"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 344.88979904705553,
            "unit": "iter/sec",
            "range": "stddev: 0.000032493501450261565",
            "extra": "mean: 2.8994768843933354 msec\nrounds: 346"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3948.07674700982,
            "unit": "iter/sec",
            "range": "stddev: 0.000016316791729607145",
            "extra": "mean: 253.28788270323682 usec\nrounds: 3521"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1120.1695194177132,
            "unit": "iter/sec",
            "range": "stddev: 0.000019571652284330607",
            "extra": "mean: 892.7220234664306 usec\nrounds: 1108"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 293.00260097218086,
            "unit": "iter/sec",
            "range": "stddev: 0.00013203883068710345",
            "extra": "mean: 3.4129389864868296 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.6877982171138,
            "unit": "iter/sec",
            "range": "stddev: 0.00004315143976752807",
            "extra": "mean: 7.536488007463388 msec\nrounds: 134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.21774932231237,
            "unit": "iter/sec",
            "range": "stddev: 0.000055538983973394215",
            "extra": "mean: 13.294734407898096 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1014.624241030308,
            "unit": "iter/sec",
            "range": "stddev: 0.00003293779465605883",
            "extra": "mean: 985.5865448124345 usec\nrounds: 993"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 310.435297394755,
            "unit": "iter/sec",
            "range": "stddev: 0.00003713985759184074",
            "extra": "mean: 3.2212831736346725 msec\nrounds: 311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.05448673955432,
            "unit": "iter/sec",
            "range": "stddev: 0.00007547093089544678",
            "extra": "mean: 11.620544586205256 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.7208738328841,
            "unit": "iter/sec",
            "range": "stddev: 0.00009264097849972555",
            "extra": "mean: 25.175679775003346 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.788718114558655,
            "unit": "iter/sec",
            "range": "stddev: 0.00009393090481802384",
            "extra": "mean: 43.88136247826711 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}