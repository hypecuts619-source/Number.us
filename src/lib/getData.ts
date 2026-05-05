import routingJson from '../data/routing.json';
import { RoutingData } from './types';
import { generateSlug } from './generateSlug';

export const getAllRoutingData = (): RoutingData[] => {
  return routingJson as RoutingData[];
};

export const getBanks = (): string[] => {
  const data = getAllRoutingData();
  const banks = new Set(data.map((d) => d.bank_name));
  return Array.from(banks);
};

export const getRoutingByNumber = (routingNumber: string): RoutingData | undefined => {
  return getAllRoutingData().find((d) => d.routing_number === routingNumber);
};

export const getRoutingByBank = (bankSlug: string): RoutingData[] => {
  const data = getAllRoutingData();
  return data.filter((d) => generateSlug(d.bank_name) === bankSlug);
};

export const getRoutingByBankAndState = (bankSlug: string, state: string): RoutingData[] => {
  const data = getAllRoutingData();
  return data.filter(
    (d) => generateSlug(d.bank_name) === bankSlug && d.state.toLowerCase() === state.toLowerCase()
  );
};

export const getTopSearchedBanks = (): string[] => {
  // Mocking top searched based on frequency in dataset
  const data = getAllRoutingData();
  const bankCounts = data.reduce((acc, curr) => {
    acc[curr.bank_name] = (acc[curr.bank_name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(bankCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([bank]) => bank);
};

export const getRoutingByBankStateAndCity = (bankSlug: string, state: string, citySlug: string): RoutingData[] => {
  const data = getAllRoutingData();
  return data.filter(
    (d) => 
      generateSlug(d.bank_name) === bankSlug && 
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
