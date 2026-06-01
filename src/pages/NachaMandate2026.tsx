import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, ShieldCheck, AlertCircle, CheckCircle, FileText, Calendar, User, Search, ChevronDown, ChevronUp } from 'lucide-react';
import ArticleAuthorMeta from '../components/ArticleAuthorMeta';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';
import LookupCTA from '../components/LookupCTA';

export default function NachaMandate2026() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Is our bank responsible for fraud if we don't verify the routing number?",
      a: "Legally, no. If you process fraudulent ACH payments without verifying routing numbers, your company bears the financial loss. Banks are required to give customers reasonable time to dispute fraudulent transfers, but if you (the originator) can't demonstrate that you verified the routing number and followed reasonable fraud prevention procedures, you're liable. The Nacha mandate effectively makes routing number verification a legal necessity, not a suggestion."
    },
    {
      q: "How long does it take to verify a routing number?",
      a: "Using an automated validator like ours: Less than 10 seconds. Enter the number, get instant results. No manual work required. There's no reason for skipping this step."
    },
    {
      q: "Can fraudsters use real routing numbers from other banks?",
      a: "Yes, and this is a common tactic. A fraudster might use a real routing number from Bank A while claiming the payment is going to Bank B. That's why cross-referencing the bank name with the routing number is critical. Our validator shows which bank the routing number actually belongs to, making this mismatch instantly obvious."
    },
    {
      q: "Do I need to verify routing numbers for internal transfers between our company's accounts?",
      a: "No, internal transfers between accounts your company owns don't require the same level of verification. However, if employees are requesting changes to THEIR account information (like a direct deposit), you should still verify. Hackers frequently target internal accounts to redirect payroll."
    },
    {
      q: "What if the routing number is valid but the payment instruction is still fraudulent?",
      a: "This is where your multi-factor verification comes in. A valid routing number is necessary but not sufficient for fraud prevention. You still need to call the employee/vendor directly (independent verification), check against your verified database, and look for red flags in the request itself."
    },
    {
      q: "Does the Nacha mandate apply to small businesses or just large corporations?",
      a: "The mandate applies to all ACH originators, but compliance requirements scale with company size. A 50-person company might have simpler procedures than a Fortune 500 company. However, the core requirement (verify routing numbers for high-risk transactions) applies to everyone."
    },
    {
      q: "How often should we verify our vendor routing numbers?",
      a: "At least annually for active vendors. More frequently if the vendor changes banks, there's a long gap since the last payment, you receive an email requesting a routing number change, or there's any indication of account compromise."
    },
    {
      q: "Can we rely on email confirmations from vendors for routing number changes?",
      a: "No. Email can be spoofed. A sophisticated fraudster can make an email look exactly like it came from a vendor's domain. Always verify through independent channels: call the vendor using a phone number from your records, check the vendor's official website, and use your verified vendor database."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 w-full">
      <SEO 
        title="The June 2026 Nacha Mandate: Why Verifying Routing Numbers Is Critical"
        description="Learn why the June 2026 Nacha ACH fraud prevention mandate matters. Discover how to verify routing numbers and protect against BEC scams, payroll fraud, and credit-push attacks."
        canonicalUrl="/blog/nacha-ach-fraud-prevention-mandate-2026"
        type="article"
        datePublished="2026-06-01T08:00:00Z"
        dateModified="2026-06-01T08:00:00Z"
        authorName="Stephen Sebastian"
      >
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </SEO>

      {/* Hero Header */}
      <div className="mb-10 lg:mb-14 not-prose">
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium mb-4">
          <span className="bg-[#1e3a5f]/10 dark:bg-[#1e3a5f]/40 text-[#1e3a5f] dark:text-[#6ba4e8] px-3 py-1 rounded-full whitespace-nowrap font-bold">
            Compliance &amp; Security
          </span>
          <div className="flex items-center gap-1.5 whitespace-nowrap"><Clock className="w-4 h-4"/> June 1, 2026</div>
          <span className="whitespace-nowrap">11 min read</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
          The June 2026 Nacha Mandate: Why Verifying Routing Numbers Is Your Best Defense Against ACH Fraud
        </h1>

        <ArticleAuthorMeta 
          date="June 1, 2026" 
          readTime="11 min read" 
          author="Stephen Sebastian, Head of Marketing &amp; Product" 
          reviewer="Financial Security Board"
        />
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mt-6 leading-relaxed border-l-4 border-blue-500 pl-4 py-1">
          Learn why the June 2026 Nacha ACH fraud prevention mandate matters. Discover how to verify routing numbers and protect against BEC scams, payroll fraud, and credit-push attacks.
        </p>
      </div>

      {/* Global Ad Slot */}
      <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="nacha-hero" />
      </div>

      {/* Custom HTML/CSS Social Preview Infographic Widget */}
      <div className="mb-12 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-slate-700/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-md">
            <span className="text-xs font-black tracking-widest text-blue-400 uppercase bg-blue-500/15 px-3 py-1 rounded-full">
              June 2026 Nacha Mandate
            </span>
            <h3 className="text-2xl font-black mt-4 tracking-tight leading-snug">
              Is Your Business Compliant With Risk-Based Monitoring?
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              As of June 19, 2026, companies are strictly required to protect against BEC, payroll diversion, and fraudulent payment instructions.
            </p>
          </div>
          <div className="bg-slate-800/80 dark:bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 text-center shadow-lg min-w-[200px] flex-shrink-0 flex flex-col justify-center">
            <span className="text-5xl font-black text-rose-500 tracking-tight">86%</span>
            <span className="text-sm font-bold text-slate-300 mt-2">of BEC Losses</span>
            <span className="text-xs text-slate-400 uppercase tracking-wider mt-1">Move via Wire / ACH</span>
          </div>
        </div>
      </div>

      {/* Main Post Body */}
      <div className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none">
        
        <h2>The ACH Fraud Crisis Is Getting Worse — And Nacha Is Forcing Action</h2>
        <p>It's 2:47 PM on a Friday. Your HR director opens an email from what looks like your CEO:</p>
        
        <blockquote className="bg-slate-50 dark:bg-slate-900 border-l-4 border-red-500 p-4 rounded-r-xl italic my-6 text-slate-700 dark:text-slate-300">
          "Hi [Name], I need you to update my direct deposit routing number immediately. I'm switching to a new bank account. The routing number is [FRAUDULENT ACCOUNT]. Thanks!"
        </blockquote>

        <p>Your HR team, busy with end-of-week tasks, doesn't verify the email. They don't check the sender's domain carefully. Within minutes, they've updated the payroll system with a fake routing number.</p>
        <p>By Monday, $250,000 in payroll has been sent to a criminal's account. It's gone. Unrecoverable.</p>
        <p><strong>This scenario is no longer hypothetical.</strong> It's happening to companies every single day.</p>
        <p>In 2025, Business Email Compromise (BEC) scams cost American businesses $3.1 billion. And here's the terrifying part: <strong>86% of verified BEC losses now move via wire transfer or ACH payments</strong>—often through fraudulent routing numbers.</p>
        <p>But here's the good news: As of <strong>June 19, 2026</strong>, Nacha (the governing body of the U.S. ACH payment network) is enforcing new rules that make routing number verification mandatory for risk-based fraud monitoring. And if you're not ready, you could face significant compliance penalties.</p>
        <p>This guide explains exactly what the June 2026 Nacha mandate means, how ACH fraud works, and how to verify routing numbers to stop fraudsters in their tracks.</p>

        <hr className="border-slate-200 dark:border-slate-800 my-10" />

        <h2>What Is Nacha? And Why Should You Care About Their June 2026 Rules?</h2>
        <p><strong>Nacha</strong> is the National Automated Clearing House Association. They're the governing body that oversees the ACH network—the system used for direct deposits, bill payments, payroll transfers, and virtually every electronic payment between U.S. bank accounts.</p>
        <p>In other words: <strong>If you send or receive money via ACH in America, Nacha's rules apply to you.</strong></p>
        <p>Every year, Nacha updates ACH Operating Rules to address emerging security threats. In 2026, they're making fraud prevention an absolute priority.</p>
        <p>Here's why: According to the FBI Internet Crime Complaint Center (IC3), BEC scams targeting payroll and accounts payable departments have exploded. Criminals have figured out that Business Email Compromise is easier (and more profitable) than ransomware. And they've discovered that ACH payments and wire transfers via fraudulent routing numbers are nearly impossible to reverse.</p>

        <div className="my-8 bg-blue-50/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-blue-100 dark:border-slate-800">
          <h4 className="font-bold text-[#1e3a5f] dark:text-blue-400 flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-blue-500" /> The June 2026 Nacha Mandate changes that by requiring:
          </h4>
          <ul className="space-y-3 pl-0 list-none">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>All ACH originators (businesses, payroll processors, accounts payable teams) to implement <strong>risk-based monitoring</strong></span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Enhanced verification of payment instructions, especially for modified direct deposit accounts</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Routine validation of routing numbers against legitimate financial institution databases</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Documented procedures for confirming high-risk ACH payments</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Employee training on BEC and payroll diversion fraud indicators</span>
            </li>
          </ul>
        </div>

        <p className="font-semibold text-slate-800 dark:text-slate-200">
          In plain English: You must verify routing numbers before processing ACH payments. Full stop.
        </p>

        <hr className="border-slate-200 dark:border-slate-800 my-10" />

        <h2>How ACH Fraud Works: The Attack Vectors You Need to Stop</h2>
        <p>Understanding how fraudsters exploit ACH payments is the first step to defending against them. Here are the four most common ACH fraud schemes targeting businesses in 2026:</p>

        <h3>1. Payroll Diversion Fraud (The Most Common Attack)</h3>
        <p><strong>The Attack:</strong> A hacker gains access to your company email system (through phishing, credential stuffing, or a data breach). They impersonate your CEO, CFO, or HR director and email the payroll department with an urgent request:</p>
        <blockquote className="bg-slate-50 dark:bg-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl italic my-4 text-slate-700 dark:text-slate-300">
          "Update my direct deposit to this routing number: <strong>071000505</strong>. My bank merged with another institution. Please process ASAP."
        </blockquote>
        <p>The number looks legitimate (9 digits, proper format). The email looks legitimate (same domain, right signature). Your payroll team, trusting internal email, updates the system without verification.</p>
        <p>Next payday, half your executive payroll goes to a fraud ring's account.</p>
        <p><strong>The Cost:</strong> Average loss per incident: $50,000-$500,000 per executive (some cases have exceeded $1M+)</p>
        <p><strong>The Defense:</strong> Verify the routing number immediately. Is it actually associated with a legitimate bank? Does it match the company's actual banking records? Our <Link to="/routing-number-validator" className="text-blue-600 dark:text-blue-400 hover:underline">routing number validator</Link> catches format errors and active status within seconds.</p>

        <h3>2. Vendor Payment Diversion (Targeting Accounts Payable)</h3>
        <p><strong>The Attack:</strong> Fraudsters compromise an email account or spoof the email address of your company's regular vendor (a software company, contractor, supplier, or utilities provider).</p>
        <p>They send an "urgent notification":</p>
        <blockquote className="bg-slate-50 dark:bg-slate-900 border-l-4 border-amber-500 p-4 rounded-r-xl italic my-4 text-slate-700 dark:text-slate-300">
          "Due to a banking system upgrade, we need you to update our payment information. Please send all future invoices to this bank account (routing number: <strong>021000021</strong>). Confirm receipt immediately."
        </blockquote>
        <p>Your AP team, processing hundreds of payments monthly, updates the vendor record without calling the vendor to confirm. Future payments go to criminals.</p>
        <p><strong>The Cost:</strong> Average loss: $20,000-$100,000 per incident (often recurring monthly until discovered)</p>
        <p><strong>The Defense:</strong> Always verify routing numbers through independent channels. Don't rely solely on email. Call the vendor directly using a phone number you already have on file—not one provided in the suspicious email. Use our <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">routing lookup tool</Link> to cross-reference the bank.</p>

        <h3>3. Credit-Push Fraud (The Newest Threat)</h3>
        <p><strong>The Attack:</strong> A scammer sets up a fake bank account in a mule account (often at a regional credit union or online bank). They then submit ACH payment instructions to your company, claiming to be a vendor, contractor, or service provider.</p>
        <p>They include a legitimate-looking bank account number and routing number—but the account doesn't actually belong to them. They're exploiting your company's ACH processing to move money from legitimate business accounts into their control.</p>
        <p><strong>The Cost:</strong> $10,000-$500,000 (losses often happen in bulk before detection)</p>
        <p><strong>The Defense:</strong> Verify routing numbers against the official ACH database. Check that the routing number legitimately belongs to the claimed bank AND is authorized for ACH transactions.</p>

        <h3>4. Direct Deposit Fraud (Targeting Remote Workers and Contractors)</h3>
        <p><strong>The Attack:</strong> Hackers compromise contractor email accounts or the accounts of remote employees. They request routing number updates, claiming to have switched banks. By the time the contractor realizes they're missing a paycheck, weeks or months of payments have gone to criminals.</p>
        <p><strong>The Cost:</strong> $5,000-$50,000 per contractor (less visible because remote workers often discover late)</p>
        <p><strong>The Defense:</strong> Implement verification procedures for ANY direct deposit changes, especially from remote workers, cross-referencing against bank listings via our <Link to="/how-to-find-routing-number" className="text-blue-600 dark:text-blue-400 hover:underline">how to find routing number guide</Link>.</p>

        <hr className="border-slate-200 dark:border-slate-800 my-10" />

        <h2>Why Nacha's June 2026 Mandate Is A Game-Changer</h2>
        <p>For the last decade, ACH fraud has been technically possible but enforcement was spotty. Companies <em>could</em> verify routing numbers, but many didn't. The industry treated ACH as "safe" because it's older, more established, and—in theory—reversible.</p>
        <p><strong>That ends in June 2026.</strong></p>
        <p>Here's what changes:</p>

        <h3>Mandatory Risk-Based Monitoring</h3>
        <p>All ACH originators must implement documented procedures for identifying high-risk transactions. "High-risk" includes direct deposit changes, payments to new vendors, unusually large ACH amounts, or payments outside normal geographical patterns.</p>

        <h3>Verification Requirements</h3>
        <p>When a high-risk transaction is flagged, you MUST verify routing number legitimacy, confirm the account holder matches the claimed identity, and verify that authorization occurred correctly.</p>

        <h3>Penalties for Non-Compliance</h3>
        <p>ACH member banks face penalties from Nacha for non-compliant originators. Those penalties trickle down in the form of increased fees, account restrictions, and risk of having your ACH privileges suspended or completely revoked.</p>

        <hr className="border-slate-200 dark:border-slate-800 my-10" />

        <h2>The Routing Number: Your First Line of Defense</h2>
        <p>The easiest way to stop ACH fraud at the source is to verify the routing number before processing the payment. By confirming routing numbers, you eliminate mock routing transit numbers and mismatched bank codes instantly.</p>
        <p>A routing number (also called an ABA routing number or RTN) is a 9-digit code that uniquely identifies a U.S. financial institution. The digits encode important routing symbols and bank identifiers that culminate in a final check digit based on the classic Modulus 10 algorithm. Learn more about how the routing and account number interact in our comprehensive guide to <Link to="/routing-number-vs-account-number" className="text-blue-600 dark:text-blue-400 hover:underline">Routing Numbers vs Account Numbers</Link>.</p>

        <div className="my-8 bg-[#1e3a5f]/5 p-6 rounded-2xl border border-[#1e3a5f]/10">
          <h4 className="font-bold text-[#1e3a5f] mt-0 mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" /> Crucial Routing Number Verification Checklist:
          </h4>
          <ol className="space-y-2.5 my-0 pl-5">
            <li><strong>Check the Format:</strong> Verify it is exactly 9 digits and completely numeric.</li>
            <li><strong>Verify Against Registry:</strong> Run the digits against the official active Federal Reserve database via our <Link to="/routing-number-validator" className="text-blue-600 dark:text-blue-400 hover:underline">routing number validator</Link>.</li>
            <li><strong>Cross-Reference the Bank:</strong> Ensure the bank name returned by the directory matches the client's or employee's claim.</li>
            <li><strong>Confirm Routing Purpose:</strong> Ensure the code is authorized for ACH, and not strictly reserved for Fedwire or paper clearing. Compare these differences in our detailed <Link to="/blog/ach-vs-wire-routing-guide" className="text-blue-600 dark:text-blue-400 hover:underline">ACH vs Wire routing guide</Link>.</li>
          </ol>
        </div>

        <hr className="border-slate-200 dark:border-slate-800 my-10" />

        <h2>Best Practices: Beyond Routing Number Verification</h2>
        <p>Verifying routing numbers is the essential first step, but the Nacha mandate requires a comprehensive fraud prevention strategy.</p>
        <ul>
          <li><strong>Implement Multi-Factor Verification for ACH Changes:</strong> Always confirm deposit alterations via telephone using pre-existing directory records.</li>
          <li><strong>Train Employees regularly on BEC and Payroll Fraud:</strong> HR and accounts payable processors should receive annual training on social engineering and ACH security.</li>
          <li><strong>Establish a Verified Vendor Database:</strong> Track active vendor routing transits, keeping an audited ledger.</li>
        </ul>

      </div>

      {/* Interactive Accordion FAQ Section */}
      <div className="mt-16 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white my-0">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-slate-200 dark:border-slate-800 pb-4 last:border-b-0 last:pb-0"
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center text-left py-3 font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors gap-4"
              >
                <span>{faq.q}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              
              {openFaq === index && (
                <div className="mt-2 text-slate-600 dark:text-slate-400 text-base leading-relaxed animate-fade-in pl-1">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tools CTA Block */}
      <div className="mt-16 bg-gradient-to-br from-[#1e3a5f] to-[#12253f] text-white rounded-3xl p-8 border border-[#1e3a5f] shadow-xl">
        <h3 className="font-black text-2xl md:text-3xl text-white mt-0 mb-4 tracking-tight">
          Nacha Compliance Optimization Tools
        </h3>
        <p className="text-slate-300 text-lg mb-6 leading-relaxed">
          Establish an immutable risk management workflow and mathematically validate any American financial institution's routing transits on-demand.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/routing-number-validator" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 px-8 rounded-xl transition-colors text-center inline-block shadow-lg">
            Routing Number Validator
          </Link>
          <Link to="/" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-3.5 px-8 rounded-xl transition-colors text-center inline-block">
            Search 17,000+ Banks Directory
          </Link>
        </div>
      </div>

      {/* Related Guides Footer Section */}
      <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
          Related Compliance &amp; Transfer Guides
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/blog/ach-vs-wire-routing-guide" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-sm hover:shadow-md flex flex-col h-full">
            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
              ACH vs Wire Routing Guide (2026)
            </h4>
            <div className="mt-auto flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 pt-4">
              Read Guide <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          
          <Link to="/routing-number-changes-2026" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-sm hover:shadow-md flex flex-col h-full">
            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
              Routing Number Changes 2026
            </h4>
            <div className="mt-auto flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 pt-4">
              Read Guide <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          
          <Link to="/blog/rejected-routing-number-troubleshooting" className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-sm hover:shadow-md flex flex-col h-full">
            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
              Rejected Routing Rejection &amp; Troubleshooting
            </h4>
            <div className="mt-auto flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 pt-4">
              Read Guide <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
        
        <LookupCTA />
      </div>
    </div>
  );
}
