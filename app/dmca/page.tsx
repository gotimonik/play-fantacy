import type { Metadata } from "next";
import { Breadcrumbs } from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "DMCA",
  description: "DMCA notice page for Play Fantacy."
};

export default function DmcaPage() {
  return (
    <main className="subpage-shell">
      <Breadcrumbs />
      <section className="legal-shell">
        <p className="eyebrow">DMCA</p>
        <h1>DMCA Notice</h1>
        <div className="legal-copy">
          <p>
            Play Fantacy is a directory of outbound links and does not position itself as the owner of
            third-party content found on external destinations. If a link should be reviewed or
            removed, the source list and site output should be updated accordingly.
          </p>
          <p>
            Rights holders who believe a destination has been listed in error should request review
            through the site maintenance process so the relevant link can be evaluated and removed
            where appropriate.
          </p>
          <p>
            This page exists to make the site structure more complete and to provide a clear policy
            location for handling takedown-related concerns.
          </p>
        </div>
      </section>
    </main>
  );
}
