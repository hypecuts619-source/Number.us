import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { getRoutingSummary } from '../lib/getData';
import { generateSlug } from '../lib/generateSlug';
import { Search, ChevronRight, Building2 } from 'lucide-react';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function AlphabeticalDirectoryPage() {
  const { letter = 'a' } = useParams<{ letter: string }>();
  const [searchTerm, setSearchTerm] = useState('');

  const letterUpper = (letter || 'A').charAt(0).toUpperCase();
  const letterLower = letterUpper.toLowerCase();

  // Bank names come directly from the precomputed summary (synchronous in SSR and client)
  const allBanksForLetter = useMemo(() => {
    const summary = getRoutingSummary();
    const names = summary.bankNames || [];
    return names
      .filter((name) => name.toUpperCase().startsWith(letterUpper))
      .sort((a, b) => a.localeCompare(b));
  }, [letterUpper]);

  const filteredBanks = useMemo(() => {
    if (!searchTerm.trim()) return allBanksForLetter;
    const term = searchTerm.toLowerCase().trim();
    return allBanksForLetter.filter((name) => name.toLowerCase().includes(term));
  }, [allBanksForLetter, searchTerm]);

  const canonicalPath = letterLower === 'a' ? '/banks/a-z' : `/banks/a-z/${letterLower}`;

  const itemListSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: filteredBanks.slice(0, 50).map((name, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://usroutingnumber.com/routing-number/${generateSlug(name)}`,
        name: name,
      })),
    };
  }, [filteredBanks]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full">
      <SEO
        title={`Banks Starting with ${letterUpper} | Routing Number Directory [2026]`}
        description={`Browse all US banks and credit unions starting with the letter ${letterUpper}. Find verified routing numbers, FedACH codes, and wire transfer info.`}
        canonicalUrl={canonicalPath}
        schemas={[itemListSchema]}
      />

      <BreadcrumbNav
        crumbs={[
          { name: 'All Banks Directory', url: '/banks' },
          { name: `Banks Starting with ${letterUpper}`, url: canonicalPath },
        ]}
      />

      <div className="mb-8 text-center mt-6">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
          US Banks Starting with &ldquo;{letterUpper}&rdquo;
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Browse verified routing transit numbers and branch transfer details for {allBanksForLetter.length} financial institutions starting with the letter {letterUpper}.
        </p>
      </div>

      {/* Sticky Alphabet Nav */}
      <div className="sticky top-20 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md py-4 border-y border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex justify-between min-w-max px-4 gap-1">
          {ALPHABET.map((char) => {
            const isSelected = letterUpper === char;
            return (
              <Link
                key={char}
                to={`/banks/a-z/${char.toLowerCase()}`}
                className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all text-sm ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-950'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {char}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Search within this letter */}
      <div className="max-w-md mx-auto mb-8 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Filter banks starting with ${letterUpper}...`}
          className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="alphabeticaldirectorypage-hero" />
      </div>

      <div className="min-h-[400px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">{letterUpper}</span>
            <span>Financial Institutions ({filteredBanks.length})</span>
          </h2>
          <Link to="/banks" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            View All Banks Directory &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBanks.map((name) => {
            const slug = generateSlug(name);
            return (
              <Link
                key={name}
                to={`/routing-number/${slug}`}
                className="group p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors shrink-0">
                    <Building2 className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" title={name}>
                      {name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Routing numbers &amp; branch codes
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            );
          })}
        </div>

        {filteredBanks.length === 0 && (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
            <p className="text-slate-500 font-medium">
              {searchTerm ? `No banks matching "${searchTerm}" found under letter ${letterUpper}.` : `No banks found starting with letter "${letterUpper}".`}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
