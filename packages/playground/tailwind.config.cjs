const path = require('node:path');

const uiEntry = require.resolve('@roar-workspace/ui');
const uiRoot = path.join(path.dirname(uiEntry), '..');
const uiDistGlob = path.join(uiRoot, 'dist', '**', '*.js').replace(/\\/g, '/');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@roar-workspace/ui/tailwind-preset')],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', uiDistGlob],
};
