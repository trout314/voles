window.BENCHMARK_DATA = {
  "lastUpdate": 1793298395173,
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
          "id": "1483a2ec62e94457aef414472c6cb793ba9e93ec",
          "message": "Linux segfault hunt v3: test the TLS-range hypothesis per process\n\nAll seven hunt-v2 cores crash in druntime's TLS scan (scanTLSRanges ->\ncollectRoots), each at a process's first large threaded solve. Hypothesis:\nLDC's static-druntime Linux x86_64 getTLSRange returns [fs - memsz, fs),\ncorrect only for an executable's TLS; for this dlopen'ed library the main\nthread's range can reach unmapped memory below ld.so's startup TLS block.\n\nNew mode `first` runs one d49 solve per fresh process after recording\nwhether that range is fully mapped (TLSCHECK), and tallies prediction\nagainst outcome (TLSTABLE). gdb now also dumps the faulting frame's\nregisters. Modes are a workflow input (default [\"first\"]).\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-10-29T14:18:21-04:00",
          "tree_id": "a851f99affeb389549961ac8b4a260871be8162d",
          "url": "https://github.com/trout314/voles/commit/1483a2ec62e94457aef414472c6cb793ba9e93ec"
        },
        "date": 1793298394538,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 10813.689042165171,
            "unit": "iter/sec",
            "range": "stddev: 0.00001905109732568024",
            "extra": "mean: 92.47537968779756 usec\nrounds: 4933"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5805.20948332322,
            "unit": "iter/sec",
            "range": "stddev: 0.00022146566265808689",
            "extra": "mean: 172.25907228201265 usec\nrounds: 5188"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3054.1304637521866,
            "unit": "iter/sec",
            "range": "stddev: 0.000019861581112954853",
            "extra": "mean: 327.42543642730925 usec\nrounds: 2855"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1504.5663620126431,
            "unit": "iter/sec",
            "range": "stddev: 0.00002400805118066306",
            "extra": "mean: 664.6433319579937 usec\nrounds: 1455"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 727.9148012871477,
            "unit": "iter/sec",
            "range": "stddev: 0.000030443622012578932",
            "extra": "mean: 1.373787149583623 msec\nrounds: 722"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 14148.985411050939,
            "unit": "iter/sec",
            "range": "stddev: 0.000010092992595803283",
            "extra": "mean: 70.6764457626028 usec\nrounds: 8850"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 8661.895195481533,
            "unit": "iter/sec",
            "range": "stddev: 0.000014863636036983338",
            "extra": "mean: 115.44817588206895 usec\nrounds: 6601"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 5021.128180811607,
            "unit": "iter/sec",
            "range": "stddev: 0.000018563663175115875",
            "extra": "mean: 199.15842894063732 usec\nrounds: 4644"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2766.4314025939843,
            "unit": "iter/sec",
            "range": "stddev: 0.00004745544948763577",
            "extra": "mean: 361.47652136334756 usec\nrounds: 2434"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1488.9930600648734,
            "unit": "iter/sec",
            "range": "stddev: 0.000028651564188315096",
            "extra": "mean: 671.5948024340902 usec\nrounds: 1397"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 12779.34736859685,
            "unit": "iter/sec",
            "range": "stddev: 0.000011305298335613115",
            "extra": "mean: 78.25125737307494 usec\nrounds: 9426"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 7721.268909341493,
            "unit": "iter/sec",
            "range": "stddev: 0.00001506978321667757",
            "extra": "mean: 129.51239125866488 usec\nrounds: 6681"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 4482.561146551379,
            "unit": "iter/sec",
            "range": "stddev: 0.000017450847563126617",
            "extra": "mean: 223.08675047731174 usec\nrounds: 4192"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2536.485493761972,
            "unit": "iter/sec",
            "range": "stddev: 0.000023815665269022283",
            "extra": "mean: 394.2462917526315 usec\nrounds: 2413"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1323.152191039828,
            "unit": "iter/sec",
            "range": "stddev: 0.00002623239086954072",
            "extra": "mean: 755.7709587542822 usec\nrounds: 1285"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 8840.644238201812,
            "unit": "iter/sec",
            "range": "stddev: 0.000013972488767793992",
            "extra": "mean: 113.11392847128073 usec\nrounds: 7116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4808.555607868047,
            "unit": "iter/sec",
            "range": "stddev: 0.00001985169213650712",
            "extra": "mean: 207.96265688676658 usec\nrounds: 4567"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 2453.7232698705966,
            "unit": "iter/sec",
            "range": "stddev: 0.00004269855647908872",
            "extra": "mean: 407.5439200007006 usec\nrounds: 2400"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1229.5289316272438,
            "unit": "iter/sec",
            "range": "stddev: 0.00002766032627115696",
            "extra": "mean: 813.3196171939857 usec\nrounds: 1233"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 597.8324202562815,
            "unit": "iter/sec",
            "range": "stddev: 0.00003709655142462032",
            "extra": "mean: 1.6727095522375912 msec\nrounds: 603"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 5935.281966953776,
            "unit": "iter/sec",
            "range": "stddev: 0.0000151375519817611",
            "extra": "mean: 168.48399209469068 usec\nrounds: 4301"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2737.1628657523133,
            "unit": "iter/sec",
            "range": "stddev: 0.00006108876338827452",
            "extra": "mean: 365.3417969796797 usec\nrounds: 2980"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1816.0388318554517,
            "unit": "iter/sec",
            "range": "stddev: 0.00004522955120048135",
            "extra": "mean: 550.6490183242929 usec\nrounds: 1528"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 1046.674013549062,
            "unit": "iter/sec",
            "range": "stddev: 0.00003341165882951769",
            "extra": "mean: 955.4073064345987 usec\nrounds: 979"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 540.908654557159,
            "unit": "iter/sec",
            "range": "stddev: 0.00004176703746159472",
            "extra": "mean: 1.848740987179616 msec\nrounds: 546"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 5730.3955024729585,
            "unit": "iter/sec",
            "range": "stddev: 0.000015941591118092787",
            "extra": "mean: 174.5080247198381 usec\nrounds: 4733"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2647.3034722496595,
            "unit": "iter/sec",
            "range": "stddev: 0.000058119582642181",
            "extra": "mean: 377.7428657056107 usec\nrounds: 2703"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1781.2805837483588,
            "unit": "iter/sec",
            "range": "stddev: 0.00002782198372377694",
            "extra": "mean: 561.3938697381939 usec\nrounds: 1520"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 975.2726500210273,
            "unit": "iter/sec",
            "range": "stddev: 0.00007058908749445103",
            "extra": "mean: 1.0253542944923553 msec\nrounds: 944"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 500.6447555416987,
            "unit": "iter/sec",
            "range": "stddev: 0.00018456037049629178",
            "extra": "mean: 1.9974242992278983 msec\nrounds: 518"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4728.117301138281,
            "unit": "iter/sec",
            "range": "stddev: 0.000017194090665808078",
            "extra": "mean: 211.50067485831048 usec\nrounds: 4069"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 2372.020993775662,
            "unit": "iter/sec",
            "range": "stddev: 0.000033417364948169946",
            "extra": "mean: 421.5814289266686 usec\nrounds: 2413"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1176.743483433074,
            "unit": "iter/sec",
            "range": "stddev: 0.00004258366404849319",
            "extra": "mean: 849.8028789439852 usec\nrounds: 1173"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 573.1826937748955,
            "unit": "iter/sec",
            "range": "stddev: 0.00004216417173284464",
            "extra": "mean: 1.7446444403513819 msec\nrounds: 570"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 274.58584626713395,
            "unit": "iter/sec",
            "range": "stddev: 0.0002115603822080172",
            "extra": "mean: 3.6418483093521825 msec\nrounds: 278"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 3444.657875161926,
            "unit": "iter/sec",
            "range": "stddev: 0.000038324631145632076",
            "extra": "mean: 290.30459228203966 usec\nrounds: 3343"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1771.0033406547966,
            "unit": "iter/sec",
            "range": "stddev: 0.00007200997084255387",
            "extra": "mean: 564.6516734577519 usec\nrounds: 1718"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 878.9751691846589,
            "unit": "iter/sec",
            "range": "stddev: 0.00010949097107336793",
            "extra": "mean: 1.1376885662510856 msec\nrounds: 883"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 430.54430264997836,
            "unit": "iter/sec",
            "range": "stddev: 0.00012692993312838464",
            "extra": "mean: 2.322641349206227 msec\nrounds: 441"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 203.50989544309695,
            "unit": "iter/sec",
            "range": "stddev: 0.0003423536261639128",
            "extra": "mean: 4.913765975962621 msec\nrounds: 208"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1550.3255767048263,
            "unit": "iter/sec",
            "range": "stddev: 0.000050253027213950685",
            "extra": "mean: 645.025802983572 usec\nrounds: 670"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 1260.6804512417286,
            "unit": "iter/sec",
            "range": "stddev: 0.00004777746874752881",
            "extra": "mean: 793.2224212845 usec\nrounds: 1137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 899.7947146665841,
            "unit": "iter/sec",
            "range": "stddev: 0.000029193638321084927",
            "extra": "mean: 1.1113646076155788 msec\nrounds: 604"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1518.548742127067,
            "unit": "iter/sec",
            "range": "stddev: 0.00002986786879640817",
            "extra": "mean: 658.5234785412791 usec\nrounds: 1235"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 1164.7489815000413,
            "unit": "iter/sec",
            "range": "stddev: 0.000021585089311630585",
            "extra": "mean: 858.5540883771655 usec\nrounds: 1041"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 783.776902623739,
            "unit": "iter/sec",
            "range": "stddev: 0.00004088365864084609",
            "extra": "mean: 1.2758732703814586 msec\nrounds: 736"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 969.3436643602262,
            "unit": "iter/sec",
            "range": "stddev: 0.000029311309822814347",
            "extra": "mean: 1.0316258688914084 msec\nrounds: 839"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 711.4295555337787,
            "unit": "iter/sec",
            "range": "stddev: 0.000027560595929882776",
            "extra": "mean: 1.4056205455924722 msec\nrounds: 669"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 462.27690280835156,
            "unit": "iter/sec",
            "range": "stddev: 0.000039389895639152285",
            "extra": "mean: 2.163205632652114 msec\nrounds: 343"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 7.603673001892475,
            "unit": "iter/sec",
            "range": "stddev: 0.0002529377685642209",
            "extra": "mean: 131.5153873333467 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.248414953383761,
            "unit": "iter/sec",
            "range": "stddev: 0.0010093564864035304",
            "extra": "mean: 307.84244449999676 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.2761746255182553,
            "unit": "iter/sec",
            "range": "stddev: 0.002250187864107418",
            "extra": "mean: 783.5918219999863 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 1090.3603996797603,
            "unit": "iter/sec",
            "range": "stddev: 0.000022051470279395934",
            "extra": "mean: 917.1279517246782 usec\nrounds: 870"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 753.0570950021047,
            "unit": "iter/sec",
            "range": "stddev: 0.00004069303591907083",
            "extra": "mean: 1.3279205609200257 msec\nrounds: 435"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 433.46927514260113,
            "unit": "iter/sec",
            "range": "stddev: 0.00011041658217492487",
            "extra": "mean: 2.306968584269378 msec\nrounds: 267"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 735.8835506271311,
            "unit": "iter/sec",
            "range": "stddev: 0.00006726061890502627",
            "extra": "mean: 1.35891065800803 msec\nrounds: 693"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 339.15101119030305,
            "unit": "iter/sec",
            "range": "stddev: 0.00017872451191867401",
            "extra": "mean: 2.9485390489927923 msec\nrounds: 347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 281.59132678916745,
            "unit": "iter/sec",
            "range": "stddev: 0.000045228066954189285",
            "extra": "mean: 3.551245741132923 msec\nrounds: 282"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 268.5807295668852,
            "unit": "iter/sec",
            "range": "stddev: 0.00008198549684271943",
            "extra": "mean: 3.7232753132088274 msec\nrounds: 265"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 130.6666752493915,
            "unit": "iter/sec",
            "range": "stddev: 0.00006435715565539768",
            "extra": "mean: 7.653060721805248 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 97.42913148107087,
            "unit": "iter/sec",
            "range": "stddev: 0.0005037956815837629",
            "extra": "mean: 10.263870618556076 msec\nrounds: 97"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 362.4290973763447,
            "unit": "iter/sec",
            "range": "stddev: 0.00005559143864046234",
            "extra": "mean: 2.7591603633347477 msec\nrounds: 300"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 162.67407068333057,
            "unit": "iter/sec",
            "range": "stddev: 0.00006730422278232402",
            "extra": "mean: 6.147261181818274 msec\nrounds: 165"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 134.0473937965365,
            "unit": "iter/sec",
            "range": "stddev: 0.00007270055731001235",
            "extra": "mean: 7.460048059702284 msec\nrounds: 134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 130.77568341366344,
            "unit": "iter/sec",
            "range": "stddev: 0.00025394569152503786",
            "extra": "mean: 7.646681507576965 msec\nrounds: 132"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 54.03440055339193,
            "unit": "iter/sec",
            "range": "stddev: 0.0011263673519883394",
            "extra": "mean: 18.50672885714518 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 41.946707356042346,
            "unit": "iter/sec",
            "range": "stddev: 0.0033074911416636705",
            "extra": "mean: 23.839773441858767 msec\nrounds: 43"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 380.436635301812,
            "unit": "iter/sec",
            "range": "stddev: 0.00015477892544050255",
            "extra": "mean: 2.628558627658636 msec\nrounds: 376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 284.32539589988,
            "unit": "iter/sec",
            "range": "stddev: 0.00003915553064290351",
            "extra": "mean: 3.51709701075078 msec\nrounds: 279"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 82.0677402612316,
            "unit": "iter/sec",
            "range": "stddev: 0.00008986512764399457",
            "extra": "mean: 12.185055867468488 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 189.12840911166373,
            "unit": "iter/sec",
            "range": "stddev: 0.000049774350924844835",
            "extra": "mean: 5.287412952379818 msec\nrounds: 189"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 134.0177710244317,
            "unit": "iter/sec",
            "range": "stddev: 0.0006752456906385541",
            "extra": "mean: 7.461697000002321 msec\nrounds: 128"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 35.67458874285177,
            "unit": "iter/sec",
            "range": "stddev: 0.00031370308902874854",
            "extra": "mean: 28.031157057146824 msec\nrounds: 35"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 92.4333477724038,
            "unit": "iter/sec",
            "range": "stddev: 0.0002913198944660611",
            "extra": "mean: 10.818606315788472 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 67.0708818957523,
            "unit": "iter/sec",
            "range": "stddev: 0.0005603717024256598",
            "extra": "mean: 14.909599691178828 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 18.554559051675128,
            "unit": "iter/sec",
            "range": "stddev: 0.0026170382973679154",
            "extra": "mean: 53.895109941172045 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 40.158952696698144,
            "unit": "iter/sec",
            "range": "stddev: 0.0018026446649241513",
            "extra": "mean: 24.901047782608625 msec\nrounds: 46"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 30.048769363011765,
            "unit": "iter/sec",
            "range": "stddev: 0.0015770447471625002",
            "extra": "mean: 33.27923310000642 msec\nrounds: 30"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 8.721556756405127,
            "unit": "iter/sec",
            "range": "stddev: 0.0057234032313087475",
            "extra": "mean: 114.65842944444502 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 19.74371665012686,
            "unit": "iter/sec",
            "range": "stddev: 0.0032865204362121443",
            "extra": "mean: 50.6490250909053 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 14.055479482906174,
            "unit": "iter/sec",
            "range": "stddev: 0.0028156314368063943",
            "extra": "mean: 71.14663012501055 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1505.180689671386,
            "unit": "iter/sec",
            "range": "stddev: 0.000010240016538225549",
            "extra": "mean: 664.3720630101374 usec\nrounds: 1349"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 490.5734762149643,
            "unit": "iter/sec",
            "range": "stddev: 0.00005503238599737514",
            "extra": "mean: 2.0384306296286803 msec\nrounds: 486"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 145.837115983539,
            "unit": "iter/sec",
            "range": "stddev: 0.0000539204749013219",
            "extra": "mean: 6.856964999999537 msec\nrounds: 147"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 39.80304324186483,
            "unit": "iter/sec",
            "range": "stddev: 0.00011987548208055984",
            "extra": "mean: 25.12370709755681 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 10.397133092252247,
            "unit": "iter/sec",
            "range": "stddev: 0.000541104835519158",
            "extra": "mean: 96.1803596363676 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 504.62188285426,
            "unit": "iter/sec",
            "range": "stddev: 0.000030529703613669944",
            "extra": "mean: 1.9816817977527352 msec\nrounds: 267"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 415.0802990339582,
            "unit": "iter/sec",
            "range": "stddev: 0.00002728969033535035",
            "extra": "mean: 2.409172399478754 msec\nrounds: 383"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 172.0672989808645,
            "unit": "iter/sec",
            "range": "stddev: 0.0003756415823567617",
            "extra": "mean: 5.811679534245547 msec\nrounds: 146"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 229.3838696000747,
            "unit": "iter/sec",
            "range": "stddev: 0.00046280685441653797",
            "extra": "mean: 4.359504448780449 msec\nrounds: 205"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.44825712865646267,
            "unit": "iter/sec",
            "range": "stddev: 0.001341513416571132",
            "extra": "mean: 2.230862458333339 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}