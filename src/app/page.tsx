"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";
import GithubGrid from "@/components/GithubGrid";
import ViewCounter from "@/components/ViewCounter";
import Magnetic from "@/components/Magnetic";
import FadeInSection from "@/components/FadeInSection";

export default function HomePage() {
  const [activeEduIndex, setActiveEduIndex] = useState(0);

  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/SoHaM-250143",
      icon: "/icons/github.svg",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/253019-soham-mhatre/",
      icon: "/icons/linkedin.svg",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/_.sohammm.__?igsh=czhyZHUwY3RmcnV4",
      icon: "/icons/instagram.svg",
    },
    {
      name: "Trailhead",
      url: "https://www.salesforce.com/trailblazer/m7395cvox5qpayygtw",
      icon: "/icons/trailhead.svg",
    },
  ];

  const educationData = [
    {
      degree: "Master of Computer Application (MCA)",
      institution: "PES Modern College of Engineering, Pune",
      year: "2024 – 2026",
      details: "Pursuing advanced software architecture, database management, computer networks, and cloud infrastructure. Building real-world applications and exploring data analysis and machine learning.",
      icon: "🎓"
    },
    {
      degree: "Bachelors of Computer Application (BCA)",
      institution: "Chhatrapati Shivaji Maharaj University, Navi Mumbai",
      year: "2021 – 2024",
      details: "Completed foundational studies in computer science, core programming (Java, C++), database systems, and full-stack web development basics.",
      icon: "💻"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Sarvajanik Vidyamandir and Jr College Pen",
      year: "2021",
      details: "Completed high school with a focus on science stream (Mathematics, Physics, Chemistry), building strong logical foundations and scientific reasoning.",
      icon: "🏫"
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "PSMS English Medium School Pen",
      year: "2019",
      details: "Graduated with secondary school education, establishing general science, mathematics, language, and initial computing skills.",
      icon: "📖"
    }
  ];

  return (
    <>
      <Header />

      {/* HERO LANDING SECTION (CENTERED IN MIDDLE OF PAGE) */}
      <FadeInSection className="hero-landing-section" id="hero-landing-section" delay={0.1}>
        <div className="about-hero-intro">
          <span className="about-greeting-badge">👋 Welcome to my Portfolio</span>
          <h1 className="about-hero-name">
            Hello! Myself <span className="highlight-name">Soham Ramesh Mhatre</span>
          </h1>
          <p className="about-hero-sub">
            AI Researcher & Full-Stack Developer driven by data intelligence, clean architecture, and modern web innovation.
          </p>
        </div>

        <div 
          className="hero-scroll-indicator"
          onClick={() => {
            const aboutSec = document.getElementById("about-section");
            if (aboutSec) aboutSec.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span>↓ Scroll down to explore</span>
        </div>
      </FadeInSection>

      {/* ABOUT ME SECTION (SEEN AFTER SCROLLING) */}
      <FadeInSection className="about-section" id="about-section">
        <h2 className="about-title">👤 About Me</h2>
        <div className="about-container">
          {/* Left: Dynamic Theme-Filtered Profile Photo */}
          <div className="about-photo-wrapper">
            <img 
              src="/images/soham.png" 
              alt="Soham Ramesh Mhatre" 
              className="about-photo"
            />
            <div className="about-photo-overlay" />
          </div>

          {/* Right: Paragraph */}
          <div className="about-text">
            <p>
              I am a Master of Computer Application (MCA) graduate from PES Modern College of Engineering, Pune, with a deep passion for Artificial Intelligence, Machine Learning, and Full-Stack Engineering.
            </p>
            <p>
              Throughout my journey, I have engineered complex, research-driven projects leveraging cutting-edge AI models, predictive analytics, and data intelligence.
            </p>
            <p>
              My expertise spans building end-to-end intelligent systems, training data models, and designing sleek, high-performance web applications. I excel at tackling tough computational challenges and translating intricate AI research concepts into functional, real-world software solutions.
            </p>
            <p>
              With a strong background in computer science fundamentals, database engineering, and scalable architecture, I strive for technical excellence in every product. Driven by curiosity and innovation, I continuously explore emerging AI technologies to build groundbreaking digital platforms.
            </p>
            <p>
              Beyond coding and AI model development, I am passionate about crafting intuitive digital experiences, optimizing algorithm performance, and collaborating on high-impact tech solutions that make a real-world difference.
            </p>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="education-section" id="education-section">
        <h2 className="education-title">🎓 Education</h2>
        <div className="timeline-container">
          {/* Navigation panel */}
          <div className="timeline-nav">
            {educationData.map((edu, idx) => (
              <div
                key={idx}
                className={`timeline-item ${activeEduIndex === idx ? "active" : ""}`}
                onClick={() => setActiveEduIndex(idx)}
              >
                <span className="timeline-year-left">{edu.year}</span>
                <div className="timeline-content">
                  <h3>{edu.degree}</h3>
                  <p>{edu.institution}</p>
                  <div className="timeline-mobile-details">
                    <p>{edu.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive display panel (Desktop only) */}
          <div className="timeline-display">
            <div className="timeline-display-icon">
              {educationData[activeEduIndex].icon}
            </div>
            <h3>{educationData[activeEduIndex].degree}</h3>
            <div className="timeline-display-inst">
              {educationData[activeEduIndex].institution}
            </div>
            <div className="timeline-display-year">
              {educationData[activeEduIndex].year}
            </div>
            <p className="timeline-display-details">
              {educationData[activeEduIndex].details}
            </p>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="skills-section" id="skills-section">
        <h2 className="skills-title">💻 Skills</h2>
        <div className="home">
        <SectionCard
          title="Data Science"
          video="/ds.mp4"
        />

        <SectionCard
          title="Web Development"
          video="/web.mp4"
        />

        <SectionCard
          title="Full Stack Development"
          video="/fullstack.mp4"
        />

        <SectionCard
          title="Data Analysis"
        />

        <SectionCard title="Loading" />
        </div>
      </FadeInSection>

      <FadeInSection className="github-section">
        <h2 className="github-title">🐙 GitHub Activity</h2>
        <div className="github-content">
          {/* Left Column: Achievements */}
          <div className="github-achievements">
            <h3>Badges & Milestones</h3>
            <div className="achievements-grid">
              <div className="achievement-badge">
                <div className="badge-icon">🦈</div>
                <div className="badge-info">
                  <h4>Pull Shark</h4>
                  <p>Opened pull requests that were successfully merged</p>
                </div>
              </div>
              <div className="achievement-badge">
                <div className="badge-icon">🏹</div>
                <div className="badge-info">
                  <h4>Quickdraw</h4>
                  <p>Resolved issues or pull requests in record time</p>
                </div>
              </div>
              <div className="achievement-badge">
                <div className="badge-icon">🛸</div>
                <div className="badge-info">
                  <h4>Yolo</h4>
                  <p>Directly merged code updates for fast iterations</p>
                </div>
              </div>
              <div className="achievement-badge">
                <div className="badge-icon">❄️</div>
                <div className="badge-info">
                  <h4>Arctic Code Vault</h4>
                  <p>Contributed to code in the GitHub Archive program</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contributions */}
          <div className="github-contributions">
            <h3>Last 30 days Contributions</h3>
            <div className="contributions-card">
              <GithubGrid />
              <p className="contributions-footer">
                Live contribution feed powered by GitHub Activity tracker (last 30 days).
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="certifications-section" id="certifications-section">
        <h2 className="certifications-title">📜 Certifications</h2>
        <div className="certifications-list">
          {[
            {
              title: "Advanced Power BI: Expert Data Analysis and Visualization",
              issuer: "Udemy",
              year: "2026",
              link: "/certificates/advanced-powerbi-cert.pdf",
            },
            {
              title: "Python Machine Learning: From Beginner to Pro",
              issuer: "Udemy",
              year: "2026",
              link: "/certificates/python-machine-learning-cert.pdf",
            },
            {
              title: "Next.js: Build Dynamic, Fast & Scalable Web Applications",
              issuer: "Udemy",
              year: "2026",
              link: "/certificates/nextjs-cert.pdf",
            },
            {
              title: "Master Node.js: From Beginner to Full-Stack Developer",
              issuer: "Udemy",
              year: "2026",
              link: "/certificates/nodejs-cert.pdf",
            },
            {
              title: "Django Masterclass: Get Started With Django Web Development",
              issuer: "Udemy",
              year: "2026",
              link: "/certificates/django-cert.pdf",
            },
          ].map((cert, i) => (
            <div key={i} className="cert-card">
              <div className="cert-info">
                <h3>{cert.title}</h3>
                <p className="cert-issuer">
                  {cert.issuer} • {cert.year}
                </p>
              </div>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn outline"
                >
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection className="contact-section" id="contact-section">
        <h2 className="contact-title">📬 Contact Me</h2>
        <form
          className="contact-form"
          action="https://formsubmit.co/mhatresoham2501@gmail.com"
          method="POST"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_next"
            value="https://netflix-portfolio-one.vercel.app/"
          />

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
          ></textarea>

          <Magnetic style={{ width: "100%", display: "block" }}>
            <button type="submit" className="btn" style={{ width: "100%" }}>
              Send Message
            </button>
          </Magnetic>
        </form>
      </FadeInSection>

      <footer className="footer-section">
        <p className="footer-credit" suppressHydrationWarning>© {new Date().getFullYear()} Soham Mhatre. All rights reserved.</p>
        
        {/* Social Icons for Mobile */}
        <div className="footer-social-links">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              title={social.name}
            >
              <span
                className="footer-social-icon"
                style={{
                  WebkitMaskImage: `url(${social.icon})`,
                  maskImage: `url(${social.icon})`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain"
                }}
              />
            </a>
          ))}
        </div>

        {/* Email Link for Mobile */}
        <div className="footer-email">
          <a href="mailto:work.sohamm@gmail.com" className="footer-email-link">
            work.sohamm@gmail.com
          </a>
        </div>

        <div className="footer-views">
          <ViewCounter />
        </div>
      </footer>
    </>
  );
}
