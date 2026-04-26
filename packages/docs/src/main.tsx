import '@roar-workspace/ui/styles.css';
import { Toaster } from '@roar-workspace/ui/overlays';
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { palettes, type Page, type Palette, type Theme } from './docs-data';
import { Shell } from './docs-shell';
import { renderPage } from './pages';
import './index.css';

function readTheme(): Theme {
  const saved = localStorage.getItem('rs-theme');
  return saved === 'dark' || saved === 'light' ? saved : 'light';
}

function readPalette(): Palette {
  const saved = localStorage.getItem('rs-palette');
  return palettes.includes(saved as Palette) ? (saved as Palette) : 'neutral';
}

function App() {
  const page = (document.body.dataset.page || 'components') as Page;
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [palette, setPalette] = useState<Palette>(readPalette);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('rs-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.palette = palette;
    localStorage.setItem('rs-palette', palette);
  }, [palette]);

  return (
    <>
      <Shell
        page={page}
        theme={theme}
        palette={palette}
        onThemeChange={setTheme}
        onPaletteChange={setPalette}
      >
        {renderPage(page)}
      </Shell>
      <Toaster richColors closeButton position="top-right" />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
