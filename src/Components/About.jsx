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


import React from "react";

const About = () => {
  const testimonials = [
    {
      name: "Lucky",
      review:
        "Absolutely amazing service! The therapist was professional and very skilled. Highly recommend!",
      rating: 5,
    },
    {
      name: "Yasmeen",
      review:
        "Convenient, relaxing, and worth every penny. Will definitely book again!",
      rating: 4,
    },
    {
      name: "Bhanu",
      review:
        "Loved the experience! Perfect for unwinding after a long day. Excellent service.",
      rating: 5,
    },
  ];

  const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-[#A0A051] ${index < count ? "" : "opacity-30"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-[#F9F7F2] py-16 px-6 text-[#3E2D2C]">
      {/* About Us Section */}
      <h2 className="text-3xl font-semibold text-[#5C3B44] text-center mb-6">
        About Us
      </h2>
      <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
        For the past <span className="font-bold">4 years</span>, we have served
        over <span className="font-bold">3 lakh happy customers</span> with
        professional massage services at their doorstep. Our skilled therapists
        ensure relaxation and rejuvenation in the comfort of your home.
      </p>
      <p className="text-lg leading-relaxed text-center mt-4 max-w-3xl mx-auto">
        Our mission is to provide top-notch wellness services conveniently and
        professionally, ensuring you always feel your best.
      </p>

      {/* Experience Section */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold text-[#5C3B44] mb-4">
          Experience Tiara Spa Near You
        </h3>
        <p className="text-lg leading-relaxed max-w-4xl mx-auto">
          The daily grind of work and personal life takes a toll on your body
          and mind. A regular spa helps you unwind, relax, and re-energize.
          Choose from our signature, home-crafted massages & therapies or opt
          for the classic Deep Tissue Massage, Swedish Massage, Ayurvedic
          Massages, or the Thai Massage.
        </p>
        <p className="text-lg leading-relaxed mt-3 max-w-4xl mx-auto">
          Tiara Spa therapies will help keep your body running smoothly, so you
          can conquer that half marathon or power through a full day of
          meetings.
        </p>
      </div>

      {/* Problem Solving Section */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold text-[#5C3B44] mb-4">
          We Solve Your Problems
        </h3>
        <p className="text-lg leading-relaxed max-w-4xl mx-auto">
          At our massage service, we understand the unique challenges many of
          our clients face. Whether it's the pain from sore muscles, the need
          for firmer skin, or body relaxation, we are here to help you feel
          more confident and stress-free:
        </p>
        <ul className="list-disc pl-6 mt-4 max-w-4xl mx-auto text-lg">
          <li>
            <strong>Muscle Pain Relief:</strong> Our therapeutic massages help
            relieve muscle tension and pain, ensuring a soothing experience for
            both body and mind.
          </li>
          <li>
            <strong>Jet Lag Recovery:</strong> Our Jet Lag Therapy Massage is
            designed to relax your body after long travel and ensure you feel
            refreshed.
          </li>
          <li>
            <strong>Deep Relaxation:</strong> Our premium therapies focus on
            stress relief, better sleep, and an overall rejuvenating
            experience.
          </li>
          <li>
            <strong>Extra Services for Happiness:</strong> We offer various
            additional services, including aromatherapy, deep tissue massage,
            and other wellness treatments to make your experience even more
            luxurious.
          </li>
        </ul>
      </div>

      {/* Testimonials Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-[#5C3B44] text-center mb-6">
          What Our Customers Say
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all hover:scale-105 transform duration-300"
            >
              <p className="font-medium mb-2">"{testimonial.review}"</p>
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold">{testimonial.name}</span>
                <div className="text-[#A0A051]">{renderStars(testimonial.rating)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prebook & Request Callback Buttons */}
      <div className="mt-12 flex justify-center gap-4">
        <button className="bg-[#5C3B44] text-[#F9F7F2] px-6 py-3 rounded-lg font-semibold hover:bg-[#3E2D2C] transition duration-300">
          PREBOOK AND SAVE
        </button>
        <button className="bg-[#5C3B44] text-[#F9F7F2] px-6 py-3 rounded-lg font-semibold hover:bg-[#3E2D2C] transition duration-300">
          REQUEST CALLBACK
        </button>
      </div>
    </div>
  );
};

export default About;
