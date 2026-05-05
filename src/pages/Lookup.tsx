import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getRoutingByNumber, getStateFullName } from '../lib/getData';
import { generateLookupTitle, generateLookupDescription, generateFAQSchema } from '../lib/seoHelpers';
import { generateLookupFAQs } from '../lib/faqTemplates';
import CopyButton from '../components/CopyButton';
import AdUnit from '../components/AdUnit';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import VerifiedBadge from '../components/VerifiedBadge';
import PrintDownloadButtons from '../components/PrintDownloadButtons';

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

  const data = useMemo(() => {
    if (!routingNumber) return null;
    return getRoutingByNumber(routingNumber);
  }, [routingNumber]);

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
        
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12 text-center">
          <h1 className="text-2xl text-slate-500 font-bold uppercase tracking-wider mb-2">
            Routing Number Details
          </h1>
          <div className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight font-mono mb-6 break-all">
            {routingNumber}
          </div>
          
          <div className="flex justify-center mb-6">
            <CopyButton text={routingNumber || ''} />
          </div>

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

        <AdUnit slot="UNIT 2: Mid content, in-article responsive" />

        <div className="prose prose-lg text-slate-600 max-w-none mt-12 bg-slate-50 p-8 rounded-2xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mt-0">How routing number validation works</h2>
          <p>
            US bank routing numbers use a mathematical module 10 checksum to ensure they are valid. This prevents typos and errors when processing payments (like ACH direct deposits or wire transfers).
          </p>
          <p>
            The algorithm works by multiplying each digit by a specific weight (3, 7, or 1) based on its position, then summing the results. If the final sum is a multiple of 10, the routing number is mathematically valid.
          </p>
        </div>

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
          {generateFAQSchema(faqs)}
        </script>
      </SEO>

        <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm mb-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl text-slate-500 font-bold uppercase tracking-wider mb-2">
              Routing Number Details
            </h1>
            <div className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight font-mono mb-6">
              {data.routing_number}
            </div>
            <div className="flex justify-center mb-6">
              <CopyButton text={data.routing_number} />
            </div>
            
            <VerifiedBadge />
            
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

        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100">
          <div className="grid md:grid-cols-2 gap-8">
             <div>
               <div className="text-sm text-slate-500 font-semibold mb-1 uppercase">Bank Name</div>
               <div className="text-xl font-bold text-slate-900">{data.bank_name}</div>
             </div>
             <div>
               <div className="text-sm text-slate-500 font-semibold mb-1 uppercase">Transaction Type</div>
               <div className="text-lg font-medium text-slate-800">
                  {data.type === 'BOTH' ? 'ACH & Wire Transfers' : data.type === 'ACH' ? 'ACH Direct Deposit Only' : 'Wire Transfer Only'}
               </div>
             </div>
             <div>
               <div className="text-sm text-slate-500 font-semibold mb-1 uppercase">Location</div>
               <div className="text-lg font-medium text-slate-800">
                 {data.city}, {getStateFullName(data.state)} {data.zip}
               </div>
             </div>
             <div>
               <div className="text-sm text-slate-500 font-semibold mb-1 uppercase">Phone Number</div>
               <div className="text-lg font-medium text-slate-800">
                 {data.phone}
               </div>
             </div>
          </div>
        </div>

        <PrintDownloadButtons 
          bankName={data.bank_name} 
          routingNumber={data.routing_number} 
          details={`Location: ${data.city}, ${data.state}\nPhone: ${data.phone}\nType: ${data.type}`} 
        />
      </div>

      <AdUnit slot="UNIT 2: Mid content, in-article responsive" />

      <div className="prose prose-lg text-slate-600 max-w-none mt-12">
        <h2 className="text-2xl font-bold text-slate-900">How routing number validation works</h2>
        <p>
          Routing numbers like <strong className="font-mono">{data.routing_number}</strong> use a mathematical checksum to ensure they are valid. The first 8 digits identify the bank and its location, and the 9th digit is a checksum calculated from the previous 8 digits. This prevents typos and errors when processing payments.
        </p>
      </div>

      <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
