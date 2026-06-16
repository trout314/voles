window.BENCHMARK_DATA = {
  "lastUpdate": 1781619019602,
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
          "id": "c0bb69093d41946b55e2b89303096e4ad66a02e4",
          "message": "Escalate ComplexWarning to ValueError during real-path solver build\n\nMulti-point sampling has false negatives by design: a kernel whose complex\nrange falls between the 5 sample u-values gets classified as real, and\nnumpy's default behavior is then to silently lossy-cast the imaginary\nparts away (with a ComplexWarning that the user typically won't see) --\nyielding a finite but wrong real-valued solution.\n\nWrap each of the three function_solve_* entry points in a decorator that\nescalates ComplexWarning to an exception via warnings.filterwarnings, then\ncatches it and re-raises as a clear ValueError pointing the user at\ninconsistent return dtypes. Zero overhead in the common case\n(catch_warnings just saves/restores filter state; the filter only fires\non an actual lossy cast).\n\nCombined with the existing sampling-based detection, the user-facing\ncontract is now: either the multi-point sampler routes through the\ncomplex dispatch (fast path), or the build raises with a clear pointer\nto the inconsistency. No silent wrong-answer path.\n\nTests (3 new): one per solver, monkeypatching _samples_indicate_complex\nto always return False and confirming a complex kernel produces the\nclean ValueError rather than silent corruption.\n\nAlso collapsed a duplicate functools import that crept in during the\nedit.\n\nFull suite: 247 passed, 6 skipped.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-16T10:02:17-04:00",
          "tree_id": "9b4d251666693799c1c25ca1019ae24832071626",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/c0bb69093d41946b55e2b89303096e4ad66a02e4"
        },
        "date": 1781619018530,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 20368.29126673573,
            "unit": "iter/sec",
            "range": "stddev: 0.0000665301042001571",
            "extra": "mean: 49.09592007028788 usec\nrounds: 14550"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 7594.70740751997,
            "unit": "iter/sec",
            "range": "stddev: 0.000011838877194549939",
            "extra": "mean: 131.67064198020856 usec\nrounds: 7413"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2292.5409479486502,
            "unit": "iter/sec",
            "range": "stddev: 0.000017030437602157775",
            "extra": "mean: 436.19722513344556 usec\nrounds: 2292"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1071.3290614940972,
            "unit": "iter/sec",
            "range": "stddev: 0.000026940785283739134",
            "extra": "mean: 933.420025594545 usec\nrounds: 1094"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 610.7476580006064,
            "unit": "iter/sec",
            "range": "stddev: 0.000029389017134234887",
            "extra": "mean: 1.6373374288060016 msec\nrounds: 611"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 38358.45123687124,
            "unit": "iter/sec",
            "range": "stddev: 0.000008485609405144075",
            "extra": "mean: 26.06987424556838 usec\nrounds: 21868"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 21894.423432978747,
            "unit": "iter/sec",
            "range": "stddev: 0.000009699693429380126",
            "extra": "mean: 45.67373071326179 usec\nrounds: 19340"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 8869.799652943859,
            "unit": "iter/sec",
            "range": "stddev: 0.000011583376416392179",
            "extra": "mean: 112.74211810050333 usec\nrounds: 8552"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 4566.897932307266,
            "unit": "iter/sec",
            "range": "stddev: 0.000013226441561496756",
            "extra": "mean: 218.9670132379737 usec\nrounds: 4533"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2733.788460712487,
            "unit": "iter/sec",
            "range": "stddev: 0.000015777770050189234",
            "extra": "mean: 365.7927503795877 usec\nrounds: 2636"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 30264.931734278503,
            "unit": "iter/sec",
            "range": "stddev: 0.000009145930814281116",
            "extra": "mean: 33.04154156962414 usec\nrounds: 24248"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 16904.700859166805,
            "unit": "iter/sec",
            "range": "stddev: 0.000012196729123089168",
            "extra": "mean: 59.155143195434675 usec\nrounds: 15629"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 7284.565745023801,
            "unit": "iter/sec",
            "range": "stddev: 0.000013081885645672955",
            "extra": "mean: 137.27654262481127 usec\nrounds: 7097"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3871.5097245149564,
            "unit": "iter/sec",
            "range": "stddev: 0.000024010740777700224",
            "extra": "mean: 258.2971685871938 usec\nrounds: 3648"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2408.720544239886,
            "unit": "iter/sec",
            "range": "stddev: 0.000016935004398149454",
            "extra": "mean: 415.1581645248796 usec\nrounds: 2334"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2227.415923647934,
            "unit": "iter/sec",
            "range": "stddev: 0.000014722624659356133",
            "extra": "mean: 448.95072778426464 usec\nrounds: 2127"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 870.8745280916454,
            "unit": "iter/sec",
            "range": "stddev: 0.00004190592466406826",
            "extra": "mean: 1.1482710399066423 msec\nrounds: 877"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 303.18540418378495,
            "unit": "iter/sec",
            "range": "stddev: 0.000027340699879936153",
            "extra": "mean: 3.298311812510011 msec\nrounds: 304"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 153.69302525190224,
            "unit": "iter/sec",
            "range": "stddev: 0.00005461550254358864",
            "extra": "mean: 6.506476129030606 msec\nrounds: 155"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 92.93275944704574,
            "unit": "iter/sec",
            "range": "stddev: 0.00019987793446516199",
            "extra": "mean: 10.760468170213032 msec\nrounds: 94"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 12660.607138931344,
            "unit": "iter/sec",
            "range": "stddev: 0.000011850755199738523",
            "extra": "mean: 78.98515363651099 usec\nrounds: 10206"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4739.748582372185,
            "unit": "iter/sec",
            "range": "stddev: 0.00001592117128955376",
            "extra": "mean: 210.98165495932537 usec\nrounds: 4327"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1407.8700446721446,
            "unit": "iter/sec",
            "range": "stddev: 0.00006304298491328824",
            "extra": "mean: 710.2928312057903 usec\nrounds: 1410"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 668.0276131295287,
            "unit": "iter/sec",
            "range": "stddev: 0.00006317626283503865",
            "extra": "mean: 1.496944108815009 msec\nrounds: 579"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 387.9109050119202,
            "unit": "iter/sec",
            "range": "stddev: 0.000025953124391693845",
            "extra": "mean: 2.5779115438099653 msec\nrounds: 388"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 11802.186416635775,
            "unit": "iter/sec",
            "range": "stddev: 0.000011937748182419647",
            "extra": "mean: 84.73006311698735 usec\nrounds: 10457"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4522.0638498742765,
            "unit": "iter/sec",
            "range": "stddev: 0.000013563849509534504",
            "extra": "mean: 221.13796558352493 usec\nrounds: 4271"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1385.2386419645923,
            "unit": "iter/sec",
            "range": "stddev: 0.00002349342275375075",
            "extra": "mean: 721.8972743799337 usec\nrounds: 1374"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 650.4170741042783,
            "unit": "iter/sec",
            "range": "stddev: 0.00008282687490000075",
            "extra": "mean: 1.5374750138242446 msec\nrounds: 651"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 381.69785388828603,
            "unit": "iter/sec",
            "range": "stddev: 0.00003384513656503621",
            "extra": "mean: 2.6198732579006756 msec\nrounds: 380"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4511.667664633216,
            "unit": "iter/sec",
            "range": "stddev: 0.000013808828669207342",
            "extra": "mean: 221.6475313195075 usec\nrounds: 4007"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1252.0757083236078,
            "unit": "iter/sec",
            "range": "stddev: 0.000029499751658607715",
            "extra": "mean: 798.6737490010811 usec\nrounds: 1251"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 326.7235913827633,
            "unit": "iter/sec",
            "range": "stddev: 0.00004332344625310386",
            "extra": "mean: 3.0606911357939857 msec\nrounds: 324"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 145.99567429511734,
            "unit": "iter/sec",
            "range": "stddev: 0.0002665766561499188",
            "extra": "mean: 6.849518006804699 msec\nrounds: 147"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 82.53189099879617,
            "unit": "iter/sec",
            "range": "stddev: 0.00016495604376293586",
            "extra": "mean: 12.116528385549607 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1241.3954610076592,
            "unit": "iter/sec",
            "range": "stddev: 0.000021942995035708906",
            "extra": "mean: 805.5450752077708 usec\nrounds: 1210"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 372.865945362841,
            "unit": "iter/sec",
            "range": "stddev: 0.000041153104517181785",
            "extra": "mean: 2.6819290215063383 msec\nrounds: 372"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 103.15837159376373,
            "unit": "iter/sec",
            "range": "stddev: 0.0000421753593136213",
            "extra": "mean: 9.693832740380843 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 47.520182021771596,
            "unit": "iter/sec",
            "range": "stddev: 0.00006427828287516632",
            "extra": "mean: 21.04369043750391 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 27.131697054993815,
            "unit": "iter/sec",
            "range": "stddev: 0.00008452858942212748",
            "extra": "mean: 36.857259535703896 msec\nrounds: 28"
          }
        ]
      }
    ]
  }
}