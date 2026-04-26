import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        forms: resolve(__dirname, 'src/forms.ts'),
        display: resolve(__dirname, 'src/display.ts'),
        layout: resolve(__dirname, 'src/layout.ts'),
        product: resolve(__dirname, 'src/product.ts'),
        overlays: resolve(__dirname, 'src/overlays.ts'),
        charts: resolve(__dirname, 'src/charts.ts'),
      },
      name: 'RoarWorkspaceUI',
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: (id) =>
        [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'clsx',
          'tailwind-merge',
          'class-variance-authority',
          'sonner',
          'recharts',
        ].includes(id) || id.startsWith('@radix-ui/'),
    },
  },
});
