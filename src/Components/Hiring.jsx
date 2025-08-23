import React, { useState, useEffect } from "react";

const HiringPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    image: null,
  });

  const [imageUrl, setImageUrl] = useState("");
  const [showMalePopup, setShowMalePopup] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form whenever data changes
  useEffect(() => {
    const { name, age, gender, phone } = formData;
    setIsFormValid(
      name.trim() !== "" &&
      age.trim() !== "" &&
      gender.trim() !== "" &&
      phone.trim() !== "" &&
      imageUrl !== ""
    );
  }, [formData, imageUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "gender" && value === "Male") {
      setShowMalePopup(true);
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "tiaraspa");
    uploadData.append("cloud_name", "dfxkazmkc");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dfxkazmkc/image/upload",
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      alert("Image upload error.");
    }
  };

  const sendToWhatsApp = () => {
    const { name, age, gender, phone } = formData;

    if (!isFormValid) {
      alert("Please fill out all fields before sending.");
      return;
    }

    if (gender === "Male") {
      setShowMalePopup(true);
      return;
    }

    const message = `Hello, I am ${name}, Age: ${age}, Gender: ${gender}, Phone: ${phone}. ${
      imageUrl ? "Here is my photo: " + imageUrl : ""
    }`;

    const whatsappUrl = `https://wa.me/916363595881?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F7F2] p-6">
      <h1 className="text-3xl font-bold text-[#3E2D2C] mb-4">We Are Hiring</h1>

      <div className="shadow-lg rounded-lg p-6 w-full max-w-md bg-white">
        <label className="block text-[#3E2D2C] font-medium">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-[#D1BEB0] rounded mt-1 text-[#3E2D2C]"
          placeholder="Enter your name"
        />

        <label className="block text-[#3E2D2C] font-medium mt-3">Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border border-[#D1BEB0] rounded mt-1 text-[#3E2D2C]"
          placeholder="Enter your age"
        />

        <label className="block text-[#3E2D2C] font-medium mt-3">Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border border-[#D1BEB0] rounded mt-1 text-[#3E2D2C]"
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
          className="w-full p-2 border border-[#D1BEB0] rounded mt-1 text-[#3E2D2C]"
          placeholder="Enter your phone number"
        />

        <label className="block text-[#3E2D2C] font-medium mt-3">
          Upload Image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-[#D1BEB0] rounded mt-1 text-[#3E2D2C]"
        />

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded"
            className="mt-3 rounded-lg shadow-md max-h-40 object-cover"
          />
        )}

        <button
          onClick={sendToWhatsApp}
          disabled={!isFormValid}
          className={`w-full mt-4 p-2 rounded-lg transition duration-300 ${
            isFormValid
              ? "bg-[#5C3B44] text-white hover:bg-[#3E2D2C]"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Send to WhatsApp
        </button>
      </div>

      {showMalePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-[#5C3B44] mb-2">
              Application Notice
            </h2>
            <p className="text-gray-600">
              Sorry, we are currently not accepting applications from male
              candidates.
            </p>
            <button
              onClick={() => setShowMalePopup(false)}
              className="mt-4 px-4 py-2 bg-[#5C3B44] text-white rounded-lg hover:bg-[#3E2D2C] transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HiringPage;
