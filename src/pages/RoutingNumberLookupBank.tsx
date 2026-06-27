import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { getRoutingByBank } from '../lib/getData';
import NotFound from './NotFound';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';

export default function RoutingNumberLookupBank() {
  const { bankSlug } = useParams<{ bankSlug: string }>();
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const bankData = useMemo(() => {
    if (!bankSlug) return [];
    return getRoutingByBank(bankSlug);
  }, [bankSlug]);

  if (!bankData || bankData.length === 0) {
    return <NotFound />;
  }

  const bankName = bankData[0].bank_name;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().replace(/\D/g, '');
    if (query.length === 9) {
      navigate(`/lookup/${query}`);
    } else if (searchInput.trim().length > 0) {
      navigate(`/?q=${encodeURIComponent(searchInput)}`);
    }
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${bankName} Routing Number Lookup Tool`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "offers": { "@type": "Offer", "price": "0" },
    "featureList": `Verify routing numbers for ${bankName}, Reverse routing lookup`
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SEO 
        title={`${bankName} Routing Number Lookup Tool`}
        description={`Reverse lookup and verify any routing number for ${bankName}. Instantly check the branch location, city, and validity of ${bankName} ABA codes.`}
        canonicalUrl={`/routing-number-lookup/${bankSlug}`}
      >
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </SEO>
      
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
          {bankName} Routing Number Lookup
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
          Verify any 9-digit ABA routing number to ensure it belongs to a valid {bankName} branch.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-4 sm:p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 mb-8 relative overflow-hidden"
      >
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 blur-2xl -z-10 opacity-50" />
        
        <form onSubmit={handleSearch} className="relative z-10">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 text-center sm:text-left">
            Verify a {bankName} Routing Number
          </label>
          <div className="relative flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
              <input 
                type="text"
                pattern="\d*"
                inputMode="numeric"
                maxLength={9}
                className="w-full pl-12 pr-4 py-4 sm:py-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-xl sm:text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all dark:text-white text-center sm:text-left"
                placeholder="e.g. 122000661"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="w-full sm:w-auto px-8 py-4 sm:py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-colors text-lg"
            >
              Search
            </button>
          </div>
        </form>
      </motion.div>

      <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="routingnumberlookup-bank-hero" />
      </div>

      <div className="max-w-4xl mx-auto prose prose-lg md:prose-xl prose-slate dark:prose-invert">
        <h2>Why use a dedicated lookup for {bankName}?</h2>
        <p>
          Large institutions like {bankName} have many different routing transit numbers across various states and for different types of transactions (e.g. ACH vs. Wire). By using a dedicated lookup tool, you can confirm whether the ABA number you've been given is actively maintained by {bankName} and identify which regional branch it connects to.
        </p>
      </div>
    </div>
  );
}
