import Link from "next/link";
import { groupedLinksByCategory, siteUrl } from "@/lib/data";
import { getImageUrl, getRandomNumber } from "@/lib/utils";
import { Breadcrumbs } from "./components/Breadcrumbs";

const supportCards = [
  {
    title: "Late-night flow",
    copy: "The homepage is arranged to make after-hours browsing feel faster, lighter, and less cluttered.",
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
    "A late-night link hub with grouped destinations, cleaner labels, and fast outbound pages.",
};

export default function HomePage() {
  return (
    <main className="page-shell">
      <Breadcrumbs />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="hero-copy">
        <div
          className="header-menu"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <img
              src="/images/image_original_287.jpg"
              alt="Play Fantacy Logo"
              style={{
                width: 75,
                height: 75,
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: "1.35rem",
                letterSpacing: "-0.5px",
                color: "#bb4d00",
              }}
            >
              Play Fantacy
            </span>
          </div>
        </div>
        <p className="hero-text">
          Play Fantacy turns a long saved list into a night-friendly hub with
          readable names, grouped domains, and quick routes when you want to
          jump straight into the next page.
        </p>
        <div className="hero-actions">
          <a href="#directory" className="primary-cta">
            Start browsing
          </a>
          <Link href="/links" className="secondary-cta">
            View full lineup
          </Link>
        </div>
      </div>

      <section className="highlight-grid">
        <article className="highlight-card">
          <h2>Less noise</h2>
          <p>
            Long URLs are turned into simpler labels so the homepage feels more
            relaxed and easier to scan at night.
          </p>
        </article>
        <article className="highlight-card">
          <h2>Night browsing rhythm</h2>
          <p>
            Links are grouped by category and domain so you can move through the
            collection without losing momentum.
          </p>
        </article>
        <article className="highlight-card">
          <h2>Always in sync</h2>
          <p>
            The homepage stays connected to `links.md`, so updates to the list
            can keep feeding the site in one place.
          </p>
        </article>
      </section>

      <section className="content-panel-grid">
        <article className="content-panel">
          <p className="eyebrow">Overview</p>
          <h2>Built for long nights and big link collections.</h2>
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

      <section id="directory" className="directory-section">
        <div className="section-heading">
          <p className="eyebrow">Homepage directory</p>
          <h2>Browse by category and domain</h2>
        </div>

        <div className="category-grid">
          {groupedLinksByCategory.map(({ category, groups }) => {
            return (
              <article key={category.slug} className="category-card">
                <div className="category-header">
                  <h3>{category.name}</h3>
                  <span>{groups.length} domains</span>
                </div>
                <p>{category.description}</p>

                <div className="domain-group-list">
                  {groups.map((group) =>
                    group.items.length === 1 ? (
                      <Link
                        href={`/links/${group.items[0].slug}`}
                        className="outbound-link"
                      >
                        <div style={{ display: "flex" }}>
                          <div>
                            <img
                              src={getImageUrl(group.items[0].imageIndex)}
                              alt={group.items[0].label}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                          </div>
                          <div style={{ paddingLeft: 8, paddingRight: 8 }}>
                            <div>
                              <span style={{ wordBreak: "break-word" }}>
                                {group.items[0].label}
                              </span>
                            </div>
                            <div>
                              <small>{group.items[0].description}</small>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <details
                        key={`${category.slug}-${group.domain}`}
                        className="domain-group"
                        // open={group.items.length <= 12}
                      >
                        <summary className="domain-group-summary">
                          <img
                            src={getImageUrl(group.items[0].imageIndex)}
                            alt={group.items[0].label}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "20%",
                            }}
                          />
                          <span>{group.siteName}</span>
                          <small>
                            {group.domain} · {group.items.length} link
                            {group.items.length > 1 ? "s" : ""}
                          </small>
                        </summary>

                        <ul className="sub-link-list">
                          {group.items.map((item) => (
                            <li key={item.slug}>
                              <Link
                                href={`/links/${item.slug}`}
                                className="outbound-link"
                              >
                                <div style={{ display: "flex" }}>
                                  <div>
                                    <img
                                      src={getImageUrl(item.imageIndex)}
                                      alt={item.label}
                                      style={{
                                        width: "100px",
                                        height: "100px",
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
                                        {item.label} |{" "}
                                        <span>{groups.length} domains</span>
                                      </span>
                                    </div>
                                    <div>
                                      <small>{item.description}</small>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ),
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="support-section">
        <div className="section-heading">
          <p className="eyebrow">Why it works</p>
          <h2>What makes the homepage feel more ready for the night</h2>
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
