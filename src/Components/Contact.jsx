import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaWhatsapp, FaInstagram, FaFacebook, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields!", { position: "top-center" });
      return;
    }

    const { name, email, message } = formData;
    const phoneNumber = "6363595881";
    const whatsappMessage = `Hello, I would like to get in touch!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    toast.success("Redirecting to WhatsApp...", { position: "top-center" });
    window.open(whatsappURL, "_blank");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="section reveal" style={{ paddingTop: 140 }}>
      <div className="container-x">
        <div className="text-center" style={{ maxWidth: 720, margin: "0 auto 56px" }}>
          <span className="section-eyebrow">Reach Out</span>
          <h1 className="section-title">
            Let's <span className="ital">talk</span>
          </h1>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            Questions, bookings, or callbacks — drop a line and we'll respond
            on WhatsApp within minutes.
          </p>
        </div>

        <div className="contact-shell">
          <aside className="contact-aside">
            <div>
              <h3>We're a message away.</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.85)" }}>
                Open Mon–Sun, doorstep service across Bangalore.
              </p>

              <div style={{ marginTop: 24 }}>
                <div className="info-row">
                  <span className="icon-pip"><FaPhone /></span>
                  <a href="tel:+916363595881" style={{ color: "#fff", textDecoration: "none" }}>+91 6363595881</a>
                </div>
                <div className="info-row">
                  <span className="icon-pip"><FaWhatsapp /></span>
                  <a href="https://wa.me/916363595881" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "none" }}>
                    WhatsApp · +91 6363595881
                  </a>
                </div>
                <div className="info-row">
                  <span className="icon-pip"><FaInstagram /></span>
                  <a href="https://www.instagram.com/tiara_doorstep_massage_/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "none" }}>
                    @tiara_doorstep_massage_
                  </a>
                </div>
                <div className="info-row">
                  <span className="icon-pip"><FaMapMarkerAlt /></span>
                  <span style={{ lineHeight: 1.5 }}>
                    Near Indian Oil Petrol Pump,<br />
                    Sector 3, HSR Layout,<br />
                    Bengaluru 560102
                  </span>
                </div>
              </div>
            </div>

            <div className="socials">
              <a href="https://www.instagram.com/tiara_doorstep_massage_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://www.facebook.com/people/Tiara-Spa/100082829139771/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://wa.me/916363595881" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </aside>

          <div className="contact-card">
            <form onSubmit={handleSubmit} className="modal-body" style={{ padding: 0 }}>
              <div className="field">
                <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="field">
                <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} />
              </div>
              <div className="field">
                <textarea name="message" rows="5" placeholder="How can we help?" value={formData.message} onChange={handleChange} />
              </div>
              <button type="submit" className="modal-submit">
                <FaWhatsapp /> Send to WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Contact;
