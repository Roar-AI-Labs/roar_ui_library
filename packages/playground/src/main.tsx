import '@roar-workspace/ui/styles.css';
import { Toaster } from '@roar-workspace/ui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster richColors closeButton position="top-right" />
  </StrictMode>,
);
