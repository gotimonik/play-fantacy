import type { Metadata } from "next";
import { Breadcrumbs } from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for the Play Fantacy directory.",
};

export default function DisclaimerPage() {
  return (
    <main className="subpage-shell">
      <Breadcrumbs />
      <section className="legal-shell">
        <p className="eyebrow">Disclaimer</p>
        <h1>Disclaimer</h1>
        <div className="legal-copy">
          <p>
            Play Fantacy is a directory of outbound links gathered from a source file. The site is
            provided for informational and navigational purposes only.
          </p>
          <p>
            External websites linked from this directory are owned and operated by third parties.
            Play Fantacy does not control the accuracy, availability, legality, safety, or policies
            of those external destinations.
          </p>
          <p>
            Visitors are responsible for reviewing the rules, terms, and policies of any website
            they choose to open from this directory.
          </p>
          <p>
            If any destination is outdated, unavailable, or should be removed from the source
            list, the underlying `links.md` file should be updated so the directory can refresh
            from the correct source.
          </p>
        </div>
      </section>
    </main>
  );
}
