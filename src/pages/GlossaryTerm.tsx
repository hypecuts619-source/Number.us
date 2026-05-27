import React from 'react';
import { useParams, Link } from 'react-router-dom';
import glossaryData from '../data/glossaryData.json';
import SEO from '../components/SEO';
import { ShieldCheck, ArrowLeft, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';

export default function GlossaryTerm() {
  const { slug } = useParams<{ slug: string }>();
  const termData = glossaryData.find(t => t.slug === slug);

  if (!termData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Term Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">The banking term you are looking for does not exist in our directory.</p>
        <Link to="/" className="text-blue-600 hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>
    );
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": termData.faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": termData.faq.answer
      }
    }]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 w-full">
      <SEO 
        title={`${termData.term} - Definition & Banking Glossary`}
        description={`What is ${termData.term}? Read our authoritative 2026 definition, core use cases, and expert FAQ for this essential banking term.`}
        canonicalUrl={`/glossary/${slug}`}
      >
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </SEO>

      <div className="mb-10">
        <Link 
          to="/blog" 
          className="text-sm font-bold text-slate-500 hover:text-blue-600 mb-6 inline-flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Banking Glossary
        </Link>
        
        <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-100 dark:border-emerald-800/50 w-max mb-6">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-widest">Expert Verified Definition</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {termData.term}
        </h1>
      </div>

            <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="glossaryterm-hero" />
      </div>

<div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 mb-10 leading-relaxed italic text-slate-700 dark:text-slate-300">
          <BookOpen className="w-6 h-6 text-blue-600 mb-4" />
          {termData.definition}
        </div>

        <h2 className="flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-blue-600" /> 
          Common Questions About {termData.term.split('(')[0].trim()}
        </h2>
        
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm my-8">
          <h3 className="mt-0 text-xl font-bold text-slate-900 dark:text-white">{termData.faq.question}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-0">{termData.faq.answer}</p>
        </div>

        <div className="bg-blue-600 rounded-3xl p-10 text-white my-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black mb-4 mt-0 text-white">Need to Verify a Routing Number?</h3>
            <p className="text-blue-100 mb-8 text-lg max-w-xl">
              Understanding banking terms is the first step. Ensuring your transaction data is 100% accurate is the next. Use our free validator to check any U.S. ABA routing number.
            </p>
            <Link 
              to="/routing-number-validator" 
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20"
            >
              Open Validator Tool <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800">
        <h3 className="text-xl font-bold mb-6">Explore Related Terms</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {glossaryData.filter(t => t.slug !== slug).slice(0, 6).map(t => (
            <Link 
              key={t.slug} 
              to={`/glossary/${t.slug}`}
              className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
            >
              <span className="font-bold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 transition-colors">{t.term.split('(')[0].trim()}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
