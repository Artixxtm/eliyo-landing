"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AdminDashboardData, FeedbackStatus, IdeaStatus } from "@/lib/eliyo-admin-types";
import styles from "./admin.module.css";

type Tab = "feedback" | "ideas" | "vehicles" | "catalog" | "features";

const feedbackStatuses: FeedbackStatus[] = ["new", "reviewed", "planned", "closed"];
const ideaStatuses: IdeaStatus[] = ["pending", "approved", "rejected", "published"];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function percentage(value: number, total: number) {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

function Meta({ children }: { children: ReactNode }) {
  return <span className={styles.meta}>{children}</span>;
}

export function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [adminEmail, setAdminEmail] = useState("");
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [tab, setTab] = useState<Tab>("feedback");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/internal/ops/data", { cache: "no-store", credentials: "same-origin" });
      if (response.status === 401) {
        setAuthenticated(false);
        setData(null);
        return;
      }
      if (!response.ok) throw new Error("Could not load the dashboard.");
      setData(await response.json());
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not load the dashboard.");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/internal/ops/session", { cache: "no-store", credentials: "same-origin" })
      .then(async (response) => {
        if (!active) return;
        if (!response.ok) {
          setAuthenticated(false);
          return;
        }
        const session = await response.json();
        setAdminEmail(session.email || "");
        setAuthenticated(true);
        await loadData();
      })
      .catch(() => active && setAuthenticated(false));
    return () => { active = false; };
  }, [loadData]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/internal/ops/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", "x-eliyo-admin": "1" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Invalid credentials.");
      setAdminEmail(String(form.get("email") || ""));
      setAuthenticated(true);
      await loadData();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Invalid credentials.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/internal/ops/logout", { method: "POST", credentials: "same-origin", headers: { "x-eliyo-admin": "1" } });
    setAuthenticated(false);
    setData(null);
    setAdminEmail("");
  }

  async function updateStatus(kind: "feedback" | "idea", id: string, status: FeedbackStatus | IdeaStatus) {
    setUpdating(id);
    setError("");
    try {
      const response = await fetch("/api/internal/ops/item", {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", "x-eliyo-admin": "1" },
        body: JSON.stringify({ kind, id, status }),
      });
      if (!response.ok) {
        if (response.status === 401) setAuthenticated(false);
        throw new Error("Could not update this item.");
      }
      await loadData();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not update this item.");
    } finally {
      setUpdating(null);
    }
  }

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!data || !normalizedQuery) return data;
    return {
      ...data,
      feedback: data.feedback.filter((item) => `${item.type} ${item.message} ${item.replyEmail || ""} ${item.platform} ${item.status}`.toLowerCase().includes(normalizedQuery)),
      ideas: data.ideas.filter((item) => `${item.title} ${item.description || ""} ${item.locale} ${item.status}`.toLowerCase().includes(normalizedQuery)),
      catalog: data.catalog.filter((item) => `${item.make} ${item.model} ${item.year}`.toLowerCase().includes(normalizedQuery)),
      features: data.features.filter((item) => `${item.id} ${item.title} ${item.status}`.toLowerCase().includes(normalizedQuery)),
      vehicleInventory: {
        ...data.vehicleInventory,
        models: data.vehicleInventory.models.filter((item) =>
          `${item.make} ${item.model} ${item.minYear} ${item.maxYear}`.toLowerCase().includes(normalizedQuery),
        ),
      },
    };
  }, [data, normalizedQuery]);

  if (authenticated === null) {
    return <main className={styles.loading}><span className={styles.pulse} />Checking access</main>;
  }

  if (!authenticated) {
    return (
      <main className={styles.loginPage}>
        <section className={styles.loginCard}>
          <div className={styles.brand}><Image src="/eliyo-mark.svg" alt="" width={38} height={38} priority /><span>Eliyo</span></div>
          <p className={styles.eyebrow}>Private operations</p>
          <h1>Control center.</h1>
          <p className={styles.loginIntro}>Sign in with the approved Eliyo account. Access is verified against production authentication.</p>
          <form onSubmit={login} className={styles.loginForm}>
            <label>Email<input name="email" type="email" autoComplete="username" required /></label>
            <label>Password<input name="password" type="password" autoComplete="current-password" minLength={8} required /></label>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button type="submit" disabled={busy}>{busy ? "Checking…" : "Continue"}</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}><Image src="/eliyo-mark.svg" alt="" width={38} height={38} priority /><span>Eliyo</span></div>
        <nav aria-label="Dashboard sections">
          {(["feedback", "ideas", "vehicles", "catalog", "features"] as Tab[]).map((item) => (
            <button key={item} className={tab === item ? styles.activeNav : ""} type="button" onClick={() => setTab(item)}>
              <span>{item === "feedback" ? "Feedback" : item === "ideas" ? "Lab ideas" : item === "vehicles" ? "Vehicle mix" : item === "catalog" ? "Catalog requests" : "Feature votes"}</span>
              <small>{item === "feedback" ? data?.counts.newFeedback : item === "ideas" ? data?.counts.pendingIdeas : item === "vehicles" ? data?.vehicleInventory.total : item === "catalog" ? data?.catalog.length : data?.features.length}</small>
            </button>
          ))}
        </nav>
        <div className={styles.account}><span>{adminEmail}</span><button type="button" onClick={logout}>Sign out</button></div>
      </aside>

      <section className={styles.content}>
        <header className={styles.topbar}>
          <div><p className={styles.eyebrow}>Eliyo operations</p><h1>Dashboard</h1></div>
          <div className={styles.actions}>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search current data" aria-label="Search current data" />
            <button type="button" onClick={loadData} disabled={busy}>{busy ? "Refreshing…" : "Refresh"}</button>
          </div>
        </header>

        {error && <p className={styles.errorBanner} role="alert">{error}</p>}

        <section className={styles.metrics} aria-label="Overview">
          <button type="button" onClick={() => setTab("feedback")}><span>New feedback</span><strong>{data?.counts.newFeedback ?? "—"}</strong></button>
          <button type="button" onClick={() => setTab("ideas")}><span>Ideas to review</span><strong>{data?.counts.pendingIdeas ?? "—"}</strong></button>
          <button type="button" onClick={() => setTab("features")}><span>Feature votes</span><strong>{data?.counts.totalVotes ?? "—"}</strong></button>
          <button type="button" onClick={() => setTab("catalog")}><span>Catalog demand</span><strong>{data?.counts.catalogRequests ?? "—"}</strong></button>
          <button type="button" onClick={() => setTab("vehicles")}><span>Total vehicles</span><strong>{data?.vehicleInventory.total ?? "—"}</strong></button>
        </section>

        {data && <section className={styles.activation} aria-label="Activation and retention">
          <div className={styles.activationHeading}>
            <div><p>Product health</p><h2>Activation</h2></div>
            <span>{data.activation.source === "instrumented" ? "App activity · legacy accounts backfilled from sign-ins" : "Sign-in proxy until lifecycle migration is live"}</span>
          </div>
          <div className={styles.activationGrid}>
            {[
              {
                label: "Added a vehicle",
                value: data.activation.vehicleUsers,
                total: data.activation.totalUsers,
                note: "of all accounts",
              },
              {
                label: "Initial setup complete",
                value: data.activation.setupUsers,
                total: data.activation.totalUsers,
                note: "of all accounts",
              },
              {
                label: "Returned in days 3–7",
                value: data.activation.returnedUsers,
                total: data.activation.returnEligibleUsers,
                note: "of fully observed cohorts",
              },
            ].map((metric) => {
              const rate = percentage(metric.value, metric.total);
              return <article key={metric.label} className={styles.activationCard}>
                <div><span>{metric.label}</span><strong>{rate}%</strong></div>
                <p>{metric.value} of {metric.total} · {metric.note}</p>
                <div className={styles.progress} aria-hidden="true"><span style={{ width: `${rate}%` }} /></div>
              </article>;
            })}
          </div>
        </section>}

        <div className={styles.sectionHeading}>
          <div><p>{tab === "feedback" ? "Inbox" : tab === "ideas" ? "Community" : tab === "vehicles" ? "Garage data" : tab === "catalog" ? "Vehicle data" : "Roadmap"}</p><h2>{tab === "feedback" ? "App feedback" : tab === "ideas" ? "Submitted ideas" : tab === "vehicles" ? "Vehicle mix" : tab === "catalog" ? "Missing vehicles" : "Published features"}</h2></div>
          {data && <span>Updated {formatDate(data.generatedAt)}</span>}
        </div>

        {tab === "feedback" && <div className={styles.list}>
          {filtered?.feedback.map((item) => <article className={styles.item} key={item.id}>
            <div className={styles.itemMain}>
              <div className={styles.itemMeta}>
                <span className={`${styles.badge} ${styles[item.type]}`}>{item.type}</span>
                <Meta>{formatDate(item.createdAt)}</Meta>
                <Meta>{item.platform}{item.appVersion ? ` · ${item.appVersion}` : ""}{item.buildVersion ? ` (${item.buildVersion})` : ""}{item.runtime ? ` · ${item.runtime}` : ""}</Meta>
              </div>
              <p className={styles.message}>{item.message}</p>
              <div className={styles.details}>
                {item.deviceModel && <span>{item.deviceModel}{item.osVersion ? ` · ${item.osVersion}` : ""}</span>}
                {item.locale && <span>Locale: {item.locale}</span>}
                <span className={styles.technical}>User: {item.userId}</span>
                {item.vehicleId && <span className={styles.technical}>Vehicle: {item.vehicleId}</span>}
                {item.wantsReply && item.replyEmail && <span>Reply: {item.replyEmail}</span>}
                {item.screenshotUrl && <a href={item.screenshotUrl} target="_blank" rel="noopener noreferrer">Open screenshot ↗</a>}
              </div>
            </div>
            <select value={item.status} disabled={updating === item.id} onChange={(event) => updateStatus("feedback", item.id, event.target.value as FeedbackStatus)} aria-label={`Status for feedback ${item.id}`}>
              {feedbackStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </article>)}
          {!filtered?.feedback.length && <p className={styles.empty}>No feedback found.</p>}
        </div>}

        {tab === "ideas" && <div className={styles.list}>
          {filtered?.ideas.map((item) => <article className={styles.item} key={item.id}>
            <div className={styles.itemMain}>
              <div className={styles.itemMeta}><span className={`${styles.badge} ${styles.idea}`}>idea</span><Meta>{item.locale.toUpperCase()}</Meta><Meta>{formatDate(item.createdAt)}</Meta><Meta>{item.id}</Meta></div>
              <h3>{item.title}</h3>
              {item.description && <p className={styles.message}>{item.description}</p>}
              <div className={styles.details}>
                <span>{item.consentToPublishAttribution ? "Attribution allowed" : "Anonymous submission"}</span>
                {item.attributionName && <span>By {item.attributionName}</span>}
                {item.attributionUrl && <a href={item.attributionUrl} target="_blank" rel="noopener noreferrer">Profile ↗</a>}
                {item.reviewedAt && <span>Reviewed {formatDate(item.reviewedAt)}</span>}
                {item.publishedFeatureId && <span>Feature: {item.publishedFeatureId}</span>}
              </div>
            </div>
            <select value={item.status} disabled={updating === item.id} onChange={(event) => updateStatus("idea", item.id, event.target.value as IdeaStatus)} aria-label={`Status for idea ${item.id}`}>
              {ideaStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </article>)}
          {!filtered?.ideas.length && <p className={styles.empty}>No ideas found.</p>}
        </div>}

        {tab === "vehicles" && data && <>
          <div className={styles.inventorySummary} aria-label="Vehicle inventory summary">
            <div><span>Active</span><strong>{data.vehicleInventory.active}</strong></div>
            <div><span>Archived</span><strong>{data.vehicleInventory.archived}</strong></div>
            <div><span>Makes</span><strong>{data.vehicleInventory.uniqueMakes}</strong></div>
            <div><span>Models</span><strong>{data.vehicleInventory.uniqueModels}</strong></div>
          </div>
          <div className={styles.tableWrap}><table><thead><tr><th>Make &amp; model</th><th>Years</th><th>Total</th><th>Active</th><th>Archived</th></tr></thead><tbody>
            {filtered?.vehicleInventory.models.map((item) => <tr key={item.key}><td><strong>{item.make} {item.model}</strong></td><td>{item.minYear === item.maxYear ? item.minYear : `${item.minYear}–${item.maxYear}`}</td><td>{item.total}</td><td>{item.active}</td><td>{item.archived}</td></tr>)}
          </tbody></table>{!filtered?.vehicleInventory.models.length && <p className={styles.empty}>No vehicles found.</p>}</div>
        </>}

        {tab === "catalog" && <div className={styles.tableWrap}><table><thead><tr><th>Vehicle</th><th>Year</th><th>Users</th><th>Requests</th><th>Last request</th></tr></thead><tbody>
          {filtered?.catalog.map((item) => <tr key={item.dedupeKey}><td><strong>{item.make} {item.model}</strong></td><td>{item.year}</td><td>{item.requestingUsers}</td><td>{item.totalRequests}</td><td>{formatDate(item.lastRequestedAt)}</td></tr>)}
        </tbody></table>{!filtered?.catalog.length && <p className={styles.empty}>No catalog requests found.</p>}</div>}

        {tab === "features" && <div className={styles.list}>
          {filtered?.features.map((item) => <article className={`${styles.item} ${styles.feature}`} key={item.id}><div><div className={styles.itemMeta}><Meta>{item.id}</Meta><span className={styles.badge}>{item.status}</span><Meta>{item.source}</Meta>{!item.published && <Meta>Hidden</Meta>}<Meta>Updated {formatDate(item.updatedAt)}</Meta></div><h3>{item.title}</h3></div><strong className={styles.votes}>{item.voteCount}<small>votes</small></strong></article>)}
          {!filtered?.features.length && <p className={styles.empty}>No features found.</p>}
        </div>}
      </section>
    </main>
  );
}
