import { StrictMode } from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import App from './App';
import { setSSRData, setSSRSummary } from './lib/getData';

export function render(url: string, routingData: any, routingSummary: any = null) {
  const helmetContext = {} as any;
  setSSRData(routingData);
  setSSRSummary(routingSummary);

  const html = renderToString(
    <StrictMode>
      <App 
        initialData={routingData} 
        RouterComponent={StaticRouter} 
        routerProps={{ location: url }} 
        helmetContext={helmetContext}
      />
    </StrictMode>
  );

  const { helmet } = helmetContext;

  return { html, helmet, helmetContext };
}
