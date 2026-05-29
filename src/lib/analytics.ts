declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackRoutingLookup = (
  search_length: number,
  validation_status: 'success' | 'error'
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'routing_lookup_executed', {
        search_length,
        validation_status
      });
    } catch (e) {
      console.warn('GA4 tracking blocked or failed', e);
    }
  }
};
