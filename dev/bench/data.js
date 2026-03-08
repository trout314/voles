window.BENCHMARK_DATA = {
  "lastUpdate": 1773000579785,
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
          "id": "b47a8586988b8c050c0f2bc9082ec6638accf005",
          "message": "Add complexity tests; remove non-convergent VIE-1 settings; fix complexity formula\n\nComplexity tests (tests/test_complexity.py):\n- O(N²): doubling N → 4× runtime, verified for all three solvers\n- O(m²): m=1 vs m=5 → ~25× runtime for VIE-2 (BNL matrix is m×m per history step)\n- O(1/q⁴): q=2 vs q=4 → ~16× speedup for VIE-2 (mesh_divs ∝ 1/q², squared in double sum)\nUses large N (≥3201) so computation dominates overhead; SLACK=2.5 tolerates noise.\n\nCorrect complexity formula (was O(N²m/q²), now O(N²m²/q⁴)):\n- VIE-2/VIE-1 history cost per (n, ell) pair: O(m²) from BNL's double loop over m\n  (one loop for collocation nodes, one for polynomial basis functions)\n- VIDE history cost per (n, ell) pair: O(m³) from CNL's triple loop\n- No q² inner quadrature loop: kernel evaluated at one point per (i,j) entry\n  via precomputed collocation weights, so q appears only through mesh_divs ∝ 1/q²,\n  giving total cost ∝ (mesh_divs)² ∝ 1/q⁴\nREADME complexity table updated accordingly.\n\nNon-convergent VIE-1 settings removed:\n- (coll_divs=3, [1]), (coll_divs=4, [1]), (coll_divs=4, [1,2]) excluded from\n  fast_coll_settings_VIE_1 and solve_VIE_1 now raises ValueError for those settings\n- D extension also rejects them via is_nonconvergent_vie1_setting() guard in\n  volterra_solve_vie1_vec()\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T15:55:25-04:00",
          "tree_id": "f7192ddea64a92235bd590dc646360a97c8e7f8c",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/b47a8586988b8c050c0f2bc9082ec6638accf005"
        },
        "date": 1773000161876,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16320.571052816756,
            "unit": "iter/sec",
            "range": "stddev: 0.00010543547385882903",
            "extra": "mean: 61.27236582370754 usec\nrounds: 11470"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6308.761264192105,
            "unit": "iter/sec",
            "range": "stddev: 0.00001625871346097009",
            "extra": "mean: 158.5097229270506 usec\nrounds: 6067"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1866.6976836080441,
            "unit": "iter/sec",
            "range": "stddev: 0.00002145811635091534",
            "extra": "mean: 535.7053843165173 usec\nrounds: 1798"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 867.2004687784961,
            "unit": "iter/sec",
            "range": "stddev: 0.00005370703290801092",
            "extra": "mean: 1.1531359080196995 msec\nrounds: 848"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.77829643425065,
            "unit": "iter/sec",
            "range": "stddev: 0.000029837142241646622",
            "extra": "mean: 1.9968916526942464 msec\nrounds: 501"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29962.94782947869,
            "unit": "iter/sec",
            "range": "stddev: 0.00001118872508883174",
            "extra": "mean: 33.37455332135785 usec\nrounds: 16063"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17646.548284405464,
            "unit": "iter/sec",
            "range": "stddev: 0.000013607623169358528",
            "extra": "mean: 56.66830611195028 usec\nrounds: 15674"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7242.7512976594135,
            "unit": "iter/sec",
            "range": "stddev: 0.000016839137549635594",
            "extra": "mean: 138.06907884896762 usec\nrounds: 6151"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3747.2351854477924,
            "unit": "iter/sec",
            "range": "stddev: 0.00001689029981094556",
            "extra": "mean: 266.8634207651155 usec\nrounds: 3477"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2248.5345199033663,
            "unit": "iter/sec",
            "range": "stddev: 0.000022620290085070823",
            "extra": "mean: 444.7341106610968 usec\nrounds: 2223"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24754.911035481364,
            "unit": "iter/sec",
            "range": "stddev: 0.000012581590358858547",
            "extra": "mean: 40.39602479551205 usec\nrounds: 19560"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13728.251243723584,
            "unit": "iter/sec",
            "range": "stddev: 0.000014567724556734634",
            "extra": "mean: 72.84248971311548 usec\nrounds: 12054"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6036.901751322103,
            "unit": "iter/sec",
            "range": "stddev: 0.000018306946176429267",
            "extra": "mean: 165.64788383064152 usec\nrounds: 5733"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3247.2594012361506,
            "unit": "iter/sec",
            "range": "stddev: 0.000019290165728967215",
            "extra": "mean: 307.95199164542413 usec\nrounds: 3112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1994.9345351395696,
            "unit": "iter/sec",
            "range": "stddev: 0.00002402635642371404",
            "extra": "mean: 501.2695817259177 usec\nrounds: 1970"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1804.129723468981,
            "unit": "iter/sec",
            "range": "stddev: 0.00001782444015940118",
            "extra": "mean: 554.2838671695957 usec\nrounds: 1724"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 709.6298144297386,
            "unit": "iter/sec",
            "range": "stddev: 0.00003401897434619123",
            "extra": "mean: 1.4091854367810122 msec\nrounds: 696"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 252.14851169116744,
            "unit": "iter/sec",
            "range": "stddev: 0.000025554893300224115",
            "extra": "mean: 3.9659167261903345 msec\nrounds: 252"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 128.54129821641143,
            "unit": "iter/sec",
            "range": "stddev: 0.00004182308011452854",
            "extra": "mean: 7.779600905511358 msec\nrounds: 127"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 77.96288561237321,
            "unit": "iter/sec",
            "range": "stddev: 0.00004951889912518053",
            "extra": "mean: 12.826616051282915 msec\nrounds: 78"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10733.798322466613,
            "unit": "iter/sec",
            "range": "stddev: 0.000015067665299102454",
            "extra": "mean: 93.16366582991671 usec\nrounds: 8364"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4235.286684645515,
            "unit": "iter/sec",
            "range": "stddev: 0.000017201604804336445",
            "extra": "mean: 236.11152549020372 usec\nrounds: 4080"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1299.1952909594736,
            "unit": "iter/sec",
            "range": "stddev: 0.00002003530824593384",
            "extra": "mean: 769.7072233547631 usec\nrounds: 1276"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 612.7112774765536,
            "unit": "iter/sec",
            "range": "stddev: 0.000025538576443195652",
            "extra": "mean: 1.6320900834704593 msec\nrounds: 611"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 354.3622107428551,
            "unit": "iter/sec",
            "range": "stddev: 0.00004473751956774103",
            "extra": "mean: 2.8219713323937228 msec\nrounds: 355"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9904.71957822965,
            "unit": "iter/sec",
            "range": "stddev: 0.000015257368767018019",
            "extra": "mean: 100.96196990755573 usec\nrounds: 8773"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3937.1813641732538,
            "unit": "iter/sec",
            "range": "stddev: 0.00002472014239300302",
            "extra": "mean: 253.98880760220817 usec\nrounds: 3420"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1249.296807137824,
            "unit": "iter/sec",
            "range": "stddev: 0.00002258209708707679",
            "extra": "mean: 800.45029674816 usec\nrounds: 1230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 596.0204622718211,
            "unit": "iter/sec",
            "range": "stddev: 0.000026538301183802747",
            "extra": "mean: 1.677794745818542 msec\nrounds: 598"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 346.2219268082131,
            "unit": "iter/sec",
            "range": "stddev: 0.00003820577836249126",
            "extra": "mean: 2.8883208213266696 msec\nrounds: 347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4008.235979906077,
            "unit": "iter/sec",
            "range": "stddev: 0.000016859444070865233",
            "extra": "mean: 249.48630894317571 usec\nrounds: 3567"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1126.4866400226263,
            "unit": "iter/sec",
            "range": "stddev: 0.000028115616219871856",
            "extra": "mean: 887.7158099095737 usec\nrounds: 1110"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.2138207144356,
            "unit": "iter/sec",
            "range": "stddev: 0.0001662538401802406",
            "extra": "mean: 3.3988885959596087 msec\nrounds: 297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 133.13876685646883,
            "unit": "iter/sec",
            "range": "stddev: 0.00004172661010061765",
            "extra": "mean: 7.5109603582107445 msec\nrounds: 134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.3480115463347,
            "unit": "iter/sec",
            "range": "stddev: 0.000046153156280759855",
            "extra": "mean: 13.271750368422891 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1040.9409770880263,
            "unit": "iter/sec",
            "range": "stddev: 0.00002569355072237223",
            "extra": "mean: 960.6692617649115 usec\nrounds: 1020"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 315.5252738548254,
            "unit": "iter/sec",
            "range": "stddev: 0.00003424292861024461",
            "extra": "mean: 3.1693182222229987 msec\nrounds: 315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 87.35789214967808,
            "unit": "iter/sec",
            "range": "stddev: 0.00003155611642467145",
            "extra": "mean: 11.447162647727472 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.73972646434968,
            "unit": "iter/sec",
            "range": "stddev: 0.0010881733921063374",
            "extra": "mean: 25.163736365852827 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.97996186774075,
            "unit": "iter/sec",
            "range": "stddev: 0.00011294414149224474",
            "extra": "mean: 43.516173166666526 msec\nrounds: 24"
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
          "id": "543174426c32a66b9221a3c20ee6015b1635dc7b",
          "message": "Simplify complexity tests to O(N²) and O(d²); update README\n\nRemove m and q scaling tests (too sensitive to SIMD and pre-asymptotic\neffects at practical test sizes). Replace with d² scaling tests that\ncompare scalar (d=1) vs vector (d=2) solves and check the 4× ratio\ncleanly. Update README complexity table to drop m and q parameters.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T16:01:57-04:00",
          "tree_id": "5abb4b8079614483784d8995fa860a909fceeb47",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/543174426c32a66b9221a3c20ee6015b1635dc7b"
        },
        "date": 1773000578734,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16463.96815661814,
            "unit": "iter/sec",
            "range": "stddev: 0.00008561117375010506",
            "extra": "mean: 60.73869862278753 usec\nrounds: 11255"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6331.8349616528985,
            "unit": "iter/sec",
            "range": "stddev: 0.000015489945412656646",
            "extra": "mean: 157.93210120861303 usec\nrounds: 6136"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1877.985988897785,
            "unit": "iter/sec",
            "range": "stddev: 0.000018308661212027254",
            "extra": "mean: 532.4853358394402 usec\nrounds: 1858"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 865.7661395737108,
            "unit": "iter/sec",
            "range": "stddev: 0.00005602070546164119",
            "extra": "mean: 1.155046327513321 msec\nrounds: 858"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 501.8674693481939,
            "unit": "iter/sec",
            "range": "stddev: 0.00004298387495323401",
            "extra": "mean: 1.99255791832605 msec\nrounds: 502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30392.569369111072,
            "unit": "iter/sec",
            "range": "stddev: 0.000010554192169301621",
            "extra": "mean: 32.90277922393529 usec\nrounds: 16990"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17836.98299643234,
            "unit": "iter/sec",
            "range": "stddev: 0.000012251126203428759",
            "extra": "mean: 56.06329277770881 usec\nrounds: 12074"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7294.634809671739,
            "unit": "iter/sec",
            "range": "stddev: 0.000015038446239992517",
            "extra": "mean: 137.087054539609 usec\nrounds: 6894"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3760.9772750234,
            "unit": "iter/sec",
            "range": "stddev: 0.00001594409438387015",
            "extra": "mean: 265.8883388211321 usec\nrounds: 3704"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2252.381508215107,
            "unit": "iter/sec",
            "range": "stddev: 0.00001779424822777212",
            "extra": "mean: 443.97452045876855 usec\nrounds: 2175"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 25177.329532838557,
            "unit": "iter/sec",
            "range": "stddev: 0.00001150552575354691",
            "extra": "mean: 39.71827110161581 usec\nrounds: 19963"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14355.643571669765,
            "unit": "iter/sec",
            "range": "stddev: 0.000012909933392823693",
            "extra": "mean: 69.65901563434302 usec\nrounds: 12728"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6064.489995744836,
            "unit": "iter/sec",
            "range": "stddev: 0.000016644808277515677",
            "extra": "mean: 164.89432758593918 usec\nrounds: 5336"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3264.692145150021,
            "unit": "iter/sec",
            "range": "stddev: 0.000017962247814462488",
            "extra": "mean: 306.30759518491976 usec\nrounds: 3073"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2020.5646496584907,
            "unit": "iter/sec",
            "range": "stddev: 0.000018354089345887555",
            "extra": "mean: 494.9111626638705 usec\nrounds: 1998"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1804.6026778520934,
            "unit": "iter/sec",
            "range": "stddev: 0.000014993954975132467",
            "extra": "mean: 554.1385991902871 usec\nrounds: 1729"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 712.6971736616678,
            "unit": "iter/sec",
            "range": "stddev: 0.00001986097732101859",
            "extra": "mean: 1.4031204794348193 msec\nrounds: 705"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 246.3973368957386,
            "unit": "iter/sec",
            "range": "stddev: 0.00007144157718226835",
            "extra": "mean: 4.058485422767144 msec\nrounds: 246"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.86409953724248,
            "unit": "iter/sec",
            "range": "stddev: 0.000026975133732328598",
            "extra": "mean: 8.00870709600349 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 76.00896861604495,
            "unit": "iter/sec",
            "range": "stddev: 0.00003749927770162709",
            "extra": "mean: 13.156342181821254 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10888.1120990282,
            "unit": "iter/sec",
            "range": "stddev: 0.000013296976262301536",
            "extra": "mean: 91.84328659596125 usec\nrounds: 7931"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4318.283098799026,
            "unit": "iter/sec",
            "range": "stddev: 0.000016464708480579095",
            "extra": "mean: 231.5735159369504 usec\nrounds: 3890"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1325.8958734617886,
            "unit": "iter/sec",
            "range": "stddev: 0.00002775904488106117",
            "extra": "mean: 754.207038437411 usec\nrounds: 1327"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 622.8771232155673,
            "unit": "iter/sec",
            "range": "stddev: 0.00010709664458963767",
            "extra": "mean: 1.60545308653745 msec\nrounds: 624"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 361.43550557401124,
            "unit": "iter/sec",
            "range": "stddev: 0.00011436468241697562",
            "extra": "mean: 2.7667453379043576 msec\nrounds: 364"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10070.143000006201,
            "unit": "iter/sec",
            "range": "stddev: 0.000014502644643708691",
            "extra": "mean: 99.30345577013 usec\nrounds: 8908"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4042.219549394667,
            "unit": "iter/sec",
            "range": "stddev: 0.000017181731294676925",
            "extra": "mean: 247.38883867645254 usec\nrounds: 3868"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1274.3105612830498,
            "unit": "iter/sec",
            "range": "stddev: 0.000021553614047881168",
            "extra": "mean: 784.7380618058615 usec\nrounds: 1262"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 609.3340462230426,
            "unit": "iter/sec",
            "range": "stddev: 0.00002539057635042914",
            "extra": "mean: 1.641135935532407 msec\nrounds: 605"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 350.19291446917066,
            "unit": "iter/sec",
            "range": "stddev: 0.00016540087565990896",
            "extra": "mean: 2.8555689126829416 msec\nrounds: 355"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3949.602763847627,
            "unit": "iter/sec",
            "range": "stddev: 0.000016174367166574144",
            "extra": "mean: 253.19001929850262 usec\nrounds: 3524"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1107.6086844185909,
            "unit": "iter/sec",
            "range": "stddev: 0.00002223240797828495",
            "extra": "mean: 902.8459365366234 usec\nrounds: 1103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 288.6923297792993,
            "unit": "iter/sec",
            "range": "stddev: 0.000055946153687019656",
            "extra": "mean: 3.463895285214138 msec\nrounds: 291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 130.08403809185867,
            "unit": "iter/sec",
            "range": "stddev: 0.00004242434608894032",
            "extra": "mean: 7.687338236639389 msec\nrounds: 131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.52984180899277,
            "unit": "iter/sec",
            "range": "stddev: 0.0000732227442619612",
            "extra": "mean: 13.599920459473896 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1037.8691257324729,
            "unit": "iter/sec",
            "range": "stddev: 0.000019962187553796617",
            "extra": "mean: 963.5126194685223 usec\nrounds: 1017"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 312.76689264575987,
            "unit": "iter/sec",
            "range": "stddev: 0.000032899953759869366",
            "extra": "mean: 3.1972693514354833 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.39385623739275,
            "unit": "iter/sec",
            "range": "stddev: 0.000087255590806805",
            "extra": "mean: 11.574897146067926 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.78377993012674,
            "unit": "iter/sec",
            "range": "stddev: 0.00012644897939708257",
            "extra": "mean: 25.135872000004156 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.804828162047485,
            "unit": "iter/sec",
            "range": "stddev: 0.0000915994982991532",
            "extra": "mean: 43.85036330439146 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}