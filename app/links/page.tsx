import type { Metadata } from "next";
import { groupedLinksByCategory, siteUrl } from "@/lib/data";
import { getImageUrl, shuffle } from "@/lib/utils";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { LinkGroupCard } from "../components/LinkGroupCard";
import { PersistedDetails } from "../components/PersistedDetails";

export const metadata: Metadata = {
  title: "All Links",
  description:
    "Browse every saved destination from the Play Fantacy bookmark directory, grouped by domain.",
  alternates: {
    canonical: "/links",
  },
  openGraph: {
    title: "All Links | Play Fantacy",
    description:
      "Browse every saved destination from the Play Fantacy bookmark directory, grouped by domain.",
    url: `${siteUrl}/links`,
    type: "website",
  },
};

export default function LinksPage() {
  const categories = shuffle(groupedLinksByCategory).map(
    ({ category, groups }) => ({
      category,
      groups: shuffle(groups).map((group) => ({
        ...group,
        items: group.items.map((item) => ({
          ...item,
          imageUrl: getImageUrl(item.imageIndex),
        })),
      })),
    }),
  );

  return (
    <main className="subpage-shell">
      <Breadcrumbs />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "All Links",
            url: `${siteUrl}/links`,
            description:
              "Browse every saved destination from the Play Fantacy bookmark directory, grouped by domain.",
          }),
        }}
      />

      <div className="section-heading">
        <p className="eyebrow">Full index</p>
        <h1>Every saved link grouped under its domain</h1>
      </div>

      <div className="category-grid">
        {categories.map(({ category, groups }) => (
          <PersistedDetails
            key={`${category.slug}-${category.name}`}
            storageKey={`links-category-${category.slug}`}
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
              {groups.map((group) => (
                <LinkGroupCard
                  key={`${category.slug}-${group.domain}`}
                  group={group}
                  domainCount={groups.length}
                />
              ))}
            </div>
          </PersistedDetails>
        ))}
      </div>
    </main>
  );
}
