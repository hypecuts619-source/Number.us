import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function VerifyRouteCallout() {
  return (
    <div className="my-8 bg-blue-50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 bg-white dark:bg-slate-800 rounded-full shrink-0 shadow-sm border border-blue-50 dark:border-slate-700">
        <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Not sure about this number?
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-4">
          Verify it with our Modulo 10 Checker first. Prevent expensive wire rejection fees and delayed ACH deposits by mathematically checking your ABA sequence.
        </p>
        <Link 
          to="/routing-number-validator" 
          className="inline-flex font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg transition-colors shadow-sm"
        >
          Check Routing Number &rarr;
        </Link>
      </div>
    </div>
  );
}
