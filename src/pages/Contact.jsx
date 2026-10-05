import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Mail, Send, CheckCircle2, Route, Sparkles, LoaderCircle } from "lucide-react";
import RelaxingHero from "../components/RelaxingHero";
import campaignOne from "../assets/contact/cab-branding-contact.webp";
import campaignTwo from "../assets/contact/auto-hood-branding-contact.webp";

const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/admin@thebrandadvertising.in";
const FORM_SOURCE_URL = "https://thebrandadvertising.com/contact";
const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export default function Contact() {
  const location = useLocation();
  const nameInputRef = useRef(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const shouldOpenQuote = new URLSearchParams(location.search).get("quote") === "1";
    if (!shouldOpenQuote) return undefined;

    const timer = window.setTimeout(() => {
      document.getElementById("quote-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.setTimeout(() => nameInputRef.current?.focus({ preventScroll: true }), 650);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location.search]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    const requiredValues = [form.name, form.email, form.phone, form.message];
    if (requiredValues.some((value) => !value.trim())) {
      setSubmitError("Please complete all required fields before sending your enquiry.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          _subject: `New TBA campaign enquiry from ${form.name.trim()}`,
          _template: "table",
          _replyto: form.email.trim(),
          _honey: "",
          _url: FORM_SOURCE_URL,
          Name: form.name.trim(),
          Email: form.email.trim(),
          Phone: form.phone.trim(),
          Service: form.service || "Not specified",
          Message: form.message.trim(),
        }),
      });

      const result = await response.json().catch(() => null);
      const accepted = result?.success === true || result?.success === "true";
      if (!response.ok || !accepted) throw new Error(result?.message || "Submission failed");

      setSent(true);
      setForm(EMPTY_FORM);
    } catch (error) {
      setSubmitError(
        error?.name === "AbortError"
          ? "The request took too long. Please check your connection and try again."
          : "We could not send your enquiry right now. Please try again or email admin@thebrandadvertising.in directly."
      );
    } finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
    }
  };

  return (
    <main id="main-content">
      <RelaxingHero
        eyebrow="Contact TBA"
        title="Let’s get your brand moving."
        video={`${import.meta.env.BASE_URL}contact-background.mp4`}
      />

      <section id="quote-form" className="py-20 bg-cream scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 bg-white rounded-3xl shadow-soft p-8 md:p-12"
          >
            {sent ? (
              <div className="text-center py-16">
                <CheckCircle2 className="mx-auto text-brand-red mb-5" size={48} />
                <h3 className="font-display font-semibold text-2xl mb-2">
                  Your enquiry has been sent.
                </h3>
                <p className="text-charcoal-soft/70 max-w-md mx-auto">
                  Thank you for telling us about your project. The TBA team will
                  review your message and get back to you.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-brand-red text-sm font-medium"
                >
                  Create another brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" aria-busy={submitting}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="text-xs uppercase tracking-wider text-charcoal-soft/60 mb-2 block">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      ref={nameInputRef}
                      required
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full border-b border-charcoal/15 focus:border-brand-red outline-none py-2.5 bg-transparent transition-colors"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="text-xs uppercase tracking-wider text-charcoal-soft/60 mb-2 block">
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      required
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border-b border-charcoal/15 focus:border-brand-red outline-none py-2.5 bg-transparent transition-colors"
                      placeholder="+91"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-xs uppercase tracking-wider text-charcoal-soft/60 mb-2 block">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border-b border-charcoal/15 focus:border-brand-red outline-none py-2.5 bg-transparent transition-colors"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="contact-service" className="text-xs uppercase tracking-wider text-charcoal-soft/60 mb-2 block">
                    Service Interested In
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full border-b border-charcoal/15 focus:border-brand-red outline-none py-2.5 bg-transparent transition-colors"
                  >
                    <option value="">Select a service</option>
                    {[
                      "Auto Hood Branding",
                      "Cab Branding",
                      "Bus Branding",
                      "Van Activation",
                      "Retail Branding",
                      "Wall Painting",
                      "Brand Activation",
                      "Product Sampling",
                      "Mall Promotions",
                      "Road Shows",
                      "Corporate Events",
                      "Other",
                    ].map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="text-xs uppercase tracking-wider text-charcoal-soft/60 mb-2 block">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border-b border-charcoal/15 focus:border-brand-red outline-none py-2.5 bg-transparent transition-colors resize-none"
                    placeholder="Tell us about your campaign..."
                  />
                </div>

                <div aria-live="polite" aria-atomic="true">
                  {submitError && (
                    <p role="alert" className="text-sm text-red-700 bg-red-50 rounded-xl px-4 py-3">
                      {submitError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-rose to-brand-red text-white font-medium shadow-card hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {submitting ? (
                    <><LoaderCircle size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    <>Send Enquiry <Send size={16} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-ink rounded-3xl p-8 text-white">
              <p className="text-brand-rose text-xs uppercase tracking-[0.2em] mb-3">
                The Brand Advertising
              </p>
              <h3 className="font-display font-semibold text-2xl mb-6">
                One brief. Every stage.
              </h3>
              <ul className="space-y-5 text-sm text-white/75">
                <li className="flex gap-4">
                  <MapPin size={18} className="text-brand-rose shrink-0" />
                  Campaign planning and execution across India
                </li>
                <li className="flex gap-4">
                  <Route size={18} className="text-brand-rose shrink-0" />
                  Route research, creative, production and deployment
                </li>
                <li className="flex gap-4">
                  <Sparkles size={18} className="text-brand-rose shrink-0" />
                  Vehicle branding, retail, sampling and activation solutions
                </li>
                <li className="flex gap-4">
                  <Mail size={18} className="text-brand-rose shrink-0" />
                  <a href="mailto:admin@thebrandadvertising.in" className="hover:text-white break-all">
                    admin@thebrandadvertising.in
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img src={campaignOne} alt="Cab branding moving through a city business district" width="1024" height="1024" className="rounded-2xl aspect-square object-cover" loading="lazy" decoding="async" />
              <img src={campaignTwo} alt="Auto hood branding moving through a local market" width="1024" height="1024" className="rounded-2xl aspect-square object-cover" loading="lazy" decoding="async" />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
