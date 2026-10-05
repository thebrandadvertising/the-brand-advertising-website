import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { campaignSchema } from "../src/data/campaignSeo.js";

const siteUrl = "https://thebrandadvertising.com";
const basePages = [
  ["/about", "About The Brand Advertising | Pan-India Marketing Agency", "Meet The Brand Advertising, a pan-India agency creating vehicle branding, outdoor media, retail branding and on-ground brand experiences.", "AboutPage"],
  ["/services", "Advertising & Branding Services Across India | TBA", "Explore auto hood branding, cab and bus branding, retail branding, wall painting, product sampling, roadshows and corporate events across India.", "CollectionPage"],
  ["/services/auto-hood-branding", "Auto Hood Branding & Auto Rickshaw Advertising in India | TBA", "Pan-India auto hood branding and auto rickshaw advertising. TBA plans, produces and executes branded auto campaigns across metro and regional markets.", "ItemPage"],
  ["/services/cab-branding", "Cab Branding & Taxi Advertising Agency in India | TBA", "Pan-India cab branding and taxi advertising campaigns for brands seeking high-visibility mobile outdoor media across major Indian cities.", "ItemPage"],
  ["/services/retail-branding", "Retail Branding & In-Store Branding Agency in India | TBA", "Retail branding, storefront visibility and in-store campaign execution across India. Create a consistent brand experience at the point of purchase.", "ItemPage"],
  ["/services/vehicle-branding", "Vehicle Branding Company in India | TBA", "Vehicle branding services across India for auto rickshaws, cabs, buses and campaign vans, coordinated from planning through on-ground execution.", "ItemPage"],
  ["/services/btl-activation", "BTL Activation & Experiential Marketing Agency in India | TBA", "Pan-India BTL activation and experiential marketing for product sampling, mall promotions, roadshows and direct consumer engagement.", "ItemPage"],
  ["/pan-india-coverage", "Pan-India Advertising Campaign Coverage | The Brand Advertising", "The Brand Advertising executes auto hood branding, cab branding, retail branding and outdoor campaigns across major cities and regional markets in India.", "CollectionPage"],
  ["/campaigns", "Advertising Campaigns & Brand Activations | TBA India", "Explore outdoor advertising, vehicle branding and on-ground campaign work delivered by The Brand Advertising across India.", "CollectionPage"],
  ["/contact", "Contact The Brand Advertising | Plan a Pan-India Campaign", "Contact The Brand Advertising for auto hood branding, cab branding, retail branding and campaign execution across India.", "ContactPage"],
];

const template = await readFile("dist/index.html", "utf8");
const schemaPattern = /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/;
const homeSchema = JSON.parse(template.match(schemaPattern)?.[1] || "{}");
const sharedSchema = (homeSchema["@graph"] || []).filter((node) =>
  ["Organization", "WebSite"].includes(node["@type"]),
);

for (const [path, title, description, pageType] of basePages) {
  const url = `${siteUrl}${path}`;
  const pageSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      ...sharedSchema,
      {
        "@type": ["WebPage", pageType],
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en-IN",
      },
      ...(path === "/campaigns" ? campaignSchema["@graph"] : []),
    ],
  });
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical" href=".*?"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content=".*?"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta name="twitter:title" content=".*?"\s*\/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content=".*?"\s*\/>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(schemaPattern, `<script type="application/ld+json" id="site-schema">${pageSchema}</script>`);
  const output = join("dist", `${path.slice(1)}.html`);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

console.log(`Generated ${basePages.length} crawlable route files.`);
