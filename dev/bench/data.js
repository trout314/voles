window.BENCHMARK_DATA = {
  "lastUpdate": 1782938120120,
  "repoUrl": "https://github.com/trout314/voles",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "atrout@aarons-air.myfiosgateway.com",
            "name": "Aaron Trout"
          },
          "committer": {
            "email": "atrout@aarons-air.myfiosgateway.com",
            "name": "Aaron Trout"
          },
          "distinct": true,
          "id": "d4d3cebcec07aade1a33edf29edff2ef53f8fc6d",
          "message": "tests: unify VIE-1 and VIDE array/callable fixtures onto shared specs (Phase 2)\n\nExtend the Phase 1 spec/builder unification to VIE-1 and VIDE. Add the missing\nspecs (VIE1_SPEC_POLY/DAMPED/ABEL, VIDE_SPEC_ODE/LOG/STIFF/ABEL) and migrate all\n13 VIE-1/VIDE scalar fixtures (7 array + 6 callable) to one-line as_array /\nas_callable derivations, deleting the duplicated kernel/g/a/exact math.\n\nAlso make as_callable take the VIDE initial value from y_exact(0) -- consistent\nwith as_array and correct for the pure-ODE case y(0)=2 -- dropping the unused\n'y0' key. The Abel VIDE reaction term is now an explicit a(t)=0 spec (was\na=None); numerically identical.\n\nNo behavior change: 363 passing. conftest -166 lines.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-07-01T16:27:11-04:00",
          "tree_id": "40b25d50555dcad0af93d873c56c3f041ed6b2c5",
          "url": "https://github.com/trout314/voles/commit/d4d3cebcec07aade1a33edf29edff2ef53f8fc6d"
        },
        "date": 1782938119020,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 20102.464788153015,
            "unit": "iter/sec",
            "range": "stddev: 0.0000997898578055574",
            "extra": "mean: 49.745143719357735 usec\nrounds: 14417"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 7746.196459950014,
            "unit": "iter/sec",
            "range": "stddev: 0.000011878213714215035",
            "extra": "mean: 129.09561552825025 usec\nrounds: 7457"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2293.2340618803996,
            "unit": "iter/sec",
            "range": "stddev: 0.000015426105272777665",
            "extra": "mean: 436.06538757758676 usec\nrounds: 2286"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 610.9131958100343,
            "unit": "iter/sec",
            "range": "stddev: 0.00002561851006988873",
            "extra": "mean: 1.6368937630722806 msec\nrounds: 612"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 158.04969377332424,
            "unit": "iter/sec",
            "range": "stddev: 0.00014322700463264946",
            "extra": "mean: 6.3271239325158435 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 38803.08220089637,
            "unit": "iter/sec",
            "range": "stddev: 0.000007908549345118526",
            "extra": "mean: 25.77114866346621 usec\nrounds: 21209"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 21936.429633045813,
            "unit": "iter/sec",
            "range": "stddev: 0.000009259431344861883",
            "extra": "mean: 45.586269813642076 usec\nrounds: 19621"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 8863.292480101833,
            "unit": "iter/sec",
            "range": "stddev: 0.000011209473250754652",
            "extra": "mean: 112.82489010094258 usec\nrounds: 8253"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2736.2314738407063,
            "unit": "iter/sec",
            "range": "stddev: 0.000015824708537510723",
            "extra": "mean: 365.46615648578586 usec\nrounds: 2652"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 748.3315046036633,
            "unit": "iter/sec",
            "range": "stddev: 0.00002623892919607746",
            "extra": "mean: 1.3363061609034181 msec\nrounds: 752"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 29770.341263265338,
            "unit": "iter/sec",
            "range": "stddev: 0.000008806559317776195",
            "extra": "mean: 33.590478226527246 usec\nrounds: 23974"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 16997.606507049004,
            "unit": "iter/sec",
            "range": "stddev: 0.0000098537144473138",
            "extra": "mean: 58.83181256050929 usec\nrounds: 15573"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 7258.164668709035,
            "unit": "iter/sec",
            "range": "stddev: 0.00001339524067045889",
            "extra": "mean: 137.77587663602344 usec\nrounds: 7028"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2405.789616026826,
            "unit": "iter/sec",
            "range": "stddev: 0.000019196509011023385",
            "extra": "mean: 415.66394390358425 usec\nrounds: 2371"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 679.316768575439,
            "unit": "iter/sec",
            "range": "stddev: 0.00017630471063063887",
            "extra": "mean: 1.4720672979956753 msec\nrounds: 698"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2251.348529788012,
            "unit": "iter/sec",
            "range": "stddev: 0.000015812509705603378",
            "extra": "mean: 444.178227746088 usec\nrounds: 2213"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 887.9139402308555,
            "unit": "iter/sec",
            "range": "stddev: 0.000020370347010659292",
            "extra": "mean: 1.1262352742654342 msec\nrounds: 886"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 306.51772099794596,
            "unit": "iter/sec",
            "range": "stddev: 0.000043569388376597845",
            "extra": "mean: 3.262454114379577 msec\nrounds: 306"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 93.94912427266681,
            "unit": "iter/sec",
            "range": "stddev: 0.00041474577494701715",
            "extra": "mean: 10.644058768421498 msec\nrounds: 95"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 26.618934880861982,
            "unit": "iter/sec",
            "range": "stddev: 0.00008395901983100363",
            "extra": "mean: 37.567243185187046 msec\nrounds: 27"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 12799.135166275108,
            "unit": "iter/sec",
            "range": "stddev: 0.00001114794232982116",
            "extra": "mean: 78.13027888282133 usec\nrounds: 8552"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4808.796631104551,
            "unit": "iter/sec",
            "range": "stddev: 0.000012951556099500269",
            "extra": "mean: 207.95223352381737 usec\nrounds: 4582"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1458.6392375392222,
            "unit": "iter/sec",
            "range": "stddev: 0.000021372886278706984",
            "extra": "mean: 685.5704784735098 usec\nrounds: 1440"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 395.93511162821176,
            "unit": "iter/sec",
            "range": "stddev: 0.00004241921834391542",
            "extra": "mean: 2.5256663797451058 msec\nrounds: 395"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 102.49920467092741,
            "unit": "iter/sec",
            "range": "stddev: 0.00006850740060497442",
            "extra": "mean: 9.756173262129098 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 11815.989792214294,
            "unit": "iter/sec",
            "range": "stddev: 0.000010858014515916823",
            "extra": "mean: 84.63108191401052 usec\nrounds: 10450"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4549.030773888516,
            "unit": "iter/sec",
            "range": "stddev: 0.00001336918003731695",
            "extra": "mean: 219.8270466183721 usec\nrounds: 4419"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1395.7587375372452,
            "unit": "iter/sec",
            "range": "stddev: 0.00002447348054912537",
            "extra": "mean: 716.4561991311306 usec\nrounds: 1381"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 380.70747500609144,
            "unit": "iter/sec",
            "range": "stddev: 0.00008976512040628144",
            "extra": "mean: 2.6266886406262437 msec\nrounds: 384"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 101.95437389141124,
            "unit": "iter/sec",
            "range": "stddev: 0.00004565886230022792",
            "extra": "mean: 9.808308970295595 msec\nrounds: 101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4376.311282816441,
            "unit": "iter/sec",
            "range": "stddev: 0.000012731411424091223",
            "extra": "mean: 228.5029412616268 usec\nrounds: 4137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1220.385663101143,
            "unit": "iter/sec",
            "range": "stddev: 0.00001826847728987856",
            "extra": "mean: 819.4131004938904 usec\nrounds: 1214"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 314.21546701330993,
            "unit": "iter/sec",
            "range": "stddev: 0.00024129742748058773",
            "extra": "mean: 3.182529521876276 msec\nrounds: 320"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 80.5322849178019,
            "unit": "iter/sec",
            "range": "stddev: 0.000050947157427775086",
            "extra": "mean: 12.417380197528047 msec\nrounds: 81"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 20.32996282847164,
            "unit": "iter/sec",
            "range": "stddev: 0.0001968060277921011",
            "extra": "mean: 49.1884814761945 msec\nrounds: 21"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1236.5150396148913,
            "unit": "iter/sec",
            "range": "stddev: 0.000038749409284138886",
            "extra": "mean: 808.7244942135493 usec\nrounds: 1210"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 373.48935080185436,
            "unit": "iter/sec",
            "range": "stddev: 0.000045109625451944506",
            "extra": "mean: 2.677452510635372 msec\nrounds: 376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 103.1800118339789,
            "unit": "iter/sec",
            "range": "stddev: 0.0000534810904032892",
            "extra": "mean: 9.691799624999494 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 27.090154434677636,
            "unit": "iter/sec",
            "range": "stddev: 0.00009038960914701055",
            "extra": "mean: 36.91377996427799 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 6.982828616925448,
            "unit": "iter/sec",
            "range": "stddev: 0.00013804429988558903",
            "extra": "mean: 143.2084409999886 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 106.15325774161815,
            "unit": "iter/sec",
            "range": "stddev: 0.00007414560112305211",
            "extra": "mean: 9.420342072158025 msec\nrounds: 97"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 28.9964437524149,
            "unit": "iter/sec",
            "range": "stddev: 0.00015278026647180308",
            "extra": "mean: 34.48698773333945 msec\nrounds: 30"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 7.6087586208541635,
            "unit": "iter/sec",
            "range": "stddev: 0.0001864761992722895",
            "extra": "mean: 131.42748375000224 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 107.02379251845575,
            "unit": "iter/sec",
            "range": "stddev: 0.000050189829212436986",
            "extra": "mean: 9.343716723807509 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 28.849056916413364,
            "unit": "iter/sec",
            "range": "stddev: 0.00017557260777243335",
            "extra": "mean: 34.663178172422704 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 7.371221555252268,
            "unit": "iter/sec",
            "range": "stddev: 0.0018783329969346207",
            "extra": "mean: 135.66272462499285 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 103.70392294001728,
            "unit": "iter/sec",
            "range": "stddev: 0.00025267167427913106",
            "extra": "mean: 9.642836757278735 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 28.517290336003146,
            "unit": "iter/sec",
            "range": "stddev: 0.000143086610440301",
            "extra": "mean: 35.06644524138038 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 7.435364425838708,
            "unit": "iter/sec",
            "range": "stddev: 0.0011053473008320826",
            "extra": "mean: 134.49239912503685 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 8.52794659408739,
            "unit": "iter/sec",
            "range": "stddev: 0.0009689201116985263",
            "extra": "mean: 117.26152233332716 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.76422980736619,
            "unit": "iter/sec",
            "range": "stddev: 0.001252542005492628",
            "extra": "mean: 265.6585945000245 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.5320073572365507,
            "unit": "iter/sec",
            "range": "stddev: 0.0004956319404131537",
            "extra": "mean: 652.7383796666678 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 61.734514209633915,
            "unit": "iter/sec",
            "range": "stddev: 0.0000790423404991519",
            "extra": "mean: 16.198394250001986 msec\nrounds: 60"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 16.526880336039895,
            "unit": "iter/sec",
            "range": "stddev: 0.00022868755766306684",
            "extra": "mean: 60.50748717647072 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 4.238075904114961,
            "unit": "iter/sec",
            "range": "stddev: 0.0016925957349724337",
            "extra": "mean: 235.95613259994934 msec\nrounds: 5"
          }
        ]
      }
    ]
  }
}