"use client";

import { useState, useEffect } from "react";
import Magnetic from "./Magnetic";

const PRESET_COLORS = [
  { name: "Cyan", rgb: "0, 255, 255", hex: "#00ffff" },
  { name: "Pink", rgb: "255, 0, 100", hex: "#ff0064" },
  { name: "Purple", rgb: "180, 0, 255", hex: "#b400ff" },
  { name: "Green", rgb: "0, 255, 120", hex: "#00ff78" },
  { name: "Gold", rgb: "255, 180, 0", hex: "#ffb400" },
  { name: "Orange", rgb: "255, 90, 0", hex: "#ff5a00" },
  { name: "Red", rgb: "255, 0, 0", hex: "#ff0000" },
  { name: "Neon Blue", rgb: "0, 128, 255", hex: "#0080ff" },
  { name: "Lime", rgb: "180, 255, 0", hex: "#b4ff00" },
  { name: "White", rgb: "240, 240, 240", hex: "#f0f0f0" },
];

export default function ThemeSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [smokeEnabled, setSmokeEnabled] = useState(true);
  const [smokeDensity, setSmokeDensity] = useState(3);
  const [activeColor, setActiveColor] = useState("0, 255, 255");

  useEffect(() => {
    // Load settings from localStorage
    const savedSmoke = localStorage.getItem("smoke-enabled") !== "false";
    const savedColor = localStorage.getItem("smoke-color-rgb") || "0, 255, 255";
    const savedHex = localStorage.getItem("theme-color-hex") || "#00ffff";
    const savedDensity = parseInt(localStorage.getItem("smoke-density") || "3", 10);
    
    setSmokeEnabled(savedSmoke);
    setActiveColor(savedColor);
    setSmokeDensity(savedDensity);
    
    // Apply CSS variables
    document.documentElement.style.setProperty("--smoke-color-rgb", savedColor);
    document.documentElement.style.setProperty("--accent-color", savedHex);
    document.documentElement.style.setProperty("--accent-color-rgb", savedColor);
    
    // Force remove light-mode
    document.body.classList.remove("light-mode");
    localStorage.setItem("theme-mode", "dark");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSmokeToggle = (enabled: boolean) => {
    setSmokeEnabled(enabled);
    localStorage.setItem("smoke-enabled", String(enabled));
    window.dispatchEvent(new Event("theme-settings-changed"));
  };

  const handleDensityChange = (value: number) => {
    setSmokeDensity(value);
    localStorage.setItem("smoke-density", String(value));
    window.dispatchEvent(new Event("theme-settings-changed"));
  };

  const handleColorChange = (rgb: string, hex: string) => {
    setActiveColor(rgb);
    localStorage.setItem("smoke-color-rgb", rgb);
    localStorage.setItem("theme-color-hex", hex);
    
    document.documentElement.style.setProperty("--smoke-color-rgb", rgb);
    document.documentElement.style.setProperty("--accent-color", hex);
    document.documentElement.style.setProperty("--accent-color-rgb", rgb);
    
    window.dispatchEvent(new Event("theme-settings-changed"));
  };

  return (
    <div className="theme-settings-container">
      {/* Floating Settings Button */}
      <Magnetic>
        <button 
          className="theme-settings-btn" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Theme settings"
        >
          ⚙️
        </button>
      </Magnetic>

      {/* Settings Panel */}
      {isOpen && (
        <div className="theme-settings-panel">
          <h3>Customizer</h3>
          
          <div className="settings-section">
            <div className="setting-row">
              <span>Smoke Cursor Effect</span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={smokeEnabled}
                  onChange={(e) => handleSmokeToggle(e.target.checked)} 
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {smokeEnabled && (
            <div className="settings-section">
              <div className="setting-column" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div className="setting-row">
                  <span>Smoke Intensity</span>
                  <span style={{ color: "var(--accent-color)", fontWeight: "bold" }}>{smokeDensity}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={smokeDensity}
                  onChange={(e) => handleDensityChange(parseInt(e.target.value, 10))}
                  style={{ width: "100%", accentColor: "var(--accent-color)", cursor: "pointer" }}
                />
              </div>
            </div>
          )}

          <div className="settings-section">
            <h4>Smoke Trail Color</h4>
            <div className="color-presets" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.name}
                  className={`color-dot ${activeColor === color.rgb ? "active" : ""}`}
                  style={{ 
                    backgroundColor: color.hex,
                    boxShadow: activeColor === color.rgb ? `0 0 10px ${color.hex}` : "none",
                    border: "none",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    cursor: "pointer",
                    transition: "transform 0.2s ease"
                  }}
                  onClick={() => handleColorChange(color.rgb, color.hex)}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
