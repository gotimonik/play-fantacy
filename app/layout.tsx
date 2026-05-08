import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import { siteUrl } from "@/lib/data";
import { GA_MEASUREMENT_ID, isGAEnabled } from "@/lib/analytics";
import { AnalyticsTracker } from "./components/AnalyticsTracker";
import { NavigationMemory } from "./components/NavigationMemory";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Play Fantacy",
    template: "%s | Play Fantacy"
  },
  description:
    "A grouped homepage for a large link collection with readable names and direct outbound pages.",
  applicationName: "Play Fantacy",
  category: "directory",
  keywords: [
    "bookmark directory",
    "link hub",
    "homepage links",
    "curated links",
    "personal bookmarks"
  ],
  creator: "Play Fantacy",
  publisher: "Play Fantacy",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Play Fantacy",
    description:
      "Browse a large personal link collection grouped into readable categories.",
    siteName: "Play Fantacy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Play Fantacy"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Play Fantacy",
    description:
      "Browse a large personal link collection grouped into readable categories.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

const GOOGLE_ADSENSE_PUBLISHER_ID = "pub-6031242056409187";

const fundingChoicesPresenceSignal = `
  (function() {
    function signalGooglefcPresent() {
      if (!window.frames['googlefcPresent']) {
        if (document.body) {
          const iframe = document.createElement('iframe');
          iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
          iframe.style.display = 'none';
          iframe.name = 'googlefcPresent';
          document.body.appendChild(iframe);
        } else {
          setTimeout(signalGooglefcPresent, 0);
        }
      }
    }
    signalGooglefcPresent();
  })();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="google-adsense-account" content="ca-pub-6031242056409187" />
        <meta property="og:image" content="/og-image.png" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6031242056409187"
          crossOrigin="anonymous"
        />
        <script
          async
          src={`https://fundingchoicesmessages.google.com/i/${GOOGLE_ADSENSE_PUBLISHER_ID}?ers=1`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: fundingChoicesPresenceSignal,
          }}
        />
        {isGAEnabled() ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
              `,
              }}
            />
          </>
        ) : null}
      </head>
      <body>
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <NavigationMemory />
        <div className="site-frame">
          <header className="site-header">
            <div className="site-header-inner">
              <Link href="/" className="brand-mark">
                Play Fantacy
              </Link>

              <nav className="site-nav" aria-label="Primary">
                <Link href="/" data-ga-click="nav_home" data-ga-location="header">Home</Link>
                <Link href="/links" data-ga-click="nav_all_links" data-ga-location="header">All Links</Link>
                <Link href="/about" data-ga-click="nav_about" data-ga-location="header">About Us</Link>
                <Link href="/how-it-works" data-ga-click="nav_how_it_works" data-ga-location="header">How It Works</Link>
                <Link href="/contact" data-ga-click="nav_contact" data-ga-location="header">Contact Us</Link>
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
                  <Link href="/" data-ga-click="footer_nav_home" data-ga-location="footer">Home</Link>
                  <Link href="/links" data-ga-click="footer_nav_all_links" data-ga-location="footer">All Links</Link>
                  <Link href="/about" data-ga-click="footer_nav_about" data-ga-location="footer">About Us</Link>
                  <Link href="/how-it-works" data-ga-click="footer_nav_how_it_works" data-ga-location="footer">How It Works</Link>
                </div>
              </div>

              <div>
                <p className="footer-heading">Content</p>
                <div className="footer-links">
                  <Link href="/faq" data-ga-click="footer_content_faq" data-ga-location="footer">FAQ</Link>
                  <Link href="/editorial-policy" data-ga-click="footer_content_editorial_policy" data-ga-location="footer">Editorial Policy</Link>
                  <Link href="/contact" data-ga-click="footer_content_contact" data-ga-location="footer">Contact Us</Link>
                </div>
              </div>

              <div>
                <p className="footer-heading">Policies</p>
                <div className="footer-links">
                  <Link href="/terms-of-use" data-ga-click="footer_policy_terms" data-ga-location="footer">Terms of Use</Link>
                  <Link href="/dmca" data-ga-click="footer_policy_dmca" data-ga-location="footer">DMCA</Link>
                  <Link href="/privacy-policy" data-ga-click="footer_policy_privacy" data-ga-location="footer">Privacy Policy</Link>
                  <Link href="/disclaimer" data-ga-click="footer_policy_disclaimer" data-ga-location="footer">Disclaimer</Link>
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
