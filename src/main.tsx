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

  // We wait for the data to be fetched before hydrating so that we don't get a hydration mismatch!
  // The server renders the full UI as if the data is present. By waiting for the fetch, 
  // we align the client state with the server state before React mounts.
  if (!initialData) {
    try {
      const res = await fetch('/data/routing.json');
      initialData = await res.json();
      (window as any).__ROUTING_DATA__ = initialData;
    } catch (e) {
      console.error('Failed to load routing data before hydration', e);
    }
  }

  hydrateRoot(document.getElementById('root')!,
    <StrictMode>
      <App initialData={initialData} />
    </StrictMode>
  );
}

bootstrap();
