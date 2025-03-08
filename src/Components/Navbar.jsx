import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      {/* Navbar */}
      <nav className="bg-[#F9F7F2] text-[#3E2D2C] p-4 shadow-lg fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img className="w-[60px]" src="https://res.cloudinary.com/dfxkazmkc/image/upload/e_auto_contrast/v1741424757/DALL_E_2025-03-08_14.33.48_-_A_sophisticated_and_elegant_logo_design_for_Tiara_Spa_featuring_a_graceful_lotus_flower_with_delicate_lines._The_design_should_have_a_luxurious_and_aik5nl.webp" alt="Logo"/>
          </Link>
          <h1 className="text-2xl font-extrabold text-[#5C3B44]">Tiara  Spa</h1>

          {/* Mobile Menu Button */}
          <button className="lg:hidden menu-btn focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className={`block w-8 h-0.5 bg-[#5C3B44] mb-2 transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-8 h-0.5 bg-[#5C3B44] mb-2 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
            <span className={`block w-8 h-0.5 bg-[#5C3B44] transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>

          {/* Navigation Links */}
          <ul className={`menu-container lg:flex lg:space-x-6 items-center font-semibold transform transition-transform duration-500 ${isMenuOpen ? "absolute left-0 top-0 bg-[#F9F7F2] w-2/3 h-screen p-8 flex flex-col items-start z-50 ease-in-out" : "hidden lg:flex"}`}>
            <li className="my-4 lg:my-0">
              <Link to="/" className="hover:text-[#A0A051] transition duration-300 ease-in-out" onClick={handleMenuClose}>Home</Link>
            </li>
            <li className="my-4 lg:my-0">
              <Link to="/about" className="hover:text-[#A0A051] transition duration-300 ease-in-out" onClick={handleMenuClose}>About</Link>
            </li>
            <li className="my-4 lg:my-0">
              <Link to="/contact" className="hover:text-[#A0A051] transition duration-300 ease-in-out" onClick={handleMenuClose}>Contact</Link>
            </li>
            <li className="my-4 lg:my-0">
              <Link to="/hiring" className="hover:text-[#A0A051] transition duration-300 ease-in-out" onClick={handleMenuClose}>Hiring</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Add Padding to Prevent Overlapping Content */}
      <div className="pt-20 lg:pt-24"></div>

      {/* Overlay Effect */}
      {isMenuOpen && <div className="lg:hidden fixed inset-0 bg-black opacity-50 transition-opacity duration-300 z-40" onClick={handleMenuClose}></div>}
    </>
  );
};

export default Navbar;
