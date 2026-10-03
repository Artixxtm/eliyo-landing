"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Bell, CarFront, Check, ChevronDown, FileText, Gauge, ScanLine, ShieldCheck, Wrench } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { copy, locales, type Locale } from "./site-copy";

type SubmitState = "idle" | "loading" | "success" | "duplicate" | "error";

function Brand() {
  return <a className="brand" href="#top" aria-label="Eliyo home"><span className="brand-mark"><img src="/eliyo-mark.svg" alt="" /></span><span>Eliyo</span></a>;
}

function LanguageSwitch({ locale, onChange, compact = false }: { locale: Locale; onChange: (locale: Locale) => void; compact?: boolean }) {
  return <div className={compact ? "locale-switch footer-locales" : "locale-switch"} aria-label="Language">{locales.map((item) => <button key={item.id} type="button" className={locale === item.id ? "active" : ""} aria-pressed={locale === item.id} onClick={() => onChange(item.id)}>{item.label}</button>)}</div>;
}

function ProductPhone({ step, text }: { step: number; text: readonly string[] }) {
  return (
    <div className="product-phone" aria-live="polite">
      <div className="phone-hardware"><span>9:41</span><i /><span>● ◒</span></div>
      <div className="phone-screen" key={step}>
        {step === 0 && <div className="phone-add"><span className="phone-logo"><img src="/eliyo-mark.svg" alt="" /></span><div><small>01 / 03</small><h3>{text[0]}</h3><p>{text[1]}</p></div><button type="button"><ScanLine size={19} />{text[2]}<ArrowRight size={18} /></button><button type="button" className="phone-secondary"><CarFront size={19} />{text[3]}<ArrowRight size={18} /></button></div>}
        {step === 1 && <div className="phone-home"><div className="mini-home-head"><div><h3>{text[4]}</h3><p>{text[5]}</p></div><span>A</span></div><div className="mini-car-card"><div><b>Citroën</b><small>C3 · 2009</small></div><img src="/vehicle-cutout-neutral.webp" alt="" /></div><div className="mini-home-grid"><article><small>{text[6]}</small><b>{text[7]}</b><strong>~798 km</strong></article><article><Gauge size={17} /><small>Mileage</small><b>202,656 km</b></article><article><FileText size={17} /><small>Documents</small><b>4 files</b></article></div></div>}
        {step === 2 && <div className="phone-maintenance"><div className="mini-maintenance-head"><span><Wrench size={18} /></span><small>{text[6]}</small></div><h3>{text[7]}</h3><p>{text[8]}</p><div className="service-dial"><div><strong>798</strong><small>km</small></div></div><article><span><Check size={16} /></span><div><b>{text[9]}</b><small>{text[10]}</small></div></article></div>}
      </div>
      <div className="phone-home-indicator" />
    </div>
  );
}

export function LandingPage() {
  const [locale, setLocale] = useState<Locale>("en");
  const [activeStep, setActiveStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const t = copy[locale];

  const changeLocale = useCallback((next: Locale) => {
    setLocale(next);
    localStorage.setItem("eliyo-locale", next);
    document.documentElement.lang = locales.find((item) => item.id === next)?.lang ?? "en";
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("eliyo-locale") as Locale | null;
    const browser = navigator.language.toLowerCase();
    const detected: Locale = browser.startsWith("uk") ? "uk" : browser.startsWith("pl") ? "pl" : browser.startsWith("ru") ? "ru" : "en";
    changeLocale(saved && copy[saved] ? saved : detected);
  }, [changeLocale]);

  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
    reveals.forEach((item) => revealObserver.observe(item));
    const steps = document.querySelectorAll<HTMLElement>("[data-how-step]");
    const stepObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveStep(Number((visible.target as HTMLElement).dataset.howStep));
    }, { rootMargin: "-30% 0px -45% 0px", threshold: [0.15, 0.4, 0.7] });
    steps.forEach((item) => stepObserver.observe(item));
    return () => { revealObserver.disconnect(); stepObserver.disconnect(); };
  }, []);

  const joinWaitlist = useCallback(async (email: string) => {
    const value = email.trim().toLowerCase();
    const words = copy[locale].download;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { setSubmitState("error"); setMessage(words[10]); emailRef.current?.focus(); throw new Error(words[10]); }
    setSubmitState("loading"); setMessage("");
    try {
      const response = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: value, platform: "both" }) });
      const payload = (await response.json()) as { status?: "joined" | "already_joined"; error?: string };
      if (!response.ok) throw new Error(payload.error || words[11]);
      const duplicate = payload.status === "already_joined";
      setSubmitState(duplicate ? "duplicate" : "success"); setMessage(duplicate ? words[9] : words[8]);
      return { status: payload.status, email: value };
    } catch (error) { setSubmitState("error"); setMessage(error instanceof Error ? error.message : words[11]); throw error; }
  }, [locale]);

  useEffect(() => {
    type ModelContext = { registerTool: (tool: { name: string; title: string; description: string; inputSchema: object; annotations: { readOnlyHint: boolean; untrustedContentHint: boolean }; execute: (input: unknown) => Promise<unknown> }, options: { signal: AbortSignal }) => void | Promise<void> };
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const controller = new AbortController();
    void Promise.resolve(context.registerTool({ name: "join_eliyo_early_access", title: "Join Eliyo early access", description: "Add an email address to the Eliyo iPhone and Android launch list.", inputSchema: { type: "object", properties: { email: { type: "string", format: "email" } }, required: ["email"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, async execute(input) { const value = input as { email?: unknown }; if (typeof value.email !== "string") throw new Error("email must be a string"); document.querySelector("#download")?.scrollIntoView({ behavior: "smooth" }); return joinWaitlist(value.email); } }, { signal: controller.signal })).catch(() => undefined);
    return () => controller.abort();
  }, [joinWaitlist]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try { await joinWaitlist(String(data.get("email") || "")); } catch { /* visible status handles errors */ }
  }

  return (
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <header className="site-header"><Brand /><nav className="main-nav" aria-label="Primary navigation"><a href="#why">{t.nav[0]}</a><a href="#how">{t.nav[1]}</a><a href="#faq">{t.nav[2]}</a><a href="#download">{t.nav[3]}</a></nav><LanguageSwitch locale={locale} onChange={changeLocale} /></header>
        <div className="hero-copy" data-reveal><p className="kicker"><span />{t.hero[0]}</p><h1 id="hero-title">{t.hero[1]}</h1><p className="hero-lede">{t.hero[2]}</p><div className="hero-actions"><a className="primary-button" href="#download">{t.hero[3]}<ArrowRight size={18} /></a><a className="text-button" href="#how">{t.hero[4]}<ArrowDown size={17} /></a></div><p className="platform-line">{t.hero[5]}</p></div>
        <div className="hero-object" data-reveal><div className="hero-object-grid" aria-hidden="true" /><p className="hero-object-word" aria-hidden="true">ELIYO</p><img className="hero-device" src="/eliyo-home-device.jpg" width="1200" height="1480" alt="Eliyo home screen showing a Citroën C3, mileage and upcoming oil service" /><img className="hero-mascot" src="/eliyo-v4-mascot-cutout.png" width="1250" height="1834" alt="" /><article className="floating-product floating-oil"><span><Wrench size={17} /></span><div><small>{t.cards[0]}</small><strong>{t.cards[1]}</strong></div></article><article className="floating-product floating-insurance"><span><ShieldCheck size={17} /></span><div><small>{t.cards[2]}</small><strong>{t.cards[3]}</strong></div></article><article className="floating-product floating-calm"><span><Check size={17} /></span><div><small>{t.cards[4]}</small><strong>{t.cards[5]}</strong></div></article></div>
      </section>

      <section className="why-section" id="why" aria-labelledby="why-title">
        <div className="section-heading" data-reveal><p className="kicker"><span />{t.why.kicker}</p><h2 id="why-title">{t.why.title}</h2></div>
        <div className="why-stories">
          <article className="why-story maintenance-story" data-reveal><div className="why-copy"><span>01</span><h3>{t.why.items[0][0]}</h3><strong>{t.why.items[0][1]}</strong><p>{t.why.items[0][2]}</p></div><div className="maintenance-fragment"><div className="fragment-top"><small>{t.why.labels[0]}</small><span><Wrench size={18} /></span></div><strong>~798</strong><em>km</em><p>{t.why.labels[3]}</p><div className="fragment-progress"><span /></div></div></article>
          <article className="why-story history-story" data-reveal><div className="why-copy"><span>02</span><h3>{t.why.items[1][0]}</h3><strong>{t.why.items[1][1]}</strong><p>{t.why.items[1][2]}</p></div><div className="timeline-fragment"><small>{t.why.labels[1]}</small><div><i><Wrench size={15} /></i><p><strong>{t.why.labels[4]}</strong><span>{t.why.labels[7]} · 193,454 km</span></p></div><div><i><Gauge size={15} /></i><p><strong>{t.why.labels[5]}</strong><span>+642 km</span></p></div></div></article>
          <article className="why-story reminder-story" data-reveal><div className="why-copy"><span>03</span><h3>{t.why.items[2][0]}</h3><strong>{t.why.items[2][1]}</strong><p>{t.why.items[2][2]}</p></div><div className="reminder-fragment"><div className="fragment-top"><small>{t.why.labels[2]}</small><span><Bell size={18} /></span></div><div><ShieldCheck size={26} /><p><strong>{t.why.labels[6]}</strong><span>{t.why.labels[8]}</span></p></div><button type="button"><Check size={16} /> Eliyo</button></div></article>
        </div>
      </section>

      <section className="how-section" id="how" aria-labelledby="how-title">
        <div className="how-intro" data-reveal><p className="kicker"><span />{t.how.kicker}</p><h2 id="how-title">{t.how.title}</h2><p>{t.how.intro}</p></div>
        <div className="how-layout"><div className="how-steps">{t.how.steps.map((step, index) => <article key={step[0]} className={activeStep === index ? "how-step active" : "how-step"} data-how-step={index} onMouseEnter={() => setActiveStep(index)} onFocus={() => setActiveStep(index)} tabIndex={0}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step[0]}</h3><p>{step[1]}</p></div><i /></article>)}</div><div className="how-phone-stage"><div className="phone-shadow" /><ProductPhone step={activeStep} text={t.how.phone} /><div className="step-dots" aria-hidden="true">{t.how.steps.map((_, index) => <span className={activeStep === index ? "active" : ""} key={index} />)}</div></div></div>
      </section>

      <section className="faq-section" id="faq" aria-labelledby="faq-title"><div className="faq-heading" data-reveal><p className="kicker"><span />{t.faq.kicker}</p><h2 id="faq-title">{t.faq.title}</h2><img src="/eliyo-v4-peek-healthy.png" width="671" height="1008" alt="" /></div><Accordion className="faq-list" type="single" collapsible>{t.faq.items.map(([question, answer], index) => <AccordionItem value={`faq-${index}`} key={question} data-reveal><AccordionTrigger><span>{String(index + 1).padStart(2, "0")}</span><b>{question}</b><i><ChevronDown size={19} /></i></AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}</Accordion></section>

      <section className="download-section" id="download" aria-labelledby="download-title"><div className="download-grid" aria-hidden="true" /><img className="download-mascot" src="/eliyo-v4-mascot-cutout.png" width="1250" height="1834" alt="" /><div className="download-copy" data-reveal><p className="kicker"><span />{t.download[0]}</p><h2 id="download-title">{t.download[1]}</h2><p>{t.download[2]}</p><form className="waitlist-form" onSubmit={handleSubmit} noValidate><label htmlFor="waitlist-email">{t.download[3]}</label><div><input ref={emailRef} id="waitlist-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder={t.download[3]} disabled={submitState === "loading" || submitState === "success"} required /><button type="submit" disabled={submitState === "loading" || submitState === "success"}>{submitState === "loading" ? t.download[5] : submitState === "success" ? t.download[6] : t.download[4]}{submitState === "success" ? <Check size={18} /> : <ArrowRight size={18} />}</button></div><p className={submitState === "error" ? "form-status error" : "form-status"} aria-live="polite">{message || t.download[7]}</p></form><p className="download-platforms"><span>iPhone · iOS</span><span>Android</span></p></div></section>

      <footer><div className="footer-main"><Brand /><p>{t.footer[0]}</p><div className="footer-links"><span>{t.footer[2]}</span><span>{t.footer[3]}</span><span>{t.footer[1]}</span><span>{t.footer[4]}</span></div></div><div className="footer-bottom"><span>© 2026 Eliyo</span><LanguageSwitch locale={locale} onChange={changeLocale} compact /></div></footer>
    </main>
  );
}
