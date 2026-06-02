import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Table } from 'lucide-react';
import ArticleAuthorMeta from '../components/ArticleAuthorMeta';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';
import LookupCTA from '../components/LookupCTA';

export default function WellsFargoRoutingNumber() {
  const regionalNumbers = [
    { state: 'California (Primary/HQ)', ach: '121000248', wire: '121100782', city: 'San Francisco' },
    { state: 'Texas', ach: '111900650', wire: '111900650', city: 'Dallas / Houston' },
    { state: 'Arizona', ach: '122100024', wire: '122100024', city: 'Phoenix' },
    { state: 'Georgia', ach: '061000227', wire: '061000227', city: 'Atlanta' },
    { state: 'Florida', ach: '063100277', wire: '063100227', city: 'Miami / Jacksonville' },
    { state: 'Minnesota', ach: '091000019', wire: '091000019', city: 'Minneapolis' },
    { state: 'North Carolina', ach: '053000219', wire: '053000219', city: 'Charlotte' },
    { state: 'Colorado', ach: '102000076', wire: '102000076', city: 'Denver' },
    { state: 'Oregon', ach: '123000064', wire: '123000064', city: 'Portland' },
    { state: 'Virginia', ach: '051400549', wire: '051400549', city: 'Richmond' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 w-full">
      <SEO 
        title="Wells Fargo Routing Number: List by State & How to Find [2026]"
        description="Find and verify Wells Fargo Routing Numbers for all US states. See domestic ACH and Wire transfer codes, and learn how to find your Wells Fargo routing code."
        canonicalUrl="/blog/wells-fargo-routing-number"
      />

      <div className="mb-10 lg:mb-14 not-prose">
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full whitespace-nowrap font-bold">State Directories</span>
          <div className="flex items-center gap-1.5 whitespace-nowrap"><Clock className="w-4 h-4"/> June 2, 2026</div>
          <span className="whitespace-nowrap">11 min read</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
          Wells Fargo Routing Number: List by State & Direct Lookup Guide [2026]
        </h1>

        <ArticleAuthorMeta 
          date="June 2, 2026" 
          readTime="11 min read" 
          author="Mathew George, Head of Financial Data Architecture" 
          reviewer="Financial Review Board"
        />
        <p className="text-xl text-slate-600 dark:text-slate-400 mt-6 leading-relaxed">
          Wells Fargo Bank, N.A. is one of the most prominent retail lenders in the US. Because Wells Fargo retains regional checking centers from retrofitted mergers (such as Wachovia and First Union), you must map your account opening state to the correct ABA routing code.
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="wellsfargo-hero" />
      </div>

      <div className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none">
        
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          To correctly dispatch direct deposits, direct debit billings, and peer-to-peer transfers, using the precise Wells Fargo routing number is required. Entering an incorrect ABA sequence will cause the Federal Reserve clearance networks (or your employer's processing team) to reject your transaction, returning code <code>R03 (No Account/Unable to Locate Account)</code> or <code>R04 (Invalid Account Number Code)</code>, potentially locking your funds for multiple business days.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4 flex items-center gap-2">
          <Table className="w-6 h-6 text-blue-600" /> Wells Fargo Routing Codes by State [2026]
        </h2>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          Find Wells Fargo primary active routing codes organized by geographic origin across the top US domestic markets:
        </p>

        <div className="overflow-x-auto my-8 border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm md:text-base">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Origin State Zone</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Clearing Hub city</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">ACH Routing transit</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Wire Routing transit</th>
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

        <h2 className="text-2xl font-bold mt-12 mb-4">Finding Your Wells Fargo Code in Less than 60 Seconds</h2>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          Wells Fargo provides digital checking systems that allow checking account holders to lookup their routing code in less than a minute. Try these workflows:
        </p>

        <h3 className="text-xl font-bold mt-8 mb-2">1. Wells Fargo Mobile Mobile Application</h3>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          Log in and select your checking or savings card. In the primary submenu, tap "Routing & Account". The app will display your 9-digit Routing Transit Number (RTN) both for standard clearinghouse ACH transfers and premium wire transfers.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-2">2. Direct Check Inspection</h3>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          If you have a physical checkbook, the lower left corner prints your exact Wells Fargo routing number. It is flanked by distinct MICR (Magnetic Ink Character Recognition) characters. Review our <Link to="/blog/anatomy-of-a-check" className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700">Anatomy of a Check</Link> layout to verify.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Wire Transfers vs Direct Deposit at Wells Fargo</h2>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          It is extremely important to recognize that Wells Fargo occasionally uses separate 9-digit codes for electronic ACH transfers and wire transfers. Electronic direct deposits and automated monthly bill payments always route via Wells Fargo's ACH transit lanes, whereas heavy domestic real estate wires use specialized wire routers. Consult our wire comparison at <Link to="/blog/ach-vs-wire-routing-guide" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">ACH vs Wire routing guide</Link> for detailed mechanics.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Conclusion & Mathematical Verification</h2>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          Prior to finalizing any direct deposit form, ensure the routing code is valid. Run your code through our active <Link to="/routing-number-validator" className="text-blue-600 dark:text-blue-400 hover:underline">Routing Number Validator Tool</Link> to ensure it aligns with the standard Modulus 10 checksum standards automatically.
        </p>
      </div>

      <div className="mt-16 bg-blue-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-blue-100 dark:border-slate-700">
        <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-4">Validate Your Wells Fargo Code</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Want to make sure your 9-digit Wells Fargo routing transit code is correct? Use our real-time validation algorithm.</p>
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
