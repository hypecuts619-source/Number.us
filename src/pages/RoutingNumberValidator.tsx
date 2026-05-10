import SEO from '../components/SEO';
import AccountValidator from '../components/AccountValidator';
import AdUnit from '../components/AdUnit';

export default function RoutingNumberValidator() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <SEO 
        title="Routing Number Validator 2026 | Check ABA Checksum"
        description="Free online bank routing number validator. Check if a 9-digit ABA routing transit number mathematically meets the checksum, and confirm its Federal Reserve status."
        canonicalUrl="/routing-number-validator"
      />

      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Routing Number Validator
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Verify any 9-digit US routing number against the official ABA module 10 checksum algorithm and check if it's currently listed in our Federal Reserve database directory.
        </p>
      </div>

      <AccountValidator />

      <AdUnit slot="UNIT 1: Below Validator" className="my-12 min-h-[90px] hidden md:block" />

      <div className="prose prose-base md:prose-lg text-slate-600 dark:text-slate-300 max-w-none mt-12 bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How does the validation work?</h2>
        <p>
          Our validator performs two main checks:
        </p>
        <ul className="list-disc pl-6 space-y-4 font-normal mt-4">
          <li><strong>Mathematical Checksum:</strong> Every valid routing number is exactly 9 digits and follows an intricate mathematical formula created by the American Bankers Association (ABA). The tool calculates the <a href="/check-digit-calculator" className="text-blue-600 dark:text-blue-400 hover:underline">Module 10 Checksum</a> to instantly tell you if the sequence is valid or if there's a typo.</li>
          <li><strong>Database Lookup:</strong> Once mathematically validated, we cross-reference the number against the Federal Reserve's active E-Payments directory to verify which bank currently owns the code.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Why is validation important?</h2>
        <p>
          Entering an incorrect routing number can cause severe delays and fees. If you provide an invalid structural number (one that fails the checksum) to your employer or a merchant, their software will typically reject it immediately. 
          However, providing a mathematically valid but <em>wrong</em> routing number (for example, the wire transfer routing number instead of the ACH routing number for your bank) can result in intercepted funds and bank return fees. That's why verifying the number against our Federal Reserve directory is critical before setting up direct deposits.
        </p>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">Common Mistakes: Why a Routing Number Fails</h2>
        <p>
          Getting a "wrong routing number" or "routing number not working" error is a high-anxiety moment. Before panicking, check these common failure modes:
        </p>
        <ul className="list-disc pl-6 space-y-4 font-normal mt-4">
          <li><strong>ACH vs Wire Confusion:</strong> Using an ACH routing number when a wire number is required (or vice versa). E.g., Chase has a universal wire routing number, but dozens of state-specific ACH routing numbers.</li>
          <li><strong>Mistyped Digit & Checksum Mismatch:</strong> A single transposed number guarantees the ABA checksum will fail. For example, typing "021000022" instead of "021000021".</li>
          <li><strong>State-Specific Variations:</strong> Large banks often use different routing numbers depending on the state where you <em>originally opened</em> your account.</li>
          <li><strong>Merger-Related Changes:</strong> When banks merge (e.g., SunTrust and BB&T merging into Truist), old routing numbers are eventually retired. It might mathematically validate, but the transaction will bounce if the bank no longer supports the legacy code.</li>
          <li><strong>Formatting Errors:</strong> Copy-pasting a routing number with spaces or dashes (e.g., "021-000-021") into poorly coded billing software can throw an error. Numbers should always be contiguous.</li>
        </ul>

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
