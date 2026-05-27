import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import banksData from '../data/banksData.json';
import { ShieldCheck, Landmark } from 'lucide-react';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';

export default function CreditUnionDirectory() {
  const creditUnions = banksData.filter(b => b.institutionType === 'Credit Union');

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <SEO 
        title="Credit Union Routing Number Directory | NCUA Insured CU Lookup"
        description="Find verified routing numbers for US credit unions. Access NCUA-insured institutional data, ACH transit numbers, and wire transfer instructions."
        canonicalUrl="/credit-unions"
      />

      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 font-bold text-xs uppercase tracking-widest mb-4">
          <Landmark className="w-4 h-4" /> Member-Owned Banking
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
          Credit Union Routing Directory
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Searching for a credit union's ABA number? Unlike commercial banks, credit unions often have unique regional routing structures. Our database is enriched with NCUA quarterly call report data.
        </p>
      </div>

            <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="credituniondirectory-hero" />
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creditUnions.length > 0 ? (
          creditUnions.map((cu) => (
            <Link 
              key={cu.slug}
              to={`/regional-banks/${cu.slug}`}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {cu.bankName}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                  {cu.state}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> NCUA
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                {cu.description}
              </p>
              <div className="text-sm font-mono text-blue-600 dark:text-blue-400 font-bold">
                {cu.routingNumbers[0]}
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
             <p className="text-slate-500">Updating Credit Union metadata... Please check back shortly.</p>
          </div>
        )}
      </div>

      <div className="mt-20 bg-slate-900 rounded-3xl p-8 md:p-12 text-white">
        <h2 className="text-3xl font-bold mb-6">Why Credit Union Routing Numbers Differ</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-3">Regional Identification</h3>
            <p className="text-slate-300">
              Many credit unions use specific prefix digits that identify them as cooperatives within the Federal Reserve system. Using a standard bank search tool may sometimes omit these specialized NCUA entities.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">NCUA Insurance (Share Insurance)</h3>
            <p className="text-slate-300">
              Unlike banks insured by the FDIC, credit unions are insured by the National Credit Union Share Insurance Fund (NCUSIF), managed by the NCUA. This regulatory distinction often impacts how their routing records are filed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
