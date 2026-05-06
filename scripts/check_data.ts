import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/data/routing.json', 'utf8'));
console.log(`routing.json has ${data.length} records.`);
