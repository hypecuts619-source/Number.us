/**
 * Regression guard for route-scoped data slicing.
 *
 * Renders each route twice — once with the full dataset (the old behaviour),
 * once with the route slice and summary the server actually injects — and
 * diffs the HTML. Any difference means the slice dropped a record the page
 * renders, which would show up in production as missing content and a
 * hydration mismatch.
 *
 * Run from the repo root: npx tsx scripts/check-route-slices.ts
 */
import fs from 'fs';
import path from 'path';
import { createServer } from 'vite';

const ROUTES = [
  '/',
  '/routing-number-vs-account-number',
  '/blog/anatomy-of-a-check',
  '/what-is-a-routing-number',
  '/how-to-find-routing-number',
  '/routing-number/wells-fargo-bank',
  '/routing-number/wells-fargo-bank/ca',
  '/routing-number/wells-fargo-bank/ca/carlsbad',
  '/routing-number/jpmorgan-chase-bank',
  '/routing-number/jpmorgan-chase-bank/ny',
  '/routing-number/bank-of-america',
  '/routing-number/navy-federal-credit-union',
  '/lookup/021000021',
  '/lookup/011100106',
  '/021000021',
  '/states/ca',
  '/states/tx',
  '/states/ny',
  '/routing-number-lookup/wells-fargo-bank',
  '/regional-banks/wells-fargo-bank',
  '/credit-unions',
  '/major-banks',
  '/banks/a-z/w',
  '/sitemap',
  '/routing-number-validator',
  '/routing-number/this-bank-does-not-exist-xyz',
  '/banks',
  '/states',
  '/reports/2026-us-credit-union-report',
];

async function main() {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
  const { sliceDataForRoute, summaryFieldForRoute } = await vite.ssrLoadModule('/src/lib/routeData.ts');
  const { buildRoutingSummary } = await vite.ssrLoadModule('/src/lib/getData.ts');

  const full = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), 'public/data/routing.json'), 'utf8')
  );

  let failures = 0;
  for (const route of ROUTES) {
    const slice = sliceDataForRoute(route, full);
    // Mirror exactly what server.ts injects: only the field this route reads.
    const field = summaryFieldForRoute(route);
    const summary = field
      ? { stateCounts: {}, bankNames: [], [field]: buildRoutingSummary(full)[field] }
      : null;

    // Baseline: full dataset, no summary (the pre-change behaviour).
    const a = (await render(route, full, null)).html;
    // Candidate: route slice plus whatever summary the server would inject.
    const b = (await render(route, slice, summary)).html;

    const pct = ((slice.length / full.length) * 100).toFixed(2);
    if (a === b) {
      console.log(`PASS  ${route}  (slice ${slice.length}/${full.length} = ${pct}%)`);
    } else {
      failures++;
      console.log(`FAIL  ${route}  (slice ${slice.length} records)`);
      // Show first divergence for debugging.
      let i = 0;
      while (i < a.length && i < b.length && a[i] === b[i]) i++;
      console.log(`   full : ...${a.slice(Math.max(0, i - 90), i + 90)}`);
      console.log(`   slice: ...${b.slice(Math.max(0, i - 90), i + 90)}`);
    }
  }

  await vite.close();
  console.log(failures === 0 ? '\nAll routes identical.' : `\n${failures} route(s) diverged.`);
  process.exit(failures === 0 ? 0 : 1);
}

main();
