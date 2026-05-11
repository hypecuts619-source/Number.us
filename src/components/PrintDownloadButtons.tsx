import { Printer, Download } from 'lucide-react';

export default function PrintDownloadButtons({ bankName, routingNumber, details }: { bankName: string, routingNumber: string, details?: string }) {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    let content = "Bank Name,Routing Number,Transaction Type,Details\n";
    content += `"${bankName}","${routingNumber}","ACH & Wire (Default)","${details ? details.replace(/"/g, '""') : 'Verified'}"\n`;

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${bankName.replace(/\s+/g, '_')}_Routing_${routingNumber}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-2 print:hidden z-10 relative w-full sm:w-auto">
      <button 
        onClick={handlePrint}
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2.5 sm:px-5 sm:py-2.5 text-[10px] sm:text-sm font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-all border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow"
        title="Print details"
      >
        <Printer className="w-3.5 h-3.5 sm:w-5 sm:h-5" /> Print
      </button>
      <button 
        onClick={handleDownload}
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2.5 sm:px-5 sm:py-2.5 text-[10px] sm:text-sm font-bold bg-[#1e3a5f] text-white hover:bg-blue-800 rounded-lg transition-all shadow-sm hover:shadow"
        title="Download CSV"
      >
        <Download className="w-3.5 h-3.5 sm:w-5 sm:h-5" /> CSV
      </button>
    </div>
  );
}
