import type { MetadataRoute } from "next";
import { links, siteUrl } from "@/lib/data";

const staticRoutes = [
  "",
  "/links",
  "/about",
  "/how-it-works",
  "/contact",
  "/faq",
  "/editorial-policy",
  "/privacy-policy",
  "/terms-of-use",
  "/dmca",
  "/disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route, index) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: index === 0 ? "daily" : "weekly",
    priority: index === 0 ? 1 : 0.7,
  }));

  const detailEntries: MetadataRoute.Sitemap = links.map((item) => ({
    url: `${siteUrl}/links/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...detailEntries];
}
