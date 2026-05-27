import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Search, Loader2, ChevronRight, Building2 } from 'lucide-react';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';

interface RoutingBank {
  routing_number: string;
  customer_name: string;
  city: string;
  state: string;
  zip: string;
}

export default function AlphabeticalDirectoryPage() {
  const { letter = 'A' } = useParams<{ letter: string }>();
  const [banks, setBanks] = useState<RoutingBank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/data/routing.json');
        if (!response.ok) throw new Error('Failed to fetch routing data');
        const data = await response.json();
        setBanks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredBanks = useMemo(() => {
    return banks
      .filter(bank => bank.customer_name.toUpperCase().startsWith(letter.toUpperCase()))
      .sort((a, b) => a.customer_name.localeCompare(b.customer_name));
  }, [banks, letter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full">
      <SEO 
        title={`Banks Starting with ${letter.toUpperCase()} | Routing Number Directory`}
        description={`Browse all US banks and credit unions starting with the letter ${letter.toUpperCase()}. Find routing numbers, locations, and ABA data.`}
        canonicalUrl={letter === 'A' ? '/banks/a-z' : `/banks/a-z/${letter}`}
      />

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
          A-Z Bank Directory
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Find routing information for tens of thousands of US financial institutions organized alphabetically for easy navigation.
        </p>
      </div>

      {/* Sticky Alphabet Nav */}
      <div className="sticky top-20 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md py-4 border-y border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex justify-between min-w-max px-4">
          {alphabet.map((char) => (
            <Link
              key={char}
              to={`/banks/a-z/${char}`}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all ${
                letter.toUpperCase() === char
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-950'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {char}
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="alphabeticaldirectorypage-hero" />
      </div>

      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
            <p className="text-slate-500 font-medium">Indexing {letter} banks...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 text-blue-600 underline">Try Again</button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-md">{letter}</span>
                <span>Banks & Credit Unions ({filteredBanks.length})</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBanks.map((bank, idx) => (
                <div 
                  key={`${bank.routing_number}-${idx}`}
                  className="group p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-500/5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <h3 className="font-bold text-slate-900 dark:text-white truncate" title={bank.customer_name}>
                          {bank.customer_name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mb-3 truncate">
                        {bank.city}, {bank.state} {bank.zip}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                          {bank.routing_number}
                        </span>
                        <Link 
                          to={`/lookup/${bank.routing_number}`}
                          className="text-xs font-semibold text-slate-400 group-hover:text-blue-600 flex items-center gap-1 transition-colors"
                        >
                          Verify <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBanks.length === 0 && (
              <div className="text-center py-20 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
                <p className="text-slate-500">No banks found starting with "{letter}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
