import React, { useEffect, useState } from "react";

/**
 * CoursePage – Tiara Training Program
 * - 5 sessions · ₹2000
 * - Certificate on completion
 * - Pre‑placement opportunity for standout learners
 * - Sends enrollment details to WhatsApp (same number as HiringPage)
 * - Optional photo upload via Cloudinary (same preset/cloud name as provided)
 *
 * TailwindCSS friendly (same palette as your HiringPage)
 */

const WA_NUMBER = "916363595881"; // same as above
const COURSE_SESSIONS = 5;
const COURSE_PRICE = 2000; // ₹

// Reuse your existing Cloudinary config values
const CLOUDINARY_UPLOAD_PRESET = "tiaraspa";
const CLOUDINARY_CLOUD_NAME = "dfxkazmkc";

export default function CoursePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interestedInPrePlacement: true,
    image: null, // optional user photo
  });

  const [imageUrl, setImageUrl] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Basic validators
  const isEmail = (v) => /.+@.+\..+/.test(v.trim());
  const isPhone = (v) => /^\d{10}$/.test(v.trim()); // simple 10‑digit check

  useEffect(() => {
    const { name, email, phone } = formData;
    setIsFormValid(
      name.trim() !== "" &&
      isEmail(email) &&
      isPhone(phone) &&
      imageUrl !== ""
    );
  }, [formData, imageUrl]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    setFormData((s) => ({ ...s, image: file }));

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    uploadData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    try {
      const resp = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: uploadData }
      );
      const data = await resp.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        alert("Image upload failed. Try again.");
      }
    } catch (err) {
      alert("Image upload error.");
    } finally {
      setUploading(false);
    }
  };

  const sendToWhatsApp = () => {
    if (!isFormValid || !imageUrl) {
      alert("Please fill all required fields and upload a photo before sending.");
      return;
    }

    const { name, email, phone, interestedInPrePlacement } = formData;

    const message = [
      `*Course Enrollment – Tiara Training*`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Program: ${COURSE_SESSIONS} sessions (₹${COURSE_PRICE})`,
      `Pre‑placement interest: ${interestedInPrePlacement ? "Yes" : "No"}`,
      imageUrl ? `Photo: ${imageUrl}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Optimistic UI – mark as enrolled to "unlock" certificate preview
    setEnrolled(true);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex flex-col items-center p-6">
      <header className="w-full max-w-5xl flex flex-col items-center text-center mb-6">
        <h1 className="text-3xl font-bold text-[#3E2D2C]">Tiara Training Program</h1>
        <p className="text-[#6B5B57] mt-2">
          Learn with {COURSE_SESSIONS} focused sessions at <span className="font-semibold">₹{COURSE_PRICE}</span>.
          Complete the program to earn a certificate and get considered for a pre‑placement opportunity at Tiara.
        </p>
      </header>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Enrollment Card */}
        <section className="shadow-lg rounded-lg p-6 bg-white">
          <h2 className="text-xl font-bold text-[#3E2D2C] mb-4">Enroll Now</h2>

          <label className="block text-[#3E2D2C] font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-2 border border-[#D1BEB0] rounded mt-1 text-[#3E2D2C]"
            aria-label="Full Name"
            required
          />

          <label className="block text-[#3E2D2C] font-medium mt-3">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full p-2 border border-[#D1BEB0] rounded mt-1 text-[#3E2D2C]"
            aria-label="Email"
            required
          />

          <label className="block text-[#3E2D2C] font-medium mt-3">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            className="w-full p-2 border border-[#D1BEB0] rounded mt-1 text-[#3E2D2C]"
            aria-label="Phone"
            required
          />

          <div className="flex items-center gap-2 mt-4">
            <input
              id="prePlace"
              type="checkbox"
              name="interestedInPrePlacement"
              checked={formData.interestedInPrePlacement}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label htmlFor="prePlace" className="text-[#3E2D2C]">
              I'm interested in pre‑placement consideration at Tiara
            </label>
          </div>

          <label className="block text-[#3E2D2C] font-medium mt-4">Photo (required)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="w-full p-2 border border-[#D1BEB0] rounded mt-1 text-[#3E2D2C]"
            aria-label="Upload photo (required)"
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
            disabled={!isFormValid || uploading}
            className={`w-full mt-4 p-2 rounded-lg transition duration-300 ${
              isFormValid && !uploading
                ? "bg-[#5C3B44] text-white hover:bg-[#3E2D2C]"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            aria-label="Send enrollment to WhatsApp"
            title={
              uploading
                ? "Uploading image…"
                : !isFormValid
                  ? "Enter a valid name, email and phone"
                  : "Send details to WhatsApp"
            }
          >
            {uploading ? "Uploading…" : `Send to WhatsApp (₹${COURSE_PRICE})`}
          </button>

          <p className="text-xs text-[#6B5B57] mt-3">
            * We will confirm your slot and payment instructions over WhatsApp. No online payment on this page.
          </p>
        </section>

        {/* Right: Program + Certificate Preview */}
        <section className="space-y-4">
          {/* Program Highlights */}
          <div className="shadow-lg rounded-lg p-6 bg-white">
            <h3 className="text-lg font-semibold text-[#3E2D2C]">What you get</h3>
            <ul className="mt-3 space-y-2 text-[#3E2D2C]">
              <li>• {COURSE_SESSIONS} live/interactive training sessions</li>
              <li>• Certificate of Completion from Tiara</li>
              <li>• Pre‑placement consideration for top performers</li>
              <li>• Mentor guidance and Q&A support</li>
            </ul>
          </div>

          {/* Certificate Preview with Blur/Unlock */}
          <div className="relative shadow-lg rounded-lg overflow-hidden bg-white">
            <div className="p-5 border-b border-[#F0E7DE]">
              <h3 className="text-lg font-semibold text-[#3E2D2C]">Certificate Preview</h3>
            </div>

            <div className="relative p-6 bg-gradient-to-br from-[#FFF9F2] to-[#F6EFE8]">
              {/* Simple inline certificate mock */}
              <div
                className={`mx-auto w-full max-w-md aspect-[5/3] rounded-xl border border-[#E6D7C9] flex items-center justify-center text-center p-6 filter blur-sm grayscale bg-white shadow-inner`}
              >
                <div>
                  <p className="text-xs tracking-wider text-[#A08F82] uppercase">Certificate of Completion</p>
                  <p className="text-xl font-bold text-[#3E2D2C] mt-1">Tiara Training Program</p>
                  <p className="text-sm text-[#6B5B57] mt-2">
                    Awarded to <span className="font-semibold">{formData.name || "Your Name"}</span>
                  </p>
                  <p className="text-xs text-[#6B5B57] mt-1">
                    For successful completion of {COURSE_SESSIONS} sessions
                  </p>
                </div>
              </div>

              {!enrolled && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/40 text-white px-4 py-2 rounded-full text-sm shadow">
                    🔒 Certificate locked — Step 0/2. Enroll to proceed
                  </div>
                </div>
              )}

              {enrolled && (
                <div className="absolute right-3 top-3 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  Step 1/2 unlocked — complete all sessions to receive your certificate
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <footer className="w-full max-w-5xl text-center mt-8 text-[#6B5B57]">
        By enrolling, you agree to attend all sessions and complete assignments.
        Pre‑placement is merit‑based after training performance.
      </footer>
    </div>
  );
}
