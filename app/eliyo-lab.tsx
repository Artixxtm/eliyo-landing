"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { LabFeature, LabLocale } from "@/lib/eliyo-lab-types";
import { labCopy } from "./lab-copy";

type LabResponse = { features: LabFeature[] };

export function EliyoLab({ locale, standalone = false }: { locale: LabLocale; standalone?: boolean }) {
  const t = labCopy[locale];
  const sectionRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const suggestButtonRef = useRef<HTMLButtonElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [features, setFeatures] = useState<LabFeature[]>([]);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [pendingVotes, setPendingVotes] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [publishCredit, setPublishCredit] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadState("loading");
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px", threshold: 0.01 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const controller = new AbortController();
    fetch(`/api/lab?locale=${locale}`, { credentials: "same-origin", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Lab unavailable");
        return response.json() as Promise<LabResponse>;
      })
      .then((data) => {
        setFeatures(data.features);
        setLoadState("ready");
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") setLoadState("error");
      });
    return () => controller.abort();
  }, [locale, shouldLoad]);

  useEffect(() => {
    if (!formOpen) return;

    const previousOverflow = document.body.style.overflow;
    const focusFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLInputElement>('input[name="title"]')?.focus();
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFormOpen(false);
        window.setTimeout(() => suggestButtonRef.current?.focus(), 0);
        return;
      }

      if (event.key === "Tab") {
        const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ) ?? []);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [formOpen]);

  function closeIdeaForm() {
    setFormOpen(false);
    window.setTimeout(() => suggestButtonRef.current?.focus(), 0);
  }

  async function vote(featureId: string) {
    if (pendingVotes.has(featureId)) return;
    const previous = features;
    setMessage("");
    setPendingVotes((current) => new Set(current).add(featureId));
    setFeatures((current) => current.map((feature) => feature.id === featureId
      ? { ...feature, voted: !feature.voted, voteCount: Math.max(0, feature.voteCount + (feature.voted ? -1 : 1)) }
      : feature));

    try {
      const response = await fetch("/api/lab", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_vote", featureId }),
      });
      if (!response.ok) throw new Error("Vote failed");
      const result = await response.json() as { voted: boolean; voteCount: number };
      setFeatures((current) => current.map((feature) => feature.id === featureId
        ? { ...feature, voted: result.voted, voteCount: result.voteCount }
        : feature));
    } catch {
      setFeatures(previous);
      setMessage(t.voteError);
    } finally {
      setPendingVotes((current) => {
        const next = new Set(current);
        next.delete(featureId);
        return next;
      });
    }
  }

  async function submitIdea(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitState("sending");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/lab", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit_idea",
          locale,
          title: data.get("title"),
          description: data.get("description"),
          attributionName: data.get("attributionName"),
          attributionUrl: data.get("attributionUrl"),
          consentToPublishAttribution: publishCredit,
          company: data.get("company"),
        }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) {
        setSubmitMessage(result.error === "rate_limited" ? t.form.rateLimited : t.form.error);
        setSubmitState("error");
        return;
      }
      form.reset();
      setPublishCredit(false);
      setSubmitMessage(t.form.success);
      setSubmitState("success");
    } catch {
      setSubmitMessage(t.form.error);
      setSubmitState("error");
    }
  }

  return (
    <section className={`lab-section${standalone ? " lab-section--standalone" : ""}`} id="lab" aria-labelledby="lab-title" ref={sectionRef}>
      <div className="lab-shell">
        <header className="lab-header">
          {standalone ? <h1 id="lab-title">{t.title}</h1> : <h2 id="lab-title">{t.title}</h2>}
        </header>

        <div className="lab-list" aria-busy={loadState === "loading"}>
          {(loadState === "idle" || loadState === "loading") && Array.from({ length: 4 }, (_, index) => <div className="lab-card lab-card--loading" key={index}><span /><strong /><i /></div>)}
          {loadState === "error" && <p className="lab-state">{t.unavailable}</p>}
          {loadState === "ready" && features.map((feature) => (
            <article className="lab-card" key={feature.id}>
              <div className="lab-card__meta"><span>{feature.id}</span><strong data-status={feature.status}>{t.statuses[feature.status]}</strong></div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              {feature.source === "community" && <small>{t.community}{feature.attributionName ? ` ${t.by} ${feature.attributionName}` : ""}</small>}
              <button className={feature.voted ? "lab-vote is-voted" : "lab-vote"} type="button" aria-pressed={feature.voted} disabled={pendingVotes.has(feature.id)} onClick={() => vote(feature.id)}>
                <span aria-hidden="true">↑</span><strong>{feature.voteCount}</strong><em>{feature.voted ? t.voted : t.vote}</em>
              </button>
            </article>
          ))}
        </div>
        {message && <p className="lab-vote-message" role="status">{message}</p>}

        <div className="lab-suggest-card">
          <div className="lab-suggest-card__copy">
            <p>{t.suggestLead}</p>
            <span>{t.suggestSupport}</span>
          </div>
          <button ref={suggestButtonRef} className="lab-suggest" type="button" aria-expanded={formOpen} aria-controls="lab-idea-form" onClick={() => setFormOpen(true)}>
            {t.suggest}<span aria-hidden="true">↗</span>
          </button>
        </div>

      </div>

      {formOpen && typeof document !== "undefined" && createPortal(
        <div className="lab-modal" onMouseDown={(event) => event.target === event.currentTarget && closeIdeaForm()}>
          <div className="lab-modal__dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="lab-idea-form-title">
            <button className="lab-modal__close" type="button" aria-label={t.form.cancel} onClick={closeIdeaForm}>×</button>
            <form className="lab-idea-form" id="lab-idea-form" onSubmit={submitIdea}>
              <div className="lab-idea-form__heading"><h3 id="lab-idea-form-title">{t.form.title}</h3><p>{t.form.intro}</p></div>
              <label>{t.form.ideaLabel}<input name="title" required minLength={3} maxLength={120} placeholder={t.form.ideaPlaceholder} /></label>
              <label>{t.form.detailsLabel}<textarea name="description" maxLength={1000} rows={4} placeholder={t.form.detailsPlaceholder} /></label>
              <label className="lab-honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
              <div className="lab-credit">
                <label className="lab-credit-toggle">
                  <input type="checkbox" checked={publishCredit} aria-expanded={publishCredit} aria-controls="lab-credit-fields" onChange={(event) => setPublishCredit(event.target.checked)} />
                  <svg className="lab-credit-check" viewBox="0 0 24 24" aria-hidden="true">
                    <rect width="24" height="24" rx="8" fill={publishCredit ? "#6b58de" : "#ffffff"} />
                    {publishCredit && <path d="m6.5 12 3.5 3.5 7.5-8" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />}
                  </svg>
                  <span>{t.form.attributionToggle}</span>
                </label>
                <p className="lab-form-note">{t.form.privacy}</p>
              </div>
              {publishCredit && <div className="lab-credit-fields" id="lab-credit-fields">
                <label>{t.form.nameLabel}<input name="attributionName" maxLength={80} placeholder={t.form.namePlaceholder} /></label>
                <label>{t.form.urlLabel}<input name="attributionUrl" type="url" maxLength={300} placeholder={t.form.urlPlaceholder} /></label>
              </div>}
              <div className="lab-form-actions">
                <button className="lab-form-submit" type="submit" disabled={submitState === "sending"}>{submitState === "sending" ? t.form.sending : t.form.submit}</button>
                <button className="lab-form-cancel" type="button" onClick={closeIdeaForm}>{t.form.cancel}</button>
                {submitMessage && <span role="status" className={submitState === "error" ? "is-error" : ""}>{submitMessage}</span>}
              </div>
            </form>
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}
