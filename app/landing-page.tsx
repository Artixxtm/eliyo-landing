"use client";

import { useEffect, useState } from "react";
import { FaAndroid, FaApple } from "react-icons/fa";
import { LabInvite } from "./lab-invite";
import { SiteNav } from "./site-nav";
import { SiteFooter } from "./site-footer";
import { copy, locales, type Locale } from "./site-copy";

const phoneImages: Record<Locale, { src: string; alt: string }> = {
  en: { src: "/eliyo-phone-hand.png", alt: "Eliyo app interface in English on a phone held in a hand" },
  uk: { src: "/eliyo-phone-hand-ua.png", alt: "Інтерфейс застосунку Eliyo українською мовою на телефоні в руці" },
  pl: { src: "/eliyo-phone-hand-pl.png", alt: "Polski interfejs aplikacji Eliyo na telefonie trzymanym w dłoni" },
  ru: { src: "/eliyo-phone-hand-ru.png", alt: "Интерфейс приложения Eliyo на русском языке на телефоне в руке" },
};

const heroLines: Record<Locale, string[]> = {
  en: ["Know what your", "car needs next."],
  uk: ["Знайте, що потрібно", "вашому авто далі."],
  pl: ["Wiedz, czego Twoje", "auto potrzebuje dalej."],
  ru: ["Знайте, что нужно", "вашему авто дальше."],
};

const availability: Record<Locale, string> = {
  en: "Coming soon",
  uk: "Незабаром",
  pl: "Już wkrótce",
  ru: "Скоро",
};

function PlatformBadge({ platform, label }: { platform: string; label: string }) {
  return (
    <div className="platform-badge" role="note" aria-label={`${label}: ${platform}`}>
      <span className="platform-symbol" aria-hidden="true">{platform === "iPhone" ? <FaApple /> : <FaAndroid />}</span>
      <span><small>{label}</small><strong>{platform}</strong></span>
    </div>
  );
}

function HeroTitle({ lines }: { lines: string[] }) {
  return lines.map((line) => <span key={line}>{line}</span>);
}

function ProductStory({ locale }: { locale: Locale }) {
  const about = copy[locale].showcase;

  return (
    <section className="about-section" aria-labelledby="about-title">
      <div className="about-shell">
        <span>[ About Eliyo ]</span>
        <h2 id="about-title">
          <strong>{about.title}</strong>{" "}
          <span>{about.intro}</span>{" "}
          <em>{about.accent}</em>
        </h2>
      </div>
    </section>
  );
}

function Roadmap({ locale }: { locale: Locale }) {
  const t = copy[locale].roadmap;
  const [activeStep, setActiveStep] = useState(0);
  const [number, title, status, description] = t.items[activeStep];

  return (
    <section className="roadmap-section" id="roadmap" aria-labelledby="roadmap-title">
      <div className="roadmap-shell">
        <header className="roadmap-heading roadmap-reveal">
          <div className="roadmap-heading__copy">
            <h2 id="roadmap-title">{t.title}</h2>
          </div>
        </header>

        <div className="roadmap-stage roadmap-reveal">
          <div className="roadmap-detail" aria-live="polite">
            <div className="roadmap-detail__meta">
              <span>{number}</span>
              <strong>{status}</strong>
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>


          <svg className="roadmap-path roadmap-path--desktop" viewBox="0 0 1440 560" preserveAspectRatio="none" aria-hidden="true">
            <path className="roadmap-path__base" d="M80 330C160 330 220 250 320 250S460 330 560 330S700 250 820 250S960 330 1080 330S1240 250 1350 250" />
            <path className="roadmap-path__progress" d="M80 330C160 330 220 250 320 250S460 330 560 330S700 250 820 250S960 330 1080 330S1240 250 1350 250" />
          </svg>

          <svg className="roadmap-path roadmap-path--mobile" viewBox="0 0 60 620" preserveAspectRatio="none" aria-hidden="true">
            <path className="roadmap-path__base" d="M30 15C4 70 56 120 30 175S4 280 30 335S56 440 30 495S4 565 30 610" />
            <path className="roadmap-path__progress" d="M30 15C4 70 56 120 30 175S4 280 30 335S56 440 30 495S4 565 30 610" />
          </svg>

          <div className="roadmap-nodes" role="list">
            {t.items.map(([stepNumber, stepTitle, stepStatus, stepDescription], index) => (
              <div className={`roadmap-node-slot roadmap-node-slot--${index + 1}`} role="listitem" key={stepNumber}>
                <button
                  className={`roadmap-node ${activeStep === index ? "is-active" : ""} ${index === 0 ? "is-current" : ""}`}
                  type="button"
                  aria-pressed={activeStep === index}
                  aria-label={`${stepNumber}. ${stepTitle}. ${stepStatus}`}
                  onClick={() => setActiveStep(index)}
                >
                  <span className="roadmap-node__point">{stepNumber}</span>
                  <span className="roadmap-node__title">{stepTitle}</span>
                  <span className="roadmap-node__description">{stepDescription}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingPage({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const phoneImage = phoneImages[locale];

  useEffect(() => {
    document.documentElement.lang = locales.find((item) => item.id === locale)?.lang ?? "en";

    const steps = Array.from(document.querySelectorAll<HTMLElement>(".roadmap-reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      steps.forEach((step) => step.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.14 },
    );
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, [locale]);

  return (
    <main className={`landing-page locale-${locale}`} id="top">
      <SiteNav locale={locale} />

      <section className="hero-only" aria-labelledby="hero-title">
        <div className="hand-phone-wrap">
          <img className="hand-phone" src={phoneImage.src} width="1700" height="1586" alt={phoneImage.alt} />
        </div>

        <section className="hero-message">
          <h1 id="hero-title" aria-label={heroLines[locale].join(" ")}><HeroTitle lines={heroLines[locale]} /></h1>
          <p>{t.hero[2]}</p>
          <div className="platform-badges" aria-label={t.hero[5]}>
            <PlatformBadge platform="iPhone" label={availability[locale]} />
            <PlatformBadge platform="Android" label={availability[locale]} />
          </div>
        </section>

      </section>

      <div className="decor-light" />

      <ProductStory locale={locale} />

      <Roadmap locale={locale} />

      <LabInvite locale={locale} />

      <SiteFooter locale={locale} landing />
    </main>
  );
}
