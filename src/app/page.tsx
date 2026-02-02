"use client";

import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";

export default function HomePage() {
  return (
    <>
      <Header />

      {/* =========================
          HERO SECTION
      ========================= */}
      <div className="home-hero">
        <h2 className="hero-title">
          Aspiring Full-Stack Developer building modern web experiences
        </h2>

        <div className="hero-actions">
          <a
            href="/resumes/general-resume.pdf"
            download
            className="btn"
          >
            Download Resume
          </a>

          <a href="/contact" className="btn outline">
            Contact Me
          </a>
        </div>
      </div>

      <div className="home">
        <SectionCard
          title="Data Science"
          video="/videos/ds.mp4"
        />

        <SectionCard
          title="Web Development"
          video="/videos/web.mp4"
        />

        <SectionCard
          title="Full Stack Development"
          video="/videos/fullstack.mp4"
        />

        <SectionCard title="Loading" />
      </div>
    </>
  );
}
