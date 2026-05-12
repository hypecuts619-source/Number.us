import { RoutingData } from './types';
import { generateSlug } from './generateSlug';

declare global {
  interface Window {
    __ROUTING_DATA__: RoutingData[];
  }
}

let ssrData: RoutingData[] = [];

export const setSSRData = (data: RoutingData[]) => {
  ssrData = data;
};

export const getAllRoutingData = (): RoutingData[] => {
  if (typeof window !== 'undefined') {
    return window.__ROUTING_DATA__ || ssrData || [];
  }
  return ssrData || [];
};

export const getBanks = (): string[] => {
  const data = getAllRoutingData();
  const banks = new Set(data.map((d) => d.bank_name));
  return Array.from(banks);
};

export const getRoutingByNumber = (routingNumber: string): RoutingData | undefined => {
  return getAllRoutingData().find((d) => d.routing_number === routingNumber);
};

export const isBankSlugMatch = (dbBankName: string, searchSlug: string): boolean => {
  const dbSlug = generateSlug(dbBankName);
  if (dbSlug === searchSlug) return true;
  
  // Normalize by removing all dashes for a deep comparison
  const normalizedDb = dbSlug.replace(/-/g, '');
  const normalizedSearch = searchSlug.replace(/-/g, '');
  
  if (normalizedDb === normalizedSearch) return true;
  
  // Special handling for JPMorgan which commony varies between jpmorgan and jp-morgan
  if (normalizedSearch.includes('jpmorgan') || normalizedSearch.includes('chase')) {
    if (normalizedDb.includes('jpmorgan') || normalizedDb.includes('chase')) {
      return true;
    }
  }

  // Handle Bank of America
  if (normalizedSearch.includes('bankofamerica') || normalizedSearch === 'boa') {
    if (normalizedDb.includes('bankofamerica')) return true;
  }

  // Handle Wells Fargo
  if (normalizedSearch.includes('wellsfargo')) {
    if (normalizedDb.includes('wellsfargo')) return true;
  }

  // Fallback to prefix matching with known common suffixes
  const rem = dbSlug.replace(searchSlug + '-', '');
  return dbSlug.startsWith(searchSlug + '-') && ['na', 'national-association', 'inc', 'llc', 'corp', 'company', 'bank', 'bank-na', 'bank-national-association', 'federal-credit-union', 'fcu', 'credit-union', 'cu'].includes(rem);
};

export const getRoutingByBank = (bankSlug: string): RoutingData[] => {
  const data = getAllRoutingData();
  return data.filter((d) => isBankSlugMatch(d.bank_name, bankSlug));
};

export const getRoutingByBankAndState = (bankSlug: string, state: string): RoutingData[] => {
  const data = getAllRoutingData();
  return data.filter(
    (d) => isBankSlugMatch(d.bank_name, bankSlug) && d.state.toLowerCase() === state.toLowerCase()
  );
};

let topBanksCache: string[] | null = null;
export const getTopSearchedBanks = (): string[] => {
  if (topBanksCache) return topBanksCache;
  
  // Hardcoded top banks to save massive JS thread blocking during render
  // These represent the largest banks with most branching/routing codes.
  topBanksCache = [
    "JPMorgan Chase Bank, National Association",
    "Wells Fargo Bank, National Association",
    "Bank of America, National Association",
    "U.S. Bank National Association",
    "PNC Bank, National Association",
    "Truist Bank",
    "The Huntington National Bank",
    "Fifth Third Bank, National Association",
    "KeyBank National Association",
    "Regions Bank",
    "Citizens Bank, National Association",
    "The Bank of New York Mellon",
    "M&T Bank",
    "BMO Bank N.A.",
    "First Citizens Bank & Trust Company",
    "Capital One, National Association",
    "First National Bank of Pennsylvania",
    "Zions Bancorporation, N.A.",
    "SouthState Bank, National Association",
    "Santander Bank, N.A."
  ];
  return topBanksCache;
};

export const getRoutingByBankStateAndCity = (bankSlug: string, state: string, citySlug: string): RoutingData[] => {
  const data = getAllRoutingData();
  return data.filter(
    (d) => 
      isBankSlugMatch(d.bank_name, bankSlug) && 
      d.state.toLowerCase() === state.toLowerCase() &&
      generateSlug(d.city) === citySlug
  );
};

export const getOtherBanksInState = (state: string, excludeBank: string, limit = 5): string[] => {
  const data = getAllRoutingData();
  const banks = new Set(
    data
      .filter((d) => d.state.toLowerCase() === state.toLowerCase() && d.bank_name !== excludeBank)
      .map((d) => d.bank_name)
  );
  return Array.from(banks).slice(0, limit);
};

export const getRelatedBanks = (bankName: string, limit = 8): string[] => {
  const data = getAllRoutingData();
  const allBanks = Array.from(new Set(data.map(d => d.bank_name)));
  
  // Try to find banks that start with the same letter
  const firstLetter = bankName.charAt(0).toLowerCase();
  let related = allBanks.filter(b => b.toLowerCase().startsWith(firstLetter) && b !== bankName);
  
  // Pad with top searched if we don't have enough
  if (related.length < limit) {
    const topSearched = getTopSearchedBanks().filter(b => b !== bankName && !related.includes(b));
    related = [...related, ...topSearched];
  }
  
  return related.slice(0, limit);
};

export const getStateNames = (): Record<string, string> => {
  return {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
  };
};

export const getStateFullName = (abbr: string): string => {
  const names = getStateNames();
  return names[abbr.toUpperCase()] || abbr;
};
