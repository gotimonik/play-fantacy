import Link from "next/link";
import type { Metadata } from "next";
import { groupedLinksByCategory } from "@/lib/data";
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

      {groupedLinksByCategory.map(({ category, groups }) => {
        return (
          <section key={category.slug} className="links-section">
            <div className="category-header">
              <h2>{category.name}</h2>
              <span>{groups.length} domains</span>
            </div>
            <p>{category.description}</p>

            <div className="domain-group-list">
              {groups.map((group) =>
                group.items.length === 1 ? (
                  <Link
                    key={group.items[0].slug}
                    href={`/links/${group.items[0].slug}`}
                    className="table-link"
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
                        {group.domain}
                      </small>
                    </summary>
                  </Link>
                ) : (
                  // <details
                  //   key={`${category.slug}-${group.domain}`}
                  //   className="domain-group"
                  // >
                  //   <summary className="domain-group-summary">
                  //     <Link
                  //       key={group.items[0].slug}
                  //       href={`/links/${group.items[0].slug}`}
                  //       className="table-link"
                  //     >
                  //       <div style={{ display: "flex" }}>
                  //         <div>
                  //           <img
                  //             src={getImageUrl(group.items[0].imageIndex)}
                  //             alt={group.items[0].label}
                  //             style={{
                  //               width: "100px",
                  //               height: "100px",
                  //               objectFit: "cover",
                  //               borderRadius: "8px",
                  //             }}
                  //           />
                  //         </div>
                  //         <div style={{ paddingLeft: 8, paddingRight: 8 }}>
                  //           <div>
                  //             <span style={{ wordBreak: "break-word" }}>
                  //               {group.items[0].label}
                  //             </span>
                  //           </div>
                  //           <div>
                  //             <small>{group.items[0].description}</small>
                  //           </div>
                  //         </div>
                  //       </div>
                  //     </Link>
                  //   </summary>
                  // </details>
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
                                <span style={{ wordBreak: "break-word" }}>
                                  {item.label}
                                </span>
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
                ),
              )}
            </div>
          </section>
        );
      })}
    </main>
  );
}
