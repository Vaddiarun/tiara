import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HiringPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    image: null,
  });

  const [imageUrl, setImageUrl] = useState("");

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file upload to Cloudinary
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "tiaraspa"); // Change this
    formData.append("cloud_name", "dfxkazmkc"); // Change this
  
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dfxkazmkc/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await response.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed.");
      }
  };
  

  // Send to WhatsApp
  const sendToWhatsApp = () => {
    const { name, age, gender, phone } = formData;
    if (!name || !age || !gender || !phone) {
      toast.error("Please fill out all fields before sending.");
      return;
    }

    const message = `Hello, I am ${name}, Age: ${age}, Gender: ${gender}, Phone: ${phone}. ${
      imageUrl ? "Here is my photo: " + imageUrl : ""
    }`;

    const whatsappUrl = `https://wa.me/916363595881?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F7F2] p-6">
        <h1 className="text-3xl font-bold text-[#3E2D2C] mb-4"> We Are Hiring</h1>
  
        <div className=" shadow-lg rounded-lg p-6 w-full max-w-md">
          <label className="block text-[#3E2D2C] font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-[#D1BEB0] rounded mt-1 text-[#3E2D2C] focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
            placeholder="Enter your name"
          />
  
          <label className="block text-[#3E2D2C] font-medium mt-3">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border border-[#D1BEB0] rounded mt-1 text-[#3E2D2C] focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
            placeholder="Enter your age"
          />
  
          <label className="block text-[#3E2D2C] font-medium mt-3">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-[#D1BEB0] rounded mt-1 text-[#3E2D2C] focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
          >
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
  
          <label className="block text-[#3E2D2C] font-medium mt-3">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-[#D1BEB0] rounded mt-1 text-[#3E2D2C] focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
            placeholder="Enter your phone number"
          />
  
          <label className="block text-[#3E2D2C] font-medium mt-3">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-[#D1BEB0] rounded mt-1 text-[#3E2D2C] focus:outline-none focus:ring-2 focus:ring-[#5C3B44]"
          />
  
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded" className="mt-3 rounded-lg shadow-md" />
          )}
  
          <button
            onClick={sendToWhatsApp}
            className="w-full mt-4 bg-[#5C3B44] text-white p-2 rounded-lg hover:bg-[#3E2D2C] transition duration-300"
          >
            Send to WhatsApp
          </button>
        </div>
  
        <ToastContainer />
      </div>
  );
};

export default HiringPage;
