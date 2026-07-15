"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeSettings from "./ThemeSettings";
import { LogoSVG } from "./LogoLoader";
import Magnetic from "./Magnetic";
import TextScramble from "./TextScramble";

export default function Header() {
  const router = useRouter();
  const [scrambleKey, setScrambleKey] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Keep header visible at the very top of the page
      if (currentScrollY <= 80) {
        setScrollDirection("up");
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${scrollDirection === "down" ? "header-hidden" : ""}`}>
      {/* LEFT: SETTINGS BUTTON (LOGO REMOVED) */}
      <div className="header-left">
        <ThemeSettings />
      </div>

      {/* MIDDLE: LOGO + NAME */}
      <div 
        className="header-middle" 
        onClick={() => {
          window.dispatchEvent(new Event("trigger-logo-reload-anim"));
          setScrambleKey(prev => prev + 1);
        }}
        style={{ cursor: "pointer" }}
      >
        <LogoSVG className="header-logo" />
        <h1 className="name-centered">
          <TextScramble key={scrambleKey} text="Soham Mhatre" />
        </h1>
      </div>

      {/* RIGHT: DOWNLOAD RESUME */}
      <div className="header-right">
        {/* Download Resume */}
        <Magnetic>
          <a href="/Soham_Mhatre_2026.pdf" download="Soham_Mhatre_2026.pdf" className="contact-btn">
            Download Resume
          </a>
        </Magnetic>
      </div>
    </header>
  );
}

