import Link from "next/link";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Play Fantacy",
    template: "%s | Play Fantacy"
  },
  description:
    "A grouped homepage for a personal link collection with readable names and direct outbound pages.",
  applicationName: "Play Fantacy",
  keywords: [
    "bookmark directory",
    "link hub",
    "homepage links",
    "curated links",
    "personal bookmarks"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Play Fantacy",
    description:
      "Browse a large personal link collection grouped into readable categories.",
    siteName: "Play Fantacy"
  },
  twitter: {
    card: "summary_large_image",
    title: "Play Fantacy",
    description:
      "Browse a large personal link collection grouped into readable categories."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body>
        <div className="site-frame">
          <header className="site-header">
            <div className="site-header-inner">
              <Link href="/" className="brand-mark">
                Play Fantacy
              </Link>

              <nav className="site-nav" aria-label="Primary">
                <Link href="/">Home</Link>
                <Link href="/links">All Links</Link>
                <Link href="/about">About Us</Link>
                <Link href="/how-it-works">How It Works</Link>
                <Link href="/faq">FAQ</Link>
                <Link href="/editorial-policy">Editorial Policy</Link>
                <Link href="/contact">Contact Us</Link>
                <Link href="/terms-of-use">Terms of Use</Link>
                <Link href="/dmca">DMCA</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/disclaimer">Disclaimer</Link>
              </nav>
            </div>
          </header>

          {children}

          <footer className="site-footer">
            <div className="site-footer-grid">
              <div>
                <p className="eyebrow">Play Fantacy</p>
                <p className="footer-copy">
                  A structured homepage for a large personal link collection with grouped
                  navigation and readable labels.
                </p>
              </div>

              <div>
                <p className="footer-heading">Navigation</p>
                <div className="footer-links">
                  <Link href="/">Home</Link>
                  <Link href="/links">All Links</Link>
                  <Link href="/about">About Us</Link>
                  <Link href="/how-it-works">How It Works</Link>
                </div>
              </div>

              <div>
                <p className="footer-heading">Content</p>
                <div className="footer-links">
                  <Link href="/faq">FAQ</Link>
                  <Link href="/editorial-policy">Editorial Policy</Link>
                  <Link href="/contact">Contact Us</Link>
                </div>
              </div>

              <div>
                <p className="footer-heading">Policies</p>
                <div className="footer-links">
                  <Link href="/terms-of-use">Terms of Use</Link>
                  <Link href="/dmca">DMCA</Link>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                  <Link href="/disclaimer">Disclaimer</Link>
                </div>
              </div>
            </div>

            <p className="footer-note">
              Copyright {currentYear} Play Fantacy. External sites remain the property and
              responsibility of their respective owners.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
