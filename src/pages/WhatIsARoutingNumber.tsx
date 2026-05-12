import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BreadcrumbNav from '../components/BreadcrumbNav';
import AdUnit from '../components/AdUnit';
import TableOfContents from '../components/TableOfContents';
import RecentlyViewedWidget from '../components/RecentlyViewedWidget';

export default function WhatIsARoutingNumber() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title={`What is a Routing Number? Complete ${currentYear} Guide`}
        description="Learn what a routing number is, what it's used for, and how to find yours for direct deposit and electronic transfers."
        canonicalUrl="/what-is-a-routing-number"
      />
      
      <BreadcrumbNav crumbs={[{ name: 'What is a Routing Number', url: '/what-is-a-routing-number' }]} />

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-8 mt-8">
        What is a Routing Number?
      </h1>
        
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <article className="prose prose-lg dark:prose-invert prose-indigo max-w-none">
            <p className="lead text-xl text-slate-600 dark:text-slate-400">
              A <strong>routing number</strong> is a nine-digit code used by banks in the United States to identify the specific financial institution and branch associated with an account. 
            </p>

            <AdUnit slot="UNIT 1: Below H1" className="my-8" />

            <h2 id="what-are-they-used-for">What Are Routing Numbers Used For?</h2>
            <p>
              Routing numbers act like an address for your bank. When you send or receive money, the routing number tells the system exactly which bank should receive or send the funds. They are essential for:
            </p>
            <ul>
              <li><strong><Link to="/direct-deposit-routing-number">Direct Deposits</Link>:</strong> Receiving your paycheck or tax refund automatically.</li>
              <li><strong>Electronic Bill Pay:</strong> Allowing utility companies or lenders to automatically withdraw payments.</li>
              <li><strong>Wire Transfers:</strong> Sending funds securely between banks. (Note: some banks use a different routing number for wires).</li>
              <li><strong>Processing Checks:</strong> Moving money from the check writer's bank to the check deposits' bank.</li>
            </ul>

            <h2 id="how-to-find">How to Find Your Routing Number</h2>
            <p>There are multiple ways to find your bank's routing number:</p>
            <ol>
              <li>
                <strong>On a check:</strong> It is the 9-digit number at the bottom left. 
                <br /><Link to="/find-routing-number-on-check">See our visual guide for finding your routing number on a check</Link>.
              </li>
              <li>
                <strong>Online Banking:</strong> Log into your account and check your account details or direct deposit form.
              </li>
              <li>
                <strong>Using our lookup tool:</strong> Search for your bank and state using our <Link to="/routing-number-lookup">Routing Number Lookup tool</Link>.
              </li>
            </ol>

            <AdUnit slot="UNIT 2: Mid Article" className="my-10" />

            <h2 id="how-do-they-work">How Routing Numbers Work</h2>
            <p>
              Originally called an <Link to="/aba-routing-number">ABA Routing Number</Link> (created by the American Bankers Association), the nine digits are structured systematically:
            </p>
            <ul>
              <li><strong>First two digits:</strong> Indicate the Federal Reserve Routing Symbol.</li>
              <li><strong>Third digit:</strong> Identifies the Federal Reserve processing center.</li>
              <li><strong>Next five digits:</strong> Represent the specific bank.</li>
              <li><strong>Final digit:</strong> A check digit mathematically formulated to verify the number.</li>
            </ul>

          
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
        
        <aside className="lg:w-1/3">
          <TableOfContents />
          <div className="sticky top-[450px]">
             <AdUnit slot="UNIT 4: Sidebar Ad, Display" className="min-h-[250px] mb-6" />
             <RecentlyViewedWidget />
          </div>
        </aside>
      </div>
    </div>
  );
}
