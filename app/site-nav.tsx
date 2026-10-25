import type { Locale } from "./site-copy";

const localeOrder: Locale[] = ["en", "uk", "pl", "ru"];
const localeLabels: Record<Locale, string> = { en: "EN", uk: "UA", pl: "PL", ru: "RU" };
const localePaths: Record<Locale, string> = { en: "", uk: "/ua", pl: "/pl", ru: "/ru" };

export function localizedSitePath(locale: Locale, page: "home" | "lab" = "home") {
  const prefix = localePaths[locale];
  return page === "lab" ? `${prefix}/lab` : prefix || "/";
}

export function SiteNav({ locale, page = "home" }: { locale: Locale; page?: "home" | "lab" }) {
  return (
    <nav className="top-controls" aria-label="Site navigation">
      <a className="mark-tile" href={page === "home" ? "#top" : localizedSitePath(locale)} aria-label="Eliyo">
        <img src="/eliyo-mark.svg" alt="" />
      </a>
      <div className="language-tile" aria-label="Language">
        {localeOrder.map((item) => (
          <a
            key={item}
            href={localizedSitePath(item, page)}
            className={locale === item ? "active" : ""}
            aria-current={locale === item ? "page" : undefined}
          >
            {localeLabels[item]}
          </a>
        ))}
      </div>
    </nav>
  );
}
