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

  // XML Generation
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const date = new Date().toISOString().split('T')[0];

  // 1. Static Routes
  for (const route of staticRoutes) {
    xml += `  <url>\n`;
    xml += `    <loc>${route.url}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${route.priority.toFixed(1)}</priority>\n`;
    xml += `  </url>\n`;
  }

  // 2. Dynamic Routes
  for (const url of Array.from(urls)) {
    let priority = 0.6;
    if (url.includes('/lookup/')) priority = 0.8;
    if (url.includes('/routing-number/') && !url.includes('/states/')) priority = 0.7;

    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  // Write sitemap
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`✅ Sitemap successfully generated with ${staticRoutes.length + urls.size} pages.`);

  // Update robots.txt
  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
  fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
  console.log('🤖 robots.txt updated');
};

generateSitemap();
