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
      "Specialized in Python Machine Learning, deep learning pipelines, and predictive model engineering. Experienced in designing advanced diagnostic anomaly systems using vector embeddings and few-shot classification, as well as supervised regression models (Random Forests, Decision Trees) in Scikit-Learn. Capable of building scalable datasets pipelines, optimizing hyperparameter bounds, and visualizing feature importance metrics.",
    "Web Development":
      "Experienced in building cinematic, highly interactive web applications using Next.js, React, and Vanilla CSS. Focused on clean semantic HTML5 structures, responsive grid architectures, dynamic state customizer menus, and advanced UI effects like canvas cursor smoke trails. Dedicated to implementing smooth navigation interfaces, page-route structures, and interactive frontend dashboards.",
    "Full Stack Development":
      "Capable of architecting end-to-end full-stack applications by integrating responsive React.js frontends with scalable Node.js/Express.js backends. Experienced in structuring database schemas using MongoDB, securing API endpoints with JSON Web Tokens (JWT), and designing user role access dashboards. Focused on building clean modular components, structured folder hierarchies, and robust CRUD data-management operations.",
    "Data Analysis":
      "Specialized in transforming unstructured datasets into interactive business intelligence dashboards using Power BI and Tableau. Experienced in developing DAX formulas, modeling relational schemas, and cleaning raw CSV data. Capable of building multimodal forensics pipelines tracking density metrics (Hounsfield Units), geospatial distributions, and engagement analytics to drive data-driven decision making.",
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
        title: "Student Performance Prediction",
        description: "Developed a supervised machine learning regression model to predict student academic outcomes based on demographic and study habits.",
        details: "Conducted data preprocessing, feature encoding, and correlation analysis on student performance datasets. Trained multiple regression algorithms (Linear Regression, Decision Trees, and Random Forests) using Scikit-Learn. Optimized hyperparameters to achieve 92% prediction accuracy and created feature importance plots to identify key predictors of academic success.",
        tech: ["Python", "Machine Learning", "Scikit-Learn", "Regression", "Feature Engineering", "Pandas"],
        image: "/projects/student-prediction.png",
        github: "https://github.com/SoHaM-250143/Student-Performance-Prediction",
      },
      {
        title: "CliniFlow AI: Rare Disease Detection System",
        description: "An AI-powered clinical analytics and anomaly detection system for parsing medical reports and identifying rare disease patterns.",
        details: "Developed CliniFlow AI, a multimodal diagnostic pipeline that ingests unstructured clinical reports and processes scan metadata. Integrated automated ICD-10 disease categorization, few-shot prototype similarity matching, and a dynamic doctor-facing web dashboard featuring weekly report trends, disease distribution charts, and real-time AI anomaly predictions.",
        tech: ["Next.js", "Python FastAPI", "Deep Learning", "Vector Embeddings", "Few-Shot Classification", "Data Visualization"],
        image: "/projects/cliniflow.png",
        github: "https://github.com/SoHaM-250143/CliniFlo-AI-Rare-Diesease-Detection-System-",
      },
    ],
    "Web Development": [
      {
        title: "My Portfolio",
        description: "Developed a cinematic portfolio using Next.js and animations.",
        details: "Created a highly responsive portfolio mirroring Netflix's sleek dark theme and layout. Integrated standard video previews on hover, smooth layout transitions, custom canvas cursor smoke trails, and a contact form submission integration.",
        tech: ["Next.js", "React", "Framer Motion", "CSS Variables"],
        image: "/projects/portfolio.png",
        github: "https://github.com/SoHaM-250143/my-portfolio",
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
        title: "Python Machine Learning: From Beginner to Pro",
        issuer: "Udemy",
        year: "2026",
        link: "/certificates/python-machine-learning-cert.pdf",
      },
    ],
    "Web Development": [
      {
        title: "Next.js: Build Dynamic, Fast & Scalable Web Applications",
        issuer: "Udemy",
        year: "2026",
        link: "/certificates/nextjs-cert.pdf",
      },
    ],
    "Full Stack Development": [
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
    ],
    "Data Analysis": [
      {
        title: "Advanced Power BI: Expert Data Analysis and Visualization",
        issuer: "Udemy",
        year: "2026",
        link: "/certificates/advanced-powerbi-cert.pdf",
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
