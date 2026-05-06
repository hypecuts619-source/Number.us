import React from 'react';

export default function CheckDiagram() {
  return (
    <div className="my-8 overflow-x-auto pb-4">
      <div className="min-w-[600px] max-w-2xl mx-auto bg-amber-50 border-2 border-slate-300 rounded-xl p-6 shadow-md relative font-serif text-slate-800">
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="font-bold text-lg">Your Name Here</div>
            <div className="text-sm">123 Main Street</div>
            <div className="text-sm">Anytown, USA 12345</div>
          </div>
          <div className="text-right">
            <div className="font-bold">1001</div>
            <div className="text-sm mt-4 tracking-tighter">Date __________________</div>
          </div>
        </div>

        <div className="flex items-center mb-8">
          <div className="mr-4">Pay to the<br />Order of</div>
          <div className="border-b border-black flex-grow"></div>
          <div className="ml-4 font-sans font-bold border border-black px-2 py-1 bg-white">$ ________________</div>
        </div>

        <div className="border-b border-black w-full mb-8"></div>

        <div className="flex items-end justify-between font-sans mb-4">
          <div className="w-1/2">
            <div className="font-serif">Bank Name Here</div>
            <div className="text-sm font-serif">Anytown Branch</div>
          </div>
          <div className="w-1/2 text-right">
            <div>Memo _________________</div>
          </div>
        </div>

        <div className="absolute bottom-6 flex items-center font-mono text-xl tracking-widest px-4 pt-2">
          {/* Routing Number with bold bounding box */}
          <div className="relative group cursor-crosshair">
            <span className="opacity-70 font-semibold border-b-4 border-blue-500 text-blue-800">|:012345678|:</span>
            
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-sans font-bold px-3 py-1 rounded whitespace-nowrap shadow-lg">
              Routing Number (9 Digits)
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45"></div>
            </div>
          </div>
          
          <span className="mx-4 font-semibold opacity-70 border-b-4 border-emerald-500 text-emerald-800 tracking-widest">0000123456789‖</span>
          
          <span className="opacity-70 font-semibold border-b-4 border-slate-400 text-slate-600">1001</span>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto flex gap-4 text-sm font-medium justify-center mt-4 text-slate-600 dark:text-slate-300">
        <div className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded-full inline-block"></span> Routing Number (First 9)</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500 rounded-full inline-block"></span> Account Number</div>
        <div className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-400 rounded-full inline-block"></span> Check Number</div>
      </div>
    </div>
  );
}
