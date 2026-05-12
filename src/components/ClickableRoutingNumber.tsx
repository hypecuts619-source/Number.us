import React, { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { Copy, Check } from 'lucide-react';

interface ClickableRoutingNumberProps {
  number: string;
  className?: string;
}

export const ClickableRoutingNumber: React.FC<ClickableRoutingNumberProps> = ({ number, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(number);
      setCopied(true);
      toast.success(`Routing Number Copied!`, {
        description: `${number} is ready for processing.`,
        duration: 3000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy routing number: ', err);
      toast.error('Failed to copy to clipboard.');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "group relative font-mono font-bold transition-all px-2.5 py-1.5 rounded-lg cursor-pointer inline-flex items-center gap-2",
        copied 
          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 scale-105"
          : "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:scale-105 active:scale-95",
        className
      )}
      title="One-Tap Copy"
    >
      <span className="tracking-widest">{number}</span>
      {copied ? (
        <Check className="w-3.5 h-3.5 animate-in zoom-in duration-300" />
      ) : (
        <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
      )}
      
      {!copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-lg pointer-events-none transition-all duration-300 whitespace-nowrap z-50">
          One-Tap Copy
        </span>
      )}
    </button>
  );
}
