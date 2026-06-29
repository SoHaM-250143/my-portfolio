"use client";

import dynamic from "next/dynamic";

const Particles = dynamic(
  () => import("react-tsparticles").then((mod) => mod.default),
  { ssr: false }
);

export default function ParticlesBg() {
  return (
    <Particles
      options={{
        fullScreen: { enable: false },
        particles: {
          number: { value: 60 },
          color: { value: "#00ffff" },
          size: { value: 2 },
          links: {
            enable: true,
            color: "#00ffff",
            opacity: 0.3,
          },
          move: { speed: 1 },
        },
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
}
