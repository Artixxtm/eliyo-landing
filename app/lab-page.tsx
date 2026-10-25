import type { Metadata } from "next";
import { EliyoLab } from "./eliyo-lab";
import { createPageMetadata } from "./site-metadata";
import { SiteFooter } from "./site-footer";
import { SiteNav, localizedSitePath } from "./site-nav";
import { copy, type Locale } from "./site-copy";

const metadataCopy: Record<Locale, { title: string; description: string; locale: string }> = {
  en: {
    title: "Eliyo Lab - Vote on upcoming features",
    description: "Vote on upcoming Eliyo features and share ideas that can shape what we build next.",
    locale: "en_US",
  },
  uk: {
    title: "Eliyo Lab - Голосуйте за майбутні функції",
    description: "Голосуйте за майбутні функції Eliyo та діліться ідеями, які допоможуть визначити, що ми створимо далі.",
    locale: "uk_UA",
  },
  pl: {
    title: "Eliyo Lab - Głosuj na przyszłe funkcje",
    description: "Głosuj na przyszłe funkcje Eliyo i dziel się pomysłami, które pomogą wybrać, co stworzymy dalej.",
    locale: "pl_PL",
  },
  ru: {
    title: "Eliyo Lab - Голосуйте за будущие функции",
    description: "Голосуйте за будущие функции Eliyo и делитесь идеями, которые помогут выбрать, что мы создадим дальше.",
    locale: "ru_RU",
  },
};

export function createLabMetadata(locale: Locale): Metadata {
  const content = metadataCopy[locale];
  const path = localizedSitePath(locale, "lab");
  return {
    ...createPageMetadata({ title: content.title, description: content.description, path, locale: content.locale }),
    alternates: {
      canonical: path,
      languages: {
        en: "/lab",
        uk: "/ua/lab",
        pl: "/pl/lab",
        ru: "/ru/lab",
        "x-default": "/lab",
      },
    },
  };
}

export function LabPage({ locale }: { locale: Locale }) {
  return (
    <main className={`lab-page locale-${locale}`} id="top">
      <SiteNav locale={locale} page="lab" />
      <EliyoLab locale={locale} standalone />
      <SiteFooter locale={locale} landing />
    </main>
  );
}
