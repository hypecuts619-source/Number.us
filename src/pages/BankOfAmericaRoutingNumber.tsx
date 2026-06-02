import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Table } from 'lucide-react';
import ArticleAuthorMeta from '../components/ArticleAuthorMeta';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';
import LookupCTA from '../components/LookupCTA';

export default function BankOfAmericaRoutingNumber() {
  const regionalNumbers = [
    { state: 'North Carolina (Primary/HQ)', ach: '053000196', wire: '026009593', city: 'Charlotte' },
    { state: 'New York', ach: '021001208', wire: '026009593', city: 'New York City' },
    { state: 'California', ach: '121000248', wire: '026012483', city: 'Los Angeles / SF' },
    { state: 'Texas', ach: '111000012', wire: '111000012', city: 'Dallas / Houston' },
    { state: 'Florida', ach: '063100277', wire: '063100277', city: 'Tampa / Jacksonville' },
    { state: 'Georgia', ach: '061000052', wire: '061000052', city: 'Atlanta' },
    { state: 'Massachusetts', ach: '011000138', wire: '011000138', city: 'Boston' },
    { state: 'New Jersey', ach: '021200025', wire: '021200025', city: 'Newark' },
    { state: 'Virginia', ach: '051400109', wire: '051400109', city: 'Richmond' },
    { state: 'Washington D.C.', ach: '054000030', wire: '054000030', city: 'Washington' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 w-full">
      <SEO 
        title="Bank of America Routing Number: List by State & How to Find [2026]"
        description="Find and verify Bank of America (BofA) Routing Numbers for all US states. See domestic ACH and Wire transfer codes, and learn how to find your Bank of America routing code."
        canonicalUrl="/blog/bank-of-america-routing-number"
      />

      <div className="mb-10 lg:mb-14 not-prose">
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium mb-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full whitespace-nowrap font-bold">State Directories</span>
          <div className="flex items-center gap-1.5 whitespace-nowrap"><Clock className="w-4 h-4"/> June 2, 2026</div>
          <span className="whitespace-nowrap">11 min read</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
          Bank of America Routing Number: List by State & Transfer Instructions [2026]
        </h1>

        <ArticleAuthorMeta 
          date="June 2, 2026" 
          readTime="11 min read" 
          author="Mathew George, Head of Financial Data Architecture" 
          reviewer="Financial Review Board"
        />
        <p className="text-xl text-slate-600 dark:text-slate-400 mt-6 leading-relaxed">
          Bank of America, N.A. (BofA) handles immense transactional volume daily. To prevent failed ACH, direct deposit, or Fedwire setups, finding your precise regional Bank of America routing number is essential.
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="bofa-hero" />
      </div>

      <div className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none">
        
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          Whether you are an individual configuring payroll direct deposit or a business orchestrating supplier ACH transits, verifying Bank of America’s 9-digit ABA code is critical. Like other major commercial retail institutions, BofA grew organically by absorbing regional banking giants (such as NationsBank and FleetBoston Financial), retaining geographic routing segments that map strictly to your account's regional domicile.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4 flex items-center gap-2">
          <Table className="w-6 h-6 text-blue-600" /> Bank of America Routing Codes by State [2026]
        </h2>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          Verify Bank of America active routing transit numbers (RTNs) organized by the state where your checking or savings account was first established:
        </p>

        <div className="overflow-x-auto my-8 border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm md:text-base">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Origin State Zone</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Clearing Hub city</th>
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

        <h2 className="text-2xl font-bold mt-12 mb-4">How Do I Locate My BofA Routing Elements?</h2>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          If you have active access to Bank of America’s digitized banking portals, you can quickly locate your specific routing and account details using the following secure workflows:
        </p>

        <h3 className="text-xl font-bold mt-8 mb-2">1. Bank of America Mobile App</h3>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          Log in securely, select your checking or savings card, and click the "Account Details" toggle under your active balance screen. It will list both the 9-digit ACH routing transit number and your individual account numbers.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-2">2. Checking Account Statements</h3>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          Open a downloaded PDF of your latest Bank of America monthly bank statement. Your state routing transits are printed in the header metadata next to your branch location info.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Wire Transfers vs. ACH Transits at Bank of America</h2>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          It is absolutely critical to note that Bank of America uses highly distinct routing numbers for electronic ACH transits (direct deposits) and incoming wires. Using a standard ACH routing number for an incoming domestic Wire transfer with BofA will result in automatic payment reversion, incurring severe transaction rejection fees. Seek more details in our comprehensive <Link to="/blog/ach-vs-wire-routing-guide" className="text-blue-600 dark:text-blue-400 hover:underline">ACH vs Wire routing guide</Link> page.
        </p>

        <h2 className="text-2xl font-bold mt-12 mb-4">Conclusion & Routing Verification</h2>
        <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
          Double-check your BofA identifiers before initiating external transfers. Run any 9-digit transit code through our secure <Link to="/routing-number-validator" className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700">Routing Number Validator Tool</Link> to ensure it aligns with standard Modulus 10 checksum compliance instantly.
        </p>
      </div>

      <div className="mt-16 bg-blue-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-blue-100 dark:border-slate-700">
        <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-4">Verify Your BofA Code</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Confirm your 9-digit Bank of America routing transit code is mathematically valid with our instant checking engine.</p>
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
