"use client";

import { useEffect, useState } from "react";

export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/views")
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(() => setViews(null));
  }, []);

  if (views === null) return null;

  return (
    <span className="view-counter-text">
      👁️ {views.toLocaleString()} views
    </span>
  );
}
