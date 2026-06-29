"use client";

import Header from "./Header";

export default function UnderUpdation() {
  return (
    <div className="updation-overlay">
      {/* Show only logo + name */}
      <div className="updation-header">
        <Header />
      </div>

      {/* Center message */}
      <div className="updation-center">
        <h1>🚧 Website Under Updation</h1>
        <p>I am currently improving this website.</p>
        <p>Please check back soon.</p>
      </div>
    </div>
  );
}
