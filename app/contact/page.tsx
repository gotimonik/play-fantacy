import type { Metadata } from "next";
import { Breadcrumbs } from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact and update guidance for Play Fantacy.",
};

export default function ContactPage() {
  return (
    <main className="subpage-shell">
      <Breadcrumbs />
      <section className="legal-shell">
        <p className="eyebrow">Contact Us</p>
        <h1>Contact Us</h1>
        <div className="legal-copy">
          <p>
            Play Fantacy is maintained as a curated directory experience built from a source list of
            saved links. If you are reviewing the site internally, the best place to improve
            quality is the underlying source file and the grouping logic that presents it.
          </p>
          <p>
            Common maintenance tasks include removing dead destinations, improving labels,
            reorganizing domain groups, and expanding original site copy where visitors need more
            context before they click out.
          </p>
          <p>
            For operational updates, policy changes, or future feature ideas, this page exists as
            a stable contact-style destination inside the site structure.
          </p>
        </div>
      </section>
    </main>
  );
}
