window.BENCHMARK_DATA = {
  "lastUpdate": 1782500177679,
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
          "id": "df22c8129911c9280a462b81126921d4f3e1c9b0",
          "message": "docs: single-source install, move benchmarks to docs, consolidate examples\n\nRestructure docs so every fact has one canonical home and README/site can't\ndrift, and fix the stale docs flagged in the audit.\n\n- Install/dependencies: single-source the README install block into the docs\n  via pymdownx.snippets (`--8<-- \"README.md:install\"`). Fixes index.md /\n  getting_started.md which still told users scipy was an optional [callable]\n  extra (it's a core dependency since 0.6.0) and recommended `pip install voles`\n  instead of `voles[full]`. Made the CONTRIBUTING link absolute so it works on\n  the site.\n- Benchmarks: move the measured tables from README to a new docs/benchmarks.md\n  page (README keeps the asymptotic-complexity table + a link). Retarget\n  bench.yml's make_table step to docs/benchmarks.md.\n- Examples: add docs/examples pages for vector/matrix, complex, and\n  return_function solutions (previously only in README, untested). Trim the\n  README sections to prose + links. Add README.md to the markdown-docs CI scope\n  so its remaining code blocks are executed too.\n\nValidated with `mkdocs build --strict` (snippets/nav/links) and\n`pytest --markdown-docs docs/ README.md` (18 example blocks pass).\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-26T14:48:01-04:00",
          "tree_id": "32ea085c7b2c24ae1a42dffe636d4635521f7b95",
          "url": "https://github.com/trout314/voles/commit/df22c8129911c9280a462b81126921d4f3e1c9b0"
        },
        "date": 1782500177228,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15612.830068699997,
            "unit": "iter/sec",
            "range": "stddev: 0.00007699366566273499",
            "extra": "mean: 64.0498868942897 usec\nrounds: 11308"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6166.213799284538,
            "unit": "iter/sec",
            "range": "stddev: 0.000019727777842945605",
            "extra": "mean: 162.174071894171 usec\nrounds: 5981"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1791.6745358779785,
            "unit": "iter/sec",
            "range": "stddev: 0.00009716602011373046",
            "extra": "mean: 558.1370834798228 usec\nrounds: 1701"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 498.0184061340148,
            "unit": "iter/sec",
            "range": "stddev: 0.000030231256588574832",
            "extra": "mean: 2.007957914171758 msec\nrounds: 501"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 128.1819050317748,
            "unit": "iter/sec",
            "range": "stddev: 0.00013042143402660638",
            "extra": "mean: 7.801413153846572 msec\nrounds: 130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27560.320670825044,
            "unit": "iter/sec",
            "range": "stddev: 0.000011476240435918054",
            "extra": "mean: 36.284048068373366 usec\nrounds: 15894"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16632.46289604693,
            "unit": "iter/sec",
            "range": "stddev: 0.000013272145815051371",
            "extra": "mean: 60.12338679184259 usec\nrounds: 14597"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6964.385757955585,
            "unit": "iter/sec",
            "range": "stddev: 0.0000194439416786269",
            "extra": "mean: 143.58768091754192 usec\nrounds: 6666"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2204.103118178168,
            "unit": "iter/sec",
            "range": "stddev: 0.00002819197850778761",
            "extra": "mean: 453.6992810148392 usec\nrounds: 2128"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 611.0733921854252,
            "unit": "iter/sec",
            "range": "stddev: 0.00002590882044477917",
            "extra": "mean: 1.63646464203527 msec\nrounds: 609"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22126.06677177748,
            "unit": "iter/sec",
            "range": "stddev: 0.000012687775385289759",
            "extra": "mean: 45.19556097857992 usec\nrounds: 17293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13162.371366887774,
            "unit": "iter/sec",
            "range": "stddev: 0.000013997051272890933",
            "extra": "mean: 75.97415177903834 usec\nrounds: 11945"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5825.835836976943,
            "unit": "iter/sec",
            "range": "stddev: 0.00001703921800937756",
            "extra": "mean: 171.64918957258246 usec\nrounds: 5639"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1952.4582715591425,
            "unit": "iter/sec",
            "range": "stddev: 0.000044280506131614616",
            "extra": "mean: 512.1748385441531 usec\nrounds: 1951"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 571.6888286846767,
            "unit": "iter/sec",
            "range": "stddev: 0.000033646476459322553",
            "extra": "mean: 1.749203324998965 msec\nrounds: 560"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1717.5257054352912,
            "unit": "iter/sec",
            "range": "stddev: 0.000044095988011476985",
            "extra": "mean: 582.2329161277729 usec\nrounds: 1705"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 693.7977571885586,
            "unit": "iter/sec",
            "range": "stddev: 0.000030221290969018374",
            "extra": "mean: 1.441342220609431 msec\nrounds: 689"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 243.00050677495867,
            "unit": "iter/sec",
            "range": "stddev: 0.000042418747680946845",
            "extra": "mean: 4.115217755188033 msec\nrounds: 241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.26030931808255,
            "unit": "iter/sec",
            "range": "stddev: 0.00005363162705600125",
            "extra": "mean: 13.287216184211633 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 21.286204901638772,
            "unit": "iter/sec",
            "range": "stddev: 0.00008570773270712398",
            "extra": "mean: 46.97878295454219 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10159.050592175632,
            "unit": "iter/sec",
            "range": "stddev: 0.000016077190846015595",
            "extra": "mean: 98.43439511662507 usec\nrounds: 8314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4155.2233441808,
            "unit": "iter/sec",
            "range": "stddev: 0.000018631925058313413",
            "extra": "mean: 240.6609506082156 usec\nrounds: 4029"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1303.6606640871453,
            "unit": "iter/sec",
            "range": "stddev: 0.000026402171379040434",
            "extra": "mean: 767.0707781155797 usec\nrounds: 1316"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 360.2984554635871,
            "unit": "iter/sec",
            "range": "stddev: 0.000037183628775240614",
            "extra": "mean: 2.7754767883013116 msec\nrounds: 359"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 91.99238856151798,
            "unit": "iter/sec",
            "range": "stddev: 0.0011424397905303108",
            "extra": "mean: 10.870464563829332 msec\nrounds: 94"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9200.957482126109,
            "unit": "iter/sec",
            "range": "stddev: 0.000019300389770804067",
            "extra": "mean: 108.6843409441476 usec\nrounds: 8365"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3914.1874717537917,
            "unit": "iter/sec",
            "range": "stddev: 0.000022860536362187013",
            "extra": "mean: 255.48086473025776 usec\nrounds: 3822"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1259.737397098494,
            "unit": "iter/sec",
            "range": "stddev: 0.00002576005713699775",
            "extra": "mean: 793.816236862748 usec\nrounds: 1237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 351.95396384879257,
            "unit": "iter/sec",
            "range": "stddev: 0.0000974680241651769",
            "extra": "mean: 2.841280686441204 msec\nrounds: 354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 92.60830530104262,
            "unit": "iter/sec",
            "range": "stddev: 0.00006321448734291472",
            "extra": "mean: 10.798167580642916 msec\nrounds: 93"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3889.429662374245,
            "unit": "iter/sec",
            "range": "stddev: 0.000017938916047246304",
            "extra": "mean: 257.1071048472348 usec\nrounds: 3672"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1106.7527291394545,
            "unit": "iter/sec",
            "range": "stddev: 0.00003785419578996426",
            "extra": "mean: 903.5441916439103 usec\nrounds: 1101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 292.55682478984346,
            "unit": "iter/sec",
            "range": "stddev: 0.00003931288310607152",
            "extra": "mean: 3.418139367346307 msec\nrounds: 294"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.59610728428714,
            "unit": "iter/sec",
            "range": "stddev: 0.00005537141621313372",
            "extra": "mean: 13.405525253335023 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 18.816571730955953,
            "unit": "iter/sec",
            "range": "stddev: 0.0000812504492908899",
            "extra": "mean: 53.144643684208255 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1014.6342552688046,
            "unit": "iter/sec",
            "range": "stddev: 0.00002427335245841135",
            "extra": "mean: 985.5768172690683 usec\nrounds: 996"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 307.7915070979931,
            "unit": "iter/sec",
            "range": "stddev: 0.000034286247196664624",
            "extra": "mean: 3.248952543975247 msec\nrounds: 307"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 85.82571954745292,
            "unit": "iter/sec",
            "range": "stddev: 0.000081314896125581",
            "extra": "mean: 11.651518976745677 msec\nrounds: 86"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.61204093991835,
            "unit": "iter/sec",
            "range": "stddev: 0.00017387733702803112",
            "extra": "mean: 44.22422560869514 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.819055559600926,
            "unit": "iter/sec",
            "range": "stddev: 0.0002781818206720894",
            "extra": "mean: 171.8491926666843 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 65.08164203926556,
            "unit": "iter/sec",
            "range": "stddev: 0.00009394809693676339",
            "extra": "mean: 15.365316065576103 msec\nrounds: 61"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 17.921779782798662,
            "unit": "iter/sec",
            "range": "stddev: 0.0007183583672933908",
            "extra": "mean: 55.79802966666295 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 4.7365205393937435,
            "unit": "iter/sec",
            "range": "stddev: 0.0007828436726169709",
            "extra": "mean: 211.12544359999674 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 65.0596852130519,
            "unit": "iter/sec",
            "range": "stddev: 0.0005765659649770016",
            "extra": "mean: 15.370501666666314 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 17.730367143774874,
            "unit": "iter/sec",
            "range": "stddev: 0.0011721253648096898",
            "extra": "mean: 56.400411333337765 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 4.609915624253511,
            "unit": "iter/sec",
            "range": "stddev: 0.00046346742508670505",
            "extra": "mean: 216.92370999999184 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 65.31022211823344,
            "unit": "iter/sec",
            "range": "stddev: 0.0001287476667524558",
            "extra": "mean: 15.311538800000772 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 17.958940617735013,
            "unit": "iter/sec",
            "range": "stddev: 0.00026686119681813104",
            "extra": "mean: 55.68257177778454 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 4.683875548306688,
            "unit": "iter/sec",
            "range": "stddev: 0.0008225916858103432",
            "extra": "mean: 213.49841379998225 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.3479665543917605,
            "unit": "iter/sec",
            "range": "stddev: 0.001191048735826898",
            "extra": "mean: 157.5307606666835 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.735991785895825,
            "unit": "iter/sec",
            "range": "stddev: 0.0014281146059185606",
            "extra": "mean: 365.4981733333595 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0886724723009795,
            "unit": "iter/sec",
            "range": "stddev: 0.0010972075213639468",
            "extra": "mean: 918.5499086666861 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 38.37582818558912,
            "unit": "iter/sec",
            "range": "stddev: 0.00018679762902600803",
            "extra": "mean: 26.05806955263365 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 10.231352733902725,
            "unit": "iter/sec",
            "range": "stddev: 0.001440425104913764",
            "extra": "mean: 97.73878645454074 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 2.656989615266762,
            "unit": "iter/sec",
            "range": "stddev: 0.002170785781623508",
            "extra": "mean: 376.3657916666716 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}