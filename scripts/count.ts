import fs from 'fs';

const dataStr = fs.readFileSync('./src/data/routing.json', 'utf8');
const data = JSON.parse(dataStr);

const banks = new Set();
const states = new Set();
const zips = new Set();
const routingNumbers = new Set();

data.forEach((d: any) => {
  banks.add(d.bank_name);
  states.add(d.state);
  zips.add(d.zip);
  routingNumbers.add(d.routing_number);
});

console.log('Banks:', banks.size);
console.log('States:', states.size);
console.log('Zip Codes:', zips.size);
console.log('Routing Numbers:', routingNumbers.size);
