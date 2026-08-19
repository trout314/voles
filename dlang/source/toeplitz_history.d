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
// Small merges (S < FFT_CUTOFF) are done directly; large ones as circular
// convolutions of length 2S via a radix-2 FFT. Outputs are read from
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

    for (size_t len = 2; len <= n; len <<= 1)
    {
        immutable double ang = (inverse ? 2.0 : -2.0) * PI / cast(double) len;
        immutable double wr = cos(ang);
        immutable double wi = sin(ang);
        for (size_t base = 0; base < n; base += len)
        {
            double cr = 1.0;
            double ci = 0.0;
            immutable size_t half = len >> 1;
            foreach (k; 0 .. half)
            {
                immutable size_t a = base + k;
                immutable size_t b = a + half;
                immutable double xr = re[b] * cr - im[b] * ci;
                immutable double xi = re[b] * ci + im[b] * cr;
                re[b] = re[a] - xr;
                im[b] = im[a] - xi;
                re[a] += xr;
                im[a] += xi;
                immutable double ncr = cr * wr - ci * wi;
                ci = cr * wi + ci * wr;
                cr = ncr;
            }
        }
    }
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
    double[] xre, xim, kre, kim, accre, accim;

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
        if (S < FFT_CUTOFF)
            mergeDirect(bnd, S, tEnd);
        else
            mergeFFT(bnd, S, tEnd);
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
        immutable int L = 2 * S;
        immutable size_t sL = cast(size_t) L;
        if (xre.length < cast(size_t) sdim * sL)
        {
            xre.length = cast(size_t) sdim * sL;
            xim.length = cast(size_t) sdim * sL;
        }
        if (kre.length < sL)
        {
            kre.length = sL;
            kim.length = sL;
        }
        if (accre.length < cast(size_t) tdim * sL)
        {
            accre.length = cast(size_t) tdim * sL;
            accim.length = cast(size_t) tdim * sL;
        }

        // forward FFT of each source column (zero-padded to length L)
        foreach (c; 0 .. sdim)
        {
            auto re = xre[c * sL .. (c + 1) * sL];
            auto im = xim[c * sL .. (c + 1) * sL];
            re[] = 0.0;
            im[] = 0.0;
            foreach (u; 0 .. S)
                re[u] = srcs[cast(size_t)(bnd - S + u) * sdim + c];
            fft_radix2(re, im, false);
        }

        accre[0 .. cast(size_t) tdim * sL] = 0.0;
        accim[0 .. cast(size_t) tdim * sL] = 0.0;

        // per (a, c): FFT of the lag segment 1 .. 2S-1, multiply, accumulate
        foreach (a; 0 .. tdim)
        {
            auto Ar = accre[a * sL .. (a + 1) * sL];
            auto Ai = accim[a * sL .. (a + 1) * sL];
            foreach (c; 0 .. sdim)
            {
                auto kr = kre[0 .. sL];
                auto ki = kim[0 .. sL];
                kr[] = 0.0;
                ki[] = 0.0;
                immutable int lagTop = (2 * S - 1 < Q - 1) ? 2 * S - 1 : Q - 1;
                foreach (v; 1 .. lagTop + 1)
                    kr[v] = lagB[cast(size_t) v * tdim * sdim
                                 + cast(size_t) a * sdim + c];
                fft_radix2(kr, ki, false);
                auto Xr = xre[c * sL .. (c + 1) * sL];
                auto Xi = xim[c * sL .. (c + 1) * sL];
                foreach (t; 0 .. L)
                {
                    Ar[t] += kr[t] * Xr[t] - ki[t] * Xi[t];
                    Ai[t] += kr[t] * Xi[t] + ki[t] * Xr[t];
                }
            }
            fft_radix2(Ar, Ai, true);
            immutable double inv = 1.0 / L;
            foreach (w; 0 .. tEnd - bnd)
                Gacc[cast(size_t)(bnd + w) * tdim + a] += Ar[S + w] * inv;
        }
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
