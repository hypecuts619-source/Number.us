import { Link } from 'react-router-dom';
import { useMemo } from 'react';
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <SEO 
        title="US Bank Routing Number Directory (2026) | USRoutingNumber.com"
        description="Find and verify US bank routing numbers for direct deposit, ACH, and wire transfers. Search ~70,000 official Federal Reserve routing codes."
        canonicalUrl="/"
      >
        <script type="application/ld+json">
          {generateFAQSchema(faqs)}
        </script>
      </SEO>

      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">
          Find Any US Bank Routing Number
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
          Verify ACH, direct deposit, and wire transfer routing numbers for over 25,000 active US bank institutions. Search by bank name below.
        </p>
        <div className="max-w-3xl mx-auto">
          <SearchBar />
        </div>
      </div>

      <AccountValidator />

      <AdUnit slot="UNIT 1: Below Validation Tool, 728x90 leaderboard" className="min-h-[90px] my-10" />

      <div className="grid md:grid-cols-3 gap-12 mt-8">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">What is a Routing Number?</h2>
          <div className="prose prose-lg text-slate-600 dark:text-slate-300">
            <p>
              A routing transit number (RTN) is a nine-digit code used by banks in the United States to identify the financial institution that holds the account. Created by the American Bankers Association (ABA) in 1910, these digits are essential for facilitating transactions such as electronic funds transfers, direct deposits, bill payments, and wire transfers.
            </p>
            
            <CheckDiagram />

            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-12 mb-4 text-center">Reverse Lookup: Find Your Bank</h3>
            <p className="text-center">
              Have a 9 digit number and want to know what bank it belongs to? Use our reverse lookup tool at the top of the page. Enter any valid 9-digit ABA code to INSTANTLY reveal the bank name, branch city, and whether it supports ACH or Wire.
            </p>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-12 mb-4">How we verify routing numbers</h3>
            <p>
              To ensure mathematical accuracy and verify whether a routing number is structurally valid, we employ the official ABA Checksum validation algorithm. The first 8 digits of the routing number indicate the Federal Reserve routing symbol and the ABA institution identifier. The 9th digit is a checksum. 
            </p>
            <p>
              By multiplying each digit by its specific weight (3, 7, or 1 based on its position) and summing the results, we can calculate if the number is valid. A valid routing number will always result in a sum that is a multiple of 10. You can type any 9-digit number into our search bar to run this mathematical validation instantly.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Top Searched Banks</h2>
            <ul className="space-y-3">
              {topBanks.map((bank, i) => (
                <li key={i}>
                  <Link
                    to={`/routing-number/${generateSlug(bank)}`}
                    className="flex justify-between items-center group"
                  >
                    <span className="text-blue-700 font-medium group-hover:text-blue-900 group-hover:underline">
                      {bank}
                    </span>
                    <span className="text-slate-400 text-sm bg-white border border-slate-200 px-2 py-0.5 rounded">View</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <AdUnit slot="UNIT 2: Mid content, in-article responsive" className="my-12 min-h-[150px]" />

      <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
