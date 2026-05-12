import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AdUnit from '../components/AdUnit';
import TableOfContents from '../components/TableOfContents';
import ArticleAuthorMeta from '../components/ArticleAuthorMeta';
import RecentlyViewedWidget from '../components/RecentlyViewedWidget';

export default function HowToFind() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SEO 
        title={`How to Find a Routing Number Without a Checkbook (${currentYear})`}
        description="Learn exactly where to find your bank routing number without a checkbook, in your online banking app, or on a bank statement. Complete guide to routing transit numbers."
        canonicalUrl="/how-to-find-routing-number"
        type="article"
      />

      <div className="mb-4">
        <Link to="/" className="text-blue-600 hover:underline">
          &larr; Back to Directory
        </Link>
      </div>

      <header className="mb-4">
        <h1 className="text-4xl font-extrabold text-[#1e3a5f] dark:text-white mb-4">
          How to Find a Routing Number Without a Checkbook
        </h1>
        <ArticleAuthorMeta date="January 28, 2026" readTime="3 min read" />
        <p className="text-xl text-slate-600 dark:text-slate-400 mt-4">
          Whether you're setting up direct deposit, paying a bill, or ordering new checks, you'll need your bank's 9-digit routing number. Here are the fastest ways to find it.
        </p>
      </header>

      <AdUnit slot="UNIT 1: Below H1, In-Article" className="my-8" />

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-[#1e3a5f] dark:prose-headings:text-white prose-a:text-blue-600">
            
            <h2>Method 1: Look at the Bottom of a Check</h2>
            <p>
              The easiest and most traditional way to find your routing number is by looking at a personal check. At the bottom of every check, you will see a string of numbers printed in a special magnetic ink font (MICR).
            </p>
            
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 my-8">
              <h3 className="text-lg font-bold mt-0 mb-4 text-center">Reading a Check (Bottom Left to Right)</h3>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xl font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-4 rounded shadow-sm border border-slate-300 dark:border-slate-700">
                <div className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 font-bold px-3 py-1 rounded inline-block mb-2 text-sm sans-serif tracking-widest">ROUTING #</div>
                  <div>|:012345678|:</div>
                </div>
                <div className="text-center">
                  <div className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-bold px-3 py-1 rounded inline-block mb-2 text-sm sans-serif tracking-widest">ACCOUNT #</div>
                  <div>123456789012||'</div>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 font-bold px-3 py-1 rounded inline-block mb-2 text-sm sans-serif tracking-widest">CHECK #</div>
                  <div>1001</div>
                </div>
              </div>
              <p className="text-sm text-slate-500 text-center mt-4 mb-0">
                Note: The exact order can occasionally vary, but the routing number is <strong>always 9 digits long</strong> and flanked by the |: symbols.
              </p>
            </div>

            <p>
              <strong>Warning for Wire Transfers:</strong> The routing number on your paper check is usually for <strong>paper and electronic (ACH)</strong> transactions. If you need to send or receive a wire transfer, many banks use a different, specific Wire Routing Number. Check with your bank first.
            </p>

            <h2>Method 2: Through Your Online Banking Portal</h2>
            <p>
              If you don't have a checkbook handy, log in to your bank's website or mobile app.
            </p>
            <ul>
              <li><strong>On the website:</strong> Click on your specific checking or savings account. Look for a tab or link titled "Account Details," "Routing & Account Info," or "Direct Deposit Info."</li>
              <li><strong>In the mobile app:</strong> Tap your account balance, then tap the "Show Details" icon (often represented by an "i" or a document icon).</li>
            </ul>

            <AdUnit slot="UNIT 2: Mid Content" className="my-10" />

            <h2>Method 3: Check Your Bank Statement</h2>
            <p>
              Most paper and PDF bank statements will print the routing number somewhere on the first page, often near your account summary or contact information. Note that some banks choose to hide it for security, but it is very common to find it there.
            </p>

            <h2>Method 4: Use USRoutingNumber.com</h2>
            <p>
              If you know the name of your bank and the state you originally opened the account in, you can use our directory. Bank routing numbers are public information and are tied to geographic regions.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-lg p-6 mt-4 mb-8 text-center text-blue-900 dark:text-blue-100">
              <strong>Ready to look up your bank?</strong>
              <br />
              <Link to="/" className="inline-block mt-3 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                Search Bank Directory
              </Link>
            </div>

            <hr className="my-10 dark:border-slate-800" />

            <h2>Frequently Asked Questions</h2>
            
            <h3>Is the routing number a secret?</h3>
            <p>
              No. Routing numbers are public information and are openly published by banks and the Federal Reserve. They identify the bank entity, not you. However, your <em>account</em> number is strictly confidential and should never be shared publicly.
            </p>

            <h3>Do I have a different routing number for savings and checking?</h3>
            <p>
              Typically, no. If both accounts were opened in the same state under the same bank, they will share the same routing number. The account number is what differentiates them.
            </p>

            <h3>Why does my bank have multiple routing numbers?</h3>
            <p>
              Large national banks (like Chase or Wells Fargo) acquire smaller banks over time and operate across multiple regions. Because of this, they assign different routing numbers to accounts based on what state the account was originally opened in. Furthermore, Wire Transfers and ACH (Direct Deposit) transactions often utilize different routing networks entirely.
            </p>

          
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
        </div>

        <aside className="lg:w-1/3 space-y-6">
          <TableOfContents />
          
          <div className="sticky top-[450px]">
            <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-xl border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 mb-6">
              <h3 className="font-bold mb-2">Security Tip</h3>
              <p className="text-sm">Never share your <strong>Account Number</strong> publically. While your Routing Number merely identifies your bank, your Account Number gives direct access to your funds.</p>
            </div>
            <RecentlyViewedWidget />
          </div>

        </aside>
      </div>
    </div>
  );
}
