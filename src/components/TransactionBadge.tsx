import React from 'react';
import { cn } from '../lib/utils';
import { BadgeCheck, ArrowLeftRight, Building2 } from 'lucide-react';

export default function TransactionBadge({ type, size = 'md' }: { type: string, size?: 'sm' | 'md' }) {
  const t = type.toUpperCase();
  
  if (t === 'BOTH') {
    return (
      <span className={cn(
        "inline-flex items-center gap-1 font-semibold rounded-full border",
        size === 'sm' ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
      )}>
        <ArrowLeftRight className={size === 'sm' ? "w-3 h-3" : "w-3.5 h-3.5"} />
        ACH & Wire
      </span>
    );
  }
  
  if (t === 'ACH') {
    return (
      <span className={cn(
        "inline-flex items-center gap-1 font-semibold rounded-full border",
        size === 'sm' ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
      )}>
        <BadgeCheck className={size === 'sm' ? "w-3 h-3" : "w-3.5 h-3.5"} />
        ACH Only
      </span>
    );
  }

  if (t === 'WIRE') {
    return (
      <span className={cn(
        "inline-flex items-center gap-1 font-semibold rounded-full border",
        size === 'sm' ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800"
      )}>
        <Building2 className={size === 'sm' ? "w-3 h-3" : "w-3.5 h-3.5"} />
        Wire Only
      </span>
    );
  }

  // Fallback for missing/unknown type
  return (
    <span className={cn(
      "inline-flex items-center font-medium rounded-full border",
      size === 'sm' ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
      "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
    )}>
      Unknown
    </span>
  );
}
