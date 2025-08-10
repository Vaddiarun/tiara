

// import React, { useState ,useEffect} from "react";
// import emailjs from "emailjs-com"; // Import emailjs library
// import { ToastContainer, toast } from "react-toastify";
// import { motion } from "framer-motion";
// import Confetti from "react-confetti";


// const massageTypes = [
//   {
//     title: "Aromatherapy",
//     image:
//       "https://secretoasisspa.co.uk/wp-content/uploads/2023/10/secret-oasis-spa-aromatherapy-massage_safety.jpg",
//     desc: "Relax and rejuvenate.",
//   },
//   {
//     title: "Swedish Massage",
//     image:
//       "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRlZXAlMjB0aXNzdSUyMG1hc3NhZ2V8ZW58MHx8MHx8fDA%3D",
//     desc: "Gentle and relaxing.",
//   },
//   {
//     title: "Deep Tissue Massage",
//     image:
//       "https://media.istockphoto.com/id/531237109/photo/medical-massage-closeup.webp?a=1&b=1&s=612x612&w=0&k=20&c=uev3naRzPw-5tdJSh6ipJsd8tB4AU3MmNzbQCOJT34I=",
//     desc: "For sore muscles.",
//   },
//   {
//     title: "Thai Massage",
//     image:
//       "https://plus.unsplash.com/premium_photo-1661682650688-8baab88b32ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8VGhhaSUyMG1hc3NhZ2V8ZW58MHx8MHx8fDA%3D",
//     desc: "Stretch and release tension.",
//   },
//   {
//     title: "jet Leg Therapy",
//     image:
//       "https://tattvaspa.com/wp-content/uploads/2023/04/JET-LAG-THERAPY-MASSAGE.webp",
//     desc: "For stiffness Release",
//   },
//   {
//     title: "Tiara Signature Massage",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC97LN7h6iZya5qWIb0rv4BfUCpNB8iI-YzA&s",
//     desc: "Get fit and sculpted booties.",
//   },
// ];

// const Home = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedMassage, setSelectedMassage] = useState(null);
//   const [username, setUsername] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedType, setSelectedType] = useState("");
//   const [gender, setGender] = useState(""); // ✅ Add Gender State
//   // const [showWelcomePopup, setShowWelcomePopup] = useState(true);
//   const [showConfetti, setShowConfetti] = useState(true);
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });


//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     };

//     window.addEventListener("resize", handleResize);

//     // Stop confetti after 5 seconds automatically
//     setTimeout(() => setShowConfetti(false), 5000);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // const closeWelcomePopup = () => {
//   //   setShowWelcomePopup(false);
//   //   setShowConfetti(false);
//   // };
    

//   const openModal = (massage) => {
//     setSelectedMassage(massage);
//     setShowModal(true);
//   };

//   const closeModal = (e) => {
//     if (e.target === e.currentTarget) {
//       setShowModal(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!gender) {
//       toast.error("Please select a gender.", { position: "top-center" });
//       return;
//     }

//     const message = `Hello, I would like to book a massage:
//     - Name: ${username}
//     - Phone: ${phoneNumber}
//     - Massage Type: ${selectedType}
//     - Massage Title: ${selectedMassage?.title}
//     - Gender: ${gender}`;

//     // ✅ Send to WhatsApp
//     const whatsappNumber = "916363595881"; // Replace with your WhatsApp number
//     const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(whatsappURL, "_blank");

//     // ✅ Send email using EmailJS
//     emailjs
//       .send(
//         "service_5lggkcv", // Your EmailJS service ID
//         "template_im7r0td", // Your EmailJS template ID
//         {
//           username: username,
//           phone_number: phoneNumber,
//           massage_type: selectedType,
//           massage_title: selectedMassage?.title,
//           gender: gender, // ✅ Include Gender
//         },
//         "3BSh4FwmsTyP7ihVo" // Your EmailJS public key
//       )
//       .then(
//         (response) => {
//           console.log("Email sent successfully", response);
//           toast.success("Message sent successfully!", {
//             position: "top-center",
//           });

//           // ✅ Reset form fields and close modal
//           setUsername("");
//           setPhoneNumber("");
//           setSelectedType("");
//           setGender(""); // ✅ Reset Gender
//           setShowModal(false);
//         },
//         (err) => {
//           console.error("Failed to send email:", err);
//           toast.error("Failed to send message. Please try again.", {
//             position: "top-center",
//           });
//         }
//       );
//   };

//   return (
//     <div className="bg-[#F9F7F2] ">
// <div className="bg-[#F9F7F2] relative mt-4">
//       {/* ✅ Confetti Effect (Now Above Popup) */}
//       {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}

//       {/* ✅ Image Section */}
//       <motion.div
//         className="w-full h-60 md:h-80 lg:h-96"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//       >
//         <motion.img
//           className="w-full h-full object-cover"
//           src="https://media.istockphoto.com/id/1325095289/photo/still-life-closeup-of-a-tranquil-spa-arrangement.jpg?s=612x612&w=0&k=20&c=yrNXIAA1mSSzypzbKMTl4807nRG4S8rs5RsWb-J0M9U="
//           alt="Spa Arrangement"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1.2, ease: "easeOut" }}
//         />
//       </motion.div>

//       {/* ✅ Header Section */}
//       <header className="text-center py-16 bg-[#F9F7F2] text-[#3E2D2C]">
//         <motion.div
//           className="px-6 max-w-4xl mx-auto"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: "easeOut" }}
//         >
//           <motion.h2
//             className="text-xl lg:text-2xl font-semibold text-[#5C3B44]"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//           >
//             Experience Tiara Spa Near You
//           </motion.h2>
//           <motion.p
//             className="mt-3 text-[#3E2D2C] leading-relaxed"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.8 }}
//           >
//             The daily grind of work and personal life takes a toll on your body and mind.
//             A regular spa helps you unwind, relax, and re-energize. Choose from our signature,
//             home-crafted massages & therapies or opt for the classic Deep Tissue Massage,
//             Swedish Massage, Ayurvedic Massages, or the Thai Massage.
//           </motion.p>
//           <motion.p
//             className="mt-3 text-[#3E2D2C] leading-relaxed"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//           >
//             Tiara Spa therapies will help keep your body running smoothly, so you can
//             conquer that half marathon or power through a full day of meetings.
//           </motion.p>
//         </motion.div>
//       </header>
//     </div>

//       <section className="container mx-auto py-10 px-4">
//         <h2 className="text-2xl font-semibold text-[#3E2D2C] mb-6 text-center">
//           Our Premium Massage Services
//         </h2>
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {massageTypes.map((type, index) => (
//             <div
//               key={index}
//               className="cursor-pointer border rounded-lg p-4 bg-[#F9F7F2] shadow-md hover:shadow-lg transition duration-300"
//               onClick={() => openModal(type)}
//             >
//               <img
//                 src={type.image}
//                 alt={type.title}
//                 className="w-full h-48 object-cover rounded-md"
//               />
//               <h3 className="text-xl font-semibold text-[#5C3B44] mt-4">
//                 {type.title}
//               </h3>
//               <p className="text-[#3E2D2C]">{type.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Modal */}
//       {showModal && (
//         <div
//           className="fixed inset-0 flex justify-center items-center bg-[#5C3B44] bg-opacity-50 transition-opacity duration-500"
//           onClick={closeModal}
//         >
//           <div
//             className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-500 ease-in-out"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h3 className="text-2xl font-semibold text-[#5C3B44] mb-4">
//               {selectedMassage?.title}
//             </h3>
//             <p className="text-[#3E2D2C] mb-6">{selectedMassage?.desc}</p>

//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 placeholder="name"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
//               />
//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
//               />
//               <select
//                 value={selectedType}
//                 onChange={(e) => setSelectedType(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
//               >
//                 <option value="">Select Massage Type</option>
//                 <option value="Aromatherapy">Aromatherapy</option>
//                 <option value="Swedish Massage">Swedish Massage</option>
//                 <option value="Deep Tissue Massage">Deep Tissue Massage</option>
//                 <option value="Thai Massage">Thai Massage</option>
//                 <option value="Breast Massage">Breast Massage</option>
//                 <option value="Booty Sculpting">Booty Sculpting</option>
//               </select>

//               {/* ✅ Gender Selection */}
//               <select
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>

//               <button
//                 type="submit"
//                 className="w-full bg-[#5C3B44] text-[#F9F7F2] py-3 rounded-lg hover:bg-[#3E2D2C] transition duration-300"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default Home;
// import React, { useState, useEffect } from "react";
// import emailjs from "emailjs-com"; // Import emailjs library
// import { ToastContainer, toast } from "react-toastify";
// import { motion } from "framer-motion";
// import Confetti from "react-confetti";

// const massageTypes = [
//   {
//     title: "Aromatherapy",
//     image:
//       "https://secretoasisspa.co.uk/wp-content/uploads/2023/10/secret-oasis-spa-aromatherapy-massage_safety.jpg",
//     desc: "Relax and rejuvenate.",
//   },
//   {
//     title: "Swedish Massage",
//     image:
//       "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRlZXAlMjB0aXNzdSUyMG1hc3NhZ2V8ZW58MHx8MHx8fDA%3D",
//     desc: "Gentle and relaxing.",
//   },
//   {
//     title: "Deep Tissue Massage",
//     image:
//       "https://media.istockphoto.com/id/531237109/photo/medical-massage-closeup.webp?a=1&b=1&s=612x612&w=0&k=20&c=uev3naRzPw-5tdJSh6ipJsd8tB4AU3MmNzbQCOJT34I=",
//     desc: "For sore muscles.",
//   },
//   {
//     title: "Thai Massage",
//     image:
//       "https://plus.unsplash.com/premium_photo-1661682650688-8baab88b32ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8VGhhaSUyMG1hc3NhZ2V8ZW58MHx8MHx8fDA%3D",
//     desc: "Stretch and release tension.",
//   },
//   {
//     title: "jet Leg Therapy",
//     image:
//       "https://tattvaspa.com/wp-content/uploads/2023/04/JET-LAG-THERAPY-MASSAGE.webp",
//     desc: "For stiffness Release",
//   },
//   {
//     title: "Tiara Signature Massage",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC97LN7h6iZya5qWIb0rv4BfUCpNB8iI-YzA&s",
//     desc: "Get fit and sculpted booties.",
//   },
// ];

// const Home = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedMassage, setSelectedMassage] = useState(null);
//   const [username, setUsername] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedType, setSelectedType] = useState("");
//   const [gender, setGender] = useState(""); // ✅ Add Gender State
//   // const [showWelcomePopup, setShowWelcomePopup] = useState(true);
//   const [showConfetti, setShowConfetti] = useState(true);
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     };

//     window.addEventListener("resize", handleResize);

//     // Stop confetti after 5 seconds automatically
//     setTimeout(() => setShowConfetti(false), 5000);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // const closeWelcomePopup = () => {
//   //   setShowWelcomePopup(false);
//   //   setShowConfetti(false);
//   // };

//   const openModal = (massage) => {
//     setSelectedMassage(massage);
//     setShowModal(true);
//   };

//   const closeModal = (e) => {
//     if (e.target === e.currentTarget) {
//       setShowModal(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!gender) {
//       toast.error("Please select a gender.", { position: "top-center" });
//       return;
//     }

//     const message = `Hello, I would like to book a massage:
//     - Name: ${username}
//     - Phone: ${phoneNumber}
//     - Massage Type: ${selectedType}
//     - Massage Title: ${selectedMassage?.title}
//     - Gender: ${gender}`;

//     // ✅ Send to WhatsApp
//     const whatsappNumber = "916363595881"; // Replace with your WhatsApp number
//     const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
//       message
//     )}`;
//     window.open(whatsappURL, "_blank");

//     // ✅ Send email using EmailJS
//     emailjs
//       .send(
//         "service_5lggkcv", // Your EmailJS service ID
//         "template_im7r0td", // Your EmailJS template ID
//         {
//           username: username,
//           phone_number: phoneNumber,
//           massage_type: selectedType,
//           massage_title: selectedMassage?.title,
//           gender: gender, // ✅ Include Gender
//         },
//         "3BSh4FwmsTyP7ihVo" // Your EmailJS public key
//       )
//       .then(
//         (response) => {
//           console.log("Email sent successfully", response);
//           toast.success("Message sent successfully!", {
//             position: "top-center",
//           });

//           // ✅ Reset form fields and close modal
//           setUsername("");
//           setPhoneNumber("");
//           setSelectedType("");
//           setGender(""); // ✅ Reset Gender
//           setShowModal(false);
//         },
//         (err) => {
//           console.error("Failed to send email:", err);
//           toast.error("Failed to send message. Please try again.", {
//             position: "top-center",
//           });
//         }
//       );
//   };

//   return (
//     <div className="bg-[#F9F7F2] ">
//       <div className="bg-[#F9F7F2] relative mt-4">
//         {/* ✅ Confetti Effect (Now Above Popup) */}
//         {showConfetti && (
//           <Confetti width={windowSize.width} height={windowSize.height} />
//         )}

//         {/* ✅ Image Section */}
//         <motion.div
//           className="w-full h-60 md:h-80 lg:h-96"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1, ease: "easeOut" }}
//         >
//           <motion.img
//             className="w-full h-full object-cover"
//             src="https://media.istockphoto.com/id/1325095289/photo/still-life-closeup-of-a-tranquil-spa-arrangement.jpg?s=612x612&w=0&k=20&c=yrNXIAA1mSSzypzbKMTl4807nRG4S8rs5RsWb-J0M9U="
//             alt="Spa Arrangement"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//           />
//         </motion.div>

//         {/* ✅ Header Section */}
//         <header className="text-center py-16 bg-[#F9F7F2] text-[#3E2D2C]">
//           <motion.div
//             className="px-6 max-w-4xl mx-auto"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//           >
//             <motion.h2
//               className="text-xl lg:text-2xl font-semibold text-[#5C3B44]"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.8 }}
//             >
//               Experience Tiara Spa Near You
//             </motion.h2>
//             <motion.p
//               className="mt-3 text-[#3E2D2C] leading-relaxed"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.8 }}
//             >
//               The daily grind of work and personal life takes a toll on your
//               body and mind. A regular spa helps you unwind, relax, and
//               re-energize. Choose from our signature, home-crafted massages &
//               therapies or opt for the classic Deep Tissue Massage, Swedish
//               Massage, Ayurvedic Massages, or the Thai Massage.
//             </motion.p>
//             <motion.p
//               className="mt-3 text-[#3E2D2C] leading-relaxed"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6, duration: 0.8 }}
//             >
//               Tiara Spa therapies will help keep your body running smoothly, so
//               you can conquer that half marathon or power through a full day of
//               meetings.
//             </motion.p>
//           </motion.div>
//         </header>
//       </div>

//       <section className="container mx-auto py-10 px-4">
//         <h2 className="text-2xl font-semibold text-[#3E2D2C] mb-6 text-center">
//           Our Premium Massage Services
//         </h2>
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {massageTypes.map((type, index) => (
//             <div
//               key={index}
//               className="cursor-pointer border rounded-lg p-4 bg-[#F9F7F2] shadow-md hover:shadow-lg transition duration-300"
//               onClick={() => openModal(type)}
//             >
//               <img
//                 src={type.image}
//                 alt={type.title}
//                 className="w-full h-48 object-cover rounded-md"
//               />
//               <h3 className="text-xl font-semibold text-[#5C3B44] mt-4">
//                 {type.title}
//               </h3>
//               <p className="text-[#3E2D2C]">{type.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Modal */}
//       {showModal && (
//         <div
//           className="fixed inset-0 flex justify-center items-center bg-[#5C3B44] bg-opacity-50 transition-opacity duration-500"
//           onClick={closeModal}
//         >
//           <div
//             className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-500 ease-in-out"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <h3 className="text-2xl font-semibold text-[#5C3B44] mb-4">
//               {selectedMassage?.title}
//             </h3>
//             <p className="text-[#3E2D2C] mb-6">{selectedMassage?.desc}</p>

//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 placeholder="name"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
//               />
//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
//               />
//               <select
//                 value={selectedType}
//                 onChange={(e) => setSelectedType(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
//               >
//                 <option value="">Select Massage Type</option>
//                 <option value="Aromatherapy">Aromatherapy</option>
//                 <option value="Swedish Massage">Swedish Massage</option>
//                 <option value="Deep Tissue Massage">Deep Tissue Massage</option>
//                 <option value="Thai Massage">Thai Massage</option>
//                 <option value="Breast Massage">Breast Massage</option>
//                 <option value="Booty Sculpting">Booty Sculpting</option>
//               </select>

//               {/* ✅ Gender Selection */}
//               <select
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>

//               <button
//                 type="submit"
//                 className="w-full bg-[#5C3B44] text-[#F9F7F2] py-3 rounded-lg hover:bg-[#3E2D2C] transition duration-300"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
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

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMassage, setSelectedMassage] = useState(null);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [gender, setGender] = useState("");
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // ✅ Coupon popup states
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponName, setCouponName] = useState("");
  const [couponPhone, setCouponPhone] = useState("");
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    setTimeout(() => setShowConfetti(false), 5000);

    // ✅ Auto-show coupon modal after 5 seconds
    const timer = setTimeout(() => {
      setShowCouponModal(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

    const whatsappNumber = "916363595881";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");

    emailjs
      .send(
        "service_5lggkcv",
        "template_im7r0td",
        {
          username: username,
          phone_number: phoneNumber,
          massage_type: selectedType,
          massage_title: selectedMassage?.title,
          gender: gender,
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
        () => {
          toast.error("Failed to send message. Please try again.", {
            position: "top-center",
          });
        }
      );
  };

  // ✅ Handle coupon submit
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

    const message = `Hi, I am ${couponName}.\nMy phone: ${couponPhone}\nI got a coupon code: ${code} for 20% OFF on my massage booking.`;

    const whatsappNumber = "916363595881";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");

    toast.success("Coupon generated and sent to WhatsApp!", {
      position: "top-center",
    });
  };

  return (
    <div className="bg-[#F9F7F2]">
      <div className="bg-[#F9F7F2] relative mt-4">
        {showConfetti && (
          <Confetti width={windowSize.width} height={windowSize.height} />
        )}

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

        <header className="text-center py-16">
          <h2 className="text-xl lg:text-2xl font-semibold text-[#5C3B44]">
            Experience Tiara Spa Near You
          </h2>
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
              className="cursor-pointer border rounded-lg p-4 shadow-md hover:shadow-lg"
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
              <p>{type.desc}</p>
            </div>
          ))}
        </div>

        {/* ✅ Manual coupon button */}
        <div className="text-center mt-8">
          <button
            onClick={() => setShowCouponModal(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            🎁 Get 20% OFF Coupon
          </button>
        </div>
      </section>
      {/* Booking Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold mb-4">
              {selectedMassage?.title}
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
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
      {/* ✅ Coupon Modal */}
      {showCouponModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn"
          onClick={() => setShowCouponModal(false)}
        >
          <div
            className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-2xl max-w-md w-full relative animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
              onClick={() => setShowCouponModal(false)}
            >
              ✕
            </button>

            {/* Heading */}
            <h3 className="text-3xl font-bold mb-2 text-center text-green-700">
              🎁 Get 20% OFF
            </h3>
            <p className="text-center text-gray-600 mb-6">
              Enter your details to receive your exclusive coupon code.
            </p>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleCouponSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={couponName}
                onChange={(e) => setCouponName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={couponPhone}
                onChange={(e) => setCouponPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
              />

              {couponCode && (
                <p className="text-green-600 font-bold bg-green-50 p-2 rounded-lg text-center">
                  Your Coupon Code: {couponCode}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 shadow-lg transform hover:scale-[1.02] transition"
              >
                📲 Send to WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleUp {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        .animate-scaleUp {
          animation: scaleUp 0.3s ease forwards;
        }
      `}</style>
      <ToastContainer />
    </div>
  );
};

export default Home;

