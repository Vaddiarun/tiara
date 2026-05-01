import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const LOGO_URL =
  "https://res.cloudinary.com/dfxkazmkc/image/upload/e_auto_contrast/v1741424757/DALL_E_2025-03-08_14.33.48_-_A_sophisticated_and_elegant_logo_design_for_Tiara_Spa_featuring_a_graceful_lotus_flower_with_delicate_lines._The_design_should_have_a_luxurious_and_aik5nl.webp";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/#gallery", label: "Gallery" },
  { to: "/course", label: "Training" },
  { to: "/hiring", label: "Hiring" },
  { to: "/contact", label: "Contact" },
];

const BOOK_URL = `https://wa.me/916363595881?text=${encodeURIComponent(
  "Hello Tiara Spa, I would like to book a massage."
)}`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className={`nav-root ${scrolled ? "scrolled" : ""}`}>
        <div className="container-x flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="Tiara Spa"
              width="44"
              height="44"
              className="rounded-full object-cover"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, color: "var(--dark)", letterSpacing: "-0.005em" }}>
              Tiara <em style={{ fontStyle: "italic", color: "var(--primary)" }}>Spa</em>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
              <FaWhatsapp /> Book Now
            </a>
          </div>

          <button
            className={`lg:hidden burger ${open ? "open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              className="lg:hidden fixed inset-0 bg-black/40 z-[98]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              className="lg:hidden mobile-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
            >
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              ))}
              <a
                href={BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta mt-6 self-start"
              >
                <FaWhatsapp /> Book Now
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
