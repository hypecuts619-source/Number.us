import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getRoutingByBankAndState, getStateFullName, getRoutingByBank, getOtherBanksInState, getRelatedBanks } from '../lib/getData';
import { 
  generateBankStateTitle, 
  generateBankStateDescription, 
  generateBreadcrumbSchema, 
  generateFAQSchema,
  generateFinancialInstitutionSchema
} from '../lib/seoHelpers';
import { Printer } from 'lucide-react';
import { generateBankStateFAQs } from '../lib/faqTemplates';
import { generateSlug } from '../lib/generateSlug';
import BreadcrumbNav from '../components/BreadcrumbNav';
import RoutingNumberCard from '../components/RoutingNumberCard';
import AdUnit from '../components/AdUnit';
import FAQSection from '../components/FAQSection';
import RelatedLinks from '../components/RelatedLinks';
import SEO from '../components/SEO';
import VerifiedBadge from '../components/VerifiedBadge';
import TransactionBadge from '../components/TransactionBadge';
import RegulatoryBadge from '../components/RegulatoryBadge';
import FeedbackModule from '../components/FeedbackModule';
import { ClickableRoutingNumber } from '../components/ClickableRoutingNumber';
import RecentlyViewedWidget from '../components/RecentlyViewedWidget';
import TrustIndicator from '../components/TrustIndicator';

import NotFound from './NotFound';

export default function BankState() {
  const { bankSlug, state } = useParams<{ bankSlug: string, state: string }>();

  const dataList = useMemo(() => {
    if (!bankSlug || !state) return [];
    return getRoutingByBankAndState(bankSlug, state);
  }, [bankSlug, state]);

  const otherStates = useMemo(() => {
     if (!bankSlug) return [];
     const bankData = getRoutingByBank(bankSlug);
     return Array.from(new Set(bankData.map(d => d.state))).filter(s => s.toLowerCase() !== state?.toLowerCase());
  }, [bankSlug, state]);

  const otherBanksInState = useMemo(() => {
    if (!state || !dataList.length) return [];
    return getOtherBanksInState(state, dataList[0].bank_name, 8);
  }, [state, dataList]);

  if (!dataList || dataList.length === 0) {
    return <NotFound />;
  }

  const primaryData = dataList[0];
  const bankName = primaryData.bank_name;
  const stateFullName = getStateFullName(state || '');
  const currentYear = new Date().getFullYear();
  const faqs = generateBankStateFAQs(bankName, stateFullName, primaryData.routing_number, primaryData.type);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SEO 
        title={generateBankStateTitle(bankName, stateFullName)}
        description={generateBankStateDescription(bankName, stateFullName, primaryData.routing_number)}
        canonicalUrl={`/routing-number/${bankSlug}/${state?.toLowerCase()}`}
      >
        <script type="application/ld+json">
          {generateBreadcrumbSchema([
            { name: bankName, url: `https://usroutingnumber.com/routing-number/${bankSlug}` },
            { name: stateFullName, url: `https://usroutingnumber.com/routing-number/${bankSlug}/${state?.toLowerCase()}` }
          ])}
        </script>
        <script type="application/ld+json">
          {generateFAQSchema(faqs)}
        </script>
        <script type="application/ld+json">
          {generateFinancialInstitutionSchema(
            bankName, 
            primaryData.routing_number
          )}
        </script>
      </SEO>

      <BreadcrumbNav crumbs={[
        { name: bankName, url: `/routing-number/${bankSlug}` },
        { name: stateFullName, url: `/routing-number/${bankSlug}/${state?.toLowerCase()}` }
      ]} />

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
        {bankName} Routing Number {stateFullName} (Federal Reserve {currentYear})
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-4 items-center">
          <VerifiedBadge />
          <RegulatoryBadge bankName={bankName} />
          <TrustIndicator />
        </div>
        <button 
          onClick={() => window.print()} 
          className="print:hidden inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg transition-colors border border-slate-200 dark:border-slate-700 text-sm shadow-sm"
          aria-label="Print or save routing numbers as PDF"
        >
          <Printer className="w-4 h-4" /> 
          <span>Print / Save PDF</span>
        </button>
      </div>

      <AdUnit slot="UNIT 1: Below H1, 728x90 leaderboard" className="my-8 min-h-[90px]" />

      <div className="grid lg:grid-cols-3 gap-12 mt-8">
        <div className="lg:col-span-2 space-y-12">
          
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b dark:border-slate-700 pb-2">{bankName} Branches in {stateFullName}</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {dataList.map(branch => (
              <Link 
                key={`${branch.routing_number}-${branch.city}`}
                to={`/routing-number/${bankSlug}/${state?.toLowerCase()}/${generateSlug(branch.city)}`}
                className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400">{branch.city}</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500">{branch.address || 'Main Office'}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <ClickableRoutingNumber number={branch.routing_number} className="text-sm px-2 py-1 font-mono group-hover:scale-105" />
                  <TransactionBadge type={branch.type || 'BOTH'} size="sm" />
                </div>
              </Link>
            ))}
          </div>

          {dataList.map((data, i) => (
            <div key={i} className="space-y-4">
              {dataList.length > 1 && <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Branch: {data.city} / Type: {data.type}</h3>}
              <RoutingNumberCard data={data} />
            </div>
          ))}

          <section className="prose prose-base md:prose-lg prose-slate dark:prose-invert text-slate-600 dark:text-slate-300 max-w-none">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white break-words">ABA routing number for {bankName} in {stateFullName}</h2>
            <p>
              The {currentYear} American Bankers Association (ABA) routing number for <strong>{bankName}</strong> within the state of <strong>{stateFullName}</strong> serves as a critical 9-digit identifier that links your specific bank branch location to the broader United States financial infrastructure. Every domestic transfer you initiate relies heavily on this code to ensure that your hard-earned funds are accurately routed through the Federal Reserve system or the automated clearing house (ACH) network securely and efficiently without delays.
            </p>
            <p>
              Depending on the precise financial operation you intend to perform—whether it is receiving your monthly salary via direct deposit or fulfilling an urgent bill payment—you will require the <strong>{primaryData.routing_number}</strong> code. It is fundamental to recognize that larger financial institutions may deploy distinct routing transit numbers (RTNs) dependent upon state lines or occasionally depending on the fundamental type of transaction taking place.
            </p>
            
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3 break-words">Direct Deposit Routing Number for {bankName}</h3>
            <p>
              If your intent involves setting up recurrent electronic inflows—such as your paycheck from an employer, a yearly tax refund from the IRS, or government-issued social security benefits—you are obligated to provide a valid ACH routing number. 
              {(primaryData.type === 'ACH' || primaryData.type === 'BOTH') 
                ? ` The number ${primaryData.routing_number} is fully supported and continuously verified for ACH direct deposits into your ${bankName} checking or savings account.` 
                : ` Warning: This specific routing number may not be appropriately equipped to handle general ACH direct deposits. Please contact a bank representative to verify you possess an ACH-compatible routing code before proceeding.`} Selecting the incorrect set of digits routinely leads to delayed paychecks, returned transfers, and unwanted banking fees, emphasizing the necessity of double-checking your details.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3 break-words">Wire Transfer Instructions for {bankName}</h3>
            <p>
              Domestic wire transfers operate along an entirely separate conduit than the standard ACH network. Because wire transfers are expedited, irrevocable transfers of funds from one banking entity to another, they demand absolute precision. If you expect to receive a domestic wire directly into your {stateFullName} branch account, utilizing the proper wire routing transit number is absolutely essential.
              {(primaryData.type === 'WIRE' || primaryData.type === 'BOTH') 
                ? ` You can safely and confidently use ${primaryData.routing_number} as your official ${bankName} wire transfer routing number for any incoming domestic wires.` 
                : ` This branch's routing code does NOT maintain compatibility with the national wire transfer systems. Attempting a rapid wire transfer using ${primaryData.routing_number} will undoubtedly fail or be rejected. You must request the distinct wire routing instructions directly from ${bankName}.`}
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden my-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Transaction Type</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Supported Configuration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm">
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-blue-500"></div> ACH Direct Deposits & Auto-Pay
                    </td>
                    <td className="px-6 py-4 dark:text-slate-300">{(primaryData.type === 'ACH' || primaryData.type === 'BOTH') ? '✅ Yes' : '❌ No'}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-orange-500"></div> Wire Transfers (Domestic USA)
                    </td>
                    <td className="px-6 py-4 dark:text-slate-300">{(primaryData.type === 'WIRE' || primaryData.type === 'BOTH') ? '✅ Yes' : '❌ No'}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-slate-500 dark:bg-slate-400"></div> Paper Checks & Bill Pay
                    </td>
                    <td className="px-6 py-4 dark:text-slate-300">✅ Yes</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>

            <p>
              It is pertinent to mention that international wire transfers consistently mandate additional documentation, such as a SWIFT code or a specialized BIC (Bank Identifier Code). The standard 9-digit ABA routing numbers highlighted above are formulated exclusively for routing domestic payments encompassed within the borders of the United States. Ensure you explicitly request {bankName}'s SWIFT details if you are handling inbound capital from a foreign nation.
            </p>
          </section>

          <AdUnit slot="UNIT 2: Mid content, in-article responsive" className="my-8" />

          <section className="prose prose-base md:prose-lg prose-slate dark:prose-invert text-slate-600 dark:text-slate-300 max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white" id="routing-vs-account">Routing Number Versus Account Number</h2>
            <p>
              When navigating an online portal to orchestrate direct deposits, automated clearing house payments, or standard electronic funds transfers, comprehending the fundamental mechanical divergence between a <strong>routing number vs account number</strong> is absolutely vital. Mixing these distinct numerical sequences up is the leading catalyst for returned transactions.
            </p>
            <ul className="mb-6 space-y-2">
              <li><strong>The ABA Routing Number:</strong> Think of this as the macroscopic address. It is the public, universal 9-digit code that signals to the Federal Reserve precisely which banking institution—in this scenario, {bankName} situated in {stateFullName}—should receive the incoming capital. Every single client situated at your localized branch employs this identical routing number string.</li>
              <li><strong>Your Personal Account Number:</strong> Think of this as the microscopic address. It acts as your highly guarded, private identifier—which is typically between 8 and 12 digits in length—that meticulously targets your specific, individualized checking or savings account once the funds accurately arrive at the bank's digital doorstep.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10">How to Accurately Find Your Banking Credentials</h2>
            <p>
              If a shred of doubt exists clarifying whether <strong>{primaryData.routing_number}</strong> is the optimal and correct numeric sequence for your precise {bankName} account, you can confidently verify the information utilizing three primary techniques recommended by financial experts:
            </p>
            <ol className="space-y-4">
              <li><strong>Examine the Bottom of Your Checkbook:</strong> Thoroughly inspect the bottom left-hand perimeter of your physical paper check. The very first 9 digits encapsulated by the unique MICR (Magnetic Ink Character Recognition) symbols explicitly portray your routing number. The subsequent sequence of numbers signifies your personal account ID.</li>
              <li><strong>Access Your Secure Online Banking Dashboard:</strong> Successfully log into your digital {bankName} online banking environment on a secure desktop browser and methodically navigate to the "Account Details" or "Direct Deposit Info" tab. Both the primary routing integer and your personal account number are traditionally presented there for hassle-free copying and pasting.</li>
              <li><strong>Open the Official iOS or Android Mobile App:</strong> Authenticate yourself inside the official {bankName} smartphone application, tap on your specific active checking account, and navigate to the 'show details' parameter to inspect your exact routing configuration vividly on your phone's display.</li>
            </ol>
            <p className="mt-6">
              When in doubt regarding the optimal digits to enter for an incoming wire or pending ACH transaction, we heavily endorse that you physically telephone your local {bankName} branch. Communicating with a knowledgeable bank teller will prevent the frustrating experience of managing bounced transfers, protecting your financial ecosystem from unnecessary strife.
            </p>
          </section>

          <FAQSection faqs={faqs} />
          
          <FeedbackModule bankName={bankName} routingNumber={primaryData.routing_number} context={`Bank State Page: ${stateFullName}`} />

          <AdUnit slot="UNIT 3: After FAQ, 300x250 display" className="mx-auto max-w-[300px]" />

          <div className="text-sm text-slate-400 dark:text-slate-500 border-t dark:border-slate-800 pt-6 mt-8">
            <p><strong>Disclaimer:</strong> The information provided on this page regarding {bankName} is for educational purposes. Always double-check your routing number with your financial institution before initiating any major transfers.</p>
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
          
          <RelatedLinks 
            title="Related Banks" 
            links={getRelatedBanks(bankName, 5).map(b => ({
              name: b,
              url: `/routing-number/${generateSlug(b)}`
            }))}
          />

          {otherStates.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <Link 
                to={`/routing-number/${bankSlug}`} 
                className="text-lg font-bold text-slate-800 mb-4 hover:text-blue-700 hover:underline block"
              >
                {bankName} in other states
              </Link>
              <ul className="space-y-3">
                {otherStates.slice(0, 5).map(s => (
                  <li key={s}>
                    <Link
                      to={`/routing-number/${bankSlug}/${s.toLowerCase()}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center"
                    >
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                      {getStateFullName(s)}
                    </Link>
                  </li>
                ))}
              </ul>
              {otherStates.length > 5 && (
                 <Link to={`/routing-number/${bankSlug}`} className="text-sm text-blue-600 hover:underline mt-4 inline-block font-semibold">
                   View all states &rarr;
                 </Link>
              )}
            </div>
          )}

          <div className="sticky top-24">
             <AdUnit slot="UNIT 4: Sidebar Ad, Display" className="min-h-[250px] mb-8" />
             <RecentlyViewedWidget />
          </div>
        </aside>
      </div>
    </div>
  );
}
