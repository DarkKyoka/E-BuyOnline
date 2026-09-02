import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        categories: resolve(import.meta.dirname, 'categories.html'),
        products: resolve(import.meta.dirname, 'products.html')
      }
    }
  }
});
