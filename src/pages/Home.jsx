import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Route, Sparkles, Wind } from "lucide-react";
import BrandOrbit from "../components/BrandOrbit";
import useVideoPlayback from "../hooks/useVideoPlayback";

import forestPoster from "../assets/services/auto-hood-branding.webp";

const ease = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
};

const services = [
  {
    icon: Route,
    number: "01",
    title: "Vehicle branding",
    text: "Auto hood, cab, bus and van campaigns that carry your story naturally through the city.",
    to: "/services/vehicle-branding",
  },
  {
    icon: Leaf,
    number: "02",
    title: "Retail presence",
    text: "Clear, memorable retail and wall-painting campaigns designed for the places people live and shop.",
    to: "/services/retail-branding",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Brand experiences",
    text: "Warm, human activations that turn a brief encounter into a lasting feeling.",
    to: "/services/btl-activation",
  },
];

const banners = [
  { number: "01", eyebrow: "Strategy", title: "Routes chosen with purpose", text: "We study movement, neighbourhoods and audience behaviour before a campaign enters the street." },
  { number: "02", eyebrow: "Creative", title: "Designed to be remembered", text: "Clear visual ideas made for real-world attention spans, moving vehicles and busy city environments." },
  { number: "03", eyebrow: "Execution", title: "Crafted for every surface", text: "From a single auto hood to an entire fleet, every installation receives the same considered finish." },
  { number: "04", eyebrow: "Reach", title: "Present where life happens", text: "Campaigns travel through markets, business districts, residential routes and everyday moments." },
  { number: "05", eyebrow: "Partnership", title: "With you from brief to road", text: "Planning, production and deployment are coordinated through one accountable campaign team." },
];

export default function Home() {
  const videoRef = useVideoPlayback();

  return (
    <main id="main-content" className="nature-home">
      <section className="nature-hero">
        <img className="nature-video nature-video-poster" src={forestPoster} alt="" aria-hidden="true" width="1600" height="1000" decoding="async" fetchPriority="high" />
        <video
          ref={videoRef}
          className="nature-video"
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          poster={forestPoster}
          aria-hidden="true"
          onLoadedData={(event) => event.currentTarget.classList.add("video-ready")}
        >
          <source src={`${import.meta.env.BASE_URL}home-background.mp4`} type="video/mp4" />
        </video>
        <div className="nature-veil" />
        <div className="nature-light" />

        <div className="nature-shell nature-hero-content">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="nature-kicker"
          >
            Ideas in motion · Built for attention
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease }}
          >
            Let your brand
            <br />
            <em>move naturally.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="nature-intro"
          >
            The Brand Advertising is a Pan-India advertising and brand
            activation company specialising in vehicle, retail and on-ground campaigns.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="nature-actions"
          >
            <Link to="/campaigns" className="nature-button nature-button-light">
              See our campaigns <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="nature-text-link">
              Start a conversation
            </Link>
          </motion.div>
        </div>

        <div className="nature-scroll">
          <span>Slow down</span>
          <motion.i
            animate={{ height: [24, 44, 24] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      <BrandOrbit />

      <section className="py-20 bg-white" aria-labelledby="about-tba-title">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16 items-start">
          <div>
            <span className="nature-section-number">The official TBA website</span>
            <h2 id="about-tba-title" className="font-display font-semibold text-3xl md:text-5xl mt-4">
              What is The Brand Advertising?
            </h2>
          </div>
          <div className="text-charcoal-soft/85 leading-relaxed space-y-5">
            <p>
              The Brand Advertising (TBA) plans and executes outdoor advertising,
              transit media, retail branding and brand activation campaigns across India.
              Its services connect brands with people on everyday routes, inside retail
              environments and through direct on-ground experiences.
            </p>
            <p>
              Explore TBA&rsquo;s <Link to="/services/auto-hood-branding" className="text-brand-red font-medium">auto hood branding</Link>,{" "}
              <Link to="/services/vehicle-branding" className="text-brand-red font-medium">vehicle branding</Link>,{" "}
              <Link to="/services/retail-branding" className="text-brand-red font-medium">retail branding</Link> and{" "}
              <Link to="/services/btl-activation" className="text-brand-red font-medium">BTL activation</Link> services,
              or learn <Link to="/about" className="text-brand-red font-medium">how TBA works</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="nature-statement">
        <div className="nature-shell nature-statement-grid">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="nature-section-number">A quieter approach</span>
            <h2>Visibility with feeling.</h2>
          </motion.div>
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="nature-statement-copy"
          >
            <Wind size={28} strokeWidth={1.4} />
            <p>
              The best outdoor media feels effortless. We blend smart routes,
              human insight and beautiful craft to help brands travel through
              real life with clarity and grace.
            </p>
            <Link to="/about">Our story <ArrowRight size={15} /></Link>
          </motion.div>
        </div>
      </section>

      <section className="nature-services">
        <div className="nature-shell">
          <div className="nature-section-head">
            <span>What we create</span>
            <h2>Meaningful presence,<br />where life happens.</h2>
          </div>
          <div className="nature-service-list">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.75, delay: index * 0.12, ease }}
                className="nature-service-card"
              >
                <span className="nature-service-number">{service.number}</span>
                <service.icon size={25} strokeWidth={1.4} />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link to={service.to} aria-label={`Explore ${service.title}`}>
                  <ArrowRight size={18} />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-banners">
        {banners.map((banner, index) => (
          <motion.article
            key={banner.number}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease }}
            className={`home-banner home-banner-${index + 1}`}
          >
            <div className="nature-shell home-banner-inner">
              <span>{banner.number}</span>
              <div>
                <p>{banner.eyebrow}</p>
                <h2>{banner.title}</h2>
              </div>
              <p className="home-banner-copy">{banner.text}</p>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="nature-cta">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
          className="nature-shell nature-cta-inner"
        >
          <img src={`${import.meta.env.BASE_URL}tba-logo.jpg`} alt="TBA — The Brand Advertising" width="1254" height="1254" className="tba-cta-logo" loading="lazy" decoding="async" />
          <p>Have a story worth moving?</p>
          <h2>Let&rsquo;s give it<br /><em>somewhere to go.</em></h2>
          <a
            href="mailto:admin@thebrandadvertising.in?subject=Campaign%20Enquiry%20for%20TBA"
            className="nature-button nature-button-dark"
            aria-label="Email The Brand Advertising"
          >
            admin@thebrandadvertising.in <ArrowRight size={16} />
          </a>
        </motion.div>
      </section>
    </main>
  );
}

