window.BENCHMARK_DATA = {
  "lastUpdate": 1793541326947,
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
          "id": "a488079c13ec937129064e69fb8b840e8f8b20e3",
          "message": "1.0 API Phase 7: overhead, single-source version, typing, API snapshot\n\n- Overhead of the 1.0 path over the 0.10 one cut from 60-74 to 41-49 us\n  per call at N~500 (140 -> 68 us at N=8000): the sampled solution's node\n  arrays are built on first access, the exact VIE-1 rho is cached, and\n  the engine-built mesh is no longer copied.\n- __version__ in src/voles/__init__.py is the single source of the version\n  (hatch dynamic version); it used to come from installed metadata, which\n  a stale editable install got wrong.\n- Public functions and VolterraSolution fully annotated; the documented\n  calls in tests/typing/public_api_usage.py must run and type-check with\n  mypy (added to the dev extra).\n- tests/test_public_api.py pins __all__ and every public signature against\n  tests/data/public_api.json.\n- Benchmarks call the 1.0 API; names (and so the published history) are\n  unchanged. Small-N timings include the remaining per-call overhead.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-11-01T08:49:25-05:00",
          "tree_id": "8e0519eb80f8b2f2e17493ff3fa765c72478122c",
          "url": "https://github.com/trout314/voles/commit/a488079c13ec937129064e69fb8b840e8f8b20e3"
        },
        "date": 1793541326109,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 11509.731243035321,
            "unit": "iter/sec",
            "range": "stddev: 0.000009456983790473816",
            "extra": "mean: 86.88300177340042 usec\nrounds: 6202"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 7101.315615039458,
            "unit": "iter/sec",
            "range": "stddev: 0.00025924575595655724",
            "extra": "mean: 140.81897696282627 usec\nrounds: 6381"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 4198.028985510754,
            "unit": "iter/sec",
            "range": "stddev: 0.000009829542732860817",
            "extra": "mean: 238.2070260713874 usec\nrounds: 3874"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 2233.7005122867768,
            "unit": "iter/sec",
            "range": "stddev: 0.00003381261393637459",
            "extra": "mean: 447.68759039063764 usec\nrounds: 2102"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 1104.5709216830555,
            "unit": "iter/sec",
            "range": "stddev: 0.00005446328804079724",
            "extra": "mean: 905.3289203705282 usec\nrounds: 1080"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 12183.479147110678,
            "unit": "iter/sec",
            "range": "stddev: 0.000008953518383472541",
            "extra": "mean: 82.07836102687882 usec\nrounds: 7595"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 9581.076200664047,
            "unit": "iter/sec",
            "range": "stddev: 0.00000750723689816728",
            "extra": "mean: 104.3724085954657 usec\nrounds: 7981"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6511.867285574007,
            "unit": "iter/sec",
            "range": "stddev: 0.0000076831255462199",
            "extra": "mean: 153.56578323015566 usec\nrounds: 5808"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4081.459406268657,
            "unit": "iter/sec",
            "range": "stddev: 0.000014951972420028946",
            "extra": "mean: 245.01039958013888 usec\nrounds: 3809"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 2211.505358459204,
            "unit": "iter/sec",
            "range": "stddev: 0.000011722050413458744",
            "extra": "mean: 452.1806814416755 usec\nrounds: 2053"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 11241.602205533953,
            "unit": "iter/sec",
            "range": "stddev: 0.00000777379037934786",
            "extra": "mean: 88.95529140034199 usec\nrounds: 9070"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 8178.126896341459,
            "unit": "iter/sec",
            "range": "stddev: 0.000037292470350844794",
            "extra": "mean: 122.27738853591975 usec\nrounds: 7240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6070.378638480942,
            "unit": "iter/sec",
            "range": "stddev: 0.000008486631399235548",
            "extra": "mean: 164.7343698893618 usec\nrounds: 5161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3865.2021758248916,
            "unit": "iter/sec",
            "range": "stddev: 0.000010376389191498933",
            "extra": "mean: 258.7186787419691 usec\nrounds: 3561"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 2047.6029757511833,
            "unit": "iter/sec",
            "range": "stddev: 0.00011604546519640889",
            "extra": "mean: 488.3759263111738 usec\nrounds: 2022"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 9408.3958402384,
            "unit": "iter/sec",
            "range": "stddev: 0.000008167797074852595",
            "extra": "mean: 106.28804495269418 usec\nrounds: 7430"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 5965.743985916762,
            "unit": "iter/sec",
            "range": "stddev: 0.000012655137335693565",
            "extra": "mean: 167.62368656125446 usec\nrounds: 5060"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 3417.107155612547,
            "unit": "iter/sec",
            "range": "stddev: 0.000010791308923829775",
            "extra": "mean: 292.64519795860514 usec\nrounds: 3233"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1812.949178976325,
            "unit": "iter/sec",
            "range": "stddev: 0.000046639026943868996",
            "extra": "mean: 551.5874419406761 usec\nrounds: 1731"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 924.2506356769289,
            "unit": "iter/sec",
            "range": "stddev: 0.00003385386758429424",
            "extra": "mean: 1.0819576004593079 msec\nrounds: 871"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 7001.9904608499355,
            "unit": "iter/sec",
            "range": "stddev: 0.000008559399859579828",
            "extra": "mean: 142.81653275468977 usec\nrounds: 4839"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4482.601882025507,
            "unit": "iter/sec",
            "range": "stddev: 0.000010304818728134191",
            "extra": "mean: 223.0847231849509 usec\nrounds: 3981"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 2658.5562148715,
            "unit": "iter/sec",
            "range": "stddev: 0.000011442350800490265",
            "extra": "mean: 376.1440117031095 usec\nrounds: 2478"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 1557.9166850834551,
            "unit": "iter/sec",
            "range": "stddev: 0.00001541642510978806",
            "extra": "mean: 641.8828487907437 usec\nrounds: 1488"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 837.3397587864823,
            "unit": "iter/sec",
            "range": "stddev: 0.000034305618791912036",
            "extra": "mean: 1.194258351531347 msec\nrounds: 751"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 6357.86603584107,
            "unit": "iter/sec",
            "range": "stddev: 0.00004248210362540145",
            "extra": "mean: 157.2854782347914 usec\nrounds: 5008"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4279.904581367257,
            "unit": "iter/sec",
            "range": "stddev: 0.000013602397284762047",
            "extra": "mean: 233.65006882479148 usec\nrounds: 3923"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 2412.0083496405177,
            "unit": "iter/sec",
            "range": "stddev: 0.00010022436185403085",
            "extra": "mean: 414.592262978293 usec\nrounds: 2350"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 1490.818513104164,
            "unit": "iter/sec",
            "range": "stddev: 0.00006075745202585353",
            "extra": "mean: 670.7724590284382 usec\nrounds: 1379"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 794.3929465362374,
            "unit": "iter/sec",
            "range": "stddev: 0.000022157008125008483",
            "extra": "mean: 1.2588228588386434 msec\nrounds: 758"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 6132.416553482789,
            "unit": "iter/sec",
            "range": "stddev: 0.000012249449670299303",
            "extra": "mean: 163.06785282419688 usec\nrounds: 5028"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 3419.887697106101,
            "unit": "iter/sec",
            "range": "stddev: 0.0000428048797079544",
            "extra": "mean: 292.4072626262544 usec\nrounds: 3366"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1821.6181879850724,
            "unit": "iter/sec",
            "range": "stddev: 0.000018937432869124603",
            "extra": "mean: 548.962459090354 usec\nrounds: 1760"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 793.0819172648338,
            "unit": "iter/sec",
            "range": "stddev: 0.00003398839739438951",
            "extra": "mean: 1.2609037959770681 msec\nrounds: 696"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 396.89743588076567,
            "unit": "iter/sec",
            "range": "stddev: 0.00007551059834019574",
            "extra": "mean: 2.51954260621733 msec\nrounds: 386"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 4908.804818731452,
            "unit": "iter/sec",
            "range": "stddev: 0.000011328770832403957",
            "extra": "mean: 203.71557577194994 usec\nrounds: 4276"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 2741.606676754937,
            "unit": "iter/sec",
            "range": "stddev: 0.000010631101279433149",
            "extra": "mean: 364.74962235780504 usec\nrounds: 2460"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 1452.8168986256298,
            "unit": "iter/sec",
            "range": "stddev: 0.000015491118075554913",
            "extra": "mean: 688.3179848375962 usec\nrounds: 1385"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 646.4192540513475,
            "unit": "iter/sec",
            "range": "stddev: 0.00003547426243548914",
            "extra": "mean: 1.5469836236043897 msec\nrounds: 627"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 324.2049463577565,
            "unit": "iter/sec",
            "range": "stddev: 0.00003615300785487687",
            "extra": "mean: 3.0844686709267886 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1653.7750547170092,
            "unit": "iter/sec",
            "range": "stddev: 0.000011737733522744987",
            "extra": "mean: 604.6771579651853 usec\nrounds: 747"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 1248.111340693861,
            "unit": "iter/sec",
            "range": "stddev: 0.000019617523417696808",
            "extra": "mean: 801.2105710409388 usec\nrounds: 1105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 834.7869666307273,
            "unit": "iter/sec",
            "range": "stddev: 0.00002852925753407592",
            "extra": "mean: 1.1979104130435658 msec\nrounds: 782"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1616.1471659854449,
            "unit": "iter/sec",
            "range": "stddev: 0.0000320957914536459",
            "extra": "mean: 618.7555323219904 usec\nrounds: 1253"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 1105.1818342313377,
            "unit": "iter/sec",
            "range": "stddev: 0.0002169026168339629",
            "extra": "mean: 904.8284807318674 usec\nrounds: 1038"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 756.709659899578,
            "unit": "iter/sec",
            "range": "stddev: 0.00002053373496306486",
            "extra": "mean: 1.3215108158295596 msec\nrounds: 657"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 1000.0132238592524,
            "unit": "iter/sec",
            "range": "stddev: 0.000014912065894200385",
            "extra": "mean: 999.9867763156158 usec\nrounds: 836"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 684.649244853452,
            "unit": "iter/sec",
            "range": "stddev: 0.00019561758720777327",
            "extra": "mean: 1.460601917722188 msec\nrounds: 632"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 438.1870099636079,
            "unit": "iter/sec",
            "range": "stddev: 0.00004092024802982878",
            "extra": "mean: 2.282130636604338 msec\nrounds: 377"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 10.076989814502253,
            "unit": "iter/sec",
            "range": "stddev: 0.00043289129391565806",
            "extra": "mean: 99.23598399998923 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 4.484593740572373,
            "unit": "iter/sec",
            "range": "stddev: 0.003386826919269861",
            "extra": "mean: 222.98563879999733 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.7622728418190996,
            "unit": "iter/sec",
            "range": "stddev: 0.004412634061128977",
            "extra": "mean: 567.4490216666754 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 1244.1988445654954,
            "unit": "iter/sec",
            "range": "stddev: 0.000014249604178577712",
            "extra": "mean: 803.7300503596147 usec\nrounds: 973"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 896.3549447894547,
            "unit": "iter/sec",
            "range": "stddev: 0.000018585630322350832",
            "extra": "mean: 1.1156294789391612 msec\nrounds: 641"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 556.3653644853246,
            "unit": "iter/sec",
            "range": "stddev: 0.00004188001398025191",
            "extra": "mean: 1.7973800380709666 msec\nrounds: 394"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 1046.53630690317,
            "unit": "iter/sec",
            "range": "stddev: 0.0001903101929177415",
            "extra": "mean: 955.5330220306673 usec\nrounds: 1044"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 515.1971757458023,
            "unit": "iter/sec",
            "range": "stddev: 0.00004197196671262857",
            "extra": "mean: 1.941004429134136 msec\nrounds: 508"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 419.3118048213039,
            "unit": "iter/sec",
            "range": "stddev: 0.00005489898637195663",
            "extra": "mean: 2.3848601172250925 msec\nrounds: 418"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 390.4003514537884,
            "unit": "iter/sec",
            "range": "stddev: 0.00031743441045357544",
            "extra": "mean: 2.5614731038949126 msec\nrounds: 385"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 197.25126239675387,
            "unit": "iter/sec",
            "range": "stddev: 0.00005635817474159084",
            "extra": "mean: 5.069676045918461 msec\nrounds: 196"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 158.86488314151057,
            "unit": "iter/sec",
            "range": "stddev: 0.00005892805108765219",
            "extra": "mean: 6.294657322784416 msec\nrounds: 158"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 544.2420005529059,
            "unit": "iter/sec",
            "range": "stddev: 0.00001847688607851614",
            "extra": "mean: 1.8374179114880527 msec\nrounds: 531"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 245.21602086481676,
            "unit": "iter/sec",
            "range": "stddev: 0.00004595880889516615",
            "extra": "mean: 4.078036975207596 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 199.23055776989597,
            "unit": "iter/sec",
            "range": "stddev: 0.00005163586340311669",
            "extra": "mean: 5.019310346733876 msec\nrounds: 199"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 186.68578981746245,
            "unit": "iter/sec",
            "range": "stddev: 0.0009858552214034452",
            "extra": "mean: 5.356594098446269 msec\nrounds: 193"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 94.26088349072064,
            "unit": "iter/sec",
            "range": "stddev: 0.00006004527233830719",
            "extra": "mean: 10.608854521275978 msec\nrounds: 94"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 74.29186230099809,
            "unit": "iter/sec",
            "range": "stddev: 0.00008206382674930129",
            "extra": "mean: 13.460424453332962 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 598.7886302924703,
            "unit": "iter/sec",
            "range": "stddev: 0.000015998712739978743",
            "extra": "mean: 1.670038389859813 msec\nrounds: 572"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 439.784946579777,
            "unit": "iter/sec",
            "range": "stddev: 0.0003635331621916757",
            "extra": "mean: 2.273838629032292 msec\nrounds: 434"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 127.34199926226785,
            "unit": "iter/sec",
            "range": "stddev: 0.000085309870974874",
            "extra": "mean: 7.852868698413044 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 294.3740736600817,
            "unit": "iter/sec",
            "range": "stddev: 0.000023842373364746113",
            "extra": "mean: 3.3970382906570618 msec\nrounds: 289"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 221.03727665874547,
            "unit": "iter/sec",
            "range": "stddev: 0.00028746877414918153",
            "extra": "mean: 4.5241237818174795 msec\nrounds: 220"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 56.14599273641203,
            "unit": "iter/sec",
            "range": "stddev: 0.00016037431342166565",
            "extra": "mean: 17.81071010169308 msec\nrounds: 59"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 139.7557547037368,
            "unit": "iter/sec",
            "range": "stddev: 0.00007761407918835624",
            "extra": "mean: 7.155340415998353 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 107.85251536715126,
            "unit": "iter/sec",
            "range": "stddev: 0.00009683400485704355",
            "extra": "mean: 9.271920980199697 msec\nrounds: 101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 26.521078648811184,
            "unit": "iter/sec",
            "range": "stddev: 0.0044063326010694",
            "extra": "mean: 37.70585703703365 msec\nrounds: 27"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 66.23872914903818,
            "unit": "iter/sec",
            "range": "stddev: 0.002730076836666224",
            "extra": "mean: 15.09690800000079 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 44.22147857857794,
            "unit": "iter/sec",
            "range": "stddev: 0.00022355848739494307",
            "extra": "mean: 22.6134455957433 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 12.606953893554067,
            "unit": "iter/sec",
            "range": "stddev: 0.003885064955541962",
            "extra": "mean: 79.32130223077121 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 31.021937380172307,
            "unit": "iter/sec",
            "range": "stddev: 0.00404108995503599",
            "extra": "mean: 32.23525299999963 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 22.98000626852576,
            "unit": "iter/sec",
            "range": "stddev: 0.00028171965523632455",
            "extra": "mean: 43.51608908695712 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1084.1351599271702,
            "unit": "iter/sec",
            "range": "stddev: 0.000015249575684007562",
            "extra": "mean: 922.3942151891631 usec\nrounds: 948"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 344.50725155564936,
            "unit": "iter/sec",
            "range": "stddev: 0.00021357282418614024",
            "extra": "mean: 2.902696519403937 msec\nrounds: 335"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 103.93533591431482,
            "unit": "iter/sec",
            "range": "stddev: 0.00010593840268563699",
            "extra": "mean: 9.621366893203756 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 29.016050344313456,
            "unit": "iter/sec",
            "range": "stddev: 0.0003535018949359861",
            "extra": "mean: 34.46368434482604 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.290738080102544,
            "unit": "iter/sec",
            "range": "stddev: 0.0023968807418640902",
            "extra": "mean: 137.16032437499592 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 422.3509407739745,
            "unit": "iter/sec",
            "range": "stddev: 0.00005211925900632325",
            "extra": "mean: 2.3676992364867497 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 371.53336542790606,
            "unit": "iter/sec",
            "range": "stddev: 0.00006483918508017235",
            "extra": "mean: 2.6915483050849827 msec\nrounds: 354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 267.07538888645377,
            "unit": "iter/sec",
            "range": "stddev: 0.00013558657376540106",
            "extra": "mean: 3.7442611397830694 msec\nrounds: 186"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 186.37737951207666,
            "unit": "iter/sec",
            "range": "stddev: 0.001536926517492658",
            "extra": "mean: 5.365457989687011 msec\nrounds: 194"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.6121408317691076,
            "unit": "iter/sec",
            "range": "stddev: 0.01740013194704854",
            "extra": "mean: 1.6336110059999858 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}