import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export default function Breadcrumbs({ crumbs }: { crumbs: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap overflow-x-auto pb-2 scrollbar-none" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 md:space-x-2">
        <li>
          <Link to="/" className="inline-flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.url} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 md:mx-2 text-slate-300 dark:text-slate-600 shrink-0" />
              {isLast ? (
                <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[150px] sm:max-w-xs" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link to={crumb.url} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate max-w-[150px] sm:max-w-xs">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
