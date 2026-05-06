/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import BankOverview from './pages/BankOverview';
import BankState from './pages/BankState';
import BranchDetail from './pages/BranchDetail';
import Lookup from './pages/Lookup';
import WireTransferGuide from './pages/WireTransferGuide';
import HowToFind from './pages/HowToFind';
import InternationalWireGuide from './pages/InternationalWireGuide';
import StateDirectory from './pages/StateDirectory';
import StateBankList from './pages/StateBankList';
import RoutingVsAccountNumber from './pages/RoutingVsAccountNumber';
import WhatIsAbaRoutingNumber from './pages/WhatIsAbaRoutingNumber';
import WhatIsARoutingNumber from './pages/WhatIsARoutingNumber';
import DirectDepositRoutingNumber from './pages/DirectDepositRoutingNumber';
import FindRoutingNumberOnCheck from './pages/FindRoutingNumberOnCheck';
import RoutingNumberLookup from './pages/RoutingNumberLookup';

import MajorBanks from './pages/MajorBanks';
import CheckDigitCalculator from './pages/CheckDigitCalculator';
import NotFound from './pages/NotFound';

import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

import { Toaster } from 'sonner';
import { ThemeProvider } from './ThemeContext';
import Header from './components/Header';

export default function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-200 dark:selection:bg-blue-900">
          <Header />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/states" element={<StateDirectory />} />
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
              <Route path="/check-digit-calculator" element={<CheckDigitCalculator />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 px-6 shrink-0 mt-20 print:hidden">
            <div className="max-w-7xl mx-auto text-center text-slate-500 dark:text-slate-400 text-sm max-w-3xl">
              <nav className="flex flex-wrap justify-center gap-6 mb-6">
                <Link to="/states" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">Banks By State</Link>
                <Link to="/what-is-a-routing-number" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">What is a Routing Number?</Link>
                <Link to="/find-routing-number-on-check" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">Find it on a Check</Link>
                <Link to="/aba-routing-number" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">ABA Routing Number</Link>
                <Link to="/direct-deposit-routing-number" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">Direct Deposit</Link>
                <Link to="/routing-number-lookup" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">Routing Number Lookup</Link>
                <Link to="/routing-number-vs-account-number" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">Routing vs Account</Link>
              </nav>
              <nav className="flex justify-center gap-6 mb-6">
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
