import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import styles from "./invite.module.css";

const APP_STORE_URL = "https://apps.apple.com/us/app/eliyo/id6819023327";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=app.eliyo.mobile";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type InviteLocale = "en" | "uk" | "pl" | "ru";
type Platform = "ios" | "android" | "other";

const copy = {
  en: {
    desktop: "Open this invitation on an iPhone or Android device.",
    eyebrow: "Vehicle invitation",
    title: "Open this invitation in Eliyo.",
    body: "For privacy, vehicle and owner details are shown only after you sign in to Eliyo.",
    open: "Open Eliyo",
    appStore: "Download on the App Store",
    playStore: "Get it on Google Play",
    note: "After installing Eliyo, reopen this original invitation link.",
    invalidTitle: "This link is invalid.",
    invalidBody: "Ask the vehicle owner for a new invitation link.",
  },
  uk: {
    desktop: "Відкрийте це запрошення на iPhone або Android-пристрої.",
    eyebrow: "Запрошення до автомобіля",
    title: "Відкрийте запрошення в Eliyo.",
    body: "З міркувань конфіденційності дані автомобіля та власника відображаються лише після входу в Eliyo.",
    open: "Відкрити Eliyo",
    appStore: "Завантажити в App Store",
    playStore: "Завантажити в Google Play",
    note: "Після встановлення Eliyo повторно відкрийте це початкове посилання-запрошення.",
    invalidTitle: "Посилання недійсне.",
    invalidBody: "Попросіть власника автомобіля створити нове запрошення.",
  },
  pl: {
    desktop: "Otwórz to zaproszenie na iPhonie lub urządzeniu z Androidem.",
    eyebrow: "Zaproszenie do pojazdu",
    title: "Otwórz zaproszenie w Eliyo.",
    body: "Ze względów prywatności dane pojazdu i właściciela są widoczne dopiero po zalogowaniu do Eliyo.",
    open: "Otwórz Eliyo",
    appStore: "Pobierz w App Store",
    playStore: "Pobierz z Google Play",
    note: "Po zainstalowaniu Eliyo ponownie otwórz ten pierwotny link z zaproszeniem.",
    invalidTitle: "Link jest nieprawidłowy.",
    invalidBody: "Poproś właściciela pojazdu o nowe zaproszenie.",
  },
  ru: {
    desktop: "Откройте это приглашение на iPhone или Android-устройстве.",
    eyebrow: "Приглашение к автомобилю",
    title: "Откройте приглашение в Eliyo.",
    body: "В целях конфиденциальности данные автомобиля и владельца показываются только после входа в Eliyo.",
    open: "Открыть Eliyo",
    appStore: "Загрузить в App Store",
    playStore: "Загрузить в Google Play",
    note: "После установки Eliyo повторно откройте эту исходную ссылку-приглашение.",
    invalidTitle: "Ссылка недействительна.",
    invalidBody: "Попросите владельца автомобиля создать новое приглашение.",
  },
} as const;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Vehicle invitation · Eliyo",
  robots: { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false, noimageindex: true } },
  referrer: "no-referrer",
};

function localeFromHeader(value: string | null): InviteLocale {
  const languages = (value ?? "").toLowerCase().split(",").map((part, index) => {
    const [tag, ...parameters] = part.trim().split(";");
    const quality = parameters.find((parameter) => parameter.trim().startsWith("q="));
    const parsedQuality = quality ? Number.parseFloat(quality.trim().slice(2)) : 1;
    return { tag, quality: Number.isFinite(parsedQuality) ? parsedQuality : 0, index };
  }).sort((left, right) => right.quality - left.quality || left.index - right.index);

  for (const { tag } of languages) {
    const language = tag.split("-")[0];
    if (language === "uk" || language === "pl" || language === "ru" || language === "en") return language;
  }
  return "en";
}

function platformFromUserAgent(value: string | null): Platform {
  const userAgent = value ?? "";
  if (/android/i.test(userAgent)) return "android";
  if (/iphone|ipad|ipod/i.test(userAgent) || (/macintosh/i.test(userAgent) && /mobile/i.test(userAgent))) return "ios";
  return "other";
}

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const [{ token }, requestHeaders] = await Promise.all([params, headers()]);
  const locale = localeFromHeader(requestHeaders.get("accept-language"));
  const platform = platformFromUserAgent(requestHeaders.get("user-agent"));
  const t = copy[locale];
  const valid = UUID_PATTERN.test(token);

  if (valid) {
    if (platform === "ios") redirect(APP_STORE_URL);
    if (platform === "android") redirect(GOOGLE_PLAY_URL);
  }

  return (
    <main className={styles.page} lang={locale}>
      <span className={styles.spinner} aria-hidden="true" />
      <p>{valid ? t.desktop : t.invalidTitle}</p>
    </main>
  );
}
