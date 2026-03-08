window.BENCHMARK_DATA = {
  "lastUpdate": 1772985889251,
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
          "id": "4c6f13713bd220190f5449ec50ee23d571646af5",
          "message": "Rewrite docstrings to NumPy style and add docs deploy workflow\n\n- Replace all three solver docstrings with NumPy-format (Parameters,\n  Returns, Notes, References sections) using raw strings so LaTeX\n  backslashes reach MathJax unchanged; mkdocs.yml gains\n  docstring_style: numpy\n- Add .github/workflows/docs.yml: builds and deploys the MkDocs site\n  to the gh-pages branch on every push to main\n- README: add Documentation badge pointing to the GitHub Pages site;\n  fix the Getting Started link from a local path to the live URL\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T11:57:40-04:00",
          "tree_id": "69f664a1830616bff40542be59269aeaca6361ce",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/4c6f13713bd220190f5449ec50ee23d571646af5"
        },
        "date": 1772985888667,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16363.270389455822,
            "unit": "iter/sec",
            "range": "stddev: 0.00008780954053446338",
            "extra": "mean: 61.11247789710674 usec\nrounds: 11356"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6264.122441645301,
            "unit": "iter/sec",
            "range": "stddev: 0.000015682662879235233",
            "extra": "mean: 159.63928057213158 usec\nrounds: 6084"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1867.51669894531,
            "unit": "iter/sec",
            "range": "stddev: 0.000018063378675692047",
            "extra": "mean: 535.470446162412 usec\nrounds: 1811"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 871.3507094433783,
            "unit": "iter/sec",
            "range": "stddev: 0.000021304490912848446",
            "extra": "mean: 1.147643525347909 msec\nrounds: 868"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 498.975803762018,
            "unit": "iter/sec",
            "range": "stddev: 0.000026789990385959726",
            "extra": "mean: 2.004105194000431 msec\nrounds: 500"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29884.351685853413,
            "unit": "iter/sec",
            "range": "stddev: 0.000010592174492470536",
            "extra": "mean: 33.462328730168764 usec\nrounds: 17741"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17638.189643816393,
            "unit": "iter/sec",
            "range": "stddev: 0.000012080232268096374",
            "extra": "mean: 56.695160909021105 usec\nrounds: 15574"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7119.49087557792,
            "unit": "iter/sec",
            "range": "stddev: 0.00001613668840828391",
            "extra": "mean: 140.4594819315399 usec\nrounds: 6586"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3691.04304490647,
            "unit": "iter/sec",
            "range": "stddev: 0.000015262530789175654",
            "extra": "mean: 270.9261278813777 usec\nrounds: 3644"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2210.704220743133,
            "unit": "iter/sec",
            "range": "stddev: 0.000019070421243591734",
            "extra": "mean: 452.34454732431277 usec\nrounds: 2187"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24781.86801235539,
            "unit": "iter/sec",
            "range": "stddev: 0.000011315636713872747",
            "extra": "mean: 40.35208320460081 usec\nrounds: 20011"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14177.850396877813,
            "unit": "iter/sec",
            "range": "stddev: 0.000013149064303476505",
            "extra": "mean: 70.53255409016136 usec\nrounds: 12738"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5959.732030574541,
            "unit": "iter/sec",
            "range": "stddev: 0.000018345779935016183",
            "extra": "mean: 167.79277908298775 usec\nrounds: 5278"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3215.988426742345,
            "unit": "iter/sec",
            "range": "stddev: 0.000016691357945283544",
            "extra": "mean: 310.94639261900454 usec\nrounds: 3008"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1982.8481502236968,
            "unit": "iter/sec",
            "range": "stddev: 0.000019110637943236396",
            "extra": "mean: 504.325053780434 usec\nrounds: 1971"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1762.0252571681133,
            "unit": "iter/sec",
            "range": "stddev: 0.000021914743706136663",
            "extra": "mean: 567.5287547280549 usec\nrounds: 1692"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 698.1126865431991,
            "unit": "iter/sec",
            "range": "stddev: 0.000020155202385113682",
            "extra": "mean: 1.4324335014618306 msec\nrounds: 684"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.7328303532013,
            "unit": "iter/sec",
            "range": "stddev: 0.000025448944961043358",
            "extra": "mean: 4.119755858920678 msec\nrounds: 241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 123.64100352421362,
            "unit": "iter/sec",
            "range": "stddev: 0.00004846724339106796",
            "extra": "mean: 8.0879317661326 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.892030081794,
            "unit": "iter/sec",
            "range": "stddev: 0.000044352980539223",
            "extra": "mean: 13.352555657896323 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10803.613353123765,
            "unit": "iter/sec",
            "range": "stddev: 0.000014092256673285341",
            "extra": "mean: 92.56162427460988 usec\nrounds: 7580"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4254.682753061424,
            "unit": "iter/sec",
            "range": "stddev: 0.000016561140462757907",
            "extra": "mean: 235.0351502190047 usec\nrounds: 3881"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1302.9273612689103,
            "unit": "iter/sec",
            "range": "stddev: 0.000019679950178744516",
            "extra": "mean: 767.5024945566482 usec\nrounds: 1286"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 614.1592357224831,
            "unit": "iter/sec",
            "range": "stddev: 0.000022938918778304556",
            "extra": "mean: 1.6282422242232057 msec\nrounds: 611"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 354.75083330248674,
            "unit": "iter/sec",
            "range": "stddev: 0.00002999879870210511",
            "extra": "mean: 2.8188799183096664 msec\nrounds: 355"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9857.080394976172,
            "unit": "iter/sec",
            "range": "stddev: 0.0000162048490347049",
            "extra": "mean: 101.44991822423067 usec\nrounds: 8988"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3960.201606082036,
            "unit": "iter/sec",
            "range": "stddev: 0.000017765156877918256",
            "extra": "mean: 252.51239696085437 usec\nrounds: 3882"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1248.1895513271943,
            "unit": "iter/sec",
            "range": "stddev: 0.00001966668970442045",
            "extra": "mean: 801.160367779641 usec\nrounds: 1229"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 595.6098496902351,
            "unit": "iter/sec",
            "range": "stddev: 0.000025368574432102784",
            "extra": "mean: 1.678951415125321 msec\nrounds: 595"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 346.66576081999244,
            "unit": "iter/sec",
            "range": "stddev: 0.000030999644731458846",
            "extra": "mean: 2.8846229221906166 msec\nrounds: 347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3961.095256677826,
            "unit": "iter/sec",
            "range": "stddev: 0.000015235790716733894",
            "extra": "mean: 252.45542841065148 usec\nrounds: 3555"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1109.8859859978525,
            "unit": "iter/sec",
            "range": "stddev: 0.00002118439915118842",
            "extra": "mean: 900.9934467286218 usec\nrounds: 1070"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 289.96070573087684,
            "unit": "iter/sec",
            "range": "stddev: 0.000030325289630604658",
            "extra": "mean: 3.4487431580751378 msec\nrounds: 291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 130.4613206409267,
            "unit": "iter/sec",
            "range": "stddev: 0.00004866692390064166",
            "extra": "mean: 7.665107137404622 msec\nrounds: 131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.72942231002341,
            "unit": "iter/sec",
            "range": "stddev: 0.0000575164667042916",
            "extra": "mean: 13.563106405406508 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1009.7619578747913,
            "unit": "iter/sec",
            "range": "stddev: 0.0001073098758932149",
            "extra": "mean: 990.3324166664618 usec\nrounds: 1008"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 311.8950039779652,
            "unit": "iter/sec",
            "range": "stddev: 0.000024534983828626337",
            "extra": "mean: 3.2062071762799005 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 84.56385741959953,
            "unit": "iter/sec",
            "range": "stddev: 0.0008398279153956899",
            "extra": "mean: 11.825382977009609 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.80102805378377,
            "unit": "iter/sec",
            "range": "stddev: 0.00007454776255466402",
            "extra": "mean: 25.124979150002957 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.793331179490973,
            "unit": "iter/sec",
            "range": "stddev: 0.00006517237605772957",
            "extra": "mean: 43.87248147825719 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}