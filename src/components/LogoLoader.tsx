"use client";

import { useState, useEffect } from "react";

export const LogoSVG = ({ className, size = 32 }: { className?: string; size?: number }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: `${size}px`, height: `${size}px` }}
  >
    {/* Gaming Shield / Crest Outline */}
    <polygon
      className="logo-shield"
      points="50,5 92,25 92,65 50,95 8,65 8,25"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Sharp, aggressive interlocking gaming 'S' slashes */}
    <path
      className="logo-path-1"
      d="M75 22 L25 35 L48 50 L15 62 L50 82"
      stroke="currentColor"
      strokeWidth="9"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
    <path
      className="logo-path-2"
      d="M25 78 L75 65 L52 50 L85 38 L50 18"
      stroke="currentColor"
      strokeWidth="9"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

export default function LogoLoader() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(true);

  useEffect(() => {
    // Initial loading sequence
    const timer1 = setTimeout(() => {
      setLoading(false); // Trigger fade out animation
    }, 2000);

    const timer2 = setTimeout(() => {
      setActive(false); // Remove overlay from DOM
    }, 2500);

    // Listen for custom trigger-logo-reload-anim event
    const handleReloadTrigger = () => {
      setActive(true);
      setLoading(true);

      // Redirect to the homepage root after outro animation completes
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    };

    window.addEventListener("trigger-logo-reload-anim", handleReloadTrigger);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("trigger-logo-reload-anim", handleReloadTrigger);
    };
  }, []);

  if (!active) return null;

  return (
    <div className={`logo-loader-overlay ${loading ? "loading" : "fade-out"}`}>
      <div className="loader-logo-container">
        <LogoSVG size={120} className="loader-logo" />
      </div>
    </div>
  );
}
