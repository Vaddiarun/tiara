

import React, { useState ,useEffect} from "react";
import emailjs from "emailjs-com"; // Import emailjs library
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import Confetti from "react-confetti";


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
      "https://www.bluetree-massage.com/wp-content/uploads/2019/07/eb5a8141-1.jpg",
    desc: "Gentle and relaxing.",
  },
  {
    title: "Deep Tissue Massage",
    image:
      "https://th.bing.com/th/id/OIP.IV7VcB5XOQP6FSzkSi1E5AHaFV?w=239&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7g",
    desc: "For sore muscles.",
  },
  {
    title: "Thai Massage",
    image:
      "https://th.bing.com/th/id/OIP.c5L_H5XgT_zUzJztnYac0gHaEc?w=267&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    desc: "Stretch and release tension.",
  },
  {
    title: "jet Leg Therapy",
    image:
      "https://tattvaspa.com/wp-content/uploads/2023/04/JET-LAG-THERAPY-MASSAGE.webp",
    desc: "For stiffness Release",
  },
  {
    title: "Tiara Signature Massage",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC97LN7h6iZya5qWIb0rv4BfUCpNB8iI-YzA&s",
    desc: "Get fit and sculpted booties.",
  },
];

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMassage, setSelectedMassage] = useState(null);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [gender, setGender] = useState(""); // ✅ Add Gender State
  // const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });


  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    // Stop confetti after 5 seconds automatically
    setTimeout(() => setShowConfetti(false), 5000);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const closeWelcomePopup = () => {
  //   setShowWelcomePopup(false);
  //   setShowConfetti(false);
  // };
    

  const openModal = (massage) => {
    setSelectedMassage(massage);
    setShowModal(true);
  };

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
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

    // ✅ Send to WhatsApp
    const whatsappNumber = "916363595881"; // Replace with your WhatsApp number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");

    // ✅ Send email using EmailJS
    emailjs
      .send(
        "service_5lggkcv", // Your EmailJS service ID
        "template_im7r0td", // Your EmailJS template ID
        {
          username: username,
          phone_number: phoneNumber,
          massage_type: selectedType,
          massage_title: selectedMassage?.title,
          gender: gender, // ✅ Include Gender
        },
        "3BSh4FwmsTyP7ihVo" // Your EmailJS public key
      )
      .then(
        (response) => {
          console.log("Email sent successfully", response);
          toast.success("Message sent successfully!", {
            position: "top-center",
          });

          // ✅ Reset form fields and close modal
          setUsername("");
          setPhoneNumber("");
          setSelectedType("");
          setGender(""); // ✅ Reset Gender
          setShowModal(false);
        },
        (err) => {
          console.error("Failed to send email:", err);
          toast.error("Failed to send message. Please try again.", {
            position: "top-center",
          });
        }
      );
  };

  return (
    <div className="bg-[#F9F7F2] ">
<div className="bg-[#F9F7F2] relative mt-4">
      {/* ✅ Confetti Effect (Now Above Popup) */}
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}

      {/* ✅ Image Section */}
      <motion.div
        className="w-full h-60 md:h-80 lg:h-96"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.img
          className="w-full h-full object-cover"
          src="https://media.istockphoto.com/id/1325095289/photo/still-life-closeup-of-a-tranquil-spa-arrangement.jpg?s=612x612&w=0&k=20&c=yrNXIAA1mSSzypzbKMTl4807nRG4S8rs5RsWb-J0M9U="
          alt="Spa Arrangement"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </motion.div>

      {/* ✅ Header Section */}
      <header className="text-center py-16 bg-[#F9F7F2] text-[#3E2D2C]">
        <motion.div
          className="px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h2
            className="text-xl lg:text-2xl font-semibold text-[#5C3B44]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Experience Tiara Spa Near You
          </motion.h2>
          <motion.p
            className="mt-3 text-[#3E2D2C] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            The daily grind of work and personal life takes a toll on your body and mind.
            A regular spa helps you unwind, relax, and re-energize. Choose from our signature,
            home-crafted massages & therapies or opt for the classic Deep Tissue Massage,
            Swedish Massage, Ayurvedic Massages, or the Thai Massage.
          </motion.p>
          <motion.p
            className="mt-3 text-[#3E2D2C] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Tiara Spa therapies will help keep your body running smoothly, so you can
            conquer that half marathon or power through a full day of meetings.
          </motion.p>
        </motion.div>
      </header>
    </div>

      <section className="container mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold text-[#3E2D2C] mb-6 text-center">
          Our Premium Massage Services
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {massageTypes.map((type, index) => (
            <div
              key={index}
              className="cursor-pointer border rounded-lg p-4 bg-[#F9F7F2] shadow-md hover:shadow-lg transition duration-300"
              onClick={() => openModal(type)}
            >
              <img
                src={type.image}
                alt={type.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold text-[#5C3B44] mt-4">
                {type.title}
              </h3>
              <p className="text-[#3E2D2C]">{type.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-[#5C3B44] bg-opacity-50 transition-opacity duration-500"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-500 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold text-[#5C3B44] mb-4">
              {selectedMassage?.title}
            </h3>
            <p className="text-[#3E2D2C] mb-6">{selectedMassage?.desc}</p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
              />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
              >
                <option value="">Select Massage Type</option>
                <option value="Aromatherapy">Aromatherapy</option>
                <option value="Swedish Massage">Swedish Massage</option>
                <option value="Deep Tissue Massage">Deep Tissue Massage</option>
                <option value="Thai Massage">Thai Massage</option>
                <option value="Breast Massage">Breast Massage</option>
                <option value="Booty Sculpting">Booty Sculpting</option>
              </select>

              {/* ✅ Gender Selection */}
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <button
                type="submit"
                className="w-full bg-[#5C3B44] text-[#F9F7F2] py-3 rounded-lg hover:bg-[#3E2D2C] transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Home;
