import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, MessageSquare, Send } from 'lucide-react';

interface FeedbackModuleProps {
  bankName: string;
  routingNumber?: string;
  context?: string;
}

export default function FeedbackModule({ bankName, routingNumber, context }: FeedbackModuleProps) {
  const [submitted, setSubmitted] = useState(false);
  const [errorType, setErrorType] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Feedback submitted:', { bankName, routingNumber, errorType, message, context });
      setSubmitted(true);
      setIsSubmitting(false);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50 p-8 rounded-3xl text-center animate-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-800/40 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-2">Correction Received</h3>
        <p className="text-emerald-700/80 dark:text-emerald-400/80 max-w-sm mx-auto text-sm leading-relaxed">
          Thank you for helping us maintain the accuracy of the <strong>{bankName}</strong> directory. Our data integrity team will re-verify this information against the latest Federal Reserve records.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 mt-16 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 dark:bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-900/10 dark:shadow-none">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Data Quality Management</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Spotted an error? Help us verify {bankName} routing lists.</p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Last Verified</span>
          <span className="text-xs font-bold text-slate-900 dark:text-white">May 2026</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Select the error type</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'Inactive Number',
              'Wrong Bank Name',
              'Incorrect Branch',
              'Type Mismatch',
              'Other'
            ].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setErrorType(type)}
                className={`text-left px-4 py-3 rounded-xl border text-sm transition-all duration-300 font-medium shadow-sm ${
                  errorType === type
                    ? 'border-blue-600 bg-blue-600 text-white dark:bg-blue-600'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {errorType && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Optional Details</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Tell us what's wrong with this ${bankName} entry...`}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none min-h-[120px] shadow-sm italic"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full sm:w-auto bg-slate-900 dark:bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-slate-800 dark:hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-slate-900/10 dark:shadow-blue-900/10"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span>Submit Correction Report</span>
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
