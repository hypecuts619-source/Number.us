import fs from 'fs';

const DOMAIN = 'https://usroutingnumber.com';

const urls = [
  '/',
  '/aba-routing-number',
  '/states',
  '/what-is-a-routing-number',
  '/routing-number-vs-account-number',
  '/how-to-find-routing-number',
  '/find-routing-number-on-check',
  '/direct-deposit-routing-number',
  '/how-to-wire-money',
  '/international-wire-transfer-routing-number',
  '/check-digit-calculator',
  '/major-banks',
  '/routing-number-lookup',
  '/terms-of-service',
  '/privacy-policy'
];

const STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

STATES.forEach(state => {
  urls.push(`/states/${state.toLowerCase()}`);
});

const majorBanks = [
  "JPMorgan Chase Bank", "Bank of America", "Wells Fargo Bank", "Citibank", "U.S. Bank",
  "PNC Bank", "Truist Bank", "Goldman Sachs Bank", "Capital One", "TD Bank", "Bank of New York Mellon",
  "State Street Bank and Trust Company", "BMO Bank", "Citizens Bank", "First Citizens Bank",
  "Morgan Stanley Bank", "KeyBank", "Huntington National Bank", "Ally Bank", "Manufacturers and Traders Trust Company",
  "Discover Bank", "Fifth Third Bank", "Synchrony Bank", "Regions Bank", "Northern Trust Company"
];

const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

majorBanks.forEach(bank => {
  urls.push(`/routing-number/${generateSlug(bank)}`);
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${DOMAIN}${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.mkdirSync('./public', { recursive: true });
fs.writeFileSync('./public/sitemap.xml', sitemap);
console.log('Sitemap generated successfully at public/sitemap.xml');
