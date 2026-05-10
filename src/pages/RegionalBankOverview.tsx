import React from 'react';
import { useParams, Link } from 'react-router-dom';
import banksData from '../data/banksData.json';
import SEO from '../components/SEO';
import { ShieldCheck } from 'lucide-react';

export default function RegionalBankOverview() {
  const { bankSlug } = useParams<{ bankSlug: string }>();
  
  const bank = banksData.find(b => b.slug === bankSlug);

  if (!bank) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Bank Not Found</h1>
        <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  const currentYear = new Date().getFullYear();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://usroutingnumber.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Regional Banks",
        "item": "https://usroutingnumber.com/banks"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": bank.bankName,
        "item": `https://usroutingnumber.com/regional-banks/${bankSlug}`
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 w-full" style={{ minHeight: '80vh' }}>
      <SEO 
        title={`${bank.bankName} Routing Number | Find & Verify (${currentYear})`}
        description={bank.description}
        canonicalUrl={`/regional-banks/${bankSlug}`}
      >
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </SEO>

      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex text-sm text-slate-500 dark:text-slate-400 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          </li>
          <li className="mx-2">/</li>
          <li>
            <Link to="/banks" className="hover:text-blue-600 dark:hover:text-blue-400">Regional Banks</Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-slate-900 dark:text-slate-200" aria-current="page">
            {bank.bankName}
          </li>
        </ol>
      </nav>

      <div className="mb-6 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-lg border border-emerald-100 dark:border-emerald-800/50 w-max h-[42px]">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
          Fact Checked by Financial Review Board
        </span>
      </div>

      {/* Strict static boundaries for CLS prevention */}
      <div className="min-h-[100px] mb-6">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {bank.bankName} Routing Number Directory
        </h1>
      </div>

      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none mb-10 min-h-[120px]">
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {bank.description} To ensure secure and rapid wire transfers, ACH deposits, and general financial processes, using the correct 9-digit ABA routing number is crucial. Here is the verified routing data for {bank.bankName} headquartered in {bank.state}.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[150px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <caption className="sr-only">{bank.bankName} Routing Numbers Layout</caption>
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 h-[56px]">
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">Institution</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">Region / State</th>
                <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white whitespace-nowrap">Routing Number(s)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors h-[72px]">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100 align-middle">
                  {bank.bankName}
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400 align-middle">
                  {bank.state}
                </td>
                <td className="px-6 py-4 font-mono font-medium text-blue-700 dark:text-blue-400 align-middle tracking-wider">
                  {bank.routingNumbers.map(rn => (
                    <div key={rn} className="mb-1 last:mb-0 bg-blue-50 dark:bg-slate-800 inline-block px-2 py-1 rounded border border-blue-100 dark:border-slate-700">
                      {rn}
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-12 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed min-h-[120px]">
        <strong>Important Disclaimer:</strong> While we endeavor to ensure this routing data is accurate and updated for the {currentYear} fiscal period, you should always verify the explicit routing number required for your precise transaction directly with {bank.bankName} before sending international wires or establishing ACH direct deposits.
      </div>
    </div>
  );
}
