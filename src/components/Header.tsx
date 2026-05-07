import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'By State', path: '/states' },
    { name: 'Major Banks', path: '/major-banks' },
    { name: 'Blog & Guides', path: '/blog' },
    { name: 'Wire Guide', path: '/how-to-wire-money' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0 sticky top-0 z-50 shadow-sm dark:shadow-none">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" onClick={closeMenu} className="text-2xl font-black text-[#1e3a5f] dark:text-blue-400 tracking-tight z-50 relative">
          USRouting<span className="text-blue-600 dark:text-blue-300">Number.com</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 font-semibold text-slate-600 dark:text-slate-300 items-center">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`transition-colors ${location.pathname === link.path ? 'text-blue-600 dark:text-blue-400' : 'hover:text-[#1e3a5f] dark:hover:text-blue-500'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4 z-50 relative">
          <ThemeToggle />
          <button 
            className="lg:hidden p-2 -mr-2 text-slate-600 dark:text-slate-300" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[73px] left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-y-auto max-h-[calc(100vh-73px)]">
          <nav className="flex flex-col py-4 px-6 gap-2">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={closeMenu}
                className={`py-3 px-4 rounded-xl text-lg font-semibold transition-colors ${location.pathname === link.path ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
