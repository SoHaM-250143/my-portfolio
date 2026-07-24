"use client";

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
  isAccent: boolean;
  isLarge: boolean;
}

interface Planet {
  id: number;
  type: "ringed" | "orb" | "moon";
  x: number;
  y: number;
  size: number;
  driftX: number;
  driftY: number;
  duration: number;
}

interface Asteroid {
  id: number;
  x: number;
  y: number;
  size: number;
  driftX: number;
  driftY: number;
  duration: number;
  rotateDuration: number;
  delay: number;
  path: string;
}

// Organic rocky paths for asteroids
const ASTEROID_PATHS = [
  "M 15,2 Q 28,5 26,18 Q 23,28 12,27 Q 2,24 4,12 Q 5,2 15,2 Z",
  "M 12,3 Q 25,1 27,15 Q 28,27 16,28 Q 3,26 2,14 Q 2,4 12,3 Z",
  "M 14,1 Q 26,4 25,16 Q 22,29 10,26 Q 1,21 3,10 Q 5,2 14,1 Z",
];

export default function TwinklingStars() {
  const [stars, setStars] = useState<Star[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);

  useEffect(() => {
    // 1. Generate 75 perfectly round, multi-sized stars
    const generatedStars: Star[] = Array.from({ length: 75 }).map((_, i) => {
      // Different size tiers: 2px to 9px
      const sizeRandom = Math.random();
      let size: number;
      let isLarge = false;

      if (sizeRandom > 0.90) {
        size = Math.random() * 3 + 6; // 6px - 9px (large glowing stars)
        isLarge = true;
      } else if (sizeRandom > 0.65) {
        size = Math.random() * 2 + 4; // 4px - 6px (medium stars)
      } else {
        size = Math.random() * 1.5 + 2; // 2px - 3.5px (small background stars)
      }

      const speedFactor = (size / 9) * 0.8 + 0.2; // 3D depth parallax: larger stars move slightly faster
      const isAccent = i % 4 === 0;

      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        duration: Math.random() * 4 + 3, // Twinkle speed 3s-7s
        delay: Math.random() * 5,
        driftX: (Math.random() * 40 + 20) * speedFactor * (Math.random() > 0.5 ? 1 : -1),
        driftY: (Math.random() * 40 + 20) * speedFactor * (Math.random() > 0.5 ? 1 : -1),
        driftDuration: Math.random() * 80 + 80, // Slow space drift: 80s to 160s
        isAccent,
        isLarge,
      };
    });
    setStars(generatedStars);

    // 2. Generate moving planets floating in space
    const generatedPlanets: Planet[] = [
      {
        id: 1,
        type: "ringed",
        x: 12,
        y: 18,
        size: 70,
        driftX: 80,
        driftY: -40,
        duration: 180,
      },
      {
        id: 2,
        type: "orb",
        x: 82,
        y: 65,
        size: 50,
        driftX: -60,
        driftY: -50,
        duration: 210,
      },
      {
        id: 3,
        type: "moon",
        x: 70,
        y: 15,
        size: 35,
        driftX: -45,
        driftY: 35,
        duration: 190,
      },
    ];
    setPlanets(generatedPlanets);

    // 3. Generate asteroids floating and tumbling slowly
    const generatedAsteroids: Asteroid[] = [
      {
        id: 1,
        x: 25,
        y: 75,
        size: 28,
        driftX: 110,
        driftY: -70,
        duration: 130,
        rotateDuration: 45,
        delay: 0,
        path: ASTEROID_PATHS[0],
      },
      {
        id: 2,
        x: 78,
        y: 35,
        size: 22,
        driftX: -90,
        driftY: 80,
        duration: 150,
        rotateDuration: 38,
        delay: 3,
        path: ASTEROID_PATHS[1],
      },
      {
        id: 3,
        x: 45,
        y: 10,
        size: 18,
        driftX: 70,
        driftY: 90,
        duration: 140,
        rotateDuration: 50,
        delay: 6,
        path: ASTEROID_PATHS[2],
      },
    ];
    setAsteroids(generatedAsteroids);
  }, []);

  return (
    <div className="starfield-container">
      {/* PERFECT CIRCLE STARS */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className={`space-star ${star.isLarge ? "star-large" : ""}`}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            background: star.isAccent
              ? `radial-gradient(circle at center, #ffffff 0%, var(--accent-color) 60%, transparent 100%)`
              : `radial-gradient(circle at center, #ffffff 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.1) 85%, transparent 100%)`,
            boxShadow: star.isAccent
              ? `0 0 ${star.size * 2}px var(--accent-color)`
              : `0 0 ${star.size * 1.5}px rgba(255, 255, 255, 0.9)`,
            animation: `starTwinkle ${star.duration}s ease-in-out infinite alternate, spaceFloat ${star.driftDuration}s ease-in-out infinite alternate`,
            animationDelay: `${star.delay}s`,
            opacity: 0,
            "--drift-x": `${star.driftX}px`,
            "--drift-y": `${star.driftY}px`,
            willChange: "transform, opacity",
          } as React.CSSProperties}
        />
      ))}

      {/* MOVING PLANETS */}
      {planets.map((planet) => (
        <div
          key={`planet-${planet.id}`}
          className="space-planet-wrapper"
          style={{
            position: "absolute",
            left: `${planet.x}%`,
            top: `${planet.y}%`,
            width: `${planet.size}px`,
            height: `${planet.size}px`,
            animation: `spaceFloat ${planet.duration}s ease-in-out infinite alternate`,
            "--drift-x": `${planet.driftX}px`,
            "--drift-y": `${planet.driftY}px`,
            willChange: "transform",
          } as React.CSSProperties}
        >
          {planet.type === "ringed" && (
            <div className="space-planet ringed-planet" style={{ width: "100%", height: "100%" }}>
              <svg viewBox="0 0 100 100" className="planet-svg">
                <defs>
                  <radialGradient id="ringedGrad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="40%" stopColor="var(--accent-color)" />
                    <stop offset="85%" stopColor="#0a1220" />
                    <stop offset="100%" stopColor="#030710" />
                  </radialGradient>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                    <stop offset="50%" stopColor="var(--accent-color)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
                  </linearGradient>
                </defs>
                {/* Back Ring */}
                <ellipse
                  cx="50"
                  cy="50"
                  rx="44"
                  ry="12"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="4"
                  opacity="0.4"
                  transform="rotate(-25 50 50)"
                />
                {/* Planet Body */}
                <circle cx="50" cy="50" r="24" fill="url(#ringedGrad)" />
                {/* Atmosphere Outer Glow */}
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  fill="none"
                  stroke="var(--accent-color)"
                  strokeWidth="1.5"
                  opacity="0.5"
                />
                {/* Front Ring */}
                <path
                  d="M 10 50 A 44 12 0 0 0 90 50"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="4.5"
                  transform="rotate(-25 50 50)"
                />
              </svg>
            </div>
          )}

          {planet.type === "orb" && (
            <div className="space-planet orb-planet" style={{ width: "100%", height: "100%" }}>
              <svg viewBox="0 0 100 100" className="planet-svg">
                <defs>
                  <radialGradient id="orbGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="35%" stopColor="rgba(var(--accent-color-rgb), 0.9)" />
                    <stop offset="70%" stopColor="#1a0b2e" />
                    <stop offset="100%" stopColor="#05020a" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="40" fill="url(#orbGrad)" />
                <circle
                  cx="50"
                  cy="50"
                  r="41"
                  fill="none"
                  stroke="var(--accent-color)"
                  strokeWidth="2"
                  opacity="0.6"
                />
              </svg>
            </div>
          )}

          {planet.type === "moon" && (
            <div className="space-planet moon-planet" style={{ width: "100%", height: "100%" }}>
              <svg viewBox="0 0 100 100" className="planet-svg">
                <defs>
                  <radialGradient id="moonGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="50%" stopColor="#94a3b8" />
                    <stop offset="85%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="40" fill="url(#moonGrad)" />
                {/* Surface Craters */}
                <circle cx="38" cy="35" r="7" fill="#64748b" opacity="0.4" />
                <circle cx="60" cy="52" r="9" fill="#475569" opacity="0.5" />
                <circle cx="42" cy="65" r="5" fill="#475569" opacity="0.4" />
                <circle
                  cx="50"
                  cy="50"
                  r="40.5"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          )}
        </div>
      ))}

      {/* MOVING ASTEROIDS */}
      {asteroids.map((asteroid) => (
        <div
          key={`asteroid-${asteroid.id}`}
          className="space-asteroid-wrapper"
          style={{
            position: "absolute",
            left: `${asteroid.x}%`,
            top: `${asteroid.y}%`,
            width: `${asteroid.size}px`,
            height: `${asteroid.size}px`,
            animation: `spaceFloat ${asteroid.duration}s ease-in-out infinite alternate`,
            animationDelay: `${asteroid.delay}s`,
            "--drift-x": `${asteroid.driftX}px`,
            "--drift-y": `${asteroid.driftY}px`,
            willChange: "transform",
          } as React.CSSProperties}
        >
          <div
            className="space-asteroid-body"
            style={{
              width: "100%",
              height: "100%",
              animation: `asteroidRotate ${asteroid.rotateDuration}s linear infinite`,
              willChange: "transform",
            }}
          >
            <svg viewBox="0 0 30 30" width="100%" height="100%">
              <defs>
                <linearGradient id={`astGrad-${asteroid.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#64748b" />
                  <stop offset="60%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>
              <path
                d={asteroid.path}
                fill={`url(#astGrad-${asteroid.id})`}
                stroke="var(--accent-color)"
                strokeWidth="0.8"
                opacity="0.85"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
