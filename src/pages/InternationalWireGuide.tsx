import { Link } from 'react-router-dom';
import BreadcrumbNav from '../components/BreadcrumbNav';
import ArticleAuthorMeta from '../components/ArticleAuthorMeta';
import AdUnit from '../components/AdUnit';
import SEO from '../components/SEO';
import TableOfContents from '../components/TableOfContents';
import RecentlyViewedWidget from '../components/RecentlyViewedWidget';

export default function InternationalWireGuide() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title="International Wire Transfer Info Needed | SWIFT Codes & US Routing Numbers"
        description="Need to send an international wire? Find out exactly what info is needed, including SWIFT codes and US routing numbers for major banks in America."
        canonicalUrl="/international-wire-guide"
        type="article"
      />

      <BreadcrumbNav crumbs={[{ name: 'International Wire Guide', url: '/international-wire-guide' }]} />

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4 mt-8">
        International Wire Transfers: SWIFT/BIC & IBANs Explained
      </h1>
      <ArticleAuthorMeta date="April 4, 2026" readTime="5 min read" />

      <AdUnit slot="UNIT 1: Below H1" className="my-8" />

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <article className="prose prose-lg prose-slate dark:prose-invert text-slate-600 dark:text-slate-300 max-w-none">
            <p className="lead text-xl">
              Sending money across borders is significantly more complex than a domestic wire transfer. 
              Instead of relying solely on the 9-digit ABA routing numbers used in the United States, 
              the global financial system uses standardized codes like **SWIFT/BIC** and **IBAN** to ensure 
              funds reach their correct destination.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12">1. The Difference Between ABA, SWIFT/BIC, and IBAN</h2>
            <p>
              Before initiating an international wire, it's crucial to understand the different identification codes involved:
            </p>
            <ul className="space-y-4">
              <li>
                <strong className="dark:text-slate-200">ABA Routing Number:</strong> A 9-digit code used strictly for domestic transfers within the United States. You cannot use this for sending money overseas.
              </li>
              <li>
                <strong className="dark:text-slate-200">SWIFT Code / BIC (Bank Identifier Code):</strong> An 8 or 11-character alphanumeric code that identifies a specific bank globally. This acts like a routing number for the international banking network. Example: <code className="dark:bg-slate-800 dark:text-slate-200">CHASUS33</code>.
              </li>
              <li>
                <strong className="dark:text-slate-200">IBAN (International Bank Account Number):</strong> An internationally agreed-upon system of identifying bank accounts across national borders. Mainly used in Europe and the Middle East. It contains up to 34 alphanumeric characters, which includes the country code, bank code, and account number. The US does <em className="dark:text-slate-200">not</em> use IBANs, but if you are sending money to Europe, you will need the recipient's IBAN.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">2. Information Needed for an International Wire</h2>
            <p>To safely route funds internationally, gather the following details from your recipient:</p>
            <ul className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-6 list-none pl-6 border-l-4 border-l-blue-500">
              <li className="flex gap-3 mb-2 font-semibold">
                <span className="text-blue-600 dark:text-blue-400">✓</span> Recipient's Full Name and Physical Address
              </li>
              <li className="flex gap-3 mb-2 font-semibold">
                <span className="text-blue-600 dark:text-blue-400">✓</span> Recipient's IBAN (or standard account number if the country doesn't use IBANs)
              </li>
              <li className="flex gap-3 mb-2 font-semibold">
                <span className="text-blue-600 dark:text-blue-400">✓</span> Recipient Bank's SWIFT/BIC Code
              </li>
              <li className="flex gap-3 mb-2 font-semibold">
                <span className="text-blue-600 dark:text-blue-400">✓</span> Recipient Bank's Name and Physical Address
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8">3. Common Pitfalls to Avoid</h2>
            
            <p>International wires are notoriously prone to errors. Be mindful of these common traps:</p>
            <div className="space-y-6 mt-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Intermediary Bank Fees</h3>
                <p className="mt-0">Your bank might not have a direct relationship with the recipient's bank in another country. In these cases, the wire might route through one or two "intermediary banks," each taking a cut (usually $10 - $30). Consider using intermediary bank instructions if your recipient provides them to avoid rejected wires or unexpected shortfalls in the final amount delivered.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Exchange Rate Markups</h3>
                <p className="mt-0">Banks often boast "no international wire fees," but make up for it by offering poor exchange rates. Always check whether your bank will send the transfer in USD (making the receiving bank handle the conversion) or convert it locally before sending.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Truncated Recipient Names</h3>
                <p className="mt-0">The SWIFT network limits character counts for recipient names and addresses. If your recipient has a long name, a mismatch at the destination bank can cause the transfer to be held up for weeks in "compliance checks." Always verify exactly how the name should be entered.</p>
              </div>
            </div>
          
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
            </div>\n          </article>

          <AdUnit slot="UNIT 2: Mid Content" className="my-12" />
          
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-8 mt-12 mb-8">
            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-400 mb-4">Alternatives to Traditional SWIFT Wires</h3>
            <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed mb-4">
              Due to high fees and slow transfer times (often 2-5 business days), many consumers are turning to modern money transfer services for smaller international payments.
            </p>
            <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed m-0">
              Services like Wise, Remitly, and Revolut use local bank integration networks instead of the global SWIFT network, offering significantly lower fees, wholesale exchange rates, and often same-day delivery.
            </p>
          </div>

          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 mt-12">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Sending a Domestic Transfer Instead?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0">Learn what you need for US-to-US bank transfers.</p>
            </div>
            <Link to="/how-to-wire-money" className="px-5 py-2 bg-slate-800 dark:bg-slate-700 text-white font-medium rounded hover:bg-slate-700 dark:hover:bg-slate-600 transition">
              Read Guide
            </Link>
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
