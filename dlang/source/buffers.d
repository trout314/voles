// C-heap arrays that replace GC-allocated `new T[n]` and `.length =` buffers.
//
// The extension must not allocate from the D GC: a collection has to suspend
// and scan every thread registered with druntime, and the Python threads that
// call in are not druntime's own (see docs/dev/nogc-refactor-plan.md).
// HeapArray!T is a non-copyable owner of a malloc'd block, freed by its
// destructor, that converts to a T[] slice through `alias this`, so code
// written against dynamic arrays keeps working unchanged.
//
// Initialization matches the GC arrays it replaces: new elements are T.init
// (NaN for double, 0 for integers, false for bool), both from the
// constructor and when `length` grows, and existing elements are kept. That
// keeps every result bitwise identical to the GC version.
module buffers;

import core.lifetime : move;
import core.stdc.stdlib : free, realloc;
import core.stdc.string : memset;

struct HeapArray(T)
{
    private T* ptr_ = null;
    private size_t len_ = 0;

    // Owning, so copying would double-free; moves (rvalue assignment,
    // core.lifetime.move) are fine.
    @disable this(this);

    this(size_t n) nothrow @nogc
    {
        length = n;
    }

    ~this() nothrow @nogc
    {
        clear();
    }

    @property size_t length() const nothrow @nogc @safe
    {
        return len_;
    }

    // Same semantics as setting a dynamic array's length: shrinking drops
    // (and destroys) the tail, growing keeps the contents and fills the new
    // elements with T.init.
    @property void length(size_t n) nothrow @nogc
    {
        if (n == len_)
            return;
        if (n == 0)
        {
            clear();
            return;
        }
        static if (__traits(hasMember, T, "__xdtor"))
            if (n < len_)
                foreach (ref e; ptr_[n .. len_])
                    destroy(e);
        auto p = cast(T*) realloc(ptr_, n * T.sizeof);
        if (p is null)
        {
            import core.exception : onOutOfMemoryError;
            onOutOfMemoryError();
        }
        if (n > len_)
            initTail(p + len_, n - len_);
        ptr_ = p;
        len_ = n;
    }

    // Release the block; afterwards the array is empty (and `is null`-like:
    // ptr is null).
    void clear() nothrow @nogc
    {
        if (ptr_ is null)
            return;
        static if (__traits(hasMember, T, "__xdtor"))
            foreach (ref e; ptr_[0 .. len_])
                destroy(e);
        free(ptr_);
        ptr_ = null;
        len_ = 0;
    }

    inout(T)[] slice() inout nothrow @nogc return
    {
        return ptr_[0 .. len_];
    }

    alias slice this;

    // Element assignment for non-copyable element types (nested arrays):
    // moves `value` into slot i, destroying what was there.
    static if (!__traits(isCopyable, T))
    void put(size_t i, ref T value) nothrow @nogc
    {
        assert(i < len_);
        move(value, ptr_[i]);
    }

    private static void initTail(T* p, size_t n) nothrow @nogc
    {
        static if (__traits(isZeroInit, T))
            memset(p, 0, n * T.sizeof);
        else
        {
            static immutable T init_ = T.init;
            foreach (i; 0 .. n)
                (cast(ubyte*) (p + i))[0 .. T.sizeof] =
                    (cast(const(ubyte)*) &init_)[0 .. T.sizeof];
        }
    }
}
