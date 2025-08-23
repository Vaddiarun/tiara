import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

/* ================== Data ================== */
const massageTypes = [
  {
    title: "Aromatherapy",
    image:
      "https://secretoasisspa.co.uk/wp-content/uploads/2023/10/secret-oasis-spa-aromatherapy-massage_safety.jpg",
    desc: "Relax and rejuvenate.",
  },
  {
    title: "Swedish Massage",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=60",
    desc: "Gentle and relaxing.",
  },
  {
    title: "Deep Tissue Massage",
    image:
      "https://media.istockphoto.com/id/531237109/photo/medical-massage-closeup.webp?a=1&b=1&s=612x612&w=0&k=20&c=uev3naRzPw-5tdJSh6ipJsd8tB4AU3MmNzbQCOJT34I=",
    desc: "For sore muscles.",
  },
  {
    title: "Thai Massage",
    image:
      "https://plus.unsplash.com/premium_photo-1661682650688-8baab88b32ed?w=600&auto=format&fit=crop&q=60",
    desc: "Stretch and release tension.",
  },
  {
    title: "Jet Lag Therapy",
    image:
      "https://tattvaspa.com/wp-content/uploads/2023/04/JET-LAG-THERAPY-MASSAGE.webp",
    desc: "For stiffness release.",
  },
  {
    title: "Tiara Signature Massage",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC97LN7h6iZya5qWIb0rv4BfUCpNB8iI-YzA&s",
    desc: "Get fit and sculpted booties.",
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
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 360,
    height: typeof window !== "undefined" ? window.innerHeight : 640,
  });

  // Coupon popup
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponName, setCouponName] = useState("");
  const [couponPhone, setCouponPhone] = useState("");
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);

    const off = setTimeout(() => setShowConfetti(false), 5000);
    const couponTimer = setTimeout(() => setShowCouponModal(true), 5000);

    return () => {
      clearTimeout(off);
      clearTimeout(couponTimer);
      window.removeEventListener("resize", handleResize);
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
    } catch {}
  };

  /* ================== UI ================== */
  return (
    <div className="bg-[#F9F7F2] text-[#3E2D2C]">
      {/* Hero */}
      <div className="relative">
        {showConfetti && (
          <Confetti width={windowSize.width} height={windowSize.height} />
        )}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="w-full overflow-hidden">
            <img
              src="https://media.istockphoto.com/id/1325095289/photo/still-life-closeup-of-a-tranquil-spa-arrangement.jpg?s=612x612&w=0&k=20&c=yrNXIAA1mSSzypzbKMTl4807nRG4S8rs5RsWb-J0M9U="
              alt="Spa Arrangement"
              loading="eager"
              className="w-full object-cover
                         h-[48vh] sm:h-[52vh] md:h-[56vh] lg:h-[60vh] xl:h-[64vh]"
            />
          </div>
        </motion.div>

        <header className="text-center py-6 sm:py-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#5C3B44]">
            Experience Tiara Spa Near You
          </h2>
        </header>
      </div>

      {/* Services */}
      <section className="mx-auto max-w-screen-xl py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
          Our Premium Massage Services
        </h2>

        <div className="grid gap-5 sm:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3">
          {massageTypes.map((type, i) => (
            <button
              key={i}
              onClick={() => openModal(type)}
              className="text-left border rounded-xl p-4 shadow-sm hover:shadow-md bg-white transition focus:outline-none focus:ring-2 focus:ring-[#5C3B44]/30"
            >
              <div className="w-full overflow-hidden rounded-lg">
                <img
                  src={type.image}
                  alt={type.title}
                  loading="lazy"
                  width="640"
                  height="480"
                  className="w-full aspect-[4/3] sm:aspect-[16/10] object-cover"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#5C3B44] mt-3">
                {type.title}
              </h3>
              <p className="text-sm sm:text-base text-[#6B5B57]">
                {type.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Coupon CTA (brand colors) */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowCouponModal(true)}
            className="inline-flex items-center justify-center w-full sm:w-auto
               bg-[#5C3B44] hover:bg-[#3E2D2C] text-white
               px-6 py-3 rounded-lg border border-[#D1BEB0]/60
               shadow-md transition-colors"
          >
            🎁 Get 20% OFF Coupon
          </button>
        </div>
      </section>

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
                        <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                        <rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
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
      <style jsx>{`
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
