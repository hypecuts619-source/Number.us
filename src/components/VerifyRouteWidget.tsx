import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, MapPin, ArrowUpRight } from 'lucide-react';

export default function VerifyRouteWidget() {
  const links = [
    {
      title: "2026 Credit Union Density Report",
      path: "/reports/2026-us-credit-union-report",
      icon: <FileText className="w-5 h-5 text-emerald-500" />,
      tag: "Industry Report"
    },
    {
      title: "California Bank Directory",
      path: "/states/ca",
      icon: <MapPin className="w-5 h-5 text-blue-500" />,
      tag: "West Region"
    },
    {
      title: "Texas Bank Directory",
      path: "/states/tx",
      icon: <MapPin className="w-5 h-5 text-blue-500" />,
      tag: "South Region"
    },
    {
      title: "Florida Bank Directory",
      path: "/states/fl",
      icon: <MapPin className="w-5 h-5 text-blue-500" />,
      tag: "Southeast Region"
    },
    {
      title: "New York Bank Directory",
      path: "/states/ny",
      icon: <MapPin className="w-5 h-5 text-blue-500" />,
      tag: "Northeast Region"
    }
  ];

  return (
    <div className="my-10 bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* Blueprint design grid accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Widget Header & Intro */}
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl border border-red-500/20 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">
              ⚠️ Verify Your Route Before Initiating a Wire
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Entering the wrong 9-digit ABA code can lock your money in clearing-house limbo or incur expensive rejection fees. Use our free tool to validate your bank's route mathematically before hitting send.
            </p>
          </div>
        </div>

        {/* Internal Link Grid */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <p className="text-xs font-bold uppercase tracking-widest text-[#2563eb] dark:text-blue-400 mb-4">
            Verify Regional Directories & Resources
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="group flex items-center justify-between p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-950/80 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-800/50 group-hover:bg-slate-800 transition-colors">
                    {link.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                      {link.title}
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-0.5">
                      {link.tag}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600 transition-all duration-200 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
