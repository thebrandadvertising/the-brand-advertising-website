import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { cities } from "../src/data/cities.js";

const siteUrl = "https://thebrandadvertising.com";
const basePages = [
  ["/about", "About The Brand Advertising | Pan-India Marketing Agency", "Meet The Brand Advertising, a pan-India agency creating vehicle branding, outdoor media, retail branding and on-ground brand experiences."],
  ["/services", "Advertising & Branding Services Across India | TBA", "Explore auto hood branding, cab and bus branding, retail branding, wall painting, product sampling, roadshows and corporate events across India."],
  ["/services/auto-hood-branding", "Auto Hood Branding & Auto Rickshaw Advertising in India | TBA", "Pan-India auto hood branding and auto rickshaw advertising. TBA plans, produces and executes branded auto campaigns across metro and regional markets."],
  ["/services/cab-branding", "Cab Branding & Taxi Advertising Agency in India | TBA", "Pan-India cab branding and taxi advertising campaigns for brands seeking high-visibility mobile outdoor media across major Indian cities."],
  ["/services/retail-branding", "Retail Branding & In-Store Branding Agency in India | TBA", "Retail branding, storefront visibility and in-store campaign execution across India. Create a consistent brand experience at the point of purchase."],
  ["/pan-india-coverage", "Pan-India Advertising Campaign Coverage | The Brand Advertising", "The Brand Advertising executes auto hood branding, cab branding, retail branding and outdoor campaigns across major cities and regional markets in India."],
  ["/campaigns", "Advertising Campaigns & Brand Activations | TBA India", "Explore outdoor advertising, vehicle branding and on-ground campaign work delivered by The Brand Advertising across India."],
  ["/contact", "Contact The Brand Advertising | Plan a Pan-India Campaign", "Contact The Brand Advertising for auto hood branding, cab branding, retail branding and campaign execution across India."],
];

const cityPages = cities.map((city) => [
  `/auto-hood-branding/${city.slug}`,
  `Auto Hood Branding in ${city.name} | Auto Rickshaw Advertising`,
  `Plan auto hood branding and auto rickshaw advertising in ${city.name}. TBA coordinates creative production, fitting and campaign execution across ${city.state}.`,
]);

const template = await readFile("dist/index.html", "utf8");

for (const [path, title, description] of [...basePages, ...cityPages]) {
  const url = `${siteUrl}${path}`;
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical" href=".*?"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content=".*?"\s*\/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content=".*?"\s*\/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content=".*?"\s*\/>/, `<meta property="og:url" content="${url}" />`);
  const output = join("dist", path.slice(1), "index.html");
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}

console.log(`Generated ${basePages.length + cityPages.length} crawlable route files.`);
