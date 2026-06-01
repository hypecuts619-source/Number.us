import React, { useState } from 'react';
import { Clock, User, ShieldCheck, Twitter, Linkedin, Facebook, Link as LinkIcon, Printer, Share2, Check } from 'lucide-react';

interface Props {
  date: string;
  readTime: string;
  author?: string;
  reviewer?: string;
}

export default function ArticleAuthorMeta({ 
  date, 
  readTime, 
  author = "USRoutingNumber Editorial Team",
  reviewer = "Financial Review Board"
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = typeof document !== 'undefined' ? document.title : '';

  const shareTwitter = () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
  const shareLinkedin = () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  const shareFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  const handlePrint = () => window.print();

  return (
    <div className="flex flex-col sm:flex-row flex-wrap sm:items-center justify-between gap-4 text-sm font-medium text-slate-500 my-6 pb-6 border-b border-slate-100 dark:border-slate-800">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
          <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-slate-700 dark:text-slate-300">By {author}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800/50">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-emerald-800 dark:text-emerald-300">Fact Checked by {reviewer}</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-2 sm:mt-0">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>Updated: {date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 mr-2">
          <Share2 className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wider font-bold">Share</span>
        </div>
        
        <button onClick={shareTwitter} className="p-2 bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 hover:text-blue-500 dark:text-slate-400 transition-colors rounded-full" aria-label="Share on Twitter" title="Share on Twitter">
          <Twitter className="w-4 h-4" />
        </button>
        <button onClick={shareLinkedin} className="p-2 bg-slate-100 hover:bg-blue-700/10 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 hover:text-blue-700 dark:text-slate-400 transition-colors rounded-full" aria-label="Share on LinkedIn" title="Share on LinkedIn">
          <Linkedin className="w-4 h-4" />
        </button>
        <button onClick={shareFacebook} className="p-2 bg-slate-100 hover:bg-blue-600/10 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 hover:text-blue-600 dark:text-slate-400 transition-colors rounded-full" aria-label="Share on Facebook" title="Share on Facebook">
          <Facebook className="w-4 h-4" />
        </button>
        <button onClick={handleCopyLink} className={`p-2 transition-colors rounded-full ${copied ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'}`} aria-label="Copy Link" title="Copy Link">
          {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
        </button>
        
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
        
        <button onClick={handlePrint} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors rounded-full text-xs font-bold" aria-label="Save as PDF / Print" title="Save / Print Article">
          <Printer className="w-4 h-4" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}
