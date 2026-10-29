import { NextRequest, NextResponse } from "next/server";
import { adminCookieName, requestIsSameOrigin } from "@/lib/eliyo-admin-server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!requestIsSameOrigin(request) || request.headers.get("x-eliyo-admin") !== "1") {
    return NextResponse.json({ ok: false }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(adminCookieName(), "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
