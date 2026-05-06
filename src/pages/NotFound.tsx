import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 min-h-[70vh]">
      <SEO 
        title="Page Not Found - USRoutingNumber.com" 
        description="We couldn't find the page you're looking for. Search for a bank or routing number." 
        canonicalUrl="/404"
      />
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-6xl font-black text-slate-900 dark:text-white mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[#1e3a5f] dark:text-blue-300 mb-6">Page Not Found</h2>
        
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          The routing number or page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="w-full max-w-xl mx-auto mb-10 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Try searching instead:</h3>
          <SearchBar />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/" 
            className="px-6 py-3 bg-[#1e3a5f] hover:bg-blue-800 text-white rounded-xl font-semibold transition-colors"
          >
            Go to Homepage
          </Link>
          <Link 
            to="/major-banks" 
            className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-semibold transition-colors"
          >
            Browse Major Banks
          </Link>
        </div>
      </div>
    </div>
  );
}
