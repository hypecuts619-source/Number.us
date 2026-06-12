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
import DynamicSEOProse from '../components/DynamicSEOProse';
import { generateUniqueBankDescriptionForPage } from '../lib/seoHelpers';

import NotFound from './NotFound';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';

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
        schemaData={{
          bankName: bankName,
          routingNumber: primaryData.routing_number,
          city: cityTitle,
          state: stateFullName,
          zip: primaryData.zip,
          address: primaryData.address,
          phone: primaryData.phone,
          isCreditUnion: isCreditUnion
        }}
      >
        <script type="application/ld+json">
          {generateBreadcrumbSchema([
            { name: bankName, url: `https://usroutingnumber.com/routing-number/${bankSlug}` },
            { name: stateFullName, url: `https://usroutingnumber.com/routing-number/${bankSlug}/${state?.toLowerCase()}` },
            { name: cityTitle, url: `https://usroutingnumber.com/routing-number/${bankSlug}/${state?.toLowerCase()}/${citySlug}` }
          ])}
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

      <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="branchdetail-hero" isDensePage={true} />
      </div>

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

          <DynamicSEOProse 
            bankName={bankName}
            routingNumber={primaryData.routing_number}
            cityName={cityTitle}
            stateName={stateFullName}
            isCreditUnion={isCreditUnion}
          />

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
