
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.join(process.cwd(), 'public', 'data', 'routing.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const stateCounts: Record<string, number> = {};

data.forEach((item: any) => {
    stateCounts[item.state] = (stateCounts[item.state] || 0) + 1;
});

const sortedStates = Object.entries(stateCounts).sort((a, b) => b[1] - a[1]);

console.log('Total records:', data.length);
console.log('Records per state:');
sortedStates.forEach(([state, count]) => {
    console.log(`${state}: ${count}`);
});
