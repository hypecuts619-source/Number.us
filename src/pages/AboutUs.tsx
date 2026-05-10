import SEO from '../components/SEO';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <SEO 
        title="About Us | USRoutingNumber.com"
        description="Learn about USRoutingNumber.com, our mission, and why you can trust our financial routing directory."
        canonicalUrl="/about-us"
      />

      <BreadcrumbNav crumbs={[{ name: 'About Us', url: '/about-us' }]} />

      <article className="prose prose-base md:prose-lg prose-slate dark:prose-invert max-w-none mt-8">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-8">
          About USRoutingNumber.com
        </h1>

        <p className="lead text-xl">
          Welcome to USRoutingNumber.com, the Internet's <strong>fastest and most accessible directory</strong> for verifying United States bank routing transit numbers (RTNs).
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10">Our Mission</h2>
        <p>
          Have you ever tried to set up a direct deposit or wire transfer, only to be confused by multiple routing numbers associated with your bank? You aren't alone. 
          Large financial institutions frequently use different routing numbers depending on the state where you opened your account or the type of transaction (ACH vs. Wire).
        </p>
        <p>
          Our mission is to simplify this process. We provide a clean, ad-light, and mathematically verifiable database of <strong>active routing numbers</strong> to help everyday Americans and international senders navigate the complex US financial system confidently and securely.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10">Why Trust Us? (E-E-A-T)</h2>
        <p>
          In the financial realm, accuracy isn't just a preference—it's a requirement. A single incorrect digit can result in bounced payments, lost wages, and severe banking fees.
        </p>
        <ul>
          <li><strong>Algorithmic Validation:</strong> Every routing number displayed on our site passes the official Modulo 10 Check Digit algorithm. We don't just scrape data; we mathematically verify it.</li>
          <li><strong>Structured Categorization:</strong> We clearly distinguish between standard ACH numbers (used for direct deposits and bill pay) and Wire numbers (used for domestic expedited transfers and international receipts).</li>
          <li><strong>Continuous Monitoring:</strong> We actively track bank mergers and acquisitions, such as the upcoming <Link to="/routing-number-changes-2026">2026 consolidation shifts</Link>, to flag routing codes that are being retired.</li>
        </ul>

        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 my-8">
          <h3 className="font-bold text-xl mt-0 mb-2">Our Editorial & Data Guidelines</h3>
          <p className="mb-4 text-sm leading-relaxed">
            As a publisher of "Your Money or Your Life" (YMYL) content, we hold ourselves to strict editorial standards:
          </p>
          <ul className="mb-0 text-sm space-y-2 pl-4">
            <li><strong>Accuracy First:</strong> All routing data is cross-referenced with public Federal Reserve datasets and official institutional public disclosures.</li>
            <li><strong>Expert Review:</strong> Our financial guides covering wire transfers and routing numbers are reviewed by professionals with banking and fintech experience.</li>
            <li><strong>Clear Disclosures:</strong> We never disguise advertisements or affiliate links as editorial content. Our validation tools perform mathematical client-side formatting checks only, protecting user privacy.</li>
            <li><strong>No Financial Advice:</strong> We provide infrastructure data, not financial or investment advice. Always verify final transfer details with your institution.</li>
          </ul>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 my-8">
          <h3 className="font-bold text-xl mt-0 mb-2">Our Team</h3>
          <p className="mb-0 text-sm">
            USRoutingNumber.com is maintained by a small team of fintech developers and data researchers dedicated to making banking infrastructure transparent. While we are not a financial institution, we pair public Federal Reserve data with intelligent search algorithms to surface the information you need in seconds.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10">Contact Us</h2>
        <p>
          Have a question or noticed a bank merger we haven't updated yet? We'd love to hear from you. 
          Send us an email at <strong>contact@usroutingnumber.com</strong> and our team will investigate and update the directory within 48 hours.
        </p>

        <p className="mt-12 text-sm text-slate-500 italic border-t border-slate-200 dark:border-slate-800 pt-6">
          <strong>Important Disclaimer:</strong> We are an independent informational directory and are not affiliated with the American Bankers Association (ABA), the Federal Reserve, or any official bank or credit union. Our service is provided "as is" and you should always perform a final verification with your specific bank branch before initiating significant financial transfers.
        </p>
      </article>
    </div>
  );
}
