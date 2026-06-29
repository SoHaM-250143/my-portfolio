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
  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    description: string;
    details?: string;
    tech?: string[];
    image: string;
    github: string;
  } | null>(null);


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
    "Data Analysis":
      "Specialized in transforming raw datasets into actionable insights using SQL databases, statistical tools, Excel, and interactive dashboards like Power BI/Tableau.",
  };

  /* =========================
     PROJECTS
  ========================= */
  const projectsMap: Record<
    string,
    {
      title: string;
      description: string;
      details?: string;
      tech?: string[];
      image: string;
      github: string;
    }[]
  > = {
    "Data Science": [
      {
        title: "Sales Data Analysis",
        description: "Analyzed sales data using Python, pandas, and visualizations to uncover trends.",
        details: "A comprehensive data analysis workflow utilizing Python's powerful libraries. Performed extensive data cleaning, handled missing values, and constructed descriptive statistical visualizations (using Matplotlib and Seaborn) to highlight customer behavior, peak sales periods, and profitable item categories.",
        tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter"],
        image: "/projects/sales-analysis.png",
        github: "https://github.com/SoHaM-250143/Sales-Data-Analysis",
      },
    ],
    "Web Development": [
      {
        title: "Netflix Style Portfolio",
        description: "Developed a cinematic portfolio using Next.js and animations.",
        details: "Created a highly responsive portfolio mirroring Netflix's sleek dark theme and layout. Integrated standard video previews on hover, smooth layout transitions, custom canvas cursor smoke trails, and a contact form submission integration.",
        tech: ["Next.js", "React", "Framer Motion", "CSS Variables"],
        image: "/projects/portfolio.png",
        github: "https://github.com/SoHaM-250143/netflix-style-portfolio",
      },
    ],
    "Full Stack Development": [
      {
        title: "Student Result Management System",
        description: "Built a full-stack student result system with database integration.",
        details: "Developed a secure student result repository allowing teachers to input academic performance and students to retrieve report cards dynamically. Secured with JWT user authentication, MongoDB schemas, and a responsive frontend dashboard.",
        tech: ["React.js", "Node.js", "Express.js", "MongoDB", "CSS Modules"],
        image: "/projects/student-result.png",
        github: "https://github.com/SoHaM-250143/Student-Result-Management-System",
      },
    ],
    "Data Analysis": [
      {
        title: "Sales Performance Analysis",
        description: "Analyzed retail sales trends and customer behavior using Python, Pandas, and interactive dashboards.",
        details: "Conducted exploratory data analysis (EDA) on transactional datasets to find key sales drivers, seasonal purchasing patterns, and customer segment profitability. Cleaned unstructured data, performed feature engineering, and designed visual charts to translate complex data into business decisions.",
        tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "Jupyter Notebook"],
        image: "/projects/sales-analysis.png",
        github: "https://github.com/SoHaM-250143/Sales-Data-Analysis",
      },
      {
        title: "SQL Customer Insights & Cohort Analysis",
        description: "Identified customer retention trends and purchasing cohorts using PostgreSQL queries.",
        details: "Created advanced SQL queries (CTEs, Window Functions, Joins) to track user retention metrics, churn rates, and lifetime value (LTV). Designed cohort tables to analyze repeat purchase behavior, helping segment high-value customers for targeted campaigns.",
        tech: ["PostgreSQL", "SQL Server", "Database Design", "Data Modeling"],
        image: "/projects/student-prediction.png",
        github: "https://github.com/SoHaM-250143",
      }
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
    "Data Analysis": [
      {
        title: "Data Science with Python",
        issuer: "Coursera",
        year: "2024",
        link: "/certificates/data-science-cert.pdf",
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
              <div
                key={i}
                className="project-card"
                onClick={() => setSelectedProject(project)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <button className="btn outline" style={{ pointerEvents: "none" }}>
                    View Details
                  </button>
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

      {/* PROJECT LIGHTBOX MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <motion.div 
            className="project-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedProject(null)}>&times;</button>
            <img 
              src={selectedProject.image} 
              alt={selectedProject.title} 
              className="project-modal-image"
            />
            <div className="project-modal-content">
              <h2>{selectedProject.title}</h2>
              <div className="tech-tags">
                {selectedProject.tech?.map((t, idx) => (
                  <span key={idx} className="tech-tag">{t}</span>
                ))}
              </div>
              <p className="project-modal-description">
                {selectedProject.details || selectedProject.description}
              </p>
              <div className="project-modal-actions">
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn"
                >
                  View GitHub Code
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
