const { build } = require('esbuild');

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true
};

build({
  ...shared,
  outdir: 'lib'
});

build({
  ...shared,
  outfile: 'lib/index.esm.js',
  format: 'esm',
});
