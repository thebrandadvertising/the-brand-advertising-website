import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Campaigns from "./pages/Campaigns";
import ServiceDetail from "./pages/ServiceDetail";
import Coverage from "./pages/Coverage";
import SocialButtons from "./components/SocialButtons";
import MotionExperience from "./components/MotionExperience";
import Seo from "./components/Seo";

const pageSeo = {
  "/": ["Outdoor Advertising Agency in India | The Brand Advertising", "Plan outdoor advertising, vehicle branding, retail campaigns and on-ground activations with The Brand Advertising. Share your markets and campaign goals.", "WebPage"],
  "/about": ["About The Brand Advertising | Outdoor & Brand Activation", "Learn how The Brand Advertising plans vehicle branding, retail campaigns and on-ground activations across India. Meet the team and explore our work.", "AboutPage"],
  "/services": ["Outdoor Advertising & Brand Activation Services | TBA", "Compare vehicle branding, retail branding and on-ground activation formats. Explore campaign options and request a plan for your target markets.", "CollectionPage", {
    "@type": "ItemList",
    name: "The Brand Advertising services",
    itemListElement: [
      ["Auto Hood Branding", "/services/auto-hood-branding"],
      ["Cab Branding", "/services/cab-branding"],
      ["Vehicle Branding", "/services/vehicle-branding"],
      ["Retail Branding", "/services/retail-branding"],
      ["BTL Activation", "/services/btl-activation"],
    ].map(([name, path], index) => ({ "@type": "ListItem", position: index + 1, name, url: `https://thebrandadvertising.com${path}` })),
  }],
  "/contact": ["Contact The Brand Advertising | Plan a Campaign", "Tell TBA your target market, advertising format, audience and dates to start a scoped vehicle branding, retail or activation campaign discussion.", "ContactPage"],
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/+$/, "") || "/";
  const seo = pageSeo[normalizedPath];

  useEffect(() => {
    if (window.sessionStorage.getItem("tba-intro-seen")) return undefined;
    setLoading(true);
    const t = setTimeout(() => {
      setLoading(false);
      window.sessionStorage.setItem("tba-intro-seen", "true");
    }, 950);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <LoadingScreen show={loading} route={location.pathname} />
      {seo && <Seo title={seo[0]} description={seo[1]} path={normalizedPath} pageType={seo[2]} schema={seo[3]} />}
      <MotionExperience />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/pan-india-coverage" element={<Coverage />} />
        <Route path="/work" element={<Navigate to="/campaigns" replace />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <SocialButtons />
    </div>
  );
}
