"use client";

import { useEffect } from "react";

export default function NeonSmokeCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastTime = 0;

    const createSmoke = (x: number, y: number) => {
      const smoke = document.createElement("div");
      smoke.className = "neon-smoke";
      smoke.style.left = `${x}px`;
      smoke.style.top = `${y}px`;

      document.body.appendChild(smoke);

      setTimeout(() => {
        smoke.remove();
      }, 1600);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 40) return;
      lastTime = now;

      createSmoke(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTime < 60) return;
      lastTime = now;

      const touch = e.touches[0];
      if (!touch) return;

      createSmoke(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return null;
}
