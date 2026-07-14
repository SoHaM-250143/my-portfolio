"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SectionCard from "@/components/SectionCard";
import GithubGrid from "@/components/GithubGrid";
import ViewCounter from "@/components/ViewCounter";

export default function HomePage() {
  const [activeEduIndex, setActiveEduIndex] = useState(0);

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

      <section className="education-section">
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
                <h3>{edu.degree}</h3>
                <p>{edu.institution} • {edu.year}</p>
                <div className="timeline-mobile-details">
                  <p>{edu.details}</p>
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
      </section>

      <section className="skills-section">
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
      </section>

      <section className="github-section">
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
      </section>

      <section className="certifications-section">
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
      </section>

      <section className="contact-section">
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

          <button type="submit" className="btn">
            Send Message
          </button>
        </form>
      </section>

      <footer className="footer-section">
        <p className="footer-credit" suppressHydrationWarning>© {new Date().getFullYear()} Soham Mhatre. All rights reserved.</p>
        <div className="footer-views">
          <ViewCounter />
        </div>
      </footer>
    </>
  );
}
