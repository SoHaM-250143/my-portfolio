"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="header">
      {/* LEFT: LOGO + NAME */}
      <div className="header-left">
        <img
          src="/logo.png"
          alt="Portfolio Logo"
          className="logo"
          onClick={() => router.push("/")}
        />
        <h1 className="name">Soham Mhatre</h1>
      </div>

      {/* RIGHT: SOCIALS + RESUME */}
      <div className="header-right">
        {/* GitHub */}
        <a
          href="https://github.com/SoHaM-250143"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <img
            src="/icons/github.svg"
            alt="GitHub"
            className="social-icon"
          />
        </a>

        {/* LinkedIn */}
        <a
          href="www.linkedin.com/in/253019-soham-mhatre"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <img
            src="/icons/linkedin.svg"
            alt="LinkedIn"
            className="social-icon"
          />
        </a>

        {/* Download Resume */}
        <a
          href="/resumes/my_resume.pdf"
          download
          className="resume-btn"
        >
          Download Resume
        </a>
      </div>
    </header>
  );
}
