import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'routing.sqlite');

const url = 'https://www.frbservices.org/assets/financial-services/ach/routing-number-dir/fedachdir.txt';

async function syncData() {
  console.log('Downloading Federal Reserve routing data...');

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
    });

    if (!res.ok) {
      console.error(`Failed to download data: HTTP ${res.status}.`);
      console.error('FRBServices may be blocking the request. You can manually download fedachdir.txt and modify this script to read it locally.');
      return;
    }

    const data = await res.text();
    const lines = data.split('\n');
    const db = new Database(dbPath);
    
    // Disable WAL mode while creating large inserts, or use it 
    db.pragma('journal_mode = WAL');

    db.exec(`
      CREATE TABLE IF NOT EXISTS routing_numbers (
        routing_number TEXT PRIMARY KEY,
        bank_name TEXT,
        state TEXT,
        city TEXT,
        zip TEXT,
        phone TEXT,
        address TEXT,
        type TEXT,
        slug TEXT
      );
    `);

    const insert = db.prepare(`
      INSERT OR REPLACE INTO routing_numbers (routing_number, bank_name, state, city, zip, phone, address, type, slug)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let count = 0;
    
    // Wrapping inserts in transaction for performance
    const insertMany = db.transaction((linesList) => {
      for (const line of linesList) {
        if (line.length < 60) continue;
        
        const routing_number = line.substring(0, 9).trim();
        const bank_name = line.substring(9, 45).trim();
        const city = line.substring(45, 65).trim();
        const state = line.substring(65, 67).trim();
        
        insert.run(
          routing_number,
          bank_name,
          state,
          // Title case the city name
          city.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
          "Unknown", 
          "Check Online",
          "Headquarters / Main Branch",
          "ACH",
          bank_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        );
        count++;
      }
    });

    insertMany(lines);
    
    // Add indices after insert
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_bank_name ON routing_numbers(bank_name);
      CREATE INDEX IF NOT EXISTS idx_slug ON routing_numbers(slug);
      CREATE INDEX IF NOT EXISTS idx_routing ON routing_numbers(routing_number);
    `);
    
    console.log(`Successfully populated SQLite database with ${count} real routing numbers!`);
  } catch (err: any) {
    console.error('Network Error: ', err.message);
  }
}

syncData();
