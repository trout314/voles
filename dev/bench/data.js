window.BENCHMARK_DATA = {
  "lastUpdate": 1772987241190,
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
          "id": "bc47e0c5b4f098d0c40177062b2ede3c2f96eb18",
          "message": "Split API reference into one page per solver\n\nEach solver now has its own page (api/vie1, api/vie2, api/vide).\nREADME headings link directly to the individual API pages.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T12:20:36-04:00",
          "tree_id": "aa19471775a8e07c85df92fb958eb7d6caf0feeb",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/bc47e0c5b4f098d0c40177062b2ede3c2f96eb18"
        },
        "date": 1772987240793,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15895.299254351263,
            "unit": "iter/sec",
            "range": "stddev: 0.00007351170368766172",
            "extra": "mean: 62.91168124602969 usec\nrounds: 10952"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6135.585280789943,
            "unit": "iter/sec",
            "range": "stddev: 0.000015354913373572897",
            "extra": "mean: 162.98363631761828 usec\nrounds: 5953"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1857.5748445294698,
            "unit": "iter/sec",
            "range": "stddev: 0.00002169002776521707",
            "extra": "mean: 538.3363168084371 usec\nrounds: 1856"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 867.0290680402244,
            "unit": "iter/sec",
            "range": "stddev: 0.00002553547305196946",
            "extra": "mean: 1.1533638684805971 msec\nrounds: 844"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 499.2436079911927,
            "unit": "iter/sec",
            "range": "stddev: 0.00003275148158822132",
            "extra": "mean: 2.003030152000747 msec\nrounds: 500"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28078.153785005547,
            "unit": "iter/sec",
            "range": "stddev: 0.000011378403944233133",
            "extra": "mean: 35.61487723363156 usec\nrounds: 17130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16683.91376737129,
            "unit": "iter/sec",
            "range": "stddev: 0.000013816396552697187",
            "extra": "mean: 59.93797462293882 usec\nrounds: 14816"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7006.620662492697,
            "unit": "iter/sec",
            "range": "stddev: 0.000015846281869328022",
            "extra": "mean: 142.72215496881728 usec\nrounds: 6711"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3650.824453981658,
            "unit": "iter/sec",
            "range": "stddev: 0.000016834101998994193",
            "extra": "mean: 273.91073238522364 usec\nrounds: 3591"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2206.4145127029456,
            "unit": "iter/sec",
            "range": "stddev: 0.000021312587887474462",
            "extra": "mean: 453.2239949668207 usec\nrounds: 2186"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 23705.995384726484,
            "unit": "iter/sec",
            "range": "stddev: 0.000011786242381565692",
            "extra": "mean: 42.183421694424574 usec\nrounds: 20088"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13732.267182790894,
            "unit": "iter/sec",
            "range": "stddev: 0.000013942995327011084",
            "extra": "mean: 72.82118725837111 usec\nrounds: 12667"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5950.144805927566,
            "unit": "iter/sec",
            "range": "stddev: 0.00001692674982045939",
            "extra": "mean: 168.063136716235 usec\nrounds: 5654"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3208.70390698535,
            "unit": "iter/sec",
            "range": "stddev: 0.000018020243340388",
            "extra": "mean: 311.65231476266774 usec\nrounds: 3123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1967.6272999798603,
            "unit": "iter/sec",
            "range": "stddev: 0.000028693734955485632",
            "extra": "mean: 508.2263292495665 usec\nrounds: 1959"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1765.0947165776456,
            "unit": "iter/sec",
            "range": "stddev: 0.0000214410760778173",
            "extra": "mean: 566.5418351820275 usec\nrounds: 1717"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 698.8935879771103,
            "unit": "iter/sec",
            "range": "stddev: 0.00003070047532515302",
            "extra": "mean: 1.4308329868849095 msec\nrounds: 686"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 243.95076653341317,
            "unit": "iter/sec",
            "range": "stddev: 0.00003339827717636664",
            "extra": "mean: 4.0991877755097486 msec\nrounds: 245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.02311654371863,
            "unit": "iter/sec",
            "range": "stddev: 0.00010227696037865168",
            "extra": "mean: 8.063012991997311 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.34301837288824,
            "unit": "iter/sec",
            "range": "stddev: 0.0000493796056688704",
            "extra": "mean: 13.272629921073674 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10743.876520171747,
            "unit": "iter/sec",
            "range": "stddev: 0.00001446992483163613",
            "extra": "mean: 93.07627448272407 usec\nrounds: 7873"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4228.50333115609,
            "unit": "iter/sec",
            "range": "stddev: 0.00001742281741045676",
            "extra": "mean: 236.4902949542187 usec\nrounds: 4143"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1323.2342438014557,
            "unit": "iter/sec",
            "range": "stddev: 0.000024514745722375197",
            "extra": "mean: 755.7240939647604 usec\nrounds: 1309"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 627.8609635214845,
            "unit": "iter/sec",
            "range": "stddev: 0.000029417241750658686",
            "extra": "mean: 1.592709306836499 msec\nrounds: 629"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 362.9290956817537,
            "unit": "iter/sec",
            "range": "stddev: 0.00003341078292648682",
            "extra": "mean: 2.755359137358562 msec\nrounds: 364"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9934.607390819587,
            "unit": "iter/sec",
            "range": "stddev: 0.000018266093883945043",
            "extra": "mean: 100.65823043234543 usec\nrounds: 8623"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4049.8762312468684,
            "unit": "iter/sec",
            "range": "stddev: 0.00001989028272790905",
            "extra": "mean: 246.9211262024474 usec\nrounds: 3954"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1278.2578151984221,
            "unit": "iter/sec",
            "range": "stddev: 0.000031193613921328065",
            "extra": "mean: 782.3147944882867 usec\nrounds: 1270"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 611.9816994298423,
            "unit": "iter/sec",
            "range": "stddev: 0.000030487454401924204",
            "extra": "mean: 1.63403579050102 msec\nrounds: 611"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 355.7082998345591,
            "unit": "iter/sec",
            "range": "stddev: 0.0000593199414713807",
            "extra": "mean: 2.8112922877118773 msec\nrounds: 358"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3929.3538071400553,
            "unit": "iter/sec",
            "range": "stddev: 0.000030145245403398164",
            "extra": "mean: 254.49477168049697 usec\nrounds: 3736"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1125.8471570595188,
            "unit": "iter/sec",
            "range": "stddev: 0.00003552801004899755",
            "extra": "mean: 888.2200338914513 usec\nrounds: 1121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 295.5101771059032,
            "unit": "iter/sec",
            "range": "stddev: 0.000037256314442183436",
            "extra": "mean: 3.3839782094598583 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.8266801766554,
            "unit": "iter/sec",
            "range": "stddev: 0.00010725113222002892",
            "extra": "mean: 7.528607947364421 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.33031739553526,
            "unit": "iter/sec",
            "range": "stddev: 0.00005959404535882967",
            "extra": "mean: 13.27486773684122 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1029.7788528558858,
            "unit": "iter/sec",
            "range": "stddev: 0.000022056982245912445",
            "extra": "mean: 971.0822835667093 usec\nrounds: 998"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 311.40874583929775,
            "unit": "iter/sec",
            "range": "stddev: 0.00012269536945698812",
            "extra": "mean: 3.211213600648356 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.57503328964985,
            "unit": "iter/sec",
            "range": "stddev: 0.00005305360253336563",
            "extra": "mean: 11.550674160925228 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.86898362251429,
            "unit": "iter/sec",
            "range": "stddev: 0.00007055031667080363",
            "extra": "mean: 25.08215432497991 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.802617329232614,
            "unit": "iter/sec",
            "range": "stddev: 0.0004291668981377442",
            "extra": "mean: 43.85461482608029 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}