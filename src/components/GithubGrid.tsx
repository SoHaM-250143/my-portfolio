"use client";

import { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  level: number;
  countText?: string;
  isPlaceholder?: boolean;
}

export default function GithubGrid() {
  // Pre-generate static client-side contributions list for instant hydration
  const getInitialDays = (): ContributionDay[] => {
    const mockDays: ContributionDay[] = [];
    const today = new Date();
    const levelsSeed = [
      0, 1, 3, 2, 0, 1, 0,
      2, 4, 1, 0, 3, 2, 1,
      0, 2, 1, 4, 2, 0, 3,
      1, 0, 2, 3, 1, 2, 0,
      4, 2, 1, 0, 3, 2, 1
    ];
    for (let i = 34; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split("T")[0];
      const level = levelsSeed[34 - i];
      let countText = "No contributions";
      if (level === 1) countText = "1 contribution";
      if (level === 2) countText = "3 contributions";
      if (level === 3) countText = "6 contributions";
      if (level === 4) countText = "12 contributions";
      mockDays.push({
        date: dateString,
        level: level,
        countText: countText,
      });
    }
    return mockDays;
  };

  const [days, setDays] = useState<ContributionDay[]>(getInitialDays());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          if (data && data.days) {
            setDays(data.days);
          }
        }
      } catch (err) {
        console.error("Failed to load github contributions", err);
      }
    }
    fetchStats();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr.startsWith("Day")) return dateStr;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Align days into 5 columns of 7 rows (Sunday to Saturday)
  let alignedDays: ContributionDay[] = [];
  let monthLabels: string[] = [];

  if (days.length > 0) {
    const today = new Date();
    const todayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const emptyDaysCount = 6 - todayOfWeek; // Days remaining in current week (Wed to Sat)
    const activeDaysCount = 35 - emptyDaysCount; // Active days required to make exactly 35 elements

    // Get the last activeDaysCount days from the fetched list
    const activeDaysSlice = days.slice(-activeDaysCount);
    alignedDays = [...activeDaysSlice];

    // Append placeholder days to complete the remaining slots of the final column
    for (let i = 1; i <= emptyDaysCount; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      const dateString = futureDate.toISOString().split("T")[0];

      alignedDays.push({
        date: dateString,
        level: 0,
        countText: "No contributions",
        isPlaceholder: true,
      });
    }

    // Group alignedDays into columns of 7 to calculate month labels
    const cols: ContributionDay[][] = [];
    for (let i = 0; i < alignedDays.length; i += 7) {
      cols.push(alignedDays.slice(i, i + 7));
    }

    monthLabels = cols.map((col, idx) => {
      if (col.length === 0) return "";
      try {
        const dateObj = new Date(col[0].date);
        if (isNaN(dateObj.getTime())) return "";
        const monthName = dateObj.toLocaleDateString("en-US", { month: "short" });
        if (idx === 0) return monthName;

        const prevCol = cols[idx - 1];
        if (prevCol && prevCol.length > 0) {
          const prevDateObj = new Date(prevCol[0].date);
          if (!isNaN(prevDateObj.getTime())) {
            const prevMonthName = prevDateObj.toLocaleDateString("en-US", { month: "short" });
            if (monthName !== prevMonthName) {
              return monthName;
            }
          }
        }
      } catch (e) {
        console.error("Error formatting month label date", e);
      }
      return "";
    });
  }

  // Fallback for loading state (5 weeks * 7 days = 35 days)
  if (alignedDays.length === 0) {
    alignedDays = Array.from({ length: 35 }, (_, i) => ({
      date: `Day ${i + 1}`,
      level: 0,
      countText: "No contributions",
    }));
    monthLabels = ["Jun", "", "", "", "Jul"];
  }

  return (
    <div className="github-calendar-wrapper">
      {/* Month Labels Row on Top */}
      <div className="github-months-row">
        {monthLabels.map((label, idx) => (
          <span key={idx} className="month-label">
            {label}
          </span>
        ))}
      </div>

      <div className="github-calendar-grid">
        {/* Weekday labels on the left */}
        <div className="github-weekdays-labels">
          <span></span>
          <span>Mon</span>
          <span></span>
          <span>Wed</span>
          <span></span>
          <span>Fri</span>
          <span></span>
        </div>

        {/* 7x5 Grid Cells */}
        <div className="github-grid-cells">
          {alignedDays.map((day, i) => {
            if (day.isPlaceholder) {
              return (
                <div
                  key={i}
                  className="github-day-cell placeholder"
                  style={{
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                />
              );
            }

            let opacity = 0.08;
            if (day.level === 1) opacity = 0.35;
            if (day.level === 2) opacity = 0.55;
            if (day.level === 3) opacity = 0.75;
            if (day.level === 4) opacity = 1.0;

            return (
              <div
                key={i}
                className={`github-day-cell level-${day.level}`}
                style={{
                  background: `rgba(var(--accent-color-rgb), ${opacity})`,
                  boxShadow:
                    day.level > 0
                      ? `0 0 8px rgba(var(--accent-color-rgb), ${opacity * 0.4})`
                      : "none",
                }}
              >
                <span className="tooltip">
                  {day.countText || "No contributions"} on {formatDate(day.date)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
