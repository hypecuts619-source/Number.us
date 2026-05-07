import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

const articles = [
  {
    title: "Routing Number vs Account Number: What's the Difference?",
    description: "Understand the key differences between bank routing numbers and account numbers, when to use each, and how to keep them safe.",
    path: "/routing-number-vs-account-number",
    date: "January 14, 2026",
    readTime: "4 min read",
    category: "Banking Basics",
    slug: "routing-number-vs-account-number"
  },
  {
    title: "How to Find Your Bank Routing Number (4 Easy Ways)",
    description: "Learn how to instantly locate your 9-digit bank routing number using your checks, mobile banking app, browser, or customer service.",
    path: "/how-to-find-routing-number",
    date: "January 28, 2026",
    readTime: "3 min read",
    category: "Guides",
    slug: "how-to-find-routing-number"
  },
  {
    title: "Where is the Routing Number on a Check?",
    description: "A visual guide to identifying the correct bank routing number on physical checks, checkbooks, and deposit slips.",
    path: "/find-routing-number-on-check",
    date: "February 10, 2026",
    readTime: "2 min read",
    category: "Quick Answers",
    slug: "find-routing-number-on-check"
  },
  {
    title: "What is an ABA Routing Number? The American Banking Association Standard",
    description: "Deep dive into the history, format, and purpose of the ABA routing transit number utilized in the US banking system.",
    path: "/aba-routing-number",
    date: "February 22, 2026",
    readTime: "5 min read",
    category: "Deep Dives",
    slug: "what-is-aba-routing-number"
  },
  {
    title: "How to Find Your Direct Deposit Routing Number",
    description: "Setting up a direct deposit for your paycheck? Find out which routing number your HR department needs to successfully process your salary.",
    path: "/direct-deposit-routing-number",
    date: "March 5, 2026",
    readTime: "3 min read",
    category: "Direct Deposit",
    slug: "direct-deposit-routing-number"
  },
  {
    title: "Wire Transfers 101: How to Wire Money Domestically",
    description: "Step-by-step instructions on sending a domestic wire transfer, including the fees, timeframes, and security precautions.",
    path: "/how-to-wire-money",
    date: "March 21, 2026",
    readTime: "6 min read",
    category: "Transfers",
    slug: "how-to-wire-money"
  },
  {
    title: "International Wire Transfers: Do You Need a Routing Number?",
    description: "Sending money abroad? Learn the difference between SWIFT/BIC codes, IBAN numbers, and when US routing numbers are appropriate.",
    path: "/international-wire-guide",
    date: "April 4, 2026",
    readTime: "5 min read",
    category: "Transfers",
    slug: "international-wire-transfers"
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
