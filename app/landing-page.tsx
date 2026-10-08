"use client";

import { useEffect } from "react";
import { FaAndroid, FaApple } from "react-icons/fa";
import { SiteFooter } from "./site-footer";
import { copy, locales, type Locale } from "./site-copy";

const localeOrder: Locale[] = ["en", "uk", "pl", "ru"];
const localeLabels: Record<Locale, string> = { en: "EN", uk: "UA", pl: "PL", ru: "RU" };
const localePaths: Record<Locale, string> = { en: "/", uk: "/ua", pl: "/pl", ru: "/ru" };

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

export function LandingPage({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const phoneImage = phoneImages[locale];

  useEffect(() => {
    document.documentElement.lang = locales.find((item) => item.id === locale)?.lang ?? "en";
  }, [locale]);

  return (
    <main className={`hero-only locale-${locale}`} id="top">
      <div className="top-controls">
        <a className="mark-tile" href="#top" aria-label="Eliyo"><img src="/eliyo-mark.svg" alt="" /></a>
        <div className="language-tile" aria-label="Language">
          {localeOrder.map((item) => <a key={item} href={localePaths[item]} className={locale === item ? "active" : ""} aria-current={locale === item ? "page" : undefined}>{localeLabels[item]}</a>)}
        </div>
      </div>

      <img className="hand-phone" src={phoneImage.src} width="1700" height="1586" alt={phoneImage.alt} />

      <section className="hero-message" aria-labelledby="hero-title">
        <h1 id="hero-title" aria-label={heroLines[locale].join(" ")}><HeroTitle lines={heroLines[locale]} /></h1>
        <p>{t.hero[2]}</p>
        <div className="platform-badges" aria-label={t.hero[5]}>
          <PlatformBadge platform="iPhone" label={availability[locale]} />
          <PlatformBadge platform="Android" label={availability[locale]} />
        </div>
      </section>

      <SiteFooter locale={locale} hero />
    </main>
  );
}
