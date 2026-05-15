import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { getStates } from '../lib/getData';
import { generateSlug } from '../lib/generateSlug';

export default function HTMLSitemap() {
  const states = getStates();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <SEO 
        title="Site Map | USRoutingNumber.com"
        description="Navigate our complete directory of US bank routing numbers organized by state and institution."
        canonicalUrl="/sitemap"
      />

      <BreadcrumbNav crumbs={[{ name: 'Sitemap', url: '/sitemap' }]} />

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-8 mt-8">
        Website Directory Structure
      </h1>

      <div className="grid md:grid-cols-3 gap-12 mt-12">
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b pb-2">Main Navigation</h2>
          <ul className="space-y-3">
            <li><Link to="/" className="text-blue-600 hover:underline">Home Dashboard</Link></li>
            <li><Link to="/banks" className="text-blue-600 hover:underline">All Banks Directory</Link></li>
            <li><Link to="/states" className="text-blue-600 hover:underline">Browse by State</Link></li>
            <li><Link to="/credit-unions" className="text-blue-600 hover:underline">Credit Union Directory</Link></li>
            <li><Link to="/blog" className="text-blue-600 hover:underline">Financial Insights Blog</Link></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b pb-2">Support & Legal</h2>
          <ul className="space-y-3">
            <li><Link to="/about-us" className="text-blue-600 hover:underline">About Our Mission</Link></li>
            <li><Link to="/contact-us" className="text-blue-600 hover:underline">Contact Support</Link></li>
            <li><Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link></li>
            <li><Link to="/webmaster" className="text-blue-600 hover:underline">Webmaster Tools</Link></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b pb-2">Key Financial Guides</h2>
          <ul className="space-y-3">
            <li><Link to="/reports/2026-us-credit-union-report" className="text-blue-700 font-bold hover:underline">2026 Credit Union Report</Link></li>
            <li><Link to="/how-to-find-routing-number" className="text-blue-600 hover:underline">Find Routing on Check</Link></li>
            <li><Link to="/ach-vs-wire-transfers" className="text-blue-600 hover:underline">ACH vs Wire Guide</Link></li>
            <li><Link to="/international-wire-transfer-guide" className="text-blue-600 hover:underline">International Wire Transfers</Link></li>
            <li><Link to="/routing-number-validator" className="text-blue-600 hover:underline">ABA Validator Tool</Link></li>
          </ul>
        </section>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">State Directories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {states.map(state => (
            <Link 
              key={state} 
              to={`/states/${generateSlug(state)}`}
              className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors"
            >
              {state}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
