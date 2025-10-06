import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      name: '@hcmus-toolkit/core',
      entry: resolve(__dirname, 'src/main.ts'),
    },
  },
  resolve: {
    alias: {
      src: resolve('src/'),
    },
  },
  plugins: [dts()],
});
