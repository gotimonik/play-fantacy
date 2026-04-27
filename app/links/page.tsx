import Link from "next/link";
import type { Metadata } from "next";
import { groupedLinksByCategory } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Links",
  description: "Browse every saved destination from the Play Fantacy bookmark directory, grouped by domain."
};

export default function LinksPage() {
  return (
    <main className="subpage-shell">
      <div className="section-heading">
        <p className="eyebrow">Full index</p>
        <h1>Every saved link grouped under its domain</h1>
      </div>

      {groupedLinksByCategory.map(({ category, groups }) => {
        return (
          <section key={category.slug} className="links-section">
            <div className="category-header">
              <h2>{category.name}</h2>
              <span>{groups.length} domains</span>
            </div>
            <p>{category.description}</p>

            <div className="domain-group-list">
              {groups.map((group) => (
                group.items.length === 1 ? (
                  <div key={`${category.slug}-${group.domain}`} className="domain-group single-group">
                    <div className="domain-group-summary static-summary">
                      <span>{group.siteName}</span>
                      <small>{group.domain}</small>
                    </div>

                    <div className="single-group-body">
                      <Link href={`/links/${group.items[0].slug}`} className="table-link featured-link">
                        <span>{group.items[0].label}</span>
                        <small>{group.items[0].description}</small>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <details key={`${category.slug}-${group.domain}`} className="domain-group" open>
                    <summary className="domain-group-summary">
                      <span>{group.siteName}</span>
                      <small>
                        {group.domain} · {group.items.length} links
                      </small>
                    </summary>

                    <div className="link-table">
                      {group.items.map((item) => (
                        <Link key={item.slug} href={`/links/${item.slug}`} className="table-link">
                          <span>{item.label}</span>
                          <small>{item.description}</small>
                        </Link>
                      ))}
                    </div>
                  </details>
                )
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
