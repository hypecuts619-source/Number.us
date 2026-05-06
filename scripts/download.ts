import fs from 'fs';
import path from 'path';

const url = 'https://www.frbservices.org/assets/financial-services/ach/routing-number-dir/fedachdir.txt';
const outputFile = path.join(process.cwd(), 'src/data/routing.json');

async function download() {
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) {
      console.error('Failed to download: Status', res.status);
      return;
    }
    const data = await res.text();
    const lines = data.split(/\r?\n/);
    const parsedData = [];
    for (const line of lines) {
      if (line.length < 60) continue;
      const routing_number = line.substring(0, 9).trim();
      const bank_name = line.substring(9, 45).trim();
      const city = line.substring(45, 65).trim();
      const state = line.substring(65, 67).trim();
      
      parsedData.push({
        routing_number,
        bank_name,
        address: "Headquarters / Main Branch",
        city: city.charAt(0).toUpperCase() + city.slice(1).toLowerCase(),
        state,
        zip: "Unknown",
        phone: "Check Online",
        type: "ACH"
      });
    }
    fs.writeFileSync(outputFile, JSON.stringify(parsedData, null, 2));
    console.log(`Successfully generated ${outputFile} with ${parsedData.length} routing numbers.`);
  } catch (err) {
    console.error(err);
  }
}

download();
