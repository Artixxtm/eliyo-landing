import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import styles from "../../invite/[token]/invite.module.css";

const APP_STORE_URL = "https://apps.apple.com/us/app/eliyo/id6819023327";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=app.eliyo.mobile";
const REFERRAL_CODE_PATTERN = /^[A-Z0-9]{8}$/;

type ReferralLocale = "en" | "uk" | "pl" | "ru";
type Platform = "ios" | "android" | "other";

const copy = {
  en: {
    desktop: "Open this Eliyo invitation on an iPhone or Android device.",
    invalid: "This Eliyo invitation link is invalid.",
  },
  uk: {
    desktop: "Відкрийте це запрошення до Eliyo на iPhone або Android-пристрої.",
    invalid: "Це посилання-запрошення до Eliyo недійсне.",
  },
  pl: {
    desktop: "Otwórz to zaproszenie do Eliyo na iPhonie lub urządzeniu z Androidem.",
    invalid: "Ten link z zaproszeniem do Eliyo jest nieprawidłowy.",
  },
  ru: {
    desktop: "Откройте это приглашение в Eliyo на iPhone или Android-устройстве.",
    invalid: "Эта ссылка-приглашение в Eliyo недействительна.",
  },
} as const;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Invitation · Eliyo",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  referrer: "no-referrer",
};

function localeFromHeader(value: string | null): ReferralLocale {
  for (const part of (value ?? "").toLowerCase().split(",")) {
    const language = part.trim().split(";")[0]?.split("-")[0];
    if (language === "uk" || language === "pl" || language === "ru" || language === "en") {
      return language;
    }
  }
  return "en";
}

function platformFromUserAgent(value: string | null): Platform {
  const userAgent = value ?? "";
  if (/android/i.test(userAgent)) return "android";
  if (/iphone|ipad|ipod/i.test(userAgent) || (/macintosh/i.test(userAgent) && /mobile/i.test(userAgent))) {
    return "ios";
  }
  return "other";
}

export default async function ReferralPage({ params }: { params: Promise<{ code: string }> }) {
  const [{ code }, requestHeaders] = await Promise.all([params, headers()]);
  const locale = localeFromHeader(requestHeaders.get("accept-language"));
  const platform = platformFromUserAgent(requestHeaders.get("user-agent"));
  const valid = REFERRAL_CODE_PATTERN.test(code.toUpperCase());

  if (valid) {
    if (platform === "ios") redirect(APP_STORE_URL);
    if (platform === "android") redirect(GOOGLE_PLAY_URL);
  }

  return (
    <main className={styles.page} lang={locale}>
      {valid ? <span className={styles.spinner} aria-hidden="true" /> : null}
      <p>{valid ? copy[locale].desktop : copy[locale].invalid}</p>
    </main>
  );
}
