const fs = require("fs");
const Module = require("module");
const path = require("path");
const ts = require("typescript");

const projectRoot = path.resolve(__dirname, "..");
process.chdir(projectRoot);

function loadDataModule() {
  const dataPath = path.resolve(projectRoot, "lib/data.ts");
  const source = fs.readFileSync(dataPath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: dataPath,
  });

  const dataModule = new Module(dataPath, module);
  dataModule.filename = dataPath;
  dataModule.paths = Module._nodeModulePaths(path.dirname(dataPath));
  dataModule._compile(outputText, dataPath);

  return dataModule.exports;
}

const { links, siteUrl } = loadDataModule();
const domain = siteUrl.replace(/\/+$/, "");
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

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const sitemapEntries = [
  ...staticPages.map(
    (page) =>
      `  <url><loc>${escapeXml(`${domain}/${page}`)}</loc>${page === "" ? "<priority>1.0</priority>" : ""}</url>`
  ),
  ...links.map(
    (link) =>
      `  <url><loc>${escapeXml(`${domain}/links/${link.slug}`)}</loc></url>`
  )
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join("\n")}\n</urlset>\n`;

fs.writeFileSync(path.resolve(projectRoot, "public/sitemap.xml"), sitemap);

console.log("Sitemap generated with", sitemapEntries.length, "entries.");
