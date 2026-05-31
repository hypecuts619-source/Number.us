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
import DataIntegrityBadge from '../components/DataIntegrityBadge';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';

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
      {/* Subtle Premium Background Effect */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <SEO 
        title="US Routing Number Lookup: Instant Check & Verification"
        description="Instantly find and verify any US bank routing number. Run client-side Modulo 10 checksum validation to prevent transfer errors. 100% secure."
        canonicalUrl="/"
      >
        {/* Unified Schema Graph to Maximize CTR and Fix Mobile Index Parsing */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "@id": "https://usroutingnumber.com/#webapp",
                "name": "USRoutingNumber.com Verification Engine",
                "url": "https://usroutingnumber.com",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "All",
                "browserRequirements": "Requires JavaScript. Requires HTML5.",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "featureList": "Client-side Modulo 10 check-digit validation, offline local storage tracking, sub-millisecond bank directory search filtering."
              },
              {
                "@type": "Organization",
                "@id": "https://usroutingnumber.com/#organization",
                "name": "USRoutingNumber",
                "url": "https://usroutingnumber.com",
                "logo": "https://usroutingnumber.com/favicon.svg",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "email": "contact@usroutingnumber.com",
                  "contactType": "customer service"
                }
              },
              { ...JSON.parse(generateWebSiteSchema()), "@context": undefined, "@id": "https://usroutingnumber.com/#website" },
              { ...JSON.parse(generateFAQSchema(faqs)), "@context": undefined, "@id": "https://usroutingnumber.com/#faq" }
            ]
          })
        }} />
      </SEO>

      {/* Header - Fixed Intent Alignment to Prevent Search Snippet Overrides */}
      <div className="order-2 md:order-1 text-center mb-8 md:mb-14 mt-8 md:mt-4 relative z-10">
        <div className="mb-6 flex justify-center">
          <DataIntegrityBadge />
        </div>
        <h1 className="text-4xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white tracking-tight leading-[1.1]">
          US Routing Number <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Lookup & Verify
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Instantly access verified routing data for 2026. Secure, authorized Federal Reserve records at your fingertips.
        </p>
        
        {/* Subtle Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
            <svg className="w-5 h-5 text-slate-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
            256-Bit Secure
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
            <svg className="w-5 h-5 text-slate-900 dark:text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
            FedACH Synced
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
            <svg className="w-5 h-5 text-slate-900 dark:text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Sub-millisecond Search
          </div>
        </div>
      </div>

      <div className="order-2 md:order-1 mb-8">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="home-hero-bottom" />
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
        <div className="mb-8 md:mb-16 relative z-20">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white dark:border-slate-700 shadow-2xl shadow-blue-900/10 dark:shadow-none relative group">
            {/* Subtle glow behind the search box */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10"></div>
            
            <div className="flex items-center gap-2 mb-8 justify-center">
              <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full ring-1 ring-blue-100 dark:ring-blue-800">Bank & Routing Directory Search</span>
            </div>
            <SearchBar />
            <p className="text-center mt-6 text-sm font-medium text-slate-500 dark:text-slate-400">
              Type <strong className="text-slate-700 dark:text-slate-300">bank name</strong>, <strong className="text-slate-700 dark:text-slate-300">9-digit number</strong>, or <strong className="text-slate-700 dark:text-slate-300">city</strong>
            </p>
          </div>
        </div>

        {/* Educational Deep-Dive (Added for AdSense Value) */}
        <div className="mb-12 prose prose-slate dark:prose-invert max-w-none px-4">
          <h3 className="text-xl md:text-2xl font-bold mb-4">Understanding United States Routing Transit Numbers (RTN)</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            A Routing Transit Number is a specific nine-digit numerical code utilized by American banking institutions to clear domestic funds, process direct deposits, and facilitate automated clearing house (ACH) transfers. Established by the American Bankers Association (ABA) in 1910, this infrastructure guarantees that transaction payloads reach their precise processing endpoints.
          </p>
          <h3 className="text-xl md:text-2xl font-bold mb-4">How Our Client-Side Modulo 10 Verification Works</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            To eliminate costly financial transfer errors and routing rejections, our platform executes a live, browser-local geometric check-digit calculation. Every authorized routing number satisfies a strict weighted arithmetic verification formula: <code>3(d₁ + d₄ + d₇) + 7(d₂ + d₅ + d₈) + (d₃ + d₆ + d₉) ≡ 0 (mod 10)</code>. If a typographical error breaks this geometric constant, our layout flags the input immediately—protecting your transfers in absolute privacy without tracking your financial data.
          </p>
        </div>

        {/* Featured Financial Resource Guides */}
        <div className="mb-12 px-4">
          <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white">Featured Financial Resource Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/reports/2026-us-credit-union-report" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg transition-all">
               <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 mb-2">2026 Credit Union Report</h3>
               <p className="text-sm text-slate-600 dark:text-slate-400">Discover where Americans are migrating for banking and find the top 10 most accessible credit unions.</p>
            </Link>
            <Link to="/international-wire-guide" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg transition-all">
               <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 mb-2">International Wire Guide</h3>
               <p className="text-sm text-slate-600 dark:text-slate-400">Everything you need to know about Swift codes, IBANs, and avoiding international wire rejection fees.</p>
            </Link>
            <Link to="/how-to-wire-money" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg transition-all">
               <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 mb-2">How to Wire Money</h3>
               <p className="text-sm text-slate-600 dark:text-slate-400">A step-by-step guide to sending domestic wire transfers quickly, securely, and using the right ABA networks.</p>
            </Link>
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
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 rounded-3xl p-8 text-white shadow-xl shadow-indigo-900/20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-4">
                 Featured Research
              </div>
              <h2 className="text-xl font-black mb-2 tracking-tight">2026 Credit Union Migration Report</h2>
              <p className="text-sm text-indigo-100 mb-6 leading-relaxed">
                Why Americans are moving away from Big Tech banking, plus our directory of the Top 10 Most Accessible Credit Unions.
              </p>
              <Link to="/reports/2026-us-credit-union-report" className="inline-flex items-center gap-2 bg-white text-indigo-900 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-50 transition-colors w-full justify-center">
                Read the Full Report <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

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

            {/* Sidebar ad slot removed for global top/bottom placement */}
            <div className="mt-8">
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

          <div className="mt-8 mb-12 text-center text-sm text-slate-500 dark:text-slate-400">
            <span className="font-bold">Browse Routing Numbers by State:</span>{' '}
            <Link to="/states/ca" className="hover:text-blue-600 underline">California</Link> |{' '}
            <Link to="/states/tx" className="hover:text-blue-600 underline">Texas</Link> |{' '}
            <Link to="/states/fl" className="hover:text-blue-600 underline">Florida</Link> |{' '}
            <Link to="/states/ny" className="hover:text-blue-600 underline">New York</Link> |{' '}
            <Link to="/states/il" className="hover:text-blue-600 underline">Illinois</Link> |{' '}
            <Link to="/states/pa" className="hover:text-blue-600 underline">Pennsylvania</Link> |{' '}
            <Link to="/states/oh" className="hover:text-blue-600 underline">Ohio</Link> |{' '}
            <Link to="/states/ga" className="hover:text-blue-600 underline">Georgia</Link>
          </div>

          <FAQSection faqs={faqs} />

          {/* Footer ad slot removed for global bottom placement */}
        </div>

        {/* Floating Action Button (Mobile) */}
        <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
          <div className="relative group">
            {/* Backdrop glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // Optional: Focus the search bar after scrolling
                setTimeout(() => {
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement | null;
                  input?.focus();
                }, 500);
              }}
              className="relative w-full bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-700/50 text-white font-black py-4 px-4 rounded-2xl shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform"
            >
              <Search className="w-5 h-5 text-blue-400" />
              <span>Validate Account Now</span>
            </button>
          </div>
        </div>

        {/* Spacer for sticky button */}
        <div className="md:hidden h-20"></div>
      </div>
    </div>
  );
}
