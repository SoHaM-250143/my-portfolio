"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeSettings from "./ThemeSettings";
import { LogoSVG } from "./LogoLoader";
import Magnetic from "./Magnetic";
import TextScramble from "./TextScramble";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrambleKey, setScrambleKey] = useState(0);

  const isMainPage = pathname === "/";
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero-landing-section");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "hero-landing-section", label: "Home", icon: "🏠" },
    { id: "about-section", label: "About", icon: "👤" },
    { id: "education-section", label: "Education", icon: "🎓" },
    { id: "skills-section", label: "Skills", icon: "💻" },
    { id: "certifications-section", label: "Certifications", icon: "📜" },
    { id: "contact-section", label: "Contact", icon: "📬" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Keep header visible at the very top of the page
      if (currentScrollY <= 80) {
        setScrollDirection("up");
        setLastScrollY(currentScrollY);
      } else {
        if (currentScrollY > lastScrollY) {
          setScrollDirection("down");
        } else {
          setScrollDirection("up");
        }
        setLastScrollY(currentScrollY);
      }

      // Track active section on scroll if on home page
      if (isMainPage) {
        const scrollPosition = window.scrollY + 220;
        for (let i = navItems.length - 1; i >= 0; i--) {
          const section = document.getElementById(navItems[i].id);
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMainPage]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (pathname !== "/") {
      router.push(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className={`header ${scrollDirection === "down" ? "header-hidden" : ""}`}>
      {/* LEFT: LOGO + NAME (SHIFTED LEFT) */}
      <div className="header-left">
        <div 
          className="header-brand" 
          onClick={() => {
            window.dispatchEvent(new Event("trigger-logo-reload-anim"));
            setScrambleKey(prev => prev + 1);
          }}
          style={{ cursor: "pointer" }}
        >
          <LogoSVG className="header-logo" />
          <h1 className="name-centered">
            {isMainPage ? (
              <TextScramble key={scrambleKey} text="Soham Mhatre" delay={2.5} />
            ) : (
              "Soham Mhatre"
            )}
          </h1>
        </div>
      </div>

      {/* RIGHT: NAVIGATION LINKS + DOWNLOAD RESUME + SETTINGS + HAMBURGER */}
      <div className="header-right">
        {/* Desktop Section Navigation Links */}
        <nav className="header-nav desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`header-nav-link ${activeSection === item.id ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Download Resume */}
        <Magnetic>
          <a href="/Soham_Mhatre_2026.pdf" download="Soham_Mhatre_2026.pdf" className="contact-btn">
            <span className="desktop-resume">Download Resume</span>
            <span className="mobile-resume">Resume</span>
          </a>
        </Magnetic>

        {/* Theme Settings Button (Right Top Beside Download Resume) */}
        <ThemeSettings />

        {/* Phone View: Three-Lines Hamburger Button */}
        <button
          className="mobile-hamburger-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger-bar ${isMobileMenuOpen ? "open" : ""}`} />
          <span className={`hamburger-bar ${isMobileMenuOpen ? "open" : ""}`} />
          <span className={`hamburger-bar ${isMobileMenuOpen ? "open" : ""}`} />
        </button>
      </div>

      {/* Mobile Nav Dropdown Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-dropdown">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`mobile-nav-item ${activeSection === item.id ? "active" : ""}`}
            >
              <span className="mobile-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

