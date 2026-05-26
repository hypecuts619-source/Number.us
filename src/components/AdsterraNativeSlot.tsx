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
    ? 'min-h-[90px] w-full max-w-[728px] mx-auto'
    : 'min-h-[250px] w-full max-w-[300px] mx-auto';

  return (
    <div className={`relative flex flex-col items-center justify-center my-6 ${containerClasses}`}>
      <span className="text-[9px] uppercase tracking-widest text-slate-300 dark:text-slate-600 mb-1 select-none pointer-events-none">
        Sponsored Link
      </span>
      <div 
        id={`container-${zoneId}`} 
        ref={containerRef} 
        className="w-full h-full flex justify-center items-center overflow-hidden" 
      />
    </div>
  );
}
