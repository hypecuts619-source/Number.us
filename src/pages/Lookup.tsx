import { useParams, Link } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { MapPin, Phone, ExternalLink, BookOpen } from 'lucide-react';
import { getRoutingByNumber, getStateFullName, getRelatedBanks } from '../lib/getData';
import { getFederalReserveDistrict } from '../lib/fedDistrict';
import { generateLookupTitle, generateLookupDescription, generateFAQSchema, generateFinancialInstitutionSchema } from '../lib/seoHelpers';
import { generateLookupFAQs } from '../lib/faqTemplates';
import { generateSlug } from '../lib/generateSlug';
import CopyButton from '../components/CopyButton';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import VerifiedBadge from '../components/VerifiedBadge';
import RegulatoryBadge from '../components/RegulatoryBadge';
import FeedbackModule from '../components/FeedbackModule';
import PrintDownloadButtons from '../components/PrintDownloadButtons';
import TransactionBadge from '../components/TransactionBadge';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import TrustIndicator from '../components/TrustIndicator';
import RelatedLinks from '../components/RelatedLinks';
import CheckDigitVisualizer from '../components/CheckDigitVisualizer';
import TransferCompatibilityChecker from '../components/TransferCompatibilityChecker';
import DirectDepositFormGenerator from '../components/DirectDepositFormGenerator';
import { ClickableRoutingNumber } from '../components/ClickableRoutingNumber';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';

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
          <meta name="prerender-status-code" content="404" />
          <script type="application/ld+json">
            {generateFAQSchema(faqs)}
          </script>
        </SEO>
        
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-12 shadow-sm mb-12 text-center">
          <h1 className="text-2xl text-slate-500 font-bold uppercase tracking-wider mb-2">
            Routing Number Details
          </h1>

          <div className="mb-6 flex justify-center">
            <ClickableRoutingNumber 
              number={routingNumber || ''} 
              className="text-5xl md:text-7xl px-8 py-6 rounded-3xl"
            />
          </div>
          
          <div className="flex justify-center mb-4">
            <CopyButton text={routingNumber || ''} />
          </div>

                <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="lookup-hero" />
      </div>

<div className="flex flex-col items-center gap-4 mb-6">
            {isValid ? (
              <div className="inline-block bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800 px-4 py-2 rounded-full font-bold text-sm">
                ✓ Mathematically Valid (Institution Unknown)
              </div>
            ) : (
              <div className="inline-block bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 px-4 py-2 rounded-full font-bold text-sm">
                ✗ Invalid Routing Number
              </div>
            )}
            <a 
              href="https://routingnumber.aba.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 font-medium underline underline-offset-4"
            >
              Check official ABA.com directory for new institutions
            </a>
          </div>

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
        
        <FeedbackModule bankName="Unknown Institution" routingNumber={routingNumber} context="Lookup Page (Not Found)" />
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
            <div className="mb-6 flex justify-center">
              <ClickableRoutingNumber 
                number={data.routing_number} 
                className="text-5xl md:text-7xl px-8 py-6 rounded-3xl"
              />
            </div>
            <div className="flex justify-center mb-4">
              <CopyButton text={data.routing_number} />
            </div>

            <VerifiedBadge />
            <RegulatoryBadge bankName={data.bank_name} />
            <div className="max-w-md mx-auto text-left">
              <TrustIndicator />
            </div>
            
            <div className="block mt-2 flex flex-col items-center gap-3">
              {isValid ? (
                <div className="inline-block bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 px-4 py-2 rounded-full font-bold text-sm">
                  ✓ Valid Routing Number
                </div>
              ) : (
                <div className="inline-block bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 px-4 py-2 rounded-full font-bold text-sm">
                  ✗ Invalid Checksum
                </div>
              )}
              <a 
                href="https://routingnumber.aba.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1 font-medium underline underline-offset-4"
              >
                Verify on official ABA.com directory
              </a>
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
               <div className="text-sm text-slate-500 font-semibold mb-1 uppercase">Location (Main Office)</div>
               <div className="text-lg font-medium text-slate-800 dark:text-slate-200">
                 {data.address && data.address !== 'Unknown' && <div className="block">{data.address}</div>}
                 {data.city}, {getStateFullName(data.state)} {data.zip && data.zip !== 'Unknown' ? data.zip : ''}
               </div>
               <a 
                 href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.bank_name + ' ' + (data.address || '') + ' ' + data.city + ' ' + data.state)}`} 
                 target="_blank" 
                 rel="noreferrer"
                 className="flex items-center gap-1 text-sm text-blue-600 hover:underline mt-2 font-medium"
               >
                 <MapPin className="w-4 h-4" /> View on Map
               </a>
               <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-snug">
                 * This is the bank's main corporate office or processing center associated with this FedACH routing number. For local branches, please visit the bank's official website.
               </p>
             </div>
             <div>
               <div className="text-sm text-slate-500 font-semibold mb-1 uppercase">Contact Support</div>
               {data.phone && data.phone !== 'Unknown' ? (
                 <a href={`tel:${data.phone.replace(/\D/g, '')}`} className="text-lg font-medium text-blue-600 hover:underline flex items-center gap-2">
                   <Phone className="w-5 h-5" /> {data.phone}
                 </a>
               ) : (
                 <div className="text-lg font-medium text-slate-800 dark:text-slate-200">
                   Check Online
                 </div>
               )}
               <a
                 href={`https://www.google.com/search?q=${encodeURIComponent(data.bank_name + ' official site customer support')}`}
                 target="_blank"
                 rel="noreferrer"
                 className="inline-flex items-center justify-center w-full mt-4 bg-slate-900 dark:bg-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors gap-2"
               >
                 <ExternalLink className="w-4 h-4" /> Official Website Support
               </a>
             </div>
          </div>
        </div>

        <PrintDownloadButtons 
          bankName={data.bank_name} 
          routingNumber={data.routing_number} 
          details={`Location: ${data.city}, ${data.state}\nPhone: ${data.phone || 'Check Online'}\nType: ${data.type || 'ACH'}`} 
        />
      </div>

      <TransferCompatibilityChecker routingNumberType={data.type || 'BOTH'} />

      <DirectDepositFormGenerator bankName={data.bank_name} routingNumber={data.routing_number} />

      <div className="prose prose-base md:prose-lg text-slate-600 dark:text-slate-300 max-w-none mt-12 bg-white dark:bg-slate-800 p-5 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0">Understanding Your Validated Routing Number</h2>
        <p>
          Routing numbers, such as <strong className="font-mono">{data.routing_number}</strong> currently associated with <strong>{data.bank_name}</strong>, leverage a precise algorithmic structure mandated by the American Bankers Association (ABA). The primary objective of this nine-digit code is to act as a flawless GPS coordinate system guiding your capital exclusively through the Federal Reserve architecture without risking bounces or misapplied funds.
        </p>
        
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">Mechanical Checksum Validation</h3>
        <p>
          Behind the scenes, the first eight integers denote the localized Federal Reserve sorting territory alongside the specific institutional identifier. The critical 9th digit serves solely as an automated mathematical checksum. By applying a meticulously weighted formula (multiplying specific digits by 3, 7, and 1 respectively), banking software can instantaneously detect human transcription errors, thereby blocking the transaction from initiating until the data is manually corrected.
        </p>

        <div className="my-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 rounded-r-xl">
          <p className="m-0 font-medium text-blue-900 dark:text-blue-100">
            <strong>Federal Reserve District Context:</strong> This number is used for Federal Reserve processing primarily within the <strong>{getFederalReserveDistrict(data.routing_number)}</strong> district.
          </p>
        </div>

        {data.routing_number && /^\d{9}$/.test(data.routing_number) && (
          <CheckDigitVisualizer routingNumber={data.routing_number} />
        )}

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-6 mb-3">Essential Safety Preparations</h3>
        <p>
          Whether you are submitting authorization forms for a new corporate paycheck direct deposit, configuring recurring mortgage drafts via an Automated Clearing House (ACH) portal, or wiring emergency funds domestically across state lines, possessing an accurate routing numeric sequence is paramount. When in absolute doubt relative to standard ACH vs expedited wire operations, we categorically advise contacting a licensed {data.bank_name} banking representative physically stationed in {data.city}, {getStateFullName(data.state)} to guarantee absolute transfer fulfillment.
        </p>
      </div>

      <div className="mt-12 bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-6 font-sans text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          Related Guides & Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/ach-vs-wire-transfers" className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800 group">
            <div className="flex-1">
              <div className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">ACH vs. Wire Transfers</div>
              <div className="text-sm text-slate-500 line-clamp-2">Understand the key differences between these payment methods and when to use each for your transfers.</div>
            </div>
          </Link>
          <Link to="/how-to-find-routing-number-on-check" className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800 group">
            <div className="flex-1">
              <div className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">How to Find Your Routing Number</div>
              <div className="text-sm text-slate-500 line-clamp-2">Not sure how to read your check or find your routing number without one? Read our detailed guide.</div>
            </div>
          </Link>
          <Link to="/routing-vs-account-number" className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800 group">
            <div className="flex-1">
              <div className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">Routing vs Account Number</div>
              <div className="text-sm text-slate-500 line-clamp-2">Learn the difference between routing numbers and account numbers and how they work together.</div>
            </div>
          </Link>
          <Link to="/rejected-routing-number-fix" className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800 group">
            <div className="flex-1">
              <div className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">Fix Rejected Transactions</div>
              <div className="text-sm text-slate-500 line-clamp-2">What happens if you use the wrong routing number? Find out how to fix rejected ACH and wire transfers.</div>
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-8 md:mt-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-12 shadow-sm mb-12">
        <FAQSection faqs={faqs} />
      </div>

      <FeedbackModule bankName={data.bank_name} routingNumber={data.routing_number} context="Lookup Page (Found)" />

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
