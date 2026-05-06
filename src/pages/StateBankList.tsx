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
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedZip, setSelectedZip] = useState('');

  const stateFullName = state ? getStateFullName(state.toUpperCase()) : '';

  const stateData = useMemo(() => {
    if (!state) return [];
    return data.filter(d => d.state.toLowerCase() === state.toLowerCase());
  }, [state]);

  const availableCities = useMemo(() => {
    const citySet = new Set<string>();
    stateData.forEach(d => {
      if (d.city) citySet.add(d.city);
    });
    return Array.from(citySet).sort();
  }, [stateData]);

  const availableZips = useMemo(() => {
    let zipsTemp = stateData;
    if (selectedCity) {
      zipsTemp = zipsTemp.filter(d => d.city === selectedCity);
    }
    const zipSet = new Set<string>();
    zipsTemp.forEach(d => {
      if (d.zip) zipSet.add(d.zip.split('-')[0]);
    });
    return Array.from(zipSet).sort();
  }, [stateData, selectedCity]);

  const uniqueBanks = useMemo(() => {
    let filtered = stateData;
    if (selectedCity) {
       filtered = filtered.filter(d => d.city === selectedCity);
    }
    if (selectedZip) {
       filtered = filtered.filter(d => d.zip && d.zip.split('-')[0] === selectedZip);
    }

    const banks = new Set<string>();
    filtered.forEach(b => banks.add(b.bank_name));
    return Array.from(banks).sort();
  }, [stateData, selectedCity, selectedZip]);

  const filteredBanks = useMemo(() => {
    return uniqueBanks.filter(b => b.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [uniqueBanks, searchTerm]);

  if (!stateFullName || stateData.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">State Not Found or No Banks Found</h1>
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

      <div className="mb-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-3">
            <input 
              type="text" 
              placeholder={`Search banks in ${stateFullName}...`}
              className="w-full px-5 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-span-1 md:col-span-1 border-t md:border-t-0 md:border-r border-slate-200 dark:border-slate-700 pt-4 md:pt-0 md:pr-4">
             <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Filter by City</label>
             <select
               value={selectedCity}
               onChange={(e) => {
                 setSelectedCity(e.target.value);
                 setSelectedZip('');
               }}
               className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white appearance-none"
             >
               <option value="">All Cities</option>
               {availableCities.map(city => (
                 <option key={city} value={city}>{city}</option>
               ))}
             </select>
          </div>
          <div className="col-span-1 md:col-span-1 border-t md:border-t-0 md:border-r border-slate-200 dark:border-slate-700 pt-4 md:pt-0 md:pr-4 md:pl-4">
             <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Branch ZIP Finder</label>
             <select
               value={selectedZip}
               onChange={(e) => setSelectedZip(e.target.value)}
               className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white appearance-none"
             >
               <option value="">All Zip Codes</option>
               {availableZips.map(zip => (
                 <option key={zip} value={zip}>{zip}</option>
               ))}
             </select>
          </div>
          <div className="col-span-1 md:col-span-1 pt-4 md:pt-0 md:pl-4 flex flex-col justify-end">
             <button
               onClick={() => {
                 setSearchTerm('');
                 setSelectedCity('');
                 setSelectedZip('');
               }}
               className="w-full px-4 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold rounded-xl transition-colors"
             >
               Clear Filters
             </button>
          </div>
        </div>
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
