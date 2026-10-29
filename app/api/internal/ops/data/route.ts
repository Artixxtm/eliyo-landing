import { NextRequest, NextResponse } from "next/server";
import { adminCookieName, getAdminDashboardData, verifyAdminToken } from "@/lib/eliyo-admin-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const user = await verifyAdminToken(request.cookies.get(adminCookieName())?.value);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } });

  try {
    const data = await getAdminDashboardData();
    return NextResponse.json(data, { headers: { "Cache-Control": "no-store", Vary: "Cookie" } });
  } catch {
    return NextResponse.json({ error: "Dashboard data is unavailable." }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
