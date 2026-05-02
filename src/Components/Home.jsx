import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import Stats from "./Stats";
import Gallery from "./Gallery";
import Training from "./Training";

const EMAILJS_SERVICE = "service_5lggkcv";
const EMAILJS_TEMPLATE = "template_im7r0td";
const EMAILJS_PUBLIC = "3BSh4FwmsTyP7ihVo";

try { emailjs.init(EMAILJS_PUBLIC); } catch (e) { /* no-op */ }

/* ================== DATA ================== */
const massageTypes = [
  {
    title: "Aromatherapy",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800",
    desc: "Botanical oils, slow strokes — release stress and rebalance the senses.",
    tag: "Relax",
    duration: "60 min",
    price: 2499,
  },
  {
    title: "Swedish Massage",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    desc: "Long, gliding strokes ease tension across the entire body.",
    tag: "Classic",
    duration: "60 min",
    price: 2499,
  },
  {
    title: "Deep Tissue Massage",
    image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800",
    desc: "Targeted pressure to dissolve chronic muscle knots and restore mobility.",
    tag: "Therapeutic",
    duration: "60 min",
    price: 2999,
  },
  {
    title: "Thai Massage",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    desc: "Assisted stretches and rhythmic compressions awaken the body.",
    tag: "Energising",
    duration: "75 min",
    price: 2999,
  },
  {
    title: "Jet Lag Therapy",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800",
    desc: "A reset ritual after long travel — circulation, breath, recovery.",
    tag: "Recovery",
    duration: "75 min",
    price: 3499,
  },
  {
    title: "Tiara Signature Massage",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
    desc: "Our holistic flagship treatment — curated for complete restoration.",
    tag: "Signature",
    duration: "90 min",
    price: 3999,
  },
];

const inr = (n) => `₹${n.toLocaleString("en-IN")}`;
const DISCOUNT = 0.20;
const discounted = (n) => Math.round((n * (1 - DISCOUNT)) / 10) * 10;

const TESTIMONIALS = [
  { name: "Wanderlust IM", review: "Tiara Spa's home services are a game changer! Their therapists brought the spa experience right to my doorstep, and it was incredible.", rating: 5 },
  { name: "Mithun", review: "I had a very pleasant experience with Tiara Doorstep Spa. The therapist was punctual, well-trained, and maintained complete professionalism.", rating: 5 },
  { name: "Deepthi", review: "The ambience was relaxing, and I felt completely refreshed after the session. Best doorstep service in Bangalore.", rating: 5 },
  { name: "Professional Work", review: "Professional therapist and amazing work. Highly satisfied with the hygiene and quality of products used.", rating: 5 },
  { name: "Quality & Comfort", review: "I really appreciated the hygiene, quality of products used, and overall comfort. Truly a premium experience.", rating: 5 },
];

const BOOK_DIRECT_URL = `https://wa.me/916363595881?text=${encodeURIComponent(
  "Hello Tiara Spa, I would like to book a massage."
)}`;

/* ================== HERO CARD (3D tilt) ================== */
const HeroCard = () => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateZ(0)";
  };

  return (
    <div
      ref={ref}
      className="hero-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="stats">
        <div>
          <div className="stat-num">3L+</div>
          <div className="stat-label">Happy Clients</div>
        </div>
        <div>
          <div className="stat-num">4+</div>
          <div className="stat-label">Years of Service</div>
        </div>
        <div>
          <div className="stat-num">6</div>
          <div className="stat-label">Massage Types</div>
        </div>
        <div>
          <div className="stat-num">5.0★</div>
          <div className="stat-label">Average Rating</div>
        </div>
      </div>
      <div className="location-badge">
        <span style={{ fontSize: 16 }}>📍</span> Bangalore · HSR Layout
      </div>
    </div>
  );
};

/* ================== SERVICE CARD (3D tilt) ================== */
const ServiceCard = ({ item, onBook }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateZ(0)";
  };

  return (
    <article
      ref={ref}
      className="svc-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => onBook(item)}
    >
      <div className="svc-img-wrap">
        <img src={item.image} alt={item.title} loading="lazy" />
        <span className="svc-discount-badge">20% OFF</span>
        <div className="svc-overlay">
          <span className="book-now">Book This ↗</span>
        </div>
      </div>
      <div className="svc-body">
        <div className="svc-meta-row">
          <span className="svc-tag">{item.tag}</span>
          <span className="svc-duration">⏱ {item.duration}</span>
        </div>
        <h3 className="svc-title">{item.title}</h3>
        <p className="svc-desc">{item.desc}</p>
        <div className="svc-price-row">
          <div className="svc-price">
            <div className="svc-price-line">
              <span className="svc-price-strike">{inr(item.price)}</span>
              <span className="svc-price-amt">{inr(discounted(item.price))}</span>
            </div>
            <span className="svc-price-note">20% OFF · + cab charges</span>
          </div>
          <button
            type="button"
            className="svc-link"
            onClick={(e) => { e.stopPropagation(); onBook(item); }}
          >
            Book →
          </button>
        </div>
      </div>
    </article>
  );
};

/* ================== HOME ================== */
const Home = () => {
  /* booking modal state — keep names exact */
  const [showModal, setShowModal] = useState(false);
  const [selectedMassage, setSelectedMassage] = useState(null);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [gender, setGender] = useState("");

  /* coupon modal state */
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponName, setCouponName] = useState("");
  const [couponPhone, setCouponPhone] = useState("");
  const [couponCode, setCouponCode] = useState("");

  /* hero parallax */
  const [scrollY, setScrollY] = useState(0);

  /* testimonial rotator */
  const [tIdx, setTIdx] = useState(0);

  useEffect(() => {
    const couponTimer = setTimeout(() => setShowCouponModal(true), 5000);
    return () => clearTimeout(couponTimer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  /* ---------- Booking flow (DO NOT CHANGE LOGIC) ---------- */
  const openModal = (massage) => {
    setSelectedMassage(massage);
    setSelectedType(massage?.title || "");
    setShowModal(true);
  };
  const closeModal = (e) => {
    if (e.target === e.currentTarget) setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gender) {
      toast.error("Please select a gender.", { position: "top-center" });
      return;
    }

    const priceLabel = selectedMassage?.price
      ? `${inr(discounted(selectedMassage.price))} after 20% OFF (was ${inr(selectedMassage.price)}) · ${selectedMassage.duration} · + cab charges`
      : "";

    const params = {
      username,
      phone_number: phoneNumber,
      massage_type: selectedType,
      massage_title: selectedMassage?.title,
      gender,
      price: priceLabel,
    };

    // Fire EmailJS BEFORE opening WhatsApp so the request is in-flight even
    // if a mobile browser navigates the tab on window.open.
    const emailPromise = emailjs.send(
      EMAILJS_SERVICE,
      EMAILJS_TEMPLATE,
      params,
      EMAILJS_PUBLIC
    );

    const message = `Hello, I would like to book a massage:
- Name: ${username}
- Phone: ${phoneNumber}
- Massage Type: ${selectedType}
- Massage Title: ${selectedMassage?.title}
- Gender: ${gender}${priceLabel ? `\n- Price: ${priceLabel}` : ""}`;

    const whatsappURL = `https://wa.me/916363595881?text=${encodeURIComponent(message)}`;
    const win = window.open(whatsappURL, "_blank");
    if (!win) window.location.href = whatsappURL;

    emailPromise.then(
      (res) => {
        console.log("[EmailJS] sent", res?.status, res?.text);
        toast.success("Message sent successfully!", { position: "top-center" });
        setUsername("");
        setPhoneNumber("");
        setSelectedType("");
        setGender("");
        setShowModal(false);
      },
      (err) => {
        console.error("[EmailJS] failed", err);
        toast.error("Failed to send message. Please try again.", { position: "top-center" });
      }
    );
  };

  /* ---------- Coupon flow (DO NOT CHANGE LOGIC) ---------- */
  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (!couponName || !couponPhone) {
      toast.error("Please enter your name and phone number.", { position: "top-center" });
      return;
    }
    const code = `TIARA20${Math.floor(Math.random() * 900 + 100)}`;
    setCouponCode(code);

    const message = `Hi, I am ${couponName}.
My phone: ${couponPhone}
I got a coupon code: ${code} for 20% OFF on my massage booking.`;

    const url = `https://wa.me/916363595881?text=${encodeURIComponent(message)}`;
    const win = window.open(url, "_blank");
    if (!win) window.location.href = url;

    toast.success("Coupon generated and sent to WhatsApp!", { position: "top-center" });
  };

  const copyCoupon = async () => {
    try {
      if (couponCode) {
        await navigator.clipboard.writeText(couponCode);
        toast.success("Coupon code copied!", { position: "top-center" });
      }
    } catch {}
  };

  const heroOffset = scrollY * 0.2;

  /* ================== UI ================== */
  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div
          className="orb o1"
          style={{ transform: `translate(${heroOffset * 0.4}px, ${heroOffset * 0.6}px)` }}
        />
        <div
          className="orb o2"
          style={{ transform: `translate(${-heroOffset * 0.3}px, ${-heroOffset * 0.4}px)` }}
        />
        <div
          className="orb o3"
          style={{ transform: `translate(${heroOffset * 0.2}px, ${-heroOffset * 0.3}px)` }}
        />

        <div className="container-x relative z-[2]">
          <div className="hero-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: `translateY(${heroOffset}px)` }}
            >
              <span className="eyebrow">Doorstep Luxury · Bangalore</span>
              <h1 className="hero-title">
                Find Your <span className="ital">Serenity</span>
              </h1>
              <p className="hero-sub">
                Curated doorstep wellness rituals delivered by certified
                therapists — bringing the spa to your home, your time, your way.
              </p>
              <div className="hero-cta-row">
                <a
                  href={BOOK_DIRECT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <FaWhatsapp style={{ color: "#25D366" }} /> Book via WhatsApp
                </a>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setShowCouponModal(true)}
                >
                  🎁 Get 20% OFF
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <HeroCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex" style={{ display: "flex", gap: 56 }}>
              {massageTypes.map((m, i) => (
                <span className="marquee-item" key={`${dup}-${i}`}>
                  {m.title} <span className="sep">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="section reveal">
        <div className="container-x">
          <div className="text-center" style={{ maxWidth: 720, margin: "0 auto" }}>
            <span className="section-eyebrow">Our Treatments</span>
            <h2 className="section-title">
              Crafted <span className="ital">rituals</span> for body & mind
            </h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Six signature experiences. Same care, same therapists, delivered
              quietly to your door.
            </p>
          </div>

          <div className="svc-grid">
            {massageTypes.map((m, i) => (
              <ServiceCard key={i} item={m} onBook={openModal} />
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 56 }}>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setShowCouponModal(true)}
            >
              🎁 Get 20% OFF Coupon
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <Stats />

      {/* GALLERY */}
      <Gallery />

      {/* CUSTOMER REVIEW VIDEO */}
      <section className="section reveal">
        <div className="container-x">
          <div className="text-center" style={{ maxWidth: 720, margin: "0 auto 40px" }}>
            <span className="section-eyebrow">Real Voices</span>
            <h2 className="section-title">
              Stories from our <span className="ital">clients</span>
            </h2>
          </div>

          <div className="video-card">
            <video autoPlay muted loop playsInline controls preload="metadata">
              <source
                src="https://res.cloudinary.com/dfxkazmkc/video/upload/v1765694345/WhatsApp_Video_2025-12-13_at_5.13.44_PM_j77vog.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="video-caption">
              <div className="video-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "var(--sand)", fontSize: 22 }}>★</span>
                ))}
              </div>
              <p>"An amazing experience at Tiara Spa!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL ROTATOR */}
      <section className="section reveal" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <div className="text-center" style={{ maxWidth: 720, margin: "0 auto" }}>
            <span className="section-eyebrow">Testimonials</span>
            <h2 className="section-title">
              What guests <span className="ital">are saying</span>
            </h2>
          </div>

          <div className="testimonial-rotator">
            <AnimatePresence mode="wait">
              <motion.div
                key={tIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote>"{TESTIMONIALS[tIdx].review}"</blockquote>
                <div className="testimonial-name">— {TESTIMONIALS[tIdx].name}</div>
                <div className="testimonial-stars">
                  {"★".repeat(TESTIMONIALS[tIdx].rating)}
                  <span style={{ opacity: 0.25 }}>{"★".repeat(5 - TESTIMONIALS[tIdx].rating)}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="testimonial-dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  className={i === tIdx ? "active" : ""}
                  onClick={() => setTIdx(i)}
                />
              ))}
            </div>

            <div className="text-center" style={{ marginTop: 32 }}>
              <a 
                href="https://www.google.com/search?q=Tiara+Doorstep+Spa+reviews" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: 14, padding: "10px 20px" }}
              >
                View all reviews on Google ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRAINING */}
      <Training />

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-backdrop"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="modal-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
              <div className="modal-header-img">
                <img src={selectedMassage?.image} alt={selectedMassage?.title || ""} />
                <span className="modal-discount-badge">20% OFF</span>
                <h3>{selectedMassage?.title}</h3>
                {selectedMassage && (
                  <div className="modal-price">
                    <div className="modal-price-line">
                      <span className="modal-price-strike">{inr(selectedMassage.price)}</span>
                      <span>{inr(discounted(selectedMassage.price))}</span>
                    </div>
                    <small>{selectedMassage.duration} · 20% OFF · + cab charges</small>
                  </div>
                )}
              </div>
              <form className="modal-body" onSubmit={handleSubmit}>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="field">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="field">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="">Select Massage Type</option>
                    {massageTypes.map((m) => (
                      <option key={m.title} value={m.title}>{m.title}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <button type="submit" className="modal-submit">
                  <FaWhatsapp /> Submit & Open WhatsApp
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COUPON MODAL */}
      <AnimatePresence>
        {showCouponModal && (
          <motion.div
            className="modal-backdrop"
            onClick={(e) => { if (e.target === e.currentTarget) setShowCouponModal(false); }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="coupon-modal" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="coupon-close"
                aria-label="Close"
                onClick={() => setShowCouponModal(false)}
              >
                ✕
              </button>
              <div className="coupon-modal-inner">
                <span className="eyebrow" style={{
                  background: "rgba(209,190,176,0.18)",
                  border: "1px solid rgba(209,190,176,0.45)",
                  color: "var(--sand)",
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--sand)", display: "inline-block",
                  }} />
                  Limited Offer
                </span>
                <h3>20% OFF</h3>
                <p>
                  Drop your name and phone — we'll send a unique code straight to
                  your WhatsApp.
                </p>

                <form onSubmit={handleCouponSubmit} style={{ marginTop: 22 }}>
                  <div style={{ marginBottom: 14 }}>
                    <label className="coupon-label">Your Name</label>
                    <input
                      className="coupon-input"
                      type="text"
                      placeholder="e.g. Priya"
                      value={couponName}
                      onChange={(e) => setCouponName(e.target.value)}
                    />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label className="coupon-label">Phone Number</label>
                    <input
                      className="coupon-input"
                      type="tel"
                      placeholder="10-digit mobile"
                      value={couponPhone}
                      onChange={(e) => setCouponPhone(e.target.value)}
                    />
                  </div>

                  {couponCode && (
                    <div className="coupon-pill">
                      <span className="coupon-pill-code">{couponCode}</span>
                      <button type="button" className="coupon-copy" onClick={copyCoupon}>
                        Copy
                      </button>
                    </div>
                  )}

                  <button type="submit" className="coupon-submit">
                    Get My 20% OFF
                  </button>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 14, textAlign: "center" }}>
                    Applicable on eligible services only.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
};

export default Home;
