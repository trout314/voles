window.BENCHMARK_DATA = {
  "lastUpdate": 1773437184926,
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
          "id": "57f20e54db7c48ecd651ccb0a18e0bd389804d3c",
          "message": "Fix wheels missing compiled D extension; bump to 0.3.1\n\nHatchling excludes non-Python files by default, so the .so/.dylib/.dll\nwas never packaged into wheels.  Add `artifacts` directive to include\nthem.  All 0.2.0 and 0.3.0 wheels on PyPI are affected (ImportError on\nimport).\n\nCo-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-03-13T17:18:58-04:00",
          "tree_id": "c15a69fc06b5cb265ed2473f9d1cc168d4053622",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/57f20e54db7c48ecd651ccb0a18e0bd389804d3c"
        },
        "date": 1773437184587,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15704.363550256825,
            "unit": "iter/sec",
            "range": "stddev: 0.00010133947113247011",
            "extra": "mean: 63.67656968713299 usec\nrounds: 8940"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6225.089944283007,
            "unit": "iter/sec",
            "range": "stddev: 0.00001567029358644123",
            "extra": "mean: 160.6402492093113 usec\nrounds: 6015"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1867.7123360005944,
            "unit": "iter/sec",
            "range": "stddev: 0.000018040951943903177",
            "extra": "mean: 535.4143572994432 usec\nrounds: 1822"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 870.0965327602792,
            "unit": "iter/sec",
            "range": "stddev: 0.0000227153952035371",
            "extra": "mean: 1.149297764499322 msec\nrounds: 862"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 501.722543419995,
            "unit": "iter/sec",
            "range": "stddev: 0.00002413561963326636",
            "extra": "mean: 1.993133482070575 msec\nrounds: 502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27936.96883417499,
            "unit": "iter/sec",
            "range": "stddev: 0.000010396965299334674",
            "extra": "mean: 35.7948640003031 usec\nrounds: 15978"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17097.92699926737,
            "unit": "iter/sec",
            "range": "stddev: 0.000012335439360305441",
            "extra": "mean: 58.486622386611494 usec\nrounds: 13964"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7146.117065363529,
            "unit": "iter/sec",
            "range": "stddev: 0.00001480949222443741",
            "extra": "mean: 139.93613466632024 usec\nrounds: 6802"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3719.6347983311834,
            "unit": "iter/sec",
            "range": "stddev: 0.000015818292321698484",
            "extra": "mean: 268.8435973468822 usec\nrounds: 3621"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2253.8984621660625,
            "unit": "iter/sec",
            "range": "stddev: 0.0000175135984034963",
            "extra": "mean: 443.6757097917227 usec\nrounds: 2257"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22111.58149079863,
            "unit": "iter/sec",
            "range": "stddev: 0.000011761506027593193",
            "extra": "mean: 45.22516855775936 usec\nrounds: 17626"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13257.955196056942,
            "unit": "iter/sec",
            "range": "stddev: 0.000013319647258938176",
            "extra": "mean: 75.42641268673246 usec\nrounds: 11934"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5813.857411204337,
            "unit": "iter/sec",
            "range": "stddev: 0.000021118909514542405",
            "extra": "mean: 172.0028423939022 usec\nrounds: 5647"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3209.877225894761,
            "unit": "iter/sec",
            "range": "stddev: 0.000017291126655766998",
            "extra": "mean: 311.5383952796661 usec\nrounds: 3008"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1993.407113445901,
            "unit": "iter/sec",
            "range": "stddev: 0.000019584285296878313",
            "extra": "mean: 501.65367287736376 usec\nrounds: 1932"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1784.0047168472026,
            "unit": "iter/sec",
            "range": "stddev: 0.000015163546494597904",
            "extra": "mean: 560.5366345483986 usec\nrounds: 1702"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 707.8013027296101,
            "unit": "iter/sec",
            "range": "stddev: 0.000023546738749044798",
            "extra": "mean: 1.412825882268846 msec\nrounds: 705"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 246.66894733248046,
            "unit": "iter/sec",
            "range": "stddev: 0.00002993143722056454",
            "extra": "mean: 4.054016570849994 msec\nrounds: 247"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 125.61577075136432,
            "unit": "iter/sec",
            "range": "stddev: 0.0000343169251335025",
            "extra": "mean: 7.960783857142706 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 76.0414717259507,
            "unit": "iter/sec",
            "range": "stddev: 0.000052616166892552315",
            "extra": "mean: 13.150718644740929 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10498.947002066907,
            "unit": "iter/sec",
            "range": "stddev: 0.000014084531291792127",
            "extra": "mean: 95.24764719767914 usec\nrounds: 6763"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4253.285848897582,
            "unit": "iter/sec",
            "range": "stddev: 0.00001704832713274264",
            "extra": "mean: 235.11234267482686 usec\nrounds: 4068"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1317.6048402009349,
            "unit": "iter/sec",
            "range": "stddev: 0.000022059173453399765",
            "extra": "mean: 758.9528889765613 usec\nrounds: 1297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 625.5974417848703,
            "unit": "iter/sec",
            "range": "stddev: 0.000036835995031561665",
            "extra": "mean: 1.5984720096471858 msec\nrounds: 622"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 362.66055319588696,
            "unit": "iter/sec",
            "range": "stddev: 0.0000309754044041474",
            "extra": "mean: 2.75739942264926 msec\nrounds: 362"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9662.674664398364,
            "unit": "iter/sec",
            "range": "stddev: 0.000014535936691296945",
            "extra": "mean: 103.49101410652368 usec\nrounds: 8436"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3984.5032786940365,
            "unit": "iter/sec",
            "range": "stddev: 0.000017255542106595386",
            "extra": "mean: 250.9723119936196 usec\nrounds: 3827"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1272.0013426482985,
            "unit": "iter/sec",
            "range": "stddev: 0.00002237126479520012",
            "extra": "mean: 786.1626921855337 usec\nrounds: 1254"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 607.8605473628492,
            "unit": "iter/sec",
            "range": "stddev: 0.00003239891083605559",
            "extra": "mean: 1.6451141702458143 msec\nrounds: 605"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 355.12601907002426,
            "unit": "iter/sec",
            "range": "stddev: 0.00003795968865701742",
            "extra": "mean: 2.8159018103452977 msec\nrounds: 348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3955.791487117819,
            "unit": "iter/sec",
            "range": "stddev: 0.000015855995299056446",
            "extra": "mean: 252.79391071459074 usec\nrounds: 3752"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1120.5007220927205,
            "unit": "iter/sec",
            "range": "stddev: 0.00002309395121708951",
            "extra": "mean: 892.4581486501272 usec\nrounds: 1110"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 293.9279359239413,
            "unit": "iter/sec",
            "range": "stddev: 0.00003266576548149909",
            "extra": "mean: 3.4021944761955756 msec\nrounds: 294"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 131.7034873289219,
            "unit": "iter/sec",
            "range": "stddev: 0.00019386609430977023",
            "extra": "mean: 7.592813374049522 msec\nrounds: 131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.0631068774195,
            "unit": "iter/sec",
            "range": "stddev: 0.00005337839115485233",
            "extra": "mean: 13.501999067566553 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1036.0912474284291,
            "unit": "iter/sec",
            "range": "stddev: 0.000020964625042379502",
            "extra": "mean: 965.1659566490815 usec\nrounds: 1015"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 314.82594249625197,
            "unit": "iter/sec",
            "range": "stddev: 0.000028726931021907276",
            "extra": "mean: 3.1763583142831537 msec\nrounds: 315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 87.13983585781001,
            "unit": "iter/sec",
            "range": "stddev: 0.00006849679141266059",
            "extra": "mean: 11.475807707874788 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 40.01834300291084,
            "unit": "iter/sec",
            "range": "stddev: 0.00016804705526836508",
            "extra": "mean: 24.988540878048408 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.912469645980995,
            "unit": "iter/sec",
            "range": "stddev: 0.00008224609072926587",
            "extra": "mean: 43.64435678261365 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}