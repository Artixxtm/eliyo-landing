import { labCopy } from "./lab-copy";
import { localizedSitePath } from "./site-nav";
import type { Locale } from "./site-copy";

export function LabInvite({ locale }: { locale: Locale }) {
  const t = labCopy[locale];

  return (
    <section className="lab-invite-section" aria-labelledby="lab-invite-title">
      <div className="lab-invite">
        <div>
          <h2 id="lab-invite-title">{t.inviteTitle}</h2>
          <p>{t.inviteText}</p>
        </div>
        <a href={localizedSitePath(locale, "lab")}>{t.explore}<span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
