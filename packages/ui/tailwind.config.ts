import { createRequire } from 'node:module';
import type { Config } from 'tailwindcss';

const require = createRequire(import.meta.url);

export default {
  presets: [require('./tailwind-preset.cjs')],
  content: ['./src/**/*.{ts,tsx}'],
} satisfies Config;
