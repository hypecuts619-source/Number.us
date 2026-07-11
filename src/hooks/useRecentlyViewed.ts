import { useState, useCallback } from 'react';

export interface ViewedItem {
  routingNumber: string;
  bankName: string;
  timestamp: number;
}

function getInitialRecentlyViewed(): ViewedItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load recently viewed items', e);
  }
  return [];
}

export function useRecentlyViewed() {
  const [items, setItems] = useState<ViewedItem[]>(getInitialRecentlyViewed);
  const [loaded, setLoaded] = useState(true);

  const addItem = useCallback((routingNumber: string, bankName: string) => {
    setItems(prevItems => {
      const newItem = { routingNumber, bankName, timestamp: Date.now() };
      // Remove if exists
      const filtered = prevItems.filter(item => item.routingNumber !== routingNumber);
      // Add to front, keep max 5
      const newItems = [newItem, ...filtered].slice(0, 5);
      
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('recentlyViewed', JSON.stringify(newItems));
        }
      } catch (e) {
        console.error('Failed to save recently viewed items', e);
      }
      
      return newItems;
    });
  }, []);

  return { items, addItem, loaded };
}
