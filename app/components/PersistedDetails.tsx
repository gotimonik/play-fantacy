"use client";

import { useEffect, useState } from "react";

type PersistedDetailsProps = {
  storageKey: string;
  defaultOpen?: boolean;
  id?: string;
  className?: string;
  summaryClassName?: string;
  summary: React.ReactNode;
  children: React.ReactNode;
  collapsedHint?: React.ReactNode;
};

export function PersistedDetails({
  storageKey,
  defaultOpen = false,
  id,
  className,
  summaryClassName,
  summary,
  children,
  collapsedHint = "Section is collapsed. Tap the header to expand and view items.",
}: PersistedDetailsProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    const savedValue = window.localStorage.getItem(storageKey);

    if (savedValue === "open") {
      setIsOpen(true);
    }

    if (savedValue === "closed") {
      setIsOpen(false);
    }
  }, [storageKey]);

  return (
    <details
      id={id}
      className={className}
      open={isOpen}
      onToggle={(event) => {
        const nextOpen = event.currentTarget.open;
        setIsOpen(nextOpen);
        window.localStorage.setItem(storageKey, nextOpen ? "open" : "closed");
      }}
    >
      <summary className={summaryClassName}>{summary}</summary>
      <div className="persisted-details-hint">{collapsedHint}</div>
      {children}
    </details>
  );
}
