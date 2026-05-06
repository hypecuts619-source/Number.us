import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BreadcrumbNav from '../components/BreadcrumbNav';
import AdUnit from '../components/AdUnit';
import TableOfContents from '../components/TableOfContents';
import RecentlyViewedWidget from '../components/RecentlyViewedWidget';

export default function WhatIsAbaRoutingNumber() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO 
        title={`What is an ABA Routing Number? Definition & Guide (${currentYear})`}
        description="Learn what an ABA routing number is, what it's used for, and how the 9-digit American Bankers Association format actually works."
        canonicalUrl="/aba-routing-number"
      />
      
      <BreadcrumbNav crumbs={[{ name: 'What is an ABA Routing Number', url: '/aba-routing-number' }]} />

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-8 mt-8">
        What is an ABA Routing Number?
      </h1>
        
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <article className="prose prose-lg dark:prose-invert prose-indigo max-w-none">
            <p className="lead text-xl text-slate-600 dark:text-slate-400">
              An <strong>ABA routing number</strong> (also known as an ABA routing transit number or RTN) is a nine-digit code used to identify banks and financial institutions in the United States.
            </p>

            <AdUnit slot="UNIT 1: Below H1" className="my-8" />

            <h2 id="history-and-purpose">History and Purpose</h2>
            <p>
              Developed in 1910 by the <strong>American Bankers Association (ABA)</strong>, the system was originally designed to make it easier to sort paper checks. Today, ABA routing numbers are essential for almost all electronic and paper financial transactions, including:
            </p>
            <ul>
              <li><strong>Direct Deposits:</strong> Routing your paycheck from your employer to your bank account.</li>
              <li><strong>Wire Transfers:</strong> Moving money between domestic banks quickly.</li>
              <li><strong>ACH Transfers:</strong> Electronic bill pay and transferring funds between accounts at different banks.</li>
              <li><strong>Check Clearing:</strong> Processing traditional paper checks.</li>
            </ul>

            <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 p-6 rounded-xl my-8">
              <h3 className="font-bold text-emerald-900 dark:text-emerald-100 mt-0 mb-3">ABA vs Routing Number</h3>
              <p className="mb-0 text-emerald-800 dark:text-emerald-200">
                Are an "ABA Number" and a "Routing Number" the same thing? <strong>Yes.</strong> The terms are completely interchangeable. If a form asks for an ABA number, they just want your standard 9-digit bank routing number.
              </p>
            </div>

            <h2 id="how-its-formatted">How an ABA Routing Number is Formatted</h2>
            <p>
              The nine digits aren't just random. They are mathematically structured to indicate where the bank is located and precisely which Federal Reserve branch processes its transactions. Here is the breakdown:
            </p>

            <div className="overflow-x-auto my-6">
              <table className="w-full text-left border-collapse border border-slate-300 dark:border-slate-700">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800">
                    <th className="border border-slate-300 dark:border-slate-700 p-3">Digits</th>
                    <th className="border border-slate-300 dark:border-slate-700 p-3">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-700 p-3 font-mono font-bold">1 - 2</td>
                    <td className="border border-slate-300 dark:border-slate-700 p-3">Federal Reserve Routing Symbol (indicates the Fed district)</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-700 p-3 font-mono font-bold">3</td>
                    <td className="border border-slate-300 dark:border-slate-700 p-3">Federal Reserve Office or processing center</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-700 p-3 font-mono font-bold">4 - 8</td>
                    <td className="border border-slate-300 dark:border-slate-700 p-3">The specific bank identity / ABA institution number</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300 dark:border-slate-700 p-3 font-mono font-bold">9</td>
                    <td className="border border-slate-300 dark:border-slate-700 p-3">
                      <strong>Check Digit:</strong> Used to verify the validity of the previous 8 numbers programmatically. 
                      (<Link to="/check-digit-calculator">Try our Check Digit Calculator</Link>)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <AdUnit slot="UNIT 2: Mid Article" className="my-10" />

            <h2 id="who-can-get-one">Who Qualifies for an ABA Number?</h2>
            <p>
              Not every company can simply get an ABA routing number. To be issued one, a financial institution must be chartered in the United States and must hold an account with the Federal Reserve. For most individuals, your credit union or bank manages this on your behalf.
            </p>

            <h2 id="multiple-routing-numbers">Why do some banks have multiple ABA numbers?</h2>
            <p>
              Very large national banks, like Bank of America or Chase, operate across multiple states and have acquired smaller regional banks over time. Consequently, they hold numerous routing numbers based on geographical location. Always use the specific ABA number assigned to the state where you originally opened your account. You can <Link to="/states">search for your bank by state</Link> if you are unsure.
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
