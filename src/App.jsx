import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import HiringPage from "./Components/Hiring";
import Course from "./Components/Course";
import Cursor from "./Components/Cursor";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { trackPageview, persistUtmParams } from "./analytics";

function RouteChangeTracker() {
  const location = useLocation();
  useEffect(() => {
    persistUtmParams();
    const url = location.pathname + location.search;
    trackPageview(url);
  }, [location]);
  return null;
}

function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    const observe = () => {
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => io.observe(el));
    };
    observe();
    const id = setInterval(observe, 600);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, []);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <Navbar />
      <RouteChangeTracker />
      <ScrollReveal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hiring" element={<HiringPage />} />
        <Route path="/course" element={<Course />} />
      </Routes>
      <Footer />

      <a
        href="https://wa.me/916363595881"
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}
