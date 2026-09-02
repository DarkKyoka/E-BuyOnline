import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(import.meta.dirname, 'pages'),
  publicDir: resolve(import.meta.dirname, 'public'),
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'pages/index.html'),
        categories: resolve(import.meta.dirname, 'pages/categories.html'),
        products: resolve(import.meta.dirname, 'pages/products.html'),
      },
    },
  },
});
