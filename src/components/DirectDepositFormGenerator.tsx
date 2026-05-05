import React, { useState } from 'react';
import { FileText, Printer, Download } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

interface Props {
  bankName: string;
  routingNumber: string;
}

export default function DirectDepositFormGenerator({ bankName, routingNumber }: Props) {
  const [employeeName, setEmployeeName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('Checking');
  const [employerName, setEmployerName] = useState('');
  
  const handlePrint = () => {
    toast.success('Preparing document for print...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <section className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm mt-12 print:border-none print:shadow-none print:mt-0">
      <div className="bg-blue-600 p-6 text-white text-center print:hidden">
        <h2 className="text-2xl font-black mb-2 flex items-center justify-center gap-2">
          <FileText className="w-6 h-6" />
          Direct Deposit Form Generator
        </h2>
        <p className="text-blue-100 max-w-2xl mx-auto">
          Skip the HR paperwork limit. Fill in your details below and instantly generate a printable 
          Direct Deposit Authorization form for {bankName} with the routing number auto-filled.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 print:block print:divide-none">
        
        {/* Input Form (Hidden on Print) */}
        <div className="p-8 print:hidden bg-slate-50 dark:bg-slate-900/50">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-6">Enter Your Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input 
                type="text" 
                placeholder="Jane Doe"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Company / Employer Name</label>
              <input 
                type="text" 
                placeholder="Acme Corp"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Account Number</label>
              <input 
                type="text" 
                placeholder="Required for direct deposit"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-1">We do not store or transmit this information. It stays on your device.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Account Type</label>
              <select 
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option>Checking</option>
                <option>Savings</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm"
            >
              <Printer className="w-5 h-5" />
              Print Form
            </button>
          </div>
        </div>

        {/* Live Preview / The Actual Document (Visible on Print) */}
        <div className="p-8 md:p-10 bg-white text-black print:p-0">
          <div className="print:hidden flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
            <h3 className="text-lg font-bold text-slate-800">Live Preview</h3>
            <span className="text-xs font-bold uppercase tracking-wider text-green-600 bg-green-100 px-2 py-1 rounded">Ready to Print</span>
          </div>

          {/* The Document Area */}
          <div className="font-serif">
            <h1 className="text-2xl font-bold text-center border-b-2 border-black pb-4 mb-8 uppercase tracking-wide">
              Direct Deposit Authorization Form
            </h1>

            <div className="space-y-6">
              <div>
                <p className="font-bold mb-2 uppercase text-sm">Employer Information</p>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div className="flex gap-2 border-b border-gray-300 pb-1">
                    <span className="w-32 font-bold">Company Name:</span>
                    <span className="flex-1 font-sans">{employerName || <span className="text-gray-300 italic">Entered above</span>}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-bold mb-2 uppercase text-sm">Employee Information</p>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div className="flex gap-2 border-b border-gray-300 pb-1">
                    <span className="w-32 font-bold">Employee Name:</span>
                    <span className="flex-1 font-sans">{employeeName || <span className="text-gray-300 italic">Entered above</span>}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-bold mb-2 uppercase text-sm">Bank Information</p>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div className="flex gap-2 border-b border-gray-300 pb-1">
                    <span className="w-32 font-bold">Bank Name:</span>
                    <span className="flex-1 font-sans font-bold">{bankName}</span>
                  </div>
                  <div className="flex gap-2 border-b border-gray-300 pb-1 bg-yellow-50">
                    <span className="w-32 font-bold">Routing Number:</span>
                    <span className="flex-1 font-mono font-bold text-lg tracking-widest">{routingNumber}</span>
                  </div>
                  <div className="flex gap-2 border-b border-gray-300 pb-1">
                    <span className="w-32 font-bold">Account Number:</span>
                    <span className="flex-1 font-mono">{accountNumber || <span className="text-gray-300 flex items-center h-full text-xs">_____________</span>}</span>
                  </div>
                  <div className="flex gap-2 border-b border-gray-300 pb-1">
                    <span className="w-32 font-bold">Account Type:</span>
                    <span className="flex-1 font-sans">{accountType}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-300 mt-8 text-sm leading-relaxed">
                <p className="mb-4 text-justify">
                  I hereby authorize my employer, named above, to initiate credit entries and to initiate, if necessary, debit entries and adjustments for any credit entries in error to my account indicated above and the depository named above, hereinafter called DEPOSITORY, to credit and/or debit the same to such account. 
                </p>
                <p className="mb-8 text-justify">
                  This authority is to remain in full force and effect until my employer has received written notification from me of its termination in such time and in such manner as to afford my employer and DEPOSITORY a reasonable opportunity to act on it.
                </p>

                <div className="flex justify-between items-end mt-16 pt-4">
                  <div className="w-1/2 pr-4">
                    <div className="border-b border-black mb-2 h-10 flex items-end">
                      <span className="font-sans ml-2 mb-1" style={{ fontFamily: '"Brush Script MT", cursive', fontSize: '1.5rem' }}>
                        {employeeName}
                      </span>
                    </div>
                    <p className="font-bold">Employee Signature</p>
                  </div>
                  <div className="w-1/3">
                    <div className="border-b border-black mb-2 h-10 flex items-end pb-1 font-mono pl-2">
                       {new Date().toLocaleDateString()}
                    </div>
                    <p className="font-bold">Date</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer warning hidden on print */}
      <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 text-center text-xs text-slate-500 print:hidden">
        This form runs entirely in your web browser. No data is sent to our servers.
      </div>
    </section>
  );
}
