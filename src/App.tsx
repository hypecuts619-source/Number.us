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

import MajorBanks from './pages/MajorBanks';
import CheckDigitCalculator from './pages/CheckDigitCalculator';

import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

import { Toaster } from 'sonner';
import { ThemeProvider } from './ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
      <BrowserRouter>
        <Toaster position="top-center" />
        <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-200 dark:selection:bg-blue-900">
          <header className="border-b border-slate-200 dark:border-slate-800 py-4 px-6 bg-white dark:bg-slate-950 shrink-0 sticky top-0 z-50 shadow-sm dark:shadow-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <Link to="/" className="text-2xl font-black text-[#1e3a5f] dark:text-blue-400 tracking-tight">
                USRouting<span className="text-blue-600 dark:text-blue-300">Number.com</span>
              </Link>
              <nav className="hidden md:flex gap-6 font-semibold text-slate-600 dark:text-slate-300">
                <Link to="/" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">Home</Link>
                <Link to="/major-banks" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">Major Banks</Link>
                <Link to="/check-digit-calculator" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">Calculator</Link>
              </nav>
              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
            </div>
          </header>

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
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
            </Routes>
          </main>

          <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 px-6 shrink-0 mt-20 print:hidden">
            <div className="max-w-7xl mx-auto text-center text-slate-500 dark:text-slate-400 text-sm max-w-3xl">
              <nav className="flex justify-center gap-6 mb-6">
                <Link to="/how-to-wire-money" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">Wire Guide</Link>
                <Link to="/how-to-find-routing-number" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">Find Routing Number</Link>
                <Link to="/international-wire-guide" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">International Wires</Link>
              </nav>
              <nav className="flex justify-center gap-6 mb-6">
                <Link to="/terms-of-service" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
                <Link to="/privacy-policy" className="hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
              </nav>
              <p>&copy; {new Date().getFullYear()} USRoutingNumber.com. All rights reserved.</p>
              <p className="mt-2">Not affiliated with any official government agency, financial institution, or the Federal Reserve.</p>
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
