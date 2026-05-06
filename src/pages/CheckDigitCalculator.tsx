import React, { useState } from 'react';
import { Calculator, ArrowRight, RefreshCw } from 'lucide-react';
import SEO from '../components/SEO';
import AdUnit from '../components/AdUnit';

export default function CheckDigitCalculator() {
  const [eightDigits, setEightDigits] = useState('');
  const [result, setResult] = useState<{ digit: number | null, fullNumber: string | null }>({ digit: null, fullNumber: null });
  const [error, setError] = useState('');

  const calculateCheckDigit = (input: string) => {
    if (!/^\d{8}$/.test(input)) {
      setError('Please enter exactly 8 digits.');
      setResult({ digit: null, fullNumber: null });
      return;
    }

    setError('');
    const d = input.split('').map(Number);
    // Routing Number format: XXXXYYYYC
    // d[0] to d[7] are the first 8 digits. C is check digit d[8].
    // 3*(d0 + d3 + d6) + 7*(d1 + d4 + d7) + 1*(d2 + d5 + d8) = 0 mod 10
    
    // We need: (3*(d[0]+d[3]+d[6]) + 7*(d[1]+d[4]+d[7]) + 1*(d[2]+d[5]) + C) % 10 == 0
    const sumWithoutC = 3 * (d[0] + d[3] + d[6]) + 7 * (d[1] + d[4] + d[7]) + 1 * (d[2] + d[5]);
    const remainder = sumWithoutC % 10;
    const c = remainder === 0 ? 0 : 10 - remainder;

    setResult({
      digit: c,
      fullNumber: input + c.toString()
    });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCheckDigit(eightDigits);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <SEO 
        title={`Routing Number Check Digit Calculator (${currentYear}) | USRoutingNumber.com`}
        description="Calculate the 9th check digit of any ABA routing number. Enter the first 8 digits to instantly generate the mathematically valid full routing number."
        canonicalUrl="/check-digit-calculator"
      />

      <div className="mb-12 text-center">
         <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-6">
          <Calculator className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
          Check Digit Calculator
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Every valid US routing number has 9 digits. The last digit is a mathematical checksum based on the first 8. Enter 8 digits below to calculate it.
        </p>
      </div>

      <AdUnit slot="UNIT 1: Below H1, 728x90 leaderboard" className="my-8 min-h-[90px]" />

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border-2 border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto mb-16">
        <form onSubmit={handleCalculate} className="space-y-6">
          <div>
            <label htmlFor="eightDigits" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wider">
              First 8 Digits
            </label>
            <div className="relative">
              <input
                id="eightDigits"
                type="text"
                value={eightDigits}
                onChange={(e) => setEightDigits(e.target.value.replace(/\D/g, '').slice(0, 8))}
                placeholder="e.g. 11100002"
                className="w-full pl-4 pr-12 py-4 text-2xl font-mono bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 tracking-widest"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-2xl">
                _
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Calculate Check Digit <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {result.fullNumber !== null && (
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Calculated Routing Number</h3>
            <div className="flex items-center justify-center gap-1 text-5xl font-black font-mono">
              <span className="text-slate-900 dark:text-white">{eightDigits}</span>
              <span className="text-blue-600 dark:text-blue-400">{result.digit}</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm max-w-md mx-auto">
              The check digit is <strong>{result.digit}</strong>. The modulus 10 checksum algorithm ensures this full 9-digit sequence is mathematically valid.
            </p>
          </div>
        )}
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How is the Check Digit Calculated?</h2>
        <p>
          The American Bankers Association (ABA) uses a "Modulus 10" algorithm to generate the 9th digit of a routing number. This helps computers instantly detect typos (like transposing two numbers) before attempting to transfer money.
        </p>
        <p>The math works by multiplying each digit by a specific weight based on its position:</p>
        <ul className="list-disc pl-5 space-y-2 font-mono bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <li>Digits 1, 4, 7 are multiplied by <strong>3</strong></li>
          <li>Digits 2, 5, 8 are multiplied by <strong>7</strong></li>
          <li>Digits 3, 6, 9 (the check digit) are multiplied by <strong>1</strong></li>
        </ul>
        <p>
          When you add all these products together, the final sum MUST end in zero (i.e., be a multiple of 10). The 9th digit is simply whatever number from 0-9 is needed to make the total sum reach the next multiple of 10.
        </p>
      </div>
    </div>
  );
}
