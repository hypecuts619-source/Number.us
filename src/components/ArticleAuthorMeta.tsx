import React from 'react';
import { Clock, User, ShieldCheck } from 'lucide-react';

interface Props {
  date: string;
  readTime: string;
  author?: string;
  reviewer?: string;
}

export default function ArticleAuthorMeta({ 
  date, 
  readTime, 
  author = "USRoutingNumber Editorial Team",
  reviewer = "Financial Review Board"
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-4 text-sm font-medium text-slate-500 my-6 pb-6 border-b border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
        <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <span className="text-slate-700 dark:text-slate-300">By {author}</span>
      </div>
      <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800/50">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <span className="text-emerald-800 dark:text-emerald-300">Fact Checked by {reviewer}</span>
      </div>
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>Updated: {date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  );
}
