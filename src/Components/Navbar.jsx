import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-container") && !e.target.closest(".menu-btn")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClose = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="bg-[#F9F7F2] text-[#3E2D2C] p-4 shadow-lg fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <img className="w-[60px]" src="https://res.cloudinary.com/dfxkazmkc/image/upload/e_auto_contrast/v1741424757/DALL_E_2025-03-08_14.33.48_-_A_sophisticated_and_elegant_logo_design_for_Tiara_Spa_featuring_a_graceful_lotus_flower_with_delicate_lines._The_design_should_have_a_luxurious_and_aik5nl.webp" alt="Logo"/>
          </Link>
          <h1 className="text-2xl font-extrabold text-[#5C3B44]">Tiara Spa</h1>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-8 text-lg font-semibold">
            <li><Link to="/" className="text-[#5C3B44] hover:text-[#A0A051]">Home</Link></li>
            <li><Link to="/about" className="text-[#5C3B44] hover:text-[#A0A051]">About</Link></li>
            <li><Link to="/contact" className="text-[#5C3B44] hover:text-[#A0A051]">Contact</Link></li>
            <li><Link to="/hiring" className="text-[#5C3B44] hover:text-[#A0A051]">Hiring</Link></li>
            <li><Link to="/course" className="text-[#5C3B44] hover:text-[#A0A051]">Course</Link></li>
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden menu-btn focus:outline-none relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-8 h-0.5 bg-[#5C3B44] mb-2 transition-transform duration-300"></motion.div>
            <motion.div animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-8 h-0.5 bg-[#5C3B44] mb-2 transition-opacity duration-300"></motion.div>
            <motion.div animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-8 h-0.5 bg-[#5C3B44] transition-transform duration-300"></motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.ul
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { type: "spring", stiffness: 80 } }}
              exit={{ x: "-100%", opacity: 0, transition: { duration: 0.3 } }}
              className="menu-container lg:hidden absolute left-0 top-0 backdrop-blur-xl bg-[#F9F7F2]/90 w-3/4 h-screen p-10 flex flex-col items-center text-center shadow-2xl z-50 rounded-r-xl"
            >
            {['Home', 'About', 'Contact', 'Hiring'].map((item, index) => (
  <li key={index} className="my-4 w-full">
    <Link
      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
      className="text-xl font-semibold text-[#5C3B44] relative group transition duration-300 ease-in-out"
      onClick={handleMenuClose}
    >
      {item}
      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#A0A051] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  </li>
))}

            </motion.ul>
          )}
        </AnimatePresence>
      </nav>

      {/* Padding to Prevent Overlapping */}
      <div className="pt-20 lg:pt-24"></div>

      {/* Overlay for Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black z-40"
            onClick={handleMenuClose}
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
