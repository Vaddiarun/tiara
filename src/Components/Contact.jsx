import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields!", { position: "top-center" });
      return;
    }

    const phoneNumber = "6363595881"; // Replace with your WhatsApp number
    const whatsappMessage = `Hello, I would like to get in touch!\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Show success toast
    toast.success("Redirecting to WhatsApp...", { position: "top-center" });

    // Open WhatsApp chat
    window.open(whatsappURL, "_blank");

    // Clear form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F7F2]">
      <div className=" shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-[#3E2D2C] mb-4">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44] text-[#3E2D2C]"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44] text-[#3E2D2C]"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C3B44] text-[#3E2D2C]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#5C3B44] hover:bg-[#3E2D2C] text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <FaWhatsapp className="mr-2" /> Send to WhatsApp
          </button>
        </form>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl text-pink-500 hover:text-pink-600" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl text-blue-600 hover:text-blue-700" />
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
