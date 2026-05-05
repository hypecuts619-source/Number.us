import { RoutingData } from './types';

const API_BASE = '/api';

export const searchRoutingNumbers = async (query: string): Promise<RoutingData[]> => {
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  return res.json();
};

export const getRoutingByNumber = async (routingNumber: string): Promise<RoutingData | null> => {
  const res = await fetch(`${API_BASE}/lookup/${routingNumber}`);
  if (!res.ok) return null;
  return res.json();
};

export const getRoutingByBank = async (bankSlug: string): Promise<RoutingData[]> => {
  const res = await fetch(`${API_BASE}/bank/${bankSlug}`);
  if (!res.ok) return [];
  return res.json();
};

export const getRoutingByBankStateAndCity = async (bankSlug: string, state: string, city: string): Promise<RoutingData[]> => {
  const res = await fetch(`${API_BASE}/bank/${bankSlug}/${state}/${city}`);
  if (!res.ok) return [];
  return res.json();
};

export const pingSeeder = async (): Promise<void> => {
  try {
    await fetch(`${API_BASE}/seed-25k`, { method: 'POST' });
  } catch (e) {
    console.error('Seed failed', e);
  }
};
