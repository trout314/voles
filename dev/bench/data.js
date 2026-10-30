window.BENCHMARK_DATA = {
  "lastUpdate": 1793385646610,
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
          "id": "f535be63501dee51330b75dc358105cb1197931a",
          "message": "Fix Linux GC segfault: scan each thread's real TLS block\n\nWith druntime linked statically, LDC's rt.sections_elf_shared on Linux\nx86_64 computes a thread's TLS range as [fs:0 - memsz, fs:0), the layout of\nan executable's TLS. For this dlopen'ed library that range is unrelated\nmemory: the real TLS was never scanned, and for the loading thread (TCB a\nfew KB into ld.so's startup TLS allocation) the range can begin in an\nunmapped page, so the first collection segfaulted in scanTLSRanges.\n\nHunt v3 (run 40929540095, 1921 fresh processes): 36/38 processes whose\ncomputed range reached unmapped memory crashed, 0/1883 others did; the\nfault's pbot equals the computed range start.\n\nfixTlsRange() finds this library's PT_TLS block for the calling thread via\ndl_iterate_phdr (dlpi_tls_data) and overwrites druntime's single range\nentry, for each thread right after thread_attachThis (inside the\nno-collection window) and for the loading thread in volterra_rt_init.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-10-30T14:33:43-04:00",
          "tree_id": "9947b6f2db918fced1acd2d70cb3637722edbed8",
          "url": "https://github.com/trout314/voles/commit/f535be63501dee51330b75dc358105cb1197931a"
        },
        "date": 1793385646025,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7999.479928982669,
            "unit": "iter/sec",
            "range": "stddev: 0.000025794456144233314",
            "extra": "mean: 125.00812663794942 usec\nrounds: 5038"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4499.562988182764,
            "unit": "iter/sec",
            "range": "stddev: 0.00025748799030636576",
            "extra": "mean: 222.24380514870168 usec\nrounds: 4234"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2418.7143563696463,
            "unit": "iter/sec",
            "range": "stddev: 0.00003339064506527776",
            "extra": "mean: 413.4427851583696 usec\nrounds: 2439"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1205.5664310973339,
            "unit": "iter/sec",
            "range": "stddev: 0.00004530924314844753",
            "extra": "mean: 829.4856046130759 usec\nrounds: 1214"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 592.6670479673703,
            "unit": "iter/sec",
            "range": "stddev: 0.000060314368760318226",
            "extra": "mean: 1.6872880033226612 msec\nrounds: 602"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 8417.830398171775,
            "unit": "iter/sec",
            "range": "stddev: 0.000016161000500013686",
            "extra": "mean: 118.79545591904356 usec\nrounds: 6420"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 5536.691530307482,
            "unit": "iter/sec",
            "range": "stddev: 0.00003019307722982505",
            "extra": "mean: 180.61327681451394 usec\nrounds: 5249"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3567.811567239313,
            "unit": "iter/sec",
            "range": "stddev: 0.00002758232400718657",
            "extra": "mean: 280.2838606114437 usec\nrounds: 3501"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2179.047102177744,
            "unit": "iter/sec",
            "range": "stddev: 0.00003474310726641618",
            "extra": "mean: 458.9161927709585 usec\nrounds: 2158"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1182.670158485524,
            "unit": "iter/sec",
            "range": "stddev: 0.00004401571772882044",
            "extra": "mean: 845.5442904558922 usec\nrounds: 1205"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 7678.36465251179,
            "unit": "iter/sec",
            "range": "stddev: 0.000017006423523413733",
            "extra": "mean: 130.23606526330764 usec\nrounds: 6650"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 4959.963744997415,
            "unit": "iter/sec",
            "range": "stddev: 0.00003592443115176363",
            "extra": "mean: 201.61437692132188 usec\nrounds: 4359"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3226.4974760962864,
            "unit": "iter/sec",
            "range": "stddev: 0.000027576157913885803",
            "extra": "mean: 309.93360676974464 usec\nrounds: 3161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1936.3135694281139,
            "unit": "iter/sec",
            "range": "stddev: 0.000033427176946435826",
            "extra": "mean: 516.4452781763792 usec\nrounds: 1952"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1041.3684808913317,
            "unit": "iter/sec",
            "range": "stddev: 0.000047826674599942055",
            "extra": "mean: 960.27488669916 usec\nrounds: 1015"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 6550.84304119321,
            "unit": "iter/sec",
            "range": "stddev: 0.00001978687706836538",
            "extra": "mean: 152.65210808925957 usec\nrounds: 5773"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3745.904070508268,
            "unit": "iter/sec",
            "range": "stddev: 0.000026346388897046173",
            "extra": "mean: 266.95825124649116 usec\nrounds: 3610"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1978.6813815898158,
            "unit": "iter/sec",
            "range": "stddev: 0.00003720240938691526",
            "extra": "mean: 505.3870771233152 usec\nrounds: 1919"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 987.6265916358326,
            "unit": "iter/sec",
            "range": "stddev: 0.00006999771181528293",
            "extra": "mean: 1.0125284277164641 msec\nrounds: 1003"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 484.5654847425833,
            "unit": "iter/sec",
            "range": "stddev: 0.00006649475291606216",
            "extra": "mean: 2.063704559005543 msec\nrounds: 483"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3694.768164897434,
            "unit": "iter/sec",
            "range": "stddev: 0.000024988641075108565",
            "extra": "mean: 270.6529761462746 usec\nrounds: 3228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2005.0283098904001,
            "unit": "iter/sec",
            "range": "stddev: 0.00007311204013502486",
            "extra": "mean: 498.7460750889161 usec\nrounds: 2264"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1409.538210434831,
            "unit": "iter/sec",
            "range": "stddev: 0.000034622017665360604",
            "extra": "mean: 709.4522110837338 usec\nrounds: 1227"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 791.4167273121767,
            "unit": "iter/sec",
            "range": "stddev: 0.00018975647916552284",
            "extra": "mean: 1.263556815884114 msec\nrounds: 831"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 430.96958427761575,
            "unit": "iter/sec",
            "range": "stddev: 0.00013361712896837243",
            "extra": "mean: 2.3203493621856954 msec\nrounds: 439"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 3546.4704254050125,
            "unit": "iter/sec",
            "range": "stddev: 0.00003924428373886646",
            "extra": "mean: 281.97048897871423 usec\nrounds: 3448"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 1918.8536687001574,
            "unit": "iter/sec",
            "range": "stddev: 0.00009230276225972057",
            "extra": "mean: 521.1444813701744 usec\nrounds: 2335"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1342.7930578872285,
            "unit": "iter/sec",
            "range": "stddev: 0.00008864384023617088",
            "extra": "mean: 744.7163910524049 usec\nrounds: 1207"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 792.7960615051794,
            "unit": "iter/sec",
            "range": "stddev: 0.00009234184652216648",
            "extra": "mean: 1.261358435738731 msec\nrounds: 817"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 417.63619106844504,
            "unit": "iter/sec",
            "range": "stddev: 0.0001831300743871764",
            "extra": "mean: 2.3944285035300332 msec\nrounds: 425"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3658.87080891486,
            "unit": "iter/sec",
            "range": "stddev: 0.000027068396771999352",
            "extra": "mean: 273.30836540155894 usec\nrounds: 3295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1882.592649458782,
            "unit": "iter/sec",
            "range": "stddev: 0.00005770346503448703",
            "extra": "mean: 531.1823565695348 usec\nrounds: 1865"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 946.248360849906,
            "unit": "iter/sec",
            "range": "stddev: 0.00008927696858934614",
            "extra": "mean: 1.0568050010695027 msec\nrounds: 934"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 452.723990527711,
            "unit": "iter/sec",
            "range": "stddev: 0.0002513160290064905",
            "extra": "mean: 2.208851355180813 msec\nrounds: 473"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 220.61395026214274,
            "unit": "iter/sec",
            "range": "stddev: 0.00024541370638041",
            "extra": "mean: 4.532804923767324 msec\nrounds: 223"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2753.3536108090702,
            "unit": "iter/sec",
            "range": "stddev: 0.00003269086715926392",
            "extra": "mean: 363.1934510969519 usec\nrounds: 2689"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1418.6127529405649,
            "unit": "iter/sec",
            "range": "stddev: 0.0000647071602520793",
            "extra": "mean: 704.9140069600775 usec\nrounds: 1437"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 715.7563454767577,
            "unit": "iter/sec",
            "range": "stddev: 0.0000827872111277605",
            "extra": "mean: 1.3971234852747418 msec\nrounds: 713"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 347.8605888298403,
            "unit": "iter/sec",
            "range": "stddev: 0.00007310521664270701",
            "extra": "mean: 2.8747148487383276 msec\nrounds: 357"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 161.08804291910837,
            "unit": "iter/sec",
            "range": "stddev: 0.00039310458736507056",
            "extra": "mean: 6.207785394116172 msec\nrounds: 170"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1031.5183529331491,
            "unit": "iter/sec",
            "range": "stddev: 0.0000296996407130066",
            "extra": "mean: 969.4446998024554 usec\nrounds: 503"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 857.746417329778,
            "unit": "iter/sec",
            "range": "stddev: 0.000028130991820699063",
            "extra": "mean: 1.1658457322539066 msec\nrounds: 803"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 628.8815673388241,
            "unit": "iter/sec",
            "range": "stddev: 0.00004625371705794696",
            "extra": "mean: 1.5901245193615725 msec\nrounds: 439"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1028.6761977912358,
            "unit": "iter/sec",
            "range": "stddev: 0.000026709034223256835",
            "extra": "mean: 972.1232027601988 usec\nrounds: 942"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 806.9417568643339,
            "unit": "iter/sec",
            "range": "stddev: 0.00003426324851372085",
            "extra": "mean: 1.2392468124166287 msec\nrounds: 757"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 561.6725888392012,
            "unit": "iter/sec",
            "range": "stddev: 0.00003583828635791113",
            "extra": "mean: 1.7803966578940273 msec\nrounds: 532"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 674.7613105206409,
            "unit": "iter/sec",
            "range": "stddev: 0.000029469670626237392",
            "extra": "mean: 1.4820055394527691 msec\nrounds: 621"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 506.4335596930899,
            "unit": "iter/sec",
            "range": "stddev: 0.000031999734888961076",
            "extra": "mean: 1.974592680244221 msec\nrounds: 491"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 336.34706850246334,
            "unit": "iter/sec",
            "range": "stddev: 0.000047661895961893595",
            "extra": "mean: 2.9731194163586894 msec\nrounds: 269"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.4360651458489375,
            "unit": "iter/sec",
            "range": "stddev: 0.000040062619530341115",
            "extra": "mean: 183.95658866664158 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.2763162975215185,
            "unit": "iter/sec",
            "range": "stddev: 0.0019689187105182654",
            "extra": "mean: 439.30626033333436 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8684987965299066,
            "unit": "iter/sec",
            "range": "stddev: 0.017696405633642387",
            "extra": "mean: 1.1514120733333282 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 752.2507790801149,
            "unit": "iter/sec",
            "range": "stddev: 0.00003719311038566886",
            "extra": "mean: 1.329343920684062 msec\nrounds: 643"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 535.8290252982899,
            "unit": "iter/sec",
            "range": "stddev: 0.000049715093158055015",
            "extra": "mean: 1.8662669485724694 msec\nrounds: 350"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 313.66768640739764,
            "unit": "iter/sec",
            "range": "stddev: 0.00018950384040662937",
            "extra": "mean: 3.1880874037537317 msec\nrounds: 213"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 600.0882133899325,
            "unit": "iter/sec",
            "range": "stddev: 0.00005605048730593065",
            "extra": "mean: 1.6664216654930497 msec\nrounds: 568"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 279.40971186619277,
            "unit": "iter/sec",
            "range": "stddev: 0.00008029646987327624",
            "extra": "mean: 3.578973663159184 msec\nrounds: 285"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 227.8496468297835,
            "unit": "iter/sec",
            "range": "stddev: 0.00008383287438685014",
            "extra": "mean: 4.3888591179035545 msec\nrounds: 229"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 215.798714693657,
            "unit": "iter/sec",
            "range": "stddev: 0.00010735749905300195",
            "extra": "mean: 4.633947896397704 msec\nrounds: 222"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 104.0126451587604,
            "unit": "iter/sec",
            "range": "stddev: 0.00012818946136622508",
            "extra": "mean: 9.614215641508235 msec\nrounds: 106"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 77.43624124664082,
            "unit": "iter/sec",
            "range": "stddev: 0.000606418791045219",
            "extra": "mean: 12.913849948048451 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 293.7994506348005,
            "unit": "iter/sec",
            "range": "stddev: 0.00008697894999266238",
            "extra": "mean: 3.403682334460942 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 131.21056579749717,
            "unit": "iter/sec",
            "range": "stddev: 0.00010248460245088492",
            "extra": "mean: 7.6213374580164714 msec\nrounds: 131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 106.78228166229304,
            "unit": "iter/sec",
            "range": "stddev: 0.00011386114409493989",
            "extra": "mean: 9.364849527776292 msec\nrounds: 108"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 104.93702892734544,
            "unit": "iter/sec",
            "range": "stddev: 0.00019614628916419328",
            "extra": "mean: 9.529524613207444 msec\nrounds: 106"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 44.103467059106315,
            "unit": "iter/sec",
            "range": "stddev: 0.0016848209923359268",
            "extra": "mean: 22.673954377777743 msec\nrounds: 45"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 33.748256132069145,
            "unit": "iter/sec",
            "range": "stddev: 0.004395293060270149",
            "extra": "mean: 29.631160676469857 msec\nrounds: 34"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 303.21837061507125,
            "unit": "iter/sec",
            "range": "stddev: 0.00023882038134979752",
            "extra": "mean: 3.2979532142842265 msec\nrounds: 280"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 229.45393601278374,
            "unit": "iter/sec",
            "range": "stddev: 0.00008397057434880018",
            "extra": "mean: 4.358173223684802 msec\nrounds: 228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 65.3110692555733,
            "unit": "iter/sec",
            "range": "stddev: 0.0006123872271841809",
            "extra": "mean: 15.31134019697075 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 153.1463371403394,
            "unit": "iter/sec",
            "range": "stddev: 0.00023040028739242674",
            "extra": "mean: 6.529702366199105 msec\nrounds: 142"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 109.65563302503348,
            "unit": "iter/sec",
            "range": "stddev: 0.000736365403815513",
            "extra": "mean: 9.119458548670348 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 30.297475196054275,
            "unit": "iter/sec",
            "range": "stddev: 0.0020464203100231735",
            "extra": "mean: 33.00605062068779 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 73.09778561448252,
            "unit": "iter/sec",
            "range": "stddev: 0.0007351337109978359",
            "extra": "mean: 13.680304972218948 msec\nrounds: 72"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 54.696198552438986,
            "unit": "iter/sec",
            "range": "stddev: 0.0004780636601307753",
            "extra": "mean: 18.282806236365186 msec\nrounds: 55"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 13.959235110930994,
            "unit": "iter/sec",
            "range": "stddev: 0.0026002769491279653",
            "extra": "mean: 71.63716292857154 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 32.84689605382202,
            "unit": "iter/sec",
            "range": "stddev: 0.0024197487839367495",
            "extra": "mean: 30.444276937505066 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 23.2923791553128,
            "unit": "iter/sec",
            "range": "stddev: 0.01046338755262528",
            "extra": "mean: 42.932497076920896 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.867637461574468,
            "unit": "iter/sec",
            "range": "stddev: 0.003588019275513788",
            "extra": "mean: 145.6104818571394 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 16.784385236028413,
            "unit": "iter/sec",
            "range": "stddev: 0.0018259396678179686",
            "extra": "mean: 59.57918541177525 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 12.382111617827402,
            "unit": "iter/sec",
            "range": "stddev: 0.0038383962597205923",
            "extra": "mean: 80.76166899999748 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1044.5682118597351,
            "unit": "iter/sec",
            "range": "stddev: 0.000014002866165975845",
            "extra": "mean: 957.3333638208398 usec\nrounds: 984"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 343.40536505032014,
            "unit": "iter/sec",
            "range": "stddev: 0.00003549233368394642",
            "extra": "mean: 2.912010416183996 msec\nrounds: 346"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 100.32183502933634,
            "unit": "iter/sec",
            "range": "stddev: 0.00011504749342808822",
            "extra": "mean: 9.96791974257227 msec\nrounds: 101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.58162454251398,
            "unit": "iter/sec",
            "range": "stddev: 0.00014318991325904142",
            "extra": "mean: 36.25602250000221 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.284165584700566,
            "unit": "iter/sec",
            "range": "stddev: 0.0005347221400442405",
            "extra": "mean: 137.28408400000802 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 360.77213276458764,
            "unit": "iter/sec",
            "range": "stddev: 0.00004871328496420761",
            "extra": "mean: 2.771832714287064 msec\nrounds: 224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 301.6128258406378,
            "unit": "iter/sec",
            "range": "stddev: 0.00012277900181431893",
            "extra": "mean: 3.31550887205429 msec\nrounds: 297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 131.49411054554704,
            "unit": "iter/sec",
            "range": "stddev: 0.0006372910218576221",
            "extra": "mean: 7.6049033363636385 msec\nrounds: 110"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 170.75931045557124,
            "unit": "iter/sec",
            "range": "stddev: 0.0001664823836008317",
            "extra": "mean: 5.856196053568532 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.297820829296877,
            "unit": "iter/sec",
            "range": "stddev: 0.016667596652118394",
            "extra": "mean: 3.357723509000001 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}