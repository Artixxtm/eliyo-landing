import { NextRequest, NextResponse } from "next/server";
import { adminCookieName, requestIsSameOrigin, updateAdminItem, verifyAdminToken } from "@/lib/eliyo-admin-server";
import type { FeedbackStatus, IdeaStatus } from "@/lib/eliyo-admin-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const feedbackStatuses = new Set<FeedbackStatus>(["new", "reviewed", "planned", "closed"]);
const ideaStatuses = new Set<IdeaStatus>(["pending", "approved", "rejected", "published"]);

export async function PATCH(request: NextRequest) {
  if (!requestIsSameOrigin(request) || request.headers.get("x-eliyo-admin") !== "1") {
    return NextResponse.json({ ok: false }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  const user = await verifyAdminToken(request.cookies.get(adminCookieName())?.value);
  if (!user) return NextResponse.json({ ok: false }, { status: 401, headers: { "Cache-Control": "no-store" } });

  let body: { kind?: unknown; id?: unknown; status?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  if ((body.kind !== "feedback" && body.kind !== "idea") || typeof body.id !== "string" || !UUID.test(body.id) || typeof body.status !== "string") {
    return NextResponse.json({ ok: false }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  if (body.kind === "feedback" && !feedbackStatuses.has(body.status as FeedbackStatus)) {
    return NextResponse.json({ ok: false }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
  if (body.kind === "idea" && !ideaStatuses.has(body.status as IdeaStatus)) {
    return NextResponse.json({ ok: false }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  try {
    if (body.kind === "feedback") await updateAdminItem({ kind: "feedback", id: body.id, status: body.status as FeedbackStatus });
    else await updateAdminItem({ kind: "idea", id: body.id, status: body.status as IdeaStatus });
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
