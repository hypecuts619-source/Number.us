import { useState, useEffect, useCallback } from 'react';

export interface FavoriteBank {
  slug: string;
  bankName: string;
  state: string;
}

function getInitialFavorites(): FavoriteBank[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('favoriteBanks');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load favorite banks', e);
  }
  return [];
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteBank[]>(getInitialFavorites);
  const [loaded, setLoaded] = useState(true); // Always true since we load synchronously

  const toggleFavorite = useCallback((bank: FavoriteBank) => {
    setFavorites(prev => {
      const isFavorite = prev.some(f => f.slug === bank.slug);
      let next;
      if (isFavorite) {
        next = prev.filter(f => f.slug !== bank.slug);
      } else {
        // Limit to 5 favorites
        next = [bank, ...prev].slice(0, 5);
      }
      
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('favoriteBanks', JSON.stringify(next));
        }
      } catch (e) {
        console.error('Failed to save favorite banks', e);
      }
      
      return next;
    });
  }, []);

  const isFavorite = useCallback((slug: string) => favorites.some(f => f.slug === slug), [favorites]);

  return { favorites, toggleFavorite, isFavorite, loaded };
}
