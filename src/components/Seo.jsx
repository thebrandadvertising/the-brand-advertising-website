import { useEffect } from "react";

const SITE_URL = "https://thebrandadvertising.com";
const SOCIAL_IMAGE = `${SITE_URL}/tba-social-share.png`;

function createRouteSchema({ title, description, path, schema, pageType }) {
  const url = `${SITE_URL}${path}`;
  const suppliedGraph = schema?.["@graph"] || (schema ? [{ ...schema, "@context": undefined }] : []);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": pageType === "WebPage" ? "WebPage" : ["WebPage", pageType],
        "@id": `${url}#webpage`,
        name: title,
        description,
        url,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
      ...suppliedGraph,
    ],
  };
}

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

export default function Seo({ title, description, path = "/", schema, pageType = "WebPage" }) {
  const routeSchema = createRouteSchema({ title, description, path, schema, pageType });

  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    setMeta('meta[name="description"]', { name: "description", content: description });
    setMeta('meta[property="og:title"]', { property: "og:title", content: title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: description });
    setMeta('meta[property="og:url"]', { property: "og:url", content: url });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "The Brand Advertising" });
    setMeta('meta[property="og:image"]', { property: "og:image", content: SOCIAL_IMAGE });
    setMeta('meta[property="og:image:width"]', { property: "og:image:width", content: "1730" });
    setMeta('meta[property="og:image:height"]', { property: "og:image:height", content: "909" });
    setMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: "The Brand Advertising — Pan-India outdoor advertising and brand activation" });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: SOCIAL_IMAGE });
    setMeta('meta[name="twitter:image:alt"]', { name: "twitter:image:alt", content: "The Brand Advertising — Pan-India outdoor advertising and brand activation" });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const id = "site-schema";
    let script = document.getElementById(id);
    let sharedGraph = [];
    if (script) {
      try {
        const existing = JSON.parse(script.textContent);
        sharedGraph = (existing["@graph"] || []).filter((node) =>
          ["Organization", "WebSite"].includes(node["@type"]),
        );
      } catch {
        sharedGraph = [];
      }
    } else {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      ...routeSchema,
      "@graph": [...sharedGraph, ...routeSchema["@graph"]],
    });
  }, [title, description, path, schema, pageType]);

  if (typeof document === "undefined") {
    return (
      <script
        type="application/ld+json"
        data-prerender-schema="true"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(routeSchema).replace(/</g, "\\u003c") }}
      />
    );
  }

  return null;
}
