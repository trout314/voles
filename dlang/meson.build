project('volterra-dlang', 'd', version: '0.1.0', meson_version: '>=1.1')

# Keep array bounds checking on even in release builds.
# Without this, a future --d-release flag or -boundscheck=off could silently
# disable it and turn out-of-bounds accesses into undefined behaviour.
# Note: -boundscheck=on is an ldc2-specific flag; the project requires ldc2.
add_project_arguments('-boundscheck=on', language: 'd')

# LAPACK is optional — used for vector VIE-1 with d > max_d_compile.
# When found, the Have_lapack version flag enables the dgesv_ call path.
# Set -Dwith-lapack=disabled to force the pure-D lin_solve_rt fallback even
# when LAPACK is installed (used by CI to ensure the fallback stays tested).
lapack_dep = dependency('lapack', required: get_option('with-lapack'))
d_version_flags = []
lapack_link_args = []
if lapack_dep.found()
  d_version_flags += ['-d-version=Have_lapack']
  lapack_link_args += ['-llapack']
endif

lib = shared_library(
  'volterra_dlang',
  ['source/volterra_solvers.d', 'source/utility.d',
   'source/volterra_function_solvers.d'],
  include_directories: include_directories('source'),
  d_args: d_version_flags,
  link_args: ['-link-defaultlib-shared=false'] + lapack_link_args,
  name_prefix: '',
  install: false,
)

# Strip debug symbols on Linux to keep the .so well under GitHub's 100 MB limit.
# macOS strip does not support --strip-unneeded; the dylib is smaller there anyway.
if host_machine.system() == 'linux'
  strip = find_program('strip', required: false)
  if strip.found()
    custom_target(
      'strip-volterra_dlang',
      input: lib,
      output: 'volterra_dlang.so.stripped',
      command: [strip, '--strip-unneeded', '@INPUT@'],
      build_by_default: true,
    )
  endif
endif
