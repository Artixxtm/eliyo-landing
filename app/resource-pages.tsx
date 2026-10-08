import { ResourceHeader } from "./legal-layout";
import { localizedPath, resourceCopy, type ResourceKind } from "./resource-copy";
import { SiteFooter } from "./site-footer";
import type { Locale } from "./site-copy";

function ResourceFrame({ locale, resource, children }: { locale: Locale; resource: ResourceKind; children: React.ReactNode }) {
  const t = resourceCopy[locale];
  return (
    <div className="resource-shell">
      <ResourceHeader locale={locale} resource={resource} />
      <main className="help-page">
        <a className="resource-back" href={localizedPath(locale)}>← {t.back}</a>
        {children}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

export function SupportPage({ locale }: { locale: Locale }) {
  const t = resourceCopy[locale].support;
  const mailto = `mailto:eliyo.app@gmail.com?subject=${encodeURIComponent(t.subject)}`;
  return (
    <ResourceFrame locale={locale} resource="support">
      <header className="help-page__header"><p className="legal-document__eyebrow">Eliyo</p><h1>{t.title}</h1><p>{t.description}</p></header>
      <a className="primary-email-link" href={mailto}>{t.emailLabel}<span>eliyo.app@gmail.com</span></a>
      <p className="help-page__note">{t.response}</p>
      <section className="help-page__section"><h2>{t.categoriesTitle}</h2><div className="support-grid">{t.categories.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    </ResourceFrame>
  );
}

export function DeleteAccountPage({ locale }: { locale: Locale }) {
  const t = resourceCopy[locale].deleteAccount;
  const mailto = `mailto:eliyo.app@gmail.com?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(t.body)}`;
  return (
    <ResourceFrame locale={locale} resource="delete-account">
      <header className="help-page__header"><p className="legal-document__eyebrow">Eliyo</p><h1>{t.title}</h1><p>{t.description}</p></header>
      <section className="help-page__section"><h2>{t.stepsTitle}</h2><ol className="deletion-steps">{t.steps.map((step) => <li key={step}>{step}</li>)}</ol><a className="primary-email-link primary-email-link--button" href={mailto}>{t.button}<span>eliyo.app@gmail.com</span></a><p className="help-page__note">{t.inApp}</p></section>
      <div className="deletion-grid">
        <section><h2>{t.deletedTitle}</h2><ul>{t.deleted.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section><h2>{t.retainedTitle}</h2><p>{t.retained}</p></section>
      </div>
      <aside className="subscription-callout"><h2>{t.subscriptionTitle}</h2><p>{t.subscription}</p></aside>
    </ResourceFrame>
  );
}
