import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { Clock } from 'lucide-react';

export default function RecentlyViewedWidget() {
  const { items } = useRecentlyViewed();

  if (items.length === 0) return null;

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 mt-8">
      <div className="flex items-center gap-2 mb-4 text-[#1e3a5f] dark:text-blue-300">
        <Clock className="w-5 h-5" />
        <h3 className="font-bold text-lg">Recently Viewed</h3>
      </div>
      <ul className="space-y-3">
        {items.map(item => (
          <li key={item.routingNumber}>
            <Link 
              to={`/lookup/${item.routingNumber}`}
              className="group block"
            >
              <div className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                {item.bankName}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {item.routingNumber}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
