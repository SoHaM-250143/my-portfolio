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
    // Regular expression to parse GitHub's native contribution day elements
    const regex = /data-date="([^"]+)"[^>]*data-level="([^"]+)"/g;
    let match;
    const days: { date: string; level: number }[] = [];

    while ((match = regex.exec(html)) !== null) {
      days.push({
        date: match[1],
        level: parseInt(match[2], 10),
      });
    }

    // Slice exactly the last 30 days
    const last30Days = days.slice(-30);

    return NextResponse.json({ days: last30Days });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
