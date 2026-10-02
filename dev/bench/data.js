window.BENCHMARK_DATA = {
  "lastUpdate": 1790958197885,
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
          "id": "f81863a3eb336e69b59a903c0fcc474fcbdb4048",
          "message": "Array solvers: solve the leftover samples instead of truncating\n\nThe input length no longer has to be one more than a multiple of the\nmesh width. When the data do not end on a mesh point, the last regular\ninterval and the leftover samples form one final interval of between one\nand two regular widths, with the collocation nodes snapped to the nearest\nsamples, and the solution is returned at every sample. The truncation\nwarning is gone; inputs that end on a mesh point are solved exactly as\nbefore (bit-identical).\n\nThe final row is assembled directly (_product.solve_tail) from the\nregular intervals' local polynomial coefficients, which every path\nalready produces, so one implementation serves both quadratures and all\nfour methods (VIE-1, continuous VIE-1, VIE-2, VIDE). Its history term is\nintegrated with the regular rows' own rule: the collocation-node rule on\nthe collocation-quadrature path (every kernel argument is a sample; for\na first-kind equation a quadrature mismatch between the rows is\namplified by 1/H and costs an order), the product rule on the product\npath. The local block uses product integration of the kernel interpolant\non the final interval. Data shorter than two intervals become a single\nstretched interval solved without the D driver.\n\nConvergence with the leftover fixed and the step halving is at the\nmethod's order for all four methods on both quadratures; superconvergent\nnode sets keep their order at the final point but not at the samples\ninside the final interval.\n\nCost: the node-set tables (Lagrange bases, moment tensors, node-rule\nweights, interpolant stencils) are cached on their integer parameters\n(and the mesh width where it enters), the collocation path builds the\ninterpolant from a short prefix only, and the product-path history is a\ncontiguous correlation of the interpolant with per-cell moments of the\nsolution. A short solve with a final interval costs ~0.2 ms against\n0.03 ms without one (was 1.25 ms), and the tail adds ~5 ms to a\n96,000-sample VIE-2 (was 42 ms). The caching also cuts the product\npath's own fixed cost (0.87 -> 0.23 ms per short call).\n\nProductSetup keeps the full-array interpolant and handles an empty\nregular part; build_polynomials is replaced by the shared _finish.\nDocs, README and CHANGELOG updated; 23 new tests (convergence order per\nmethod and quadrature, single stretched interval, solution object,\nvector/matrix/complex, VIDE with a(t), mesh-point inputs unchanged).\n698 tests pass.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>",
          "timestamp": "2026-10-02T12:15:45-04:00",
          "tree_id": "7ead526c5dde881b4b8f0cb12ad50b55c65fa56b",
          "url": "https://github.com/trout314/voles/commit/f81863a3eb336e69b59a903c0fcc474fcbdb4048"
        },
        "date": 1790958196563,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7909.785511475471,
            "unit": "iter/sec",
            "range": "stddev: 0.000027720075346365474",
            "extra": "mean: 126.42567849016964 usec\nrounds: 4398"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4477.448588074311,
            "unit": "iter/sec",
            "range": "stddev: 0.0003119072319211127",
            "extra": "mean: 223.3414812765245 usec\nrounds: 4513"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2391.478374523322,
            "unit": "iter/sec",
            "range": "stddev: 0.00003401182029584161",
            "extra": "mean: 418.15138729796104 usec\nrounds: 2409"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1189.0107973484178,
            "unit": "iter/sec",
            "range": "stddev: 0.00005058284387197902",
            "extra": "mean: 841.0352557185133 usec\nrounds: 1224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 582.6126731569206,
            "unit": "iter/sec",
            "range": "stddev: 0.00006490583362196",
            "extra": "mean: 1.7164061924390386 msec\nrounds: 582"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 8280.203221368403,
            "unit": "iter/sec",
            "range": "stddev: 0.000016784086245687198",
            "extra": "mean: 120.76998272449863 usec\nrounds: 6078"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 5618.927118755456,
            "unit": "iter/sec",
            "range": "stddev: 0.00002734425905947688",
            "extra": "mean: 177.9699182539836 usec\nrounds: 5407"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3556.571914415038,
            "unit": "iter/sec",
            "range": "stddev: 0.00002656313288882515",
            "extra": "mean: 281.16962740073643 usec\nrounds: 3540"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2177.973913556948,
            "unit": "iter/sec",
            "range": "stddev: 0.00003292242176292552",
            "extra": "mean: 459.1423220339929 usec\nrounds: 2065"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1178.50982090291,
            "unit": "iter/sec",
            "range": "stddev: 0.000049850507864205055",
            "extra": "mean: 848.5292037989591 usec\nrounds: 1158"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 7556.3333428431715,
            "unit": "iter/sec",
            "range": "stddev: 0.000017684191653794413",
            "extra": "mean: 132.33931784482877 usec\nrounds: 6607"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 5070.6943815711475,
            "unit": "iter/sec",
            "range": "stddev: 0.000026732402731367963",
            "extra": "mean: 197.2116488886383 usec\nrounds: 4275"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3209.7241624373373,
            "unit": "iter/sec",
            "range": "stddev: 0.000025886072685547487",
            "extra": "mean: 311.55325174130843 usec\nrounds: 3158"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1944.7728108917515,
            "unit": "iter/sec",
            "range": "stddev: 0.00003082605368533603",
            "extra": "mean: 514.1988793752532 usec\nrounds: 1857"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1043.839892367307,
            "unit": "iter/sec",
            "range": "stddev: 0.000060489243173183856",
            "extra": "mean: 958.0013250232437 usec\nrounds: 1043"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 6451.534080857637,
            "unit": "iter/sec",
            "range": "stddev: 0.000019466923114935108",
            "extra": "mean: 155.00189373053186 usec\nrounds: 4705"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3687.414785032968,
            "unit": "iter/sec",
            "range": "stddev: 0.00002836617144507865",
            "extra": "mean: 271.1927077091923 usec\nrounds: 3606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1970.0768001421616,
            "unit": "iter/sec",
            "range": "stddev: 0.00003555629073283732",
            "extra": "mean: 507.59442470864053 usec\nrounds: 1886"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 972.4846158525869,
            "unit": "iter/sec",
            "range": "stddev: 0.00008824573390216311",
            "extra": "mean: 1.0282939017223323 msec\nrounds: 987"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 483.8237216520971,
            "unit": "iter/sec",
            "range": "stddev: 0.00007450755034783791",
            "extra": "mean: 2.066868479671341 msec\nrounds: 492"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3669.278986129491,
            "unit": "iter/sec",
            "range": "stddev: 0.00003503517119414438",
            "extra": "mean: 272.5331063078531 usec\nrounds: 3123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2020.1101273134839,
            "unit": "iter/sec",
            "range": "stddev: 0.00007465055704335213",
            "extra": "mean: 495.0225170792475 usec\nrounds: 2342"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1414.2731173782615,
            "unit": "iter/sec",
            "range": "stddev: 0.00004040693967276912",
            "extra": "mean: 707.0770049378941 usec\nrounds: 1215"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 835.59491873378,
            "unit": "iter/sec",
            "range": "stddev: 0.000039384939264153875",
            "extra": "mean: 1.1967521314219474 msec\nrounds: 837"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 437.97216054417476,
            "unit": "iter/sec",
            "range": "stddev: 0.0000819817129070328",
            "extra": "mean: 2.283250147126961 msec\nrounds: 435"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 3574.964101161341,
            "unit": "iter/sec",
            "range": "stddev: 0.000038267489332821494",
            "extra": "mean: 279.72308859693055 usec\nrounds: 3499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 1966.354571580491,
            "unit": "iter/sec",
            "range": "stddev: 0.00007344723506247093",
            "extra": "mean: 508.5552801376167 usec\nrounds: 2331"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1365.792437565516,
            "unit": "iter/sec",
            "range": "stddev: 0.00003927639277425074",
            "extra": "mean: 732.1756750846198 usec\nrounds: 1188"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 806.7386375436367,
            "unit": "iter/sec",
            "range": "stddev: 0.00004312031445179412",
            "extra": "mean: 1.2395588279307 msec\nrounds: 802"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 423.8864764355037,
            "unit": "iter/sec",
            "range": "stddev: 0.00006712930956891236",
            "extra": "mean: 2.359122207457719 msec\nrounds: 429"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3598.1099419541815,
            "unit": "iter/sec",
            "range": "stddev: 0.000028413566887888686",
            "extra": "mean: 277.9236921973781 usec\nrounds: 3460"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1881.275589301909,
            "unit": "iter/sec",
            "range": "stddev: 0.00004845269394347616",
            "extra": "mean: 531.5542314409519 usec\nrounds: 1832"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 950.7733090689183,
            "unit": "iter/sec",
            "range": "stddev: 0.000050511084651792376",
            "extra": "mean: 1.051775423711977 msec\nrounds: 970"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 453.91815575538635,
            "unit": "iter/sec",
            "range": "stddev: 0.00018976958658526385",
            "extra": "mean: 2.203040321962565 msec\nrounds: 469"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 219.98642108138588,
            "unit": "iter/sec",
            "range": "stddev: 0.00014678001026964557",
            "extra": "mean: 4.5457351189419155 msec\nrounds: 227"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2689.6882667898744,
            "unit": "iter/sec",
            "range": "stddev: 0.00003880826344066325",
            "extra": "mean: 371.79029716833827 usec\nrounds: 2295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1413.9725149766743,
            "unit": "iter/sec",
            "range": "stddev: 0.00004864927489897153",
            "extra": "mean: 707.2273254310722 usec\nrounds: 1392"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 704.2476541510715,
            "unit": "iter/sec",
            "range": "stddev: 0.00007709664585036698",
            "extra": "mean: 1.4199550315938791 msec\nrounds: 728"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 338.83999937231755,
            "unit": "iter/sec",
            "range": "stddev: 0.00010954316491167585",
            "extra": "mean: 2.95124543103661 msec\nrounds: 348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 154.77365592451963,
            "unit": "iter/sec",
            "range": "stddev: 0.00048619474266639893",
            "extra": "mean: 6.461047870366791 msec\nrounds: 162"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1026.454302812325,
            "unit": "iter/sec",
            "range": "stddev: 0.000026138128942201523",
            "extra": "mean: 974.2274909464119 usec\nrounds: 497"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 846.1309890922942,
            "unit": "iter/sec",
            "range": "stddev: 0.000055983007182766164",
            "extra": "mean: 1.1818501070062122 msec\nrounds: 785"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 624.4194782292406,
            "unit": "iter/sec",
            "range": "stddev: 0.000040514853318931166",
            "extra": "mean: 1.601487517391112 msec\nrounds: 460"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1022.6514921876962,
            "unit": "iter/sec",
            "range": "stddev: 0.000026441962975315817",
            "extra": "mean: 977.8502330845483 usec\nrounds: 931"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 779.655177371223,
            "unit": "iter/sec",
            "range": "stddev: 0.00009503898232468372",
            "extra": "mean: 1.2826183023265714 msec\nrounds: 731"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 552.2354425152411,
            "unit": "iter/sec",
            "range": "stddev: 0.000038139803258805474",
            "extra": "mean: 1.8108218397670142 msec\nrounds: 518"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 663.6866968057277,
            "unit": "iter/sec",
            "range": "stddev: 0.000038485712382066845",
            "extra": "mean: 1.5067350375002573 msec\nrounds: 560"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 493.4727563422684,
            "unit": "iter/sec",
            "range": "stddev: 0.00006865436766301231",
            "extra": "mean: 2.0264543222451143 msec\nrounds: 481"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 326.8667029630625,
            "unit": "iter/sec",
            "range": "stddev: 0.00007964578751870022",
            "extra": "mean: 3.059351077778653 msec\nrounds: 270"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.275513647484196,
            "unit": "iter/sec",
            "range": "stddev: 0.0012783086430206122",
            "extra": "mean: 189.55500200002007 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.21853629671808,
            "unit": "iter/sec",
            "range": "stddev: 0.0015177354132482222",
            "extra": "mean: 450.7476399999935 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8441338697981505,
            "unit": "iter/sec",
            "range": "stddev: 0.002140237769773626",
            "extra": "mean: 1.1846462223333372 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 744.7491789367713,
            "unit": "iter/sec",
            "range": "stddev: 0.00003618949200877541",
            "extra": "mean: 1.3427339408787713 msec\nrounds: 592"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 525.278682642713,
            "unit": "iter/sec",
            "range": "stddev: 0.0000438514194203898",
            "extra": "mean: 1.9037513477016268 msec\nrounds: 348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 310.7132512166341,
            "unit": "iter/sec",
            "range": "stddev: 0.00016648914868651874",
            "extra": "mean: 3.218401520000782 msec\nrounds: 200"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 595.8765440438998,
            "unit": "iter/sec",
            "range": "stddev: 0.00005888776203626559",
            "extra": "mean: 1.6781999727888726 msec\nrounds: 588"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 273.2033307157266,
            "unit": "iter/sec",
            "range": "stddev: 0.00036684655314066797",
            "extra": "mean: 3.6602774841003662 msec\nrounds: 283"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 227.1528682013714,
            "unit": "iter/sec",
            "range": "stddev: 0.00006609491162017707",
            "extra": "mean: 4.402321696037306 msec\nrounds: 227"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 212.08910918852087,
            "unit": "iter/sec",
            "range": "stddev: 0.0001591418015989304",
            "extra": "mean: 4.71499929358053 msec\nrounds: 218"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 102.97798217469037,
            "unit": "iter/sec",
            "range": "stddev: 0.00024771282320969624",
            "extra": "mean: 9.710813699025627 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 75.91137847579161,
            "unit": "iter/sec",
            "range": "stddev: 0.0007886460193493936",
            "extra": "mean: 13.173255710524389 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 291.2867217823507,
            "unit": "iter/sec",
            "range": "stddev: 0.00007897612781822917",
            "extra": "mean: 3.433043545140377 msec\nrounds: 288"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 129.62850314935932,
            "unit": "iter/sec",
            "range": "stddev: 0.00021274919191647312",
            "extra": "mean: 7.7143527519390505 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 105.45710093873421,
            "unit": "iter/sec",
            "range": "stddev: 0.00014708880216299794",
            "extra": "mean: 9.482528830191859 msec\nrounds: 106"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 104.07525390202153,
            "unit": "iter/sec",
            "range": "stddev: 0.00030205388826549045",
            "extra": "mean: 9.608431999997036 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 43.60521149299407,
            "unit": "iter/sec",
            "range": "stddev: 0.0018498354050248556",
            "extra": "mean: 22.93303863829825 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 33.60076066745952,
            "unit": "iter/sec",
            "range": "stddev: 0.003388220398371576",
            "extra": "mean: 29.761231000000688 msec\nrounds: 34"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 301.5757160232224,
            "unit": "iter/sec",
            "range": "stddev: 0.00022714992692290478",
            "extra": "mean: 3.3159168555965444 msec\nrounds: 277"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 227.37527127315187,
            "unit": "iter/sec",
            "range": "stddev: 0.00007775362644194744",
            "extra": "mean: 4.398015643480745 msec\nrounds: 230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 64.5267576101739,
            "unit": "iter/sec",
            "range": "stddev: 0.00010936479213077976",
            "extra": "mean: 15.497446904760181 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 150.82924607276354,
            "unit": "iter/sec",
            "range": "stddev: 0.00011239124700590339",
            "extra": "mean: 6.630013913333339 msec\nrounds: 150"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 107.31059916052698,
            "unit": "iter/sec",
            "range": "stddev: 0.0006492579169404175",
            "extra": "mean: 9.318743980770158 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 30.051561972634435,
            "unit": "iter/sec",
            "range": "stddev: 0.001853698755715038",
            "extra": "mean: 33.27614055171642 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 74.9237801825216,
            "unit": "iter/sec",
            "range": "stddev: 0.00014321045816596795",
            "extra": "mean: 13.346897307689268 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 55.18357293309894,
            "unit": "iter/sec",
            "range": "stddev: 0.0005372670508375868",
            "extra": "mean: 18.121334789473245 msec\nrounds: 57"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 13.905803657379813,
            "unit": "iter/sec",
            "range": "stddev: 0.0037740523366994283",
            "extra": "mean: 71.91242050000467 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 32.603227159461085,
            "unit": "iter/sec",
            "range": "stddev: 0.002171504888866924",
            "extra": "mean: 30.671810342854705 msec\nrounds: 35"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 24.14447189217545,
            "unit": "iter/sec",
            "range": "stddev: 0.001904138987677874",
            "extra": "mean: 41.4173482222269 msec\nrounds: 27"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.7858255369002185,
            "unit": "iter/sec",
            "range": "stddev: 0.004413680298068423",
            "extra": "mean: 147.36600500000512 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 16.853091002760447,
            "unit": "iter/sec",
            "range": "stddev: 0.002421108077597068",
            "extra": "mean: 59.3362962222304 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 12.172989777165744,
            "unit": "iter/sec",
            "range": "stddev: 0.0038797997939767365",
            "extra": "mean: 82.14908730768947 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1060.6889666818404,
            "unit": "iter/sec",
            "range": "stddev: 0.000017488432229227808",
            "extra": "mean: 942.7834468084512 usec\nrounds: 987"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 340.7634339026181,
            "unit": "iter/sec",
            "range": "stddev: 0.00004048887658826845",
            "extra": "mean: 2.934587166666995 msec\nrounds: 342"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 99.9300427744045,
            "unit": "iter/sec",
            "range": "stddev: 0.0000974871765132821",
            "extra": "mean: 10.007000619999076 msec\nrounds: 100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.312989865427163,
            "unit": "iter/sec",
            "range": "stddev: 0.0003168740508764745",
            "extra": "mean: 36.61261564285212 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 6.914564115973404,
            "unit": "iter/sec",
            "range": "stddev: 0.015288078742262392",
            "extra": "mean: 144.62227599999977 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 350.2497155260077,
            "unit": "iter/sec",
            "range": "stddev: 0.000050035251805928984",
            "extra": "mean: 2.8551058164264096 msec\nrounds: 207"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 295.21252542368865,
            "unit": "iter/sec",
            "range": "stddev: 0.00005688584094462481",
            "extra": "mean: 3.3873901473685817 msec\nrounds: 285"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 118.50406348066541,
            "unit": "iter/sec",
            "range": "stddev: 0.0005136806155118331",
            "extra": "mean: 8.438529199997902 msec\nrounds: 90"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 166.2541815030637,
            "unit": "iter/sec",
            "range": "stddev: 0.0001806794368462642",
            "extra": "mean: 6.0148863081772905 msec\nrounds: 159"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.28393348531583085,
            "unit": "iter/sec",
            "range": "stddev: 0.009926607317496377",
            "extra": "mean: 3.5219516249999856 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}