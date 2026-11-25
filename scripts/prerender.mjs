import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { render } from "../.ssr/entry-server.js";

const siteUrl = "https://thebrandadvertising.com";
const pages = [
  ["/", "The Brand Advertising | Outdoor Advertising Agency in India", "Plan outdoor advertising, vehicle branding, retail campaigns and on-ground activations with The Brand Advertising. Share your markets and campaign goals."],
  ["/about", "The Brand Advertising | Agency & Founder Dimcy Aggarwal", "Meet The Brand Advertising and founder Dimcy Aggarwal. Learn about vehicle branding, retail visibility and on-ground activation work across India."],
  ["/services", "Outdoor Advertising & Brand Activation Services | TBA", "Compare vehicle branding, retail branding and on-ground activation formats. Explore campaign options and request a plan for your target markets."],
  ["/services/auto-hood-branding", "Auto Hood Branding in Delhi NCR | The Brand Advertising", "Explore auto hood branding services in Delhi NCR with The Brand Advertising. Reach local audiences through customized auto-rickshaw advertising campaigns."],
  ["/services/cab-branding", "Cab Branding & Taxi Advertising in India | TBA", "Explore cab branding formats, market planning, production and installation. Share target cities, dates and a fleet brief for a scoped campaign proposal."],
  ["/services/retail-branding", "Retail Branding & In-Store Campaigns | TBA India", "Plan storefront, in-store and point-of-sale branding for one outlet or a coordinated rollout. Share locations, formats and dates for a scoped proposal."],
  ["/services/vehicle-branding", "Vehicle Branding Services in India | TBA", "Compare auto, cab, bus and van branding for selected markets. Learn how TBA scopes artwork, availability, production and installation before a quote."],
  ["/services/btl-activation", "BTL Activation & Brand Experiences in India | TBA", "Explore on-ground brand activation, product sampling, mall promotions and roadshows. Plan the audience, venue, dates and execution scope with TBA."],
  ["/pan-india-coverage", "Pan-India Advertising Campaign Coverage | TBA", "Plan advertising and brand activations across selected Indian markets. TBA scopes local availability, production and coordination before confirming each campaign."],
  ["/campaigns", "Advertising Campaigns & Brand Activations | TBA", "Explore The Brand Advertising's documented on-ground campaign work and discuss a similar brief for your markets, audience and campaign goals."],
  ["/contact", "Contact The Brand Advertising | Plan a Campaign", "Tell TBA your target market, advertising format, audience and dates to start a scoped vehicle branding, retail or activation campaign discussion."],
];

const template = await readFile("dist/index.html", "utf8");
const schemaPattern = /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/;
const routeSchemaPattern = /<script\b[^>]*data-prerender-schema="true"[^>]*>([\s\S]*?)<\/script>/;
const homeSchema = JSON.parse(template.match(schemaPattern)?.[1] || "{}");
const sharedSchema = (homeSchema["@graph"] || []).filter((node) =>
  ["Organization", "Person", "WebSite"].includes(node["@type"]),
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
