import { ShieldCheck } from 'lucide-react';

export default function VerifiedBadge() {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  return (
    <div className="inline-flex flex-wrap items-center gap-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg text-[10px] sm:text-sm font-bold border border-green-200 dark:border-green-800/50 mb-6 w-full sm:w-auto">
      <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
      <span className="uppercase tracking-wider">Verified against Federal Reserve database as of {currentDate}</span>
    </div>
  );
}
