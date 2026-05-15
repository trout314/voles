window.BENCHMARK_DATA = {
  "lastUpdate": 1778865549139,
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
          "id": "4fae05560981dedb4fde04683ace99a2daf7339c",
          "message": "Drop macOS x86_64 (Intel) wheel from CI and PyPI\n\nGitHub's macos-13 runner — the only way to build and natively load-test an\nIntel macOS wheel — is deprecated and currently capacity-starved (a queued\njob sat for 20+ minutes during the 0.3.2 publish attempt without ever\npicking up a runner). Cross-compiling on the arm64 macos-latest runner\nworks for the build but the Rosetta-based smoke test does not produce a\nreal x86_64 Python interpreter, so the wheel would ship without a\nload-time verification.\n\nRather than ship an under-tested artifact, drop the platform. Intel Mac\nusers can pin to volterra-equation-solvers==0.3.1 (the last tested x86_64\nrelease) or build from source per CONTRIBUTING.md.\n\n- Remove build-wheel-macos-x86_64 job\n- Remove the same job from publish.needs\n- Update README installation section\n- Document the removal in CHANGELOG 0.3.2\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-05-15T13:11:33-04:00",
          "tree_id": "c21e56195ca418df80bb740652b431848df61f99",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/4fae05560981dedb4fde04683ace99a2daf7339c"
        },
        "date": 1778865548693,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15831.62529875658,
            "unit": "iter/sec",
            "range": "stddev: 0.00007547192855108349",
            "extra": "mean: 63.164708684618766 usec\nrounds: 10916"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6207.007594018507,
            "unit": "iter/sec",
            "range": "stddev: 0.00001677976915786533",
            "extra": "mean: 161.10822886114522 usec\nrounds: 6008"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1862.459079776924,
            "unit": "iter/sec",
            "range": "stddev: 0.00001877949172134857",
            "extra": "mean: 536.9245482267321 usec\nrounds: 1804"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 867.4548690446655,
            "unit": "iter/sec",
            "range": "stddev: 0.000029917270054039286",
            "extra": "mean: 1.1527977254900965 msec\nrounds: 867"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.5556227597873,
            "unit": "iter/sec",
            "range": "stddev: 0.000024219866408006452",
            "extra": "mean: 1.9977799759526267 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28224.35417936608,
            "unit": "iter/sec",
            "range": "stddev: 0.000011244045833032649",
            "extra": "mean: 35.43039439078 usec\nrounds: 17115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16949.812183851755,
            "unit": "iter/sec",
            "range": "stddev: 0.000012998936923214476",
            "extra": "mean: 58.99770387737449 usec\nrounds: 14727"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7016.830304994534,
            "unit": "iter/sec",
            "range": "stddev: 0.000016345138566589304",
            "extra": "mean: 142.51449109268134 usec\nrounds: 6736"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3636.8946789761244,
            "unit": "iter/sec",
            "range": "stddev: 0.000016663708722638698",
            "extra": "mean: 274.95984576642314 usec\nrounds: 3378"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2193.349858494765,
            "unit": "iter/sec",
            "range": "stddev: 0.000020401633944035596",
            "extra": "mean: 455.92361662095806 usec\nrounds: 2178"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22002.293784876743,
            "unit": "iter/sec",
            "range": "stddev: 0.000012027564621576592",
            "extra": "mean: 45.449806723667564 usec\nrounds: 17074"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13278.158327070509,
            "unit": "iter/sec",
            "range": "stddev: 0.000013649628379256717",
            "extra": "mean: 75.31164905311269 usec\nrounds: 11771"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5803.184462722104,
            "unit": "iter/sec",
            "range": "stddev: 0.0000169238215813081",
            "extra": "mean: 172.31918206696622 usec\nrounds: 5476"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3120.9410367073456,
            "unit": "iter/sec",
            "range": "stddev: 0.000027005894958676242",
            "extra": "mean: 320.41617840208215 usec\nrounds: 2954"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1945.899569381604,
            "unit": "iter/sec",
            "range": "stddev: 0.000025835833145623728",
            "extra": "mean: 513.9011363869074 usec\nrounds: 1943"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1727.9381108651444,
            "unit": "iter/sec",
            "range": "stddev: 0.0000169669214455593",
            "extra": "mean: 578.724430992103 usec\nrounds: 1652"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 692.6883652970788,
            "unit": "iter/sec",
            "range": "stddev: 0.00002193602568408909",
            "extra": "mean: 1.443650637283509 msec\nrounds: 692"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 237.18628035650906,
            "unit": "iter/sec",
            "range": "stddev: 0.00031529762949416087",
            "extra": "mean: 4.2160954609049215 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 123.24833416879244,
            "unit": "iter/sec",
            "range": "stddev: 0.00027578682313169917",
            "extra": "mean: 8.113699927420267 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.23376650777828,
            "unit": "iter/sec",
            "range": "stddev: 0.00004600521801949907",
            "extra": "mean: 13.291903973684631 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10311.746047029405,
            "unit": "iter/sec",
            "range": "stddev: 0.00001408954868690849",
            "extra": "mean: 96.97678699991636 usec\nrounds: 8277"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4214.886634066844,
            "unit": "iter/sec",
            "range": "stddev: 0.00001751262962267865",
            "extra": "mean: 237.25430523267093 usec\nrounds: 3784"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1319.004029894059,
            "unit": "iter/sec",
            "range": "stddev: 0.000019855374388241707",
            "extra": "mean: 758.1477973803604 usec\nrounds: 1298"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 620.2158945180757,
            "unit": "iter/sec",
            "range": "stddev: 0.00008303592728510217",
            "extra": "mean: 1.6123417810454963 msec\nrounds: 612"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 362.48423966195986,
            "unit": "iter/sec",
            "range": "stddev: 0.00002807379668571765",
            "extra": "mean: 2.7587406308549163 msec\nrounds: 363"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9635.309637255732,
            "unit": "iter/sec",
            "range": "stddev: 0.00001587164183241086",
            "extra": "mean: 103.7849366182708 usec\nrounds: 8504"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3978.447766436112,
            "unit": "iter/sec",
            "range": "stddev: 0.000018292958113880535",
            "extra": "mean: 251.3543117083069 usec\nrounds: 3869"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1269.7415778531142,
            "unit": "iter/sec",
            "range": "stddev: 0.0000236851888442243",
            "extra": "mean: 787.5618294636026 usec\nrounds: 1249"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 607.381030260499,
            "unit": "iter/sec",
            "range": "stddev: 0.000064483022471716",
            "extra": "mean: 1.646412960199154 msec\nrounds: 603"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 351.61346507196373,
            "unit": "iter/sec",
            "range": "stddev: 0.00017292715205074723",
            "extra": "mean: 2.844032152737191 msec\nrounds: 347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3888.1142401329766,
            "unit": "iter/sec",
            "range": "stddev: 0.00001662697301668399",
            "extra": "mean: 257.1940890208512 usec\nrounds: 3707"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1100.6803871966436,
            "unit": "iter/sec",
            "range": "stddev: 0.000020323494707584713",
            "extra": "mean: 908.5289532113228 usec\nrounds: 1090"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 288.6375483897881,
            "unit": "iter/sec",
            "range": "stddev: 0.000047570979225620234",
            "extra": "mean: 3.4645527083314835 msec\nrounds: 288"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 130.0177294458729,
            "unit": "iter/sec",
            "range": "stddev: 0.00004811596656943193",
            "extra": "mean: 7.691258755724583 msec\nrounds: 131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.69033684532093,
            "unit": "iter/sec",
            "range": "stddev: 0.0000618084634425834",
            "extra": "mean: 13.570300297297345 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1014.086569355754,
            "unit": "iter/sec",
            "range": "stddev: 0.000021869478081467793",
            "extra": "mean: 986.1091056903523 usec\nrounds: 984"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 309.3157467303421,
            "unit": "iter/sec",
            "range": "stddev: 0.000031991138007869055",
            "extra": "mean: 3.2329424239490416 msec\nrounds: 309"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 84.52583736114903,
            "unit": "iter/sec",
            "range": "stddev: 0.0008378147107822176",
            "extra": "mean: 11.830702081392623 msec\nrounds: 86"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.59717159819325,
            "unit": "iter/sec",
            "range": "stddev: 0.0001508608019940022",
            "extra": "mean: 25.254329024996025 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.676442361341017,
            "unit": "iter/sec",
            "range": "stddev: 0.0001626450679540795",
            "extra": "mean: 44.09862817391533 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}