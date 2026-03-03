module utility;

import core.bitop : popcnt;
import std.algorithm : each, fold;
import std.range : array, empty, front, popFront, iota, isInputRange, walkLength;

bool hasOneAtBit(uint x, size_t pos) pure nothrow @nogc @safe
{
    assert(pos < uint.sizeof * 8, "bad bit position");
    return ((1 << pos) & x) > 0;
}

private auto subsetFromUint(R)(R set, uint whichToKeep) if (isInputRange!R)
{
    assert(whichToKeep < (1 << set.walkLength),
            "1 bits found in positions not corresponsing to elements in set");

    static struct SubsetFromUintRange
    {
        R set_;
        uint whichToKeep_;

        void advance()()
        {
            while (!this.empty && !whichToKeep_.hasOneAtBit(0))
            {
                assert(!set_.empty);
                set_.popFront;
                whichToKeep_ >>= 1;
            }
        }

        this(R s, uint w)
        {
            set_ = s;
            whichToKeep_ = w;
            this.advance;
        }

        auto front()
        {
            assert(!this.empty,
                "called popFront on an empty SubsetFromUintRange");
            assert(!set_.empty);
            return set_.front;
        }

        auto popFront()
        {
            assert(!this.empty,
                "called popFront on an empty SubsetFromUintRange");
            assert(!set_.empty);
            set_.popFront;
            whichToKeep_ >>= 1;
            this.advance;
        }

        auto empty()
        {
            return whichToKeep_ == 0;
        }
    }

    return SubsetFromUintRange(set, whichToKeep);
}

auto subsetsOfSize(R)(R set, int subsetSize) if (isInputRange!R)
{
    immutable setSize = set.walkLength;

    assert(subsetSize >= 0, "subset size must be non-negative");
    assert(subsetSize <= setSize, "subset size must be at most the size of the set");
    assert(setSize <= 31, "subset size must be at most 31");

    static struct SubsetsOfSizeRange
    {
    private:
        uint whichToKeep;
        R set_;
    public:
        auto front()
        {
            assert(!this.empty);
            return set_.subsetFromUint(whichToKeep);
        }

        auto popFront()
        {
            assert(!this.empty);

            immutable len = set_.walkLength;
            immutable subLen = whichToKeep.popcnt;
            immutable uint lastToKeep = ((1 << subLen) - 1) << (len - subLen);

            if (whichToKeep == lastToKeep)
            {
                whichToKeep = 1 << 31;
                return;
            }

            auto currentPos = len - 1;
            if (whichToKeep.hasOneAtBit(cast(size_t) currentPos))
            {
                while (whichToKeep.hasOneAtBit(cast(size_t) currentPos))
                {
                    --currentPos;
                }
                assert(currentPos > 0 && currentPos < len);
                assert(!whichToKeep.hasOneAtBit(cast(size_t) currentPos));

                immutable numOnesSeen = len - currentPos - 1;

                while (!whichToKeep.hasOneAtBit(cast(size_t) currentPos))
                {
                    --currentPos;
                }
                assert(currentPos >= 0 && currentPos < len);
                assert(whichToKeep.hasOneAtBit(cast(size_t) currentPos));

                whichToKeep &= ~(1 << currentPos);

                foreach (pos; iota(currentPos + 1, currentPos + 2 + numOnesSeen))
                    whichToKeep |= (1 << cast(size_t) pos);

                foreach (pos; iota(currentPos + 2 + numOnesSeen, len))
                    whichToKeep &= ~(1 << cast(size_t) pos);
            }
            else
            {
                assert(!whichToKeep.hasOneAtBit(cast(size_t) currentPos));

                while (!whichToKeep.hasOneAtBit(cast(size_t) currentPos))
                {
                    --currentPos;
                }
                assert(currentPos >= 0 && currentPos < len);
                assert(whichToKeep.hasOneAtBit(cast(size_t) currentPos));

                whichToKeep &= ~(1 << currentPos);
                whichToKeep |= (1 << (currentPos + 1));
            }
        }

        auto empty()
        {
            return whichToKeep.hasOneAtBit(31);
        }
    }

    static assert(isInputRange!SubsetsOfSizeRange);

    return SubsetsOfSizeRange((1 << subsetSize) - 1, set);
}

ulong factorial(ulong n) pure nothrow @nogc @safe
{
    assert(n <= 20, "factorial only accepts arguments up to 20");
    return n == 0 ? 1 : iota(1UL, n + 1).fold!((a, b) => a * b)(1UL);
}

ulong binomial(ulong n, ulong k) pure nothrow @nogc @safe
{
    assert(n <= 20, "binomial only accepts arguments up to 20");
    assert(k <= n, "bad binomial input");
    return (factorial(n) / factorial(k)) / factorial(n - k);
}
