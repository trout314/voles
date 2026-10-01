window.BENCHMARK_DATA = {
  "lastUpdate": 1790873871095,
  "repoUrl": "https://github.com/trout314/voles",
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
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5f1dcd5fe4d269f0c75429eaa049c4a340cb7bd7",
          "message": "Merge pull request #7 from william-pfalzgraff/fixes\n\nPre-release fixes: GC race, quadrature accuracy, first-kind warnings, validation",
          "timestamp": "2026-10-01T12:49:17-04:00",
          "tree_id": "e3f4992b61120b9cd9be6e3b5eed8f71c83763a8",
          "url": "https://github.com/trout314/voles/commit/5f1dcd5fe4d269f0c75429eaa049c4a340cb7bd7"
        },
        "date": 1790873869739,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 9354.420628771935,
            "unit": "iter/sec",
            "range": "stddev: 0.00001853375989882623",
            "extra": "mean: 106.90132929496903 usec\nrounds: 5943"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4408.901187864514,
            "unit": "iter/sec",
            "range": "stddev: 0.00022292585861938708",
            "extra": "mean: 226.8138834121519 usec\nrounds: 4443"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2070.311369376619,
            "unit": "iter/sec",
            "range": "stddev: 0.000023830710326304284",
            "extra": "mean: 483.01913170727784 usec\nrounds: 2050"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 937.205317473219,
            "unit": "iter/sec",
            "range": "stddev: 0.000029683184436189208",
            "extra": "mean: 1.0670020553191912 msec\nrounds: 940"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 419.05731766524065,
            "unit": "iter/sec",
            "range": "stddev: 0.00012044765364293532",
            "extra": "mean: 2.386308406619543 msec\nrounds: 423"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 14904.680526240189,
            "unit": "iter/sec",
            "range": "stddev: 0.000012237663880657182",
            "extra": "mean: 67.09301807841278 usec\nrounds: 9846"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7549.736182406374,
            "unit": "iter/sec",
            "range": "stddev: 0.000022890044132654433",
            "extra": "mean: 132.45495946339992 usec\nrounds: 6932"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3979.040145520107,
            "unit": "iter/sec",
            "range": "stddev: 0.000028034434292763447",
            "extra": "mean: 251.31689136785232 usec\nrounds: 3765"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1910.9239929476485,
            "unit": "iter/sec",
            "range": "stddev: 0.000023069536021184445",
            "extra": "mean: 523.307051295889 usec\nrounds: 1852"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 896.9571577383165,
            "unit": "iter/sec",
            "range": "stddev: 0.00003987749229631623",
            "extra": "mean: 1.114880450390191 msec\nrounds: 897"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 13716.376244331866,
            "unit": "iter/sec",
            "range": "stddev: 0.000010916985263073966",
            "extra": "mean: 72.9055533463686 usec\nrounds: 9757"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 7115.360046978891,
            "unit": "iter/sec",
            "range": "stddev: 0.000013769664546324507",
            "extra": "mean: 140.5410258086082 usec\nrounds: 5967"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3695.8134055604137,
            "unit": "iter/sec",
            "range": "stddev: 0.000019303208310674555",
            "extra": "mean: 270.57643075147763 usec\nrounds: 3473"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1767.078861552334,
            "unit": "iter/sec",
            "range": "stddev: 0.000023045930891735102",
            "extra": "mean: 565.9056999422908 usec\nrounds: 1733"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 836.9822163827452,
            "unit": "iter/sec",
            "range": "stddev: 0.00002952001342570032",
            "extra": "mean: 1.1947685152998617 msec\nrounds: 817"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2473.263582457193,
            "unit": "iter/sec",
            "range": "stddev: 0.00004177696565049544",
            "extra": "mean: 404.32407087258275 usec\nrounds: 2441"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 1278.7528895547136,
            "unit": "iter/sec",
            "range": "stddev: 0.000022457848653473245",
            "extra": "mean: 782.0119181495803 usec\nrounds: 1124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 622.5140579634349,
            "unit": "iter/sec",
            "range": "stddev: 0.00002946821722892088",
            "extra": "mean: 1.6063894256003095 msec\nrounds: 625"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 300.2500024686275,
            "unit": "iter/sec",
            "range": "stddev: 0.000039662754271643334",
            "extra": "mean: 3.330557841059428 msec\nrounds: 302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 144.01961727559487,
            "unit": "iter/sec",
            "range": "stddev: 0.00005090332508520762",
            "extra": "mean: 6.943498524137912 msec\nrounds: 145"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 6226.516448565414,
            "unit": "iter/sec",
            "range": "stddev: 0.00001539689737919793",
            "extra": "mean: 160.60344628663103 usec\nrounds: 4403"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2822.0178344089245,
            "unit": "iter/sec",
            "range": "stddev: 0.000026843147497380327",
            "extra": "mean: 354.3563714612212 usec\nrounds: 2614"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1406.5034478003988,
            "unit": "iter/sec",
            "range": "stddev: 0.000028740798051375458",
            "extra": "mean: 710.9829709723634 usec\nrounds: 1378"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 656.0341450106699,
            "unit": "iter/sec",
            "range": "stddev: 0.00003467002678576702",
            "extra": "mean: 1.5243109030304143 msec\nrounds: 660"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 309.2327373160815,
            "unit": "iter/sec",
            "range": "stddev: 0.000047274039071455417",
            "extra": "mean: 3.233810264331271 msec\nrounds: 314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 6073.163830410134,
            "unit": "iter/sec",
            "range": "stddev: 0.00001492493115691702",
            "extra": "mean: 164.65882164954994 usec\nrounds: 4850"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2755.395026755081,
            "unit": "iter/sec",
            "range": "stddev: 0.00002301552821645385",
            "extra": "mean: 362.92436848071844 usec\nrounds: 2646"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1218.6933112979884,
            "unit": "iter/sec",
            "range": "stddev: 0.00011178585174640815",
            "extra": "mean: 820.5509874629035 usec\nrounds: 1356"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 637.5174836855924,
            "unit": "iter/sec",
            "range": "stddev: 0.00003924557826632556",
            "extra": "mean: 1.5685844319419084 msec\nrounds: 551"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 300.04741355188185,
            "unit": "iter/sec",
            "range": "stddev: 0.00013644047115900264",
            "extra": "mean: 3.3328065993379665 msec\nrounds: 302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3692.0097593733194,
            "unit": "iter/sec",
            "range": "stddev: 0.000021992744520982455",
            "extra": "mean: 270.85518868447946 usec\nrounds: 3588"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1683.577143636069,
            "unit": "iter/sec",
            "range": "stddev: 0.000025663225232946766",
            "extra": "mean: 593.9733761413937 usec\nrounds: 1643"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 762.4092707192094,
            "unit": "iter/sec",
            "range": "stddev: 0.000036985473356179644",
            "extra": "mean: 1.3116314798437094 msec\nrounds: 769"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 343.0033600648445,
            "unit": "iter/sec",
            "range": "stddev: 0.00004157812512037022",
            "extra": "mean: 2.91542333524357 msec\nrounds: 349"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 152.32097340318128,
            "unit": "iter/sec",
            "range": "stddev: 0.0005327216128040087",
            "extra": "mean: 6.565084096154513 msec\nrounds: 156"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1790.713595617116,
            "unit": "iter/sec",
            "range": "stddev: 0.000023874218304279227",
            "extra": "mean: 558.43659334891 usec\nrounds: 1714"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 845.985846549019,
            "unit": "iter/sec",
            "range": "stddev: 0.000027156667216342518",
            "extra": "mean: 1.182052872491002 msec\nrounds: 847"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 397.19502107421727,
            "unit": "iter/sec",
            "range": "stddev: 0.00004049543533947887",
            "extra": "mean: 2.5176549225000144 msec\nrounds: 400"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 186.05599054329383,
            "unit": "iter/sec",
            "range": "stddev: 0.000052503459883828646",
            "extra": "mean: 5.374726162161963 msec\nrounds: 185"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 82.19568552466073,
            "unit": "iter/sec",
            "range": "stddev: 0.0006297783680432559",
            "extra": "mean: 12.166088689654826 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 845.533624947458,
            "unit": "iter/sec",
            "range": "stddev: 0.000025988174804713628",
            "extra": "mean: 1.1826850766131751 msec\nrounds: 496"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 502.05817548698565,
            "unit": "iter/sec",
            "range": "stddev: 0.00002605035377396797",
            "extra": "mean: 1.9918010478168622 msec\nrounds: 481"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 274.9144033100825,
            "unit": "iter/sec",
            "range": "stddev: 0.000045684342391685376",
            "extra": "mean: 3.6374958458326985 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 816.4369362040541,
            "unit": "iter/sec",
            "range": "stddev: 0.00002232081076405039",
            "extra": "mean: 1.2248343450131065 msec\nrounds: 742"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 472.3843996597574,
            "unit": "iter/sec",
            "range": "stddev: 0.000036334072538507164",
            "extra": "mean: 2.116920035293855 msec\nrounds: 425"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 257.24927187626577,
            "unit": "iter/sec",
            "range": "stddev: 0.00002971846509068991",
            "extra": "mean: 3.8872801959998924 msec\nrounds: 250"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 660.7163511905152,
            "unit": "iter/sec",
            "range": "stddev: 0.000029300690808101268",
            "extra": "mean: 1.5135087820940785 msec\nrounds: 592"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 402.2097627125932,
            "unit": "iter/sec",
            "range": "stddev: 0.000034090083540986554",
            "extra": "mean: 2.4862648615383547 msec\nrounds: 390"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 226.2039392343654,
            "unit": "iter/sec",
            "range": "stddev: 0.00005532722717401977",
            "extra": "mean: 4.420789502537884 msec\nrounds: 197"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 7.989369664299436,
            "unit": "iter/sec",
            "range": "stddev: 0.0003296013717766",
            "extra": "mean: 125.16632000000052 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.498793003883495,
            "unit": "iter/sec",
            "range": "stddev: 0.0022106884370666478",
            "extra": "mean: 285.81284999999923 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.4261209168507352,
            "unit": "iter/sec",
            "range": "stddev: 0.0005840394809693689",
            "extra": "mean: 701.2028140000032 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 534.5528499623557,
            "unit": "iter/sec",
            "range": "stddev: 0.000035130957486004766",
            "extra": "mean: 1.8707224179431876 msec\nrounds: 457"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 295.4139077732891,
            "unit": "iter/sec",
            "range": "stddev: 0.00005455400121267148",
            "extra": "mean: 3.385080978541588 msec\nrounds: 233"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 154.47026104295244,
            "unit": "iter/sec",
            "range": "stddev: 0.0001550067891717031",
            "extra": "mean: 6.473738007874132 msec\nrounds: 127"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 413.06195332337984,
            "unit": "iter/sec",
            "range": "stddev: 0.0000739682845707529",
            "extra": "mean: 2.4209443449203745 msec\nrounds: 374"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 175.89356562287688,
            "unit": "iter/sec",
            "range": "stddev: 0.000059763356861227204",
            "extra": "mean: 5.685256288135301 msec\nrounds: 177"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 66.5347199752845,
            "unit": "iter/sec",
            "range": "stddev: 0.00008170693954852421",
            "extra": "mean: 15.029746880598093 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 143.0231621720619,
            "unit": "iter/sec",
            "range": "stddev: 0.00005268622944613338",
            "extra": "mean: 6.9918744965026365 msec\nrounds: 143"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 62.55043711973483,
            "unit": "iter/sec",
            "range": "stddev: 0.00042425747149132454",
            "extra": "mean: 15.987098508772807 msec\nrounds: 57"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 36.66615038475469,
            "unit": "iter/sec",
            "range": "stddev: 0.00095247928771009",
            "extra": "mean: 27.273111289473878 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 185.91733472126666,
            "unit": "iter/sec",
            "range": "stddev: 0.00004931466824382723",
            "extra": "mean: 5.378734594594057 msec\nrounds: 185"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 73.12010091287954,
            "unit": "iter/sec",
            "range": "stddev: 0.0016032314554074768",
            "extra": "mean: 13.676129922078072 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 30.898550800708286,
            "unit": "iter/sec",
            "range": "stddev: 0.0005389008760064206",
            "extra": "mean: 32.3639774062503 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 61.12712940222967,
            "unit": "iter/sec",
            "range": "stddev: 0.0037197290719495103",
            "extra": "mean: 16.359348292307082 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 27.136698579877475,
            "unit": "iter/sec",
            "range": "stddev: 0.000886115484590449",
            "extra": "mean: 36.85046642857007 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 16.353072091922538,
            "unit": "iter/sec",
            "range": "stddev: 0.0017241641374421482",
            "extra": "mean: 61.15058958823655 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 293.3005888151102,
            "unit": "iter/sec",
            "range": "stddev: 0.00012472557308811978",
            "extra": "mean: 3.409471505119878 msec\nrounds: 293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 186.75756687097797,
            "unit": "iter/sec",
            "range": "stddev: 0.00006177049412660929",
            "extra": "mean: 5.354535383783689 msec\nrounds: 185"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 65.78746310978083,
            "unit": "iter/sec",
            "range": "stddev: 0.0003913412712929757",
            "extra": "mean: 15.200464537312838 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 133.96394997798316,
            "unit": "iter/sec",
            "range": "stddev: 0.00012511978454189302",
            "extra": "mean: 7.464694794116991 msec\nrounds: 136"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 82.36175713405719,
            "unit": "iter/sec",
            "range": "stddev: 0.0007228478436362364",
            "extra": "mean: 12.141557378047885 msec\nrounds: 82"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 29.533166337744657,
            "unit": "iter/sec",
            "range": "stddev: 0.003417067610257491",
            "extra": "mean: 33.86023660869566 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 61.96352298074828,
            "unit": "iter/sec",
            "range": "stddev: 0.0001190581478258662",
            "extra": "mean: 16.138527183334855 msec\nrounds: 60"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 39.59023339803384,
            "unit": "iter/sec",
            "range": "stddev: 0.0009199902588956387",
            "extra": "mean: 25.258754853656985 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 13.233015673774645,
            "unit": "iter/sec",
            "range": "stddev: 0.0027848696249308568",
            "extra": "mean: 75.56856461538185 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 25.461026703109795,
            "unit": "iter/sec",
            "range": "stddev: 0.0025059253171126955",
            "extra": "mean: 39.275713884619606 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 17.33858706906062,
            "unit": "iter/sec",
            "range": "stddev: 0.0019204161970616913",
            "extra": "mean: 57.67482644444676 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 5.986381610406059,
            "unit": "iter/sec",
            "range": "stddev: 0.0026536507846304114",
            "extra": "mean: 167.0458158333427 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 12.396136621204796,
            "unit": "iter/sec",
            "range": "stddev: 0.004192646926696864",
            "extra": "mean: 80.67029515384678 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 8.062090593812608,
            "unit": "iter/sec",
            "range": "stddev: 0.004975650062280277",
            "extra": "mean: 124.03730625000264 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1525.9614644370138,
            "unit": "iter/sec",
            "range": "stddev: 0.000012270266056468626",
            "extra": "mean: 655.3245434470645 usec\nrounds: 1404"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 494.5321380247079,
            "unit": "iter/sec",
            "range": "stddev: 0.00003946305255839471",
            "extra": "mean: 2.0221132725453685 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 145.02912620915905,
            "unit": "iter/sec",
            "range": "stddev: 0.00017445812521955557",
            "extra": "mean: 6.895166689191891 msec\nrounds: 148"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 39.09575443368989,
            "unit": "iter/sec",
            "range": "stddev: 0.0004367135277244227",
            "extra": "mean: 25.578224911763627 msec\nrounds: 34"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 10.441525615522739,
            "unit": "iter/sec",
            "range": "stddev: 0.0009815934027683037",
            "extra": "mean: 95.77144536363201 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 126.79920885096018,
            "unit": "iter/sec",
            "range": "stddev: 0.00018597767858786207",
            "extra": "mean: 7.8864845377339865 msec\nrounds: 106"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 118.12946673865129,
            "unit": "iter/sec",
            "range": "stddev: 0.00007968573498648889",
            "extra": "mean: 8.46528836206797 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 73.75304245058732,
            "unit": "iter/sec",
            "range": "stddev: 0.00032515985552563145",
            "extra": "mean: 13.558762686569505 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 105.20075744789105,
            "unit": "iter/sec",
            "range": "stddev: 0.00006790514091644173",
            "extra": "mean: 9.505634980768352 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.5234964650958777,
            "unit": "iter/sec",
            "range": "stddev: 0.0048104690161314585",
            "extra": "mean: 1.9102325740000008 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}