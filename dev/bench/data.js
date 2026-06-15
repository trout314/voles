window.BENCHMARK_DATA = {
  "lastUpdate": 1781537102280,
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
          "id": "94483f394a40c45d2c0b61b6b4a84211c3d09486",
          "message": "Expand function_solve_VIE_2 test coverage to match (and exceed) array-based solvers\n\nAdd the missing parity items relative to the existing test_vie2.py and\ntest_input_validation.py: a second analytic problem (K=2cos(s), y=exp(t)),\ncoll_divs/coll_choices validation cases (non-positive divs, float choices,\nduplicates), NaN propagation from kernel and g callables, and a defensive\ncheck that coll_choices is not mutated.\n\nAdd coverage that's specific to the new callable-input solver:\nkernel_singularity list and callable forms, singularities at non-zero\nlocations and multiple locations, single-interval mesh edge case, the\nminimal coll_divs=1 collocation setting, a check that g is sampled at\nthe expected collocation points (catches off-by-one regressions), and a\nfriendly ImportError when scipy is unavailable.\n\nAlso tighten coll_choices validation to reject non-integer entries\n(matching the array-based solvers, which assert isinstance(c, int)).\n\n39 tests pass in 17 s; full suite 163 passed, 6 skipped.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-15T11:17:23-04:00",
          "tree_id": "5bdda4ce8c0792fe4b70ae9536ce32f1a0b793e7",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/94483f394a40c45d2c0b61b6b4a84211c3d09486"
        },
        "date": 1781537101344,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15886.933747599915,
            "unit": "iter/sec",
            "range": "stddev: 0.0000784546978975339",
            "extra": "mean: 62.94480834925575 usec\nrounds: 11354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5844.623235068847,
            "unit": "iter/sec",
            "range": "stddev: 0.000024537105855005807",
            "extra": "mean: 171.09742746115958 usec\nrounds: 5404"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1680.0528782341626,
            "unit": "iter/sec",
            "range": "stddev: 0.00003658306005711063",
            "extra": "mean: 595.2193606257564 usec\nrounds: 1661"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 774.8824979699008,
            "unit": "iter/sec",
            "range": "stddev: 0.00004771474248277175",
            "extra": "mean: 1.2905182432431757 msec\nrounds: 777"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 441.6844505131829,
            "unit": "iter/sec",
            "range": "stddev: 0.0000426912273718233",
            "extra": "mean: 2.2640597803208222 msec\nrounds: 437"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30921.320178357942,
            "unit": "iter/sec",
            "range": "stddev: 0.00001256632627711452",
            "extra": "mean: 32.34014570632425 usec\nrounds: 12134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17638.60357912822,
            "unit": "iter/sec",
            "range": "stddev: 0.000018017605056393226",
            "extra": "mean: 56.693830410889284 usec\nrounds: 15626"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6922.734337025275,
            "unit": "iter/sec",
            "range": "stddev: 0.000024468836391016338",
            "extra": "mean: 144.45159258122044 usec\nrounds: 6524"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3514.5597118707637,
            "unit": "iter/sec",
            "range": "stddev: 0.000026182521626054055",
            "extra": "mean: 284.53066158540537 usec\nrounds: 3280"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2087.126872873773,
            "unit": "iter/sec",
            "range": "stddev: 0.000036128988579689664",
            "extra": "mean: 479.12755712023204 usec\nrounds: 1917"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24762.34878847839,
            "unit": "iter/sec",
            "range": "stddev: 0.000015025924620875638",
            "extra": "mean: 40.38389122704254 usec\nrounds: 19674"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14140.783735188685,
            "unit": "iter/sec",
            "range": "stddev: 0.000020506644717862915",
            "extra": "mean: 70.71743820758297 usec\nrounds: 12898"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5879.271752092575,
            "unit": "iter/sec",
            "range": "stddev: 0.00002762872367895695",
            "extra": "mean: 170.0890930316456 usec\nrounds: 5482"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3108.145057807454,
            "unit": "iter/sec",
            "range": "stddev: 0.0000316591381029776",
            "extra": "mean: 321.73530559266095 usec\nrounds: 2968"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1901.129116539517,
            "unit": "iter/sec",
            "range": "stddev: 0.00003576323190538983",
            "extra": "mean: 526.003200571787 usec\nrounds: 1750"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1686.6222993252936,
            "unit": "iter/sec",
            "range": "stddev: 0.000023450082504454848",
            "extra": "mean: 592.900971604629 usec\nrounds: 1620"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 674.3354185747842,
            "unit": "iter/sec",
            "range": "stddev: 0.00007619550569248497",
            "extra": "mean: 1.4829415339231502 msec\nrounds: 678"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 241.04291305131719,
            "unit": "iter/sec",
            "range": "stddev: 0.0001329316684710826",
            "extra": "mean: 4.1486388765435445 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.51734228790613,
            "unit": "iter/sec",
            "range": "stddev: 0.00004876848411226497",
            "extra": "mean: 8.031009830645301 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 76.07099198673464,
            "unit": "iter/sec",
            "range": "stddev: 0.000052311426990080034",
            "extra": "mean: 13.145615350650106 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10859.152936898481,
            "unit": "iter/sec",
            "range": "stddev: 0.000019412774388239107",
            "extra": "mean: 92.08821404495417 usec\nrounds: 6821"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4069.335828655263,
            "unit": "iter/sec",
            "range": "stddev: 0.00003247618812225445",
            "extra": "mean: 245.74034734568866 usec\nrounds: 3711"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1233.6686407857044,
            "unit": "iter/sec",
            "range": "stddev: 0.00003809548188960964",
            "extra": "mean: 810.5904348538157 usec\nrounds: 1228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 575.9210774901497,
            "unit": "iter/sec",
            "range": "stddev: 0.00004610769774810984",
            "extra": "mean: 1.7363490226090976 msec\nrounds: 575"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 331.2285768069801,
            "unit": "iter/sec",
            "range": "stddev: 0.00005990329620386208",
            "extra": "mean: 3.019063178787075 msec\nrounds: 330"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10181.513476287371,
            "unit": "iter/sec",
            "range": "stddev: 0.000020735201752291184",
            "extra": "mean: 98.21722500579001 usec\nrounds: 8822"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3884.263352836613,
            "unit": "iter/sec",
            "range": "stddev: 0.00002852896532127865",
            "extra": "mean: 257.44907313499135 usec\nrounds: 3391"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1153.4832416809636,
            "unit": "iter/sec",
            "range": "stddev: 0.00006023268181875055",
            "extra": "mean: 866.9393397885057 usec\nrounds: 1136"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 544.0544823891499,
            "unit": "iter/sec",
            "range": "stddev: 0.00006031356657174745",
            "extra": "mean: 1.8380512106225466 msec\nrounds: 546"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 317.51962728901316,
            "unit": "iter/sec",
            "range": "stddev: 0.00005356441906230299",
            "extra": "mean: 3.1494116081516395 msec\nrounds: 319"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4226.762313311766,
            "unit": "iter/sec",
            "range": "stddev: 0.000025703823895804673",
            "extra": "mean: 236.58770611505642 usec\nrounds: 3549"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1192.5319694274046,
            "unit": "iter/sec",
            "range": "stddev: 0.00003335895219595162",
            "extra": "mean: 838.5519429555847 usec\nrounds: 1157"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 311.32255682400574,
            "unit": "iter/sec",
            "range": "stddev: 0.000046763615468419284",
            "extra": "mean: 3.2121026185883204 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 138.1624334811685,
            "unit": "iter/sec",
            "range": "stddev: 0.00046043434777529453",
            "extra": "mean: 7.237857460988479 msec\nrounds: 141"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 79.0676320319535,
            "unit": "iter/sec",
            "range": "stddev: 0.0001734913606335293",
            "extra": "mean: 12.647400387504604 msec\nrounds: 80"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 965.9478583835493,
            "unit": "iter/sec",
            "range": "stddev: 0.000030549174041136254",
            "extra": "mean: 1.035252567020993 msec\nrounds: 940"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 295.37655600906675,
            "unit": "iter/sec",
            "range": "stddev: 0.00004729990727833531",
            "extra": "mean: 3.38550903806091 msec\nrounds: 289"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 81.69866916453934,
            "unit": "iter/sec",
            "range": "stddev: 0.000223176892729285",
            "extra": "mean: 12.240101463415785 msec\nrounds: 82"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 37.893568372399045,
            "unit": "iter/sec",
            "range": "stddev: 0.00020250180042488992",
            "extra": "mean: 26.389702605267995 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.77656635355131,
            "unit": "iter/sec",
            "range": "stddev: 0.00019084185881417974",
            "extra": "mean: 45.920921772725684 msec\nrounds: 22"
          }
        ]
      }
    ]
  }
}