import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Code, Search } from 'lucide-react';
import { toast } from 'sonner';

export default function EmbedWidget() {
  const [copied, setCopied] = useState(false);
  const [routingInput, setRoutingInput] = useState('');
  
  const siteUrl = window.location.origin;
  const embedCode = `<div id="routing-checker-widget" data-theme="light"></div>
<script src="${siteUrl}/widgets/checker.js" async></script>
<p style="font-size: 10px; color: #666; margin-top: 5px;">Powered by <a href="${siteUrl}" target="_blank">USRoutingNumber.com</a></p>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success("Embed code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      <div className="p-8 md:p-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold mb-6">
              <Code className="w-3 h-3" /> FOR BLOGGERS & WEBMASTERS
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              Get Our Routing Checker on Your Site
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Help your readers verify banking data without leaving your page. Our lightweight widget is 100% free and easy to install.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Instant Routing Verification",
                "Mobile Responsive Design",
                "Dark & Light Mode Support",
                "SEO-Friendly Infrastructure"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Check className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            {/* Live Preview */}
            <div className="p-6 bg-white rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Search className="w-4 h-4" />
                </div>
                <span className="font-bold text-slate-900">SwiftVerify Tool</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">Enter a 9-digit ABA routing number to check bank details.</p>
              <div className="relative">
                <input 
                  type="text" 
                  value={routingInput}
                  onChange={(e) => setRoutingInput(e.target.value.replace(/[^0-9]/g, '').slice(0, 9))}
                  placeholder="Ex: 123456789"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none pr-10 text-slate-900" 
                />
                <button className="absolute right-2 top-2 h-8 w-8 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Preview Mode</span>
                <span className="text-[10px] text-slate-400">Powered by USRoutingNumber.com</span>
              </div>
            </div>

            {/* Implementation Code */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-6 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-slate-500">HTML Embed Code</span>
                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? "Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre className="text-[10px] md:text-sm font-mono text-blue-100 whitespace-pre-wrap break-all opacity-80 leading-relaxed">
                  {embedCode}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
