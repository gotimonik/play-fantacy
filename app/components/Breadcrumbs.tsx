import Link from "next/link";

const BREADCRUMB_LABELS: Record<string, string> = {
  "": "Home",
  links: "All Links",
  about: "About Us",
  "how-it-works": "How It Works",
  contact: "Contact Us",
  faq: "FAQ",
  "editorial-policy": "Editorial Policy",
  "privacy-policy": "Privacy Policy",
  "terms-of-use": "Terms of Use",
  dmca: "DMCA",
  disclaimer: "Disclaimer",
};

export function Breadcrumbs() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  if (pathname === "/" || pathname === "") return null;
  const segments = pathname.split("/").filter(Boolean);
  let path = "";

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs" style={{ margin: "18px 0 24px 0" }}>
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <li style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link href="/">Home</Link>
        </li>
        {segments.map((seg, idx) => {
          path += "/" + seg;
          const isLast = idx === segments.length - 1;
          const label = BREADCRUMB_LABELS[seg] || seg.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
          return (
            <li
              key={path}
              aria-current={isLast ? "page" : undefined}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <span style={{ color: "#bbb", fontSize: "1.1em", margin: "0 2px" }}>/</span>
              {isLast ? (
                <span style={{ fontWeight: 600, color: "#bb4d00" }}>{label}</span>
              ) : (
                <Link href={path}>{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
