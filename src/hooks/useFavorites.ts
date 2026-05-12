import { useState, useEffect } from 'react';

export interface FavoriteBank {
  slug: string;
  bankName: string;
  state: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteBank[]>([]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('favoriteBanks');
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      }
    } catch (e) {
      console.error('Failed to load favorite banks', e);
    }
  }, []);

  const toggleFavorite = (bank: FavoriteBank) => {
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
  };

  const isFavorite = (slug: string) => favorites.some(f => f.slug === slug);

  return { favorites, toggleFavorite, isFavorite };
}
