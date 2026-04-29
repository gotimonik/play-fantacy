import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getDomainGroupForLink,
  getLinkBySlug,
  links,
} from "@/lib/data";
import { getImageUrl } from "@/lib/utils";

type Props = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Props): Metadata {
  const item = getLinkBySlug(params.slug);

  if (!item) {
    return {
      title: "Link Not Found",
    };
  }

  return {
    title: item.name,
    description: item.description,
    alternates: {
      canonical: `/links/${item.slug}`,
    },
  };
}

export function generateStaticParams() {
  return links.map((item) => ({
    slug: item.slug,
  }));
}

export default function LinkDetailPage({ params }: Props) {
  const item = getLinkBySlug(params.slug);

  if (!item) {
    notFound();
  }

  const category = getCategoryBySlug(item.category);
  const group = getDomainGroupForLink(item);
  const relatedLinks =
    group?.items.filter((entry) => entry.slug !== item.slug).slice(0, 24) ?? [];

  return (
    <main className="subpage-shell">
      <div className="link-detail-card">
        <p className="eyebrow">{category?.name ?? "Saved link"}</p>
        <h1>{item.name}</h1>
        <p className="detail-copy">{item.description}</p>

        <div className="detail-meta">
          <span>{item.domain}</span>
          <span>Saved outbound destination</span>
        </div>

        <div>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          ><img
            src={getImageUrl(item.imageIndex)}
            alt={item.name}
            className="category-image"
            style={{
              width: "250px",
              height: "250px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "0.5rem",
            }}
          /></a>
        </div>
        <div className="hero-actions">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-cta"
          >
            Visit site
          </a>
          <Link href="/links" className="secondary-cta">
            Back to all links
          </Link>
        </div>
      </div>

      {group ? (
        <section className="links-section related-section">
          <div className="category-header">
            <h2>More from {group.siteName}</h2>
            <span>{group.items.length} total links</span>
          </div>
          <p>{group.domain}</p>

          <div className="link-table">
            {relatedLinks.length > 0 ? (
              relatedLinks.map((related) => (
                <Link
                  key={related.slug}
                  href={`/links/${related.slug}`}
                  className="table-link"
                >
                  <img
                    src={getImageUrl(related.imageIndex)}
                    alt={related.label}
                    className="category-image"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <span>{related.label}</span>
                  <small>{related.description}</small>
                </Link>
              ))
            ) : (
              <div className="table-link">
                <span>No additional routes</span>
                <small>
                  This is the only saved link currently grouped under this
                  domain.
                </small>
              </div>
            )}
          </div>
        </section>
      ) : null}
    </main>
  );
}
