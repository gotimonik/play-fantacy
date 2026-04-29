import type { Metadata } from "next";
import { Breadcrumbs } from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Play Fantacy directory.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="subpage-shell">
      <Breadcrumbs />
      <section className="legal-shell">
        <p className="eyebrow">Privacy Policy</p>
        <h1>Privacy Policy</h1>
        <div className="legal-copy">
          <p>
            Play Fantacy is a simple directory site. The site itself is designed to present grouped
            link pages and does not ask visitors to create accounts or submit personal profiles.
          </p>
          <p>
            Basic server logs, browser requests, and standard technical analytics may be collected
            by hosting providers or infrastructure services for performance, security, and abuse
            prevention.
          </p>
          <p>
            External websites linked from this directory operate under their own privacy policies.
            Once you leave Play Fantacy, the handling of your information is controlled by the
            destination website.
          </p>
          <p>
            If advertising, analytics, forms, or cookies are added in the future, this page should
            be updated to reflect those changes accurately before they are used in production.
          </p>
        </div>
      </section>
    </main>
  );
}
