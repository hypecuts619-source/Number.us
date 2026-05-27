import React, { useState } from 'react';
import SEO from '../components/SEO';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';
import AdsterraNativeSlot from '../components/AdsterraNativeSlot';

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent! We'll get back to you within 48 hours.");
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <SEO 
        title="Contact Us | USRoutingNumber.com"
        description="Contact our team for directory updates, general inquiries, or feedback regarding our routing number database."
        canonicalUrl="/contact-us"
      />

      <BreadcrumbNav crumbs={[{ name: 'Contact Us', url: '/contact-us' }]} />

      <div className="mt-8 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Contact Our Team
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Have a question or noticed a bank merger we haven't updated yet? Fill out the form below or send us an email.
        </p>
      </div>

            <div className="w-full max-w-7xl mx-auto mb-8 flex justify-center">
        <AdsterraNativeSlot zoneId="6948551188cd9c3d25dbc16afc6eb8f4" format="horizontal" uniqueId="contactus-hero" />
      </div>

<div className="grid md:grid-cols-3 gap-10 mt-12">
        <div className="md:col-span-1 space-y-8">
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Email Us</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">For urgent directory updates or press inquiries:</p>
            <a href="mailto:contact@usroutingnumber.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
              contact@usroutingnumber.com
            </a>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Response Time</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              We typically review and verify data update requests within <strong>48 hours</strong> using the official Federal Reserve E-Payments Routing Directory.
            </p>
          </div>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Subject / Inquiry Type</label>
              <select 
                id="subject"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
              >
                <option>Directory Update Request</option>
                <option>Bank Merger Information</option>
                <option>Website Feedback / Bug Report</option>
                <option>General Inquiry</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Message Details</label>
              <textarea 
                id="message" 
                rows={5}
                required
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none dark:text-white"
                placeholder="Please describe the routing number issue or provide verification links if reporting a change..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
          
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-6 text-center">
            <strong>Disclaimer:</strong> Do <strong>NOT</strong> include actual personal bank account numbers, social security numbers, or sensitive financial information in this form. We are an informational directory and cannot access personal accounts.
          </p>
        </div>
      </div>
    </div>
  );
}
