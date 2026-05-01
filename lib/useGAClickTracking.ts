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

      event(action, {
        location: tracked.dataset.gaLocation,
        label: tracked.dataset.gaLabel || tracked.textContent?.trim(),
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
