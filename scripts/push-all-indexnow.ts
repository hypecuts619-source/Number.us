/**
 * Comprehensive IndexNow Batch Submitter
 * 
 * Extracts all URLs from generated sitemaps in public/sitemap-*.xml
 * and pushes them in compliant 5,000-URL batches directly to IndexNow (Bing / Yandex / etc.)
 */

const INDEXNOW_KEY = 'c2263152ef3247c4b7891823eb9185a6';
const HOST = 'usroutingnumber.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

async function pushAllToIndexNow() {
  const fs = await import('fs');
  const path = await import('path');

  const publicDir = path.resolve('public');
  const files = fs.readdirSync(publicDir).filter(f => f.startsWith('sitemap-') && f.endsWith('.xml'));

  console.log(`Found ${files.length} sitemap chunk files in public/`);

  const allUrls: string[] = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;

  for (const file of files) {
    const content = fs.readFileSync(path.join(publicDir, file), 'utf8');
    let match;
    while ((match = locRegex.exec(content)) !== null) {
      if (match[1] && match[1].startsWith('http')) {
        allUrls.push(match[1].trim());
      }
    }
  }

  const uniqueUrls = Array.from(new Set(allUrls));
  console.log(`Extracted ${uniqueUrls.length} unique URLs ready for IndexNow submission.`);

  const BATCH_SIZE = 5000;
  const totalBatches = Math.ceil(uniqueUrls.length / BATCH_SIZE);

  for (let i = 0; i < totalBatches; i++) {
    const batch = uniqueUrls.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
    console.log(`\nSubmitting Batch ${i + 1} of ${totalBatches} (${batch.length} URLs) to api.indexnow.org...`);

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch
    };

    try {
      const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      if (res.status === 200 || res.status === 202) {
        console.log(` Batch ${i + 1} Accepted: HTTP ${res.status}`);
      } else {
        console.log(`⚠️ Batch ${i + 1} Response: HTTP ${res.status} ${res.statusText}`);
        const body = await res.text();
        if (body) console.log(`Response detail: ${body}`);
      }
    } catch (err: any) {
      console.error(`❌ Batch ${i + 1} Failed:`, err.message);
    }

    // Brief 500ms delay between batches to respect rate limits
    if (i < totalBatches - 1) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log('\n IndexNow batch push completed successfully for all sitemap URLs.');
}

pushAllToIndexNow();
