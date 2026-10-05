import { Check, ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import { getCity } from "../data/cities";
import autoHoodBranding from "../assets/services/auto-hood-branding.webp";

export default function CityAutoHood() {
  const { citySlug } = useParams();
  const city = getCity(citySlug);
  if (!city) return <Navigate to="/pan-india-coverage" replace />;

  const path = `/auto-hood-branding/${city.slug}`;
  const title = `Auto Hood Branding in ${city.name} | Auto Rickshaw Advertising`;
  const description = `Plan auto hood branding and auto rickshaw advertising in ${city.name}. TBA coordinates creative production, fitting and campaign execution across ${city.state}.`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Auto Hood Branding in ${city.name}`,
    serviceType: "Auto hood branding and auto rickshaw advertising",
    description,
    provider: { "@type": "AdvertisingAgency", name: "The Brand Advertising", url: "https://thebrandadvertising.com/" },
    areaServed: { "@type": "City", name: city.name },
    url: `https://thebrandadvertising.com${path}`,
  };

  return (
    <main>
      <Seo title={title} description={description} path={path} schema={schema} />
      <section className="pt-40 pb-20 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.24em] uppercase text-[#f1c94c] mb-5">Auto-rickshaw advertising · {city.state}</p>
            <h1 className="font-display font-semibold text-4xl md:text-6xl leading-tight mb-6">Auto Hood Branding in {city.name}</h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Reach people across {city.markets}. The Brand Advertising coordinates auto hood campaigns for brands seeking repeated street-level visibility in {city.name}.
            </p>
            <Link to={`/contact?service=auto-hood-branding&city=${city.slug}`} className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#f1c94c] text-black font-medium">
              Request a {city.name} Campaign Plan <ArrowUpRight size={17} />
            </Link>
          </div>
          <img src={autoHoodBranding} alt={`Auto hood branding and auto rickshaw advertising in ${city.name}`} className="rounded-2xl w-full aspect-[16/10] object-cover" />
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14">
          <div>
            <h2 className="font-display font-semibold text-3xl mb-5">Local visibility that travels through {city.name}</h2>
            <p className="text-charcoal-soft/80 leading-relaxed mb-5">
              Auto rickshaws move through main roads and neighbourhood routes throughout the day. A planned fleet campaign helps brands build repeated visibility among {city.audiences}.
            </p>
            <p className="text-charcoal-soft/80 leading-relaxed">
              Campaign scale, operating areas and duration are planned around your audience, creative requirements and available fleet network.
            </p>
          </div>
          <div>
            <h2 className="font-display font-semibold text-3xl mb-5">Campaign support</h2>
            <ul className="space-y-4">
              {["Market and route planning", "Campaign artwork coordination", "Hood production and fitting", "On-ground deployment support"].map((item) => (
                <li key={item} className="flex gap-3 items-center"><Check className="text-brand-red" size={19} />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-mist">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display font-semibold text-3xl text-center mb-10">Auto hood branding in {city.name}: common questions</h2>
          <div className="space-y-5">
            <article className="bg-white rounded-2xl p-7"><h3 className="font-semibold text-lg mb-2">Can campaigns target selected areas?</h3><p className="text-charcoal-soft/80">Yes. Share the neighbourhoods, audience and campaign objective so the team can plan suitable operating areas and fleet coverage.</p></article>
            <article className="bg-white rounded-2xl p-7"><h3 className="font-semibold text-lg mb-2">Does TBA handle production and fitting?</h3><p className="text-charcoal-soft/80">TBA coordinates campaign creative requirements, hood production, fitting and on-ground execution as part of the campaign plan.</p></article>
            <article className="bg-white rounded-2xl p-7"><h3 className="font-semibold text-lg mb-2">How do I request pricing?</h3><p className="text-charcoal-soft/80">Send the target city, campaign dates, approximate fleet size and artwork status. The team will review availability and prepare a suitable plan.</p></article>
          </div>
        </div>
      </section>
    </main>
  );
}
