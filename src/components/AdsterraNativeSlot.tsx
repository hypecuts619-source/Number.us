import React, { useEffect, useRef } from 'react';

interface AdsterraNativeSlotProps {
  zoneId: string;
  format: 'horizontal' | 'rectangle';
  uniqueId?: string;
}

export default function AdsterraNativeSlot({ zoneId, format, uniqueId = '1' }: AdsterraNativeSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing content to prevent duplicates on re-render
    containerRef.current.innerHTML = '';
    
    // Create the required container
    const adContainer = document.createElement('div');
    adContainer.id = `container-${zoneId}`;
    containerRef.current.appendChild(adContainer);

    // Create the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.dataset.cfasync = 'false';
    script.src = `//pl29558649.effectivecpmnetwork.com/${zoneId}/invoke.js`;
    
    // Append script to our container
    containerRef.current.appendChild(script);
    
    return () => {
      if (containerRef.current) {
         containerRef.current.innerHTML = '';
      }
    };
  }, [zoneId, uniqueId]);

  const containerClasses = format === 'horizontal'
    ? 'w-full max-w-[728px] min-h-[90px]'
    : 'w-full max-w-[300px] min-h-[250px]';

  return (
    <div className={`relative flex flex-col items-center justify-center my-6 mx-auto bg-slate-50/50 dark:bg-slate-800/10 border border-slate-100 dark:border-slate-800/50 rounded-xl py-2 ${containerClasses}`}>
      <span className="text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 select-none pointer-events-none text-center">
        Sponsored Link
      </span>
      {/* The Adsterra script uses document.write or looks for element by ID within its execution context */}
      <div ref={containerRef} className="w-full flex justify-center items-center overflow-hidden" />
    </div>
  );
}
