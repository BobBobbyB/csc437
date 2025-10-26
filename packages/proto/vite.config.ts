import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: resolve(__dirname, 'public'),       // serve existing HTML as root
  build: {
    outDir: resolve(__dirname, 'dist'),     // build output
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
  // optional:
  resolve: {
    alias: {
      '/src': resolve(__dirname, 'src'),
    },
  },
});
