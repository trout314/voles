window.BENCHMARK_DATA = {
  "lastUpdate": 1781619661659,
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
          "id": "d129110f5e23e2add7567dbc4dfc6374e37f6460",
          "message": "Fill remaining gaps in complex-input test coverage\n\nThree new cases targeted at coverage gaps surfaced in the earlier audit:\n\n1. test_complex_convergence_rate (parametrized M=10, 20): verifies that\n   the complex dispatch inherits the underlying real path's convergence\n   order (~factor-8+ error reduction per halving of h with\n   coll_choices=[0,1,2]). Previously only point-accuracy was tested at a\n   fixed mesh.\n\n2. test_complex_vector_coupled_non_diagonal: 2x2 non-diagonal complex\n   kernel constructed via similarity transform P=[[1,1],[1,-1]] on a\n   diagonal system with K_diag = diag(i, 2i) and y_diag = [exp(it),\n   exp(2it)]. Exercises the off-diagonal coupling in the block code path\n   that the existing diagonal-only test couldn't reach.\n\n3. test_vie1_complex_force_continuous: VIE-1 with complex K, complex g,\n   complex soln_init_value, and force_continuous=True. Verifies that the\n   continuity constraint pins y(0+) to the complex soln_init_value to\n   machine precision and that the solution matches exp(it).\n\nFull suite: 251 passed, 6 skipped.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-16T10:09:27-04:00",
          "tree_id": "21b6aac1de1401956fd05727069ce864649b6008",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/d129110f5e23e2add7567dbc4dfc6374e37f6460"
        },
        "date": 1781619441347,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 20464.29226491518,
            "unit": "iter/sec",
            "range": "stddev: 0.00007196566811263631",
            "extra": "mean: 48.86560390434028 usec\nrounds: 12704"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 7784.828868926588,
            "unit": "iter/sec",
            "range": "stddev: 0.000011100225444068623",
            "extra": "mean: 128.45497529066236 usec\nrounds: 7568"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2296.5506856332404,
            "unit": "iter/sec",
            "range": "stddev: 0.000014977271756523982",
            "extra": "mean: 435.435632340187 usec\nrounds: 2282"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1093.543726866457,
            "unit": "iter/sec",
            "range": "stddev: 0.00003012719935022202",
            "extra": "mean: 914.4581743114142 usec\nrounds: 1090"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 611.0911208164283,
            "unit": "iter/sec",
            "range": "stddev: 0.000025171246359096175",
            "extra": "mean: 1.6364171658458768 msec\nrounds: 609"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 38738.03053394197,
            "unit": "iter/sec",
            "range": "stddev: 0.000008054238599451423",
            "extra": "mean: 25.81442541648594 usec\nrounds: 21191"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 21914.983983325015,
            "unit": "iter/sec",
            "range": "stddev: 0.000009740235204021154",
            "extra": "mean: 45.63087980173265 usec\nrounds: 19967"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 8884.635046600064,
            "unit": "iter/sec",
            "range": "stddev: 0.000011781795591661134",
            "extra": "mean: 112.55386346822156 usec\nrounds: 8650"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 4569.504982318951,
            "unit": "iter/sec",
            "range": "stddev: 0.000012807266427591578",
            "extra": "mean: 218.8420854927082 usec\nrounds: 4515"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2697.643622346308,
            "unit": "iter/sec",
            "range": "stddev: 0.00003498878589144721",
            "extra": "mean: 370.69388695984907 usec\nrounds: 2707"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 30320.579550380597,
            "unit": "iter/sec",
            "range": "stddev: 0.00000924216535838937",
            "extra": "mean: 32.98089993096612 usec\nrounds: 23194"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 17048.095066615646,
            "unit": "iter/sec",
            "range": "stddev: 0.000010205058476420234",
            "extra": "mean: 58.65757998723538 usec\nrounds: 15590"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 7284.937702888393,
            "unit": "iter/sec",
            "range": "stddev: 0.000012683106935705854",
            "extra": "mean: 137.26953349285492 usec\nrounds: 7106"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3917.258295248437,
            "unit": "iter/sec",
            "range": "stddev: 0.000014070581856664933",
            "extra": "mean: 255.28058775521177 usec\nrounds: 3675"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2390.8959609485278,
            "unit": "iter/sec",
            "range": "stddev: 0.00003307990722483531",
            "extra": "mean: 418.2532474576079 usec\nrounds: 2360"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2202.143143879364,
            "unit": "iter/sec",
            "range": "stddev: 0.000037555364568325366",
            "extra": "mean: 454.10308715825295 usec\nrounds: 1939"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 875.480403312971,
            "unit": "iter/sec",
            "range": "stddev: 0.00003886083298421968",
            "extra": "mean: 1.1422300216153611 msec\nrounds: 879"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 306.79352800847005,
            "unit": "iter/sec",
            "range": "stddev: 0.00003336347327382447",
            "extra": "mean: 3.2595211720776316 msec\nrounds: 308"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 154.87763138696494,
            "unit": "iter/sec",
            "range": "stddev: 0.00006598166467799068",
            "extra": "mean: 6.456710314102619 msec\nrounds: 156"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 93.97953840690269,
            "unit": "iter/sec",
            "range": "stddev: 0.00005477829223139383",
            "extra": "mean: 10.640614084209538 msec\nrounds: 95"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 12895.640560027125,
            "unit": "iter/sec",
            "range": "stddev: 0.00001134203379331509",
            "extra": "mean: 77.5455856841823 usec\nrounds: 10422"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4843.871034765444,
            "unit": "iter/sec",
            "range": "stddev: 0.000014473363998682572",
            "extra": "mean: 206.44645425586216 usec\nrounds: 4711"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1443.2398085992888,
            "unit": "iter/sec",
            "range": "stddev: 0.000050363842666172286",
            "extra": "mean: 692.8855440666736 usec\nrounds: 1441"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 687.9008582759607,
            "unit": "iter/sec",
            "range": "stddev: 0.000029665425509612254",
            "extra": "mean: 1.453697851905916 msec\nrounds: 682"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 393.5387097375779,
            "unit": "iter/sec",
            "range": "stddev: 0.00015098028940080814",
            "extra": "mean: 2.5410460909088886 msec\nrounds: 396"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 11959.005628536206,
            "unit": "iter/sec",
            "range": "stddev: 0.000011359353904288898",
            "extra": "mean: 83.61899233610454 usec\nrounds: 10569"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4594.289877191572,
            "unit": "iter/sec",
            "range": "stddev: 0.00001449253440492006",
            "extra": "mean: 217.66149431809183 usec\nrounds: 4224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1413.2815859253844,
            "unit": "iter/sec",
            "range": "stddev: 0.00002842727406606575",
            "extra": "mean: 707.5730767023495 usec\nrounds: 1395"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 669.2966633901117,
            "unit": "iter/sec",
            "range": "stddev: 0.00006150993034002458",
            "extra": "mean: 1.4941057601196075 msec\nrounds: 667"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 389.1597907802608,
            "unit": "iter/sec",
            "range": "stddev: 0.00006983867490238095",
            "extra": "mean: 2.569638548718026 msec\nrounds: 390"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4388.253874947877,
            "unit": "iter/sec",
            "range": "stddev: 0.000015848684022778114",
            "extra": "mean: 227.88107263093974 usec\nrounds: 4158"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1222.8451865098768,
            "unit": "iter/sec",
            "range": "stddev: 0.000022315454959727063",
            "extra": "mean: 817.7650049505453 usec\nrounds: 1212"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 317.8556006417971,
            "unit": "iter/sec",
            "range": "stddev: 0.00003247137342605848",
            "extra": "mean: 3.1460826802512 msec\nrounds: 319"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 142.85305864850415,
            "unit": "iter/sec",
            "range": "stddev: 0.000049350195619196345",
            "extra": "mean: 7.000200131944961 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 80.58448744537586,
            "unit": "iter/sec",
            "range": "stddev: 0.0001329932513953438",
            "extra": "mean: 12.40933623456809 msec\nrounds: 81"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1240.8776833275783,
            "unit": "iter/sec",
            "range": "stddev: 0.000025262119488834134",
            "extra": "mean: 805.881202826025 usec\nrounds: 1203"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 372.3688364501019,
            "unit": "iter/sec",
            "range": "stddev: 0.00005020983279313752",
            "extra": "mean: 2.685509371657641 msec\nrounds: 374"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 103.29112488837008,
            "unit": "iter/sec",
            "range": "stddev: 0.00005967009541676649",
            "extra": "mean: 9.681373894230806 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 47.50064570942961,
            "unit": "iter/sec",
            "range": "stddev: 0.00005497711804303555",
            "extra": "mean: 21.052345395832894 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 27.188272931951538,
            "unit": "iter/sec",
            "range": "stddev: 0.00015671214827699912",
            "extra": "mean: 36.780563535714855 msec\nrounds: 28"
          }
        ]
      },
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
          "id": "a73532ff91fa7f0d11cc30e256ac0e70623b0721",
          "message": "Install [callable] extra in CI so function_solver tests can hit scipy\n\nThe Linux/macOS/Windows test workflows installed the package with the\n[dev] extra only, so scipy was absent and ~21 function_solver tests\nfailed with either ImportError (singular-kernel path needs scipy.quad)\nor 'DID NOT WARN' for tests using pytest.warns(IntegrationWarning).\nAdd [callable] to the install so scipy lands in the test environment.\n\nThe existing test_scipy_missing_friendly_import_error monkeypatches\nthe scipy import to simulate the missing-extra case, so coverage of\nthat error path is unaffected by this change.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-16T10:13:00-04:00",
          "tree_id": "fa9765c729fa11fedd29639d5119fab0c1dcdeb8",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/a73532ff91fa7f0d11cc30e256ac0e70623b0721"
        },
        "date": 1781619660857,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15984.218087941035,
            "unit": "iter/sec",
            "range": "stddev: 0.00008261499771453983",
            "extra": "mean: 62.56170896181837 usec\nrounds: 11404"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6248.903414219116,
            "unit": "iter/sec",
            "range": "stddev: 0.00001590979359796659",
            "extra": "mean: 160.0280775222965 usec\nrounds: 5392"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1859.1408099682344,
            "unit": "iter/sec",
            "range": "stddev: 0.000022120358686932493",
            "extra": "mean: 537.8828729046543 usec\nrounds: 1849"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 864.8340173197441,
            "unit": "iter/sec",
            "range": "stddev: 0.000040819129346601345",
            "extra": "mean: 1.156291241987863 msec\nrounds: 624"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 497.18409114545403,
            "unit": "iter/sec",
            "range": "stddev: 0.00010242435833296338",
            "extra": "mean: 2.0113274294358794 msec\nrounds: 496"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28134.96569599852,
            "unit": "iter/sec",
            "range": "stddev: 0.000012318124597406743",
            "extra": "mean: 35.54296140983831 usec\nrounds: 15859"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17218.11381419003,
            "unit": "iter/sec",
            "range": "stddev: 0.000013620009341530704",
            "extra": "mean: 58.07837088263792 usec\nrounds: 14967"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7159.853072207401,
            "unit": "iter/sec",
            "range": "stddev: 0.000016714242413946985",
            "extra": "mean: 139.66767053945946 usec\nrounds: 6799"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3716.5065488775926,
            "unit": "iter/sec",
            "range": "stddev: 0.000016470521616460555",
            "extra": "mean: 269.0698877692025 usec\nrounds: 3671"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2231.398632155243,
            "unit": "iter/sec",
            "range": "stddev: 0.000020609735475881432",
            "extra": "mean: 448.1494187500371 usec\nrounds: 2240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22777.496910839516,
            "unit": "iter/sec",
            "range": "stddev: 0.000012771098987311781",
            "extra": "mean: 43.90298038078596 usec\nrounds: 17381"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13490.970421749718,
            "unit": "iter/sec",
            "range": "stddev: 0.000014181378975296642",
            "extra": "mean: 74.12365224578888 usec\nrounds: 12089"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5874.684797520224,
            "unit": "iter/sec",
            "range": "stddev: 0.000016891159094484065",
            "extra": "mean: 170.22189861524353 usec\nrounds: 5632"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3197.4217173369493,
            "unit": "iter/sec",
            "range": "stddev: 0.00001843645302680376",
            "extra": "mean: 312.75198844676464 usec\nrounds: 3116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1983.7928479967136,
            "unit": "iter/sec",
            "range": "stddev: 0.000020434320956130276",
            "extra": "mean: 504.0848902191711 usec\nrounds: 1922"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1737.7776712229697,
            "unit": "iter/sec",
            "range": "stddev: 0.000019212276973257448",
            "extra": "mean: 575.4476056170321 usec\nrounds: 1709"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 692.2190597918963,
            "unit": "iter/sec",
            "range": "stddev: 0.00005157270155930448",
            "extra": "mean: 1.4446293927541274 msec\nrounds: 690"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 243.3205212562669,
            "unit": "iter/sec",
            "range": "stddev: 0.000057514236507450016",
            "extra": "mean: 4.109805432098319 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.34086138468042,
            "unit": "iter/sec",
            "range": "stddev: 0.00003746059035300612",
            "extra": "mean: 8.042408495999098 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.41957382577743,
            "unit": "iter/sec",
            "range": "stddev: 0.00004090225460589336",
            "extra": "mean: 13.259157394737398 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10357.084432133197,
            "unit": "iter/sec",
            "range": "stddev: 0.00001460602368172387",
            "extra": "mean: 96.55226879269874 usec\nrounds: 8341"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4194.832208814134,
            "unit": "iter/sec",
            "range": "stddev: 0.000018029323264998364",
            "extra": "mean: 238.38855768743534 usec\nrounds: 4013"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1303.2237810127606,
            "unit": "iter/sec",
            "range": "stddev: 0.00003214063235805936",
            "extra": "mean: 767.3279252338999 usec\nrounds: 1284"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 621.3709260894431,
            "unit": "iter/sec",
            "range": "stddev: 0.00002585476133246344",
            "extra": "mean: 1.6093446893201684 msec\nrounds: 618"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 360.3298553442676,
            "unit": "iter/sec",
            "range": "stddev: 0.00002799099036050934",
            "extra": "mean: 2.775234927576502 msec\nrounds: 359"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9697.892504694664,
            "unit": "iter/sec",
            "range": "stddev: 0.00001626767582494173",
            "extra": "mean: 103.11518708996917 usec\nrounds: 7777"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3953.9323453489937,
            "unit": "iter/sec",
            "range": "stddev: 0.00002159681656808917",
            "extra": "mean: 252.9127745891502 usec\nrounds: 3589"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1246.5933745745785,
            "unit": "iter/sec",
            "range": "stddev: 0.000057597257225501794",
            "extra": "mean: 802.1861983192933 usec\nrounds: 1190"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 606.0107430394567,
            "unit": "iter/sec",
            "range": "stddev: 0.00006252659569123259",
            "extra": "mean: 1.6501357632448623 msec\nrounds: 604"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 354.31846710726705,
            "unit": "iter/sec",
            "range": "stddev: 0.00003412989663872136",
            "extra": "mean: 2.822319728814073 msec\nrounds: 354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3862.4309381411817,
            "unit": "iter/sec",
            "range": "stddev: 0.000016403094743960312",
            "extra": "mean: 258.9043056084405 usec\nrounds: 3655"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1092.6262247589543,
            "unit": "iter/sec",
            "range": "stddev: 0.000019824316136335038",
            "extra": "mean: 915.2260648151761 usec\nrounds: 1080"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 287.16780764612884,
            "unit": "iter/sec",
            "range": "stddev: 0.00016870219632484103",
            "extra": "mean: 3.482284480968981 msec\nrounds: 289"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 129.98196964532715,
            "unit": "iter/sec",
            "range": "stddev: 0.00004866176927360993",
            "extra": "mean: 7.69337472519174 msec\nrounds: 131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.56243964816672,
            "unit": "iter/sec",
            "range": "stddev: 0.000054703236497222984",
            "extra": "mean: 13.59389390540586 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1015.4283666599902,
            "unit": "iter/sec",
            "range": "stddev: 0.000024087983912558356",
            "extra": "mean: 984.8060511538218 usec\nrounds: 997"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 311.13156149616685,
            "unit": "iter/sec",
            "range": "stddev: 0.00004015883060964072",
            "extra": "mean: 3.214074442307326 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 85.07657581619425,
            "unit": "iter/sec",
            "range": "stddev: 0.0009856068156730837",
            "extra": "mean: 11.75411669318326 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.79097237181669,
            "unit": "iter/sec",
            "range": "stddev: 0.0002906445053417323",
            "extra": "mean: 25.131328549997534 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.866819345171237,
            "unit": "iter/sec",
            "range": "stddev: 0.00008914090446396572",
            "extra": "mean: 43.731486434783456 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}