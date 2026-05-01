"use client";

import { useRouter } from "next/navigation";

export function BackButton({ fallbackHref = "/links" }: { fallbackHref?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      className="secondary-cta"
      onClick={() => {
        if (window.history.length > 1) {
          window.history.back();
          return;
        }

        router.push(fallbackHref, { scroll: true });
      }}
      data-ga-click="back_to_previous_page"
      data-ga-location="link_detail"
    >
      Go back
    </button>
  );
}
