import React from 'react';
import SEO from '../components/SEO';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <SEO 
        title="Terms of Service | USRoutingNumber.com"
        description="Terms of Service for USRoutingNumber.com."
        canonicalUrl="/terms-of-service"
      />

      <h1 className="text-3xl font-black mb-8 text-[#1e3a5f] dark:text-slate-100">Terms of Service</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300">
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing and using USRoutingNumber.com ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these Terms of Service, please do not use this Website.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. Disclaimer of Warranties and Liability</h2>
        <p>The information provided on USRoutingNumber.com, including but not limited to bank routing numbers, financial data, and written guides, is for general informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information.</p>
        <p><strong>Always verify routing numbers and financial details directly with your financial institution prior to initiating any transactions, such as wire transfers or ACH deposits.</strong></p>
        <p>USRoutingNumber.com and its owners shall not be held liable for any financial losses, delayed transactions, damages, or other consequences arising from the use of, or inability to use, the information provided on this Website.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. Not a Financial Institution</h2>
        <p>USRoutingNumber.com is an independent informational directory. We are not a financial institution, bank, credit union, or payment processor. We are not affiliated with, endorsed by, or partnered with any official government agency, the Federal Reserve, or any of the banks or financial institutions listed on this Website.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">4. Trademarks, Copyrights, and Fair Use</h2>
        <p>All bank names, logos, and trademarks mentioned on this website are the property of their respective owners. Their use on USRoutingNumber.com is strictly for identification and informational purposes under the doctrine of nominative fair use. We do not claim ownership of any third-party trademarks.</p>
        <p><strong>ABA Routing Numbers:</strong> ABA Routing Numbers are established by the American Bankers Association. The routing transit numbers provided on this Website are for informational and educational purposes only. USRoutingNumber.com is not an official registrar and is not affiliated with the ABA, LexisNexis Risk Solutions (the official routing number registrar), or the Federal Reserve.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">5. Use of the Website</h2>
        <p>You agree to use the Website only for lawful purposes. You are prohibited from:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Using the Website in any way that could damage, disable, overburden, or impair our servers or networks.</li>
          <li>Attempting to gain unauthorized access to any portion of the Website or any other systems or networks connected to the Website.</li>
          <li>Using automated scripts, scrapers, or bots to extract data from the Website without our prior written consent.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">6. External Links</h2>
        <p>The Website may contain links to third-party web sites or services that are not owned or controlled by USRoutingNumber.com. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">7. Changes to Terms</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. Your continued use of the Website after any such changes constitutes your acceptance of the new Terms of Service.</p>
        
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">8. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us.</p>
      </div>
    </div>
  );
}
