import React from 'react';
import SEO from '../components/SEO';
import { ShieldCheck, ArrowRight, CheckCircle, Info, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import ArticleAuthorMeta from '../components/ArticleAuthorMeta';

export default function EssentialGuide() {
  const currentYear = new Date().getFullYear();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between ACH and Wire routing numbers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ACH routing numbers are used for electronic transfers like direct deposits and bill payments, which usually take 1-3 business days. Wire routing numbers are used for domestic and international wire transfers, which are processed much faster (often same-day) but usually incur fees."
        }
      },
      {
        "@type": "Question",
        "name": "Are routing numbers public information?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, routing numbers are public identifiers for financial institutions and are not private like account numbers. You can find them on official bank websites, the Federal Reserve database, or on the bottom left corner of your personal checks."
        }
      },
      {
        "@type": "Question",
        "name": "Can a bank have more than one routing number?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, many large financial institutions have multiple routing numbers assigned to different states, regions, or specific types of transactions (like electronic ACH vs. paper items)."
        }
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 w-full">
      <SEO 
        title={`How to Find and Verify US Routing Numbers: The ${currentYear} Essential Guide`}
        description="Learn the expert methods to find, verify, and use US routing numbers for ACH, Wire transfers, and Direct Deposits. Includes security tips to avoid fraud."
        canonicalUrl="/how-to-find-routing-number-guide"
      >
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </SEO>

      <div className="mb-8">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
          How to Find and Verify US Routing Numbers: The {currentYear} Essential Guide
        </h1>
        
        <ArticleAuthorMeta 
          date="May 10, 2026" 
          readTime="12 min read" 
          author="Marcus V. Thorne" 
          reviewer="Financial Security Board"
        />
      </div>

      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
        <p className="lead text-xl text-slate-600 dark:text-slate-300">
          In the modern financial landscape, the 9-digit American Bankers Association (ABA) routing transit number (RTN) remains the backbone of the United States payment system. Whether you're setting up a new direct deposit or sending a high-value wire transfer, one digit out of place can lead to delayed funds or expensive return fees.
        </p>

        <h2 id="understanding-types">1. Understanding Routing Number Types: ACH vs. Wire vs. Transit</h2>
        <p>
          Not all routing numbers are created equal. Depending on the type of transaction you are performing, your bank may require a specific identifier.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 my-10">
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-blue-600 dark:text-blue-400 font-bold mt-0 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> ACH Routing
            </h3>
            <p className="text-sm mb-0">Used for payroll direct deposits, IRS tax refunds, and automatic bill payments. Typically slower (1-3 days).</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-emerald-600 dark:text-emerald-400 font-bold mt-0 flex items-center gap-2">
              <Lock className="w-5 h-5" /> Wire Transfer
            </h3>
            <p className="text-sm mb-0">Specific to Fedwire domestic transfers. Often different from the ACH number to facilitate same-day settlement.</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-slate-600 dark:text-slate-400 font-bold mt-0 flex items-center gap-2">
              <Info className="w-5 h-5" /> Paper/Transit
            </h3>
            <p className="text-sm mb-0">The original routing number found on physical checks. Used by the clearinghouse to route physical items for processing.</p>
          </div>
        </div>

        <h2 id="finding-guide">2. Step-by-Step: How to Find Your Routing Number</h2>
        <p>
          Regardless of your bank, there are four primary ways to locate your verified routing data:
        </p>
        
        <h3>Method A: The Personal Check (The Most Reliable)</h3>
        <p>
          Look at the bottom left corner of any personal check. You will see three sets of numbers. The first set of 9 digits is your ABA routing number. The second set is usually your account number, followed by the check number.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-800 my-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h4 className="mt-0 text-blue-900 dark:text-blue-300">Pro Tip for Digital Users</h4>
              <p className="mb-0 text-blue-800 dark:text-blue-400">
                Most modern banking apps (like Wells Fargo, Chase, or regional credit unions such as <Link to="/regional-banks/schoolsfirst-federal-cu" className="font-bold underline decoration-blue-400/50">SchoolsFirst FCU</Link>) have a "Direct Deposit" or "Account Details" section that displays your routing number.
              </p>
            </div>
            <ArrowRight className="hidden md:block w-8 h-8 text-blue-400" />
          </div>
        </div>

        <h3>Method B: Online Banking Dashboard</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Log in to your bank's secure portal.</li>
          <li>Select the account you wish to transact with.</li>
          <li>Click 'Account Details', 'More Options', or 'Direct Deposit Information'.</li>
        </ul>

        <h2 id="security">3. Wire Transfer Fraud: A Security Checklist</h2>
        <p>
          In {currentYear}, wire transfer fraud has reached record highs. Scammers often use "Phishing" or "Spoofing" to send you fake routing instructions.
        </p>
        <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-6 my-8">
          <h4 className="text-red-900 dark:text-red-400 mt-0 font-bold">CRITICAL SAFETY RULE</h4>
          <p className="mb-0 text-red-800 dark:text-red-300">
            Never trust routing or wire instructions sent solely via email. If a title company or recipient sends new instructions, <strong>always</strong> call them at a verified number (found on their official website) to verify the digits verbally.
          </p>
        </div>

        <h2 id="verifying">4. How to Verify a Routing Number Digitally</h2>
        <p>
          Before committing a large sum of money, use an <Link to="/routing-number-validator">online validation tool</Link> to check the "Check Digit." The 9th digit of every routing number is a mathematical sum of the first 8. If the math doesn't add up, the number is definitely wrong.
        </p>
        
        <p>
          We recommend checking regional directories such as the <Link to="/regional-banks/texas-dow-employees-cu">TDECU Routing Directory</Link> or the <Link to="/regional-banks/becu-boeing-employees-cu">BECU Information Hub</Link> for state-specific data.
        </p>

        <h2 id="faq">5. Frequently Asked Questions</h2>
        <div className="space-y-6 mt-8">
          {faqSchema.mainEntity.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <h4 className="mt-0 font-bold text-slate-900 dark:text-white">{item.name}</h4>
              <p className="mb-0 text-slate-600 dark:text-slate-400 text-sm">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800">
        <h3 className="text-2xl font-bold mb-6">Related Banking Infrastructure Guides</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link to="/regional-banks/first-california-federal-cu" className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100">
            <span className="font-bold block">First California FCU Data</span>
            <span className="text-xs text-slate-500">Verified regional routing and ABA transit data.</span>
          </Link>
          <Link to="/regional-banks/suncoast-credit-union" className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100">
            <span className="font-bold block">Suncoast Credit Union Guide</span>
            <span className="text-xs text-slate-500">How to handle Florida-specific ACH and Wire routing.</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
