"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDown, ArrowUpRight, Bell, CalendarDays, Camera, Check, ChevronDown,
  FileText, Gauge, Link2, Plus, ShieldCheck, WalletCards, Wrench,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

type Platform = "both" | "iphone" | "android";
type SubmitState = "idle" | "loading" | "success" | "duplicate" | "error";

const faq = [
  ["Does Eliyo work with my car?", "Yes. You can add a vehicle manually, so Eliyo doesn’t require a connected car to be useful."],
  ["Does my car need Bluetooth or an internet connection?", "No. Core vehicle tracking works without a direct connection to your car. Supported vehicles can optionally connect for additional automation."],
  ["Can Eliyo track more than one car?", "Yes. Your garage can contain multiple vehicles, each with its own history, mileage and maintenance."],
  ["What does Eliyo know about my car?", "Eliyo uses the information you add — such as vehicle details, mileage, maintenance and history — to give you more relevant information and reminders."],
  ["Is Eliyo an AI chatbot?", "Not really. Chat is only one part of Eliyo. It works with the information already stored about your vehicle, so you can ask about your actual car instead of starting from scratch every time."],
  ["Is Eliyo free?", "Yes. Eliyo has a free plan, with Eliyo+ available for additional features."],
] as const;

const features = [
  { icon: Wrench, title: "Maintenance", copy: "Know what’s coming.", className: "bento-wide bento-violet" },
  { icon: Gauge, title: "Mileage", copy: "Keep it current.", className: "bento-small" },
  { icon: CalendarDays, title: "Timeline", copy: "See the whole history.", className: "bento-tall bento-dark" },
  { icon: FileText, title: "Documents", copy: "Keep the important stuff close.", className: "bento-small" },
  { icon: WalletCards, title: "Expenses", copy: "Know what the car costs you.", className: "bento-small bento-warm" },
  { icon: Wrench, title: "Eliyo Assistant", copy: "Ask in plain language.", className: "bento-wide bento-soft", mark: true },
  { icon: Plus, title: "Multiple vehicles", copy: "One garage for all of them.", className: "bento-small" },
  { icon: Bell, title: "Reminders", copy: "Before things become overdue.", className: "bento-small" },
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Eliyo home">
      <span className="brand-mark"><img src="/elio-mark.svg" alt="" /></span>
      <span>Eliyo</span>
    </a>
  );
}

function HomeMockup() {
  return (
    <div className="phone home-phone">
      <div className="phone-bar"><span>9:41</span><span>•••</span></div>
      <div className="app-head">
        <div><strong>Evening, Artem.</strong><small>Your Citroën is doing fine.</small></div>
        <span className="avatar">A</span>
      </div>
      <div className="car-panel">
        <div className="vehicle-label">
          <span className="make-dot"><img src="/citroen.png" alt="" /></span>
          <div><strong>Citroën</strong><small>C3 · 2009</small></div><span>⌄</span>
        </div>
        <img className="car-image" src="/vehicle-cutout-neutral.webp" alt="White Citroën C3" width="768" height="512" />
        <img className="mascot-peek" src="/elio-peek-healthy.webp" alt="" width="360" height="541" />
      </div>
      <div className="app-grid">
        <article className="app-card service-card"><small>Next service</small><strong>Oil service</strong><div><b>~1,240 km</b><small>remaining</small></div></article>
        <article className="app-card mileage-card"><small>Mileage</small><strong>128,420 km</strong><span>Updated today</span></article>
        <article className="app-card spend-card"><small>This year</small><strong>€840</strong><span>in car costs</span></article>
        <article className="app-card insight-card"><small>Eliyo noticed</small><strong>Everything looks calm.</strong><span>I’ll keep an eye on what’s next.</span></article>
      </div>
      <div className="tab-bar" aria-hidden="true"><span>⌂</span><span>▱</span><b><img src="/elio-mark.svg" alt="" /></b><span>◷</span><span>○</span></div>
    </div>
  );
}

function TimelineMockup() {
  const entries = [
    { icon: Wrench, date: "Today", title: "Oil changed", detail: "128,420 km · €129", current: true },
    { icon: Gauge, date: "12 Aug", title: "Mileage updated", detail: "+642 km · Camera" },
    { icon: ShieldCheck, date: "28 Jun", title: "Insurance renewed", detail: "Valid until Jun 2027" },
    { icon: Wrench, date: "14 Mar", title: "Brake pads replaced", detail: "127,112 km · Service record" },
  ];
  return (
    <div className="timeline-ui">
      <div className="mockup-top"><div><small>Your car, in context</small><strong>Timeline</strong></div><span>All ▾</span></div>
      <div className="upcoming-strip">
        <small>COMING NEXT</small>
        <div><span className="upcoming-icon"><CalendarDays size={17} /></span><div><strong>Technical inspection</strong><small>Due in 42 days</small></div><b>42d</b></div>
      </div>
      <div className="timeline-list">
        {entries.map(({ icon: Icon, date, title, detail, current }) => (
          <article className="timeline-entry" key={title}>
            <div className={current ? "timeline-node current" : "timeline-node"}><Icon size={16} /></div>
            <div className="timeline-entry-copy"><small>{date}</small><strong>{title}</strong><span>{detail}</span></div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AssistantMockup() {
  return (
    <div className="assistant-ui">
      <div className="assistant-header">
        <span className="assistant-avatar"><img src="/elio-chat-avatar.webp" alt="" width="160" height="160" /></span>
        <div><strong>Eliyo</strong><small><i /> Citroën C3 · 128,420 km</small></div>
        <span className="assistant-menu">•••</span>
      </div>
      <div className="assistant-context"><img src="/citroen.png" alt="" /><span>Using your vehicle, history and mileage</span></div>
      <div className="chat">
        <p className="bubble user-bubble">What needs attention right now?</p>
        <div className="assistant-row"><span className="mini-assistant"><img src="/elio-chat-avatar.webp" alt="" width="160" height="160" /></span><div className="bubble eliyo-bubble">Your oil service is the closest item — about <strong>1,240 km away.</strong> Your inspection and insurance are both fine for now.</div></div>
        <p className="bubble user-bubble secondary-question">Can this engine use 5W-30?</p>
        <div className="assistant-row"><span className="mini-assistant"><img src="/elio-chat-avatar.webp" alt="" width="160" height="160" /></span><div className="bubble eliyo-bubble">Let me check this against your exact engine before recommending anything.<div className="checking"><span /> Checking Citroën C3 engine details</div></div></div>
      </div>
      <div className="composer"><Plus size={17} /><span>Ask Eliyo about your car…</span><b>↑</b></div>
    </div>
  );
}

function GarageMockup() {
  return (
    <div className="garage-ui">
      <div className="garage-selected"><span className="make-logo"><img src="/citroen.png" alt="" /></span><div><small>Currently viewing</small><strong>Citroën C3</strong><span>2009 · 128,420 km</span></div><ChevronDown size={18} /></div>
      <div className="garage-menu">
        <p>Your garage</p>
        <article><span className="make-logo"><img src="/bmw.png" alt="" /></span><div><strong>BMW 440i</strong><small>Connected · updated now</small></div><span /></article>
        <article className="garage-active"><span className="make-logo"><img src="/citroen.png" alt="" /></span><div><strong>Citroën C3</strong><small>Manual · works without connection</small></div><Check size={17} /></article>
        <span className="garage-add" aria-hidden="true"><Plus size={17} /> Add vehicle</span>
      </div>
    </div>
  );
}

export function LandingPage() {
  const [platform, setPlatform] = useState<Platform>("both");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  const joinWaitlist = useCallback(async (email: string, selectedPlatform: Platform, company = "") => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setSubmitState("error"); setMessage("Enter a valid email address."); emailRef.current?.focus();
      throw new Error("A valid email address is required.");
    }
    setSubmitState("loading"); setMessage("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, platform: selectedPlatform, company }),
      });
      const payload = (await response.json()) as { status?: "joined" | "already_joined"; error?: string };
      if (!response.ok) throw new Error(payload.error || "Unable to join right now.");
      const duplicate = payload.status === "already_joined";
      setSubmitState(duplicate ? "duplicate" : "success");
      setMessage(duplicate ? "You’re already on the list — we’ll keep you posted." : "You’re in. We’ll let you know when Eliyo is ready.");
      return { status: payload.status, email: normalizedEmail };
    } catch (error) {
      setSubmitState("error");
      setMessage(error instanceof Error ? error.message : "Unable to join right now.");
      throw error;
    }
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    type ModelContext = { registerTool: (tool: {
      name: string; title: string; description: string; inputSchema: object;
      annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
      execute: (input: unknown) => Promise<unknown>;
    }, options: { signal: AbortSignal }) => void | Promise<void> };
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const controller = new AbortController();
    void Promise.resolve(context.registerTool({
      name: "join_eliyo_early_access", title: "Join Eliyo early access",
      description: "Add an email address to the Eliyo mobile app early-access list for iPhone, Android, or both.",
      inputSchema: {
        type: "object",
        properties: { email: { type: "string", format: "email" }, platform: { type: "string", enum: ["both", "iphone", "android"] } },
        required: ["email", "platform"], additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      async execute(input) {
        const value = input as { email?: unknown; platform?: unknown };
        if (typeof value.email !== "string") throw new Error("email must be a string");
        if (!["both", "iphone", "android"].includes(String(value.platform))) throw new Error("platform must be both, iphone, or android");
        setPlatform(value.platform as Platform);
        document.querySelector("#early-access")?.scrollIntoView({ behavior: "smooth" });
        return joinWaitlist(value.email, value.platform as Platform);
      },
    }, { signal: controller.signal })).catch(() => undefined);
    return () => controller.abort();
  }, [joinWaitlist]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try { await joinWaitlist(String(data.get("email") || ""), platform, String(data.get("company") || "")); }
    catch { /* The visible status message carries the recoverable error. */ }
  }

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <nav className="nav" aria-label="Primary navigation">
          <Brand />
          <div className="nav-links"><a href="#how-it-works">Product</a><a href="#eliyo-plus">Eliyo+</a></div>
          <a className="nav-cta" href="#early-access">Get early access <ArrowUpRight size={16} /></a>
        </nav>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Personal car assistant</p>
            <h1 id="hero-title">Know What Your<br />Car Needs <em>Next.</em></h1>
            <p className="hero-description">Eliyo keeps track of maintenance, mileage, documents and your car’s history — and tells you what needs attention.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#early-access">Get early access <ArrowUpRight size={18} /></a>
              <a className="button button-quiet" href="#how-it-works">See how it works <ArrowDown size={18} /></a>
            </div>
            <p className="platform-note"><span aria-hidden="true" /> Built for iPhone &amp; Android.</p>
          </div>
          <div className="hero-stage" aria-label="Eliyo home screen preview">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="phone-wrap"><HomeMockup /></div>
            <aside className="floating-card floating-maintenance"><span className="mini-icon"><Wrench size={16} /></span><div><small>Oil service</small><strong>1,240 km</strong><span>remaining</span></div></aside>
            <aside className="floating-card floating-insurance"><span className="mini-icon"><ShieldCheck size={16} /></span><div><small>Insurance</small><strong>24 days</strong><span>until renewal</span></div></aside>
          </div>
        </div>
        <div className="hero-foot"><span>Scroll to meet Eliyo</span><span className="scroll-line" /></div>
      </section>

      <section className="core-scene light-scene" id="how-it-works">
        <div className="scene-inner core-layout">
          <div className="core-copy" data-reveal>
            <p className="section-index">01 / THE QUIET PART</p>
            <h2>Stop Wondering<br />What’s Next.</h2>
            <p>Your car already has enough things to remember. Eliyo keeps maintenance, mileage and important dates together — and tells you when something needs attention.</p>
          </div>
          <div className="signal-stack" aria-label="Your car at a glance">
            <article className="signal-card signal-primary" data-reveal><span><Wrench size={21} /></span><div><small>Oil service</small><strong>1,240 km remaining</strong></div><b>Next</b></article>
            <article className="signal-card signal-secondary" data-reveal><span><ShieldCheck size={21} /></span><div><small>Insurance</small><strong>Renews in 24 days</strong></div><b>Fine</b></article>
            <article className="signal-card signal-dark" data-reveal><span><Gauge size={21} /></span><div><small>Mileage</small><strong>128,420 km</strong></div><b>Today</b></article>
          </div>
        </div>
        <p className="manifesto-line" aria-label="Stop carrying your car in your head"><span>STOP CARRYING YOUR CAR IN YOUR HEAD.</span><span aria-hidden="true">STOP CARRYING YOUR CAR IN YOUR HEAD.</span></p>
      </section>

      <section className="timeline-scene dark-scene" id="timeline">
        <div className="timeline-copy" data-reveal>
          <p className="bracket-eyebrow">[ YOUR CAR, IN CONTEXT ]</p>
          <h2>Everything that happened.<br /><em>Everything coming next.</em></h2>
          <p>Services, mileage, documents, expenses and upcoming maintenance — organized into one clear timeline.</p>
        </div>
        <div className="timeline-stage">
          <div className="timeline-labels" aria-hidden="true"><span>Oil changed</span><span>+642 km</span><span>Insurance renewed</span><span>Inspection due</span><span>Brake pads replaced</span></div>
          <div className="timeline-phone" data-reveal><TimelineMockup /></div>
        </div>
      </section>

      <section className="assistant-scene light-scene" id="assistant">
        <div className="assistant-scene-inner">
          <div className="assistant-copy" data-reveal>
            <p className="bracket-eyebrow">[ MEET ELIYO ]</p>
            <h2>Ask your car.<br /><em>Not the internet.</em></h2>
            <p>Eliyo already knows which vehicle you mean, its mileage, history and maintenance. Ask a question and get an answer based on your car.</p>
            <div className="context-proof"><span><img src="/citroen.png" alt="" /></span><div><small>CURRENT CONTEXT</small><strong>Citroën C3 · 2009</strong></div><Check size={18} /></div>
          </div>
          <div className="assistant-product" data-reveal><AssistantMockup /></div>
        </div>
      </section>

      <section className="care-scene" id="maintenance">
        <div className="care-head" data-reveal>
          <p className="section-index">04 / CARE, WITHOUT THE CALENDAR MATH</p>
          <h2>Know Before<br />It’s Due.</h2>
          <p>Eliyo turns mileage and service history into simple reminders — so maintenance doesn’t depend on memory.</p>
        </div>
        <div className="care-grid">
          <article className="maintenance-panel" data-reveal>
            <div className="panel-title"><span><Wrench size={20} /></span><div><small>MAINTENANCE</small><strong>Coming up</strong></div><b>3 tracked</b></div>
            <div className="maintenance-ring"><div><strong>1,240</strong><span>km to oil service</span></div></div>
            <div className="maintenance-list"><p><span>Engine oil</span><b>Due in 1,240 km</b></p><p><span>Technical inspection</span><b>42 days left</b></p><p><span>Brake fluid</span><b>Coming later</b></p></div>
          </article>
          <article className="mileage-panel" data-reveal>
            <div className="mileage-top"><p className="bracket-eyebrow">[ MILEAGE WITHOUT THE SPREADSHEET ]</p><h3>Your mileage,<br />kept in sync.</h3><p>Update it manually, scan the odometer, or connect a supported vehicle. Eliyo keeps the latest reading in one place.</p></div>
            <strong className="odometer">128<span>420</span><small>km</small></strong>
            <div className="mileage-methods"><div><Wrench size={17} /><strong>Manual</strong><span>Works with any car.</span></div><div><Camera size={17} /><strong>Camera</strong><span>Snap. Confirm. Done.</span></div><div><Link2 size={17} /><strong>Connected</strong><span>Automatic where supported.</span></div></div>
          </article>
        </div>
      </section>

      <section className="garage-scene light-scene" id="garage">
        <div className="garage-art">
          <div className="old-new-label old-label"><small>ANY CAR</small><strong>2009</strong></div>
          <div className="old-new-label new-label"><small>CONNECTED</small><strong>Now</strong></div>
          <div className="car-halo" /><img className="garage-car" src="/vehicle-cutout-neutral.webp" alt="A car supported by Eliyo without requiring a connection" width="768" height="512" /><img className="garage-mascot" src="/elio-peek-learning.webp" alt="" width="360" height="541" />
        </div>
        <div className="garage-copy" data-reveal>
          <p className="section-index">05 / BUILT FOR THE CAR YOU HAVE</p><h2>New Car.<br />Old Car.<br /><em>Still Your Car.</em></h2>
          <p>Eliyo isn’t only for connected vehicles. Add almost any car manually and get the same organized garage, history and reminders.</p>
          <div className="comparison"><p><span><Link2 size={17} /></span><strong>Connected vehicle</strong><small>Mileage updated automatically</small></p><p><span><Wrench size={17} /></span><strong>2009 Citroën C3</strong><small>Works without a connection</small></p></div>
        </div>
        <div className="garage-switcher">
          <div className="switcher-copy" data-reveal><p className="bracket-eyebrow">[ ONE ISN’T ALWAYS ENOUGH ]</p><h3>Your whole garage.<br />One Eliyo.</h3><p>Keep multiple vehicles together and switch between them whenever you need.</p></div>
          <GarageMockup />
        </div>
      </section>

      <section className="records-scene dark-scene" id="records">
        <div className="records-head" data-reveal><p className="section-index">06 / WHERE YOU LEFT IT</p><h2>The stuff you need.<br /><em>Before you need it.</em></h2><p>Keep service records, important dates and vehicle documents close to your car — instead of scattered across apps, folders and gloveboxes.</p></div>
        <div className="records-stage">
          <div className="document-card doc-one"><span><ShieldCheck size={20} /></span><div><small>Insurance</small><strong>Policy_2026.pdf</strong></div><b>PDF</b></div>
          <div className="document-card doc-two"><span><FileText size={20} /></span><div><small>Registration</small><strong>Citroën C3</strong></div><b>IMG</b></div>
          <div className="document-card doc-three"><span><CalendarDays size={20} /></span><div><small>Inspection</small><strong>Due 23 Oct</strong></div><b>42d</b></div>
          <div className="document-card doc-four"><span><Wrench size={20} /></span><div><small>Service records</small><strong>8 entries</strong></div><b>→</b></div>
          <img className="companion-mascot" src="/elio-mascot-cutout.webp" alt="Eliyo, your car companion" width="520" height="759" />
          <div className="companion-copy" data-reveal><p className="bracket-eyebrow">[ ALWAYS AROUND ]</p><h3>A little less<br />car stuff in your head.</h3><p>Eliyo quietly keeps an eye on your garage and surfaces what matters when it matters.</p></div>
        </div>
      </section>

      <section className="features-scene light-scene" id="features">
        <div className="features-head" data-reveal><p className="section-index">07 / THE WHOLE GARAGE</p><h2>Small things.<br /><em>One less headache.</em></h2></div>
        <div className="feature-bento">
          {features.map(({ icon: Icon, title, copy, className, mark }) => (
            <article className={className} key={title} data-reveal><span className="feature-icon">{mark ? <img src="/elio-mark.svg" alt="" /> : <Icon />}</span><div><strong>{title}</strong><p>{copy}</p></div></article>
          ))}
        </div>
      </section>

      <section className="pricing-scene" id="eliyo-plus">
        <div className="pricing-head" data-reveal><p className="bracket-eyebrow">[ SIMPLE FROM DAY ONE ]</p><h2>Start free.<br /><em>Keep more with Eliyo+.</em></h2></div>
        <div className="pricing-grid">
          <article className="price-card" data-reveal><div><small>FOR EVERY DRIVER</small><h3>Eliyo</h3><p>Everything you need to start taking care of your car.</p></div><div><strong>Free</strong><a href="#early-access">Get early access <ArrowUpRight size={18} /></a></div></article>
          <article className="price-card plus-card" data-reveal><div><small>FOR DOING LESS OF THE BORING WORK</small><h3>Eliyo<span>+</span></h3><p>More intelligence, automation and tools for people who want Eliyo to do more.</p></div><div><strong>Pricing coming later</strong><a href="#early-access">Explore Eliyo+ <ArrowUpRight size={18} /></a></div></article>
        </div>
      </section>

      <section className="faq-scene light-scene" id="faq">
        <div className="faq-grid">
          <div className="faq-head" data-reveal><p className="section-index">08 / GOOD TO KNOW</p><h2>Questions,<br /><em>answered.</em></h2></div>
          <Accordion className="faq-list" type="single" collapsible>
            {faq.map(([question, answer], index) => (
              <AccordionItem value={`item-${index}`} key={question}><AccordionTrigger><span>{String(index + 1).padStart(2, "0")}</span>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="waitlist-scene" id="early-access">
        <div className="waitlist-orbit orbit-a" /><div className="waitlist-orbit orbit-b" /><img className="waitlist-mascot" src="/elio-chat-listening.webp" alt="" width="700" height="854" />
        <div className="waitlist-copy" data-reveal>
          <p className="bracket-eyebrow">[ YOUR CAR IS WAITING ]</p><h2>Give your car<br /><em>an Eliyo.</em></h2><p>Know what it needs, remember what happened, and spend less time thinking about what comes next.</p>
          <div className="waitlist-actions">
            <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="waitlist-email">Email address</label>
              <div className="email-row"><input ref={emailRef} id="waitlist-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" disabled={submitState === "loading" || submitState === "success"} required /><button type="submit" disabled={submitState === "loading" || submitState === "success"}>{submitState === "loading" ? "Joining…" : submitState === "success" ? "You’re in" : "Get early access"}{submitState === "success" ? <Check size={18} /> : <ArrowUpRight size={18} />}</button></div>
              <input className="honeypot" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="platform-choice" aria-label="Preferred platform">
                {([["both", "iPhone & Android"], ["iphone", "iPhone"], ["android", "Android"]] as const).map(([value, label]) => (
                  <button className={platform === value ? "active" : ""} type="button" key={value} onClick={() => setPlatform(value)} aria-pressed={platform === value}>{label}</button>
                ))}
              </div>
              <p className={submitState === "error" ? "form-status form-error" : "form-status"} aria-live="polite">{message || "Free to get started. One useful email when Eliyo is ready — no noise."}</p>
            </form>
            <a className="explore-link" href="#how-it-works">Explore Eliyo <ArrowDown size={17} /></a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-top"><Brand /><p>Your car, less to think about.</p></div>
        <div className="footer-links"><a href="#how-it-works">Product</a><a href="#eliyo-plus">Eliyo+</a><span>Support</span><span>Privacy</span><span>Terms</span></div>
        <div className="footer-bottom"><span>© 2026 Eliyo</span><span>Built for iPhone &amp; Android</span></div>
      </footer>
    </main>
  );
}
