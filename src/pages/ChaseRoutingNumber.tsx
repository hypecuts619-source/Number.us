import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Table } from 'lucide-react';
import ArticleAuthorMeta from '../components/ArticleAuthorMeta';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';
import LookupCTA from '../components/LookupCTA';

export default function ChaseRoutingNumber() {
  const regionalNumbers = [
    { state: 'New York (Primary/HQ)', ach: '021000021', wire: '021000021', city: 'New York City' },
    { state: 'California', ach: '121000248', wire: '121000248', city: 'San Francisco / Los Angeles' },
    { state: 'Illinois', ach: '071000013', wire: '071000013', city: 'Chicago' },
    { state: 'Texas', ach: '111000614', wire: '111000614', city: 'Dallas / Houston' },
    { state: 'Ohio', ach: '044000037', wire: '044000037', city: 'Columbus' },
    { state: 'Arizona', ach: '122100024', wire: '122100024', city: 'Phoenix' },
    { state: 'Florida', ach: '063100277', wire: '063100277', city: 'Tampa / Miami' },
    { state: 'Colorado', ach: '102000076', wire: '102000076', city: 'Denver' },
    { state: 'Washington State', ach: '125000024', wire: '125000024', city: 'Seattle' },
    { state: 'Oregon', ach: '123000064', wire: '123000064', city: 'Portland' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 w-full">
      <SEO 
        title="Chase Routing Number: List by State & How to Find [2026]"
        description="Find and verify Chase (JPMorgan Chase) Routing Numbers for all US states. See domestic ACH and Wire transfer codes, and learn how to find your Chase routing code."
        canonicalUrl="/blog/chase-routing-number"
      />

      <div className="mb-10 lg:mb-14 not-prose">
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full whitespace-nowrap font-bold">State Directories</span>
          <div className="flex items-center gap-1.5 whitespace-nowrap"><Clock className="w-4 h-4"/> June 2, 2026</div>
          <span className="whitespace-nowrap">12 min read</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
          Chase Routing Number: Directory by State & Routing Lookup Guide [2026]
        </h1>

        <ArticleAuthorMeta 
          date="June 2, 2026" 
          readTime="12 min read" 
          author="Mathew George, Head of Financial Data Architecture" 
          reviewer="Financial Review Board"
        />
        <p className="text-xl text-slate-600 dark:text-slate-400 mt-6 leading-relaxed font-normal">
          JPMorgan Chase Bank, N.A. is the largest financial institution in the United States. For direct deposits, mobile ACH clearing, and domestic Fedwire setups, finding your specific state-assigned Chase routing number is vital to ensure zero transaction rejections.
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="chaserouting-hero" />
      </div>

      <div className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none">
        
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          When initiating or receiving electronic transfers through Chase, using the exact state-assigned 9-digit ABA (American Bankers Association) number is paramount. Historically, Chase expanded through major mergers with Chemical Bank, Bank One, Washington Mutual, and Bear Stearns, inheriting regional routing transits in the process. This means your Chase routing code is linked strictly to the geographical location where your bank account was originally opened.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4 flex items-center gap-2">
          <Table className="w-6 h-6 text-blue-600" /> Chase Routing Numbers by State [Active 2026]
        </h2>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          Below is a curated lookup directory of the most common active Chase primary routing codes used for Automated Clearing House (ACH) transfers, direct deposit setup, automatic payroll, and domestic bank wires:
        </p>

        <div className="overflow-x-auto my-8 border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm md:text-base">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Origin State</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Main Regional Hub</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">ACH Routing Number</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Wire Routing Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
              {regionalNumbers.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/20">
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{row.state}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">{row.city}</td>
                  <td className="px-6 py-4 font-mono font-bold text-blue-600 dark:text-blue-400">{row.ach}</td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-800 dark:text-slate-200">{row.wire}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4">How Do I Verify My Exact Chase Routing Number?</h2>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          To verify your regional router without error, logging in to your Chase online portal is the safest approach. Follow these precise pathways:
        </p>
        
        <h3 className="text-xl font-bold mt-8 mb-2">1. The Chase Mobile App System</h3>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          Log in securely on your mobile device. Click on your active checking account card, navigate directly to "Account Details", then expand the routing and account sequences toggle. Zelle payments on Chase also route directly through this core clearance architecture.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-2">2. Checkbooks</h3>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          The routing transit number occupies the leftmost 9 digits at the very bottom of your checks. It is printed using specialized Magnetic Ink Character Recognition (MICR) ink for high-speed Federal sorting. Read our <Link to="/blog/anatomy-of-a-check" className="text-blue-600 dark:text-blue-400 hover:underline">check anatomical breakdown</Link> for visual help.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Wire Transfers vs. ACH at JPMorgan Chase</h2>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          For most accounts, Chase uses the same routing transit code for both standard ACH (direct deposits, bill payments) and incoming domestic wire transfers. However, international incoming wire transfers are routed via SWIFT/BIC codes in conjunction with the primary New York corporate headquarters hub routing code (<code>021000021</code>). Always confirm with your sender if they require a specific national intermediary bank's coordinate.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Conclusion</h2>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          A correct ABA code ensures that transfers reconcile smoothly and instantly. Run any 9-digit Chase transit code through our secure <Link to="/routing-number-validator" className="text-blue-600 dark:text-blue-400 hover:underline">Routing Number Validator Tool</Link> to ensure it passes the necessary Modulus 10 checksum standards prior to processing.
        </p>
      </div>

      <div className="mt-16 bg-blue-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-blue-100 dark:border-slate-700">
        <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-4">Validate Your Chase Code</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Want to make sure your 9-digit Chase routing transit code is correct? Use our real-time validation algorithm.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/routing-number-validator" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-center inline-block">Validator Tool</Link>
          <Link to="/" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 hover:border-slate-400 font-bold py-3 px-6 rounded-xl transition-colors text-center inline-block">Database Lookup</Link>
        </div>
      </div>

      <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Routing Articles</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/zelle-routing-number" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-sm hover:shadow-md flex flex-col h-full">
            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">Zelle Routing Numbers</h4>
            <div className="mt-auto flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 pt-4">
              Read Guide <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to="/how-to-find-routing-number" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-sm hover:shadow-md flex flex-col h-full">
            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">How to Find a Routing Number Without Checks</h4>
            <div className="mt-auto flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 pt-4">
              Read Guide <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link to="/aba-routing-number" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-sm hover:shadow-md flex flex-col h-full">
            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">What is an ABA Routing Number</h4>
            <div className="mt-auto flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 pt-4">
              Read Guide <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
        <LookupCTA />
      </div>
    </div>
  );
}
