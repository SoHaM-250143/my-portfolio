"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
}

export default function Magnetic({ children, className, style }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Enable magnetic effect only on screens wider than 768px with a hoverable pointer
    const checkDevice = () => {
      const isDesktop = window.innerWidth > 768;
      const hasHover = window.matchMedia("(hover: hover)").matches;
      setEnabled(isDesktop && hasHover);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // If mouse is within 70px of the element center, magnetize it
      if (distance < 70) {
        setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    const element = ref.current;
    if (element) {
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (element) {
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [enabled]);

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={enabled ? { x: position.x, y: position.y } : { x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: "inline-block", ...style }}
    >
      {children}
    </motion.div>
  );
}
