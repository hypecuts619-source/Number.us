import React from 'react';
import SEO from '../components/SEO';
import EmbedWidget from '../components/EmbedWidget';
import { Mail, Globe, Share2 } from 'lucide-react';

export default function WebmasterTools() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 w-full">
      <SEO 
        title="Webmaster Tools | Free Banking Widgets for Financial Blogs"
        description="Enhance your website with our free routing number checker widgets and APIs. Perfect for financial bloggers, real estate portals, and fintech apps."
        canonicalUrl="/webmaster-tools"
      />

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
          Tools for Webmasters
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          We provide free infrastructure for digital publishers in the financial niche. Build trust with your audience by providing real-time routing verification.
        </p>
      </div>

      <EmbedWidget />

      <div className="mt-24 grid md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Standardized API</h3>
          <p className="text-slate-500 text-sm">
            Need raw data? We offer a CSV export for academic and non-profit research projects using ABA routing data.
          </p>
        </div>
        <div className="space-y-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Backlink Policy</h3>
          <p className="text-slate-500 text-sm">
            Our widgets are free to use. All we ask is that you maintain the attribution link to help us keep our data free for everyone.
          </p>
        </div>
        <div className="space-y-4">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Support & Customization</h3>
          <p className="text-slate-500 text-sm">
            Need a custom theme or size for your widget? Reach out to our tech team for white-labeled solutions.
          </p>
        </div>
      </div>
    </div>
  );
}
