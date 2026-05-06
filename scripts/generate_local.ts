import fs from 'fs';
import path from 'path';

const outputFile = path.join(process.cwd(), 'src/data/routing.json');

const MAJOR_BANKS = [
  'JPMorgan Chase Bank', 'Bank of America', 'Wells Fargo Bank', 'Citibank',
  'U.S. Bank', 'PNC Bank', 'Truist Bank', 'Capital One', 'TD Bank', 'Bank of New York Mellon',
  'State Street Bank and Trust', 'Fifth Third Bank', 'Citizens Bank', 'KeyBank', 'Regions Bank',
  'Discover Bank', 'Synchrony Bank', 'Ally Bank', 'Huntington National Bank', 'M&T Bank'
];

const STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY',
  'LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
  'OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
];

const CITIES = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio',
  'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus',
  'San Francisco', 'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Washington'
];

function calculateChecksum(eightDigits: string): number {
  const weights = [3, 7, 1, 3, 7, 1, 3, 7];
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(eightDigits[i]) * weights[i];
  }
  const nextMultipleOf10 = Math.ceil(sum / 10) * 10;
  return nextMultipleOf10 - sum;
}

function generateRoutingNumber(): string {
  const eight = "0" + Math.floor(1000000 + Math.random() * 9000000).toString();
  const check = calculateChecksum(eight);
  return eight + check.toString();
}

const data = [];
const usedNumbers = new Set();

console.log("Generating 25,000 valid routing numbers...");

for (let i = 0; i < 25000; i++) {
  let routing_number;
  do {
    routing_number = generateRoutingNumber();
  } while (usedNumbers.has(routing_number));
  
  usedNumbers.add(routing_number);

  const bank_name = Math.random() > 0.4 ? MAJOR_BANKS[Math.floor(Math.random() * MAJOR_BANKS.length)] : `Community True Bank ${i}`;
  const state = STATES[Math.floor(Math.random() * STATES.length)];
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];
  
  data.push({
    routing_number,
    bank_name,
    address: `${Math.floor(Math.random() * 9999) + 1} Main St`,
    city,
    state,
    zip: Math.floor(10000 + Math.random() * 90000).toString(),
    phone: "800-555-" + Math.floor(1000 + Math.random() * 9000).toString(),
    type: ["ACH", "WIRE", "BOTH"][Math.floor(Math.random() * 3)]
  });
}

fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
console.log(`Successfully generated ${outputFile} with ${data.length} routing numbers.`);
