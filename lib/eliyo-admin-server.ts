import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { User } from "@supabase/supabase-js";
import type {
  AdminCatalogRequest,
  AdminActivationMetrics,
  AdminDashboardData,
  AdminFeature,
  AdminFeedback,
  AdminIdea,
  AdminVehicleInventory,
  FeedbackStatus,
  IdeaStatus,
} from "./eliyo-admin-types";

const ADMIN_EMAIL = (process.env.ELIYO_ADMIN_EMAIL || "officalwoolf@gmail.com").trim().toLowerCase();
const ADMIN_COOKIE_MAX_AGE = 60 * 60;

type FeedbackRow = {
  id: string;
  user_id: string;
  type: "bug" | "idea" | "question";
  message: string;
  screenshot_path: string | null;
  app_version: string | null;
  build_version: string | null;
  platform: "ios" | "android" | "web";
  os_version: string | null;
  device_model: string | null;
  locale: string | null;
  vehicle_id: string | null;
  wants_reply: boolean;
  reply_email: string | null;
  runtime: string | null;
  status: FeedbackStatus;
  created_at: string;
};

type IdeaRow = {
  id: string;
  title: string;
  description: string | null;
  locale: string;
  attribution_name: string | null;
  attribution_url: string | null;
  consent_to_publish_attribution: boolean;
  status: IdeaStatus;
  created_at: string;
  reviewed_at: string | null;
  published_feature_id: string | null;
};

type CatalogRow = {
  dedupe_key: string;
  make: string;
  model: string;
  year: number;
  requesting_users: number;
  total_requests: number;
  last_requested_at: string;
};

type FeatureRow = {
  id: string;
  title: Record<string, string>;
  status: AdminFeature["status"];
  source: AdminFeature["source"];
  published: boolean;
  vote_count: number;
  updated_at: string;
};

type VehicleInventoryRow = {
  make: string;
  model: string;
  year: number;
  archived_at: string | null;
};

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function serverClient() {
  return createClient(requiredEnv("SUPABASE_URL"), requiredEnv("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
}

export function adminCookieName() {
  return process.env.NODE_ENV === "production" ? "__Host-eliyo_admin_session" : "eliyo_admin_session";
}

export const adminCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  maxAge: ADMIN_COOKIE_MAX_AGE,
};

export function adminEmailAllowed(email: string | null | undefined) {
  return email?.trim().toLowerCase() === ADMIN_EMAIL;
}

export function requestIsSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function signInAdmin(email: string, password: string) {
  if (!adminEmailAllowed(email) || password.length < 8 || password.length > 256) return null;

  const { data, error } = await serverClient().auth.signInWithPassword({ email, password });
  if (error || !data.session || !data.user || !adminEmailAllowed(data.user.email)) return null;
  return { accessToken: data.session.access_token, expiresIn: Math.min(data.session.expires_in, ADMIN_COOKIE_MAX_AGE) };
}

export async function verifyAdminToken(token: string | undefined): Promise<User | null> {
  if (!token) return null;
  const { data, error } = await serverClient().auth.getUser(token);
  if (error || !data.user || !adminEmailAllowed(data.user.email) || !data.user.email_confirmed_at) return null;
  return data.user;
}

function titleForAdmin(title: Record<string, string>) {
  return title.en || title.uk || title.pl || title.ru || "Untitled";
}

type ProfileActivationRow = { id: string; created_at: string };
type VehicleActivationRow = { id: string; owner_id: string };
type RuleActivationRow = { vehicle_id: string };

function asNonNegativeInteger(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.floor(value)
    : 0;
}

async function getActivationMetrics(client: ReturnType<typeof serverClient>): Promise<AdminActivationMetrics> {
  const { data: instrumented, error: instrumentedError } = await client.rpc("get_eliyo_admin_activation_metrics");
  if (!instrumentedError && instrumented && typeof instrumented === "object" && !Array.isArray(instrumented)) {
    const value = instrumented as Record<string, unknown>;
    return {
      totalUsers: asNonNegativeInteger(value.totalUsers),
      vehicleUsers: asNonNegativeInteger(value.vehicleUsers),
      setupUsers: asNonNegativeInteger(value.setupUsers),
      returnEligibleUsers: asNonNegativeInteger(value.returnEligibleUsers),
      returnedUsers: asNonNegativeInteger(value.returnedUsers),
      source: "instrumented",
    };
  }

  const [profilesResult, vehiclesResult, rulesResult] = await Promise.all([
    client.from("profiles").select("id,created_at").limit(1000),
    client.from("vehicles").select("id,owner_id").limit(1000),
    client.from("vehicle_maintenance_rules").select("vehicle_id").limit(1000),
  ]);
  if (profilesResult.error || vehiclesResult.error || rulesResult.error) {
    throw profilesResult.error || vehiclesResult.error || rulesResult.error;
  }

  const profiles = (profilesResult.data ?? []) as ProfileActivationRow[];
  const vehicles = (vehiclesResult.data ?? []) as VehicleActivationRow[];
  const rules = (rulesResult.data ?? []) as RuleActivationRow[];
  const vehicleOwnerById = new Map(vehicles.map((vehicle) => [vehicle.id, vehicle.owner_id]));
  const vehicleUsers = new Set(vehicles.map((vehicle) => vehicle.owner_id));
  const setupUsers = new Set(
    rules.map((rule) => vehicleOwnerById.get(rule.vehicle_id)).filter((owner): owner is string => Boolean(owner)),
  );

  const authUsers: Array<{ created_at: string; last_sign_in_at?: string | null }> = [];
  for (let page = 1; page <= 20; page += 1) {
    const { data, error } = await client.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    authUsers.push(...data.users);
    if (data.users.length < 1000) break;
  }
  const now = Date.now();
  const eligible = authUsers.filter((user) => now - new Date(user.created_at).getTime() >= 8 * 86_400_000);
  const returned = eligible.filter((user) => {
    if (!user.last_sign_in_at) return false;
    const created = new Date(user.created_at).getTime();
    const signedIn = new Date(user.last_sign_in_at).getTime();
    return signedIn >= created + 3 * 86_400_000 && signedIn < created + 8 * 86_400_000;
  });

  return {
    totalUsers: profiles.length,
    vehicleUsers: vehicleUsers.size,
    setupUsers: setupUsers.size,
    returnEligibleUsers: eligible.length,
    returnedUsers: returned.length,
    source: "auth_proxy",
  };
}

async function getVehicleInventory(client: ReturnType<typeof serverClient>): Promise<AdminVehicleInventory> {
  const rows: VehicleInventoryRow[] = [];
  const pageSize = 1000;

  for (let from = 0; ; from += pageSize) {
    const { data, error } = await client
      .from("vehicles")
      .select("make,model,year,archived_at")
      .order("created_at", { ascending: true })
      .range(from, from + pageSize - 1);
    if (error) throw error;

    const page = (data ?? []) as VehicleInventoryRow[];
    rows.push(...page);
    if (page.length < pageSize) break;
  }

  const grouped = new Map<string, AdminVehicleInventory["models"][number]>();
  const makes = new Set<string>();
  let active = 0;

  for (const row of rows) {
    const make = row.make.trim();
    const model = row.model.trim();
    const normalizedMake = make.toLocaleLowerCase("en");
    const key = `${normalizedMake}\n${model.toLocaleLowerCase("en")}`;
    makes.add(normalizedMake);
    if (!row.archived_at) active += 1;

    const existing = grouped.get(key);
    if (existing) {
      existing.total += 1;
      existing.active += row.archived_at ? 0 : 1;
      existing.archived += row.archived_at ? 1 : 0;
      existing.minYear = Math.min(existing.minYear, row.year);
      existing.maxYear = Math.max(existing.maxYear, row.year);
      continue;
    }

    grouped.set(key, {
      key,
      make,
      model,
      total: 1,
      active: row.archived_at ? 0 : 1,
      archived: row.archived_at ? 1 : 0,
      minYear: row.year,
      maxYear: row.year,
    });
  }

  const models = [...grouped.values()].sort((left, right) =>
    right.total - left.total
    || left.make.localeCompare(right.make)
    || left.model.localeCompare(right.model),
  );

  return {
    total: rows.length,
    active,
    archived: rows.length - active,
    uniqueMakes: makes.size,
    uniqueModels: models.length,
    models,
  };
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const client = serverClient();
  const [feedbackResult, ideasResult, catalogResult, featuresResult, feedbackCountResult, ideasCountResult, activation, vehicleInventory] = await Promise.all([
    client
      .from("feedback")
      .select("id,user_id,type,message,screenshot_path,app_version,build_version,platform,os_version,device_model,locale,vehicle_id,wants_reply,reply_email,runtime,status,created_at")
      .order("created_at", { ascending: false })
      .limit(200),
    client
      .from("eliyo_lab_ideas")
      .select("id,title,description,locale,attribution_name,attribution_url,consent_to_publish_attribution,status,created_at,reviewed_at,published_feature_id")
      .order("created_at", { ascending: false })
      .limit(200),
    client
      .from("vehicle_catalog_request_popularity")
      .select("dedupe_key,make,model,year,requesting_users,total_requests,last_requested_at")
      .order("total_requests", { ascending: false })
      .order("last_requested_at", { ascending: false })
      .limit(200),
    client
      .from("eliyo_lab_features")
      .select("id,title,status,source,published,vote_count,updated_at")
      .order("sort_order", { ascending: true }),
    client.from("feedback").select("id", { count: "exact", head: true }).eq("status", "new"),
    client.from("eliyo_lab_ideas").select("id", { count: "exact", head: true }).eq("status", "pending"),
    getActivationMetrics(client),
    getVehicleInventory(client),
  ]);

  for (const result of [feedbackResult, ideasResult, catalogResult, featuresResult, feedbackCountResult, ideasCountResult]) {
    if (result.error) throw result.error;
  }

  const feedbackRows = (feedbackResult.data ?? []) as FeedbackRow[];
  const screenshotUrls = await Promise.all(
    feedbackRows.map(async (row) => {
      if (!row.screenshot_path) return null;
      const { data, error } = await client.storage.from("feedback-screenshots").createSignedUrl(row.screenshot_path, 10 * 60);
      return error ? null : data.signedUrl;
    }),
  );

  const feedback: AdminFeedback[] = feedbackRows.map((row, index) => ({
    id: row.id,
    userId: row.user_id,
    type: row.type,
    message: row.message,
    screenshotUrl: screenshotUrls[index],
    appVersion: row.app_version,
    buildVersion: row.build_version,
    platform: row.platform,
    osVersion: row.os_version,
    deviceModel: row.device_model,
    locale: row.locale,
    vehicleId: row.vehicle_id,
    wantsReply: row.wants_reply,
    replyEmail: row.reply_email,
    runtime: row.runtime,
    status: row.status,
    createdAt: row.created_at,
  }));

  const ideas: AdminIdea[] = ((ideasResult.data ?? []) as IdeaRow[]).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    locale: row.locale,
    attributionName: row.consent_to_publish_attribution ? row.attribution_name : null,
    attributionUrl: row.consent_to_publish_attribution ? row.attribution_url : null,
    consentToPublishAttribution: row.consent_to_publish_attribution,
    status: row.status,
    createdAt: row.created_at,
    reviewedAt: row.reviewed_at,
    publishedFeatureId: row.published_feature_id,
  }));

  const catalog: AdminCatalogRequest[] = ((catalogResult.data ?? []) as CatalogRow[]).map((row) => ({
    dedupeKey: row.dedupe_key,
    make: row.make,
    model: row.model,
    year: row.year,
    requestingUsers: row.requesting_users,
    totalRequests: row.total_requests,
    lastRequestedAt: row.last_requested_at,
  }));

  const features: AdminFeature[] = ((featuresResult.data ?? []) as FeatureRow[]).map((row) => ({
    id: row.id,
    title: titleForAdmin(row.title),
    status: row.status,
    source: row.source,
    published: row.published,
    voteCount: row.vote_count,
    updatedAt: row.updated_at,
  }));

  return {
    generatedAt: new Date().toISOString(),
    counts: {
      newFeedback: feedbackCountResult.count ?? 0,
      pendingIdeas: ideasCountResult.count ?? 0,
      totalVotes: features.reduce((sum, feature) => sum + feature.voteCount, 0),
      catalogRequests: catalog.reduce((sum, item) => sum + item.totalRequests, 0),
    },
    feedback,
    ideas,
    catalog,
    features,
    activation,
    vehicleInventory,
  };
}

export async function updateAdminItem(input: { kind: "feedback"; id: string; status: FeedbackStatus } | { kind: "idea"; id: string; status: IdeaStatus }) {
  const client = serverClient();
  const query = input.kind === "feedback"
    ? client.from("feedback").update({ status: input.status }).eq("id", input.id).select("id").single()
    : client
      .from("eliyo_lab_ideas")
      .update({ status: input.status, reviewed_at: input.status === "pending" ? null : new Date().toISOString() })
      .eq("id", input.id)
      .select("id")
      .single();
  const { error } = await query;
  if (error) throw error;
}
