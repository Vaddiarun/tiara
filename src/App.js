// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Footer from "./Components/Footer";
// import Home from "./Components/Home";
// import About from "./Components/About";
// import Contact from "./Components/Contact";
// import HiringPage from "./Components/Hiring";
// import Course from "./Components/Course";
// import { Analytics } from "@vercel/analytics/react"
// import { SpeedInsights } from "@vercel/speed-insights/react"

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/hiring" element={<HiringPage />} />
//         <Route path="/course" element={<Course />} />

// <SpeedInsights />
//       </Routes>
//       <Footer />
//     </BrowserRouter>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import HiringPage from "./Components/Hiring";
import Course from "./Components/Course";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hiring" element={<HiringPage />} />
        <Route path="/course" element={<Course />} />
      </Routes>
      <Footer />

      {/* These should be outside <Routes>, usually near the bottom */}
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
};

export default App;
