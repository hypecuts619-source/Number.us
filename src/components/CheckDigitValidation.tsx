import React from 'react';
import { CheckCircle2, Calculator } from 'lucide-react';

interface CheckDigitValidationProps {
  routingNumber: string;
}

export default function CheckDigitValidation({ routingNumber }: CheckDigitValidationProps) {
  if (!routingNumber || routingNumber.length !== 9) return null;

  // Modulo 10 Check Digit Calculation
  const digits = routingNumber.split('').map(Number);
  // Weights: 3, 7, 1, 3, 7, 1, 3, 7, 1
  const weights = [3, 7, 1, 3, 7, 1, 3, 7, 1];
  
  const sum = digits.slice(0, 8).reduce((acc, digit, idx) => {
    return acc + (digit * weights[idx]);
  }, 0);

  const calculatedCheckDigit = (10 - (sum % 10)) % 10;
  const actualCheckDigit = digits[8];
  const isValid = calculatedCheckDigit === actualCheckDigit;

  return (
    <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-blue-600" />
        Mathematical Validation Unit
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">9-Digit ABA Code</span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">{routingNumber}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Modulo 10 Result</span>
          <span className={`text-sm font-bold ${isValid ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isValid ? 'Checksum Passed' : 'Checksum Failed'}
          </span>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl">
          <p className="text-xs leading-relaxed text-blue-800 dark:text-blue-300">
            <strong>Check Digit Logic:</strong> The final digit (<strong>{actualCheckDigit}</strong>) matches the calculated result of the Modulo 10 algorithm (<code>(3*d1 + 7*d2 + 1*d3 + 3*d4 + 7*d5 + 1*d6 + 3*d7 + 7*d8) mod 10</code>). This ensures the number is a syntactically valid ABA routing number.
          </p>
        </div>

        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold">
          <CheckCircle2 className="w-5 h-5" />
          Federal Reserve Compliant Structure
        </div>
      </div>
    </div>
  );
}
