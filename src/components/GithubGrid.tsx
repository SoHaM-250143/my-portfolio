"use client";

import { useEffect, useState } from "react";

interface ContributionDay {
  date: string;
  level: number;
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

  // Generate 30 dummy cells if loading or fetch failed
  const displayDays =
    loading || days.length === 0
      ? Array.from({ length: 30 }, (_, i) => ({
          date: `Day ${i + 1}`,
          level: 0,
        }))
      : days;

  return (
    <div className="github-timeline-wrapper">
      <div className="github-days-grid">
        {displayDays.map((day, i) => {
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
                    ? `0 0 10px rgba(var(--accent-color-rgb), ${opacity * 0.5})`
                    : "none",
              }}
            >
              <span className="tooltip">
                {day.level === 0
                  ? "No contributions"
                  : `${day.level} levels of activity`}{" "}
                on {formatDate(day.date)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="github-timeline-labels">
        <span>{formatDate(displayDays[0]?.date)}</span>
        <span>{formatDate(displayDays[displayDays.length - 1]?.date)}</span>
      </div>
    </div>
  );
}
