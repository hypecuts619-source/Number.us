import React from 'react';
import { cn } from '../lib/utils';
import { Building2 } from 'lucide-react';

export default function ChequeVisualizer({ routingNumber, bankName }: { routingNumber: string, bankName?: string }) {
  return (
    <div className="w-full relative">
      {/* Mobile Hint opacity indicates scrollability */}
      <div className="md:hidden absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#f8fcf8] dark:from-slate-900 to-transparent pointer-events-none z-10 rounded-r-xl" />
      
      <div className="w-full overflow-x-auto pb-6" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}>
        <div className="min-w-[600px] w-full max-w-2xl mx-auto my-4 sm:my-8 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm bg-[#f8fcf8] text-slate-800 print:hidden font-sans group transition-all duration-300 hover:shadow-md">
          {/* Cheque Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#1e3a5f 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          
          {/* Cheque Content */}
          <div className="relative p-8">
            <div className="flex justify-between items-start mb-12">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-5 h-5 text-slate-400" />
                  <div className="font-bold text-lg text-slate-700">{bankName || 'Your Bank Name'}</div>
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-widest ml-7">Bank Logo Here</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-slate-500">1234</div>
                <div className="text-xs text-slate-400 mt-1">Date: ___/___/___</div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-serif italic text-slate-600">Pay to the order of</span>
                <div className="flex-grow border-b border-slate-400"></div>
                <span className="font-bold border border-slate-400 px-4 py-1 bg-white">$</span>
                <div className="w-32 border-b border-slate-400"></div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-grow border-b border-slate-400"></div>
                <span className="font-serif italic text-slate-600 pr-4">Dollars</span>
              </div>

              <div className="flex justify-between items-end pt-4">
                <div className="flex items-center gap-2">
                  <span className="font-serif italic text-slate-600">For</span>
                  <div className="w-48 border-b border-slate-400"></div>
                </div>
                <div className="w-64 border-b border-slate-400"></div>
              </div>
            </div>

            {/* The MICR Line (Magnetic Ink Character Recognition) */}
            <div className="mt-12 flex items-center justify-start gap-8 font-mono text-2xl sm:text-3xl tracking-widest opacity-80" style={{ fontFamily: 'monospace, "Courier New"' }}>
              {/* Routing Number with Highlighting */}
              <div className="relative flex items-center">
                <span className="text-slate-400 mr-2">|:</span>
                <span className="font-bold text-blue-600 relative z-10 px-1 rounded bg-blue-100 ring-2 ring-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.2)] scale-110 transform transition-transform group-hover:scale-125 origin-left">
                  {routingNumber || '000000000'}
                </span>
                <span className="text-slate-400 ml-2">|:</span>
                
                {/* Tooltip-style label */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-blue-600 flex flex-col items-center animate-bounce">
                  <div className="w-0.5 h-3 bg-blue-600 mb-1"></div>
                  Your Routing Number
                </div>
              </div>

              {/* Fake Account Number */}
              <div className="text-slate-400 flex items-center">
                1234567890 <span className="ml-2">||"</span>
              </div>
              
              {/* Fake Check Number */}
              <div className="text-slate-400">
                1234
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
