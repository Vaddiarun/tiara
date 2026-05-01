import React from "react";

const APPLY_URL = `https://wa.me/916363595881?text=${encodeURIComponent(
  "Hi Tiara! I want to apply for the Training Program."
)}`;
const ASK_URL = `https://wa.me/916363595881?text=${encodeURIComponent(
  "Hi Tiara! I have a question about the Training Program."
)}`;

const FEATURES = [
  "5 focused sessions covering core techniques",
  "Certificate awarded on successful completion",
  "Pre-placement consideration at Tiara Spa",
  "Located in Bangalore · HSR Layout",
];

const Check = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Training = () => {
  return (
    <section className="training reveal">
      <div className="container-x">
        <div className="training-grid">
          <div>
            <span className="section-eyebrow" style={{ color: "var(--sand)" }}>
              Tiara Academy
            </span>
            <h2>
              Tiara <span className="ital">Training</span> Program
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.78)", maxWidth: 540 }}>
              Learn industry-standard techniques in 5 focused sessions. Earn a
              certificate and get considered for pre-placement at Tiara — a
              practical pathway into doorstep wellness.
            </p>

            <ul className="training-feats">
              {FEATURES.map((f) => (
                <li key={f}>
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn-sand">
                Apply Now
              </a>
              <a href={ASK_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Ask a Question
              </a>
            </div>
          </div>

          <div className="training-card">
            <span className="limited-pulse">
              <span className="dot" /> Limited Seats
            </span>
            <div className="price">
              ₹2,000<small>total fee</small>
            </div>
            <div className="meta">
              <div><span>Sessions</span><span>5</span></div>
              <div><span>Certificate</span><span>Yes</span></div>
              <div><span>Pre-placement</span><span>Considered</span></div>
              <div><span>Location</span><span>HSR Layout</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Training;
