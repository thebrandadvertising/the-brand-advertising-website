import { Check, ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import autoHoodBranding from "../assets/services/auto-hood-branding.webp";
import cabBranding from "../assets/services/cab-branding.webp";
import retailBranding from "../assets/services/retail-branding.webp";

const services = {
  "auto-hood-branding": {
    name: "Auto Hood Branding",
    title: "Auto Hood Branding & Auto Rickshaw Advertising in India | TBA",
    description: "Pan-India auto hood branding and auto rickshaw advertising. TBA plans, produces and executes branded auto campaigns across metro and regional markets.",
    image: autoHoodBranding,
    intro: "Turn everyday auto-rickshaw routes into repeated street-level brand visibility. We plan and execute auto hood branding campaigns across India for launches, retail promotions and local market awareness.",
    points: ["Pan-India campaign coordination", "Hood creative production and fitting", "City and route-based deployment", "On-ground execution support"],
    uses: "Auto hood branding is suited to FMCG, retail, education, healthcare, real estate, entertainment and consumer brands that need repeated visibility in busy neighbourhoods.",
  },
  "cab-branding": {
    name: "Cab Branding",
    title: "Cab Branding & Taxi Advertising Agency in India | TBA",
    description: "Pan-India cab branding and taxi advertising campaigns for brands seeking high-visibility mobile outdoor media across major Indian cities.",
    image: cabBranding,
    intro: "Put your campaign on vehicles that travel through business districts, residential areas and high-footfall routes. TBA manages cab branding campaigns from production through on-ground execution.",
    points: ["Full and partial cab branding", "Campaigns across major Indian cities", "Professional print and installation", "Flexible fleet and market planning"],
    uses: "Cab advertising works well for apps, financial services, property launches, consumer products, events and brands seeking sustained urban visibility.",
  },
  "retail-branding": {
    name: "Retail Branding",
    title: "Retail Branding & In-Store Branding Agency in India | TBA",
    description: "Retail branding, storefront visibility and in-store campaign execution across India. Create a consistent brand experience at the point of purchase.",
    image: retailBranding,
    intro: "Build recognition where buying decisions happen. TBA creates and executes retail branding for storefronts, displays and customer touchpoints across Indian markets.",
    points: ["Storefront and in-store branding", "Point-of-sale campaign material", "Multi-location rollout support", "Production and installation coordination"],
    uses: "Retail branding supports product launches, seasonal promotions, dealer networks, new-store openings and consistent visibility across multiple outlets.",
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services[slug];
  if (!service) return <Navigate to="/services" replace />;

  const path = `/services/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: { "@type": "AdvertisingAgency", name: "The Brand Advertising", url: "https://thebrandadvertising.com/" },
    areaServed: { "@type": "Country", name: "India" },
    url: `https://thebrandadvertising.com${path}`,
  };

  return (
    <main>
      <Seo title={service.title} description={service.description} path={path} schema={schema} />
      <section className="pt-40 pb-20 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.24em] uppercase text-[#f1c94c] mb-5">Pan-India advertising service</p>
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-tight mb-6">{service.name}</h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">{service.intro}</p>
            <Link to="/contact?quote=1" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#f1c94c] text-black font-medium">
              Request a Campaign Plan <ArrowUpRight size={17} />
            </Link>
          </div>
          <img src={service.image} alt={`${service.name} campaign by The Brand Advertising in India`} className="rounded-2xl w-full aspect-[16/10] object-cover" />
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-14">
          <div>
            <h2 className="font-display font-semibold text-3xl mb-5">Campaign support from planning to execution</h2>
            <p className="text-charcoal-soft/80 leading-relaxed">{service.uses}</p>
          </div>
          <ul className="space-y-4">
            {service.points.map((point) => <li key={point} className="flex gap-3 items-center"><Check className="text-brand-red" size={19} />{point}</li>)}
          </ul>
        </div>
      </section>

      <section className="py-20 bg-mist text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display font-semibold text-3xl mb-5">Available across India</h2>
          <p className="text-charcoal-soft/80 mb-8">Plan campaigns across metros, state capitals and regional markets through one advertising partner.</p>
          <Link to="/pan-india-coverage" className="text-brand-red font-medium">Explore our pan-India coverage →</Link>
        </div>
      </section>
    </main>
  );
}
