window.BENCHMARK_DATA = {
  "lastUpdate": 1793549935329,
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
          "id": "e0d6eb30a9be4e705aacded0a026a90d88f6a614",
          "message": "Docs review: correct convergence claims, migration notes, show signatures\n\n- Gauss-Legendre nodes have rho = (-1)^p for VIE-1: odd p keeps the full\n  order, even p loses one (docs said they always lose one). Mesh-point\n  superconvergence of order 2p is a VIDE property; for VIE-2 it is Radau's\n  left limit (2p - 1). Radau IIA nodes don't suit continuous=True\n  (|rho_{p-1}| = p).\n- solve_vie1 with callable inputs now warns for rho = +1 node sets, as the\n  sampled regime and the contract already did (function_solve_VIE_1 is\n  unchanged).\n- Migration: fast_coll_settings_* are deprecated, not removed; the 0.10\n  functions' changed error handling is stated. Re-measured speed of the\n  dict-form kernel_singularity; benchmarks page describes the callable rows\n  correctly; dt listed as sampled-only; smaller fixes.\n- API pages show each function's signature; blank lines before the\n  solvers' Examples sections.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-11-01T11:10:03-05:00",
          "tree_id": "27b79baf987f859d208f91acafd013421064f30f",
          "url": "https://github.com/trout314/voles/commit/e0d6eb30a9be4e705aacded0a026a90d88f6a614"
        },
        "date": 1793549934745,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 4894.654138844411,
            "unit": "iter/sec",
            "range": "stddev: 0.00001904045995153798",
            "extra": "mean: 204.30452727270574 usec\nrounds: 3575"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3414.6235748955287,
            "unit": "iter/sec",
            "range": "stddev: 0.00030899691901308137",
            "extra": "mean: 292.85804952324656 usec\nrounds: 3251"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2144.6244814421248,
            "unit": "iter/sec",
            "range": "stddev: 0.000020716849529543198",
            "extra": "mean: 466.2820967741463 usec\nrounds: 2108"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1187.5586323660182,
            "unit": "iter/sec",
            "range": "stddev: 0.00002884413127900848",
            "extra": "mean: 842.0636865799729 usec\nrounds: 1155"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 609.7416612193906,
            "unit": "iter/sec",
            "range": "stddev: 0.00004474718360646992",
            "extra": "mean: 1.6400388289036247 msec\nrounds: 602"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 4881.745092210574,
            "unit": "iter/sec",
            "range": "stddev: 0.000018023649454527382",
            "extra": "mean: 204.8447801167708 usec\nrounds: 3943"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 3970.343702997005,
            "unit": "iter/sec",
            "range": "stddev: 0.0000186772453499262",
            "extra": "mean: 251.86736333309187 usec\nrounds: 3300"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 2837.3798943868464,
            "unit": "iter/sec",
            "range": "stddev: 0.0000315339562303977",
            "extra": "mean: 352.43782546647617 usec\nrounds: 2733"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1959.7217961378637,
            "unit": "iter/sec",
            "range": "stddev: 0.000021566047849068362",
            "extra": "mean: 510.27651066123644 usec\nrounds: 1829"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1149.7915865355403,
            "unit": "iter/sec",
            "range": "stddev: 0.00002556333871328282",
            "extra": "mean: 869.7228364778001 usec\nrounds: 1113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 4624.227416775106,
            "unit": "iter/sec",
            "range": "stddev: 0.000018210246286568874",
            "extra": "mean: 216.25234009303784 usec\nrounds: 3649"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 3723.835491856661,
            "unit": "iter/sec",
            "range": "stddev: 0.00002289841045305262",
            "extra": "mean: 268.5403268180925 usec\nrounds: 3479"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 2719.3122726233732,
            "unit": "iter/sec",
            "range": "stddev: 0.00003223323537527042",
            "extra": "mean: 367.7400385632359 usec\nrounds: 2645"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1876.4534298263916,
            "unit": "iter/sec",
            "range": "stddev: 0.000023561222470056496",
            "extra": "mean: 532.9202335133463 usec\nrounds: 1850"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1112.4294090067276,
            "unit": "iter/sec",
            "range": "stddev: 0.00002283923847122154",
            "extra": "mean: 898.933444139063 usec\nrounds: 1092"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 4088.6937139184943,
            "unit": "iter/sec",
            "range": "stddev: 0.000018658738311146496",
            "extra": "mean: 244.57689178229666 usec\nrounds: 3456"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 2850.7956724294213,
            "unit": "iter/sec",
            "range": "stddev: 0.000021197409579047507",
            "extra": "mean: 350.779261267718 usec\nrounds: 2729"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1701.0122008848105,
            "unit": "iter/sec",
            "range": "stddev: 0.00006329253632426935",
            "extra": "mean: 587.8852600115584 usec\nrounds: 1723"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 962.5044321372683,
            "unit": "iter/sec",
            "range": "stddev: 0.000024631775869314784",
            "extra": "mean: 1.0389562547566369 msec\nrounds: 946"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 492.61747605373995,
            "unit": "iter/sec",
            "range": "stddev: 0.00003284006303471615",
            "extra": "mean: 2.0299726432988123 msec\nrounds: 485"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 2746.26354077236,
            "unit": "iter/sec",
            "range": "stddev: 0.00002249650592199571",
            "extra": "mean: 364.13111311187544 usec\nrounds: 2166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 1997.0459884465486,
            "unit": "iter/sec",
            "range": "stddev: 0.000023126664137098698",
            "extra": "mean: 500.73959527485624 usec\nrounds: 1947"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1279.0259043325511,
            "unit": "iter/sec",
            "range": "stddev: 0.000025772539975772497",
            "extra": "mean: 781.844993610072 usec\nrounds: 1252"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 779.8888858853342,
            "unit": "iter/sec",
            "range": "stddev: 0.00012435122979977326",
            "extra": "mean: 1.282233941396401 msec\nrounds: 802"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 442.03037146482626,
            "unit": "iter/sec",
            "range": "stddev: 0.00003849712743628302",
            "extra": "mean: 2.262287988687613 msec\nrounds: 442"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 2666.8577535989366,
            "unit": "iter/sec",
            "range": "stddev: 0.000023119933198496085",
            "extra": "mean: 374.9731303255659 usec\nrounds: 2394"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 1926.2420237578294,
            "unit": "iter/sec",
            "range": "stddev: 0.000024552694788638753",
            "extra": "mean: 519.1455630529437 usec\nrounds: 1808"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1241.3726980713086,
            "unit": "iter/sec",
            "range": "stddev: 0.00002430113722822793",
            "extra": "mean: 805.5598464133104 usec\nrounds: 1185"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 778.5728755976015,
            "unit": "iter/sec",
            "range": "stddev: 0.000025970142294836843",
            "extra": "mean: 1.2844012825805675 msec\nrounds: 775"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 421.52437057388914,
            "unit": "iter/sec",
            "range": "stddev: 0.00017434596155486957",
            "extra": "mean: 2.3723420751178366 msec\nrounds: 426"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2811.3849724771403,
            "unit": "iter/sec",
            "range": "stddev: 0.000023739817504108405",
            "extra": "mean: 355.69657296662916 usec\nrounds: 1672"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1718.9837987838134,
            "unit": "iter/sec",
            "range": "stddev: 0.000019567202293958024",
            "extra": "mean: 581.7390487958661 usec\nrounds: 1578"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 938.2025523786602,
            "unit": "iter/sec",
            "range": "stddev: 0.000025281826165778368",
            "extra": "mean: 1.065867916757061 msec\nrounds: 925"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 477.3375642998346,
            "unit": "iter/sec",
            "range": "stddev: 0.000031163233945886304",
            "extra": "mean: 2.0949534978811357 msec\nrounds: 472"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 231.444673337163,
            "unit": "iter/sec",
            "range": "stddev: 0.00004381481916243425",
            "extra": "mean: 4.320687037559185 msec\nrounds: 213"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2286.698505664879,
            "unit": "iter/sec",
            "range": "stddev: 0.00002962536994361825",
            "extra": "mean: 437.311695233404 usec\nrounds: 2077"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1363.0330064690372,
            "unit": "iter/sec",
            "range": "stddev: 0.000022274592016777612",
            "extra": "mean: 733.6579490400743 usec\nrounds: 1354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 742.0808928509753,
            "unit": "iter/sec",
            "range": "stddev: 0.000022669924578903875",
            "extra": "mean: 1.3475619836513162 msec\nrounds: 734"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 378.2740976284564,
            "unit": "iter/sec",
            "range": "stddev: 0.00003428490253850742",
            "extra": "mean: 2.6435857127658986 msec\nrounds: 376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 157.74844983608645,
            "unit": "iter/sec",
            "range": "stddev: 0.00005794442637950411",
            "extra": "mean: 6.339206509091417 msec\nrounds: 165"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 722.9827133480167,
            "unit": "iter/sec",
            "range": "stddev: 0.0000637875715480666",
            "extra": "mean: 1.3831589352519382 msec\nrounds: 417"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 578.4516323331355,
            "unit": "iter/sec",
            "range": "stddev: 0.00002941341497710579",
            "extra": "mean: 1.7287530090745613 msec\nrounds: 551"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 406.28510304689036,
            "unit": "iter/sec",
            "range": "stddev: 0.000052123945938206",
            "extra": "mean: 2.4613257845306418 msec\nrounds: 362"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 726.4012245249935,
            "unit": "iter/sec",
            "range": "stddev: 0.000057410377671769476",
            "extra": "mean: 1.3766496616989015 msec\nrounds: 671"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 558.3629817518922,
            "unit": "iter/sec",
            "range": "stddev: 0.00006517613230893444",
            "extra": "mean: 1.7909496737452923 msec\nrounds: 518"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 379.5589525800311,
            "unit": "iter/sec",
            "range": "stddev: 0.00003231236699057043",
            "extra": "mean: 2.6346368415302948 msec\nrounds: 366"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 484.46264473215973,
            "unit": "iter/sec",
            "range": "stddev: 0.000047158676334908995",
            "extra": "mean: 2.0641426348833574 msec\nrounds: 430"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 349.35629765177237,
            "unit": "iter/sec",
            "range": "stddev: 0.0000402492333503609",
            "extra": "mean: 2.862407252199499 msec\nrounds: 341"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 223.65122686483278,
            "unit": "iter/sec",
            "range": "stddev: 0.0000647204046855554",
            "extra": "mean: 4.471247549222549 msec\nrounds: 193"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.39241944890102,
            "unit": "iter/sec",
            "range": "stddev: 0.001091456022873701",
            "extra": "mean: 185.44551466666803 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.272410810256058,
            "unit": "iter/sec",
            "range": "stddev: 0.0003116488426428021",
            "extra": "mean: 440.06127566666464 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8639549439064543,
            "unit": "iter/sec",
            "range": "stddev: 0.0032764472882306603",
            "extra": "mean: 1.1574677673333345 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 609.4645611316017,
            "unit": "iter/sec",
            "range": "stddev: 0.000038758624785120596",
            "extra": "mean: 1.6407844914613006 msec\nrounds: 527"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 455.31311669206775,
            "unit": "iter/sec",
            "range": "stddev: 0.00004636456335847136",
            "extra": "mean: 2.196290779552281 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 288.1993528493363,
            "unit": "iter/sec",
            "range": "stddev: 0.00014004925067737472",
            "extra": "mean: 3.4698204215703976 msec\nrounds: 204"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 612.5308262698871,
            "unit": "iter/sec",
            "range": "stddev: 0.00002831904523868813",
            "extra": "mean: 1.6325708962105199 msec\nrounds: 607"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 295.63132068534287,
            "unit": "iter/sec",
            "range": "stddev: 0.00004292392118794087",
            "extra": "mean: 3.382591525423507 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 237.57671289665512,
            "unit": "iter/sec",
            "range": "stddev: 0.0000691702764871164",
            "extra": "mean: 4.20916674790006 msec\nrounds: 238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 224.42956912680148,
            "unit": "iter/sec",
            "range": "stddev: 0.00015257243600250565",
            "extra": "mean: 4.455740853982594 msec\nrounds: 226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 109.84289843150515,
            "unit": "iter/sec",
            "range": "stddev: 0.00010946938569815014",
            "extra": "mean: 9.103911261259835 msec\nrounds: 111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 86.22970930590331,
            "unit": "iter/sec",
            "range": "stddev: 0.00009373368658540616",
            "extra": "mean: 11.596931127906977 msec\nrounds: 86"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 309.2923715296232,
            "unit": "iter/sec",
            "range": "stddev: 0.00006222051527444868",
            "extra": "mean: 3.233186758064683 msec\nrounds: 310"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 141.16557281803415,
            "unit": "iter/sec",
            "range": "stddev: 0.000059454126117113196",
            "extra": "mean: 7.083880156028015 msec\nrounds: 141"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 114.56822250084643,
            "unit": "iter/sec",
            "range": "stddev: 0.00006549404909245725",
            "extra": "mean: 8.728423799999272 msec\nrounds: 115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 112.29382576645187,
            "unit": "iter/sec",
            "range": "stddev: 0.00009593268483527649",
            "extra": "mean: 8.905209108110672 msec\nrounds: 111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 52.93741262643478,
            "unit": "iter/sec",
            "range": "stddev: 0.00012681912313108323",
            "extra": "mean: 18.890231886789284 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 40.66270527813579,
            "unit": "iter/sec",
            "range": "stddev: 0.00022790233235435485",
            "extra": "mean: 24.59255952499788 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 322.63240796757947,
            "unit": "iter/sec",
            "range": "stddev: 0.000037893766701487317",
            "extra": "mean: 3.099502639240406 msec\nrounds: 316"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 239.87373483843982,
            "unit": "iter/sec",
            "range": "stddev: 0.000059625637045830854",
            "extra": "mean: 4.1688599240493 msec\nrounds: 237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 69.54932023103258,
            "unit": "iter/sec",
            "range": "stddev: 0.00011839214595359943",
            "extra": "mean: 14.37828574999939 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 163.34764387089206,
            "unit": "iter/sec",
            "range": "stddev: 0.00004539237333472248",
            "extra": "mean: 6.121912604937158 msec\nrounds: 162"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 121.4641124301925,
            "unit": "iter/sec",
            "range": "stddev: 0.0000634987440405791",
            "extra": "mean: 8.232884429750532 msec\nrounds: 121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 27.69467119016394,
            "unit": "iter/sec",
            "range": "stddev: 0.00029583770736141095",
            "extra": "mean: 36.1080293437519 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 79.29095258671418,
            "unit": "iter/sec",
            "range": "stddev: 0.00014765347377615183",
            "extra": "mean: 12.61177936923358 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 59.092473605660196,
            "unit": "iter/sec",
            "range": "stddev: 0.00017484417929138798",
            "extra": "mean: 16.922628872726943 msec\nrounds: 55"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.43688946665204,
            "unit": "iter/sec",
            "range": "stddev: 0.0011621971346594772",
            "extra": "mean: 69.26699842856821 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 37.30671405312579,
            "unit": "iter/sec",
            "range": "stddev: 0.0002879928135552581",
            "extra": "mean: 26.804826567570984 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 21.860157677055152,
            "unit": "iter/sec",
            "range": "stddev: 0.0002636749186815272",
            "extra": "mean: 45.745324199999686 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.96087839467633,
            "unit": "iter/sec",
            "range": "stddev: 0.0032464826869926466",
            "extra": "mean: 143.66003014286224 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 18.033317950122424,
            "unit": "iter/sec",
            "range": "stddev: 0.00035653438023573795",
            "extra": "mean: 55.45291236842032 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.476293894947469,
            "unit": "iter/sec",
            "range": "stddev: 0.0003265321752268706",
            "extra": "mean: 74.20437753846552 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 926.3763860946802,
            "unit": "iter/sec",
            "range": "stddev: 0.000020021520221675135",
            "extra": "mean: 1.079474838748529 msec\nrounds: 831"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 324.51068563033056,
            "unit": "iter/sec",
            "range": "stddev: 0.00003799190158375552",
            "extra": "mean: 3.0815626242248295 msec\nrounds: 322"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 98.3400884461471,
            "unit": "iter/sec",
            "range": "stddev: 0.00011233170203710608",
            "extra": "mean: 10.168792969386221 msec\nrounds: 98"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.47121978640027,
            "unit": "iter/sec",
            "range": "stddev: 0.00022568619485934522",
            "extra": "mean: 36.40173271428791 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.1844095353107225,
            "unit": "iter/sec",
            "range": "stddev: 0.005778693457620958",
            "extra": "mean: 139.19028349999962 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 219.913477027616,
            "unit": "iter/sec",
            "range": "stddev: 0.00007628942533002448",
            "extra": "mean: 4.54724291351377 msec\nrounds: 185"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 195.8209074851085,
            "unit": "iter/sec",
            "range": "stddev: 0.00007554636388331352",
            "extra": "mean: 5.1067070051038685 msec\nrounds: 196"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 116.87917829471637,
            "unit": "iter/sec",
            "range": "stddev: 0.0005490065713610611",
            "extra": "mean: 8.55584386021651 msec\nrounds: 93"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 109.51022271935281,
            "unit": "iter/sec",
            "range": "stddev: 0.00011941425392391306",
            "extra": "mean: 9.131567584907108 msec\nrounds: 106"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.2919519434208528,
            "unit": "iter/sec",
            "range": "stddev: 0.007765770578352869",
            "extra": "mean: 3.4252212480000046 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}