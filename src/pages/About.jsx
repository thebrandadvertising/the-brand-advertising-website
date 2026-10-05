import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Target, Eye, ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import RelaxingHero from "../components/RelaxingHero";
import dimcyAggarwal from "../assets/tba/dimcy-aggarwal-founder.webp";
import campaignOne from "../assets/services/auto-hood-branding.webp";
import campaignTwo from "../assets/services/cab-branding.webp";

const process = [
  { step: "Discover", desc: "Understand the brand and campaign goals." },
  { step: "Research", desc: "Map routes, audiences and high-footfall zones." },
  { step: "Planning", desc: "Build a media plan around real movement patterns." },
  { step: "Creative", desc: "Design branding that gets noticed in seconds." },
  { step: "Execution", desc: "Install and deploy across the chosen fleet." },
  { step: "Review", desc: "Check the completed work against the approved campaign scope." },
];

export default function About() {
  return (
    <main id="main-content">
      <RelaxingHero
        eyebrow="About TBA"
        title="Ideas should move with people."
        video={`${import.meta.env.BASE_URL}about-background.mp4`}
      />

      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading eyebrow="Our Story" title="Built for brands in motion" />
            <p className="text-charcoal-soft/90 leading-relaxed mb-4">
              The Brand Advertising is an outdoor advertising, transit media,
              retail branding and brand activation company helping businesses
              build visibility across the places people live, work and travel.
            </p>
            <p className="text-charcoal-soft/90 leading-relaxed">
              We believe every road can become a marketing opportunity, every
              vehicle can become a moving billboard, and every on-ground
              interaction can create trust and recall.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="rounded-2xl overflow-hidden shadow-soft aspect-[4/5]"
          >
            <img src={campaignOne} alt="Auto hood branding campaign across a city market" width="1600" height="1000" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-mist">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] bg-white shadow-soft max-w-md mx-auto px-8 py-12 text-center border border-brand-red/20 overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-black via-charcoal-light to-black" />
            <div className="relative">
              <div className="w-44 h-44 mx-auto rounded-full p-1.5 bg-gradient-to-br from-brand-rose via-brand-red to-brand-deep shadow-soft">
                <img
                  src={dimcyAggarwal}
                  alt="Dimcy Aggarwal, Founder of The Brand Advertising"
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full rounded-full object-cover object-top border-4 border-white"
                />
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-brand-deep mt-7 mb-2">Founder</p>
              <h2 className="font-display text-3xl font-semibold">Dimcy Aggarwal</h2>
              <p className="text-charcoal-soft/70 mt-2">Marketing & Brand Strategy</p>
              <p className="text-charcoal-soft/75 leading-relaxed mt-5">
                Building memorable brands through thoughtful strategy, strong creative
                direction and high-impact outdoor advertising.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <SectionHeading eyebrow="Education & Expertise" title="A foundation in business and marketing" />
            <div className="space-y-5">
              {[
                {
                  institution: "Manav Bharti University",
                  qualification: "MBA, Marketing",
                  period: "June 2012 – June 2014",
                  grade: "Grade A+",
                  details: "Skills: Marketing and Marketing Strategy",
                },
                {
                  institution: "Motilal Nehru College",
                  qualification: "Bachelor of Commerce (BCom), Business/Commerce",
                  period: "June 2008 – June 2011",
                  grade: "Grade A+",
                },
                {
                  institution: "St. Anthony’s School",
                  qualification: "School Education",
                  period: "June 1996 – April 2008",
                  grade: "Grade A+",
                  details: "Curriculum and high-school activities",
                },
              ].map((item) => (
                <article key={item.institution} className="bg-white rounded-2xl p-6 shadow-card border border-charcoal/5">
                  <h3 className="font-display font-semibold text-lg">{item.institution}</h3>
                  <div className="w-10 h-1 rounded-full bg-brand-red my-4" />
                  <p className="text-brand-deep font-medium text-sm mt-1">{item.qualification}</p>
                  <p className="text-charcoal-soft/65 text-sm mt-3">{item.period} · {item.grade}</p>
                  {item.details && <p className="text-charcoal-soft/75 text-sm mt-2">{item.details}</p>}
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-mist">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          {[
            {
              icon: Target,
              title: "Our Mission",
              desc: "To create advertising that moves with people, giving brands useful visibility, stronger recall and meaningful real-world presence.",
            },
            {
              icon: Eye,
              title: "Our Vision",
              desc: "To turn routes, vehicles, stores and public spaces into memorable brand experiences across India.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-10 shadow-card"
            >
              <div className="w-14 h-14 rounded-xl bg-charcoal flex items-center justify-center mb-6">
                <item.icon className="text-brand-rose" size={24} />
              </div>
              <h3 className="font-display font-semibold text-xl mb-3">{item.title}</h3>
              <p className="text-sm text-charcoal-soft/80 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="How We Work" title="One team, every stage" align="center" />
          <div className="grid md:grid-cols-6 gap-8 md:gap-4">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-white border-2 border-brand-red flex items-center justify-center font-display font-semibold text-brand-red mb-4">
                  {index + 1}
                </div>
                <h4 className="font-display font-semibold text-sm mb-1">{item.step}</h4>
                <p className="text-xs text-charcoal-soft/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-mist">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="Inside TBA" title="Ideas, craft and execution" align="center" />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { src: campaignOne, alt: "Auto hood branding fleet in a city market" },
              { src: campaignTwo, alt: "Cab branding on an urban route" },
            ].map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="rounded-2xl overflow-hidden aspect-[4/3] group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width="1600"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-ink text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-white font-display font-semibold text-3xl md:text-4xl mb-6">
            Ready to put your brand in motion?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-rose to-brand-red text-white font-medium shadow-soft hover:brightness-110 transition-all"
          >
            Start a Conversation <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
