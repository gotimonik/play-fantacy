import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about the Play Fantacy directory and how the link archive is organized."
};

export default function AboutPage() {
  return (
    <main className="subpage-shell">
      <section className="legal-shell">
        <p className="eyebrow">About Us</p>
        <h1>About Us</h1>
        <div className="legal-copy">
          <p>
            Play Fantacy is a structured directory built from a saved markdown list of links. The
            site converts raw URLs into readable names, groups them into sections, and gives each
            destination its own detail page for easier browsing.
          </p>
          <p>
            The purpose of this site is organization and navigation. It does not claim ownership
            of external websites, brands, logos, or content linked from the directory.
          </p>
          <p>
            Link labels are generated from domains, paths, and known profile patterns to make the
            collection more readable than a plain text file.
          </p>
        </div>
      </section>
    </main>
  );
}
