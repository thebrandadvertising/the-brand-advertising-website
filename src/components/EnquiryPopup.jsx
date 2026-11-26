import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, BriefcaseBusiness, Building2, CheckCircle2, LoaderCircle, Mail, MapPin, MessageCircle, Phone, UserRound, X } from "lucide-react";
import "./enquiry-popup.css";
import AnimatedTbaRepresentative from "./AnimatedTbaRepresentative.jsx";

const DISMISSED_KEY = "tba-enquiry-popup-dismissed";
const EXIT_DURATION = 280;
const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/admin@thebrandadvertising.in";
const FORM_SOURCE_URL = "https://thebrandadvertising.com/";
const SERVICES = ["Auto Hood Branding", "Vehicle Branding", "Cab Branding", "Retail Branding", "BTL Activation"];

const fields = [
  { name: "name", label: "Full Name", icon: UserRound, type: "text", required: true, autoComplete: "name" },
  { name: "company", label: "Company / Brand Name", icon: Building2, type: "text", required: false, autoComplete: "organization" },
  { name: "email", label: "Email Address", icon: Mail, type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone Number", icon: Phone, type: "tel", required: true, autoComplete: "tel" },
];

export default function EnquiryPopup() {
  const [open, setOpen] = useState(true);
  const [closing, setClosing] = useState(false);
  const [skipEntrance, setSkipEntrance] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", service: "", location: "", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const previousFocus = useRef(null);

  const dismiss = useCallback(() => {
    try { window.sessionStorage.setItem(DISMISSED_KEY, "true"); } catch { /* storage can be unavailable in private browsing */ }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(false);
    } else {
      setClosing(true);
    }
  }, []);

  useEffect(() => {
    if (!closing) return undefined;
    const timer = window.setTimeout(() => setOpen(false), EXIT_DURATION);
    return () => window.clearTimeout(timer);
  }, [closing]);

  useEffect(() => {
    if (!open) return undefined;
    previousFocus.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      setSkipEntrance(true);
      const focusable = [...dialogRef.current.querySelectorAll("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus?.({ preventScroll: true });
    };
  }, [open, dismiss]);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (submitting || closing) return;
    if ([form.name, form.email, form.phone, form.message].some((value) => !value.trim())) {
      setError("Please complete your name, email, phone number and project requirements.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      setError("Enter a valid email address before continuing.");
      return;
    }

    setSubmitting(true);
    setError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          _subject: `New TBA popup enquiry from ${form.name.trim()}`,
          _template: "table",
          _replyto: form.email.trim(),
          _honey: "",
          _url: FORM_SOURCE_URL,
          Name: form.name.trim(),
          Company: form.company.trim() || "Not provided",
          Email: form.email.trim(),
          Phone: form.phone.trim(),
          Service: form.service || "Not specified",
          "Target Location": form.location.trim() || "Not specified",
          Message: form.message.trim(),
        }),
      });

      const result = await response.json().catch(() => null);
      const accepted = result?.success === true || result?.success === "true";
      if (!response.ok || !accepted) throw new Error(result?.message || "Submission failed");

      setSent(true);
      setForm({ name: "", company: "", email: "", phone: "", service: "", location: "", message: "" });
    } catch (submissionError) {
      setError(submissionError?.name === "AbortError"
        ? "The request took too long. Please check your connection and try again."
        : "We could not send your enquiry right now. Please try again or email admin@thebrandadvertising.in directly.");
    } finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="tba-popup-backdrop" data-closing={closing} data-skip-entrance={skipEntrance} style={{ "--tba-exit-time": `${EXIT_DURATION}ms` }} onMouseDown={(event) => { if (event.target === event.currentTarget) dismiss(); }}>
      <section className="tba-popup-card" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="tba-popup-title" aria-describedby="tba-popup-description">
        <button ref={closeRef} type="button" className="tba-popup-close" onClick={dismiss} aria-label="Close enquiry popup"><X aria-hidden="true" size={22} strokeWidth={2.5} /></button>

        <aside className="tba-popup-character" aria-label="The Brand Advertising welcome">
          <p className="tba-popup-kicker">The Brand Advertising</p>
          <p className="tba-popup-welcome">Let’s grow your brand <em>together.</em></p>
          <div className="tba-popup-character-stage" aria-hidden="true">
            <AnimatedTbaRepresentative />
          </div>
        </aside>

        <div className="tba-popup-form-panel">
          <h2 id="tba-popup-title">Get in Touch with The Brand Advertising</h2>
          <p className="tba-popup-description" id="tba-popup-description">Tell us about your requirements and let’s create something extraordinary.</p>

          {sent ? (
            <div className="tba-popup-success" role="status" aria-live="polite">
              <CheckCircle2 aria-hidden="true" size={34} />
              <h3>Your enquiry has been sent.</h3>
              <p>Thank you for sharing your project with TBA. Our team will review your enquiry.</p>
              <button type="button" onClick={dismiss}>Close</button>
            </div>
          ) : <form className="tba-popup-form" onSubmit={submit} aria-busy={submitting}>
            <div className="tba-popup-input-grid">
              {fields.map(({ icon: Icon, name, label, ...props }) => (
                <label key={name} className="tba-popup-field" htmlFor={`tba-popup-${name}`}>
                  <Icon aria-hidden="true" size={17} strokeWidth={2} />
                  <span className="sr-only">{label}{props.required ? " (required)" : ""}</span>
                  <input id={`tba-popup-${name}`} name={name} aria-label={label} placeholder={label} value={form[name]} onChange={update} {...props} />
                </label>
              ))}
            </div>

            <label className="tba-popup-field" htmlFor="tba-popup-service">
              <BriefcaseBusiness aria-hidden="true" size={17} strokeWidth={2} /><span className="sr-only">Service Required</span>
              <select id="tba-popup-service" name="service" value={form.service} onChange={update}>
                <option value="">Service Required</option>{SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}
              </select>
            </label>
            <label className="tba-popup-field" htmlFor="tba-popup-location">
              <MapPin aria-hidden="true" size={17} strokeWidth={2} /><span className="sr-only">Target Location</span>
              <input id="tba-popup-location" name="location" aria-label="Target Location" placeholder="Target Location" autoComplete="address-level2" value={form.location} onChange={update} />
            </label>
            <label className="tba-popup-field tba-popup-message" htmlFor="tba-popup-message">
              <MessageCircle aria-hidden="true" size={17} strokeWidth={2} /><span className="sr-only">Message / Project Requirements</span>
              <textarea id="tba-popup-message" name="message" placeholder="Message / Project Requirements" rows={2} value={form.message} onChange={update} />
            </label>
            {error && <p className="tba-popup-error" role="alert">{error}</p>}
            <button type="submit" className="tba-popup-submit" disabled={submitting}>
              {submitting ? <><LoaderCircle aria-hidden="true" size={18} className="tba-popup-spinner" /> Sending...</> : <>Submit Enquiry <ArrowRight aria-hidden="true" size={18} /></>}
            </button>
            <p className="tba-popup-privacy">Your enquiry will be sent to The Brand Advertising via FormSubmit.</p>
          </form>}
        </div>
      </section>
    </div>
  );
}
