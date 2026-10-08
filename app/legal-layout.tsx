import type { LegalDocument } from "./legal-content";
import Image from "next/image";
import { localeConfig, localeOrder, localizedPath, resourceCopy, type ResourceKind } from "./resource-copy";
import { SiteFooter } from "./site-footer";
import type { Locale } from "./site-copy";
import styles from "./legal-layout.module.css";

export function ResourceHeader({ locale, resource }: { locale: Locale; resource: ResourceKind }) {
  const t = resourceCopy[locale];
  return (
    <header className="resource-header">
      <a className="resource-header__brand" href={localizedPath(locale)} aria-label={t.back}>
        <Image src="/eliyo-mark.svg" width="34" height="37" alt="" priority />
        <span>Eliyo</span>
      </a>
      <nav className="resource-header__locales" aria-label="Language">
        {localeOrder.map((item) => (
          <a key={item} href={localizedPath(item, resource)} aria-current={locale === item ? "page" : undefined}>
            {localeConfig[item].label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function LegalPage({ locale, resource, document }: { locale: Locale; resource: "privacy" | "terms"; document: LegalDocument }) {
  const t = resourceCopy[locale];
  return (
    <div className="resource-shell">
      <ResourceHeader locale={locale} resource={resource} />
      <main className="legal-document">
        <a className="resource-back" href={localizedPath(locale)}>← {t.back}</a>
        <header className="legal-document__header">
          <p className="legal-document__eyebrow">Eliyo</p>
          <h1>{document.title}</h1>
          <p className="legal-document__updated">{document.updated}</p>
          {locale !== "en" && <p className="legal-document__canonical">{t.canonicalNotice}</p>}
          <div className="legal-document__intro">
            {document.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </header>
        <div className="legal-document__sections">
          {document.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
              {section.link && <p><a className={styles.inlineLink} href={section.link.href}>{section.link.label}</a></p>}
            </section>
          ))}
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
