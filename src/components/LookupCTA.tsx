import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function LookupCTA() {
  return (
    <div className="bg-blue-600 dark:bg-blue-700 text-white p-6 md:p-8 rounded-3xl mt-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-blue-900/10 dark:shadow-blue-900/30">
      <div>
        <h3 className="text-xl md:text-2xl font-bold mb-2">Need to verify a Routing Number?</h3>
        <p className="text-blue-100 mb-0">
          Use our free routing number lookup tool to validate any US bank instantly. Ensure your ACH and wire transfers safely reach their destination.
        </p>
      </div>
      <Link 
        to="/" 
        className="shrink-0 bg-white text-blue-700 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap"
      >
        <Search className="w-5 h-5" />
        Lookup Now
      </Link>
    </div>
  );
}
