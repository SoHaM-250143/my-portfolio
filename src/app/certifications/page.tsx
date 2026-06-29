"use client";

import Header from "@/components/Header";
import { motion } from "framer-motion";

export default function CertificationsPage() {
  const certifications = [
    {
      title: "Full Stack Development",
      issuer: "Internshala",
      year: "2024",
      link: "/certificates/full-stack-cert.pdf",
    },
    {
      title: "Data Science with Python",
      issuer: "Coursera",
      year: "2024",
      link: "/certificates/data-science-cert.pdf",
    },
    {
      title: "Frontend Web Development",
      issuer: "Udemy",
      year: "2023",
      link: "/certificates/web-development-cert.pdf",
    },
  ];

  return (
    <>
      <Header />

      <motion.div
        className="section-page"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Certifications</h1>

        <div className="section-details" style={{ marginTop: "30px" }}>
          {certifications.map((cert, i) => (
            <div key={i} className="cert-card">
              <div>
                <h3>{cert.title}</h3>
                <p>
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
      </motion.div>
    </>
  );
}
