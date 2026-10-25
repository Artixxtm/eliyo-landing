import "server-only";

import { createHash, createHmac, randomBytes } from "node:crypto";
import { isIP } from "node:net";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { LabFeature, LabLocale, LabStatus } from "./eliyo-lab-types";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const SESSION_TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;

type LocalizedValue = Record<string, string>;

type FeatureRow = {
  id: string;
  title: LocalizedValue;
  description: LocalizedValue;
  status: LabStatus;
  source: "product" | "community";
  attribution_name: string | null;
  attribution_url: string | null;
  attribution_consent_at: string | null;
  vote_count: number;
};

function requiredEnv(name: string, fallbackName?: string) {
  const value = process.env[name]?.trim() || (fallbackName ? process.env[fallbackName]?.trim() : undefined);
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function adminClient() {
  return createClient(
    requiredEnv("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL"),
    requiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

const getCachedFeatureRows = unstable_cache(
  async () => {
    const { data, error } = await adminClient().rpc("get_eliyo_lab_features");
    if (error) throw error;
    return (data ?? []) as FeatureRow[];
  },
  ["eliyo-lab-public-features-v1"],
  { revalidate: 15, tags: ["eliyo-lab-features"] },
);

function localized(value: LocalizedValue, locale: LabLocale) {
  return value[locale] || value.en || "";
}

export async function getLabFeatures(locale: LabLocale, sessionId?: string | null): Promise<LabFeature[]> {
  const [rows, voteRows] = await Promise.all([
    getCachedFeatureRows(),
    sessionId
      ? adminClient().rpc("get_eliyo_lab_votes", { p_session_id: sessionId })
      : Promise.resolve({ data: [], error: null }),
  ]);

  if (voteRows.error) throw voteRows.error;
  const votedIds = new Set((voteRows.data ?? []).map((row: { feature_id: string }) => row.feature_id));

  return rows.map((row) => ({
    id: row.id,
    title: localized(row.title, locale),
    description: localized(row.description, locale),
    status: row.status,
    source: row.source,
    attributionName: row.attribution_consent_at ? row.attribution_name : null,
    attributionUrl: row.attribution_consent_at ? row.attribution_url : null,
    voteCount: row.vote_count,
    voted: votedIds.has(row.id),
  }));
}

export function sessionCookieName() {
  return process.env.NODE_ENV === "production" ? "__Host-eliyo_lab_session" : "eliyo_lab_session";
}

export function newSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function validSessionToken(token: string | undefined): token is string {
  return Boolean(token && SESSION_TOKEN_PATTERN.test(token));
}

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function clientAddress(headers: Headers) {
  const raw =
    headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip")?.trim() ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  const address = raw?.replace(/^\[|\]$/g, "").replace(/^::ffff:/, "").toLowerCase();
  if (address && isIP(address)) return address;

  return `unknown:${(headers.get("user-agent") || "unknown").slice(0, 160)}`;
}

export function networkHash(headers: Headers) {
  return createHmac("sha256", requiredEnv("ELIYO_LAB_HASH_SECRET"))
    .update(clientAddress(headers))
    .digest("hex");
}

export async function findSessionId(token: string) {
  const { data, error } = await adminClient()
    .from("eliyo_lab_sessions")
    .select("id")
    .eq("token_hash", hashSessionToken(token))
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (error) throw error;
  return data?.id as string | undefined;
}

export async function resolveSession(token: string, fingerprint: string) {
  const { data, error } = await adminClient().rpc("resolve_eliyo_lab_session", {
    p_token_hash: hashSessionToken(token),
    p_network_hash: fingerprint,
  });
  if (error) throw error;

  const row = data?.[0] as { session_id?: string } | undefined;
  if (!row?.session_id) throw new Error("Session could not be resolved");
  return row.session_id;
}

export async function toggleLabVote(featureId: string, sessionId: string, fingerprint: string) {
  const { data, error } = await adminClient().rpc("toggle_eliyo_lab_vote", {
    p_feature_id: featureId,
    p_session_id: sessionId,
    p_network_hash: fingerprint,
  });
  if (error) throw error;

  const row = data?.[0] as { voted?: boolean; vote_count?: number } | undefined;
  if (typeof row?.voted !== "boolean" || typeof row.vote_count !== "number") {
    throw new Error("Vote result is invalid");
  }
  return { voted: row.voted, voteCount: row.vote_count };
}

export type IdeaInput = {
  title: string;
  description: string | null;
  locale: LabLocale;
  attributionName: string | null;
  attributionUrl: string | null;
  consentToPublishAttribution: boolean;
};

export async function submitLabIdea(input: IdeaInput, sessionId: string, fingerprint: string) {
  const { data, error } = await adminClient().rpc("submit_eliyo_lab_idea", {
    p_session_id: sessionId,
    p_network_hash: fingerprint,
    p_title: input.title,
    p_description: input.description,
    p_locale: input.locale,
    p_attribution_name: input.attributionName,
    p_attribution_url: input.attributionUrl,
    p_consent_to_publish_attribution: input.consentToPublishAttribution,
  });
  if (error) throw error;
  return data as string;
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};
