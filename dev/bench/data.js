window.BENCHMARK_DATA = {
  "lastUpdate": 1782142447487,
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
          "id": "82ff04c2a17fdc4cf1117adcb4432aa111ed1f28",
          "message": "Add deprecation shim for volterra-equation-solvers PyPI name\n\nstub/ contains a minimal package that, when installed under the old\nPyPI name 'volterra-equation-solvers' (version 0.4.1), depends on\nvoles>=0.5.0 and re-exports its public API from a top-level\nvolterra_equation_solvers module. Importing the old name emits a\nDeprecationWarning pointing users at 'voles'.\n\nThe package is pure Python (no D extension): the D code lives in voles\nand the stub just delegates. The wheel is py3-none-any.\n\n.github/workflows/publish-stub.yml is a manually-triggered workflow that\nbuilds and publishes the shim via OIDC trusted publishing. It needs a\nPyPI trusted-publisher entry on the existing 'volterra-equation-solvers'\nproject pointing at this workflow file (publish-stub.yml) in the renamed\n'voles' repo, environment 'pypi'. Setup instructions are in the workflow\nfile header.\n\nAfter the publisher is configured, trigger via the GitHub Actions UI\n(\"Run workflow\") or `gh workflow run publish-stub.yml`.\n\nVerified locally: stub wheel installs in a fresh venv alongside\nvoles==0.5.0, the import emits the expected DeprecationWarning, and the\nre-exported names (solve_*, function_solve_*, optimal_graded_mesh,\nfast_coll_settings_*) all resolve to the voles implementations.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-22T11:26:36-04:00",
          "tree_id": "b1c69562c91c61fac643d66bae3be2c6977737b2",
          "url": "https://github.com/trout314/voles/commit/82ff04c2a17fdc4cf1117adcb4432aa111ed1f28"
        },
        "date": 1782142446691,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15790.594233947159,
            "unit": "iter/sec",
            "range": "stddev: 0.00009058450302378079",
            "extra": "mean: 63.3288390027885 usec\nrounds: 9466"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5846.01827885166,
            "unit": "iter/sec",
            "range": "stddev: 0.000024533474350020808",
            "extra": "mean: 171.05659823500093 usec\nrounds: 4759"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1682.1754698891139,
            "unit": "iter/sec",
            "range": "stddev: 0.00004187936735563518",
            "extra": "mean: 594.46830482311 usec\nrounds: 1555"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 770.6974013482588,
            "unit": "iter/sec",
            "range": "stddev: 0.00004217214072905599",
            "extra": "mean: 1.2975261084967966 msec\nrounds: 765"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 441.7293946195757,
            "unit": "iter/sec",
            "range": "stddev: 0.00005186507966841371",
            "extra": "mean: 2.26382942176899 msec\nrounds: 441"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 31051.833253109962,
            "unit": "iter/sec",
            "range": "stddev: 0.000012356554227753626",
            "extra": "mean: 32.20421776224262 usec\nrounds: 15820"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17661.726784968807,
            "unit": "iter/sec",
            "range": "stddev: 0.000018632438327461174",
            "extra": "mean: 56.619605329364525 usec\nrounds: 15874"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6923.032610411094,
            "unit": "iter/sec",
            "range": "stddev: 0.00002594453706011654",
            "extra": "mean: 144.44536899857522 usec\nrounds: 5832"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3512.237316698079,
            "unit": "iter/sec",
            "range": "stddev: 0.000026560074966100273",
            "extra": "mean: 284.71880167258144 usec\nrounds: 3348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2082.182396443007,
            "unit": "iter/sec",
            "range": "stddev: 0.00003856619364711842",
            "extra": "mean: 480.2653224368338 usec\nrounds: 2019"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24988.501197578076,
            "unit": "iter/sec",
            "range": "stddev: 0.000014940355031587565",
            "extra": "mean: 40.01840655000635 usec\nrounds: 20000"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14228.05221577268,
            "unit": "iter/sec",
            "range": "stddev: 0.00002088597349181889",
            "extra": "mean: 70.28368921020953 usec\nrounds: 12864"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5878.119621424591,
            "unit": "iter/sec",
            "range": "stddev: 0.00002992374022226737",
            "extra": "mean: 170.12243105009236 usec\nrounds: 5533"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3111.63997005717,
            "unit": "iter/sec",
            "range": "stddev: 0.000033558845330563354",
            "extra": "mean: 321.373940951667 usec\nrounds: 2879"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1891.7027363552468,
            "unit": "iter/sec",
            "range": "stddev: 0.00004414735714223425",
            "extra": "mean: 528.6242815965394 usec\nrounds: 1804"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1687.7979866217831,
            "unit": "iter/sec",
            "range": "stddev: 0.000027727243554869022",
            "extra": "mean: 592.4879683033353 usec\nrounds: 1609"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 682.4328942472853,
            "unit": "iter/sec",
            "range": "stddev: 0.000037664392606595364",
            "extra": "mean: 1.4653455430265965 msec\nrounds: 674"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.535681769327,
            "unit": "iter/sec",
            "range": "stddev: 0.000043884843121060376",
            "extra": "mean: 4.1231046611569875 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 125.04722345870844,
            "unit": "iter/sec",
            "range": "stddev: 0.00004604919870217153",
            "extra": "mean: 7.996978839999657 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 76.37380279478852,
            "unit": "iter/sec",
            "range": "stddev: 0.00006796109026515701",
            "extra": "mean: 13.093494934211085 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 11484.61107339453,
            "unit": "iter/sec",
            "range": "stddev: 0.00001964334808734708",
            "extra": "mean: 87.07304005414855 usec\nrounds: 8863"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4523.652251712213,
            "unit": "iter/sec",
            "range": "stddev: 0.000025906747644172987",
            "extra": "mean: 221.06031683171437 usec\nrounds: 4141"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1384.6295946837206,
            "unit": "iter/sec",
            "range": "stddev: 0.000039980408346670686",
            "extra": "mean: 722.2148102564727 usec\nrounds: 1365"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 653.4049339864043,
            "unit": "iter/sec",
            "range": "stddev: 0.0000407634734611793",
            "extra": "mean: 1.530444519142256 msec\nrounds: 653"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 372.08357145844536,
            "unit": "iter/sec",
            "range": "stddev: 0.00004808887193075",
            "extra": "mean: 2.6875682688174827 msec\nrounds: 372"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10841.419495834525,
            "unit": "iter/sec",
            "range": "stddev: 0.000020825693993499744",
            "extra": "mean: 92.23884385104907 usec\nrounds: 9254"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4324.289375985308,
            "unit": "iter/sec",
            "range": "stddev: 0.000029187522985979264",
            "extra": "mean: 231.25186893214004 usec\nrounds: 3708"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1342.357718051689,
            "unit": "iter/sec",
            "range": "stddev: 0.00003619051176754417",
            "extra": "mean: 744.9579099164488 usec\nrounds: 1321"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 625.8759960028563,
            "unit": "iter/sec",
            "range": "stddev: 0.00011985958442710071",
            "extra": "mean: 1.597760588976856 msec\nrounds: 635"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 369.4876157505358,
            "unit": "iter/sec",
            "range": "stddev: 0.00007369460921762916",
            "extra": "mean: 2.7064506559136277 msec\nrounds: 372"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3263.817041448945,
            "unit": "iter/sec",
            "range": "stddev: 0.000025196793837010067",
            "extra": "mean: 306.3897232291116 usec\nrounds: 3035"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 889.4104345282263,
            "unit": "iter/sec",
            "range": "stddev: 0.00003465720338443074",
            "extra": "mean: 1.1243403058683858 msec\nrounds: 886"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 232.70193418676624,
            "unit": "iter/sec",
            "range": "stddev: 0.00003960486987659432",
            "extra": "mean: 4.297342879829273 msec\nrounds: 233"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 103.90867791284668,
            "unit": "iter/sec",
            "range": "stddev: 0.0002323163403339855",
            "extra": "mean: 9.623835276190782 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 58.13628164660524,
            "unit": "iter/sec",
            "range": "stddev: 0.00020797212803696849",
            "extra": "mean: 17.20096249152517 msec\nrounds: 59"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 967.4018856083305,
            "unit": "iter/sec",
            "range": "stddev: 0.000029382944699169458",
            "extra": "mean: 1.0336965586656581 msec\nrounds: 929"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 295.557240771006,
            "unit": "iter/sec",
            "range": "stddev: 0.000039264761790021766",
            "extra": "mean: 3.3834393547298927 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 81.12084709618175,
            "unit": "iter/sec",
            "range": "stddev: 0.00038786292461283404",
            "extra": "mean: 12.327287445782462 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 37.82128866223644,
            "unit": "iter/sec",
            "range": "stddev: 0.00008766782824638683",
            "extra": "mean: 26.440135578946403 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.70391953559193,
            "unit": "iter/sec",
            "range": "stddev: 0.00009842029531507724",
            "extra": "mean: 46.07462713636194 msec\nrounds: 22"
          }
        ]
      }
    ]
  }
}