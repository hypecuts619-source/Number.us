export default function AdUnit({ slot, className = "" }: { slot: string, className?: string }) {
  const isDesktopOnly = slot.includes('728x90');
  
  return (
    <div className={`my-8 bg-slate-50 border border-slate-200 rounded text-center items-center justify-center text-slate-400 text-sm ${isDesktopOnly ? 'hidden md:flex' : 'flex'} ${className}`}>
      {/* 
        TODO: Replace with actual AdSense code in production.
        Example: 
        <ins className="adsbygoogle"
             style={{ display: "block" }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slot}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      */}
      <div className="flex flex-col items-center justify-center p-4">
        <span className="uppercase tracking-widest text-xs font-semibold mb-1">Advertisement</span>
        <span className="font-mono">{slot}</span>
      </div>
    </div>
  );
}
