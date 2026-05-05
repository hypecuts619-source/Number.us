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
import { generateBankStateFAQs } from '../lib/faqTemplates';
import { generateSlug } from '../lib/generateSlug';
import BreadcrumbNav from '../components/BreadcrumbNav';
import RoutingNumberCard from '../components/RoutingNumberCard';
import AdUnit from '../components/AdUnit';
import FAQSection from '../components/FAQSection';
import RelatedLinks from '../components/RelatedLinks';
import SEO from '../components/SEO';
import VerifiedBadge from '../components/VerifiedBadge';

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
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Routing Number Not Found</h1>
        <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
      </div>
    );
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

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
        {bankName} Routing Number {stateFullName} ({currentYear})
      </h1>

      <VerifiedBadge />

      <AdUnit slot="UNIT 1: Below H1, 728x90 leaderboard" className="my-8 min-h-[90px]" />

      <div className="grid lg:grid-cols-3 gap-12 mt-8">
        <div className="lg:col-span-2 space-y-12">
          
          <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">{bankName} Branches in {stateFullName}</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {dataList.map(branch => (
              <Link 
                key={`${branch.routing_number}-${branch.city}`}
                to={`/routing-number/${bankSlug}/${state?.toLowerCase()}/${generateSlug(branch.city)}`}
                className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="font-semibold text-slate-800 group-hover:text-blue-700">{branch.city}</div>
                  <div className="text-xs text-slate-400">{branch.address}</div>
                </div>
                <div className="text-sm bg-slate-100 text-slate-500 px-2 py-1 rounded font-mono group-hover:bg-blue-50 group-hover:text-blue-600">
                  {branch.routing_number}
                </div>
              </Link>
            ))}
          </div>

          {dataList.map((data, i) => (
            <div key={i} className="space-y-4">
              {dataList.length > 1 && <h3 className="text-xl font-bold text-slate-800">Branch: {data.city} / Type: {data.type}</h3>}
              <RoutingNumberCard data={data} />
            </div>
          ))}

          <section className="prose prose-lg text-slate-600 max-w-none">
            <h2 className="text-2xl font-bold text-slate-900">What is this routing number used for?</h2>
            <p>
              The {currentYear} routing number for <strong>{bankName}</strong> in <strong>{stateFullName}</strong> is primarily used to identify your specific bank branch during financial transactions. 
              Depending on the type of account you have, you will use <strong>{primaryData.routing_number}</strong> for:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden my-6">
              <table className="w-full text-left">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-slate-700">Transaction Type</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-700">Supported</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-blue-500"></div> ACH Direct Deposit
                    </td>
                    <td className="px-6 py-4">{(primaryData.type === 'ACH' || primaryData.type === 'BOTH') ? '✅ Yes' : '❌ No'}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-orange-500"></div> Wire Transfer (Domestic)
                    </td>
                    <td className="px-6 py-4">{(primaryData.type === 'WIRE' || primaryData.type === 'BOTH') ? '✅ Yes' : '❌ No'}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-slate-500"></div> Paper Checks
                    </td>
                    <td className="px-6 py-4">✅ Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <AdUnit slot="UNIT 2: Mid content, in-article responsive" className="my-8" />

          <section className="prose prose-lg text-slate-600 max-w-none">
            <h2 className="text-2xl font-bold text-slate-900">How to find your routing number</h2>
            <p>
              If you aren't sure whether <strong>{primaryData.routing_number}</strong> is the right number for your account, you can quickly verify it in three ways:
            </p>
            <ol className="space-y-2">
              <li><strong>Bottom of your check:</strong> Look at the bottom left-hand corner of your {bankName} check. The first 9 digits represent your routing number.</li>
              <li><strong>Online Banking:</strong> Log in to your {bankName} portal and navigate to "Account Details". Both the routing and account numbers are usually displayed there.</li>
              <li><strong>Mobile App:</strong> Open the official mobile app, select your checking account, and view the routing details.</li>
            </ol>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8">Wire Transfer Instructions</h3>
            <p>
              When receiving a domestic wire transfer, you must provide your sender with the exact wire routing number. If the table above indicates that this number only supports ACH, doing a wire transfer using <strong>{primaryData.routing_number}</strong> will fail. Always verify the SWIFT/BIC code for international wires directly with {bankName}.
            </p>
          </section>

          <FAQSection faqs={faqs} />
          
          <AdUnit slot="UNIT 3: After FAQ, 300x250 display" className="mx-auto max-w-[300px]" />

          <div className="text-sm text-slate-400 border-t pt-6 mt-8">
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
             <RelatedLinks 
               title={`${bankName} in other states`} 
               links={otherStates.slice(0, 5).map(s => ({
                 name: getStateFullName(s),
                 url: `/routing-number/${bankSlug}/${s.toLowerCase()}`
               }))}
             />
          )}

          <div className="bg-[#1e3a5f] text-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-lg mb-2">Need a bank account?</h3>
            <p className="text-blue-100 text-sm mb-4">Discover the top high-yield savings and checking accounts of {currentYear}.</p>
            <button className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition-colors">
              Compare Offers
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
