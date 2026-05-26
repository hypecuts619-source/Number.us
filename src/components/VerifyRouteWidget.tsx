import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, MapPin, Database } from 'lucide-react';

export default function VerifyRouteWidget() {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:p-8 my-10 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <AlertTriangle className="w-24 h-24" />
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row gap-6 md:items-start">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-black text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Verify Your Route Before Initiating a Wire
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Entering the wrong 9-digit ABA code can lock your money in clearing-house limbo or incur expensive rejection fees. Use our free tool to validate your bank's route mathematically before hitting send.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-4 border-t border-slate-200 dark:border-slate-700 pt-6">
          <Link 
            to="/reports/2026-us-credit-union-report" 
            className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-xs font-bold text-slate-700 dark:text-slate-200 group"
          >
            <Database className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
            2026 Credit Union Density Report
          </Link>
          <Link 
            to="/states/ca" 
            className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-xs font-bold text-slate-700 dark:text-slate-200 group"
          >
            <MapPin className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
            California Bank Directory
          </Link>
          <Link 
            to="/states/tx" 
            className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-xs font-bold text-slate-700 dark:text-slate-200 group"
          >
            <MapPin className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
            Texas Bank Directory
          </Link>
          <Link 
            to="/states/fl" 
            className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-xs font-bold text-slate-700 dark:text-slate-200 group"
          >
            <MapPin className="w-4 h-4 text-sky-500 group-hover:scale-110 transition-transform" />
            Florida Bank Directory
          </Link>
          <Link 
            to="/states/ny" 
            className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-xs font-bold text-slate-700 dark:text-slate-200 group"
          >
            <MapPin className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
            New York Bank Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
