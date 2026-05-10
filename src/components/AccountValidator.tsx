import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BadgeCheck, XCircle, AlertCircle } from 'lucide-react';
import { getRoutingByNumber } from '../lib/getData';

function isValidRoutingNumberChecksum(routingNumber: string): boolean {
  if (!/^\d{9}$/.test(routingNumber)) return false;
  
  const d = routingNumber.split('').map(Number);
  const checksum = (3 * (d[0] + d[3] + d[6]) + 7 * (d[1] + d[4] + d[7]) + 1 * (d[2] + d[5] + d[8])) % 10;
  
  return checksum === 0;
}

export default function AccountValidator() {
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [hasValidated, setHasValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    routingValid: boolean;
    routingFound: boolean;
    accountValid: boolean;
    bankName?: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!routingNumber) return;
    
    setIsLoading(true);
    setHasValidated(true);

    // Simulate a slight network delay for dramatic effect / perceived security checking
    setTimeout(() => {
      const isRoutingValidFormat = isValidRoutingNumberChecksum(routingNumber);
      const isAccountValid = /^\d{4,17}$/.test(accountNumber.trim());
      
      let routingFound = false;
      let bankName = undefined;

      if (isRoutingValidFormat) {
        const data = getRoutingByNumber(routingNumber);
        if (data) {
          routingFound = true;
          bankName = data.bank_name;
        }
      }

      setResult({
        routingValid: isRoutingValidFormat,
        routingFound,
        accountValid: isAccountValid,
        bankName
      });
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 md:my-10">
      <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#1e3a5f] p-5 md:p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Routing Number & Bank Account Lookup</h2>
          <p className="text-blue-100 text-base md:text-lg">Search routing number and bank account validation</p>
          <p className="text-blue-200 text-xs md:text-sm mt-1 mb-6">Lookup example: 021000021 and account 26207729</p>

          <form onSubmit={handleValidate} className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Routing Number"
              className="flex-1 px-4 py-3 md:py-3.5 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 border-2 border-transparent focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              value={routingNumber}
              onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
            />
            <input
              type="text"
              placeholder="Account Number (Optional)"
              className="flex-1 px-4 py-3 md:py-3.5 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 border-2 border-transparent focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 17))}
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 md:py-3.5 px-8 rounded-lg transition-colors whitespace-nowrap shadow-lg shadow-emerald-500/20 text-lg md:text-base"
            >
              {isLoading ? 'Validating...' : 'Validate'}
            </button>
          </form>
        </div>

        {hasValidated && result && !isLoading && (
          <div className="p-5 md:p-8 bg-slate-50 dark:bg-slate-900">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">Validation Results</h3>
            
            <div className="space-y-4">
              {/* Routing Number Result */}
              <div className="flex items-start gap-3">
                {result.routingValid && result.routingFound ? (
                  <BadgeCheck className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-100">
                    Routing Number: {result.routingValid ? (result.routingFound ? 'Valid & Found' : 'Valid Checksum, Not in Database') : 'Invalid Format'}
                  </div>
                  {result.routingFound && result.bankName ? (
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Identified as: <span className="font-bold">{result.bankName}</span>
                      {' • '}
                      <button 
                        onClick={() => navigate(`/lookup/${routingNumber}`)}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View Full Details &rarr;
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {!result.routingValid 
                        ? 'A routing number must be exactly 9 digits and mathematically pass the official ABA module 10 checksum. Please double-check the 9 digits located on the bottom left corner of your check.' 
                        : 'This routing number passes mathematical validation but cannot be verified as an active ACH/Wire endpoint in the official Federal Reserve directory. It may belong to a very new credit union, an internal routing code not used for external transfers, or it may be retired.'}
                    </div>
                  )}
                </div>
              </div>

              {/* Account Number Result (if provided) */}
              {accountNumber && (
                <div className="flex items-start gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  {result.accountValid ? (
                    <BadgeCheck className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-100">
                      Account Number: {result.accountValid ? 'Format Verified' : 'Invalid Format'}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {result.accountValid 
                        ? 'The account number is formatted correctly (valid length and characters).' 
                        : 'Account numbers typically consist of 4 to 17 digits. Please check your entry.'}
                    </div>
                  </div>
                </div>
              )}

              {/* What This Means */}
              {(result.routingValid || result.routingFound) && (
                <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">What this means:</h4>
                  <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    {result.routingValid && result.routingFound && result.bankName ? (
                      <p>This routing number mathematically passes the ABA Checksum and matches a known active entity in our directory: <strong>{result.bankName}</strong>. This confirms the number is well-formatted and assigned to an institution.</p>
                    ) : result.routingValid && !result.routingFound ? (
                      <p>The sequence is a structurally valid 9-digit routing number (mathematical checksum passes), but it was <strong>not found</strong> in our public directory. It may be internal, recently issued, or retired.</p>
                    ) : (
                      <p>The sequence fails the standard ABA module 10 routing number checksum algorithm. This is typically due to a typo or transcription error.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Checksum Math */}
              {routingNumber.length === 9 && !isNaN(Number(routingNumber)) && (
                <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">Mathematical Checksum Calculation:</h4>
                  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-sm font-mono overflow-x-auto whitespace-nowrap text-slate-700 dark:text-slate-300 space-y-2 border border-slate-200 dark:border-slate-700">
                    <div>Formula: <span className="font-bold text-slate-900 dark:text-white">3(d1+d4+d7) + 7(d2+d5+d8) + 1(d3+d6+d9) mod 10 = 0</span></div>
                    <div className="text-slate-500">
                      d = [{routingNumber.split('').join(', ')}]
                    </div>
                    {(() => {
                      const d = routingNumber.split('').map(Number);
                      const sum = (3 * (d[0] + d[3] + d[6])) + (7 * (d[1] + d[4] + d[7])) + (1 * (d[2] + d[5] + d[8]));
                      return (
                        <>
                          <div>
                            {`3(${d[0]}+${d[3]}+${d[6]}) + 7(${d[1]}+${d[4]}+${d[7]}) + 1(${d[2]}+${d[5]}+${d[8]}) = `}
                            <strong className="text-slate-900 dark:text-white">{sum}</strong>
                          </div>
                          <div className={sum % 10 === 0 ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-red-600 dark:text-red-400 font-bold"}>
                            {sum} mod 10 = {sum % 10}
                            <span className="ml-2 font-normal">
                              {sum % 10 === 0 ? "(Valid Checksum)" : "(Invalid Checksum)"}
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg flex gap-3 text-amber-800 dark:text-amber-200/80 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div className="space-y-3">
                <p>
                  <strong>Important Disclaimer:</strong> Even if a routing number is valid and recognized, <strong>ACH routing numbers and Wire routing numbers frequently differ</strong>, even for the exact same banking institution (like Western Union, Chase, or Bank of America).
                </p>
                <p>
                  A mathematically valid checksum does <em>not</em> guarantee the routing number is actively accepting funds or correct for your specific transaction. For your security, always verify the exact routing number needed for your specific transaction type directly with your bank. We do not store your account number.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
