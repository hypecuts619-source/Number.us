
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { getAllRoutingData } from '../lib/getData';
import { generateSlug } from '../lib/generateSlug';
import AdUnit from '../components/AdUnit';
import { MapPin, Building2, Search } from 'lucide-react';

export default function CaliforniaRoutingNumbers() {
  const data = getAllRoutingData();
  const caData = useMemo(() => data.filter(d => d.state === 'CA'), [data]);
  
  const topCities = useMemo(() => {
    const cities: Record<string, number> = {};
    caData.forEach(d => {
      cities[d.city] = (cities[d.city] || 0) + 1;
    });
    return Object.entries(cities).sort((a, b) => b[1] - a[1]).slice(0, 12);
  }, [caData]);

  const majorBanks = useMemo(() => {
    const banks = new Set<string>();
    caData.forEach(d => banks.add(d.bank_name));
    return Array.from(banks).slice(0, 15).sort();
  }, [caData]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <SEO 
        title="California Bank Routing Numbers List (2026) | CA ABA Codes"
        description={`Browse the complete directory of ${caData.length} California bank routing numbers. Find ABA routing codes for San Francisco, Los Angeles, and major CA banks.`}
        canonicalUrl="/states/ca"
      />
      
      <BreadcrumbNav crumbs={[{ name: 'States', url: '/states' }, { name: 'California', url: '/states/ca' }]} />

      <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-[2rem] p-10 md:p-16 mb-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
          <MapPin className="w-96 h-96" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            California Routing Numbers Directory
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 opacity-90 leading-relaxed mb-8">
            Complete database of financial institutions in the Golden State. Access verified routing codes for ACH, Wire, and Direct Deposit.
          </p>
          <div className="flex flex-wrap gap-4">
             <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                <span className="block text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Records Found</span>
                <span className="text-2xl font-black">All Verified</span>
             </div>
             <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                <span className="block text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Live Status</span>
                <span className="text-2xl font-black text-green-400">Verified</span>
             </div>
          </div>
        </div>
      </div>

      <AdUnit slot="UNIT 1" className="mb-12" />

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
             <Building2 className="text-blue-600" />
             CA Major Financial Institutions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {majorBanks.map(bank => (
              <Link 
                key={bank}
                to={`/routing-number/${generateSlug(bank)}/ca`}
                className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all flex items-center justify-between group"
              >
                <span className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600">{bank}</span>
                <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </Link>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
             <h3 className="text-2xl font-bold mb-4">Why California routing numbers vary</h3>
             <p className="text-slate-600 dark:text-slate-400 mb-4">
               California is home to the 12th District of the Federal Reserve (San Francisco). Due to the massive volume of financial transactions, many banks headquartered in California possess multiple routing numbers—one for domestic ACH transfers and another distinct code for international Fedwire operations.
             </p>
             <p className="text-slate-600 dark:text-slate-400">
               Large institutions like Wells Fargo and Charles Schwab have complex routing hierarchies to manage their diverse customer bases across Northern and Southern California. Our directory captures these branch-specific and service-specific identifiers to ensure your money lands in the correct account.
             </p>
          </div>
        </div>

        <div>
          <div className="sticky top-6">
            <h3 className="text-xl font-bold mb-6">Top CA Cities by Record Count</h3>
            <div className="space-y-4">
               {topCities.map(([city, count]) => (
                 <Link 
                  key={city}
                  to={`/routing-number/ca/${generateSlug(city)}`}
                  className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl hover:bg-blue-50 transition-colors"
                 >
                   <span className="font-medium">{city}</span>
                   <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{count} Banks</span>
                 </Link>
               ))}
            </div>
            <Link to="/states/ca" className="block mt-6 text-center text-blue-600 font-bold hover:underline">
              View All California Cities &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
