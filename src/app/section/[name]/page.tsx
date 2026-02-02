"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";

export default function SectionPage() {
  const params = useParams();
  const sectionName = decodeURIComponent(params.name as string);

  const [showDetails, setShowDetails] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showCerts, setShowCerts] = useState(false);


  /* =========================
     DETAILS
  ========================= */
  const detailsMap: Record<string, string> = {
    "Data Science":
      "Worked on data analysis, data preprocessing, visualization, and learning machine learning fundamentals using Python.",
    "Web Development":
      "Built responsive and interactive web interfaces using HTML, CSS, JavaScript, React, and modern UI principles.",
    "Full Stack Development":
      "Developed complete applications integrating frontend and backend with focus on scalability.",
  };

  /* =========================
     PROJECTS
  ========================= */
  const projectsMap: Record<
    string,
    {
      title: string;
      description: string;
      image: string;
      github: string;
      demo?: string;
    }[]
  > = {
    "Data Science": [
      {
        title: "Sales Data Analysis",
        description:
          "Analyzed sales data using Python, pandas, and visualizations to uncover trends.",
        image: "/projects/sales-analysis.png",
        github: "https://github.com/YOUR_USERNAME/sales-data-analysis",
      },
    ],
    "Web Development": [
      {
        title: "Netflix Style Portfolio",
        description:
          "Developed a cinematic portfolio using Next.js and animations.",
        image: "/projects/portfolio.png",
        github: "https://github.com/YOUR_USERNAME/netflix-style-portfolio",
      },
    ],
    "Full Stack Development": [
      {
        title: "Student Result Management System",
        description:
          "Built a full-stack student result system with database integration.",
        image: "/projects/student-result.png",
        github: "https://github.com/YOUR_USERNAME/student-result-system",
      },
    ],
  };

  /* =========================
     CERTIFICATIONS
  ========================= */
  const certificationsMap: Record<
    string,
    {
      title: string;
      issuer: string;
      year: string;
      link?: string;
    }[]
  > = {
    "Data Science": [
      {
        title: "Data Science with Python",
        issuer: "Coursera",
        year: "2024",
        link: "/certificates/data-science-cert.pdf",
      },
    ],
    "Web Development": [
      {
        title: "Frontend Web Development",
        issuer: "Udemy",
        year: "2023",
        link: "/certificates/web-development-cert.pdf",
      },
    ],
    "Full Stack Development": [
      {
        title: "Full Stack Development",
        issuer: "Internshala",
        year: "2024",
        link: "/certificates/full-stack-cert.pdf",
      },
    ],
  };

  return (
    <>
      <Header />

      <motion.div
        className="section-page"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>{sectionName}</h1>

        {/* =========================
           BUTTONS
        ========================= */}
        <div className="section-buttons">

          <button
            className="btn outline"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>

          <button
            className="btn outline"
            onClick={() => setShowProjects(!showProjects)}
          >
            {showProjects ? "Hide Projects" : "Show Projects"}
          </button>

          <button
            className="btn outline"
            onClick={() => setShowCerts(!showCerts)}
          >
            {showCerts ? "Hide Certifications" : "Certifications"}
          </button>
        </div>

        {/* DETAILS */}
        {showDetails && (
          <motion.div className="section-details">
            <p>{detailsMap[sectionName]}</p>
          </motion.div>
        )}

        {/* PROJECTS */}
        {showProjects && (
          <motion.div className="section-details">
            {projectsMap[sectionName]?.map((project, i) => (
              <div key={i} className="project-card">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a
                    href={project.github}
                    target="_blank"
                    className="btn outline"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* CERTIFICATIONS */}
        {showCerts && (
          <motion.div className="section-details">
            {certificationsMap[sectionName]?.map((cert, i) => (
              <div key={i} className="cert-card">
                <h3>{cert.title}</h3>
                <p>
                  {cert.issuer} • {cert.year}
                </p>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    className="btn outline"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
