/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';

import Home from './pages/Home';
const BankOverview = lazy(() => import('./pages/BankOverview'));
const BankState = lazy(() => import('./pages/BankState'));
const BranchDetail = lazy(() => import('./pages/BranchDetail'));
const Lookup = lazy(() => import('./pages/Lookup'));
const WireTransferGuide = lazy(() => import('./pages/WireTransferGuide'));
const HowToFind = lazy(() => import('./pages/HowToFind'));
const InternationalWireGuide = lazy(() => import('./pages/InternationalWireGuide'));
const ZelleRoutingNumber = lazy(() => import('./pages/ZelleRoutingNumber'));
const RoutingNumberValidator = lazy(() => import('./pages/RoutingNumberValidator'));
const StateDirectory = lazy(() => import('./pages/StateDirectory'));
const StateBankList = lazy(() => import('./pages/StateBankList'));
const RoutingVsAccountNumber = lazy(() => import('./pages/RoutingVsAccountNumber'));
const WhatIsAbaRoutingNumber = lazy(() => import('./pages/WhatIsAbaRoutingNumber'));
const WhatIsARoutingNumber = lazy(() => import('./pages/WhatIsARoutingNumber'));
const DirectDepositRoutingNumber = lazy(() => import('./pages/DirectDepositRoutingNumber'));
const FindRoutingNumberOnCheck = lazy(() => import('./pages/FindRoutingNumberOnCheck'));
const RoutingNumberLookup = lazy(() => import('./pages/RoutingNumberLookup'));
const RegionalBanksLanding = lazy(() => import('./pages/RegionalBanksLanding'));
const RegionalBankOverview = lazy(() => import('./pages/RegionalBankOverview'));
const EssentialGuide = lazy(() => import('./pages/EssentialGuide'));
const ACHvsWire = lazy(() => import('./pages/ACHvsWire'));
const SecureTransfers = lazy(() => import('./pages/SecureTransfers'));
const RejectedRoutingFix = lazy(() => import('./pages/RejectedRoutingFix'));
const CreditUnionDirectory = lazy(() => import('./pages/CreditUnionDirectory'));
const GlossaryTerm = lazy(() => import('./pages/GlossaryTerm'));
const AlphabeticalDirectoryPage = lazy(() => import('./pages/AlphabeticalDirectoryPage'));
const WebmasterTools = lazy(() => import('./pages/WebmasterTools'));

const MajorBanks = lazy(() => import('./pages/MajorBanks'));
const CheckDigitCalculator = lazy(() => import('./pages/CheckDigitCalculator'));
const NotFound = lazy(() => import('./pages/NotFound'));

const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Blog = lazy(() => import('./pages/Blog'));
const Changes2026 = lazy(() => import('./pages/Changes2026'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const CaliforniaRoutingNumbers = lazy(() => import('./pages/CaliforniaRoutingNumbers'));
const AllBanksDirectory = lazy(() => import('./pages/AllBanksDirectory'));

import { Toaster } from 'sonner';
import { ThemeProvider } from './ThemeContext';
import Header from './components/Header';

import FooterLinks from './components/FooterLinks';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetch('/data/routing.json')
      .then(res => res.json())
      .then(data => {
        window.__ROUTING_DATA__ = data;
        setDataLoaded(true);
      })
      .catch(err => {
        console.error('Failed to load routing data', err);
        window.__ROUTING_DATA__ = [];
        setDataLoaded(true);
      });
  }, []);

  return (
    <ThemeProvider>
      <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-center" />
        <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-200 dark:selection:bg-blue-900">
          <Header />

          <main className="flex-grow">
            <Suspense fallback={
              <div className="min-h-[60vh] flex flex-col items-center justify-center">
                 <div className="w-10 h-10 border-4 border-slate-300 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            }>
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
                <Route path="/blog" element={<Blog />} />
                <Route path="/check-digit-calculator" element={<CheckDigitCalculator />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/routing-number-vs-account-number" element={<RoutingVsAccountNumber />} />
                <Route path="/what-is-a-routing-number" element={<WhatIsARoutingNumber />} />
                <Route path="/aba-routing-number" element={<WhatIsAbaRoutingNumber />} />
                <Route path="/direct-deposit-routing-number" element={<DirectDepositRoutingNumber />} />
                <Route path="/find-routing-number-on-check" element={<FindRoutingNumberOnCheck />} />

                {/* Data Dependent Pages - We can conditionally render them or their data will re-render anyway given App's state update. Since App's state update to dataLoaded=true causes a re-render from the top down, they will render empty initially and flesh out, WHICH IS EXACTLY WHAT WE WANT to prevent LCP blocking! 
                    However, some data pages might break if they parse empty data, but if they worked before with an empty array we can let them render. Let's just render them. 
                */}
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
            </Suspense>
          </main>

          <footer className="bg-slate-50 dark:bg-slate-900 overflow-hidden shrink-0 mt-20 print:hidden pt-8 pb-12 px-6">
            <FooterLinks />
            <div className="max-w-7xl mx-auto text-center text-slate-500 dark:text-slate-400 text-sm max-w-3xl">
              <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-6">
                <Link to="/about-us" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">About Us</Link>
                <Link to="/terms-of-service" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
                <Link to="/privacy-policy" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
              </nav>
              <p>&copy; {new Date().getFullYear()} USRoutingNumber.com. All rights reserved.</p>
              <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-4xl mx-auto">
                <strong>Important Medical & Financial Disclaimer:</strong> USRoutingNumber.com is an independent educational publisher and is <strong>NOT</strong> a bank, financial institution, broker, or investment advisor. The information provided on this website is for general informational and educational purposes only and does not constitute financial, legal, or professional advice. While we strive to maintain our database using public records from the Federal Reserve and other regulatory bodies, we make no guarantees regarding the completeness, accuracy, or current validity of any routing numbers, SWIFT codes, or institutional data. <strong>Always verify</strong> routing numbers, wire instructions, and transaction details directly with your official financial institution before initiating any wire transfers, direct deposits, or ACH transactions. USRoutingNumber.com and its authors are not liable for any misrouted funds, financial losses, delayed transactions, return fees, or damages arising from reliance on this information. All bank names, logos, and trademarks are the property of their respective owners and are used strictly under nominative fair use for identification purposes.
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
}
