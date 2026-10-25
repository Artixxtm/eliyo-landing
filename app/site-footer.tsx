"use client";

import { useEffect } from "react";
import { localeConfig, localizedPath, resourceCopy } from "./resource-copy";
import type { Locale } from "./site-copy";

export const OPEN_COOKIE_SETTINGS_EVENT = "eliyo:open-cookie-settings";

export function SiteFooter({
  locale,
  landing = false,
}: {
  locale: Locale;
  landing?: boolean;
}) {
  const t = resourceCopy[locale];

  useEffect(() => {
    document.documentElement.lang = localeConfig[locale].lang;
  }, [locale]);

  const links = (
    <nav className="site-footer__links" aria-label="Legal and support">
      <a href={localizedPath(locale, "privacy")}>{t.footer.privacy}</a>
      <a href={localizedPath(locale, "terms")}>{t.footer.terms}</a>
      <a href={localizedPath(locale, "support")}>{t.footer.support}</a>
      <a href={localizedPath(locale, "delete-account")}>{t.footer.deleteAccount}</a>
      <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}>
        {t.footer.cookieSettings}
      </button>
    </nav>
  );

  if (landing) {
    return (
      <footer className="site-footer site-footer--landing">
        <div className="site-footer__landing-main">
          <div className="site-footer__brand-block">
            <a className="site-footer__brand" href="#top" aria-label="Eliyo">
              <span className="site-footer__mark"><img src="/eliyo-mark.svg" alt="" /></span>
              <span>Eliyo</span>
            </a>
          </div>
          {links}
        </div>
        <div className="site-footer__landing-meta">
          <span>{t.footer.copyright}</span>
          <a href="mailto:eliyo.app@gmail.com">eliyo.app@gmail.com</a>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <span className="site-footer__copyright">{t.footer.copyright}</span>
      {links}
    </footer>
  );
}
