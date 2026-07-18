import fs from 'fs';
import https from 'https';
import path from 'path';
import zipcodes from 'zipcodes';

async function downloadText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 400) {
        resolve("");
        return;
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve(data);
      });
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
    console.log('Downloading latest ACH participants from moov-io repository...');
    const achText = await downloadText('https://raw.githubusercontent.com/moov-io/fed/master/data/FedACHdir.txt');
    
    console.log('Downloading latest Fedwire participants from moov-io repository...');
    const wireText = await downloadText('https://raw.githubusercontent.com/moov-io/fed/master/data/fpddir.txt');

    if (!achText || !wireText) {
      console.warn('Could not fetch latest routing data from the remote repository (it may be down or moved).');
      console.warn('Will use existing routing data if available.');
      return;
    }

    const map = new Map();

    const achLines = achText.split('\n');
    let achCount = 0;
    achLines.forEach(line => {
      if (line.length < 130) return;
      const rn = line.substring(0, 9);
      const name = line.substring(35, 71).trim();
      const cityRaw = line.substring(107, 127).trim();
      const state = line.substring(127, 129);
      
      const titleCaseCity = cityRaw.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      const zips = zipcodes.lookupByName(titleCaseCity, state);
      const resolvedZip = zips && zips.length > 0 ? zips[0].zip : 'Unknown';
      
      if (!map.has(rn)) {
        map.set(rn, {
          routing_number: rn,
          bank_name: name.replace(/\s+/g, ' '),
          city: titleCaseCity,
          state: state,
          type: 'ACH',
          zip: resolvedZip === 'Unknown' ? '' : resolvedZip,
        });
        achCount++;
      }
    });

    const wireLines = wireText.split('\n');
    let wireCount = 0;
    wireLines.forEach(line => {
      if (line.length < 70) return;
      const rn = line.substring(0, 9);
      const name = line.substring(27, 63).trim();
      const state = line.substring(63, 65);
      const cityRaw = line.substring(65, 90).trim();
      
      if (map.has(rn)) {
        map.get(rn).type = 'BOTH';
        wireCount++;
      } else {
        const titleCaseCity = cityRaw.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        const zips = zipcodes.lookupByName(titleCaseCity, state);
        const resolvedZip = zips && zips.length > 0 ? zips[0].zip : 'Unknown';
        
        map.set(rn, {
          routing_number: rn,
          bank_name: name.replace(/\s+/g, ' '),
          city: titleCaseCity,
          state: state,
          type: 'WIRE',
          zip: resolvedZip === 'Unknown' ? '' : resolvedZip,
        });
        wireCount++;
      }
    });

    console.log(`Parsed ${achCount} ACH records and ${wireCount} Wire records.`);

    // Apply Fed Reserve overrides
    frbOverrides.forEach(over => {
       const zips = zipcodes.lookupByName(over.city, over.state);
       const resolvedZip = zips && zips.length > 0 ? zips[0].zip : 'Unknown';
       map.set(over.rn, {
          routing_number: over.rn,
          bank_name: over.name,
          city: over.city,
          state: over.state,
          type: 'Fedwire / ACH',
          zip: resolvedZip === 'Unknown' ? '' : resolvedZip
       });
    });

    const outputPath = path.join(process.cwd(), 'public/data/routing.json');
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputPath, JSON.stringify(Array.from(map.values())));

    console.log(`Successfully saved ${map.size} unique records to public/data/routing.json!`);
    console.log('You can now rebuild the application to deploy the new data.');
  } catch (e) {
    console.error('Error updating data:', e);
  }
}

updateData();
