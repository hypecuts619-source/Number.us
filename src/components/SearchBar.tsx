import React, { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, X } from 'lucide-react';
import { getAllRoutingData } from '../lib/getData';
import { generateSlug } from '../lib/generateSlug';
import InlineCopyButton from './InlineCopyButton';
import { RoutingData } from '../lib/types';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<RoutingData[]>([]);
  const navigate = useNavigate();
  const data = useMemo(() => getAllRoutingData(), []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recentSearches');
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved).slice(0, 5));
        } catch (e) {
          // ignore
        }
      }
    }
  }, []);

  const saveRecentSearch = (item: RoutingData) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(p => `${p.routing_number}-${p.bank_name}` !== `${item.routing_number}-${item.bank_name}`);
      const next = [item, ...filtered].slice(0, 5);
      if (typeof window !== 'undefined') {
        localStorage.setItem('recentSearches', JSON.stringify(next));
      }
      return next;
    });
  };

  const removeRecentSearch = (e: React.MouseEvent, item: RoutingData) => {
    e.preventDefault();
    e.stopPropagation();
    setRecentSearches(prev => {
      const next = prev.filter(p => `${p.routing_number}-${p.bank_name}` !== `${item.routing_number}-${item.bank_name}`);
      if (typeof window !== 'undefined') {
        localStorage.setItem('recentSearches', JSON.stringify(next));
      }
      return next;
    });
  };

  const [fuseInstance, setFuseInstance] = useState<Fuse<RoutingData> | null>(null);

  useEffect(() => {
    // Only parse and index when we have data, but delay it to avoid blocking initial render
    if (data && data.length > 0 && !fuseInstance) {
      const timer = setTimeout(() => {
        setFuseInstance(
          new Fuse(data, {
            keys: ['bank_name', 'routing_number', 'state', 'city'],
            threshold: 0.3,
            ignoreLocation: true, 
          })
        );
      }, 500); // Wait 500ms after render to not block LCP
      return () => clearTimeout(timer);
    }
  }, [data, fuseInstance]);

  const results = (query && fuseInstance) ? fuseInstance.search(query).slice(0, 5) : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If the user typed exactly a 9-digit routing number, search for it directly
    if (/^\d{9}$/.test(query.trim())) {
      navigate(`/lookup/${query.trim()}`);
      return;
    }

    if (results.length > 0) {
      const bestMatch = results[0].item;
      saveRecentSearch(bestMatch);
      if (/^\d+$/.test(query)) {
        navigate(`/lookup/${bestMatch.routing_number}`);
      } else {
        navigate(`/routing-number/${generateSlug(bestMatch.bank_name)}`);
      }
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative z-20 flex flex-col md:block">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full pl-10 md:pl-12 pr-10 md:pr-28 py-3.5 md:py-5 text-base md:text-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-2 border-slate-300 dark:border-slate-700 rounded-2xl shadow-lg focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
            placeholder="Search by bank name (e.g. Chase) or routing number..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5 md:w-6 md:h-6" />
          
          {query && (
            <button 
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 md:right-28 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          
          <button
            type="submit"
            className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 bg-[#1e3a5f] text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
          >
            Search
          </button>
        </div>
        <button
          type="submit"
          className="md:hidden mt-3 w-full bg-[#1e3a5f] text-white px-4 py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-sm"
        >
          Search
        </button>
      </form>

      {query && results.length === 0 && query.trim().length > 2 && !/^\d{9}$/.test(query.trim()) && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-3">
            <Search className="w-6 h-6 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No results found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            We couldn't find any financial institutions or routing numbers matching "{query}".
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg text-sm text-slate-600 dark:text-slate-400 text-left">
            <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Try the following:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Check for spelling errors in the bank name</li>
              <li>Try searching by state abbreviation (e.g., "NY" or "Texas")</li>
              <li>Search by a complete 9-digit routing number</li>
              <li>Use part of the name instead of the full legal name (e.g., "Chase" instead of "JPMorgan Chase Bank")</li>
            </ul>
          </div>
        </div>
      )}

      {query && results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto">
          {results.map(({ item }) => (
            <div
              key={`${item.routing_number}-${item.bank_name}`}
              className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700 last:border-0 flex items-center justify-between group cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => {
                saveRecentSearch(item);
                navigate(
                  /^\d+$/.test(query)
                    ? `/lookup/${item.routing_number}`
                    : `/routing-number/${generateSlug(item.bank_name)}`
                );
                setQuery('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  saveRecentSearch(item);
                  navigate(
                    /^\d+$/.test(query)
                      ? `/lookup/${item.routing_number}`
                      : `/routing-number/${generateSlug(item.bank_name)}`
                  );
                  setQuery('');
                }
              }}
            >
              <div className="pointer-events-none">
                <div className="font-semibold text-slate-800 dark:text-slate-200">{item.bank_name}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {item.city}, {item.state}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-mono bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 pointer-events-none">
                  {item.routing_number}
                </div>
                <InlineCopyButton text={item.routing_number} />
              </div>
            </div>
          ))}
        </div>
      )}

      {!query && recentSearches.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden text-left">
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3" /> Recent Searches
          </div>
          {recentSearches.map((item) => (
            <div
              key={`recent-${item.routing_number}-${item.bank_name}`}
              className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700 last:border-0 flex items-center justify-between group cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => {
                saveRecentSearch(item);
                navigate(`/routing-number/${generateSlug(item.bank_name)}`);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  saveRecentSearch(item);
                  navigate(`/routing-number/${generateSlug(item.bank_name)}`);
                }
              }}
            >
              <div className="pointer-events-none flex-grow">
                <div className="font-semibold text-slate-800 dark:text-slate-200">{item.bank_name}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {item.city}, {item.state}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-mono bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 pointer-events-none">
                  {item.routing_number}
                </div>
                <InlineCopyButton text={item.routing_number} />
                <button 
                  onClick={(e) => removeRecentSearch(e, item)}
                  className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                  title="Remove from history"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
