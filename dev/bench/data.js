window.BENCHMARK_DATA = {
  "lastUpdate": 1787173823603,
  "repoUrl": "https://github.com/trout314/voles",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "adtrout@gmail.com",
            "name": "Aaron Trout"
          },
          "committer": {
            "email": "adtrout@gmail.com",
            "name": "Aaron Trout"
          },
          "distinct": true,
          "id": "8ae3d2fbbd1887df40be1b7635f3802c73de9da3",
          "message": "ci: pin Linux builds to LDC 1.40.0 -- fixes shipped wheels, keeps glibc 2.31 floor\n\nThe experiment on PR #3 confirmed LDC 1.40.0's druntime contains the\nforeign-thread/GC fix (the full Linux matrix, including the thread-safety\nGC hammer and the threaded d=49 test that deadlock/segfault under 1.36,\npasses), and 1.40.0 is the last LDC release built on Ubuntu 20.04, so its\nbinaries run in the glibc-2.31 wheel container. The built .so requires at\nmost glibc 2.17 symbols.\n\n- build-wheels.yml: Linux wheel pin 1.36.0 -> 1.40.0 (container and\n  manylinux_2_31 tag unchanged) -- published wheels no longer carry the\n  threaded-solve deadlock.\n- tests-linux.yml / bench.yml: back to the ubuntu:20.04 container with LDC\n  1.40.0, so CI builds and tests exactly the artifact configuration that\n  ships; the strict <= 2.31 glibc symbol check is restored in tests-linux\n  (the 1.42/22.04 setup was only ever the diagnostic).\n- docs-examples.yml: pin 1.40.0.\n\nmacOS (1.42) and Windows (1.41) test pins already match their wheel pins.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01CraQZWqxJ5up98AWhv3Sic",
          "timestamp": "2026-08-19T17:02:33-04:00",
          "tree_id": "f5c8d3cec5986a0224cf2f255737e99442af2c3f",
          "url": "https://github.com/trout314/voles/commit/8ae3d2fbbd1887df40be1b7635f3802c73de9da3"
        },
        "date": 1787173822089,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 9179.766674389193,
            "unit": "iter/sec",
            "range": "stddev: 0.00016968919253994175",
            "extra": "mean: 108.93523065133226 usec\nrounds: 3269"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4493.66436049965,
            "unit": "iter/sec",
            "range": "stddev: 0.0000181152575277261",
            "extra": "mean: 222.53553442714403 usec\nrounds: 4328"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1887.2432258130502,
            "unit": "iter/sec",
            "range": "stddev: 0.00007910947049437074",
            "extra": "mean: 529.8734081131415 usec\nrounds: 2046"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 858.3977011827724,
            "unit": "iter/sec",
            "range": "stddev: 0.00008688106059182554",
            "extra": "mean: 1.1649611813057237 msec\nrounds: 888"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 391.1684192961804,
            "unit": "iter/sec",
            "range": "stddev: 0.00013175918810398826",
            "extra": "mean: 2.5564435948057236 msec\nrounds: 385"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 25603.22678205377,
            "unit": "iter/sec",
            "range": "stddev: 0.00001036134882798457",
            "extra": "mean: 39.057576941861726 usec\nrounds: 18501"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 9943.59075742331,
            "unit": "iter/sec",
            "range": "stddev: 0.00001592843842169272",
            "extra": "mean: 100.56729247967671 usec\nrounds: 9840"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4528.208923254981,
            "unit": "iter/sec",
            "range": "stddev: 0.00002040799948423753",
            "extra": "mean: 220.83786701280934 usec\nrounds: 4429"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1890.5097308411275,
            "unit": "iter/sec",
            "range": "stddev: 0.0000474146443765154",
            "extra": "mean: 528.9578697672605 usec\nrounds: 1935"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 868.0477073949845,
            "unit": "iter/sec",
            "range": "stddev: 0.00008194357504907505",
            "extra": "mean: 1.152010415419453 msec\nrounds: 869"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22524.40208684453,
            "unit": "iter/sec",
            "range": "stddev: 0.000009652286126038181",
            "extra": "mean: 44.396295011269316 usec\nrounds: 19284"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 9192.256191177952,
            "unit": "iter/sec",
            "range": "stddev: 0.000013040668872090082",
            "extra": "mean: 108.7872203735712 usec\nrounds: 7873"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 4081.640537075021,
            "unit": "iter/sec",
            "range": "stddev: 0.00002425790279312274",
            "extra": "mean: 244.99952676298597 usec\nrounds: 3531"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1819.4882347590951,
            "unit": "iter/sec",
            "range": "stddev: 0.00003891158692014013",
            "extra": "mean: 549.6050927377404 usec\nrounds: 1790"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 810.841503230322,
            "unit": "iter/sec",
            "range": "stddev: 0.00008168346075351426",
            "extra": "mean: 1.233286648520194 msec\nrounds: 845"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2077.0281991187653,
            "unit": "iter/sec",
            "range": "stddev: 0.00002006999117070751",
            "extra": "mean: 481.4571128231561 usec\nrounds: 2012"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 971.3697174000528,
            "unit": "iter/sec",
            "range": "stddev: 0.00007404405538008868",
            "extra": "mean: 1.0294741354266 msec\nrounds: 1019"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 489.3257695278142,
            "unit": "iter/sec",
            "range": "stddev: 0.00008904945376833539",
            "extra": "mean: 2.0436283193606832 msec\nrounds: 501"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 227.44887200220455,
            "unit": "iter/sec",
            "range": "stddev: 0.0002980077072769201",
            "extra": "mean: 4.396592478991531 msec\nrounds: 238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 113.46802576417168,
            "unit": "iter/sec",
            "range": "stddev: 0.00019596922655323323",
            "extra": "mean: 8.813055424779911 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10755.569476720722,
            "unit": "iter/sec",
            "range": "stddev: 0.000013129364391267652",
            "extra": "mean: 92.97508627175836 usec\nrounds: 9018"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3695.0592939516155,
            "unit": "iter/sec",
            "range": "stddev: 0.000019095194203247863",
            "extra": "mean: 270.6316517401722 usec\nrounds: 3506"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1514.254309161622,
            "unit": "iter/sec",
            "range": "stddev: 0.00004912267008399272",
            "extra": "mean: 660.3910544944446 usec\nrounds: 1468"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 654.0991173339957,
            "unit": "iter/sec",
            "range": "stddev: 0.0000909442806119026",
            "extra": "mean: 1.528820286558162 msec\nrounds: 677"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 286.6667608716984,
            "unit": "iter/sec",
            "range": "stddev: 0.0002343919982628395",
            "extra": "mean: 3.488370946667108 msec\nrounds: 300"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10247.302326961359,
            "unit": "iter/sec",
            "range": "stddev: 0.000014830073525580507",
            "extra": "mean: 97.58665920970549 usec\nrounds: 9387"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3492.414792820925,
            "unit": "iter/sec",
            "range": "stddev: 0.000023965171837707067",
            "extra": "mean: 286.3348311476687 usec\nrounds: 3050"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1536.6161431207627,
            "unit": "iter/sec",
            "range": "stddev: 0.00002396354386922448",
            "extra": "mean: 650.7806158856747 usec\nrounds: 1536"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 630.4688120205147,
            "unit": "iter/sec",
            "range": "stddev: 0.00011411802675694919",
            "extra": "mean: 1.586121281392522 msec\nrounds: 661"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 289.21187313110323,
            "unit": "iter/sec",
            "range": "stddev: 0.00018839631562988694",
            "extra": "mean: 3.4576727060810812 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3465.6593413887144,
            "unit": "iter/sec",
            "range": "stddev: 0.000026104620760274783",
            "extra": "mean: 288.5453824204467 usec\nrounds: 3504"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1589.215501140639,
            "unit": "iter/sec",
            "range": "stddev: 0.000038585175037467306",
            "extra": "mean: 629.2412824329128 usec\nrounds: 1611"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 692.9726430520276,
            "unit": "iter/sec",
            "range": "stddev: 0.00010679327144618272",
            "extra": "mean: 1.4430584093417393 msec\nrounds: 728"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 297.601329415251,
            "unit": "iter/sec",
            "range": "stddev: 0.0003491169322572683",
            "extra": "mean: 3.3602000433427963 msec\nrounds: 323"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 134.4858214759652,
            "unit": "iter/sec",
            "range": "stddev: 0.0004959042804168942",
            "extra": "mean: 7.435728086612582 msec\nrounds: 127"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1504.892794609803,
            "unit": "iter/sec",
            "range": "stddev: 0.00006717228725882171",
            "extra": "mean: 664.499161389955 usec\nrounds: 1295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 706.0110270677396,
            "unit": "iter/sec",
            "range": "stddev: 0.00011083704861745389",
            "extra": "mean: 1.4164084719091123 msec\nrounds: 712"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 324.2402842880636,
            "unit": "iter/sec",
            "range": "stddev: 0.00024375958616500975",
            "extra": "mean: 3.0841325043731262 msec\nrounds: 343"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 143.11355404696326,
            "unit": "iter/sec",
            "range": "stddev: 0.0005024933711078168",
            "extra": "mean: 6.987458362412314 msec\nrounds: 149"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 67.41872110360522,
            "unit": "iter/sec",
            "range": "stddev: 0.0010965378170224782",
            "extra": "mean: 14.832675310812519 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 893.0952806135238,
            "unit": "iter/sec",
            "range": "stddev: 0.00007457586172941898",
            "extra": "mean: 1.119701359650044 msec\nrounds: 456"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 577.5007035260048,
            "unit": "iter/sec",
            "range": "stddev: 0.0001072388248614629",
            "extra": "mean: 1.7315996221205816 msec\nrounds: 434"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 314.2696671677639,
            "unit": "iter/sec",
            "range": "stddev: 0.00019996989008747934",
            "extra": "mean: 3.181980650605324 msec\nrounds: 249"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 933.3327472030991,
            "unit": "iter/sec",
            "range": "stddev: 0.00007215008328844793",
            "extra": "mean: 1.0714292442825792 msec\nrounds: 831"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 541.8524662624894,
            "unit": "iter/sec",
            "range": "stddev: 0.00011493978448221136",
            "extra": "mean: 1.8455208055020096 msec\nrounds: 509"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 286.04216109723683,
            "unit": "iter/sec",
            "range": "stddev: 0.00024790923681781144",
            "extra": "mean: 3.495988130435293 msec\nrounds: 253"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 747.6567096706352,
            "unit": "iter/sec",
            "range": "stddev: 0.00004324043476378284",
            "extra": "mean: 1.337512239327765 msec\nrounds: 656"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 440.0505165123758,
            "unit": "iter/sec",
            "range": "stddev: 0.0001499103512386747",
            "extra": "mean: 2.2724663702829138 msec\nrounds: 424"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 246.2154525068969,
            "unit": "iter/sec",
            "range": "stddev: 0.00022948850383211134",
            "extra": "mean: 4.061483508927972 msec\nrounds: 224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 8.31879452991665,
            "unit": "iter/sec",
            "range": "stddev: 0.0050681962821662995",
            "extra": "mean: 120.2097246666843 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.9321686554516937,
            "unit": "iter/sec",
            "range": "stddev: 0.002410683094430515",
            "extra": "mean: 254.31259125001304 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.5085867740885255,
            "unit": "iter/sec",
            "range": "stddev: 0.009838749432626165",
            "extra": "mean: 662.8720449999909 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 575.733493730434,
            "unit": "iter/sec",
            "range": "stddev: 0.00012135223483177341",
            "extra": "mean: 1.736914754638564 msec\nrounds: 485"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 322.24481631528687,
            "unit": "iter/sec",
            "range": "stddev: 0.00018035344891172503",
            "extra": "mean: 3.1032306785707675 msec\nrounds: 224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 163.02702390544175,
            "unit": "iter/sec",
            "range": "stddev: 0.00017440016744536902",
            "extra": "mean: 6.133952372092714 msec\nrounds: 129"
          }
        ]
      }
    ]
  }
}