import { Link } from 'react-router-dom';
import BreadcrumbNav from '../components/BreadcrumbNav';
import ArticleAuthorMeta from '../components/ArticleAuthorMeta';
import AdUnit from '../components/AdUnit';
import SEO from '../components/SEO';
import TableOfContents from '../components/TableOfContents';
import RecentlyViewedWidget from '../components/RecentlyViewedWidget';
import FAQSection from '../components/FAQSection';
import { generateFAQSchema } from '../lib/seoHelpers';

export default function WireTransferGuide() {
  const currentYear = new Date().getFullYear();

  const faqs = [
    {
      question: "Can I use an ACH routing number for a wire transfer?",
      answer: "Usually, no. Many major US banks (like Chase or Bank of America) use a completely separate 9-digit routing number specifically dedicated to Wire Transfers. If you use the ACH routing number, your wire might fail, and you could be charged a return fee."
    },
    {
      question: "How long does a domestic wire transfer take?",
      answer: "Domestic wire transfers typically clear within the same business day if initiated before the bank's cutoff time (usually between 2:00 PM and 4:30 PM EST). If initiated after the cutoff, it will process the next business day."
    },
    {
      question: "What is the difference between a routing number and a SWIFT code?",
      answer: "A routing number is a 9-digit code used strictly for domestic transfers within the United States. A SWIFT code (or BIC) is an 8 to 11 character alphanumeric code used to identify banks internationally."
    },
    {
      question: "How much does it cost to wire money?",
      answer: "In the US, sending a domestic wire usually costs between $20 and $35. Receiving a domestic wire often costs between $10 and $15, though some premium checking accounts waive these fees."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title={`What is a Wire Transfer Routing Number? | US Guide (${currentYear})`}
        description="Need to send a wire? Learn what a wire transfer routing number is, how it differs from ACH, and exactly what info is needed."
        canonicalUrl="/how-to-wire-money"
        type="article"
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateFAQSchema(faqs) }} />
      </SEO>

      <BreadcrumbNav crumbs={[{ name: 'How to Wire Money', url: '/how-to-wire-money' }]} />

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 mt-8">
        How to Wire Money Using a Routing Number
      </h1>
      <ArticleAuthorMeta date={`Updated May ${currentYear}`} readTime="10 min read" />

      <AdUnit slot="UNIT 1: Below H1" className="my-8" />

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <article className="prose prose-lg prose-slate dark:prose-invert text-slate-600 dark:text-slate-300 max-w-none">
            <p className="lead text-xl">
              Sending a wire transfer is one of the fastest and most secure ways to move large sums of money between bank accounts. 
              Whether you are putting a down payment on a house, sending urgently needed funds to a family member, or paying a large corporate invoice, wire transfers bypass the multi-day clearing process of standard ACH transfers.
            </p>
            <p>
              However, unlike standard direct deposits, wire transfers have extremely specific requirements. A single mismatched digit or an incorrect routing code can result in delayed funds, failed transactions, and expensive return fees. In this comprehensive guide, we will walk you through exactly how to wire money to a United States bank account successfully.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12">1. Identify the Correct Routing Number (The Most Common Error)</h2>
            <p>
              The number one reason wire transfers fail in the United States is that the sender used the wrong type of routing number. 
            </p>
            <p>
              Every checking account has a 9-digit ABA Routing Transit Number printed at the bottom of the check. For small community banks and credit unions, this single number is used for everything: direct deposits, bill pay, and wire transfers.
              First, understand that many mega-banks (like JPMorgan Chase, Wells Fargo, Bank of America, and Citibank) separate their traffic. They issue one routing number for <strong>ACH / Electronic / Paper Check</strong> traffic, and an entirely different 9-digit routing number specifically for <strong>Incoming Domestic Wire Transfers</strong>.
            </p>
            <p>
              <strong>What happens if you use the ACH routing number for a wire transfer?</strong><br/>
              The Federal Reserve's Fedwire system will attempt to route the money. When it hits the recipient's bank, their automated systems will see the funds arriving on the wrong "track." At best, the transaction requires a human employee to manually reroute the funds (causing a 1-2 day delay). At worst, the transaction is rejected instantly and bounces back to you. When it bounces, your bank will still charge you the outgoing wire fee, and often an additional $15 "Returned Item" penalty.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">2. Required Information for a Domestic Wire Transfer</h2>
            <p>Before you visit your local bank branch to fill out a wire transfer form, or before you log into your desktop banking portal to initiate the transfer online, you must gather precise information about the recipient. Guessing is not acceptable for wire transfers.</p>
            <ul className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 list-none pl-6 border-l-4 border-l-blue-500 my-8">
              <li className="flex gap-3 mb-3 font-medium">
                <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span> <strong>Recipient's Full Name:</strong> This must exactly match the name on their bank account. If the account is under "Jonathan Doe" and you write "Jon Doe," some strict compliance branches will freeze the transfer.
              </li>
              <li className="flex gap-3 mb-3 font-medium">
                <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span> <strong>Recipient's Account Number:</strong> The exact checking or savings account number.
              </li>
              <li className="flex gap-3 mb-3 font-medium">
                <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span> <strong>Recipient Bank's 9-Digit Wire Routing Number:</strong> As discussed above, ensure this is explicitly cleared for Fedwire/Wire transfers.
              </li>
              <li className="flex gap-3 mb-3 font-medium">
                <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span> <strong>Bank Name and Physical Address:</strong> You will usually need the bank's headquarters address, or occasionally the specific branch address where the account was opened.
              </li>
              <li className="flex gap-3 mb-2 font-medium">
                <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span> <strong>Recipient's Physical Address:</strong> You need their home or business address. A P.O. Box is often rejected by anti-money laundering (AML) software.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">3. Domestic Wires vs. International Wires (SWIFT)</h2>
            <p>
              The instructions above apply strictly to <strong>Domestic United States Transfers</strong> (sending money from one US bank to another US bank).
            </p>
            <p>
              If you are sending money from outside the United States into a US bank account, the 9-digit ABA routing number is generally useless on its own. The international financial system operates on the SWIFT network. 
            </p>
            <p>
              For an international transfer to the US, you will need the receiving bank's <strong>SWIFT Code</strong> (an 8 or 11 character alphanumeric string, also known as a BIC). Many sender banks will ask for the SWIFT Code first to identify the institution, and then they will ask for the 9-digit ABA routing number to identify the specific state branch or clearinghouse. 
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 mt-6 border border-blue-100 dark:border-blue-800/50 rounded-lg">
              <strong className="text-blue-900 dark:text-blue-300 block mb-2 font-bold text-lg">Sending money across borders?</strong> 
              If you need instructions for international remittances, SWIFT codes, or IBAN formats, read our comprehensive <Link to="/international-wire-guide" className="text-blue-700 dark:text-blue-400 font-bold underline hover:no-underline">Complete Guide to International Wires</Link>.
            </div>

            <AdUnit slot="UNIT 2: Mid Content" className="my-10" />

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">4. Understanding the Processing Times</h2>
            <p>
              One of the primary benefits of a wire transfer is speed. The Fedwire system is a real-time gross settlement funds transfer system operated by the Federal Reserve Banks. 
            </p>
            <p>
              If you initiate a domestic wire transfer early in the morning (e.g., 9:00 AM EST), the funds will often be deposited and available in the recipient's account by that afternoon. 
            </p>
            <p>
              However, every bank enforces a <strong>daily cutoff time</strong>. For most major US institutions, the cutoff time is between 2:00 PM and 4:30 PM local time. If you submit the wire request at 5:00 PM on a Tuesday, the request will remain queued and won't actually be processed until Wednesday morning. Additionally, wire transfers do not process on weekends or federal banking holidays.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">5. The Cost: Wire Transfer Fees in {currentYear}</h2>
            <p>
              Unlike ACH transfers (Zelle, Venmo, standard direct deposit) which are typically free for consumers, wire transfers incur significant fees because they represent an irrevocable, guaranteed transfer of funds.
            </p>
            <ul>
              <li><strong>Outgoing Domestic Wire Fee:</strong> $20 to $35. (You pay this to send the money).</li>
              <li><strong>Incoming Domestic Wire Fee:</strong> $10 to $15. (The recipient pays this out of the transferred balance to receive the money).</li>
              <li><strong>Outgoing International Wire Fee:</strong> $35 to $50+.</li>
            </ul>
            <p>
              Note: Many premium tier checking accounts or wealth management accounts waive incoming domestic wire fees entirely. Always check your specific account's fee schedule.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Frequently Asked Questions</h2>
            <FAQSection faqs={faqs} />
          
            <div className="mt-12 bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 mt-0">Free Financial Tools</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link to="/routing-number-validator" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-blue-500 transition-all flex items-center justify-between group no-underline">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white m-0 text-base group-hover:text-blue-600 dark:group-hover:text-blue-400">Validate Routing Number</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 m-0 mt-1">Check the ABA Checksum</p>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">&rarr;</span>
                </Link>
                <Link to="/routing-number-lookup" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-blue-500 transition-all flex items-center justify-between group no-underline">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white m-0 text-base group-hover:text-blue-600 dark:group-hover:text-blue-400">Reverse Lookup</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 m-0 mt-1">Find the bank for a number</p>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">&rarr;</span>
                </Link>
              </div>
            </div>
          </article>
          
          <div className="bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-2xl p-8 mt-12">
            <h3 className="text-xl font-bold text-[#1e3a5f] dark:text-blue-300 mb-4">Pro Tip: Use Our Lookup Tool</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If you have a 9-digit number but aren't sure if it's strictly for ACH or if it supports Fedwire, use our 
              <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline font-bold mx-1">Routing Number Lookup</Link> 
              feature on the homepage. We cross-reference the number against the Federal Reserve database to tell you precisely which transaction types are supported.
            </p>
          </div>
        </div>

        <aside className="lg:w-1/3">
          <TableOfContents />
          <div className="sticky top-[450px]">
             <AdUnit slot="UNIT 4: Sidebar Ad, Display" className="min-h-[250px]" />
             <RecentlyViewedWidget />
          </div>
        </aside>
      </div>
    </div>
  );
}
