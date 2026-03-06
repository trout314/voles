project('volterra-dlang', 'd', version: '0.1.0')

# Keep array bounds checking on even in release builds.
# Without this, a future --d-release flag or -boundscheck=off could silently
# disable it and turn out-of-bounds accesses into undefined behaviour.
# Note: -boundscheck=on is an ldc2-specific flag; the project requires ldc2.
add_project_arguments('-boundscheck=on', language: 'd')

shared_library(
  'volterra_dlang',
  ['source/volterra_solvers.d', 'source/utility.d'],
  include_directories: include_directories('source'),
  link_args: ['-link-defaultlib-shared=false'],
  name_prefix: '',
  install: false,
)
