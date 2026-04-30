import Link from "next/link";
import type { Metadata } from "next";
import { groupedLinksByCategory, groupedLinksByCategorySorted } from "@/lib/data";
import { getImageUrl } from "@/lib/utils";
import { Breadcrumbs } from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "All Links",
  description:
    "Browse every saved destination from the Play Fantacy bookmark directory, grouped by domain.",
};

export default function LinksPage() {
  return (
    <main className="subpage-shell">
      <Breadcrumbs />
      <div className="section-heading">
        <p className="eyebrow">Full index</p>
        <h1>Every saved link grouped under its domain</h1>
      </div>

      <div className="category-grid">
        {groupedLinksByCategorySorted.map(({ category, groups }) => {
          return (
            <details
              key={`${category.slug}-${category.name}`}
              className="domain-group category-card"
              open
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
                      open={group.items.length <= 12}
                    >
                      <summary className="domain-group-summary">
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
                                {group.siteName} -{" "}
                                <span
                                  style={{
                                    color: "var(--accent-deep)",
                                    padding: 0,
                                  }}
                                >
                                  {group.items.length} link{" "}
                                  {group.items.length > 1 ? "s" : ""}
                                </span>
                              </span>
                            </div>
                            <div>
                              <small>{group.domain}</small>
                            </div>
                          </div>
                        </div>
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
                                      <span>
                                        {groups.length} domain
                                        {groups.length > 1 ? "s" : ""}
                                      </span>
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
            </details>
          );
        })}
      </div>
    </main>
  );
}
