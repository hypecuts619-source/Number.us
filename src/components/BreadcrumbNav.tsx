import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function BreadcrumbNav({ crumbs }: { crumbs: { name: string; url: string }[] }) {
  return (
    <nav className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 hover:underline font-medium shrink-0">
        Home
      </Link>
      {crumbs.map((crumb, idx) => (
        <div key={idx} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-2 text-slate-300 dark:text-slate-600 flex-shrink-0" />
          {idx === crumbs.length - 1 ? (
            <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[150px] sm:max-w-xs block">{crumb.name}</span>
          ) : (
            <Link to={crumb.url} className="hover:text-[#1e3a5f] dark:hover:text-blue-400 hover:underline font-medium truncate max-w-[150px] sm:max-w-xs block">
              {crumb.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
