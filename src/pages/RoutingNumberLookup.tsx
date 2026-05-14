import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function RoutingNumberLookup() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().replace(/\D/g, '');
    if (query.length === 9) {
      navigate(`/lookup/${query}`);
    } else if (searchInput.trim().length > 0) {
      // If it's a name, we navigate to home to use the main search
      navigate(`/?q=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SEO 
        title="Routing Number Lookup & Bank Search Engine"
        description="Search our comprehensive database of Federal Reserve ABA routing numbers. Find your bank's routing number instantly by name or reverse lookup an existing number."
        canonicalUrl="/routing-number-lookup"
      />
      
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
          Routing Number Lookup
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Reverse lookup any 9-digit ABA routing number to verify the issuing bank, or search for your bank to find the correct number for direct deposit and wire transfers.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 mb-12 relative overflow-hidden"
      >
        {/* Decorative background blur */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 blur-2xl -z-10 opacity-50" />
        
        <form onSubmit={handleSearch} className="relative z-10">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Enter 9-Digit Routing Number or Bank Name
          </label>
          <div className="relative flex items-center">
            <Search className="absolute left-5 w-6 h-6 text-slate-400" />
            <input 
              type="text" 
              className="w-full pl-14 pr-32 py-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all dark:text-white"
              placeholder="e.g. 122000661 or Chase"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </motion.div>

      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-xl mb-6">
            <Search className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Reverse Lookup</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Have a routing number on a check or direct deposit form but aren't sure which bank it belongs to? Enter the 9-digit code above to instantly verify the bank name, branch city, state, and zip code.
          </p>
        </div>

        <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center rounded-xl mb-6">
            <MapPin className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">Browse By State</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Routing numbers are highly regional. A single national bank like Bank of America uses dozens of different routing numbers assigned geographically. 
          </p>
          <Link to="/states" className="text-blue-600 font-semibold hover:underline">
            View US Bank Directory &rarr;
          </Link>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white text-center">Helpful Resources</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/routing-number-validator" className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-5 hover:border-blue-500 transition-all flex items-center justify-between group no-underline">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white m-0 group-hover:text-blue-600 dark:group-hover:text-blue-400">Validate a Checksum</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0 mt-1">Check the ABA formula.</p>
            </div>
            <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
          <Link to="/what-is-a-routing-number" className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-5 hover:border-blue-500 transition-all flex items-center justify-between group no-underline">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white m-0 group-hover:text-blue-600 dark:group-hover:text-blue-400">What is a Routing Number?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0 mt-1">Read our complete guide to ABA codes.</p>
            </div>
            <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>
      </div>
      
    </div>
  );
}
