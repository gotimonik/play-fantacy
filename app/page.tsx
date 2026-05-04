import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { links, groupedLinksByCategory, siteUrl } from "@/lib/data";
import { getImageUrl } from "@/lib/utils";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { LinkGroupCard } from "./components/LinkGroupCard";
import { PersistedDetails } from "./components/PersistedDetails";

const HomeWheelDirectory = dynamic(
  () => import("./components/HomeWheelDirectory").then((mod) => mod.HomeWheelDirectory),
  {
    ssr: false,
    loading: () => (
      <section className="wheel-section">
        <div className="wheel-left">
          <p className="eyebrow">Loading interactive wheel...</p>
        </div>
        <div className="wheel-right" />
      </section>
    ),
  },
);

const supportCards = [
  {
    title: "Faster discovery",
    copy: "The homepage is arranged to make browsing faster, lighter, and less cluttered.",
  },
  {
    title: "Quick jump pages",
    copy: "Each saved destination has its own stopover page so you can preview and jump out in one click.",
  },
  {
    title: "Full-site setup",
    copy: "Navigation, policies, and supporting pages are built in so the site feels complete from the first screen.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Play Fantacy",
  url: siteUrl,
  description:
    "A structured link hub with grouped destinations, cleaner labels, and fast outbound pages.",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Play Fantacy",
  url: siteUrl,
  logo: `${siteUrl}/og-image.png`,
};

export default function HomePage() {
  const directoryCategories = groupedLinksByCategory.map(({ category, groups }) => ({
    category,
    groups: groups.map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        imageUrl: getImageUrl(item.imageIndex),
      })),
    })),
  }));
  const wheelCategories = directoryCategories.map(({ category, groups }) => ({
    category,
    imageUrl: groups[0]?.items[0]?.imageUrl ?? getImageUrl(1),
    previewGroups: groups.slice(0, 4).map((group) => ({
      domain: group.domain,
      siteName: group.siteName,
      itemCount: group.items.length,
    })),
  }));

  return (
    <main className="page-shell">
      <Breadcrumbs />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      <div className="hero-copy">
        <p className="hero-text">
          Play Fantacy turns a long saved list into an easy-to-scan hub with
          readable names, grouped domains, and quick routes to the next page.
        </p>
        <div className="hero-actions">
          <a
            href="#directory"
            className="primary-cta"
            data-ga-click="browse_start"
            data-ga-location="home_hero"
          >
            Start browsing
          </a>
          <Link
            href="/links"
            className="secondary-cta"
            data-ga-click="view_full_links"
            data-ga-location="home_hero"
          >
            View full lineup
          </Link>
        </div>
      </div>

      {/* <section className="content-panel-grid">
        <article className="content-panel">
          <p className="eyebrow">Overview</p>
          <h2>Built for large and active link collections.</h2>
          <p>
            Instead of scrolling through a huge raw list, the opening page now
            works like a calmer launchpad with grouped sections, cleaner naming,
            and easier next-click decisions.
          </p>
        </article>
      </section> */}

      <HomeWheelDirectory categories={wheelCategories} />

      <section id="directory" className="directory-section">
        <div className="section-heading">
          <p className="eyebrow">Homepage directory</p>
          <h1>Browse by category and domain</h1>
        </div>

        <div className="category-grid">
          {directoryCategories.map(({ category, groups }) => {
            const visibleGroups = groups.slice(0, 10);
            const hiddenGroupCount = Math.max(groups.length - visibleGroups.length, 0);

            return (
              <PersistedDetails
                key={`${category.slug}-${category.name}`}
                id={`category-${category.slug}`}
                storageKey={`home-category-${category.slug}`}
                className="domain-group category-card"
                summaryClassName="domain-group-summary"
                summary={
                  <article>
                    <div className="category-header">
                      <h3>{category.name}</h3>
                      <span>{groups.length} domains</span>
                    </div>
                    <p>{category.description}</p>
                  </article>
                }
              >
                <div className="domain-group-list">
                  {visibleGroups.map((group) => (
                    <LinkGroupCard
                      key={`${category.slug}-${group.domain}`}
                      group={group}
                      domainCount={groups.length}
                      compact
                    />
                  ))}
                </div>
                {hiddenGroupCount > 0 ? (
                  <Link href="/links" className="directory-more-link">
                    View {hiddenGroupCount} more domains
                  </Link>
                ) : null}
              </PersistedDetails>
            );
          })}
        </div>
      </section>

      <section className="links-section">
        <div className="section-heading">
          <p className="eyebrow">Recently added</p>
          <h2>Explore the latest indexed pages</h2>
        </div>
        <div className="link-table">
          {links.slice(0, 24).map((item) => (
            <Link
              key={item.slug}
              href={`/links/${item.slug}`}
              className="table-link"
              data-ga-click="open_recent_link"
              data-ga-location="home_recent"
              data-ga-label={item.slug}
            >
              <Image
                src={getImageUrl(item.imageIndex)}
                alt={item.label}
                loading="lazy"
                quality={70}
                width={150}
                height={150}
                sizes="100px"
                style={{
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              {/* <span>{item.label}</span> */}
              {/* <small>{item.domain}</small> */}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
