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
    
    const botPatterns = [
      'headless',
      'puppeteer',
      'python-requests',
      'curl',
      'wget',
      'scrapy',
      'bot',
      'spider',
      'crawler'
    ];

    const isKnownBot = botPatterns.some(pattern => userAgent.includes(pattern));
    const isMissingStandardHeaders = !acceptLanguage || userAgent === '';

    if (isKnownBot || isMissingStandardHeaders) {
      return new Response('Forbidden: Anomalous Request Signature Detected', { status: 403 });
    }

    // 3. Data Endpoint Protection
    // Strict referer-checking for sensitive static JSON drops
    if (url.pathname.startsWith('/data/routing.json')) {
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
      return await fetch(request);
    } catch (e) {
      return new Response('Origin Fetch Error', { status: 502 });
    }
  },
};
