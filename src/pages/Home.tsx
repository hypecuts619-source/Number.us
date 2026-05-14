import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import AccountValidator from '../components/AccountValidator';
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
import { Heart, Clock, ArrowRight, Search } from 'lucide-react';

export default function Home() {
  const topBanks = getTopSearchedBanks();
  const faqs = useMemo(() => generateHomeFAQs(), []);
  const [isArticleExpanded, setIsArticleExpanded] = useState(false);
  const { favorites, loaded: favsLoaded } = useFavorites();
  const { items: recentItems, loaded: recentLoaded } = useRecentlyViewed();

  const PersonalizationSkeleton = () => (
    <div className="animate-pulse bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 mb-8">
      <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
      <div className="space-y-3">
        <div className="h-12 w-full bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
        <div className="h-12 w-full bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-12 relative flex flex-col">
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

      {/* Header - Desktop Top, Mobile Below Search */}
      <div className="order-2 md:order-1 text-center md:text-left mb-8 md:mb-12 mt-8 md:mt-0">
        <h1 className="text-3xl md:text-6xl font-black mb-4 text-slate-900 dark:text-white tracking-tight leading-tight">
          Financial Routing <span className="text-blue-600 dark:text-blue-400">Dashboard</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto md:mx-0">
          Instantly access verified routing data for 2026. Secure, authorized Federal Reserve records at your fingertips.
        </p>
      </div>

      {/* Main Action Area - Mobile Top, Desktop Below Header */}
      <div className="order-1 md:order-2 flex flex-col w-full">
        {/* 1. Favorites - High Priority Smart Access */}
        {!favsLoaded ? (
          <PersonalizationSkeleton />
        ) : favorites.length > 0 ? (
          <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-3xl p-6 md:p-8 shadow-sm mb-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 text-rose-700 dark:text-rose-400">
                <div className="p-2 bg-white dark:bg-rose-900/20 rounded-xl shadow-sm italic">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight">My Saved Banks</h2>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60">Priority Access</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((bank) => (
                <Link
                  key={bank.slug}
                  to={`/regional-banks/${bank.slug}`}
                  className="flex justify-between items-center group bg-white dark:bg-slate-900 p-4 rounded-2xl border border-rose-200 dark:border-rose-900/20 hover:border-rose-400 hover:shadow-xl hover:shadow-rose-500/5 transition-all outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900 dark:text-white group-hover:text-rose-600 truncate max-w-[140px]">
                      {bank.bankName}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{bank.state}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-rose-300 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {/* 2. Primary Search */}
        <div className="mb-8 md:mb-12 relative z-20">
          <div className="bg-white dark:bg-slate-800/40 p-6 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">Secure Lookup</span>
              <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800"></div>
            </div>
            <SearchBar />
            <p className="text-center mt-6 text-xs font-medium text-slate-400 dark:text-slate-500">
              Search by institution name, routing number, or location.
            </p>
          </div>
        </div>

        {/* 3. Recently Viewed */}
        <div className="mb-12">
          {!recentLoaded ? (
            <PersonalizationSkeleton />
          ) : recentItems.length > 0 ? (
            <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-3 mb-6 text-slate-700 dark:text-slate-300">
                <div className="p-2 bg-white dark:bg-slate-700/50 rounded-xl shadow-sm italic">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-black tracking-tight">Recent Activity</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentItems.slice(0, 3).map((item) => (
                  <Link
                    key={item.routingNumber}
                    to={`/lookup/${item.routingNumber}`}
                    className="group bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 transition-all outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 truncate mb-1">
                        {item.bankName}
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-400">{item.routingNumber}</span>
                        <span className="text-[10px] text-emerald-500 font-black uppercase tracking-tighter">Verified</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Main Content Area - Always Bottom */}
      <div className="order-3 w-full flex flex-col">
        {/* Exploration & Tools */}
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 space-y-12">
                    
          <AccountValidator />

          {/* SEO Text (Pushed Down) */}
          <section className={`relative ${!isArticleExpanded ? 'max-h-[500px] overflow-hidden' : ''}`}>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6">Official US Routing Guide</h2>
            <div className="prose prose-base md:prose-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              <p>
                A routing transit number (RTN) is a nine-digit code used by financial institutions in the United States to identify where an account is held. Established in 1910 by the ABA, it remains the standard for US bank identification today.
              </p>
              
              <CheckDiagram />

              <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white mt-12 mb-4">Verification Standards</h3>
              <p>
                We use the official Federal Reserve routing datasets and the ABA Checksum algorithm to verify every number in our directory. Every 9th digit serves as a mathematical checksum, ensuring that accidental data entry errors can be detected before a payment is processed.
              </p>
            </div>

            {!isArticleExpanded && (
              <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white dark:from-slate-900 to-transparent flex items-end justify-center pb-4">
                <button 
                  onClick={() => setIsArticleExpanded(true)} 
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-black shadow-2xl transition-transform active:scale-95"
                >
                  Expand Complete Guide
                </button>
              </div>
            )}
          </section>

          <RegionalBankDirectory />
        </div>

        <aside className="space-y-8">
          <div className="bg-slate-900 dark:bg-blue-600 rounded-3xl p-8 text-white shadow-2xl shadow-blue-900/20">
            <h2 className="text-xl font-black mb-4">Top Searched Institutions</h2>
            <ul className="space-y-4">
              {topBanks.map((bank, i) => (
                <li key={i}>
                  <Link
                    to={`/routing-number/${generateSlug(bank)}`}
                    className="flex justify-between items-center group"
                  >
                    <span className="font-bold opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      {bank}
                    </span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4">Member Data Authority</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Our Credit Union directory uses 2026 call report data from the <strong>NCUA</strong>.
            </p>
            <Link to="/credit-unions" className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:border-blue-400 transition-colors">
              Directory Access <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

                  </aside>
      </div>

      <div className="mt-16 pt-16 border-t border-slate-100 dark:border-slate-800">
        <div className="mt-8 md:mt-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-12 shadow-sm mb-16">
          <div className="bg-blue-50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700 rounded-3xl p-8 text-center max-w-4xl mx-auto">
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
        </div>

        <FAQSection faqs={faqs} />
      </div>

      {/* Floating Action Button (Mobile) */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-40">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full bg-blue-600 dark:bg-blue-500 text-white font-black py-4 px-4 rounded-2xl shadow-2xl shadow-blue-500/40 flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <Search className="w-5 h-5" />
          <span>Validate Account Now</span>
        </button>
      </div>

      {/* Spacer for sticky button */}
      <div className="md:hidden h-20"></div>
      
      </div> {/* End order-3 w-full flex flex-col */}
    </div>
  );
}
