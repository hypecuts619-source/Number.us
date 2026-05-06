import fs from 'fs';
import path from 'path';

// Change this to where you downloaded the file
const inputFile = path.join(process.cwd(), 'FedACHdir.txt');
const outputFile = path.join(process.cwd(), 'src/data/routing.json');

async function parseFedText() {
  try {
    if (!fs.existsSync(inputFile)) {
      console.error(`Error: Could not find ${inputFile}`);
      console.error('Please download FedACHdir.txt manually from frbservices.org and place it in the root folder.');
      return;
    }

    const data = fs.readFileSync(inputFile, 'utf-8');
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
    console.log(`Successfully parsed ${inputFile}.`);
    console.log(`Saved ${parsedData.length} records to ${outputFile}!`);
  } catch (err) {
    console.error(err);
  }
}

parseFedText();
