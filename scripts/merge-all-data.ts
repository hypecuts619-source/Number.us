
import fs from 'fs';
import https from 'https';
import path from 'path';
import { parse } from 'csv-parse/sync';

const outputFile = path.join(process.cwd(), 'public/data/routing.json');

function toTitleCase(str: string) {
    if (!str) return '';
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

async function fetchURL(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
                return;
            }
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => resolve(data));
            res.on('error', reject);
        }).on('error', reject);
    });
}

async function mergeData() {
    console.log('Starting comprehensive data merge...');
    
    // 1. Data Store
    const dataMap = new Map();

    // 2. Fetch SMWA ACH
    console.log('Fetching SMWA ACH...');
    try {
        const achRaw = await fetchURL('https://raw.githubusercontent.com/smwa/routing-numbers/master/fedach_participants.json');
        const achData = JSON.parse(achRaw);
        achData.forEach((item: any) => {
            const rn = item.routingNumber;
            if (!rn) return;
            dataMap.set(rn, {
                routing_number: rn,
                bank_name: toTitleCase(item.name),
                city: toTitleCase(item.city),
                state: item.state,
                type: 'ACH',
                address: 'Main Office',
                phone: 'Check Online',
                zip: 'Unknown'
            });
        });
        console.log(`SMWA ACH: Processed ${achData.length} records.`);
    } catch (e) {
        console.error('SMWA ACH failed:', e.message);
    }

    // 3. Fetch SMWA Wire
    console.log('Fetching SMWA Wire...');
    try {
        const wireRaw = await fetchURL('https://raw.githubusercontent.com/smwa/routing-numbers/master/fedwire_participants.json');
        const wireData = JSON.parse(wireRaw);
        wireData.forEach((item: any) => {
            const rn = item.routingNumber;
            if (!rn) return;
            const existing = dataMap.get(rn);
            if (existing) {
                existing.type = existing.type === 'ACH' ? 'Fedwire / ACH' : 'Fedwire';
            } else {
                dataMap.set(rn, {
                    routing_number: rn,
                    bank_name: toTitleCase(item.name),
                    city: toTitleCase(item.city),
                    state: item.state,
                    type: 'Fedwire',
                    address: 'Main Office',
                    phone: 'Check Online',
                    zip: 'Unknown'
                });
            }
        });
        console.log(`SMWA Wire: Processed ${wireData.length} records.`);
    } catch (e) {
        console.error('SMWA Wire failed:', e.message);
    }

    // 4. Fetch David Sadler CSV (more detailed names sometimes)
    console.log('Fetching David Sadler CSV...');
    try {
        const csvRaw = await fetchURL('https://raw.githubusercontent.com/davidtsadler/aba-routing-numbers/master/aba-routing-numbers.csv');
        const records = parse(csvRaw, {
            columns: true,
            skip_empty_lines: true
        });
        
        records.forEach((record: any) => {
            // Check possible column names (CSV might have different headers)
            const rn = record.routing_number || record.ABA || record['Routing Number'];
            if (!rn) return;
            
            const bankName = record.bank_name || record.Bank || record.Name;
            const city = record.city || record.City;
            const state = record.state || record.State;
            const zip = record.zip || record.Zip || record['Zip Code'];
            const address = record.address || record.Address;

            const existing = dataMap.get(rn);
            if (existing) {
                // Enrich existing record with better details if available
                if (zip && zip !== 'Unknown') existing.zip = zip;
                if (address && address !== 'Main Office') existing.address = address;
                // If existing bank name is very short, maybe this one is better?
                if (bankName && bankName.length > existing.bank_name.length) {
                    existing.bank_name = toTitleCase(bankName);
                }
            } else {
                dataMap.set(rn, {
                    routing_number: rn,
                    bank_name: toTitleCase(bankName),
                    city: toTitleCase(city),
                    state: state,
                    type: 'ACH', // Default
                    address: address || 'Main Office',
                    phone: 'Check Online',
                    zip: zip || 'Unknown'
                });
            }
        });
        console.log(`David Sadler: Processed ${records.length} records.`);
    } catch (e) {
        console.error('David Sadler CSV failed:', e.message);
    }

    // 5. Finalize and Save
    const finalData = Array.from(dataMap.values());
    finalData.sort((a, b) => a.routing_number.localeCompare(b.routing_number));

    fs.writeFileSync(outputFile, JSON.stringify(finalData));
    console.log(`\nSuccess!`);
    console.log(`Total Records: ${finalData.length}`);
    
    // Stats
    const states = new Set(finalData.map(d => d.state));
    console.log(`Coverage: ${states.size} states covered.`);
}

mergeData();
