import { useState, useEffect } from 'react';

export interface ViewedItem {
  routingNumber: string;
  bankName: string;
  timestamp: number;
}

export function useRecentlyViewed() {
  const [items, setItems] = useState<ViewedItem[]>([]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('recentlyViewed');
        if (stored) {
          setItems(JSON.parse(stored));
        }
      }
    } catch (e) {
      console.error('Failed to load recently viewed items', e);
    }
  }, []);

  const addItem = (routingNumber: string, bankName: string) => {
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
  };

  return { items, addItem };
}
