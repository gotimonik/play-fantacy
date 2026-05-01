import Link from "next/link";
import { links, groupedLinksByCategory, siteUrl } from "@/lib/data";
import { getImageUrl } from "@/lib/utils";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { HomeWheelDirectory } from "./components/HomeWheelDirectory";
import Image from "next/image";

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
  const categories = groupedLinksByCategory.map(({ category, groups }) => ({
    category,
    groups: groups.map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        imageUrl: getImageUrl(item.imageIndex),
      })),
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

      <section className="content-panel-grid">
        <article className="content-panel">
          <p className="eyebrow">Overview</p>
          <h2>Built for large and active link collections.</h2>
          <p>
            Instead of scrolling through a huge raw list, the opening page now
            works like a calmer launchpad with grouped sections, cleaner naming,
            and easier next-click decisions.
          </p>
        </article>

        <article className="content-panel">
          <p className="eyebrow">Navigation</p>
          <h2>Everything important stays within easy reach.</h2>
          <p>
            The header, footer, directory page, and detail pages are connected
            so moving around the site feels smooth whether you are casually
            browsing or searching for one specific stop.
          </p>
        </article>
      </section>

      <HomeWheelDirectory categories={categories} />

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
                quality={75}
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

      <section className="support-section">
        <div className="section-heading">
          <p className="eyebrow">Why it works</p>
          <h2>What makes the homepage easier to use</h2>
        </div>

        <div className="support-grid">
          {supportCards.map((card) => (
            <article key={card.title} className="support-card">
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
