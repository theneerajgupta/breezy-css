import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/vite.ts',
    'src/webpack.ts',
    'src/rollup.ts',
    'src/esbuild.ts',
    'src/auto.ts',
    'src/runtime.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    'react',
    '@babel/parser',
    '@babel/traverse',
    '@babel/generator',
    '@babel/types',
    '@babel/core',
  ],
});
