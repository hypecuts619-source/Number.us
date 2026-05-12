import { ShieldCheck } from 'lucide-react';

interface RegulatoryBadgeProps {
  bankName: string;
}

export default function RegulatoryBadge({ bankName }: RegulatoryBadgeProps) {
  const isCreditUnion = /Credit Union|CU|FCU/i.test(bankName);
  const agency = isCreditUnion ? 'NCUA' : 'FDIC';
  const agencyFullName = isCreditUnion ? 'National Credit Union Administration' : 'Federal Deposit Insurance Corporation';
  
  return (
    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 p-4 rounded-2xl mb-8 group hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors shadow-sm">
      <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl ${isCreditUnion ? 'bg-blue-600 shadow-blue-200 dark:shadow-none' : 'bg-[#002d72] shadow-blue-900/20 dark:shadow-none'} text-white font-black text-sm shadow-lg transform group-hover:scale-105 transition-transform`}>
        {agency}
      </div>
      <div>
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Verified Status</span>
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
        </div>
        <p className="text-base font-bold text-slate-900 dark:text-white leading-tight">
          Official {agency} Insured Member
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          Regulatory Oversight by the {agencyFullName}
        </p>
      </div>
    </div>
  );
}
