import type { Metadata } from "next";
import { Breadcrumbs } from "../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about how Play Fantacy is organized and used.",
  alternates: {
    canonical: "/faq",
  },
};

const faqs = [
  {
    question: "What makes this site different from a plain bookmark list?",
    answer:
      "The site adds original structure around the saved links by grouping domains, generating readable labels, and giving each destination its own internal page."
  },
  {
    question: "Does Play Fantacy host third-party content?",
    answer:
      "No. Play Fantacy is a directory and navigation layer. External destinations remain on their own domains and under their own ownership."
  },
  {
    question: "Why are some domains shown with multiple sub-links?",
    answer:
      "When several saved URLs belong to the same domain, the site groups them together so visitors can browse related routes without seeing the same website repeated as separate top-level cards."
  },
  {
    question: "Where do updates come from?",
    answer:
      "The directory is powered by the local links source file. When the list changes, the site can regenerate the labels, pages, and grouped sections from that updated source."
  }
];

export default function FaqPage() {
  return (
    <main className="subpage-shell">
      <Breadcrumbs />
      <section className="legal-shell">
        <p className="eyebrow">FAQ</p>
        <h1>Frequently asked questions</h1>
        <div className="legal-copy">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
