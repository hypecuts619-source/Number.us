import fs from 'fs';
import path from 'path';

const baseUrl = 'https://usroutingnumber.com';
const routingDataPath = path.resolve('public/data/routing.json');
const sitemapPath = path.resolve('public/sitemap.xml');
const robotsPath = path.resolve('public/robots.txt');

const generateSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const staticRoutes = [
  { url: `${baseUrl}/`, priority: 1.0 },
  { url: `${baseUrl}/states`, priority: 0.9 },
  { url: `${baseUrl}/banks`, priority: 0.9 },
  { url: `${baseUrl}/how-to-wire-money`, priority: 0.9 },
  { url: `${baseUrl}/international-wire-guide`, priority: 0.9 },
  { url: `${baseUrl}/reports/2026-us-credit-union-report`, priority: 0.9 },
  { url: `${baseUrl}/blog/nacha-ach-fraud-prevention-mandate-2026`, priority: 0.9 },
  { url: `${baseUrl}/blog/chase-routing-number`, priority: 0.9 },
  { url: `${baseUrl}/blog/wells-fargo-routing-number`, priority: 0.9 },
  { url: `${baseUrl}/blog/bank-of-america-routing-number`, priority: 0.9 },
  { url: `${baseUrl}/blog/what-is-routing-number`, priority: 0.9 },
  { url: `${baseUrl}/blog/chime-routing-number`, priority: 0.9 },
  { url: `${baseUrl}/blog/chase-vs-wells-fargo-routing`, priority: 0.9 },
  { url: `${baseUrl}/blog/credit-union-routing-numbers`, priority: 0.9 },
  { url: `${baseUrl}/blog/aba-vs-ach-routing-numbers`, priority: 0.9 },
  { url: `${baseUrl}/blog/best-credit-unions-in-us`, priority: 0.9 },
  { url: `${baseUrl}/blog/direct-deposit-setup-guide`, priority: 0.9 },
  { url: `${baseUrl}/how-to-find-routing-number`, priority: 0.8 },
  { url: `${baseUrl}/zelle-routing-number`, priority: 0.8 },
  { url: `${baseUrl}/routing-number-validator`, priority: 0.9 },
  { url: `${baseUrl}/routing-number-changes-2026`, priority: 0.8 },
  { url: `${baseUrl}/about-us`, priority: 0.5 },
  { url: `${baseUrl}/contact-us`, priority: 0.5 },
  { url: `${baseUrl}/blog`, priority: 0.8 },
  { url: `${baseUrl}/check-digit-calculator`, priority: 0.8 },
  { url: `${baseUrl}/terms-of-service`, priority: 0.3 },
  { url: `${baseUrl}/privacy-policy`, priority: 0.3 },
  { url: `${baseUrl}/routing-number-vs-account-number`, priority: 0.8 },
  { url: `${baseUrl}/what-is-a-routing-number`, priority: 0.8 },
  { url: `${baseUrl}/aba-routing-number`, priority: 0.8 },
  { url: `${baseUrl}/direct-deposit-routing-number`, priority: 0.8 },
  { url: `${baseUrl}/find-routing-number-on-check`, priority: 0.8 },
  { url: `${baseUrl}/routing-number-lookup`, priority: 0.9 },
  { url: `${baseUrl}/regional-banks`, priority: 0.8 },
  { url: `${baseUrl}/credit-unions`, priority: 0.8 },
  { url: `${baseUrl}/major-banks`, priority: 0.8 },
  { url: `${baseUrl}/banks/a-z`, priority: 0.7 },
  { url: `${baseUrl}/webmaster-tools`, priority: 0.5 }
];

const generateSitemap = () => {
  const data = JSON.parse(fs.readFileSync(routingDataPath, 'utf8'));

  const urls = new Set<string>();

  // Extract from data
  data.forEach((bank: any) => {
    if (!bank.bank_name || !bank.routing_number) return;
    
    const slug = generateSlug(bank.bank_name);
    const rn = bank.routing_number;
    
    urls.add(`${baseUrl}/routing-number/${slug}`);
    urls.add(`${baseUrl}/lookup/${rn}`);
    
    if (bank.state) {
      const state = bank.state.toLowerCase();
      urls.add(`${baseUrl}/states/${state}`);
      urls.add(`${baseUrl}/routing-number/${slug}/${state}`);
      
      if (bank.city) {
        const city = generateSlug(bank.city);
        urls.add(`${baseUrl}/routing-number/${slug}/${state}/${city}`);
      }
    }
  });

  const date = new Date().toISOString().split('T')[0];
  const allPages: string[] = [];

  // 1. Static Routes
  for (const route of staticRoutes) {
    let xml = `  <url>\n`;
    xml += `    <loc>${route.url}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${route.priority.toFixed(1)}</priority>\n`;
    xml += `  </url>\n`;
    allPages.push(xml);
  }

  // 2. Dynamic Routes
  for (const url of Array.from(urls)) {
    let priority = 0.6;
    if (url.includes('/lookup/')) priority = 0.8;
    if (url.includes('/routing-number/') && !url.includes('/states/')) priority = 0.7;

    let xml = `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
    allPages.push(xml);
  }

  const chunkSize = 500;
  const numChunks = Math.ceil(allPages.length / chunkSize);
  
  // Clean up existing sitemap files
  const publicDir = path.resolve('public');
  const files = fs.readdirSync(publicDir);
  files.forEach(file => {
    if (file.startsWith('sitemap') && file.endsWith('.xml')) {
      fs.unlinkSync(path.join(publicDir, file));
    }
  });

  // Write chunk files
  for (let i = 0; i < numChunks; i++) {
    const chunkUrls = allPages.slice(i * chunkSize, (i + 1) * chunkSize);
    let chunkXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    chunkXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    chunkXml += chunkUrls.join('');
    chunkXml += `</urlset>`;
    
    fs.writeFileSync(path.resolve(`public/sitemap-${i + 1}.xml`), chunkXml, 'utf8');
  }

  // Write Sitemap Index
  let indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  indexXml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  for (let i = 0; i < numChunks; i++) {
    indexXml += `  <sitemap>\n`;
    indexXml += `    <loc>${baseUrl}/sitemap-${i + 1}.xml</loc>\n`;
    indexXml += `    <lastmod>${date}</lastmod>\n`;
    indexXml += `  </sitemap>\n`;
  }
  
  indexXml += `</sitemapindex>`;
  fs.writeFileSync(sitemapPath, indexXml, 'utf8');

  console.log(`✅ Sitemap successfully split into ${numChunks} files with a total of ${allPages.length} pages (500 pages per file).`);
};

generateSitemap();
