import fs from 'fs';
const data = JSON.parse(fs.readFileSync('public/data/routing.json', 'utf8'));

const rtns = new Set();
data.forEach((r: any) => rtns.add(r.routing_number));

console.log(`Total records: ${data.length}`);
console.log(`Unique routing numbers: ${rtns.size}`);
