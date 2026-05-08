"use client";

import { useEffect } from "react";
import { event } from "@/lib/analytics";

type TrackableElement = HTMLElement & {
  dataset: DOMStringMap;
};

export function useGAClickTracking() {
  useEffect(() => {
    const onClick = (evt: MouseEvent) => {
      const target = evt.target as HTMLElement | null;
      if (!target) return;

      const tracked = target.closest("[data-ga-click]") as TrackableElement | null;
      if (!tracked) return;

      const action = tracked.dataset.gaClick;
      if (!action) return;

      const link = tracked.closest("a[href]") as HTMLAnchorElement | null;

      event(action, {
        location: tracked.dataset.gaLocation,
        label: tracked.dataset.gaLabel || tracked.textContent?.trim(),
        link_url: link?.href,
        link_text: tracked.textContent?.trim(),
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
}
