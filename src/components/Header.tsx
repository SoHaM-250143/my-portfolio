"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <header className="header">
      {/* LEFT SIDE: LOGO + NAME */}
      <div className="header-left">
        <img
          src="/logo.png"
          alt="Soham Mhatre Portfolio Logo"
          className="logo"
          role="button"
          tabIndex={0}
          onClick={goHome}
          onKeyDown={(e) => {
            if (e.key === "Enter") goHome();
          }}
        />
        <h1 className="name">Soham Mhatre</h1>
      </div>

      {/* RIGHT SIDE: SOCIAL LINKS */}
      <div className="header-right">
        <a
          href="https://github.com/SoHaM-250143"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          🐙
        </a>

        <a
          href="https://www.linkedin.com/in/253019-soham-mhatre"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          💼
        </a>

        <a
         href="/contact"
         className="contact-btn"
          aria-label="Contact"
        >
          Contact
        </a>

      </div>
    </header>
  );
}
