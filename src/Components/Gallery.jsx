import React from "react";
import { FaInstagram } from "react-icons/fa";

const ITEMS = [
  { src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1000&q=80", caption: "Aromatherapy" },
  { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", caption: "Swedish Massage" },
  { src: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&q=80", caption: "Deep Tissue" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80", caption: "Thai Massage" },
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80", caption: "Tiara Signature" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="section reveal">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="section-eyebrow">Gallery</span>
            <h2 className="section-title">
              Moments of <span className="ital">stillness</span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/tiara_doorstep_massage_/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <FaInstagram /> View on Instagram
          </a>
        </div>

        <div className="gallery-grid">
          {ITEMS.map((item, i) => (
            <figure key={i} className="gallery-item">
              <img src={item.src} alt={item.caption} loading="lazy" />
              <figcaption className="gallery-cap">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
