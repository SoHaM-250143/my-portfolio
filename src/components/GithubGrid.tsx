"use client";

import { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  level: number;
  countText?: string;
}

export default function GithubGrid() {
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr.startsWith("Day")) return dateStr;
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Align days into 5 columns of 7 rows (Sunday to Saturday)
  let alignedDays: ContributionDay[] = [];
  let monthLabels: string[] = [];

  if (!loading && days.length > 0) {
    // Find index of the most recent Sunday to align weeks
    let lastSundayIndex = days.length - 1;
    while (lastSundayIndex >= 0) {
      const dayOfWeek = new Date(days[lastSundayIndex].date).getDay();
      if (dayOfWeek === 0) {
        break;
      }
      lastSundayIndex--;
    }

    if (lastSundayIndex >= 0) {
      // Start 4 weeks before the last Sunday index to get 5 weeks of columns
      const startIndex = Math.max(0, lastSundayIndex - 28);
      alignedDays = days.slice(startIndex);

      // Group days into columns of 7 to calculate month labels
      const cols: ContributionDay[][] = [];
      for (let i = 0; i < alignedDays.length; i += 7) {
        cols.push(alignedDays.slice(i, i + 7));
      }

      monthLabels = cols.map((col, idx) => {
        if (col.length === 0) return "";
        const dateObj = new Date(col[0].date);
        const monthName = dateObj.toLocaleDateString("en-US", { month: "short" });
        if (idx === 0) return monthName;

        const prevCol = cols[idx - 1];
        if (prevCol && prevCol.length > 0) {
          const prevDateObj = new Date(prevCol[0].date);
          const prevMonthName = prevDateObj.toLocaleDateString("en-US", { month: "short" });
          if (monthName !== prevMonthName) {
            return monthName;
          }
        }
        return "";
      });
    }
  }

  // Fallback for loading state (5 weeks * 7 days = 35 days)
  if (loading || alignedDays.length === 0) {
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
