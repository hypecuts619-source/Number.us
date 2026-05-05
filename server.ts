import express from 'express';
import Database from 'better-sqlite3';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize SQLite Database
  const dbPath = process.env.NODE_ENV === 'production' 
    ? path.join(process.cwd(), 'routing.sqlite') 
    : path.join(__dirname, 'routing.sqlite');
    
  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  // Create table and indices
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
    CREATE INDEX IF NOT EXISTS idx_bank_name ON routing_numbers(bank_name);
    CREATE INDEX IF NOT EXISTS idx_slug ON routing_numbers(slug);
    CREATE INDEX IF NOT EXISTS idx_routing ON routing_numbers(routing_number);
  `);

  app.use(express.json());

  // API Routes
  app.get('/api/search', (req, res) => {
    const q = req.query.q as string;
    if (!q || q.length < 2) {
      return res.json([]);
    }
    
    // Simple search logic
    let stmt;
    if (/^\d+$/.test(q)) {
      stmt = db.prepare(`SELECT * FROM routing_numbers WHERE routing_number LIKE ? LIMIT 20`);
      res.json(stmt.all(`${q}%`));
    } else {
      stmt = db.prepare(`SELECT * FROM routing_numbers WHERE bank_name LIKE ? COLLATE NOCASE LIMIT 20`);
      res.json(stmt.all(`%${q}%`));
    }
  });

  app.get('/api/lookup/:routing', (req, res) => {
    const stmt = db.prepare('SELECT * FROM routing_numbers WHERE routing_number = ?');
    const result = stmt.get(req.params.routing);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'Not found' });
    }
  });

  app.get('/api/bank/:slug', (req, res) => {
    const stmt = db.prepare('SELECT * FROM routing_numbers WHERE slug = ?');
    res.json(stmt.all(req.params.slug));
  });

  app.get('/api/bank/:slug/:state/:city', (req, res) => {
    // Basic normalized text comparison
    const stmt = db.prepare(`
      SELECT * FROM routing_numbers 
      WHERE slug = ? 
      AND LOWER(REPLACE(state, ' ', '-')) = LOWER(?) 
      AND LOWER(REPLACE(city, ' ', '-')) = LOWER(?)
    `);
    res.json(stmt.all(req.params.slug, req.params.state, req.params.city));
  });

  // Seed endpoint to generate 150k dummy records
  app.post('/api/seed-150k', (req, res) => {
    const countStmt = db.prepare('SELECT COUNT(*) as count FROM routing_numbers');
    const { count } = countStmt.get() as { count: number };
    
    if (count > 100) {
      return res.json({ message: 'Database already populated!' });
    }

    const insert = db.prepare(`
      INSERT OR REPLACE INTO routing_numbers (routing_number, bank_name, state, city, zip, phone, address, type, slug)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((records) => {
      for (const record of records) {
        insert.run(
          record.routing_number,
          record.bank_name,
          record.state,
          record.city,
          record.zip,
          record.phone,
          record.address,
          record.type,
          record.slug
        );
      }
    });

    const states = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH'];
    const cities = ['Springfield', 'Riverside', 'Centerville', 'Greenville', 'Franklin', 'Fairview'];
    const types = ['ACH', 'WIRE', 'BOTH'];
    
    const records = [];
    // Include our known test records
    records.push({
      routing_number: '121000248',
      bank_name: 'WELLS FARGO BANK, N.A.',
      state: 'CA',
      city: 'SAN FRANCISCO',
      zip: '94104',
      phone: '(800) 869-3557',
      address: '420 MONTGOMERY ST',
      type: 'BOTH',
      slug: 'wells-fargo'
    });
    // Add Chase
    records.push({
      routing_number: '021000021',
      bank_name: 'JPMORGAN CHASE BANK',
      state: 'NY',
      city: 'NEW YORK',
      zip: '10017',
      phone: '(800) 935-9935',
      address: '270 PARK AVE',
      type: 'BOTH',
      slug: 'chase'
    });
    // Add Bank of America
    records.push({
      routing_number: '026009593',
      bank_name: 'BANK OF AMERICA, N.A.',
      state: 'NC',
      city: 'CHARLOTTE',
      zip: '28255',
      phone: '(800) 432-1000',
      address: '100 N TRYON ST',
      type: 'BOTH',
      slug: 'bank-of-america'
    });

    console.log('Generating 150,000 dummy records...');
    
    // Generate ~150k numbers
    for (let i = 0; i < 150000; i++) {
        const paddedRouting = String(Math.floor(Math.random() * 900000000) + 10000000).padStart(9, '0');
        const state = states[i % states.length];
        const city = cities[i % cities.length];
        records.push({
          routing_number: paddedRouting,
          bank_name: `Community Bank of ${city} ${i}`,
          state: state,
          city: city,
          zip: String(10000 + (i % 80000)),
          phone: '(555) 123-' + String(i % 9999).padStart(4, '0'),
          address: `${100 + (i % 1000)} Main St`,
          type: types[i % 3],
          slug: `community-bank-${city}-${i}`.toLowerCase()
        });
    }

    insertMany(records);
    res.json({ message: `Successfully seeded ${records.length} records into SQLite!` });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT} with SQLite`);
  });
}

startServer();
