import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { getAllRoutingData } from '../lib/getData';
import { generateSlug } from '../lib/generateSlug';
import AdUnit from '../components/AdUnit';

export default function AllBanksDirectory() {
  const allBanks = useMemo(() => {
    const data = getAllRoutingData();
    const bankNames = new Set<string>();
    data.forEach(d => bankNames.add(d.bank_name));
    return Array.from(bankNames).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
  }, []);

  const banksByLetter = useMemo(() => {
    const grouped = new Map<string, string[]>();
    allBanks.forEach(bank => {
      const firstLetter = bank.charAt(0).toUpperCase();
      const letterCategory = /[A-Z]/.test(firstLetter) ? firstLetter : '#';
      if (!grouped.has(letterCategory)) {
        grouped.set(letterCategory, []);
      }
      grouped.get(letterCategory)!.push(bank);
    });
    return Array.from(grouped.entries()).sort(([a], [b]) => {
      if (a === '#') return 1;
      if (b === '#') return -1;
      return a.localeCompare(b);
    });
  }, [allBanks]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SEO 
        title="All Banks Directory (A-Z) | USRoutingNumber.com"
        description="Comprehensive A-Z directory of all verified US banks and credit unions. Find routing numbers for any financial institution."
        canonicalUrl="/banks"
      />
      
      <BreadcrumbNav crumbs={[{ name: 'All Banks Directory', url: '/banks' }]} />

      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 mt-8">
          A-Z Bank Directory
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Browse our complete list of {allBanks.length.toLocaleString()} verified financial institutions registered with the Federal Reserve.
        </p>
      </div>

      <div className="mb-12 flex flex-wrap justify-center gap-2 sticky top-4 z-10 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        {banksByLetter.map(([letter]) => (
          <a 
            key={letter}
            href={`#letter-${letter}`}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 font-bold text-slate-700 dark:text-slate-300 transition-colors"
          >
            {letter}
          </a>
        ))}
      </div>

      <AdUnit slot="UNIT 1: Below H1" className="mb-10" />

      <div className="space-y-16">
        {banksByLetter.map(([letter, banks]) => (
          <section key={letter} id={`letter-${letter}`} className="scroll-mt-24">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 border-b-2 border-slate-200 dark:border-slate-800 pb-2">
              {letter}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {banks.map(bank => (
                <Link
                  key={bank}
                  to={`/routing-number/${generateSlug(bank)}`}
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium hover:underline p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors truncate"
                  title={bank}
                >
                  {bank}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
