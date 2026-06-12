import React from 'react';

interface DynamicSEOProseProps {
  bankName: string;
  routingNumber: string;
  cityName?: string;
  stateName?: string;
  isCreditUnion?: boolean;
}

export default function DynamicSEOProse({ 
  bankName, 
  routingNumber, 
  cityName, 
  stateName,
  isCreditUnion 
}: DynamicSEOProseProps) {
  const institutionType = isCreditUnion ? 'Credit Union' : 'Bank';
  const entityIdType = isCreditUnion ? 'NCUA Charter ID' : 'FDIC Certificate';
  
  // Create a highly authoritative, conversational, B2B-focused explanation
  return (
    <article className="mt-12 w-full prose prose-slate dark:prose-invert max-w-none">
      <section className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
          How do I process an ACH transfer to the {bankName} {cityName ? `branch in ${cityName}, ${stateName}` : 'headquarters'}?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
          To successfully initialize an electronic funds transfer (EFT) or automated clearing house (ACH) batch to {bankName}, Payroll and Accounts Payable administrators must utilize the verified nine-digit routing number: <strong className="text-slate-900 dark:text-white bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">{routingNumber}</strong>. 
          This structural identifier ensures your corporate disbursements clear the Federal Reserve network synchronously and reach the intended beneficiary accounts without triggering R03 or R04 network returns.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The Modulus 10 checksum algorithm validates this routing string. When setting up vendor direct deposits or B2B wire transfers {cityName && stateName ? `linked to the ${cityName}, ${stateName} operations center` : ''}, do not use internal deposit slip codes. Always secure the formalized ACH endpoints confirmed directly by the financial institution.
        </p>
      </section>

      <section className="mb-10 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Institutional Routing Architecture & Network Reliability
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Enterprise capitalization events require high-reliability destinations. {bankName} operates as a fully regulated United States {institutionType.toLowerCase()}. The routing sequence <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{routingNumber}</span> designates the specific regional Federal Reserve processing node required for localized settlement.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm border-collapse m-0">
            <caption className="sr-only">Technical settlement specifications for {bankName}</caption>
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800">
                <th className="p-4 rounded-tl-xl border-b border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white">Validation Parameter</th>
                <th className="p-4 rounded-tr-xl border-b border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white">Assigned Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="p-4 font-medium text-slate-700 dark:text-slate-300 w-1/3">Target Institution</td>
                <td className="p-4 text-slate-900 dark:text-white font-semibold">{bankName}</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-700 dark:text-slate-300">Nine-Digit Transit Route</td>
                <td className="p-4"><code className="font-mono text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{routingNumber}</code></td>
              </tr>
              {cityName && stateName && (
                <tr>
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-300">Target Region</td>
                  <td className="p-4 text-slate-900 dark:text-white">{cityName}, {stateName}</td>
                </tr>
              )}
              <tr>
                <td className="p-4 font-medium text-slate-700 dark:text-slate-300">Institution Classification</td>
                <td className="p-4 text-slate-900 dark:text-white">{institutionType}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
