import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/campaigns", label: "Our Campaigns" },
  { to: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/85 backdrop-blur-xl shadow-soft py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="tba-brand-link" onClick={() => setOpen(false)} aria-label="The Brand Advertising home">
          <img src={`${import.meta.env.BASE_URL}tba-logo.jpg`} alt="TBA — The Brand Advertising" width="1254" height="1254" className="tba-nav-logo" />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative text-sm font-medium tracking-wide transition-colors py-1 ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                } group`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-[1.5px] bg-[#f1c94c] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/contact?quote=1"
            className="px-5 py-2.5 rounded-full bg-[#f1c94c] text-black text-sm font-medium shadow-card hover:bg-white transition-all"
          >
            Get a Quote
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div id="mobile-navigation" className="md:hidden bg-black/95 backdrop-blur-xl mt-4 border-t border-white/10">
          <div className="flex flex-col px-6 py-6 gap-5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium ${isActive ? "text-[#f1c94c]" : "text-white/85"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <p className="text-white/55 text-sm">Ideas that move brands.</p>
          </div>
        </div>
      )}
    </header>
    </>
  );
}

