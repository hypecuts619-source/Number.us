import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getRoutingByBank, getStateFullName, getTopSearchedBanks, getRelatedBanks } from '../lib/getData';
import { generateSlug, unslug } from '../lib/generateSlug';
import { generateBankOverviewTitle, generateBankOverviewDescription, generateFAQSchema, generateBreadcrumbSchema } from '../lib/seoHelpers';
import { generateGeneralBankFAQs } from '../lib/faqTemplates';
import { getBankDetails } from '../lib/bankDetails';
import BreadcrumbNav from '../components/BreadcrumbNav';
import AdUnit from '../components/AdUnit';
import FAQSection from '../components/FAQSection';
import RelatedLinks from '../components/RelatedLinks';
import SEO from '../components/SEO';
import VerifiedBadge from '../components/VerifiedBadge';

import TrustIndicator from '../components/TrustIndicator';

export default function BankOverview() {
  const { bankSlug } = useParams<{ bankSlug: string }>();
  
  const bankData = useMemo(() => {
    if (!bankSlug) return [];
    return getRoutingByBank(bankSlug);
  }, [bankSlug]);

  if (!bankData || bankData.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Bank Not Found</h1>
        <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  const bankName = bankData[0].bank_name;
  const currentYear = new Date().getFullYear();
  
  const faqs = generateGeneralBankFAQs(bankName);
  const bankDetails = useMemo(() => getBankDetails(bankName), [bankName]);
  
  // Group by state
  const states = Array.from(new Set(bankData.map(d => d.state))).sort() as string[];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SEO 
        title={generateBankOverviewTitle(bankName)}
        description={generateBankOverviewDescription(bankName)}
        canonicalUrl={`/routing-number/${bankSlug}`}
      >
        <script type="application/ld+json">
          {generateBreadcrumbSchema([
            { name: bankName, url: `https://usroutingnumber.com/routing-number/${bankSlug}` }
          ])}
        </script>
        <script type="application/ld+json">
          {generateFAQSchema(faqs)}
        </script>
      </SEO>

      <BreadcrumbNav crumbs={[{ name: bankName, url: `/routing-number/${bankSlug}` }]} />

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
        {bankName} Routing Number 2026 — All States
      </h1>
      
      <VerifiedBadge />
      <TrustIndicator />

      <AdUnit slot="UNIT 1: Below H1, 728x90 leaderboard" className="min-h-[90px]" />

      <div className="grid md:grid-cols-3 gap-12 mt-10">
        <div className="md:col-span-2">
          <div className="prose prose-lg prose-slate dark:prose-invert text-slate-600 dark:text-slate-300 mb-10 max-w-none">
            <p>
              To process payments, direct deposits, or wire transfers with <strong>{bankName}</strong>, 
              you will need the correct 9-digit routing number. Due to the size of the bank, 
              routing numbers may vary depending on the state where you opened your account or the type of transaction.
            </p>
            <p>
              Below is the comprehensive list of routing numbers for {bankName} organized by state. 
              <strong>ACH direct deposits</strong> and <strong>Wire transfers</strong> sometimes require different numbers, so be sure to click your state to see the specific usage guidelines.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4 border-b dark:border-slate-700 pb-2">About {bankName}</h2>
            <p>{bankDetails.history}</p>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-6 mb-3">Mission & Key Services</h3>
            <p>{bankDetails.mission}</p>
            <p>{bankDetails.services}</p>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-6 mb-4">Interesting Facts</h3>
            <ul className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
              <li><strong>Founded:</strong> {bankDetails.facts.foundingYear}</li>
              {bankDetails.facts.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b dark:border-slate-700 pb-2">{bankName} Locations by State</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {states.map(state => (
              <Link 
                key={state}
                to={`/routing-number/${bankSlug}/${state.toLowerCase()}`}
                className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group"
              >
                <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400">{getStateFullName(state)}</span>
                <span className="text-sm bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-1 rounded font-mono group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-300">
                  {bankData.filter(d => d.state === state).length} number(s)
                </span>
              </Link>
            ))}
          </div>

          <AdUnit slot="UNIT 2: Mid content, in-article responsive" className="my-12 min-h-[150px]" />

          <FAQSection faqs={faqs} />
          
          <AdUnit slot="UNIT 3: After FAQ, 300x250 display" className="min-h-[250px] max-w-[300px] mx-auto" />
        </div>

        <aside className="space-y-8">
          <RelatedLinks 
            title="Related Banks" 
            links={getRelatedBanks(bankName, 8).map(b => ({
              name: b,
              url: `/routing-number/${generateSlug(b)}`
            }))}
          />
        </aside>
      </div>
    </div>
  );
}
