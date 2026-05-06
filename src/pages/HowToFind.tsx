import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AdUnit from '../components/AdUnit';

export default function HowToFind() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <SEO 
        title={`How to Find Your Routing Number (${currentYear}) | USRoutingNumber.com`}
        description="Learn exactly where to find your bank routing number on a check, in your online banking app, or on a bank statement. Complete guide to routing transit numbers."
        canonicalUrl="/how-to-find-routing-number"
        type="article"
      />

      <div className="mb-4">
        <Link to="/" className="text-blue-600 hover:underline">
          &larr; Back to Directory
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1e3a5f] mb-4">
          How to Find Your Routing Number
        </h1>
        <p className="text-xl text-slate-600">
          Whether you're setting up direct deposit, paying a bill, or ordering new checks, you'll need your bank's 9-digit routing number. Here are the fastest ways to find it.
        </p>
      </header>

      <AdUnit slot="UNIT 1: Below H1, In-Article" className="my-8" />

      <div className="grid gap-12 lg:grid-cols-[1fr,300px]">
        <article className="prose prose-slate max-w-none prose-headings:text-[#1e3a5f] prose-a:text-blue-600">
          
          <h2>Method 1: Look at the Bottom of a Check</h2>
          <p>
            The easiest and most traditional way to find your routing number is by looking at a personal check. At the bottom of every check, you will see a string of numbers printed in a special magnetic ink font (MICR).
          </p>
          
          <div className="bg-slate-100 p-6 rounded-xl border border-slate-200 my-8">
            <h3 className="text-lg font-bold mt-0 mb-4 text-center">Reading a Check (Bottom Left to Right)</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xl font-mono text-slate-700 bg-white p-4 rounded shadow-sm border border-slate-300">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded inline-block mb-2 text-sm sans-serif tracking-widest">ROUTING #</div>
                <div>|:012345678|:</div>
              </div>
              <div className="text-center">
                <div className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded inline-block mb-2 text-sm sans-serif tracking-widest">ACCOUNT #</div>
                <div>123456789012||'</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded inline-block mb-2 text-sm sans-serif tracking-widest">CHECK #</div>
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
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-4 mb-8 text-center text-blue-900">
            <strong>Ready to look up your bank?</strong>
            <br />
            <Link to="/" className="inline-block mt-3 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
              Search Bank Directory
            </Link>
          </div>

          <hr className="my-10" />

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

        </article>

        <aside className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Related Guides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/how-to-wire-money" className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-between">
                  How to Wire Money
                  <span className="text-slate-400 text-xl leading-none">&rsaquo;</span>
                </Link>
              </li>
              <li>
                <Link to="/international-wire-guide" className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-between">
                  International Wires
                  <span className="text-slate-400 text-xl leading-none">&rsaquo;</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-between">
                  Directory Home
                  <span className="text-slate-400 text-xl leading-none">&rsaquo;</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 text-amber-900">
            <h3 className="font-bold mb-2">Security Tip</h3>
            <p className="text-sm">Never share your <strong>Account Number</strong> publically. While your Routing Number merely identifies your bank, your Account Number gives direct access to your funds.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
