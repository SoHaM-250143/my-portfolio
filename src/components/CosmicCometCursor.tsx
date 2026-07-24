"use client";

import { useEffect, useRef, useState } from "react";

interface StardustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxLife: number;
  life: number;
  color: string;
}

export default function CosmicCometCursor() {
  const [enabled, setEnabled] = useState(true);
  const [density, setDensity] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mouse & Orbit coordinates
  const mouseRef = useRef({ x: -100, y: -100 });
  const prevMouseRef = useRef({ x: -100, y: -100 });
  const orbitRef = useRef({ x: -100, y: -100 });
  const coreRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const particlesRef = useRef<StardustParticle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const accentRgbRef = useRef<string>("0, 255, 255");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Mobile & Touch detection: Disable custom cursor on touch-only devices
    const isTouchOnly = window.matchMedia("(hover: none)").matches || window.innerWidth <= 768;
    if (isTouchOnly) {
      setEnabled(false);
      return;
    }

    const checkSettings = () => {
      const isEnabled = localStorage.getItem("smoke-enabled") !== "false";
      setEnabled(isEnabled);
      const savedDensity = parseInt(localStorage.getItem("smoke-density") || "3", 10);
      setDensity(savedDensity);

      // Get accent color RGB
      const style = getComputedStyle(document.documentElement);
      const rgb = style.getPropertyValue("--accent-color-rgb").trim() || "0, 255, 255";
      accentRgbRef.current = rgb;
    };

    checkSettings();
    window.addEventListener("theme-settings-changed", checkSettings);

    return () => {
      window.removeEventListener("theme-settings-changed", checkSettings);
    };
  }, []);

  // Main Cursor Tracking & Particle Loop
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Track Mouse Coordinates
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseRef.current = { x: clientX, y: clientY };

      // Calculate speed for particle generation
      const dx = clientX - prevMouseRef.current.x;
      const dy = clientY - prevMouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Spawn stardust particles based on speed & density setting
      const spawnCount = Math.min(Math.floor(speed * 0.2) + Math.floor(density * 0.5), 6);
      
      for (let i = 0; i < spawnCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 1.5 + 0.5;
        const size = Math.random() * 2.5 + 1;
        const maxLife = Math.random() * 25 + 20; // 20-45 frames
        const isWhite = Math.random() > 0.4;
        const color = isWhite 
          ? `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})` 
          : `rgba(${accentRgbRef.current}, ${Math.random() * 0.6 + 0.4})`;

        particlesRef.current.push({
          x: clientX + (Math.random() - 0.5) * 6,
          y: clientY + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * velocity + dx * 0.05,
          vy: Math.sin(angle) * velocity + dy * 0.05,
          size,
          alpha: 1,
          maxLife,
          life: 0,
          color,
        });
      }

      prevMouseRef.current = { x: clientX, y: clientY };
    };

    // Track Hover States on Clickables
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable = !!target.closest(
        'a, button, input, textarea, select, .btn, [role="button"], .project-card, .cert-card, .clickable'
      );
      setIsHovered(isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    // Animation Loop
    let lastTime = performance.now();
    const render = (currentTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Smoothly interpolate Orbit Ring position (Spring Physics)
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;
      orbitRef.current.x += (targetX - orbitRef.current.x) * 0.22;
      orbitRef.current.y += (targetY - orbitRef.current.y) * 0.22;

      // Update DOM positions directly for zero-lag smooth hardware rendering
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${orbitRef.current.x}px, ${orbitRef.current.y}px, 0)`;
      }

      // 2. Render & Update Stardust Particles on Canvas
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96; // drag
        p.vy *= 0.96;
        p.alpha = 1 - p.life / p.maxLife;

        if (p.life >= p.maxLife || p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.2, p.size * (1 - p.life / p.maxLife)), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, density]);

  if (!enabled) return null;

  return (
    <>
      {/* Stardust Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="comet-stardust-canvas"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 99998,
        }}
      />

      {/* Comet Core Star Dot */}
      <div
        ref={coreRef}
        className={`comet-core ${isHovered ? "comet-core-hover" : ""}`}
      />

      {/* Gravitational Orbit Ring */}
      <div
        ref={ringRef}
        className={`comet-orbit-ring ${isHovered ? "comet-orbit-hover" : ""}`}
      />
    </>
  );
}
