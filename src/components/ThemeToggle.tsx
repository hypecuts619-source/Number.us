import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      mounted &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Return a generic placeholder or matching SSR state before mount
  if (!mounted) {
    return (
      <button
        className="p-2.5 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-slate-800 transition-colors"
        aria-label="Toggle theme"
      >
        <Moon className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2.5 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
