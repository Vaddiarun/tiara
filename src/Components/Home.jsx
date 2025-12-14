import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Hero3D from "./Hero3D";
import FallingIcons from "./FallingIcons";

/* ================== Data ================== */
const massageTypes = [
  {
    title: "Aromatherapy",
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80",
    desc: "Relax and rejuvenate with essential oils.",
  },
  {
    title: "Swedish Massage",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
    desc: "Gentle and relaxing full-body massage.",
  },
  {
    title: "Deep Tissue Massage",
    image:
      "https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=800&q=80",
    desc: "Relieve chronic muscle tension.",
  },
  {
    title: "Thai Massage",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    desc: "Stretch and release tension.",
  },
  {
    title: "Jet Lag Therapy",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    desc: "Revitalize after long travels.",
  },
  {
    title: "Tiara Signature Massage",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    desc: "Our exclusive holistic treatment.",
  },
];

/* ================== Component ================== */
const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedMassage, setSelectedMassage] = useState(null);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [gender, setGender] = useState("");

  // Mouse tracking for 3D effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Coupon popup
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponName, setCouponName] = useState("");
  const [couponPhone, setCouponPhone] = useState("");
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    const couponTimer = setTimeout(() => setShowCouponModal(true), 5000);

    return () => {
      clearTimeout(couponTimer);
    };
  }, []);

  /* ---------- Helpers ---------- */
  const openModal = (massage) => {
    setSelectedMassage(massage);
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

    const message = `Hello, I would like to book a massage:
- Name: ${username}
- Phone: ${phoneNumber}
- Massage Type: ${selectedType}
- Massage Title: ${selectedMassage?.title}
- Gender: ${gender}`;

    const whatsappURL = `https://wa.me/916363595881?text=${encodeURIComponent(
      message
    )}`;
    const win = window.open(whatsappURL, "_blank");
    if (!win) window.location.href = whatsappURL;

    emailjs
      .send(
        "service_5lggkcv",
        "template_im7r0td",
        {
          username,
          phone_number: phoneNumber,
          massage_type: selectedType,
          massage_title: selectedMassage?.title,
          gender,
        },
        "3BSh4FwmsTyP7ihVo"
      )
      .then(
        () => {
          toast.success("Message sent successfully!", {
            position: "top-center",
          });
          setUsername("");
          setPhoneNumber("");
          setSelectedType("");
          setGender("");
          setShowModal(false);
        },
        () =>
          toast.error("Failed to send message. Please try again.", {
            position: "top-center",
          })
      );
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (!couponName || !couponPhone) {
      toast.error("Please enter your name and phone number.", {
        position: "top-center",
      });
      return;
    }
    const code = `TIARA20${Math.floor(Math.random() * 900 + 100)}`;
    setCouponCode(code);

    const message = `Hi, I am ${couponName}.
My phone: ${couponPhone}
I got a coupon code: ${code} for 20% OFF on my massage booking.`;

    const url = `https://wa.me/916363595881?text=${encodeURIComponent(
      message
    )}`;
    const win = window.open(url, "_blank");
    if (!win) window.location.href = url;

    toast.success("Coupon generated and sent to WhatsApp!", {
      position: "top-center",
    });
  };

  // 👉 route to Course page
  const goToCourse = () => navigate("/course");

  // Copy coupon to clipboard (UI helper; optional to use)
  const copyCoupon = async () => {
    try {
      if (couponCode) {
        await navigator.clipboard.writeText(couponCode);
        toast.success("Coupon code copied!", { position: "top-center" });
      }
    } catch { }
  };

  /* ================== UI ================== */
  return (
    <div className="text-[#3E2D2C] relative">
      {/* Falling Icons Animation */}
      <FallingIcons />

      {/* Hero */}
      <div
        className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
          const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
          setMousePosition({ x, y });
        }}
        onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
        style={{ perspective: '1000px' }}
      >
        <Hero3D />

        {/* Animated gradient orbs with parallax */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5C3B44]/20 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D1BEB0]/30 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />

        {/* Additional floating orb for depth */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#A0A051]/15 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * -25}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />

        {/* Enhanced glass panel with 3D tilt */}
        <motion.div
          className="relative z-10 text-center p-8 sm:p-12 max-w-4xl mx-4"
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '24px',
            boxShadow: `
              0 ${8 + mousePosition.y * 5}px ${32 + Math.abs(mousePosition.x) * 10}px rgba(0, 0, 0, ${0.1 + Math.abs(mousePosition.y) * 0.05}), 
              inset 0 1px 0 rgba(255, 255, 255, 0.6),
              0 0 60px rgba(92, 59, 68, ${0.1 + Math.abs(mousePosition.x) * 0.05})
            `,
            transform: `
              rotateY(${mousePosition.x * 5}deg) 
              rotateX(${mousePosition.y * -5}deg)
              translateZ(20px)
            `,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
          }}
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {/* Floating animation with layered depth */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              transform: `translateZ(30px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Main heading with word animation and 3D depth */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #5C3B44 0%, #3E2D2C 50%, #5C3B44 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                transform: `translateZ(40px)`,
                textShadow: '0 10px 30px rgba(92, 59, 68, 0.3)',
              }}
            >
              {["Find", "Your", "Serenity"].map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3 sm:mr-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + i * 0.2,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle with depth */}
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl text-[#3E2D2C] font-light mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              style={{
                transform: `translateZ(25px)`,
              }}
            >
              Luxury & Relaxation Reimagined
            </motion.p>

            {/* CTA Button with enhanced 3D */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              style={{
                transform: `translateZ(50px)`,
              }}
            >
              <motion.a
                href="#services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#5C3B44] text-white rounded-full font-medium text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(92, 59, 68, 0.4)",
                  rotateZ: 2,
                }}
                whileTap={{
                  scale: 0.95,
                  rotateZ: 0,
                }}
                style={{
                  boxShadow: `
                    0 10px 30px rgba(92, 59, 68, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                Explore Our Services
                <motion.svg
                  className="w-5 h-5"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Decorative 3D elements */}
          <div
            className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#D1BEB0]/30 to-transparent rounded-full blur-2xl pointer-events-none"
            style={{
              transform: `translateZ(10px) translate(${mousePosition.x * -15}px, ${mousePosition.y * 15}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
          <div
            className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-[#5C3B44]/20 to-transparent rounded-full blur-2xl pointer-events-none"
            style={{
              transform: `translateZ(15px) translate(${mousePosition.x * 20}px, ${mousePosition.y * -20}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
        </motion.div>
      </div>

      {/* Services */}
      <section id="services" className="mx-auto max-w-screen-xl py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
          Our Premium Massage Services
        </h2>

        <div className="grid gap-5 sm:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
          {massageTypes.map((type, i) => (
            <motion.button
              key={i}
              onClick={() => openModal(type)}
              className="text-left border border-[#D1BEB0]/30 rounded-xl p-4 shadow-sm hover:shadow-xl bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#5C3B44]/30 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 50, damping: 20, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
            >
              <div className="w-full overflow-hidden rounded-lg">
                <img
                  src={type.image}
                  alt={type.title}
                  loading="lazy"
                  width="640"
                  height="480"
                  className="w-full aspect-[4/3] sm:aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#5C3B44] mt-4 group-hover:text-[#A0A051] transition-colors">
                {type.title}
              </h3>
              <p className="text-sm sm:text-base text-[#6B5B57] mt-1">
                {type.desc}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Coupon CTA (brand colors) */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowCouponModal(true)}
            className="inline-flex items-center justify-center w-full sm:w-auto
               bg-[#5C3B44] hover:bg-[#3E2D2C] text-white
               px-8 py-4 rounded-full border border-transparent
               shadow-lg transition-all duration-300 hover:scale-105"
          >
            🎁 Get 20% OFF Coupon
          </button>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <motion.section
        className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#5C3B44] mb-3">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg text-[#6B5B57] max-w-2xl mx-auto">
            Real experiences from our valued customers
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          {/* Brand glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#5C3B44]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#D1BEB0]/25 blur-3xl" />

          {/* Content wrapper */}
          <div className="relative p-5 sm:p-8 bg-gradient-to-br from-[#3E2D2C]/30 via-[#5C3B44]/20 to-[#3E2D2C]/30">
            <div className="rounded-2xl p-[1.5px] bg-gradient-to-r from-[#5C3B44]/70 via-[#D1BEB0]/65 to-[#3E2D2C]/70">
              <div className="glass-card-brand rounded-2xl p-4 sm:p-6 md:p-8">
                {/* Video container */}
                <div className="relative w-full overflow-hidden rounded-xl shadow-xl">
                  <video
                    className="w-full h-auto rounded-xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    controls
                    style={{
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      perspective: '1000px'
                    }}
                  >
                    <source
                      src="https://res.cloudinary.com/dfxkazmkc/video/upload/v1765694345/WhatsApp_Video_2025-12-13_at_5.13.44_PM_j77vog.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Optional: Review details */}
                <div className="mt-6 text-center">
                  <p className="text-white/90 text-sm sm:text-base italic">
                    "An amazing experience at Tiara Spa!"
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-[#D1BEB0]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Training Program — BRAND GLASS */}
      <motion.section
        className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          {/* Background image */}
          {/* <img
            src="https://images.unsplash.com/photo-1600334129128-685c5582fd5a?q=80&w=1600&auto=format&fit=crop"
            alt="Training at Tiara Spa"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          /> */}

          {/* Brand glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#5C3B44]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#D1BEB0]/25 blur-3xl" />

          {/* Subtle shine */}
          <div className="shine-brand absolute inset-0" aria-hidden="true" />

          {/* Content wrapper with brand tint */}
          <div className="relative p-5 sm:p-8 md:p-10 bg-[#3E2D2C]/50">
            {/* Gradient border in brand tones */}
            <div className="rounded-2xl p-[1.5px] bg-gradient-to-r from-[#5C3B44]/70 via-[#D1BEB0]/65 to-[#3E2D2C]/70">
              {/* GLASS CARD */}
              <div className="glass-card-brand rounded-2xl p-6 sm:p-8 md:p-10">
                {/* Header row */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    Tiara Training Program
                  </h2>
                  <span className="inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">
                    <span className="h-2 w-2 rounded-full bg-[#D1BEB0] animate-pulse" />
                    Limited Seats
                  </span>
                </div>

                <p className="text-white/90 mt-2 text-sm sm:text-base max-w-3xl">
                  Learn industry-standard techniques in{" "}
                  <span className="font-semibold">5 focused sessions</span>.
                  Earn a certificate and get considered for{" "}
                  <span className="font-semibold">pre-placement</span> at Tiara.
                </p>

                {/* Bullets */}
                <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-white/95 text-sm sm:text-base">
                  {[
                    "5 sessions · ₹2000",
                    "Certificate on completion",
                    "Pre-placement consideration",
                    "Location: Bangalore",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg
                        className="mt-0.5 h-5 w-5 flex-none text-[#D1BEB0]"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={goToCourse}
                    className="btn-glass-primary-brand w-full sm:w-auto"
                  >
                    Apply Now
                  </button>

                  <a
                    href={`https://wa.me/916363595881?text=${encodeURIComponent(
                      "Hi Tiara, I have a question about the Training Program."
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-glass-secondary-brand w-full sm:w-auto"
                  >
                    Ask a Question
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Booking Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-3"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-md sm:rounded-2xl rounded-t-2xl p-5 sm:p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
              {selectedMassage?.title}
            </h3>
            <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Massage Type</option>
                <option value="Aromatherapy">Aromatherapy</option>
                <option value="Swedish Massage">Swedish Massage</option>
                <option value="Deep Tissue Massage">Deep Tissue Massage</option>
                <option value="Thai Massage">Thai Massage</option>
              </select>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <button
                type="submit"
                className="w-full bg-[#5C3B44] text-white py-3 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Modal — Redesigned (brand glass & pro layout) */}
      {showCouponModal && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-end sm:items-center bg-black/50 backdrop-blur-sm p-3"
          onClick={() => setShowCouponModal(false)}
        >
          <div
            className="coupon-modal-bg w-full max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl p-0 relative animate-scaleUp max-h-[92vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/15">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-[#D1BEB0]">
                    <span className="h-2 w-2 rounded-full bg-[#D1BEB0] animate-pulse" />
                    Limited Offer
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-white">
                    🎁 20% OFF Coupon
                  </h3>
                  <p className="text-white/80 text-sm">
                    Fill in your details to unlock your unique code.
                  </p>
                </div>
                <button
                  className="text-white/70 hover:text-white transition"
                  onClick={() => setShowCouponModal(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Form body */}
            <div className="px-6 py-5 space-y-4 overflow-y-auto">
              <div>
                <label className="coupon-label">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={couponName}
                  onChange={(e) => setCouponName(e.target.value)}
                  className="coupon-input"
                />
              </div>

              <div>
                <label className="coupon-label">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your phone"
                  value={couponPhone}
                  onChange={(e) => setCouponPhone(e.target.value)}
                  className="coupon-input"
                />
              </div>

              {/* Code reveal */}
              {couponCode && (
                <div className="mt-2">
                  <div className="code-pill">
                    <span className="font-mono tracking-widest">{couponCode}</span>
                    <button
                      type="button"
                      className="copy-btn"
                      onClick={copyCoupon}
                      aria-label="Copy coupon code"
                    >
                      {/* copy icon */}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                        <rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      Copy
                    </button>
                  </div>
                  <p className="text-white/70 text-xs mt-2">
                    Code also sent to WhatsApp once generated.
                  </p>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="px-6 pt-3 pb-6 border-t border-white/15">
              <button
                onClick={handleCouponSubmit}
                className="coupon-primary-btn w-full"
              >
                Get My 20% OFF
              </button>

              <p className="text-[11px] text-white/65 mt-3 text-center">
                By continuing, you agree to our fair-use policy. Applicable on
                eligible services only.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Animations & Brand Glass helpers */}
      <style>{`
        @keyframes scaleUp {
          from {
            transform: scale(0.98);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scaleUp {
          animation: scaleUp 0.28s ease-out forwards;
        }

        /* —— brand glass helpers (training card) —— */
        .glass-card-brand {
          background: rgba(62, 45, 44, 0.18); /* brand dark tint (#3E2D2C) */
          backdrop-filter: blur(14px) saturate(160%);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          border: 1px solid rgba(209, 190, 176, 0.45); /* #D1BEB0 accent */
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .shine-brand {
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(209, 190, 176, 0.18) 22%,
            transparent 42%,
            transparent 58%,
            rgba(92, 59, 68, 0.18) 78%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: panBrand 14s linear infinite;
          mix-blend-mode: screen;
        }
        @keyframes panBrand {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 0%;
          }
        }

        .btn-glass-primary-brand {
          background: linear-gradient(180deg, rgba(209, 190, 176, 0.25), rgba(209, 190, 176, 0.14));
          color: #ffffff;
          border: 1px solid rgba(209, 190, 176, 0.6);
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease;
        }
        .btn-glass-primary-brand:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.3);
          background: linear-gradient(180deg, rgba(209, 190, 176, 0.32), rgba(209, 190, 176, 0.18));
        }

        .btn-glass-secondary-brand {
          background: rgba(92, 59, 68, 0.2); /* #5C3B44 overlay */
          color: #ffffff;
          border: 1px solid rgba(209, 190, 176, 0.45);
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          transition: transform 0.15s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .btn-glass-secondary-brand:hover {
          transform: translateY(-1px);
          background: rgba(92, 59, 68, 0.28);
          border-color: rgba(209, 190, 176, 0.6);
        }

        /* —— coupon modal professional styles —— */
        .coupon-modal-bg {
          background: radial-gradient(1200px 500px at 20% -10%, rgba(92,59,68,0.25), transparent 60%),
                      radial-gradient(1200px 500px at 100% 110%, rgba(209,190,176,0.25), transparent 60%),
                      rgba(62,45,44,0.85);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          border: 1px solid rgba(209, 190, 176, 0.35);
          border-radius: 1rem;
        }
        .coupon-label {
          display: block;
          font-size: 0.85rem;
          color: #D1BEB0;
          margin-bottom: 0.35rem;
          letter-spacing: 0.02em;
        }
        .coupon-input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          color: #fff;
          border: 1px solid rgba(209,190,176,0.35);
          border-radius: 0.75rem;
          padding: 0.75rem 0.9rem;
          outline: none;
          transition: box-shadow .15s ease, border-color .15s ease, background .15s ease;
        }
        .coupon-input::placeholder { color: rgba(255,255,255,0.55); }
        .coupon-input:focus {
          border-color: rgba(209,190,176,0.6);
          box-shadow: 0 0 0 3px rgba(209,190,176,0.25);
          background: rgba(255,255,255,0.09);
        }

        .coupon-primary-btn {
          background: linear-gradient(180deg, rgba(209,190,176,0.28), rgba(209,190,176,0.14));
          color: #fff;
          border: 1px solid rgba(209,190,176,0.55);
          padding: 0.9rem 1.25rem;
          border-radius: 0.85rem;
          box-shadow: 0 10px 22px rgba(0,0,0,0.25);
          transition: transform .15s ease, box-shadow .15s ease, background .2s ease;
        }
        .coupon-primary-btn:hover {
          transform: translateY(-1px);
          background: linear-gradient(180deg, rgba(209,190,176,0.34), rgba(209,190,176,0.18));
          box-shadow: 0 14px 28px rgba(0,0,0,0.28);
        }

        .code-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(209,190,176,0.45);
          color: #fff;
          border-radius: 0.85rem;
          padding: 0.75rem 0.9rem;
        }
        .copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          padding: 0.35rem 0.6rem;
          border-radius: 0.55rem;
          color: #fff;
          background: rgba(92,59,68,0.25);
          border: 1px solid rgba(209,190,176,0.45);
          transition: transform .15s ease, background .15s ease, border-color .15s ease;
        }
        .copy-btn:hover {
          transform: translateY(-1px);
          background: rgba(92,59,68,0.35);
          border-color: rgba(209,190,176,0.6);
        }
      `}</style>

      <ToastContainer />
    </div>
  );
};

export default Home;
