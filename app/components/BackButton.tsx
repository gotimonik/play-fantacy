"use client";

import { useRouter } from "next/navigation";

export function BackButton({ fallbackHref = "/links" }: { fallbackHref?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      className="secondary-cta"
      onClick={() => {
        const returnPath = window.sessionStorage.getItem("playfantacy-return-path");

        if (returnPath) {
          router.push(returnPath, { scroll: false });
          return;
        }

        if (window.history.length > 1) {
          window.history.back();
          return;
        }

        router.push(fallbackHref, { scroll: false });
      }}
      data-ga-click="back_to_previous_page"
      data-ga-location="link_detail"
    >
      Go back
    </button>
  );
}
