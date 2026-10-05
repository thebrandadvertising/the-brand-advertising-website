import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CalendarDays, Gift, MapPin, Sparkles, Users } from "lucide-react";
import RelaxingHero from "../components/RelaxingHero";
import Seo from "../components/Seo";
import { campaignSchema } from "../data/campaignSeo";

import jodhpur1 from "../assets/campaigns/events/jodhpur-activation-1.webp";
import jodhpur2 from "../assets/campaigns/events/jodhpur-activation-2.webp";
import jodhpur3 from "../assets/campaigns/events/jodhpur-activation-3.webp";
import ajmer1 from "../assets/campaigns/events/ajmer-launch-1.webp";
import ajmer2 from "../assets/campaigns/events/ajmer-launch-2.webp";
import ajmer3 from "../assets/campaigns/events/ajmer-launch-3.webp";

const ease = [0.22, 1, 0.36, 1];

const campaignHighlights = [
  { icon: CalendarDays, value: "4 days", label: "Jodhpur activation" },
  { icon: MapPin, value: "2 cities", label: "Jodhpur & Ajmer" },
  { icon: Users, value: "On ground", label: "Customer interaction" },
  { icon: Gift, value: "Games & gifts", label: "Participation format" },
];

const jodhpurAlt = [
  "IndianOil promoter presenting a product at a branded BTL activation kiosk in Jodhpur",
  "Visitors speaking with promoters at an IndianOil product activation stall in Jodhpur",
  "Participant receiving an IndianOil campaign gift beside an interactive prize wheel in Jodhpur",
];

const ajmerAlt = [
  "Ribbon cutting at the IndianOil BTL activation launch in Ajmer",
  "Visitors taking part in an IndianOil prize-wheel activity in Ajmer",
  "IndianOil representatives and campaign team at the Ajmer activation launch",
];

function CampaignGallery({ images, altTexts }) {
  return (
    <div className="campaign-gallery">
      {images.map((image, index) => (
        <motion.figure
          key={image}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.75, delay: index * 0.1, ease }}
          className={`campaign-photo campaign-photo-${index + 1}`}
        >
          <img src={image} alt={altTexts[index]} loading="lazy" decoding="async" />
        </motion.figure>
      ))}
    </div>
  );
}

export default function Campaigns() {
  return (
    <main className="campaign-page">
      <Seo
        title="Advertising Campaigns & Brand Activations | TBA India"
        description="Explore outdoor advertising, vehicle branding and on-ground campaign work delivered by The Brand Advertising across India."
        path="/campaigns"
        pageType="CollectionPage"
        schema={campaignSchema}
      />
      <RelaxingHero
        eyebrow="Campaign stories"
        title="Real people. Remarkable on-ground energy."
        video={`${import.meta.env.BASE_URL}campaigns-background.mp4`}
      />

      <section className="campaign-intro">
        <div className="nature-shell">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="campaign-intro-copy"
          >
            <span>IndianOil × The Brand Advertising</span>
            <h2>Engagement that brings a brand to life.</h2>
            <p>
              These IndianOil BTL activations used branded kiosks, product
              conversations, interactive games and campaign gifts to create
              direct customer participation in Jodhpur and Ajmer.
            </p>
            <Link to="/services/btl-activation" className="inline-flex mt-5 text-brand-red font-medium">
              Explore TBA&rsquo;s BTL activation service →
            </Link>
          </motion.div>
          <div className="campaign-highlights">
            {campaignHighlights.map((item) => (
              <div key={item.label}>
                <item.icon size={22} strokeWidth={1.5} />
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <article className="campaign-story campaign-story-light">
        <div className="nature-shell">
          <div className="campaign-story-heading">
            <div>
              <span className="campaign-index">01</span>
              <p>30 January–2 February 2026</p>
            </div>
            <div>
              <span className="campaign-location"><MapPin size={14} /> Jodhpur, Rajasthan</span>
              <h2>Four days of customer participation.</h2>
            </div>
          </div>
          <div className="campaign-story-copy">
            <p>
              The Brand Advertising conducted a four-day IndianOil BTL
              activation in Jodhpur using branded kiosks and direct product
              conversations.
            </p>
            <p>
              Interactive activities, a prize wheel, product displays and
              campaign gifts gave visitors several ways to take part and learn
              about the products presented at the activation.
            </p>
          </div>
          <CampaignGallery images={[jodhpur1, jodhpur2, jodhpur3]} altTexts={jodhpurAlt} />
        </div>
      </article>

      <article className="campaign-story campaign-story-dark">
        <div className="nature-shell">
          <div className="campaign-story-heading">
            <div>
              <span className="campaign-index">02</span>
              <p>IndianOil BTL activation</p>
            </div>
            <div>
              <span className="campaign-location"><MapPin size={14} /> Ajmer, Rajasthan</span>
              <h2>An IndianOil activation launch in Ajmer.</h2>
            </div>
          </div>
          <div className="campaign-story-copy">
            <p>
              The Ajmer campaign opened with a ribbon-cutting ceremony and an
              on-site branded activation focused on IndianOil&rsquo;s Retail,
              Lubricants and LPG portfolio.
            </p>
            <p>
              Visitors could speak with the campaign team, view product
              information and take part in an interactive prize-wheel activity.
            </p>
          </div>
          <CampaignGallery images={[ajmer1, ajmer2, ajmer3]} altTexts={ajmerAlt} />
        </div>
      </article>

      <section className="campaign-closing">
        <div className="nature-shell">
          <Sparkles size={30} strokeWidth={1.4} />
          <span>BTL & brand activation</span>
          <h2>Campaigns people<br /><em>want to participate in.</em></h2>
          <p>
            TBA plans on-ground formats that connect product information,
            branded environments and direct audience interaction.
          </p>
          <Link to="/services/btl-activation" className="nature-button nature-button-light mt-7">
            Plan a BTL activation
          </Link>
        </div>
      </section>
    </main>
  );
}
