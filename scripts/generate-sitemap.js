import fs from 'fs';
import path from 'path';

// Note: Running this requires node with module support or tsx
const routingDataPath = path.resolve('public/data/routing.json');
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
    `${baseUrl}/states`,
    `${baseUrl}/major-banks`,
    `${baseUrl}/what-is-a-routing-number`,
    `${baseUrl}/aba-routing-number`,
    `${baseUrl}/routing-number-vs-account-number`,
    `${baseUrl}/direct-deposit-routing-number`,
    `${baseUrl}/find-routing-number-on-check`,
    `${baseUrl}/routing-number-lookup`,
    `${baseUrl}/how-to-wire-money`,
    `${baseUrl}/international-wire-guide`,
    `${baseUrl}/how-to-find-routing-number`,
    `${baseUrl}/zelle-routing-number`,
    `${baseUrl}/routing-number-validator`,
    `${baseUrl}/routing-number-changes-2026`,
    `${baseUrl}/about-us`,
    `${baseUrl}/blog`,
    `${baseUrl}/check-digit-calculator`,
    `${baseUrl}/terms-of-service`,
    `${baseUrl}/privacy-policy`
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

  // Make urls unique just in case
  urls = [...new Set(urls)];

  const MAX_URLS_PER_SITEMAP = 45000;
  const numSitemaps = Math.ceil(urls.length / MAX_URLS_PER_SITEMAP);

  const sitemapIndexUrls = [];

  for (let i = 0; i < numSitemaps; i++) {
    const chunk = urls.slice(i * MAX_URLS_PER_SITEMAP, (i + 1) * MAX_URLS_PER_SITEMAP);
    const sitemapName = `sitemap-${i + 1}.xml`;
    const chunkPath = path.resolve(`public/${sitemapName}`);
    
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${chunk.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
  </url>`).join('')}
</urlset>`;

    fs.writeFileSync(chunkPath, sitemapContent);
    sitemapIndexUrls.push(`${baseUrl}/${sitemapName}`);
    console.log(`Generated ${sitemapName} with ${chunk.length} URLs`);
  }

  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapIndexUrls.map(url => `
  <sitemap>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('')}
</sitemapindex>`;

  fs.writeFileSync(sitemapPath, sitemapIndexContent);
  console.log(`Sitemap index generated with ${numSitemaps} sitemaps at ${sitemapPath}`);

  // Create robots.txt
  const robotsPath = path.resolve('public/robots.txt');
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
  fs.writeFileSync(robotsPath, robotsTxt);
  console.log('🤖 robots.txt generated successfully');
};

generateSitemap();
