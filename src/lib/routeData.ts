import { RoutingData } from './types';
import { generateSlug } from './generateSlug';
import { isBankSlugMatch } from './getData';

/**
 * Route-scoped data slicing.
 *
 * The server used to inline the entire routing dataset (~2.4 MB of JSON) into
 * every single HTML response, including pure-text guide pages that never touch
 * bank data. That dominated TTFB/LCP and made Core Web Vitals unwinnable.
 *
 * Instead we ship only the records a given route actually renders. The same
 * slice is used to render on the server and to hydrate on the client, so the
 * two trees always agree.
 *
 * Slices deliberately preserve the original array order and include a few
 * representative records beyond the primary match, because helpers like
 * getOtherBanksInState() and getRelatedBanks() derive "first N distinct banks"
 * from document order. Keeping those leaders in the slice makes their output
 * byte-identical to a full-dataset render.
 */

// How many distinct "neighbour" banks to carry so the related/other-banks
// rails render identically to a full-dataset pass. The consumers take 5 and 8
// respectively; the extra headroom absorbs the excluded self-bank.
const NEIGHBOUR_BANK_HEADROOM = 12;

/**
 * Hub pages that reduce over every record but only ever render aggregates.
 * They get a precomputed summary instead of the raw dataset — and only the
 * field they actually read, since the two fields differ by three orders of
 * magnitude in size.
 */
const SUMMARY_PATHS: Record<string, 'stateCounts' | 'bankNames'> = {
  '/states': 'stateCounts',
  '/banks': 'bankNames',
};

function normalisePath(pathname: string): string {
  return pathname.split(/[?#]/)[0].replace(/\/+$/, '').toLowerCase() || '/';
}

/** Whether `pathname` renders from the dataset-wide summary. */
export function routeNeedsSummary(pathname: string): boolean {
  return normalisePath(pathname) in SUMMARY_PATHS;
}

/** The summary field `pathname` reads, or null if it reads none. */
export function summaryFieldForRoute(
  pathname: string
): 'stateCounts' | 'bankNames' | null {
  return SUMMARY_PATHS[normalisePath(pathname)] ?? null;
}

/** Collect one representative record per distinct bank, in document order. */
function leadingBanks(
  data: RoutingData[],
  predicate: (d: RoutingData) => boolean,
  limit: number
): RoutingData[] {
  const seen = new Set<string>();
  const out: RoutingData[] = [];
  for (const d of data) {
    if (seen.size >= limit) break;
    if (!predicate(d) || seen.has(d.bank_name)) continue;
    seen.add(d.bank_name);
    out.push(d);
  }
  return out;
}

/** Re-emit `picked` in original document order, de-duplicated. */
function inDocumentOrder(data: RoutingData[], picked: Set<RoutingData>): RoutingData[] {
  if (picked.size === 0) return [];
  return data.filter((d) => picked.has(d));
}

/**
 * Records needed to render a bank-scoped page, plus the neighbour banks the
 * "related banks" and "other banks in state" rails read from.
 */
function bankSlice(data: RoutingData[], bankSlug: string): RoutingData[] {
  const picked = new Set<RoutingData>();

  const matches = data.filter((d) => isBankSlugMatch(d.bank_name, bankSlug));
  matches.forEach((d) => picked.add(d));

  if (matches.length > 0) {
    const bankName = matches[0].bank_name;

    // getRelatedBanks() buckets by first letter of the bank name.
    const letter = bankName.charAt(0).toLowerCase();
    leadingBanks(
      data,
      (d) => d.bank_name.charAt(0).toLowerCase() === letter,
      NEIGHBOUR_BANK_HEADROOM
    ).forEach((d) => picked.add(d));

    // getOtherBanksInState() runs per state this bank operates in.
    const states = new Set(matches.map((d) => d.state.toLowerCase()));
    states.forEach((state) => {
      leadingBanks(
        data,
        (d) => d.state.toLowerCase() === state,
        NEIGHBOUR_BANK_HEADROOM
      ).forEach((d) => picked.add(d));
    });
  }

  return inDocumentOrder(data, picked);
}

/** Records needed to resolve a single 9-digit routing number lookup. */
function routingNumberSlice(data: RoutingData[], routingNumber: string): RoutingData[] {
  const picked = new Set<RoutingData>();
  const match = data.find((d) => d.routing_number === routingNumber);
  if (!match) return [];

  picked.add(match);
  const letter = match.bank_name.charAt(0).toLowerCase();
  leadingBanks(
    data,
    (d) => d.bank_name.charAt(0).toLowerCase() === letter,
    NEIGHBOUR_BANK_HEADROOM
  ).forEach((d) => picked.add(d));

  return inDocumentOrder(data, picked);
}

function stateSlice(data: RoutingData[], state: string): RoutingData[] {
  const target = state.toLowerCase();
  return data.filter((d) => d.state.toLowerCase() === target);
}

/**
 * Returns the subset of `data` required to server-render `pathname`.
 * Callers must inject exactly this subset into the client for hydration.
 */
export function sliceDataForRoute(pathname: string, data: RoutingData[]): RoutingData[] {
  if (!Array.isArray(data) || data.length === 0) return [];

  // Strip query/hash and any trailing slash, then normalise case.
  const clean = pathname.split(/[?#]/)[0].replace(/\/+$/, '').toLowerCase() || '/';

  // Hub pages render from the injected summary, so they need no raw records.
  if (clean in SUMMARY_PATHS) return [];

  // The credit-union report filters to credit unions and nothing else.
  if (clean === '/reports/2026-us-credit-union-report') {
    return data.filter((d) => d.bank_name.toLowerCase().includes('credit union'));
  }

  const segments = clean.split('/').filter(Boolean);

  if (segments[0] === 'states' && segments[1]) {
    return stateSlice(data, segments[1]);
  }

  if (segments[0] === 'routing-number' && segments[1]) {
    return bankSlice(data, segments[1]);
  }

  if (segments[0] === 'routing-number-lookup' && segments[1]) {
    return bankSlice(data, segments[1]);
  }

  if (segments[0] === 'regional-banks' && segments[1]) {
    return bankSlice(data, segments[1]);
  }

  if (segments[0] === 'lookup' && segments[1]) {
    return routingNumberSlice(data, segments[1]);
  }

  // Bare /:routingNumber catch-all route.
  if (segments.length === 1 && /^\d{9}$/.test(segments[0])) {
    return routingNumberSlice(data, segments[0]);
  }

  // Everything else (home, guides, blog, tools, legal) renders without
  // touching per-bank records.
  return [];
}

/** Exposed for tests and for the sitemap/debug tooling. */
export const __testables = { bankSlice, routingNumberSlice, stateSlice, generateSlug };
