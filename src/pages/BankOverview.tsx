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
              To effectively and securely process vital financial transactions—such as online bill payments, automated paycheck direct deposits, or rapid domestic wire transfers—with <strong>{bankName}</strong>, 
              you will absolutely need the correct, publicly verified 9-digit American Bankers Association (ABA) routing number. Because financial institutions of this magnitude possess sprawling networks of branches stretching across multiple regions, 
              the specific routing numeric sequence assigned to your account may vary substantially depending on the precise state where your checking or savings account was officially opened. Furthermore, the type of transaction you intend to initiate frequently demands a specialized numerical code.
            </p>
            <p>
              Directing funds blindly can lead to lost capital, bounced transfers, and severe logistical headaches. Below, we provide the most comprehensive, meticulously updated database of routing transit numbers for {bankName}, conveniently arranged and organized alphabetically by state. 
              Please be aware that <strong>ACH direct deposits</strong> (used for standard 2-3 business day transfers like paychecks) and <strong>Wire transfers</strong> (used for same-day, irrevocable transfers) sometimes necessitate entirely distinct code numbers. We highly encourage you to select your specific state from the detailed directory below to review the explicit usage guidelines, confirm compatibility, and guarantee your money successfully arrives destination without any unnecessary delays.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 border-b dark:border-slate-700 pb-2">Extensive Overview of {bankName}</h2>
            <p className="mt-4">{bankDetails.history}</p>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-3">Institutional Mission & Essential Services</h3>
            <p>{bankDetails.mission}</p>
            <p className="mt-3">{bankDetails.services}</p>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4">Historical Milestones & Interesting Facts</h3>
            <ul className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
              <li><strong>Officially Founded:</strong> {bankDetails.facts.foundingYear}</li>
              {bankDetails.facts.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-slate-500">
              Understanding the intricacies of your institutional partner empowers you to leverage their full suite of financial products. Whether you are aiming to open a high-yield savings account, secure an equitable mortgage rate, or simply streamline your daily commercial transactions, keeping these routing details and corporate facts on hand drastically reduces friction.
            </p>
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
