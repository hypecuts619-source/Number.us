import React from 'react';
import { Link } from 'react-router-dom';
import banksData from '../data/banksData.json';

export default function RegionalBankDirectory() {
  // Sort alphabetically by bank name
  const sortedBanks = [...banksData].sort((a, b) => 
    a.bankName.localeCompare(b.bankName)
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm mb-12">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Browse Regional Banks & Credit Unions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedBanks.map(bank => (
          <Link 
            key={bank.slug} 
            to={`/regional-banks/${bank.slug}`}
            className="group flex flex-col p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-transparent hover:border-blue-100 dark:hover:border-blue-800/50 transition-all"
          >
            <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400">
              {bank.bankName}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {bank.state}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
