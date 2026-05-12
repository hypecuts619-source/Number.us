import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import AccountValidator from '../components/AccountValidator';
import AdUnit from '../components/AdUnit';
import CheckDiagram from '../components/CheckDiagram';
import RegionalBankDirectory from '../components/RegionalBankDirectory';
import { getTopSearchedBanks } from '../lib/getData';
import { generateSlug } from '../lib/generateSlug';
import { generateHomeFAQs } from '../lib/faqTemplates';
import { generateFAQSchema, generateWebSiteSchema } from '../lib/seoHelpers';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { Heart, Clock, ArrowRight } from 'lucide-react';

export default function Home() {
  const topBanks = getTopSearchedBanks();
  const faqs = useMemo(() => generateHomeFAQs(), []);
  const [isArticleExpanded, setIsArticleExpanded] = useState(false);
  const { favorites } = useFavorites();
  const { items: recentItems } = useRecentlyViewed();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-12 relative">
      <SEO 
        title="United States Routing Number Search | Find Any US Bank (2026)"
        description="Looking for your bank's routing number? Lookup any US bank routing number for direct deposit, ACH, and wire transfers instantly."
        canonicalUrl="/"
      >
        <script type="application/ld+json">
          {generateWebSiteSchema()}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "USRoutingNumber",
              "url": "https://usroutingnumber.com",
              "logo": "https://usroutingnumber.com/favicon.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "contact@usroutingnumber.com",
                "contactType": "customer service"
              }
            }
          `}
        </script>
        <script type="application/ld+json">
          {generateFAQSchema(faqs)}
        </script>
      </SEO>

      <div className="text-center py-6 md:py-12">
        <h1 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">
          Find Any US Bank Routing Number
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
          Instantly lookup any verified US bank and credit union routing numbers. Updated for 2026 with official Federal Reserve and NCUA data.
        </p>
        <div className="max-w-3xl mx-auto">
          <SearchBar />
        </div>
      </div>

      <AdUnit slot="UNIT 1.5: Below Search Bar (Mobile)" className="md:hidden min-h-[100px] my-6" />

      <AccountValidator />

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
          {favorites.length > 0 && (
            <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-2xl p-6 shadow-sm mb-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-2 mb-4 text-rose-700 dark:text-rose-400">
                <Heart className="w-5 h-5 fill-current" />
                <h2 className="text-xl font-bold">My Saved Banks</h2>
              </div>
              <ul className="space-y-3">
                {favorites.map((bank) => (
                  <li key={bank.slug}>
                    <Link
                      to={`/regional-banks/${bank.slug}`}
                      className="flex justify-between items-center group bg-white dark:bg-slate-800 p-3 rounded-xl border border-rose-200 dark:border-rose-900/20 hover:border-rose-400 transition-all"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600">
                          {bank.bankName}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{bank.state}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-rose-300 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recentItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm mb-8">
              <div className="flex items-center gap-2 mb-4 text-slate-700 dark:text-slate-300">
                <Clock className="w-5 h-5" />
                <h2 className="text-xl font-bold">Recently Viewed</h2>
              </div>
              <ul className="space-y-3">
                {recentItems.slice(0, 3).map((item) => (
                  <li key={item.routingNumber}>
                    <Link
                      to={`/lookup/${item.routingNumber}`}
                      className="block group"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 group-hover:underline line-clamp-1">
                          {item.bankName}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{item.routingNumber}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm mb-8">
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

          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Member-Owned Banking</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Our directory is enriched with <strong>NCUA Quarterly Call Report</strong> data, ensuring verified coverage for over 5,000 US Credit Unions.
            </p>
            <Link to="/credit-unions" className="text-blue-700 dark:text-blue-400 font-bold hover:underline text-sm flex items-center gap-1">
              Browse Credit Union Directory &rarr;
            </Link>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Verification Tools</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/routing-number-validator" className="text-blue-700 dark:text-blue-400 font-medium hover:underline block leading-snug">
                  Validate Routing Number Checksum
                </Link>
              </li>
              <li>
                <Link to="/routing-number-lookup" className="text-blue-700 dark:text-blue-400 font-medium hover:underline block leading-snug">
                  Reverse Routing Number Lookup
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Popular Guides</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/how-to-wire-money" className="text-blue-700 dark:text-blue-400 font-medium hover:underline block leading-snug">
                  How to Wire Money Using a Routing Number
                </Link>
              </li>
              <li>
                <Link to="/international-wire-guide" className="text-blue-700 dark:text-blue-400 font-medium hover:underline block leading-snug">
                  International Wire Transfers: SWIFT & IBAN
                </Link>
              </li>
              <li>
                <Link to="/find-routing-number-on-check" className="text-blue-700 dark:text-blue-400 font-medium hover:underline block leading-snug">
                  How to Find Your Routing Number Without a Check
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <AdUnit slot="UNIT 2: Mid content, in-article responsive" className="my-10 min-h-[100px] md:min-h-[150px]" />
      
      <RegionalBankDirectory />

      <div className="mt-8 md:mt-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-12 shadow-sm">
        <div className="mt-12 mb-8 bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-3xl p-8 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Complete US Financial Directory</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6">Explore our exhaustive directory of active routing numbers across all 50 states.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/states" 
            className="w-full sm:w-auto bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-bold py-3 px-8 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400 transition-colors shadow-sm"
          >
            Browse Banks by State &rarr;
          </Link>
          <Link 
            to="/banks" 
            className="w-full sm:w-auto bg-blue-600 dark:bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm"
          >
            A-Z Bank Directory &rarr;
          </Link>
        </div>
      </div>

      <FAQSection faqs={faqs} />
      </div>

      <AdUnit slot="UNIT 3: Below FAQ (Mobile)" className="md:hidden mt-10 min-h-[100px]" />

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
