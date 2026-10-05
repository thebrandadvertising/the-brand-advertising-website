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
import CityAutoHood from "./pages/CityAutoHood";
import SocialButtons from "./components/SocialButtons";
import MotionExperience from "./components/MotionExperience";
import Seo from "./components/Seo";

const pageSeo = {
  "/": ["The Brand Advertising | Pan-India Outdoor & Vehicle Branding", "The Brand Advertising is a pan-India marketing agency for auto hood branding, cab branding, retail branding, bus branding, wall painting and activations."],
  "/about": ["About The Brand Advertising | Pan-India Marketing Agency", "Meet The Brand Advertising, a pan-India agency creating vehicle branding, outdoor media, retail branding and on-ground brand experiences."],
  "/services": ["Advertising & Branding Services Across India | TBA", "Explore auto hood branding, cab and bus branding, retail branding, wall painting, product sampling, roadshows and corporate events across India."],
  "/campaigns": ["Advertising Campaigns & Brand Activations | TBA India", "Explore outdoor advertising, vehicle branding and on-ground campaign work delivered by The Brand Advertising across India."],
  "/contact": ["Contact The Brand Advertising | Plan a Pan-India Campaign", "Contact The Brand Advertising for auto hood branding, cab branding, retail branding and campaign execution across India."],
};

export default function App() {
  const [loading, setLoading] = useState(
    () => !window.sessionStorage.getItem("tba-intro-seen")
  );
  const location = useLocation();
  const seo = pageSeo[location.pathname];

  useEffect(() => {
    if (!loading) return undefined;
    window.sessionStorage.setItem("tba-intro-seen", "true");
    const t = setTimeout(() => setLoading(false), 950);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <div className="min-h-screen bg-cream">
      <LoadingScreen show={loading} route={location.pathname} />
      {seo && <Seo title={seo[0]} description={seo[1]} path={location.pathname} />}
      <MotionExperience />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/pan-india-coverage" element={<Coverage />} />
        <Route path="/auto-hood-branding/:citySlug" element={<CityAutoHood />} />
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
