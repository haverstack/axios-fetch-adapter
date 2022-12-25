const { build } = require('esbuild');
const { Generator } = require('npm-dts');

new Generator({
  entry: 'src/index.ts',
  output: 'lib/index.d.ts',
}).generate();

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
