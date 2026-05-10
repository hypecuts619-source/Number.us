import React from 'react';
import { Twitter, Linkedin, Award, ShieldCheck } from 'lucide-react';

interface AuthorBioProps {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  twitter?: string;
  linkedin?: string;
}

export default function AuthorBio({ name, role, bio, imageUrl, twitter, linkedin }: AuthorBioProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 my-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-slate-800 shadow-lg shrink-0" 
          />
        ) : (
          <div className="w-24 h-24 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-3xl font-black shrink-0 shadow-lg shadow-blue-500/20">
            {name.charAt(0)}
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h3 className="text-xl font-black text-slate-900 dark:text-white m-0">{name}</h3>
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider rounded">Verified Contributor</span>
          </div>
          <p className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-4">{role}</p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-6">
            {bio}
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {twitter && (
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-700 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
            
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
            
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">E-E-A-T Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
