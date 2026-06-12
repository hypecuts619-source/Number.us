/// <reference types="vite-plugin-pwa/client" />
import {StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// PWA Registration
import { registerSW } from 'virtual:pwa-register';

if ('serviceWorker' in navigator) {
  registerSW({ immediate: true });
}

async function bootstrap() {
  let initialData = (window as any).__ROUTING_DATA__;

  // Unified SSR Data Integration Protocol
  // Read from window synchronously. The edge worker will bake this in.
  // We only fetch in development mode to simulate edge injection.
  if (!initialData && import.meta.env.DEV) {
    try {
      const res = await fetch('/data/routing.json');
      initialData = await res.json();
      (window as any).__ROUTING_DATA__ = initialData;
    } catch (e) {
      console.error('DEV ONLY: Failed to load routing data before hydration', e);
    }
  }

  hydrateRoot(document.getElementById('root')!,
    <StrictMode>
      <App initialData={initialData} />
    </StrictMode>
  );
}

bootstrap();
