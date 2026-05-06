export default function TrustIndicator() {
  return (
    <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-3 rounded-lg text-sm text-slate-700 dark:text-slate-300 mt-4 mb-6">
      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
      <div>
        <strong className="font-semibold text-slate-900 dark:text-white">Data Verification:</strong> ABA-sourced May 2026. <br className="md:hidden" />
        <span className="text-slate-600 dark:text-slate-400">Always verify with the <a href="https://www.helpwithmybank.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Official Bank Hotline</a> before sending large transfers.</span>
      </div>
    </div>
  );
}
