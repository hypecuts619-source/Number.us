import React from 'react';

interface AdsterraNativeSlotProps {
  zoneId: string;
  format: 'horizontal' | 'rectangle';
  uniqueId?: string;
}

export default function AdsterraNativeSlot({ zoneId, format, uniqueId = '1' }: AdsterraNativeSlotProps) {
  const containerClasses = format === 'horizontal'
    ? 'w-full max-w-[728px] h-[90px] md:h-[120px]'
    : 'w-full max-w-[300px] h-[250px] md:h-[300px]';

  const iframeSrcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body, html { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; overflow: hidden; height: 100%; width: 100%; }
        </style>
      </head>
      <body>
        <script async="async" data-cfasync="false" src="https://pl29558649.effectivecpmnetwork.com/${zoneId}/invoke.js"></script>
        <div id="container-${zoneId}"></div>
      </body>
    </html>
  `;

  return (
    <div className={`relative flex flex-col items-center justify-center my-6 mx-auto bg-slate-50/50 dark:bg-slate-800/10 border border-slate-100 dark:border-slate-800/50 rounded-xl py-2 ${containerClasses}`}>
      <span className="text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 select-none pointer-events-none text-center">
        Sponsored Link
      </span>
      <iframe 
        title={`ad-${zoneId}-${uniqueId}`}
        srcDoc={iframeSrcDoc}
        className="w-full h-full border-none outline-none overflow-hidden"
        scrolling="no"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
