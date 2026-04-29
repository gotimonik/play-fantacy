const fs = require("fs");
const path = require("path");

const domain = "https://playfantacy.com";
const staticPages = [
  "",
  "about",
  "contact",
  "disclaimer",
  "dmca",
  "editorial-policy",
  "faq",
  "how-it-works",
  "links",
  "privacy-policy",
  "terms-of-use"
];

// Read and parse links.md
const linksMdPath = path.resolve(__dirname, "../lib/links.md");
const linkLines = fs.readFileSync(linksMdPath, "utf8")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.startsWith("http://") || line.startsWith("https://"));

function slugify(url) {
  try {
    const u = new URL(url);
    const domain = u.hostname.replace(/^www\./, "");
    let label = u.pathname === "/" ? "homepage" : u.pathname.split("/").filter(Boolean).pop() || "page";
    label = label.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
    return `${domain}-${label}`;
  } catch {
    return "link";
  }
}

const sitemapEntries = [
  ...staticPages.map(
    (page) =>
      `  <url><loc>${domain}/${page}</loc>${page === "" ? "<priority>1.0</priority>" : ""}</url>`
  ),
  ...linkLines.map(
    (url) =>
      `  <url><loc>${domain}/links/${slugify(url)}</loc></url>`
  )
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join("\n")}\n</urlset>\n`;

fs.writeFileSync(path.resolve(__dirname, "../public/sitemap.xml"), sitemap);

console.log("Sitemap generated with", sitemapEntries.length, "entries.");
