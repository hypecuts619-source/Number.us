import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BreadcrumbNav from '../components/BreadcrumbNav';
import CheckDiagram from '../components/CheckDiagram';
import AdUnit from '../components/AdUnit';

export default function RoutingVsAccountNumber() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO 
        title={`Routing Number vs Account Number (${currentYear} Guide)`}
        description="Learn the exact difference between a routing number and an account number. Find out where they are on a check and how to use them for direct deposits."
        canonicalUrl="/routing-vs-account-number"
      />
      
      <BreadcrumbNav crumbs={[{ name: 'Routing vs Account Number', url: '/routing-vs-account-number' }]} />

      <article className="prose prose-lg dark:prose-invert prose-indigo mx-auto mt-8">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
          Routing Number vs Account Number: What's the Difference?
        </h1>
        
        <p className="lead text-xl text-slate-600 dark:text-slate-400">
          When setting up a direct deposit, paying a bill online, or ordering new checks, you'll be asked for two critical pieces of information: your routing number and your account number. Getting them right is critical for your money to go to the right place.
        </p>

        <AdUnit slot="UNIT 1: Below H1" className="my-8" />

        <CheckDiagram />

        <h2 className="text-3xl font-bold mt-12 bg-blue-50 dark:bg-blue-900/30 p-2 inline-block rounded">The Routing Number</h2>
        <p>
          Think of a routing number (also known as an ABA number or routing transit number) like the <strong>GPS coordinates for your specific bank branch.</strong> 
        </p>
        <ul>
          <li><strong>Length:</strong> Always 9 digits long in the US.</li>
          <li><strong>Purpose:</strong> Identifies which bank (e.g., Chase, Bank of America) and which geographical region holds the account.</li>
          <li><strong>Privacy:</strong> This is a <strong>public</strong> number. You can find it listed openly on bank websites. Everyone who opened an account at your local branch relies on the exact same routing number.</li>
          <li><strong>Usage:</strong> Used to route funds between financial institutions.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 bg-emerald-50 dark:bg-emerald-900/30 p-2 inline-block rounded">The Account Number</h2>
        <p>
          If the routing number is the GPS to the bank's front door, your account number is your <strong>specific locker number inside the vault.</strong>
        </p>
        <ul>
          <li><strong>Length:</strong> Varies by bank, typically between 8 and 12 digits.</li>
          <li><strong>Purpose:</strong> Identifies your specific, individual account (checking, savings, etc.).</li>
          <li><strong>Privacy:</strong> This is highly <strong>private and confidential</strong>. You should protect this number like a password.</li>
          <li><strong>Usage:</strong> Tells the bank exactly whose account should receive the money once the funds arrive at the institution.</li>
        </ul>

        <AdUnit slot="UNIT 2: Mid Article" className="my-8" />

        <h2>How Do I Find Them?</h2>
        <h3>On a Check</h3>
        <p>
          As shown in the diagram above, look at the bottom line of numbers on checking account paper checks (the MICR line).
        </p>
        <ol>
          <li>The first sequence on the far left (between the <em>|:</em> symbols) is the <strong>9-digit routing number.</strong></li>
          <li>The middle sequence is usually your <strong>account number.</strong></li>
          <li>The sequence on the far right matches the <strong>check number</strong> printed at the top right of the check.</li>
        </ol>

        <h3>Without a Check</h3>
        <ul>
          <li><strong>Routing Number:</strong> You can use our <Link to="/">Reverse Lookup directory</Link> to search for your bank's routing number, or check your bank's official website.</li>
          <li><strong>Account Number:</strong> You must log into your secure online banking portal, check your mobile app, look at a recent bank statement, or visit a branch with ID.</li>
        </ul>

        <h2>Common Questions</h2>
        <dl>
          <dt className="font-bold text-slate-800 dark:text-slate-200 mt-6">Can I have multiple routing numbers?</dt>
          <dd className="mt-2 text-slate-600 dark:text-slate-400">Yes. Very large banks use multiple routing numbers for different regions. Sometimes, they even use a different routing number for Wire Transfers vs ACH Direct Deposits. Always specify what type of transfer you are doing when looking up a routing number.</dd>

          <dt className="font-bold text-slate-800 dark:text-slate-200 mt-6">What happens if I mix them up?</dt>
          <dd className="mt-2 text-slate-600 dark:text-slate-400">If you mistakenly enter your routing number into the account number field, the transaction will fail. Usually, systems will catch a 9-digit entry if they expect a 12-digit account number, or a routing number validation check will fail.</dd>
        </dl>
      </article>
    </div>
  );
}
