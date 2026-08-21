/**
 * Script to automatically notify Bing / IndexNow of all active sitemap URLs.
 * 
 * Protocol: https://www.indexnow.org/documentation
 * Endpoint: https://api.indexnow.org/indexnow
 */

const INDEXNOW_KEY = 'c2263152ef3247c4b7891823eb9185a6';
const HOST = 'usroutingnumber.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

async function submitIndexNow() {
  const fs = await import('fs');
  const path = await import('path');

  console.log('Fetching priority URLs for IndexNow ping...');

  const priorityUrls = [
    `https://${HOST}/`,
    `https://${HOST}/banks`,
    `https://${HOST}/states`,
    `https://${HOST}/major-banks`,
    `https://${HOST}/routing-number-lookup`,
    `https://${HOST}/routing-number-validator`,
    `https://${HOST}/check-digit-calculator`,
    `https://${HOST}/reports/2026-us-credit-union-report`,
    `https://${HOST}/how-to-wire-money`,
    `https://${HOST}/international-wire-guide`,
    `https://${HOST}/blog`,
    `https://${HOST}/blog/ach-vs-wire-routing-guide`,
    `https://${HOST}/blog/nacha-ach-fraud-prevention-mandate-2026`,
    `https://${HOST}/blog/fake-routing-number-scam-prevention`,
    `https://${HOST}/blog/chase-routing-number`,
    `https://${HOST}/blog/wells-fargo-routing-number`,
    `https://${HOST}/blog/bank-of-america-routing-number`,
    `https://${HOST}/routing-number/jpmorgan-chase-bank`,
    `https://${HOST}/routing-number/wells-fargo-bank`,
    `https://${HOST}/routing-number/bank-of-america`,
    `https://${HOST}/routing-number/citibank`,
    `https://${HOST}/routing-number/navy-federal-credit-union`,
    `https://${HOST}/routing-number/us-bank`,
    `https://${HOST}/routing-number/capital-one`,
    `https://${HOST}/routing-number/pnc-bank`,
    `https://${HOST}/routing-number/truist-bank`,
    `https://${HOST}/routing-number/td-bank`,
    `https://${HOST}/sitemap`
  ];

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: priorityUrls
  };

  console.log(`Submitting ${priorityUrls.length} priority URLs to IndexNow (Bing/Yandex/Seznam)...`);

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`IndexNow Submission Successful! (HTTP ${res.status})`);
    } else {
      console.log(`IndexNow responded with status: ${res.status} ${res.statusText}`);
      const text = await res.text();
      console.log('Response body:', text);
    }
  } catch (err: any) {
    console.error('Failed to submit to IndexNow:', err.message);
  }
}

submitIndexNow();
