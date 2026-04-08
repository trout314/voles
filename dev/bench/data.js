window.BENCHMARK_DATA = {
  "lastUpdate": 1775661204969,
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
          "id": "f3a282dc7187499a22b31cad9077167e7d768caf",
          "message": "Add Mathematica verification comment to TestVIE2Complex\n\nCo-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-04-08T11:05:31-04:00",
          "tree_id": "de12b0c807a968798aa98eb11e08aabeb154a864",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/f3a282dc7187499a22b31cad9077167e7d768caf"
        },
        "date": 1775661204302,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16344.037834115745,
            "unit": "iter/sec",
            "range": "stddev: 0.00007641645727842076",
            "extra": "mean: 61.18439091670779 usec\nrounds: 12000"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6297.295258737402,
            "unit": "iter/sec",
            "range": "stddev: 0.000014553899550699658",
            "extra": "mean: 158.79833466796956 usec\nrounds: 5994"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1874.1594006584864,
            "unit": "iter/sec",
            "range": "stddev: 0.00002380923549233505",
            "extra": "mean: 533.572544389047 usec\nrounds: 1881"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 873.9204894650243,
            "unit": "iter/sec",
            "range": "stddev: 0.000025583747876798585",
            "extra": "mean: 1.1442688574702673 msec\nrounds: 870"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 501.77377179147607,
            "unit": "iter/sec",
            "range": "stddev: 0.00004183618857094923",
            "extra": "mean: 1.992929993988553 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30396.250727246268,
            "unit": "iter/sec",
            "range": "stddev: 0.000010507443985744269",
            "extra": "mean: 32.89879429450917 usec\nrounds: 17982"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17263.44886801602,
            "unit": "iter/sec",
            "range": "stddev: 0.000011999637451109762",
            "extra": "mean: 57.925852918804615 usec\nrounds: 15862"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6955.450973476605,
            "unit": "iter/sec",
            "range": "stddev: 0.00006591553017164872",
            "extra": "mean: 143.77212977466522 usec\nrounds: 5995"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3584.369646156758,
            "unit": "iter/sec",
            "range": "stddev: 0.000016161519431726615",
            "extra": "mean: 278.9890828007158 usec\nrounds: 3285"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2138.4504985910107,
            "unit": "iter/sec",
            "range": "stddev: 0.00005833789335823651",
            "extra": "mean: 467.6283134254841 usec\nrounds: 2160"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 23413.360156545874,
            "unit": "iter/sec",
            "range": "stddev: 0.000011570707465169146",
            "extra": "mean: 42.71065721937487 usec\nrounds: 19476"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13366.609886007873,
            "unit": "iter/sec",
            "range": "stddev: 0.00001236773177485669",
            "extra": "mean: 74.81328538261575 usec\nrounds: 12054"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5731.862242868413,
            "unit": "iter/sec",
            "range": "stddev: 0.000015341940257175953",
            "extra": "mean: 174.46336943010112 usec\nrounds: 5522"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3094.350499982377,
            "unit": "iter/sec",
            "range": "stddev: 0.00001833910829103699",
            "extra": "mean: 323.1695956892069 usec\nrounds: 3062"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1913.428461055991,
            "unit": "iter/sec",
            "range": "stddev: 0.00001985519755666545",
            "extra": "mean: 522.6220997298827 usec\nrounds: 1855"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1795.7420294395156,
            "unit": "iter/sec",
            "range": "stddev: 0.00002579395969017243",
            "extra": "mean: 556.8728601357727 usec\nrounds: 1766"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 706.7872806664906,
            "unit": "iter/sec",
            "range": "stddev: 0.00003003745685120716",
            "extra": "mean: 1.4148528522712152 msec\nrounds: 704"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.71814840439532,
            "unit": "iter/sec",
            "range": "stddev: 0.000030450252884792904",
            "extra": "mean: 4.120005061730651 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 122.3986409117647,
            "unit": "iter/sec",
            "range": "stddev: 0.000053239334937355726",
            "extra": "mean: 8.170025357723413 msec\nrounds: 123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.01941148799972,
            "unit": "iter/sec",
            "range": "stddev: 0.00006124223825131545",
            "extra": "mean: 13.50996961333749 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10382.524309596332,
            "unit": "iter/sec",
            "range": "stddev: 0.000013632938587269837",
            "extra": "mean: 96.31569069149424 usec\nrounds: 8283"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3915.203235834604,
            "unit": "iter/sec",
            "range": "stddev: 0.00001834769964610002",
            "extra": "mean: 255.41458252979552 usec\nrounds: 3732"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1192.7198456313179,
            "unit": "iter/sec",
            "range": "stddev: 0.000023353339626620784",
            "extra": "mean: 838.4198549749883 usec\nrounds: 1186"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 559.5758868887806,
            "unit": "iter/sec",
            "range": "stddev: 0.00002650509992381129",
            "extra": "mean: 1.7870677122274867 msec\nrounds: 556"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 322.51206272221106,
            "unit": "iter/sec",
            "range": "stddev: 0.00003294203454172939",
            "extra": "mean: 3.1006592173928356 msec\nrounds: 322"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9434.4955977861,
            "unit": "iter/sec",
            "range": "stddev: 0.000013752665110778905",
            "extra": "mean: 105.99400780203452 usec\nrounds: 8459"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3658.1592848343826,
            "unit": "iter/sec",
            "range": "stddev: 0.000016773485646643753",
            "extra": "mean: 273.361524782613 usec\nrounds: 3571"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1137.9800714592748,
            "unit": "iter/sec",
            "range": "stddev: 0.00003023102987538792",
            "extra": "mean: 878.7500107252865 usec\nrounds: 1119"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 544.4015526464657,
            "unit": "iter/sec",
            "range": "stddev: 0.000029080517341248575",
            "extra": "mean: 1.8368794048047101 msec\nrounds: 541"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 315.3093270911132,
            "unit": "iter/sec",
            "range": "stddev: 0.00012080060547879223",
            "extra": "mean: 3.171488801887029 msec\nrounds: 318"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3642.0427233941564,
            "unit": "iter/sec",
            "range": "stddev: 0.00001616984345212044",
            "extra": "mean: 274.5711887388467 usec\nrounds: 3481"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1012.8789937825638,
            "unit": "iter/sec",
            "range": "stddev: 0.000021400159473199195",
            "extra": "mean: 987.2847656416807 usec\nrounds: 1007"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 263.39319876445126,
            "unit": "iter/sec",
            "range": "stddev: 0.000029357032854438734",
            "extra": "mean: 3.7966052452792662 msec\nrounds: 265"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 117.90727861374799,
            "unit": "iter/sec",
            "range": "stddev: 0.00021406201490436133",
            "extra": "mean: 8.481240613447591 msec\nrounds: 119"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 66.97644759825258,
            "unit": "iter/sec",
            "range": "stddev: 0.0000694641207101054",
            "extra": "mean: 14.930621671641035 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1017.2159122247383,
            "unit": "iter/sec",
            "range": "stddev: 0.00002356759285936709",
            "extra": "mean: 983.0754591843872 usec\nrounds: 980"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 305.22008779550146,
            "unit": "iter/sec",
            "range": "stddev: 0.000036168518425403094",
            "extra": "mean: 3.276324331149539 msec\nrounds: 305"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 84.02635336913475,
            "unit": "iter/sec",
            "range": "stddev: 0.0005110135726753301",
            "extra": "mean: 11.901028188227055 msec\nrounds: 85"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 38.85532418204052,
            "unit": "iter/sec",
            "range": "stddev: 0.00010847650916949802",
            "extra": "mean: 25.736498692300557 msec\nrounds: 39"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.22494650676829,
            "unit": "iter/sec",
            "range": "stddev: 0.0003938303457373485",
            "extra": "mean: 44.99448400001612 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}