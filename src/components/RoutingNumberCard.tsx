import { RoutingData } from '../lib/types';
import { cn } from '../lib/utils';
import PrintDownloadButtons from './PrintDownloadButtons';
import CopyButton from './CopyButton';
import ChequeVisualizer from './ChequeVisualizer';

export default function RoutingNumberCard({ data }: { data: RoutingData }) {
  const type = data.type || 'ACH';
  const zipStr = data.zip && data.zip !== 'Unknown' ? ` ${data.zip}` : '';

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-5 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 print:border-none print:shadow-none print:p-0">
        <div className="text-center md:text-left flex-grow">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Official Routing Number
            </div>
            <PrintDownloadButtons 
              bankName={data.bank_name} 
              routingNumber={data.routing_number} 
              details={`${data.city}, ${data.state}${zipStr} - ${type}`} 
            />
          </div>
          <div className="font-mono text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {data.routing_number}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
            {(type === 'ACH' || type === 'BOTH') && (
              <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></span> ACH Ready
              </span>
            )}
            {(type === 'WIRE' || type === 'BOTH') && (
              <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800 text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500 dark:bg-orange-400"></span> Wire Transfer
              </span>
            )}
            <span className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-500 dark:bg-slate-400"></span> Paper Check
            </span>
          </div>
        </div>
        <div className="w-full md:w-auto flex flex-col items-stretch shrink-0 print:hidden">
          <CopyButton text={data.routing_number} />
        </div>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl w-full">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 text-center md:text-left">Where to find it on a check</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left mb-6">The routing number is the first set of numbers on the bottom left of your paper checks.</p>
        <ChequeVisualizer routingNumber={data.routing_number} bankName={data.bank_name} />
      </div>
    </div>
  );
}
