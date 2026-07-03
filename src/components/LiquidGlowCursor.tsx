"use client";

import { useEffect, useRef, useState } from "react";

export default function LiquidGlowCursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);
  const [density, setDensity] = useState(3); // Density maps to glow size scale

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

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = mouseX;
    let blobY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        mouseX = touch.clientX;
        mouseY = touch.clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let animationFrameId: number;
    const updatePosition = () => {
      if (enabled && blobRef.current) {
        // Smooth lerp interpolation for liquid, laggy coordinate follow
        blobX += (mouseX - blobX) * 0.08;
        blobY += (mouseY - blobY) * 0.08;
        blobRef.current.style.transform = `translate3d(${blobX}px, ${blobY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  // Size scales: Level 1 (200px) to Level 5 (500px)
  const size = 125 + density * 75;
  const halfSize = size / 2;

  return (
    <div
      ref={blobRef}
      className="liquid-glow-blob"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        margin: `-${halfSize}px 0 0 -${halfSize}px`,
      }}
    />
  );
}
