export function getFederalReserveDistrict(routingNumber: string): string {
  if (!routingNumber || routingNumber.length < 2) return 'Unknown';
  let prefixStr = routingNumber.substring(0, 2);
  let prefix = parseInt(prefixStr, 10);
  
  // Handling standard prefixes 01-12, thrift/credit union prefixes 21-32 are also mapped
  // E.g. 21 is Boston, 22 is NY, etc.
  if (prefix > 20 && prefix <= 32) {
      prefix -= 20;
  } else if (prefix > 60 && prefix <= 72) {
      // electronic routing numbers
      prefix -= 60; 
  }
  
  switch (prefix) {
    case 1: return 'Boston';
    case 2: return 'New York';
    case 3: return 'Philadelphia';
    case 4: return 'Cleveland';
    case 5: return 'Richmond';
    case 6: return 'Atlanta';
    case 7: return 'Chicago';
    case 8: return 'St. Louis';
    case 9: return 'Minneapolis';
    case 10: return 'Kansas City';
    case 11: return 'Dallas';
    case 12: return 'San Francisco';
    default: return 'the Federal Reserve'; // Fallback
  }
}
