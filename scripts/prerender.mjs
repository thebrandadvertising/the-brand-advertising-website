import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { render } from "../.ssr/entry-server.js";

const siteUrl = "https://thebrandadvertising.com";
const pages = [
  ["/", "The Brand Advertising | Pan-India Outdoor & Vehicle Branding", "The Brand Advertising is a pan-India marketing agency for auto hood branding, cab branding, retail branding, bus branding, wall painting and activations."],
  ["/about", "About The Brand Advertising | Pan-India Marketing Agency", "Meet The Brand Advertising, a pan-India agency creating vehicle branding, outdoor media, retail branding and on-ground brand experiences."],
  ["/services", "Advertising & Branding Services Across India | TBA", "Explore auto hood branding, cab and bus branding, retail branding, wall painting, product sampling, roadshows and corporate events across India."],
  ["/services/auto-hood-branding", "Auto Hood Branding & Auto Rickshaw Advertising in India | TBA", "Pan-India auto hood branding and auto rickshaw advertising. TBA plans, produces and executes branded auto campaigns across metro and regional markets."],
  ["/services/cab-branding", "Cab Branding & Taxi Advertising Agency in India | TBA", "Pan-India cab branding and taxi advertising campaigns for brands seeking high-visibility mobile outdoor media across major Indian cities."],
  ["/services/retail-branding", "Retail Branding & In-Store Branding Agency in India | TBA", "Retail branding, storefront visibility and in-store campaign execution across India. Create a consistent brand experience at the point of purchase."],
  ["/services/vehicle-branding", "Vehicle Branding Company in India | TBA", "Vehicle branding services across India for auto rickshaws, cabs, buses and campaign vans, coordinated from planning through on-ground execution."],
  ["/services/btl-activation", "BTL Activation & Experiential Marketing Agency in India | TBA", "Pan-India BTL activation and experiential marketing for product sampling, mall promotions, roadshows and direct consumer engagement."],
  ["/pan-india-coverage", "Pan-India Advertising Campaign Coverage | The Brand Advertising", "The Brand Advertising executes auto hood branding, cab branding, retail branding and outdoor campaigns across major cities and regional markets in India."],
  ["/campaigns", "Advertising Campaigns & Brand Activations | TBA India", "Explore outdoor advertising, vehicle branding and on-ground campaign work delivered by The Brand Advertising across India."],
  ["/contact", "Contact The Brand Advertising | Plan a Pan-India Campaign", "Contact The Brand Advertising for auto hood branding, cab branding, retail branding and campaign execution across India."],
];

const template = await readFile("dist/index.html", "utf8");
const schemaPattern = /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/;
const routeSchemaPattern = /<script\b[^>]*data-prerender-schema="true"[^>]*>([\s\S]*?)<\/script>/;
const homeSchema = JSON.parse(template.match(schemaPattern)?.[1] || "{}");
const sharedSchema = (homeSchema["@graph"] || []).filter((node) =>
  ["Organization", "WebSite"].includes(node["@type"]),
);
const escapeAttribute = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeText = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;");

for (const [path, title, description] of pages) {
  const url = `${siteUrl}${path}`;
  let appHtml = render(path);
  const routeSchemaMatch = appHtml.match(routeSchemaPattern);
  if (!routeSchemaMatch) throw new Error(`${path}: server render did not provide route schema`);

  const routeSchema = JSON.parse(routeSchemaMatch[1]);
  const pageSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [...sharedSchema, ...(routeSchema["@graph"] || [])],
  }).replace(/</g, "\\u003c");
  appHtml = appHtml.replace(routeSchemaPattern, "");

  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeText(title)}</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${escapeAttribute(description)}" />`)
    .replace(/<link rel="canonical" href=".*?"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${escapeAttribute(title)}" />`)
    .replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${escapeAttribute(description)}" />`)
    .replace(/<meta property="og:url" content=".*?"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta name="twitter:title" content=".*?"\s*\/>/, `<meta name="twitter:title" content="${escapeAttribute(title)}" />`)
    .replace(/<meta name="twitter:description" content=".*?"\s*\/>/, `<meta name="twitter:description" content="${escapeAttribute(description)}" />`)
    .replace(schemaPattern, `<script type="application/ld+json" id="site-schema">${pageSchema}</script>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const output = path === "/" ? "dist/index.html" : join("dist", `${path.slice(1)}.html`);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

await rm(".ssr", { recursive: true, force: true });
console.log(`Statically rendered ${pages.length} crawlable route files.`);
