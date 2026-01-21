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
    <div style={{ fontSize: "14px", opacity: 0.8 }}>
      👁️ {views.toLocaleString()} views
    </div>
  );
}
