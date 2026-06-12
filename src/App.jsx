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
import { getSeoForPath, localBusinessSchema, SITE_NAME } from "./seo";

function setMeta(selector, attr, value) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    const match = selector.match(/\[(name|property)="([^"]+)"\]/);
    if (match) tag.setAttribute(match[1], match[2]);
    document.head.appendChild(tag);
  }
  tag.setAttribute(attr, value);
}

function setLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(location.pathname);
    const origin = window.location.origin;
    const url = `${origin}${location.pathname}`;
    const image = `${origin}/web-app-manifest-512x512.png`;

    document.title = seo.title;
    setMeta('meta[name="description"]', "content", seo.description);
    setMeta('meta[name="robots"]', "content", "index, follow, max-image-preview:large");
    setMeta('meta[property="og:title"]', "content", seo.title);
    setMeta('meta[property="og:description"]', "content", seo.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", image);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:site_name"]', "content", SITE_NAME);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", seo.title);
    setMeta('meta[name="twitter:description"]', "content", seo.description);
    setMeta('meta[name="twitter:image"]', "content", image);
    setLink("canonical", url);

    let schema = document.getElementById("local-business-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "local-business-schema";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(localBusinessSchema(origin));
  }, [location]);

  return null;
}

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
      <SeoManager />
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
