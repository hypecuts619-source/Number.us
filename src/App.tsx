/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
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
            {!dataLoaded ? (
              <div className="min-h-[60vh] flex flex-col items-center justify-center">
                 <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <Suspense fallback={
                <div className="min-h-[60vh] flex flex-col items-center justify-center">
                   <div className="w-10 h-10 border-4 border-slate-300 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/banks" element={<AllBanksDirectory />} />
                  <Route path="/states" element={<StateDirectory />} />
                  <Route path="/states/ca" element={<CaliforniaRoutingNumbers />} />
                  <Route path="/states/:state" element={<StateBankList />} />
                  <Route path="/routing-number-vs-account-number" element={<RoutingVsAccountNumber />} />
                  <Route path="/what-is-a-routing-number" element={<WhatIsARoutingNumber />} />
                  <Route path="/aba-routing-number" element={<WhatIsAbaRoutingNumber />} />
                  <Route path="/direct-deposit-routing-number" element={<DirectDepositRoutingNumber />} />
                  <Route path="/find-routing-number-on-check" element={<FindRoutingNumberOnCheck />} />
                  <Route path="/routing-number-lookup" element={<RoutingNumberLookup />} />
                  <Route path="/major-banks" element={<MajorBanks />} />
                  <Route path="/routing-number/:bankSlug" element={<BankOverview />} />
                  <Route path="/routing-number/:bankSlug/:state" element={<BankState />} />
                  <Route path="/routing-number/:bankSlug/:state/:city" element={<BranchDetail />} />
                  <Route path="/lookup/:routingNumber" element={<Lookup />} />
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
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            )}
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
              <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                <strong>Disclaimer:</strong> The routing numbers and financial information provided on this website are for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information. Always verify routing numbers directly with your financial institution before initiating any wire transfers or transactions. The website owners are not liable for any financial losses, delayed transactions, or damaged caused by the use of this information. All bank names and trademarks are the property of their respective owners and are used here under nominative fair use for identification purposes only.
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
}
