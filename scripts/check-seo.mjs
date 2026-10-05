import { access, readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const siteUrl = "https://thebrandadvertising.com";
const sitemap = await readFile("public/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const urlSet = new Set(urls);
const titles = new Map();
const errors = [];

const count = (html, pattern) => [...html.matchAll(pattern)].length;
const value = (html, pattern) => html.match(pattern)?.[1]?.trim();

for (const url of urls) {
  const path = new URL(url).pathname;
  const file = path === "/" ? "dist/index.html" : join("dist", `${path.slice(1)}.html`);
  try {
    await access(file);
  } catch {
    errors.push(`${url}: missing generated HTML (${file})`);
    continue;
  }

  const html = await readFile(file, "utf8");
  const root = value(html, /<div id="root">([\s\S]*)<\/div>\s*<\/body>/);
  const title = value(html, /<title>(.*?)<\/title>/s);
  const description = value(html, /<meta name="description" content="(.*?)"\s*\/>/s);
  const canonical = value(html, /<link rel="canonical" href="(.*?)"\s*\/>/s);

  if (!title) errors.push(`${url}: missing title`);
  if (!description) errors.push(`${url}: missing meta description`);
  if (!root) errors.push(`${url}: missing statically rendered root content`);
  if (root) {
    const visibleText = root
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[^;]+;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (visibleText.split(/\s+/).length < 50) errors.push(`${url}: initial HTML contains too little visible text`);
    if (count(root, /<h1\b/g) !== 1) errors.push(`${url}: initial HTML must contain exactly one H1`);
    if (!/<main\b[^>]*id="main-content"/.test(root)) errors.push(`${url}: missing main content landmark`);
    if (count(root, /<a\b[^>]*href="\//g) < 5) errors.push(`${url}: too few crawlable internal links in initial HTML`);
    if (root.includes("data-prerender-schema")) errors.push(`${url}: temporary prerender schema marker was not removed`);
    for (const image of root.match(/<img\b[^>]*>/g) || []) {
      if (!/\bwidth="\d+"/.test(image) || !/\bheight="\d+"/.test(image)) {
        errors.push(`${url}: image missing intrinsic width or height (${image.slice(0, 100)}...)`);
      }
    }
  }
  if (canonical !== url) errors.push(`${url}: canonical is ${canonical || "missing"}`);
  if (count(html, /<link rel="canonical"/g) !== 1) errors.push(`${url}: canonical count is not 1`);
  if (/name="robots"[^>]*noindex/i.test(html)) errors.push(`${url}: unexpectedly marked noindex`);

  for (const property of ["og:title", "og:description", "og:url", "og:image", "og:image:width", "og:image:height", "og:image:alt"]) {
    if (!html.includes(`property="${property}"`)) errors.push(`${url}: missing ${property}`);
  }
  for (const name of ["twitter:card", "twitter:title", "twitter:description", "twitter:image", "twitter:image:alt", "viewport", "robots"]) {
    if (!html.includes(`name="${name}"`)) errors.push(`${url}: missing ${name}`);
  }

  const schemaBlocks = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (!schemaBlocks.length) errors.push(`${url}: missing structured data`);
  if (schemaBlocks.length !== 1) errors.push(`${url}: expected one authoritative JSON-LD graph, found ${schemaBlocks.length}`);
  const pageSchemas = [];
  let hasOrganization = false;
  let hasWebSite = false;
  let hasCampaignItems = false;
  let hasService = false;
  let hasBreadcrumbs = false;
  let hasFaq = false;
  for (const block of schemaBlocks) {
    try {
      const parsed = JSON.parse(block[1]);
      const nodes = parsed["@graph"] || [parsed];
      hasOrganization ||= nodes.some((node) => node["@type"] === "Organization");
      hasWebSite ||= nodes.some((node) => node["@type"] === "WebSite");
      hasCampaignItems ||= nodes.some((node) => node["@type"] === "ItemList" && node.name === "The Brand Advertising campaign work");
      hasService ||= nodes.some((node) => node["@type"] === "Service");
      hasBreadcrumbs ||= nodes.some((node) => node["@type"] === "BreadcrumbList");
      hasFaq ||= nodes.some((node) => node["@type"] === "FAQPage");
      pageSchemas.push(...nodes.filter((node) => {
        const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
        return types.includes("WebPage");
      }));
    } catch {
      errors.push(`${url}: invalid JSON-LD`);
    }
  }
  if (!pageSchemas.length) errors.push(`${url}: missing WebPage schema`);
  if (pageSchemas.length > 1) errors.push(`${url}: multiple WebPage schema nodes found`);
  if (pageSchemas[0]?.url !== url) errors.push(`${url}: WebPage schema URL is ${pageSchemas[0]?.url || "missing"}`);
  if (!hasOrganization) errors.push(`${url}: Organization schema missing`);
  if (!hasWebSite) errors.push(`${url}: WebSite schema missing`);
  if (path === "/campaigns" && !hasCampaignItems) errors.push(`${url}: campaign ItemList schema missing`);
  if (path.startsWith("/services/") && (!hasService || !hasBreadcrumbs || !hasFaq)) {
    errors.push(`${url}: service, breadcrumb or FAQ schema missing`);
  }

  if (title) {
    if (titles.has(title)) errors.push(`${url}: duplicate title also used by ${titles.get(title)}`);
    titles.set(title, url);
  }
}

if (urlSet.size !== urls.length) errors.push("sitemap.xml: duplicate URL entries found");

const robots = await readFile("public/robots.txt", "utf8");
if (!robots.includes(`${siteUrl}/sitemap.xml`)) errors.push("robots.txt: sitemap URL missing");
if (/Disallow:\s*\//i.test(robots)) errors.push("robots.txt: site-wide crawl blocking rule found");

const routeSources = [
  ["src/pages/Home.jsx", /<motion\.h1/],
  ["src/pages/Coverage.jsx", /<h1/],
  ["src/pages/ServiceDetail.jsx", /<h1/],
  ["src/components/RelaxingHero.jsx", /<motion\.h1/],
];
for (const [file, h1Pattern] of routeSources) {
  const source = await readFile(file, "utf8");
  if (!h1Pattern.test(source)) errors.push(`${file}: expected H1 pattern missing`);
}

const sourceFiles = (await readdir("src", { recursive: true }))
  .filter((file) => file.endsWith(".jsx"));
for (const file of sourceFiles) {
  const source = await readFile(join("src", file), "utf8");
  for (const match of source.matchAll(/(?:to|href)="(\/[^"?#]*)[^"\s]*"/g)) {
    const path = match[1] || "/";
    const target = `${siteUrl}${path}`;
    if (!urlSet.has(target) && path !== "/work") errors.push(`${join("src", file)}: internal link target missing from sitemap (${path})`);
  }
}

if (errors.length) {
  console.error(`SEO validation failed with ${errors.length} issue(s):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`SEO validation passed for ${urls.length} sitemap URLs.`);
