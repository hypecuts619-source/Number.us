import fs from 'fs';
import path from 'path';

// This is a template script to import the real Federal Reserve data CSV.
// To use this: 
// 1. Download the FedACH directory CSV.
// 2. Name it 'fed-routing.csv' and place it in the root folder.
// 3. Run: npm run import-real-data

const INPUT_CSV = path.resolve(process.cwd(), 'fed-routing.csv');
const OUTPUT_JSON = path.resolve(process.cwd(), 'src/data/routing.json');

if (!fs.existsSync(INPUT_CSV)) {
  console.error(`\n❌ ERROR: Could not find ${INPUT_CSV}`);
  console.error('Please download the Federal Reserve routing directory CSV, place it in the project root, and name it "fed-routing.csv".\n');
  console.error('Guide: Read README-DATA.md for full instructions.');
  process.exit(1);
}

const csv = fs.readFileSync(INPUT_CSV, 'utf-8');
const lines = csv.split('\n');

const realData = [];

// Very basic CSV parser (adjust indexes based on the actual Federal Reserve CSV format)
// The Federal Reserve CSV format frequently updates, but typically:
// Index 0 = Routing Number
// Index 1 = Bank Name
// Index 4 = City
// Index 5 = State Code
// Index 6 = Zip Code
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  // Split by comma, respecting quotes
  const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(col => col.replace(/^"|"$/g, '').trim());

  if (cols.length > 5) {
    realData.push({
      routing_number: cols[0],
      bank_name: cols[1],
      address: cols[3] || "Address on file", // Add actual index if address is provided
      city: cols[4] || "Unknown City",
      state: cols[5] || "XX",
      zip: cols[6] || "00000"
    });
  }
}

// Remove duplicates based on routing number if needed
const uniqueData = Array.from(new Map(realData.map(item => [item.routing_number, item])).values());

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(uniqueData, null, 2));

console.log(`\n✅ Successfully generated routing.json!`);
console.log(`Imported ${uniqueData.length} real banking records.`);
console.log(`File saved to: ${OUTPUT_JSON}\n`);
