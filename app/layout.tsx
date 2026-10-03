import type { Metadata } from "next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://eliyo.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Eliyo - Personal Car Assistant",
    template: "%s - Eliyo",
  },

  description:
    "Eliyo keeps track of your car's maintenance, mileage, documents and history - and tells you what needs attention next.",

  applicationName: "Eliyo",

  keywords: [
    "Eliyo",
    "car assistant",
    "vehicle assistant",
    "car maintenance",
    "vehicle maintenance",
    "car maintenance tracker",
    "service history",
    "car service history",
    "vehicle history",
    "mileage tracker",
    "car mileage",
    "car reminders",
    "maintenance reminders",
    "car documents",
    "vehicle documents",
    "car expenses",
    "vehicle expenses",
    "car garage",
    "vehicle management",
    "AI car assistant",
    "personal car assistant",
  ],

  authors: [
    {
      name: "Artem Naumenko",
    },
  ],

  creator: "Artem Naumenko",
  publisher: "Eliyo",

  category: "automotive",

  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      uk: "/ua",
      pl: "/pl",
      ru: "/ru",
      "x-default": "/",
    },
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Eliyo",

    title: "Eliyo - Know What Your Car Needs Next",

    description:
      "Eliyo keeps track of maintenance, mileage, documents and your car's history - and tells you what needs attention next.",

    locale: "en_US",

    alternateLocale: [
      "uk_UA",
      "pl_PL",
      "ru_RU",
    ],

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eliyo - Personal Car Assistant",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Eliyo - Know What Your Car Needs Next",

    description:
      "Your personal car assistant for maintenance, mileage, documents and vehicle history.",

    images: ["/og-image.jpg"],
  },

  appleWebApp: {
    capable: true,
    title: "Eliyo",
    statusBarStyle: "default",
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  other: {
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}