window.BENCHMARK_DATA = {
  "lastUpdate": 1787238277741,
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
          "id": "0a53bed80e8434d62320c2986c45b48ffcde8ca3",
          "message": "ci: add workflow_dispatch trigger to Benchmarks\n\nAllows manual benchmark runs; also triggers the first run of the\nexpanded benchmark suite from ef35a10, whose own push suppressed CI (its\ncommit message quoted the skip-ci token) and whose empty follow-up\ncommit changed no paths, so the path-filtered Benchmarks workflow never\nfired.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01CraQZWqxJ5up98AWhv3Sic",
          "timestamp": "2026-08-20T10:56:16-04:00",
          "tree_id": "19e9015df1ab94b8e761505fdd9a1b0e4fd6ff6f",
          "url": "https://github.com/trout314/voles/commit/0a53bed80e8434d62320c2986c45b48ffcde8ca3"
        },
        "date": 1787238276224,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7926.7222528025195,
            "unit": "iter/sec",
            "range": "stddev: 0.000017532299978802003",
            "extra": "mean: 126.15554930620239 usec\nrounds: 5760"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3700.251961458876,
            "unit": "iter/sec",
            "range": "stddev: 0.00025709240657260045",
            "extra": "mean: 270.2518667419978 usec\nrounds: 3542"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1683.2882298656732,
            "unit": "iter/sec",
            "range": "stddev: 0.000022736618844512243",
            "extra": "mean: 594.0753236775143 usec\nrounds: 1588"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 742.5280740250986,
            "unit": "iter/sec",
            "range": "stddev: 0.000027197621594444713",
            "extra": "mean: 1.3467504259861809 msec\nrounds: 608"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 317.55730341516204,
            "unit": "iter/sec",
            "range": "stddev: 0.00016352312504026205",
            "extra": "mean: 3.1490379507746327 msec\nrounds: 325"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 21208.58067134715,
            "unit": "iter/sec",
            "range": "stddev: 0.000010113783972752172",
            "extra": "mean: 47.150727127676326 usec\nrounds: 15040"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 8454.166143977387,
            "unit": "iter/sec",
            "range": "stddev: 0.000013601833203866578",
            "extra": "mean: 118.28487670689842 usec\nrounds: 7689"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3821.1972873491727,
            "unit": "iter/sec",
            "range": "stddev: 0.000017600860372360884",
            "extra": "mean: 261.69808172707997 usec\nrounds: 3426"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1643.8629043081448,
            "unit": "iter/sec",
            "range": "stddev: 0.00002656282743452248",
            "extra": "mean: 608.3232350941527 usec\nrounds: 1476"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 716.3529388609289,
            "unit": "iter/sec",
            "range": "stddev: 0.00005945957085998927",
            "extra": "mean: 1.3959599322508505 msec\nrounds: 738"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 18087.375039060895,
            "unit": "iter/sec",
            "range": "stddev: 0.000011191391704783667",
            "extra": "mean: 55.28718223846375 usec\nrounds: 14075"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 7473.660819753781,
            "unit": "iter/sec",
            "range": "stddev: 0.000018173560206463765",
            "extra": "mean: 133.80323567225318 usec\nrounds: 6980"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3469.4844101153303,
            "unit": "iter/sec",
            "range": "stddev: 0.000019472105136847002",
            "extra": "mean: 288.2272642829828 usec\nrounds: 2853"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1517.090478612754,
            "unit": "iter/sec",
            "range": "stddev: 0.000025621041163467577",
            "extra": "mean: 659.156466998865 usec\nrounds: 1409"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 677.7290519966355,
            "unit": "iter/sec",
            "range": "stddev: 0.00003837150391099346",
            "extra": "mean: 1.4755159116374494 msec\nrounds: 679"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1907.741494243104,
            "unit": "iter/sec",
            "range": "stddev: 0.000019568063054086112",
            "extra": "mean: 524.1800333104092 usec\nrounds: 1561"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 928.9584769548295,
            "unit": "iter/sec",
            "range": "stddev: 0.000036467219709688805",
            "extra": "mean: 1.0764743794341034 msec\nrounds: 846"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 449.6725488648339,
            "unit": "iter/sec",
            "range": "stddev: 0.0000362567885438332",
            "extra": "mean: 2.223840442393978 msec\nrounds: 434"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 214.4505816922295,
            "unit": "iter/sec",
            "range": "stddev: 0.00010553734423515662",
            "extra": "mean: 4.663078981222622 msec\nrounds: 213"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 102.18400703323955,
            "unit": "iter/sec",
            "range": "stddev: 0.00024265269415379173",
            "extra": "mean: 9.786267235289655 msec\nrounds: 102"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 9450.396328017985,
            "unit": "iter/sec",
            "range": "stddev: 0.000013313938141389215",
            "extra": "mean: 105.81566796677703 usec\nrounds: 6409"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3058.1566801705794,
            "unit": "iter/sec",
            "range": "stddev: 0.000027605864080286964",
            "extra": "mean: 326.99436444316564 usec\nrounds: 2593"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1316.1744987785928,
            "unit": "iter/sec",
            "range": "stddev: 0.000028936208267796034",
            "extra": "mean: 759.777674562148 usec\nrounds: 1309"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 534.5731615592709,
            "unit": "iter/sec",
            "range": "stddev: 0.00018872482988262682",
            "extra": "mean: 1.8706513381314316 msec\nrounds: 556"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 245.01052939971171,
            "unit": "iter/sec",
            "range": "stddev: 0.00025740585281385837",
            "extra": "mean: 4.081457243695 msec\nrounds: 238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9061.598162953778,
            "unit": "iter/sec",
            "range": "stddev: 0.000013574207902729723",
            "extra": "mean: 110.35580942976105 usec\nrounds: 8081"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3012.619213343956,
            "unit": "iter/sec",
            "range": "stddev: 0.000020927254687619398",
            "extra": "mean: 331.9370717582383 usec\nrounds: 2815"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1290.295378297973,
            "unit": "iter/sec",
            "range": "stddev: 0.0000339796859676226",
            "extra": "mean: 775.0163387542307 usec\nrounds: 738"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 541.2307706791986,
            "unit": "iter/sec",
            "range": "stddev: 0.000037435336653317274",
            "extra": "mean: 1.8476407000013786 msec\nrounds: 540"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 238.04575260665592,
            "unit": "iter/sec",
            "range": "stddev: 0.0003130547957367908",
            "extra": "mean: 4.200873105484006 msec\nrounds: 237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3063.4151226399176,
            "unit": "iter/sec",
            "range": "stddev: 0.000021322075893580435",
            "extra": "mean: 326.43306896593356 usec\nrounds: 2842"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1308.1819710245595,
            "unit": "iter/sec",
            "range": "stddev: 0.00010424914143464599",
            "extra": "mean: 764.4196466159876 usec\nrounds: 1330"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 596.0598913967405,
            "unit": "iter/sec",
            "range": "stddev: 0.00005706606997348979",
            "extra": "mean: 1.6776837603629247 msec\nrounds: 555"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 257.08011927396694,
            "unit": "iter/sec",
            "range": "stddev: 0.00015064388054569604",
            "extra": "mean: 3.8898379338867235 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 116.30004848811458,
            "unit": "iter/sec",
            "range": "stddev: 0.00038936593256314956",
            "extra": "mean: 8.598448693701071 msec\nrounds: 111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1371.6896357745613,
            "unit": "iter/sec",
            "range": "stddev: 0.00004250316353080988",
            "extra": "mean: 729.0278893412526 usec\nrounds: 1229"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 631.2340905867794,
            "unit": "iter/sec",
            "range": "stddev: 0.0000474189230523889",
            "extra": "mean: 1.5841983424412727 msec\nrounds: 622"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 293.04590223040987,
            "unit": "iter/sec",
            "range": "stddev: 0.00014436125354270026",
            "extra": "mean: 3.4124346813549415 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 133.4153579164904,
            "unit": "iter/sec",
            "range": "stddev: 0.0002491464304324209",
            "extra": "mean: 7.49538895384096 msec\nrounds: 130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 61.12763746085105,
            "unit": "iter/sec",
            "range": "stddev: 0.0005402319080642749",
            "extra": "mean: 16.35921232258397 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 680.1874486815436,
            "unit": "iter/sec",
            "range": "stddev: 0.000033200944696566465",
            "extra": "mean: 1.470182964914116 msec\nrounds: 399"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 399.11168270130884,
            "unit": "iter/sec",
            "range": "stddev: 0.00003464463521183968",
            "extra": "mean: 2.5055643403663277 msec\nrounds: 379"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 215.50345780265428,
            "unit": "iter/sec",
            "range": "stddev: 0.000060635077509385735",
            "extra": "mean: 4.640296773872383 msec\nrounds: 199"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 647.5155101510301,
            "unit": "iter/sec",
            "range": "stddev: 0.000028307689198119624",
            "extra": "mean: 1.5443645508456694 msec\nrounds: 590"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 372.86805577394136,
            "unit": "iter/sec",
            "range": "stddev: 0.00003943157556298642",
            "extra": "mean: 2.6819138419470017 msec\nrounds: 329"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 200.24530938066033,
            "unit": "iter/sec",
            "range": "stddev: 0.000049600046444179705",
            "extra": "mean: 4.993874778355132 msec\nrounds: 194"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 512.6418553525197,
            "unit": "iter/sec",
            "range": "stddev: 0.000036518934635924175",
            "extra": "mean: 1.9506795817761446 msec\nrounds: 428"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 307.1475899487151,
            "unit": "iter/sec",
            "range": "stddev: 0.000044280948908994433",
            "extra": "mean: 3.2557637849835364 msec\nrounds: 293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 168.28191304364213,
            "unit": "iter/sec",
            "range": "stddev: 0.00005723525251064759",
            "extra": "mean: 5.942409269739289 msec\nrounds: 152"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.429911399143305,
            "unit": "iter/sec",
            "range": "stddev: 0.0002077101801158221",
            "extra": "mean: 155.52313833332695 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.7784487885957665,
            "unit": "iter/sec",
            "range": "stddev: 0.002093618611308144",
            "extra": "mean: 359.91305800003676 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.1054780470013323,
            "unit": "iter/sec",
            "range": "stddev: 0.0020658583207872165",
            "extra": "mean: 904.5860319999596 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 404.48903375855105,
            "unit": "iter/sec",
            "range": "stddev: 0.00003931254153864111",
            "extra": "mean: 2.47225491061625 msec\nrounds: 358"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 219.13954280273188,
            "unit": "iter/sec",
            "range": "stddev: 0.00009405104807626154",
            "extra": "mean: 4.5633023926685565 msec\nrounds: 191"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 109.49834174216596,
            "unit": "iter/sec",
            "range": "stddev: 0.00022560093475705622",
            "extra": "mean: 9.132558393940654 msec\nrounds: 99"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 308.9723508777759,
            "unit": "iter/sec",
            "range": "stddev: 0.00021158151270311967",
            "extra": "mean: 3.2365355578227217 msec\nrounds: 294"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 126.08995921098925,
            "unit": "iter/sec",
            "range": "stddev: 0.000355399107614104",
            "extra": "mean: 7.930845614175168 msec\nrounds: 127"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 46.6469662145527,
            "unit": "iter/sec",
            "range": "stddev: 0.00041148568091121013",
            "extra": "mean: 21.43762137500005 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 111.1063965845342,
            "unit": "iter/sec",
            "range": "stddev: 0.00021657929671795349",
            "extra": "mean: 9.000381892856726 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 46.439676326754324,
            "unit": "iter/sec",
            "range": "stddev: 0.00031409432358109465",
            "extra": "mean: 21.533311148938626 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 27.3356146381137,
            "unit": "iter/sec",
            "range": "stddev: 0.0006646263349840733",
            "extra": "mean: 36.58231260714778 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 140.56967224655682,
            "unit": "iter/sec",
            "range": "stddev: 0.00029238341996516264",
            "extra": "mean: 7.113910020690786 msec\nrounds: 145"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 54.508665108605,
            "unit": "iter/sec",
            "range": "stddev: 0.00044284771751210584",
            "extra": "mean: 18.345707017546005 msec\nrounds: 57"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 22.29528241944015,
            "unit": "iter/sec",
            "range": "stddev: 0.000439848692693965",
            "extra": "mean: 44.85253791304568 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 48.632321148022996,
            "unit": "iter/sec",
            "range": "stddev: 0.0015864718583373043",
            "extra": "mean: 20.56245674468804 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 19.949384202961486,
            "unit": "iter/sec",
            "range": "stddev: 0.0004527389879462773",
            "extra": "mean: 50.126860549988805 msec\nrounds: 20"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 12.25270397030602,
            "unit": "iter/sec",
            "range": "stddev: 0.0009970571458649475",
            "extra": "mean: 81.6146380769064 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 238.3795442671568,
            "unit": "iter/sec",
            "range": "stddev: 0.00012079641380179432",
            "extra": "mean: 4.194990820518054 msec\nrounds: 234"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 131.90808642026397,
            "unit": "iter/sec",
            "range": "stddev: 0.00041459448091506006",
            "extra": "mean: 7.581036365078965 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 48.940005514750524,
            "unit": "iter/sec",
            "range": "stddev: 0.0005190184304893375",
            "extra": "mean: 20.433181187497002 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 106.89403993744646,
            "unit": "iter/sec",
            "range": "stddev: 0.0001308237228996593",
            "extra": "mean: 9.355058528849614 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 60.9551849314121,
            "unit": "iter/sec",
            "range": "stddev: 0.0007054040595669688",
            "extra": "mean: 16.40549530159278 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 22.007679007390774,
            "unit": "iter/sec",
            "range": "stddev: 0.0014568263202302779",
            "extra": "mean: 45.43868527272563 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 47.07387439620316,
            "unit": "iter/sec",
            "range": "stddev: 0.00033521580364029074",
            "extra": "mean: 21.243205765970625 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 28.795845555902208,
            "unit": "iter/sec",
            "range": "stddev: 0.0007004243786494449",
            "extra": "mean: 34.72723167856527 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 9.887775918632643,
            "unit": "iter/sec",
            "range": "stddev: 0.0026193405467664884",
            "extra": "mean: 101.13497800001596 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 20.122707927988916,
            "unit": "iter/sec",
            "range": "stddev: 0.002063677689555426",
            "extra": "mean: 49.69510085713106 msec\nrounds: 21"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 12.682123933279707,
            "unit": "iter/sec",
            "range": "stddev: 0.0015686038726310534",
            "extra": "mean: 78.8511455384738 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 4.41247737548539,
            "unit": "iter/sec",
            "range": "stddev: 0.0027168266186578787",
            "extra": "mean: 226.6300572000091 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 9.124531043080166,
            "unit": "iter/sec",
            "range": "stddev: 0.0021370459339207586",
            "extra": "mean: 109.59467344443713 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 5.7981506680548875,
            "unit": "iter/sec",
            "range": "stddev: 0.004716235165737659",
            "extra": "mean: 172.46878483333225 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 808.1682016652469,
            "unit": "iter/sec",
            "range": "stddev: 0.000024684459465814092",
            "extra": "mean: 1.2373661793912205 msec\nrounds: 786"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 258.6966280862167,
            "unit": "iter/sec",
            "range": "stddev: 0.000048438503686869725",
            "extra": "mean: 3.865531636023978 msec\nrounds: 261"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 74.8586271619644,
            "unit": "iter/sec",
            "range": "stddev: 0.0001919663396750522",
            "extra": "mean: 13.358513746670724 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 20.6229695305519,
            "unit": "iter/sec",
            "range": "stddev: 0.00041782812539335897",
            "extra": "mean: 48.489622142851445 msec\nrounds: 21"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 5.406584493808451,
            "unit": "iter/sec",
            "range": "stddev: 0.0004921380714350002",
            "extra": "mean: 184.95965450002436 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 95.31663927568367,
            "unit": "iter/sec",
            "range": "stddev: 0.00008653636867200506",
            "extra": "mean: 10.491347655551586 msec\nrounds: 90"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 87.09608503939437,
            "unit": "iter/sec",
            "range": "stddev: 0.00018620282528001802",
            "extra": "mean: 11.481572329544903 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 47.623192132609354,
            "unit": "iter/sec",
            "range": "stddev: 0.0007478825265667038",
            "extra": "mean: 20.998172428581558 msec\nrounds: 42"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 74.41304901522979,
            "unit": "iter/sec",
            "range": "stddev: 0.00010326210078420996",
            "extra": "mean: 13.4385032361103 msec\nrounds: 72"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.3930811628863264,
            "unit": "iter/sec",
            "range": "stddev: 0.012858748944019005",
            "extra": "mean: 2.5440038710000104 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}