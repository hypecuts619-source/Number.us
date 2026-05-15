import React from 'react';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <SEO 
        title="Privacy Policy | USRoutingNumber.com"
        description="Privacy Policy for USRoutingNumber.com."
        canonicalUrl="/privacy-policy"
      />

      <h1 className="text-3xl font-black mb-8 text-[#1e3a5f] dark:text-slate-100">Privacy Policy</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300">
        <p>Last Updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
        <p>USRoutingNumber.com operates as a purely informational directory. We do not require you to create an account, log in, or provide personal financial information (such as your bank account number) to use our search tools.</p>
        
        <p>When you visit the Website, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Website, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Website, and information about how you interact with the Website.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. Local Storage and Saved Data</h2>
        <p>To improve your user experience, we use your browser's local storage (e.g., localStorage) to save your "Favorite" banks and "Recently Viewed" routing numbers. This information remains solely on your device. We do not transmit, sync, or store this personalized data on our servers.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. Personally Identifiable Information (PII)</h2>
        <p>We <strong>do not</strong> request, collect, process, or store Personally Identifiable Information (PII) such as personal account numbers, social security numbers, passwords, or full identity profiles. Our contact forms collect only your name and email for the sole purpose of responding to your inquiry.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">4. Cookies and Advertising</h2>
        <p>We use "cookies" to track activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.</p>
        
        <p><strong>Google AdSense:</strong> We use Google AdSense to serve advertisements on our Website. Google, as a third-party vendor, uses cookies (such as the DART cookie) to serve ads based on your visit to our site and other sites on the Internet. You may opt out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">5. California Consumer Privacy Act (CCPA)</h2>
        <p>If you are a California resident, you have the right to request that we disclose what personal information we collect, use, disclose, and sell. We do not sell your personal information. Under the CCPA, you have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Know what personal data is being collected about you.</li>
          <li>Know whether your personal data is sold or disclosed and to whom.</li>
          <li>Say no to the sale of personal data.</li>
          <li>Access your personal data.</li>
          <li>Request we delete any personal information about you.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">6. Use of Data</h2>
        <p>USRoutingNumber.com uses the collected data for various purposes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and maintain the Service</li>
          <li>To monitor the usage of the Service</li>
          <li>To detect, prevent and address technical issues</li>
          <li>To improve our Website's design and functionality based on user behavior</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">4. Analytics and Third-Party Services</h2>
        <p>We may use third-party Service Providers, such as Google Analytics, to monitor and analyze the use of our Service. These third parties have access to your personal data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">5. Security of Data</h2>
        <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">6. Links to Other Sites</h2>
        <p>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">7. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">8. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us.</p>
      </div>
    </div>
  );
}
