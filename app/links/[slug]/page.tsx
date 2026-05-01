import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getDomainGroupForLink,
  getLinkBySlug,
  links,
  siteUrl,
} from "@/lib/data";
import { getImageUrl } from "@/lib/utils";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { BackButton } from "../../components/BackButton";

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
    openGraph: {
      title: `${item.name} | Play Fantacy`,
      description: item.description,
      url: `${siteUrl}/links/${item.slug}`,
      type: "article",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.name} | Play Fantacy`,
      description: item.description,
      images: ["/og-image.png"],
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
      <Breadcrumbs />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: item.name,
            description: item.description,
            url: `${siteUrl}/links/${item.slug}`,
          }),
        }}
      />
      <div className="link-detail-card">
        <p className="eyebrow">{category?.name ?? "Saved link"}</p>
        <h1>{item.name}</h1>
        <p className="detail-copy">{item.description}</p>

        <div className="detail-meta">
          <span>{item.domain}</span>
          <span>Saved outbound destination</span>
        </div>

        <div>
          <a href={item.url} target="_blank" rel="noopener noreferrer" data-ga-click="visit_external_site" data-ga-location="link_detail_image" data-ga-label={item.slug}>
            <Image
              src={getImageUrl(item.imageIndex, 'original')}
              alt={item.name}
              loading="lazy"
              quality={100}
              width={300}
              height={300}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </a>
        </div>
        <div className="hero-actions">
          <BackButton />
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-cta"
            data-ga-click="visit_external_site"
            data-ga-location="link_detail_cta"
            data-ga-label={item.slug}
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
                  <div style={{ display: "flex" }}>
                    <div>
                      <Image
                        src={getImageUrl(related.imageIndex)}
                        alt={related.label}
                        loading="lazy"
                        quality={75}
                        width={100}
                        height={100}
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        paddingLeft: 16,
                        paddingRight: 16,
                      }}
                    >
                      <div>
                        <span style={{ wordBreak: "break-word" }}>
                          <span>{related.label}</span>
                        </span>
                      </div>
                      <div>
                        <small>{related.description}</small>
                      </div>
                    </div>
                  </div>
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
