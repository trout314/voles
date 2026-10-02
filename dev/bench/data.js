window.BENCHMARK_DATA = {
  "lastUpdate": 1790949583651,
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
          "id": "f90998b90762809582497aca793c2cd3641bf28c",
          "message": "Follow-ups to the performance work (#8): one acceptance rule, complex solutions\n\n- The callable W builders' two-order acceptance rule (store the\n  higher-order estimate; entries failing max|v1 - v2| <= tol * max(1,\n  max|v2|) fall back to adaptive quadrature) had five copies: the batched\n  path and the smooth, diagonal and Gauss-Jacobi closures of each\n  builder. It is now one function, _store_two_order, that all of them\n  call; each closure keeps only its fallback quadrature and options.\n- Complex solutions with return_function=True are ordinary\n  _SolutionFunction objects with complex coefficients, recombined from\n  the real block solve (_complex_solution). The wrapper class, the list\n  mixin and the polynomial recombination in _complex.py (with its\n  trimmed-length failure mode) are gone.\n- CHANGELOG: entry for #8's performance work and for the shared\n  acceptance rule; the recombination entry describes the end state.\n\nBit-identity baseline (40 arrays: smooth / adaptive / Gauss-Jacobi\nkernels, uniform and non-uniform meshes, vectorized and scalar-only\nkernels, vector, matrix and complex problems, both solver families):\nall identical except three complex Polynomial coefficient arrays from\nthe array solvers, which differ by <= 2e-16 (complex domain conversion\nrounding). Timings unchanged. 675 tests and the docs examples pass.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>",
          "timestamp": "2026-10-02T09:51:42-04:00",
          "tree_id": "8131f2d6a19bb318683fa75148b561c35995acf1",
          "url": "https://github.com/trout314/voles/commit/f90998b90762809582497aca793c2cd3641bf28c"
        },
        "date": 1790949583075,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 8243.064384676454,
            "unit": "iter/sec",
            "range": "stddev: 0.00003737283400453253",
            "extra": "mean: 121.31410763440867 usec\nrounds: 5593"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4591.332593492385,
            "unit": "iter/sec",
            "range": "stddev: 0.0002513386190019801",
            "extra": "mean: 217.80169038883602 usec\nrounds: 4370"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2431.847745076604,
            "unit": "iter/sec",
            "range": "stddev: 0.00005558691171287269",
            "extra": "mean: 411.2099542516794 usec\nrounds: 2470"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1197.9338211699333,
            "unit": "iter/sec",
            "range": "stddev: 0.000082506780986599",
            "extra": "mean: 834.7706545453186 usec\nrounds: 1210"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 586.6936765949473,
            "unit": "iter/sec",
            "range": "stddev: 0.00010870060871926042",
            "extra": "mean: 1.704466981481375 msec\nrounds: 594"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 9088.56972712441,
            "unit": "iter/sec",
            "range": "stddev: 0.000020725141664002498",
            "extra": "mean: 110.02831358773064 usec\nrounds: 6550"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 5956.153678029287,
            "unit": "iter/sec",
            "range": "stddev: 0.00003217178975404111",
            "extra": "mean: 167.89358603837601 usec\nrounds: 4899"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3658.798485220426,
            "unit": "iter/sec",
            "range": "stddev: 0.000042448740535732864",
            "extra": "mean: 273.3137679048084 usec\nrounds: 3365"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2225.714426986055,
            "unit": "iter/sec",
            "range": "stddev: 0.00004926370358830053",
            "extra": "mean: 449.2939381060432 usec\nrounds: 2165"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1176.300344672303,
            "unit": "iter/sec",
            "range": "stddev: 0.00008261026725340709",
            "extra": "mean: 850.1230187759427 usec\nrounds: 1225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 8290.419010651158,
            "unit": "iter/sec",
            "range": "stddev: 0.000020165196407384796",
            "extra": "mean: 120.6211650720241 usec\nrounds: 7106"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 5392.768242238231,
            "unit": "iter/sec",
            "range": "stddev: 0.0000339172187164637",
            "extra": "mean: 185.43352042604317 usec\nrounds: 5263"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3307.483343710175,
            "unit": "iter/sec",
            "range": "stddev: 0.000043105055787848226",
            "extra": "mean: 302.34468206822424 usec\nrounds: 3095"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1985.416939138663,
            "unit": "iter/sec",
            "range": "stddev: 0.00005043648191715977",
            "extra": "mean: 503.67254367933 usec\nrounds: 1946"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1049.6818931455623,
            "unit": "iter/sec",
            "range": "stddev: 0.00007642860360237354",
            "extra": "mean: 952.6695721151467 usec\nrounds: 1040"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 6781.872502384234,
            "unit": "iter/sec",
            "range": "stddev: 0.00003160635632902622",
            "extra": "mean: 147.45190205926755 usec\nrounds: 6167"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3803.6537191980256,
            "unit": "iter/sec",
            "range": "stddev: 0.00004405118324068443",
            "extra": "mean: 262.90511014521144 usec\nrounds: 3795"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1980.2871570367724,
            "unit": "iter/sec",
            "range": "stddev: 0.00006292151496645861",
            "extra": "mean: 504.9772687999262 usec\nrounds: 1968"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 975.3668681131114,
            "unit": "iter/sec",
            "range": "stddev: 0.00010162191901631397",
            "extra": "mean: 1.0252552477351855 msec\nrounds: 993"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 477.58656694902936,
            "unit": "iter/sec",
            "range": "stddev: 0.00015226345404500085",
            "extra": "mean: 2.093861237321454 msec\nrounds: 493"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3899.630311935834,
            "unit": "iter/sec",
            "range": "stddev: 0.000027325898548630446",
            "extra": "mean: 256.43456430709335 usec\nrounds: 3390"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 1999.641061968292,
            "unit": "iter/sec",
            "range": "stddev: 0.00010631321600481353",
            "extra": "mean: 500.0897506153817 usec\nrounds: 2029"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1418.2203659302213,
            "unit": "iter/sec",
            "range": "stddev: 0.00006372276904023272",
            "extra": "mean: 705.109039485618 usec\nrounds: 1241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 827.9424278232882,
            "unit": "iter/sec",
            "range": "stddev: 0.00008590048816604303",
            "extra": "mean: 1.2078134498180773 msec\nrounds: 827"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 433.11544336278024,
            "unit": "iter/sec",
            "range": "stddev: 0.00012178221192798435",
            "extra": "mean: 2.308853252231862 msec\nrounds: 448"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 3852.7286662553543,
            "unit": "iter/sec",
            "range": "stddev: 0.000026501377219494907",
            "extra": "mean: 259.556300644433 usec\nrounds: 3569"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2016.205260362128,
            "unit": "iter/sec",
            "range": "stddev: 0.0000885987525691864",
            "extra": "mean: 495.98124737577126 usec\nrounds: 2191"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1348.8092381505617,
            "unit": "iter/sec",
            "range": "stddev: 0.00010563509796821964",
            "extra": "mean: 741.394684819303 usec\nrounds: 1212"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 805.5175006206738,
            "unit": "iter/sec",
            "range": "stddev: 0.0000872631362431955",
            "extra": "mean: 1.2414379566297096 msec\nrounds: 807"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 410.9417821582212,
            "unit": "iter/sec",
            "range": "stddev: 0.00026362123048255374",
            "extra": "mean: 2.433434718533875 msec\nrounds: 437"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3709.533386045533,
            "unit": "iter/sec",
            "range": "stddev: 0.00004314982791847371",
            "extra": "mean: 269.575684036646 usec\nrounds: 3627"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1901.5941820653336,
            "unit": "iter/sec",
            "range": "stddev: 0.00006840507432945419",
            "extra": "mean: 525.8745580057957 usec\nrounds: 1905"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 938.1535471320184,
            "unit": "iter/sec",
            "range": "stddev: 0.00010309295511733403",
            "extra": "mean: 1.0659235932721773 msec\nrounds: 981"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 458.0724343208852,
            "unit": "iter/sec",
            "range": "stddev: 0.00015205717015160758",
            "extra": "mean: 2.1830608547369783 msec\nrounds: 475"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 220.58029365712017,
            "unit": "iter/sec",
            "range": "stddev: 0.0001942899395513817",
            "extra": "mean: 4.5334965486737655 msec\nrounds: 226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2779.992086375331,
            "unit": "iter/sec",
            "range": "stddev: 0.000054047368510891466",
            "extra": "mean: 359.71325418549714 usec\nrounds: 2270"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1423.4996244993206,
            "unit": "iter/sec",
            "range": "stddev: 0.00007786662569499194",
            "extra": "mean: 702.4940384875229 usec\nrounds: 1455"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 711.5878148440465,
            "unit": "iter/sec",
            "range": "stddev: 0.000128024843028427",
            "extra": "mean: 1.4053079312764267 msec\nrounds: 713"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 344.1859614727764,
            "unit": "iter/sec",
            "range": "stddev: 0.00015046300415630476",
            "extra": "mean: 2.9054061232508914 msec\nrounds: 357"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 161.0202205432477,
            "unit": "iter/sec",
            "range": "stddev: 0.00036380890918073246",
            "extra": "mean: 6.21040013872925 msec\nrounds: 173"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1069.030943887536,
            "unit": "iter/sec",
            "range": "stddev: 0.000025745967655486306",
            "extra": "mean: 935.4266176463473 usec\nrounds: 510"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 883.9292002295792,
            "unit": "iter/sec",
            "range": "stddev: 0.000042025389465080186",
            "extra": "mean: 1.1313123265305345 msec\nrounds: 833"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 643.1741022915168,
            "unit": "iter/sec",
            "range": "stddev: 0.00004211920284501944",
            "extra": "mean: 1.5547889699494664 msec\nrounds: 599"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1054.988351751374,
            "unit": "iter/sec",
            "range": "stddev: 0.000027461934655459646",
            "extra": "mean: 947.8777640908655 usec\nrounds: 958"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 824.9632782335352,
            "unit": "iter/sec",
            "range": "stddev: 0.00003118703414888883",
            "extra": "mean: 1.2121751675314139 msec\nrounds: 770"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 566.9332118504966,
            "unit": "iter/sec",
            "range": "stddev: 0.00003669161634274424",
            "extra": "mean: 1.7638762011065694 msec\nrounds: 542"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 689.1672537878476,
            "unit": "iter/sec",
            "range": "stddev: 0.00003194455848902196",
            "extra": "mean: 1.45102657519453 msec\nrounds: 645"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 512.0088019150129,
            "unit": "iter/sec",
            "range": "stddev: 0.00004633703891328167",
            "extra": "mean: 1.9530914239360821 msec\nrounds: 493"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 337.03661746488444,
            "unit": "iter/sec",
            "range": "stddev: 0.00005716600964630054",
            "extra": "mean: 2.9670366606506464 msec\nrounds: 277"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.391100319837605,
            "unit": "iter/sec",
            "range": "stddev: 0.001237679951766472",
            "extra": "mean: 185.49089066666133 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.267163235066873,
            "unit": "iter/sec",
            "range": "stddev: 0.0024883061908539355",
            "extra": "mean: 441.07984133330547 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8633235910220575,
            "unit": "iter/sec",
            "range": "stddev: 0.004981790012663801",
            "extra": "mean: 1.1583142293333328 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 771.0463350282733,
            "unit": "iter/sec",
            "range": "stddev: 0.000027997091919022347",
            "extra": "mean: 1.2969389186751419 msec\nrounds: 664"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 546.9162030171173,
            "unit": "iter/sec",
            "range": "stddev: 0.000038931406122189627",
            "extra": "mean: 1.8284336695153687 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 323.908240053299,
            "unit": "iter/sec",
            "range": "stddev: 0.00013931829098047464",
            "extra": "mean: 3.0872941047608125 msec\nrounds: 210"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 590.4365394645498,
            "unit": "iter/sec",
            "range": "stddev: 0.0001328976129268633",
            "extra": "mean: 1.693662118043832 msec\nrounds: 593"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 274.1420739610762,
            "unit": "iter/sec",
            "range": "stddev: 0.00017752896279013455",
            "extra": "mean: 3.6477436153852985 msec\nrounds: 286"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 227.20220763244893,
            "unit": "iter/sec",
            "range": "stddev: 0.0001311302438871433",
            "extra": "mean: 4.401365683988981 msec\nrounds: 231"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 216.3020674511205,
            "unit": "iter/sec",
            "range": "stddev: 0.0001490734798509055",
            "extra": "mean: 4.623164317308146 msec\nrounds: 208"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 104.10903250529648,
            "unit": "iter/sec",
            "range": "stddev: 0.00023543758764356121",
            "extra": "mean: 9.605314504763317 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 77.26746805811337,
            "unit": "iter/sec",
            "range": "stddev: 0.0006658122746904493",
            "extra": "mean: 12.942057312501731 msec\nrounds: 80"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 295.0300802659857,
            "unit": "iter/sec",
            "range": "stddev: 0.00013915489913245903",
            "extra": "mean: 3.3894848928571806 msec\nrounds: 252"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 131.65068095981763,
            "unit": "iter/sec",
            "range": "stddev: 0.00014306650758326778",
            "extra": "mean: 7.5958589253725135 msec\nrounds: 134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 107.49687235915529,
            "unit": "iter/sec",
            "range": "stddev: 0.00017164605618375943",
            "extra": "mean: 9.302596234232038 msec\nrounds: 111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 105.51808793427207,
            "unit": "iter/sec",
            "range": "stddev: 0.0001179342587920362",
            "extra": "mean: 9.477048149535335 msec\nrounds: 107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 45.431555964903055,
            "unit": "iter/sec",
            "range": "stddev: 0.0016542413649084876",
            "extra": "mean: 22.01113254347977 msec\nrounds: 46"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 34.61099088320356,
            "unit": "iter/sec",
            "range": "stddev: 0.0032874056358834975",
            "extra": "mean: 28.89255622222859 msec\nrounds: 36"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 302.79867238474225,
            "unit": "iter/sec",
            "range": "stddev: 0.00024127278478047528",
            "extra": "mean: 3.3025243873241927 msec\nrounds: 284"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 228.14952392879536,
            "unit": "iter/sec",
            "range": "stddev: 0.00011559072084146505",
            "extra": "mean: 4.383090452172481 msec\nrounds: 230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 64.62339051891931,
            "unit": "iter/sec",
            "range": "stddev: 0.00015374213138461467",
            "extra": "mean: 15.47427319999927 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 153.10199293164695,
            "unit": "iter/sec",
            "range": "stddev: 0.00014897693086777833",
            "extra": "mean: 6.531593618421769 msec\nrounds: 152"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 109.52738168113342,
            "unit": "iter/sec",
            "range": "stddev: 0.0005771740067163726",
            "extra": "mean: 9.13013699999965 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 29.735479643121675,
            "unit": "iter/sec",
            "range": "stddev: 0.0018456219620797145",
            "extra": "mean: 33.62985941379685 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 74.434408287787,
            "unit": "iter/sec",
            "range": "stddev: 0.0006960106368113237",
            "extra": "mean: 13.434646999996069 msec\nrounds: 72"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 55.478612444066734,
            "unit": "iter/sec",
            "range": "stddev: 0.00038719683867582353",
            "extra": "mean: 18.024964142861272 msec\nrounds: 56"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.491578755194073,
            "unit": "iter/sec",
            "range": "stddev: 0.0021477986541223676",
            "extra": "mean: 69.00559400000361 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 36.02193958016341,
            "unit": "iter/sec",
            "range": "stddev: 0.00028319209798286714",
            "extra": "mean: 27.76085939999413 msec\nrounds: 35"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 25.92411229423304,
            "unit": "iter/sec",
            "range": "stddev: 0.0020223427117070283",
            "extra": "mean: 38.57412699999974 msec\nrounds: 27"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.863945999226035,
            "unit": "iter/sec",
            "range": "stddev: 0.005942707042617404",
            "extra": "mean: 145.6887918571559 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 15.437508718163402,
            "unit": "iter/sec",
            "range": "stddev: 0.003393144042452302",
            "extra": "mean: 64.77729135293858 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 11.86935174271303,
            "unit": "iter/sec",
            "range": "stddev: 0.006295322903273721",
            "extra": "mean: 84.25059950000484 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1049.2939181305117,
            "unit": "iter/sec",
            "range": "stddev: 0.000021680715676490183",
            "extra": "mean: 953.0218204082066 usec\nrounds: 980"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 343.79978235683814,
            "unit": "iter/sec",
            "range": "stddev: 0.00002887231209340984",
            "extra": "mean: 2.9086696714719724 msec\nrounds: 347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 101.27004380272133,
            "unit": "iter/sec",
            "range": "stddev: 0.000080571124956891",
            "extra": "mean: 9.874588401956709 msec\nrounds: 102"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.727182601330306,
            "unit": "iter/sec",
            "range": "stddev: 0.00012069926736062663",
            "extra": "mean: 36.06569099999441 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.253477841567699,
            "unit": "iter/sec",
            "range": "stddev: 0.0003526036822766617",
            "extra": "mean: 137.86490037499988 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 368.88205847547806,
            "unit": "iter/sec",
            "range": "stddev: 0.00002970374206616082",
            "extra": "mean: 2.7108935688897873 msec\nrounds: 225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 308.5199764811119,
            "unit": "iter/sec",
            "range": "stddev: 0.00002580444726596355",
            "extra": "mean: 3.24128120132027 msec\nrounds: 303"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 144.7847061285906,
            "unit": "iter/sec",
            "range": "stddev: 0.00040560818676401865",
            "extra": "mean: 6.906806849556675 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 177.0034288359667,
            "unit": "iter/sec",
            "range": "stddev: 0.00007062249555400509",
            "extra": "mean: 5.649608070173171 msec\nrounds: 171"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.2954600306319634,
            "unit": "iter/sec",
            "range": "stddev: 0.00517662755739515",
            "extra": "mean: 3.384552549666656 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}