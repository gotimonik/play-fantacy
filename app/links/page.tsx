import type { Metadata } from "next";
import { groupedLinksByCategory } from "@/lib/data";
import { getImageUrl, shuffle } from "@/lib/utils";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { LinkGroupCard } from "../components/LinkGroupCard";

export const metadata: Metadata = {
  title: "All Links",
  description:
    "Browse every saved destination from the Play Fantacy bookmark directory, grouped by domain.",
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

      <div className="section-heading">
        <p className="eyebrow">Full index</p>
        <h1>Every saved link grouped under its domain</h1>
      </div>

      <div className="category-grid">
        {categories.map(({ category, groups }) => (
          <details
            key={`${category.slug}-${category.name}`}
            className="domain-group category-card"
          >
            <summary className="domain-group-summary">
              <article>
                <div className="category-header">
                  <h3>{category.name}</h3>
                  <span>{groups.length} domains</span>
                </div>
                <p>{category.description}</p>
              </article>
            </summary>

            <div className="domain-group-list">
              {groups.map((group) => (
                <LinkGroupCard
                  key={`${category.slug}-${group.domain}`}
                  group={group}
                  domainCount={groups.length}
                />
              ))}
            </div>
          </details>
        ))}
      </div>
    </main>
  );
}