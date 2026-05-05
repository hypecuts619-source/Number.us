import fs from 'fs';
import path from 'path';

// Note: Running this requires node with module support or tsx
const routingDataPath = path.resolve('src/data/routing.json');
const sitemapPath = path.resolve('public/sitemap.xml');

const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const generateSitemap = () => {
  const data = JSON.parse(fs.readFileSync(routingDataPath, 'utf8'));
  const baseUrl = 'https://usroutingnumber.com';
  
  let urls = [
    `${baseUrl}/`,
    `${baseUrl}/major-banks`,
    `${baseUrl}/how-to-wire-money`,
    `${baseUrl}/international-wire-guide`,
    `${baseUrl}/how-to-find-routing-number`,
    `${baseUrl}/check-digit-calculator`
  ];

  const banks = new Set();
  
  data.forEach((bank) => {
    const slug = generateSlug(bank.bank_name);
    banks.add(slug);
    
    // Add bank+state
    urls.push(`${baseUrl}/routing-number/${slug}/${bank.state.toLowerCase()}`);
    // Add bank+state+city
    urls.push(`${baseUrl}/routing-number/${slug}/${bank.state.toLowerCase()}/${generateSlug(bank.city)}`);
    // Add lookup
    urls.push(`${baseUrl}/lookup/${bank.routing_number}`);
  });

  // Add bank overviews
  banks.forEach(slug => {
    urls.push(`${baseUrl}/routing-number/${slug}`);
  });

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log(`Sitemap generated with ${urls.length} URLs at ${sitemapPath}`);
};

generateSitemap();
