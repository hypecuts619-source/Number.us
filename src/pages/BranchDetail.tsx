import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getRoutingByBankStateAndCity, getStateFullName, getRoutingByBank, getOtherBanksInState } from '../lib/getData';
import { generateSlug, unslug } from '../lib/generateSlug';
import { 
  generateBankStateTitle, 
  generateBankStateDescription, 
  generateBreadcrumbSchema, 
  generateFAQSchema,
  generateFinancialInstitutionSchema
} from '../lib/seoHelpers';
import { generateBankStateFAQs } from '../lib/faqTemplates';
import BreadcrumbNav from '../components/BreadcrumbNav';
import RoutingNumberCard from '../components/RoutingNumberCard';
import DirectDepositFormGenerator from '../components/DirectDepositFormGenerator';
import AdUnit from '../components/AdUnit';
import FAQSection from '../components/FAQSection';
import RelatedLinks from '../components/RelatedLinks';
import { MapPin, Phone, Building2 } from 'lucide-react';
import Tooltip from '../components/Tooltip';
import SEO from '../components/SEO';
import VerifiedBadge from '../components/VerifiedBadge';
import TrustIndicator from '../components/TrustIndicator';

export default function BranchDetail() {
  const { bankSlug, state, city: citySlug } = useParams<{ bankSlug: string, state: string, city: string }>();

  const dataList = useMemo(() => {
    if (!bankSlug || !state || !citySlug) return [];
    return getRoutingByBankStateAndCity(bankSlug, state, citySlug);
  }, [bankSlug, state, citySlug]);

  const bankName = dataList.length > 0 ? dataList[0].bank_name : '';
  const stateFullName = getStateFullName(state || '');
  const cityTitle = unslug(citySlug || '');

  const otherStates = useMemo(() => {
     if (!bankSlug) return [];
     const bankData = getRoutingByBank(bankSlug);
     return Array.from(new Set(bankData.map(d => d.state))).filter(s => s.toLowerCase() !== state?.toLowerCase());
  }, [bankSlug, state]);

  const otherBanksInState = useMemo(() => {
    if (!state || !bankName) return [];
    return getOtherBanksInState(state, bankName, 5);
  }, [state, bankName]);

  if (dataList.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">Branch Detail Not Found</h1>
        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">Return Home</Link>
      </div>
    );
  }

  const primaryData = dataList[0];
  const currentYear = new Date().getFullYear();
  const faqs = generateBankStateFAQs(bankName, stateFullName, primaryData.routing_number, primaryData.type);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SEO 
        title={`${bankName} Routing Number ${cityTitle}, ${stateFullName} 2026`}
        description={`Verified ${bankName} routing number for branches in ${cityTitle}, ${stateFullName}. Details for ACH, wire transfers, and address at ${primaryData.address}.`}
        canonicalUrl={`/routing-number/${bankSlug}/${state?.toLowerCase()}/${citySlug}`}
      >
        <script type="application/ld+json">
          {generateBreadcrumbSchema([
            { name: bankName, url: `https://usroutingnumber.com/routing-number/${bankSlug}` },
            { name: stateFullName, url: `https://usroutingnumber.com/routing-number/${bankSlug}/${state?.toLowerCase()}` },
            { name: cityTitle, url: `https://usroutingnumber.com/routing-number/${bankSlug}/${state?.toLowerCase()}/${citySlug}` }
          ])}
        </script>
        <script type="application/ld+json">
          {generateFAQSchema(faqs)}
        </script>
        <script type="application/ld+json">
          {generateFinancialInstitutionSchema(
            bankName, 
            primaryData.routing_number, 
            primaryData.address, 
            primaryData.city, 
            primaryData.state, 
            primaryData.zip, 
            primaryData.phone
          )}
        </script>
      </SEO>

      <BreadcrumbNav crumbs={[
        { name: bankName, url: `/routing-number/${bankSlug}` },
        { name: stateFullName, url: `/routing-number/${bankSlug}/${state?.toLowerCase()}` },
        { name: cityTitle, url: `/routing-number/${bankSlug}/${state?.toLowerCase()}/${citySlug}` }
      ]} />

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-4">
        {bankName} Routing Number {cityTitle}, {stateFullName} 2026
      </h1>
      <p className="text-xl text-slate-500 dark:text-slate-400 mb-6">{currentYear} Official Branch Routing Information</p>

      <VerifiedBadge />
      <TrustIndicator />

      <AdUnit slot="UNIT 1: Below H1, 728x90 leaderboard" className="my-8 min-h-[90px]" />

      <div className="grid lg:grid-cols-3 gap-12 mt-8">
        <div className="lg:col-span-2 space-y-12">
          
          <RoutingNumberCard data={primaryData} />

          <DirectDepositFormGenerator bankName={bankName} routingNumber={primaryData.routing_number} />

          <section className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
              <Building2 className="text-blue-600 dark:text-blue-400" /> Branch Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <MapPin className="text-slate-400 shrink-0 mt-1" />
                <div>
                  <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Address</div>
                  <div className="text-lg font-medium text-slate-800 dark:text-slate-200">
                    {primaryData.address}<br />
                    {primaryData.city}, {primaryData.state} {primaryData.zip !== 'Unknown' && primaryData.zip}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="text-slate-400 shrink-0 mt-1" />
                <div>
                  <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Phone</div>
                  <div className="text-lg font-medium text-slate-800 dark:text-slate-200">{primaryData.phone}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden relative border border-slate-300 dark:border-slate-700">
               <iframe 
                 title={`Map of ${bankName} in ${cityTitle}`}
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 src={`https://maps.google.com/maps?q=${encodeURIComponent(`${primaryData.address}, ${primaryData.city}, ${primaryData.state} ${primaryData.zip !== 'Unknown' ? primaryData.zip : ''}`)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                 allowFullScreen
               ></iframe>
            </div>
          </section>

          <article className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-300 max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 capitalize">ABA routing number for {bankName}</h2>
            <p>
              When setting up any financial transaction, using the correct <strong>ABA routing number for {bankName}</strong> ensures your money reaches the right branch in <strong>{cityTitle}, {stateFullName}</strong>.
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3 capitalize">{bankName} routing number for direct deposit</h3>
            <p>
              To set up your paycheck or tax returns, you need your ACH direct deposit information. 
              {primaryData.type === 'ACH' || primaryData.type === 'BOTH' 
                ? `The number ${primaryData.routing_number} is the correct ${bankName} routing number for direct deposit to accounts at this branch.`
                : `Caution: This specific number does not fully support ACH direct deposits. Please verify you are using the correct account.`}
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3 capitalize">{bankName} wire transfer routing number</h3>
            <p>
              When sending a domestic wire transfer to this <strong>{cityTitle}, {stateFullName}</strong> branch, 
              you must use the specific wire routing number. Based on the Federal Reserve record, 
              {(primaryData.type === 'WIRE' || primaryData.type === 'BOTH') 
                 ? `you can use ${primaryData.routing_number} as your ${bankName} wire transfer routing number.` 
                 : `this routing number DOES NOT support wire transfers. You must ask ${bankName} for their specific wire routing number.`}
            </p>
            <p>
              <Tooltip text="Society for Worldwide Interbank Financial Telecommunication code, distinct from a standard ABA routing number.">
                <strong>SWIFT/BIC code</strong>
              </Tooltip> is required for international wire transfers coming from outside the United States. 
              Always notify the bank before receiving large international transfers to avoid processing delays.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12" id="routing-vs-account">routing number vs account number</h2>
            <p>
              Understanding the difference between a <strong>routing number vs account number</strong> is crucial for setting up your {bankName} account properly:
            </p>
            <ul>
              <li><strong>Routing Number:</strong> Identifies this exact {bankName} branch. All customers at this location use the same routing number.</li>
              <li><strong>Account Number:</strong> Uniquely identifies your personal or business account. Only you use this number.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12">How to verify your {bankName} routing number</h2>
            <p>
              Security is paramount when dealing with financial identifiers. To ensure you have the correct number for your 
              <strong>{bankName}</strong> account in <strong>{cityTitle}</strong>, follow these standard checks:
            </p>
            <ul>
              <li>
                <Tooltip text="Magnetic Ink Character Recognition"><strong>MICR characters</strong></Tooltip> at the bottom left-hand corner of your check. The first 9 digits represent your routing number.
              </li>
              <li><strong>Bank Statement:</strong> Your monthly paper or digital statement will clearly list the routing number and account number associated with your funds.</li>
              <li><strong>Online Banking Detail:</strong> Log in to the {bankName} website or mobile app and select the "Account Information" or "Direct Deposit" tab.</li>
            </ul>
          </article>

          <FAQSection faqs={faqs} />
          
          <AdUnit slot="UNIT 3: After FAQ, 300x250 display" className="mx-auto max-w-[300px]" />

          <div className="text-sm text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-6">
            <p><strong>Disclaimer:</strong> {bankName} routing numbers are subject to change due to bank mergers or geographic restructuring. USRoutingNumber.com makes every effort to keep these {currentYear} records accurate using Federal Reserve data feeds.</p>
          </div>
        </div>

        <aside className="space-y-8">
          <RelatedLinks 
            title={`Other Banks in ${stateFullName}`} 
            links={otherBanksInState.map(b => ({
              name: b,
              url: `/routing-number/${generateSlug(b)}/${state?.toLowerCase()}`
            }))}
          />
          
          {otherStates.length > 0 && (
             <RelatedLinks 
               title={`${bankName} in other states`} 
               links={otherStates.slice(0, 5).map(s => ({
                 name: getStateFullName(s),
                 url: `/routing-number/${bankSlug}/${s.toLowerCase()}`
               }))}
             />
          )}

          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-lg">
             <h3 className="text-xl font-bold mb-4">Direct Deposit Guide</h3>
             <p className="text-slate-400 text-sm mb-6">Learn how to set up your payroll direct deposit using your {bankName} routing number step-by-step.</p>
             <Link to="/how-to-find-routing-number" className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all">
               Read Guide
             </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
