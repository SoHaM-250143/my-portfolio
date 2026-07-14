"use client";

import { useEffect, useState } from "react";

export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const namespace = "soham-mhatre-portfolio";
    const key = "page-views";
    const url = `https://api.counterapi.dev/v1/${namespace}/${key}/up`;

    fetch(url)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Counter API network response was not ok");
      })
      .then((data) => {
        if (data && typeof data.count === "number") {
          setViews(1420 + data.count);
        } else {
          setViews(1420); // Fallback baseline
        }
      })
      .catch(() => {
        setViews(1420); // Fallback baseline
      });
  }, []);

  if (views === null || typeof views !== "number") return null;

  return (
    <span className="view-counter-text">
      👁️ {views.toLocaleString()} views
    </span>
  );
}
