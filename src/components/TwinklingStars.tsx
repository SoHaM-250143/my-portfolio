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
    // 1. Generate 80 perfectly round, multi-sized moving stars
    const generatedStars: Star[] = Array.from({ length: 80 }).map((_, i) => {
      const sizeRandom = Math.random();
      let size: number;
      let isLarge = false;

      if (sizeRandom > 0.88) {
        size = Math.random() * 3 + 6.5; // 6.5px - 9.5px (large glowing stars)
        isLarge = true;
      } else if (sizeRandom > 0.60) {
        size = Math.random() * 2 + 4; // 4px - 6px (medium stars)
      } else {
        size = Math.random() * 1.5 + 2; // 2px - 3.5px (small background stars)
      }

      // Parallax speed: larger stars move faster
      const speedFactor = (size / 9.5) * 0.9 + 0.3;
      const isAccent = i % 3 === 0;

      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        duration: Math.random() * 3 + 2.5, // Twinkle speed 2.5s - 5.5s
        delay: Math.random() * 4,
        // Noticeable drift vectors and 12s - 28s duration for clearly visible movement!
        driftX: (Math.random() * 140 + 70) * speedFactor * (Math.random() > 0.5 ? 1 : -1),
        driftY: (Math.random() * 140 + 70) * speedFactor * (Math.random() > 0.5 ? 1 : -1),
        driftDuration: Math.random() * 16 + 12,
        isAccent,
        isLarge,
      };
    });
    setStars(generatedStars);

    // 2. Generate moving planets traveling across space
    const generatedPlanets: Planet[] = [
      {
        id: 1,
        type: "ringed",
        x: 10,
        y: 15,
        size: 85,
        driftX: 280,
        driftY: -110,
        duration: 32, // Clearly visible 32s motion cycle
      },
      {
        id: 2,
        type: "orb",
        x: 75,
        y: 60,
        size: 65,
        driftX: -260,
        driftY: -150,
        duration: 38, // Clearly visible 38s motion cycle
      },
      {
        id: 3,
        type: "moon",
        x: 65,
        y: 12,
        size: 45,
        driftX: -200,
        driftY: 160,
        duration: 28, // Clearly visible 28s motion cycle
      },
    ];
    setPlanets(generatedPlanets);

    // 3. Generate asteroids traveling and spinning across space
    const generatedAsteroids: Asteroid[] = [
      {
        id: 1,
        x: 15,
        y: 70,
        size: 34,
        driftX: 350,
        driftY: -240,
        duration: 22,
        rotateDuration: 10,
        delay: 0,
        path: ASTEROID_PATHS[0],
      },
      {
        id: 2,
        x: 80,
        y: 25,
        size: 26,
        driftX: -320,
        driftY: 260,
        duration: 26,
        rotateDuration: 12,
        delay: 2,
        path: ASTEROID_PATHS[1],
      },
      {
        id: 3,
        x: 40,
        y: 8,
        size: 22,
        driftX: 280,
        driftY: 300,
        duration: 20,
        rotateDuration: 8,
        delay: 4,
        path: ASTEROID_PATHS[2],
      },
    ];
    setAsteroids(generatedAsteroids);
  }, []);

  return (
    <div className="starfield-container">
      {/* MOVING ROUND STARS */}
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
              ? `radial-gradient(circle at center, #ffffff 0%, var(--accent-color) 65%, transparent 100%)`
              : `radial-gradient(circle at center, #ffffff 0%, rgba(255, 255, 255, 0.85) 45%, rgba(255, 255, 255, 0.15) 80%, transparent 100%)`,
            boxShadow: star.isAccent
              ? `0 0 ${star.size * 2.5}px var(--accent-color)`
              : `0 0 ${star.size * 1.8}px rgba(255, 255, 255, 0.9)`,
            animation: `starTwinkle ${star.duration}s ease-in-out infinite alternate, spaceFloat ${star.driftDuration}s linear infinite alternate`,
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
            animation: `spaceFloat ${planet.duration}s linear infinite alternate`,
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
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
                    <stop offset="50%" stopColor="var(--accent-color)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
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
                  strokeWidth="2"
                  opacity="0.6"
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
                    <stop offset="35%" stopColor="rgba(var(--accent-color-rgb), 0.95)" />
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
                  opacity="0.7"
                />
              </svg>
            </div>
          )}

          {planet.type === "moon" && (
            <div className="space-planet moon-planet" style={{ width: "100%", height: "100%" }}>
              <svg viewBox="0 0 100 100" className="planet-svg">
                <defs>
                  <radialGradient id="moonGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#f1f5f9" />
                    <stop offset="50%" stopColor="#94a3b8" />
                    <stop offset="85%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="40" fill="url(#moonGrad)" />
                {/* Surface Craters */}
                <circle cx="38" cy="35" r="7" fill="#64748b" opacity="0.45" />
                <circle cx="60" cy="52" r="9" fill="#475569" opacity="0.55" />
                <circle cx="42" cy="65" r="5" fill="#475569" opacity="0.45" />
                <circle
                  cx="50"
                  cy="50"
                  r="40.5"
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
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
            animation: `spaceFloat ${asteroid.duration}s linear infinite alternate`,
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
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="60%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>
              <path
                d={asteroid.path}
                fill={`url(#astGrad-${asteroid.id})`}
                stroke="var(--accent-color)"
                strokeWidth="1"
                opacity="0.9"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
