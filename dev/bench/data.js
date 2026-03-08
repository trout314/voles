window.BENCHMARK_DATA = {
  "lastUpdate": 1772994606541,
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
          "id": "c411e671e532fb46266e88c1bcef6db02d9e9131",
          "message": "Add convergence check script for all collocation settings\n\ntests/check_convergence.py solves test problems at 4 successive grid\nrefinements for every setting in fast_coll_settings_*, reporting whether\nerrors decrease monotonically and estimating the convergence order.\n\nResults: VIE-2 and VIDE all converge; VIE-1 has three non-converging\nsettings: (coll_divs=3, [1]), (4, [1]), (4, [1, 2]).\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T14:22:42-04:00",
          "tree_id": "f9f8a8bb57120aa3fdac26b883b1f2ece66107b4",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/c411e671e532fb46266e88c1bcef6db02d9e9131"
        },
        "date": 1772994605462,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16025.92084902342,
            "unit": "iter/sec",
            "range": "stddev: 0.00008790262887614449",
            "extra": "mean: 62.398910453931116 usec\nrounds: 11536"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5775.219026428608,
            "unit": "iter/sec",
            "range": "stddev: 0.000026516342519683296",
            "extra": "mean: 173.15360602321593 usec\nrounds: 5546"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1663.655997125322,
            "unit": "iter/sec",
            "range": "stddev: 0.000032020361493279526",
            "extra": "mean: 601.0858024302669 usec\nrounds: 1645"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 730.0252056653693,
            "unit": "iter/sec",
            "range": "stddev: 0.00012434639610228824",
            "extra": "mean: 1.369815716278682 msec\nrounds: 645"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 434.6340854565041,
            "unit": "iter/sec",
            "range": "stddev: 0.00004777580760283869",
            "extra": "mean: 2.3007859564205178 msec\nrounds: 436"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 32306.382513329507,
            "unit": "iter/sec",
            "range": "stddev: 0.000013002916540886703",
            "extra": "mean: 30.95363585159692 usec\nrounds: 16680"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 18048.049286506448,
            "unit": "iter/sec",
            "range": "stddev: 0.000018515526363307048",
            "extra": "mean: 55.40765010807268 usec\nrounds: 12904"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6958.410243612504,
            "unit": "iter/sec",
            "range": "stddev: 0.00002551547081059779",
            "extra": "mean: 143.71098641646682 usec\nrounds: 6699"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3517.291559877719,
            "unit": "iter/sec",
            "range": "stddev: 0.0000276704785326359",
            "extra": "mean: 284.30966923730534 usec\nrounds: 3111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2092.802867967875,
            "unit": "iter/sec",
            "range": "stddev: 0.00003474604418845318",
            "extra": "mean: 477.8280913629511 usec\nrounds: 2003"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 27118.86281625164,
            "unit": "iter/sec",
            "range": "stddev: 0.0000146886656436582",
            "extra": "mean: 36.874702555769616 usec\nrounds: 23786"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14864.311974043621,
            "unit": "iter/sec",
            "range": "stddev: 0.000021293088371955716",
            "extra": "mean: 67.2752295394648 usec\nrounds: 13135"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5992.2450075642755,
            "unit": "iter/sec",
            "range": "stddev: 0.000028844859345060155",
            "extra": "mean: 166.8823619090434 usec\nrounds: 5156"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3145.08719452534,
            "unit": "iter/sec",
            "range": "stddev: 0.0000309433532836735",
            "extra": "mean: 317.9562085721191 usec\nrounds: 2800"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1913.1036935997624,
            "unit": "iter/sec",
            "range": "stddev: 0.00003661701548367524",
            "extra": "mean: 522.7108197770322 usec\nrounds: 1709"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1721.383811420242,
            "unit": "iter/sec",
            "range": "stddev: 0.000022692968150833742",
            "extra": "mean: 580.9279681647185 usec\nrounds: 1602"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 687.6708372003067,
            "unit": "iter/sec",
            "range": "stddev: 0.00003450448332302927",
            "extra": "mean: 1.4541841036494576 msec\nrounds: 685"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 243.27798596968628,
            "unit": "iter/sec",
            "range": "stddev: 0.000043371292648954544",
            "extra": "mean: 4.110523999999759 msec\nrounds: 244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.90922271794872,
            "unit": "iter/sec",
            "range": "stddev: 0.00007215709454027274",
            "extra": "mean: 8.005813968261174 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 76.21578990056064,
            "unit": "iter/sec",
            "range": "stddev: 0.00012831702215366985",
            "extra": "mean: 13.120640766233718 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 11860.693396650571,
            "unit": "iter/sec",
            "range": "stddev: 0.00001983861967718469",
            "extra": "mean: 84.31210272094188 usec\nrounds: 8450"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4568.211044608187,
            "unit": "iter/sec",
            "range": "stddev: 0.000026249387027164866",
            "extra": "mean: 218.90407212694117 usec\nrounds: 4090"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1375.6245991842052,
            "unit": "iter/sec",
            "range": "stddev: 0.000033959117355571595",
            "extra": "mean: 726.9425107642274 usec\nrounds: 1347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 644.8820738155088,
            "unit": "iter/sec",
            "range": "stddev: 0.0000396649047763111",
            "extra": "mean: 1.5506711081041542 msec\nrounds: 629"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 371.6441547867029,
            "unit": "iter/sec",
            "range": "stddev: 0.00004419062466701224",
            "extra": "mean: 2.690745938339669 msec\nrounds: 373"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 11257.507542383732,
            "unit": "iter/sec",
            "range": "stddev: 0.00002182756719903349",
            "extra": "mean: 88.82960959475884 usec\nrounds: 9859"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4390.64519957622,
            "unit": "iter/sec",
            "range": "stddev: 0.000028917698288201775",
            "extra": "mean: 227.7569592953033 usec\nrounds: 4029"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1318.0489240444692,
            "unit": "iter/sec",
            "range": "stddev: 0.00008973151055482656",
            "extra": "mean: 758.6971786536365 usec\nrounds: 1321"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 632.7931747133607,
            "unit": "iter/sec",
            "range": "stddev: 0.000051456467495903083",
            "extra": "mean: 1.5802951737792916 msec\nrounds: 633"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 370.0890058189774,
            "unit": "iter/sec",
            "range": "stddev: 0.00006991200230517205",
            "extra": "mean: 2.7020527069889035 msec\nrounds: 372"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4262.102319485898,
            "unit": "iter/sec",
            "range": "stddev: 0.000025965993620942614",
            "extra": "mean: 234.62599558628656 usec\nrounds: 3852"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1184.5028051607078,
            "unit": "iter/sec",
            "range": "stddev: 0.000060620525948116634",
            "extra": "mean: 844.2360757974944 usec\nrounds: 1161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 310.2601089774169,
            "unit": "iter/sec",
            "range": "stddev: 0.00013043600643565555",
            "extra": "mean: 3.2231020716646097 msec\nrounds: 307"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 140.26114510368146,
            "unit": "iter/sec",
            "range": "stddev: 0.00005367295716392797",
            "extra": "mean: 7.12955821985338 msec\nrounds: 141"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 79.25584672410554,
            "unit": "iter/sec",
            "range": "stddev: 0.00007565613614917162",
            "extra": "mean: 12.617365675002645 msec\nrounds: 80"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 968.5611594922483,
            "unit": "iter/sec",
            "range": "stddev: 0.00006057134185722443",
            "extra": "mean: 1.0324593240185609 msec\nrounds: 966"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 294.56224915148636,
            "unit": "iter/sec",
            "range": "stddev: 0.00013170582213859456",
            "extra": "mean: 3.394868157343964 msec\nrounds: 286"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 81.79768494890556,
            "unit": "iter/sec",
            "range": "stddev: 0.00013736534733789951",
            "extra": "mean: 12.225284867470812 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 37.821757403885975,
            "unit": "iter/sec",
            "range": "stddev: 0.00024910898087119265",
            "extra": "mean: 26.43980789473457 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.723533796155156,
            "unit": "iter/sec",
            "range": "stddev: 0.0005606223745511553",
            "extra": "mean: 46.03302618181715 msec\nrounds: 22"
          }
        ]
      }
    ]
  }
}