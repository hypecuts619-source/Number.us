import React from 'react';

export default function CheckDiagram({ 
  routingNumber = '', 
  accountNumber = '' 
}: { 
  routingNumber?: string;
  accountNumber?: string;
}) {
  const [localRouting, setLocalRouting] = React.useState(routingNumber);
  const [localAccount, setLocalAccount] = React.useState(accountNumber);

  // Update local state if props change
  React.useEffect(() => {
    if (routingNumber) setLocalRouting(routingNumber);
  }, [routingNumber]);

  React.useEffect(() => {
    if (accountNumber) setLocalAccount(accountNumber);
  }, [accountNumber]);

  const displayRouting = localRouting || '012345678';
  const displayAccount = localAccount || '0000123456789';

  return (
    <div className="my-8">
      {/* Interactive Inputs */}
      <div className="max-w-2xl mx-auto mb-6 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row gap-4 sm:items-center shadow-sm">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Test Routing Number</label>
          <input 
            type="text" 
            maxLength={9}
            placeholder="012345678"
            value={localRouting}
            onChange={(e) => setLocalRouting(e.target.value.replace(/\D/g, ''))}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
          />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Test Account Number</label>
          <input 
            type="text" 
            placeholder="Optional"
            value={localAccount}
            onChange={(e) => setLocalAccount(e.target.value.replace(/\D/g, ''))}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
          />
        </div>
      </div>

      <div className="w-full relative">
        <div className="md:hidden absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none z-10 rounded-r-xl" />
        <div className="w-full overflow-x-auto pb-6" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}>
          <div className="min-w-[600px] w-full max-w-2xl mx-auto bg-amber-50 border-2 border-slate-300 rounded-xl p-6 shadow-md relative font-serif text-slate-800 transition-all">
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
              <span className={`font-semibold border-b-4 border-blue-500 text-blue-800 transition-all ${localRouting ? 'bg-blue-100 px-1 py-0.5 rounded shadow-sm opacity-100' : 'opacity-70'}`}>
                |:{displayRouting}|:
              </span>
              
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-sans font-bold px-3 py-1 rounded whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                Routing Number (9 Digits)
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45"></div>
              </div>
            </div>
            
            <div className="relative group cursor-crosshair mx-4">
              <span className={`font-semibold border-b-4 border-emerald-500 text-emerald-800 tracking-widest transition-all ${localAccount ? 'bg-emerald-100 px-1 py-0.5 rounded shadow-sm opacity-100' : 'opacity-70'}`}>
                {displayAccount}‖
              </span>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-sans font-bold px-3 py-1 rounded whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                Account Number
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-600 rotate-45"></div>
              </div>
            </div>
            
            <div className="relative group cursor-crosshair">
              <span className="opacity-70 font-semibold border-b-4 border-slate-400 text-slate-600">1001</span>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-600 text-white text-xs font-sans font-bold px-3 py-1 rounded whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                Check Number
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-600 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto flex flex-wrap gap-4 text-sm font-medium justify-center mt-6 text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded-full inline-block"></span> Routing Number (First 9)</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-500 rounded-full inline-block"></span> Account Number</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-slate-400 rounded-full inline-block"></span> Check Number</div>
        </div>
      </div>
      </div>
    </div>
  );
}
