import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import AccountValidator from '../components/AccountValidator';

export default function RoutingNumberValidator() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <SEO 
        title="ABA Routing Number Validator | Modulo 10 Checksum Calculator"
        description="Instantly verify any 9-digit US bank routing number using our client-side Modulo 10 checksum calculator. 100% secure, private, and fast."
        canonicalUrl="/routing-number-validator"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "ABA Routing Number Validator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires JavaScript",
            "offers": { "@type": "Offer", "price": "0" },
            "featureList": "Offline client-side Modulo 10 verification, Bank identification, Federal Reserve cross-reference"
          })}
        </script>
      </SEO>

      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Free US Bank Routing Number Validator
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Verify any 9-digit US routing number against the official ABA module 10 checksum algorithm and check if it's currently listed in our Federal Reserve database directory.
        </p>
        <div className="mt-6 flex justify-center items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-lg max-w-max mx-auto shadow-sm border border-emerald-100 dark:border-emerald-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m9 12 2 2 4-4"></path></svg>
          Your privacy is guaranteed. This calculation is performed locally in your browser. No data is transmitted to our servers.
        </div>
      </div>

      <AccountValidator />
      
      <div className="prose prose-base md:prose-lg text-slate-600 dark:text-slate-300 max-w-none mt-12 bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How the Modulo 10 Algorithm Works</h2>
        <p>
          Our validator performs a strict mathematical test. Every valid routing number is exactly 9 digits and follows an intricate mathematical formula created by the American Bankers Association (ABA). 
          The algorithm applies a specific weight—3, 7, and 1—to the first eight digits of the routing number. The sums of these weighted products are added together, and the final, ninth digit—the check digit—is mathematically derived to ensure that the total sum is a multiple of 10.
        </p>
        <p>
          When you enter your ABA code into our <strong>Routing Number Validator</strong>, a client-side execution confirms this geometric sequence instantly. If it satisfies the algorithm, our offline processor cross-references a massive directory to return the actual Bank Name, City, and State.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Why Verify Your Transmit Number?</h2>
        <p>
          Entering an incorrect routing number can cause severe delays and fees. If you provide an invalid structural number (one that fails the checksum) to your employer or a merchant, their billing software will reject it. Providing a mathematically valid but <em>wrong</em> routing number (for instance, the wire transfer sequence instead of the ACH equivalent) can result in intercepted funds. 
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">Frequently Asked Questions</h2>
        
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-6 mb-2">How does the Modulo 10 routing number algorithm work?</h3>
        <p>
          The Modulo 10 technique specifically multiplies the first digit by 3, the second by 7, the third by 1, and repeats this sequence for the first 8 numbers. It then adds all the products together. The 9th digit (check digit) must be whatever number makes that total sum perfectly divisible by 10.
        </p>

        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-6 mb-2">Can a valid routing number mathematically belong to a closed bank?</h3>
        <p>
          Yes. Because the Modulo 10 checksum is merely a mathematical verification rule, a routing number from a merged or shuttered bank (like Washington Mutual) will still structurally pass the math test. That is exactly why our validator goes a step further and links the valid 9-digit code with our Federal Reserve dataset to confirm active institutional status.
        </p>

        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-6 mb-2">Is it safe to type my routing number into an online validator?</h3>
        <p>
          Absolutely. Your routing number is public information indicating your bank's digital "address." By utilizing client-side verification directly inside your Chrome or Safari browser window, there are zero server logs created when you use our validation engine. It is mathematically impossible for us to reconstruct your separate Account Number from your ABA code.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <Link to="/routing-number-lookup" className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-5 hover:border-blue-500 transition-all flex items-center justify-between group no-underline">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white m-0 group-hover:text-blue-600 dark:group-hover:text-blue-400">Reverse Lookup Tool</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0 mt-1">Found a number? Look up the bank.</p>
            </div>
            <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
          <Link to="/what-is-a-routing-number" className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-5 hover:border-blue-500 transition-all flex items-center justify-between group no-underline">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white m-0 group-hover:text-blue-600 dark:group-hover:text-blue-400">What is a Routing Number?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 m-0 mt-1">Read our complete guide to ABA codes.</p>
            </div>
            <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
