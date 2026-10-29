import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { adminCookieName, adminCookieOptions, requestIsSameOrigin, signInAdmin } from "@/lib/eliyo-admin-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 6;
const attempts = new Map<string, { count: number; resetAt: number }>();

function response(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function requestKey(request: NextRequest) {
  const address = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
  return createHash("sha256").update(`${address}\n${request.headers.get("user-agent") || "unknown"}`).digest("hex");
}

function consumeAttempt(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (current.count >= MAX_ATTEMPTS) return false;
  current.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  if (!requestIsSameOrigin(request) || request.headers.get("x-eliyo-admin") !== "1") {
    return response({ ok: false }, 403);
  }

  const key = requestKey(request);
  if (!consumeAttempt(key)) return response({ ok: false, error: "Too many attempts. Try again later." }, 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return response({ ok: false, error: "Invalid credentials." }, 400);
  }

  const email = typeof (body as { email?: unknown }).email === "string" ? (body as { email: string }).email.trim() : "";
  const password = typeof (body as { password?: unknown }).password === "string" ? (body as { password: string }).password : "";
  const session = await signInAdmin(email, password);
  if (!session) return response({ ok: false, error: "Invalid credentials." }, 401);

  attempts.delete(key);
  const result = response({ ok: true });
  result.cookies.set(adminCookieName(), session.accessToken, { ...adminCookieOptions, maxAge: session.expiresIn });
  return result;
}
