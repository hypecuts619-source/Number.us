import fs from 'fs';
import https from 'https';
import path from 'path';

async function download(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(JSON.parse(data)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

const frbOverrides = [
  { rn: "011000015", short: "FRB-BOS", city: "Boston", name: "FEDERAL RESERVE BANK OF BOSTON", state: "MA" },
  { rn: "021001208", short: "FRB NYC", city: "New York", name: "FEDERAL RESERVE BANK OF NEW YORK", state: "NY" },
  { rn: "031000040", short: "FRB PHIL", city: "Philadelphia", name: "FEDERAL RESERVE BANK OF PHILADELPHIA", state: "PA" },
  { rn: "041000014", short: "FRB CLE", city: "Cleveland", name: "FEDERAL RESERVE BANK OF CLEVELAND", state: "OH" },
  { rn: "051000033", short: "FRB RICH", city: "Richmond", name: "FEDERAL RESERVE BANK OF RICHMOND", state: "VA" },
  { rn: "051099992", short: "FRB RICH GOVT AGCY", city: "Richmond", name: "FRB RICH GOVT AGCY", state: "VA" },
  { rn: "052000278", short: "FRB BALT", city: "Baltimore", name: "BALTIMORE - FRB RICHMOND", state: "MD" },
  { rn: "053000206", short: "FRB CHAR", city: "Charlotte", name: "CHARLOTTE - FRB RICHMOND", state: "NC" },
  { rn: "061000146", short: "FRB ATL", city: "Atlanta", name: "FEDERAL RESERVE BANK OF ATLANTA", state: "GA" },
  { rn: "062000190", short: "FRB BHAM", city: "Birmingham", name: "BIRMINGHAM - FRB ATLANTA", state: "AL" },
  { rn: "063000199", short: "FRB JAX", city: "Jacksonville", name: "JACKSONVILLE - FRB ATLANTA", state: "FL" },
  { rn: "065000210", short: "FRB NEW ORL", city: "New Orleans", name: "NEW ORLEANS - FRB ATLANTA", state: "LA" },
  { rn: "066000109", short: "FRB MIAMI", city: "Miami", name: "MIAMI - FRB ATLANTA", state: "FL" },
  { rn: "071000301", short: "FRB CHGO", city: "Chicago", name: "FEDERAL RESERVE BANK OF CHICAGO", state: "IL" },
  { rn: "081000045", short: "FRB STL", city: "St. Louis", name: "FEDERAL RESERVE BANK OF ST. LOUIS", state: "MO" },
  { rn: "091000080", short: "FRB MPLS", city: "Minneapolis", name: "FEDERAL RESERVE BANK OF MINNEAPOLIS", state: "MN" },
  { rn: "101000048", short: "FRB KC", city: "Kansas City", name: "FEDERAL RESERVE BANK OF KANSAS CITY", state: "MO" },
  { rn: "102000199", short: "FRB DVR", city: "Denver", name: "DENVER - FRB KANSAS CITY", state: "CO" },
  { rn: "111000038", short: "FRB DAL", city: "Dallas", name: "FEDERAL RESERVE BANK OF DALLAS", state: "TX" },
  { rn: "112000011", short: "FRB EL PASO", city: "El Paso", name: "EL PASO - FRB DALLAS", state: "TX" },
  { rn: "113000049", short: "FRB HOUSTON", city: "Houston", name: "HOUSTON - FRB DALLAS", state: "TX" },
  { rn: "114000721", short: "FRB SAN ANTONIO", city: "San Antonio", name: "SAN ANTONIO - FRB DALLAS", state: "TX" },
  { rn: "121000374", short: "FRB SF", city: "San Francisco", name: "FEDERAL RESERVE BANK OF SAN FRANCISCO", state: "CA" }
];

async function updateData() {
  try {
    console.log('Downloading latest ACH participants from community repository...');
    const ach = await download('https://raw.githubusercontent.com/smwa/routing-numbers/master/fedach_participants.json');
    
    console.log('Downloading latest Fedwire participants from community repository...');
    const wire = await download('https://raw.githubusercontent.com/smwa/routing-numbers/master/fedwire_participants.json');

    console.log(`Downloaded ${ach.length} ACH records and ${wire.length} Wire records.`);

    const map = new Map();

    const allRecords = [...ach, ...wire];
    allRecords.forEach((item) => {
      const rn = item.routingNumber;
      if (!map.has(rn)) {
        map.set(rn, {
          routing_number: rn,
          bank_name: item.name.replace(/\s+/g, ' '),
          city: item.city
            .split(' ')
            .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' '),
          state: item.state,
          type: item.fundsTransferStatus ? 'Wire' : 'ACH',
          address: 'Headquarters / Main Branch',
          phone: 'Check Online',
          zip: 'Unknown',
        });
      }
    });

    // Apply Fed Reserve overrides
    frbOverrides.forEach(over => {
       map.set(over.rn, {
          routing_number: over.rn,
          bank_name: over.name,
          city: over.city,
          state: over.state,
          type: 'Fedwire / ACH',
          address: 'Federal Reserve Bank',
          phone: 'Check Online',
          zip: 'Unknown'
       });
    });

    const outputPath = path.join(process.cwd(), 'src/data/routing.json');
    fs.writeFileSync(outputPath, JSON.stringify(Array.from(map.values()), null, 2));

    console.log(`Successfully saved ${map.size} unique records to src/data/routing.json!`);
    console.log('You can now rebuild the application to deploy the new data.');
  } catch (e) {
    console.error('Error updating data:', e);
  }
}

updateData();
