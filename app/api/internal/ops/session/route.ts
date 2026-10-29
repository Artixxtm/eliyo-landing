import { NextRequest, NextResponse } from "next/server";
import { adminCookieName, verifyAdminToken } from "@/lib/eliyo-admin-server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const user = await verifyAdminToken(request.cookies.get(adminCookieName())?.value);
  return NextResponse.json(
    { authenticated: Boolean(user), email: user?.email ?? null },
    { status: user ? 200 : 401, headers: { "Cache-Control": "no-store", Vary: "Cookie" } },
  );
}
