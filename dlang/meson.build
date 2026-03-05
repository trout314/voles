project('volterra-dlang', 'd', version: '0.1.0')

shared_library(
  'volterra_dlang',
  ['source/volterra_solvers.d', 'source/utility.d'],
  include_directories: include_directories('source'),
  link_args: ['-link-defaultlib-shared=false'],
  name_prefix: '',
  install: false,
)
