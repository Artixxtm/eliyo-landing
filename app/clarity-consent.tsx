"use client";

import Clarity from "@microsoft/clarity";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { resourceCopy } from "./resource-copy";
import { OPEN_COOKIE_SETTINGS_EVENT } from "./site-footer";
import type { Locale } from "./site-copy";

const CONSENT_KEY = "eliyo-cookie-consent";
let clarityStarted = false;

function startClarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();

  if (!projectId || clarityStarted) return;

  Clarity.init(projectId);
  Clarity.consentV2({
    ad_Storage: "denied",
    analytics_Storage: "granted",
  });
  clarityStarted = true;
}

function localeFromPath(pathname: string): Locale {
  if (pathname === "/ua" || pathname.startsWith("/ua/")) return "uk";
  if (pathname === "/pl" || pathname.startsWith("/pl/")) return "pl";
  if (pathname === "/ru" || pathname.startsWith("/ru/")) return "ru";
  return "en";
}

function clearClarityCookies() {
  for (const name of ["_clck", "_clsk"]) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}; SameSite=Lax`;
  }
}

function withdrawClarity() {
  if (!clarityStarted) return;
  Clarity.consentV2({ ad_Storage: "denied", analytics_Storage: "denied" });
  Clarity.consent(false);
  clearClarityCookies();
}

export function ClarityConsent() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const t = resourceCopy[locale].cookies;
  const [visible, setVisible] = useState(false);
  const [isSettings, setIsSettings] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(CONSENT_KEY);

    if (consent === "accepted") {
      startClarity();
      return;
    }

    if (consent !== "declined") {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    const openSettings = () => {
      setIsSettings(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  function chooseConsent(consent: "accepted" | "declined") {
    const previousConsent = window.localStorage.getItem(CONSENT_KEY);
    window.localStorage.setItem(CONSENT_KEY, consent);
    if (consent === "accepted") startClarity();
    if (consent === "declined") withdrawClarity();
    setVisible(false);
    setIsSettings(false);
    if (consent === "declined" && previousConsent === "accepted") {
      window.setTimeout(() => window.location.reload(), 80);
    }
  }

  if (!visible) return null;

  return (
    <aside
      className={isSettings ? "cookie-consent cookie-consent--settings" : "cookie-consent"}
      aria-label={t.label}
      aria-live="polite"
    >
      <div className="cookie-consent__copy">
        <strong>{t.title}</strong>
        {isSettings && <span>{t.text}</span>}
      </div>
      <div className="cookie-consent__actions">
        <button type="button" onClick={() => chooseConsent("accepted")}>{t.accept}</button>
        <button type="button" className="cookie-consent__decline" onClick={() => chooseConsent("declined")}>{t.decline}</button>
        {isSettings && <button type="button" className="cookie-consent__close" aria-label={t.close} onClick={() => { setVisible(false); setIsSettings(false); }}>×</button>}
      </div>
    </aside>
  );
}
