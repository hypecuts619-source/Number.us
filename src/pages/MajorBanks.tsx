import React from 'react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { generateSlug } from '../lib/generateSlug';
import { Building2, ChevronRight, Landmark } from 'lucide-react';
import SEO from '../components/SEO';
import { generateMajorBanksFAQs } from '../lib/faqTemplates';
import { generateFAQSchema } from '../lib/seoHelpers';
import FAQSection from '../components/FAQSection';
import AdUnit from '../components/AdUnit';

const MAJOR_BANKS = [
  { name: 'JPMorgan Chase Bank', abbreviation: 'Chase' },
  { name: 'Bank of America', abbreviation: 'BofA' },
  { name: 'Wells Fargo Bank', abbreviation: 'Wells Fargo' },
  { name: 'Citibank', abbreviation: 'Citi' },
  { name: 'U.S. Bank', abbreviation: 'US Bank' },
  { name: 'PNC Bank', abbreviation: 'PNC' },
  { name: 'Truist Bank', abbreviation: 'Truist' },
  { name: 'Capital One', abbreviation: 'Capital One' },
  { name: 'TD Bank', abbreviation: 'TD Bank' },
  { name: 'Bank of New York Mellon', abbreviation: 'BNY Mellon' },
  { name: 'State Street Bank and Trust', abbreviation: 'State Street' },
  { name: 'Fifth Third Bank', abbreviation: 'Fifth Third' },
  { name: 'Citizens Bank', abbreviation: 'Citizens' },
  { name: 'KeyBank', abbreviation: 'KeyBank' },
  { name: 'Regions Bank', abbreviation: 'Regions' },
  { name: 'Discover Bank', abbreviation: 'Discover' },
  { name: 'Synchrony Bank', abbreviation: 'Synchrony' },
  { name: 'Ally Bank', abbreviation: 'Ally' },
  { name: 'Huntington National Bank', abbreviation: 'Huntington' },
  { name: 'M&T Bank', abbreviation: 'M&T' }
];

export default function MajorBanks() {
  const faqs = useMemo(() => generateMajorBanksFAQs(), []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <SEO 
        title={`Major US Banks Routing Numbers (${new Date().getFullYear()}) | USRoutingNumber.com`}
        description="Directory of routing numbers for the largest banks in the United States including Chase, Bank of America, Wells Fargo, and Citibank."
        canonicalUrl="/major-banks"
      >
        <script type="application/ld+json">
          {generateFAQSchema(faqs)}
        </script>
      </SEO>

      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-6">
          <Landmark className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
          Major US Banks
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Find routing numbers and wire transfer instructions for the largest financial institutions in the United States.
        </p>
      </div>

      <AdUnit slot="UNIT 1: Below H1, 728x90 leaderboard" className="my-8 min-h-[90px]" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MAJOR_BANKS.map((bank) => {
          const slug = generateSlug(bank.name);
          return (
            <Link 
              key={slug} 
              to={`/routing-number/${slug}`}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group flex items-start justify-between"
            >
              <div>
                <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {bank.name}
                </h2>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {bank.abbreviation}
                </span>
              </div>
              <ChevronRight className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors shrink-0 mt-1" />
            </Link>
          );
        })}
      </div>

      <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
