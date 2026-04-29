import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export const MAX_IMAGE_INDEX = 291;
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://playfantacy.com";

const linksSourcePath = path.resolve("lib/links.md");

export const categories = [
  {
    slug: "searches",
    name: "Search Pages",
    description: "Search-driven destinations grouped under the same domain for easier browsing."
  },
  {
    slug: "directories",
    name: "Directories & Lists",
    description: "Collection pages, recommendation hubs, and route-based directory pages."
  },
  {
    slug: "sites-1",
    name: "Sites 1",
    description: "Direct site links, galleries, and standalone destinations from the saved list (part 1)."
  },
  {
    slug: "sites-2",
    name: "Sites 2",
    description: "Direct site links, galleries, and standalone destinations from the saved list (part 2)."
  },
  {
    slug: "sites-3",
    name: "Sites 3",
    description: "Direct site links, galleries, and standalone destinations from the saved list (part 3)."
  },
  {
    slug: "sites-4",
    name: "Sites 4",
    description: "Direct site links, galleries, and standalone destinations from the saved list (part 4)."
  },
  {
    slug: "sites-5",
    name: "Sites 5",
    description: "Direct site links, galleries, and standalone destinations from the saved list (part 5)."
  },
  {
    slug: "sites-6",
    name: "Sites 6",
    description: "Direct site links, galleries, and standalone destinations from the saved list (part 6)."
  },
  {
    slug: "platforms",
    name: "Studios & Platforms",
    description: "Studio tours, creator platforms, signups, and premium network pages."
  },
  {
    slug: "tumblr",
    name: "Tumblr Blogs",
    description: "Tumblr blogs and Tumblr account pages kept together."
  },
  {
    slug: "communities",
    name: "Communities",
    description: "Community-style destinations such as forums, subreddit pages, and shared hubs."
  },
  {
    slug: "profiles",
    name: "Profiles & Channels",
    description: "Profile pages, channels, and creator or account-based destinations."
  },
  {
    slug: "tools",
    name: "Tools & Downloads",
    description: "Extensions, downloads, and utility pages from the source file."
  },
  {
    slug: "tblop",
    name: "TBLOP",
    description: "Links that point back to TBLOP pages and related destinations."
  }
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export type LinkItem = {
  slug: string;
  name: string;
  label: string;
  siteName: string;
  domain: string;
  url: string;
  rawUrl: string;
  category: CategorySlug;
  description: string;
  imageIndex: number;
};

export type DomainGroup = {
  slug: string;
  siteName: string;
  domain: string;
  category: CategorySlug;
  description: string;
  imageIndex: number;
  items: LinkItem[];
};

const knownRootNames: Record<string, string> = {
  "arabhotx.com": "ArabHotX",
  "arabporn.fun": "ArabPorn.fun",
  "arabxnxx.com": "ArabXNXX",
  "beeg.com": "Beeg",
  "bokepindo.to": "Bokepindo",
  "chaturbate.com": "Chaturbate",
  "fullxcinema.com": "FullxCinema",
  "jerkmate.com": "Jerkmate",
  "justpicsplease.com": "Just Pics Please",
  "lesbify.com": "Lesbify",
  "link.pornmate.com": "Pornmate Links",
  "mature-nl.eu": "Mature NL",
  "milfslesbian.com": "Milfs Lesbian",
  "nakedhorizon.com": "Naked Horizon",
  "pornmate.com": "Pornmate",
  "pornstargold.com": "Pornstar Gold",
  "pornstill.com": "PornStill",
  "porndope.com": "PornDope",
  "porngale.com": "PornGale",
  "spankbang.com": "SpankBang",
  "stufferdb.com": "StufferDB",
  "thesexlist.com": "The Sex List",
  "www.cliphunter.com": "ClipHunter",
  "www.desitales2.com": "DesiTales 2",
  "www.iknowthatgirl.com": "I Know That Girl",
  "www.manyvids.com": "ManyVids",
  "www.maturecams.com": "MatureCams",
  "www.pornhub.com": "Pornhub",
  "www.pornhubpremium.com": "Pornhub Premium",
  "www.pornmd.com": "PornMD",
  "www.primepornlist.com": "Prime Porn List",
  "www.redbled.com": "RedBled",
  "www.redtube.com": "RedTube",
  "www.sunporno.com": "SunPorno",
  "www.tblop.com": "TBLOP",
  "www.tube8.com": "Tube8",
  "www.videobox.com": "VideoBox",
  "www.vporn.com": "vPorn",
  "www.xnxx.com": "XNXX",
  "www.xvideos.com": "XVideos",
  "www.youporn.com": "YouPorn",
  "xhamster.com": "xHamster",
  "xnxxsexhd.org": "XNXX Sex HD",
  "zebawy.com": "Zebawy"
};

const directoryHosts = new Set(["link.pornmate.com", "pornmate.com", "thesexlist.com"]);
const platformHosts = new Set([
  "chaturbate.com",
  "jerkmate.com",
  "www.iknowthatgirl.com",
  "www.manyvids.com",
  "www.maturecams.com",
  "www.pornhubpremium.com",
  "www.videobox.com"
]);
const communityHosts = new Set(["reddit.com", "www.reddit.com"]);
const toolHosts = new Set(["addons.mozilla.org", "chrome.google.com", "www.xnview.com"]);
const profileHosts = new Set([
  "soundcloud.com",
  "steamcommunity.com",
  "twitter.com",
  "www.pornhub.com",
  "www.youtube.com"
]);

function loadRawLinks() {
  if (!existsSync(linksSourcePath)) {
    return [] as string[];
  }

  return readFileSync(linksSourcePath, "utf8")
    .split(/\r?\n/g)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("http://") || line.startsWith("https://"));
}

function decodeSegment(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function titleize(value: string) {
  const acronymMap: Record<string, string> = {
    anal: "Anal",
    bdsm: "BDSM",
    milf: "MILF",
    nsfw: "NSFW",
    pornmd: "PornMD",
    pov: "POV",
    r18: "R18",
    tblop: "TBLOP",
    xnxx: "XNXX"
  };

  return decodeSegment(value)
    .replace(/\+/g, " ")
    .replace(/[-_]+/g, " ")
    .replace(/\.htm$/i, "")
    .replace(/\.php$/i, "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => {
      const lower = word.toLowerCase();

      if (acronymMap[lower]) {
        return acronymMap[lower];
      }

      if (/^[A-Z0-9]{2,}$/.test(word)) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function formatDomain(hostname: string) {
  return hostname.replace(/^www\./, "");
}

function normalizeExternalUrl(entry: string) {
  const trimmed = entry.trim();

  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      return new URL(trimmed).toString();
    } catch {
      return trimmed;
    }
  }

  if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(trimmed)) {
    try {
      return new URL(`https://${trimmed}`).toString();
    } catch {
      return trimmed;
    }
  }

  return trimmed;
}

function siteNameForHost(hostname: string) {
  return knownRootNames[hostname] || titleize(formatDomain(hostname));
}

function categorize(url: URL): CategorySlug {
  const hostname = url.hostname.toLowerCase();

  if (hostname === "www.tblop.com") {
    return "tblop";
  }

  if (hostname === "www.pornmd.com") {
    return "searches";
  }

  if (hostname === "www.tumblr.com" || hostname.endsWith(".tumblr.com")) {
    return "tumblr";
  }

  if (directoryHosts.has(hostname)) {
    return "directories";
  }

  if (platformHosts.has(hostname)) {
    return "platforms";
  }

  if (communityHosts.has(hostname)) {
    return "communities";
  }

  if (toolHosts.has(hostname)) {
    return "tools";
  }

  if (profileHosts.has(hostname)) {
    return "profiles";
  }

  // Split sites into 6 buckets
  // We'll assign based on the hash of the hostname to distribute evenly
  const sitesBuckets = ["sites-1", "sites-2", "sites-3", "sites-4", "sites-5", "sites-6"];
  if (true) {
    // Only for sites
    const hash = Array.from(hostname).reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return sitesBuckets[hash % 6] as CategorySlug;
  }
}

function getQueryValue(url: URL, key: string) {
  const value = url.searchParams.get(key);
  return value ? titleize(value) : "";
}

function labelForUrl(url: URL, category: CategorySlug, siteName: string) {
  const hostname = url.hostname.toLowerCase();
  const pathParts = url.pathname.split("/").filter(Boolean);
  const lastPart = pathParts[pathParts.length - 1];
  const isRootOnly = (url.pathname === "" || url.pathname === "/") && !url.search && !url.hash;

  if (isRootOnly) {
    return "Homepage";
  }

  if (hostname === "www.pornmd.com") {
    return lastPart ? titleize(lastPart) : "Search";
  }

  if (hostname === "pornmate.com") {
    return lastPart ? titleize(lastPart) : siteName;
  }

  if (hostname === "link.pornmate.com") {
    const sitePart = pathParts[pathParts.length - 1];
    return sitePart ? titleize(sitePart) : "Linked Site";
  }

  if (hostname === "thesexlist.com") {
    return lastPart ? titleize(lastPart) : siteName;
  }

  if (hostname === "www.pornhub.com") {
    if (pathParts[0] === "users" && pathParts[1]) {
      return titleize(pathParts[1]);
    }

    return pathParts.length > 0 ? titleize(lastPart) : siteName;
  }

  if (hostname === "www.youtube.com") {
    if (url.pathname === "/playlist") {
      return "Playlist";
    }

    if (pathParts[0] === "channel") {
      return `Channel ${pathParts[1] ?? ""}`.trim();
    }

    return pathParts.length > 0 ? titleize(lastPart) : siteName;
  }

  if (hostname.endsWith(".tumblr.com")) {
    return titleize(hostname.replace(".tumblr.com", ""));
  }

  if (hostname === "www.tumblr.com") {
    return pathParts.length > 0 ? titleize(pathParts.join(" ")) : siteName;
  }

  if (communityHosts.has(hostname)) {
    if (pathParts[0] === "r" && pathParts[1]) {
      return `r/${decodeSegment(pathParts[1])}`;
    }

    if (pathParts[0] === "user" && pathParts[1]) {
      return `u/${decodeSegment(pathParts[1])}`;
    }
  }

  if (category === "profiles") {
    if (pathParts[0]) {
      return titleize(pathParts[pathParts.length - 1]);
    }

    return siteName;
  }

  if (hostname === "www.videobox.com") {
    return getQueryValue(url, "pid") || siteName;
  }

  if (hostname === "www.pornhubpremium.com") {
    return titleize(pathParts[0] || "Premium Signup");
  }

  if (pathParts.length > 0) {
    return titleize(lastPart);
  }

  if (url.search) {
    const joined = [...url.searchParams.entries()]
      .map(([key, value]) => `${titleize(key)} ${titleize(value)}`.trim())
      .join(" ");
    return joined || siteName;
  }

  return siteName;
}

function buildItemName(siteName: string, label: string) {
  if (label === "Homepage") {
    return siteName;
  }

  return siteName === label ? siteName : `${siteName}: ${label}`;
}

function buildDescription(url: URL, category: CategorySlug, label: string) {
  const domain = formatDomain(url.hostname);

  switch (category) {
    case "searches":
      return `Saved search route for ${label} on ${domain}.`;
    case "directories":
      return `Directory or listing route saved from ${domain}.`;
    case "platforms":
      return `Studio, signup, or premium platform route on ${domain}.`;
    case "tumblr":
      return `Tumblr destination saved from ${domain}.`;
    case "communities":
      return `Community-style destination saved from ${domain}.`;
    case "profiles":
      return `Profile or channel page saved from ${domain}.`;
    case "tools":
      return `Tool or download page saved from ${domain}.`;
    case "tblop":
      return `TBLOP page saved directly from the source list.`;
    default:
      return `Direct site route saved from ${domain}.`;
  }
}

const slugCounts = new Map<string, number>();

function createUniqueSlug(base: string) {
  const nextCount = (slugCounts.get(base) || 0) + 1;
  slugCounts.set(base, nextCount);

  return nextCount === 1 ? base : `${base}-${nextCount}`;
}

const rawLinks = loadRawLinks();

export const links: LinkItem[] = rawLinks
  .map((entry, index) => {
    const normalizedUrl = normalizeExternalUrl(entry);
    const url = new URL(normalizedUrl);
    const category = categorize(url);
    const siteName = siteNameForHost(url.hostname.toLowerCase());
    const label = labelForUrl(url, category, siteName);
    const name = buildItemName(siteName, label);
    const slugBase = slugify(`${formatDomain(url.hostname)}-${label || siteName}`);
    const imageIndex = index > MAX_IMAGE_INDEX ? Math.floor(index % MAX_IMAGE_INDEX) + 1 : index;

    return {
      slug: createUniqueSlug(slugBase || "link"),
      name,
      label,
      siteName,
      domain: formatDomain(url.hostname),
      url: normalizedUrl,
      rawUrl: entry,
      category,
      description: buildDescription(url, category, label),
      imageIndex
    };
  })
  .sort((a, b) => a.siteName.localeCompare(b.siteName) || a.label.localeCompare(b.label));

export const activeCategories = categories.filter((category) =>
  links.some((link) => link.category === category.slug)
);

export const domainGroups: DomainGroup[] = (() => {
  const groups = new Map<string, DomainGroup>();
  for (const link of links) {
    const key = `${link.category}::${link.domain}`;
    const existing = groups.get(key);
    const imageIndex = groups.size > MAX_IMAGE_INDEX ? Math.floor(groups.size % MAX_IMAGE_INDEX) + 1 : groups.size;

    if (existing) {
      existing.items.push(link);
      continue;
    }

    groups.set(key, {
      slug: slugify(`${link.category}-${link.domain}`),
      siteName: link.siteName,
      domain: link.domain,
      category: link.category,
      description: `Saved links from ${link.siteName}.`,
      imageIndex,
      items: [link]
    });
  }

  return [...groups.values()]
    .map((group) => ({
      ...group,
      items: group.items.sort((a, b) => a.label.localeCompare(b.label))
    }))
    .sort(
      (a, b) =>
        b.items.length - a.items.length ||
        a.siteName.localeCompare(b.siteName) ||
        a.domain.localeCompare(b.domain)
    );
})();

export const groupedLinksByCategory = activeCategories.map((category) => ({
  category,
  groups: domainGroups.filter((group) => group.category === category.slug)
})).sort((a, b) => a.groups.length - b.groups.length || a.category.name.localeCompare(b.category.name));

export function getGroupsByCategory(slug: string) {
  return domainGroups.filter((group) => group.category === slug);
}

export function getLinkBySlug(slug: string) {
  return links.find((link) => link.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getDomainGroupForLink(link: LinkItem) {
  return domainGroups.find(
    (group) => group.category === link.category && group.domain === link.domain
  );
}
