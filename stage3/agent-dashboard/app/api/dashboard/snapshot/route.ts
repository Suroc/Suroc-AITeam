import { NextResponse } from "next/server";
import { getMockDashboardSnapshot } from "@/lib/mock";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getMockDashboardSnapshot());
}
