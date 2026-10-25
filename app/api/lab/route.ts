import { NextRequest, NextResponse } from "next/server";
import {
  findSessionId,
  getLabFeatures,
  networkHash,
  newSessionToken,
  resolveSession,
  sessionCookieName,
  sessionCookieOptions,
  submitLabIdea,
  toggleLabVote,
  validSessionToken,
} from "@/lib/eliyo-lab-server";
import { labLocales, type LabLocale } from "@/lib/eliyo-lab-types";

export const runtime = "nodejs";

const FEATURE_ID = /^ELY-[0-9]{3,}$/;

function localeFrom(value: string | null): LabLocale {
  return labLocales.includes(value as LabLocale) ? (value as LabLocale) : "en";
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  return Boolean(origin && origin === request.nextUrl.origin && (!fetchSite || fetchSite === "same-origin"));
}

function publicError(error: unknown) {
  const record = error && typeof error === "object" ? error as { message?: unknown; code?: unknown } : null;
  const message = error instanceof Error ? error.message : typeof record?.message === "string" ? record.message : "";
  const code = typeof record?.code === "string" ? record.code : undefined;
  if (/rate limit/i.test(message)) return { status: 429, code: "rate_limited" };
  if (/not found/i.test(message)) return { status: 404, code: "not_found" };
  if (/invalid|between|too long|unsupported|https/i.test(message)) return { status: 400, code: "invalid_request" };
  console.error("Eliyo Lab request failed", { name: error instanceof Error ? error.name : "RequestError", code, message });
  return { status: 503, code: "temporarily_unavailable" };
}

async function actionSession(request: NextRequest) {
  const cookieName = sessionCookieName();
  const existing = request.cookies.get(cookieName)?.value;
  const token = validSessionToken(existing) ? existing : newSessionToken();
  const sessionId = await resolveSession(token, networkHash(request.headers));
  return { cookieName, token, sessionId, shouldSetCookie: token !== existing };
}

export async function GET(request: NextRequest) {
  try {
    const locale = localeFrom(request.nextUrl.searchParams.get("locale"));
    const token = request.cookies.get(sessionCookieName())?.value;
    const sessionId = validSessionToken(token) ? await findSessionId(token) : undefined;
    const features = await getLabFeatures(locale, sessionId);

    return NextResponse.json(
      { features },
      { headers: { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } },
    );
  } catch (error) {
    const result = publicError(error);
    return NextResponse.json({ error: result.code }, { status: result.status });
  }
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "invalid_origin" }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12_000) {
    return NextResponse.json({ error: "request_too_large" }, { status: 413 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const session = await actionSession(request);
    const fingerprint = networkHash(request.headers);
    let payload: Record<string, unknown>;

    if (body.action === "toggle_vote") {
      const featureId = typeof body.featureId === "string" ? body.featureId : "";
      if (!FEATURE_ID.test(featureId)) throw new Error("Invalid feature ID");
      payload = await toggleLabVote(featureId, session.sessionId, fingerprint);
    } else if (body.action === "submit_idea") {
      const title = typeof body.title === "string" ? body.title.trim() : "";
      const description = typeof body.description === "string" ? body.description.trim() : "";
      const locale = localeFrom(typeof body.locale === "string" ? body.locale : null);
      const consent = body.consentToPublishAttribution === true;
      const attributionName = typeof body.attributionName === "string" ? body.attributionName.trim() : "";
      const attributionUrl = typeof body.attributionUrl === "string" ? body.attributionUrl.trim() : "";
      const honeypot = typeof body.company === "string" ? body.company.trim() : "";

      if (honeypot) return NextResponse.json({ ok: true }, { status: 202 });
      if (title.length < 3 || title.length > 120 || description.length > 1000) throw new Error("Invalid idea length");
      if (attributionName.length > 80 || attributionUrl.length > 300) throw new Error("Invalid attribution length");
      if (consent && attributionUrl && !attributionUrl.startsWith("https://")) throw new Error("Attribution URL must use HTTPS");

      const ideaId = await submitLabIdea({
        title,
        description: description || null,
        locale,
        attributionName: consent ? attributionName || null : null,
        attributionUrl: consent ? attributionUrl || null : null,
        consentToPublishAttribution: consent,
      }, session.sessionId, fingerprint);
      payload = { ok: true, ideaId };
    } else {
      throw new Error("Invalid action");
    }

    const response = NextResponse.json(payload);
    if (session.shouldSetCookie) response.cookies.set(session.cookieName, session.token, sessionCookieOptions);
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("X-Content-Type-Options", "nosniff");
    return response;
  } catch (error) {
    const result = publicError(error);
    return NextResponse.json({ error: result.code }, { status: result.status });
  }
}
