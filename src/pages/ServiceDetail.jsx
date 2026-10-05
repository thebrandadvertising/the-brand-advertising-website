import { Check, ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import autoHoodBranding from "../assets/services/auto-hood-branding.webp";
import cabBranding from "../assets/services/cab-branding.webp";
import retailBranding from "../assets/services/retail-branding.webp";
import busBranding from "../assets/services/bus-branding.webp";
import brandActivation from "../assets/services/brand-activation.webp";

const services = {
  "auto-hood-branding": {
    name: "Auto Hood Branding",
    title: "Auto Hood Branding & Auto Rickshaw Advertising in India | TBA",
    description: "Pan-India auto hood branding and auto rickshaw advertising. TBA plans, produces and executes branded auto campaigns across metro and regional markets.",
    image: autoHoodBranding,
    intro: "Turn everyday auto-rickshaw routes into repeated street-level brand visibility. We plan and execute auto hood branding campaigns across India for launches, retail promotions and local market awareness.",
    points: ["Pan-India campaign coordination", "Hood creative production and fitting", "City and route-based deployment", "On-ground execution support"],
    uses: "Auto hood branding is suited to FMCG, retail, education, healthcare, real estate, entertainment and consumer brands that need repeated visibility in busy neighbourhoods.",
    faq: [
      ["What is auto hood branding?", "Auto hood branding places campaign artwork on the hood of an auto rickshaw, turning the vehicle into mobile outdoor media as it travels through local routes."],
      ["Can TBA coordinate campaigns across India?", "Yes. TBA plans Pan-India campaigns according to the requested markets, campaign scale and local availability."],
    ],
  },
  "cab-branding": {
    name: "Cab Branding",
    title: "Cab Branding & Taxi Advertising Agency in India | TBA",
    description: "Pan-India cab branding and taxi advertising campaigns for brands seeking high-visibility mobile outdoor media across major Indian cities.",
    image: cabBranding,
    intro: "Put your campaign on vehicles that travel through business districts, residential areas and high-footfall routes. TBA manages cab branding campaigns from production through on-ground execution.",
    points: ["Full and partial cab branding", "Campaigns across major Indian cities", "Professional print and installation", "Flexible fleet and market planning"],
    uses: "Cab advertising works well for apps, financial services, property launches, consumer products, events and brands seeking sustained urban visibility.",
    faq: [
      ["What is cab branding?", "Cab branding applies campaign creative to the exterior or selected surfaces of taxis and cabs for repeated visibility on urban routes."],
      ["What information is needed for a cab campaign plan?", "Share the target markets, preferred dates, campaign objective and approximate fleet requirement so TBA can assess the execution plan."],
    ],
  },
  "retail-branding": {
    name: "Retail Branding",
    title: "Retail Branding & In-Store Branding Agency in India | TBA",
    description: "Retail branding, storefront visibility and in-store campaign execution across India. Create a consistent brand experience at the point of purchase.",
    image: retailBranding,
    intro: "Build recognition where buying decisions happen. TBA creates and executes retail branding for storefronts, displays and customer touchpoints across Indian markets.",
    points: ["Storefront and in-store branding", "Point-of-sale campaign material", "Multi-location rollout support", "Production and installation coordination"],
    uses: "Retail branding supports product launches, seasonal promotions, dealer networks, new-store openings and consistent visibility across multiple outlets.",
    faq: [
      ["What does retail branding include?", "Retail branding can include storefront visibility, in-store graphics, displays and point-of-sale campaign materials."],
      ["Can retail branding be rolled out across multiple outlets?", "Yes. TBA can coordinate production and installation for multi-location campaigns based on the approved scope and market availability."],
    ],
  },
  "vehicle-branding": {
    name: "Vehicle Branding",
    title: "Vehicle Branding Company in India | TBA",
    description: "Vehicle branding services across India for auto rickshaws, cabs, buses and campaign vans, coordinated from planning through on-ground execution.",
    image: busBranding,
    intro: "Use moving vehicles to carry a clear campaign message through everyday routes. TBA coordinates auto, cab, bus and van branding for brands planning city, regional or Pan-India visibility.",
    points: ["Auto, cab, bus and van formats", "Creative adaptation for vehicle surfaces", "Production and installation coordination", "Market-based campaign planning"],
    uses: "Vehicle branding supports launches, awareness campaigns, retail promotions and sustained outdoor visibility for brands that want their message to travel with their audience.",
    faq: [
      ["Which vehicles can be branded?", "TBA works with auto rickshaw hoods, cabs, buses and campaign vans, subject to the campaign market and available formats."],
      ["Does TBA manage installation?", "TBA coordinates production, fitting and deployment as part of the approved vehicle branding campaign scope."],
    ],
  },
  "btl-activation": {
    name: "BTL Activation",
    title: "BTL Activation & Experiential Marketing Agency in India | TBA",
    description: "Pan-India BTL activation and experiential marketing for product sampling, mall promotions, roadshows and direct consumer engagement.",
    image: brandActivation,
    intro: "Create direct, memorable contact between a brand and its audience. TBA plans and executes BTL activations through sampling, mall promotions, roadshows and other on-ground experiences.",
    points: ["On-ground campaign planning", "Product sampling and demonstrations", "Mall promotions and roadshows", "Production and execution coordination"],
    uses: "BTL activation is useful when a campaign needs product trial, direct engagement, local awareness or a physical brand experience alongside broader media activity.",
    faq: [
      ["What is BTL activation?", "BTL activation is direct, on-ground marketing designed to let people experience, try or interact with a brand in a selected environment."],
      ["Which activation formats does TBA support?", "TBA supports product sampling, mall promotions, roadshows, van activations and other campaign formats listed on the services page."],
    ],
  },
};

const serviceLinks = Object.entries(services).map(([slug, service]) => ({
  slug,
  name: service.name,
  to: `/services/${slug}`,
}));

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services[slug];
  if (!service) return <Navigate to="/services" replace />;

  const path = `/services/${slug}`;
  const pageUrl = `https://thebrandadvertising.com${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: service.name,
        description: service.description,
        provider: { "@type": "Organization", name: "The Brand Advertising", url: "https://thebrandadvertising.com/" },
        areaServed: { "@type": "Country", name: "India" },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://thebrandadvertising.com/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://thebrandadvertising.com/services" },
          { "@type": "ListItem", position: 3, name: service.name, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faq.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <main>
      <Seo title={service.title} description={service.description} path={path} schema={schema} pageType="ItemPage" />
      <section className="pt-40 pb-20 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-white/55 mb-6">
              <Link to="/">Home</Link> <span aria-hidden="true">/</span> <Link to="/services">Services</Link> <span aria-hidden="true">/</span> <span>{service.name}</span>
            </nav>
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

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display font-semibold text-3xl text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-5">
            {service.faq.map(([question, answer]) => (
              <article key={question} className="rounded-2xl border border-charcoal/10 p-7">
                <h3 className="font-semibold text-lg mb-2">{question}</h3>
                <p className="text-charcoal-soft/80 leading-relaxed">{answer}</p>
              </article>
            ))}
          </div>
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

      <section className="py-20 bg-white" aria-labelledby="service-process-title">
        <div className="max-w-5xl mx-auto px-6">
          <h2 id="service-process-title" className="font-display font-semibold text-3xl mb-4">
            How TBA plans a {service.name.toLowerCase()} campaign
          </h2>
          <p className="text-charcoal-soft/80 leading-relaxed mb-10 max-w-3xl">
            The final plan depends on the campaign objective, markets, timing and approved scope. These four steps establish the practical requirements before execution begins.
          </p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ["Define the brief", "Confirm the objective, target audience, markets and campaign dates."],
              ["Select the format", "Choose the surfaces, placements or activation setting that fit the brief."],
              ["Prepare production", "Adapt approved artwork and coordinate production requirements."],
              ["Coordinate execution", "Schedule installation or on-ground deployment for the agreed scope."],
            ].map(([title, text], index) => (
              <li key={title} className="rounded-2xl border border-charcoal/10 p-6">
                <span className="text-xs tracking-[0.2em] uppercase text-brand-red">Step {index + 1}</span>
                <h3 className="font-display font-semibold text-xl mt-3 mb-2">{title}</h3>
                <p className="text-sm text-charcoal-soft/75 leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 bg-mist text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display font-semibold text-3xl mb-5">Available across India</h2>
          <p className="text-charcoal-soft/80 mb-8">Plan campaigns across metros, state capitals and regional markets through one advertising partner.</p>
          <Link to="/pan-india-coverage" className="text-brand-red font-medium">Explore our pan-India coverage →</Link>
        </div>
      </section>

      <section className="py-20 bg-white" aria-labelledby="related-services-title">
        <div className="max-w-5xl mx-auto px-6">
          <h2 id="related-services-title" className="font-display font-semibold text-3xl mb-4">Related advertising services</h2>
          <p className="text-charcoal-soft/80 leading-relaxed mb-8">
            Combine formats when a campaign needs visibility across routes, retail spaces and direct audience experiences.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceLinks.filter((item) => item.slug !== slug).map((item) => (
              <Link key={item.slug} to={item.to} className="rounded-2xl border border-charcoal/10 p-5 font-medium hover:border-brand-red hover:text-brand-red transition-colors">
                {item.name} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-charcoal-soft/75">
            See <Link to="/campaigns" className="text-brand-red font-medium">{slug === "btl-activation" ? "TBA's BTL activation campaigns" : "TBA campaign work"}</Link> or{" "}
            <Link to="/contact" className="text-brand-red font-medium">contact The Brand Advertising</Link> to discuss a brief.
          </p>
        </div>
      </section>
    </main>
  );
}
