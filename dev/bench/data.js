window.BENCHMARK_DATA = {
  "lastUpdate": 1790959894661,
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
          "id": "53a7da5c38e6dabeac45f572cf9ad274395bc1c5",
          "message": "New defaults: product quadrature, adaptive-block reuse, inferred node sets\n\n- The array-input solvers default to quadrature=\"product\": every sample\n  is used, any node set works without Numba, and the first-kind\n  collocation scheme's instability at small K(0) does not arise. The\n  default mesh is the finest (mesh_samples = coll_divs) for solve_VIE_2\n  and solve_VIDE; solve_VIE_1 keeps coll_divs**2 samples (the collocation\n  quadrature's mesh), since inverting a first-kind equation amplifies\n  data error by about the inverse of the mesh width. The collocation\n  quadrature stays available as quadrature=\"collocation\".\n- The callable solvers default to reuse_adaptive_blocks=True.\n- coll_divs given alone selects every admissible sub-interval point\n  ([1, ..., coll_divs] for the first kind, [0, ..., coll_divs] otherwise);\n  coll_choices given alone sets coll_divs to its largest entry. The\n  defaults with neither are unchanged.\n\nBug fixed on the way: the collocation-path matrix branches recursed into\nthe public solver per column without forwarding the quadrature, so a\nmatrix solve asked for the collocation quadrature would have solved its\ncolumns with the new default. They forward it now.\n\nTests that silently assumed the old defaults (fallback and K(0)\nwarnings, array-vs-callable and Numba-vs-D comparisons, polynomial\ncounts, collocation-only validation, first-kind product tests on the\nfinest mesh, bit-identical Jacobi fallbacks) now say what they test.\ntests/test_defaults.py covers the new behaviour. Docstrings, the\ngetting-started and product-integration pages (and their examples), and\nthe CHANGELOG are updated; the benchmark script pins the collocation\nquadrature so the published table keeps measuring the compiled path.\n704 tests and the docs examples pass.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>",
          "timestamp": "2026-10-02T12:43:13-04:00",
          "tree_id": "f7bfe65504703d3b81987d996ba771234f62d82f",
          "url": "https://github.com/trout314/voles/commit/53a7da5c38e6dabeac45f572cf9ad274395bc1c5"
        },
        "date": 1790959893348,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 9590.840233967188,
            "unit": "iter/sec",
            "range": "stddev: 0.000029980798633193378",
            "extra": "mean: 104.26615141167422 usec\nrounds: 5561"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5211.505156725384,
            "unit": "iter/sec",
            "range": "stddev: 0.00025244924441978104",
            "extra": "mean: 191.8831450659724 usec\nrounds: 4915"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2707.009731036357,
            "unit": "iter/sec",
            "range": "stddev: 0.000038789862001430105",
            "extra": "mean: 369.4113059642228 usec\nrounds: 2582"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1315.559377886,
            "unit": "iter/sec",
            "range": "stddev: 0.00005878260288446449",
            "extra": "mean: 760.1329265782902 usec\nrounds: 1362"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 633.4959536609445,
            "unit": "iter/sec",
            "range": "stddev: 0.00007729825649817935",
            "extra": "mean: 1.5785420478553103 msec\nrounds: 606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 11506.365558675625,
            "unit": "iter/sec",
            "range": "stddev: 0.00001666983644420986",
            "extra": "mean: 86.90841559835678 usec\nrounds: 8347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7326.504766298022,
            "unit": "iter/sec",
            "range": "stddev: 0.0000266017617749234",
            "extra": "mean: 136.490732197433 usec\nrounds: 6221"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4355.894380053153,
            "unit": "iter/sec",
            "range": "stddev: 0.00003096692113159576",
            "extra": "mean: 229.57397786761703 usec\nrounds: 4202"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2514.3991464785727,
            "unit": "iter/sec",
            "range": "stddev: 0.0000375465096523831",
            "extra": "mean: 397.7093300403416 usec\nrounds: 2227"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1258.8487337173233,
            "unit": "iter/sec",
            "range": "stddev: 0.00006671489834718482",
            "extra": "mean: 794.3766182669503 usec\nrounds: 1281"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 10577.475827632514,
            "unit": "iter/sec",
            "range": "stddev: 0.000017000462752405642",
            "extra": "mean: 94.54051385185943 usec\nrounds: 8627"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6595.23151876881,
            "unit": "iter/sec",
            "range": "stddev: 0.00002787380011208894",
            "extra": "mean: 151.62469992966658 usec\nrounds: 5692"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3908.482921813163,
            "unit": "iter/sec",
            "range": "stddev: 0.000032894492821861405",
            "extra": "mean: 255.85374683845248 usec\nrounds: 3875"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2257.674040641532,
            "unit": "iter/sec",
            "range": "stddev: 0.00004110741799760526",
            "extra": "mean: 442.9337371110684 usec\nrounds: 2153"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1142.3611584305306,
            "unit": "iter/sec",
            "range": "stddev: 0.00006406174828732964",
            "extra": "mean: 875.3799029493281 usec\nrounds: 1051"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 7760.1712640310525,
            "unit": "iter/sec",
            "range": "stddev: 0.000023392888447589558",
            "extra": "mean: 128.86313535824542 usec\nrounds: 6782"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4287.3431768249875,
            "unit": "iter/sec",
            "range": "stddev: 0.00003259133539779254",
            "extra": "mean: 233.2446829555069 usec\nrounds: 4236"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 2193.268785406338,
            "unit": "iter/sec",
            "range": "stddev: 0.000043207440754701",
            "extra": "mean: 455.9404696104012 usec\nrounds: 2106"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1010.0156246217858,
            "unit": "iter/sec",
            "range": "stddev: 0.00009258738873834926",
            "extra": "mean: 990.0836933829254 usec\nrounds: 1073"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 486.50338588376104,
            "unit": "iter/sec",
            "range": "stddev: 0.00008935424957189382",
            "extra": "mean: 2.0554841528665686 msec\nrounds: 471"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 5276.570816941438,
            "unit": "iter/sec",
            "range": "stddev: 0.00002337097195726245",
            "extra": "mean: 189.51702435022932 usec\nrounds: 3655"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2646.7917657826392,
            "unit": "iter/sec",
            "range": "stddev: 0.00006363862840955205",
            "extra": "mean: 377.8158950499479 usec\nrounds: 2687"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1659.8903699635855,
            "unit": "iter/sec",
            "range": "stddev: 0.00004961437360225053",
            "extra": "mean: 602.4494256340182 usec\nrounds: 1459"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 887.7109968403756,
            "unit": "iter/sec",
            "range": "stddev: 0.00010855152042967831",
            "extra": "mean: 1.12649274770651 msec\nrounds: 872"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 459.7178632001235,
            "unit": "iter/sec",
            "range": "stddev: 0.00011512333625190315",
            "extra": "mean: 2.175247211493894 msec\nrounds: 435"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 5211.039595892191,
            "unit": "iter/sec",
            "range": "stddev: 0.000023415928858916322",
            "extra": "mean: 191.90028814754922 usec\nrounds: 4227"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2639.900075881625,
            "unit": "iter/sec",
            "range": "stddev: 0.00006287120100407551",
            "extra": "mean: 378.8022164687572 usec\nrounds: 2781"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1630.2428990199548,
            "unit": "iter/sec",
            "range": "stddev: 0.00004779548080883441",
            "extra": "mean: 613.4055241713766 usec\nrounds: 1448"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 892.0208424621779,
            "unit": "iter/sec",
            "range": "stddev: 0.00006961933114667051",
            "extra": "mean: 1.1210500387409954 msec\nrounds: 826"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 452.1290038075232,
            "unit": "iter/sec",
            "range": "stddev: 0.00010442923659955458",
            "extra": "mean: 2.211758130044035 msec\nrounds: 446"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4027.196570986685,
            "unit": "iter/sec",
            "range": "stddev: 0.000038842174190544325",
            "extra": "mean: 248.3116933512373 usec\nrounds: 3685"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 2079.173695273742,
            "unit": "iter/sec",
            "range": "stddev: 0.00004514894848925254",
            "extra": "mean: 480.96029796507264 usec\nrounds: 2064"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1013.8542340230576,
            "unit": "iter/sec",
            "range": "stddev: 0.00006647136854743803",
            "extra": "mean: 986.3350829358546 usec\nrounds: 1049"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 487.7940920614743,
            "unit": "iter/sec",
            "range": "stddev: 0.0001288408847115024",
            "extra": "mean: 2.0500453291139387 msec\nrounds: 474"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 232.90356379013195,
            "unit": "iter/sec",
            "range": "stddev: 0.00011536394121676704",
            "extra": "mean: 4.293622578060224 msec\nrounds: 237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 3166.9326942404214,
            "unit": "iter/sec",
            "range": "stddev: 0.00004375010640492289",
            "extra": "mean: 315.7629468471691 usec\nrounds: 3029"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1591.0323495574798,
            "unit": "iter/sec",
            "range": "stddev: 0.000054169415667749714",
            "extra": "mean: 628.5227326007129 usec\nrounds: 1638"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 772.746680250136,
            "unit": "iter/sec",
            "range": "stddev: 0.00011366722083192144",
            "extra": "mean: 1.2940851453108835 msec\nrounds: 757"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 372.30160595196384,
            "unit": "iter/sec",
            "range": "stddev: 0.00013690858766693872",
            "extra": "mean: 2.6859943229173844 msec\nrounds: 384"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 175.74744280214182,
            "unit": "iter/sec",
            "range": "stddev: 0.0003353042321686747",
            "extra": "mean: 5.6899832171430775 msec\nrounds: 175"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1584.468270443797,
            "unit": "iter/sec",
            "range": "stddev: 0.000027905271765553435",
            "extra": "mean: 631.1265543486761 usec\nrounds: 644"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 1301.945454832284,
            "unit": "iter/sec",
            "range": "stddev: 0.00003496388317553453",
            "extra": "mean: 768.0813326613745 usec\nrounds: 992"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 912.9050039790895,
            "unit": "iter/sec",
            "range": "stddev: 0.00004967661200998753",
            "extra": "mean: 1.0954042267719954 msec\nrounds: 635"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1538.7687099063453,
            "unit": "iter/sec",
            "range": "stddev: 0.000046825781236911086",
            "extra": "mean: 649.8702459714451 usec\nrounds: 1179"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 1185.0055351641886,
            "unit": "iter/sec",
            "range": "stddev: 0.000038601706380488253",
            "extra": "mean: 843.8779147655584 usec\nrounds: 833"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 777.4046067057019,
            "unit": "iter/sec",
            "range": "stddev: 0.00008114510413008384",
            "extra": "mean: 1.2863314564568369 msec\nrounds: 666"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 959.5514022512602,
            "unit": "iter/sec",
            "range": "stddev: 0.00004196547342274292",
            "extra": "mean: 1.0421536539406235 msec\nrounds: 812"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 718.7372984079304,
            "unit": "iter/sec",
            "range": "stddev: 0.00005461786799533394",
            "extra": "mean: 1.391328935085312 msec\nrounds: 647"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 459.1061161173686,
            "unit": "iter/sec",
            "range": "stddev: 0.00006949948849132133",
            "extra": "mean: 2.178145672414336 msec\nrounds: 348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 7.517389601495126,
            "unit": "iter/sec",
            "range": "stddev: 0.0014014823760421934",
            "extra": "mean: 133.02490000000944 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.210189078499563,
            "unit": "iter/sec",
            "range": "stddev: 0.0015332609278186137",
            "extra": "mean: 311.5081309999965 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.2611712324960245,
            "unit": "iter/sec",
            "range": "stddev: 0.0014029310025964925",
            "extra": "mean: 792.9137409999972 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 1077.3230790510313,
            "unit": "iter/sec",
            "range": "stddev: 0.00010434609577604644",
            "extra": "mean: 928.2266568361814 usec\nrounds: 746"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 706.6595401780385,
            "unit": "iter/sec",
            "range": "stddev: 0.00005069040270525005",
            "extra": "mean: 1.4151086105029536 msec\nrounds: 457"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 367.5053094744265,
            "unit": "iter/sec",
            "range": "stddev: 0.0001229493256674391",
            "extra": "mean: 2.721049122882364 msec\nrounds: 236"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 599.2629493765927,
            "unit": "iter/sec",
            "range": "stddev: 0.0001304987666193995",
            "extra": "mean: 1.6687165476195218 msec\nrounds: 588"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 274.00702660637154,
            "unit": "iter/sec",
            "range": "stddev: 0.00020334703888872884",
            "extra": "mean: 3.6495414456526456 msec\nrounds: 276"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 231.08772368506476,
            "unit": "iter/sec",
            "range": "stddev: 0.00026964078234947375",
            "extra": "mean: 4.327360986786293 msec\nrounds: 227"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 238.37750055158173,
            "unit": "iter/sec",
            "range": "stddev: 0.00011971060089417364",
            "extra": "mean: 4.1950267860267845 msec\nrounds: 229"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 108.66793014543197,
            "unit": "iter/sec",
            "range": "stddev: 0.0002084786331890613",
            "extra": "mean: 9.202346991073489 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 81.49804759104197,
            "unit": "iter/sec",
            "range": "stddev: 0.0008694636544925644",
            "extra": "mean: 12.270232595239706 msec\nrounds: 84"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 307.22773209557755,
            "unit": "iter/sec",
            "range": "stddev: 0.00018823597735299295",
            "extra": "mean: 3.254914499999965 msec\nrounds: 306"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 136.7683607882188,
            "unit": "iter/sec",
            "range": "stddev: 0.00041437367561289375",
            "extra": "mean: 7.3116325606071 msec\nrounds: 132"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 109.7483271962314,
            "unit": "iter/sec",
            "range": "stddev: 0.00023346665964131527",
            "extra": "mean: 9.11175619298495 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 115.37336922074438,
            "unit": "iter/sec",
            "range": "stddev: 0.0003079645376512762",
            "extra": "mean: 8.667511460870104 msec\nrounds: 115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 47.592705803790075,
            "unit": "iter/sec",
            "range": "stddev: 0.0012368985438854058",
            "extra": "mean: 21.01162317021203 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 35.164275042943785,
            "unit": "iter/sec",
            "range": "stddev: 0.0010200742924116157",
            "extra": "mean: 28.43795297297518 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 333.5999552428897,
            "unit": "iter/sec",
            "range": "stddev: 0.00017968176264203985",
            "extra": "mean: 2.997602320635545 msec\nrounds: 315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 255.3072195264739,
            "unit": "iter/sec",
            "range": "stddev: 0.00017437137019947555",
            "extra": "mean: 3.9168496756759588 msec\nrounds: 259"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 68.91685969778388,
            "unit": "iter/sec",
            "range": "stddev: 0.0003673873574231966",
            "extra": "mean: 14.51023747142902 msec\nrounds: 70"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 162.18850716261855,
            "unit": "iter/sec",
            "range": "stddev: 0.00037510397463830794",
            "extra": "mean: 6.165664987577379 msec\nrounds: 161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 122.17466695254868,
            "unit": "iter/sec",
            "range": "stddev: 0.0004752871669499035",
            "extra": "mean: 8.185002872881899 msec\nrounds: 118"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 32.413116153422386,
            "unit": "iter/sec",
            "range": "stddev: 0.001196801789888925",
            "extra": "mean: 30.85170815624938 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 78.96668538670806,
            "unit": "iter/sec",
            "range": "stddev: 0.0007279215161850939",
            "extra": "mean: 12.663568124999754 msec\nrounds: 72"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 56.71351954204013,
            "unit": "iter/sec",
            "range": "stddev: 0.0008225059703268908",
            "extra": "mean: 17.632480016669184 msec\nrounds: 60"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.945391676007043,
            "unit": "iter/sec",
            "range": "stddev: 0.0015054689300547605",
            "extra": "mean: 66.9102571333326 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 36.388671614037904,
            "unit": "iter/sec",
            "range": "stddev: 0.0017097355377828315",
            "extra": "mean: 27.48108011764363 msec\nrounds: 34"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 26.250976626570537,
            "unit": "iter/sec",
            "range": "stddev: 0.001982327638920392",
            "extra": "mean: 38.09382082142524 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 7.21745759467863,
            "unit": "iter/sec",
            "range": "stddev: 0.004435522543362723",
            "extra": "mean: 138.55294428571239 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 16.593424154655825,
            "unit": "iter/sec",
            "range": "stddev: 0.0022335161601491093",
            "extra": "mean: 60.264836882351226 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 11.953695876763824,
            "unit": "iter/sec",
            "range": "stddev: 0.002835220761225281",
            "extra": "mean: 83.65613533332805 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 783.9299871832561,
            "unit": "iter/sec",
            "range": "stddev: 0.00003664519132614872",
            "extra": "mean: 1.2756241199461018 msec\nrounds: 742"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 249.56280647968947,
            "unit": "iter/sec",
            "range": "stddev: 0.0002266299095015383",
            "extra": "mean: 4.007007350598073 msec\nrounds: 251"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 73.26375920394017,
            "unit": "iter/sec",
            "range": "stddev: 0.0001841001504358621",
            "extra": "mean: 13.649313260275884 msec\nrounds: 73"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 19.7618141737498,
            "unit": "iter/sec",
            "range": "stddev: 0.0006417559807923357",
            "extra": "mean: 50.6026415999969 msec\nrounds: 20"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 5.2069189406977605,
            "unit": "iter/sec",
            "range": "stddev: 0.0011412315889858503",
            "extra": "mean: 192.05215433332512 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 399.3747615287965,
            "unit": "iter/sec",
            "range": "stddev: 0.0049524122633120855",
            "extra": "mean: 2.503913858181787 msec\nrounds: 275"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 381.92556715386394,
            "unit": "iter/sec",
            "range": "stddev: 0.00008678068269248867",
            "extra": "mean: 2.6183112260644656 msec\nrounds: 376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 155.3542428728249,
            "unit": "iter/sec",
            "range": "stddev: 0.00038154533568956757",
            "extra": "mean: 6.436901764045245 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 219.62356411298077,
            "unit": "iter/sec",
            "range": "stddev: 0.0001431115011439748",
            "extra": "mean: 4.55324547727297 msec\nrounds: 220"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.4473180567945539,
            "unit": "iter/sec",
            "range": "stddev: 0.01812535517938114",
            "extra": "mean: 2.235545793 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}