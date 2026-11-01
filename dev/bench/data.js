window.BENCHMARK_DATA = {
  "lastUpdate": 1793540437874,
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
          "id": "6935242c545cdc9f4db3df4c679c49b029a876ed",
          "message": "1.0 API Phase 6: documentation for the 1.0 API\n\n- Runnable Examples on the public docstrings (solvers, VolterraSolution,\n  VolesWarning, optimal_graded_mesh, node helpers), run by\n  tests/test_docstring_examples.py; See Also sections use autorefs links.\n  The warning classes report their module as voles.\n- User guide: Conventions (regimes, shapes, node settings, breakpoint\n  convention with measured orders, VIE-1 mesh width vs noise), Warnings,\n  Migration from 0.10, Stability policy.\n- README, home page, Getting Started, all eight examples, API reference\n  and nav use solve_vie1/2/vide; the 0.10 functions are on one deprecated\n  page. \"Polynomial solutions\" becomes \"Working with the solution\".\n- Deprecation messages show translated coll_nodes exactly\n  (np.array([1, 2, 3]) / 3) and link the migration page.\n- CONTRIBUTING, CLAUDE.md and CHANGELOG updated.\n\nThe benchmarks move to the 1.0 API with the Phase 7 overhead work, so the\npublished history shows a single change.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-11-01T08:33:12-05:00",
          "tree_id": "874f691d8b33fb2f9adf0420407b706710819067",
          "url": "https://github.com/trout314/voles/commit/6935242c545cdc9f4db3df4c679c49b029a876ed"
        },
        "date": 1793540436507,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 8249.993468752431,
            "unit": "iter/sec",
            "range": "stddev: 0.000014115740030841471",
            "extra": "mean: 121.21221717175743 usec\nrounds: 4356"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4994.663444410922,
            "unit": "iter/sec",
            "range": "stddev: 0.00027857951782364946",
            "extra": "mean: 200.2136902975935 usec\nrounds: 4401"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2795.7811161927293,
            "unit": "iter/sec",
            "range": "stddev: 0.000014489891590476004",
            "extra": "mean: 357.68179211460995 usec\nrounds: 2511"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1411.88684485616,
            "unit": "iter/sec",
            "range": "stddev: 0.000018045711321809273",
            "extra": "mean: 708.27205710092 usec\nrounds: 1366"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 684.8518198274832,
            "unit": "iter/sec",
            "range": "stddev: 0.000026314081338203763",
            "extra": "mean: 1.4601698806201666 msec\nrounds: 645"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 8684.657216123842,
            "unit": "iter/sec",
            "range": "stddev: 0.000012525100393009242",
            "extra": "mean: 115.14559240673434 usec\nrounds: 5979"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 6462.215962348714,
            "unit": "iter/sec",
            "range": "stddev: 0.000012795918650986978",
            "extra": "mean: 154.74567947378637 usec\nrounds: 4789"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4155.231632754998,
            "unit": "iter/sec",
            "range": "stddev: 0.000018155615949563697",
            "extra": "mean: 240.66047055407617 usec\nrounds: 3447"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2586.668157388082,
            "unit": "iter/sec",
            "range": "stddev: 0.000015377595927514928",
            "extra": "mean: 386.59771534426807 usec\nrounds: 2294"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1392.6566267601097,
            "unit": "iter/sec",
            "range": "stddev: 0.000019264848769405448",
            "extra": "mean: 718.0520889247554 usec\nrounds: 1237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 8236.582109864008,
            "unit": "iter/sec",
            "range": "stddev: 0.000012132230868534996",
            "extra": "mean: 121.40958308451935 usec\nrounds: 6361"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6180.167428030034,
            "unit": "iter/sec",
            "range": "stddev: 0.000013040060138290807",
            "extra": "mean: 161.80791404849626 usec\nrounds: 5061"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 4020.7022473636125,
            "unit": "iter/sec",
            "range": "stddev: 0.000016354352324404063",
            "extra": "mean: 248.71277166960158 usec\nrounds: 3438"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2501.6883331015383,
            "unit": "iter/sec",
            "range": "stddev: 0.000014387632228436363",
            "extra": "mean: 399.7300490106303 usec\nrounds: 2224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1307.101945591034,
            "unit": "iter/sec",
            "range": "stddev: 0.000034855010048365966",
            "extra": "mean: 765.0512673269938 usec\nrounds: 1212"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 6644.777367409189,
            "unit": "iter/sec",
            "range": "stddev: 0.000013648580251454038",
            "extra": "mean: 150.49413166266876 usec\nrounds: 4390"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4090.762997479114,
            "unit": "iter/sec",
            "range": "stddev: 0.000014552216118828582",
            "extra": "mean: 244.45317428954905 usec\nrounds: 3695"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 2253.3069076248935,
            "unit": "iter/sec",
            "range": "stddev: 0.00001850004621822094",
            "extra": "mean: 443.7921867705335 usec\nrounds: 2056"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1116.4812023933887,
            "unit": "iter/sec",
            "range": "stddev: 0.000023861299918272737",
            "extra": "mean: 895.6711477598644 usec\nrounds: 1049"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 522.0855375191778,
            "unit": "iter/sec",
            "range": "stddev: 0.00008112877917622208",
            "extra": "mean: 1.915394946107403 msec\nrounds: 501"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 4402.378931626372,
            "unit": "iter/sec",
            "range": "stddev: 0.000017048047237469887",
            "extra": "mean: 227.1499149734868 usec\nrounds: 3199"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2836.001378101297,
            "unit": "iter/sec",
            "range": "stddev: 0.000027991247618447787",
            "extra": "mean: 352.6091375419217 usec\nrounds: 2392"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1590.0502719710564,
            "unit": "iter/sec",
            "range": "stddev: 0.00003760595154364155",
            "extra": "mean: 628.9109329608686 usec\nrounds: 1432"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 927.9302597364701,
            "unit": "iter/sec",
            "range": "stddev: 0.00003220221674038322",
            "extra": "mean: 1.0776671948212977 msec\nrounds: 811"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 475.11044285437134,
            "unit": "iter/sec",
            "range": "stddev: 0.0000404514056197137",
            "extra": "mean: 2.1047737742664507 msec\nrounds: 443"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 4210.2672297402905,
            "unit": "iter/sec",
            "range": "stddev: 0.000020516975874804798",
            "extra": "mean: 237.51461497176385 usec\nrounds: 3353"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2734.600811732717,
            "unit": "iter/sec",
            "range": "stddev: 0.0000329602080033996",
            "extra": "mean: 365.6840865802175 usec\nrounds: 2310"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1516.309995815338,
            "unit": "iter/sec",
            "range": "stddev: 0.00003735723251592833",
            "extra": "mean: 659.4957513699486 usec\nrounds: 1460"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 864.8708715314118,
            "unit": "iter/sec",
            "range": "stddev: 0.00009304505237089136",
            "extra": "mean: 1.1562419696587969 msec\nrounds: 791"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 449.608618236885,
            "unit": "iter/sec",
            "range": "stddev: 0.00013023235894154484",
            "extra": "mean: 2.2241566541171833 msec\nrounds: 425"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3774.62937656835,
            "unit": "iter/sec",
            "range": "stddev: 0.000019374772040472782",
            "extra": "mean: 264.9266723264724 usec\nrounds: 3357"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 2059.9274299603862,
            "unit": "iter/sec",
            "range": "stddev: 0.000018428908637248332",
            "extra": "mean: 485.45399486196004 usec\nrounds: 1557"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1048.6721593571604,
            "unit": "iter/sec",
            "range": "stddev: 0.000022395771050229173",
            "extra": "mean: 953.5868679998174 usec\nrounds: 1000"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 506.2899642514515,
            "unit": "iter/sec",
            "range": "stddev: 0.000036359232839781725",
            "extra": "mean: 1.9751527200000842 msec\nrounds: 475"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 222.76082281837833,
            "unit": "iter/sec",
            "range": "stddev: 0.00008369796261377169",
            "extra": "mean: 4.489119708519488 msec\nrounds: 223"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 3082.60326534393,
            "unit": "iter/sec",
            "range": "stddev: 0.000021470486647843906",
            "extra": "mean: 324.40113563833154 usec\nrounds: 2632"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1671.3878050651135,
            "unit": "iter/sec",
            "range": "stddev: 0.00001934922595529354",
            "extra": "mean: 598.3051910331739 usec\nrounds: 1539"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 832.7726801650185,
            "unit": "iter/sec",
            "range": "stddev: 0.00007291480832878147",
            "extra": "mean: 1.2008078840937055 msec\nrounds: 811"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 356.3832178039328,
            "unit": "iter/sec",
            "range": "stddev: 0.0000737958102300774",
            "extra": "mean: 2.8059682668619894 msec\nrounds: 341"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 176.34140448817413,
            "unit": "iter/sec",
            "range": "stddev: 0.00008150171482323492",
            "extra": "mean: 5.670817939226873 msec\nrounds: 181"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1172.0488407505231,
            "unit": "iter/sec",
            "range": "stddev: 0.000029574986643615355",
            "extra": "mean: 853.2067651375761 usec\nrounds: 545"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 891.5373139859913,
            "unit": "iter/sec",
            "range": "stddev: 0.000055273208176228274",
            "extra": "mean: 1.1216580442708346 msec\nrounds: 768"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 587.1825817976365,
            "unit": "iter/sec",
            "range": "stddev: 0.000045962940574269984",
            "extra": "mean: 1.7030477929684817 msec\nrounds: 512"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1148.2191089688638,
            "unit": "iter/sec",
            "range": "stddev: 0.00002708067315206947",
            "extra": "mean: 870.9139154616848 usec\nrounds: 899"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 838.4060416849793,
            "unit": "iter/sec",
            "range": "stddev: 0.0000389900323194789",
            "extra": "mean: 1.192739496473879 msec\nrounds: 709"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 536.3482947622978,
            "unit": "iter/sec",
            "range": "stddev: 0.000054748122780703856",
            "extra": "mean: 1.8644601087865609 msec\nrounds: 478"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 725.891257115173,
            "unit": "iter/sec",
            "range": "stddev: 0.000039834521385153766",
            "extra": "mean: 1.3776168127085402 msec\nrounds: 598"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 503.2210264934753,
            "unit": "iter/sec",
            "range": "stddev: 0.00005377230895661709",
            "extra": "mean: 1.9871983628509329 msec\nrounds: 463"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 303.40494678600106,
            "unit": "iter/sec",
            "range": "stddev: 0.00011334203346686367",
            "extra": "mean: 3.2959251673154975 msec\nrounds: 257"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 7.310117914468025,
            "unit": "iter/sec",
            "range": "stddev: 0.00040535657585844437",
            "extra": "mean: 136.79669900000135 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.121435162533987,
            "unit": "iter/sec",
            "range": "stddev: 0.0007555016299232191",
            "extra": "mean: 320.365456250002 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.2022418622385265,
            "unit": "iter/sec",
            "range": "stddev: 0.009075653968612065",
            "extra": "mean: 831.7793876666713 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 945.2868728532578,
            "unit": "iter/sec",
            "range": "stddev: 0.00003232241100076692",
            "extra": "mean: 1.0578799184861163 msec\nrounds: 687"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 627.0919631492446,
            "unit": "iter/sec",
            "range": "stddev: 0.000040272969718384595",
            "extra": "mean: 1.5946624399043767 msec\nrounds: 416"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 334.49913749696276,
            "unit": "iter/sec",
            "range": "stddev: 0.0001117771908935676",
            "extra": "mean: 2.9895443303170848 msec\nrounds: 221"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 689.6967727234253,
            "unit": "iter/sec",
            "range": "stddev: 0.000030027981205980367",
            "extra": "mean: 1.4499125406245872 msec\nrounds: 640"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 306.325077194779,
            "unit": "iter/sec",
            "range": "stddev: 0.00004102350299038041",
            "extra": "mean: 3.264505828767466 msec\nrounds: 292"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 250.03165553841396,
            "unit": "iter/sec",
            "range": "stddev: 0.0001155371838123704",
            "extra": "mean: 3.9994935755099363 msec\nrounds: 245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 234.8653850080032,
            "unit": "iter/sec",
            "range": "stddev: 0.000049990471329188854",
            "extra": "mean: 4.257758119468837 msec\nrounds: 226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 108.6165999444029,
            "unit": "iter/sec",
            "range": "stddev: 0.00006383226145584117",
            "extra": "mean: 9.206695850467291 msec\nrounds: 107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 90.46226396795795,
            "unit": "iter/sec",
            "range": "stddev: 0.0001052700547399238",
            "extra": "mean: 11.054333112359464 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 326.37134319857387,
            "unit": "iter/sec",
            "range": "stddev: 0.00005369515316817551",
            "extra": "mean: 3.06399449841272 msec\nrounds: 315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 141.61440424980776,
            "unit": "iter/sec",
            "range": "stddev: 0.00009678614099186153",
            "extra": "mean: 7.061428569342426 msec\nrounds: 137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 117.33916395147456,
            "unit": "iter/sec",
            "range": "stddev: 0.00016980412346348752",
            "extra": "mean: 8.522303775860792 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 113.82783702086229,
            "unit": "iter/sec",
            "range": "stddev: 0.00009721172932924962",
            "extra": "mean: 8.785197243243063 msec\nrounds: 111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 50.62612711440835,
            "unit": "iter/sec",
            "range": "stddev: 0.00016343438107357155",
            "extra": "mean: 19.752646647058985 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 41.08579494614722,
            "unit": "iter/sec",
            "range": "stddev: 0.00020617764578715784",
            "extra": "mean: 24.339312439025207 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 348.6878485306739,
            "unit": "iter/sec",
            "range": "stddev: 0.0000682784199173723",
            "extra": "mean: 2.867894606060614 msec\nrounds: 330"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 266.4291265497175,
            "unit": "iter/sec",
            "range": "stddev: 0.00007868867731008946",
            "extra": "mean: 3.7533433861008176 msec\nrounds: 259"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 72.3540902817877,
            "unit": "iter/sec",
            "range": "stddev: 0.0005609856144998309",
            "extra": "mean: 13.820918708333352 msec\nrounds: 72"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 171.28540053656107,
            "unit": "iter/sec",
            "range": "stddev: 0.00008598931551017447",
            "extra": "mean: 5.83820919277092 msec\nrounds: 166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 129.19170256305537,
            "unit": "iter/sec",
            "range": "stddev: 0.0001005976556895772",
            "extra": "mean: 7.740435184000489 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 30.580729753867107,
            "unit": "iter/sec",
            "range": "stddev: 0.0002521079078822787",
            "extra": "mean: 32.700331484847716 msec\nrounds: 33"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 82.28332487199516,
            "unit": "iter/sec",
            "range": "stddev: 0.00008939347725882189",
            "extra": "mean: 12.153130680555988 msec\nrounds: 72"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 61.818521281316336,
            "unit": "iter/sec",
            "range": "stddev: 0.00013052370881723183",
            "extra": "mean: 16.176381758620842 msec\nrounds: 58"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.671157291434142,
            "unit": "iter/sec",
            "range": "stddev: 0.0009670718495445446",
            "extra": "mean: 68.1609487333257 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 38.54613797852369,
            "unit": "iter/sec",
            "range": "stddev: 0.00034198836864091466",
            "extra": "mean: 25.942936243240723 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 23.62408059632546,
            "unit": "iter/sec",
            "range": "stddev: 0.0007850596264961906",
            "extra": "mean: 42.32968965385016 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.865315142224035,
            "unit": "iter/sec",
            "range": "stddev: 0.0019091257626829038",
            "extra": "mean: 145.65973728571586 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 18.10370568402549,
            "unit": "iter/sec",
            "range": "stddev: 0.00046952870316201536",
            "extra": "mean: 55.23730983333368 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 12.362175825296513,
            "unit": "iter/sec",
            "range": "stddev: 0.0008478977042552898",
            "extra": "mean: 80.89190884615286 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 721.3747023313097,
            "unit": "iter/sec",
            "range": "stddev: 0.000031259700103205",
            "extra": "mean: 1.38624212461047 msec\nrounds: 642"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 234.48464952204483,
            "unit": "iter/sec",
            "range": "stddev: 0.000046050666697382876",
            "extra": "mean: 4.264671491452945 msec\nrounds: 234"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 68.81654616542743,
            "unit": "iter/sec",
            "range": "stddev: 0.00045254840317349713",
            "extra": "mean: 14.531388971427159 msec\nrounds: 70"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 18.76466588880894,
            "unit": "iter/sec",
            "range": "stddev: 0.00041425678094257043",
            "extra": "mean: 53.291649631576455 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 4.927199198034186,
            "unit": "iter/sec",
            "range": "stddev: 0.0006575116109024167",
            "extra": "mean: 202.95505819999562 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 246.38605037163344,
            "unit": "iter/sec",
            "range": "stddev: 0.007413868076179667",
            "extra": "mean: 4.0586713350518915 msec\nrounds: 194"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 252.62465454416193,
            "unit": "iter/sec",
            "range": "stddev: 0.000039966912840368036",
            "extra": "mean: 3.9584418306455817 msec\nrounds: 248"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 139.20310020254584,
            "unit": "iter/sec",
            "range": "stddev: 0.000626637431404276",
            "extra": "mean: 7.1837480526293005 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 141.67628015514762,
            "unit": "iter/sec",
            "range": "stddev: 0.000058891928574260475",
            "extra": "mean: 7.058344550724472 msec\nrounds: 138"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.4199158678150922,
            "unit": "iter/sec",
            "range": "stddev: 0.00990496833654124",
            "extra": "mean: 2.381429416333333 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}