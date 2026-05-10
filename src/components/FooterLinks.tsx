import { Link } from 'react-router-dom';

const topBanks = [
  { name: 'Chase', slug: 'jpmorgan-chase-bank-na' },
  { name: 'Bank of America', slug: 'bank-of-america-na' },
  { name: 'Wells Fargo', slug: 'wells-fargo-bank-na' },
  { name: 'Citi', slug: 'citibank-na' },
  { name: 'U.S. Bank', slug: 'us-bank-national-association' },
  { name: 'PNC Bank', slug: 'pnc-bank-national-association' },
  { name: 'Truist', slug: 'truist-bank' },
  { name: 'Capital One', slug: 'capital-one-na' },
  { name: 'TD Bank', slug: 'td-bank-na' },
  { name: 'Navy Federal', slug: 'navy-fcu' },
];

const statesList = [
  { abbr: 'AL', name: 'Alabama', slug: 'al' }, { abbr: 'AK', name: 'Alaska', slug: 'ak' }, 
  { abbr: 'AZ', name: 'Arizona', slug: 'az' }, { abbr: 'AR', name: 'Arkansas', slug: 'ar' }, 
  { abbr: 'CA', name: 'California', slug: 'ca' }, { abbr: 'CO', name: 'Colorado', slug: 'co' }, 
  { abbr: 'CT', name: 'Connecticut', slug: 'ct' }, { abbr: 'DE', name: 'Delaware', slug: 'de' }, 
  { abbr: 'FL', name: 'Florida', slug: 'fl' }, { abbr: 'GA', name: 'Georgia', slug: 'ga' }, 
  { abbr: 'HI', name: 'Hawaii', slug: 'hi' }, { abbr: 'ID', name: 'Idaho', slug: 'id' }, 
  { abbr: 'IL', name: 'Illinois', slug: 'il' }, { abbr: 'IN', name: 'Indiana', slug: 'in' }, 
  { abbr: 'IA', name: 'Iowa', slug: 'ia' }, { abbr: 'KS', name: 'Kansas', slug: 'ks' }, 
  { abbr: 'KY', name: 'Kentucky', slug: 'ky' }, { abbr: 'LA', name: 'Louisiana', slug: 'la' }, 
  { abbr: 'ME', name: 'Maine', slug: 'me' }, { abbr: 'MD', name: 'Maryland', slug: 'md' }, 
  { abbr: 'MA', name: 'Massachusetts', slug: 'ma' }, { abbr: 'MI', name: 'Michigan', slug: 'mi' }, 
  { abbr: 'MN', name: 'Minnesota', slug: 'mn' }, { abbr: 'MS', name: 'Mississippi', slug: 'ms' }, 
  { abbr: 'MO', name: 'Missouri', slug: 'mo' }, { abbr: 'MT', name: 'Montana', slug: 'mt' }, 
  { abbr: 'NE', name: 'Nebraska', slug: 'ne' }, { abbr: 'NV', name: 'Nevada', slug: 'nv' }, 
  { abbr: 'NH', name: 'New Hampshire', slug: 'nh' }, { abbr: 'NJ', name: 'New Jersey', slug: 'nj' }, 
  { abbr: 'NM', name: 'New Mexico', slug: 'nm' }, { abbr: 'NY', name: 'New York', slug: 'ny' }, 
  { abbr: 'NC', name: 'North Carolina', slug: 'nc' }, { abbr: 'ND', name: 'North Dakota', slug: 'nd' }, 
  { abbr: 'OH', name: 'Ohio', slug: 'oh' }, { abbr: 'OK', name: 'Oklahoma', slug: 'ok' }, 
  { abbr: 'OR', name: 'Oregon', slug: 'or' }, { abbr: 'PA', name: 'Pennsylvania', slug: 'pa' }, 
  { abbr: 'RI', name: 'Rhode Island', slug: 'ri' }, { abbr: 'SC', name: 'South Carolina', slug: 'sc' }, 
  { abbr: 'SD', name: 'South Dakota', slug: 'sd' }, { abbr: 'TN', name: 'Tennessee', slug: 'tn' }, 
  { abbr: 'TX', name: 'Texas', slug: 'tx' }, { abbr: 'UT', name: 'Utah', slug: 'ut' }, 
  { abbr: 'VT', name: 'Vermont', slug: 'vt' }, { abbr: 'VA', name: 'Virginia', slug: 'va' }, 
  { abbr: 'WA', name: 'Washington', slug: 'wa' }, { abbr: 'WV', name: 'West Virginia', slug: 'wv' }, 
  { abbr: 'WI', name: 'Wisconsin', slug: 'wi' }, { abbr: 'WY', name: 'Wyoming', slug: 'wy' },
  { abbr: 'DC', name: 'District of Columbia', slug: 'dc' }
];

export default function FooterLinks() {
  return (
    <div className="w-full max-w-7xl mx-auto mb-10 pt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
        {/* Top Banks Column */}
        <div>
          <h3 className="text-slate-900 dark:text-slate-100 font-bold mb-4 uppercase tracking-wider text-xs">
            Major Banks
          </h3>
          <ul className="space-y-2 text-sm">
            {topBanks.map(bank => (
              <li key={bank.slug}>
                <Link 
                  to={`/routing-number/${bank.slug}`}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {bank.name} Routing Numbers
                </Link>
              </li>
            ))}
            <li>
              <Link 
                to="/banks"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline transition-colors mt-2 inline-block"
              >
                Full A-Z Bank Directory &rarr;
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div>
          <h3 className="text-slate-900 dark:text-slate-100 font-bold mb-4 uppercase tracking-wider text-xs">
            Resources & Guides
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/what-is-a-routing-number" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">What is a Routing Number?</Link></li>
            <li><Link to="/find-routing-number-on-check" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Find it on a Check</Link></li>
            <li><Link to="/how-to-wire-money" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How to Wire Money</Link></li>
            <li><Link to="/international-wire-guide" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">International Wire Transfers</Link></li>
            <li><Link to="/routing-number-vs-account-number" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Routing vs Account Number</Link></li>
            <li><Link to="/zelle-routing-number" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Do You Need a Routing Number for Zelle?</Link></li>
            <li><Link to="/routing-number-changes-2026" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">2026 Routing Number Changes</Link></li>
            <li><Link to="/routing-number-validator" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Routing Number Validator</Link></li>
            <li><Link to="/check-digit-calculator" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Check Digit Calculator</Link></li>
            <li><Link to="/blog" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">All Financial Guides</Link></li>
          </ul>
        </div>

        {/* States Column 1/2 */}
        <div className="col-span-1 lg:col-span-2">
          <h3 className="text-slate-900 dark:text-slate-100 font-bold mb-4 uppercase tracking-wider text-xs">
            Routing Numbers by State
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm">
            {statesList.map(state => (
              <Link 
                key={state.slug}
                to={`/states/${state.slug}`}
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
              >
                {state.name}
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link 
              to="/states"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline transition-colors mt-2 inline-block text-sm"
            >
              Directory Overview &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
