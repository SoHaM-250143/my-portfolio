import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const namespace = "soham-mhatre-portfolio";
  const key = "page-views";
  const url = `https://api.counterapi.dev/v1/${namespace}/${key}/up`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ views: data.value });
    }
  } catch (err) {
    console.error("CounterAPI error, falling back to baseline", err);
  }

  // Fallback to a baseline if the CounterAPI service has an issue
  const baseline = 1420;
  return NextResponse.json({ views: baseline });
}
