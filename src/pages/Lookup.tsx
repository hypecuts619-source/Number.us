import { useParams, Link } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { getRoutingByNumber, getStateFullName, getRelatedBanks } from '../lib/getData';
import { generateLookupTitle, generateLookupDescription, generateFAQSchema, generateFinancialInstitutionSchema } from '../lib/seoHelpers';
import { generateLookupFAQs } from '../lib/faqTemplates';
import { generateSlug } from '../lib/generateSlug';
import CopyButton from '../components/CopyButton';
import AdUnit from '../components/AdUnit';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import VerifiedBadge from '../components/VerifiedBadge';
import PrintDownloadButtons from '../components/PrintDownloadButtons';
import TransactionBadge from '../components/TransactionBadge';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import TrustIndicator from '../components/TrustIndicator';
import RelatedLinks from '../components/RelatedLinks';
import CheckDigitVisualizer from '../components/CheckDigitVisualizer';
import TransferCompatibilityChecker from '../components/TransferCompatibilityChecker';
import DirectDepositFormGenerator from '../components/DirectDepositFormGenerator';

function isValidRoutingNumber(routingNumber: string): boolean {
  if (!/^\d{9}$/.test(routingNumber)) {
    return false;
  }
  let sum = 0;
  for (let i = 0; i < 9; i += 3) {
    sum += parseInt(routingNumber.charAt(i), 10) * 3
      +  parseInt(routingNumber.charAt(i + 1), 10) * 7
      +  parseInt(routingNumber.charAt(i + 2), 10);
  }
  return sum !== 0 && sum % 10 === 0;
}

export default function Lookup() {
  const { routingNumber } = useParams<{ routingNumber: string }>();
  const { addItem } = useRecentlyViewed();

  const data = useMemo(() => {
    if (!routingNumber) return null;
    return getRoutingByNumber(routingNumber);
  }, [routingNumber]);

  useEffect(() => {
    if (data && routingNumber) {
      addItem(routingNumber, data.bank_name);
    }
  }, [data, routingNumber]);

  const isValid = useMemo(() => {
    if (!routingNumber) return false;
    return isValidRoutingNumber(routingNumber);
  }, [routingNumber]);

  const faqs = useMemo(() => generateLookupFAQs(routingNumber || '', data?.bank_name), [routingNumber, data]);

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <SEO 
          title="Routing Number Validation Result | USRoutingNumber.com"
          description={`Routing number search result for ${routingNumber}. Verify mathematical validity and checksum.`}
          canonicalUrl={`/lookup/${routingNumber}`}
        >
          <script type="application/ld+json">
            {generateFAQSchema(faqs)}
          </script>
        </SEO>
        
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-12 shadow-sm mb-12 text-center">
          <h1 className="text-2xl text-slate-500 font-bold uppercase tracking-wider mb-2">
            Routing Number Details
          </h1>
          <div className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight font-mono mb-6 break-all">
            {routingNumber}
          </div>
          
          <div className="flex justify-center mb-4">
            <CopyButton text={routingNumber || ''} />
          </div>

          <AdUnit slot="UNIT 5: Immediately Below Routing Number (Not Found)" className="mb-6" />

          {isValid ? (
            <div className="inline-block bg-yellow-50 text-yellow-800 border border-yellow-200 px-4 py-2 rounded-full font-bold text-sm mb-6">
              ✓ Mathematically Valid (Institution Unknown)
            </div>
          ) : (
            <div className="inline-block bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-full font-bold text-sm mb-6">
              ✗ Invalid Routing Number
            </div>
          )}

          <div className="text-slate-600 mb-8 max-w-2xl mx-auto">
            {isValid ? (
              <p>
                The routing number <strong>{routingNumber}</strong> passes the official American Bankers Association (ABA) mathematical checksum validation, meaning it is a structurally valid number. However, we do not currently have the specific institution details for this number in our database.
              </p>
            ) : (
              <p>
                The routing number <strong>{routingNumber}</strong> is <strong>invalid</strong>. It does not pass the required ABA checksum validation formula. Please double-check the number for typos. All US routing numbers must be exactly 9 digits long and mathematically validate.
              </p>
            )}
          </div>
          
          <Link to="/" className="inline-block border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors">
            Try Another Search
          </Link>
        </div>

        <AdUnit slot="UNIT 4: Below Lookup Box (Not Found)" className="mb-12" />

        <AdUnit slot="UNIT 2: Mid content, in-article responsive" />

        <div className="prose prose-base md:prose-lg text-slate-600 max-w-none mt-12 bg-slate-50 p-5 md:p-8 rounded-2xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0">How routing number validation works</h2>
          <p>
            US bank routing numbers use a mathematical module 10 checksum to ensure they are valid. This prevents typos and errors when processing payments (like ACH direct deposits or wire transfers).
          </p>
          <p>
            The algorithm works by multiplying each digit by a specific weight (3, 7, or 1) based on its position, then summing the results. If the final sum is a multiple of 10, the routing number is mathematically valid.
          </p>
        </div>

        {routingNumber && /^\d{9}$/.test(routingNumber) && (
          <CheckDigitVisualizer routingNumber={routingNumber} />
        )}

        <div className="mt-16">
          <FAQSection faqs={faqs} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <SEO 
        title={generateLookupTitle(data.routing_number)}
        description={generateLookupDescription(data.routing_number, data.bank_name)}
        canonicalUrl={`/lookup/${data.routing_number}`}
      >
        <script type="application/ld+json">
          {generateFinancialInstitutionSchema(
            data.bank_name,
            data.routing_number,
            data.address,
            data.city,
            getStateFullName(data.state),
            data.zip !== 'Unknown' ? data.zip : undefined,
            data.phone
          )}
        </script>
        <script type="application/ld+json">
          {generateFAQSchema(faqs)}
        </script>
      </SEO>

        <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-12 shadow-sm mb-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl text-slate-500 font-bold uppercase tracking-wider mb-2">
              Routing Number Details
            </h1>
            <div className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight font-mono mb-6">
              {data.routing_number}
            </div>
            <div className="flex justify-center mb-4">
              <CopyButton text={data.routing_number} />
            </div>

            <AdUnit slot="UNIT 6: Immediately Below Routing Number (Found)" className="mb-6" />
            
            <VerifiedBadge />
            <div className="max-w-md mx-auto text-left">
              <TrustIndicator />
            </div>
            
            <div className="block mt-2">
              {isValid ? (
                <div className="inline-block bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-full font-bold text-sm">
                  ✓ Valid Routing Number
                </div>
              ) : (
                <div className="inline-block bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-full font-bold text-sm">
                  ✗ Invalid Checksum
                </div>
              )}
            </div>
          </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 md:p-8 border border-slate-100 dark:border-slate-700">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
             <div>
               <div className="text-sm text-slate-500 font-semibold mb-1 uppercase">Bank Name</div>
               <div className="text-xl font-bold text-slate-900 dark:text-white">{data.bank_name}</div>
             </div>
             <div>
               <div className="text-sm text-slate-500 font-semibold mb-1 uppercase">Transaction Type</div>
               <div className="text-lg font-medium text-slate-800 flex items-center gap-2 mt-1">
                  <TransactionBadge type={data.type || 'BOTH'} />
               </div>
             </div>
             <div>
               <div className="text-sm text-slate-500 font-semibold mb-1 uppercase">Location</div>
               <div className="text-lg font-medium text-slate-800">
                 {data.city}, {getStateFullName(data.state)} {data.zip && data.zip !== 'Unknown' ? data.zip : ''}
               </div>
             </div>
             <div>
               <div className="text-sm text-slate-500 font-semibold mb-1 uppercase">Phone Number</div>
               <div className="text-lg font-medium text-slate-800">
                 {data.phone || 'Check Online'}
               </div>
             </div>
          </div>
        </div>

        <PrintDownloadButtons 
          bankName={data.bank_name} 
          routingNumber={data.routing_number} 
          details={`Location: ${data.city}, ${data.state}\nPhone: ${data.phone || 'Check Online'}\nType: ${data.type || 'ACH'}`} 
        />
      </div>

      <AdUnit slot="UNIT 4: Below Lookup Box (Found)" className="mb-12" />

      <TransferCompatibilityChecker routingNumberType={data.type || 'BOTH'} />

      <DirectDepositFormGenerator bankName={data.bank_name} routingNumber={data.routing_number} />

      <AdUnit slot="UNIT 2: Mid content, in-article responsive" />

      <div className="prose prose-base md:prose-lg text-slate-600 dark:text-slate-300 max-w-none mt-12 bg-white dark:bg-slate-800 p-5 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0">Understanding Your Validated Routing Number</h2>
        <p>
          Routing numbers, such as <strong className="font-mono">{data.routing_number}</strong> currently associated with <strong>{data.bank_name}</strong>, leverage a precise algorithmic structure mandated by the American Bankers Association (ABA). The primary objective of this nine-digit code is to act as a flawless GPS coordinate system guiding your capital exclusively through the Federal Reserve architecture without risking bounces or misapplied funds.
        </p>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">Mechanical Checksum Validation</h3>
        <p>
          Behind the scenes, the first eight integers denote the localized Federal Reserve sorting territory alongside the specific institutional identifier. The critical 9th digit serves solely as an automated mathematical checksum. By applying a meticulously weighted formula (multiplying specific digits by 3, 7, and 1 respectively), banking software can instantaneously detect human transcription errors, thereby blocking the transaction from initiating until the data is manually corrected.
        </p>

        {data.routing_number && /^\d{9}$/.test(data.routing_number) && (
          <CheckDigitVisualizer routingNumber={data.routing_number} />
        )}

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">Essential Safety Preparations</h3>
        <p>
          Whether you are submitting authorization forms for a new corporate paycheck direct deposit, configuring recurring mortgage drafts via an Automated Clearing House (ACH) portal, or wiring emergency funds domestically across state lines, possessing an accurate routing numeric sequence is paramount. When in absolute doubt relative to standard ACH vs expedited wire operations, we categorically advise contacting a licensed {data.bank_name} banking representative physically stationed in {data.city}, {getStateFullName(data.state)} to guarantee absolute transfer fulfillment.
        </p>
      </div>

      <div className="mt-8 md:mt-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-12 shadow-sm mb-12">
        <FAQSection faqs={faqs} />
      </div>

      <div className="mt-8 max-w-sm">
         <RelatedLinks 
           title="Related Banks" 
           links={getRelatedBanks(data.bank_name, 5).map(b => ({
             name: b,
             url: `/routing-number/${generateSlug(b)}`
           }))}
         />
      </div>
    </div>
  );
}
