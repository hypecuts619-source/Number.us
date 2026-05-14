import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import glossaryData from '../data/glossaryData.json';

const articles = [
  {
    title: "Routing Number Changes in 2026: What You Need to Know",
    description: "The 2026 banking landscape is seeing routing numbers consolidate due to mergers. Learn what you must do to avoid failed payments.",
    path: "/routing-number-changes-2026",
    date: "May 8, 2026",
    readTime: "7 min read",
    category: "Updates",
    slug: "routing-number-changes-2026"
  },
  {
    title: "Routing Number vs Account Number: What's the Difference?",
    description: "Understand the key differences between bank routing numbers and account numbers, when to use each, and how to keep them safe.",
    path: "/routing-number-vs-account-number",
    date: "May 1, 2026",
    readTime: "4 min read",
    category: "Banking Basics",
    slug: "routing-number-vs-account-number"
  },
  {
    title: "How to Find a Routing Number Without a Checkbook",
    description: "Learn how to instantly locate your 9-digit bank routing number without checks, using your mobile banking app, browser, or customer service.",
    path: "/how-to-find-routing-number",
    date: "May 1, 2026",
    readTime: "3 min read",
    category: "Guides",
    slug: "how-to-find-routing-number"
  },
  {
    title: "Where is the Routing Number on a Check?",
    description: "A visual guide to identifying the correct bank routing number on physical checks, checkbooks, and deposit slips.",
    path: "/find-routing-number-on-check",
    date: "May 3, 2026",
    readTime: "2 min read",
    category: "Quick Answers",
    slug: "find-routing-number-on-check"
  },
  {
    title: "What is an ABA Routing Number? The American Banking Association Standard",
    description: "Deep dive into the history, format, and purpose of the ABA routing transit number utilized in the US banking system.",
    path: "/aba-routing-number",
    date: "May 3, 2026",
    readTime: "5 min read",
    category: "Deep Dives",
    slug: "what-is-aba-routing-number"
  },
  {
    title: "How to Find Your Direct Deposit Routing Number",
    description: "Setting up a direct deposit for your paycheck? Find out which routing number your HR department needs to successfully process your salary.",
    path: "/direct-deposit-routing-number",
    date: "May 5, 2026",
    readTime: "3 min read",
    category: "Direct Deposit",
    slug: "direct-deposit-routing-number"
  },
  {
    title: "Wire Transfers 101: How to Wire Money Domestically",
    description: "Step-by-step instructions on sending a domestic wire transfer, including the fees, timeframes, and security precautions.",
    path: "/how-to-wire-money",
    date: "May 5, 2026",
    readTime: "6 min read",
    category: "Transfers",
    slug: "how-to-wire-money"
  },
  {
    title: "What Routing Number to Use For International Wire to US",
    description: "Sending money abroad to the US? Learn the difference between SWIFT/BIC codes, IBAN numbers, and when US routing numbers are appropriate.",
    path: "/international-wire-guide",
    date: "May 7, 2026",
    readTime: "5 min read",
    category: "Transfers",
    slug: "international-wire-transfers"
  },
  {
    title: "What is the Zelle Routing Number?",
    description: "Looking for a Zelle routing number? Learn why Zelle doesn't have an official routing number, and how it connects to your underlying bank.",
    path: "/zelle-routing-number",
    date: "May 7, 2026",
    readTime: "4 min read",
    category: "Transfers",
    slug: "zelle-routing-number"
  },
  {
    title: "Routing Number Validator tool",
    description: "Verify any 9-digit US routing number against the official ABA module 10 checksum algorithm and check if it's currently active.",
    path: "/routing-number-validator",
    date: "May 2, 2026",
    readTime: "Tool",
    category: "Tools",
    slug: "routing-number-validator"
  },
  {
    title: "ACH vs. Wire Transfers: Which Routing Number Should You Use?",
    description: "Understanding the critical differences between ACH and Wire transfer routing numbers and when to use each for maximum speed.",
    path: "/blog/ach-vs-wire-routing-guide",
    date: "May 10, 2026",
    readTime: "9 min read",
    category: "Transfers",
    slug: "ach-vs-wire-routing"
  },
  {
    title: "How to Protect Your Bank Details: A Guide to Secure Wire Transfers",
    description: "Expert tips on securing your routing and account numbers to prevent wire transfer fraud and protect your privacy.",
    path: "/blog/secure-wire-transfer-guide",
    date: "May 10, 2026",
    readTime: "11 min read",
    category: "Security",
    slug: "secure-wire-transfers"
  },
  {
    title: "Common Reasons Your Routing Number is Being Rejected and How to Fix It",
    description: "Troubleshoot common routing number rejection errors for ACH and Wires with these 2026 technical fixes.",
    path: "/blog/rejected-routing-number-troubleshooting",
    date: "May 10, 2026",
    readTime: "10 min read",
    category: "Troubleshooting",
    slug: "rejected-routing-fixes"
  },
  {
    title: "The Ultimate Guide to ACH Transfers: Speed, Costs, and Mechanics",
    description: "Everything you need to know about navigating the Automated Clearing House network in 2026. Avoid fees and delays.",
    path: "/blog/ultimate-guide-to-ach-transfers",
    date: "May 14, 2026",
    readTime: "12 min read",
    category: "Transfers",
    slug: "ultimate-guide-to-ach-transfers"
  },
  {
    title: "Wire Transfers Demystified: Secure High-Volume Financial Movements",
    description: "A comprehensive break-down of the Fedwire system, when to use it, and how to verify recipient routing data.",
    path: "/blog/wire-transfers-demystified",
    date: "May 14, 2026",
    readTime: "12 min read",
    category: "Transfers",
    slug: "wire-transfers-demystified"
  },
  {
    title: "How Bank Mergers Impact Your Routing Numbers",
    description: "Mergers and acquisitions force infrastructure changes. Learn how to protect your auto-pays and direct deposits during transitional periods.",
    path: "/blog/bank-mergers-routing-numbers",
    date: "May 14, 2026",
    readTime: "15 min read",
    category: "Updates",
    slug: "bank-mergers-routing-numbers"
  },
  {
    title: "The Future of Banking: FedNow and Instant Payments",
    description: "The US Federal Reserve has modernized electronic transfers. Understand how FedNow compares to legacy ACH and Wire networks.",
    path: "/blog/future-instant-payments-fednow",
    date: "May 14, 2026",
    readTime: "11 min read",
    category: "Deep Dives",
    slug: "future-instant-payments-fednow"
  },
  {
    title: "Routing Number Security and Phishing Prevention",
    description: "A deep dive into how financial institutions and modern networks secure electronic funds and combat systemic fraud.",
    path: "/blog/routing-number-security",
    date: "May 14, 2026",
    readTime: "13 min read",
    category: "Security",
    slug: "routing-number-security"
  },
  {
    title: "The Anatomy of a Bank Check: MICR to Routing Verification",
    description: "Explore the historical development and modern application of check routing, MICR lines, and ABA standard transit codes.",
    path: "/blog/anatomy-of-a-check",
    date: "May 14, 2026",
    readTime: "10 min read",
    category: "Guides",
    slug: "anatomy-of-a-check"
  },
  {
    title: "International SWIFT vs. Domestic ABA Routing",
    description: "Sending money abroad? Learn the structural differences between SWIFT/BIC codes and domestic routing transit numbers.",
    path: "/blog/international-vs-domestic-routing",
    date: "May 14, 2026",
    readTime: "12 min read",
    category: "Transfers",
    slug: "international-vs-domestic-routing"
  },
  {
    title: "Understanding the Modulus 10 ABA Routing Algorithm",
    description: "The mathematics behind American banking. Discover how check digits prevent massive amounts of failed transactions instantly.",
    path: "/blog/understanding-modulus-10-algorithm",
    date: "May 14, 2026",
    readTime: "14 min read",
    category: "Deep Dives",
    slug: "understanding-modulus-10-algorithm"
  }
];

export default function Blog() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <SEO 
        title="Guides & Explanations: US Bank Routing Numbers"
        description="Comprehensive articles to help you find and understand your bank routing numbers, account numbers, and wire transfers."
        canonicalUrl="/blog"
      />

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-[#1e3a5f] dark:text-white mb-6 tracking-tight">
          Financial Routing Guides & Articles
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Expert guides on ACH transfers, direct deposits, domestic wires, and international money movement. Ensure your funds end up exactly where they belong.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, idx) => (
          <Link 
            to={article.path} 
            key={idx}
            className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-8 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {article.title}
              </h2>
              
              <p className="text-slate-600 dark:text-slate-400 mb-6 flex-1">
                {article.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> 
                  <span className="font-medium">{article.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
                  Read <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Banking & Wire Transfer Glossary</h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb- aggregation-8 max-w-2xl">
          Quickly understand essential terms in the US banking infrastructure. Each definition is verified for 2026 standards.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {glossaryData.map((item) => (
            <Link 
              key={item.slug} 
              to={`/glossary/${item.slug}`}
              className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-medium text-sm text-slate-700 dark:text-slate-300"
            >
              {item.term.split('(')[0].trim()}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mt-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 md:p-12 text-center border border-slate-200 dark:border-slate-700/50">
         <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-6" />
         <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Need help with a specific bank?</h2>
         <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
           We maintain the most accurate directory of ABA routing numbers. You can find any bank routing code using our extensive lookup tool.
         </p>
         <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
           Search Bank Directory
         </Link>
      </div>
    </div>
  );
}
