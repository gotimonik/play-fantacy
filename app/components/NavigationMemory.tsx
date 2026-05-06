"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const scrollKeyPrefix = "playfantacy-scroll:";
const returnPathKey = "playfantacy-return-path";
const restorablePaths = new Set(["/", "/links"]);

function scrollStorageKey(pathname: string) {
  return `${scrollKeyPrefix}${pathname}`;
}

function saveCurrentScroll() {
  const pathname = window.location.pathname;

  if (!restorablePaths.has(pathname)) {
    return;
  }

  window.sessionStorage.setItem(
    scrollStorageKey(pathname),
    JSON.stringify({
      x: window.scrollX,
      y: window.scrollY,
    }),
  );
  window.sessionStorage.setItem(returnPathKey, pathname);
}

function restoreScroll(pathname: string, savedValue: string) {
  try {
    const position = JSON.parse(savedValue) as { x?: number; y?: number };
    const x = position.x ?? 0;
    const y = position.y ?? 0;
    const delays = [0, 50, 150, 350, 700];

    delays.forEach((delay) => {
      window.setTimeout(() => {
        window.scrollTo({
          left: x,
          top: y,
          behavior: "auto",
        });
      }, delay);
    });

    window.setTimeout(() => {
      window.sessionStorage.removeItem(returnPathKey);
    }, delays[delays.length - 1] + 50);
  } catch {
    window.sessionStorage.removeItem(scrollStorageKey(pathname));
    window.sessionStorage.removeItem(returnPathKey);
  }
}

export function NavigationMemory() {
  const pathname = usePathname();

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a[href]");

      if (!link) {
        return;
      }

      const href = link.getAttribute("href");

      if (!href) {
        return;
      }

      const targetUrl = new URL(href, window.location.origin);

      if (
        targetUrl.origin === window.location.origin &&
        targetUrl.pathname.startsWith("/links/") &&
        targetUrl.pathname !== "/links/"
      ) {
        saveCurrentScroll();
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (!restorablePaths.has(pathname)) {
      return;
    }

    const returnPath = window.sessionStorage.getItem(returnPathKey);

    if (returnPath !== pathname) {
      return;
    }

    const savedValue = window.sessionStorage.getItem(scrollStorageKey(pathname));

    if (!savedValue) {
      return;
    }

    restoreScroll(pathname, savedValue);
  }, [pathname]);

  return null;
}
