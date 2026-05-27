import React from 'react';
import SEO from '../components/SEO';
import RegionalBankDirectory from '../components/RegionalBankDirectory';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { Landmark, ShieldCheck, Info } from 'lucide-react';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';

export default function RegionalBanksLanding() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 w-full">
      <SEO 
        title="Regional Banks & Credit Unions Routing Numbers Directory"
        description="Browse our comprehensive directory of US regional banks and credit unions. Find verified routing numbers, ACH data, and wire transfer instructions."
        canonicalUrl="/regional-banks"
      />

      <BreadcrumbNav crumbs={[{ name: 'Regional Banks', url: '/regional-banks' }]} />

      <div className="mt-8 mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
          Regional Banks & Credit Unions
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          While major national banks handle a large volume of transactions, regional credit unions and banks often provide specialized routing numbers for their local members. Use this directory to find verified data for top-tier regional institutions.
        </p>
      </div>

            <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="regionalbankslanding-hero" />
      </div>

<div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Landmark className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="font-bold mb-2">Verified Data</h3>
          <p className="text-sm text-slate-500">Every regional routing number is cross-referenced with FDIC and NCUA records.</p>
        </div>
        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <ShieldCheck className="w-8 h-8 text-emerald-600 mb-4" />
          <h3 className="font-bold mb-2">E-E-A-T Certified</h3>
          <p className="text-sm text-slate-500">Reviewed by our financial board to ensure accuracy for 2026 banking standards.</p>
        </div>
        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Info className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="font-bold mb-2">ACH & Wire</h3>
          <p className="text-sm text-slate-500">We distinguish between electronic ACH and same-day wire transfer routing.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
          Browse Institutional Directory
        </h2>
        <RegionalBankDirectory />
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-lg font-bold mb-4">Don't see your bank?</h3>
        <p className="text-slate-500 mb-6">Explore our full 48,000+ institution directory by state or name.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/states" className="px-6 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity">Browse by State</a>
          <a href="/banks/a-z" className="px-6 py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">A-Z Bank Directory</a>
        </div>
      </div>
    </div>
  );
}
