import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { getStateFullName } from '../lib/getData';
import { generateSlug } from '../lib/generateSlug';
import data from '../data/routing.json';
import AdUnit from '../components/AdUnit';

export default function StateBankList() {
  const { state } = useParams<{ state: string }>();
  const [searchTerm, setSearchTerm] = useState('');

  const stateFullName = state ? getStateFullName(state.toUpperCase()) : '';

  const uniqueBanks = useMemo(() => {
    if (!state) return [];
    const stateBanks = data.filter(d => d.state.toLowerCase() === state.toLowerCase());
    const banks = new Set<string>();
    stateBanks.forEach(b => banks.add(b.bank_name));
    return Array.from(banks).sort();
  }, [state]);

  const filteredBanks = useMemo(() => {
    return uniqueBanks.filter(b => b.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [uniqueBanks, searchTerm]);

  if (!stateFullName || uniqueBanks.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">State Not Found</h1>
        <Link to="/states" className="text-blue-600 hover:underline">Return to State Directory</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <SEO 
        title={`Banks in ${stateFullName} (${state.toUpperCase()}) | USRoutingNumber.com`}
        description={`Find routing numbers for ${uniqueBanks.length} banks operating in ${stateFullName}. Search local branch routing codes for ACH and wire transfers.`}
        canonicalUrl={`/states/${state}`}
      />
      
      <BreadcrumbNav crumbs={[
        { name: 'States', url: '/states' },
        { name: stateFullName, url: `/states/${state}` }
      ]} />

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Banks in {stateFullName}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Showing {uniqueBanks.length} registered financial institutions with branch routing numbers in {stateFullName}.
        </p>
      </div>

      <div className="mb-8 relative max-w-xl">
        <input 
          type="text" 
          placeholder={`Search banks in ${stateFullName}...`}
          className="w-full px-5 py-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-lg transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <AdUnit slot="UNIT 1: Below H1, 728x90 leaderboard" className="my-8 min-h-[90px]" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBanks.map(bank => (
          <Link
            key={bank}
            to={`/routing-number/${generateSlug(bank)}/${state.toLowerCase()}`}
            className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:shadow-md transition-all flex items-center group"
          >
             <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600">{bank}</span>
          </Link>
        ))}
      </div>
      
      {filteredBanks.length === 0 && (
         <div className="text-center py-12 text-slate-500">
           No banks found matching "{searchTerm}" in {stateFullName}.
         </div>
      )}
    </div>
  );
}
