export const campaignSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://thebrandadvertising.com/" },
        { "@type": "ListItem", position: 2, name: "Campaigns", item: "https://thebrandadvertising.com/campaigns" },
      ],
    },
    {
      "@type": "ItemList",
      name: "The Brand Advertising campaign work",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "CreativeWork",
            name: "IndianOil BTL activation in Jodhpur",
            creator: { "@id": "https://thebrandadvertising.com/#organization" },
            about: { "@id": "https://thebrandadvertising.com/services/btl-activation#service" },
            contentLocation: { "@type": "Place", name: "Jodhpur, Rajasthan" },
            temporalCoverage: "2026-01-30/2026-02-02",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "CreativeWork",
            name: "IndianOil BTL activation in Ajmer",
            creator: { "@id": "https://thebrandadvertising.com/#organization" },
            about: { "@id": "https://thebrandadvertising.com/services/btl-activation#service" },
            contentLocation: { "@type": "Place", name: "Ajmer, Rajasthan" },
          },
        },
      ],
    },
  ],
};
