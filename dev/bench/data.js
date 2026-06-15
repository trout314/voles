window.BENCHMARK_DATA = {
  "lastUpdate": 1781536128115,
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
          "id": "0d53426edef1a45b1af10c271006b47292d52c8a",
          "message": "Add scalar function_solve_VIE_2 prototype (Python only)\n\nLays groundwork for the new family of callable-input solvers that\naccept K(u) and g(t) as callables on an arbitrary mesh, with support\nfor integrable singularities.\n\nThis commit ships only the Python prototype to lock the math and API;\nthe per-step linear solve is currently a slow numpy-based scaffold\nthat will be replaced with a templated D entry point in a follow-up.\nThe new function lives in _callable_solvers.py and is not yet exported\nat the package level.\n\nArchitecture: Python precomputes a weight tensor W[n,i,l,k] so that\nintegral over interval l of K(tau_{n,i} - s) y(s) ds becomes\nsum_k W[n,i,l,k] y_{l,k}. Smooth-K integrals use fixed-order\nGauss-Legendre with a two-order cross-check; intervals containing a\ndeclared singular point use scipy.integrate.quad. A post-build\nisfinite check on W catches undeclared non-integrable singularities.\n\nscipy is opt-in via the new [callable] extra; the existing array-based\nsolvers are unaffected.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-15T11:01:10-04:00",
          "tree_id": "ad93617feae54098c9cb28bd916a93dfcc92b0b3",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/0d53426edef1a45b1af10c271006b47292d52c8a"
        },
        "date": 1781536127631,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15945.766798426583,
            "unit": "iter/sec",
            "range": "stddev: 0.00007877514491428704",
            "extra": "mean: 62.71256896210679 usec\nrounds: 11180"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6224.891103927008,
            "unit": "iter/sec",
            "range": "stddev: 0.000017363573066611325",
            "extra": "mean: 160.64538050619785 usec\nrounds: 5971"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1850.836068251264,
            "unit": "iter/sec",
            "range": "stddev: 0.0000275825225135466",
            "extra": "mean: 540.2963650610266 usec\nrounds: 1849"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 864.6660764905887,
            "unit": "iter/sec",
            "range": "stddev: 0.00003968589100000882",
            "extra": "mean: 1.156515824072444 msec\nrounds: 864"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 499.31433861271637,
            "unit": "iter/sec",
            "range": "stddev: 0.000035201126518721054",
            "extra": "mean: 2.0027464117661378 msec\nrounds: 340"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28819.017239620134,
            "unit": "iter/sec",
            "range": "stddev: 0.000011542595359834798",
            "extra": "mean: 34.6993095456846 usec\nrounds: 16353"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17168.775657945534,
            "unit": "iter/sec",
            "range": "stddev: 0.000013573119113348508",
            "extra": "mean: 58.24527152797935 usec\nrounds: 15015"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7042.013718140008,
            "unit": "iter/sec",
            "range": "stddev: 0.000017474411928573916",
            "extra": "mean: 142.0048355520852 usec\nrounds: 6762"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3649.5468173406975,
            "unit": "iter/sec",
            "range": "stddev: 0.00001789570192214051",
            "extra": "mean: 274.00662330142853 usec\nrounds: 3605"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2187.5667214752634,
            "unit": "iter/sec",
            "range": "stddev: 0.00002174617579132737",
            "extra": "mean: 457.1289141414687 usec\nrounds: 2178"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22252.38854794433,
            "unit": "iter/sec",
            "range": "stddev: 0.000012895559966738298",
            "extra": "mean: 44.93899600240351 usec\nrounds: 17512"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13240.493980418412,
            "unit": "iter/sec",
            "range": "stddev: 0.000014952835160239624",
            "extra": "mean: 75.52588305835997 usec\nrounds: 11587"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5698.002213997746,
            "unit": "iter/sec",
            "range": "stddev: 0.00002390337575307758",
            "extra": "mean: 175.50010730838153 usec\nrounds: 5582"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3126.2300765108207,
            "unit": "iter/sec",
            "range": "stddev: 0.000022414239510640368",
            "extra": "mean: 319.87408972665827 usec\nrounds: 2920"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1943.0147697862408,
            "unit": "iter/sec",
            "range": "stddev: 0.00002466995155648508",
            "extra": "mean: 514.6641268764077 usec\nrounds: 1931"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1706.8622820303783,
            "unit": "iter/sec",
            "range": "stddev: 0.000031061274003435765",
            "extra": "mean: 585.870348491421 usec\nrounds: 1627"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 682.8491031703043,
            "unit": "iter/sec",
            "range": "stddev: 0.000055504330603701705",
            "extra": "mean: 1.464452388320114 msec\nrounds: 685"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 238.93008803015888,
            "unit": "iter/sec",
            "range": "stddev: 0.00014581331843556403",
            "extra": "mean: 4.185324704161056 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 122.19440722079119,
            "unit": "iter/sec",
            "range": "stddev: 0.00005391529117551392",
            "extra": "mean: 8.183680601626188 msec\nrounds: 123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.07452547139313,
            "unit": "iter/sec",
            "range": "stddev: 0.00007078956837473994",
            "extra": "mean: 13.499917733339922 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10452.755680191129,
            "unit": "iter/sec",
            "range": "stddev: 0.000015941033590004136",
            "extra": "mean: 95.6685519680792 usec\nrounds: 7649"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4181.631858818681,
            "unit": "iter/sec",
            "range": "stddev: 0.000020086612426469133",
            "extra": "mean: 239.1410898334082 usec\nrounds: 4141"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1291.164246341272,
            "unit": "iter/sec",
            "range": "stddev: 0.00003509968515718012",
            "extra": "mean: 774.4948040759849 usec\nrounds: 1276"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 614.7313856016425,
            "unit": "iter/sec",
            "range": "stddev: 0.000033680321334868513",
            "extra": "mean: 1.6267267678569755 msec\nrounds: 616"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 341.7975812003572,
            "unit": "iter/sec",
            "range": "stddev: 0.00040047902966546927",
            "extra": "mean: 2.9257082407900756 msec\nrounds: 353"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9671.924780665042,
            "unit": "iter/sec",
            "range": "stddev: 0.000017641659531230213",
            "extra": "mean: 103.39203650539972 usec\nrounds: 8218"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3927.7359726963427,
            "unit": "iter/sec",
            "range": "stddev: 0.000024081034603836542",
            "extra": "mean: 254.59959807672925 usec\nrounds: 3431"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1224.775278269076,
            "unit": "iter/sec",
            "range": "stddev: 0.00007809104693876298",
            "extra": "mean: 816.4763101793322 usec\nrounds: 1238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 598.3386729530343,
            "unit": "iter/sec",
            "range": "stddev: 0.00003424109958155953",
            "extra": "mean: 1.6712942773105581 msec\nrounds: 595"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 349.32900082042664,
            "unit": "iter/sec",
            "range": "stddev: 0.00003933996967689939",
            "extra": "mean: 2.862630922859028 msec\nrounds: 350"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3930.0469176862894,
            "unit": "iter/sec",
            "range": "stddev: 0.00002097999301294489",
            "extra": "mean: 254.4498884987163 usec\nrounds: 3704"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1114.4685843401173,
            "unit": "iter/sec",
            "range": "stddev: 0.000028414812592419872",
            "extra": "mean: 897.2886396722482 usec\nrounds: 1099"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 293.3984275997868,
            "unit": "iter/sec",
            "range": "stddev: 0.00006907077568004025",
            "extra": "mean: 3.4083345578254436 msec\nrounds: 294"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.73646184286926,
            "unit": "iter/sec",
            "range": "stddev: 0.00004443092636286957",
            "extra": "mean: 7.533724992487593 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.26797401768475,
            "unit": "iter/sec",
            "range": "stddev: 0.000058144920454592074",
            "extra": "mean: 13.285863118423284 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1016.9268059024743,
            "unit": "iter/sec",
            "range": "stddev: 0.000025050553806479027",
            "extra": "mean: 983.3549417674634 usec\nrounds: 996"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 309.42860882186926,
            "unit": "iter/sec",
            "range": "stddev: 0.000033588611178373926",
            "extra": "mean: 3.2317632290286267 msec\nrounds: 310"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 85.95125492448174,
            "unit": "iter/sec",
            "range": "stddev: 0.00011214885303304136",
            "extra": "mean: 11.634501449439188 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.745141908551766,
            "unit": "iter/sec",
            "range": "stddev: 0.00008094295628240977",
            "extra": "mean: 25.160307700016915 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.762301164695188,
            "unit": "iter/sec",
            "range": "stddev: 0.00010454370359743302",
            "extra": "mean: 43.93228930434421 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}