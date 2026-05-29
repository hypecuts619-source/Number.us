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
];

const generateSitemap = () => {
  const data = JSON.parse(fs.readFileSync(routingDataPath, 'utf8'));

  // Calculate top 50 banks by counting frequency in the dataset
  const bankCounts: Record<string, number> = {};
  data.forEach((bank: any) => {
    const slug = generateSlug(bank.bank_name);
    bankCounts[slug] = (bankCounts[slug] || 0) + 1;
  });

  // Sort by count descending, limit to 50
  const top50Banks = Object.entries(bankCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
    .map(([slug]) => slug);

  // XML Generation
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Static Routes
  for (const route of staticRoutes) {
    xml += `  <url>\n`;
    xml += `    <loc>${route.url}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${route.priority.toFixed(1)}</priority>\n`;
    xml += `  </url>\n`;
  }

  // 2. Top 50 Banks
  for (const slug of top50Banks) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/routing-number/${slug}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  // Write sitemap
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`✅ Sitemap successfully generated with priority routes and top 50 banks.`);

  // Update robots.txt
  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
  fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
  console.log('🤖 robots.txt updated');
};

generateSitemap();
