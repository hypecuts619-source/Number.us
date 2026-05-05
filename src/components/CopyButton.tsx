import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`Copied! Double-check the last 4 digits: ${text.slice(-4)} before pasting.`);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy to clipboard.');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-black text-xl text-white transition-all transform active:scale-95 shadow-md shadow-blue-900/20 w-full",
        copied 
          ? "bg-emerald-600 hover:bg-emerald-700 ring-4 ring-emerald-500/30" 
          : "bg-[#1e3a5f] hover:bg-blue-800 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/30"
      )}
      aria-label="Copy routing number"
    >
      {copied ? (
        <>
          <Check className="w-6 h-6 animate-in zoom-in" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-6 h-6" />
          Copy Number
        </>
      )}
    </button>
  );
}
