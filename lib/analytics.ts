export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

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
  if (
    !isGAEnabled() ||
    typeof window === "undefined" ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  console.debug("Tracking pageview:", {
    page_location: window.location.href,
    page_path: url,
    page_title: document.title,
    send_to: GA_MEASUREMENT_ID,
    transport_type: "beacon",
  });
  window.gtag("event", "page_view", {
    page_location: window.location.href,
    page_path: url,
    page_title: document.title,
    send_to: GA_MEASUREMENT_ID,
    transport_type: "beacon",
  });
}

export function event(action: string, params: GtagParams = {}) {
  if (
    !isGAEnabled() ||
    typeof window === "undefined" ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  console.debug("Tracking event:", { action, params });
  window.gtag("event", action, {
    send_to: GA_MEASUREMENT_ID,
    transport_type: "beacon",
    ...params,
  });
}
