import type { Metadata } from "next";
import { Breadcrumbs } from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "Editorial and content guidelines for Play Fantacy.",
  alternates: {
    canonical: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <main className="subpage-shell">
      <Breadcrumbs />
      <section className="legal-shell">
        <p className="eyebrow">Editorial Policy</p>
        <h1>Editorial standards and original site structure</h1>
        <div className="legal-copy">
          <p>
            Play Fantacy is not a scraped article site and does not republish long-form content from
            third parties. Its original value comes from organization, grouping, labeling, and the
            way destinations are presented inside a cleaner internal structure.
          </p>
          <p>
            Page titles, route labels, domain groupings, and supporting copy are created for this
            site to help visitors understand what kind of destination they are about to open. The
            purpose is curation and navigation, not duplication of publisher content.
          </p>
          <p>
            When the source list changes, the site updates those labels and groups so the browsing
            experience stays readable, relevant, and easier to navigate than a raw bookmark file.
          </p>
          <p>
            If a link is misleading, broken, or grouped badly, it should be corrected in the
            source file so the site can continue to provide a higher-quality experience.
          </p>
        </div>
      </section>
    </main>
  );
}
