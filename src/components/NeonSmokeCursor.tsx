"use client";

import { useEffect, useState } from "react";

export default function NeonSmokeCursor() {
  const [enabled, setEnabled] = useState(true);
  const [density, setDensity] = useState(3);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkSettings = () => {
      const isEnabled = localStorage.getItem("smoke-enabled") !== "false";
      setEnabled(isEnabled);
      const savedDensity = parseInt(localStorage.getItem("smoke-density") || "3", 10);
      setDensity(savedDensity);
    };

    checkSettings();
    window.addEventListener("theme-settings-changed", checkSettings);

    return () => {
      window.removeEventListener("theme-settings-changed", checkSettings);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !enabled) return;

    let lastTime = 0;

    const getThrottleDelay = (d: number) => {
      switch (d) {
        case 1: return 120;
        case 2: return 80;
        case 3: return 40;
        case 4: return 20;
        case 5: return 8;
        default: return 40;
      }
    };

    const delay = getThrottleDelay(density);

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
      if (now - lastTime < delay) return;
      lastTime = now;

      createSmoke(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTime < delay + 20) return;
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
  }, [enabled, density]);

  return null;
}
