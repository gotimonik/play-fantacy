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
  storageKey: _storageKey,
  defaultOpen = false,
  id,
  className,
  summaryClassName,
  summary,
  children,
  collapsedHint = "Section is collapsed. Tap the header to expand and view items.",
}: PersistedDetailsProps) {
  return (
    <details id={id} className={className} open={defaultOpen}>
      <summary className={summaryClassName}>{summary}</summary>
      <div className="persisted-details-hint">{collapsedHint}</div>
      {children}
    </details>
  );
}
