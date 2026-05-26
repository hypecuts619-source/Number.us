import React, { useEffect, useRef } from 'react';

interface AdsterraNativeSlotProps {
  zoneId: string;
  format: 'horizontal' | 'rectangle';
}

export default function AdsterraNativeSlot({ zoneId, format }: AdsterraNativeSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptId = `adsterra-script-${zoneId}`;

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Check if script already exists to avoid duplicates in strict mode
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `//pl29558649.effectivecpmnetwork.com/${zoneId}/invoke.js`;
    script.setAttribute('data-cfasync', 'false');
    
    // Mount the script into the exact container where it belongs
    containerRef.current.appendChild(script);

    return () => {
      // Optional cleanup if navigation occurs
      if (containerRef.current && script.parentNode === containerRef.current) {
        containerRef.current.removeChild(script);
      }
    };
  }, [zoneId, scriptId]);

  const containerClasses = format === 'horizontal'
    ? 'w-full max-w-[728px]'
    : 'w-full max-w-[300px]';

  return (
    <div className={`relative flex flex-col items-center justify-center my-6 mx-auto bg-slate-50/50 dark:bg-slate-800/10 border border-slate-100 dark:border-slate-800/50 rounded-xl py-2 ${containerClasses}`}>
      <span className="text-[9px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 select-none pointer-events-none text-center">
        Sponsored Link
      </span>
      <div 
        id={`container-${zoneId}`} 
        ref={containerRef} 
        className="w-full flex justify-center items-center" 
      />
    </div>
  );
}
