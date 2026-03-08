# Security Policy

This library performs numerical computation on caller-supplied arrays. There are no
network calls, no file I/O, no authentication, and no persistent state beyond the
calling process's memory.

The main realistic attack surface is **malicious input arrays** passed to the D
extension via ctypes. The D extension is compiled with `-boundscheck=on` (ldc2),
so out-of-bounds array accesses in D code will raise a D `RangeError` rather than
silently reading or writing arbitrary memory. Callers are still responsible for
validating inputs (sizes, finite values, etc.) before passing them to the solvers.

Out of scope: vulnerabilities in NumPy, Numba, or SciPy dependencies — report those
to their respective projects.
