import type { Config } from 'tailwindcss';

/** Extend with Roar tokens in Phase 2 (map from docs/design-system.css). */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
