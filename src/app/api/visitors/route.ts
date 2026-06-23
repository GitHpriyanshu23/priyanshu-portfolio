import { getVisitorCount, incrementVisitorCount } from "@/lib/visitor-store";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await getVisitorCount();
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Failed to read visitor count:", error);
    return NextResponse.json({ error: "Visitor count unavailable" }, { status: 503 });
  }
}

export async function POST() {
  try {
    const count = await incrementVisitorCount();
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Failed to increment visitor count:", error);
    return NextResponse.json({ error: "Visitor count unavailable" }, { status: 503 });
  }
}
