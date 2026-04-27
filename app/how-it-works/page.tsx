import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description: "See how Play Fantacy organizes, groups, and presents saved links."
};

export default function HowItWorksPage() {
  return (
    <main className="subpage-shell">
      <section className="legal-shell">
        <p className="eyebrow">How It Works</p>
        <h1>How Play Fantacy turns a raw list into a usable night directory</h1>
        <div className="legal-copy">
          <p>
            Play Fantacy starts with a single source file of saved links and transforms that list into
            a structured browsing experience. Instead of forcing visitors to scroll through raw
            URLs, the site groups destinations by category and then by shared domain.
          </p>
          <p>
            Repeated domains are bundled together so related routes stay connected. That makes it
            easier to understand whether a visitor is entering a homepage, a search route, a list
            page, or a profile page before they click through.
          </p>
          <p>
            Each saved destination also gets its own detail page. That extra layer gives the site
            more original structure, more readable content, and a clearer path between browsing,
            evaluating, and opening an external destination.
          </p>
        </div>
      </section>
    </main>
  );
}
