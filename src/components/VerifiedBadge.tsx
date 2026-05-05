import { ShieldCheck } from 'lucide-react';

export default function VerifiedBadge() {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  return (
    <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-md text-sm font-medium border border-green-200 dark:border-green-800/50 mb-6">
      <ShieldCheck className="w-4 h-4" />
      <span>Verified against Federal Reserve database as of {currentDate}</span>
    </div>
  );
}
