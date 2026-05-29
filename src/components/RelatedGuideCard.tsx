import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

interface RelatedGuideCardProps {
  to: string;
  title: string;
  description: string;
}

export default function RelatedGuideCard({ to, title, description }: RelatedGuideCardProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 my-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800/50 group">
      <div className="bg-blue-100 dark:bg-blue-900/40 p-3.5 rounded-xl shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
      </div>
      <div className="flex-1">
        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
          Related Reading
        </h4>
        <Link to={to} className="text-lg font-extrabold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group-hover:underline decoration-blue-500/30 underline-offset-4">
          {title}
        </Link>
        <p className="text-slate-600 dark:text-slate-300 mt-1.5 text-sm font-medium leading-relaxed">
          {description}
        </p>
      </div>
      <Link to={to} className="hidden sm:flex shrink-0 items-center justify-center bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 w-10 h-10 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-all">
        <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
