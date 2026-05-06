import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { getStateFullName } from '../lib/getData';
import { MapPin } from 'lucide-react';

const STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY',
  'LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
  'OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
];

export default function StateDirectory() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <SEO 
        title="View Banks by State | USRoutingNumber.com"
        description="Directory of US banks and their routing numbers organized by state. Select your state to find local bank branches."
        canonicalUrl="/states"
      />
      
      <BreadcrumbNav crumbs={[{ name: 'State Directory', url: '/states' }]} />

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          US Banks by State
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Select a state below to view all registered financial institutions and their local branch routing numbers.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {STATES.map(state => (
           <Link 
             key={state} 
             to={`/states/${state.toLowerCase()}`}
             className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all group group-hover:-translate-y-1"
           >
             <MapPin className="w-8 h-8 text-blue-400 mb-3 group-hover:text-blue-600 transition-colors" />
             <div className="font-bold text-slate-800 dark:text-slate-100 text-center">{getStateFullName(state)}</div>
             <div className="text-sm font-mono text-slate-400 mt-1">{state}</div>
           </Link>
        ))}
      </div>
    </div>
  );
}
