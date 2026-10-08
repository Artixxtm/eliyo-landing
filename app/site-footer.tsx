"use client";

import { useEffect } from "react";
import { localeConfig, localizedPath, resourceCopy } from "./resource-copy";
import type { Locale } from "./site-copy";

export const OPEN_COOKIE_SETTINGS_EVENT = "eliyo:open-cookie-settings";

export function SiteFooter({ locale, hero = false }: { locale: Locale; hero?: boolean }) {
  const t = resourceCopy[locale];

  useEffect(() => {
    document.documentElement.lang = localeConfig[locale].lang;
  }, [locale]);

  return (
    <footer className={hero ? "site-footer site-footer--hero" : "site-footer"}>
      {!hero && <span className="site-footer__copyright">{t.footer.copyright}</span>}
      <nav className="site-footer__links" aria-label="Legal and support">
        <a href={localizedPath(locale, "privacy")}>{t.footer.privacy}</a>
        <a href={localizedPath(locale, "terms")}>{t.footer.terms}</a>
        <a href={localizedPath(locale, "support")}>{t.footer.support}</a>
        <a href={localizedPath(locale, "delete-account")}>{t.footer.deleteAccount}</a>
        <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}>
          {t.footer.cookieSettings}
        </button>
      </nav>
    </footer>
  );
}
