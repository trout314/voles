# Security Policy

## Scope

This library performs numerical computation on caller-supplied arrays. There are no
network calls, no file I/O, no authentication, and no persistent state beyond the
calling process's memory.

The main realistic attack surface is **malicious input arrays** passed to the D
extension via ctypes. The D code does not perform bounds checking beyond what is
enforced by the Python layer, so callers are responsible for validating inputs before
passing them to the solvers.

Out of scope: vulnerabilities in NumPy, Numba, or SciPy dependencies — report those
to their respective projects.
