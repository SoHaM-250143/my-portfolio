"use client";

import { motion } from "framer-motion";

interface TextScrambleProps {
  text: string;
  delay?: number;
}

export default function TextScramble({ text, delay = 0 }: TextScrambleProps) {
  const characters = text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: { 
      opacity: 0, 
      y: 12,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 12,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: "inline-flex", flexWrap: "wrap", whiteSpace: "pre-wrap" }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
