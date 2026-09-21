window.BENCHMARK_DATA = {
  "lastUpdate": 1790014932277,
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
          "id": "b2b80fe4a7066675a66d91d56cc92fbf6e1449c0",
          "message": "Merge pull request #4 from william-pfalzgraff/fix-continuous-vie1-quadrature\n\nFix the quadrature rule of the continuous (force_continuous) VIE-1 method",
          "timestamp": "2026-09-21T14:12:38-04:00",
          "tree_id": "3b39f6ba8596f28e0c4228359eebbb9321ea9a16",
          "url": "https://github.com/trout314/voles/commit/b2b80fe4a7066675a66d91d56cc92fbf6e1449c0"
        },
        "date": 1790014931197,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7394.835767809814,
            "unit": "iter/sec",
            "range": "stddev: 0.00003760584102495474",
            "extra": "mean: 135.22950764546562 usec\nrounds: 5232"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3516.6551640554453,
            "unit": "iter/sec",
            "range": "stddev: 0.0002835726188738366",
            "extra": "mean: 284.3611196858975 usec\nrounds: 3693"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1652.287657086605,
            "unit": "iter/sec",
            "range": "stddev: 0.00007617615311152499",
            "extra": "mean: 605.2214913735114 usec\nrounds: 1565"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 755.6598889065986,
            "unit": "iter/sec",
            "range": "stddev: 0.00011147029381419684",
            "extra": "mean: 1.3233466731269132 msec\nrounds: 774"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 331.81076882604947,
            "unit": "iter/sec",
            "range": "stddev: 0.00036526821472558223",
            "extra": "mean: 3.0137659592484356 msec\nrounds: 319"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 18769.555438078296,
            "unit": "iter/sec",
            "range": "stddev: 0.000019301321023552342",
            "extra": "mean: 53.27776692948589 usec\nrounds: 7989"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7834.352048252988,
            "unit": "iter/sec",
            "range": "stddev: 0.0000295816013400376",
            "extra": "mean: 127.6429746634878 usec\nrounds: 7578"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3632.1578334564897,
            "unit": "iter/sec",
            "range": "stddev: 0.000048783257456146975",
            "extra": "mean: 275.318432142131 usec\nrounds: 3721"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1639.54962819443,
            "unit": "iter/sec",
            "range": "stddev: 0.00007113717569967343",
            "extra": "mean: 609.9235929206119 usec\nrounds: 1695"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 754.4584108059887,
            "unit": "iter/sec",
            "range": "stddev: 0.00010482975381290764",
            "extra": "mean: 1.3254541081087543 msec\nrounds: 777"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 14407.767558273432,
            "unit": "iter/sec",
            "range": "stddev: 0.000020524580649482647",
            "extra": "mean: 69.40700535009435 usec\nrounds: 11776"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 5951.629938641491,
            "unit": "iter/sec",
            "range": "stddev: 0.00003519793903440357",
            "extra": "mean: 168.02119928650308 usec\nrounds: 5605"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 2797.829417515897,
            "unit": "iter/sec",
            "range": "stddev: 0.000054031152083982836",
            "extra": "mean: 357.41993194419547 usec\nrounds: 2880"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1259.9469217083154,
            "unit": "iter/sec",
            "range": "stddev: 0.0000727539600353241",
            "extra": "mean: 793.6842280975909 usec\nrounds: 1267"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 582.0876555082446,
            "unit": "iter/sec",
            "range": "stddev: 0.00009943524036387264",
            "extra": "mean: 1.7179543158785235 msec\nrounds: 592"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2060.006457198029,
            "unit": "iter/sec",
            "range": "stddev: 0.00004363989897515967",
            "extra": "mean: 485.4353715765415 usec\nrounds: 1935"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 1024.8950062690146,
            "unit": "iter/sec",
            "range": "stddev: 0.000059160991170983494",
            "extra": "mean: 975.7097008798577 usec\nrounds: 1023"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 501.1723783383229,
            "unit": "iter/sec",
            "range": "stddev: 0.00008976576485148346",
            "extra": "mean: 1.9953214566923658 msec\nrounds: 508"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 238.40924368962618,
            "unit": "iter/sec",
            "range": "stddev: 0.0003372447625741504",
            "extra": "mean: 4.194468236734365 msec\nrounds: 245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 115.68085213999674,
            "unit": "iter/sec",
            "range": "stddev: 0.0001862343293538408",
            "extra": "mean: 8.644472974574928 msec\nrounds: 118"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 8103.787455482267,
            "unit": "iter/sec",
            "range": "stddev: 0.00002613356298544436",
            "extra": "mean: 123.39909030110275 usec\nrounds: 6578"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2899.0440041039005,
            "unit": "iter/sec",
            "range": "stddev: 0.00005242736134815474",
            "extra": "mean: 344.9412974016245 usec\nrounds: 2848"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1289.1019607585333,
            "unit": "iter/sec",
            "range": "stddev: 0.00008667406950086405",
            "extra": "mean: 775.7338290072727 usec\nrounds: 1310"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 567.5279816058464,
            "unit": "iter/sec",
            "range": "stddev: 0.00011681196793252724",
            "extra": "mean: 1.762027657509422 msec\nrounds: 546"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 253.71912188139072,
            "unit": "iter/sec",
            "range": "stddev: 0.00032724676242793367",
            "extra": "mean: 3.9413663132078893 msec\nrounds: 265"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 6803.395554388267,
            "unit": "iter/sec",
            "range": "stddev: 0.00002846330676414871",
            "extra": "mean: 146.98542691009473 usec\nrounds: 4385"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2296.338517974099,
            "unit": "iter/sec",
            "range": "stddev: 0.00006753336722633242",
            "extra": "mean: 435.47586393413417 usec\nrounds: 2293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1021.5859835265306,
            "unit": "iter/sec",
            "range": "stddev: 0.00010745303311491927",
            "extra": "mean: 978.8701255943083 usec\nrounds: 1051"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 449.7316782020776,
            "unit": "iter/sec",
            "range": "stddev: 0.0001067587955615342",
            "extra": "mean: 2.2235480586952803 msec\nrounds: 460"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 202.40981955683037,
            "unit": "iter/sec",
            "range": "stddev: 0.00036216805601576316",
            "extra": "mean: 4.940471772513147 msec\nrounds: 211"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2941.354606822127,
            "unit": "iter/sec",
            "range": "stddev: 0.00004829050212903282",
            "extra": "mean: 339.97940869850146 usec\nrounds: 2897"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1337.8776702907178,
            "unit": "iter/sec",
            "range": "stddev: 0.00007855203481867404",
            "extra": "mean: 747.4524930090972 usec\nrounds: 1359"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 607.5718177206004,
            "unit": "iter/sec",
            "range": "stddev: 0.00012109765697212732",
            "extra": "mean: 1.6458959596770875 msec\nrounds: 620"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 271.4038738968127,
            "unit": "iter/sec",
            "range": "stddev: 0.00018533916335045745",
            "extra": "mean: 3.6845457864768667 msec\nrounds: 281"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 122.73725263366966,
            "unit": "iter/sec",
            "range": "stddev: 0.00016966598591575664",
            "extra": "mean: 8.147485612902475 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1411.2968787909183,
            "unit": "iter/sec",
            "range": "stddev: 0.0000773242121182219",
            "extra": "mean: 708.5681368874824 usec\nrounds: 1388"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 674.5246443284753,
            "unit": "iter/sec",
            "range": "stddev: 0.0000950233608273563",
            "extra": "mean: 1.4825255213551944 msec\nrounds: 679"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 317.1105903982056,
            "unit": "iter/sec",
            "range": "stddev: 0.0001154457590779182",
            "extra": "mean: 3.15347399386526 msec\nrounds: 326"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 148.3031119140124,
            "unit": "iter/sec",
            "range": "stddev: 0.00017466131375350741",
            "extra": "mean: 6.742946841060287 msec\nrounds: 151"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 65.8615066740415,
            "unit": "iter/sec",
            "range": "stddev: 0.0007988647729851689",
            "extra": "mean: 15.183375699999552 msec\nrounds: 70"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 555.8757762597072,
            "unit": "iter/sec",
            "range": "stddev: 0.00003380053909126143",
            "extra": "mean: 1.7989630825949077 msec\nrounds: 339"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 327.1367142074161,
            "unit": "iter/sec",
            "range": "stddev: 0.000053982817878115574",
            "extra": "mean: 3.0568259585989637 msec\nrounds: 314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 176.1922270254595,
            "unit": "iter/sec",
            "range": "stddev: 0.0005442455059678922",
            "extra": "mean: 5.675619276073409 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 530.7725312527963,
            "unit": "iter/sec",
            "range": "stddev: 0.00004152745445950444",
            "extra": "mean: 1.8840462554451978 msec\nrounds: 505"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 308.72297955810893,
            "unit": "iter/sec",
            "range": "stddev: 0.00006519683629383666",
            "extra": "mean: 3.2391498729098536 msec\nrounds: 299"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 167.36414146343887,
            "unit": "iter/sec",
            "range": "stddev: 0.00019938241062327834",
            "extra": "mean: 5.974995547170136 msec\nrounds: 159"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 427.69716090647137,
            "unit": "iter/sec",
            "range": "stddev: 0.00004391760812700633",
            "extra": "mean: 2.338102964912315 msec\nrounds: 399"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 256.71944953567686,
            "unit": "iter/sec",
            "range": "stddev: 0.0001292979685274184",
            "extra": "mean: 3.8953028366517586 msec\nrounds: 251"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 143.02166901528992,
            "unit": "iter/sec",
            "range": "stddev: 0.00013099355852151456",
            "extra": "mean: 6.991947492188011 msec\nrounds: 128"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.7015880604720595,
            "unit": "iter/sec",
            "range": "stddev: 0.0006156328952230491",
            "extra": "mean: 175.38973166665528 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.487035040737024,
            "unit": "iter/sec",
            "range": "stddev: 0.0006460677169352757",
            "extra": "mean: 402.08520733332875 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.9901076767742378,
            "unit": "iter/sec",
            "range": "stddev: 0.0017558066517476714",
            "extra": "mean: 1.0099911589999901 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 333.36830310320636,
            "unit": "iter/sec",
            "range": "stddev: 0.00007546174754533427",
            "extra": "mean: 2.999685305085569 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 185.21904685612046,
            "unit": "iter/sec",
            "range": "stddev: 0.0000771273306645381",
            "extra": "mean: 5.399012774192751 msec\nrounds: 155"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 93.28736525334891,
            "unit": "iter/sec",
            "range": "stddev: 0.000274495579130949",
            "extra": "mean: 10.719565262500552 msec\nrounds: 80"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 336.7254730250439,
            "unit": "iter/sec",
            "range": "stddev: 0.0003016942653012013",
            "extra": "mean: 2.969778291545009 msec\nrounds: 343"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 142.02449160252038,
            "unit": "iter/sec",
            "range": "stddev: 0.0001726349249109045",
            "extra": "mean: 7.0410391103435135 msec\nrounds: 145"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 53.42759242900136,
            "unit": "iter/sec",
            "range": "stddev: 0.00018554548244936115",
            "extra": "mean: 18.71692049999962 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 114.7633843662831,
            "unit": "iter/sec",
            "range": "stddev: 0.00029706617625176483",
            "extra": "mean: 8.713580603447198 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 50.49760922751377,
            "unit": "iter/sec",
            "range": "stddev: 0.0005268325540764187",
            "extra": "mean: 19.802917708332757 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 29.35672157709475,
            "unit": "iter/sec",
            "range": "stddev: 0.0007957629565730534",
            "extra": "mean: 34.0637491612905 msec\nrounds: 31"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 153.22133525821212,
            "unit": "iter/sec",
            "range": "stddev: 0.00011553177648263587",
            "extra": "mean: 6.526506235667357 msec\nrounds: 157"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 61.247825098237094,
            "unit": "iter/sec",
            "range": "stddev: 0.0010469280290002758",
            "extra": "mean: 16.32711036507945 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 24.974933109187717,
            "unit": "iter/sec",
            "range": "stddev: 0.0005985772353786684",
            "extra": "mean: 40.04014727999902 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 51.970145308776665,
            "unit": "iter/sec",
            "range": "stddev: 0.00041973482534086326",
            "extra": "mean: 19.241816509432024 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 21.81339449198343,
            "unit": "iter/sec",
            "range": "stddev: 0.0016215357939398274",
            "extra": "mean: 45.84339225000065 msec\nrounds: 20"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 13.567833776637913,
            "unit": "iter/sec",
            "range": "stddev: 0.0013993288138110871",
            "extra": "mean: 73.70373314285976 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 232.22864557510184,
            "unit": "iter/sec",
            "range": "stddev: 0.0005394065706043019",
            "extra": "mean: 4.306100987341822 msec\nrounds: 237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 151.02235680088182,
            "unit": "iter/sec",
            "range": "stddev: 0.0001540277569794639",
            "extra": "mean: 6.6215361830067865 msec\nrounds: 153"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 52.821588573312674,
            "unit": "iter/sec",
            "range": "stddev: 0.0002311310267908947",
            "extra": "mean: 18.93165326923233 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 108.59721174702875,
            "unit": "iter/sec",
            "range": "stddev: 0.000282697259522048",
            "extra": "mean: 9.208339550461435 msec\nrounds: 109"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 69.63908754319888,
            "unit": "iter/sec",
            "range": "stddev: 0.0003010219665484514",
            "extra": "mean: 14.359751617648275 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 23.64368785293138,
            "unit": "iter/sec",
            "range": "stddev: 0.0025495830694315827",
            "extra": "mean: 42.294586454541545 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 50.06197474310728,
            "unit": "iter/sec",
            "range": "stddev: 0.00018401874085541444",
            "extra": "mean: 19.975240791668607 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 31.797371332129245,
            "unit": "iter/sec",
            "range": "stddev: 0.001540334024563487",
            "extra": "mean: 31.449140545450145 msec\nrounds: 33"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 10.943515907182867,
            "unit": "iter/sec",
            "range": "stddev: 0.0037252444508271113",
            "extra": "mean: 91.37831099999971 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 21.731509675352566,
            "unit": "iter/sec",
            "range": "stddev: 0.002433773731191003",
            "extra": "mean: 46.01613118181935 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 14.302594353515222,
            "unit": "iter/sec",
            "range": "stddev: 0.0021660493782359506",
            "extra": "mean: 69.9173852857139 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 4.911149564408059,
            "unit": "iter/sec",
            "range": "stddev: 0.0049590058400157296",
            "extra": "mean: 203.6183152000035 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 9.63677772449789,
            "unit": "iter/sec",
            "range": "stddev: 0.0035189625960121286",
            "extra": "mean: 103.76912579999384 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 6.733220906563264,
            "unit": "iter/sec",
            "range": "stddev: 0.004184977806666498",
            "extra": "mean: 148.51733128572116 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1098.7688712935778,
            "unit": "iter/sec",
            "range": "stddev: 0.00004115454530493685",
            "extra": "mean: 910.1095108589149 usec\nrounds: 1059"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 354.8039592296,
            "unit": "iter/sec",
            "range": "stddev: 0.00004944790870619493",
            "extra": "mean: 2.8184578384394015 msec\nrounds: 359"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 102.47206596560754,
            "unit": "iter/sec",
            "range": "stddev: 0.0003145729721255603",
            "extra": "mean: 9.75875708737665 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 28.053837209659296,
            "unit": "iter/sec",
            "range": "stddev: 0.0009097756870714819",
            "extra": "mean: 35.64574758620496 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.429763835084111,
            "unit": "iter/sec",
            "range": "stddev: 0.00104495069050052",
            "extra": "mean: 134.59378012500167 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 82.92212825779063,
            "unit": "iter/sec",
            "range": "stddev: 0.00014566219476784212",
            "extra": "mean: 12.059507166665718 msec\nrounds: 72"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 77.04323196214098,
            "unit": "iter/sec",
            "range": "stddev: 0.00016372011846617408",
            "extra": "mean: 12.979725467532305 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 43.84044617415797,
            "unit": "iter/sec",
            "range": "stddev: 0.0005406821476170968",
            "extra": "mean: 22.809986833333287 msec\nrounds: 42"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 65.10304751538064,
            "unit": "iter/sec",
            "range": "stddev: 0.0010891939311054141",
            "extra": "mean: 15.360264045454237 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.3515503065188146,
            "unit": "iter/sec",
            "range": "stddev: 0.008896722587591345",
            "extra": "mean: 2.8445431036666755 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}