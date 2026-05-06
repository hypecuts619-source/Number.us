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

    const outputPath = path.join(process.cwd(), 'src/data/routing.json');
    fs.writeFileSync(outputPath, JSON.stringify(Array.from(map.values()), null, 2));

    console.log(`Successfully saved ${map.size} unique records to src/data/routing.json!`);
    console.log('You can now rebuild the application to deploy the new data.');
  } catch (e) {
    console.error('Error updating data:', e);
  }
}

updateData();
