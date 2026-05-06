import type { Metadata } from "next";
import { Breadcrumbs } from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Play Fantacy directory.",
  alternates: {
    canonical: "/terms-of-use",
  },
};

export default function TermsOfUsePage() {
  return (
    <main className="subpage-shell">
      <Breadcrumbs />
      <section className="legal-shell">
        <p className="eyebrow">Terms of Use</p>
        <h1>Terms of Use</h1>
        <div className="legal-copy">
          <p>
            Play Fantacy is provided as a directory and navigation experience built from a saved link
            source. By using the site, visitors agree to open and use external destinations at
            their own discretion.
          </p>
          <p>
            The site does not guarantee the availability, safety, legality, or ongoing accuracy of
            third-party destinations. External websites remain responsible for their own content,
            policies, and operations.
          </p>
          <p>
            The internal structure, labels, grouping logic, and supporting copy of Play Fantacy are
            part of the site experience and may change over time as the source file and site
            structure are updated.
          </p>
        </div>
      </section>
    </main>
  );
}
