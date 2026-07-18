"use client";

// Twinkling starfield background animation for deep space theme
import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  driftDuration: number;
}

export default function TwinklingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate stars on mount to prevent SSR mismatch
    const generatedStars: Star[] = Array.from({ length: 60 }).map((_, i) => {
      const size = Math.random() * 1.8 + 0.8;
      const speedFactor = size / 2.6; // larger stars drift slightly faster for 3D parallax depth
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 5,
        driftX: (Math.random() * 20 + 15) * speedFactor * (Math.random() > 0.5 ? 1 : -1),
        driftY: (Math.random() * 20 + 15) * speedFactor * (Math.random() > 0.5 ? 1 : -1),
        driftDuration: Math.random() * 60 + 90, // very slow drift cycle: 90s to 150s
      };
    });
    setStars(generatedStars);
  }, []);

  return (
    <div className="starfield-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            background: star.id % 3 === 0 ? "var(--accent-color)" : "#ffffff",
            boxShadow: star.id % 3 === 0 
              ? "0 0 6px var(--accent-color)" 
              : "0 0 4px rgba(255, 255, 255, 0.8)",
            animation: `starTwinkle ${star.duration}s ease-in-out infinite alternate, starDrift ${star.driftDuration}s ease-in-out infinite alternate`,
            animationDelay: `${star.delay}s`,
            opacity: 0,
            "--drift-x": `${star.driftX}px`,
            "--drift-y": `${star.driftY}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
