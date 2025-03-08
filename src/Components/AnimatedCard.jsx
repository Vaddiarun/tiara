import React from "react";

const AnimatedCard = ({ title, image, desc }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">{desc}</p>
      </div>
    </div>
  );
};

export default AnimatedCard;
