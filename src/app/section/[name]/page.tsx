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
        title: "Clinical Data Forensics & Pattern Detection",
        description: "A multimodal data ingestion and forensic mapping pipeline designed to process unstructured clinical reports and extract deep-learning diagnostic anomalies.",
        details: "Developed an intelligent clinical data forensics pipeline that ingests multimodal patient reports (such as CT Chest radiology files) and corresponding physical scan parameters (slice thickness, exposure mAs, KVP, and Hounsfield Unit density values). Features dynamic ICD-10 medical diagnostics categorization, few-shot prototype similarity matching, vector embeddings parsing, and forensic anomaly scoring to identify irregular clinical patterns.",
        tech: ["Next.js", "Python FastAPI", "Deep Learning", "Vector Embeddings", "Few-Shot Classification", "Hounsfield Unit Analytics"],
        image: "/projects/clinical-forensics.png",
        github: "https://github.com/SoHaM-250143/clinical-data-forensics-system",
      },
      {
        title: "Disney+ OTT Platform Dashboard",
        description: "An interactive Power BI dashboard analyzing Disney+ platform metrics including titles, viewer ratings, release timelines, and geographical show distributions.",
        details: "Developed a comprehensive business intelligence dashboard to visualize content distribution on Disney+. Integrated metric cards tracking 1,450 total titles across 329 genres, 610 directors, and release timelines from 1928 to 2021. Designed dynamic donut charts for TV Show vs. Movie content distribution (72.5% Movies), horizontal bar charts for ratings distribution (TV-G, TV-PG) and top genres, timeline trend visuals, and geospatial maps mapping total shows by country.",
        tech: ["Power BI", "Data Visualization", "DAX Formulas", "ETL Processing", "Data Modeling", "Excel"],
        image: "/projects/ott-dashboard.png",
        github: "https://github.com/SoHaM-250143/OTT-Platform-Dashboard",
      },
      {
        title: "Tableau Social Media Analytics Dashboard",
        description: "An interactive Tableau dashboard that tracks cross-platform user engagement across Facebook, Instagram, LinkedIn, TikTok, and Twitter.",
        details: "Designed and developed a comprehensive Tableau dashboard to analyze social media performance indicators across 15,000 total posts. Created custom KPI cards tracking 37.9M Likes, 1.5M Comments, and 3.7M Shares. Features a comparative double-bar engagement metric chart by platform, a line graph highlighting engagement timelines (2023-2025), a platform post-count pie chart, and a top-10 performing post heat-map matrix to track viral content characteristics.",
        tech: ["Tableau", "Data Analysis", "KPI Reporting", "Interactive Dashboarding", "Data Extraction", "CSV Parsing"],
        image: "/projects/social-media-dashboard.png",
        github: "https://github.com/SoHaM-250143/Social-Media-Analysis-Dashboard",
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
        title: "Advanced Power BI: Expert Data Analysis and Visualization",
        issuer: "Udemy",
        year: "2026",
        link: "/certificates/advanced-powerbi-cert.pdf",
      },
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
