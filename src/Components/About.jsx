// import React from "react";

// const About = () => {
//   const testimonials = [
//     {
//       name: "lucky",
//       review:
//         "Absolutely amazing service! The therapist was professional and very skilled. Highly recommend!",
//       rating: 5,
//     },
//     {
//       name: "yasmeen",
//       review:
//         "Convenient, relaxing, and worth every penny. Will definitely book again!",
//       rating: 4,
//     },
//     {
//       name: "bhanu",
//       review:
//         "Loved the experience! Perfect for unwinding after a long day. Excellent service.",
//       rating: 5,
//     },
//   ];

//   const renderStars = (count) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <span
//         key={index}
//         className={`text-yellow-500 ${index < count ? "" : "opacity-30"}`}
//       >
//         ★
//       </span>
//     ));
//   };

//   return (
//     <div className="container mx-auto py-16 px-4 bg-[#f2f2f2] ">
//       {/* About Us Section */}
//       <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center mt-8">
//         About Us
//       </h2>
//       <p className="text-gray-600 text-lg leading-relaxed">
//         For the past <span className="font-bold">4 years</span>, we have served
//         over <span className="font-bold">3 lakh happy customers</span> with
//         professional massage services at their doorstep. Our skilled therapists
//         ensure relaxation and rejuvenation in the comfort of your home.
//       </p>
//       <p className="text-gray-600 text-lg leading-relaxed mt-4">
//         Our mission is to provide top-notch wellness services conveniently and
//         professionally, ensuring you always feel your best.
//       </p>

//       {/* Additional Content - Problem Solving Section */}
//       <div className="mt-12">
//         <h3 className="text-2xl font-semibold text-gray-700 text-center mb-6">
//           We Solve Your Problems
//         </h3>
//         <div className="text-gray-600 text-lg leading-relaxed">
//           At our massage service, we understand the unique challenges many of
//           our clients face. Whether it's the pain from sore muscles, the need
//           for firmer breasts, or enhancing your body’s curves, we are here to
//           help you feel more confident and relaxed:
//         </div>
//         <ul className="list-disc pl-6 mt-4">
//           <li>
//             <strong>Muscle Pain Relief:</strong> Our therapeutic massages help
//             relieve muscle tension and pain, ensuring a soothing experience for
//             both body and mind.
//           </li>
//           <li>
//             <strong>Sagging Breasts:</strong> We offer specialized breast
//             massages that help improve firmness and enhance the overall look and
//             feel, giving you the confidence you deserve.
//           </li>
//           <li>
//             <strong>Booty Sculpting:</strong> Our booty sculpting treatments
//             focus on toning and firming the glutes, giving you a lifted and
//             contoured appearance that boosts your confidence.
//           </li>
//           <li>
//             <strong>Extra Services for Happiness:</strong> We offer various
//             additional services to ensure you leave feeling rejuvenated and
//             satisfied, including aromatherapy, deep tissue massage, and other
//             wellness treatments to make your experience even more luxurious.
//           </li>
//         </ul>
//       </div>

//       {/* Testimonials Section */}
//       <div className="mt-12">
//         <h3 className="text-2xl font-semibold text-gray-700 text-center mb-6">
//           What Our Customers Say
//         </h3>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={index}
//               className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all hover:scale-105 transform duration-300"
//             >
//               <p className="text-gray-700 font-medium mb-2">
//                 "{testimonial.review}"
//               </p>
//               <div className="flex items-center justify-between mt-4">
//                 <span className="text-gray-600 font-bold">
//                   {testimonial.name}
//                 </span>
//                 <div className="text-yellow-500">
//                   {renderStars(testimonial.rating)}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;
import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, Typography, IconButton } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";

const About = () => {
  const testimonials = [
    { name: "Kunal", review: "Absolutely amazing service! The therapist was professional and very skilled. Highly recommend!", rating: 5 },
    { name: "Gautam", review: "Convenient, relaxing, and worth every penny. Will definitely book again!", rating: 4 },
    { name: "Deepthi", review: "Loved the experience! Perfect for unwinding after a long day. Excellent service.", rating: 5 },
    { name: "Vamsi", review: "The service exceeded my expectations. The atmosphere was calm, and the therapist was highly skilled.", rating: 5 },
    { name: "Anusha", review: "Great experience! The staff was friendly and professional. Would definitely recommend to friends.", rating: 4 },
  ];

  const renderStars = (count) => (
    Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-[#A0A051] ${index < count ? "" : "opacity-30"}`}>★</span>
    ))
  );

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#F9F7F2] py-16 px-6 text-[#3E2D2C]">
      {/* About Us Section */}
      <h2 className="text-3xl font-semibold text-[#5C3B44] text-center mb-6">About Us</h2>
      <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
        For the past <span className="font-bold">4 years</span>, we have served over 
        <span className="font-bold"> 3 lakh happy customers</span> with professional massage services at their doorstep. 
        Our skilled therapists ensure relaxation and rejuvenation in the comfort of your home.
      </p>

      {/* Testimonials Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-[#5C3B44] text-center mb-6">What Our Customers Say</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all hover:scale-105 transform duration-300">
              <p className="font-medium mb-2">"{testimonial.review}"</p>
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold">{testimonial.name}</span>
                <div className="text-[#A0A051]">{renderStars(testimonial.rating)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons & Popup */}
      <div className="mt-12 flex justify-center gap-4">
        <Button
          variant="contained"
          sx={{
            bgcolor: "#5C3B44",
            color: "#F9F7F2",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px 20px",
            "&:hover": { bgcolor: "#3E2D2C" },
          }}
          onClick={() => setOpen(true)}
        >
          PREBOOK AND SAVE
        </Button>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#5C3B44",
            color: "#F9F7F2",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px 20px",
            "&:hover": { bgcolor: "#3E2D2C" },
          }}
          onClick={() => setOpen(true)}
        >
          REQUEST CALLBACK
        </Button>
      </div>

      {/* Enhanced Popup Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "16px",
            padding: "20px",
            maxWidth: "400px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#5C3B44", textAlign: "center" }}>
          Contact Us
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#5C3B44",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center" }}>
          <PhoneIcon sx={{ fontSize: 50, color: "#5C3B44", marginBottom: "10px" }} />
          <Typography variant="h6" sx={{ color: "#3E2D2C", fontWeight: "bold" }}>
            Call Now:
          </Typography>
          <Typography variant="h5" sx={{ color: "#5C3B44", fontWeight: "bold", marginTop: "5px" }}>
            <a href="tel:6363595881" style={{ textDecoration: "none", color: "#5C3B44" }}>
            6363595881
            </a>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default About;
