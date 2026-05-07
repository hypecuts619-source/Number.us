import React, { useState } from 'react';
import { ShieldAlert, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  routingNumberType: string;
}

export default function TransferCompatibilityChecker({ routingNumberType }: Props) {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const actions = [
    { id: 'direct-deposit', label: 'Direct Deposit / Payroll (ACH)' },
    { id: 'pay-bill', label: 'Pay a Bill Online (ACH)' },
    { id: 'domestic-wire', label: 'Send a Domestic Wire' },
    { id: 'irs-tax', label: 'IRS Tax Return/Payment (ACH)' },
    { id: 'international-wire', label: 'Receive International Transfer' },
  ];

  const t = routingNumberType.toUpperCase();

  const getStatus = (actionId: string) => {
    // ACH-related actions
    if (['direct-deposit', 'pay-bill', 'irs-tax'].includes(actionId)) {
      if (t === 'ACH' || t === 'BOTH') return { status: 'success', msg: 'YES. This routing number supports this.' };
      return { status: 'danger', msg: 'NO! Do not use this routing number. It will bounce.' };
    }
    
    // Wire-related actions
    if (actionId === 'domestic-wire') {
       if (t === 'WIRE' || t === 'BOTH') return { status: 'success', msg: 'YES. This is valid for Domestic Wires.' };
       return { status: 'danger', msg: 'NO! This is for ACH only. Your wire will fail.' };
    }

    if (actionId === 'international-wire') {
      return { status: 'warning', msg: 'Maybe. Ask your bank for their SWIFT/BIC code first. US routing numbers are usually not enough alone.' };
    }

    return null;
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 md:p-8 shadow-lg my-8 text-white relative overflow-hidden font-sans border-2 border-slate-800">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Transfer Compatibility Checker</h2>
        </div>
        
        <p className="text-slate-400 mb-6">
          Will your payment bounce? Select what you are trying to do to see if this specific routing number is accepted.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
             <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">1. I want to...</div>
             {actions.map(action => (
               <button
                 key={action.id}
                 onClick={() => setSelectedAction(action.id)}
                 className={`w-full text-left px-5 py-4 rounded-xl border flex items-center justify-between transition-all ${
                   selectedAction === action.id 
                     ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]' 
                     : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750 hover:border-slate-600'
                 }`}
               >
                 <span className="font-semibold">{action.label}</span>
                 {selectedAction === action.id && <ArrowRight className="w-5 h-5" />}
               </button>
             ))}
          </div>

          <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 flex flex-col justify-center min-h-[250px]">
             {!selectedAction ? (
               <div className="text-center text-slate-500 flex flex-col items-center">
                 <AlertCircle className="w-12 h-12 mb-3 opacity-50" />
                 <p>Select a transaction type to verify compatibility.</p>
               </div>
             ) : (
               <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                 {(() => {
                   const result = getStatus(selectedAction);
                   if (!result) return null;
                   
                   return (
                     <div className="flex flex-col items-center text-center">
                       {result.status === 'success' && (
                         <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                           <CheckCircle2 className="w-10 h-10" />
                         </div>
                       )}
                       {result.status === 'danger' && (
                         <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mb-4">
                           <ShieldAlert className="w-10 h-10" />
                         </div>
                       )}
                       {result.status === 'warning' && (
                         <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mb-4">
                           <AlertCircle className="w-10 h-10" />
                         </div>
                       )}
                       
                       <h3 className={`text-2xl font-black mb-2 ${
                         result.status === 'success' ? 'text-green-400' :
                         result.status === 'danger' ? 'text-red-400' : 'text-amber-400'
                       }`}>
                         {result.status.toUpperCase()}
                       </h3>
                       <p className="text-lg text-slate-100 font-medium">
                         {result.msg}
                       </p>
                       
                       {result.status === 'danger' && (
                         <div className="mt-6 bg-slate-900 border border-red-500/30 p-4 rounded-xl text-sm text-slate-300">
                           <strong className="text-white block mb-1">Why?</strong>
                           This routing number is officially classified as <strong>{routingNumberType}</strong> by the Federal Reserve. Your transaction requires a different network.
                         </div>
                       )}
                     </div>
                   );
                 })()}
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
