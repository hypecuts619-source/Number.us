import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DataIntegrityBadge() {
  return (
    <Link 
      to="/about-us#verification"
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors shadow-sm"
    >
      <ShieldCheck className="w-4 h-4" />
      Data Integrity Verified
    </Link>
  );
}
