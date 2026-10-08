import type { Metadata } from "next";
import { localeConfig, localeOrder, localizedPath, type ResourceKind } from "./resource-copy";
import type { Locale } from "./site-copy";

const descriptions: Record<Locale, Record<ResourceKind, string>> = {
  en: {
    privacy: "How Eliyo collects, uses, stores and protects personal data.",
    terms: "The terms that govern access to and use of Eliyo.",
    support: "Contact Eliyo support for account, subscription, technical or privacy help.",
    "delete-account": "Request permanent deletion of your Eliyo account and associated data.",
  },
  uk: {
    privacy: "Як Eliyo збирає, використовує, зберігає та захищає персональні дані.",
    terms: "Умови доступу до Eliyo та його використання.",
    support: "Зверніться до підтримки Eliyo щодо акаунта, підписки, технічних питань або даних.",
    "delete-account": "Подайте запит на остаточне видалення акаунта Eliyo та пов’язаних даних.",
  },
  pl: {
    privacy: "Jak Eliyo zbiera, wykorzystuje, przechowuje i chroni dane osobowe.",
    terms: "Warunki regulujące dostęp do Eliyo i korzystanie z niego.",
    support: "Skontaktuj się z pomocą Eliyo w sprawie konta, subskrypcji, problemu lub prywatności.",
    "delete-account": "Poproś o trwałe usunięcie konta Eliyo i powiązanych danych.",
  },
  ru: {
    privacy: "Как Eliyo собирает, использует, хранит и защищает персональные данные.",
    terms: "Условия доступа к Eliyo и его использования.",
    support: "Свяжитесь с поддержкой Eliyo по вопросам аккаунта, подписки, проблем или данных.",
    "delete-account": "Запросите окончательное удаление аккаунта Eliyo и связанных данных.",
  },
};

const titles: Record<Locale, Record<ResourceKind, string>> = {
  en: { privacy: "Privacy Policy", terms: "Terms of Use", support: "Support", "delete-account": "Delete account" },
  uk: { privacy: "Політика конфіденційності", terms: "Умови використання", support: "Підтримка", "delete-account": "Видалення акаунта" },
  pl: { privacy: "Polityka prywatności", terms: "Warunki korzystania", support: "Pomoc", "delete-account": "Usunięcie konta" },
  ru: { privacy: "Политика конфиденциальности", terms: "Условия использования", support: "Поддержка", "delete-account": "Удаление аккаунта" },
};

export function createResourceMetadata(resource: ResourceKind, locale: Locale): Metadata {
  const title = `${titles[locale][resource]} - Eliyo`;
  const description = descriptions[locale][resource];
  const path = localizedPath(locale, resource);
  const languages = Object.fromEntries(localeOrder.map((item) => [localeConfig[item].lang, localizedPath(item, resource)]));

  return {
    title,
    description,
    alternates: { canonical: path, languages: { ...languages, "x-default": localizedPath("en", resource) } },
    openGraph: { title, description, url: path, siteName: "Eliyo", locale: locale === "uk" ? "uk_UA" : locale === "pl" ? "pl_PL" : locale === "ru" ? "ru_RU" : "en_US", type: "website", images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Eliyo personal car assistant" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  };
}
