import { Link } from 'react-router-dom';
import BreadcrumbNav from '../components/BreadcrumbNav';
import AdUnit from '../components/AdUnit';
import SEO from '../components/SEO';
import TableOfContents from '../components/TableOfContents';
import RecentlyViewedWidget from '../components/RecentlyViewedWidget';

export default function WireTransferGuide() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title={`How to Wire Money Using a Routing Number (${currentYear}) | USRoutingNumber.com`}
        description="Complete guide on sending and receiving wire transfers. Learn the difference between ACH and Wire routing numbers and what info you need."
        canonicalUrl="/how-to-wire-money"
        type="article"
      />

      <BreadcrumbNav crumbs={[{ name: 'How to Wire Money', url: '/how-to-wire-money' }]} />

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
        How to Wire Money Using a Routing Number
      </h1>

      <AdUnit slot="UNIT 1: Below H1" className="my-8" />

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <article className="prose prose-lg prose-slate dark:prose-invert text-slate-600 dark:text-slate-300 max-w-none">
            <p className="lead text-xl">
              Sending a wire transfer is one of the fastest ways to move large sums of money between bank accounts. 
              However, unlike standard ACH transfers, wire transfers often have specific requirements and higher fees.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12">1. Identify the Correct Routing Number</h2>
            <p>
              The most common mistake when initiating a wire transfer is using an ACH routing number. 
              Many major banks like JPMorgan Chase, Wells Fargo, and Bank of America use different routing numbers for 
              ACH (Direct Deposits) and Wire Transfers. Using the wrong number can result in the transfer being rejected 
              and yours or the sender's bank charging a "Returned Item" fee.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">2. Information You Will Need</h2>
            <p>Before you visit your bank branch or log into your online banking app, ensure you have the following:</p>
            <ul className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 list-none pl-6 border-l-4 border-l-blue-500">
              <li className="flex gap-3 mb-2 font-semibold">
                <span className="text-blue-600 dark:text-blue-400">✓</span> Recipient's Full Name (as it appears on their bank account)
              </li>
              <li className="flex gap-3 mb-2 font-semibold">
                <span className="text-blue-600 dark:text-blue-400">✓</span> Recipient's Account Number
              </li>
              <li className="flex gap-3 mb-2 font-semibold">
                <span className="text-blue-600 dark:text-blue-400">✓</span> Recipient Bank's 9-Digit Wire Routing Number
              </li>
              <li className="flex gap-3 mb-2 font-semibold">
                <span className="text-blue-600 dark:text-blue-400">✓</span> Bank Name and Physical Address
              </li>
              <li className="flex gap-3 mb-2 font-semibold">
                <span className="text-blue-600 dark:text-blue-400">✓</span> Recipient's Physical Address
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">3. Domestics vs. International Wires</h2>
            <p>
              For domestic transfers within the United States, the 9-digit routing number is usually all that is required 
              for the electronic banking system. For international transfers, you will also need a **SWIFT code** (also known as a BIC) instead of a routing number. 
              International transfers can take 3-5 business days, whereas domestic wires are often completed within a few hours.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 mt-4 border border-blue-100 dark:border-blue-800/50 rounded-lg">
              <strong className="text-blue-900 dark:text-blue-300">Sending money abroad?</strong> Learn more about SWIFT, BIC, and IBANs in our <Link to="/international-wire-guide" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Complete Guide to International Wires</Link>.
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">4. Understanding the Fees</h2>
            <p>
              Typically, the sender pays a fee ranging from $20 to $50 per wire transfer. 
              The receiving bank may also charge a small incoming wire fee (usually $10 to $20). 
              Check our bank-specific pages to see estimated fees for major institutions in {currentYear}.
            </p>
          </article>

          <AdUnit slot="UNIT 2: Mid Content" className="my-12" />
          
          <div className="bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-2xl p-8 mt-12">
            <h3 className="text-xl font-bold text-[#1e3a5f] dark:text-blue-300 mb-4">Pro Tip: Use Our Lookup Tool</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              If you have a 9-digit number but aren't sure if it's for ACH or Wire, use our 
              <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline font-bold mx-1">Routing Number Lookup</Link> 
              feature on the homepage. We verify every number against the Federal Reserve database to tell you its supported transaction types.
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
