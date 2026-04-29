import Link from "next/link";
import type { Metadata } from "next";
import { groupedLinksByCategory } from "@/lib/data";
import { getImageUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "All Links",
  description:
    "Browse every saved destination from the Play Fantacy bookmark directory, grouped by domain.",
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
                <details
                  key={`${category.slug}-${group.domain}`}
                  className="domain-group"
                >
                  <summary className="domain-group-summary">
                    <img
                      src={getImageUrl(group.items[0].imageIndex)}
                      alt={group.items[0].label}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <span>{group.siteName}</span>
                    <small>
                      {group.domain} · {group.items.length} links
                    </small>
                  </summary>

                  <div className="link-table">
                    {group.items.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/links/${item.slug}`}
                        className="table-link"
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
                          <div style={{ paddingLeft: 8, paddingRight: 8 }}>
                            <div>
                              <span style={{wordBreak: "break-word"}}>{item.label}</span>
                            </div>
                            <div>
                              <small>{item.description}</small>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
