export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function isGAEnabled() {
  return Boolean(GA_MEASUREMENT_ID);
}

export function pageview(url: string) {
  console.log('isGAEnabled()', isGAEnabled())
  console.log('typeof window === "undefined"', typeof window, typeof window.gtag)
  if (!isGAEnabled() || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

export function event(action: string, params: GtagParams = {}) {
  if (!isGAEnabled() || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", action, params);
}
