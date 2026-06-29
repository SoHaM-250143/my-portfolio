"use client";

import { useState, useEffect } from "react";

const PRESET_COLORS = [
  { name: "Cyan", rgb: "0, 255, 255", hex: "#00ffff" },
  { name: "Pink", rgb: "255, 0, 100", hex: "#ff0064" },
  { name: "Purple", rgb: "180, 0, 255", hex: "#b400ff" },
  { name: "Green", rgb: "0, 255, 120", hex: "#00ff78" },
  { name: "Gold", rgb: "255, 180, 0", hex: "#ffb400" },
];

export default function ThemeSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [smokeEnabled, setSmokeEnabled] = useState(true);
  const [activeColor, setActiveColor] = useState("0, 255, 255");
  const [lightModeEnabled, setLightModeEnabled] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSmoke = localStorage.getItem("smoke-enabled") !== "false";
    const savedColor = localStorage.getItem("smoke-color-rgb") || "0, 255, 255";
    const savedHex = localStorage.getItem("theme-color-hex") || "#00ffff";
    const savedTheme = localStorage.getItem("theme-mode") || "dark";
    const isLight = savedTheme === "light";
    
    setSmokeEnabled(savedSmoke);
    setActiveColor(savedColor);
    setLightModeEnabled(isLight);
    
    // Apply CSS variables
    document.documentElement.style.setProperty("--smoke-color-rgb", savedColor);
    document.documentElement.style.setProperty("--accent-color", savedHex);
    document.documentElement.style.setProperty("--accent-color-rgb", savedColor);
    
    // Apply theme class
    if (isLight) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, []);

  const handleSmokeToggle = (enabled: boolean) => {
    setSmokeEnabled(enabled);
    localStorage.setItem("smoke-enabled", String(enabled));
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

  const handleThemeToggle = (isLight: boolean) => {
    setLightModeEnabled(isLight);
    const modeStr = isLight ? "light" : "dark";
    localStorage.setItem("theme-mode", modeStr);
    
    if (isLight) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
    
    window.dispatchEvent(new Event("theme-settings-changed"));
  };

  return (
    <div className="theme-settings-container">
      {/* Floating Settings Button */}
      <button 
        className="theme-settings-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme settings"
      >
        ⚙️
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="theme-settings-panel">
          <h3>Customizer</h3>
          
          <div className="settings-section">
            <div className="setting-row">
              <span>Light Mode Theme</span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={lightModeEnabled}
                  onChange={(e) => handleThemeToggle(e.target.checked)} 
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

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

          <div className="settings-section">
            <h4>Smoke Trail Color</h4>
            <div className="color-presets">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.name}
                  className={`color-dot ${activeColor === color.rgb ? "active" : ""}`}
                  style={{ 
                    backgroundColor: color.hex,
                    boxShadow: activeColor === color.rgb ? `0 0 10px ${color.hex}` : "none" 
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
