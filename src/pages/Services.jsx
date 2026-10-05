import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ArrowUpRight } from "lucide-react";
import RelaxingHero from "../components/RelaxingHero";

import autoHoodBranding from "../assets/services/auto-hood-branding.webp";
import cabBranding from "../assets/services/cab-branding.webp";
import busBranding from "../assets/services/bus-branding.webp";
import vanActivation from "../assets/services/van-activation.webp";
import retailBranding from "../assets/services/retail-branding.webp";
import wallPainting from "../assets/services/wall-painting.webp";
import brandActivation from "../assets/services/brand-activation.webp";
import productSampling from "../assets/services/product-sampling.webp";
import mallPromotions from "../assets/services/mall-promotions.webp";
import roadShows from "../assets/services/road-shows.webp";
import corporateEvents from "../assets/services/corporate-events.webp";

const serviceImages = {
  "Auto Hood Branding": autoHoodBranding,
  "Cab Branding": cabBranding,
  "Bus Branding": busBranding,
  "Van Activation": vanActivation,
  "Retail Branding": retailBranding,
  "Wall Painting": wallPainting,
  "Brand Activation": brandActivation,
  "Product Sampling": productSampling,
  "Mall Promotions": mallPromotions,
  "Road Shows": roadShows,
  "Corporate Events": corporateEvents,
};

const servicePages = {
  "Auto Hood Branding": "/services/auto-hood-branding",
  "Cab Branding": "/services/cab-branding",
  "Bus Branding": "/services/vehicle-branding",
  "Van Activation": "/services/btl-activation",
  "Retail Branding": "/services/retail-branding",
  "Brand Activation": "/services/btl-activation",
  "Product Sampling": "/services/btl-activation",
  "Mall Promotions": "/services/btl-activation",
  "Road Shows": "/services/btl-activation",
};

const services = [
  {
    title: "Auto Hood Branding",
    desc: "Bold hood wraps that turn the front of every auto rickshaw into a nonstop moving billboard.",
    benefits: ["Large hood advertising format", "Mobile street-level placement", "Custom creative per campaign"],
  },
  {
    title: "Cab Branding",
    desc: "Full and partial cab wraps that carry approved campaign artwork across selected urban routes.",
    benefits: ["Full and partial wrap formats", "Creative adaptation for cab surfaces", "Fleet and market planning"],
  },
  {
    title: "Bus Branding",
    desc: "Full and partial bus branding for campaigns planned around selected routes and markets.",
    benefits: ["Full and partial formats", "Interior and exterior options", "Route-based campaign planning"],
  },
  {
    title: "Van Activation",
    desc: "Mobile vans built for live product demos, sampling and on-ground brand activation.",
    benefits: ["Mobile activation setup", "Product demonstration and sampling", "Flexible route planning"],
  },
  {
    title: "Retail Branding",
    desc: "In-store and storefront branding for campaign communication at retail customer touchpoints.",
    benefits: ["Point-of-sale materials", "Storefront and in-store formats", "Multi-location coordination"],
  },
  {
    title: "Wall Painting",
    desc: "Hand-painted wall media coordinated for selected neighbourhoods and campaign markets.",
    benefits: ["Painted campaign creative", "Site and market planning", "On-ground coordination"],
  },
  {
    title: "Brand Activation",
    desc: "Experiential campaigns built around direct interaction between a brand and its audience.",
    benefits: ["On-ground campaign concepts", "Audience participation formats", "Execution coordination"],
  },
  {
    title: "Product Sampling",
    desc: "On-ground sampling drives that put your product directly into customers' hands.",
    benefits: ["Sample distribution planning", "Market and audience planning", "On-ground coordination"],
  },
  {
    title: "Mall Promotions",
    desc: "In-mall activations designed for direct campaign communication in retail environments.",
    benefits: ["Kiosk and activation formats", "Venue-based campaign planning", "Branded engagement materials"],
  },
  {
    title: "Road Shows",
    desc: "Multi-location road shows that carry a campaign through selected cities and neighbourhoods.",
    benefits: ["Branded mobile units", "Multi-location scheduling", "Setup and route coordination"],
  },
  {
    title: "Corporate Events",
    desc: "End-to-end support for corporate branding at conferences, launches and company events.",
    benefits: ["Event branding", "Custom campaign collateral", "On-site coordination"],
  },
];

export default function Services() {
  return (
    <div>
      <RelaxingHero eyebrow="Our services" title="Every service, one goal: visibility that moves." video={`${import.meta.env.BASE_URL}services-background.mp4`} />

      <section className="bg-cream">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            id={s.title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`scroll-mt-24 border-b border-charcoal/8 ${i % 2 === 1 ? "bg-mist" : "bg-cream"}`}
          >
            <div
              className={`max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="rounded-2xl overflow-hidden aspect-[16/10] shadow-card">
                <img
                  src={serviceImages[s.title]}
                  alt={`${s.title} service by The Brand Advertising`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-brand-red font-medium">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display font-semibold text-2xl md:text-3xl mt-2 mb-4">{s.title}</h2>
                <p className="text-charcoal-soft/85 leading-relaxed mb-6">{s.desc}</p>
                <ul className="space-y-2 mb-8">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-charcoal-soft/80">
                      <Check size={15} className="text-brand-red shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to={servicePages[s.title] || "/contact"}
                  className="inline-flex items-center gap-2 text-brand-red font-medium text-sm group"
                >
                  {servicePages[s.title] ? "Explore This Service" : "Enquire About This Service"}
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="py-24 bg-ink text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-white font-display font-semibold text-3xl md:text-4xl mb-6">
            Not sure which service fits your brand?
          </h2>
          <p className="text-white/60 mb-8">
            Tell us about your campaign and we&rsquo;ll recommend the right media mix.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-rose to-brand-red text-white font-medium shadow-soft hover:brightness-110 transition-all"
          >
            Talk to Our Team <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
