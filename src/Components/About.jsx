import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";
import { FaWhatsapp } from "react-icons/fa";
import Stats from "./Stats";

const TESTIMONIALS = [
  { name: "Wanderlust IM", review: "Tiara Spa's home services are a game changer! Their therapists brought the spa experience right to my doorstep, and it was incredible.", rating: 5 },
  { name: "Mithun", review: "I had a very pleasant experience with Tiara Doorstep Spa. The therapist was punctual, well-trained, and maintained complete professionalism.", rating: 5 },
  { name: "Deepthi", review: "The ambience was relaxing, and I felt completely refreshed after the session. Best doorstep service in Bangalore.", rating: 5 },
  { name: "Professional Work", review: "Professional therapist and amazing work. Highly satisfied with the hygiene and quality of products used.", rating: 5 },
  { name: "Quality & Comfort", review: "I really appreciated the hygiene, quality of products used, and overall comfort. Truly a premium experience.", rating: 5 },
];

const PILLS = [
  "Certified Therapists",
  "Organic Products",
  "Doorstep Service",
  "100% Private",
  "Bangalore Wide",
];

const About = () => {
  const [open, setOpen] = useState(false);

  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  return (
    <div>
      <section className="section reveal" style={{ paddingTop: 140 }}>
        <div className="container-x">
          <div className="about-hero">
            <div>
              <span className="section-eyebrow">Our Story</span>
              <h1 className="section-title">
                Trusted by <span className="ital">3 Lakh+</span> clients
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--muted)", marginTop: 18 }}>
                For more than four years, Tiara Spa has delivered professional
                doorstep wellness across Bangalore. We've served over three
                lakh customers — quietly, carefully, in the comfort of their
                own homes.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--muted)", marginTop: 14 }}>
                Our therapists are trained in classical and modern modalities,
                using organic oils and uncompromising hygiene standards.
              </p>

              <div className="about-quote">
                "We don't just treat the body — we restore the soul."
              </div>

              <div className="pill-row">
                {PILLS.map((p) => (
                  <span className="pill" key={p}>{p}</span>
                ))}
              </div>
            </div>

            <img
              className="about-image"
              src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1000&q=80"
              alt="Calm spa interior"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Stats />

      <section className="section reveal">
        <div className="container-x">
          <div className="text-center" style={{ maxWidth: 720, margin: "0 auto" }}>
            <span className="section-eyebrow">Reviews</span>
            <h2 className="section-title">
              What guests <span className="ital">share</span>
            </h2>
          </div>

          <div className="testimonial-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testimonial-tile">
                <blockquote>"{t.review}"</blockquote>
                <div className="by">
                  <span>{t.name}</span>
                  <span style={{ color: "var(--gold)" }}>{stars(t.rating)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 24 }}>
            <a 
              href="https://www.google.com/search?q=Tiara+Doorstep+Spa+reviews" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "var(--gold)", fontSize: 15, textDecoration: "underline" }}
            >
              See more authentic reviews on Google ↗
            </a>
          </div>

          <div className="text-center" style={{ marginTop: 56, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button type="button" className="btn-primary" onClick={() => setOpen(true)}>
              Prebook & Save
            </button>
            <button type="button" className="btn-outline" onClick={() => setOpen(true)}>
              <FaWhatsapp /> Request Callback
            </button>
          </div>
        </div>
      </section>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{ "& .MuiPaper-root": { borderRadius: "20px", padding: "12px", maxWidth: "420px" } }}
      >
        <DialogTitle sx={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "#5C3B44", textAlign: "center", fontSize: 28 }}>
          Contact Us
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "#5C3B44" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", paddingBottom: "28px" }}>
          <PhoneIcon sx={{ fontSize: 44, color: "#5C3B44", marginBottom: "8px" }} />
          <div style={{ color: "#3E2D2C", fontWeight: 500, marginBottom: 6 }}>Call Now</div>
          <a
            href="tel:6363595881"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#5C3B44", fontWeight: 600, fontSize: 32, textDecoration: "none" }}
          >
            6363595881
          </a>
          <div style={{ marginTop: 18 }}>
            <a
              href="https://wa.me/916363595881"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: "inline-flex" }}
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default About;
