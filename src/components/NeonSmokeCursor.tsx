"use client";

import { useEffect } from "react";

export default function NeonSmokeCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastTime = 0;

    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 40) return; // throttle
      lastTime = now;

      const smoke = document.createElement("div");
      smoke.className = "neon-smoke";

      smoke.style.left = `${e.clientX}px`;
      smoke.style.top = `${e.clientY}px`;

      document.body.appendChild(smoke);

      setTimeout(() => {
        smoke.remove();
      }, 1500);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return null;
}
