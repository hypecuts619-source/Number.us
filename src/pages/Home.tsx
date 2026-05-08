import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import AccountValidator from '../components/AccountValidator';
import AdUnit from '../components/AdUnit';
import CheckDiagram from '../components/CheckDiagram';
import { getTopSearchedBanks } from '../lib/getData';
import { generateSlug } from '../lib/generateSlug';
import { generateHomeFAQs } from '../lib/faqTemplates';
import { generateFAQSchema } from '../lib/seoHelpers';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';

export default function Home() {
  const topBanks = getTopSearchedBanks();
  const faqs = useMemo(() => generateHomeFAQs(), []);
  const [isArticleExpanded, setIsArticleExpanded] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-12 relative">
      <SEO 
        title="Find Routing Number & Bank Routing Number Lookup (2026)"
        description="Lookup any US bank routing number for direct deposit, ACH, and wire transfers. Find routing numbers for Chase, Wells Fargo, Bank of America, and more."
        canonicalUrl="/"
      >
        <script type="application/ld+json">
          {generateFAQSchema(faqs)}
        </script>
      </SEO>

      <div className="flex flex-col md:block">
        <div className="order-1 md:hidden mb-6">
          <AccountValidator />
        </div>

        <div className="order-2 text-center py-6 md:py-12">
          <h1 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">
            Find Any US Bank Routing Number
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Instantly lookup any of the 17,776 verified US bank and credit union routing numbers. Updated for 2026 with official Federal Reserve and NCUA data.
          </p>
          <div className="max-w-3xl mx-auto">
            <SearchBar />
          </div>
        </div>

        <div className="hidden md:block">
          <AccountValidator />
        </div>
      </div>

      <AdUnit slot="UNIT 1: Below Validation Tool, 728x90 leaderboard" className="hidden md:block min-h-[90px] my-10" />

      <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-8">
        <div className={`md:col-span-2 relative ${!isArticleExpanded ? 'max-h-[600px] overflow-hidden md:max-h-none' : ''}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">What is a Routing Number?</h2>
          <div className="prose prose-base md:prose-lg text-slate-600 dark:text-slate-300">
            <p>
              A routing transit number (RTN) is a nine-digit code used by banks in the United States to identify the financial institution that holds the account. Created by the American Bankers Association (ABA) in 1910, these digits are essential for facilitating transactions such as electronic funds transfers, direct deposits, bill payments, and wire transfers.
            </p>
            
            <CheckDiagram />

            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mt-12 mb-4 text-center">Reverse Lookup: Find Your Bank</h3>
            <p className="text-center">
              Have a 9 digit number and want to know what bank it belongs to? Use our reverse lookup tool at the top of the page. Enter any valid 9-digit ABA code to INSTANTLY reveal the bank name, branch city, and whether it supports ACH or Wire.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mt-12 mb-4">How we verify routing numbers</h3>
            <p>
              To ensure mathematical accuracy and verify whether a routing number is structurally valid, we employ the official ABA Checksum validation algorithm. The first 8 digits of the routing number indicate the Federal Reserve routing symbol and the ABA institution identifier. The 9th digit is a checksum. 
            </p>
            <p>
              By multiplying each digit by its specific weight (3, 7, or 1 based on its position) and summing the results, we can calculate if the number is valid. A valid routing number will always result in a sum that is a multiple of 10. You can type any 9-digit number into our search bar to run this mathematical validation instantly.
            </p>
          </div>

          {!isArticleExpanded && (
            <div className="md:hidden absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-slate-900 to-transparent flex items-end justify-center pb-2">
              <button 
                onClick={() => setIsArticleExpanded(true)} 
                className="bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 px-6 py-2 rounded-full font-bold shadow-md border border-slate-200 dark:border-slate-700"
              >
                Read More
              </button>
            </div>
          )}
        </div>

        <div>
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Top Searched Banks</h2>
            <ul className="space-y-3">
              {topBanks.map((bank, i) => (
                <li key={i}>
                  <Link
                    to={`/routing-number/${generateSlug(bank)}`}
                    className="flex justify-between items-center group"
                  >
                    <span className="text-blue-700 dark:text-blue-400 font-medium group-hover:text-blue-900 dark:group-hover:text-blue-300 group-hover:underline">
                      {bank}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">View</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <AdUnit slot="UNIT 2: Mid content, in-article responsive" className="my-10 min-h-[100px] md:min-h-[150px]" />

      <div className="mt-8 md:mt-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-12 shadow-sm">
        <FAQSection faqs={faqs} />
      </div>

      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full bg-[#1e3a5f] hover:bg-blue-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] border-2 border-blue-400/50 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <span>Validate Account Now</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </button>
      </div>
      
      {/* Spacer for sticky button */}
      <div className="md:hidden h-20"></div>
    </div>
  );
}
