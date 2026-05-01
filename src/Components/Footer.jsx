import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaFacebook, FaGoogle } from "react-icons/fa";

const SERVICES = [
  "Aromatherapy",
  "Swedish Massage",
  "Deep Tissue Massage",
  "Thai Massage",
  "Jet Lag Therapy",
  "Tiara Signature Massage",
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-x">
        <div className="footer-grid">
          <div>
            <h2 className="footer-brand">
              Tiara <em style={{ fontStyle: "italic", color: "var(--sand)" }}>Spa</em>
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: 280 }}>
              Doorstep luxury wellness across Bangalore. Certified therapists,
              organic products, complete privacy.
            </p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/tiara_doorstep_massage_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.facebook.com/people/Tiara-Spa/100082829139771/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://g.co/kgs/Y4Lf5qQ" target="_blank" rel="noopener noreferrer" aria-label="Google"><FaGoogle /></a>
              <a href="https://wa.me/916363595881" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </div>

          <div>
            <h4>Services</h4>
            {SERVICES.map((s) => (
              <a key={s} href="/#services">{s}</a>
            ))}
          </div>

          <div>
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/course">Training</Link>
            <Link to="/hiring">Hiring</Link>
            <Link to="/contact">Contact</Link>
            <a href="https://g.co/kgs/Y4Lf5qQ" target="_blank" rel="noopener noreferrer">Google Business</a>
          </div>

          <div>
            <h4>Contact</h4>
            <a href="tel:+916363595881">+91 6363595881</a>
            <a href="https://wa.me/916363595881" target="_blank" rel="noopener noreferrer">WhatsApp · +91 6363595881</a>
            <a href="https://www.instagram.com/tiara_doorstep_massage_/" target="_blank" rel="noopener noreferrer">@tiara_doorstep_massage_</a>
            <p style={{ fontSize: 13, lineHeight: 1.65, marginTop: 12, color: "rgba(255,255,255,0.6)" }}>
              Near Indian Oil Petrol Pump, Sector 3, HSR Layout, Bengaluru 560102
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Tiara Spa · All rights reserved.</span>
          <span>Sector 3, HSR Layout, Bengaluru 560102</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
