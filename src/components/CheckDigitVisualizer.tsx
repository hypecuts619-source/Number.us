import React from 'react';
import { Calculator, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  routingNumber: string;
}

export default function CheckDigitVisualizer({ routingNumber }: Props) {
  if (!/^\d{9}$/.test(routingNumber)) return null;

  const digits = routingNumber.split('').map(Number);
  const weights = [3, 7, 1, 3, 7, 1, 3, 7];
  
  // Calculate products for the first 8 digits
  const products = digits.slice(0, 8).map((d, i) => d * weights[i]);
  const sumOfFirst8 = products.reduce((a, b) => a + b, 0);
  
  const checkDigit = digits[8];
  
  // Determine if it's valid
  const isCurrentlyValid = (sumOfFirst8 + checkDigit) % 10 === 0;

  return (
    <div className="bg-slate-900 rounded-3xl p-6 md:p-8 overflow-hidden relative shadow-lg my-8 font-mono">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 text-slate-800 opacity-50">
        <Calculator className="w-64 h-64" />
      </div>

      <div className="relative z-10 text-white">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
          <Calculator className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Mathematical Checksum Breakdown</h2>
        </div>

        <p className="text-slate-400 text-sm md:text-base font-sans mb-8">
          The 9th digit is a mathematical control key. Here is the step-by-step ABA module 10 algorithmic verification showing exactly how <strong className="text-white">{routingNumber}</strong> is {isCurrentlyValid ? 'valid' : 'invalid'}.
        </p>

        {/* Calculation Grid */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-2 min-w-max justify-between md:justify-start">
            {digits.slice(0, 8).map((d, i) => (
              <div key={`col-${i}`} className="flex flex-col items-center gap-3">
                {/* Digit */}
                <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-lg flex items-center justify-center text-xl md:text-2xl font-bold text-white border border-slate-700">
                  {d}
                </div>
                {/* Operator */}
                <div className="text-slate-500 text-sm">x</div>
                {/* Weight */}
                <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-300 text-sm font-bold border border-blue-800/50">
                  {weights[i]}
                </div>
                {/* Equals */}
                <div className="text-slate-500 text-sm">=</div>
                {/* Product */}
                <div className="text-lg font-bold text-slate-300">
                  {products[i]}
                </div>
              </div>
            ))}

            {/* Divider */}
            <div className="flex flex-col items-center justify-center px-4">
              <div className="h-full w-px bg-slate-700"></div>
            </div>

            {/* Check Digit */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-600 rounded-lg flex items-center justify-center text-2xl md:text-3xl font-black text-white shadow-lg border-2 border-indigo-400">
                {checkDigit}
              </div>
              <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mt-1">
                Check<br/>Digit
              </div>
            </div>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-8 bg-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex-1 text-center md:text-left text-slate-300 font-sans">
            <div className="mb-2">
              Sum of products: <span className="text-white font-mono font-bold">{sumOfFirst8}</span>
            </div>
            <div>
              Sum + Check Digit ({checkDigit}): <span className="text-white font-mono font-bold">{sumOfFirst8 + checkDigit}</span>
            </div>
            <div className="mt-2 text-sm text-slate-400">
              ({sumOfFirst8 + checkDigit} ÷ 10 = {(sumOfFirst8 + checkDigit) / 10})
            </div>
          </div>

          <div className="flex-shrink-0">
             {isCurrentlyValid ? (
               <div className="flex items-center gap-2 bg-green-900/30 text-green-400 border border-green-800 px-6 py-3 rounded-xl">
                 <CheckCircle2 className="w-6 h-6" />
                 <span className="font-bold tracking-wide">MULTIPLE OF 10. VALID.</span>
               </div>
             ) : (
               <div className="flex items-center gap-2 bg-red-900/30 text-red-400 border border-red-800 px-6 py-3 rounded-xl">
                 <XCircle className="w-6 h-6" />
                 <span className="font-bold tracking-wide">NOT A MULTIPLE OF 10. INVALID.</span>
               </div>
             )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
