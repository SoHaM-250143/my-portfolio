import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const username = "SoHaM-250143";
  const url = `https://github.com/users/${username}/contributions`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache on edge for 1 hour
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub contributions" },
        { status: 500 }
      );
    }

    const html = await res.text();

    // Parse cell elements
    const cellRegex = /<td[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
    let match;
    const idToDateAndLevel: Record<string, { date: string; level: number }> = {};

    while ((match = cellRegex.exec(html)) !== null) {
      const tag = match[0];
      const dateMatch = /data-date="([^"]+)"/.exec(tag);
      const idMatch = /id="([^"]+)"/.exec(tag);
      const levelMatch = /data-level="([^"]+)"/.exec(tag);
      if (dateMatch && idMatch && levelMatch) {
        idToDateAndLevel[idMatch[1]] = {
          date: dateMatch[1],
          level: parseInt(levelMatch[1], 10),
        };
      }
    }

    // Parse tool-tip elements
    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
    let tooltipMatch;
    const idToText: Record<string, string> = {};
    while ((tooltipMatch = tooltipRegex.exec(html)) !== null) {
      idToText[tooltipMatch[1]] = tooltipMatch[2].trim();
    }

    // Combine into chronological array
    const days: { date: string; level: number; countText: string }[] = [];
    for (const [id, info] of Object.entries(idToDateAndLevel)) {
      const text = idToText[id] || "";
      let countText = "No contributions";
      if (text) {
        const parts = text.split(" on ");
        if (parts.length > 0) {
          countText = parts[0];
        }
      }
      days.push({
        date: info.date,
        level: info.level,
        countText: countText,
      });
    }

    // Sort days chronologically to ensure consistent ordering
    days.sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({ days });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
