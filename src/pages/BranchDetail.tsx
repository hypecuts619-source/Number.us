import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getRoutingByBankStateAndCity, getStateFullName, getRoutingByBank, getOtherBanksInState, getRoutingByBankAndState } from '../lib/getData';
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
import FAQSection from '../components/FAQSection';
import RelatedLinks from '../components/RelatedLinks';
import { MapPin, Phone, Building2 } from 'lucide-react';
import Tooltip from '../components/Tooltip';
import SEO from '../components/SEO';
import VerifiedBadge from '../components/VerifiedBadge';
import RegulatoryBadge from '../components/RegulatoryBadge';
import FeedbackModule from '../components/FeedbackModule';
import TrustIndicator from '../components/TrustIndicator';
import CheckDigitValidation from '../components/CheckDigitValidation';
import { generateUniqueBankDescriptionForPage } from '../lib/seoHelpers';

import NotFound from './NotFound';

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
    return <NotFound />;
  }

  const primaryData = dataList[0];
  const stateData = useMemo(() => {
    if (!bankSlug || !state) return [];
    return getRoutingByBankAndState(bankSlug, state);
  }, [bankSlug, state]);

  const cityCanonicalUrl = `/routing-number/${bankSlug}/${state?.toLowerCase()}/${citySlug}`;
  const currentYear = new Date().getFullYear();
  const faqs = generateBankStateFAQs(bankName, stateFullName, primaryData.routing_number, primaryData.type);
  const uniqueDescription = generateUniqueBankDescriptionForPage(bankName, cityTitle, stateFullName, primaryData.routing_number, primaryData.type, primaryData.zip);

  const isCreditUnion = bankName.toLowerCase().includes('credit union');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SEO 
        title={`${bankName} Routing Number ${cityTitle}, ${stateFullName} 2026`}
        description={`Verified ${bankName} routing number for branches in ${cityTitle}, ${stateFullName}. Details for ACH, wire transfers, and address at ${primaryData.address}.`}
        canonicalUrl={cityCanonicalUrl}
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

      <div className="flex flex-wrap gap-3 mb-8">
        <VerifiedBadge />
        <RegulatoryBadge bankName={bankName} />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-bold border border-emerald-200 dark:border-emerald-800">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Operating Status: Active
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-bold border border-blue-200 dark:border-blue-800">
          Institution Type: {isCreditUnion ? 'Credit Union' : 'National/State Bank'}
        </div>
      </div>
      <TrustIndicator />

      
      <div className="grid lg:grid-cols-3 gap-12 mt-8">
        <div className="lg:col-span-2 space-y-12">
          
          <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 mb-8">
             <p className="text-blue-900 dark:text-blue-200 leading-relaxed italic">{uniqueDescription}</p>
          </div>

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
                    {primaryData.address || 'Main Office'}<br />
                    {primaryData.city}, {primaryData.state} {primaryData.zip && primaryData.zip !== 'Unknown' ? primaryData.zip : ''}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="text-slate-400 shrink-0 mt-1" />
                <div>
                  <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Phone</div>
                  <div className="text-lg font-medium text-slate-800 dark:text-slate-200">{primaryData.phone || 'Check Online'}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden relative border border-slate-300 dark:border-slate-700">
               <iframe 
                 title={`Map of ${bankName} in ${cityTitle}`}
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 src={`https://maps.google.com/maps?q=${encodeURIComponent(`${primaryData.address || 'Main Office'}, ${primaryData.city}, ${primaryData.state} ${primaryData.zip && primaryData.zip !== 'Unknown' ? primaryData.zip : ''}`)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                 allowFullScreen
               ></iframe>
            </div>
          </section>

          <article className="prose prose-base md:prose-lg dark:prose-invert text-slate-600 dark:text-slate-300 max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 capitalize">Comprehensive ABA Routing Knowledge for {bankName}</h2>
            <p>
              When methodically setting up any digital financial integration online—ranging from paying your monthly utility bills to receiving an important client invoice—leveraging the precise <strong>American Bankers Association (ABA) routing number for {bankName}</strong> guarantees that your moving capital seamlessly discovers its destination at the specific branch operating within <strong>{cityTitle}, {stateFullName}</strong>. These nine digits behave like a meticulous GPS coordinate system devised strictly by the Federal Reserve.
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3 capitalize">Securing Your {bankName} Direct Deposits via ACH</h3>
            <p>
              Automated Clearing House (ACH) transactions constitute the backbone of modern American payroll. If your primary objective consists of establishing automated deposits for your bi-weekly paycheck, tax refunds curated by the IRS, or federal retirement benefits, deploying the corresponding ACH-compatible transit number is non-negotiable.
              {primaryData.type === 'ACH' || primaryData.type === 'BOTH' 
                ? ` Fortunately, the nine-digit sequence ${primaryData.routing_number} operates as a fully validated and optimal ${bankName} routing number explicitly configured to govern direct deposits aimed toward accounts physically associated with this regional branch.`
                : ` Caution: Despite appearing perfectly legitimate, this specific nine-digit sequence fundamentally lacks robust, universal support for standard ACH direct deposits. Utilizing this code for recurring electronic paychecks will likely spawn prolonged delays or a total rejection of funds. Please immediately contact a localized banking representative to verify and secure a specifically designated ACH-compatible code.`}
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-3 capitalize">Expedited Wire Transfer Protocols for {bankName}</h3>
            <p>
              Occasionally, transactions mandate immediate, irrevocable clearing, bypassing the multi-day ACH settlement periods. When orchestrating a rapid domestic wire transfer squarely targeting this <strong>{cityTitle}, {stateFullName}</strong> banking facility, you must purposefully enter the designated wire-associated routing number. According to the most recent data published strictly by the Federal Reserve's active directory, 
              {(primaryData.type === 'WIRE' || primaryData.type === 'BOTH') 
                 ? ` you can securely and reliably employ ${primaryData.routing_number} as your exclusive ${bankName} wire transfer routing number.` 
                 : ` this routing sequence DOES NOT support expedited wire network integrations. Attempting to force a rapid transfer through this numerical channel will inherently culminate in structural failure. You must proactively ask ${bankName} support personnel for their specialized and segregated wire routing number.`}
            </p>
            <p className="mt-4">
              It is additionally important to grasp that standard 9-digit ABA codes serve purely domestic ambitions. Receiving substantial international transfers originating from outside the United States universally commands a <Tooltip text="The Society for Worldwide Interbank Financial Telecommunication creates unique institutional codes."><strong>SWIFT network code</strong></Tooltip> or an internationally recognized BIC (Bank Identifier Code). Ensure you notify your branch manager preemptively when expecting large foreign disbursements.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12" id="routing-vs-account">Routing Number Versus Account Number Dynamics</h2>
            <p>
              Fully appreciating the mechanical discrepancy existing between a <strong>routing number vs account number</strong> acts as the central pillar for avoiding bounced payments and expensive overdraft penalties. When examining the structure of your {bankName} fiscal ecosystem:
            </p>
            <ul className="space-y-2 mt-4">
              <li><strong>The Macro Identifier (Routing Number):</strong> This universally available nine-digit integer exclusively pinpoints the geographic and institutional location of this exact {bankName} branch. Every single customer utilizing this branch effectively shares this identical routing number string.</li>
              <li><strong>The Micro Identifier (Account Number):</strong> This represents your highly sensitive, individualized private key. Ranging between 8 and 12 digits, this confidential sequence targets your specific personal checking vault or business savings portfolio. Only you hold authorization over this number.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12">Methods for Verifying Your {bankName} Routing Data</h2>
            <p>
              Cybersecurity and transactional precision remain paramount when distributing financial identifiers openly. To guarantee you wield the accurate numerical sequence necessary accurately governing your 
              <strong>{bankName}</strong> portfolio based heavily in <strong>{cityTitle}</strong>, adhere to these universally recommended verification protocols:
            </p>
            <ul className="space-y-4 mt-4 mb-8">
              <li>
                <strong>Analyze Your Checkbook:</strong> Thoroughly scan the bottom-left horizon of an official, company-issued paper check. The first contiguous cluster of 9 <Tooltip text="Magnetic Ink Character Recognition"><strong>MICR characters</strong></Tooltip> explicitly embodies your routing transit number.
              </li>
              <li><strong>Digital Bank Statements:</strong> Upon generating your monthly electronic PDF statement, carefully review the headers. High-quality statements unequivocally define both the routing code and your personal account credentials adjacent to your total balance.</li>
              <li><strong>Online Banking Application:</strong> By actively logging directly into the highly secure {bankName} mobile app or desktop portal, simply navigating toward the "Account Information" screen or explicitly the "Set Up Direct Deposit" module instantly yields your branch's specific routing setup.</li>
            </ul>
          </article>

          <FAQSection faqs={faqs} />
          
          <FeedbackModule bankName={bankName} routingNumber={primaryData.routing_number} context={`Branch Detail: ${cityTitle}, ${stateFullName}`} />

          
          <div className="text-sm text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-6">
            <p><strong>Disclaimer:</strong> {bankName} routing numbers are subject to change due to bank mergers or geographic restructuring. USRoutingNumber.com makes every effort to keep these {currentYear} records accurate using Federal Reserve data feeds.</p>
          </div>
        </div>

        <aside className="space-y-8">
          <CheckDigitValidation routingNumber={primaryData.routing_number} />
          
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
