import Link from "next/link";

export default function NotFound() {
  return (
    <main className="subpage-shell">
      <div className="link-detail-card">
        <p className="eyebrow">Page not found</p>
        <h1>This link page does not exist.</h1>
        <p className="detail-copy">
          The bookmark may have moved, or the slug is no longer available in the current link list.
        </p>

        <div className="hero-actions">
          <Link href="/" className="primary-cta">
            Back to homepage
          </Link>
          <Link href="/links" className="secondary-cta">
            Browse all links
          </Link>
        </div>
      </div>
    </main>
  );
}
