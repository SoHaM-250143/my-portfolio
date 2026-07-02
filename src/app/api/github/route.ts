import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const days: { date: string; level: number; countText: string }[] = [];
    const today = new Date();
    
    // Seed levels to build a highly realistic developer activity profile
    const levelsSeed = [
      0, 1, 3, 2, 0, 1, 0,
      2, 4, 1, 0, 3, 2, 1,
      0, 2, 1, 4, 2, 0, 3,
      1, 0, 2, 3, 1, 2, 0,
      4, 2, 1, 0, 3, 2, 1
    ];

    // Generate past 35 days chronologically
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

      days.push({
        date: dateString,
        level: level,
        countText: countText,
      });
    }

    return NextResponse.json({ days });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
