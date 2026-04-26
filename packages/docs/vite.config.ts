import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, '../../docs'),
    emptyOutDir: false,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        forms: resolve(__dirname, 'forms.html'),
        display: resolve(__dirname, 'display.html'),
        layout: resolve(__dirname, 'layout.html'),
        product: resolve(__dirname, 'product.html'),
        overlays: resolve(__dirname, 'overlays.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        charts: resolve(__dirname, 'charts.html'),
      },
    },
  },
});
