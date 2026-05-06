import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BreadcrumbNav from '../components/BreadcrumbNav';
import AdUnit from '../components/AdUnit';
import TableOfContents from '../components/TableOfContents';
import RecentlyViewedWidget from '../components/RecentlyViewedWidget';

export default function DirectDepositRoutingNumber() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title={`Routing Number for Direct Deposit: Complete Setup Guide (${currentYear})`}
        description="Learn how to find and use your routing number to set up direct deposit for your paycheck, IRS tax refund, or government benefits."
        canonicalUrl="/direct-deposit-routing-number"
      />
      
      <BreadcrumbNav crumbs={[{ name: 'Direct Deposit Routing Number', url: '/direct-deposit-routing-number' }]} />

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-8 mt-8">
        Routing Numbers for Direct Deposit
      </h1>
        
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <article className="prose prose-lg dark:prose-invert prose-indigo max-w-none">
            <p className="lead text-xl text-slate-600 dark:text-slate-400">
              Setting up direct deposit is the fastest and most secure way to receive a paycheck, tax refund, or government benefits. To do so, you will need your bank's specific <strong>ACH (Automated Clearing House) Routing Number</strong>.
            </p>

            <AdUnit slot="UNIT 1: Below H1" className="my-8" />

            <h2 id="what-you-need">Information Needed for Direct Deposit</h2>
            <p>
              When your HR department or the IRS asks you to set up direct deposit, they will typically request a voided check or a Form with three crucial pieces of information:
            </p>
            <ul>
              <li><strong>Your 9-Digit Routing Number:</strong> This directs the money to your specific bank.</li>
              <li><strong>Your Account Number:</strong> This tells the bank to place the money into your personal account.</li>
              <li><strong>Account Type:</strong> Whether it is a Checking or Savings account.</li>
            </ul>

            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 p-6 rounded-xl my-8">
              <h3 className="font-bold text-amber-900 dark:text-amber-200 mt-0 mb-3">Crucial Tip: ACH vs. Wire Routing Numbers</h3>
              <p className="mb-0 text-amber-800 dark:text-amber-300">
                Direct deposits run on the <strong>ACH Network</strong> (Automated Clearing House). For most local banks and credit unions, their standard routing number works for both ACH and Wires. However, massive banks like Chase and Wells Fargo often have separate routing numbers specifically for Wire Transfers. <strong>Always use the "Paper & Electronic" or "ACH" routing number for Direct Deposits.</strong>
              </p>
            </div>

            <h2 id="how-to-find">How to find your Direct Deposit Routing Number</h2>
            <ol>
              <li>
                <strong>Look at a Check:</strong> The 9-digit number on the bottom left corner of your personal checks is almost always your ACH routing number and is perfect for direct deposit. 
                (<Link to="/find-routing-number-on-check">Visual guide here</Link>).
              </li>
              <li>
                <strong>Online Banking:</strong> Log into your account and search for a pre-filled "Direct Deposit Form" or "Direct Deposit Info" tab.
              </li>
              <li>
                <strong>Our Lookup Tool:</strong> Go to our <Link to="/">home page</Link> and search by your state and bank name to confirm your general routing number.
              </li>
            </ol>

            <AdUnit slot="UNIT 2: Mid Article" className="my-10" />

            <h2 id="common-mistakes">Common Direct Deposit Mistakes</h2>
            <p>
              Avoid delays in receiving your money by checking these common errors:
            </p>
            <ul>
              <li><strong>Entering a Wire Routing Number:</strong> As mentioned above, using a wire routing number for an ACH direct deposit will often cause a rejection.</li>
              <li><strong>Wrong State Number:</strong> Large banks assign routing numbers depending on the state where you <em>opened</em> the account. If you opened your account in Texas but moved to California, you must continue using the Texas routing number.</li>
              <li><strong>Typing the Check Number:</strong> Do not confuse the check number (on the far right of the MICR line) with the routing number.</li>
            </ul>

            <h2 id="tax-refunds">Filing Taxes and IRS Tax Refunds</h2>
            <p>
              When filing your federal tax return (e.g., Form 1040), lines 35b through 35d ask for your routing and account numbers. The IRS strictly uses the ACH network to direct deposit refunds. Double-check your numbers before submitting, as errors can result in the IRS mailing you a paper check instead, delaying your refund by weeks.
            </p>

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
