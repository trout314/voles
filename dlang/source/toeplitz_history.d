module toeplitz_history;

// ---------------------------------------------------------------------------
// Fast history accumulation for uniform-step convolution kernels.
//
// The sampled-data solvers accumulate, for each mesh interval n, the lag term
//
//     G[n] = sum_{ell < n} B[n - ell] * s[ell]
//
// where the (tdim x sdim) block B depends on (n, ell) only through the lag
// n - ell (the kernel is a convolution sampled on an equally spaced grid).
// Direct accumulation costs O(Q^2) block mat-vecs over Q mesh intervals.
//
// ToeplitzHistoryRT evaluates the same sums with the standard power-of-two
// blocking: after solving interval n, let b = n + 1 and S = 2^{v2(b)} (the
// largest power of two dividing b). The just-completed source block
// [b - S, b) contributes to the target range [b, min(b + S, Q)) in one merge.
// Every (ell < n) pair is covered by exactly one merge: for a given pair, the
// covering boundary is the unique multiple of a power of two lying in
// (ell, n] whose block reaches back to ell and forward to n.
//
// Small merges (S < FFT_CUTOFF), and end-of-mesh merges whose clamped
// target range keeps fewer than FFT_CUTOFF live outputs, are done directly;
// large ones as circular
// convolutions of length 2S via a real-input radix-2 FFT (rfft_packed /
// irfft_packed: one length-S complex FFT per transform). Outputs are read from
// positions S .. 2S-1 of the length-2S circular convolution, which are free
// of wrap-around: the linear convolution has length 3S - 2, and its aliased
// tail (positions >= 2S) wraps onto positions <= S - 2 only.
//
// Total cost: O(Q log^2 Q) instead of O(Q^2). The result differs from the
// sequential direct sum only by floating-point reordering (and the FFT's own
// rounding), i.e. at rounding level -- not by method error.
//
// ToeplitzHistoryRT takes its dimensions at run time (used by the d >
// max_d_compile LAPACK drivers); ToeplitzHistory!(tdim, sdim) is a thin
// fixed-size wrapper over the same implementation for the compile-time
// drivers.
// ---------------------------------------------------------------------------

import std.math : PI, cos, sin;

// In-place iterative radix-2 complex FFT on split re/im arrays.
// n = re.length = im.length must be a power of two. No output scaling is
// applied for the inverse transform (callers scale by 1/n).
//
// Twiddles come from the multiplicative recurrence, re-seeded from direct
// cos/sin every 32 steps so the compounded drift is bounded by ~32 eps
// independent of n (unseeded it grows linearly: ~1e-11 by n = 2^21).
// Each stage's twiddles are generated once into a contiguous thread-local
// scratch table shared by all of that stage's butterfly blocks (same values
// as regenerating them per block, ~20% faster). A global strided table of
// all n twiddles was tried earlier and rejected: with the project's
// mandatory array bounds checking, its strided loads cost ~10% end-to-end.
void fft_radix2(double[] re, double[] im, bool inverse)
{
    immutable size_t n = re.length;
    assert(n == im.length && (n & (n - 1)) == 0);
    if (n <= 1)
        return;

    // bit-reversal permutation
    size_t j = 0;
    foreach (i; 0 .. n - 1)
    {
        if (i < j)
        {
            auto tr = re[i]; re[i] = re[j]; re[j] = tr;
            auto ti = im[i]; im[i] = im[j]; im[j] = ti;
        }
        size_t mask = n >> 1;
        while (j & mask)
        {
            j &= ~mask;
            mask >>= 1;
        }
        j |= mask;
    }

    // First two stages have trivial twiddles (1 and -/+i): no multiplies.
    for (size_t a = 0; a + 1 < n; a += 2)
    {
        immutable double xr = re[a + 1], xi = im[a + 1];
        re[a + 1] = re[a] - xr;
        im[a + 1] = im[a] - xi;
        re[a] += xr;
        im[a] += xi;
    }
    if (n >= 4)
    {
        for (size_t a = 0; a < n; a += 4)
        {
            // k = 0: twiddle 1
            {
                immutable double xr = re[a + 2], xi = im[a + 2];
                re[a + 2] = re[a] - xr;
                im[a + 2] = im[a] - xi;
                re[a] += xr;
                im[a] += xi;
            }
            // k = 1: twiddle -i (forward) or +i (inverse)
            {
                immutable double br = re[a + 3], bi = im[a + 3];
                immutable double xr = inverse ? -bi : bi;
                immutable double xi = inverse ? br : -br;
                re[a + 3] = re[a + 1] - xr;
                im[a + 3] = im[a + 1] - xi;
                re[a + 1] += xr;
                im[a + 1] += xi;
            }
        }
    }

    // Remaining stages: the stage's half twiddles are generated once (by
    // the re-seeded recurrence) into a small scratch table and shared by
    // every butterfly block of the stage, instead of being regenerated
    // per block.
    double[] twr = fftTwScratchRe(n / 2);
    double[] twi = fftTwScratchIm(n / 2);
    for (size_t len = 8; len <= n; len <<= 1)
    {
        immutable size_t half = len >> 1;
        immutable double ang = (inverse ? 2.0 : -2.0) * PI / cast(double) len;
        immutable double wr = cos(ang);
        immutable double wi = sin(ang);
        {
            double cr = 1.0;
            double ci = 0.0;
            foreach (k; 0 .. half)
            {
                twr[k] = cr;
                twi[k] = ci;
                if (((k + 1) & 31) == 0)
                {
                    // periodic re-seed: cap recurrence drift at ~32 eps
                    immutable double a2 = ang * cast(double)(k + 1);
                    cr = cos(a2);
                    ci = sin(a2);
                }
                else
                {
                    immutable double ncr = cr * wr - ci * wi;
                    ci = cr * wi + ci * wr;
                    cr = ncr;
                }
            }
        }
        auto tr = twr[0 .. half];
        auto ti = twi[0 .. half];
        for (size_t base = 0; base < n; base += len)
        {
            auto ar = re[base .. base + half];
            auto ai = im[base .. base + half];
            auto br = re[base + half .. base + len];
            auto bi = im[base + half .. base + len];
            foreach (k; 0 .. half)
            {
                immutable double xr = br[k] * tr[k] - bi[k] * ti[k];
                immutable double xi = br[k] * ti[k] + bi[k] * tr[k];
                br[k] = ar[k] - xr;
                bi[k] = ai[k] - xi;
                ar[k] += xr;
                ai[k] += xi;
            }
        }
    }
}

// Thread-local twiddle scratch for fft_radix2 (solves run concurrently in
// Python worker threads, so this must not be shared).
private double[] fftTwRe, fftTwIm;
private double[] fftTwScratchRe(size_t len)
{
    if (fftTwRe.length < len)
        fftTwRe.length = len;
    return fftTwRe;
}
private double[] fftTwScratchIm(size_t len)
{
    if (fftTwIm.length < len)
        fftTwIm.length = len;
    return fftTwIm;
}

// Real-input FFT of length L = 2M via one length-M complex FFT.
//
// Every signal the history merges transform is real (source columns, kernel
// lag segments, and the convolutions read back), so a complex transform of
// length L spends half its work on zero imaginary parts. Packing
// z[j] = x[2j] + i x[2j+1] and untangling the even/odd half-spectra costs one
// length-M FFT plus an O(M) pass, and only the M + 1 non-redundant bins of
// the Hermitian spectrum need to be stored and multiplied.
//
// rfft_packed: on entry zr/zi (length M) hold the packed input; on return
// Xr/Xi[0 .. M] hold bins 0 .. M of the length-L DFT of x. zr/zi are
// overwritten. twr/twi[k] = cos/sin(2 pi k / L) for k = 0 .. M.
void rfft_packed(double[] zr, double[] zi,
                 const(double)[] twr, const(double)[] twi,
                 double[] Xr, double[] Xi)
{
    immutable size_t M = zr.length;
    fft_radix2(zr, zi, false);
    foreach (k; 0 .. M + 1)
    {
        immutable size_t k1 = (k == M) ? 0 : k;
        immutable size_t k2 = (k == 0) ? 0 : M - k;
        // even half-spectrum E = (Z[k] + conj Z[M-k]) / 2,
        // odd half-spectrum  O = (Z[k] - conj Z[M-k]) / 2i
        immutable double er = 0.5 * (zr[k1] + zr[k2]);
        immutable double ei = 0.5 * (zi[k1] - zi[k2]);
        immutable double or = 0.5 * (zi[k1] + zi[k2]);
        immutable double oi = -0.5 * (zr[k1] - zr[k2]);
        // X[k] = E + w^k O with w^k = exp(-2 pi i k / L)
        Xr[k] = er + twr[k] * or + twi[k] * oi;
        Xi[k] = ei + twr[k] * oi - twi[k] * or;
    }
}

// Inverse of rfft_packed: from bins Xr/Xi[0 .. M] of a Hermitian length-L
// spectrum, leave in zr/zi (length M) the unscaled packed result, so that
// the real sequence is x[2j] = zr[j] / M, x[2j+1] = zi[j] / M.
void irfft_packed(const(double)[] Xr, const(double)[] Xi,
                  const(double)[] twr, const(double)[] twi,
                  double[] zr, double[] zi)
{
    immutable size_t M = zr.length;
    foreach (k; 0 .. M)
    {
        immutable size_t k2 = M - k;
        immutable double er = 0.5 * (Xr[k] + Xr[k2]);
        immutable double ei = 0.5 * (Xi[k] - Xi[k2]);
        immutable double dr = 0.5 * (Xr[k] - Xr[k2]);
        immutable double di = 0.5 * (Xi[k] + Xi[k2]);
        // O = D * w^{-k}, then Z = E + i O
        immutable double or = dr * twr[k] - di * twi[k];
        immutable double oi = dr * twi[k] + di * twr[k];
        zr[k] = er - oi;
        zi[k] = ei + or;
    }
    fft_radix2(zr, zi, true);
}

struct ToeplitzHistoryRT
{
    // Merges smaller than this are done by direct block mat-vecs; at and
    // above it, by FFT convolution. Direct pair work below the cutoff totals
    // O(Q * FFT_CUTOFF) and is negligible.
    enum int FFT_CUTOFF = 32;

    int Q;
    int tdim;
    int sdim;
    double[] lagB;   // flat [lag][a][b], lag = 0 .. Q-1 (lag 0 unused).
                     // The caller fills lags 1 .. Q-1, scaling folded in.
    double[] Gacc;   // flat [n][a]: accumulated history, length Q * tdim
    double[] srcs;   // flat [ell][b]: pushed source vectors
    int nPushed;

    // scratch buffers, grown on demand and reused across merges
    double[] xre, xim, kre, kim, accre, accim, zre, zim;

    // Per-level real-FFT twiddles cos/sin(2 pi k / 2S), k = 0 .. S.
    private double[][] twCos, twSin;

    // Per-level cache of kernel-lag spectra. The kernel FFT in mergeFFT
    // depends only on (S, a, c): the lag segment 1 .. min(2S-1, Q-1) is the
    // same for every merge of level S, and lag blocks are write-once. Each
    // level's spectra are built at its first merge (by which point the lazy
    // fill has provided the needed lags) and reused for all ~Q/2S merges of
    // that level, cutting the per-merge FFT count from tdim*sdim + sdim +
    // tdim to sdim + tdim. Levels are cached smallest-first while
    // kcacheBudget lasts (small levels merge most often and store least);
    // levels over budget -- typically only the top one or two, which merge
    // once or twice -- fall back to the on-the-fly path.
    private double[][] kcacheRe;   // per level li (S = FFT_CUTOFF << li):
    private double[][] kcacheIm;   //   [(a*sdim + c)*(S+1) + t], null = uncached
    private bool[] kcacheTried;
    private size_t kcacheBudget;   // doubles remaining for cache arrays

    // Lazy lag-table fill: when set (see setLagFiller), push() extends the
    // table on demand to exactly the lags the pending merge reads, instead
    // of the driver evaluating all Q-1 blocks up front. Same total work on
    // success; zero wasted block evaluations when a solve fails early, and
    // the first solution values appear without waiting for the full table.
    private void delegate(int lag, ref ToeplitzHistoryRT self) fillLag;
    private int lagsFilled;   // lags 1 .. lagsFilled-1 hold valid blocks

    void initialize(int Q_, int tdim_, int sdim_)
    {
        Q = Q_;
        tdim = tdim_;
        sdim = sdim_;
        lagB.length = cast(size_t) Q * tdim * sdim;
        lagB[] = 0.0;
        Gacc.length = cast(size_t) Q * tdim;
        Gacc[] = 0.0;
        srcs.length = cast(size_t) Q * sdim;
        srcs[] = 0.0;
        nPushed = 0;
        fillLag = null;
        lagsFilled = Q;   // eager mode: caller pre-fills lags 1 .. Q-1
        kcacheRe = null;
        kcacheIm = null;
        kcacheTried = null;
        twCos = null;
        twSin = null;
        kcacheBudget = 2 * lagB.length;   // cap cache (re+im) at 2x lag table
    }

    // Register the per-lag fill callback and switch to lazy fill. The
    // callback writes block `lag` through self.lagBlock/lagRow; it is
    // invoked with lags in increasing order, each exactly once.
    void setLagFiller(void delegate(int lag, ref ToeplitzHistoryRT self) filler)
    {
        fillLag = filler;
        lagsFilled = 1;
    }

    private void ensureLags(int lagTop)
    {
        if (fillLag is null)
            return;
        while (lagsFilled <= lagTop)
        {
            fillLag(lagsFilled, this);
            ++lagsFilled;
        }
    }

    // Accumulated history for interval n; valid once intervals 0 .. n-1 have
    // been pushed. Returns a borrowed slice of length tdim.
    double[] G(int n)
    {
        immutable size_t base = cast(size_t) n * tdim;
        return Gacc[base .. base + tdim];
    }

    // Borrowed (tdim*sdim)-length slice of the lag-`lag` block, laid out
    // row-major [a][b]. Drivers fill the lag table through this or lagRow
    // instead of hand-computing flat offsets into lagB, so the layout the
    // struct's own G()/push()/merge code assumes is defined in one place
    // and a wrong index bounds-errors on the block instead of silently
    // landing in a neighboring lag.
    double[] lagBlock(int lag)
    {
        immutable size_t bs = cast(size_t) tdim * sdim;
        immutable size_t base = cast(size_t) lag * bs;
        return lagB[base .. base + bs];
    }

    // Borrowed sdim-length row `a` of the lag-`lag` block.
    double[] lagRow(int lag, int a)
    {
        immutable size_t base = (cast(size_t) lag * tdim + a) * sdim;
        return lagB[base .. base + sdim];
    }

    // Record the solved source vector (length sdim) for interval nPushed and
    // propagate its block's contribution forward when a power-of-two boundary
    // completes.
    void push(const(double)[] s)
    {
        immutable int ell = nPushed;
        immutable size_t sbase = cast(size_t) ell * sdim;
        foreach (b; 0 .. sdim)
            srcs[sbase + b] = s[b];
        ++nPushed;

        immutable int bnd = ell + 1;
        if (bnd >= Q)
            return;
        immutable int S = bnd & (-bnd);   // 2^{v2(bnd)}
        int tEnd = bnd + S;
        if (tEnd > Q)
            tEnd = Q;
        immutable int outW = tEnd - bnd;  // live outputs (< S when clamped)
        if (S < FFT_CUTOFF || outW < FFT_CUTOFF)
        {
            // Small merges, and end-of-mesh merges clamped to only a few
            // live outputs, go direct: outW * S block mat-vecs beat the
            // FFT's full length-2S machinery once outW is small, and the
            // direct path only reads lags up to S + outW - 1 -- the FFT's
            // kernel segment reads up to 2S - 1 even when clamped, which
            // for a heavily clamped top-level merge would force the lazy
            // fill to evaluate lag blocks no output ever uses.
            immutable int lagTop = (S + outW - 1 < Q - 1) ? S + outW - 1 : Q - 1;
            ensureLags(lagTop);
            mergeDirect(bnd, S, tEnd);
        }
        else
        {
            immutable int lagTop = (2 * S - 1 < Q - 1) ? 2 * S - 1 : Q - 1;
            ensureLags(lagTop);
            mergeFFT(bnd, S, tEnd);
        }
    }

    private void mergeDirect(int bnd, int S, int tEnd)
    {
        foreach (n; bnd .. tEnd)
        {
            immutable size_t gbase = cast(size_t) n * tdim;
            foreach (ell; bnd - S .. bnd)
            {
                immutable size_t Bbase = cast(size_t)(n - ell) * tdim * sdim;
                immutable size_t sbase = cast(size_t) ell * sdim;
                foreach (a; 0 .. tdim)
                {
                    double acc = 0.0;
                    immutable size_t row = Bbase + cast(size_t) a * sdim;
                    foreach (c; 0 .. sdim)
                        acc += lagB[row + c] * srcs[sbase + c];
                    Gacc[gbase + a] += acc;
                }
            }
        }
    }

    private void mergeFFT(int bnd, int S, int tEnd)
    {
        // Length-2S circular convolutions done as real FFTs: one length-S
        // complex FFT per transform, and S + 1 stored bins per spectrum.
        immutable size_t sS = cast(size_t) S;
        immutable size_t nb = sS + 1;
        if (xre.length < cast(size_t) sdim * nb)
        {
            xre.length = cast(size_t) sdim * nb;
            xim.length = cast(size_t) sdim * nb;
        }
        if (kre.length < nb)
        {
            kre.length = nb;
            kim.length = nb;
        }
        if (accre.length < nb)
        {
            accre.length = nb;
            accim.length = nb;
        }
        if (zre.length < sS)
        {
            zre.length = sS;
            zim.length = sS;
        }
        auto zr = zre[0 .. sS];
        auto zi = zim[0 .. sS];

        immutable int li = levelIndex(S);
        const(double)[] twr, twi;
        levelTwiddles(li, S, twr, twi);

        // Kernel spectra for this level: from the cache when available,
        // otherwise computed per (a, c) into the shared scratch.
        immutable bool cached = ensureKernelCache(li, S);

        // forward FFT of each source column (zero-padded to length 2S);
        // the S live samples pack into zr/zi[0 .. S/2].
        foreach (c; 0 .. sdim)
        {
            zr[] = 0.0;
            zi[] = 0.0;
            immutable size_t s0 = cast(size_t)(bnd - S) * sdim + c;
            foreach (j; 0 .. sS / 2)
            {
                zr[j] = srcs[s0 + (2 * j) * sdim];
                zi[j] = srcs[s0 + (2 * j + 1) * sdim];
            }
            rfft_packed(zr, zi, twr, twi,
                        xre[c * nb .. (c + 1) * nb], xim[c * nb .. (c + 1) * nb]);
        }

        // per target row a: sum over c of kernel spectrum times source
        // spectrum, then one inverse transform
        auto Ar = accre[0 .. nb];
        auto Ai = accim[0 .. nb];
        immutable double inv = 1.0 / S;
        foreach (a; 0 .. tdim)
        {
            Ar[] = 0.0;
            Ai[] = 0.0;
            foreach (c; 0 .. sdim)
            {
                const(double)[] kr, ki;
                if (cached)
                {
                    immutable size_t off = (cast(size_t) a * sdim + c) * nb;
                    kr = kcacheRe[li][off .. off + nb];
                    ki = kcacheIm[li][off .. off + nb];
                }
                else
                {
                    kernelSpectrum(S, a, c, twr, twi, kre[0 .. nb], kim[0 .. nb]);
                    kr = kre[0 .. nb];
                    ki = kim[0 .. nb];
                }
                auto Xr = xre[c * nb .. (c + 1) * nb];
                auto Xi = xim[c * nb .. (c + 1) * nb];
                foreach (t; 0 .. nb)
                {
                    Ar[t] += kr[t] * Xr[t] - ki[t] * Xi[t];
                    Ai[t] += kr[t] * Xi[t] + ki[t] * Xr[t];
                }
            }
            irfft_packed(Ar, Ai, twr, twi, zr, zi);
            // convolution sample p sits in zr[p/2] (p even) / zi[p/2] (p odd)
            foreach (w; 0 .. tEnd - bnd)
            {
                immutable size_t p = sS + w;
                immutable double v = (p & 1) ? zi[p >> 1] : zr[p >> 1];
                Gacc[cast(size_t)(bnd + w) * tdim + a] += v * inv;
            }
        }
    }

    // Fill kr/ki[0 .. S] with the real-FFT bins of lagB's (a, c) lag segment
    // 1 .. min(2S-1, Q-1), zero-padded to length 2S. Shared by the cache
    // build and the uncached fallback so both produce bit-identical spectra.
    private void kernelSpectrum(int S, int a, int c,
                                const(double)[] twr, const(double)[] twi,
                                double[] kr, double[] ki)
    {
        immutable size_t sS = cast(size_t) S;
        if (zre.length < sS)
        {
            zre.length = sS;
            zim.length = sS;
        }
        auto zr = zre[0 .. sS];
        auto zi = zim[0 .. sS];
        zr[] = 0.0;
        zi[] = 0.0;
        immutable int lagTop = (2 * S - 1 < Q - 1) ? 2 * S - 1 : Q - 1;
        immutable size_t bs = cast(size_t) tdim * sdim;
        immutable size_t off = cast(size_t) a * sdim + c;
        foreach (v; 1 .. lagTop + 1)
        {
            immutable double val = lagB[cast(size_t) v * bs + off];
            if (v & 1)
                zi[v >> 1] = val;
            else
                zr[v >> 1] = val;
        }
        rfft_packed(zr, zi, twr, twi, kr, ki);
    }

    // Level index of merge size S: S = FFT_CUTOFF << levelIndex(S).
    private int levelIndex(int S)
    {
        int li = 0;
        for (int lvl = FFT_CUTOFF; lvl < S; lvl <<= 1)
            ++li;
        return li;
    }

    // cos/sin(2 pi k / 2S), k = 0 .. S, for level li's real-FFT untangling;
    // built from direct cos/sin on the level's first merge and reused.
    private void levelTwiddles(int li, int S, out const(double)[] twr,
                               out const(double)[] twi)
    {
        if (li >= cast(int) twCos.length)
        {
            twCos.length = li + 1;
            twSin.length = li + 1;
        }
        if (twCos[li] is null)
        {
            immutable size_t nb = cast(size_t) S + 1;
            auto cr = new double[nb];
            auto sr = new double[nb];
            immutable double step = PI / cast(double) S;   // 2 pi / (2S)
            foreach (k; 0 .. nb)
            {
                cr[k] = cos(step * cast(double) k);
                sr[k] = sin(step * cast(double) k);
            }
            twCos[li] = cr;
            twSin[li] = sr;
        }
        twr = twCos[li];
        twi = twSin[li];
    }

    // Build the level-li spectra cache on the level's first merge, if the
    // budget allows. Returns true iff the cache for this level is usable.
    private bool ensureKernelCache(int li, int S)
    {
        if (li >= cast(int) kcacheTried.length)
        {
            kcacheRe.length = li + 1;
            kcacheIm.length = li + 1;
            kcacheTried.length = li + 1;
        }
        if (kcacheTried[li])
            return kcacheRe[li] !is null;
        kcacheTried[li] = true;
        immutable size_t nb = cast(size_t) S + 1;
        immutable size_t need = cast(size_t) tdim * sdim * nb;
        if (2 * need > kcacheBudget)
            return false;
        kcacheBudget -= 2 * need;
        const(double)[] twr, twi;
        levelTwiddles(li, S, twr, twi);
        auto re = new double[need];
        auto im = new double[need];
        foreach (a; 0 .. tdim)
            foreach (c; 0 .. sdim)
            {
                immutable size_t off = (cast(size_t) a * sdim + c) * nb;
                kernelSpectrum(S, a, c, twr, twi, re[off .. off + nb],
                               im[off .. off + nb]);
            }
        kcacheRe[li] = re;
        kcacheIm[li] = im;
        return true;
    }
}

// Fixed-size wrapper for the compile-time drivers: same implementation, with
// value-typed push/G matching the stack-array style of the ct code.
struct ToeplitzHistory(int tdim_, int sdim_)
{
    ToeplitzHistoryRT core;
    alias core this;

    void initialize(int Q_)
    {
        core.initialize(Q_, tdim_, sdim_);
    }

    double[tdim_] G(int n)
    {
        double[tdim_] outv;
        outv[] = core.G(n)[];
        return outv;
    }

    void push(const double[sdim_] s)
    {
        core.push(s[]);
    }
}
