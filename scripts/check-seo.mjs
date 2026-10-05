import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const siteUrl = "https://thebrandadvertising.com";
const sitemap = await readFile("public/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
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
  const title = value(html, /<title>(.*?)<\/title>/s);
  const description = value(html, /<meta name="description" content="(.*?)"\s*\/>/s);
  const canonical = value(html, /<link rel="canonical" href="(.*?)"\s*\/>/s);

  if (!title) errors.push(`${url}: missing title`);
  if (!description) errors.push(`${url}: missing meta description`);
  if (canonical !== url) errors.push(`${url}: canonical is ${canonical || "missing"}`);
  if (count(html, /<link rel="canonical"/g) !== 1) errors.push(`${url}: canonical count is not 1`);

  for (const property of ["og:title", "og:description", "og:url", "og:image"]) {
    if (!html.includes(`property="${property}"`)) errors.push(`${url}: missing ${property}`);
  }
  for (const name of ["twitter:card", "twitter:title", "twitter:description", "twitter:image", "viewport"]) {
    if (!html.includes(`name="${name}"`)) errors.push(`${url}: missing ${name}`);
  }

  if (title) {
    if (titles.has(title)) errors.push(`${url}: duplicate title also used by ${titles.get(title)}`);
    titles.set(title, url);
  }
}

const robots = await readFile("public/robots.txt", "utf8");
if (!robots.includes(`${siteUrl}/sitemap.xml`)) errors.push("robots.txt: sitemap URL missing");

if (errors.length) {
  console.error(`SEO validation failed with ${errors.length} issue(s):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`SEO validation passed for ${urls.length} sitemap URLs.`);
