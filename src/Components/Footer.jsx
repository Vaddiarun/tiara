import React from "react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f9f5f0] text-[#5b3430] py-6 text-center border-t border-[#d8cfcf]">
      <p className="text-lg font-semibold">© 2025 Tiara Spa Reserved.</p>

      <div className="mt-4 flex flex-col items-center">
        <p className="font-medium">Contact us:</p>

        <div className="flex flex-col space-y-2 mt-2">
          <a
            href="tel:+916363595881"
            className="text-[#5b3430] hover:underline flex items-center"
          >
            <span className="mr-2">📞</span> Call: +91 6363595881
          </a>

          <a
            href="https://wa.me/916363595881"
            className="text-[#5b3430] hover:underline flex items-center"
          >
            <FaWhatsapp className="mr-2 text-xl" /> WhatsApp: +91 6363595881
          </a>
        </div>

        <div className="mt-4 flex space-x-6">
          <a
            href="https://www.instagram.com/tiara_doorstep_massage_/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5b3430] text-2xl hover:text-pink-500"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5b3430] text-2xl hover:text-blue-500"
          >
            <FaFacebook />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
