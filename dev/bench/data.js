window.BENCHMARK_DATA = {
  "lastUpdate": 1778859057626,
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
          "id": "5199896d078ea403ff4d4eac5e77e55ff917b442",
          "message": "Use macos-13 native build for x86_64 wheel instead of cross-compile + Rosetta\n\nThe cross-compile-on-arm64 plus actions/setup-python@v5 architecture: x64\nplus Rosetta scheme was always going to be fragile: in practice setup-python\ninstalls an arm64 interpreter under the x64 toolcache path, so pip rejects\nthe cross-compiled wheel as \"not a supported wheel on this platform\". The\nv0.3.2 publish attempt failed on exactly that step.\n\nBuild natively on macos-13 instead. The wheel is the same shape, the smoke\ntest actually exercises the load path on real Intel hardware, and the only\ntrade-off is that this runner is GitHub-deprecated. When it disappears we\nwill drop the x86_64 wheel; users will be able to fall back to a tested\n0.3.x for x86_64 functionality.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-05-15T11:23:05-04:00",
          "tree_id": "29888502c4581630c0e12b126e4aff0d8cb461c3",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/5199896d078ea403ff4d4eac5e77e55ff917b442"
        },
        "date": 1778859056561,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15701.463409056703,
            "unit": "iter/sec",
            "range": "stddev: 0.00009496523174528606",
            "extra": "mean: 63.68833107767482 usec\nrounds: 10197"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6195.327471589959,
            "unit": "iter/sec",
            "range": "stddev: 0.00001789734300260598",
            "extra": "mean: 161.41196806556565 usec\nrounds: 5981"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1852.6469896359488,
            "unit": "iter/sec",
            "range": "stddev: 0.00002887084047113175",
            "extra": "mean: 539.7682373351133 usec\nrounds: 1816"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 864.3936301646836,
            "unit": "iter/sec",
            "range": "stddev: 0.00003772652563307019",
            "extra": "mean: 1.1568803437497346 msec\nrounds: 864"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 498.95077542659635,
            "unit": "iter/sec",
            "range": "stddev: 0.000029899864280705207",
            "extra": "mean: 2.0042057237911157 msec\nrounds: 496"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27845.592510757237,
            "unit": "iter/sec",
            "range": "stddev: 0.000011342413531408632",
            "extra": "mean: 35.912326146900355 usec\nrounds: 15910"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16665.90951544061,
            "unit": "iter/sec",
            "range": "stddev: 0.000013330870835511679",
            "extra": "mean: 60.002725868247474 usec\nrounds: 14887"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6968.298663864239,
            "unit": "iter/sec",
            "range": "stddev: 0.000016341520517180463",
            "extra": "mean: 143.5070521855983 usec\nrounds: 6726"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3628.9260533001816,
            "unit": "iter/sec",
            "range": "stddev: 0.0000191900112023849",
            "extra": "mean: 275.56362001110216 usec\nrounds: 3608"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2179.84609020523,
            "unit": "iter/sec",
            "range": "stddev: 0.000021104206620512675",
            "extra": "mean: 458.74798431565006 usec\nrounds: 2104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22061.5301199427,
            "unit": "iter/sec",
            "range": "stddev: 0.000012314852992966655",
            "extra": "mean: 45.32777167146906 usec\nrounds: 17177"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13177.554272198404,
            "unit": "iter/sec",
            "range": "stddev: 0.000014044255192481497",
            "extra": "mean: 75.88661593371458 usec\nrounds: 11761"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5771.998064004722,
            "unit": "iter/sec",
            "range": "stddev: 0.00001692331084902597",
            "extra": "mean: 173.25023136029623 usec\nrounds: 5593"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3115.4465215629466,
            "unit": "iter/sec",
            "range": "stddev: 0.000027150657040023364",
            "extra": "mean: 320.9812760638637 usec\nrounds: 3079"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1944.7924692000802,
            "unit": "iter/sec",
            "range": "stddev: 0.00002400435112409887",
            "extra": "mean: 514.1936817614858 usec\nrounds: 1612"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1713.3291001642556,
            "unit": "iter/sec",
            "range": "stddev: 0.00003276967389715422",
            "extra": "mean: 583.6590296074063 usec\nrounds: 1655"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 692.219892672936,
            "unit": "iter/sec",
            "range": "stddev: 0.000027609433175753574",
            "extra": "mean: 1.4446276545717325 msec\nrounds: 689"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 240.11573784935786,
            "unit": "iter/sec",
            "range": "stddev: 0.00004348963996942261",
            "extra": "mean: 4.1646582975222275 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 119.9831236921434,
            "unit": "iter/sec",
            "range": "stddev: 0.0008235440374816814",
            "extra": "mean: 8.334505464000358 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.17461862101223,
            "unit": "iter/sec",
            "range": "stddev: 0.00005609990720059175",
            "extra": "mean: 13.30236213157838 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10222.0177474622,
            "unit": "iter/sec",
            "range": "stddev: 0.000014777556651864393",
            "extra": "mean: 97.82804380752206 usec\nrounds: 8058"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4130.663517428852,
            "unit": "iter/sec",
            "range": "stddev: 0.000017549703749244627",
            "extra": "mean: 242.09185661834152 usec\nrounds: 4087"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1282.5362104689123,
            "unit": "iter/sec",
            "range": "stddev: 0.000037869494418065584",
            "extra": "mean: 779.7050811020663 usec\nrounds: 1270"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 608.6487354122679,
            "unit": "iter/sec",
            "range": "stddev: 0.000030107381421120835",
            "extra": "mean: 1.6429837800002172 msec\nrounds: 600"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 344.4336951076163,
            "unit": "iter/sec",
            "range": "stddev: 0.0002634125170450851",
            "extra": "mean: 2.903316412430427 msec\nrounds: 354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9459.340866719956,
            "unit": "iter/sec",
            "range": "stddev: 0.000016903509194520784",
            "extra": "mean: 105.715611065272 usec\nrounds: 8495"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3889.5271900153266,
            "unit": "iter/sec",
            "range": "stddev: 0.00001980903723473858",
            "extra": "mean: 257.1006580355232 usec\nrounds: 3553"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1240.09086599737,
            "unit": "iter/sec",
            "range": "stddev: 0.000026596448335177954",
            "extra": "mean: 806.3925212413595 usec\nrounds: 1224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 593.834810595253,
            "unit": "iter/sec",
            "range": "stddev: 0.00002997119684634146",
            "extra": "mean: 1.6839699898993994 msec\nrounds: 594"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 338.6139446120109,
            "unit": "iter/sec",
            "range": "stddev: 0.00019770528590957036",
            "extra": "mean: 2.9532156484158243 msec\nrounds: 347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3929.038179288561,
            "unit": "iter/sec",
            "range": "stddev: 0.000019445316742056467",
            "extra": "mean: 254.51521577758555 usec\nrounds: 3448"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1120.2016118423064,
            "unit": "iter/sec",
            "range": "stddev: 0.00002199069023315475",
            "extra": "mean: 892.6964480575775 usec\nrounds: 1107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.8379084372296,
            "unit": "iter/sec",
            "range": "stddev: 0.000038882303129172816",
            "extra": "mean: 3.3916941186445095 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 133.02851325411302,
            "unit": "iter/sec",
            "range": "stddev: 0.0000464572313238972",
            "extra": "mean: 7.517185417909507 msec\nrounds: 134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.24682503149575,
            "unit": "iter/sec",
            "range": "stddev: 0.00006311918136878998",
            "extra": "mean: 13.289597263159399 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1020.2607340242286,
            "unit": "iter/sec",
            "range": "stddev: 0.00002277328425719562",
            "extra": "mean: 980.1416115032538 usec\nrounds: 991"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 305.9409930858003,
            "unit": "iter/sec",
            "range": "stddev: 0.00034098077770045504",
            "extra": "mean: 3.268604151126465 msec\nrounds: 311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.3484626830377,
            "unit": "iter/sec",
            "range": "stddev: 0.0001534162653430255",
            "extra": "mean: 11.580982091953794 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 38.699663334923684,
            "unit": "iter/sec",
            "range": "stddev: 0.0023702421654214923",
            "extra": "mean: 25.84001807316942 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.912791131140867,
            "unit": "iter/sec",
            "range": "stddev: 0.00007696912925865357",
            "extra": "mean: 43.643744416667595 msec\nrounds: 24"
          }
        ]
      }
    ]
  }
}