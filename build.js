const { build } = require('esbuild');

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true
};

build({
  ...shared,
  outdir: 'lib',
  format: 'cjs'
});

build({
  ...shared,
  outfile: 'lib/index.esm.js',
  format: 'esm',
});
