export interface Env {
  // Bind bindings here if using KV, Durable Objects, or R2
}

export default {
  async fetch(
    request: Request & { cf?: { country?: string } },
    env: Env,
    ctx: any
  ): Promise<Response> {
    const url = new URL(request.url);
    const country = (request.cf?.country as string) || '';
    
    // 1. Geo-Blocking & Challenging
    // Block high-risk APAC data center regions (specifically SG)
    if (country === 'SG') {
      return new Response('Access Denied: Region Restricted', { status: 403 });
    }

    // 2. Headless Browser Detection
    const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
    const acceptLanguage = request.headers.get('accept-language');
    
    // EXCLUDES legit search engines (removed generic 'bot', 'spider', 'crawler' to allow Googlebot/Bing)
    const botPatterns = [
      'headless',
      'puppeteer',
      'python-requests',
      'curl',
      'wget',
      'scrapy'
    ];

    // Crawlers and unfurlers that must never be challenged. Search engines
    // routinely omit Accept-Language, so without an explicit allowlist the
    // header check below 403s them — which is exactly how Googlebot ended up
    // blocked before it was special-cased here.
    const allowedAgents = [
      // Search engines
      'googlebot',
      'google-inspectiontool',
      'googleother',
      'storebot-google',
      'bingbot',
      'bingpreview',
      'applebot',
      'duckduckbot',
      'yandexbot',
      'baiduspider',
      'slurp',
      // Ads / quality tooling on domains we serve
      'adsbot-google',
      'mediapartners-google',
      'chrome-lighthouse',
      'google page speed',
      // Link unfurlers
      'facebookexternalhit',
      'twitterbot',
      'linkedinbot',
      'slackbot',
      'discordbot',
      'telegrambot',
      'redditbot',
      'pinterest',
      'whatsapp',
      'embedly'
    ];

    const isKnownBot = botPatterns.some(pattern => userAgent.includes(pattern));
    const isMissingStandardHeaders = !acceptLanguage || userAgent === '';

    const isAllowedAgent = allowedAgents.some(pattern => userAgent.includes(pattern));
    if (!isAllowedAgent && (isKnownBot || isMissingStandardHeaders)) {
      return new Response('Forbidden: Anomalous Request Signature Detected', { status: 403 });
    }

    // 3. Data Endpoint Protection
    // Strict referer-checking for sensitive static JSON drops
    if (!isAllowedAgent && url.pathname.startsWith('/data/routing.json')) {
      const referer = request.headers.get('referer');
      const origin = request.headers.get('origin');
      
      const allowedDomains = ['usroutingnumber.com', 'localhost', '127.0.0.1'];
      
      const isValidReferer = referer && allowedDomains.some(d => referer.includes(d));
      const isValidOrigin = origin && allowedDomains.some(d => origin.includes(d));

      if (!isValidReferer && !isValidOrigin) {
        return new Response('Forbidden: API access restricted to application domain.', { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Fallthrough: Allow request to proceed to the origin (our React SSR app)
    try {
      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
        redirect: request.redirect
      } as any);

      // Pass the origin's Cache-Control through untouched. server.ts sends
      // max-age=0 with s-maxage + stale-while-revalidate, so browsers still
      // revalidate on every request while the edge can serve and refresh.
      return new Response(response.body, response);
    } catch (e) {
      return new Response('Origin Fetch Error', { status: 502 });
    }
  },
};
