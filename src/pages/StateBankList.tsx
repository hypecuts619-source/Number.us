import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { getStateFullName, getAllRoutingData } from '../lib/getData';
import { generateSlug } from '../lib/generateSlug';

export default function StateBankList() {
  const { state } = useParams<{ state: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedZip, setSelectedZip] = useState('');

  const stateFullName = state ? getStateFullName(state.toUpperCase()) : '';

  const stateData = useMemo(() => {
    if (!state) return [];
    const data = getAllRoutingData();
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
        description={`Find routing numbers for banks operating in ${stateFullName}. Search local branch routing codes for ACH and wire transfers.`}
        canonicalUrl={`/states/${state}`}
      />
      
      <BreadcrumbNav crumbs={[
        { name: 'States', url: '/states' },
        { name: stateFullName, url: `/states/${state}` }
      ]} />

      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          {stateFullName} Bank Routing Numbers Directory (Federal Reserve 2026)
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Showing registered financial institutions with branch routing numbers in {stateFullName}.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800">
           <div className="text-green-600 dark:text-green-400 text-sm font-bold uppercase mb-1">Status</div>
           <div className="text-3xl font-black text-slate-900 dark:text-white">Verified</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
           <div className="text-slate-500 text-sm font-bold uppercase mb-1">Data Source</div>
           <div className="text-xl font-black text-slate-900 dark:text-white pt-1">Fed Reserve</div>
        </div>
      </div>

      <div className="prose prose-base md:prose-lg text-slate-600 dark:text-slate-300 max-w-none mb-10">
        <p>
          Welcome to the comprehensive, official Federal Reserve 2026 routing number directory for the state of {stateFullName}. 
          Whether you are setting up automatic direct deposit for your paycheck, scheduling a recurring ACH bill payment, or initiating an urgent domestic wire transfer, obtaining the correct 9-digit American Bankers Association (ABA) routing transit number is paramount. 
          Financial institutions operating within {stateFullName} hold specific routing codes assigned to local branches, meaning the 9 digits you need can differ significantly from the number an account holder in a neighboring state might use for the exact same banking brand.
        </p>
        <p>
          In our meticulously maintained {stateFullName} databank, you can search and cross-reference unique routing identifiers distributed across individual banks and credit unions. 
          Be exceedingly cautious when referencing these codes; direct deposits, ACH transfers, and Wire transfers often require mathematically distinct sequences. Submitting an invalid digit usually results in intercepted capital, multi-day delays, and expensive bank return fees. 
          Use the intuitive search matrix below to pinpoint your exact local branch by Bank Name, City, or zip code, instantly revealing the precise financial coordinates needed to ensure your automated and manual transfers succeed on the very first attempt.
        </p>
        <p className="mt-4 font-bold text-slate-800 dark:text-slate-200">Featured Directories & Tools:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
            <li><Link to="/routing-number/bank-of-america-na" className="text-blue-600 dark:text-blue-400 hover:underline">Bank of America Routing Number {stateFullName}</Link></li>
            <li><Link to="/routing-number-validator" className="text-blue-600 dark:text-blue-400 hover:underline">Verify any routing number with our Modulo 10 Checker</Link></li>
        </ul>
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
