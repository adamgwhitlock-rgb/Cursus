import { NextResponse } from "next/server";
import { fetchLiveLegalResources } from "@/utils/exaSearch";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "Law";
  const week = parseInt(searchParams.get("week") || "1", 10);

  const resources = await fetchLiveLegalResources(topic, week);
  return NextResponse.json({ resources });
}
