export const cities = [
  {
    slug: "delhi-ncr",
    name: "Delhi NCR",
    state: "Delhi, Haryana and Uttar Pradesh",
    markets: "business districts, residential clusters, metro feeder routes and high-footfall retail corridors",
    audiences: "commuters, families, students, professionals and neighbourhood shoppers",
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    markets: "suburban business hubs, railway catchments, residential neighbourhoods and retail districts",
    audiences: "daily commuters, office-goers, residents and high-frequency urban shoppers",
  },
  {
    slug: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    markets: "technology corridors, startup districts, residential areas and busy commercial streets",
    audiences: "technology professionals, students, families and urban consumers",
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    markets: "technology hubs, established neighbourhoods, retail centres and growing residential zones",
    audiences: "professionals, families, students and everyday commuters",
  },
  {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    markets: "commercial corridors, industrial areas, residential neighbourhoods and transit connections",
    audiences: "commuters, working professionals, families and retail customers",
  },
  {
    slug: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    markets: "traditional markets, business districts, residential neighbourhoods and suburban corridors",
    audiences: "commuters, shoppers, families and local business customers",
  },
  {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    markets: "education hubs, technology parks, industrial corridors and fast-growing residential areas",
    audiences: "students, professionals, families and daily commuters",
  },
  {
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    markets: "commercial districts, industrial clusters, residential zones and busy market routes",
    audiences: "business communities, families, commuters and retail shoppers",
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    markets: "tourism corridors, education areas, residential neighbourhoods and major retail markets",
    audiences: "residents, students, commuters, shoppers and domestic travellers",
  },
  {
    slug: "lucknow",
    name: "Lucknow",
    state: "Uttar Pradesh",
    markets: "government districts, established markets, residential communities and developing corridors",
    audiences: "professionals, families, students and neighbourhood consumers",
  },
  {
    slug: "indore",
    name: "Indore",
    state: "Madhya Pradesh",
    markets: "commercial centres, education clusters, residential areas and regional shopping corridors",
    audiences: "students, business owners, families and everyday commuters",
  },
  {
    slug: "chandigarh",
    name: "Chandigarh",
    state: "Chandigarh, Punjab and Haryana",
    markets: "sector markets, institutional areas, residential routes and the wider Tricity region",
    audiences: "professionals, students, families and regional shoppers",
  },
];

export function getCity(slug) {
  return cities.find((city) => city.slug === slug);
}
