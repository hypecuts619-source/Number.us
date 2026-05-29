/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Home from './pages/Home';
import BankOverview from './pages/BankOverview';
import BankState from './pages/BankState';
import BranchDetail from './pages/BranchDetail';
import Lookup from './pages/Lookup';
import WireTransferGuide from './pages/WireTransferGuide';
import HowToFind from './pages/HowToFind';
import InternationalWireGuide from './pages/InternationalWireGuide';
import ZelleRoutingNumber from './pages/ZelleRoutingNumber';
import RoutingNumberValidator from './pages/RoutingNumberValidator';
import StateDirectory from './pages/StateDirectory';
import StateBankList from './pages/StateBankList';
import RoutingVsAccountNumber from './pages/RoutingVsAccountNumber';
import WhatIsAbaRoutingNumber from './pages/WhatIsAbaRoutingNumber';
import WhatIsARoutingNumber from './pages/WhatIsARoutingNumber';
import DirectDepositRoutingNumber from './pages/DirectDepositRoutingNumber';
import FindRoutingNumberOnCheck from './pages/FindRoutingNumberOnCheck';
import RoutingNumberLookup from './pages/RoutingNumberLookup';
import RegionalBanksLanding from './pages/RegionalBanksLanding';
import RegionalBankOverview from './pages/RegionalBankOverview';
import EssentialGuide from './pages/EssentialGuide';
import ACHvsWire from './pages/ACHvsWire';
import SecureTransfers from './pages/SecureTransfers';
import RejectedRoutingFix from './pages/RejectedRoutingFix';
import CreditUnionDirectory from './pages/CreditUnionDirectory';
import GlossaryTerm from './pages/GlossaryTerm';
import AlphabeticalDirectoryPage from './pages/AlphabeticalDirectoryPage';
import WebmasterTools from './pages/WebmasterTools';

import MajorBanks from './pages/MajorBanks';
import CheckDigitCalculator from './pages/CheckDigitCalculator';
import NotFound from './pages/NotFound';

import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Blog from './pages/Blog';
import Changes2026 from './pages/Changes2026';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import CaliforniaRoutingNumbers from './pages/CaliforniaRoutingNumbers';
import AllBanksDirectory from './pages/AllBanksDirectory';
import HTMLSitemap from './pages/HTMLSitemap';
import CreditUnionReport2026 from './pages/CreditUnionReport2026';

import TheUltimateGuideToACHTransfers from './pages/TheUltimateGuideToACHTransfers';
import WireTransfersDemystified from './pages/WireTransfersDemystified';
import BankMergersAndRoutingNumbers from './pages/BankMergersAndRoutingNumbers';
import TheFutureOfInstantPayments from './pages/TheFutureOfInstantPayments';
import RoutingNumberSecurityProtocols from './pages/RoutingNumberSecurityProtocols';
import AnatomyOfACheck from './pages/AnatomyOfACheck';
import InternationalVsDomesticRouting from './pages/InternationalVsDomesticRouting';
import UnderstandingTheModulus10Algorithm from './pages/UnderstandingTheModulus10Algorithm';
import DigitalBankingShift2026 from './pages/DigitalBankingShift2026';

import { Toaster } from 'sonner';
import { ThemeProvider } from './ThemeContext';
import Header from './components/Header';

import FooterLinks from './components/FooterLinks';
import ScrollToTop from './components/ScrollToTop';

import AdsterraNativeSlot from './components/AdsterraNativeSlot';

// For SSR support
export function AppContent({ dataLoaded }: { dataLoaded: boolean }) {
  return (
    <ThemeProvider>
        <ScrollToTop />
        <Toaster position="top-right" />
        <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-200 dark:selection:bg-blue-900 pb-24 md:pb-0">
          <Header />

          <main className="flex-grow">
              <Routes>
                {/* Pages that do not strictly require routing data to render */}
                <Route path="/" element={<Home />} />
                <Route path="/how-to-wire-money" element={<WireTransferGuide />} />
                <Route path="/international-wire-guide" element={<InternationalWireGuide />} />
                <Route path="/how-to-find-routing-number" element={<HowToFind />} />
                <Route path="/zelle-routing-number" element={<ZelleRoutingNumber />} />
                <Route path="/routing-number-validator" element={<RoutingNumberValidator />} />
                <Route path="/routing-number-changes-2026" element={<Changes2026 />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/check-digit-calculator" element={<CheckDigitCalculator />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/sitemap" element={<HTMLSitemap />} />
                <Route path="/reports/2026-us-credit-union-report" element={<CreditUnionReport2026 />} />
                <Route path="/routing-number-vs-account-number" element={<RoutingVsAccountNumber />} />
                <Route path="/what-is-a-routing-number" element={<WhatIsARoutingNumber />} />
                <Route path="/aba-routing-number" element={<WhatIsAbaRoutingNumber />} />
                <Route path="/direct-deposit-routing-number" element={<DirectDepositRoutingNumber />} />
                <Route path="/find-routing-number-on-check" element={<FindRoutingNumberOnCheck />} />

                {/* Data Dependent Pages */}
                <Route path="/banks" element={!dataLoaded ? <div className="min-h-[60vh] flex justify-center items-center"><div className="w-10 h-10 border-4 border-t-blue-500 rounded-full animate-spin"></div></div> : <AllBanksDirectory />} />
                <Route path="/states" element={!dataLoaded ? <div className="min-h-[60vh] flex justify-center items-center"><div className="w-10 h-10 border-4 border-t-blue-500 rounded-full animate-spin"></div></div> : <StateDirectory />} />
                <Route path="/states/ca" element={!dataLoaded ? <div className="min-h-[60vh] flex justify-center items-center"><div className="w-10 h-10 border-4 border-t-blue-500 rounded-full animate-spin"></div></div> : <CaliforniaRoutingNumbers />} />
                <Route path="/states/:state" element={!dataLoaded ? <div className="min-h-[60vh] flex justify-center items-center"><div className="w-10 h-10 border-4 border-t-blue-500 rounded-full animate-spin"></div></div> : <StateBankList />} />
                
                <Route path="/routing-number-lookup" element={<RoutingNumberLookup />} />
                <Route path="/regional-banks" element={<RegionalBanksLanding />} />
                <Route path="/regional-banks/:bankSlug" element={<RegionalBankOverview />} />
              <Route path="/how-to-find-routing-number-guide" element={<EssentialGuide />} />
              <Route path="/blog/ach-vs-wire-routing-guide" element={<ACHvsWire />} />
              <Route path="/blog/secure-wire-transfer-guide" element={<SecureTransfers />} />
              <Route path="/blog/rejected-routing-number-troubleshooting" element={<RejectedRoutingFix />} />

              <Route path="/blog/ultimate-guide-to-ach-transfers" element={<TheUltimateGuideToACHTransfers />} />
              <Route path="/blog/wire-transfers-demystified" element={<WireTransfersDemystified />} />
              <Route path="/blog/bank-mergers-routing-numbers" element={<BankMergersAndRoutingNumbers />} />
              <Route path="/blog/future-instant-payments-fednow" element={<TheFutureOfInstantPayments />} />
              <Route path="/blog/routing-number-security" element={<RoutingNumberSecurityProtocols />} />
              <Route path="/blog/anatomy-of-a-check" element={<AnatomyOfACheck />} />
              <Route path="/blog/international-vs-domestic-routing" element={<InternationalVsDomesticRouting />} />
              <Route path="/blog/understanding-modulus-10-algorithm" element={<UnderstandingTheModulus10Algorithm />} />
              <Route path="/blog/digital-banking-shift-2026" element={<DigitalBankingShift2026 />} />

              <Route path="/credit-unions" element={<CreditUnionDirectory />} />
              <Route path="/glossary/:slug" element={<GlossaryTerm />} />
              <Route path="/banks/a-z" element={<AlphabeticalDirectoryPage />} />
              <Route path="/banks/a-z/:letter" element={<AlphabeticalDirectoryPage />} />
              <Route path="/webmaster-tools" element={<WebmasterTools />} />
                <Route path="/major-banks" element={<MajorBanks />} />
                
                {/* Specific lookups that absolutely need data */}
                <Route path="/routing-number/:bankSlug" element={!dataLoaded ? <div className="min-h-[60vh]"></div> : <BankOverview />} />
                <Route path="/routing-number/:bankSlug/:state" element={!dataLoaded ? <div className="min-h-[60vh]"></div> : <BankState />} />
                <Route path="/routing-number/:bankSlug/:state/:city" element={!dataLoaded ? <div className="min-h-[60vh]"></div> : <BranchDetail />} />
                <Route path="/lookup/:routingNumber" element={!dataLoaded ? <div className="min-h-[60vh]"></div> : <Lookup />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
          </main>

          {/* Global Ad Slot: Before Footer */}
          <div className="w-full max-w-7xl mx-auto px-4 mt-8 mb-4 flex justify-center">
            <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="bottom-global" />
          </div>

          <footer className="bg-slate-50 dark:bg-slate-900 overflow-hidden shrink-0 mt-20 print:hidden pt-8 pb-12 px-6">
            <FooterLinks />
            <div className="max-w-7xl mx-auto w-full text-center">
              <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-6 text-sm">
                <Link to="/about-us" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-blue-400 transition-colors">About Us</Link>
                <Link to="/contact-us" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-blue-400 transition-colors">Contact Us</Link>
                <Link to="/sitemap" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-blue-400 transition-colors">Site Map</Link>
                <Link to="/terms-of-service" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
                <Link to="/privacy-policy" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
              </nav>
              
              <div className="flex justify-center items-center gap-6 mb-8">
                <a href="https://x.com/StephenSeb12450" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors" aria-label="X (Twitter)">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://in.pinterest.com/hypecuts619/routing-numbers/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#e60023] transition-colors" aria-label="Pinterest">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z"/>
                  </svg>
                </a>
              </div>

              <div className="flex justify-center mb-8">
                <a href="https://www.producthunt.com/products/usroutingnumber-com?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-usroutingnumber-com" target="_blank" rel="noopener noreferrer">
                  <img alt="Usroutingnumber.com - Get routing number in 1 click | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1149262&amp;theme=neutral&amp;t=1779084964430" />
                </a>
              </div>

              <div className="w-full border-t border-slate-200 dark:border-slate-800 pt-8 mt-2">
                <div className="max-w-4xl mx-auto px-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-4">
                    &copy; {new Date().getFullYear()} USRoutingNumber.com. All rights reserved.
                  </p>
                  
                  <p className="text-[11px] text-slate-500 dark:text-slate-500 leading-relaxed text-left sm:text-center">
                    <strong>Important Financial &amp; Educational Disclaimer:</strong> USRoutingNumber.com is an independent educational publisher and is NOT a bank, financial institution, broker, or investment advisor. The information provided on this website is for general informational and educational purposes only and does not constitute financial, legal, or professional advice. While we strive to maintain our database using public records from the Federal Reserve and other regulatory bodies, we make no guarantees regarding the completeness, accuracy, or current validity of any routing numbers, SWIFT codes, or institutional data. Always verify routing numbers, wire instructions, and transaction details directly with your official financial institution before initiating any wire transfers, direct deposits, or ACH transactions. USRoutingNumber.com and its authors are not liable for any misrouted funds, financial losses, delayed transactions, return fees, or damages arising from reliance on this information. All bank names, logos, and trademarks are the property of their respective owners and are used strictly under nominative fair use for identification purposes.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
    </ThemeProvider>
  );
}

export default function App({ initialData = null, RouterComponent = BrowserRouter, routerProps = {}, helmetContext = {} }: any) {
  const [dataLoaded, setDataLoaded] = useState(!!initialData);

  useEffect(() => {
    if (initialData) {
      if (typeof window !== 'undefined') {
        (window as any).__ROUTING_DATA__ = initialData;
      }
      return;
    }
    
    fetch('/data/routing.json')
      .then(res => res.json())
      .then(data => {
        (window as any).__ROUTING_DATA__ = data;
        setDataLoaded(true);
      })
      .catch(err => {
        console.error('Failed to load routing data', err);
        (window as any).__ROUTING_DATA__ = [];
        setDataLoaded(true);
      });
  }, [initialData]);

  return (
    <HelmetProvider context={helmetContext}>
      <RouterComponent {...routerProps}>
        <AppContent dataLoaded={dataLoaded} />
      </RouterComponent>
    </HelmetProvider>
  );
}
