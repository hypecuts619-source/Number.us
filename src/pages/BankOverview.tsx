import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getRoutingByBank, getStateFullName, getTopSearchedBanks, getRelatedBanks } from '../lib/getData';
import { generateSlug, unslug } from '../lib/generateSlug';
import { generateBankOverviewTitle, generateBankOverviewDescription, generateFAQSchema, generateBreadcrumbSchema } from '../lib/seoHelpers';
import { generateGeneralBankFAQs } from '../lib/faqTemplates';
import { getBankDetails } from '../lib/bankDetails';
import BreadcrumbNav from '../components/BreadcrumbNav';
import FAQSection from '../components/FAQSection';
import RelatedLinks from '../components/RelatedLinks';
import SEO from '../components/SEO';
import VerifiedBadge from '../components/VerifiedBadge';
import RegulatoryBadge from '../components/RegulatoryBadge';
import FeedbackModule from '../components/FeedbackModule';
import TrustIndicator from '../components/TrustIndicator';
import { useFavorites } from '../hooks/useFavorites';
import { Heart, Share2 } from 'lucide-react';
import { toast } from 'sonner';

import NotFound from './NotFound';

import VerifyRouteCallout from '../components/VerifyRouteCallout';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';

export default function BankOverview() {
  const { bankSlug } = useParams<{ bankSlug: string }>();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const bankData = useMemo(() => {
    if (!bankSlug) return [];
    return getRoutingByBank(bankSlug);
  }, [bankSlug]);

  const bankName = bankData.length > 0 ? bankData[0].bank_name : '';
  const isBofA = bankName.toLowerCase().includes('bank of america');
  const isChase = bankName.toLowerCase().includes('jpmorgan chase') || bankName.toLowerCase() === 'chase bank';

  let pageTitle = generateBankOverviewTitle(bankName);
  let pageDesc = generateBankOverviewDescription(bankName);
  let pageH1 = `${bankName} Routing Number Directory (Federal Reserve 2026)`;
  
  if (isBofA) {
    pageTitle = "Bank of America Routing Number Directory (2026) | Find by State";
    pageDesc = "Find the correct Bank of America routing number for ACH, direct deposit, and wire transfers by state. Verify your BofA ABA number instantly.";
    pageH1 = "Bank of America (BofA) Routing Numbers by State";
  } else if (isChase) {
    pageTitle = "Chase Bank Routing Number Directory (2026) | ACH & Wire Routes";
    pageDesc = "Get the exact JPMorgan Chase routing number for your state. Distinguish between Chase ACH, domestic wire, and SWIFT codes to prevent delays.";
    pageH1 = "JPMorgan Chase Bank Routing Numbers";
  }

  const favorited = isFavorite(bankSlug || '');

  const handleToggleFavorite = () => {
    if (bankName && bankSlug) {
      toggleFavorite({
        slug: bankSlug,
        bankName: bankName,
        state: bankData[0]?.state || 'US'
      });
      if (!favorited) {
        toast.success(`Saved ${bankName} to favorites`);
      }
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${bankName} Routing Number`,
          text: `Verified routing numbers for ${bankName}`,
          url: shareUrl,
        });
      } catch (err) {
        // ignore
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied to clipboard!');
    }
  };
  const bankDetails = useMemo(() => bankName ? getBankDetails(bankName) : null, [bankName]);

  if (!bankData || bankData.length === 0) {
    return <NotFound />;
  }

  const currentYear = new Date().getFullYear();
  
  const faqs = generateGeneralBankFAQs(bankName);
  
  if (isBofA) {
    faqs.push(
      { question: "What is the Bank of America routing number for California?", answer: "Bank of America generally issues 121000358 for accounts opened in California, however for wire transfers a national code may be required. Select California from the list below to see the complete table." },
      { question: "Does Bank of America use a different routing number for international wire transfers?", answer: "Yes, frequently foreign transfers require a SWIFT/BIC code along with a specifically designated national wire routing identifier, which may be entirely separate from the ACH code printed on your paper checks." },
      { question: "How do I find my Bank of America routing number on the mobile app?", answer: "Log into the BofA mobile app, select your checking account, and navigate to the 'Account Details' tab. Your explicit routing digits will be displayed securely there." }
    );
  } else if (isChase) {
    faqs.push(
       { question: "What is the Chase wire transfer routing number?", answer: "For most domestic wire transfers regardless of your state, Chase uses a universal routing structural code (commonly 021000021, but verify first)." },
       { question: "Is the Chase routing number the same for all states?", answer: "No, Chase maintains dozens of discrete routing transit numbers for standard ACH transactions based on the exact state where the account holding branch resides." },
       { question: "What happens if I use the wrong Chase routing number for direct deposit?", answer: "If you utilize a structurally invalid number, the employer's payroll system will instantly reject it. If you utilize a valid but incorrect number (such as the wire number), the funds may be delayed or reversed entirely." }
    );
  }

  // Group by state
  const states = Array.from(new Set(bankData.map(d => d.state))).sort() as string[];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SEO 
        title={pageTitle}
        description={pageDesc}
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BankOrCreditUnion",
            "name": bankName,
            "url": `https://usroutingnumber.com/routing-number/${bankSlug}`
          })}
        </script>
      </SEO>

      <BreadcrumbNav crumbs={[{ name: bankName, url: `/routing-number/${bankSlug}` }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-2xl">
          {pageH1}
        </h1>

        <div className="flex gap-2">
          <button 
            onClick={handleToggleFavorite}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg ${
              favorited 
                ? 'bg-rose-500 text-white shadow-rose-200 dark:shadow-none' 
                : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            {favorited ? 'Saved' : 'Save'}
          </button>
          <button 
            onClick={handleShare}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
          >
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>
      
      <VerifiedBadge />
      <RegulatoryBadge bankName={bankName} />
      <TrustIndicator />

            <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="bankoverview-hero" />
      </div>

<div className="grid md:grid-cols-3 gap-12 mt-10">
        <div className="md:col-span-2">
          <div className="prose prose-base md:prose-lg prose-slate dark:prose-invert text-slate-600 dark:text-slate-300 mb-10 max-w-none">
            <p>
              To effectively and securely process vital financial transactions—such as online bill payments, automated paycheck direct deposits, or rapid domestic wire transfers—with <strong>{bankName}</strong>, 
              you will absolutely need the correct, publicly verified 9-digit American Bankers Association (ABA) routing number. Because financial institutions of this magnitude possess sprawling networks of branches stretching across multiple regions, 
              the specific routing numeric sequence assigned to your account may vary substantially depending on the precise state where your checking or savings account was officially opened. Furthermore, the type of transaction you intend to initiate frequently demands a specialized numerical code.
            </p>
            
            <VerifyRouteCallout />

            {isBofA && (
              <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-xl border border-slate-200 dark:border-slate-700 my-8">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 mt-0">BofA Wire vs. ACH Routing Numbers</h2>
                <p className="mb-4">Many BofA customers don't realize BofA often uses a national routing number for wire transfers, but state-specific numbers for ACH/paper checks. Always <Link to="/international-wire-guide" className="text-blue-600 hover:underline">verify your BofA wire routing number</Link> independently before sending irreversible funds.</p>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 mt-0">Legacy Bank Routing</h2>
                <p className="m-0">Legacy routing numbers (e.g., old FleetBoston or MBNA numbers) are frequently updated and phased out within the BofA system. <Link to="/routing-number-validator" className="text-blue-600 hover:underline">Verify your routing number in our Validator Tool</Link> to ensure it is still actively receiving ACH traffic.</p>
              </div>
            )}

            {isChase && (
              <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-xl border border-slate-200 dark:border-slate-700 my-8">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 mt-0">National Wire Transfer Routing Number for Chase</h2>
                <p className="mb-4">Chase strongly emphasizes a single universal routing number for domestic wire transfers, regardless of which state the account was opened in. Explicitly verifying this saves you from frantic searching.</p>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 mt-0">State-Specific Chase ACH Numbers & Mergers</h2>
                <p className="m-0">If you have an older account from a merger like Washington Mutual (WaMu) or Bank One, those routing numbers typically still operate, but Chase’s standard structural format is heavily preferred.</p>
              </div>
            )}

            <p>
              Directing funds blindly can lead to lost capital, bounced transfers, and severe logistical headaches. Below, we provide the most comprehensive, meticulously updated database of routing transit numbers for {bankName}, conveniently arranged and organized alphabetically by state. 
              Please be aware that <strong>ACH direct deposits</strong> (used for standard 2-3 business day transfers like paychecks) and <strong>Wire transfers</strong> (used for same-day, irrevocable transfers) sometimes necessitate entirely distinct code numbers. We highly encourage you to select your specific state from the detailed directory below to review the explicit usage guidelines, confirm compatibility, and guarantee your money successfully arrives destination without any unnecessary delays.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 border-b dark:border-slate-700 pb-2">Extensive Overview of {bankName}</h2>
            <p className="mt-4">{bankDetails?.history}</p>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-3">Institutional Mission & Essential Services</h3>
            <p>{bankDetails?.mission}</p>
            <p className="mt-3">{bankDetails?.services}</p>
            
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4">Historical Milestones & Interesting Facts</h3>
            <ul className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
              <li><strong>Officially Founded:</strong> {bankDetails?.facts?.foundingYear}</li>
              {bankDetails?.facts?.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-slate-500">
              Understanding the intricacies of your institutional partner empowers you to leverage their full suite of financial products. Whether you are aiming to open a high-yield savings account, secure an equitable mortgage rate, or simply streamline your daily commercial transactions, keeping these routing details and corporate facts on hand drastically reduces friction.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 border-b dark:border-slate-700 pb-2">{bankName} Routing Numbers by State</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 mb-10">
            <table className="w-full text-left border-collapse">
              <caption className="sr-only">Federal Reserve Verified {bankName} Routing Numbers by State</caption>
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">State</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Active Routing Codes</th>
                  <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white text-right">View Directory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 bg-opacity-50">
                {states.map(state => (
                  <tr key={state} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                      {getStateFullName(state)}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      <span className="inline-flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-md text-sm font-semibold">
                        {bankData.filter(d => d.state === state).length} verified codes
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        to={`/routing-number/${bankSlug}/${state.toLowerCase()}`}
                        className="inline-flex font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                        aria-label={`View ${bankName} routing numbers in ${getStateFullName(state)}`}
                      >
                        View Details &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <FAQSection faqs={faqs} />
          
          <FeedbackModule bankName={bankName} context="Bank Overview Page" />

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
