"use client";

import { useEffect } from "react";

export function ServiceWorkerCleanup() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const reloadFlag = "play-fantacy-sw-cleanup-reloaded";

    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        if (registrations.length === 0) {
          sessionStorage.removeItem(reloadFlag);
          return;
        }

        return Promise.all(
          registrations.map((registration) => registration.unregister()),
        ).then(() => {
          if (
            navigator.serviceWorker.controller &&
            sessionStorage.getItem(reloadFlag) !== "true"
          ) {
            sessionStorage.setItem(reloadFlag, "true");
            window.location.reload();
          }
        });
      })
      .catch(() => {
        // Service worker cleanup is best-effort; analytics should not depend on it.
      });
  }, []);

  return null;
}
